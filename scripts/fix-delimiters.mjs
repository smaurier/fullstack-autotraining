// Fix dette delimiters : retire l'override `vue.template.compilerOptions.delimiters` de la
// config VitePress d'un cours (il casse le thème) + neutralise les `{{ }}` de prose/inline-code
// du contenu en <code v-pre>...</code>. Le build reste l'oracle final.
// Usage : node scripts/fix-delimiters.mjs <course-dir>
import fs from 'node:fs';
import path from 'node:path';

const course = process.argv[2];
if (!course) { console.error('usage: node fix-delimiters.mjs <course-dir>'); process.exit(1); }

// --- 1. Strip the top-level `vue: { ... }` block from config (brace-matched) ---
const cfgPath = path.join(course, '.vitepress', 'config.mts');
let cfg = fs.readFileSync(cfgPath, 'utf8');
const idx = cfg.search(/\n\s*vue:\s*\{/);
if (idx !== -1) {
  // find the matching close brace of `vue: {`
  const braceStart = cfg.indexOf('{', idx);
  let depth = 0, i = braceStart, end = -1;
  for (; i < cfg.length; i++) {
    if (cfg[i] === '{') depth++;
    else if (cfg[i] === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end !== -1) {
    // also swallow a trailing comma + following whitespace/newline
    let after = end + 1;
    if (cfg[after] === ',') after++;
    const removed = cfg.slice(idx, after);
    cfg = cfg.slice(0, idx) + '\n' + cfg.slice(after);
    // insert a note where the block was
    cfg = cfg.slice(0, idx) +
      "\n  // NB : override `delimiters` retiré (il cassait le {{ }} du thème par défaut).\n" +
      "  // cf docs/curriculum/DETTE-vitepress-delimiters.md\n" +
      cfg.slice(idx + 1);
    fs.writeFileSync(cfgPath, cfg);
    console.log('  config: override retiré');
  } else {
    console.log('  config: bloc vue trouvé mais accolade non appariée — SKIP');
  }
} else {
  console.log('  config: pas d\'override (déjà propre)');
}

// --- 2. Wrap inline-code spans containing {{ }} into <code v-pre>...</code> (fence-aware) ---
let wrapped = 0;
function fixMd(file) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let inFence = false, changed = false;
  const out = lines.map((l) => {
    const t = l.trim();
    if (/^(```|~~~)/.test(t)) { inFence = !inFence; return l; }
    if (inFence) return l;
    if (!l.includes('{{')) return l;
    // wrap backtick inline-code spans containing {{ into <code v-pre>
    let nl = l.replace(/`([^`]*\{\{[^`]*)`/g, (m, inner) => { changed = true; wrapped++; return '<code v-pre>' + inner + '</code>'; });
    return nl;
  });
  if (changed) fs.writeFileSync(file, out.join('\n'));
}
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.md')) fixMd(p);
  }
}
for (const dir of ['modules', 'labs']) {
  const b = path.join(course, dir);
  if (fs.existsSync(b)) walk(b);
}
console.log('  inline-code {{ }} wrappés en <code v-pre> :', wrapped);
