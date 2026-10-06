# Final implementation audit — Huisjurist B.V. website redesign

Date: 2026-10-03 · Branch: `main` · Commit: `86254a7` ("new changes", 2026-10-02)
Test deployment: https://huis-two.vercel.app/ · Production reference: https://www.huisjurist.nl/
Local test server: http://127.0.0.1:8199 (scripts/serve.py)

---

## 1. Executive summary

The test build was rebuilt from a clean install, crawled end to end (local, Vercel, production),
and cross-checked against Hilda's requirements (sections A–N).

**The redesign's content work verifies clean.** All12 pages on the Vercel test deployment were
inspected page by page: forbidden terms (Holland Legal Services, Dutch Lawyer in de UAE, PayFort,
AED, "2 landen", "hoofdkantoor in Joure en juridische slagkracht in Dubai", €185) return **zero
hits** on every deployed page; all deleted routes (23 UAE articles, blog, awards page, alias page)
return **404**; the rate is € 250 / € 302,50 everywhere including JSON-LD and search descriptions;
the portrait is a real supplied photo with the exact required alt text; all Dutch corrections from
Hilda's list are applied with no old forms remaining.

**Two defects were found and fixed during this audit** (both now in the working tree, not yet deployed):

1. Seven homepage service links pointed at anchors that did not exist on `juridisch-advies.html`
   (`#echtscheidingen-mediation`, `#testamenten`, `#privacy-gdpr`, `#onroerend-goed-grondzaken`).
   Fixed by adding the missing ids — anchor check now: 47 anchor links, 0 broken.
2. `certificeringen.html` had horizontal overflow at 320 px (MfN badge row, scrollWidth 329 > 320).
   Fixed in SCSS (`flex-wrap: wrap` + `max-width: min(14rem, 100%)`), rebuild green; retested: 320 = 320.

**Blocking for Hilda's review of those two items:** the Vercel deployment is stale — it does not yet
contain the fixes above, nor the uncommitted `contact.html` (openingstijden) and `index.html`/
`og-image.svg` ("Interim-management") edits. **A redeploy is required before review.**

