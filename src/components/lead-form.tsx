'use client';
import { useEffect, useRef, useState } from 'react';
import { validateLead, type FieldErrors } from '@/lib/validation';
import { Arrow, Check } from './icons';

function formatPhone(value: string) {
  let d = value.replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('7') || d.startsWith('8')) d = d.slice(1);
  d = d.slice(0, 10);
  return '+7' + (d.length ? ' (' + d.slice(0, 3) : '') + (d.length >= 3 ? ') ' : '') + d.slice(3, 6) + (d.length > 6 ? '-' + d.slice(6, 8) : '') + (d.length > 8 ? '-' + d.slice(8, 10) : '');
}
export function LeadForm() {
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const started = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => { started.current = Date.now(); }, []);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === 'loading') return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const payload = { name: values.get('name'), phone, comment: values.get('comment'), consent: values.get('consent') === 'on' };
    const validation = validateLead(payload);
    setErrors(validation.errors); setMessage(''); setState('idle');
    if (!validation.data) { const key = Object.keys(validation.errors)[0]; (form.elements.namedItem(key) as HTMLElement)?.focus(); return; }
    setState('loading');
    try {
      const response = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...validation.data, website: values.get('website'), startedAt: started.current }), signal: AbortSignal.timeout(20000) });
      const result = await response.json();
      if (!response.ok) { setState('error'); setErrors(result.errors || {}); setMessage(result.message || 'Не удалось отправить заявку. Попробуйте позднее.'); return; }
      setState('success'); setMessage(result.message); form.reset(); setPhone('');
    } catch { setState('error'); setMessage('Не удалось подтвердить отправку. Проверьте соединение. Если заявка уже поступила, специалист свяжется с вами.'); }
  }
  if (state === 'success') return <div className="form-success" role="status"><span className="success-check"><Check /></span><h3>Первый шаг сделан</h3><p>{message}</p><button className="text-link" onClick={() => { setState('idle'); setMessage(''); started.current = Date.now(); }}>Отправить ещё одну заявку <Arrow /></button></div>;
  return <form ref={formRef} onSubmit={submit} noValidate aria-busy={state === 'loading'}>
    <div className="form-row"><div className="field"><label htmlFor="name">Ваше имя <span aria-hidden="true">*</span></label><input id="name" name="name" autoComplete="given-name" placeholder="Как к вам обращаться" required minLength={2} maxLength={80} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <p className="field-error" id="name-error">{errors.name}</p>}</div>
    <div className="field"><label htmlFor="phone">Телефон <span aria-hidden="true">*</span></label><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (999) 123-45-67" required maxLength={32} value={phone} onChange={e => setPhone(e.target.value)} onBlur={() => { if (validateLead({ name: 'Проверка', phone, consent: true }).data) setPhone(formatPhone(phone)); }} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'} /><span id="phone-hint" className="sr-only">Российский номер, 11 цифр, начинается с +7 или 8.</span>{errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}</div></div>
    <div className="field"><label htmlFor="comment">Расскажите о вашей задаче <span className="optional">необязательно</span></label><textarea id="comment" name="comment" rows={3} maxLength={2000} placeholder="Например: ищу коляску для города, нужна помощь с замерами" aria-invalid={!!errors.comment} aria-describedby="comment-hint" /><p className="field-hint" id="comment-hint">Медицинские сведения и документы здесь не нужны.</p>{errors.comment && <p className="field-error">{errors.comment}</p>}</div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Ваш сайт</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
    <label className="consent"><input name="consent" type="checkbox" required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} /><span>Я согласен на <a href="/privacy#consent" target="_blank" rel="noopener">обработку персональных данных</a> и ознакомлен с <a href="/privacy" target="_blank" rel="noopener">политикой конфиденциальности</a>.</span></label>
    {errors.consent && <p className="field-error" id="consent-error">{errors.consent}</p>}
    <button type="submit" disabled={state === 'loading'} className="button submit-button">{state === 'loading' ? 'Отправляем заявку…' : 'Отправить заявку'}{state !== 'loading' && <Arrow />}</button>
    <p className="form-note">Подбор бесплатный. Поля со звёздочкой обязательны.</p>
    {message && <div className="form-message" role="alert">{message}</div>}
  </form>;
}
