# Refonte 15-cicd-devops — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `15-cicd-devops/modules/NN-slug.md` + `15-cicd-devops/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `15-cicd-devops/modules/NN-*.md` (format `# Module` → AU TEMPLATE).
> **Cours API-lourd (GitHub Actions, Docker, IaC).**

## Contrat agent (invariants gate)

1. **Vérif API/config via WebFetch** (Context7 MORT). Docs officielles :
   - GitHub Actions (workflow syntax, contexts, secrets, OIDC, matrix, reusable/composite) → docs.github.com/actions
   - Docker (Dockerfile, multi-stage, buildx, layer cache, compose) → docs.docker.com
   - Registries (GHCR, Docker Hub) → docs.github.com/packages + docs.docker.com
   - IaC (Terraform, Pulumi) → developer.hashicorp.com/terraform + pulumi.com/docs
   - Déploiement (blue-green, canary, rolling) → conceptuel + web.dev/cloud docs
   Si URL inconnue → `WebSearch` puis `WebFetch`. Si échec/incertain → `<!-- FLAG-DOC: ... -->`, jamais deviner (syntaxe workflow, noms de champs, versions d'actions).
2. **⚠️ `${{ }}` GitHub Actions** : TOUJOURS dans des blocs de code fencés (jamais en prose) — le gate neutralise les délimiteurs mais la prose casserait le SSR.
3. **⚠️ Secrets** : aucun vrai secret ; exemples = `${{ secrets.NOM }}` ou placeholders `<...>` (push protection GitHub bloque sk_live/AKIA/private keys).
4. **Frontmatter** clés exemplar : `titre, cours: 15-cicd-devops, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE items notions[] avec `@`, `[`, `(`, `:`**.
5. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
6. **Ordre novice→expert**. Défère : sécurité applicative deep→cours 14, AWS/cloud→cours 12, tests deep→cours 06, observabilité deep→cours 16.
7. **Lab = README-only** : exercice concret (écrire un workflow, un Dockerfile, une config déploiement) + grille + **coach** + **variante J+30**. ZÉRO harnais simulé (test-utils.ts legacy supprimé).
8. **Fil-rouge TribuZen** : pipeline CI/CD de TribuZen (build/test/deploy).

## Colonne vertébrale (12 modules 00-11)

| NN | Module | next |
|----|--------|------|
| 00 | introduction-cicd (CI vs CD vs déploiement continu, boucle de feedback, pourquoi automatiser) | 01 |
| 01 | github-actions-fondamentaux (workflow, jobs, steps, events/triggers, runners, actions) | 02 |
| 02 | github-actions-avance (matrix, cache, artefacts, reusable/composite workflows, contexts, concurrency) | 03 |
| 03 | testing-dans-ci (lancer les tests en CI, coverage gate, parallélisation, flaky tests — défère tests deep→06) | 04 |
| 04 | conteneurisation-ci (Docker en CI, multi-stage, buildx, layer cache, build & push image) | 05 |
| 05 | artefacts-registries (artefacts de build, GHCR/Docker Hub, versioning/tags, signature/provenance) | 06 |
| 06 | strategies-deploiement (rolling, blue-green, canary, feature flags, rollback) | 07 |
| 07 | preview-environments (environnements éphémères par PR, seed data, teardown) | 08 |
| 08 | securite-pipelines (OIDC vers cloud sans secrets long terme, secrets management, SAST/dependency scan en CI, least privilege — défère sécu deep→14) | 09 |
| 09 | iac-introduction (IaC : Terraform/Pulumi/CloudFormation, state, plan/apply, drift, modules — au niveau CI/CD) | 10 |
| 10 | monitoring-pipelines (métriques DORA, observabilité du pipeline, alerting sur échec, défère observ app→16) | 11 |
| 11 | projet-final (capstone : pipeline CI/CD complet de TribuZen — build, test, image, deploy, preview, OIDC) | (fin) |

12 modules + 12 labs (labs legacy lab-01..lab-10 à réécrire/aligner ; créer lab-00, lab-11 + aligner noms sur modules).
Dernier module (11) `next` = sentinel `fin-parcours-15-cicd-devops`.
Module 08 (sécu pipelines) sensible léger → factuel OIDC via WebFetch.
