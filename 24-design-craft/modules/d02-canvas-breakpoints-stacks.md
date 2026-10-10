---
titre: Canvas, breakpoints responsive natifs, Stacks
cours: 24-design-craft
bloc: D — Framer (outil)
notions: [breakpoints natifs Framer par éditeur visuel, Stacks comme équivalent auto-layout/flexbox, overrides par breakpoint sur les mêmes éléments, responsive sans media query écrite à la main]
outcomes: [configurer plusieurs breakpoints sans dupliquer d'éléments, construire une mise en page en Stacks en transférant directement les réflexes d'auto-layout déjà acquis, diagnostiquer une rupture de synchronisation entre breakpoints causée par une duplication manuelle]
prerequis: [d01-positionnement-outil]
next: d03-interactions-effects
tribuzen: structure responsive de la landing page vitrine de TribuZen (positionnée en D01), construite en Stacks avec breakpoints natifs
last-reviewed: 2026-10
---

# Canvas, breakpoints responsive natifs, Stacks

> **Outcomes — tu sauras FAIRE :** configurer plusieurs breakpoints dans Framer sans
> dupliquer un seul élément, construire une mise en page en Stacks en transférant
> directement les réflexes d'auto-layout déjà acquis en Figma, et diagnostiquer une
> rupture de synchronisation entre breakpoints causée par une duplication manuelle
> plutôt que par un override bien réglé.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le module D01 a tranché : la landing page vitrine de TribuZen est un vrai candidat
Framer. Premier réflexe naturel pour quelqu'un qui vient du développement web : ouvrir
l'inspecteur, écrire des media queries CSS pour gérer le responsive, comme en code.
Ce réflexe ne marche PAS dans Framer — il n'y a pas de fichier CSS à écrire, le
responsive se règle entièrement dans l'éditeur visuel, par breakpoint.

Le risque concret si on ignore ça : dupliquer la page entière "une version desktop,
une version mobile" comme deux fichiers séparés. Ça fonctionne au premier coup d'œil,
puis s'effondre à la première modification de contenu (un texte changé sur une
version, oublié sur l'autre) — exactement le problème qu'un auto-layout Figma bien
construit (module C01) évite déjà côté maquette. Ce module transpose cette même
discipline à Framer.

## 2. Théorie complète, concise

### 2.1 Breakpoints natifs : une fonctionnalité de l'éditeur, pas du code

Framer propose des breakpoints prédéfinis (desktop, tablet, mobile a minima,
personnalisables). Chaque breakpoint se règle visuellement dans le canvas : on bascule
sur le breakpoint "tablet", on ajuste ce qui doit changer (taille, visibilité,
disposition), et Framer applique automatiquement ces réglages à la bonne largeur
d'écran. Il n'y a aucune règle `@media` à écrire — le concept est le même qu'en CSS
(un point de rupture de largeur déclenche un changement de mise en page), mais
l'exécution est entièrement visuelle.

### 2.2 Stacks : l'auto-layout Figma, sans réapprentissage

Un **Stack** Framer est l'équivalent direct de l'auto-layout Figma (module C01) et du
flexbox CSS : direction (horizontale/verticale), espacement (gap), distribution,
alignement. Quelqu'un qui a déjà pris les réflexes C01 transfère cette compétence
immédiatement — ce n'est pas un concept à réapprendre, c'est le même concept dans un
deuxième outil. La vraie nouveauté de ce module n'est donc pas le Stack lui-même,
c'est la combinaison Stack + breakpoint (2.3).

### 2.3 Overrides par breakpoint : LA règle à ne jamais transgresser

Chaque breakpoint applique des **overrides** (changements) aux MÊMES éléments, pas à
des copies. Un Stack configuré en ligne horizontale sur desktop peut, sur le
breakpoint mobile, passer en colonne verticale — c'est un override de la propriété
"direction" du MÊME Stack, pas un second Stack dupliqué pour mobile. Tant qu'on
raisonne "même élément, propriété différente par breakpoint", le contenu reste
synchronisé partout : modifier un texte une fois le modifie sur tous les breakpoints
automatiquement.

### 2.4 Pourquoi la duplication manuelle est le piège structurant du module

Dupliquer une section entière "version desktop" + "version mobile" SEMBLE fonctionner
au premier essai — visuellement, les deux versions sont correctes. Le problème
apparaît au premier changement de contenu ultérieur : il faut penser à modifier les
deux copies, et le jour où on oublie l'une des deux, les deux versions divergent sans
qu'aucune erreur ne soit signalée — le bug est silencieux, pas un crash. C'est le même
risque qu'un design system dupliqué en code sans source unique de vérité.

