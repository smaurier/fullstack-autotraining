# Refonte 22-stripe-billing — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `22-stripe-billing/modules/NN-slug.md` + `22-stripe-billing/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `22-stripe-billing/modules/0N-*.md` (6 modules 01-06, format libre, SANS frontmatter, 0 lab).
> **Cours INCOMPLET à COMPLÉTER** (pas juste reformater) : étoffé 6 → 10 modules + 10 labs.
> **Billing SaaS avec Stripe + NestJS.** Prérequis parcours : cours 09-nestjs, 10-postgresql.

## Contrat agent (invariants gate)

1. **⚠️⚠️ SÉCU CLÉS STRIPE** : JAMAIS de vraie clé ni de faux réaliste. GitHub push protection BLOQUE `sk_live_...`, `sk_test_...`, `pk_live_...`, `rk_...`, `whsec_...`. Utiliser **placeholder cassé** : `sk_test_<CLE-EXEMPLE-NE-JAMAIS-COMMITTER>` (le `<` casse le pattern de détection). Idem `whsec_<SECRET-WEBHOOK-EXEMPLE>`. Les clés vont dans `.env` (jamais commité) ; le contenu ne montre que des placeholders.
2. **Vérif API via WebFetch** (Context7 MORT) : **docs.stripe.com** (Products/Prices, Checkout, Billing/Subscriptions, webhooks, Customer Portal, invoices, test clocks, SCA/3DS). Vérifier la **version d'API Stripe courante** + noms d'events. Si incertain → `<!-- FLAG-DOC -->`, jamais deviner (noms d'events webhook, paramètres API, sémantique subscription).
3. **Frontmatter** clés exemplar : `titre, cours: 22-stripe-billing, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE items notions[] avec `@`, `[`, `(`, `:`**.
4. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
5. **⚠️ Module 08-facturation-taxes-et-legalite = SENSIBLE (légal/fiscal/RGPD)** → « principes, PAS conseil juridique/fiscal », renvoi à un expert-comptable/juriste/DPO. `<!-- FLAG-REVIEW: légal/fiscal/RGPD facturation — valider par Sylvain + expert avant diffusion -->` sur module ET lab.
6. **Lab = README-only** : exercice concret (créer un Product+Price, une Checkout Session, un handler webhook signé, un portal, un gate) avec le vrai SDK Stripe en **mode test** + Stripe CLI (`stripe listen`, cartes de test `4242...`, `4000 0025 0000 3155` pour 3DS) + grille + **coach** + **variante J+30**. ZÉRO harnais simulé. Clés = placeholders.
7. **Fil-rouge TribuZen** : **TribuZen Premium** — abonnement famille (freemium → premium), gérer produits/checkout/abonnement/portail/gates/facturation.
8. `{{ }}` en prose/inline → échapper (inline → `<code v-pre>`). Code/JSON → blocs. **Config VitePress SANS override delimiters.**

## Colonne vertébrale (10 modules — construit à partir de 6 legacy)

| NN | Module (slug) | Source | next |
|----|--------|--------|------|
| 00 | introduction-au-billing-saas (pourquoi le billing, modèles éco SaaS, panorama Stripe, test vs live mode, setup compte/SDK NestJS) | NOUVEAU | 01 |
| 01 | stripe-products-et-prices (Products/Prices, 3 modèles de facturation, entités Customer/Subscription/Invoice) | legacy 01 | 02 |
| 02 | stripe-checkout-et-payment-links (Checkout Session, page hébergée, Payment Links, success/cancel, mode subscription vs payment) | legacy 02 | 03 |
| 03 | webhooks-et-idempotence ⚠️sécu (vérif signature, events clés, idempotence, ne jamais se fier au success_url) | legacy 03 | 04 |
| 04 | subscriptions-et-cycle-de-vie (états d'abonnement, trials, proration, upgrade/downgrade, annulation) | NOUVEAU (+extrait legacy) | 05 |
| 05 | customer-portal-et-self-service (Billing Portal, configuration, self-service client) | legacy 04 | 06 |
| 06 | freemium-et-feature-gating (gates, entitlements, limites de plan, mapping plan→features) | legacy 05 | 07 |
| 07 | paiements-echoues-et-dunning (échecs de paiement, retries/dunning, past_due, SCA/3DS, relances) | NOUVEAU | 08 |
| 08 | facturation-taxes-et-legalite ⚠️SENSIBLE (invoices, TVA, Stripe Tax survol, DPA RGPD, légal FR) | legacy 06 | 09 |
| 09 | testing-et-mise-en-production (test clocks, cartes de test, Stripe CLI, checklist go-live, capstone TribuZen Premium) | NOUVEAU capstone | (fin) |

10 modules (00-09) + 10 labs. Dernier module (09) `next` = sentinel `fin-parcours-22-stripe-billing`.
Module 03 (sécu webhook) + 08 (légal) → vigilance ; 08 → FLAG-REVIEW. Créer `.gitignore` (node_modules, .env, .vitepress/dist+cache) AVANT commit. Scan secrets STRICT avant push.
