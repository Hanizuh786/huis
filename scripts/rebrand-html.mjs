#!/usr/bin/env node
// One-off rebrand migration for all HTML files in the clone.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const files = [];

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git' || e.name.startsWith('.')) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) files.push(p);
  }
}
walk(ROOT);

let changed = 0;
for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  const orig = html;

  // 1. theme-color → Logo Blue
  html = html.replace(
    /<meta name="theme-color" content="#005B8C">/g,
    '<meta name="theme-color" content="#005496">'
  );

  // 2. Favicon: use the source website's favicon.ico everywhere
  html = html.replace(
    /<link rel="icon" href="(\.\.\/)?assets\/img\/favicon\.svg" type="image\/svg\+xml">/g,
    '<link rel="icon" href="$1assets/img/favicon.ico" type="image/x-icon">'
  );
  html = html.replace(
    /<link rel="apple-touch-icon" href="(\.\.\/)?assets\/img\/favicon\.svg">/g,
    '<link rel="apple-touch-icon" href="$1assets/img/favicon.ico">'
  );
  html = html.replace(
    /"logo": "https:\/\/www\.huisjurist\.nl\/assets\/img\/favicon\.svg"/g,
    '"logo": "https://www.huisjurist.nl/assets/img/favicon.ico"'
  );

  // 3. Remove Google Fonts links — global font is system Verdana (faster, no external requests)
  html = html.replace(
    /\s*<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\n/g,
    '\n'
  );
  html = html.replace(
    /\s*<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com" crossorigin>\n/g,
    '\n'
  );
  html = html.replace(
    /\s*<link href="https:\/\/fonts\.googleapis\.com\/css2\?[^"]*" rel="stylesheet">\n/g,
    '\n'
  );

  // 4. Local images: _Media → assets/img (files were downloaded locally)
  html = html.replace(/\.\.\/_Media\//g, '../assets/img/');

  // 5. Inline old-gold accent → accessible orange (AA on white; pure #D9842B is 2.9:1)
  html = html.replace(/#e9a23b/g, '#9E570B');
  // 5b. Never let inline text use the pure brand orange (fails WCAG AA on white)
  html = html.replace(/color:\s*#D9842B/gi, 'color:#9E570B');

  // 6. Lazy-load real <img> tags (skip JSON-LD script lines to avoid breaking JSON strings)
  const lines = html.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('ld+json')) continue;
    if (!lines[i].includes('<img ')) continue;
    lines[i] = lines[i].replace(/<img ((?:(?!loading=)[^>])*)>/g, (m, attrs) => {
      if (/loading\s*=/.test(m)) return m;
      return `<img ${attrs} loading="lazy">`;
    });
  }
  html = lines.join('\n');

  if (html !== orig) {
    fs.writeFileSync(f, html);
    changed++;
    console.log('updated', path.relative(ROOT, f));
  }
}
console.log(`\n${changed} of ${files.length} HTML files updated`);
