#!/usr/bin/env node
// One-off: rebuild ALIAS_PLACEHOLDER_DUBAI_UAE_ALIAS_PAGE as a THIN ALIAS page.
// Not a redirect — the page stays at its historical URL but points visitors to
// the canonical UAE section index (ARCHIVE_PLACEHOLDER_UAE_SECTION_ID/).
// Header/footer chrome is copied from the migrated index.html so it can never drift.
import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const index = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

const header = index.slice(
  index.indexOf('<header class="site-navbar">'),
  index.indexOf("</header>") + "</header>".length
);
const footer = index.slice(
  index.indexOf('<footer class="site-footer">'),
  index.indexOf("</footer>") + "</footer>".length
);

const main = `
      <section class="page-hero">
        <div class="container">
          <nav aria-label="Kruimelpad">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="index.html">huisjurist</a></li>
              <li class="breadcrumb-item active" aria-current="page">ARCHIVE_PLACEHOLDER_PAGE_TITLE</li>
            </ol>
          </nav>
          <h1>ARCHIVE_PLACEHOLDER_PAGE_TITLE</h1>
          <p class="page-hero-lead">ARCHIVE_PLACEHOLDER_PAGE_LEAD</p>
        </div>
      </section>

      <section class="section" aria-labelledby="alias-title">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-head text-center reveal">
                <span class="eyebrow">ARCHIVE_PLACEHOLDER_EYEBROW</span>
                <h2 id="alias-title">ARCHIVE_PLACEHOLDER_SECTION_TITLE</h2>
                <p>ARCHIVE_PLACEHOLDER_SECTION_INTRO</p>
              </div>
              <div class="text-center mt-4 reveal">
                <a class="btn btn-primary btn-lg" href="ARCHIVE_PLACEHOLDER_SECTION_URL">ARCHIVE_PLACEHOLDER_ACTION_LINK</a>
              </div>
              <ul class="list-unstyled mt-5 reveal">
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">ARCHIVE_PLACEHOLDER_ITEM_1_ICON</span>
                  <a href="ARCHIVE_PLACEHOLDER_ITEM_1_URL">ARCHIVE_PLACEHOLDER_ITEM_1_LABEL</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">ARCHIVE_PLACEHOLDER_ITEM_2_ICON</span>
                  <a href="ARCHIVE_PLACEHOLDER_ITEM_2_URL">ARCHIVE_PLACEHOLDER_ITEM_2_LABEL</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">ARCHIVE_PLACEHOLDER_ITEM_3_ICON</span>
                  <a href="ARCHIVE_PLACEHOLDER_ITEM_3_URL">ARCHIVE_PLACEHOLDER_ITEM_3_LABEL</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">ARCHIVE_PLACEHOLDER_ITEM_4_ICON</span>
                  <a href="ARCHIVE_PLACEHOLDER_ITEM_4_URL">ARCHIVE_PLACEHOLDER_ITEM_4_LABEL</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">ARCHIVE_PLACEHOLDER_ITEM_5_ICON</span>
                  <a href="ARCHIVE_PLACEHOLDER_ITEM_5_URL">ARCHIVE_PLACEHOLDER_ITEM_5_LABEL</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2">
                  <span aria-hidden="true">ARCHIVE_PLACEHOLDER_ITEM_6_ICON</span>
                  <a href="ARCHIVE_PLACEHOLDER_ITEM_6_URL">ARCHIVE_PLACEHOLDER_ITEM_6_LABEL</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--tint" aria-labelledby="alias-contact">
        <div class="container text-center reveal">
          <h2 id="alias-contact">ARCHIVE_PLACEHOLDER_CONTACT_SECTION_TITLE</h2>
          <p class="mx-auto" style="max-width:42rem;">ARCHIVE_PLACEHOLDER_CONTACT_LEAD — voor actuele informatie kunt u terecht bij ARCHIVE_PLACEHOLDER_EXTERNAL_REFERENCE.</p>
          <div class="d-flex flex-wrap gap-3 justify-content-center mt-4">
            <a class="btn btn-accent" href="ARCHIVE_PLACEHOLDER_CONTACT_LINK" target="_blank" rel="noopener">ARCHIVE_PLACEHOLDER_CONTACT_ACTION</a>
            <a class="btn btn-primary" href="contact.html">Contact</a>
          </div>
        </div>
      </section>
`;

const page = `<!doctype html>
<html lang="nl" id="top">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bedrijf starten in Dubai &amp; de UAE — Huisjurist</title>
  <meta name="description" content="Alles over bedrijf starten in de Verenigde Arabische Emiraten: visums, freezones, bankieren, wonen, geschillen en legalisatie — in het Huisjurist UAE-kennisarchief.">
  <meta name="keywords" content="bedrijf starten, Dubai, UAE, Verenigde Arabische Emiraten, visum, freezone, huisjurist">
  <meta name="author" content="mr. Hilda van der Tuin">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
  <link rel="canonical" href="https://ARCHIVE_PLACEHOLDER_CANONICAL_URL">
  <link rel="alternate" hreflang="nl-NL" href="https://ARCHIVE_PLACEHOLDER_CANONICAL_URL">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="nl_NL">
  <meta property="og:site_name" content="huisjurist">
  <meta property="og:title" content="ARCHIVE_PLACEHOLDER_OG_TITLE">
  <meta property="og:description" content="ARCHIVE_PLACEHOLDER_OG_DESCRIPTION">
  <meta property="og:url" content="https://ARCHIVE_PLACEHOLDER_CANONICAL_URL">
  <meta property="og:image" content="https://www.huisjurist.nl/assets/img/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Bedrijf starten in Dubai &amp; de UAE — Huisjurist">
  <meta name="twitter:description" content="De complete UAE-kennis van huisjurist, gebundeld in één archief.">
  <meta name="twitter:image" content="https://www.huisjurist.nl/assets/img/og-image.png">
  <meta name="theme-color" content="#005496">
  <link rel="icon" href="assets/img/favicon.ico" type="image/x-icon">
  <link rel="apple-touch-icon" href="assets/img/favicon.ico">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "ARCHIVE_PLACEHOLDER_JSONLD_NAME",
    "description": "ARCHIVE_PLACEHOLDER_JSONLD_DESCRIPTION",
    "url": "https://ARCHIVE_PLACEHOLDER_CANONICAL_URL",
    "inLanguage": "nl-NL",
    "isPartOf": { "@type": "WebSite", "name": "huisjurist", "url": "https://ARCHIVE_PLACEHOLDER_CANONICAL_URL" }
  }
  </script>
  <link rel="stylesheet" href="assets/css/main.css">
</head>
<body>
  <a class="visually-hidden-focusable" href="#page-content">Ga naar de inhoud</a>
  <div class="scroll-progress" aria-hidden="true"></div>
${header}
  <main id="page-content">${main}
  </main>
${footer}
  <button class="back-to-top" type="button" aria-label="Terug naar boven">↑</button>
  <script src="assets/js/bootstrap.bundle.min.js" defer></script>
  <script src="assets/js/main.js" defer></script>
</body>
</html>
`;

fs.writeFileSync(path.join(ROOT, "bedrijf-starten-dubai-uae.html"), page);
console.log("✓ bedrijf-starten-dubai-uae.html rebuilt as thin alias → ARCHIVE_PLACEHOLDER_UAE_SECTION_ID/");
