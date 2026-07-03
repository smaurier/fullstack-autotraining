# Refonte 08-soft-skills — colonne vertébrale + contrat agent

> Spec durable pour le rollout autonome. Chaque agent write LIT ce fichier.
> Cible : `08-soft-skills/modules/NN-slug.md` + `08-soft-skills/labs/lab-NN-slug/README.md`.
> Exemplar OBLIGATOIRE : `02-vue/modules/00-*.md` (module) + `02-vue/labs/lab-02-*/README.md` (lab).
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> **Cours conceptuel (soft skills) — quasi aucune API à vérifier.** Si un outil concret est cité
> (GitHub PR, ADR tooling, conventional commits), vérifier via WebFetch si doute ; sinon inutile.

## Contrat agent (invariants gate — non négociables)

1. **Frontmatter** identique aux clés exemplar : `titre, cours: 08-soft-skills, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu (quote la valeur). **Quote tout item de notions[] contenant `@`, `[`, `(`, `:`** (sinon casse le YAML VitePress).
2. **7 sections** du MODULE-TEMPLATE dont §1 « Cas concret d'abord », ≥5 seeds coach.
3. **Ordre novice→expert** : n'utilise aucune notion d'un module de numéro supérieur.
4. **Lab = README-only** : énoncé + critères + corrigé + **feedback = coach** + **variante J+30**. ZÉRO harnais de test simulé. ⚠️ Le legacy `08-soft-skills/labs/test-utils.ts` et tout `*.ts` d'exo/harnais = À NE PAS reproduire (labs = README uniquement). Pour un cours soft-skills, le lab = mise en situation (rédiger une PR review, un ADR, une estimation) évaluée par grille + coach, pas de code exécuté.
5. **Fil-rouge TribuZen** : ancrer chaque module dans la vie d'équipe du projet TribuZen (revue de PR TribuZen, ADR sur un choix TribuZen, estimation d'une feature TribuZen). [[project_fil_rouge_tribuzen]]
6. `{{ }}` en prose → échapper (SSR VitePress). Pas de React/Vue/framework dans le corps.

## Vérif (si outil concret cité)
- NE PAS utiliser Context7 (quota mort). WebFetch la doc officielle si besoin (docs.github.com pour PR/review, conventionalcommits.org, adr.github.io). `<!-- FLAG-DOC: ... -->` si échec. Sinon, contenu conceptuel = pas de fetch.

## Colonne vertébrale (source = modules/ legacy à réécrire au template)

| NN | Module | next |
|----|--------|------|
| 00 | introduction-soft-skills (pourquoi, panorama, posture) | 01 |
| 01 | code-review (feedback actionnable, structurer une PR, désaccords) | 02 |
| 02 | communication-ecrite (async, messages clairs, docs de PR/issue) | 03 |
| 03 | communication-orale (daily, présenter, écoute active) | 04 |
| 04 | estimation-planification (story points, incertitude, découpage) | 05 |
| 05 | documentation-technique (README, runbook, diagrammes, ADR-lite) | 06 |
| 06 | pair-programming-mentorat (driver/navigator, faire progresser un junior) | 07 |
| 07 | adr-decision-making (ADR, trade-offs, décision tracée) | 08 |
| 08 | gestion-conflits (désaccords techniques, feedback difficile, escalade) | 09 |
| 09 | carriere-developpeur (progression, veille, posture ESN/mission) | 10 |
| 10 | projet-final (mise en situation intégrée : review + ADR + estimation + conflit) | (fin) |

11 modules (00-10) + 11 labs. Dernier module `next` = sentinel `fin-parcours-08-soft-skills` (pas de slug fantôme, cf. 02-vue dernier module).
