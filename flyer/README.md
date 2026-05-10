# Maharudra Enquiry-Desk Flyer

A two-sided **A4 brochure** for distribution at the Mahā Rudra Puraścaraṇa
enquiry desk. **Front: English. Back: Kannada.**

This is a standalone artefact — it is **not** part of the website build.

## Files

| File | Purpose |
|------|---------|
| `maharudra-flyer.html` | The flyer itself — a self-contained HTML page styled for A4 print. |

Images and the donation QR are referenced from the existing
`../public/assets/...` so the flyer always shows current Gurukula heroes,
the trust logo, and the live UPI QR.

## Print to PDF

1. Open `maharudra-flyer.html` in **Chrome** or **Edge**
   (drag-and-drop into the browser).
2. Press `⌘P` / `Ctrl+P`.
3. Recommended print settings:
   - **Destination**: *Save as PDF* (or your printer)
   - **Paper size**: **A4**
   - **Margins**: **None**
   - **Scale**: *Default* (do not change)
   - **Background graphics**: ✅ **ON** *(important — otherwise the indigo
     header band and gold borders will not print)*
   - **Pages**: 1–2
4. For physical printing, choose **two-sided · flip on long edge** so the
   English front and Kannada back are aligned correctly when held in
   portrait.

## What's on it

Each side is identical in structure (so the flyer reads the same in either
language):

1. **Header band** — Logo, "Sri Shivasankalpa Vṛnda", tagline shloka
   (`तन्मे मनः शिवसङ्कल्पमस्तु`).
2. **A Resolve Born of the Sringeri Paramparā** — short trust intro.
3. **What We Do** — 6 mini-cards covering the trust's objectives.
4. **Gurukulas We Are Privileged to Serve** — 2×2 grid of the four Gurukulas (photo, name,
   location, students/alumni, ācārya, śākhās).
5. **Three Ways to Participate**
   - **Enrol Your Child** → `srishivasankalpa.org/gurukulas`
   - **Donate** — UPI QR + UPI ID
   - **Volunteer / Talk to Us** — `info@shivasankalpa.org`
6. **Footer** — Blessing acknowledgment + website URL.

## Editing tips

- All copy lives directly inside `maharudra-flyer.html` — no build step.
- Brand colours are CSS variables at the top of the `<style>` block:
  `--indigo`, `--kumkuma`, `--gold`, `--ivory-50`, etc. They mirror the
  website palette exactly.
- Change a Gurukula photo by updating the `background-image` URL in the
  matching `.gk-card .gk-photo` element.
- If text overflows on either page, drop the body font size in the
  affected section by `0.5pt` (e.g. `8.5pt` → `8pt`) — the layout is
  intentionally tight to fit on a single A4.
