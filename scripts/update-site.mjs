#!/usr/bin/env node
// One-off site migration (2026-10-01):
//  - navbar + footer: text "H" brand-mark → the real logo image (assets/img/logo.png)
//  - remove every phone number / tel: link (site-wide, incl. JSON-LD and meta tags)
//  - add Hilda's booking link, real LinkedIn and Facebook URLs everywhere
//  - footer copyright → Huisjurist B.V.; current pages use "Huisjurist B.V."
// Historical UAE articles keep their original context (publisher names, article bodies).
import fs from "node:fs";
import path from "node:path";

const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const SUB = "en-nu-een-bedrijf-starten";
const BOOKING = "https://dutchlawyerindeuae.youcanbook.me/";
const LINKEDIN = "https://www.linkedin.com/in/huisjurist/";
const FACEBOOK = "https://www.facebook.com/dutchlawyerindeuae";

const ROOT_FILES = [
  "index.html", "wie-ben-ik.html", "juridisch-advies.html", "kosten.html",
  "contact.html", "persoonlijke-juridische-vraag.html", "zakelijke-juridische-vraag.html",
  "certificeringen.html", "klachten.html", "betalen.html", "blog.html",
  "zoeken.html", "privacy.html", "bedrijf-starten-dubai-uae.html",
];
const subFiles = fs.readdirSync(path.join(ROOT, SUB)).filter((f) => f.endsWith(".html"));

// Current company-information pages (root + section index) get the B.V. name update.
const CURRENT_PAGES = new Set(ROOT_FILES.map((f) => f));
const total = {};

