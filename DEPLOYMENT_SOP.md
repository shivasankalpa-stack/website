# Deployment SOP — v0.15

Guide for deploying the website to Vercel and connecting the `srishivasankalpa.org` domain via Hostinger DNS.

---

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier is sufficient)
- Hostinger account with DNS access for `srishivasankalpa.org`

---

## Step 1: Push to GitHub

```bash
# From the project root
git add .
git commit -m "v0.1 — prototype ready for deployment"
git remote add origin https://github.com/shivasankalpa-stack/website.git
git push -u origin main
```

---

## Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New Project"
3. Select the `shivasankalpa-stack/website` repository
4. Vercel will auto-detect Next.js — accept the defaults
5. Click "Deploy"
6. Wait for the build to complete (~2 minutes)
7. Vercel will give you a URL like `website-xxxxx.vercel.app`
8. Verify the site works at that URL

---

## Step 3: Add Custom Domain in Vercel

1. In Vercel, go to your project → Settings → Domains
2. Add `srishivasankalpa.org`
3. Also add `www.srishivasankalpa.org`
4. Vercel will show you the DNS records you need to add

---

## Step 4: Configure Hostinger DNS

1. Log in to Hostinger → Domains → `srishivasankalpa.org` → DNS Zone
2. Add/update these records:

### For root domain (`srishivasankalpa.org`)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | `76.76.21.21` | 3600 |

### For www subdomain

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | `cname.vercel-dns.com` | 3600 |

> **Note:** Delete any existing A or CNAME records that conflict with these.

3. Save the DNS changes

---

## Step 5: Verify HTTPS

1. DNS propagation can take 15 minutes to 48 hours (usually ~30 minutes)
2. Check propagation: [dnschecker.org](https://dnschecker.org/#A/srishivasankalpa.org)
3. Once propagated, Vercel will automatically provision an SSL certificate
4. Verify HTTPS works: `https://srishivasankalpa.org`

---

## Step 6: Post-Deploy Smoke Test

Visit each page and verify:

- [ ] Homepage loads with all sections
- [ ] Ticker shows and is dismissible
- [ ] Audio player works
- [ ] Veda Vruksha SVG renders correctly
- [ ] All 3 Gurukula detail pages load
- [ ] Maharudra event page has correct schedule
- [ ] Donation modal opens with placeholders
- [ ] Contact form shows success state on submit
- [ ] Gallery images load
- [ ] 404 page shows for invalid URLs
- [ ] Mobile layout is clean (test on phone)

---

## Step 7: Set Environment Variables (if needed)

For v0.15, no environment variables are required. For v0.2 (Sanity CMS, Razorpay):

1. Vercel → Project → Settings → Environment Variables
2. Add: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, etc.
3. Redeploy after adding variables

---

## Ongoing Deployments

After the initial setup, every push to the `main` branch will automatically deploy:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

Vercel will build and deploy within ~2 minutes.

---

## Troubleshooting

| Issue | Solution |
|-------|---------|
| DNS not resolving | Wait up to 48 hours; check dnschecker.org |
| SSL certificate error | Verify DNS records are correct; Vercel auto-provisions SSL |
| Build failed on Vercel | Check build logs in Vercel dashboard |
| Images not loading | Verify files exist in `public/assets/` and paths are correct |

---

## Contact for Technical Help

For deployment issues, contact the technical team with:
1. Screenshot of the error
2. The URL that's failing
3. What you expected to see
