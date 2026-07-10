# QA — 09-nestjs (vérification a posteriori)

> Cours #1 ROI (NestJS + BDD adjacents). 27 modules (00-26) + 26 labs. Déjà en format v1 (pré-loop),
> mais **jamais vérifié par un reviewer** jusqu'ici. QA 2 blocs read-only + fix P0/P1 (2026-07-10).
> **Context7 mort → WebFetch** docs.nestjs.com, nodejs.org, expressjs.com, typeorm.io, prisma.io + `npm view`.

## Verdict : SHIP après fix (contenu jugé « excellent et à jour »)

Le **contenu des modules est solide et courant** — vérifié correct : Node 22 (event loop/streams),
Express 5 (propagation async, error middleware), NestJS 11 (DI, pipes/guards/interceptors, cycle de requête),
TypeORM 0.3 (`DataSource`), Prisma (`$queryRaw`/`$extends`/`$transaction`), NestJS testing (Test.createTestingModule
+ supertest), Passport/JWT, Terminus 11, cache-manager 3 (TTL ms), BullMQ (WorkerHost), Mongoose 8, GraphQL v13
code-first. **Zéro API inventée.** Les défauts étaient dans le **tooling des labs** (car cours pré-loop).

## Corrections appliquées
| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P0 | labs 05-08 package.json | `express ^4` alors que les modules enseignent **Express 5** (corrigés cassaient en v4) | `express ^5.1.0` (+ `@types/express ^5`) |
| P0 | labs 09-13 package.json | `@nestjs/* ^10` alors que le cours enseigne **NestJS 11** | `@nestjs/* ^11` |
| P1 | lab-08 | `bcryptjs` vs `bcrypt` enseigné | `bcrypt ^5.1.1` |
| P1 | labs 09/10/11/13 | harnais **jest e2e auto-correcteur** ≠ README (« coach valide, pas d'auto-correcteur ») + anti-simulé | `test/` + `jest-e2e.config.ts` + scripts test retirés (src/ + solution/ conservés) |
| P1 | modules 20, 24 (frontmatter) | `@nestjs/config ^11` (→ **^4**), `@nestjs/swagger ^8` (→ **^11**) | versions npm réelles |
| P2 | module 17 | « `$use` déprécié en v7 » | « déprécié depuis Prisma 4.16, encore fonctionnel en v6 » |
| P2 | labs 05/07 | scripts `tsx exercise/solution` fantômes (fichiers absents) | retirés |

## Non corrigé (P2 assumés)
- prisma `^6` alors que v7 existe (v6 valide, contenu compatible) — bump optionnel.
- module 18 : test e2e attend 422 « famille pleine » mais le service montré ne lève que 400/404 — dépend du starter `src/` ; à vérifier si le lab tourne.
- capstone (24) suivi de 25-Mongo/26-GraphQL (extensions post-capstone) — choix curriculaire.

## Gate — PASS
27 modules valident, 7 sections, seeds ≥5, chaîne prereq/next intacte, `{{ }}` en prose : RAS. Re-gaté **GATE PASS** (build OK).
