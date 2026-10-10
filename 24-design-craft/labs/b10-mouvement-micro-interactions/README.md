# Lab B10 — Une micro-interaction justifiée, pas gratuite

> **Module associé :** [`modules/b10-mouvement-micro-interactions.md`](../../modules/b10-mouvement-micro-interactions.md)
> **Forme :** Itérer — reprendre un composant TribuZen existant, non animé.
> **Outil :** Figma (prototypage) + note d'implémentation CSS/React pour le fallback.

## Lire avant

Relire précisément, pas tout le module :
- §2.1 les 3 raisons légitimes d'animer (et la seule illégitime) — c'est le filtre de
  décision à appliquer avant toute chose.
- §2.3 le test du retard d'information — pour vérifier après coup que l'animation produite
  n'a pas dérivé vers la distraction.
- §4 Pièges, en particulier "animer pour faire moderne sans raison identifiée".

Ne pas chercher d'inspiration d'animations impressionnantes avant d'avoir choisi la raison —
le risque est de partir de l'effet et de lui inventer une justification après coup.

## Brief

Choisir un composant TribuZen aujourd'hui sans aucune animation (ex. le bouton de validation
d'une routine, l'apparition d'une nouvelle alerte, ou l'ajout d'un enfant).

1. Écrire explicitement, AVANT de prototyper quoi que ce soit, quelle des 3 raisons légitimes
   justifie d'animer ce composant précis.
2. Prototyper dans Figma la micro-interaction correspondante (transition simple, pas besoin
   du Bloc E pour ce lab).
3. Documenter le fallback `prefers-reduced-motion` : décrire exactement ce qui change dans
   l'interface quand cette préférence est active (quel changement d'état reste, qu'est-ce qui
   disparaît).

## Livrable attendu

- Note écrite de justification (une des 3 raisons légitimes, nommée explicitement).
- Prototype Figma de la micro-interaction (connexions/transitions, voir si besoin
  [[c04-prototypage|modules/c04-prototypage.md]] une fois ce module écrit).
- Description précise du fallback statique pour `prefers-reduced-motion`.

## Rubrique de vérification

**Rubrique objective :**
- La justification écrite nomme explicitement UNE des 3 raisons légitimes (feedback,
  orientation, attention) — "c'est joli" ou "ça fait moderne" n'est pas une justification
  valide et doit être rejeté.
- Le fallback décrit un état final IDENTIQUE à la version animée (même information, sans la
  transition).
- Le temps de transition prototypé ne dépasse pas quelques centaines de millisecondes pour un
  feedback simple (pas une animation de plusieurs secondes sauf justification explicite forte).

**Revue qualitative :** la micro-interaction aide-t-elle réellement la compréhension de
l'état du système, ou est-ce décoratif malgré une justification écrite qui sonne bien sur le
papier — appliquer le test du retard d'information (§2.3) en conditions réelles.

## Variante J+30 (fading)

Reprendre la même micro-interaction et l'implémenter réellement en CSS/Framer Motion (si le
cours 06 ou le Bloc D sont déjà avancés) avec le media query `prefers-reduced-motion`
fonctionnel et testé en activant réellement la préférence système — pas seulement décrit sur
le papier.
