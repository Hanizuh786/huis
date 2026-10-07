import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.argv[2] || '.';
const OUT = join(ROOT, 'assets/js/search-index.json');

const pages = [
  'index.html',
  'wie-ben-ik.html',
  'juridisch-advies.html',
  'kosten.html',
  'zoeken.html',
  'klachten.html',
  'contact.html',
  'betalen.html',
  'privacy.html',
  'certificeringen.html',
  'persoonlijke-juridische-vraag.html',
  'zakelijke-juridische-vraag.html'
];

function strip(html) {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

const index = pages.map(file => {
  const html = readFileSync(join(ROOT, file), 'utf8');
  return {
    file,
    text: strip(html)
  };
});

writeFileSync(OUT, JSON.stringify(index, null, 2));
console.log('Wrote', OUT);
