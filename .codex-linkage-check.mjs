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
  await delay(400);
}

async function snapshot() {
  return evaluate(`(() => {
    const aside = document.querySelector('main > aside.relative.z-20');
    const chart = document.querySelector('svg[aria-label*="当前行政区划下级管理单位"]');
    const firstCard = aside?.querySelector(':scope > .spec-card');
    const summaryGrid = firstCard?.querySelector('.grid.grid-cols-5');
    return {
      summary: summaryGrid?.innerText.replace(/\\s+/g, ' ').trim() || '',
      chartGroupCount: chart ? chart.querySelectorAll('g[data-chart-group]').length : 0,
      chartRectCount: chart ? chart.querySelectorAll('rect').length : 0,
      chartLabel: chart?.getAttribute('aria-label') || '',
      yearCards: firstCard ? [...firstCard.querySelectorAll('.grid.grid-cols-4 > div')].map(item => item.innerText.replace(/\\s+/g, ' ').trim()) : [],
      footer: firstCard?.innerText.match(/设施正常率：.*?统计范围：.*?管理单位/)?.[0] || '',
      asideClientHeight: aside?.clientHeight || 0,
      asideScrollHeight: aside?.scrollHeight || 0,
    };
  })()`);
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

const city = await snapshot();
const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
await fs.writeFile('.codex-linkage-check.png', Buffer.from(screenshot.data, 'base64'));

await clickElement(`[...document.querySelectorAll('button')].find(item =>
  item.innerText.replace(/\\s+/g, '').trim() === '城东'
)`);
const district = await snapshot();

console.log(JSON.stringify({ city, district }, null, 2));
socket.close();
