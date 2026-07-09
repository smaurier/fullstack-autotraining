# Refonte 23-droit-numerique — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `23-droit-numerique/modules/NN-slug.md` + `23-droit-numerique/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`.
> Source legacy = `23-droit-numerique/modules/0N-*.md` (6 modules 01-06, format libre, SANS frontmatter, 0 lab).
> **Cours INCOMPLET à COMPLÉTER** : étoffé 6 → 9 modules + 9 labs. **DERNIER cours du rollout.**
> **Droit du numérique POUR DÉVELOPPEURS. ⚠️⚠️ COURS ENTIÈREMENT SENSIBLE (légal/RGPD/droit).**

## Contrat agent (invariants gate)

1. **⚠️⚠️ SENSIBLE — TOUS les modules** : le contenu donne des **PRINCIPES et réflexes développeur**, PAS du conseil juridique. Chaque module DOIT : (a) un disclaimer clair « ceci n'est pas un conseil juridique, consulter un juriste/DPO/avocat » ; (b) renvoyer les décisions juridiques à un expert ; (c) `<!-- FLAG-REVIEW: droit/légal — valider par Sylvain + juriste avant diffusion publique -->` EN TÊTE (après le frontmatter) du module ET du lab.
2. **NE JAMAIS présenter un article de loi, un seuil, un délai, un montant d'amende comme une vérité figée et actionnable.** Donner l'ordre de grandeur + le PRINCIPE, et renvoyer à la **source officielle**. Le droit évolue.
3. **Vérif via WebFetch sources OFFICIELLES** (Context7 mort) : **cnil.fr** (RGPD, cookies, DPIA, droits), **service-public.fr** / **entreprendre.service-public.gouv.fr** (mentions légales, obligations), **legifrance.gouv.fr** (textes), **eur-lex.europa.eu** / **digital-strategy.ec.europa.eu** (RGPD, DSA, AI Act), **numerique.gouv.fr / accessibilite** (RGAA), **choosealicense.com / opensource.org** (licences). Si incertain → `<!-- FLAG-DOC -->`, jamais inventer un article/seuil.
4. **Frontmatter** clés exemplar : `titre, cours: 23-droit-numerique, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE items notions[] avec `@`, `[`, `(`, `:`**. `libs: []` (cours non-technique).
5. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
6. **Lab = README-only** : exercice = **analyse/checklist de conformité, rédaction d'un document (registre, déclaration, mention), décision argumentée** — PAS de code (cours juridique). Grille + **coach** + **variante J+30**. ZÉRO harnais. Le lab porte aussi le disclaimer + FLAG-REVIEW.
7. **Fil-rouge TribuZen** : app familiale = données personnelles d'adultes **ET de mineurs**, photos, géolocalisation, partage → enjeux de conformité forts. Angle « ce que le dev doit faire / ne pas faire seul ».
8. `{{ }}` en prose → échapper (inline → `<code v-pre>`). **Config VitePress SANS override delimiters** (à créer : package.json + config + gitignore comme le cours 22).

## Colonne vertébrale (9 modules — construit à partir de 6 legacy)

| NN | Module (slug) | Source | next |
|----|--------|--------|------|
| 00 | introduction-au-droit-du-numerique (pourquoi le dev est concerné, panorama RGPD/DSA/AI Act/RGAA, rôle dev vs juriste, disclaimer) | NOUVEAU | 01 |
| 01 | rgpd-reflexes-developpeur (6 bases légales, données perso vs sensibles Art. 9, minimisation, privacy by design) | legacy 01 | 02 |
| 02 | consentement-cookies-et-traceurs (consentement RGPD, cookies/traceurs, recommandations CNIL, bandeau, preuve) | NOUVEAU | 03 |
| 03 | droits-des-personnes (accès/rectification/effacement/portabilité/opposition, délais, implémenter côté dev) | NOUVEAU (+extrait legacy 01) | 04 |
| 04 | dpia-analyse-impact (DPIA : quand obligatoire, données de mineurs, méthode, outil PIA CNIL) | legacy 02 | 05 |
| 05 | dpa-et-sous-traitants (DPA/contrat de sous-traitance, sous-traitants, transferts hors UE/SCC) | legacy 04 | 06 |
| 06 | cgu-mentions-et-obligations-plateforme (CGU/CGV/mentions légales, DSA obligations plateforme, protection des mineurs) | legacy 03 | 07 |
| 07 | propriete-intellectuelle-et-licences (licences OSS MIT/GPL/AGPL, code généré par IA, IP d'équipe/salarié) | legacy 05 | 08 |
| 08 | accessibilite-legale-et-conformite (RGAA/loi 2005, déclaration d'accessibilité, + synthèse conformité TribuZen = capstone) | legacy 06 | (fin) |

9 modules (00-08) + 9 labs. Dernier module (08) `next` = sentinel `fin-parcours-23-droit-numerique`.
**TOUS les modules → FLAG-REVIEW** (cours entièrement sensible). Setup VitePress à créer (package.json/config sans override/gitignore). Purge orphelins legacy après write.
