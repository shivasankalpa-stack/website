# Placeholders — Pre-Launch Checklist

Every placeholder in the codebase is tagged with a unique `#TAG-TODO-<id>`. Replace each one before going live.

---

## Trust-Wide


| Tag                          | File                           | What to Replace                |
| ---------------------------- | ------------------------------ | ------------------------------ |
| `#REG-TODO`                  | `components/layout/Footer.tsx` | Trust registration number      |
| `#CONTACT-TODO-full-address` | `app/contact/page.tsx`         | Full office/registered address |


### Donation Details — INTERIM (update before public launch)

The donation details currently in the site are **interim/personal** (Jayasimha B N, Sree Charan Bank). Once the trust's own bank account and UPI are set up, update:


| What          | Current (interim)                   | File to update                                            |
| ------------- | ----------------------------------- | --------------------------------------------------------- |
| UPI ID        | `9916104901-2@ybl`                  | `components/blocks/DonationDetails.tsx`                   |
| QR Code       | `/assets/artefacts/donation-qr.png` | Replace image file + update path in `DonationDetails.tsx` |
| Bank A/c Name | Jayasimha B N                       | `components/blocks/DonationDetails.tsx`                   |
| Bank A/c No   | T101T0100T01659                     | `components/blocks/DonationDetails.tsx`                   |
| Bank IFSC     | SECB0000010                         | `components/blocks/DonationDetails.tsx`                   |
| Bank/Branch   | Sree Charan Bank, Shankarapuram     | `components/blocks/DonationDetails.tsx`                   |


---

## Events


| Tag                                  | File                 | What to Replace                                    |
| ------------------------------------ | -------------------- | -------------------------------------------------- |
| ~~`#EVENT-TODO-maharudra-location`~~ | ~~`data/events.ts`~~ | **DONE** — Hoysala Trust, Hosakerehalli, Bengaluru |


---

## Gurukula: Shruti Parampara


| Tag                                      | File                                        | What to Replace                   |
| ---------------------------------------- | ------------------------------------------- | --------------------------------- |
| `#GKL-TODO-shruti-parampara-established` | `data/gurukulas.ts`                         | Year established                  |
| `#GKL-TODO-shruti-parampara-overview`    | `data/gurukulas.ts`                         | Review and finalise overview text |
| `#GKL-TODO-shruti-parampara-history`     | `data/gurukulas.ts`                         | Actual history paragraph          |
| `#GKL-TODO-shruti-parampara-schedule`    | `data/gurukulas.ts`                         | Daily schedule details            |
| `#GKL-TODO-shruti-parampara-students`    | `data/gurukulas.ts`                         | Student summary details           |
| `#GKL-TODO-shruti-parampara-event-date`  | `data/gurukulas.ts`                         | Next Upakarma date                |
| `#GKL-TODO-shruti-parampara-phone`       | `data/gurukulas.ts`                         | Contact phone number              |
| `#GKL-TODO-shruti-parampara-email`       | `data/gurukulas.ts`                         | Contact email                     |
| `#IMG-TODO-shruti-parampara-hero`        | `public/assets/gurukulas/shruti-parampara/` | Hero image for detail page        |


---

## Gurukula: Gowtama Veda Pathashala


| Tag                             | File                | What to Replace                   |
| ------------------------------- | ------------------- | --------------------------------- |
| `#GKL-TODO-gowtama-established` | `data/gurukulas.ts` | Year established                  |
| `#GKL-TODO-gowtama-overview`    | `data/gurukulas.ts` | Review and finalise overview text |
| `#GKL-TODO-gowtama-history`     | `data/gurukulas.ts` | Actual history paragraph          |
| `#GKL-TODO-gowtama-schedule`    | `data/gurukulas.ts` | Daily schedule details            |
| `#GKL-TODO-gowtama-students`    | `data/gurukulas.ts` | Student summary details           |
| `#GKL-TODO-gowtama-phone`       | `data/gurukulas.ts` | Contact phone number              |
| `#GKL-TODO-gowtama-email`       | `data/gurukulas.ts` | Contact email                     |


---

## Gurukula: Sacchidananda Advaitashrama


| Tag                                   | File                | What to Replace                   |
| ------------------------------------- | ------------------- | --------------------------------- |
| `#GKL-TODO-sacchidananda-shakha`      | `data/gurukulas.ts` | Veda shakha taught                |
| `#GKL-TODO-sacchidananda-established` | `data/gurukulas.ts` | Year established                  |
| `#GKL-TODO-sacchidananda-overview`    | `data/gurukulas.ts` | Review and finalise overview text |
| `#GKL-TODO-sacchidananda-history`     | `data/gurukulas.ts` | Actual history paragraph          |
| `#GKL-TODO-sacchidananda-schedule`    | `data/gurukulas.ts` | Daily schedule details            |
| `#GKL-TODO-sacchidananda-students`    | `data/gurukulas.ts` | Student summary details           |
| `#GKL-TODO-sacchidananda-phone`       | `data/gurukulas.ts` | Contact phone number              |
| `#GKL-TODO-sacchidananda-email`       | `data/gurukulas.ts` | Contact email                     |


