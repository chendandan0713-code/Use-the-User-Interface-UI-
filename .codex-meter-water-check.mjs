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
await delay(700);

if (await evaluate(`document.querySelectorAll('[data-meter-status]').length === 0`)) {
  await clickElement(`[...document.querySelectorAll('button')].find(item =>
    item.innerText.replace(/\\s+/g, '').trim() === '计量点'
  )`);
  await delay(700);
}

await clickElement(`document.querySelector('[data-meter-status="fault"]') || document.querySelector('[data-meter-status]')`);
await delay(450);

const detailButtonState = await evaluate(`(() => ({
  buttons: [...document.querySelectorAll('[data-meter-water-detail] button, .fixed button')]
    .filter(item => item.offsetParent !== null)
    .map(item => item.innerText.replace(/\\s+/g, ' ').trim()),
  hasRepairDispatch: document.body.innerText.includes('抢修派单'),
  hasWaterView: [...document.querySelectorAll('button')].some(item => item.innerText.trim() === '水量查看'),
}))()`);

await clickElement(`[...document.querySelectorAll('button')].find(item =>
  item.offsetParent !== null && item.innerText.trim() === '水量查看'
)`);
await delay(600);

const desktopState = await evaluate(`(() => {
  const modal = document.querySelector('[data-meter-water-detail]');
  if (!modal) return null;
  const panel = modal.firstElementChild;
  const bounds = panel.getBoundingClientRect();
  const text = modal.innerText.replace(/\\s+/g, ' ').trim();
  const required = [
    '基本信息',
    '计量设施编码',
    '计量设施名称',
    '数据来源',
    '水量统计',
    '本月计量水量',
    '本年计量水量',
    '日',
    '月',
    '季度',
    '年',
    '查询',
    '序号',
    '日期',
    '计量水量（m³）',
    '数据状态',
    '极大值、负值',
  ];
  return {
    text,
    missingFields: required.filter(field => !text.includes(field)),
    buttonCount: modal.querySelectorAll('button').length,
    panelWidth: Math.round(bounds.width),
    panelHeight: Math.round(bounds.height),
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    horizontalOverflow: [...panel.querySelectorAll('*')].some(element => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1);
    }),
  };
})()`);

const desktopScreenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await fs.writeFile('.codex-meter-water-check.png', Buffer.from(desktopScreenshot.data, 'base64'));

await send('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
});
await delay(500);

const mobileState = await evaluate(`(() => {
  const modal = document.querySelector('[data-meter-water-detail]');
  if (!modal) return null;
  const panel = modal.firstElementChild;
  const bounds = panel.getBoundingClientRect();
  return {
    panelWidth: Math.round(bounds.width),
    panelHeight: Math.round(bounds.height),
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    horizontalOverflow: [...panel.querySelectorAll('*')].some(element => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1);
    }),
  };
})()`);

const mobileScreenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await fs.writeFile('.codex-meter-water-mobile-check.png', Buffer.from(mobileScreenshot.data, 'base64'));

console.log(JSON.stringify({ detailButtonState, desktopState, mobileState }, null, 2));
socket.close();
