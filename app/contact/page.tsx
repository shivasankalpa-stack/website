/**
 * Contact — trust contact information and inquiry form.
 *
 * In v0.1: form submits to client-side success state only.
 * TODO v0.15: Wire to Resend or Formspree → deliver to info@shivasankalpa.org
 */

import type { Metadata } from 'next';
import { Mail, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { ContactForm } from './form';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Sri Shivasankalpa Trust — general inquiries, volunteering, and partnership opportunities.',
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl px-4 md:px-6 space-y-12">
        <SectionHeading
          title="Contact Us"
          subtitle="We welcome your questions, suggestions, and interest in our work."
          centered
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="space-y-4">
              <h3 className="font-serif text-lg font-semibold text-indigo">
                Reach Us
              </h3>

              <div className="space-y-3">
                <a
                  href="mailto:info@shivasankalpa.org"
                  className="flex items-center gap-3 text-sm text-charcoal-300 hover:text-indigo transition-colors"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo shrink-0">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">Email</p>
                    <p>info@shivasankalpa.org</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-sm text-charcoal-300">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo shrink-0">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-charcoal">Location</p>
                    <p>Bangalore, Karnataka, India</p>
                    <p className="text-xs text-charcoal-200 mt-0.5">
                      #CONTACT-TODO-full-address
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="space-y-2">
              <h3 className="font-serif text-lg font-semibold text-indigo">
                Response Time
              </h3>
              <p className="text-sm text-charcoal-300 leading-relaxed">
                We aim to respond to all inquiries within 2–3 business days.
                For urgent matters related to an upcoming event, please
                mention &ldquo;Urgent&rdquo; in the subject line.
              </p>
            </Card>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <Card>
              <h3 className="font-serif text-lg font-semibold text-indigo mb-6">
                Send a Message
              </h3>
              <ContactForm />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
