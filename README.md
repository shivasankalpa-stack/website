# Sri Shivasankalpa Trust — Website

> **तन्मे मनः शिवसङ्कल्पमस्तु**
> *May my mind be filled with auspicious resolve.*

Official website for Sri Shivasankalpa Trust, supporting Vedic education, Gurukulas, and the Guru–Shishya Parampara with the blessings of the Jagadgurus of Sringeri Sharada Peetham.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Fonts | EB Garamond (headings), Inter (body), Noto Serif Devanagari (shlokas) |
| Content (v0.1) | Local TypeScript data files in `/data/` |
| Content (v0.2) | Sanity CMS (planned — data access layer is designed for easy swap) |
| Deployment | Vercel (v0.15) → `srishivasankalpa.org` |

## Project Structure

```
app/                    # Next.js App Router pages
  about/                # About Us
  blog/                 # Blog list & [slug] detail
  contact/              # Contact form
  donations/            # Donation purposes
  events/               # Events list & maharudra detail
  faqs/                 # FAQs with accordion
  gallery/              # Photo/video gallery
  gurukulas/            # Gurukula list & [slug] drawer-detail
  styleguide/           # Internal design system reference
  layout.tsx            # Root layout (fonts, meta, header, footer, ticker)
  page.tsx              # Homepage
  not-found.tsx         # 404 page
components/
  ui/                   # Primitives: Button, Card, Modal, Tabs, Input, etc.
  layout/               # Header, Footer, Ticker
  blocks/               # AudioPlayer, VedaVruksha, DonationSection
data/                   # Local TS content files (v0.1 source)
lib/
  types.ts              # Shared TypeScript interfaces
  data-access.ts        # Data gateway (swap to Sanity here in v0.2)
public/assets/          # Images, audio, artefacts
```

## Pages (all 10 + styleguide)

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, audio, Veda Vruksha, Gurukulas, events, donations |
| `/gurukulas` | Card grid of supported Gurukulas |
| `/gurukulas/[slug]` | Drawer-style detail with tabs |
| `/events` | Events listing |
| `/events/maharudra` | Maharudra Purascharana detail |
| `/donations` | Three donation purposes with payment modal |
| `/blog` | Blog articles list |
| `/blog/[slug]` | Blog post detail |
| `/gallery` | Photo/video gallery with category tabs |
| `/about` | Trust intro, objectives, trustees, artefacts |
| `/faqs` | Frequently asked questions |
| `/contact` | Contact form (client-side success in v0.1) |
| `/styleguide` | Internal design system reference |

## Content Management (v0.1)

All content lives in `/data/*.ts` files. See `ADMIN_SOP.md` for detailed instructions on how to update content.

## Placeholder Tracking

Every placeholder in the codebase is tagged with `#TAG-TODO-<id>`. See `PLACEHOLDERS.md` for the full checklist.

## Deployment

See `DEPLOYMENT_SOP.md` for the v0.15 Vercel + Hostinger DNS deployment guide.

## License

Private — Sri Shivasankalpa Trust. All rights reserved.
