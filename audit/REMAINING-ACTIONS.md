# Remaining actions — post-audit (2026-10-03)

Ordered by priority. "Blocker?" refers to approval of the **Vercel test build** unless stated.

---

## 1. Deploy the working tree (BLOCKER for review)

The repository contains fixes the test URL does not serve yet:

- anchor fix in `juridisch-advies.html` (7 homepage service links)
- 320 px overflow fix in `scss/components/_components.scss` + rebuilt `assets/css/main.css`
- `contact.html` openingstijden line (pre-existing uncommitted edit)
- `index.html` + `assets/img/og-image.svg` "Interim-management" spelling (pre-existing uncommitted edit)

Action: commit and let Vercel redeploy, then re-run the four spot checks in
[HILDA-REVIEW-LINKS.md](HILDA-REVIEW-LINKS.md) §3.
**Blocker?** Yes — for Hilda's review of those four items.

---

## 2. Confirmation items (searched every available source first)

For each: what is missing, every location searched, why it cannot be completed without it,
and whether it blocks.

### 2.8 NMv logo presentatie en lidmaatschapsplaatsering op de site
- **Status:** NMv-ledenlogo is aanwezig in `assets/img/NMv-logo.png` en gebruikt op
  `certificeringen.html`; de NMv-rij toont "Lid van de Nederlandse Mediation Vereniging" met alt
  "NMv-ledenlogo — Lid van de Nederlandse Mediation Vereniging".
- **Beslissing nodig:** op dit moment is het NMv-logo alleen op de certificeringen-page gebruikt.
  Hilda vroeg om logo's/memdums "waar je gezien fit" zonder enkel bestand/lidmaatschap te missen.
  Beslissing nodig over welke overige pagina's dan ook een NMv-vermelding of logo moeten krijgen
  (bijv. homepage, wie-ben-ik, klachten, footersectie, aparte NMv-lidmaatschapstelling/pagina).
- **Bestanden die nu beschikbaar zijn en bewaard blijven:** de RGB full-colour PNG uit het
  NMv-resourcepakket is naar `assets/img/NMv-logo.png` gekopieerd en daar gebruikt; de NMv/RGB/CMYK -
  bronbestanden blijven beschikbaar in `assets/files/Voor leden/…`.
- **Zonder beslissing:** huidige plaatsing is volledig functioneel en correspondeert met de aangeleverde
  NMv-bronbestanden.

### 2.9 Openstaande keuzes over NMv-publiceren (geen blokkerende actie)
- **Keuze needed:** op welke overige pagina's/plaatsen NMv moet worden getoond (logo, tekst of beide) en of er
  een aparte NMv-lidmaatschapssectie of -pagina moet komen. Geen keuze = huidige certificeringen-plaatsing blijft
  bestaande NMv-ledenpresentatie.
- **NMv-documenten zijn gekoppeld in:** `certificeringen.html` (MfN/NMv reglementen) en `klachten.html`
  (Klachtenregeling 2026 + MfN-mediatiereglementen).

### 2.1 Hosting provider and visitor logging
- **Missing:** the identity of the hosting provider and whether it stores server logs (IP retention).
- **Searched:** every file in the repository (HTML, JS, SCSS, CSS, XML, MD, TXT), `robots.txt`,
  absence of `vercel.json`, README.md, `audit/completion-report.md`, `audit/uae-inventory.md`,
  all 10 supplied PDFs (text extraction), image metadata, all 102 production pages,
  and the Vercel deployment itself.
- **Why needed:** `privacy.html` asserts "uw bezoek wordt nergens opgeslagen". Every web host
  (Vercel included) keeps request logs, so the sentence cannot be published as an unqualified
  fact until the host and its retention are known. We must not draft an unsupported legal claim.
- **Blocks?** Not the test build; **yes before launch** (legal statement accuracy).

