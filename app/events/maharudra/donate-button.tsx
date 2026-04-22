/**
 * MaharudraDonateButton — opens the donation modal directly
 * instead of navigating to /donations.
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { DonationDetails } from '@/components/blocks/DonationDetails';

export function MaharudraDonateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" size="lg" onClick={() => setOpen(true)}>
        Donate for Maharudra Seva
      </Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Donate — Maharudra Purascharana Seva"
      >
        <DonationDetails purposeLabel="Maharudra Seva" />
      </Modal>
    </>
  );
}
