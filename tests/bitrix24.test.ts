import test from 'node:test';
import assert from 'node:assert/strict';
import { createBitrixLead, IntegrationError } from '../src/lib/bitrix24.ts';
const lead = { name: 'Тест', phone: '+79990000000', comment: '<пример>', consent: true as const };
test('интеграция: отсутствие настройки, подтверждённый лид, сбои CRM', async () => {
  const fetchBefore = globalThis.fetch;
  const webhookBefore = process.env.BITRIX24_WEBHOOK_URL;
  try {
    delete process.env.BITRIX24_WEBHOOK_URL;
    await assert.rejects(() => createBitrixLead(lead), (e: unknown) => e instanceof IntegrationError && e.kind === 'unconfigured');
    process.env.BITRIX24_WEBHOOK_URL = 'https://crm.example.test/rest/1/test/';
    let calls = 0;
    globalThis.fetch = async (url, options) => {
      calls++;
      assert.equal(String(url), 'https://crm.example.test/rest/1/test/crm.lead.add.json');
      const body = JSON.parse(options!.body as string);
      assert.equal(body.fields.PHONE[0].VALUE, lead.phone);
      assert.ok(!body.fields.COMMENTS.includes('<'));
      assert.match(body.fields.COMMENTS, /Согласие/);
      return new Response(JSON.stringify({ result: 123 }), { status: 200 });
    };
    assert.equal(await createBitrixLead(lead), 123);
    assert.equal(calls, 1);
    for (const body of [{ error: 'ACCESS_DENIED' }, { result: 0 }, { result: '123' }, {}]) {
      globalThis.fetch = async () => new Response(JSON.stringify(body));
      await assert.rejects(() => createBitrixLead(lead), (e: unknown) => e instanceof IntegrationError && e.kind === 'upstream');
    }
    globalThis.fetch = async () => { throw new DOMException('timeout', 'TimeoutError'); };
    await assert.rejects(() => createBitrixLead(lead), (e: unknown) => e instanceof IntegrationError && e.kind === 'timeout');
  } finally {
    globalThis.fetch = fetchBefore;
    if (webhookBefore === undefined) delete process.env.BITRIX24_WEBHOOK_URL;
    else process.env.BITRIX24_WEBHOOK_URL = webhookBefore;
  }
});
