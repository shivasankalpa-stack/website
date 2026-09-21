import { defineArrayMember, defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fieldsets: [
    {
      name: 'optionalExtras',
      title: 'Schedule & seva (optional — only for fundraising events)',
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Event name',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description:
        'Must match the website URL. For Mahā Rudra type maharudra (do not use the auto-generated Sanskrit slug).',
      options: { source: 'title.en', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      description: 'Leave empty for a one-day event.',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'localeString',
    }),
    defineField({
      name: 'description',
      title: 'Short description',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'album',
      title: 'Photo album',
      description:
        'Photos added here appear on the event page and in Gallery → Maharudra. Prefer this over creating one document per photo.',
      type: 'array',
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
            defineField({
              name: 'alt',
              title: 'Alt text (optional)',
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
      name: 'featured',
      title: 'Show on homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'sevaItems',
      title: 'Seva list',
      type: 'array',
      fieldset: 'optionalExtras',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Seva name',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'amount',
              title: 'Amount (₹)',
              type: 'number',
              validation: (Rule) => Rule.required().positive(),
            }),
          ],
          preview: {
            select: { en: 'name.en', amount: 'amount' },
            prepare: ({ en, amount }) => ({
              title: en || 'Seva',
              subtitle: amount ? `₹${amount}` : undefined,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'array',
      fieldset: 'optionalExtras',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'date', title: 'Date', type: 'date' }),
            defineField({
              name: 'dayLabel',
              title: 'Day label',
              type: 'localeString',
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'time',
                      title: 'Time',
                      type: 'string',
                    }),
                    defineField({
                      name: 'description',
                      title: 'Description',
                      type: 'localeText',
                    }),
                  ],
                  preview: {
                    select: { time: 'time', en: 'description.en' },
                    prepare: ({ time, en }) => ({
                      title: time || 'Time TBA',
                      subtitle: en,
                    }),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { date: 'date', en: 'dayLabel.en' },
            prepare: ({ date, en }) => ({
              title: en || date || 'Day',
              subtitle: date,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      en: 'title.en',
      kn: 'title.kn',
      date: 'startDate',
      media: 'heroImage',
    },
    prepare: ({ en, kn, date, media }) => ({
      title: en || 'Untitled event',
      subtitle: [date, kn].filter(Boolean).join(' · '),
      media,
    }),
  },
  orderings: [
    {
      title: 'Start date (newest)',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
});
