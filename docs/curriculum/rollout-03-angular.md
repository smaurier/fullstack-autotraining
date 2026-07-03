# Refonte 03-angular — colonne vertébrale + contrat agent

> Spec durable pour le rollout autonome. Chaque agent write LIT ce fichier.
> Cible : `03-angular/modules/NN-slug.md` + `03-angular/labs/lab-NN-slug.md`.
> Exemplar OBLIGATOIRE à imiter : `02-vue/modules/00-*.md` (module) + `02-vue/labs/lab-02-*` (lab).
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `docs/curriculum/LAB-TEMPLATE.md`, `docs/curriculum/AUDIT-RUBRIC.md`.
> Version cible : **Angular 19+** (standalone, signals, zoneless, control flow `@if/@for`, `input()/output()/model()`, resource API, signal forms).

## Contrat agent (invariants gate — non négociables)

1. **Context7 OBLIGATOIRE** pour toute API Angular (résoudre `/angular/angular`, query la notion). La majorité des erreurs QA viennent d'APIs devinées. Pas d'API auto-déclarée.
2. **Frontmatter** identique à l'exemplar : `titre, cours: 03-angular, notions[], outcomes[], prerequis[], next, libs[{name,version}], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu non échappé dans une valeur (casse le build → quote la valeur).
3. **7 sections** du MODULE-TEMPLATE, dont §1 « Cas concret d'abord » (concret→abstrait), ≥5 seeds coach.
4. **Ordre novice→expert STRICT** : n'utilise aucune notion d'un module de numéro supérieur. Reste dans la portée du module (bloc « Portée » comme l'exemplar).
5. **Lab = README-only** : énoncé + critères + corrigé vrai-outil (Angular CLI/Vitest), **feedback = coach**, **variante J+30** obligatoire. ZÉRO harnais de test simulé (`createTestRunner`/assert maison interdits — gate anti-simulé FAIL sinon).
6. **Fil-rouge TribuZen** : chaque module ancre la notion dans une couche réelle de TribuZen (champ `tribuzen` + fil dans §1). [[project_fil_rouge_tribuzen]]
7. **Délimiteurs** : `{{ }}` Angular en prose → échappe/encadre pour ne pas casser le SSR VitePress.
8. Pas de React/Vue dans le corps (cross-framework gate).

## Colonne vertébrale (numérotation plate — diff exhaustif vs `cours/`)

| NN | Module | Source `cours/` | next |
|----|--------|-----------------|------|
| 00 | de-vue-a-angular (mental model + équivalences) | 00/01, 00/02 | 01 |
| 01 | premier-projet-standalone | 00/03, 01/01 | 02 |
| 02 | signaux-base | 01/02 | 03 |
| 03 | control-flow (@if/@for/@switch) | 01/03 | 04 |
| 04 | binding-et-events | 01/04 | 05 |
| 05 | input-output-model | 01/05 | 06 |
| 06 | lifecycle-hooks | 01/06 | 07 |
| 07 | pipes-et-directives | 01/07 | 08 |
| 08 | defer-et-zoneless | 01/08 | 09 |
| 09 | signaux-avances (linkedSignal, effect, patterns) | 02/01, 02/03 | 10 |
| 10 | resource-api | 02/02 | 11 |
| 11 | services-et-injectable | 03/01 | 12 |
| 12 | providers-et-scopes | 03/02 | 13 |
| 13 | injection-tokens | 03/03 | 14 |
| 14 | routing (routes, params, data) | 04/01, 04/02 | 15 |
| 15 | guards-et-lazy-loading | 04/03, 04/04 | 16 |
| 16 | rxjs-observables-et-operators | 05/01, 05/02 | 17 |
| 17 | rxjs-patterns-et-interop-signals | 05/03, 05/04, 05/05 | 18 |
| 18 | http-crud-interceptors-cache | 06/01, 06/02, 06/03 | 19 |
| 19 | formulaires-reactifs-et-signal-forms | 07/02, 07/03 | 20 |
| 20 | formulaires-patterns | 07/01, 07/04 | 21 |
| 21 | angular-material-et-cdk | 08/01, 08/02, 08/03 | 22 |
| 22 | accessibilite ⚠️RGAA-flag | 09-accessibilite/01 | 23 |
| 23 | tests-composants-http-di | 09-tests/02, 09-tests/03 | 24 |
| 24 | state-management (services + ngrx signal store) | 10/01, 10/02, 10/03 | 25 |
| 25 | auth-jwt-guards ⚠️sécu-flag | 11/02 | 26 |
| 26 | recettes-esn-et-pieges (projet final) | 12/01, 12/02, 00-pieges-frequents | (fin) |

27 modules (00-26) + 27 labs. Modules 22 & 25 → ajouter au FLAGS REVIEW LUNDI (RGAA / sécu) après ship.
