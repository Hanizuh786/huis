// ==========================================================================
// import-uae.mjs — imports the 23 historical UAE articles from the LIVE site
// into the clone at their ORIGINAL URLs (en-nu-een-bedrijf-starten/<slug>.html)
// so no URL history is lost. Legal content is copied VERBATIM; only page
// framing (dates, navigation, contextual current-service links) is added.
//
// Run: node scripts/import-uae.mjs
// ==========================================================================
import * as cheerio from "cheerio";
import fs from "node:fs";
import path from "node:path";

const LIVE = "https://www.huisjurist.nl/en-nu-een-bedrijf-starten/";
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const OUTDIR = path.join(ROOT, "en-nu-een-bedrijf-starten");

// slug, ISO publication date, display date, subject category
const ARTICLES = [
  ["denk-aan-de-stakingswinst.html", "2019-02-08", "8 February 2019", "other"],
  ["hoe-bescherm-ik-een-filmscr.html", "2018-08-23", "23 August 2018", "other"],
  ["een-te-groot-leeftijdsversc.html", "2018-08-14", "14 August 2018", "residence"],
  ["een-51-aandeelhouder-meer.html", "2018-07-24", "24 July 2018", "corporate"],
  ["corporate-bankrekeningen-in.html", "2018-07-18", "18 July 2018", "corporate"],
  ["de-visumprocedure-in-de-uae.html", "2018-07-02", "2 July 2018", "corporate"],
  ["hoe-waarborg-ik-dat-mijn.html", "2018-06-16", "16 June 2018", "disputes"],
  ["reclame-voor-iemand-anders.html", "2018-06-10", "10 June 2018", "business"],
  ["bedrijfslicenties-van-freez.html", "2018-06-09", "9 June 2018", "business"],
  ["start-geen-branch-op-een.html", "2018-06-01", "1 June 2018", "business"],
  ["de-hele-procedure-in-vogelv.html", "2018-05-24", "24 May 2018", "business"],
  ["de-bureaucratie-hoe-erg-is.html", "2018-05-22", "22 May 2018", "corporate"],
  ["een-10-jaars-visum-in-de.html", "2018-05-21", "21 May 2018", "corporate"],
  ["een-bureaucratie-om-gek-van.html", "2018-05-20", "20 May 2018", "corporate"],
  ["waarom-zou-ik-een-bedrijf.html", "2018-05-19", "19 May 2018", "business"],
  ["free-lancer-permits-in-de.html", "2018-05-13", "13 May 2018", "business"],
  ["waarom-je-misschien-de-uae.html", "2018-05-12", "12 May 2018", "residence"],
  ["de-voordelen-van-nederlande.html", "2018-05-08", "8 May 2018", "residence"],
  ["een-bedrijf-verhuizen-van.html", "2018-05-02", "2 May 2018", "business"],
  ["attesteren-van-een-diploma.html", "2018-05-01", "1 May 2018", "legalisation"],
  ["auto-rijden-in-de-vae-wat.html", "2018-04-29", "29 April 2018", "residence"],
  ["van-het-kastje-naar-de.html", "2018-04-27", "27 April 2018", "disputes"],
  ["de-ongedekte-cheque-in.html", "2018-04-26", "26 April 2018", "disputes"],
];

// Subject categories for the UAE section (item 5) + current-service link (item 7)
const CATS = {
  business: { label: "Bedrijf starten in de UAE", url: "https://www.holland-legal-services.ae/business-set-up.html",
    linkText: "Actueel: bedrijf opzetten in de UAE via Holland Legal Services" },
  corporate: { label: "Ondernemingszaken, visa & bureaucratie", url: "https://www.holland-legal-services.ae/",
    linkText: "Actueel: zakelijke UAE-dienstverlening via Holland Legal Services" },
  disputes: { label: "Innen & geschillen", url: "https://www.holland-legal-services.ae/",
    linkText: "Actueel: incasso en geschillen in de UAE via Holland Legal Services" },
  residence: { label: "Wonen & leven in de UAE", url: "https://www.dutchlawyerindeuae.nl/",
    linkText: "Actueel: Nederlandstalig juridisch advies in de UAE — Dutch Lawyer in de UAE" },
  legalisation: { label: "Legalisation & notariële zaken", url: "https://www.holland-legal-services.ae/",
    linkText: "Actueel: legalisatie van documenten via Holland Legal Services" },
  other: { label: "Overige artikelen uit de UAE-periode", url: "https://www.dutchlawyerindeuae.nl/",
    linkText: "Actueel: Nederlandstalige juridische diensten in de UAE — Dutch Lawyer in de UAE" },
};