### 2.2 Full registered address, postcode, KvK number, BTW-identificatienummer
- **Missing:** street + postcode of Huisjurist B.V., KvK number, BTW-id.
- **Searched:** full-repository grep (all file types); `git log -S "KvK"` and `-S "postcode"`
  across the entire history (never present); text extraction of all 10 supplied PDFs;
  `strings`/XMP scan of every image; all 102 production pages including
  `/contact/`, `/betaling/` and `/contact/our-office-in-the-netherlan.html`
  (that page only says the office is in Joure, two minutes from the A6/A7, by appointment);
  the Vercel deployment; README and both audit reports. No local Basecamp export exists beyond
  `assets/files/`.
- **Why needed:** the contact page must show the KvK/BTW details Hilda requires, and the
  `PostalAddress` JSON-LD needs street + postcode for correct LocalBusiness rich results.
  Holland Legal Services details must never be substituted.
- **Blocks?** Not the test build; **yes before launch**.

### 2.3 DIAC #13-337 and "Mediator bij de Raad van State"
- **Missing:** confirmation that both are current (they are undated).
- **Searched:** repository, all PDFs, production site (old awards page removed them from context).
- **Why needed:** requirements forbid presenting undated qualifications as current without evidence;
  equally they must not be silently removed.
- **Blocks?** No.

### 2.4 MfN registermediator membership
- **Missing:** confirmation the membership/registration is current.
- **Searched:** `certificeringen.html`, MfN PDFs (generic documents, no member register), production.
- **Why needed:** the badge, "Lidmaatschap MfN" text and six linked MfN documents imply a current
  registration.
- **Blocks?** No.

### 2.5 "met een hoofdkantoor in Joure" wording
- **Missing:** decision whether the word "hoofdkantoor" should stay for a single-office B.V.
  (The required sentence "…en juridische slagkracht in Dubai." is fully removed.)
- **Searched:** `index.html:171`, production hero text.
- **Blocks?** No — wording decision only.

### 2.6 Payment methods
- **Missing:** decision whether bank transfer + "neem contact op" for card payments is final.
- **Searched:** `betalen.html`, production `/betaling/` (offers Mastercard/VISA/PayFort by
  arrangement — same behaviour), no PayFort/AED references anywhere in the build.
- **Blocks?** No.

### 2.7 Test-build indexability
- **Missing:** decision whether the test deployment should be `noindex` until launch
  (currently 11 pages are `index, follow`; canonical already points at the live domain).
- **Blocks?** No — decision only.

### 2.8 NMv ledenmateriaal-publicatie en lijst openstaande NMv bestanden
- **Bestanden die beschikbaar zijn maar nog niet gepubliceerd:** (timestamp 2026-10-06)
  `assets/files/Voor leden/RGB (Scherm)/PNG (Transparante achtergrond)/Logo NMv - Basis - Full Colour - 72ppi rgb.png`,
  `assets/files/Voor leden/RGB (Scherm)/JPG (Witte achtergrond)/Logo NMv - Basis - Full Colour - 72ppi rgb.jpg`,
  `assets/files/Voor leden/RGB (Scherm)/JPG (Witte achtergrond)/Logo NMv - Basis met slogan - Full Colour - 72ppi rgb.jpg`,
  `assets/files/Voor leden/RGB (Scherm)/JPG (Witte achtergrond)/Logo NMv - Basis - Grijstinten - 72ppi rgb.jpg`,
  `assets/files/Voor leden/RGB (Scherm)/JPG (Witte achtergrond)/Logo NMv - Basis met slogan - Grijstinten - 72ppi rgb.jpg`,
  `assets/files/Voor leden/RGB (Scherm)/PNG (Transparante achtergrond)/Logo NMv - Basis - Grijstinten - 72ppi rgb.png`,
  `assets/files/Voor leden/RGB (Scherm)/PNG (Transparante achtergrond)/Logo NMv - Basis met slogan - Full Colour - 72ppi rgb.png`,
  `assets/files/Voor leden/RGB (Scherm)/PNG (Transparante achtergrond)/Logo NMv - Basis met slogan - Diapositief - 72ppi rgb.png`,
  `assets/files/Voor leden/RGB (Scherm)/PNG (Transparante achtergrond)/Logo NMv - Basis - Diapositief - 72ppi rgb.png`,
  `assets/files/Voor leden/CMYK (Drukwerk)/Logo NMv - Basis - Full colour - 300ppi cmyk.eps`,
  `assets/files/Voor leden/CMYK (Drukwerk)/Logo NMv - Basis - Diapositief - 300ppi cmyk.eps`,
  `assets/files/Voor leden/CMYK (Drukwerk)/Logo NMv - Basis - Grijstinten - 300ppi cmyk.eps`,
  `assets/files/Voor leden/CMYK (Drukwerk)/Logo NMv - Basis met slogan - Grijstinten - 300ppi cmyk.eps`,
  `assets/files/Voor leden/CMYK (Drukwerk)/Logo NMv - Basis met slogan - Diapositief - 300ppi cmyk.eps`,
  `assets/files/Voor leden/CMYK (Drukwerk)/Logo NMv - Basis met slogan - Full colour - 300ppi cmyk.eps`,
  `assets/files/NMv SoMe pakket - Scheiden - 202106.zip`,
  `assets/files/NMv SoMe pakket - Praatplaat 5 stappen - 202106.zip`,
  `assets/files/NMv SoMe pakket - Hoe gaat het op je werk - 202106.zip`,
  `assets/files/NMv SoMe pakket - Keer je elkaar de rug toe.zip`.
