import test from 'node:test';
import assert from 'node:assert/strict';
import { validateLead, normalizePhone } from '../src/lib/validation.ts';
import { allowRequest } from '../src/lib/rate-limit.ts';
test('нормализация российского телефона', () => {
  for (const phone of ['8 (999) 123-45-67', '+7 999 123 45 67', '9991234567']) assert.equal(normalizePhone(phone), '+79991234567');
});
test('сервер отклоняет пустые, неверные и слишком длинные данные', () => {
  for (const value of [null, {}, { name: 'А', phone: '+79991234567', consent: true }, { name: 'Антон', phone: '+7999', consent: true }, { name: 'Антон', phone: '+79991234567', consent: false }, { name: 'Антон', phone: '+79991234567', consent: 'true' }, { name: 'Антон', phone: '+79991234567', consent: true, comment: 'a'.repeat(2001) }]) assert.equal(validateLead(value).data, undefined);
});
test('допускает отсутствие медицинских данных и комментария', () => {
  assert.deepEqual(validateLead({ name: ' Антон ', phone: '89991234567', consent: true }).data, { name: 'Антон', phone: '+79991234567', comment: '', consent: true });
});
test('лимитер ограничивает запросы и освобождает окно', () => {
  for (let i = 0; i < 5; i++) assert.equal(allowRequest('test', 1000), true);
  assert.equal(allowRequest('test', 1000), false);
  assert.equal(allowRequest('test', 601001), true);
});
