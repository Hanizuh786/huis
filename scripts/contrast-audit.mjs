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

// Reference rows (tagged 'ref') document the pre-fix palette; they are not live styles.
const pairs = [
  // [label, fg, bg, size ('normal' | 'large'), kind ('text' | 'graphic')]
  ['Body text #25364A on white', '#25364A', '#FFFFFF', 'normal', 'text'],
  ['Body text #25364A on soft #F5F7FA', '#25364A', '#F5F7FA', 'normal', 'text'],
  ['Secondary #566B82 on white', '#566B82', '#FFFFFF', 'normal', 'text'],
  ['Secondary #566B82 on soft #F5F7FA', '#566B82', '#F5F7FA', 'normal', 'text'],
  ['H1/H2 #005496 on white', '#005496', '#FFFFFF', 'large', 'text'],
  ['Link orange #9E570B on white', '#9E570B', '#FFFFFF', 'normal', 'text'],
  ['Link orange #9E570B on soft #F5F7FA', '#9E570B', '#F5F7FA', 'normal', 'text'],
  ['Link hover #8A4C09 on white', '#8A4C09', '#FFFFFF', 'normal', 'text'],
  ['Primary button: white on #005496', '#FFFFFF', '#005496', 'normal', 'text'],
  ['Primary hover: white on #003F71', '#FFFFFF', '#003F71', 'normal', 'text'],
  ['Accent CTA: white on #9E570B', '#FFFFFF', '#9E570B', 'normal', 'text'],
  ['Accent CTA hover: white on #8A4C09', '#FFFFFF', '#8A4C09', 'normal', 'text'],
  ['Footer text white on #003F71', '#FFFFFF', '#003F71', 'normal', 'text'],
  ['Footer link hover #F5C07A on #003F71', '#F5C07A', '#003F71', 'normal', 'text'],
  ['Dark-section eyebrow #F5C07A on #005496', '#F5C07A', '#005496', 'normal', 'text'],
  ['Social icon white on #9E570B hover', '#FFFFFF', '#9E570B', 'normal', 'graphic'],
  ['Nav underline bar #D9842B on white', '#D9842B', '#FFFFFF', 'normal', 'graphic'],
  ['Focus ring #9E570B on white', '#9E570B', '#FFFFFF', 'normal', 'graphic'],
  ['Focus ring #D9842B on white (ref)', '#D9842B', '#FFFFFF', 'normal', 'graphic', 'ref'],
  ['OLD link #D9842B on white (ref)', '#D9842B', '#FFFFFF', 'normal', 'text', 'ref'],
  ['OLD secondary #5F738C on soft (ref)', '#5F738C', '#F5F7FA', 'normal', 'text', 'ref'],
  ['OLD accent CTA white on #D9842B (ref)', '#FFFFFF', '#D9842B', 'normal', 'text', 'ref'],
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
