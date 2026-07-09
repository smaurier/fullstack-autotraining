# QA — 22-stripe-billing (refonte v1)

> Cours COMPLÉTÉ en autonomie (rollout) : 6 modules legacy incomplets → 10 modules (00-09) + 10 labs.
> Setup VitePress créé from scratch (package.json/config/gitignore). Orphelins legacy purgés.
> **Billing SaaS avec Stripe + NestJS.** ⚠️ SENSIBLE : clés Stripe + module 08 légal/fiscal.
> **Context7 mort → vérif par WebFetch docs.stripe.com.** GATE PASS (build OK). QA consolidée + scan secrets.
> **Cours refait SANS override delimiters** → thème propre (0 fuite `{{ title }}`).

## Verdict : SHIP (après correction 2 P0)

Corrections appliquées :
| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P0 | M04 + lab-04 | `current_period_start/end` lus en top-level Subscription — **retirés depuis API Basil** → `undefined` → Invalid Date | `subscription.items.data[0].current_period_end` partout + encart d'explication |
| P0 | M07 + lab-08 | `invoice.subscription` (déplacé) + `invoice.tax` (supprimé) sous API courante | `invoice.parent.subscription_details.subscription` ; `invoice.total_taxes` |
| P1 | M00 + M09 + lab-00 | `apiVersion: '2026-06-24'` (date seule) + règle affirmée « sans nom de release » = FAUX (le SDK typé exige le codename) ; cours contradictoire | `'2026-06-24.dahlia'` partout + règle prose/seed/grille corrigées |

## Sécurité — VÉRIFIÉE
- **Scan clés : 0 vraie clé, 0 faux réaliste.** Uniquement placeholders cassés `sk_test_<CLE-EXEMPLE-...>`, `whsec_<SECRET-...>`. Cartes de test publiques Stripe (`4242...`, `4000...`, `pm_card_visa`, `pm_card_chargeCustomerFail`) = OK. `.env` git-ignoré.
- **M03 webhooks (sécu)** : jugé **excellent** — signature obligatoire avant toute lecture, `constructEvent` + raw body, header manquant → 400, idempotence via `event.id`, success_url jamais source de vérité, pas de JWT (signature = auth). Défensif et répété.

## Module 08 (SENSIBLE légal/fiscal) — conforme + FLAG-REVIEW
- `<!-- FLAG-REVIEW -->` présent module ET lab. Disclaimer « principes, PAS conseil juridique/fiscal » répété (en-tête, §2.2/2.5/2.6/§5, pièges). Renvois systématiques expert-comptable/juriste/DPO.
- **Aucun taux TVA / seuil / délai présenté comme vérité figée** (le « 48h » DPA est daté/à-revérifier ; `* 0.20` n'apparaît qu'en anti-pattern). **→ FLAG-REVIEW HUMAIN : Sylvain + expert avant diffusion publique.**

## Points vérifiés conformes (WebFetch docs.stripe.com)
Events (`checkout.session.completed`, `customer.subscription.*`, `invoice.paid` [+ alias `payment_succeeded`],
`invoice.payment_failed`, `invoice.payment_action_required`, `entitlements.active_entitlement_summary.updated`),
statuts subscription, `products/prices/checkout.sessions/billingPortal.sessions/subscriptions.update+cancel`,
Entitlements, smart retries (défaut 8 tentatives), SCA/3DS, test clocks (≤2 périodes/advance), Stripe CLI,
cartes de test. **Zéro event/API inventé.**

## P2 non bloquants (laissés)
- M02↔M03 : userId via `client_reference_id` (M02) vs `metadata.userId` (M03 exemple) — à aligner.
- durée d'essai narrative incohérente (90j M03 vs 14j M04) — cosmétique.

## Gate résiduel — PASS
Chaîne next 00→…→09→sentinel `fin-parcours-22-stripe-billing`. 10 modules valident, 7 sections chacun.
Anti-simulé : labs README-only (Stripe mode test + CLI réels), 0 harnais. **Thème propre** (0 fuite).
Re-gaté **GATE PASS** (build OK).
