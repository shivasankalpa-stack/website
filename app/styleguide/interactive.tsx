/**
 * Interactive portion of the styleguide — client component.
 *
 * Demonstrates Buttons, Modal, Tabs, Input, and Textarea
 * which all require client-side state.
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Tabs } from '@/components/ui/Tabs';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Heart, ArrowRight, Calendar } from 'lucide-react';

export function StyleguideInteractive() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ── Buttons ── */}
      <section className="space-y-6">
        <SectionHeading title="Buttons" />

        <div className="space-y-6 rounded-lg border border-ivory-300 p-6">
          {/* Primary */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-charcoal-200">
              Primary
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="md" disabled>
                Disabled
              </Button>
              <Button size="md">
                <Heart size={16} />
                With Icon
              </Button>
            </div>
          </div>

          {/* Secondary */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-charcoal-200">
              Secondary
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="secondary" size="sm">Small</Button>
              <Button variant="secondary" size="md">Medium</Button>
              <Button variant="secondary" size="lg">Large</Button>
              <Button variant="secondary" size="md" disabled>
                Disabled
              </Button>
              <Button variant="secondary" size="md">
                Learn More
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Ghost */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-charcoal-200">
              Ghost
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost" size="sm">Small</Button>
              <Button variant="ghost" size="md">Medium</Button>
              <Button variant="ghost" size="lg">Large</Button>
              <Button variant="ghost" size="md">
                <Calendar size={16} />
                View Events
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Modal ── */}
      <section className="space-y-6">
        <SectionHeading title="Modal" />

        <div className="rounded-lg border border-ivory-300 p-6">
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>

          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Donation Details"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-charcoal">UPI</h4>
                <p className="rounded-md bg-ivory-100 px-3 py-2 font-mono text-sm text-charcoal-300">
                  #UPI-TODO
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-charcoal">
                  Bank Details
                </h4>
                <div className="rounded-md bg-ivory-100 px-3 py-2 text-sm text-charcoal-300 space-y-1">
                  <p>A/c Name: <span className="font-mono">#BANK-TODO</span></p>
                  <p>A/c Number: <span className="font-mono">#BANK-TODO</span></p>
                  <p>IFSC: <span className="font-mono">#BANK-TODO</span></p>
                  <p>Branch: <span className="font-mono">#BANK-TODO</span></p>
                </div>
              </div>
              <p className="text-xs text-charcoal-200 italic">
                Please mention the purpose and your name in the UPI/bank
                transfer note so we can issue your receipt.
              </p>
            </div>
          </Modal>
        </div>
      </section>

      {/* ── Tabs ── */}
      <section className="space-y-6">
        <SectionHeading title="Tabs" />

        <div className="rounded-lg border border-ivory-300 p-6">
          <Tabs
            tabs={[
              {
                id: 'overview',
                label: 'Overview',
                content: (
                  <p className="text-sm text-charcoal-300 leading-relaxed">
                    This is the overview tab content. In the Gurukula detail
                    pages, this would contain the Gurukula&apos;s description,
                    history, and daily schedule.
                  </p>
                ),
              },
              {
                id: 'adhyapakas',
                label: 'Adhyāpakas',
                content: (
                  <p className="text-sm text-charcoal-300 leading-relaxed">
                    Adhyāpakas (teachers) tab — would list the Ācāryas and
                    their qualifications.
                  </p>
                ),
              },
              {
                id: 'students',
                label: 'Vidyārthīs',
                content: (
                  <p className="text-sm text-charcoal-300 leading-relaxed">
                    A summary of students — numbers, levels of study, shakhas
                    being learned. No personally identifiable information.
                  </p>
                ),
              },
              {
                id: 'events',
                label: 'Events',
                content: (
                  <p className="text-sm text-charcoal-300 leading-relaxed">
                    Upcoming and past events at this Gurukula.
                  </p>
                ),
              },
              {
                id: 'contact',
                label: 'Contact',
                content: (
                  <p className="text-sm text-charcoal-300 leading-relaxed">
                    Contact details for the Gurukula — address, phone, email.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {/* ── Form Inputs ── */}
      <section className="space-y-6">
        <SectionHeading title="Form Inputs" />

        <div className="max-w-md space-y-4 rounded-lg border border-ivory-300 p-6">
          <Input
            label="Full Name"
            placeholder="e.g. Anantanarayana Sharma"
          />
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
          />
          <Input
            label="With Error"
            placeholder="This field has an error"
            error="This field is required."
          />
          <Textarea
            label="Message"
            placeholder="Write your message here..."
          />
        </div>
      </section>
    </>
  );
}
