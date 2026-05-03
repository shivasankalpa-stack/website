/**
 * ContactForm — client component with validation and success state.
 *
 * v0.1: No backend delivery. Shows success UI on submit.
 * TODO v0.15: Wire to Resend or Formspree → deliver to info@shivasankalpa.org
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CheckCircle } from 'lucide-react';

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

const CONTACT_EMAIL = 'info@shivasankalpa.org';

export function ContactForm() {
  const t = useTranslations('contactForm');
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  function handleChange(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  if (submitted) {
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
            setSubmitted(false);
            setData({ name: '', email: '', subject: '', message: '' });
          }}
        >
          {t('sendAnother')}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Input
        label={t('nameLabel')}
        placeholder={t('namePlaceholder')}
        value={data.name}
        onChange={(e) => handleChange('name', e.target.value)}
        error={errors.name}
        required
      />
      <Input
        label={t('emailLabel')}
        type="email"
        placeholder={t('emailPlaceholder')}
        value={data.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
        required
      />
      <Input
        label={t('subjectLabel')}
        placeholder={t('subjectPlaceholder')}
        value={data.subject}
        onChange={(e) => handleChange('subject', e.target.value)}
        error={errors.subject}
        required
      />
      <Textarea
        label={t('messageLabel')}
        placeholder={t('messagePlaceholder')}
        value={data.message}
        onChange={(e) => handleChange('message', e.target.value)}
        error={errors.message}
        required
      />
      <Button type="submit" className="w-full">
        {t('sendMessage')}
      </Button>
    </form>
  );
}
