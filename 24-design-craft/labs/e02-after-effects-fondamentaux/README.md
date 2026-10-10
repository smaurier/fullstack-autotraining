# Lab E02 — Illustration d'onboarding 100% vectorielle, prête pour Lottie

> **Module associé :** [`modules/e02-after-effects-fondamentaux.md`](../../modules/e02-after-effects-fondamentaux.md)
> **Forme :** Zéro — illustration animée construite de zéro.
> **Outil :** After Effects (Shape Layers, Graph Editor, précomposition).

## Lire avant

Relire précisément :
- Pourquoi une forme doit être un Shape Layer et jamais une image importée pour ce cours
  (Lottie ne rejoue que des propriétés vectorielles).
- L'interpolation par défaut entre deux keyframes (linéaire, mécanique) et comment la
  corriger via le Graph Editor (Easy Ease puis ajustement des poignées).
- La différence entre parenting (transformations liées, calques indépendants dans la
  liste) et précomposition (regroupement physique avec sa propre timeline).
- Les éléments qui ne survivent généralement pas à un export Lottie fidèle (raster/vidéo,
  flous avancés, styles de calque natifs, expressions complexes) — à tester tôt.

## Brief

1. Construire une illustration d'onboarding TribuZen (ex. écran de bienvenue, présentation
   d'une routine) entièrement en formes vectorielles (Shape Layers) — zéro image importée.
2. Animer avec des keyframes, corriger systématiquement l'interpolation linéaire par
   défaut via le Graph Editor (Easy Ease + ajustement manuel des poignées).
3. Organiser le projet en précomposition propre (pas un empilement de calques plats) pour
   préparer l'export Lottie du module suivant (E03).

## Livrable attendu

Un projet After Effects avec l'illustration entièrement vectorielle, organisée en
précomposition, animée avec des courbes de vitesse visiblement corrigées dans le Graph
Editor (pas une interpolation linéaire laissée par défaut).

## Rubrique de vérification

**Rubrique objective :**
- Zéro calque raster/image importée dans le projet final — 100% Shape Layers.
- Au moins une propriété animée a une courbe visiblement non linéaire dans le Graph Editor
  (preuve que l'Easy Ease/ajustement a été appliqué, pas laissé en linéaire).
- Le projet est organisé en au moins une précomposition cohérente, pas un empilement plat
  de calques indépendants.

**Revue qualitative :** le brief demandait un projet PRÊT pour l'export Lottie du module
suivant — la question est : en testant mentalement (ou réellement) un export Bodymovin
maintenant, quels éléments du projet risqueraient de ne pas survivre, et ce risque a-t-il
été anticipé dès la construction plutôt que découvert à l'export ?

## Variante J+30 (fading)

Reprendre l'illustration et ajouter un second état (ex. une variante "nuit" avec un
éclairage différent) en réutilisant la MÊME précomposition structurelle, sans dupliquer
tous les calques — preuve que l'organisation initiale supporte une évolution sans être
reconstruite.
