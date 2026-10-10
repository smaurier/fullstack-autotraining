# Lab D02 — Landing page TribuZen responsive, sans aucune duplication

> **Module associé :** [`modules/d02-canvas-breakpoints-stacks.md`](../../modules/d02-canvas-breakpoints-stacks.md)
> **Forme :** Zéro — construire de zéro la structure responsive de la page.
> **Outil :** Framer.

## Lire avant

Relire précisément :
- §2.2 et §2.3 — Stacks comme équivalent auto-layout, et la règle des overrides sur
  les mêmes éléments plutôt que des copies par breakpoint.
- L'Exemple A (section fonctionnalités responsive) — c'est la méthode attendue, pas le
  contenu exact à reproduire.
- Le piège "duplication manuelle" en §2.4 et §4 — le critère de réussite du lab porte
  précisément là-dessus.

## Brief

Construire la **structure** (contenu provisoire acceptable, pas besoin du texte
final) d'une landing page vitrine de TribuZen décidée au module D01 : au minimum un
en-tête, une section "fonctionnalités" (au moins 3 cartes), un pied de page.

Tout construire en **Stacks**, et régler au moins **3 breakpoints** (desktop, tablet,
mobile) avec des overrides sur ces mêmes Stacks — aucune section ne doit exister en
double pour gérer un breakpoint différent.

## Livrable attendu

- Une page Framer avec au moins 3 breakpoints configurés et visuellement corrects.
- Chaque section construite en un seul jeu d'éléments, avec des overrides par
  breakpoint (direction de Stack, tailles, visibilité) — zéro élément dupliqué.
- Une preuve de synchronisation : modifier un texte sur le breakpoint desktop et
  vérifier (capture ou description) qu'il apparaît modifié sur les autres breakpoints.

## Rubrique de vérification

**Rubrique objective :**
- 3 breakpoints réglés et visuellement cohérents (pas de contenu cassé/superposé sur
  un breakpoint).
- Vérification explicite de l'absence de duplication : pour chaque section, un seul
  jeu de calques existe dans le panneau de calques, pas une copie par breakpoint.
- La preuve de synchronisation (texte modifié qui se répercute) est documentée.

**Revue qualitative :** la structure mobile reste-t-elle réellement lisible et
utilisable (pas seulement "ça ne déborde pas") — un Stack qui passe correctement de
horizontal à vertical doit rester confortable à lire, pas juste techniquement
fonctionnel.

## Variante J+30 (fading)

Reprendre la page et ajouter un breakpoint intermédiaire (ex. petit desktop/grand
tablet) entre deux breakpoints existants, avec un override propre qui n'entre pas en
conflit avec les deux breakpoints voisins — documenter quelle propriété exacte
nécessite un réglage à ce breakpoint intermédiaire et pourquoi les réglages des
breakpoints voisins ne suffisaient pas.
