# Lab B03 — Corriger la micro-typographie de nahual.fr

> **Module associé :** [`modules/b03-typographie.md`](../../modules/b03-typographie.md)
> **Forme :** Itération — reprendre une page réelle existante, pas construire de zéro.
> **Outil :** Figma ou l'inspecteur du navigateur sur `nahual.fr` directement.

## Lire avant

Relire précisément, pas tout le module :
- §2.4 (micro-typographie) — kerning vs tracking, leading, veuves/orphelines, mesure de
  ligne. C'est le cœur de ce lab.
- §2.6 (pairing Fraunces + Inter) — pour justifier la hiérarchie finale, pas seulement
  corriger des défauts isolés.
- §4 "Pièges & misconceptions" — en particulier le piège kerning/tracking et le piège de la
  mesure de ligne négligée.

Ne pas corriger "au pif" en changeant des valeurs jusqu'à ce que "ça ait l'air mieux" — chaque
correction doit être nommée avec le terme technique exact avant d'être appliquée.

## Brief

Choisir un bloc de texte réel sur `nahual.fr` (un paragraphe de présentation, une légende,
ou un bloc de contenu dense) et :

1. Mesurer la mesure de ligne actuelle (nombre de caractères par ligne sur la ligne la plus
   large).
2. Relire le bloc à la recherche d'au moins une veuve ou une orpheline.
3. Vérifier si un espacement de texte en majuscules (label, navigation) souffre d'une
   confusion kerning/tracking.

Corriger **au moins 3 problèmes réels** identifiés parmi ces trois familles de défauts (pas
nécessairement un de chaque si une seule famille en contient plusieurs), puis documenter
avant/après.

## Livrable attendu

- Capture ou export avant/après du bloc corrigé.
- Une note qui nomme, pour chaque correction, le terme technique exact (ex. "mesure de ligne
  réduite de 95 à 68 caractères en réduisant la largeur du conteneur de texte à 600px") —
  jamais "ça fait mieux" sans le terme et la mesure.
- La mesure de ligne finale du bloc corrigé, avec sa valeur en caractères, justifiée dans la
  fourchette 50-75.

## Rubrique de vérification

**Rubrique objective :**
- Au moins 3 corrections documentées, chacune nommée avec son terme technique exact (kerning,
  tracking, leading, veuve, orpheline, ou mesure de ligne).
- La mesure de ligne finale du bloc corrigé est mesurée (pas estimée à l'œil) et se situe
  entre 50 et 75 caractères, ou une justification écrite explique pourquoi elle s'en écarte
  volontairement.
- Si une correction porte sur kerning/tracking, le texte explique laquelle des deux notions
  s'appliquait réellement au défaut trouvé, et pourquoi l'autre aurait été un mauvais choix.

**Revue qualitative :** le brief demandait une hiérarchie typographique qui guide clairement
l'œil — la question n'est jamais "est-ce plus joli" mais "en regardant le bloc corrigé sans
connaître l'ancien, est-ce que l'œil sait immédiatement où commencer à lire et distingue sans
effort le titre du corps de texte, et la lecture du corps de texte est-elle fluide sans
rupture de veuve/orpheline".

## Variante J+30 (fading)

Reprendre tout le site `nahual.fr` (pas un seul bloc) et produire un audit complet de mesure
de ligne sur chaque bloc de texte principal, avec une règle de grille éditoriale unique
(largeur de colonne de texte constante) appliquée partout plutôt que corrigée bloc par bloc —
pont direct vers le module B05 (composition, grille et proportion) pas encore rédigé au
moment de ce lab : si disponible, s'appuyer sur sa notion de grille modulaire pour fixer cette
largeur une fois pour toutes plutôt qu'au cas par cas.
