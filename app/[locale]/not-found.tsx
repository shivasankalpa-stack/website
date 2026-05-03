/**
 * 404 — tasteful "page not found" with a shloka and a way home.
 */

import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { ShlokaBlock } from '@/components/ui/ShlokaBlock';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default async function NotFound() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations('notFound');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center space-y-8">
      <div className="space-y-4">
        <p className="text-7xl font-serif font-bold text-indigo-100">{t('code')}</p>
        <h1 className="font-serif text-2xl font-semibold text-indigo">{t('title')}</h1>
        <p className="text-charcoal-300 max-w-sm mx-auto">{t('description')}</p>
      </div>

      <ShlokaBlock
        devanagari="तमेव शरणं गच्छ सर्वभावेन भारत"
        iast="Tameva śaraṇaṁ gaccha sarvabhāvena Bhārata"
        translation={t('shlokaTranslation')}
        source="Bhagavad Gītā 18.62"
        size="sm"
      />

      <Link href="/">
        <Button variant="primary">
          <Home size={16} />
          {t('returnHome')}
        </Button>
      </Link>
    </div>
  );
}
