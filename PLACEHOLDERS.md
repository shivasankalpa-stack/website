# Placeholders — Pre-Launch Checklist

Every remaining placeholder in the codebase is tagged with a unique `#TAG-TODO-<id>`. Replace each one before going live.

> **Last audited:** 15 May 2026 — verified against the actual contents of `data/`, `components/`, `messages/`, and `public/assets/`.

---

## Trust-Wide

### Contact form — SMTP credentials (required before public launch)

The `/contact` form posts to `app/api/contact/route.ts`, which relays messages to `info@shivasankalpa.org` over Hostinger SMTP. The route reads its credentials from environment variables — see `.env.example` for the full contract.

Set the following in **Vercel → Project → Settings → Environment Variables** (Production + Preview):

| Key         | Value                                                 |
| ----------- | ----------------------------------------------------- |
| `SMTP_HOST` | `smtp.hostinger.com`                                  |
| `SMTP_PORT` | `465`                                                 |
| `SMTP_USER` | `info@shivasankalpa.org`                              |
| `SMTP_PASS` | (mailbox password from Hostinger control panel)       |

Optional overrides: `CONTACT_TO`, `CONTACT_FROM`, `CONTACT_FROM_NAME`, `CONTACT_SUBJECT_PREFIX`.

For local development, copy `.env.example` → `.env.local` and fill in `SMTP_PASS`. The file is gitignored.

**DNS note when cutting over `shivasankalpa.org` to Vercel:** point the website A/CNAME records to Vercel via Cloudflare DNS, but **leave the MX records pointing to Hostinger** so the mailbox keeps receiving mail.

### Donation details — INTERIM (update before public launch)

The donation details on the site are **interim/personal** (Jayasimha B N, Sree Charan Bank). Once the trust's own bank account and UPI are set up, update:

| What          | Current (interim)                   | File to update                                            |
| ------------- | ----------------------------------- | --------------------------------------------------------- |
| UPI ID        | `9916104901-2@ybl`                  | `components/blocks/DonationDetails.tsx`                   |
| QR Code       | `/assets/artefacts/donation-qr.png` | Replace image file + update path in `DonationDetails.tsx` |
| Bank A/c Name | Jayasimha B N                       | `components/blocks/DonationDetails.tsx`                   |
| Bank A/c No   | 0101001000001659                    | `components/blocks/DonationDetails.tsx`                   |
| Bank IFSC     | SECB0000010                         | `components/blocks/DonationDetails.tsx`                   |
| Bank/Branch   | Sree Charan Bank, Shankarapuram     | `components/blocks/DonationDetails.tsx`                   |

---

## Bugs surfaced during audit (resolved 15 May 2026)

- ✅ FAQ answer `a5` (`which-gurukulas`) was rewritten in `data/faqs.ts`, `messages/en.json`, and `messages/kn.json` to list the four currently featured Gurukulas (Shruti Parampara, Namma Sampradaya, Shankara Gurukulam, Sri Ramana Brahma Vidyāśrama).
- ✅ Blog post `visit-to-shruti-parampara-gurukula` was pointing at `/assets/gurukulas/shruti-parampara/students.jpg` (404). Updated to use the existing `hero.jpg` from the same folder.

---

## Events

_All event placeholders resolved._ Maharudra Purascharana (15–17 May 2026) at Hoysala Trust, Hosakerehalli, Bengaluru is fully populated in `data/events.ts`.

---

## Gurukulas

_All Gurukula data is fully populated, including hero images, ācārya bios, and contact details._

The four currently featured Gurukulas in `data/gurukulas.ts` are:

1. **Sri Shruti Parampara Gurukulam** — JP Nagar, Bangalore
2. **Namma Sampradaya Gurukulam** — Varthur, Bangalore
3. **Shankara Gurukulam** — Ungra, Huliyurdurga, Karnataka
4. **Sri Ramana Maharṣi Brahma Vidyāśrama** — Madagondapalli, Hosur, Tamil Nadu

> **Note:** The previous `#GKL-TODO-*` placeholders for Gowtama Veda Pathashala and Sacchidananda Advaitashrama have been retired — those Gurukulas are no longer part of the v0.1 lineup and were replaced by Namma Sampradaya, Shankara Gurukulam, and Sri Ramana Brahma Vidyāśrama.

---

## Team Shivasankalpa

### Trustee bios — `#BIO-TODO-*` (cosmetic; bios are NOT shown on the public site)

The bio strings in `data/trustees.ts` are interim filler text retained for a future CMS migration. The website does **not** render trustee bios anywhere, so these can be cleaned up at leisure — they do not block public launch.

