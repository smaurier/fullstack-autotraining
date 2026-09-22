#!/usr/bin/env node
// Met à jour le README de CHAQUE cours avec sa table de labs-gestes (règle qualité 5, 22/09/2026),
// à partir de scripts/labs-gestes.json. Idempotent : la section est remplacée si elle existe.
// Usage : node scripts/apply-labs-gestes.mjs [--commit] [--push]
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(ROOT, "scripts/labs-gestes.json"), "utf8"));
const args = process.argv.slice(2);
const doCommit = args.includes("--commit");
const doPush = args.includes("--push");

const START = "<!-- labs-gestes:start -->";
const END = "<!-- labs-gestes:end -->";
const FORME = { Z: "Zéro", I: "Intervention", fiche: "Fiche" };

for (const [course, labs] of Object.entries(data)) {
  if (course === "_") continue;
  const dir = join(ROOT, course);
  const file = join(dir, "README.md");
  if (!existsSync(dir)) { console.error("cours introuvable :", course); continue; }
  const oracles = labs.filter((l) => l[3] === "oracle").length;
  let section = `${START}\n## Labs — refonte du 22/09/2026 : un lab = un geste métier complet\n\n`;
  section += `> Règle qualité 5 du parcours : chaque lab est **un geste métier complet**, sous deux formes — **Zéro** (construire de zéro un artefact réel et entier) ou **Intervention** (modifier de l'existant avec consommateurs, findings avant code, non-régression). Un lab n'entre en file qu'avec un **oracle exécutable** (\`src/\` starter · \`test/\` · \`solution/\` séparée). Les labs historiques de ce cours (un concept par lab, sans oracle) restent dans \`labs/\` jusqu'à remplacement et **ne sont plus la file**. Cible détaillée : [\`docs/gestes-complets.md\`](../docs/gestes-complets.md). État : **${oracles}/${labs.length} avec oracle**.\n\n`;
  section += `| # | Lab | Forme | Geste | Oracle |\n|---|-----|-------|-------|--------|\n`;
  labs.forEach(([name, forme, geste, statut], i) => {
    const link = statut === "oracle" ? `[\`${name}\`](labs/${name}/README.md)` : `\`${name}\``;
    section += `| ${String(i + 1).padStart(2, "0")} | ${link} | ${FORME[forme] ?? forme} | ${geste} | ${statut === "oracle" ? "✅ vérifié" : "· à écrire"} |\n`;
  });
  section += `\n${END}`;

  let md = existsSync(file) ? readFileSync(file, "utf8") : `# ${course}\n\n`;
  const eol = md.includes("\r\n") ? "\r\n" : "\n";
  md = md.split("\r\n").join("\n");
  if (md.includes(START) && md.includes(END)) {
    md = md.slice(0, md.indexOf(START)) + section + md.slice(md.indexOf(END) + END.length);
  } else {
    // insérée après le premier bloc de titre/badges/prérequis : avant le premier "## " ; sinon en fin.
    const idx = md.indexOf("\n## ");
    md = idx >= 0 ? md.slice(0, idx + 1) + section + "\n\n" + md.slice(idx + 1) : md.trimEnd() + "\n\n" + section + "\n";
  }
  writeFileSync(file, md.split("\n").join(eol), "utf8");
  console.log(course, "README OK", `(${oracles}/${labs.length} oracles)`);

  if (doCommit) {
    const run = (cmd) => execSync(cmd, { cwd: dir, stdio: "pipe" }).toString().trim();
    try {
      run("git add README.md");
      const status = run("git status --short README.md");
      if (!status) { console.log("  rien à commiter"); continue; }
      run(`git commit -q -m "README : table des labs-gestes (règle 5, un lab = un geste métier complet), 22/09/2026\n\nCo-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>\nClaude-Session: https://claude.ai/code/session_01DVioZdWmfuMn9tTTT2hsXX"`);
      if (doPush) {
        try { run("git pull -q --rebase origin main"); } catch { /* pas de remote ou déjà à jour */ }
        run("git push -q origin HEAD:main");
        console.log("  commit + push OK");
      } else console.log("  commit OK");
    } catch (e) {
      console.error("  git KO :", String(e.stderr || e.message).split("\n")[0]);
    }
  }
}
