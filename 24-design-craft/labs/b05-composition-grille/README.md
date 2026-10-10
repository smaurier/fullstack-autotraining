# Lab B05 — Grille modulaire et rythme vertical d'un dashboard dense

> **Module associé :** [`modules/b05-composition-grille.md`](../../modules/b05-composition-grille.md)
> **Forme :** Itération — reprendre un dashboard TribuZen existant, pas construire de zéro.
> **Outil :** Figma.

## Lire avant

Relire précisément, pas tout le module :
- §2.3-2.4 (grilles modulaires, rythme vertical) — le cœur de ce lab.
- §2.2 (nombre d'or) — seulement si tu envisages de l'utiliser pour équilibrer deux zones ;
  ne pas le convoquer "parce que c'est la règle", lire le point de vigilance avant.
- §4 "Pièges & misconceptions" — en particulier le piège du rythme déclaré mais pas tenu.

Ne pas redessiner tout le dashboard : ce lab porte sur la structure et les espacements, pas
sur un nouveau contenu ou une nouvelle palette.

## Brief

Sur un dashboard TribuZen dense existant (ex. `FamilyDashboard`) :

1. Choisir et nommer explicitement une unité de base (ex. 8px, cohérente avec la grille déjà
   utilisée côté Tailwind/code).
2. Documenter une grille de colonnes : nombre de colonnes, largeur, gouttière.
3. Mesurer **au moins 5 espacements verticaux réels** de la maquette (entre cartes, padding
   interne, marge sous un titre, etc.) et vérifier pour chacun qu'il est un multiple exact de
   l'unité choisie.
4. Corriger tout espacement qui ne serait pas un multiple exact.

## Livrable attendu

- Un document (annotations Figma ou fichier séparé) qui nomme l'unité de base, documente la
  grille de colonnes (nombre, largeur, gouttière), et liste les 5 espacements mesurés avec
  leur valeur et leur statut (conforme / corrigé).
- La maquette corrigée si des écarts ont été trouvés et corrigés.

## Rubrique de vérification

**Rubrique objective :**
- Unité de base nommée explicitement (une valeur en pixels, pas "une unité cohérente" sans
  chiffre).
- Grille de colonnes documentée : nombre de colonnes, largeur, gouttière.
- Au moins 5 espacements réels mesurés et vérifiés comme multiples exacts de l'unité — tout
  écart trouvé est corrigé, pas simplement noté sans suite.
- Chaque carte d'information se pose sur un nombre entier de modules de la grille, pas une
  largeur en pixels indépendante de la trame.

**Revue qualitative :** le brief demandait que la grille résolve un vrai problème de densité
visuelle du dashboard, pas une contrainte décorative plaquée après coup — la question est
"est-ce que la cohérence des espacements se perçoit réellement à l'œil une fois corrigée (le
dashboard paraît-il plus ordonné), ou la correction reste-t-elle purement théorique sans
effet visuel perceptible".

## Variante J+30 (fading)

Reprendre le rapport entre deux zones du dashboard (ex. liste de routines vs zone de détail)
et tester deux hypothèses de proportion : un partage simple (1/3 - 2/3) contre un partage
proche du nombre d'or (≈38% - 62%). Documenter par écrit, avec l'usage réel du contenu
(est-ce que chaque zone a assez de place pour ce qu'elle doit afficher), laquelle des deux
proportions fonctionne mieux dans CE cas précis — preuve que le nombre d'or se vérifie à
l'usage, il ne se décrète pas.
