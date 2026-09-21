import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sri Shivasankalpa')
    .items([
      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('mediaItem').title('Photos & videos'),
      S.divider(),
      S.documentTypeListItem('tag').title('Tags'),
    ]);
