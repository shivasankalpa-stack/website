import type { Layer } from '@/data/vedic-map';

/** Marker dot on the reading path — colour encodes the layer. */
export const LAYER_MARKER: Record<Layer, string> = {
  samhita: 'bg-indigo border-indigo',
  padapatha: 'bg-indigo-200 border-indigo-200',
  brahmana: 'bg-kumkuma border-kumkuma',
  aranyaka: 'bg-gold border-gold',
  upanishad: 'bg-indigo-300 border-indigo-300',
  pratishakhya: 'bg-ivory-50 border-kumkuma',
  shrauta: 'bg-ivory-50 border-charcoal-200',
  grhya: 'bg-ivory-50 border-charcoal-200',
  dharma: 'bg-ivory-50 border-charcoal-200',
  shulba: 'bg-ivory-50 border-charcoal-200',
  anga: 'bg-gold-100 border-gold',
};

export const LAYER_TEXT: Record<Layer, string> = {
  samhita: 'text-indigo',
  padapatha: 'text-indigo-300',
  brahmana: 'text-kumkuma',
  aranyaka: 'text-gold-400',
  upanishad: 'text-indigo-300',
  pratishakhya: 'text-kumkuma',
  shrauta: 'text-charcoal-300',
  grhya: 'text-charcoal-300',
  dharma: 'text-charcoal-300',
  shulba: 'text-charcoal-300',
  anga: 'text-gold-400',
};