function migrate(file, rel, isCurrent) {
  const abs = path.join(ROOT, rel);
  let html = fs.readFileSync(abs, "utf8");
  const before = html;
  const p = rel.startsWith(SUB) ? "../" : "";
  const counts = {};
  const rep = (key, from, to) => {
    const n = html.split(from).length - 1;
    if (n > 0) {
      html = html.split(from).join(to);
      counts[key] = (counts[key] || 0) + n;
    }
  };
  const repRe = (key, from, to) => {
    const re = new RegExp(from, "g");
    const m = html.match(re);
    if (m) {
      html = html.replace(re, to);
      counts[key] = (counts[key] || 0) + m.length;
    }
  };

  // 1. Navbar brand → logo image
  repRe("navbar-logo",
    `<a class="navbar-brand" href="(?:\\.\\./)?index\\.html">\\s*<span class="brand-mark" aria-hidden="true">H</span>\\s*<span>huisjurist<span class="brand-tag">Legally blonde sinds 1996</span></span>\\s*</a>`,
    `<a class="navbar-brand" href="${p}index.html">\n          <img class="brand-logo" src="${p}assets/img/logo.png" alt="huisjurist" width="532" height="532">\n          <span class="brand-tag">Legally blonde sinds 1996</span>\n        </a>`);

  // 2. Footer brand → logo image
  repRe("footer-logo",
    `<a class="footer-brand" href="(?:\\.\\./)?index\\.html"><span class="brand-mark" aria-hidden="true">H</span> huisjurist</a>`,
    `<a class="footer-brand" href="${p}index.html"><img class="brand-logo brand-logo--footer" src="${p}assets/img/logo.png" alt="huisjurist" width="532" height="532"></a>`);

  // 3. Phone: footer social tile → booking tile
  rep("phone-social",
    `<a class="social-link" href="tel:+31582134716" aria-label="Telefoon">(058) 2134716</a>`,
    `<a class="social-link" href="${BOOKING}" target="_blank" rel="noopener" aria-label="Afspraak maken">📅</a>`);

  // 4. Phone: footer contact list item → booking link
  rep("phone-li",
    `<li><a href="tel:+31582134716">via Telefoon</a></li>`,
    `<li><a href="${BOOKING}" target="_blank" rel="noopener">Afspraak maken</a></li>`);

  // 5. Phone: JSON-LD telephone property
  repRe("jsonld-telephone", `\\n\\s*"telephone": "\\+31582134716",`, ``);

  // 6. JSON-LD logo → the real logo
  rep("jsonld-logo",
    `"logo": "https://www.huisjurist.nl/assets/img/favicon.ico"`,
    `"logo": "https://www.huisjurist.nl/assets/img/logo.png"`);

  // 7. Real LinkedIn / Facebook URLs (covers href= and JSON-LD sameAs)
  repRe("linkedin", `https://www\\.linkedin\\.com/"`, `${LINKEDIN}"`);
  repRe("facebook", `https://www\\.facebook\\.com/"`, `${FACEBOOK}"`);

  // 8. Footer anchor links to contact page sections → direct external profiles
  repRe("linkedin-anchor", `href="(?:\\.\\./)?contact\\.html#linkedin"`, `href="${LINKEDIN}" target="_blank" rel="noopener"`);
  repRe("facebook-anchor", `href="(?:\\.\\./)?contact\\.html#facebook"`, `href="${FACEBOOK}" target="_blank" rel="noopener"`);

  // 9. Footer copyright → Huisjurist B.V.
  rep("copyright",
    `© Hilda van der Tuin, november 2021 – <span data-year>2026</span>`,
    `© Huisjurist B.V. – <span data-year>2026</span>`);

  // 10. Footer tagline company name
  rep("footer-company",
    `Het werkkantoor van huisjurist bv staat in Joure`,
    `Het werkkantoor van Huisjurist B.V. staat in Joure`);

  // 11. Current pages: company name styling (historical articles keep original context)
  if (isCurrent) {
    rep("company-bv", `Huisjurist bv`, `Huisjurist B.V.`);
    rep("company-bv-lower", `huisjurist bv`, `huisjurist B.V.`);
  }

  // 12. contact.html: meta tags that mention the phone number
  if (file === "contact.html") {
    rep("meta-kw",
      `contact, e-mail, telefoon, LinkedIn, Facebook, kantoor, Joure, huisjurist bereiken`,
      `contact, e-mail, afspraak, LinkedIn, Facebook, kantoor, Joure, huisjurist bereiken`);
    rep("meta-desc",
      `Via e-mail info@huisjurist.nl, telefoon (058) 2134716, LinkedIn, Facebook of het werkkantoor in Joure — op afspraak.`,
      `Via e-mail info@huisjurist.nl, een geboekte afspraak, LinkedIn, Facebook of het werkkantoor in Joure — op afspraak.`);
    rep("meta-og",
      `Via e-mail, telefoon, LinkedIn, Facebook of het werkkantoor in Joure — in volgorde van mijn voorkeur.`,
      `Via e-mail, een geboekte afspraak, LinkedIn, Facebook of het werkkantoor in Joure — in volgorde van mijn voorkeur.`);
    rep("meta-tw",
      `E-mail, telefoon, LinkedIn, Facebook of het kantoor in Joure.`,
      `E-mail, een geboekte afspraak, LinkedIn, Facebook of het kantoor in Joure.`);
    // Phone channel tile → booking tile
    rep("phone-tile",
      `            <div class="col-md-6 col-lg-4" id="telefoon">
              <a class="channel-tile" href="tel:+31582134716">
                <span class="channel-icon" aria-hidden="true">📞</span>
                <span>
                  <span class="channel-title d-block">via Telefoon</span>
                  <span class="channel-meta">(058) 2134716 — liever niet, en alleen tijdens kantooruren. Een nummer in Leeuwarden, meeverhuisd naar Joure.</span>
                </span>
              </a>
            </div>`,
      `            <div class="col-md-6 col-lg-4" id="afspraak">
              <a class="channel-tile" href="${BOOKING}" target="_blank" rel="noopener">
                <span class="channel-icon" aria-hidden="true">📅</span>
                <span>
                  <span class="channel-title d-block">Afspraak maken</span>
                  <span class="channel-meta">Direct een tijdje boeken in mijn agenda — ook voor vragen over Dubai &amp; de UAE.</span>
                </span>
              </a>
            </div>`);
    rep("kanalen-h2",
      `<h2 id="kanalen-title">Vijf manieren om contact op te nemen</h2>`,
      `<h2 id="kanalen-title">Manieren om contact op te nemen</h2>`);
  }

  // 13. wie-ben-ik.html: Hilda's profile photo in her panel
  if (file === "wie-ben-ik.html") {
    repRe("profile-photo",
      `(<div class="question-panel reveal" data-tilt>\\s*)(<div class="panel-head">\\s*<span class="panel-icon" aria-hidden="true">👩‍⚖️</span>)`,
      `$1<img class="profile-photo" src="assets/img/31175842_1699062696836407_7_med_hr.jpeg" alt="Foto van mr. Hilda van der Tuin, directeur van Huisjurist B.V." width="720" height="960" loading="lazy">\n                $2`);
  }

  // 14. index.html: Hilda photo in the "Wie ben ik?" section (above the trust grid)
  if (file === "index.html") {
    rep("home-profile-photo",
      `          <div class="col-lg-6">
            <div class="row g-3 reveal-stagger">`,
      `          <div class="col-lg-6">
            <img class="profile-photo profile-photo--card reveal" src="assets/img/31175842_1699062696836407_7_med_hr.jpeg" alt="Foto van mr. Hilda van der Tuin, directeur van Huisjurist B.V." width="720" height="960" loading="lazy">
            <div class="row g-3 mt-4 reveal-stagger">`);
  }

  if (html !== before) {
    fs.writeFileSync(abs, html);
    console.log(`✓ ${rel}: ${JSON.stringify(counts)}`);
    for (const k of Object.keys(counts)) total[k] = (total[k] || 0) + counts[k];
  } else {
    console.log(`– ${rel}: no changes`);
  }
}

for (const f of ROOT_FILES) migrate(f, f, CURRENT_PAGES.has(f));
for (const f of subFiles) migrate(f, `${SUB}/${f}`, f === "index.html");

console.log("\nTOTALS:", JSON.stringify(total, null, 0));
