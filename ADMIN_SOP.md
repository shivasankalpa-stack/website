# Admin SOP — Content Update Guide

Step-by-step instructions for non-technical trustees on how to update website content.

> **Prerequisite:** You need a code editor (VS Code recommended) and basic comfort with editing text files. All content is in plain text — you don't need to know programming.

---

## 1. How Content Works (v0.1)

All website content lives in simple text files inside the `/data/` folder:

| File | What it controls |
|------|-----------------|
| `data/gurukulas.ts` | Gurukula entries (name, location, ācārya, description) |
| `data/events.ts` | Events (Maharudra, future events) |
| `data/blog.ts` | Blog articles |
| `data/trustees.ts` | Trustees and Managing Committee (two separate lists) |
| `data/faqs.ts` | Frequently asked questions |
| `data/gallery.ts` | Gallery photos and videos |

Donation payment details (UPI, QR, bank info) are in:
- `components/blocks/DonationDetails.tsx`

---

## 2. How to Edit a Data File

### Example: Updating a Gurukula's description

1. Open `data/gurukulas.ts` in your editor
2. Find the Gurukula by searching for its name (e.g., "Shruti Parampara")
3. Look for the field you want to change (e.g., `overview:`)
4. Edit the text between the **single quotes** `'...'`
5. Save the file
6. The website will automatically reload with your changes (if the dev server is running)

### Example: changing the overview text

**Before:**
```
overview: 'Shruti Parampara Gurukula in JP Nagar is dedicated to...',
```

**After:**
```
overview: 'Shruti Parampara Gurukula, nestled in JP Nagar, has been a beacon of...',
```

> **Important:** Don't change the field names (like `overview:`, `name:`, etc.) — only change the text between the quotes.

---

## 3. How to Add a New Gurukula

1. Open `data/gurukulas.ts`
2. Copy an existing Gurukula block (everything between `{` and `},`)
3. Paste it at the end of the list (before the final `];`)
4. Update all fields with the new Gurukula's information
5. Choose a unique `slug` (URL-friendly name, e.g., `'new-gurukula-name'`)
6. Save the file

---

## 4. How to Add a New Event

1. Open `data/events.ts`
2. Copy the existing Maharudra event block as a template
3. Paste it after the existing event (before `];`)
4. Update: `slug`, `title`, `date`, `description`, and other fields
5. Set `featured: true` if it should appear prominently on the homepage

---

## 5. How to Add a New Blog Post

1. Open `data/blog.ts`
2. Copy an existing post block as a template
3. Update: `slug`, `title`, `date`, `author`, `excerpt`, `content`
4. For the `content` field, use `\n\n` to separate paragraphs
5. Add an image path if you have one (see section 8)

---

## 6. How to Add/Update a FAQ

1. Open `data/faqs.ts`
2. Add a new entry or edit an existing one
3. Each FAQ needs: `id` (unique), `question`, and `answer`

---

## 7. How to Update Team Shivasankalpa

The `data/trustees.ts` file has **two separate lists**:

- `trustees` — the trust's governing board (Trustees)
- `managingCommittee` — the operational team (President, VP, Secretary, Treasurer)

### To update an existing member:
1. Open `data/trustees.ts`
2. Find the person by name in the appropriate list
3. Update their `role`, `bio`, or `image` path

### To add a new member:
1. Copy an existing block within the appropriate list
2. Update all fields (name, role, bio, image path)
3. Upload their photo (see section 8)

### Current structure:

**Trustees:** Veda Brahma Shri Anantanarayana Sharma, Ravishankar K.S., Giri Bhardwaj, Harisha Harithasa, Bodhayana Jayasimha

**Managing Committee:** Naveen Subrahmanya (President), Sheshadri G (Vice-President), Shreesha Harithasa (Secretary), Gourishankara Sharma (Treasurer)

---

## 8. How to Upload New Photos/Videos

### Naming convention
- Use lowercase, hyphens instead of spaces: `my-photo-name.jpg`
- Supported formats: `.jpg`, `.jpeg`, `.png` for images; `.mp4` for videos

### Where to put files

| Content type | Folder |
|-------------|--------|
| Gurukula photos | `public/assets/gurukulas/<gurukula-slug>/` |
| Event photos | `public/assets/events/` |
| Gallery items | `public/assets/gallery/` |
| Trustee / committee photos | `public/assets/trustees/` |
| Blog images | `public/assets/blog/` |
| Trust documents | `public/assets/artefacts/` |

### How to reference in data files
Use the path starting from `/assets/`. Example:
```
image: '/assets/gurukulas/shruti-parampara/students.jpg',
```

### Adding a new gallery item
1. Upload the file to `public/assets/gallery/`
2. Open `data/gallery.ts`
3. Add a new entry with: `id`, `src`, `alt`, `category` (gurukulas/events/misc), `caption`, and `type` (image/video)

---

## 9. How to Update the Seva List (Maharudra)

1. Open `data/events.ts`
2. Find the `sevaItems` array inside the Maharudra event
3. Add, remove, or modify seva entries
4. Each seva needs: `name` and `amount`

---

## 10. How to Update Donation/Payment Details

1. Open `components/blocks/DonationDetails.tsx`
2. Update the UPI ID, bank details, or QR code image path
3. To replace the QR code: upload the new image to `public/assets/artefacts/` and update the `src` in the file

> **Note:** The current donation details are interim (personal account). Replace with the trust's own account details before public launch. See `PLACEHOLDERS.md` for the full checklist.

---

## 11. How to Update Contact Information

- **Email:** Search for `info@shivasankalpa.org` across the codebase
- **Address:** Update in `app/contact/page.tsx` (look for the MapPin section)
- **Trust registration number:** Search for `#REG-TODO` and replace

---

## Need Help?

If you're unsure about a change, reach out to the technical team. It's always safer to ask than to accidentally break the site.
