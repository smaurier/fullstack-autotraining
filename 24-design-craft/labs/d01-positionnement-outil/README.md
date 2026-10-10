# Lab D01 — Positionner 3 projets sur l'axe Framer vs Figma+dev

> **Module associé :** [`modules/d01-positionnement-outil.md`](../../modules/d01-positionnement-outil.md)
> **Forme :** Zéro — document d'analyse écrit, aucun fichier Framer ou Figma requis.
> **Outil :** aucun outil de design, un simple document texte.

## Lire avant

Relire précisément :
- §2.2 et §2.3 du module — les trois critères Framer (complexité métier, rapidité,
  intégration backend) et la liste des signaux qui pointent vers Figma+dev.
- L'Exemple A (TribuZen l'app) et l'Exemple B (landing page TribuZen) — ce sont deux
  analyses du même produit avec des conclusions opposées, c'est le raisonnement
  attendu, pas le corrigé littéral à recopier.

## Brief

Analyser 3 cas, un par un, sans se précipiter sur une conclusion déjà connue :

1. **TribuZen, l'application elle-même.**
2. **Une landing page vitrine de présentation de TribuZen** (teaser du projet, captures,
   lien vers le dépôt/portfolio).
3. **Le futur site de la marque Nuada** (audits RGAA, nuada-audit.netlify.app).

Pour chacun, écrire une courte analyse (quelques lignes suffisent par cas) qui répond
explicitement aux 3 critères du module §2.2, puis conclut par un choix net : **Framer**
ou **Figma + développement réel**.

## Livrable attendu

Un document texte avec, pour chacun des 3 cas :
- Le choix tranché (Framer ou Figma+dev).
- Au moins 2 critères du module cités explicitement et appliqués au cas (pas une
  intuition non justifiée).

## Rubrique de vérification

**Rubrique objective :**
- Les 3 cas ont chacun un choix explicite et net (pas de "ça dépend" sans suite).
- Chaque choix cite au moins 2 des 3 critères du module (complexité métier, rapidité,
  intégration backend), appliqués concrètement au cas, pas recopiés tels quels.
- Le cas TribuZen (app) conclut à Figma+dev et le justifie par la logique métier réelle
  du produit (état partagé, profils) — pas par habitude.

**Revue qualitative :** la question n'est jamais "l'outil choisi est-il à la mode" mais
"le choix tient-il si quelqu'un d'autre challengeait chaque critère" — en particulier,
l'analyse du cas 2 (landing page) doit anticiper correctement ce qui sera réellement
construit dans les labs D02 à D07 (Stacks, breakpoints, interactions, composant,
CMS, publication) : si l'analyse du cas 2 omet un besoin qui apparaît plus tard dans le
bloc, c'est un signe que l'évaluation initiale était incomplète.

## Variante J+30 (fading)

Reprendre le cas 3 (Nuada) et pousser l'analyse un cran plus loin : si Nuada devait un
jour proposer un espace client avec authentification réelle (consultation de rapports
d'audit personnalisés), à partir de quel moment précis la conclusion "Framer" bascule-
rait-elle vers "Figma+dev" ? Écrire le signal exact qui déclencherait ce changement de
décision, pas une réponse vague du type "quand ça devient trop complexe".
