export const eventAlbumsQuery = `*[_type == "event" && defined(album) && count(album) > 0]{
  "slug": slug.current,
  "title": title,
  album[]{
    _key,
    caption,
    alt,
    image
  }
}`

export const mediaItemsQuery = `*[_type == "mediaItem"] | order(_createdAt desc){
  _id,
  mediaType,
  caption,
  alt,
  image,
  videoUrl,
  "eventSlug": event->slug.current,
  "tags": tags[]->slug.current
}`