// Live internal path -> clone file (or "" meaning section-root file)
const P = {
  "/": "index.html",
  "/index.html": "index.html",
  "/wiebenik/": "wie-ben-ik.html",
  "/kernkwaliteitenhilda/": "juridisch-advies.html",
  "/kosten.html": "kosten.html",
  "/klachten.html": "klachten.html",
  "/contact/": "contact.html",
  "/contact/via-linkedin.html": "contact.html#linkedin",
  "/contact/via-facebook.html": "contact.html#facebook",
  "/contact/via-phone-you-can-reach-is.html": "contact.html#telefoon",
  "/contact/via-e-mail.html": "contact.html#email",
  "/contact/our-office-in-the-netherlan.html": "contact.html#kantoor",
  "/betaling/": "betalen.html",
  "/privacy-policy.html": "privacy.html",
  "/ikbenhieromdat.html": "persoonlijke-juridische-vraag.html",
  "/mijnzakelijkeprobleem.html": "zakelijke-juridische-vraag.html",
  "/certificeringen-en-awards.html": "certificeringen.html",
  "/uw-huisjurist-blogt/": "blog.html",
  "/uw-huisjurist-blogt/doorzoek-deze-website-met.html": "zoeken.html",
  "/who-we-are/": "wie-ben-ik.html",
  "/our-core-strenghts/": "juridisch-advies.html",
  "/what-we-cost.html": "kosten.html",
  "/complaints.html": "klachten.html",
  "/how-to-contact-us/": "contact.html",
  "/how-to-pay-us/": "betalen.html",
  "/en-nu-een-bedrijf-starten/": "en-nu-een-bedrijf-starten/",
};

function resolveHref(href, pageUrl) {
  if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return href;
  let u;
  try { u = new URL(href, pageUrl); } catch { return href; }
  if (u.hostname && u.hostname !== "www.huisjurist.nl" && u.hostname !== "huisjurist.nl") return href; // external kept
  const key = u.pathname;
  let target = P[key];
  if (!target && /^\/en-nu-een-bedrijf-starten\/.+\.html$/.test(key)) target = key.slice(1); // sibling article URL
  if (!target) return href;
  // relativise from /en-nu-een-bedrijf-starten/<slug>.html
  const rel = target === "en-nu-een-bedrijf-starten/"
    ? "index.html"
    : target.startsWith("en-nu-een-bedrijf-starten/")
      ? target.replace("en-nu-een-bedrijf-starten/", "")
      : "../" + target;
  return rel + u.search + u.hash;
}

function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

// Reusable chrome (header/footer) is taken from index.html so pages are complete documents
const indexHtml = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
// Chrome is copied from the root page; relativise its links for the UAE subdir.
const ROOT_PAGES = ["index.html", "wie-ben-ik.html", "juridisch-advies.html", "kosten.html", "contact.html", "persoonlijke-juridische-vraag.html", "zakelijke-juridische-vraag.html", "certificeringen.html", "klachten.html", "betalen.html", "blog.html", "zoeken.html", "privacy.html"];
function relativizeChrome(html) {
  let out = html;
  for (const p of ROOT_PAGES) {
    out = out.replace(new RegExp(`href="${p.replace(/\./g, "\\.")}(#[^"]*)?"`, "g"), `href="../${p}$1"`);
  }
  return out.split('href="bedrijf-starten-dubai-uae.html"').join('href="index.html"');
}
const HEADER = relativizeChrome(indexHtml.slice(indexHtml.indexOf('<a class="visually-hidden-focusable"'), indexHtml.indexOf("</header>") + "</header>".length));
const FOOTER = relativizeChrome(indexHtml.slice(indexHtml.indexOf('<footer class="site-footer">'), indexHtml.indexOf("</footer>") + "</footer>".length));