| Tag                                | Person                              |
| ---------------------------------- | ----------------------------------- |
| `#BIO-TODO-anantanarayana-sharma`  | Veda Brahma Shri Anantanarayana Sharma (Trustee) |
| `#BIO-TODO-ravishankar-ks`         | Ravishankar K.S. (Trustee)          |
| `#BIO-TODO-girish-bhardwaj`        | Girish Bharadwaj (Trustee)          |
| `#BIO-TODO-harisha-harithasa`      | Harisha Harithasa (Trustee)         |
| `#BIO-TODO-bodhayana-jayasimha`    | Bodhayana Jayasimha (Trustee)       |
| `#BIO-TODO-naveen-subrahmanya`     | Naveen Subrahmanya (President)      |
| `#BIO-TODO-sheshadri-g`            | Sheshadri G (Vice-President)        |
| `#BIO-TODO-shreesha-harithasa`     | Shreesha Harithasa (Secretary)      |
| `#BIO-TODO-madhu-bharadwaj`        | Madhu Bharadwaj (Treasurer)         |
| `#BIO-TODO-gourishankara-sharma`   | Gourishankara Sharma (Additional Treasurer) |

### Trustee photos — DONE

All 5 trustees, all 5 managing committee members, and all 5 trust members have photo files in `public/assets/trustees/`. A quality review (formal vs. casual / consistency of crop and lighting) is still recommended — see Media Review below.

---

## Blog

| Tag                                 | File           | Status                                                                                |
| ----------------------------------- | -------------- | ------------------------------------------------------------------------------------- |
| `#BLOG-TODO-visit-shruti-parampara` | `data/blog.ts` | Article body is written; awaiting final review and trustee approval.                  |
| `#BLOG-TODO-why-gurukulas-matter`   | `data/blog.ts` | Only the intro is written; full article content still needs to be supplied by trust members. |

> Also see "Bugs surfaced during audit" above — the visit post has a broken image reference.

---

## FAQs

| Tag                    | File           | Status                                                                                            |
| ---------------------- | -------------- | ------------------------------------------------------------------------------------------------- |
| `#FAQ-TODO-80g-status` | `data/faqs.ts` | Update once 80G certification is obtained. (Tag is automatically stripped from display via `app/[locale]/faqs/accordion.tsx`.) |

---

## Artefacts

The Trust Artefacts section on the About page (registration certificate + audit report) was previously removed and has not been re-added.

- `public/assets/artefacts/trust-certificate.png` already exists on disk but is not referenced anywhere on the site.
- An audit-report scan is not yet on disk.

To re-enable, restore the artefacts section in `app/[locale]/about/page.tsx` (use `ExpandableCard` for the certificate + audit report) and add `#ARTEFACT-TODO-audit-report` once the audit-report scan is missing.

---

## Media Review — Photos & Videos

The gallery, Gurukula detail pages, and blog currently use a mix of available photos. **Before public launch, review and upgrade the following:**

| Area                           | Current state                                                                         | What to do                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Gallery photos**             | 20+ photos from Varthur, Chidambarashrama, Brahmavidyashrama, Shruti Parampara visits | Replace with higher-quality photos where available; refine captions in `data/gallery.ts`                          |
| **Gallery videos**             | 9 MP4 clips from Gurukula visits                                                      | Review for quality and appropriateness; consider trimming long clips; replace with better recordings if available |
| **Gurukula hero images**       | Hero images present for all four Gurukulas                                            | Quality review only — confirm each is suitable for the detail page header                                         |
| **Trustee & committee photos** | All 15 photos present                                                                 | Quality review — consider re-shooting any that look casual / inconsistently lit                                   |
| **Blog post images**           | Visit post: broken reference (see Bugs above). "Why Gurukulas Matter" post: placeholder shown via fallback | Fix the broken reference; pick a real photo for the second post                                                   |
| **Homepage hero banner**       | Gurukula students photo (from stock/placeholder)                                      | Consider replacing with an original photo from a Vṛnda event or Gurukula visit                                    |
| **Maharudra event hero**       | Sri Adi Shankaracharya painting                                                       | Confirm this is the right image; add event-specific photos after 15–17 May                                        |
| **Donation page illustration** | AI-generated "Śraddhayā deyam" image                                                  | Confirm appropriateness or replace with original artwork                                                          |
| **Veda Vruksha image**         | AI-generated diagram                                                                  | Confirm accuracy of shakha names; consider commissioning a hand-drawn version                                     |

**Naming convention:** Use lowercase, hyphens instead of spaces: `my-photo-name.jpg`. Place files in the appropriate `public/assets/` subfolder.

---

## How to Replace a Placeholder

1. Find the tag in the file listed above.
2. Replace the `#TAG-TODO-xxx` text with actual content.
3. For images: upload the file to the listed path, then update the `src` reference in the data file.
4. Delete the tag once replaced.
5. Cross it off this checklist.

---

## Summary

| Bucket                                          | Count |
| ----------------------------------------------- | ----- |
| Blocking — must fix before public launch        | 2     |
| (SMTP password in Vercel, donation account cut-over to the trust's own bank/UPI) | |
| Cosmetic / non-blocking                         | 11    |
| (10 `#BIO-TODO-*` filler bios + `#FAQ-TODO-80g-status`) | |
| Editorial / content                             | 2     |
| (`#BLOG-TODO-visit-shruti-parampara` approval, `#BLOG-TODO-why-gurukulas-matter` body) | |
| Media review                                    | ongoing |
| Artefacts section re-enable                     | optional |
