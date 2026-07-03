# QA — 03-angular (refonte v1)

> Cours réécrit en autonomie (rollout week-end 2026-07-03). 27 modules (00-26) + 27 labs.
> GATE PASS déterministe (validate ×27, anti-simulé, delimiters, J+30, intégrité prereq/next,
> cross-framework, build VitePress). QA agents read-only en 3 blocs (00-08 / 09-17 / 18-26).
> Context7 vérifié par module au write ; **quota épuisé en cours de QA** (les 2 serveurs) →
> quelques points de version reportés en `FLAG-CONTEXT7` plutôt que devinés.

## Corrections appliquées (P0/P1)

| Prio | Module(s) | Problème | Correction |
|------|-----------|----------|------------|
| P0 | M03 control-flow §2.7 | Fall-through `@case` **inventé** (Angular ne le supporte pas) | Retiré ; remplacé par normalisation `computed` amont ou `@if` avec `||` |
| P1 | M06, M04 | Signal queries (`viewChild/contentChild`) **perdues** dans la refonte + refs pendantes « module 05 » | Sous-section §2.9 signal queries ajoutée à M06 ; refs corrigées vers M06 ; notions/outcomes MAJ |
| P1 | Labs 02/03/04/06/07/08 | `ng new --standalone` (flag retiré en CLI 17+, peut hard-fail ; standalone = défaut v19) | Flag retiré |
| P1 | M10 resource-api §1/§6 | « resource() stable en Angular 22 » douteux (~v20) | Hedgé « expérimental v19, vérifie ta mineure » + FLAG-CONTEXT7 |
| P1 | M25 §2.7/§5, M26 §2.5/§6/§7 | `APP_INITIALIZER` **déprécié en v19** (confirmé Context7) | `provideAppInitializer()` |
| P2 | M23 §2.1 | « Vitest expérimental en Angular 19 » imprécis | Resserré (Karma/Jasmine défaut v19, Vitest ≈ v20) + FLAG-CONTEXT7 |
| P2 | M17 §3 | `distinctUntilChanged()` utilisé sans intro | Phrase d'intro ajoutée |

## FLAG-CONTEXT7 (à reconfirmer quand quota Context7 revient)

1. M10 resource-api §1 + §6 pt.8 — version exacte de stabilisation de `resource()`/`rxResource()`.
2. M23 tests §2.1 — version exacte d'arrivée/défaut du runner Vitest.

## FLAG-REVIEW humain (Sylvain — factuel à enjeu)

- **M22 accessibilite (RGAA)** — QA a validé « RGAA 4.1 = 13 thématiques / 106 critères » et les mappings WCAG→thématiques comme **exacts**, mais Sylvain (certif RGAA oct 2026) doit recroiser avec accessibilite.numerique.gouv.fr avant usage en audit officiel. Commentaire FLAG-REVIEW en tête de module.
- **M25 auth-jwt-guards (sécurité)** — recommandations jugées sûres par QA (front ≠ autorité serveur ; access token in-memory + refresh cookie httpOnly ; XSS localStorage documenté ; anti-boucle refresh). À valider par Sylvain. FLAG-REVIEW en tête.

## Verdict

Lot haute qualité : structure 7 sections partout, ordre novice→expert strict, portée explicite,
fil-rouge TribuZen cohérent, concret-d'abord systématique, labs README-only + vrai outil + coach
+ J+30 + zéro harnais simulé. Modules propres majoritaires ; corrections ci-dessus appliquées et
re-gatées **GATE PASS**.
