// Загружается только проверочным скриптом через --require. В приложении не используется.
globalThis.fetch = async function mockBitrixFetch(url, options) {
  const target = new URL(String(url));
  if (target.hostname !== 'bitrix.local.invalid' || target.pathname !== '/rest/1/local-test/crm.lead.add.json') {
    throw new Error('Внешние запросы в этой проверке запрещены');
  }
  const payload = JSON.parse(options.body);
  if (!payload.fields.NAME || !payload.fields.PHONE?.[0]?.VALUE || !payload.fields.COMMENTS.includes('Согласие')) {
    return new Response(JSON.stringify({ error: 'INVALID_FIELDS' }));
  }
  if (payload.fields.COMMENTS.includes('TEST_CRM_ERROR')) {
    return new Response(JSON.stringify({ error: 'ACCESS_DENIED' }));
  }
  return new Response(JSON.stringify({ result: 123 }));
};
