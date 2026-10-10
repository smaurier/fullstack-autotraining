# Lab F04 — Tableau de correspondance marque → tokens

> **Module associé :** [`modules/f04-pont-marque-tokens.md`](../../modules/f04-pont-marque-tokens.md)
> **Forme :** Incrémental — documentation, pas de nouvel asset visuel.
> **Outil :** Figma (Variables) + document texte/markdown pour le tableau.

## Lire avant

- §2.1 "Token sémantique vs valeur recopiée" — c'est le critère qui juge le nommage des
  tokens proposés.
- §2.3 "Documenter la correspondance" — format du tableau attendu.
- §3 Exemple A — structure exacte de tableau à reproduire (3 colonnes minimum).

## Brief

Pour chaque couleur et chaque usage typographique du brand book produit en F02 (ou de
`design.md` pour TribuZen), produire un tableau de correspondance avec les tokens produit
existants (cours 06) ou à créer. Chaque ligne doit avoir :
- La couleur/typo de marque (nom + valeur exacte).
- Le token produit correspondant (nom sémantique), ou "aucun" avec justification.

Si un token proposé n'existe pas encore côté code, le nommer quand même de façon sémantique
(pas par sa valeur) — le lab porte sur le NOMMAGE et la correspondance, pas sur l'implémentation
code elle-même.

## Livrable attendu

- Un tableau complet couvrant 100% des couleurs et typographies du brand book de référence.
- Chaque token proposé est nommé par son usage (`color-cta`, `font-heading`...), jamais par
  sa valeur.

## Rubrique de vérification

**Rubrique objective :**
- Toutes les couleurs/typos du brand book ont une ligne dans le tableau.
- Chaque ligne a soit un token nommé, soit une justification d'absence explicite — aucune
  ligne vide ou "à définir plus tard".
- Aucun nom de token proposé n'encode une valeur (vérifier : si la couleur change, le nom
  reste-t-il juste ?).

**Revue qualitative :** simuler un changement de la couleur d'accent de la marque (comme
l'Exemple B du module) — le tableau permet-il de répondre IMMÉDIATEMENT à "quels tokens
doivent changer en miroir, et lesquels ne sont pas concernés" sans avoir à relire tout le
design system ?

## Variante J+30 (fading)

Reprendre le tableau 30 jours plus tard et ajouter une nouvelle couleur ou typographie
(réelle ou fictive) à la marque. Vérifier si le réflexe "proposer un token sémantique et
documenter sa justification si absent" s'applique spontanément, sans relire le module.
