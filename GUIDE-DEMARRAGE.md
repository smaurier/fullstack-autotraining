# Guide de demarrage — Comment utiliser ce curriculum

> Tu ouvres un cours et tu vois des dossiers partout (modules/, labs/, scripts/, quizzes/...).
> Ce guide t'explique quoi ouvrir, dans quel ordre, et quoi ignorer.

---

## 1. Les 2 formats de cours

Les 16 cours utilisent 2 structures differentes :

### Format VitePress (12 cours)

**Cours concernes** : TypeScript, JS Runtime, NestJS, PostgreSQL, Testing, HTTP/Caching, Observability, AWS, Distributed Systems, React Native, WebGPU, IA

```
cours-xyz/
├── modules/          ← TU LIS CA (cours numerotes 00, 01, 02...)
├── labs/             ← TU CODES CA (exercise.ts → solution.ts)
├── quizzes/          ← TU TESTES CA (ouvrir les .html dans le navigateur)
├── screencasts/      ← Optionnel (scripts de video, utiles pour reviser)
├── visualizations/   ← Optionnel (animations HTML a ouvrir dans le navigateur)
├── glossaire.md      ← Reference (termes techniques du cours)
├── scripts/          ← IGNORE (outils de generation, pas du contenu)
├── package.json      ← Pour installer les deps (npm install)
└── README.md         ← Lis-le en premier : commandes, structure, parcours
```

**Lancer le site de cours** (navigation web avec sidebar) :
```bash
npm install        # une seule fois
npm run docs:dev   # ouvre http://localhost:5173
```

### Format Projet integre (4 cours)

**Cours concernes** : React, Vue, Angular, Architecture

```
cours-xyz/
├── cours/            ← TU LIS CA (lecons en Markdown, par dossier thematique)
├── exercices/        ← TU CODES CA (enonces + corrections)
├── projet-fil-rouge/ ← TU CONSTRUIS CA (app qui grandit au fil du cours)
├── quizzes/          ← TU TESTES CA (quiz HTML)
├── src/              ← Code source de l'app (tu modifies ici)
└── README.md         ← Lis-le en premier
```

**Lancer le projet** :
```bash
pnpm install       # une seule fois
pnpm dev           # ouvre l'app dans le navigateur
```

---

## 2. La boucle pour chaque module

Repete ce cycle pour CHAQUE module. Ne saute pas d'etape.

```
┌─────────────────────────────────────────────────────┐
│  1. LIRE     modules/XX-....md  (ou cours/XX-/)     │  20-30 min
│  2. CODER    labs/lab-XX/ exercise.ts                │  30-60 min
│              → essaie SEUL, sans regarder la solution│
│  3. COMPARER labs/lab-XX/ solution.ts                │  10 min
│              → lis les POURQUOI, pas juste le code   │
│  4. QUIZ     quizzes/quiz-XX-....html                │  5-10 min
│              → ouvre dans le navigateur               │
│  5. NOTER    1-3 phrases : qu'est-ce que j'ai appris│  2 min
│              → dans un fichier progress.md perso     │
└─────────────────────────────────────────────────────┘
        Si < 80% au quiz → relis le module
        Si tu bloques > 30 min → lis la solution, ferme-la, refais
```

---

## 3. Par ou commencer

### Si tu commences par TypeScript (recommande)

```bash
cd 01-typescript
npm install
npm run docs:dev      # site avec sidebar navigable
```

Puis :
1. Ouvre `modules/00-prerequis-et-introduction.md` (ou via le site web)
2. Fais `labs/lab-01-premiers-types/` → `exercise.ts` (ou `npm run lab:01`)
3. Verifie avec `solution.ts` (ou `npm run solution:01`)
4. Ouvre `quizzes/quiz-01-types-primitifs.html` dans Chrome
5. Continue avec module 02, lab 02, quiz 02...

### Parcours TypeScript par phases

| Phase | Modules | Ce que tu apprends |
|-------|---------|-------------------|
| Fondamentaux | 00-04 | Types, inference, fonctions, objets, narrowing |
| Intermediaire | 05-09 | Classes, generics, enums, modules |
| Avance | 10-14 | Utility types, conditional types, mapped types, decorateurs |
| Expert | 15-19 | Variance, declaration files, tsconfig, patterns, projet final |

**Temps estime** : ~40-50h (2-3 semaines a 2h/jour)

---

## 4. Ordre global des 16 cours

Suis le parcours "Fullstack Complete" de `parcours-thematiques.md` :

```
Semaine 1-2  : TypeScript (01) → JS Runtime (02)
Semaine 3-4  : React ou Vue ou Angular (08/03/09) → Testing (04)
Semaine 5-7  : NestJS (05) → PostgreSQL (06)
Semaine 8-9  : HTTP/Caching (07) → incl. Redis, GraphQL
Semaine 10-11: Distributed Systems (11) → Observability (12)
Semaine 12   : AWS (16) → Capstone TaskFlow
Bonus        : React Native (10), WebGPU (14), IA (15), Architecture (13)
```

---

## 5. Les ressources transversales (a la racine)

A utiliser ENTRE et APRES les cours :

| Quand | Ressource | Fichier |
|-------|-----------|---------|
| Apres chaque cours | **Code katas** — 15-30 min sans guidance | `katas/phase-a-frameworks.md` ou `katas/phase-bde-backend-infra.md` |
| En fin de palier | **Cheat sheet** du palier | `cheat-sheets/phase-*.md` |
| Quand tu fais une erreur | **Erreurs classiques** — verifie si c'est un piege connu | `cheat-sheets/erreurs-classiques.md` |
| Avant un entretien | **Questions d'entretien** — teste-toi | `interview/questions-entretien.md` |
| Pour reviser visuellement | **Diagrammes Mermaid** — 12 schemas d'architecture | `cheat-sheets/diagrammes-architecture.md` |
| Pour chercher un terme | **Glossaire** — 90 termes avec renvois | `glossaire.md` |
| Si tu changes de framework | **Guides de migration** — avant/apres | `cheat-sheets/guides-migration.md` |
| En fin de curriculum | **Capstone TaskFlow** — projet fullstack cross-cours | `capstone/projet-capstone-fullstack.md` |

---

## 6. Ce que tu peux ignorer

| Dossier/Fichier | Pourquoi |
|-----------------|----------|
| `scripts/` | Outils de generation automatique (pas du contenu) |
| `package-lock.json` / `pnpm-lock.yaml` | Fichier de lock npm/pnpm (gere automatiquement) |
| `.vitepress/` | Config du site VitePress (pas du contenu) |
| `screencasts/` | Scripts de videos — utiles pour reviser, mais pas prioritaires |
| `visualizations/` | Animations HTML — sympas mais optionnelles |
| `index.md` | Page d'accueil VitePress (renvoie vers les modules) |

---

## 7. Checklist avant de commencer TypeScript

- [ ] `cd 01-typescript && npm install`
- [ ] `npm run docs:dev` → verifier que le site s'ouvre
- [ ] Creer un fichier `progress.md` a la racine du curriculum (notes personnelles)
- [ ] Ouvrir `modules/00-prerequis-et-introduction.md`
- [ ] Mettre un timer : 2h max par session, pause apres

Bonne formation !
