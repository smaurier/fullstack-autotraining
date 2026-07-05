# QA — 15-cicd-devops (refonte v1)

> Cours réécrit en autonomie (rollout week-end). 12 modules (00-11) + 12 labs.
> Réécriture legacy → template. **Context7 mort → vérif par WebFetch** (docs.github.com/actions,
> docs.docker.com, developer.hashicorp.com/terraform, dora.dev, github.com/.../releases).
> GATE PASS déterministe. QA agents read-only 2 blocs (00-05 / 06-11).

## Corrections appliquées

| Prio | Portée | Problème | Correction |
|------|--------|----------|------------|
| P1 | tout le cours | **Versions d'actions incohérentes** (checkout v4/v6/v7, setup-node v4/v6, upload/download v4, aws-creds v4/v6...) | Harmonisées aux **majeures courantes 2026** (vérifiées via github releases) : checkout@v7, setup-node@v6, upload-artifact@v7, download-artifact@v8, cache@v6, configure-aws-credentials@v6, build-push@v7, login@v4, metadata@v6, cosign-installer@v4 |
| P1 | M02 §2.3 | « upload/download = même duo v4 » FAUX | Majeures **découplées** (upload@v7, download@v8) ; immuabilité depuis upload@v4 (vrai, conservé) |
| P2 | M03 §2.6 | « @v4 version de référence » | v7 majeure courante |
| P2 | M08 §2.2 | `${{ }}` en prose | délimiteurs retirés (restent dans les blocs code) |
| P2 | M09 §2.5 | « use_lockfile stable depuis 1.11 » | natif S3 depuis 1.10 ; DynamoDB déprécié depuis 1.11 |
| P2 | labs 00/01/03/04 | Grille + coach manquants | Ajoutés (modèle lab-05) |

**Conflit QA résolu** : les 2 reviewers se contredisaient sur checkout (v7 existe vs inexistant). WebFetch
github.com/actions/checkout/releases → **checkout@v7 EST la majeure courante** (bloc A avait raison). Download-artifact@v8 confirmé aussi.

## FLAG-DOC (légitime, conservé)
- M10 §2.3 : seuils DORA elite/high/medium/low non figés (varient par rapport annuel State of DevOps) — pas de seuil codé en dur.

## Vérifications confirmées (WebFetch)
GitHub Actions (workflow syntax, matrix/cache/reusable/composite, services+health-check, concurrency, OIDC
`id-token: write` + sub claim, permissions least-privilege, pinning SHA, incident tj-actions mars 2025),
Docker (multi-stage, buildx, cache type=gha), GHCR/cosign keyless, Terraform (state locking `use_lockfile`,
DynamoDB déprécié, OpenTofu fork MPL/Linux Foundation, IBM→HashiCorp 2025), DORA (MTTR → failed deployment
recovery time, 5e métrique rework rate).

## Verdict
Lot solide (0 P0 après résolution du conflit de version). Chantier principal = harmonisation des versions
d'actions (mécanique, ~150 remplacements). Labs README-only, coach, J+30, zéro harnais. Re-gaté **GATE PASS**.
