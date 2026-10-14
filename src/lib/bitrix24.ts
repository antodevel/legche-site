import 'server-only';
import type { Lead } from './validation';

export class IntegrationError extends Error {
  kind: 'unconfigured' | 'upstream' | 'timeout';
  constructor(kind: 'unconfigured' | 'upstream' | 'timeout') { super(kind); this.kind = kind; }
}

export async function createBitrixLead(lead: Lead): Promise<number> {
  const raw = process.env.BITRIX24_WEBHOOK_URL;
  if (!raw) throw new IntegrationError('unconfigured');
  let base: URL;
  try { base = new URL(raw.endsWith('/') ? raw : raw + '/'); } catch { throw new IntegrationError('unconfigured'); }
  if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash || !/^\/rest\/\d+\/[a-zA-Z0-9_-]+\/$/.test(base.pathname)) throw new IntegrationError('unconfigured');
  const assigned = process.env.BITRIX24_ASSIGNED_BY_ID;
  if (assigned && !/^[1-9]\d*$/.test(assigned)) throw new IntegrationError('unconfigured');
  const timeout = Math.min(30000, Math.max(1000, Number(process.env.BITRIX24_TIMEOUT_MS) || 10000));
  try {
    const response = await fetch(new URL('crm.lead.add.json', base), {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, cache: 'no-store', redirect: 'error',
      signal: AbortSignal.timeout(timeout),
      body: JSON.stringify({ fields: {
        TITLE: 'Легче — заявка на бесплатный подбор', NAME: lead.name,
        PHONE: [{ VALUE: lead.phone, VALUE_TYPE: 'MOBILE' }],
        COMMENTS: [lead.comment.replace(/[<>]/g, ''), 'Согласие на обработку данных получено: ' + new Date().toISOString(), 'Версия согласия: 2026-10-14'].filter(Boolean).join('\n\n'),
        SOURCE_ID: process.env.BITRIX24_SOURCE_ID || 'WEB',
        ...(assigned ? { ASSIGNED_BY_ID: Number(assigned) } : {}),
      }, params: { REGISTER_SONET_EVENT: 'Y' } }),
    });
    if (!response.ok) throw new IntegrationError('upstream');
    const result = await response.json();
    if (result.error || !Number.isSafeInteger(result.result) || result.result <= 0) throw new IntegrationError('upstream');
    return result.result;
  } catch (error) {
    if (error instanceof IntegrationError) throw error;
    if (error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name)) throw new IntegrationError('timeout');
    throw new IntegrationError('upstream');
  }
}
