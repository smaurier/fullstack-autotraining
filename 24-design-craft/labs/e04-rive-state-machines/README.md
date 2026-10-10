# Lab E04 — State machine idle/loading/erreur/succès (capstone GPU)

> **Module associé :** [`modules/e04-rive-state-machines.md`](../../modules/e04-rive-state-machines.md)
> **Forme :** Zéro — construire la state machine de zéro dans Rive.
> **Outil :** Rive.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.3 (state machine, inputs, blend state) — le vocabulaire exact à utiliser.
- Exemple A — la méthode de construction et de test en scénario complet.
- §4 "Pièges & misconceptions", en particulier le piège de la vérification état par état.

## Brief

Construire dans Rive UNE state machine à 4 états : idle, loading, erreur, succès — pour le
statut de pilotage GPU fictif du capstone.

1. Un visuel distinct et animé pour chaque état.
2. Au moins 2 inputs réels (ex. booléen `isLoading`, triggers `onError`/`onSuccess`).
3. Des transitions explicites entre les états cohérentes avec un scénario réel : idle →
   loading → (succès OU erreur) → retour à idle.
4. Tester le scénario COMPLET enchaîné en déclenchant les inputs dans l'ordre, pas chaque
   état isolément.

## Livrable attendu

- Le fichier Rive avec la state machine complète et fonctionnelle.
- Une note qui documente chaque input, ce qu'il déclenche, et le résultat du test du
  scénario complet (captures ou description précise de l'enchaînement observé).

## Rubrique de vérification

**Rubrique objective :**
- 4 états distincts existent, aucun n'est un fichier/artboard isolé non connecté au graphe.
- Au moins 2 transitions fonctionnelles pilotées par un input testé réellement (pas juste
  déclaré).
- Le scénario complet (idle → loading → succès/erreur → idle) a été testé enchaîné, pas
  uniquement vérifié état par état.

**Revue qualitative :** le brief demandait une vraie state machine, pas 4 jolies animations
isolées — la question est toujours "est-ce que les transitions entre états sont fluides et
compréhensibles pour un utilisateur qui regarde l'enchaînement réel, ou juste techniquement
déclenchables en isolation".

## Variante J+30 (fading)

Ajouter un 5e état "en pause" avec ses propres transitions — mesurer en une phrase la
différence de coût d'ajout entre cette state machine Rive (ajouter un état au graphe
existant) et ce qu'aurait coûté le même ajout avec 4 fichiers Lottie séparés basculés en
code (créer un 5e fichier, plus toute la logique de bascule correspondante).
