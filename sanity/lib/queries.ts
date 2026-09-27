export const activitiesQuery = `*[_type == "activity"] | order(date desc){
  "slug": slug.current,
  kind,
  title,
  publicSummary,
  date,
  endDate,
  gurukula,
  gurukulas,
  representatives,
  whatWeDid,
  donations[]{
    purpose,
    amount
  },
  learnings,
  showLearnings,
  album[]{
    _key,
    caption,
    image
  }
}`

export const activityBySlugQuery = `*[_type == "activity" && slug.current == $slug][0]{
  "slug": slug.current,
  kind,
  title,
  publicSummary,
  date,
  endDate,
  gurukula,
  gurukulas,
  representatives,
  whatWeDid,
  donations[]{
    purpose,
    amount
  },
  learnings,
  showLearnings,
  album[]{
    _key,
    caption,
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

export const eventAlbumsQuery = `*[_type in ["event", "activity"] && defined(album) && count(album) > 0]{
  _type,
  "slug": slug.current,
  "title": title,
  kind,
  gurukula,
  gurukulas,
  album[]{
    _key,
    caption,
    alt,
    image
  }
}`
