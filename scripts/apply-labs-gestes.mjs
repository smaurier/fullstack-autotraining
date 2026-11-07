#!/usr/bin/env node
// Met à jour le README de CHAQUE cours avec sa table de labs-gestes (règle qualité 5, 22/09/2026),
// à partir de scripts/labs-gestes.json. Idempotent : la section est remplacée si elle existe.
//
// Usage : node scripts/apply-labs-gestes.mjs [--check] [--commit] [--push] [cours...]
//   --check : n'écrit RIEN, dit quels README seraient modifiés, sort en 1 s'il y en a.
//             À lancer avant tout --commit : c'est le garde-fou de la panne du 06/11/2026,
//             où une régénération a remplacé l'état réel de 5 cours par « à écrire ».
//
// ── SCHÉMA DE scripts/labs-gestes.json ──────────────────────────────────────────────────────
// Deux formes par cours, et la forme courte reste valide :
//
//   "00-typescript": [ [nom, forme, geste, statut], ... ]        ← forme courte, rendu par défaut
//
//   "12-aws-cloud": {                                             ← forme longue, tout est optionnel
//     "titre":    "Labs — geste transverse ...",                  ← remplace le titre par défaut
//     "intro":    ["> ligne 1", "> ligne 2"],                     ← VERBATIM, remplace le paragraphe
//     "colonnes": ["#", "Lab", "Cours", "Forme", "Geste", "Oracle"],
//     "note":     ["**Note ...**"],                               ← VERBATIM, après la table
//     "labs": [ { "id": "Z", "nom": "...", "chemin": "labs/.../README.md", "cours": "12-AWS",
//                 "forme": "Z", "geste": "...", "oracle": "✅ ... (3 tests)", "statut": "oracle" } ]
//   }
//
// Pourquoi la forme longue existe : certains cours ont une table que le rendu par défaut ne sait
// pas exprimer (une colonne « Cours » pour un geste transverse, un lien vers un lab d'un AUTRE
// sous-module, un statut d'oracle nuancé comme « apply NON APPLIQUÉ, pas de compte AWS »). Avant
// le 06/11/2026 ces tables étaient écrites à la main et le manifeste ne les connaissait pas : les
// régénérer DÉTRUISAIT l'information. Toute table écrite à la main doit donc être décrite ici.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(ROOT, "scripts/labs-gestes.json"), "utf8"));
const args = process.argv.slice(2);
const doCheck = args.includes("--check");
const doCommit = args.includes("--commit") && !doCheck;
const doPush = args.includes("--push") && !doCheck;
const only = args.filter((a) => !a.startsWith("--"));

const START = "<!-- labs-gestes:start -->";
const END = "<!-- labs-gestes:end -->";
const FORME = { Z: "Zéro", I: "Intervention", fiche: "Fiche" };
const COLONNES_PAR_DEFAUT = ["#", "Lab", "Forme", "Geste", "Oracle"];

const normaliser = (l) =>
  Array.isArray(l) ? { nom: l[0], forme: l[1], geste: l[2], statut: l[3] } : l;

function lien(lab) {
  // Un `chemin` explicite veut dire « ce README existe, lie-le », même si l'oracle n'est pas
  // encore vert : c'est le cas d'un lab écrit dont la vérification reste à confirmer.
  if (lab.chemin) return `[\`${lab.nom}\`](${lab.chemin})`;
  if ((lab.statut ?? "oracle") === "cible") return `\`${lab.nom}\``;
  return `[\`${lab.nom}\`](labs/${lab.nom}/README.md)`;
}

function cellule(colonne, lab, rang) {
  switch (colonne) {
    case "#":
      return lab.id ?? String(rang + 1).padStart(2, "0");
    case "Lab":
    case "Entrée":
      return lien(lab);
    case "Forme":
      return FORME[lab.forme] ?? lab.forme;
    case "Geste":
      return lab.geste;
    case "Oracle":
      return lab.oracle ?? ((lab.statut ?? "oracle") === "cible" ? "· à écrire" : "✅ vérifié");
    default:
      // Toute autre colonne se sert dans le lab par son nom en minuscules (ex. « Cours »).
      return lab[colonne.toLowerCase()] ?? "";
  }
}

