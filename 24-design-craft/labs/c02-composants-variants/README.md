# Lab C02 — Button en variants, miroir du Button shadcn/cva

> **Module associé :** [`modules/c02-composants-variants.md`](../../modules/c02-composants-variants.md)
> **Forme :** Intervenir dans l'existant — le composant React existe déjà, c'est la référence.
> **Outil :** Figma.

## Lire avant

Relire précisément :
- §2.2 "Variants : plusieurs composants réunis en UN SEUL paramétrable" — la table de
  correspondance cva ↔ variants Figma.
- §2.3 "Override d'instance : ce qui est permis sans casser le lien".
- §4 Pièges, en particulier "Dupliquer un composant pour chaque variante" — le piège central
  de ce lab.

Relire le code source du `Button` shadcn/cva de TribuZen avant de commencer (ses valeurs
exactes de `variant`, `size`, et son état `disabled`) — c'est le brief réel, pas une
invention libre.

## Brief

Construire le composant Figma `Button`, en reproduisant EXACTEMENT les mêmes dimensions de
variation que la version codée : `variant` (default/destructive/outline), `size`
(sm/md/lg), `state` (default/disabled) — un seul composant à variants, zéro duplication de
calque entre les combinaisons.

## Livrable attendu

- Un composant Figma `Button` avec les 3 propriétés de variants ci-dessus, construit sur
  l'auto-layout du module C01.
- Une table écrite (dans le fichier Figma ou un document séparé) de correspondance exacte
  propriété Figma ↔ prop code, pour chaque valeur possible.
- Au moins 3 instances du composant illustrant des combinaisons différentes, avec au moins
  une instance dont le texte a été overridé (contenu différent du composant principal).

## Rubrique de vérification

**Rubrique objective :**
- Toutes les combinaisons variant×size×state existantes dans le code existent dans le
  composant Figma (aucune valeur manquante, aucune valeur inventée qui n'existe pas en code).
- La table de correspondance est complète : chaque propriété Figma et chaque valeur possible
  est reliée à sa prop/valeur code exacte.
- Zéro duplication de calque détectable : toutes les combinaisons viennent du MÊME composant
  principal (vérifiable en modifiant le composant principal et en observant la propagation
  sur toutes les instances).

**Revue qualitative :** un dev qui ne connaît pas le composant codé pourrait-il déduire les
props exactes du `Button` React juste en lisant le panneau de propriétés du composant Figma,
sans avoir besoin de poser une seule question ?

## Variante J+30 (fading)

Le code ajoute un nouveau variant `ghost` (fond transparent, bordure au survol). Ajouter cette
valeur au composant Figma SANS casser aucune des combinaisons existantes, puis mettre à jour
la table de correspondance. Contrainte : le temps pour ajouter cette valeur doit être très
court si le composant à variants était bien construit — si ça prend longtemps, c'est le signe
d'une structure de variants mal posée au départ.
