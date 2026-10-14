import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'node:crypto';
import { validateLead } from '@/lib/validation';
import { createBitrixLead, IntegrationError } from '@/lib/bitrix24';
import { allowRequest } from '@/lib/rate-limit';

export const runtime = 'nodejs';
const reply = (body: object, status: number) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const expected = process.env.SITE_ORIGIN || (process.env.NODE_ENV !== 'production' ? request.nextUrl.origin : '');
  if (!expected || origin !== expected) return reply({ message: 'Отправьте заявку с формы на сайте.' }, 403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return reply({ message: 'Неверный формат запроса.' }, 415);
  const ip = process.env.TRUST_PROXY === 'true' ? request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown' : 'single-process';
  if (!allowRequest(createHash('sha256').update(ip).digest('hex'))) return reply({ message: 'Слишком много попыток. Попробуйте через 10 минут.' }, 429);
  let value: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply({ message: 'Пустой запрос.' }, 400);
    const chunks: Uint8Array[] = []; let total = 0;
    while (true) { const { done, value: chunk } = await reader.read(); if (done) break; total += chunk.length; if (total > 16384) { await reader.cancel(); return reply({ message: 'Заявка слишком большая.' }, 413); } chunks.push(chunk); }
    value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
  } catch { return reply({ message: 'Не удалось прочитать заявку.' }, 400); }
  if (typeof value.website !== 'string' || value.website !== '' || typeof value.startedAt !== 'number' || !Number.isFinite(value.startedAt) || Date.now() - value.startedAt < 2000 || Date.now() - value.startedAt > 86400000) return reply({ message: 'Обновите страницу и заполните форму ещё раз.' }, 400);
  const { data, errors } = validateLead(value);
  if (!data) return reply({ message: 'Проверьте заполнение полей.', errors }, 422);
  if (!process.env.DATA_OPERATOR_NAME || !process.env.DATA_OPERATOR_ADDRESS || !process.env.DATA_OPERATOR_EMAIL) return reply({ message: 'Приём заявок пока не подключён. Ваша заявка не отправлена. Попробуйте позднее.' }, 503);
  try {
    await createBitrixLead(data);
    return reply({ message: 'Заявка отправлена. Мы свяжемся с вами для подбора коляски.' }, 200);
  } catch (error) {
    if (error instanceof IntegrationError && error.kind === 'unconfigured') return reply({ message: 'Приём заявок пока не подключён. Ваша заявка не отправлена. Попробуйте позднее.' }, 503);
    return reply({ message: 'Не удалось подтвердить отправку. Попробуйте позднее. Если заявка уже поступила, специалист свяжется с вами.' }, 502);
  }
}
