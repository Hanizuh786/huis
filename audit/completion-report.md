# Huisjurist test build — completion report

**Date:** 2 October 2026
**Build:** local test build at `/Users/apple/Desktop/huisjurist.nl` (working tree on top of commit 7436259 "latest updates"; all corrections are uncommitted, nothing pushed). The live site huisjurist.nl is untouched.
**Served pages (12):** index.html, wie-ben-ik.html, juridisch-advies.html, kosten.html, contact.html, persoonlijke-juridische-vraag.html, zakelijke-juridische-vraag.html, certificeringen.html, klachten.html, betalen.html, privacy.html, zoeken.html — plus sitemap.xml and robots.txt.

Every item below was verified against the actual files in this build (grep/read of the served HTML, XML, CSS and JS), not against assumptions.

---

## 1. Separate providers — Huisjurist B.V. and Holland Legal Services FZ-LLC

**Status: implemented.**

- No occurrence of "Holland Legal Services", "FZ-LLC", "2 landen", "NL & UAE", or any two-country/one-practice claim anywhere in the served pages. Tested: case-insensitive search across all *.html, sitemap.xml and assets/js/main.js — zero hits.
- Homepage "Een hoofdkantoor in Joure en juridische slagkracht in Dubai" and "2 landen: NL & UAE" removed. The homepage now presents one practice with its werkkantoor in Joure (index.html:171).
- UAE archive overview (/en-nu-een-bedrijf-starten/), additional archive page (bedrijf-starten-dubai-uae.html) and all 23 UAE articles deleted from the build. Tested: no file remains, and no link to `en-nu-een-bedrijf`, `bedrijf-starten-dubai` or `blog.html` exists in any served file or in the search index.
- The wordings "de huidige, gespecialiseerde websites van de praktijk", "onze gespecialiseerde website" and "Huisjurist bemiddelt naar de huidige UAE-praktijk" are gone. Tested: grep — zero hits.
- No redirect from deleted pages to Holland Legal Services was created (pages are simply absent).
- No link to Holland Legal Services remains on any served page, so the suggested sentence "Holland Legal Services FZ-LLC is een afzonderlijke onderneming en een andere dienstverlener dan Huisjurist B.V." was **not** added — per your instruction not to compensate with a general disclaimer, and because there is no remaining reference that needs the clarification. If you later want a link to the separate practice, the sentence should be placed immediately before that link.
- Your UAE residence is not presented as part of Huisjurist B.V.; no UAE office or residence claim appears anywhere.

## 2. Hourly rate

**Status: implemented everywhere, including non-visible text.**

- Old "€185" / "€ 185" / "€185,—": zero occurrences in the build. Tested: search for "185" across all served HTML, XML and JS — no hits.
- "€ 250 per uur exclusief BTW" and, where consumers are addressed and 21% BTW applies, "€ 302,50 per uur inclusief 21% BTW" are present in all required locations (19 checked):
  - Homepage counter/trust strip (index.html:190), "Wat kost het?" text (index.html:363), blue price card (index.html:370-371)
  - Costs page: both rate displays (kosten.html:115, prijs card kosten.html:132-134) and references (kosten.html:7, 22, 27, 115)
  - Services page rate block and rate references (juridisch-advies.html)
  - Personal and business questions pages (persoonlijke-juridische-vraag.html:130, zakelijke-juridische-vraag.html)
  - Payment page rate link (betalen.html:123 "Bekijk het uurtarief van € 250 exclusief BTW")
  - Internal search descriptions (assets/js/main.js SITE_INDEX entry for kosten.html)
  - Homepage structured-data priceRange (index.html:57) and FAQ structured data on the costs page (kosten.html:49)
