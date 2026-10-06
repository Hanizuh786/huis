# Requirements matrix — Huisjurist B.V. redesign (audit of 2026-10-03)

Statuses used: VERIFIED COMPLETE · PARTIALLY COMPLETE · NOT COMPLETE · NOT APPLICABLE ·
POST-LAUNCH ACTION · POTENTIAL CONFIRMATION REQUIRED

"Vercel link" column gives Hilda the exact URL to review the evidence.
Base: https://huis-two.vercel.app

---

## A. Business separation

| # | Requirement | Status | Files inspected | Evidence | Test performed | Remaining action | Blocking? | Vercel link |
|---|---|---|---|---|---|---|---|---|
| A1 | No "one practice"/Dutch+UAE office claim anywhere | VERIFIED COMPLETE | all 12 pages (local + Vercel) | zero hits for "Holland Legal Services", "Dutch Lawyer", dutchlawyerindeuae, youcanbook, "2 landen", "gespecialiseerde website", "bemiddelt", hoofdkantoor+Dubai, AED, PayFort | case-insensitive grep of every deployed page HTML + JSON-LD | — | no | https://huis-two.vercel.app/index.html |
| A2 | "Een hoofdkantoor in Joure en juridische slagkracht in Dubai." removed | VERIFIED COMPLETE | index.html | full sentence absent; only "met een hoofdkantoor in Joure" (hero:171) remains | grep | see A7 wording confirmation | no | https://huis-two.vercel.app/index.html |
| A3 | "2 landen: NL & UAE" removed | VERIFIED COMPLETE | all pages | absent | grep | — | no | — |
| A4 | UAE services not attributed to Huisjurist B.V. | VERIFIED COMPLETE | all pages, JSON-LD | no UAE service text; Service JSON-LD areaServed = NL only | grep + JSON-LD parse | — | no | https://huis-two.vercel.app/juridisch-advies.html |
| A5 | Dutch Lawyer in de UAE Facebook page removed from sameAs | VERIFIED COMPLETE | index.html JSON-LD | `sameAs: ["https://www.linkedin.com/in/huisjurist/"]` only | JSON-LD parse, person + LegalService blocks | — | no | https://huis-two.vercel.app/index.html |
| A6 | No UAE booking/social destinations on Huisjurist links | VERIFIED COMPLETE | all pages | external links = linkedin.com/in/huisjurist + openstreetmap.org only; booking = mailto info@huisjurist.nl | full link extraction + curl (both 200) | — | no | https://huis-two.vercel.app/contact.html |
| A7 | Pre-click HLS disclaimer where HLS link remains | NOT APPLICABLE | all pages | no HLS link exists anywhere → nothing to disclose | grep "Holland Legal" in deployed HTML: 0 hits | wording decision on "hoofdkantoor in Joure" (see H5) | no | — |
| A8 | DIAC reference = verified role/qualification only | VERIFIED COMPLETE | index.html:341, certificeringen.html:99 | "Dubai International Arbitration Centre #13-337"; bare "Dubai Arbitration Centre" absent | grep | date/currentness confirmation (I2) | no | https://huis-two.vercel.app/certificeringen.html |
| A9 | Build tooling must not publish UAE URLs | POTENTIAL CONFIRMATION REQUIRED | scripts/*.mjs, scss/* | /scripts/import-uae.mjs returns 200 on Vercel and contains 6 HLS/dutchlawyer URL references; not linked, robots-disallowed | curl status + grep on deployed file | add `.vercelignore` (verify build) before launch | no (test build) | https://huis-two.vercel.app/scripts/import-uae.mjs |

## B. Name and rate

| # | Requirement | Status | Files inspected | Evidence | Test performed | Remaining action | Blocking? | Vercel link |
|---|---|---|---|---|---|---|---|---|
| B1 | Name "mr. Hilda van der Tuin" | VERIFIED COMPLETE | all 12 heads + headings | meta author on 12/12; H1 on wie-ben-ik; portrait alt | grep | — | no | https://huis-two.vercel.app/wie-ben-ik.html |
| B2 | € 250 per uur exclusief BTW everywhere | VERIFIED COMPLETE | hero, blue price card, kosten ×2, services rate block, persoonlijk, zakelijk, betalen, search index, priceRange | all show "€ 250 … exclusief BTW"; €250 (no space) = 0 hits | grep across html/js/svg/xml | — | no | https://huis-two.vercel.app/kosten.html |
| B3 | € 302,50 incl. 21% BTW consumer-facing | VERIFIED COMPLETE | index:363, juridisch-advies:163, kosten meta + FAQ, search description | present at all consumer touchpoints | grep | — | no | https://huis-two.vercel.app/index.html |
| B4 | € 185 removed everywhere incl. hidden | VERIFIED COMPLETE | all sources | "185" count = 0 in html/js/xml/svg (CSS hit was rgb components only) | grep `€185`, `€ 185`, bare `185` | — | no | — |
| B5 | Required uurtarief sentence | VERIFIED COMPLETE | index.html:363, juridisch-advies.html:165 | verbatim sentence present | grep exact string | — | no | https://huis-two.vercel.app/index.html |
| B6 | Additional-costs wording | VERIFIED COMPLETE | index.html:364, kosten.html FAQ JSON-LD | verbatim sentence present in body + structured data | grep exact string | — | no | https://huis-two.vercel.app/kosten.html |
| B7 | "Ureninschatting vooraf." (no ", dus geen verrassingen") | VERIFIED COMPLETE | index:377, juridisch-advies:160, kosten:139 | shortened form ×3; old form absent | grep both | — | no | https://huis-two.vercel.app/kosten.html |
| B8 | Price not animated from false value; 1996 immediate | VERIFIED COMPLETE | assets/js/main.js, index.html | no counter/count-up code exists; hero DOM shows "1996", "ACTIEF SINDS", "€ 250" on first snapshot | JS source search + DOM snapshot right after load | — | no | https://huis-two.vercel.app/index.html |
| B9 | 1996 preserved as historical fact | VERIFIED COMPLETE | all pages, og-image.svg | "Legally blonde sinds 1996" in nav/meta/JSON-LD foundingDate | grep | — | no | — |

## C. Portrait

| # | Requirement | Status | Files inspected | Evidence | Test performed | Remaining action | Blocking? | Vercel link |
|---|---|---|---|---|---|---|---|---|
| C1 | Chequebook image no longer used as portrait | VERIFIED COMPLETE | repo, git history | `31175842_…jpeg` deleted in commit 86254a7; only reference left is this audit's report; file itself visually inspected (cheque photo) | grep + `git log --diff-filter=D` + browser view | — | no | — |
| C2 | Homepage shows supplied portrait | VERIFIED COMPLETE | index.html:330 | `assets/img/hilda-van-der-tuin.png`, 245×229, width/height set | DOM + file check | — | no | https://huis-two.vercel.app/index.html |
| C3 | Wie ben ik shows supplied portrait | VERIFIED COMPLETE | wie-ben-ik.html:140 | same file + dimensions | DOM | — | no | https://huis-two.vercel.app/wie-ben-ik.html |
| C4 | Image is the correct person, not a substitute | VERIFIED COMPLETE | assets/img/hilda-van-der-tuin.png | visually inspected in browser: portrait photo of the supplied person | browser screenshot | — | no | — |
| C5 | Alt text exact | VERIFIED COMPLETE | index:330, wie-ben-ik:140 | "mr. Hilda van der Tuin, directeur van Huisjurist B.V." on both | DOM extraction compare | — | no | — |

*(matrix continues in §D–§N below)*

## D. Old content removal

| # | Requirement | Status | Files inspected | Evidence | Test performed | Remaining action | Blocking? | Vercel link |
|---|---|---|---|---|---|---|---|---|
| D1 | 23 UAE archive articles gone | VERIFIED COMPLETE | repo, Vercel, sitemap, search index | no `en-nu-een-bedrijf-starten/` files locally; article URLs 404 on Vercel; absent from sitemap + search index | curl status per route; file listing; grep | — | no | https://huis-two.vercel.app/en-nu-een-bedrijf-starten/ (404) |
| D2 | `bedrijf-starten-dubai-uae.html` gone | VERIFIED COMPLETE | repo, Vercel | file absent; route 404 | curl | — | no | https://huis-two.vercel.app/bedrijf-starten-dubai-uae.html (404) |
| D3 | Five old blog articles + blog page gone | VERIFIED COMPLETE | repo, Vercel | `blog.html` absent; `/blog.html` and `/uw-huisjurist-blogt/` 404; no blog links on any page; search index has no blog entries | curl + link extraction + index grep | — | no | https://huis-two.vercel.app/blog.html (404) |
| D4 | 20 awards 2012–2017 and award claims removed | VERIFIED COMPLETE | all pages, og-image, search index | "20+ awards", "Onderscheidingen sinds 2012", "Mediation lawyer of the year", "house of awards", "DIFC" = 0 hits; `/certificeringen-en-awards.html` 404 | grep + curl | — | no | https://huis-two.vercel.app/certificeringen.html |
| D5 | Removal covers nav/footer/buttons/links/search/meta/sitemap/JSON-LD | VERIFIED COMPLETE | sitemap.xml, main.js search index, all JSON-LD, all footers | sitemap = 12 retained pages; search index = same 12; JSON-LD has no deleted-article or HLS data | structured comparison of file set vs sitemap vs index | — | no | https://huis-two.vercel.app/sitemap.xml |
| D6 | Deleted pages not hidden, not redirected to HLS | VERIFIED COMPLETE | Vercel | all tested legacy routes return bare 404, no redirect chain to any domain | `curl -w %{http_code} %{redirect_url}` | legacy 301 map at launch (§7 of FINAL-AUDIT) | no | — |
| D7 | Founding year 1996 remains | VERIFIED COMPLETE | all pages | present in nav, meta, JSON-LD foundingDate | grep | — | no | — |
| D8 | Undated qualifications not silently removed | VERIFIED COMPLETE (see I2) | certificeringen.html | DIAC #13-337, Raad van State, MfN, PRINCE2 #02354945-01-V5YE all still present | DOM read | confirmation of currentness (I2) | no | https://huis-two.vercel.app/certificeringen.html |

## E. Service links (destinations verified, not just status)

All nine legacy service links resolve to live internal sections after this audit's anchor fix
(anchor check: 47 anchor links, 0 broken). Destinations are Huisjurist pages only.

| # | Requirement (legacy link) | Status | Destination now | Visible text | Destination content checked | Provider identity | Blocking? | Vercel link |
|---|---|---|---|---|---|---|---|---|
| E1 | A good mediator | VERIFIED COMPLETE | juridisch-advies.html#echtscheidingen-mediation | "goede mediator" | card "Echtscheidingen & mediation" — gecertificeerd mediator, samen naar oplossing | Huisjurist B.V. | no | https://huis-two.vercel.app/index.html |
| E2 | Divorce | VERIFIED COMPLETE | juridisch-advies.html#echtscheidingen-mediation | "scheiden" | same card + persoonlijke vraag page | Huisjurist B.V. | no | https://huis-two.vercel.app/persoonlijke-juridische-vraag.html |
| E3 | Wills / international wills | VERIFIED COMPLETE | juridisch-advies.html#testamenten | "testament", "internationaal testament" | card "Testamenten" incl. international-dimension sentence | Huisjurist B.V. | no | https://huis-two.vercel.app/index.html |
| E4 | Privacy questions | VERIFIED COMPLETE | juridisch-advies.html#privacy-gdpr | "GDPR" | card "Privacywetgeving & GDPR/AVG" | Huisjurist B.V. | no | https://huis-two.vercel.app/index.html |
| E5 | Buying land from a municipality | VERIFIED COMPLETE | juridisch-advies.html#onroerend-goed-grondzaken | "grond aankopen" | card "Onroerend goed & grondzaken" | Huisjurist B.V. | no | https://huis-two.vercel.app/index.html |
| E6 | Preparing municipal land for sale | VERIFIED COMPLETE | juridisch-advies.html#onroerend-goed-grondzaken | "gemeente" | same card | Huisjurist B.V. | no | https://huis-two.vercel.app/index.html |
| E7 | A business conflict | VERIFIED COMPLETE | juridisch-advies.html#conflicten-interim-management | "conflict" | card "Conflicten & interim-management" | Huisjurist B.V. | no | https://huis-two.vercel.app/index.html |
| E8 | Buying an apartment in Dubai | NOT APPLICABLE | removed with UAE content | — | no Dubai property link exists; the only "appartementen" mention is the neutral Dutch card text | Huisjurist B.V. | no | https://huis-two.vercel.app/juridisch-advies.html |
| E9 | A foreign establishment in Dubai | NOT APPLICABLE | removed with UAE content | — | no UAE establishment link exists | Huisjurist B.V. | no | — |

Fix performed during audit: `juridisch-advies.html` gained ids `onroerend-goed-grondzaken`,
`testamenten`, `echtscheidingen-mediation`, `privacy-gdpr` (no wording changes). Before the fix the
Vercel build silently dropped visitors on the page top for E1–E7.

## F. Search

| # | Requirement | Status | Files inspected | Evidence | Test performed | Remaining action | Blocking? | Vercel link |
|---|---|---|---|---|---|---|---|---|
| F1 | Magnifying glass = real semantic button with accessible name | VERIFIED COMPLETE | zoeken.html:85, index.html:398 | `<button type="submit" aria-label="Zoeken op deze site">`; accessibility tree exposes "Zoeken op deze site" button | browser accessibility snapshot | — | no | https://huis-two.vercel.app/zoeken.html |
| F2 | Keyboard operable, Enter triggers search | VERIFIED COMPLETE | zoeken.html, main.js:168 | typed "stakingswinst" + Enter → instant results rendered; GET flow `?q=testament` also works | real keyboard input in browser | — | no | https://huis-two.vercel.app/zoeken.html |
| F3 | Instruction text when no instant search | NOT APPLICABLE (instruction present anyway) | index.html:393 | "Vul uw zoekterm in en druk op Enter of klik op de zoekknop." present; instant search also implemented | grep + browser | — | no | https://huis-two.vercel.app/index.html |
| F4 | Index contains all retained pages | VERIFIED COMPLETE | assets/js/main.js | 12 entries = 12 files | programmatic set comparison | — | no | https://huis-two.vercel.app/zoeken.html |
| F5 | Deleted pages / old terms absent | VERIFIED COMPLETE | main.js | "stakingswinst" → Geen resultaten; "filmscript" → Geen resultaten; no blog/UAE entries | live search in browser | — | no | https://huis-two.vercel.app/zoeken.html |
| F6 | Relevant terms return correct results | VERIFIED COMPLETE | main.js | "kosten" → Wat kost het? + rate description | live search in browser | — | no | https://huis-two.vercel.app/zoeken.html |
| F7 | Result descriptions use corrected rate | VERIFIED COMPLETE | main.js:175 | "€ 250 per uur exclusief BTW (€ 302,50 inclusief 21% BTW)…" | result list DOM read | — | no | — |
| F8 | Google custom-search fallback tested or removed | VERIFIED COMPLETE | all html/js | zero `google`/`cse`/`cx=` references — removed entirely (permitted outcome) | grep | — | no | — |

## G. Privacy and technical facts

| # | Requirement | Status | Files inspected | Evidence | Test performed | Remaining action | Blocking? | Vercel link |
|---|---|---|---|---|---|---|---|---|
| G1 | Hosting platform identified | POTENTIAL CONFIRMATION REQUIRED | repo, robots.txt, README, privacy.html, both audit reports | hosting implied by Vercel deployment but never documented as a fact in any source | repository-wide grep + deployment inspection | name the host and its log policy in privacy.html | no (test build); yes before launch | https://huis-two.vercel.app/privacy.html |
| G2 | Cookies / localStorage / sessionStorage / analytics / ads | VERIFIED COMPLETE | main.js, all html | no `document.cookie`, no storage APIs, no gtag/fbq/Analytics; privacy.html states this | grep + browser network log (same-origin only) | — | no | https://huis-two.vercel.app/privacy.html |
| G3 | No third-party fonts/requests/embeds | VERIFIED COMPLETE | scss, main.css, all html | Verdana/Geneva/Tahoma system stack; no fonts.googleapis/typekit; OSM + LinkedIn are plain links (200), not embeds | grep + network log | — | no | — |
| G4 | Contact form does not transmit before submission | VERIFIED COMPLETE | contact.html:173, main.js:250–268 | form has no action/endpoint; submit handler builds `mailto:info@huisjurist.nl` client-side | code read | — | no | https://huis-two.vercel.app/contact.html |
| G5 | Booking = mailto (no UAE-branded booking) | VERIFIED COMPLETE | all pages | no youcanbook/calendly; "Afspraak maken" → mailto info@huisjurist.nl | grep + link extraction | confirm mailto booking is intended (H8) | no | https://huis-two.vercel.app/contact.html |
| G6 | Privacy statement matches implementation | PARTIALLY COMPLETE | privacy.html (6 accordions) | no-cookie, no-analytics, form, rights and change sections all match observed behaviour; only the storage claim depends on the unknown host | code vs text comparison | resolve G1, then qualify the sentence | no (test build) | https://huis-two.vercel.app/privacy.html |
| G7 | No incognito/VPN claim, no "browsing = consent", no "deleted within days", no blanket no-sharing claim | VERIFIED COMPLETE | privacy.html | none of these claims appear | grep | — | no | https://huis-two.vercel.app/privacy.html |
| G8 | Not just a re-dated old policy | VERIFIED COMPLETE | privacy.html + JSON-LD | rewritten structure, WebPage JSON-LD with datePublished/dateModified, matches static implementation | content read | — | no | — |

## H. Business information

| # | Requirement | Status | Files inspected | Evidence | Test performed | Remaining action | Blocking? | Vercel link |
|---|---|---|---|---|---|---|---|---|
| H1 | info@huisjurist.nl | VERIFIED COMPLETE | all pages + JSON-LD | present in heads, footers, JSON-LD email | grep | — | no | — |
| H2 | Verified account holder + bank data | VERIFIED COMPLETE | betalen.html:95–100 vs production /betaling/ | IBAN NL63KNAB 0257939938, BIC KNABNL2H, Huisjurist B.V., PLAATS Leeuwarden, Knab address Cappelalaan 25, 2132 JK Hoofddorp — byte-identical to production | side-by-side page comparison | — | no | https://huis-two.vercel.app/betalen.html |
| H3 | Opening hours | VERIFIED COMPLETE (local only) | contact.html:154 (uncommitted) | "Openingstijden: maandag t/m vrijdag, 09:00–17:00." present in working tree; **not yet on Vercel** | grep local vs curl Vercel (0 hits) | redeploy (B1) | no | https://huis-two.vercel.app/contact.html |
| H4 | Full registered address + postcode | POTENTIAL CONFIRMATION REQUIRED | full repo, git history (never existed), all 10 PDFs (text extraction), image XMP, all 102 production pages, Vercel, README, audit reports | no street/postcode anywhere; production office page only says Joure + A6/A7 + "op afspraak" | exhaustive multi-source search (see FINAL-AUDIT §8.2) | supply address → contact page + PostalAddress JSON-LD | no (test build); blocking at launch | https://huis-two.vercel.app/contact.html |
| H5 | KvK number | POTENTIAL CONFIRMATION REQUIRED | same locations as H4 | 0 hits (only this audit's own reports mention the term) | exhaustive search | supply KvK | no (test build); blocking at launch | https://huis-two.vercel.app/contact.html |
| H6 | BTW-identificatienummer | POTENTIAL CONFIRMATION REQUIRED | same locations as H4 | 0 hits | exhaustive search | supply BTW-id | no (test build); blocking at launch | https://huis-two.vercel.app/contact.html |
| H7 | Joure office references | POTENTIAL CONFIRMATION REQUIRED | all footers (×12), contact.html:139 | "twee minuten rijden vanaf de A6 of A7" carried over from production (2021) — unverified | production comparison | confirm wording | no | https://huis-two.vercel.app/contact.html |
| H8 | Accepted payment methods | VERIFIED COMPLETE | betalen.html vs production /betaling/ | bank transfer now; cards/PayFort by arrangement — matches production behaviour | side-by-side comparison | confirm no gateway wanted | no | https://huis-two.vercel.app/betalen.html |
| H9 | No HILS business data inserted | VERIFIED COMPLETE | all pages | no HLS address/bank/social anywhere | grep | — | no | — |

## I. Service claims

| # | Requirement | Status | Evidence | Test | Blocking? | Vercel link |
|---|---|---|---|---|---|---|
| I1 | "om samen naar een oplossing te zoeken" replaces "tot er een werkende oplossing ligt" | VERIFIED COMPLETE | new phrase ×2 (index:238, juridisch-advies:123); old phrase absent | grep | no | https://huis-two.vercel.app/index.html |
| I2 | "— anders klopt de helft niet." removed | VERIFIED COMPLETE | absent | grep | no | — |
| I3 | International-testament sentence retained | VERIFIED COMPLETE | persoonlijke-juridische-vraag.html:106 verbatim | grep | no | https://huis-two.vercel.app/persoonlijke-juridische-vraag.html |
| I4 | General "51% eis" / "51% aandeelhouder" removed | VERIFIED COMPLETE | only occurrence is inside compiled Bootstrap CSS colour variables | grep | no | — |
| I5 | "Dubai International Arbitration Centre" full name | VERIFIED COMPLETE | index:341, certificeringen:99; bare form absent | grep | no | https://huis-two.vercel.app/certificeringen.html |
| I6 | DIAC / Raad van State = verified roles only | POTENTIAL CONFIRMATION REQUIRED | "#13-337" and "Mediator bij de Raad van State" present but undated | repo/PDF/production search found no dating evidence | no | https://huis-two.vercel.app/certificeringen.html |
| I7 | MfN registermediator membership current | POTENTIAL CONFIRMATION REQUIRED | badge + "Lidmaatschap MfN" + 6 MfN PDF links | no dating evidence in any source | no | https://huis-two.vercel.app/certificeringen.html |
| I8 | Complaints text invents no roles for other organisations | VERIFIED COMPLETE | klachten.html:154 → own Klachtenregeling 2026 + toelichting (both PDFs 200) | content read + link test | no | https://huis-two.vercel.app/klachten.html |

## J. Dutch corrections

All checks run over `*.html`, `assets/js/*.js`, `sitemap.xml`, `assets/img/*.svg` (scripts/ and
audit/ excluded as non-published tooling).

| # | Correction | Status | Result |
|---|---|---|---|
| J1 | juridentaal → juristentaal | VERIFIED COMPLETE | old form absent; new form ×2 |
| J2 | Interim management → Interim-management | VERIFIED COMPLETE | old form absent; new form ×14 incl. og-image.svg and twitter meta (uncommitted fix) |
| J3 | privacy wetgeving → privacywetgeving | VERIFIED COMPLETE | old absent; new ×2 |
| J4 | privacy jurist → privacyjurist | VERIFIED COMPLETE | old absent; new present |
| J5 | all-in prijs → all-inprijs | VERIFIED COMPLETE | old absent; new ×2 |
| J6 | all-in uurtarief → all-inuurtarief | VERIFIED COMPLETE | old absent; new in kosten keywords |
| J7 | GDPR compliant → GDPR-compliant | VERIFIED COMPLETE | old absent; new ×2 |
| J8 | AVG/GDPR compliance → AVG/GDPR-compliance | VERIFIED COMPLETE | old absent; new present |
| J9 | een conflict wat → een conflict dat | VERIFIED COMPLETE | old absent; new present |
| J10 | het kanaal wat → dat | VERIFIED COMPLETE | old absent |
| J11 | €185,— → € 250 exclusief BTW | VERIFIED COMPLETE | €185 absent; € 250 present everywhere |
| J12 | €1,10 → €1,10 (unchanged) | NOT APPLICABLE | no €1,10 figure exists in the build (no per-km costs are charged) |
| J13 | LinkedIN → LinkedIn | VERIFIED COMPLETE | wrong casing only survives inside supplied NMv `.txt` packs (unpublished) and lowercase keywords |
| J14 | via E-mail → via e-mail | VERIFIED COMPLETE | old casing absent; new form ×13 |
| J15 | Mijn CV / Voor mijn CV → cv | VERIFIED COMPLETE | old casing absent; "Mijn cv via LinkedIn", "Voor mijn cv en zakelijke berichten" present |
| J16 | Portal toegang → Toegang tot de portal | VERIFIED COMPLETE | new form present (kosten:140); old absent |
| J17 | in Euro's → in euro's | VERIFIED COMPLETE | old form absent; new form ×3 |
| J18 | IP adres / IP nummer | NOT APPLICABLE | neither term appears (privacy page does not discuss IP logging — see G1) |
| J19 | binnen paar dagen → binnen een paar dagen | VERIFIED COMPLETE | old absent |
| J20 | èn (emphasis) → én | VERIFIED COMPLETE | "èn" absent; "én" present |
| J21 | Protected: responsief / op weekbasis / U wenst? untouched | VERIFIED COMPLETE | responsief ×3, op weekbasis ×2, "U wenst?" ×12 nav links |
| J22 | Site stays in "u" form | VERIFIED COMPLETE | all forms of address remain "u/uw" | 

## K. Complaints and Basecamp files

| # | Requirement | Status | Evidence | Blocking? |
|---|---|---|---|---|
| K1 | All supplied assets found and inventoried | VERIFIED COMPLETE | 44 files under `assets/files/` + `assets/img/` listed in [ASSET-INVENTORY.csv](ASSET-INVENTORY.csv) (language, purpose, usage, membership dependence) | no |
| K2 | Dutch complaints procedure 2026 + toelichting used and working | VERIFIED COMPLETE | linked from klachten.html:161/167; both return 200 on Vercel | no |
| K3 | English complaints procedure + explanation used and working | VERIFIED COMPLETE | linked from klachten.html:173/179; both 200 on Vercel | no |
| K4 | MfN code + regulations (NL/DE/FR/UK) + FR code | VERIFIED COMPLETE (usage) | linked from certificeringen.html:135–165; all 5 return 200 on Vercel; NL gedragsregels also 200 | no |
| K5 | NMv logo packs + SoMe packs not automatically published | VERIFIED COMPLETE | 24 NMv/Scheiden files present but `publicly_linked = no` — correct: supplied ≠ published | no |
| K6 | Duplicates identified | VERIFIED COMPLETE | MfN regulations exist in 4 languages (by design); FR has 2 documents; `.DS_Store` ×2 are junk | no |
| K7 | Membership-dependent assets flagged | POTENTIAL CONFIRMATION REQUIRED | MfN badge + 6 MfN PDFs are presented as current membership (see I7) | no |

## L. Accessibility (automated vs manual clearly separated)

**Automated/scripted results** — all pass:
heading hierarchy no jumps and exactly one H1 per page (13 pages) · footer headings = H2 (no H3+
leap) · zero duplicate ids · every form control labelled (contact ×4, search ×1) · every image has
alt + width/height · `lang="nl"` on all pages · skip link is first tab stop and becomes visible ·
signals: search button exposed with accessible name · no console errors on any tested page ·
39 mailto links, 0 empty-href links · decorative checkmarks come from CSS `::before` (no duplicated
literal ✓ in text).

**Manual results:**
- Colour contrast (computed, WCAG formula): 11 key pairs — lowest 4.68:1 (muted text on soft bg),
  body 12.63:1, brand blue 7.79:1, footer 13.83:1, accent button 5.02:1 — **all pass AA**.
- Keyboard: Tab → skip link → brand → menu; focus styles exist in CSS for links, nav links, buttons,
  toggler, inputs (Bootstrap + custom `a:focus-visible` outline). Harness could not visually
  confirm the ring — recommend a manual pass (limitation, not a failure).
- Mobile menu: opens/collapses, `aria-expanded` toggles, all 7 links reachable, targets 43–47 px.
- Reduced motion: `prefers-reduced-motion: reduce` disables animations and reveal transforms.
- Dialog behaviour: not applicable (no dialogs on the site).

## M. Responsive and browser testing

| Viewport | index | kosten | betalen | contact | certificeringen |
|---|---|---|---|---|---|
| 320×568 | pass (scrollW 320) | pass | pass | pass | **fail → fixed** (329→320) |
| 375×667 | pass + menu tested | — | — | — | — |
| 390×844 | pass | — | — | — | — |
| 768×1024 | pass | — | — | — | — |
| 1024×768 | pass (desktop nav visible) | — | — | — | — |
| 1366×768 | pass | — | — | — | — |
| 1440×900 | pass | — | — | — | — |

Long Dutch words ("Interim-management", "privacywetgeving", "Mediationsordnung") wrap without
overflow; PDF links work at all sizes; hero blobs are decorative and clipped by `overflow:hidden`
(do not create page scroll). **Browser coverage: Chromium only** (Firefox/WebKit unavailable in
this harness) — recorded as a limitation.

## N. SEO and structured data

| # | Requirement | Status | Evidence | Blocking? |
|---|---|---|---|---|
| N1 | Unique page titles | VERIFIED COMPLETE | 12 unique titles ("/" is the same document as /index.html) | no |
| N2 | Useful meta descriptions | PARTIALLY COMPLETE | 12/12 present; `wie-ben-ik.html` = 180 chars (over the recommended 175) | no |
| N3 | Correct H1 usage | VERIFIED COMPLETE | exactly one H1 per page | no |
| N4 | Canonical + OG URLs = live domain, no Vercel URLs | VERIFIED COMPLETE | all point to `https://www.huisjurist.nl/…`; `vercel.app` appears in zero meta/JSON-LD | no |
| N5 | Robots directives + test indexability | POTENTIAL CONFIRMATION REQUIRED | 11× `index, follow`, zoeken `noindex`; test build is crawlable — confirm intent | no |
| N6 | Sitemap entries correct | VERIFIED COMPLETE | 12 `<loc>` = 12 files = search index; robots.txt points sitemap to live domain | no |
| N7 | Structured data valid | VERIFIED COMPLETE | all JSON-LD blocks parse (LegalService, WebSite, Breadcrumb ×11, Service, FAQPage, ContactPage, ProfilePage, WebPage) | no |
| N8 | Business identity + priceRange correct | VERIFIED COMPLETE | legalName Huisjurist B.V., foundingDate 1996, priceRange "€ 250 per uur exclusief BTW" | no |
| N9 | Address complete | POTENTIAL CONFIRMATION REQUIRED | PostalAddress has locality/region/country only — no street/postcode (H4) | no (test build) |
| N10 | FAQ data matches visible text | VERIFIED COMPLETE | kosten.html FAQ answers byte-match the visible accordion text | no |
| N11 | No deleted-article data, no HLS social identity | VERIFIED COMPLETE | JSON-LD scan: zero deleted URLs, `sameAs` = LinkedIn only | no |
| N12 | Google Search Console | POST-LAUNCH ACTION | "Google Search Console validation and sitemap submission will be completed only after the approved build is deployed on the live huisjurist.nl domain. It is not a blocker for approval of the Vercel test build." | no |
| N13 | Legacy production URLs redirect (301 map) | POST-LAUNCH ACTION | 98 production-only paths return 404 on the test build (no `vercel.json`/`_redirects` exists) — intentional for the test build; required before live cutover | no (test build) |
| N14 | Verify canonical/OG after live-domain cutover | POST-LAUNCH ACTION | already set to `https://www.huisjurist.nl/…`; re-verify on launch day | no |