- **Waar ze nu staan/gebruikt zijn:** het_rgb PNG full-colour-bestand is gekopieerd naar `assets/img/NMv-logo.png`,
  de NMv-rij op de certificeringen-page gebruikt dat bestand, en de zes MfN/NMv document-PDF's zijn
  gelinkt vanuit de betreffende secties (`certificeringen.html`, `klachten.html`).
- **Bestanden die mogelijk mislokaliseerd zijn in de huidige boom (controleer exact pad):**
  `assets/files/NMv SoMe pakket - Hoe gaat het op je werk - 202106.zip`,
  `assets/files/NMv SoMe pakket - Keer je elkaar de rug toe.zip`,
  `assets/img/NMv-logo.png`.
- **Beslissing nodig:** op welke pagina's/plaatsen NMv verder moet worden getoond (logo, tekst,
  of beide), en of er een aparte NMv-lidmaatschapssectie of -pagina moet komen. Geen keuze = standaard
  certificeringen-page plaatsing blijft bestaande NMv-ledenpresentatie.
- **Blocks?** Nee — aanvullende keuze over volledig gebruik; basis NMv-aanwezigheid reeds geïmplementeerd.


- **Missing:** decision whether the test deployment should be `noindex` until launch
  (currently 11 pages are `index, follow`; canonical already points at the live domain).
- **Blocks?** No.

---

## 3. Pre-launch technical actions (not blockers for the test build)

1. **Legacy 301 map.** 98 production-only paths currently 404 on the test host
   (correct for review). Before the live cutover add redirects
   (`/betaling/→betalen.html`, `/contact/→contact.html`, `/wiebenik/→wie-ben-ik.html`,
   `/kernkwaliteitenhilda/→juridisch-advies.html`, `/privacy-policy.html→privacy.html`,
   `/ikbenhieromdat.html→persoonlijke-juridische-vraag.html`, …).
2. **Exclude build tooling from the deploy.** `/scripts/*.mjs` and `/scss/*` are served (200);
   `import-uae.mjs` contains UAE/HLS URLs. Add a `.vercelignore` (scripts, scss, audit, .freebuff,
   `.DS_Store`) and verify the build still passes.
3. **Google Search Console.** POST-LAUNCH ACTION — "Google Search Console validation and sitemap
   submission will be completed only after the approved build is deployed on the live
   huisjurist.nl domain. It is not a blocker for approval of the Vercel test build."
4. **Trim `wie-ben-ik.html` meta description** from 180 to ≤175 characters (SERP truncation).
5. **Remove `.DS_Store` files** from `assets/files/` (cosmetic).
6. **Manual keyboard pass** in a real browser (Firefox/Safari too) to confirm focus rings —
   automated harness could not visually verify `:focus-visible`.
