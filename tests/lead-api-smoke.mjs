import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const port = 3107;
const origin = `http://127.0.0.1:${port}`;
const next = path.join(root, 'node_modules/next/dist/bin/next');
const fixture = path.join(root, 'tests/fixtures/bitrix-mock.cjs');

async function withServer(configured, check) {
  const child = spawn(process.execPath, ['--require', fixture, next, 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: root,
    env: { ...process.env, NODE_ENV: 'production', SITE_ORIGIN: origin,
      BITRIX24_WEBHOOK_URL: configured ? 'https://bitrix.local.invalid/rest/1/local-test/' : '',
      BITRIX24_ASSIGNED_BY_ID: '', BITRIX24_SOURCE_ID: 'WEB',
      DATA_OPERATOR_NAME: 'Тестовый оператор', DATA_OPERATOR_ADDRESS: 'Тестовый адрес', DATA_OPERATOR_EMAIL: 'test@example.invalid' },
    stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  });
  let output = '';
  child.stdout.on('data', chunk => { output += chunk; });
  child.stderr.on('data', chunk => { output += chunk; });
  const ended = new Promise(resolve => child.once('exit', resolve));
  try {
    let ready = false;
    for (let i = 0; i < 100; i++) {
      if (child.exitCode !== null) throw new Error('Тестовый сервер завершился: ' + output);
      try { ready = (await fetch(origin)).ok; } catch { /* ждём запуска */ }
      if (ready) break;
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    assert.ok(ready, 'Тестовый сервер должен запуститься');
    await check();
  } finally {
    child.kill();
    await ended;
  }
}

async function submit(comment = '') {
  return fetch(origin + '/api/lead', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify({ name: 'Тест интеграции', phone: '+79990000000', comment, consent: true, website: '', startedAt: Date.now() - 5000 }),
  });
}

await withServer(false, async () => {
  const response = await submit();
  assert.equal(response.status, 503);
  assert.match((await response.json()).message, /не отправлена/);
  console.log('OK: без webhook — честный отказ 503');
});
await withServer(true, async () => {
  const response = await submit();
  assert.equal(response.status, 200);
  assert.match((await response.json()).message, /Заявка отправлена/);
  console.log('OK: только изменение окружения — подтверждение 200, без изменения сайта');
  const failed = await submit('TEST_CRM_ERROR');
  assert.equal(failed.status, 502);
  assert.match((await failed.json()).message, /Не удалось подтвердить/);
  console.log('OK: ошибка CRM — отказ 502 вместо ложного успеха');
});
