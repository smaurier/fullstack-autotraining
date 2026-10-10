# Lab A02 — Benchmark de consoles/dashboards avant de designer le pilotage GPU

> **Module associé :** [`modules/a02-benchmark-concurrentiel.md`](../../modules/a02-benchmark-concurrentiel.md)
> **Forme :** Zéro — document de benchmark écrit, aucune maquette.
> **Outil :** un éditeur de texte/tableur, navigation sur les produits étudiés.

## Lire avant

Relire précisément :
- La théorie sur la grille de critères qui doit découler du problème utilisateur posé en
  discovery (module A01), jamais d'un template générique copié.
- La distinction benchmark direct (concurrent réel) vs benchmark par analogie (produit
  d'un autre domaine qui résout un problème structurellement comparable).
- §4 "Pièges" — en particulier copier un pattern observé sans vérifier que le contexte
  (public, besoin, fréquence d'usage) s'applique aussi à TribuZen ou au capstone.

## Brief

Avant de designer le flow de pilotage GPU du capstone (console de déploiement/usage), 
benchmarker 3 à 5 consoles/dashboards réels — pas forcément des concurrents directs d'une
offre GPU (Vercel, AWS Console, Stripe Dashboard sont des candidats légitimes en analogie).

1. Écrire la grille de critères AVANT de regarder les produits, dérivée du problème
   utilisateur du capstone (ex. "comprendre l'usage avant de payer", "configurer sans se
   perdre entre technique et facturation").
2. Pour chaque produit, noter des observations FACTUELLES contre cette grille (pas des
   préférences esthétiques).
3. Conclure par les enseignements transférables — ce qui marche et pourquoi, ce qui échoue
   et pourquoi, avec le contexte qui explique chaque réussite/échec.

## Livrable attendu

Un document de benchmark avec : la grille de critères (écrite en premier), 3-5 fiches
produit (observations factuelles contre la grille), une synthèse des enseignements
transférables au capstone, chacun justifié par le contexte qui le rend valide ou pas.

## Rubrique de vérification

**Rubrique objective :**
- La grille de critères existe et précède les fiches produit (traçable).
- Au moins 3 produits sont analysés, dont au moins 1 par analogie (hors concurrent GPU
  direct).
- Chaque observation est factuelle et vérifiable (pas "c'est joli"/"c'est confus" sans
  preuve), chaque enseignement transférable cite le contexte qui le justifie.

**Revue qualitative :** le brief demandait d'éviter de copier un pattern sans vérifier son
contexte — la question est : chaque enseignement retenu explique-t-il pourquoi le contexte
source est comparable à celui du capstone, ou est-ce un copier-coller esthétique déguisé en
analyse ?

## Variante J+30 (fading)

Reprendre la grille de critères produite ici et l'appliquer à un 6e produit jamais vu
pendant le lab initial — vérifier que la grille, telle qu'écrite, reste utilisable sans
devoir être réinterprétée à chaque nouveau cas.