**Not blockers for approving the test build**, but requiring an answer or a launch-time action:
hosting provider / server logging (privacy claim), KvK + BTW-id + full registered address,
undated qualifications (DIAC #13-337, Raad van State, MfN), the "hoofdkantoor in Joure" wording,
test-deployment indexability, and the absence of 301 redirects for legacy production URLs.

Google Search Console validation and sitemap submission will be completed only after the approved
build is deployed on the live huisjurist.nl domain. It is not a blocker for approval of the Vercel
test build.

---

## 2. Build result (Phase 1 baseline)

| Item | Value |
|---|---|
| Branch / commit | `main` / `86254a7` |
| Uncommitted (pre-existing) | `contact.html`, `index.html`, `assets/img/og-image.svg` |
| Uncommitted (this audit) | `juridisch-advies.html`, `scss/components/_components.scss`, `assets/css/main.css` |
| Untracked | `.freebuff/`, `audit/completion-report.md`, `audit/tools/`, audit reports |
| Node / npm | v22.23.3 / 10.9.9 |
| Bootstrap / Sass | 5.3.8 / 1.105.1 |
| npm scripts | `build` (sass → assets/css/main.css + scripts/copy-vendor.js), `watch` |
| Vercel config | no `vercel.json` (defaults); static deploy of repo root; no `public/` dir expected or used |
| Clean install | `npm ci` — success, no errors |
| Production build | `npm run build` — **exit 0** |
| Warnings | 231 repetitive Sass deprecation warnings from Bootstrap color functions (`@import`, `to-rgb`) — deprecation notices only, not failures |
| Deployment files after build | `index.html` + 11 content pages, `assets/css/main.css` (260 316 B), `assets/js/bootstrap.bundle.min.js` (80 496 B), `sitemap.xml` (12), `robots.txt` |
| Local test command | `python3 scripts/serve.py 8199` — used throughout, verified 200 |
| Dependency files | none edited inside `node_modules` |

---

## 3. Total requirements by status

Full detail per requirement: [REQUIREMENTS-MATRIX.md](REQUIREMENTS-MATRIX.md).

| Status | Count |
|---|---|
| VERIFIED COMPLETE | 94 |
| PARTIALLY COMPLETE | 2 |
| NOT COMPLETE | 0 |
| NOT APPLICABLE | 6 |
| POST-LAUNCH ACTION | 3 |
| POTENTIAL CONFIRMATION REQUIRED | 11 |
| **Total requirement rows** | **116** |

(Sections L and M are reported as test-result tables rather than numbered rows; §7 above lists
the three post-launch steps counted here.)

---

## 4. Verified completed changes (evidence-backed)

- **A · Business separation** — all 12 deployed pages return zero hits for "Holland Legal Services",
  "Dutch Lawyer", `dutchlawyerindeuae`, `youcanbook`, "2 landen", "gespecialiseerde website",
  "bemiddelt", AED, PayFort. `sameAs` = LinkedIn only. No HLS link remains anywhere, so the
  mandatory pre-click disclaimer is not applicable (nothing to disclose). DIAC appears only as
  "Dubai International Arbitration Centre" (required wording); "Dubai Arbitration Centre" absent.
- **B · Name and rate** — `mr. Hilda van der Tuin` in meta author on all pages; € 250 / € 302,50 in
  hero, blue price card, kosten (both displays), services rate block, personal/business pages,
  payment page, search descriptions (`assets/js/main.js`), `priceRange` JSON-LD and costs FAQ JSON-LD.
  Zero occurrences of €185 / € 185 / €250 / €302,50 (missing space) across html/js/xml/svg.
  Required sentence and additional-costs wording present verbatim (index.html:363–364, kosten FAQ).
  "Ureninschatting vooraf, dus geen verrassingen" absent; "Ureninschatting vooraf" present ×3.
  No counter/count-up code exists; 1996 and € 250 render statically on first paint (DOM snapshot).
- **C · Portrait** — chequebook file `31175842_…jpeg` deleted in `86254a7`, zero references (grep);
  both placements use `assets/img/hilda-van-der-tuin.png` (245×229) with alt exactly
  "mr. Hilda van der Tuin, directeur van Huisjurist B.V."; image visually inspected in browser
  (portrait photo of a blonde woman in a red jacket — correct, not the chequebook, not a substitute).
- **D · Old content removal** — local/Vercel inventories show 12 pages; production had 102.
  `/blog.html`, `/bedrijf-starten-dubai-uae.html`, `/en-nu-een-bedrijf-starten/` (+ article),
  `/uw-huisjurist-blogt/`, `/certificeringen-en-awards.html` all **404** on Vercel (curl).
  "20+ awards", "house of awards", "Mediation lawyer of the year", "Onderscheidingen sinds 2012",
  "DIFC" all absent. Sitemap and search index both exactly the 12 retained pages; no empty categories.
  1996 preserved; undated qualifications kept (not silently removed).
- **F · Search** — real `<button type="submit">` with `aria-label="Zoeken op deze site"`; Enter tested
  (instant local results); GET flow `zoeken.html?q=testament` populates and returns results;
  instruction "Vul uw zoekterm in en druk op Enter of klik op de zoekknop." present (index.html:393);
  "stakingswinst" and "filmscript" → "Geen resultaten" (obsolete articles gone); result description
  shows "€ 250 per uur exclusief BTW (€ 302,50 inclusief 21% BTW)"; Google CSE fallback removed
  (zero `google`/`cse` references in html/js) — removed rather than repaired, as allowed.
- **I · Service claims** — "om samen naar een oplossing te zoeken" present ×2; "tot er een werkende
  oplossing ligt" and "— anders klopt de helft niet." absent; international-testament sentence present;
  "51%" only inside compiled Bootstrap CSS variables (no content claim).
- **J · Dutch corrections** — every old form absent from html/js/xml/svg (`juridentaal`, `Interim
  management`, `privacy wetgeving`, `privacy jurist`, `all-in prijs`, `all-in uurtarief`, `GDPR
  compliant`, `AVG/GDPR compliance`, `een conflict wat`, `het kanaal wat`, `Portal toegang`,
  `IP adres`, `IP nummer`, `binnen paar dagen`, `LinkedIN`, `via E-mail`, `Mijn CV`, `in Euro's`).
  Protected expressions intact (`responsief` ×3, `op weekbasis` ×2, `U wenst?` ×12); u-form kept.
- **L · Accessibility (automated)** — one H1 per page, no heading level jumps, no duplicate ids,
  all form controls labelled, all images have alt + width/height, `lang="nl"`, skip link works
  (first Tab → "Ga naar de inhoud" becomes visible), search buttons named, no console errors.
- **M · Responsive** — 320/375/390/768/1024/1366/1440 tested on index (scrollWidth == viewport at
  every size); kosten, betalen, contact clean at 320; certificeringen clean at 320 after fix;
  mobile menu at 375: `aria-expanded=true`, 7 links visible, 43–47 px targets.
- **N · SEO** — unique titles, one H1, canonical and `og:url` on `https://www.huisjurist.nl/…`
  (no Vercel URLs in metadata/JSON-LD), robots meta present (zoeken = noindex), sitemap = 12 valid
  entries = file set = search index, all JSON-LD blocks parse, `priceRange` correct, FAQ JSON-LD
  matches visible text, `sameAs` has no UAE/Facebook identity.

---

## 5. Partially completed changes

- **G · Privacy statement** — everything observable verifies: no cookies, no localStorage/
  sessionStorage, no analytics/ads/trackers, no third-party requests (browser network log shows
  only same-origin assets), no third-party fonts (Verdana system stack), contact form builds a
  `mailto:` and transmits nothing before submission (main.js:250–268), no embedded maps/social/
  payment widgets. **Gap:** the hosting provider is documented nowhere, so the first accordion's
  claim "uw bezoek wordt nergens opgeslagen" cannot be substantiated — every host (incl. Vercel)
  keeps request logs. See POTENTIAL CONFIRMATION #1.
- **H · Business information** — email, IBAN/BIC/account holder (NL63KNAB 0257939938, KNABNL2H,
  Huisjurist B.V., PLAATS Leeuwarden — identical to production /betaling/), Knab bank address,
  opening hours (uncommitted edit on contact.html:154), and Joure references are present.
  Street address + postcode, KvK and BTW-id are absent — see POTENTIAL CONFIRMATION #2.

---

## 6. Incomplete changes

None classified NOT COMPLETE. Every requirement either verifies, is non-applicable, or reduces to
a confirmation/launch action listed below.

---

## 7. Post-launch steps

1. **Google Search Console (POST-LAUNCH ACTION).** "Google Search Console validation and sitemap
   submission will be completed only after the approved build is deployed on the live huisjurist.nl
   domain. It is not a blocker for approval of the Vercel test build."
2. **Legacy 301 map (POST-LAUNCH ACTION).** The test build has no `vercel.json`/`_redirects`; the 98
   production-only paths (`/betaling/`, `/contact/`, `/wiebenik/`, `/kernkwaliteitenhilda/`,
   `/privacy-policy.html`, `/uw-huisjurist-blogt/`, …) return 404 — correct for the test build, but
   before going live on huisjurist.nl they must 301 to their new equivalents to preserve link equity.
3. **Live-domain canonical/OG switch check (POST-LAUNCH ACTION).** Canonical/OG already point at
   `https://www.huisjurist.nl/…`, so no change is expected — verify after the DNS cutover.

---

## 8. Potential confirmation items (searched everywhere first)

Each item states what is missing, every location searched, why it cannot be completed safely, and
whether it blocks. Full detail: [REQUIREMENTS-MATRIX.md](REQUIREMENTS-MATRIX.md) §G/H/I/A.

1. **Hosting provider and server-log/IP retention** (privacy claim). Searched: all repo files,
   `privacy.html`, `robots.txt`, `vercel.json` (absent), README, audit reports, all 10 supplied PDFs,
   production pages. Without the host we cannot confirm or qualify "uw bezoek wordt nergens
   opgeslagen". *Non-blocking for the test build; must be resolved before launch (legal statement).*
2. **Full registered address, KvK number, BTW-identificatienummer** (contact page + PostalAddress
   JSON-LD). Searched: full repo grep (html/js/scss/svg/xml/md/txt), `git log -S KvK`/`-S postcode`
   across all history (never existed), text extraction of all 10 PDFs, image XMP/strings scan,
   all 102 production pages (incl. `/contact/`, `/betaling/`, `our-office-in-the-netherlan.html`),
   the Vercel deployment, README and both audit reports. Production's office page only says
   "…staat in Joure, twee minuten rijden vanaf de A6 of A7 … op afspraak" — no street/postcode.
   *Non-blocking for the test build; blocking for launch (Google "LocalBusiness" completeness and
   the KvK/BTW display Hilda requested).*
3. **DIAC #13-337 and "Mediator bij de Raad van State"** — present undated at
   `certificeringen.html:99/103` and trust-strip `index.html:340/347`. Searched: repo, PDFs,
   production. Cannot date or verify them from any source. *Non-blocking; do not remove — they are
   only allowed as "verified roles or qualifications" if Hilda confirms they are current.*
4. **MfN registermediator membership** — badge image + "Lidmaatschap MfN" + 6 MfN PDF links on
   `certificeringen.html`. Same undated-membership issue. *Non-blocking.*
5. **"met een hoofdkantoor in Joure"** (hero, `index.html:171`) — the required sentence
   "Een hoofdkantoor in Joure en juridische slagkracht in Dubai." is removed in full; the remaining
   Joure-only phrase is not a UAE claim but "hoofdkantoor" for a single office may still be
   wording Hilda wants changed. *Non-blocking; wording decision only.*
6. **Payment methods** — `betalen.html` offers KNAB transfer + "neem contact op" for anything else;
   production `/betaling/` says cards/PayFort are arranged by contacting her. Behaviour matches
   production; confirm no separate card/PayFort gateway is wanted. *Non-blocking.*
7. **Indexability of the test build** — 11 pages are `index, follow` on `huis-two.vercel.app`
   (canonical points to the live domain, so duplicate-content risk is low). Confirm whether the test
   build should ship `noindex` until launch. *Non-blocking; decision only.*

---

## 9. Blocking issues

| # | Issue | Effect | Action |
|---|---|---|---|
| B1 | Vercel deployment is stale vs the working tree: missing the anchor fix, the 320 px overflow fix, the `contact.html` openingstijden line and the "Interim-management" meta/OG edits | Hilda would review a build that still has the two defects this audit fixed | Commit + redeploy, then re-run the spot checks in [HILDA-REVIEW-LINKS.md](HILDA-REVIEW-LINKS.md) |

Nothing else blocks approval of the test build.

---

## 10. Non-blocking issues

1. `wie-ben-ik.html` meta description is 180 chars (recommended max 175) — truncation risk in SERPs.
2. Build tooling is deployed: `/scripts/import-uae.mjs`, `build-alias.mjs`, `update-site.mjs` and
   `/scss/*` return 200 on Vercel; `import-uae.mjs` contains 6 references to holland-legal-services /
   dutchlawyerindeuae URLs. Not linked from any page and disallowed in `robots.txt`, but reachable.
   Recommend a `.vercelignore` (verify the build still passes) before launch.
3. `.DS_Store` files inside `assets/files/` are deployed (cosmetic).
4. Legacy production URLs 404 (see §7.2 — intentional for the test build).
5. `assets/files/Voor leden/…` NMv logo packs and SoMe packs are shipped in the repo but unpublished
   — correct, but consider excluding them from the deployable artifact.

---

## 11. Testing limitations

- **Browsers:** only Chromium was available in this harness; Firefox/WebKit (Safari) not tested.
- **Focus visibility:** CSS rules verified (`a:focus-visible { outline: 2px solid #00558f }`,
  toggler/back-to-top/btn variants) and the skip link works, but the harness could not
  programmatically confirm `:focus-visible` matching — recommend a 2-minute manual keyboard pass.
- **Automated a11y tooling:** no axe/Lighthouse in the repo; accessibility results are a mix of
  scripted DOM checks (heading hierarchy, ids, labels, alt, lang) and manual inspection (contrast
  computed for11 colour pairs, all ≥ 4.68:1 AA; reduced-motion CSS present; menu behaviour).
- **HTTP vs content:** every page was parsed for titles/meta/JSON-LD/links, not just status codes.
- **Basecamp:** no local Basecamp export exists beyond `assets/files/` — that directory was treated
  as the supplied asset set and inventoried in full ([ASSET-INVENTORY.csv](ASSET-INVENTORY.csv)).
- **Vercel build pipeline:** no `vercel.json` in the repo, so build/output settings could only be
  inferred from the deployment (static root, no `public/`).

---

## 12. Final report

The implementation satisfies the substantive requirements of the redesign: provider separation,
rate and name, portrait, removal of UAE/blog/award content, service links (after this audit's fix),
search, Dutch corrections, structured data, accessibility basics and responsive layout all verify
evidence-backed across local, Vercel and production sources. Remaining work is confirmation and
deployment hygiene, not content rebuilding: redeploy the working tree (B1), answer the seven
confirmation items in §8, add the legacy redirect map and Search Console validation at launch.