function page({ slug, title, desc, cat, dateISO, dateLabel, body, prev, next }) {
  const c = CATS[cat];
  const canonical = LIVE + slug;
  const jsonld = {
    "@context": "https://schema.org", "@type": "BlogPosting",
    headline: title, description: desc, datePublished: dateISO,
    inLanguage: "nl-NL", url: canonical,
    author: { "@type": "Person", name: "mr. Hilda van der Tuin" },
    publisher: { "@type": "Organization", name: "Huisjurist bv" },
    isAccessibleForFree: true,
  };
  const navItem = (a, cls) => a ? `<a class="btn btn-ghost btn-sm ${cls}" href="${esc(a.href)}">${cls === "prev" ? "&larr; " : ""}${esc(a.text)}${cls === "next" ? " &rarr;" : ""}</a>` : "";
  return `<!doctype html>
<html lang="nl" id="top">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="author" content="mr. Hilda van der Tuin">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="nl-NL" href="${canonical}">
  <meta name="geo.region" content="NL-FR">
  <meta name="geo.placename" content="Joure, Friesland, Nederland">
  <meta name="geo.position" content="52.9256;5.8044">
  <meta name="ICBM" content="52.9256, 5.8044">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="nl_NL">
  <meta property="og:site_name" content="huisjurist">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${canonical}">
  <meta property="article:published_time" content="${dateISO}">
  <meta property="article:author" content="mr. Hilda van der Tuin">
  <meta property="og:image" content="https://www.huisjurist.nl/assets/img/og-image.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#005B8C">
  <link rel="icon" href="../assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/main.css">
  <script type="application/ld+json">${JSON.stringify(jsonld)}</script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "huisjurist", "item": "https://www.huisjurist.nl/index.html" },
      { "@type": "ListItem", "position": 2, "name": "UAE", "item": "https://www.huisjurist.nl/en-nu-een-bedrijf-starten/" },
      { "@type": "ListItem", "position": 3, "name": "${esc(title)}", "item": "${canonical}" }
    ]
  }
  </script>
</head>
<body>
  ${HEADER}
  <div class="page-top">
    <main id="page-content">
      <section class="page-hero">
        <div class="container">
          <nav aria-label="Kruimelpad">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="../index.html">huisjurist</a></li>
              <li class="breadcrumb-item"><a href="index.html">UAE</a></li>
              <li class="breadcrumb-item"><a href="index.html">Bedrijf starten in de UAE</a></li>
              <li class="breadcrumb-item active" aria-current="page">${esc(title)}</li>
            </ol>
          </nav>
          <h1>${esc(title)}</h1>
          <p class="page-hero-lead">${esc(c.label)} &mdash; historisch artikel</p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-9">
              <div class="callout callout--accent reveal" role="note">
                <strong>Historisch artikel.</strong>
                Gepubliceerd op <time datetime="${dateISO}">${dateLabel}</time> door mr. Hilda van der Tuin.
                Dit artikel is als historische kennis bewaard en niet bijgewerkt; de wetgeving en praktijk kunnen
                sinds de publicatiedatum zijn gewijzigd.                Bekijk voor actuele diensten de
                <a href="../bedrijf-starten-dubai-uae.html">UAE-sectie</a>.
              </div>

              <article class="mt-4 reveal uae-article">
${body}
              </article>

              <div class="callout mt-4 reveal">
                <strong>Actuele dienstverlening:</strong>
                <a href="${c.url}" target="_blank" rel="noopener">${esc(c.linkText)}</a>
                &mdash; dit historische artikel vervangt geen actueel juridisch advies.
              </div>

              <div class="d-flex flex-wrap justify-content-between gap-2 mt-4 reveal">
                ${navItem(prev, "prev")}
                ${navItem(next, "next")}
              </div>

              <div class="d-flex flex-wrap gap-2 mt-4 reveal">
                <a class="btn btn-primary btn-sm" href="../bedrijf-starten-dubai-uae.html">Alle UAE-onderwerpen</a>
                <a class="btn btn-ghost btn-sm" href="../bedrijf-starten-dubai-uae.html">UAE: bedrijf starten</a>
                <a class="btn btn-ghost btn-sm" href="../contact.html">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>

  ${FOOTER}

  <button class="back-to-top" type="button" aria-label="Terug naar boven">&uarr;</button>
  <script src="../assets/js/bootstrap.bundle.min.js" defer></script>
  <script src="../assets/js/main.js" defer></script>
</body>
</html>
`;
}

fs.mkdirSync(OUTDIR, { recursive: true });
let ok = 0;
for (const [slug, dateISO, dateLabel, cat] of ARTICLES) {
  const url = LIVE + slug;
  const res = await fetch(url);
  if (!res.ok) { console.error("FAIL", res.status, url); continue; }
  const html = await res.text();
  const $ = cheerio.load(html);
  const liveTitle = $("title").text().trim() || slug;
  const title = liveTitle.replace(/\s*\|\s*huisjurist.*$/i, "");
  const content = $("#main-content .article-content").html() || $("#main-content").html() || "";
  if (!content.trim()) { console.error("EMPTY CONTENT", slug); continue; }
  // rewrite internal hrefs to clone targets, keep all text verbatim
  let body = content.replace(/href="([^"]*)"/g, (m, h) => `href="${esc(resolveHref(h, url))}"`);
  const plain = $("<div>").html(content).text().replace(/\s+/g, " ").trim();
  const desc = (plain.slice(0, 150).replace(/[.,;\s]+\S*$/, "") || title).trim();
  const prevA = $("#main-content .previous-page a");
  const nextA = $("#main-content .next-page a");
  const prev = prevA.length ? { href: resolveHref(prevA.attr("href"), url), text: prevA.text().trim() || "Vorige" } : null;
  const next = nextA.length ? { href: resolveHref(nextA.attr("href"), url), text: nextA.text().trim() || "Volgende" } : null;
  fs.writeFileSync(path.join(OUTDIR, slug), page({ slug, title, desc, cat, dateISO, dateLabel, body, prev, next }));
  ok++;
  console.log("written", slug);
}
console.log(`done: ${ok}/${ARTICLES.length}`);
