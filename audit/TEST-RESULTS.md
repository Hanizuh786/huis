# Test results — Huisjurist B.V. audit (2026-10-03)

All results below were executed in this session. Local server: `http://127.0.0.1:8199`
(`python3 scripts/serve.py 8199`). Browser: Chromium (browser panel).

---

## 1. Build and install

| Test | Command | Result |
|---|---|---|
| Clean install | `npm ci` | PASS — exit 0, no errors |
| Production build | `npm run build` | PASS — exit 0 |
| Sass deprecations | build output | 231 repetitive warnings (Bootstrap `@import` / `to-rgb`) — deprecation notices, **not** failures |
| Vendor copy | `scripts/copy-vendor.js` | PASS — `assets/js/bootstrap.bundle.min.js` written (80 496 B) |
| Deployment files | post-build check | PASS — 12 HTML pages, `assets/css/main.css` (260 316 B), `sitemap.xml` (12 loc), `robots.txt` |
| `public/` expectation | repo inspection | PASS — no `public/` dir referenced anywhere; build writes into `assets/` |
| Rebuild after SCSS fix | `npm run build` | PASS — exit 0, `flex-wrap:wrap` present in compiled CSS (verified via curl) |

## 2. Crawl and inventory

| Test | Scope | Result |
|---|---|---|
| Local crawl | 13 URLs (12 + `/`) | PASS — inventory `audit/tools/out/local.json` |
| Vercel crawl | 13 URLs | PASS — `audit/tools/out/vercel.json` |
| Production crawl | 102 URLs (60 in sitemap) | PASS — `audit/tools/out/prod.json` |
| Local ↔ Vercel diff | titles, descriptions, canonical, robots, H1, body | **1 diff**: `contact.html` body 2053 vs 2003 chars — the uncommitted openingstijden line exists locally only |
| Production-only paths | set difference | 98 paths (UAE archive, blog, awards, old contact/mediation URLs) — all absent from test build by design |
| Deleted routes on Vercel | curl | `/blog.html`, `/bedrijf-starten-dubai-uae.html`, `/en-nu-een-bedrijf-starten/`, `/en-nu-een-bedrijf-starten/denk-aan-de-stakingswinst.html`, `/uw-huisjurist-blogt/`, `/certificeringen-en-awards.html` → **404, no redirects** |
| Legacy URL behaviour | curl (11 old URLs) | `/kosten.html`, `/klachten.html` → 200 (same URL kept); `/betaling/`, `/contact/`, `/wiebenik/`, `/kernkwaliteitenhilda/`, `/privacy-policy.html`, `/ikbenhieromdat.html`, `/mediationindex.htm` → 404 |

## 3. Forbidden-term scan (all 12 deployed Vercel pages)

Terms: Holland Legal Services · Dutch Lawyer · dutchlawyerindeuae · youcanbook · PayFort · AED ·
"hoofdkantoor in Joure en juridische" · "2 landen" · €185 · € 185 · 185 · blog.html ·
en-nu-een-bedrijf · bedrijf-starten-dubai · facebook.com · vercel.app

**Result: 0 hits on every deployed page.** Repo-level hits exist only inside `scripts/` (build
tooling, robots-disallowed) — see FINAL-AUDIT §10.2.

## 4. Dutch correction scan (old forms must be absent)

24 old forms tested across `*.html`, `*.js`, `*.xml`, `*.svg` (scripts/audit excluded):
`juridentaal`, `Interim management`, `privacy wetgeving`, `privacy jurist`, `all-in prijs`,
`all-in uurtarief`, `GDPR compliant`, `AVG/GDPR compliance`, `een conflict wat`, `het kanaal wat`,
`Portal toegang`, `IP adres`, `IP nummer`, `binnen paar dagen`, `LinkedIN`, `via E-mail`,
`Mijn CV`, `Voor mijn CV`, `in Euro's`, `€185`, `€ 185`, `€250`, `€302,50`.

**Result: 0 occurrences.** Protected expressions verified present: `responsief` ×3,
`op weekbasis` ×2, `U wenst?` ×12.

## 5. Link audit (`audit/LINK-AUDIT.csv`)

