import { defineArrayMember, defineField, defineType } from 'sanity';

const GURUKULAS = [
  { title: 'Sri Shruti Parampara Gurukulam', value: 'shruti-parampara' },
  { title: 'Namma Sampradaya Gurukulam', value: 'namma-sampradaya' },
  { title: 'Shankara Gurukulam', value: 'shankara-gurukulam' },
  {
    title: 'Sri Ramana Maharṣi Brahma Vidyāśrama',
    value: 'sri-ramana-brahma-vidyashrama',
  },
  { title: 'Mallige Pāṭhaśālā', value: 'mallige-pathashala' },
  {
    title: 'Sri Mallikarjuna Veda Vidyā Gurukula (Jyothi Pāṭhaśālā)',
    value: 'mallikarjuna-jyothi',
  },
  { title: 'Sacchidananda Advaitāśrama', value: 'sacchidananda-advaitashrama' },
  {
    title: 'Uma Madhukeshwara Veda Vidyā Gurukula',
    value: 'uma-madhukeshwara',
  },
  { title: 'Śrauta Vijñāna Gurukulam', value: 'shrauta-vijnana' },
  { title: 'Sri Veda Prakāśa Gurukula', value: 'veda-prakasha' },
  { title: 'Śrīdhara Sāṅga Veda Vidyā Gurukula', value: 'sridhara-sanga' },
  { title: 'Koodali Gurukula', value: 'koodali-gurukula' },
  { title: 'Other (name the Gurukula in the title)', value: 'other' },
];

const isVisit = (kind: string | undefined) => kind === 'gurukulaVisit';

export const activity = defineType({
  name: 'activity',
  title: 'Activity',
  type: 'document',
  fieldsets: [
    {
      name: 'visit',
      title: 'Gurukula visit (fill only what you have)',
      options: { collapsible: true, collapsed: false },
      hidden: ({ document }) => !isVisit(document?.kind as string | undefined),
    },
    {
      name: 'more',
      title: 'Add more if you have it (optional)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'kind',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Gurukula visit', value: 'gurukulaVisit' },
          { title: 'Trust / socio-legal', value: 'trustAffairs' },
          { title: 'Cultural programme', value: 'culturalProgramme' },
          { title: 'Health camp', value: 'healthCamp' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'radio',
      },
      initialValue: 'gurukulaVisit',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Short headline. Kannada can wait if you only have English.',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'kn', title: 'ಕನ್ನಡ (Kannada)', type: 'string' }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click Generate. This becomes /activities/your-slug',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      description: 'Only if the visit or programme spanned more than one day.',
    }),
    defineField({
      name: 'publicSummary',
      title: 'Public summary',
      description:
        'The one line (or short paragraph) that always appears on the Activities list. Enough on its own for a brief update.',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 3,
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'kn', title: 'ಕನ್ನಡ (Kannada)', type: 'text', rows: 3 }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gurukula',
      title: 'Gurukula',
      type: 'string',
      options: { list: GURUKULAS },
      fieldset: 'visit',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as
            | { kind?: string; gurukulas?: string[] }
            | undefined;
          const hasMany = (doc?.gurukulas ?? []).some((slug) => slug && slug !== 'other');
          if (doc?.kind === 'gurukulaVisit' && !value && !hasMany) {
            return 'Pick which Gurukula you visited, or list them under Gurukulas';
          }
          return true;
        }),
    }),
    defineField({
      name: 'gurukulas',
      title: 'Gurukulas',
      description:
        'Every pāṭhaśāla this note is about. Use this when one visit or one month of support covers more than one. Leave the single Gurukula field empty in that case.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: GURUKULAS.filter((item) => item.value !== 'other'),
      },
    }),
    defineField({
      name: 'representatives',
      title: 'Who represented the trust',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      fieldset: 'visit',
    }),
    defineField({
      name: 'whatWeDid',
      title: 'What we did / donations in narrative',
      description:
        'Headings: a line starting with #  (example: # Uma Madhukeshwara Gurukula). Sub-heading: ##. Bullets: a line starting with - and a space. Blank line between paragraphs.',
      type: 'object',
      fieldset: 'more',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 8 }),
        defineField({ name: 'kn', title: 'ಕನ್ನಡ (Kannada)', type: 'text', rows: 8 }),
      ],
    }),
    defineField({
      name: 'donations',
      title: 'Donations made (optional list)',
      description:
        'Add one item per offering so each appears as its own card. A single combined line becomes one card.',
      type: 'array',
      fieldset: 'more',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'purpose',
              title: 'Purpose',
              type: 'object',
              fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({ name: 'kn', title: 'ಕನ್ನಡ', type: 'string' }),
              ],
            }),
            defineField({
              name: 'amount',
              title: 'Amount (₹)',
              type: 'number',
            }),
          ],
          preview: {
            select: { en: 'purpose.en', amount: 'amount' },
            prepare: ({ en, amount }) => ({
              title: en || 'Donation',
              subtitle: amount ? `₹${amount}` : undefined,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'learnings',
      title: 'Notes / learnings we brought back',
      description:
        'Same marks as above: # heading, ## sub-heading, - bullet, blank line between paragraphs.',
      type: 'object',
      fieldset: 'more',
      fields: [
        defineField({ name: 'en', title: 'English', type: 'text', rows: 6 }),
        defineField({ name: 'kn', title: 'ಕನ್ನಡ (Kannada)', type: 'text', rows: 6 }),
      ],
    }),
    defineField({
      name: 'showLearnings',
      title: 'Show learnings on the website',
      type: 'boolean',
      initialValue: true,
      fieldset: 'more',
    }),
    defineField({
      name: 'album',
      title: 'Photo album',
      description: 'Skip this entirely for a one-line update.',
      type: 'array',
      fieldset: 'more',
      of: [
        defineArrayMember({
          name: 'albumPhoto',
          title: 'Photo',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption (optional)',
              type: 'object',
              fields: [
                defineField({ name: 'en', title: 'English', type: 'string' }),
                defineField({
                  name: 'kn',
                  title: 'ಕನ್ನಡ (Kannada)',
                  type: 'string',
                }),
              ],
            }),
          ],
          preview: {
            select: { en: 'caption.en', media: 'image' },
            prepare: ({ en, media }) => ({
              title: en || 'Photo',
              media,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'privateNotes',
      title: 'Private notes (never shown on the website)',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      kind: 'kind',
      date: 'date',
    },
    prepare: ({ title, kind, date }) => ({
      title: title || 'Untitled activity',
      subtitle: [kind, date].filter(Boolean).join(' · '),
    }),
  },
  orderings: [
    {
      title: 'Date (newest)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
});
