/**
 * ContactForm — client component for the public contact form.
 *
 * Submits to `/api/contact`, which validates server-side, drops spam via a
 * hidden honeypot field, applies a per-IP rate limit, and relays the message
 * to `info@shivasankalpa.org` over Hostinger SMTP.
 *
 * UX states:
 *   - idle      → form is editable
 *   - sending   → button disabled, label changes to "Sending..."
 *   - error     → inline banner above the form; input is preserved
 *   - submitted → success screen replaces the form
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type SendState = 'idle' | 'sending' | 'submitted';

const CONTACT_EMAIL = 'info@shivasankalpa.org';

export function ContactForm() {
  const t = useTranslations('contactForm');
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  // Honeypot — must remain empty. Bots fill every field; humans never see it.
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<SendState>('idle');
  const [sendError, setSendError] = useState<string | null>(null);

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = t('nameError');
    if (!data.email.trim()) {
      e.email = t('emailError');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = t('emailInvalid');
    }
    if (!data.subject.trim()) e.subject = t('subjectError');
    if (!data.message.trim()) e.message = t('messageError');
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSendError(null);
    setState('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, company: honeypot }),
      });

      if (res.ok) {
        setState('submitted');
        return;
      }

      if (res.status === 429) {
        setSendError(t('sendErrorRateLimit'));
      } else {
        setSendError(t('sendErrorGeneric', { email: CONTACT_EMAIL }));
      }
      setState('idle');
    } catch {
      setSendError(t('sendErrorGeneric', { email: CONTACT_EMAIL }));
      setState('idle');
    }
  }

  function handleChange(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  if (state === 'submitted') {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
          <CheckCircle size={28} className="text-indigo" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-indigo">{t('thankYou')}</h3>
        <p className="max-w-sm text-sm text-charcoal-300 leading-relaxed">
          {t('thankYouMessage', { email: CONTACT_EMAIL })}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setState('idle');
            setData({ name: '', email: '', subject: '', message: '' });
            setHoneypot('');
            setSendError(null);
          }}
        >
          {t('sendAnother')}
        </Button>
      </div>
    );
  }

  const sending = state === 'sending';

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {sendError && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-md border border-kumkuma/30 bg-kumkuma/5 p-3 text-sm text-kumkuma-500"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
          <p className="leading-relaxed">{sendError}</p>
        </div>
      )}

      {/* Honeypot field — hidden from real users, visible to naive bots.
          aria-hidden + tabIndex=-1 keep it out of the accessibility tree. */}
      <div
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        style={{ position: 'absolute', left: '-9999px' }}
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <Input
        label={t('nameLabel')}
        placeholder={t('namePlaceholder')}
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        disabled={sending}
        required
      />
      <Input
        label={t('emailLabel')}
        type="email"
        placeholder={t('emailPlaceholder')}
        value={data.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        disabled={sending}
        required
      />
      <Input
        label={t('subjectLabel')}
        placeholder={t('subjectPlaceholder')}
        value={data.subject}
        onChange={(e) => handleChange('subject', e.target.value)}
        error={errors.subject}
        disabled={sending}
        required
      />
      <Textarea
        label={t('messageLabel')}
        placeholder={t('messagePlaceholder')}
        value={data.message}
        onChange={(e) => handleChange('message', e.target.value)}
        error={errors.message}
        disabled={sending}
        required
      />
      <Button type="submit" className="w-full" disabled={sending}>
        {sending ? t('sending') : t('sendMessage')}
      </Button>
    </form>
  );
}
