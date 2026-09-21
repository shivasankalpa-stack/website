import { defineField, defineType } from 'sanity';

const youtubeOrVimeo =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|vimeo\.com\/)[\w-]+/i;

export const mediaItem = defineType({
  name: 'mediaItem',
  title: 'Photo or video',
  type: 'document',
  fields: [
    defineField({
      name: 'event',
      title: 'Event',
      type: 'reference',
      to: [{ type: 'event' }],
      description: 'Which event this photo or video belongs to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mediaType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Photo', value: 'image' },
          { title: 'Video (YouTube or Vimeo link)', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType === 'image' && !value) {
            return 'Upload a photo';
          }
          return true;
        }),
    }),
    defineField({
      name: 'videoUrl',
      title: 'YouTube or Vimeo URL',
      type: 'url',
      description:
        'Upload the video as Unlisted on YouTube (not Private), then paste the link here. Do not upload the video file to Studio.',
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType !== 'video') return true;
          if (!value) return 'Paste a YouTube or Vimeo link';
          if (!youtubeOrVimeo.test(value)) {
            return 'Use a youtube.com, youtu.be, or vimeo.com link';
          }
          return true;
        }),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text (for screen readers)',
      type: 'localeString',
      description: 'Describe the image or video in one short sentence.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),
  ],
  preview: {
    select: {
      caption: 'caption.en',
      mediaType: 'mediaType',
      media: 'image',
      eventTitle: 'event.title.en',
    },
    prepare: ({ caption, mediaType, media, eventTitle }) => ({
      title: caption || 'Untitled media',
      subtitle: [mediaType === 'video' ? 'Video' : 'Photo', eventTitle]
        .filter(Boolean)
        .join(' · '),
      media,
    }),
  },
});
