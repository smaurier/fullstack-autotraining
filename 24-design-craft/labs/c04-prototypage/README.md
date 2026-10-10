# Lab C04 — Prototype cliquable complet d'un flow TribuZen

> **Module associé :** [`modules/c04-prototypage.md`](../../modules/c04-prototypage.md)
> **Forme :** Zéro — construire un prototype complet d'un flow pas encore designé.
> **Outil :** Figma.

## Lire avant

Relire précisément :
- §2.1 "Connexions : le type de transition PORTE une intention".
- §2.2 "Overlay : garder le contexte visible, par choix" — le critère de décision.
- §3 Exemple A (construction pas à pas d'un flow complet) et Exemple B (variable d'état).

## Brief

Construire un prototype Figma cliquable complet d'un flow TribuZen d'au moins 4 écrans (ex.
onboarding, ou `GazettePreview` du déclenchement à l'aperçu). Le flow doit inclure :
1. Au moins une transition de type **slide** (progression spatiale réelle entre deux étapes).
2. Au moins un **overlay** (pas une navigation complète) pour une action secondaire qui doit
   garder le contexte visible (ex. un menu d'options, une confirmation).
3. Si le flow s'y prête, un composant dont l'état change via une variable plutôt que par
   duplication de frames (ex. un bouton qui passe de idle à loading à succès).

## Livrable attendu

- Le prototype Figma complet, testable en mode présentation du début à la fin sans écran
  mort ni blocage.
- Une note écrite justifiant le choix de transition pour chaque connexion importante (pourquoi
  slide ici, pourquoi dissolve là).

## Rubrique de vérification

**Rubrique objective :**
- Le prototype se parcourt entièrement en mode présentation, du premier au dernier écran,
  sans blocage.
- Au moins 1 transition slide et 1 overlay sont présents et fonctionnels.
- Chaque choix de transition est justifié par écrit et correspond à la règle du module
  (déplacement spatial = slide/push, changement d'état = dissolve, action immédiate =
  instant).

**Revue qualitative :** un pair qui teste le prototype sans explication orale comprend-il
sans ambiguïté, à chaque transition, s'il a changé de contexte ou si un élément s'est
simplement superposé à ce qu'il regardait déjà ?

## Variante J+30 (fading)

Reprendre le flow et remplacer une navigation complète existante par un overlay (ou
inversement) là où le mauvais choix a été fait initialement — documenter pourquoi le
changement améliore la lisibilité du parcours pour l'utilisateur.