| Check | Result |
|---|---|
| Links enumerated | 406 (367 HTTP targets + 39 mailto) |
| Internal page/file targets | **all 200** — no missing files |
| Anchor links | 47 checked — **0 broken after fix** (7 were broken before: `#echtscheidingen-mediation`, `#testamenten`, `#privacy-gdpr`, `#onroerend-goed-grondzaken` from `index.html`) |
| External links | linkedin.com/in/huisjurist → 200, openstreetmap.org → 200 (curl) |
| PDF assets | all 10 linked PDFs → **200 on Vercel** (tested individually) |
| Google CSE link | removed (0 references) — no unusable fallback left |

## 6. Search tests (browser, real input)

| Test | Input | Result |
|---|---|---|
| Button semantics | — | `<button type="submit" aria-label="Zoeken op deze site">` exposed as "Zoeken op deze site" button in a11y tree |
| Enter triggers search | `stakingswinst` + Enter | instant results: "Geen resultaten voor \"stakingswinst\"" ✅ (obsolete article gone) |
| Obsolete term 2 | `filmscript` | "Geen resultaten" ✅ |
| Positive term | `kosten` | results list incl. "Wat kost het? — kosten € 250 per uur exclusief BTW (€ 302,50 inclusief 21% BTW)…" ✅ |
| GET flow | `zoeken.html?q=testament` | input pre-filled, results rendered ✅ |
| Index coverage | — | 12 entries = 12 files ✅ |

## 7. Responsive (browser, `scrollWidth` vs viewport)

| Viewport | index.html | kosten.html | betalen.html | contact.html | certificeringen.html |
|---|---|---|---|---|---|
| 320×568 | PASS (320) | PASS (320) | PASS (320) | PASS (320) | **FAIL 329 → PASS 320 after fix** |
| 375×667 | PASS + mobile menu test | — | — | — | — |
| 390×844 | PASS | — | — | — | — |
| 768×1024 | PASS | — | — | — | — |
| 1024×768 | PASS (desktop nav shown) | — | — | — | — |
| 1366×768 | PASS | — | — | — | — |
| 1440×900 | PASS | — | — | — | — |

Mobile menu @375: toggler click → `aria-expanded=true`, `#primaryNav.show`, 7 links visible,
heights 43–47 px. Overflowing elements at 320 on index = only decorative `.hero-blob` (clipped by
`overflow:hidden`, no page scroll).

## 8. Accessibility

**Scripted:** one H1/page · no heading jumps · 0 duplicate ids · all controls labelled ·
all images alt + dimensions · `lang="nl"` ×13 · skip link = first Tab stop and becomes visible ·
no console errors (browser console empty on all tested pages).

**Manual:** contrast computed for 11 colour pairs — min 4.68:1 (AA pass), body 12.63:1,
brand blue 7.79:1, footer link 7.64:1, accent button 5.02:1 · reduced-motion media query present ·
focus-visible rules present for links/buttons/nav/toggler · touch targets 43–47 px.

**Limitation:** `:focus-visible` ring could not be visually confirmed through the harness —
recommend a short manual keyboard pass.

## 9. Privacy / technical (browser network log)

| Test | Result |
|---|---|
| Third-party requests on load | **none** — only same-origin CSS/JS/images |
| Cookies / localStorage / sessionStorage | none (code + runtime) |
| Analytics / ads / tag managers | none (grep + network) |
| Third-party fonts | none — Verdana system stack confirmed in `_variables.scss:52` |
| Form pre-submission transmission | none — handler builds `mailto:` client-side (main.js:268) |
| Embeds (maps/social/payment) | none — OSM and LinkedIn are plain anchor links (200) |

## 10. Structured data

All JSON-LD blocks parse: LegalService + WebSite (index), BreadcrumbList ×11, Service,
FAQPage, ContactPage, ProfilePage, WebPage. `priceRange` = "€ 250 per uur exclusief BTW";
`foundingDate` 1996; `sameAs` = LinkedIn only; FAQ answers byte-match visible text;
no `vercel.app` or deleted-page URLs anywhere.

## 11. Defects found → fixed → retested (this audit)

| # | Defect | Fix | Retest |
|---|---|---|---|
| 1 | 7 homepage service links → non-existent anchors on `juridisch-advies.html` | added ids `onroerend-goed-grondzaken`, `testamenten`, `echtscheidingen-mediation`, `privacy-gdpr` | anchor check 47/47 resolve |
| 2 | `certificeringen.html` horizontal overflow at 320 px (MfN badge row) | SCSS: `.award-row { flex-wrap: wrap }`, `.award-badge { max-width: min(14rem, 100%) }` + rebuild | scrollWidth 329 → 320, 0 overflowing elements |
