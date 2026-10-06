# Review links for Hilda — Vercel test build

Test deployment: **https://huis-two.vercel.app/**
Review date of this pass: 2026-10-03 · Commit reviewed: `86254a7` + pending fixes (see "Before you
review" below).

## Before you review — one redeploy is needed

The fixes listed under **"Fixed during this audit"** are in the repository but not yet on the test
URL. Please have the build redeployed first, then run through this list.

---

## 1. All twelve pages (crawl the whole site)

| Page | Link |
|---|---|
| Home | https://huis-two.vercel.app/index.html |
| Wie ben ik? | https://huis-two.vercel.app/wie-ben-ik.html |
| Kernkwaliteiten (juridisch advies) | https://huis-two.vercel.app/juridisch-advies.html |
| Wat kost het? (kosten) | https://huis-two.vercel.app/kosten.html |
| Contact | https://huis-two.vercel.app/contact.html |
| Persoonlijke juridische vraag | https://huis-two.vercel.app/persoonlijke-juridische-vraag.html |
| Zakelijke juridische vraag | https://huis-two.vercel.app/zakelijke-juridische-vraag.html |
| Certificeringen | https://huis-two.vercel.app/certificeringen.html |
| Klachten | https://huis-two.vercel.app/klachten.html |
| Betalen | https://huis-two.vercel.app/betalen.html |
| Privacy policy | https://huis-two.vercel.app/privacy.html |
| Zoeken | https://huis-two.vercel.app/zoeken.html |

## 2. Requirement-specific checks

| What | Where |
|---|---|
| Rate € 250 / € 302,50 incl. BTW + all-inprijs wording | https://huis-two.vercel.app/index.html (#kosten section) and https://huis-two.vercel.app/kosten.html |
| Portrait + alt text | https://huis-two.vercel.app/index.html and https://huis-two.vercel.app/wie-ben-ik.html |
| Business separation (no UAE/HLS content) | any page — verified clean on all twelve; example: https://huis-two.vercel.app/zakelijke-juridische-vraag.html |
| Service links (mediator, testament, conflict, grond, gemeente, GDPR) | click each list item in the two question cards on https://huis-two.vercel.app/index.html |
| Search: type `testament`, then `stakingswinst` (must show "Geen resultaten") | https://huis-two.vercel.app/zoeken.html |
| Complaints documents (4 PDFs) | https://huis-two.vercel.app/klachten.html |
| MfN regulations (6 PDFs) | https://huis-two.vercel.app/certificeringen.html |
| Bank details vs production | https://huis-two.vercel.app/betalen.html |
| Privacy statement | https://huis-two.vercel.app/privacy.html |
| Sitemap (12 URLs, live domain) | https://huis-two.vercel.app/sitemap.xml |
| Robots | https://huis-two.vercel.app/robots.txt |

## 3. Fixed during this audit (check after redeploy)

| Fix | How to verify |
|---|---|
| Service links on the homepage now jump to the right section | on https://huis-two.vercel.app/index.html click "goede mediator" — you should land on the "Echtscheidingen & mediation" card, not the top of the page |
| Mobile: certifications page no longer scrolls sideways | open https://huis-two.vercel.app/certificeringen.html at 320 px width — page must not scroll horizontally |
| Openingstijden on the contact page | https://huis-two.vercel.app/contact.html — "Openingstijden: maandag t/m vrijdag, 09:00–17:00." |
| "Interim-management" spelling in social share text | view source of https://huis-two.vercel.app/index.html — `twitter:description` |

## 4. Answers still needed from you (details in REMAINING-ACTIONS.md)

1. Hosting provider + whether the host keeps server logs (privacy wording)
2. Registered address + postcode, KvK number, BTW-identificatienummer
3. DIAC #13-337 and "Mediator bij de Raad van State" — still current?
4. MfN membership — still current?
5. "met een hoofdkantoor in Joure" — keep or reword?
6. Payment: is bank transfer + "neem contact op" for cards final?
7. Should the test build be `noindex` until launch?
