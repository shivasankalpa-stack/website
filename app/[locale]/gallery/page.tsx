import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getGalleryItems } from '@/lib/data-access';
import { GalleryGrid } from './grid';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('galleryTitle'),
    description: t('galleryDescription'),
  };
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('gallery');
  const items = getGalleryItems();

  const captions = items.map((_, i) => t(`c${i}` as Parameters<typeof t>[0]));
  const tabLabels = {
    all: t('tabAll'),
    gurukulas: t('tabGurukulas'),
    events: t('tabEvents'),
    misc: t('tabMisc'),
  };

  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6 space-y-10">
        <SectionHeading
          title={t('title')}
          subtitle={t('subtitle')}
          centered
        />

        <GalleryGrid items={items} captions={captions} tabLabels={tabLabels} noItemsText={t('noItems')} />
      </div>
    </div>
  );
}
