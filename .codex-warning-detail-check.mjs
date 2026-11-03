import fs from 'node:fs/promises';

const targets = await (await fetch('http://127.0.0.1:9222/json/list')).json();
const page = targets.find(target => target.type === 'page' && target.url.includes('localhost:3000'));
if (!page) throw new Error('Dashboard page target not found');

const socket = new WebSocket(page.webSocketDebuggerUrl);
let commandId = 0;
const pending = new Map();

socket.addEventListener('message', event => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});

function send(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

const delay = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function clickElement(expression) {
  const rect = await evaluate(`(() => {
    const element = ${expression};
    if (!element) return null;
    element.scrollIntoView({ block: 'center' });
    const bounds = element.getBoundingClientRect();
    return { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
  })()`);
  if (!rect) throw new Error('Target element not found');
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x, y: rect.y });
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: rect.x, y: rect.y, button: 'left', clickCount: 1 });
  await delay(450);
}

async function hoverElement(expression) {
  const rect = await evaluate(`(() => {
    const element = ${expression};
    if (!element) return null;
    const bounds = element.getBoundingClientRect();
    return { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
  })()`);
  if (!rect) throw new Error('Hover target not found');
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x, y: rect.y });
  await delay(500);
}

await send('Runtime.enable');
await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', {
  width: 2040,
  height: 1658,
  deviceScaleFactor: 1,
  mobile: false,
});
await send('Page.navigate', { url: 'http://localhost:3000/' });
await delay(8000);

if (!(await evaluate(`Boolean(document.querySelector('#dev-anno-6'))`))) {
  await clickElement(`[...document.querySelectorAll('button')].find(item =>
    item.innerText.replace(/\\s+/g, '').includes('综合场景大屏')
  )`);
  await delay(1200);
}

await clickElement(`[...document.querySelectorAll('button')].find(item =>
  item.innerText.replace(/\\s+/g, '').includes('专项业务应用场景')
)`);
await delay(500);
await clickElement(`[...document.querySelectorAll('button')].find(item =>
  item.innerText.replace(/\\s+/g, '').trim() === '预警事件'
)`);
await delay(800);

const layerState = await evaluate(`(() => {
  const points = [...document.querySelectorAll('[data-warning-level]')];
  return {
    pointCount: points.length,
    alarmTypes: points.map(item => item.dataset.warningType),
    visibleLabels: points.map(item => item.querySelector('text')?.textContent?.trim() || ''),
    legendTitle: document.querySelector('[data-map-legend] [data-legend-title]')?.textContent?.trim() || '',
  };
})()`);

await hoverElement(`document.querySelector('[data-warning-level]')`);
const modalAfterHover = await evaluate(`document.querySelectorAll('[data-warning-detail]').length`);
const layerScreenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await fs.writeFile('.codex-warning-layer-check.png', Buffer.from(layerScreenshot.data, 'base64'));

await clickElement(`document.querySelector('[data-warning-level]')`);
await delay(500);

const detailState = await evaluate(`(() => {
  const modal = document.querySelector('[data-warning-detail]');
  if (!modal) return null;
  const panel = modal.firstElementChild;
  const panelBounds = panel.getBoundingClientRect();
  const text = modal.innerText.replace(/\\s+/g, ' ').trim();
  const requiredFields = [
    '单号',
    '超时情况',
    '工单状态',
    '工单类型',
    '计量设施名称',
    '计量设施编码',
    '最新告警时间',
    '告警内容',
    '工单处置时间',
    '运维单位',
    '运维人员',
    '联系电话',
    '处理附件',
    '产生告警原因',
    '处理情况',
  ];
  return {
    text,
    missingFields: requiredFields.filter(field => !text.includes(field)),
    panelWidth: Math.round(panelBounds.width),
    panelHeight: Math.round(panelBounds.height),
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    bodyOverflow: panel.scrollHeight > panel.clientHeight,
  };
})()`);

const detailScreenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await fs.writeFile('.codex-warning-detail-check.png', Buffer.from(detailScreenshot.data, 'base64'));

await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await delay(500);

const mobileState = await evaluate(`(() => {
  const modal = document.querySelector('[data-warning-detail]');
  if (!modal) return null;
  const panel = modal.firstElementChild;
  const panelBounds = panel.getBoundingClientRect();
  const overflowingElements = [...panel.querySelectorAll('*')]
    .map(element => {
      const bounds = element.getBoundingClientRect();
      return {
        tag: element.tagName,
        text: element.textContent?.trim().replace(/\\s+/g, ' ').slice(0, 40) || '',
        right: Math.round(bounds.right),
        left: Math.round(bounds.left),
        width: Math.round(bounds.width),
      };
    })
    .filter(item => item.width > 0 && (item.right > panelBounds.right + 1 || item.left < panelBounds.left - 1))
    .slice(0, 12);
  return {
    panelWidth: Math.round(panelBounds.width),
    panelHeight: Math.round(panelBounds.height),
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    horizontalOverflow: panel.scrollWidth > panel.clientWidth,
    overflowingElements,
  };
})()`);

const mobileScreenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await fs.writeFile('.codex-warning-detail-mobile-check.png', Buffer.from(mobileScreenshot.data, 'base64'));

console.log(JSON.stringify({ layerState, modalAfterHover, detailState, mobileState }, null, 2));
socket.close();
