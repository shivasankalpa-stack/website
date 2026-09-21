import { defineField, defineType } from 'sanity';

/** Longer bilingual text (descriptions). */
export const localeText = defineType({
  name: 'localeText',
  title: 'English + Kannada (long text)',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kn',
      title: 'ಕನ್ನಡ (Kannada)',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
});
