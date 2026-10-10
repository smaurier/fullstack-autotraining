# Lab Capstone 01 — Audit, charte, premières maquettes

> **Module associé :** [`modules/cap01-audit-charte-maquettes.md`](../../modules/cap01-audit-charte-maquettes.md)
> **Forme :** Zéro — construire de zéro un audit, une charte et des maquettes pour un produit fictif.
> **Outil :** Figma + document écrit (audit et process).

## Lire avant

Relire précisément, pas tout le module :
- §0 "Ce que ce capstone n'est PAS" — rappel du statut générique de l'exercice, à tenir à
  l'esprit même sans le réécrire dans le livrable.
- §2.1 à 2.3 — la chaîne audit → charte → maquettes, et pourquoi chaque étape doit découler
  de la précédente plutôt que d'être produite indépendamment.
- Le module `a05-heuristiques-ux` (grille d'audit) et `f01-anatomie-identite` /
  `f02-brand-book-guidelines` (méthode de charte) si pas encore fait, au moins en survol.

Ne pas regarder de maquette de console déjà existante pour "s'inspirer" avant d'avoir terminé
son propre audit — l'audit doit porter un regard neuf, pas confirmer une direction déjà vue
ailleurs.

## Brief

1. **Audit (mois 1)** — choisir UNE console technique publique réelle (ex. console Vercel,
   console AWS, dashboard Stripe, ou équivalent). Produire un audit écrit : au moins 5
   constats (positifs et négatifs), chacun nommé avec le vocabulaire exact de la grille a05
   (heuristique de Nielsen précise, ou loi de Hick/Fitts/Miller).
2. **Charte (mois 2)** — à partir d'AU MOINS un constat précis de l'audit, produire une charte
   graphique complète pour un produit fictif de l'archétype "console SaaS de pilotage
   technique" (ce produit sera réutilisé dans les labs cap02 et cap03) : logo, palette de
   marque, typographie, usages autorisés/interdits.
3. **Maquettes (mois 3)** — au moins 3 écrans Figma clés (dashboard d'accueil, une vue de
   détail dense en données, un écran de confirmation d'action) qui appliquent visiblement la
   charte via des styles/tokens Figma nommés.
4. **Document de process** — un texte (1-2 pages) qui relie explicitement chaque décision de
   charte à un constat précis de l'audit, et chaque choix de maquette à une règle précise de
   la charte.

## Livrable attendu

- Document d'audit écrit (5 constats minimum, console source citée).
- Charte graphique Figma ou document dédié (logo, palette, typo, règles d'usage).
- Fichier Figma avec au moins 3 maquettes nommées, utilisant des styles/tokens nommés et
  reliés aux valeurs exactes de la charte.
- Document de process reliant les trois étapes.

## Rubrique de vérification

**Rubrique objective :**
- Au moins 5 constats d'audit, chacun cite le nom exact d'une heuristique/loi de la grille a05.
- La console source de l'audit est une console réelle et nommée (pas inventée).
- La charte contient au minimum : logo (ou construction géométrique décrite), palette avec
  valeurs exactes, typographie nommée, au moins 2 règles d'usage explicites.
- Les 3 maquettes utilisent des styles/tokens Figma nommés correspondant exactement aux
  valeurs de la charte (pas de couleur approximée au pipette ou au jugé).
- Le document de process cite explicitement au moins 1 constat d'audit → 1 décision de
  charte, et au moins 1 règle de charte → 1 choix de maquette.

**Revue qualitative :** la question centrale n'est jamais "est-ce que c'est joli" mais "est-ce
que je peux suivre, constat par constat, le chemin qui mène de l'audit à la charte puis aux
maquettes" — toute décision de charte ou de maquette qui ne se relie à rien dans l'étape
précédente est un signal d'audit de confirmation plutôt que d'audit honnête (piège nommé dans
le module, §4).

## Variante J+30 (fading)

Reprendre l'audit du mois 1 et l'appliquer à une DEUXIÈME console réelle d'un genre différent
(ex. si la première était une console cloud technique, choisir cette fois un dashboard
financier/facturation). Comparer les deux audits : quels constats se retrouvent dans les deux
(probablement des principes universels de la grille a05), lesquels sont spécifiques au genre
de produit (ex. la facturation a des exigences propres, préfigurant cap03) — documenter cette
distinction par écrit avant de continuer vers cap02.
