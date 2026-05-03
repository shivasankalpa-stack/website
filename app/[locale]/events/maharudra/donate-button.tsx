/**
 * MaharudraDonateButton — opens the donation modal directly
 * instead of navigating to /donations.
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { DonationDetails } from '@/components/blocks/DonationDetails';

export function MaharudraDonateButton() {
  const t = useTranslations('maharudra');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
        {t('donateButton')}
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title={t('donateModalTitle')}
      >
        <DonationDetails purposeLabel={t('donatePurposeLabel')} />
      </Modal>
    </>
  );
}