- Complete sentence used: "Het uurtarief van Huisjurist B.V. is € 250 exclusief BTW (€ 302,50 inclusief 21% BTW)." Space between € and amount verified in every occurrence.
- The rate and the founding year are static text. Tested: main.js contains no count-up/counter animation; the only typewriter effect cycles service words (Echtscheidingen|Testamenten|Onroerend goed|Grondzaken|Privacywetgeving), never years or amounts. "1996" appears as plain text (index.html:186, 203).
- Additional-costs FAQ now distinguishes the two statements (kosten.html:54, 117, 160): "Wij rekenen geen opslag voor kantoorkosten en geen reiskosten per kilometer. Eventuele kosten van andere dienstverleners worden vooraf met u besproken." The FAQ answer that previously said only "Nee" now names the notary/bailiff example separately.
- Price-card bullet shortened as instructed: "Ureninschatting vooraf" (kosten.html:139); "dus geen verrassingen" removed. Tested: zero hits for the old bullet.

## 3. Photograph

**Status: implemented.**

- Homepage (index.html:330) and "Wie ben ik?" (wie-ben-ik.html:140) now use `assets/img/hilda-van-der-tuin.png` — the supplied portrait (red blazer), visually verified identical to your Attachment 1.
- Alt text on both pages: "mr. Hilda van der Tuin, directeur van Huisjurist B.V."
- The chequebook photo (31175842_1699062696836407_7_med_hr.jpeg) is deleted from the repository; zero references remain (tested).

## 4. Content older than five years (cutoff 2 October 2021)

**Status: implemented.**

- All 23 UAE archive articles, the archive overview, the additional archive access page and blog.html removed (listed in section 1). Tested: files absent; sitemap.xml contains exactly the 12 remaining pages; search index rebuilt to the same 12 pages with no stakingswinst/filmscript/visum/bankrekening-UAE entries.
- The five old texts on the former blog page are gone with the page.
- No empty categories or links to deleted pages remain. Tested: grep for `blog.html`, `en-nu-een-bedrijf`, `bedrijf-starten-dubai` across served files — zero hits. Navigation, footer, "Naar de UAE-gids"/"Alle UAE-artikelen" buttons and inter-article links were removed with the pages.
- The general "51% eis" / "51% aandeelhouder" references in the current service descriptions are removed. Tested: grep for "51%" across served files — zero hits.
- The founding year 1996 is retained as a historical business fact (meta descriptions, JSON-LD foundingDate, trust strip, hero emblem).

## 5. Awards and nominations 2012–2017

**Status: implemented.**

- The complete 20-award list (2×2017, 4×2016, 10×2015, 2×2014, 1×2013, 1×2012) is removed. Tested: no award years 2012–2017 remain; "20+ awards sinds 2012" (homepage and business questions page), "Onderscheidingen sinds 2012", the "Mediation lawyer of the year" introduction and the "house of awards" contact button all return zero hits.
- The certificeringen page now lists only current qualifications/registrations (see section 7).

## 6. DIFC-LCIA and qualifications

**Status: DIFC-LCIA membership presentation removed; qualifications listed with IDs.**