function rendre(conf) {
  const labs = (conf.labs ?? []).map(normaliser);
  const oracles = labs.filter((l) => (l.statut ?? "oracle") === "oracle").length;
  const colonnes = conf.colonnes ?? COLONNES_PAR_DEFAUT;

  const titre = conf.titre ?? "Labs — refonte du 22/09/2026 : un lab = un geste métier complet";
  const intro = conf.intro
    ? conf.intro.join("\n")
    : `> Règle qualité 5 du parcours : chaque lab est **un geste métier complet**, sous deux formes — **Zéro** (construire de zéro un artefact réel et entier) ou **Intervention** (modifier de l'existant avec consommateurs, findings avant code, non-régression). Un lab n'entre en file qu'avec un **oracle exécutable** (\`src/\` starter · \`test/\` · \`solution/\` séparée). Les labs historiques de ce cours (un concept par lab, sans oracle) restent dans \`labs/\` jusqu'à remplacement et **ne sont plus la file**. Cible détaillée : [\`docs/gestes-complets.md\`](../docs/gestes-complets.md). État : **${oracles}/${labs.length} avec oracle**.`;

  let section = `${START}\n## ${titre}\n\n${intro}\n\n`;
  section += `| ${colonnes.join(" | ")} |\n`;
  section += `|${colonnes.map((c) => "-".repeat(c.length + 2)).join("|")}|\n`;
  labs.forEach((lab, rang) => {
    section += `| ${colonnes.map((c) => cellule(c, lab, rang)).join(" | ")} |\n`;
  });
  section += conf.note ? `\n${conf.note.join("\n")}\n\n${END}` : `\n${END}`;

  return { section, oracles, total: labs.length };
}

let aChanger = 0;

for (const [course, brut] of Object.entries(data)) {
  if (course === "_") continue;
  if (only.length && !only.includes(course)) continue;
  const dir = join(ROOT, course);
  const file = join(dir, "README.md");
  if (!existsSync(dir)) {
    console.error("cours introuvable :", course);
    continue;
  }

  const conf = Array.isArray(brut) ? { labs: brut } : brut;
  const { section, oracles, total } = rendre(conf);

  const avant = existsSync(file) ? readFileSync(file, "utf8") : `# ${course}\n\n`;
  const eol = avant.includes("\r\n") ? "\r\n" : "\n";
  let md = avant.split("\r\n").join("\n");
  if (md.includes(START) && md.includes(END)) {
    md = md.slice(0, md.indexOf(START)) + section + md.slice(md.indexOf(END) + END.length);
  } else {
    // insérée après le premier bloc de titre/badges/prérequis : avant le premier "## " ; sinon en fin.
    const idx = md.indexOf("\n## ");
    md =
      idx >= 0
        ? md.slice(0, idx + 1) + section + "\n\n" + md.slice(idx + 1)
        : md.trimEnd() + "\n\n" + section + "\n";
  }
  const apres = md.split("\n").join(eol);
  const identique = apres === avant;

  if (doCheck) {
    if (!identique) aChanger++;
    console.log(
      `${identique ? "  inchange " : "  MODIFIE  "} ${course} (${oracles}/${total} oracles)`,
    );
    continue;
  }

  writeFileSync(file, apres, "utf8");
  console.log(course, "README OK", `(${oracles}/${total} oracles)`);

  if (doCommit) {
    // `execFileSync` avec un TABLEAU d'arguments, jamais une chaîne passée à un shell.
    // Mesuré le 06/11/2026 : l'ancienne version construisait `git commit -m "sujet\n\ncorps"` en
    // une seule chaîne. Sur Windows, elle partait dans cmd.exe, le commit était accepté, et le
    // CORPS était silencieusement perdu — les lignes de trailer n'ont jamais atteint un commit.
    const git = (...argv) => execFileSync("git", argv, { cwd: dir, stdio: "pipe" }).toString().trim();
    try {
      git("add", "README.md");
      if (!git("status", "--short", "README.md")) {
        console.log("  rien à commiter");
        continue;
      }
      // Aucune donnée figée dans ce message : pas de date d'écriture, pas de version de modèle,
      // pas d'URL de session. Tout ça devient faux dès le run suivant.
      git(
        "commit",
        "-q",
        "-m",
        "README : table des labs-gestes (règle 5, un lab = un geste métier complet)",
        "-m",
        "Généré depuis scripts/labs-gestes.json par scripts/apply-labs-gestes.mjs.\n\nCo-Authored-By: Claude <noreply@anthropic.com>",
      );
      if (doPush) {
        try {
          git("pull", "-q", "--rebase", "origin", "main");
        } catch {
          /* pas de remote ou déjà à jour */
        }
        // `HEAD:main` et non `main` : un sous-module est souvent en HEAD détaché, et
        // `git push origin main` pousserait alors la ref locale restée en arrière en sortant
        // en 0, sans rien envoyer. ⚠️ après ce push, la ref locale `main` du sous-module reste
        // derrière : c'est normal, mais ne jamais conclure d'un code de sortie, vérifier avec
        // `git ls-remote origin main`.
        git("push", "-q", "origin", "HEAD:main");
        console.log("  commit + push OK");
      } else console.log("  commit OK");
    } catch (e) {
      console.error("  git KO :", String(e.stderr || e.message).split("\n")[0]);
    }
  }
}

if (doCheck) {
  console.log(
    aChanger === 0
      ? "\nOK : le manifeste et les README disent la meme chose."
      : `\nKO : ${aChanger} README seraient modifies. Reconcilie scripts/labs-gestes.json AVANT d'ecrire.`,
  );
  process.exit(aChanger === 0 ? 0 : 1);
}
