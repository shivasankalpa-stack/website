import { type SchemaTypeDefinition } from 'sanity';
import { activity } from './activity';
import { event } from './event';
import { localeString } from './localeString';
import { localeText } from './localeText';
import { mediaItem } from './mediaItem';
import { tag } from './tag';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [localeString, localeText, tag, event, activity, mediaItem],
};
