#!/usr/bin/env node
// Score de qualité des labs (0-4) — règle qualité n°4 du parcours (21/09/2026).
//
// Un lab gagne un point par critère :
//   oracle     : au moins un fichier de test (*.test.*, *.spec.*, *.test-d.*) hors node_modules
//   solution   : une solution séparée (dossier solution/ ou solution.*) ET aucun « ## Corrigé » dans le README
//   outillage  : un package.json ou une config vitest/jest dans le lab (exécutable tel quel)
//   tribuzen   : le README ancre le lab dans TribuZen
//
// Score < 2 = le lab n'entre pas en file tant qu'il n'est pas converti.
//
// Usage : node scripts/score-labs.mjs [--out docs/qualite-labs-arc1.md] [cours...]
// Par défaut : les cinq cours de l'arc 1.

import { readdirSync, statSync, readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ARC1 = ["00-typescript", "06-testing", "09-nestjs", "10-postgresql", "04-react"];

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
const outFile = outIdx >= 0 ? args.splice(outIdx, 2)[1] : null;
const courses = args.length ? args : ARC1;

const TEST_RE = /\.(test|spec|test-d)\.[cm]?[jt]sx?$/;
const TOOLING = ["package.json", "vitest.config.ts", "vitest.config.mts", "vitest.config.js", "jest.config.ts", "jest.config.js"];

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name === "dist" || name === ".git" || name === ".vitepress") continue;
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
      if (name === "node_modules" || name === ".vitepress" || name === "dist") continue;
      const p = join(dir, name);
      if (!statSync(p).isDirectory()) continue;
      if (/^lab-?\d+/i.test(name)) out.push(p);
      else visit(p, depth + 1);
    }
  };
  visit(courseDir, 0);
  return out.sort();
}

function scoreLab(labDir) {
  const files = walk(labDir);
  const rel = (f) => relative(labDir, f).replace(/\\/g, "/");
  const readmePath = files.find((f) => /readme\.md$/i.test(f));
  const readme = readmePath ? readFileSync(readmePath, "utf8") : "";

  const oracle = files.some((f) => TEST_RE.test(f));
  const hasSolution = files.some((f) => /^solution(\/|\.)/.test(rel(f)));
  const corrigeInReadme = /^##\s+Corrig/im.test(readme);
  const solution = hasSolution && !corrigeInReadme;
  const outillage = TOOLING.some((t) => existsSync(join(labDir, t)));
  const tribuzen = /tribuzen/i.test(readme);

  return { oracle, solution, outillage, tribuzen, score: [oracle, solution, outillage, tribuzen].filter(Boolean).length };
}

const rows = [];
const perCourse = [];
for (const course of courses) {
  const courseDir = join(ROOT, course);
  if (!existsSync(courseDir)) { console.error(`cours introuvable : ${course}`); continue; }
  const labs = findLabDirs(courseDir);
  const scores = labs.map((l) => ({ course, lab: relative(courseDir, l).replace(/\\/g, "/"), ...scoreLab(l) }));
  rows.push(...scores);
  perCourse.push({
    course,
    labs: labs.length,
    oracle: scores.filter((s) => s.oracle).length,
    solution: scores.filter((s) => s.solution).length,
    enFile: scores.filter((s) => s.oracle && s.score >= 2).length,
    avg: labs.length ? (scores.reduce((a, s) => a + s.score, 0) / labs.length).toFixed(2) : "-",
  });
}

const tick = (b) => (b ? "✅" : "·");
const date = new Date().toISOString().slice(0, 10);
let md = `# Qualité des labs — arc 1\n\n`;
md += `> Généré le ${date} par \`scripts/score-labs.mjs\`. Un point par critère : oracle exécutable · solution séparée (et pas de corrigé dans le README) · outillage exécutable · ancrage TribuZen. **Éligible en file = oracle présent ET score ≥ 2** (un lab sans oracle n'est pas un lab, règle qualité 2 du parcours).\n\n`;
md += `## Par cours\n\n| Cours | Labs | Avec oracle | Solution séparée | Éligibles (oracle + ≥ 2) | Score moyen |\n|---|---|---|---|---|---|\n`;
for (const c of perCourse) md += `| ${c.course} | ${c.labs} | ${c.oracle} | ${c.solution} | ${c.enFile} | ${c.avg} |\n`;
md += `\n## Par lab\n\n| Cours | Lab | Oracle | Solution | Outillage | TribuZen | Score |\n|---|---|---|---|---|---|---|\n`;
for (const r of rows) md += `| ${r.course} | ${r.lab} | ${tick(r.oracle)} | ${tick(r.solution)} | ${tick(r.outillage)} | ${tick(r.tribuzen)} | **${r.score}** |\n`;

console.table(perCourse);
if (outFile) {
  const target = join(ROOT, outFile);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, md, "utf8");
  console.log(`→ ${outFile}`);
} else {
  process.stdout.write(md);
}
