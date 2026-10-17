/**
 * YouTube helpers.
 *
 * Long recordings (e.g. a 30-minute sabhā) live on the Shivasankalpa Vrunda
 * YouTube channel, not in `/public` or Sanity. Pages only ever store the
 * video ID and embed it via `<YouTubeEmbed>`.
 */

const YOUTUBE_ID_RE =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i;

/** Extract the 11-character video ID from any common YouTube URL form. */
export function getYouTubeId(url: string | undefined | null): string | null {
  if (!url) return null;
  const match = url.match(YOUTUBE_ID_RE);
  return match ? match[1] : null;
}

export function youTubeThumbnail(id: string): string {
  // `hqdefault` exists for every video; `maxresdefault` does not.
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youTubeWatchUrl(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}
