/**
 * DonationDetails — shared payment details panel used inside donation modals.
 *
 * Shows UPI ID, QR code, and bank transfer details.
 * TODO: Replace with actual trust account details once available.
 * Current details are for interim collection via Jayasimha B N.
 */

'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface DonationDetailsProps {
  purposeLabel?: string;
}

export function DonationDetails({ purposeLabel }: DonationDetailsProps) {
  const t = useTranslations('donation');

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <h4 className="text-sm font-semibold text-charcoal">{t('upiId')}</h4>
        <div className="rounded-md bg-ivory-100 px-3 py-2 font-mono text-sm text-charcoal select-all">
          9916104901-2@ybl
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-sm font-semibold text-charcoal">{t('scanToPay')}</h4>
        <div className="flex justify-center rounded-md border border-ivory-300 bg-ivory-100 p-3">
          <Image
            src="/assets/artefacts/donation-qr.png"
            alt={t('qrAlt')}
            width={200}
            height={200}
            className="w-40 h-40 object-contain"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <h4 className="text-sm font-semibold text-charcoal">{t('bankTransfer')}</h4>
        <div className="rounded-md bg-ivory-100 px-3 py-2.5 text-sm space-y-1.5">
          <p className="text-charcoal-300">
            {t('beneficiary')} <span className="font-medium text-charcoal">Jayasimha B N</span>
          </p>
          <p className="text-charcoal-300">
            {t('accountNo')}{' '}
            <span className="font-mono text-charcoal select-all">0101001000001659</span>
          </p>
          <p className="text-charcoal-300">
            {t('accountType')} <span className="text-charcoal">{t('savingsBank')}</span>
          </p>
          <p className="text-charcoal-300">
            {t('ifsc')} <span className="font-mono text-charcoal select-all">SECB0000010</span>
          </p>
          <p className="text-charcoal-300">
            {t('bank')} <span className="text-charcoal">{t('bankName')}</span>
          </p>
        </div>
      </div>

      <p className="text-xs text-charcoal-200 italic leading-relaxed">
        {purposeLabel
          ? t('receiptNote', { purpose: purposeLabel })
          : t('receiptNoteGeneric')}
      </p>
    </div>
  );
}
