# Lab E05 — Comparer Lottie, Rive et CSS natif sur un même bouton

> **Module associé :** [`modules/e05-choix-outil-motion.md`](../../modules/e05-choix-outil-motion.md)
> **Forme :** Intervention — analyse comparée, pas forcément 3 implémentations complètes.
> **Outil :** After Effects/Lottie, Rive, CSS ou Framer Motion (cours 06).

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.4 — les 3 options et surtout l'ordre de questionnement de la règle de décision.
- Exemple A et B — une analyse qui penche vers Rive, une qui penche vers CSS natif.
- §4, en particulier la confusion Framer Motion / Framer.

## Brief

Prendre le bouton "Lancer le job GPU" du capstone (ou un équivalent si le capstone n'est
pas encore construit) et produire 3 notes d'analyse argumentées :

1. Comment ce besoin serait couvert en Lottie — avec ses limites réelles pour ce cas.
2. Comment il serait couvert en Rive — avec le setup réellement nécessaire.
3. Comment il serait couvert en CSS/Framer Motion natif — avec ses limites réelles.

Trancher par écrit, selon la règle de décision du module (CSS d'abord, puis Lottie, puis
Rive), laquelle des 3 options est la bonne POUR CE CAS PRÉCIS — pas en général.

## Livrable attendu

- Les 3 notes d'analyse (texte, pas forcément 3 implémentations codées complètes, même si
  implémenter réellement l'option retenue est recommandé).
- La décision finale, avec la justification qui suit explicitement l'ordre de la règle de
  décision.

## Rubrique de vérification

**Rubrique objective :**
- Les 3 options sont analysées avec leurs contraintes réelles pour ce cas précis, pas
  survolées.
- La décision suit explicitement l'ordre de la règle (vérifier CSS avant Lottie avant Rive).
- La justification cite le besoin réel (enchaînement d'états, interactivité) qui justifie
  l'option retenue.

**Revue qualitative :** le brief demandait de prouver un raisonnement, pas de deviner le bon
outil — la question est toujours "est-ce que la décision suit vraiment la règle du plus
simple qui suffit, ou choisit-elle l'outil le plus récemment appris par réflexe".

## Variante J+30 (fading)

Reprendre le bouton de survol de carte de l'Exemple B du module (transition basique, pas
d'état à piloter) et refaire la même analyse comparée en 3 phrases maximum — la rapidité de
la conclusion ("CSS natif, évidemment") est elle-même la preuve que la règle fonctionne.
