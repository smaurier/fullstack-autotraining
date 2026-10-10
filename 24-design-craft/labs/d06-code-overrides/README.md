# Lab D06 — Un Code Override justifié sur la landing page TribuZen

> **Module associé :** [`modules/d06-code-overrides.md`](../../modules/d06-code-overrides.md)
> **Forme :** Intervention — ajouter une capacité à la landing page des labs D01-D05.
> **Outil :** Framer (Code Override, TS/React).

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.2 (définition du Code Override, frontière avec les propriétés exposées) — la
  question à se poser avant d'écrire une seule ligne de code.
- §2.4 et Exemple B — le piège inverse de la sur-ingénierie, à vérifier EN PREMIER.
- §4 "Pièges & misconceptions".

## Brief

Sur la landing page TribuZen (lab D01-D05), identifier UN besoin réel qui NE PEUT PAS se
résoudre avec les outils natifs Framer (Stacks, variants, propriétés exposées, Collection) —
par exemple une validation de champ de formulaire, un compteur simple, un appel à une API
légère pour afficher une donnée externe.

Avant d'écrire une ligne de code : vérifier explicitement et PAR ÉCRIT qu'aucun outil natif
ne couvre ce besoin (c'est le garde-fou contre le piège de sur-ingénierie de l'Exemple B).

Écrire le Code Override TS/React qui couvre ce besoin, l'intégrer réellement au composant
Framer concerné.

## Livrable attendu

- Le Code Override fonctionnel, intégré au projet Framer réel (pas un extrait de code
  isolé jamais branché).
- Une note écrite de justification : pourquoi aucun outil natif ne suffisait, rédigée AVANT
  l'écriture du code (pas une rationalisation après coup).

## Rubrique de vérification

**Rubrique objective :**
- Le Code Override s'exécute réellement dans le contexte Framer (testé, pas seulement
  écrit).
- La note de justification existe et nomme explicitement quel outil natif a été écarté et
  pourquoi il ne suffisait pas.
- Le besoin couvert correspond à une vraie logique dynamique, pas une valeur statique
  choisie dans un panneau (sinon c'est le signal du piège inverse).

**Revue qualitative :** le brief demandait de prouver un jugement, pas juste d'écrire du
code qui marche — la question n'est jamais "est-ce que ce Code Override fonctionne" mais
"est-ce que ce besoin méritait vraiment de sortir du système visuel natif, ou est-ce qu'un
variant aurait suffi en étant plus simple à maintenir pour un futur collaborateur designer".

## Variante J+30 (fading)

Reprendre l'Exemple B du module (bouton qui change de couleur au survol) : construire
délibérément la MAUVAISE version en Code Override, puis la refaire en variant natif, et
documenter en une phrase le coût de maintenance réel de chaque version pour quelqu'un qui
ne sait pas coder.
