#!/usr/bin/env node
// Scan « geste métier complet » (règle qualité 5 du parcours, 22/09/2026).
// Pour chaque cours et chaque lab : Outcome, forme détectée (zéro / intervention / concept),
// présence d'un oracle. Heuristique = signal, pas verdict : le jugement par cours est écrit
// à la main dans docs/gestes-complets.md.
//
// Usage : node scripts/scan-gestes.mjs [--out docs/scan-gestes.md] [cours...]

import { readdirSync, statSync, readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outFile = outIdx >= 0 ? args.splice(outIdx, 2)[1] : null;
const courses = args.length
  ? args
  : readdirSync(ROOT).filter((d) => /^\d\d-/.test(d) && statSync(join(ROOT, d)).isDirectory()).sort();

const SKIP = new Set(["node_modules", ".vitepress", "dist", ".git"]);
const TEST_RE = /\.(test|spec|test-d|stories)\.[cm]?[jt]sx?$/;
const INTERVENTION = /refactor|corrig|existant|migr|point de départ|fautif|collègue|à réparer|régression|legacy|hérité|dette/i;
const ZERO = /de zéro|from scratch|de A à Z|depuis une page blanche|construis|crée .* (complet|entier)|monte (un|une)/i;
const ARTEFACTS = [
  [/test|spec|vitest|jest|playwright|supertest/i, "tests"],
  [/stor(y|ies)|storybook/i, "story"],
  [/a11y|accessib|aria|axe|rgaa|wcag/i, "a11y"],
  [/docker|deploy|déploi|ci\b|pipeline|github actions/i, "livraison"],
  [/migration|schéma|schema|index|explain/i, "données"],
  [/dto|validation|pipe|guard|controller|endpoint|route/i, "api"],
  [/props|interface|type |contrat/i, "contrat"],
  [/style|css|tailwind|token|variant/i, "style"],
];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}
function findLabDirs(courseDir) {
  const out = [];
  const visit = (dir, depth) => {
    if (depth > 3) return;
    for (const name of readdirSync(dir)) {
      if (SKIP.has(name)) continue;
      const p = join(dir, name);
      if (!statSync(p).isDirectory()) continue;
      if (/^lab-?\d+/i.test(name)) out.push(p);
      else visit(p, depth + 1);
    }
  };
  visit(courseDir, 0);
  return out.sort();
}

const perCourse = [];
let md = `# Scan « geste métier complet » — tout le parcours\n\n> Généré le ${new Date().toISOString().slice(0, 10)} par \`scripts/scan-gestes.mjs\`. Forme détectée par heuristique sur l'énoncé (zéro / intervention / concept) et artefacts mentionnés. **Signal, pas verdict** : le jugement et la cible par cours sont dans \`docs/gestes-complets.md\`.\n\n`;

for (const course of courses) {
  const courseDir = join(ROOT, course);
  const labs = findLabDirs(courseDir);
  const rows = [];
  for (const lab of labs) {
    const files = walk(lab);
    const readmePath = files.find((f) => /readme\.md$/i.test(f));
    const readme = readmePath ? readFileSync(readmePath, "utf8") : "";
    const outcome = (readme.match(/\*\*Outcome\s*:\*\*\s*(.*)/) || [])[1]?.replace(/\s+/g, " ").slice(0, 140) ?? "";
    const enonce = readme.split(/^## (Corrigé|Solution)/m)[0];
    const forme = INTERVENTION.test(enonce) ? "intervention" : ZERO.test(enonce) ? "zéro" : "concept";
    const artefacts = ARTEFACTS.filter(([re]) => re.test(enonce)).map(([, n]) => n);
    const oracle = files.some((f) => TEST_RE.test(f));
    rows.push({ lab: relative(courseDir, lab).replace(/\\/g, "/"), outcome, forme, artefacts, oracle });
  }
  const count = (f) => rows.filter((r) => r.forme === f).length;
  const entier = rows.filter((r) => r.artefacts.length >= 3).length;
  perCourse.push({ course, labs: rows.length, zero: count("zéro"), intervention: count("intervention"), concept: count("concept"), entier, oracle: rows.filter((r) => r.oracle).length });
  md += `## ${course} — ${rows.length} labs · zéro ${count("zéro")} · intervention ${count("intervention")} · concept ${count("concept")} · ≥3 artefacts ${entier} · oracle ${rows.filter((r) => r.oracle).length}\n\n`;
  md += `| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |\n|---|---|---|---|---|\n`;
  for (const r of rows) md += `| ${r.lab} | ${r.forme} | ${r.artefacts.join(", ") || "·"} | ${r.oracle ? "✅" : "·"} | ${r.outcome.replace(/\|/g, "\\|")} |\n`;
  md += "\n";
}

console.table(perCourse);
if (outFile) {
  const target = join(ROOT, outFile);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, md, "utf8");
  console.log(`→ ${outFile}`);
}
