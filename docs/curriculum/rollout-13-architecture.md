# Refonte 13-architecture — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `13-architecture/modules/NN-slug.md` + `13-architecture/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `13-architecture/cours/NN-*/*.md` (97 fichiers, 14 domaines) → CONSOLIDÉS en 24 modules.
> **Cours de RAISONNEMENT архitectural** (conceptuel). Défère le deep aux cours dédiés (ne PAS dupliquer).

## Contrat agent (invariants gate)

1. **Conceptuel** : peu d'API à vérifier. Si un outil/lib concret est cité et douteux → WebFetch la doc officielle (Context7 MORT). Sinon pas de fetch. `<!-- FLAG-DOC -->` si échec, jamais deviner.
2. **Frontmatter** clés exemplar : `titre, cours: 13-architecture, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE tout item notions[] avec `@`, `[`, `(`, `:`**.
3. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
4. **Ordre novice→expert** strict. **Défère explicitement** le deep aux cours dédiés (renvoi, pas de duplication) : distribués→cours 17, sécu→14, observabilité→16, CI/CD→15, BDD/SQL→10, backend/NestJS→09, HTTP/cache/perf→11, tests→06, front→02/03/04, design system→21.
5. **Lab = README-only** : exercice de conception/décision (dessiner un diagramme, choisir un pattern, écrire un ADR, refactorer un design) — évalué par grille + **coach** + **variante J+30**. ZÉRO harnais simulé.
6. **Fil-rouge TribuZen** : ancrer chaque module dans une décision d'archi réelle de TribuZen.
7. `{{ }}` en prose → échapper. Pas de code framework lourd dans le corps (c'est de l'archi, pas de l'impl).

## Colonne vertébrale (24 modules — consolidation de cours/)

| NN | Module | Source cours/ | next |
|----|--------|---------------|------|
| 00 | quest-ce-que-architecture-et-posture | 00/01, 00/07, 00/08 | 01 |
| 01 | principes-solid | 00/02 | 02 |
| 02 | design-patterns-essentiels | 00/03 | 03 |
| 03 | clean-code-code-smells-refactoring | 00/04, 00/05 | 04 |
| 04 | dependency-injection-ioc | 00/06 | 05 |
| 05 | architecture-en-couches | 01/01 | 06 |
| 06 | architecture-hexagonale | 01/02 | 07 |
| 07 | clean-architecture | 01/03 | 08 |
| 08 | monolithe-modulaire-vs-microservices | 01/04, 01/05, 01/06, 01/07 | 09 |
| 09 | ddd-strategique | 02/01, 02/02 | 10 |
| 10 | ddd-tactique | 02/03, 02/04, 02/05 | 11 |
| 11 | api-design-et-backend-patterns (défère NestJS→09) | 03/01, 03/02, 03/05, 03/06 | 12 |
| 12 | jobs-concurrence-async | 03/03, 03/04, 03/07, 03/08 | 13 |
| 13 | architecture-donnees (défère SQL→cours 10) | 04/01, 04/02, 04/04, 04/05, 04/06 | 14 |
| 14 | architecture-frontend (défère→02/03/04/21) | 05/01, 05/02, 05/03, 05/04, 05/06 | 15 |
| 15 | frontend-avance-micro-offline | 05/07, 05/09, 05/10 | 16 |
| 16 | communication-et-integration | 06/01, 06/02, 06/03, 06/04 | 17 |
| 17 | event-driven-et-messaging | 06/05, 06/06 | 18 |
| 18 | patterns-distribues-cqrs-es-saga (défère→cours 17) | 07/02, 07/03, 07/04 | 19 |
| 19 | resilience-consistency-migration | 07/01, 07/05, 07/06, 07/07 | 20 |
| 20 | securite-architecturale (défère→cours 14) | 08/01, 08/02, 08/06 | 21 |
| 21 | performance-scalabilite (défère→cours 11/16) | 09/01, 09/03, 09/04, 09/05 | 22 |
| 22 | observabilite-et-testing-archi (défère→16/06) | 10/01, 10/02, 10/03, 11/01, 11/03 | 23 |
| 23 | decisions-culture-et-capstone | 12/01, 12/02, 12/03, 12/06, 12/07, 13/06, 00-pieges | (fin) |

24 modules (00-23) + 24 labs. Dernier module `next` = sentinel `fin-parcours-13-architecture`.
Sujets sensibles (20-sécu) → factuel via WebFetch OWASP si claims précis ; flaguer si besoin.
Domaines source non repris explicitement (mobile, mlops, blockchain, iot, crdt, finops/wardley, conway) = mentionnés en survol dans 23-culture ou 08 selon pertinence, pas de module dédié (hors périmètre parcours fullstack web).