---

## Team Shivasankalpa — Trustees


| Tag                               | File                      | What to Replace                                           |
| --------------------------------- | ------------------------- | --------------------------------------------------------- |
| `#BIO-TODO-anantanarayana-sharma` | `data/trustees.ts`        | Final bio for Veda Brahma Shri Anantanarayana Sharma      |
| `#BIO-TODO-ravishankar-ks`        | `data/trustees.ts`        | Final bio for Ravishankar K.S.                            |
| `#BIO-TODO-giri-bhardwaj`         | `data/trustees.ts`        | Final bio for Giri Bhardwaj                               |
| `#BIO-TODO-harisha-harithasa`     | `data/trustees.ts`        | Final bio for Harisha Harithasa                           |
| `#BIO-TODO-bodhayana-jayasimha`   | `data/trustees.ts`        | Final bio for Bodhayana Jayasimha                         |
| `#IMG-TODO-`*                     | `public/assets/trustees/` | Photos for all trustees (upload and update `image` field) |


## Team Shivasankalpa — Managing Committee


| Tag                              | File                      | What to Replace                                                    |
| -------------------------------- | ------------------------- | ------------------------------------------------------------------ |
| `#BIO-TODO-naveen-subrahmanya`   | `data/trustees.ts`        | Final bio for Naveen Subrahmanya (President)                       |
| `#BIO-TODO-sheshadri-g`          | `data/trustees.ts`        | Final bio for Sheshadri G (Vice-President) — photo available       |
| `#BIO-TODO-shreesha-harithasa`   | `data/trustees.ts`        | Final bio for Shreesha Harithasa (Secretary)                       |
| `#BIO-TODO-gourishankara-sharma` | `data/trustees.ts`        | Final bio for Gourishankara Sharma (Treasurer)                     |
| `#IMG-TODO-*`                    | `public/assets/trustees/` | Photos for all committee members (upload and update `image` field) |


---

## Blog


| Tag                                 | File           | What to Replace                                 |
| ----------------------------------- | -------------- | ----------------------------------------------- |
| `#BLOG-TODO-visit-shruti-parampara` | `data/blog.ts` | Final review and trustee approval of visit post |
| `#BLOG-TODO-why-gurukulas-matter`   | `data/blog.ts` | Complete article content                        |


---

## FAQs


| Tag                    | File           | What to Replace                           |
| ---------------------- | -------------- | ----------------------------------------- |
| `#FAQ-TODO-80g-status` | `data/faqs.ts` | Update once 80G certification is obtained |


---

## Artefacts


| Tag                                | File                 | What to Replace                                               |
| ---------------------------------- | -------------------- | ------------------------------------------------------------- |
| `#ARTEFACT-TODO-trust-certificate` | `app/about/page.tsx` | Upload actual certificate image to `public/assets/artefacts/` |
| `#ARTEFACT-TODO-audit-report`      | `app/about/page.tsx` | Upload audit report scan to `public/assets/artefacts/`        |


---

## Media Review — Photos & Videos

The gallery, Gurukula detail pages, and blog currently use a mix of available photos. **Before public launch, review and upgrade the following:**


| Area                           | Current state                                                                         | What to do                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **Gallery photos**             | 20+ photos from Varthur, Chidambarashrama, Brahmavidyashrama, Shruti Parampara visits | Replace with higher-quality photos where available; add captions in `data/gallery.ts`                             |
| **Gallery videos**             | 9 MP4 clips from Gurukula visits                                                      | Review for quality and appropriateness; consider trimming long clips; replace with better recordings if available |
| **Gurukula hero images**       | Placeholders for Shruti Parampara, Gowtama, and Sacchidananda                         | Obtain dedicated photos for each Gurukula's detail page hero                                                      |
| **Trustee & committee photos** | Only Anantanarayana Sharma and Sheshadri G have photos                                | Collect professional/formal photos for all 9 team members                                                         |
| **Blog post images**           | Placeholder for both posts                                                            | Add relevant photos from Gurukula visits                                                                          |
| **Homepage hero banner**       | Gurukula students photo (from stock/placeholder)                                      | Consider replacing with an original photo from a Vṛnda event or Gurukula visit                                    |
| **Maharudra event hero**       | Sri Adi Shankaracharya painting                                                       | Confirm this is the right image; consider adding event-specific photos after May 15–17                            |
| **Donation page illustration** | AI-generated "Śraddhayā deyam" image                                                  | Confirm appropriateness or replace with original artwork                                                          |
| **Veda Vruksha image**         | AI-generated diagram                                                                  | Confirm accuracy of shakha names; consider commissioning a hand-drawn version                                     |


**Naming convention:** Use lowercase, hyphens instead of spaces: `my-photo-name.jpg`. Place files in the appropriate `public/assets/` subfolder.

---

## How to Replace a Placeholder

1. Find the tag in the file listed above
2. Replace the `#TAG-TODO-xxx` text with actual content
3. For images: upload the file to the listed path, then update the `src` reference in the data file
4. Delete the tag once replaced
5. Cross it off this checklist

**Total items: ~45 text placeholders + media review** — aim to resolve all before public launch.