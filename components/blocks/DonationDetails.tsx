/**
 * DonationDetails — shared payment details panel used inside donation modals.
 *
 * Shows UPI ID, QR code, and bank transfer details.
 * TODO: Replace with actual trust account details once available.
 * Current details are for interim collection via Jayasimha B N.
 */

import Image from 'next/image';

interface DonationDetailsProps {
  purposeLabel?: string;
}

export function DonationDetails({ purposeLabel }: DonationDetailsProps) {
  return (
    <div className="space-y-5">
      {/* UPI */}
      <div className="space-y-1.5">
        <h4 className="text-sm font-semibold text-charcoal">UPI ID</h4>
        <div className="rounded-md bg-ivory-100 px-3 py-2 font-mono text-sm text-charcoal select-all">
          9916104901-2@ybl
        </div>
      </div>

      {/* QR Code */}
      <div className="space-y-1.5">
        <h4 className="text-sm font-semibold text-charcoal">Scan to Pay</h4>
        <div className="flex justify-center rounded-md border border-ivory-300 bg-ivory-100 p-3">
          <Image
            src="/assets/artefacts/donation-qr.png"
            alt="UPI QR Code for donations"
            width={200}
            height={200}
            className="w-40 h-40 object-contain"
          />
        </div>
      </div>

      {/* Bank Details */}
      <div className="space-y-1.5">
        <h4 className="text-sm font-semibold text-charcoal">Bank Transfer</h4>
        <div className="rounded-md bg-ivory-100 px-3 py-2.5 text-sm space-y-1.5">
          <p className="text-charcoal-300">
            Beneficiary: <span className="font-medium text-charcoal">Jayasimha B N</span>
          </p>
          <p className="text-charcoal-300">
            A/c No: <span className="font-mono text-charcoal select-all">T101T0100T01659</span>
          </p>
          <p className="text-charcoal-300">
            A/c Type: <span className="text-charcoal">Savings Bank</span>
          </p>
          <p className="text-charcoal-300">
            IFSC: <span className="font-mono text-charcoal select-all">SECB0000010</span>
          </p>
          <p className="text-charcoal-300">
            Bank: <span className="text-charcoal">Sree Charan Bank, Shankarapuram Branch</span>
          </p>
        </div>
      </div>

      <p className="text-xs text-charcoal-200 italic leading-relaxed">
        Please mention {purposeLabel ? `"${purposeLabel}"` : 'the purpose'} and
        your name in the UPI/bank transfer note so we can issue your receipt.
      </p>
    </div>
  );
}
