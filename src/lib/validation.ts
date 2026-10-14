export type Lead = { name: string; phone: string; comment: string; consent: true };
export type FieldErrors = Partial<Record<'name' | 'phone' | 'comment' | 'consent', string>>;
export function normalizePhone(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 10) digits = '7' + digits;
  if (digits.length === 11 && digits.startsWith('8')) digits = '7' + digits.slice(1);
  return '+' + digits;
}
export function validateLead(value: unknown): { data?: Lead; errors: FieldErrors } {
  const v = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const name = typeof v.name === 'string' ? v.name.trim() : '';
  const phone = typeof v.phone === 'string' ? normalizePhone(v.phone) : '';
  const comment = typeof v.comment === 'string' ? v.comment.trim() : '';
  const errors: FieldErrors = {};
  if (name.length < 2 || name.length > 80 || /[<>\x00-\x1f]/.test(name)) errors.name = 'Введите имя: от 2 до 80 символов.';
  if (!/^\+7[0-9]{10}$/.test(phone)) errors.phone = 'Введите российский номер: +7 и ещё 10 цифр.';
  if (comment.length > 2000 || (v.comment !== undefined && typeof v.comment !== 'string')) errors.comment = 'Комментарий должен содержать не более 2000 символов.';
  if (v.consent !== true) errors.consent = 'Для отправки необходимо ваше согласие.';
  return Object.keys(errors).length ? { errors } : { errors, data: { name, phone, comment, consent: true } };
}
