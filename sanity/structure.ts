import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sri Shivasankalpa')
    .items([
      S.documentTypeListItem('activity').title('Activities'),
      S.documentTypeListItem('event').title('Events (major)'),
      S.documentTypeListItem('mediaItem').title('Photos & videos'),
      S.divider(),
      S.documentTypeListItem('tag').title('Tags'),
    ]);
