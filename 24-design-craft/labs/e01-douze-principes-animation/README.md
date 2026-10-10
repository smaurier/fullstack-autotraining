# Lab E01 — Animer une transition idle → loading → succès

> **Module associé :** [`modules/e01-douze-principes-animation.md`](../../modules/e01-douze-principes-animation.md)
> **Forme :** Zéro — animation de zéro en After Effects.
> **Outil :** After Effects, export Lottie (Bodymovin).

## Lire avant

Relire précisément :
- Les 4 principes les plus transférables à l'UI (timing, easing, anticipation, poids
  perçu) et ce qu'ils communiquent au-delà de la fluidité visuelle.
- Quel easing pour une entrée (ease-out) vs une sortie (ease-in) — ne jamais les inverser.
- Ce qu'est l'anticipation en micro-interaction (quelques frames avant l'action
  principale) et quand réserver l'overshoot (confirmation/célébration seulement).

## Brief

1. Animer en After Effects une transition d'état idle → loading → succès pour un cas
   TribuZen ou le capstone (ex. déploiement GPU fictif).
2. Appliquer explicitement et documenter : un timing justifié pour chaque transition
   (jamais >400-500ms sur une action fréquente sans raison), un easing cohérent avec le
   sens du mouvement (entrée/sortie), au moins un micro-mouvement d'anticipation, et une
   décision explicite sur l'usage ou non d'un overshoot.
3. Exporter en Lottie et intégrer le résultat dans une vraie page (preuve d'intégration
   réelle, pas seulement un aperçu After Effects).

## Livrable attendu

Un fichier Lottie exporté et intégré dans une page web réelle, accompagné d'une note qui
documente pour chaque transition : le timing choisi et pourquoi, l'easing utilisé et pour
quelle raison (entrée/sortie), l'anticipation présente ou son absence justifiée, la
décision sur l'overshoot.

## Rubrique de vérification

**Rubrique objective :**
- Les 3 états (idle, loading, succès) sont animés et s'enchaînent dans l'intégration réelle
  (pas seulement visibles isolément dans After Effects).
- Chaque timing est documenté avec sa valeur en millisecondes et sa justification.
- L'easing d'entrée et de sortie ne sont jamais inversés (vérifiable à l'œil et dans les
  keyframes).
- La décision sur l'overshoot est explicite et cohérente avec la règle du module (réservé
  aux moments de confirmation/célébration).

**Revue qualitative :** le brief demandait que l'animation COMMUNIQUE l'état, pas
seulement qu'elle soit fluide — la question est : un utilisateur qui regarde l'animation
sans explication comprend-il qu'un chargement est en cours puis qu'il a réussi, ou
l'animation est-elle juste décorative ?

## Variante J+30 (fading)

Reprendre la même transition mais pour un état d'ÉCHEC (au lieu du succès) — appliquer un
timing/easing/poids qui communique l'échec sans décourager l'utilisateur de réessayer,
sans réutiliser mécaniquement les mêmes réglages que pour le succès.
