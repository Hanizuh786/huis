#!/usr/bin/env node
// One-off: rebuild bedrijf-starten-dubai-uae.html as a THIN ALIAS page.
// Not a redirect — the page stays at its historical URL but points visitors to
// the canonical UAE section index (en-nu-een-bedrijf-starten/).
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
              <li class="breadcrumb-item active" aria-current="page">Bedrijf starten in de UAE</li>
            </ol>
          </nav>
          <h1>Bedrijf starten in Dubai &amp; de UAE</h1>
          <p class="page-hero-lead">Alles wat huisjurist weet over ondernemen in de Verenigde Arabische Emiraten — gebundeld in ons UAE-kennisarchief.</p>
        </div>
      </section>

      <section class="section" aria-labelledby="alias-title">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-head text-center reveal">
                <span class="eyebrow">UAE-kennisarchief</span>
                <h2 id="alias-title">Alle UAE-onderwerpen op één plek</h2>
                <p>De artikelen over bedrijf starten in de UAE — van visums en freezones tot bankrekeningen, wonen en betalen in Dubai — staan in het Huisjurist UAE-kennisarchief. Oudere artikelen blijven bewaard als historische content, met hun oorspronkelijke publicatiedatum.</p>
              </div>
              <div class="text-center mt-4 reveal">
                <a class="btn btn-primary btn-lg" href="en-nu-een-bedrijf-starten/">Naar het UAE-kennisarchief</a>
              </div>
              <ul class="list-unstyled mt-5 reveal">
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">🏢</span>
                  <a href="en-nu-een-bedrijf-starten/#bedrijf-starten">Bedrijf starten &amp; visums</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">🏦</span>
                  <a href="en-nu-een-bedrijf-starten/#ondernemingszaken">Ondernemingszaken — bankieren &amp; freezones</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">🏠</span>
                  <a href="en-nu-een-bedrijf-starten/#wonen-leven">Wonen &amp; leven in de UAE</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">💰</span>
                  <a href="en-nu-een-bedrijf-starten/#innen-geschillen">Inningen &amp; geschillen</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2 border-bottom">
                  <span aria-hidden="true">📜</span>
                  <a href="en-nu-een-bedrijf-starten/#legalisatie">Legalisatie &amp; attesteren</a>
                </li>
                <li class="d-flex align-items-center gap-2 py-2">
                  <span aria-hidden="true">📚</span>
                  <a href="en-nu-een-bedrijf-starten/#overige">Overige onderwerpen</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--tint" aria-labelledby="alias-contact">
        <div class="container text-center reveal">
          <h2 id="alias-contact">Vragen over ondernemen in de UAE?</h2>
          <p class="mx-auto" style="max-width:42rem;">Maak direct een afspraak in mijn agenda, of stuur een e-mail. Voor actuele UAE-diensten kunt u ook terecht bij onze gespecialiseerde website <a href="https://www.dutchlawyerindeuae.nl/" target="_blank" rel="noopener">Dutch Lawyer in de UAE</a>.</p>
          <div class="d-flex flex-wrap gap-3 justify-content-center mt-4">
            <a class="btn btn-accent" href="https://dutchlawyerindeuae.youcanbook.me/" target="_blank" rel="noopener">Afspraak maken</a>
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
  <link rel="canonical" href="https://www.huisjurist.nl/en-nu-een-bedrijf-starten/">
  <link rel="alternate" hreflang="nl-NL" href="https://www.huisjurist.nl/en-nu-een-bedrijf-starten/">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="nl_NL">
  <meta property="og:site_name" content="huisjurist">
  <meta property="og:title" content="Bedrijf starten in Dubai &amp; de UAE — Huisjurist">
  <meta property="og:description" content="De complete UAE-kennis van huisjurist: visums, freezones, bankieren, wonen, geschillen en legalisatie.">
  <meta property="og:url" content="https://www.huisjurist.nl/en-nu-een-bedrijf-starten/">
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
    "name": "Bedrijf starten in Dubai / de UAE — Huisjurist",
    "description": "Alles over bedrijf starten in de Verenigde Arabische Emiraten: visums, freezones, bankieren, wonen, geschillen en legalisatie — in het Huisjurist UAE-kennisarchief.",
    "url": "https://www.huisjurist.nl/en-nu-een-bedrijf-starten/",
    "inLanguage": "nl-NL",
    "isPartOf": { "@type": "WebSite", "name": "huisjurist", "url": "https://www.huisjurist.nl/" }
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
console.log("✓ bedrijf-starten-dubai-uae.html rebuilt as thin alias → en-nu-een-bedrijf-starten/");
