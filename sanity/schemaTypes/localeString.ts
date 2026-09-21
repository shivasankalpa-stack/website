import { defineField, defineType } from 'sanity';

/** Short bilingual string (titles, captions, tags). */
export const localeString = defineType({
  name: 'localeString',
  title: 'English + Kannada',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kn',
      title: 'ಕನ್ನಡ (Kannada)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
});
