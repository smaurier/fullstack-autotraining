# Lab A08 — Audit dark patterns et réécriture d'un flux de consentement honnête

> **Module associé :** [`modules/a08-ethique-dark-patterns.md`](../../modules/a08-ethique-dark-patterns.md)
> **Forme :** Intervention — sur une interface existante.
> **Outil :** Figma ou capture annotée, selon le support audité.

## Lire avant

Relire précisément :
- La taxonomie des dark patterns du module (confirmshaming, roach motel, faux sentiment
  d'urgence, opt-out caché) — chaque pattern doit être NOMMÉ précisément, pas décrit
  vaguement.
- Les 3 propriétés d'un consentement réellement éclairé : options à égalité visuelle,
  information nécessaire présente avant le choix, refus aussi facile que l'acceptation.
- Le rappel que la conformité RGPD ne garantit pas l'absence de dark pattern — un
  consentement techniquement conforme peut rester manipulatoire.

Pont direct avec le lab RGPD déjà existant dans le curriculum :
`23-droit-numerique/labs/lab-01-checklist-rgpd-tribuzen` — le consulter si disponible.

## Brief

1. Auditer une interface réelle (la sienne — TribuZen, nahual.fr, nuada-audit — ou une
   console publique connue) pour y repérer au moins 2 dark patterns, chacun nommé
   précisément selon la taxonomie du module (pas "c'est manipulatoire" en général).
2. Réécrire un flux de consentement ou de désabonnement RÉEL de TribuZen (notifications,
   partage de données famille, etc.) pour qu'il soit honnête selon les 3 propriétés du
   module, EN CONSERVANT l'objectif business légitime qui le motivait à l'origine (ex.
   garder l'utilisateur informé reste légitime, le pousser par confirmshaming ne l'est pas).

## Livrable attendu

Un document d'audit (2 dark patterns identifiés et nommés, captures ou description précise
de chacun) + le flux de consentement/désabonnement TribuZen réécrit avant/après, avec la
justification de ce qui a changé et pourquoi l'objectif business reste atteint.

## Rubrique de vérification

**Rubrique objective :**
- Au moins 2 dark patterns identifiés, chacun nommé avec le terme exact de la taxonomie du
  module (pas une paraphrase vague).
- Le flux réécrit respecte les 3 propriétés du consentement éclairé (vérifiables une par
  une), le refus est documenté comme aussi facile que l'acceptation.
- L'objectif business légitime d'origine est explicitement nommé et montré comme toujours
  atteint dans la version réécrite.

**Revue qualitative :** le brief demandait une réécriture honnête qui ne sacrifie pas
l'objectif légitime — la question est : la version réécrite informe-t-elle vraiment sans
manipuler, ou a-t-elle simplement déplacé la manipulation ailleurs dans le flux ?

## Variante J+30 (fading)

Reprendre un dark pattern observé sur un produit totalement différent (une app grand public
connue) et vérifier si la même taxonomie du module permet de le nommer sans ambiguïté — si
un pattern observé ne rentre dans aucune des catégories du module, documenter pourquoi,
plutôt que de forcer une catégorie approximative.