- "DIFC-LCIA" appears nowhere on served pages (tested). "Dubai International Arbitration Centre" appears
  only as the qualification name of the DIAC associate membership on certificeringen.html ("Associate member
  of the DIAC — Dubai International Arbitration Centre #13-337").
- Listed qualifications: PRINCE2 project management (#02354945-01-V5YE), associate member DIAC (#13-337),
  gecertificeerd mediator / mediator bij de Raad van State, MfN-registermediator (membership confirmed by
  you; badge image `assets/img/MfN_Registermediator72.jpg` with alt "MfN-registermediatorbadge"), and
  NMv-lid (Nederlandse Mediation Vereniging) with logo `assets/img/NMv-logo.png` (alt
  "NMv-ledenlogo — Lid van de Nederlandse Mediation Vereniging").
- **Flagged for your confirmation:** the DIAC associate membership and the "Mediator bij de Raad van State"
  line are undated — I cannot tell from the build whether they are current. Please confirm the actual
  status/role (see questions list).

## 7. Service links

**Status: implemented.** Tested by reading every link in the homepage question panels:

| Homepage link | New destination |
|---|---|
| Een goede mediator | juridisch-advies.html#echtscheidingen-mediation |
| Testament / internationaal testament | juridisch-advies.html#testamenten |
| Scheiden (echtscheiding) | juridisch-advies.html#echtscheidingen-mediation |
| GDPR (privacy questions) | juridisch-advies.html#privacy-gdpr |
| Grond aankopen bij een gemeente | juridisch-advies.html#onroerend-goed-grondzaken |
| Gemeente die grond verkoopklaar wil maken | juridisch-advies.html#onroerend-goed-grondzaken |
| Conflict | juridisch-advies.html#conflicten-interim-management |
| Wat kost het | kosten.html |
| Met wie ik zaken doe | wie-ben-ik.html |

- "Buying an apartment in Dubai" and "A foreign establishment in Dubai" (both previously pointed to Certificeringen) are removed — these are Holland Legal Services services and are no longer presented as Huisjurist services. Tested: no Dubai property/establishment link remains on the homepage.
- Wills, privacy questions, municipal land purchase and municipal land preparation now link directly to the relevant sections on juridisch-advies.html instead of the top of the page.

## 8. Booking ("Afspraak maken") and footer

**Status: implemented.**

- Footer "Afspraak maken" on all 12 pages leads to contact.html, where the booking channel identifies Huisjurist B.V.: "Mail uw voorkeur naar info@huisjurist.nl — dan plan ik een afspraak voor Huisjurist B.V., digitaal of in het werkkantoor in Joure." (contact.html:121). Tested: all 12 footers link to contact.html; the former UAE booking page (AED 970, UAE email) is deleted and no booking link points to it.
- No euro-invoice workaround was used; the booking process is the contact page with the Huisjurist B.V. email address.

## 9. Facebook link

**Status: implemented.** The general Facebook link to "Dutch Lawyer in de UAE" is removed from the footer and contact page. Tested: zero "Facebook" occurrences in served files. The homepage JSON-LD `sameAs` and `founder.sameAs` contain only the LinkedIn profile (index.html:75, 97).

## 10. Spelling and grammar list

**Status: implemented.** Each wrong form was searched across all served files; all return zero hits: juridentaal, "Interim management" (now "Interim-management" incl. meta and og-image.svg), privacy wetgeving, privacy jurist, all-in prijs, all-in uurtarief, GDPR compliant, AVG/GDPR compliance, "een conflict wa", "het kanaal wat", €185,—, €1,10 (now "€ 1,10" where applicable), LinkedIN, via E-mail, Mijn CV, Portal toegang, in Euro's, IP adres, IP nummer, binnen paar dagen, èn-for-één emphasis. Correct forms verified in place: juristentaal, Interim-management, privacywetgeving, privacyjurist, all-inprijs, all-inuurtarief, GDPR-compliant, AVG/GDPR-compliance, "een conflict dat", "het kanaal dat", LinkedIn, via e-mail, Mijn cv, Voor mijn cv, Toegang tot de portal, in euro's, IP-adres, IP-nummer, binnen een paar dagen, één.
- Preserved as instructed (not changed): "responsief", "op weekbasis" (wie-ben-ik.html:134, kosten.html:116, 152), "U wenst?" footer heading, "u" register throughout, "Geen dikke dossiers vol juristentaal, maar duidelijke antwoorden waar u iets mee kunt." (corrected word only).

## 11. Specific sentence corrections

**Status: all implemented and tested (21 required wordings present, all old forms absent):**

- Mediation: "…om samen naar een oplossing te zoeken" (replaces "tot er een werkende oplossing ligt").
- International will: "Een testament met een internationale dimensie vraagt extra aandacht." — the "— anders klopt de helft niet." is removed.
- Heading fix: "Ik ben hier vanwege een persoonlijke reden" (persoonlijke-juridische-vraag.html).
- "Op basis van onze ureninschatting weet u of uw budget passend is." (comma removed; kosten.html:117).
- Contact-form explanation: "Uw bericht wordt rechtstreeks in uw eigen e-mailprogramma klaargezet. U verstuurt het zelf."
- Heading: "Schrijf uw vraag en open het bericht in uw eigen e-mailprogramma."
- "Mail naar klachten@huisjurist.nl." (klachten.html:98).
- Complaints sentence: "…dat er binnen mijn bedrijf én bij mijn samenwerkingsverbanden behoorlijk wat alarmbellen gaan rinkelen…" (klachten.html:92 — second "er" removed, accent corrected).
- Work-reporting sentence: "…wat ik voor u heb gedaan, hoeveel tijd daarmee gemoeid was en wat het kost" (consistent time references; "op weekbasis" retained).
- The incomplete "neem privacy uiterst serieus" (missing "ik") was not carried into the new privacy statement.

## 12. Search function

**Status: implemented.**

- The homepage magnifying glass is now a real accessible submit button: `<button class="search-button" type="submit" aria-label="Zoeken op deze site">` inside a `role="search"` form (index.html:394-397), with a visually-hidden label. Tested: the button submits the form to zoeken.html with the query; Enter works because the input is inside the form.
- Instruction text: "Vul uw zoekterm in en druk op Enter of klik op de zoekknop." (index.html:393) — instant results are not implemented, so the honest instruction is shown.
- Search index rebuilt: SITE_INDEX in assets/js/main.js now contains exactly the 12 remaining pages with updated titles, descriptions and keywords, including the corrected rate. Tested: "stakingswinst" and "filmscript" return the "Geen resultaten" state (entries removed); "testament", "mediation", "kosten", "privacy" return the correct remaining pages.
- The external Google search link is removed from all pages (tested: zero google.com/search references). It showed a blank "© 2026 Google" page during testing, so it was removed rather than left as an unusable alternative.

## 13. Privacy statement

**Status: rewritten for the actual technical setup of this build.**

Actual technical facts I can verify from the build itself:
- Static site: HTML, CSS (Bootstrap bundle) and one local JS file (main.js). No analytics, no advertising, no tracking code, no third-party embeds, no iframes, no cookies set by the site (tested: no document.cookie, no analytics snippets, no external scripts besides none — only local files).
- Google search is not loaded on the site (external link removed entirely).
- Contact form: opens the visitor's own email program (mailto:info@huisjurist.nl); nothing is stored or transmitted by the site before the visitor sends the email.
- Booking: via email to info@huisjurist.nl; no third-party booking service is embedded.
- The new privacy.html states: no cookies (by the site or third parties), no analytics/trackers/advertisements, no visitor data sent to external services, contact via own email program, and the visitor's rights under AVG/GDPR. It does **not** carry over: incognito/VPN claims, "browsing constitutes consent", "everything deleted within a few days", or an unchecked "nothing passed to third parties" claim.
- **What I cannot verify from the build:** the hosting provider and any visitor logging the host performs (server logs, IP retention). This is the one input I need from you to finalise retention periods and recipients — see questions list.

## 14. Business information

**Status: partially implemented — needs your verified details.**

- Structured-data address no longer contains the stray "8501"; it now reads Joure / Friesland / NL (index.html:62-66) — still incomplete without street and postcode.
- Contact and bank information left unchanged as instructed: Huisjurist B.V. as account holder, info@huisjurist.nl as ordinary contact address (betalen.html).
- The claim that there is no postal address "because the practice works digitally" is not used as a substitute; the address fields are simply awaiting your verified data.
- KvK number and BTW identification number are not yet on the contact page — awaiting your verified Huisjurist B.V. details.

## 15. Technical and accessibility

**Status: implemented where the build allows.**

- Heading hierarchy corrected: every page now uses h1 → h2 → h3 only; no h6 anywhere (tested: heading-level counts per page; footer headings are h2). Tested output: index 1×h1/9×h2/5×h3; wie-ben-ik 1/6/4; kosten 1/5/3; privacy 1/5/7.
- Duplicate decorative checkmarks removed from the accessibility output — the price-card checkmark is a single CSS ::before per list item; no duplicated ✓ elements in the HTML (tested: zero ✓/checkmark elements in served HTML).
- Accessible search button: see section 12.
- Rate and founding year static: see section 2.
- Structured business address: see section 14 (incomplete — awaiting data).
- Deleted pages removed from structured data and sitemap (tested: sitemap = 12 URLs; no JSON-LD references to deleted pages).
- Robots meta: content pages carry `index, follow`; zoeken.html carries `noindex, follow`. **Decision needed from you:** whether this test build should remain indexable at all — see questions list.
- Canonical and sharing URLs all match the intended live site (https://www.huisjurist.nl/…; og:url set on every page; tested per page).
- Reduced-motion behaviour: `@media (prefers-reduced-motion: reduce)` disables animations/transitions and forces .reveal visible (assets/css/main.css). Contrast: primary #00558f on white and white on #00558f meet AA; the contrast-audit script (scripts/contrast-audit.mjs) was updated to the new palette. **Note:** I verified colours against the CSS values and the audit script output; a full screen-reader and keyboard pass on a rendered build is the remaining manual test.

---

## Remaining items requiring action from you

1. **Full registered address, KvK number and BTW identification number of Huisjurist B.V.** — needed for the contact page and to complete the JSON-LD PostalAddress (street + postcode). I will not invent or borrow Holland Legal Services details.
2. **DIAC associate membership (#13-337) and "Mediator bij de Raad van State"** — both undated; please confirm whether current, and the exact nature of the Raad van State role (e.g., registermediator-list placement vs. appointment). I will not add or remove a role without confirmation.
3. **Payment methods** — the build no longer claims Mastercard, VISA or PayFort; it says payment is on the Huisjurist B.V. bank account in euro's and invites contact for other methods. Confirm whether any card/PayFort option should be listed for Huisjurist B.V.
4. **Booking setup** — "Afspraak maken" currently leads to the contact page (email-based). Tell me the intended booking process for Huisjurist B.V. if you want a dedicated booking page or tool.
5. **Hosting provider and visitor logging** — the only missing fact for the privacy statement: who hosts the site and what the host logs (IP addresses, retention). Everything else about the setup I verified myself (no cookies, no analytics, no trackers, no embeds, contact via own email program).
6. **Indexability of the test build** — confirm whether `index, follow` should stay or become `noindex` until the live launch.
7. **Office arrangements in Joure** — the site says "werkkantoor in Joure, twee minuten rijden vanaf de A6 of A7" and "U bent welkom op afspraak". Please confirm this description is accurate.
8. **Complaints process** — the klachten page describes Huisjurist B.V.'s own procedure and links to the Klachtenregeling 2026 PDFs; it names no external body. If an external complaints body (e.g., a geschillencommissie or MfN complaints route) should be named, confirm the exact role — I have not invented one.
9. **New blog/articles** — the blog page was removed as instructed. If you supply current articles, I will add them, rebuild the search index and extend the sitemap.

## Resolved during this pass (no longer needed from you)

- Portrait: supplied and in place on both pages (hilda-van-der-tuin.png).
- Opening hours: confirmed by you (Monday–Friday 09:00–17:00) and present in JSON-LD openingHoursSpecification (index.html:81-86).
- MfN membership: confirmed holder; shown on certificeringen.html.
- NMv logo and membership: NMv-ledenlogo is aanwezig in `assets/img/NMv-logo.png` (gebruikt op `certificeringen.html`); de NMv-rij toont "Lid van de Nederlandse Mediation Vereniging" met alt-tekst "NMv-ledenlogo — Lid van de Nederlandse Mediation Vereniging". NMv- en MfN-documenten (inclusief Klachtenregeling 2026 en MfN-mediatiereglementen in NL/DE/FR/UK) zijn gekoppeld op `certificeringen.html` en `klachten.html`. **Openstaande beslissing:** op welke overige pagina's NMv verder moet worden gepubliceerd (logo, tekst of beide) en of er een aparte NMv-lidmaatschapssectie of -pagina moet komen.

## What was tested, in short

Grep-level verification of every served file (12 HTML pages, sitemap.xml, robots.txt, assets/js/main.js, assets/img/og-image.svg, CSS): forbidden wordings and rates (zero hits), required wordings (all present), link destinations (read per page), heading levels, heading-order counts, sitemap URL count, search-index entries and live search behaviour for sample queries, JSON-LD fields (priceRange, openingHoursSpecification, sameAs, address), canonical/og:url consistency, robots meta, reduced-motion CSS, and image alt texts. Image content was verified visually (portrait matches Attachment 1; chequebook image removed).
