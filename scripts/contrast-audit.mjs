// WCAG 2.x contrast audit — huisjurist.nl palette
// Run: node scripts/contrast-audit.mjs

const hex2rgb = (hex) => {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
};

const lin = (c) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

const luminance = (hex) => {
  const [r, g, b] = hex2rgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (fg, bg) => {
  const l1 = luminance(fg);
  const l2 = luminance(bg);
  const [hi, lo] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
};

// Live rows use the current design tokens for huisjurist.nl.
// Reference rows (tagged 'ref') document older/retired palette values and are
// not asserted against the current page.
const pairs = [
  // [label, fg, bg, size ('normal' | 'large'), kind ('text' | 'graphic')]
  // --- Body & secondary text ---
  ['Body text #333333 on white', '#333333', '#FFFFFF', 'normal', 'text'],
  ['Body text #333333 on soft #F7F8FA', '#333333', '#F7F8FA', 'normal', 'text'],
  ['Secondary #667085 on white', '#667085', '#FFFFFF', 'normal', 'text'],
  ['Secondary #667085 on soft #F7F8FA', '#667085', '#F7F8FA', 'normal', 'text'],
  // --- Headings ---
  ['Headings #1A2E44 on white', '#1A2E44', '#FFFFFF', 'large', 'text'],
  ['Headings #00558F on white', '#00558F', '#FFFFFF', 'large', 'text'],
  // --- Links ---
  ['Link #00558F on white', '#00558F', '#FFFFFF', 'normal', 'text'],
  ['Link #00558F on soft #F7F8FA', '#00558F', '#F7F8FA', 'normal', 'text'],
  ['Link hover #003F6B on white', '#003F6B', '#FFFFFF', 'normal', 'text'],
  // --- Accent text (AA-safe #B45309) ---
  ['Accent text #B45309 on white', '#B45309', '#FFFFFF', 'normal', 'text'],
  ['Accent text #B45309 on soft #F7F8FA', '#B45309', '#F7F8FA', 'normal', 'text'],
  ['Accent hover #8A4C09 on white', '#8A4C09', '#FFFFFF', 'normal', 'text'],
  // --- Buttons ---
  ['Primary button: white on #00558F', '#FFFFFF', '#00558F', 'normal', 'text'],
  ['Primary hover: white on #003F6B', '#FFFFFF', '#003F6B', 'normal', 'text'],
  ['Accent CTA: white on #B45309', '#FFFFFF', '#B45309', 'normal', 'text'],
  ['Accent CTA hover: white on #8A4C09', '#FFFFFF', '#8A4C09', 'normal', 'text'],
  // --- Footer (navy #1A2E44) ---
  ['Footer text #FFFFFF on #1A2E44', '#FFFFFF', '#1A2E44', 'normal', 'text'],
  ['Footer text #D9E2EC on #1A2E44', '#D9E2EC', '#1A2E44', 'normal', 'text'],
  ['Footer link hover #8FC7F0 on #1A2E44', '#8FC7F0', '#1A2E44', 'normal', 'text'],
  // --- Dark blue sections ---
  ['Dark-section eyebrow #F5C07A on #00558F', '#F5C07A', '#00558F', 'normal', 'text'],
  // --- Graphics (WCAG 1.4.11, 3:1) ---
  ['Social icon white on #B45309 hover', '#FFFFFF', '#B45309', 'normal', 'graphic'],
  ['Nav underline bar #B45309 on white', '#B45309', '#FFFFFF', 'normal', 'graphic'],
  ['Focus ring #B45309 on white', '#B45309', '#FFFFFF', 'normal', 'graphic'],
  ['Focus ring #00558F on white', '#00558F', '#FFFFFF', 'normal', 'graphic'],
  // --- Retired palette (reference only, not live styles) ---
  ['REF OLD nav underline #D9842B on white', '#D9842B', '#FFFFFF', 'normal', 'graphic', 'ref'],
  ['REF OLD link #D9842B on white', '#D9842B', '#FFFFFF', 'normal', 'text', 'ref'],
  ['REF proposal amber #F59E0B on white', '#F59E0B', '#FFFFFF', 'normal', 'text', 'ref'],
  ['REF decorative #98A2B3 on white (never text)', '#98A2B3', '#FFFFFF', 'normal', 'text', 'ref'],
  ['REF OLD secondary #5F738C on soft', '#5F738C', '#F5F7FA', 'normal', 'text', 'ref'],
];


const need = (size, kind) => {
  if (kind === 'graphic') return 3.0; // WCAG 1.4.11 non-text contrast
  return size === 'large' ? 3.0 : 4.5; // WCAG 1.4.3
};

let fails = 0;
console.log('WCAG contrast audit — huisjurist.nl\n');
for (const [label, fg, bg, size, kind, tag] of pairs) {
  const r = ratio(fg, bg);
  const n = need(size, kind);
  const ok = r >= n;
  const ref = tag === 'ref';
  if (!ok && !ref) fails++;
  console.log(
    `${ref ? 'REF ' : ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2)}:1  (need ${n}:1)  ${label}`
  );
}
console.log(
  `\n${fails === 0 ? 'All pairs pass ✔' : fails + ' pair(s) FAIL ✘'}`
);
process.exit(fails === 0 ? 0 : 1);