## 3. Worked examples

### Exemple A — une section "fonctionnalités" en Stack, responsive sans duplication

1. Construire la section en Stack horizontal sur le breakpoint desktop : 3 cartes de
   fonctionnalité côte à côte, gap régulier.
2. Basculer sur le breakpoint mobile dans l'éditeur (pas un nouveau fichier, le MÊME
   Stack).
3. Override : changer la direction du Stack en vertical pour ce breakpoint seulement
   — les 3 mêmes cartes s'empilent, aucune carte n'a été recréée.
4. Modifier le texte d'une carte sur le breakpoint desktop : vérifier que le
   changement apparaît automatiquement sur le breakpoint mobile — preuve que c'est
   bien le même élément, pas une copie.

### Exemple B — diagnostiquer une duplication accidentelle

Symptôme : un texte modifié sur desktop n'apparaît pas modifié sur mobile.
Diagnostic : il existe très probablement DEUX éléments distincts (un par breakpoint)
au lieu d'un seul élément avec des overrides — vérifier dans le panneau de calques si
l'élément mobile a un nom différent ou une position de calque séparée de l'élément
desktop. Correction : fusionner en un seul élément, reconstruire les différences
visuelles comme des overrides de CE même élément.

## 4. Pièges & misconceptions

- **Dupliquer une page/section entière par breakpoint "pour aller plus vite".** Voir
  2.4 — le coût apparent économisé se paie à la première modification de contenu
  oubliée sur l'une des copies.

- **Penser qu'un Stack est un concept Framer à apprendre de zéro.** C'est l'auto-layout
  Figma (C01) sous un autre nom — le transfert de compétence doit être immédiat, pas
  un nouvel apprentissage.

- **Écrire des media queries mentalement comme en CSS classique.** Le concept de point
  de rupture est identique, mais l'exécution est 100% visuelle dans l'éditeur — chercher
  "où écrire le CSS" dans Framer est une impasse.

## 5. Ancrage TribuZen

- La structure de la landing page vitrine de TribuZen (posée en D01) se construit ici
  en Stacks avec au moins 3 breakpoints réglés par overrides sur les mêmes éléments.
- Cette structure responsive sert de base à tous les modules suivants du Bloc D
  (interactions D03, composants D04, CMS D05) — toute duplication introduite ici se
  propagerait comme dette à chaque module suivant.

## 6. Points clés

1. Les breakpoints Framer se règlent visuellement dans l'éditeur, sans écrire de
   media query — même concept que le CSS, exécution entièrement différente.
2. Un Stack Framer est l'équivalent direct de l'auto-layout Figma déjà maîtrisé —
   transfert de compétence immédiat, pas un nouvel apprentissage.
3. Chaque breakpoint applique des overrides aux MÊMES éléments, jamais à des copies —
   c'est la règle qui garde le contenu synchronisé sur tous les breakpoints.
4. Dupliquer une section par breakpoint fonctionne au premier essai et échoue
   silencieusement au premier changement de contenu oublié sur une copie.
5. Un texte modifié sur un breakpoint qui n'apparaît pas modifié ailleurs est le signal
   diagnostique d'une duplication accidentelle, pas d'un bug de l'outil.

## 7. Seeds Anki

```
Comment Framer gère-t-il le responsive, par rapport au CSS classique ?|Visuellement, par breakpoints réglés dans l'éditeur — aucune media query à écrire, mais le même concept de point de rupture
Qu'est-ce qu'un Stack Framer, en une phrase ?|L'équivalent direct de l'auto-layout Figma / flexbox CSS : direction, gap, distribution, alignement
Quelle est la règle à ne jamais transgresser entre plusieurs breakpoints ?|Chaque breakpoint applique des overrides aux MÊMES éléments, jamais à des copies dupliquées
Pourquoi la duplication par breakpoint est-elle un piège silencieux ?|Elle fonctionne visuellement au premier essai, puis les deux copies divergent sans erreur visible au premier changement de contenu oublié sur l'une des deux
Quel est le signal diagnostique d'une duplication accidentelle entre breakpoints ?|Un contenu modifié sur un breakpoint qui n'apparaît pas modifié sur un autre — signe de deux éléments distincts au lieu d'un seul avec overrides
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/d02-canvas-breakpoints-stacks/`. Tu y construis
> la structure responsive complète de la landing page TribuZen en Stacks, avec au
> moins 3 breakpoints sans aucune duplication — brief complet et rubrique de
> vérification dans le README du lab.
