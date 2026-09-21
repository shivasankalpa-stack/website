import { defineField, defineType } from 'sanity';

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Click Generate after filling the English name.',
      options: { source: 'name.en', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { en: 'name.en', kn: 'name.kn' },
    prepare: ({ en, kn }) => ({
      title: en || 'Untitled tag',
      subtitle: kn,
    }),
  },
});
