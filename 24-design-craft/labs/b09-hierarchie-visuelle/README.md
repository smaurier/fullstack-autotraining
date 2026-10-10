# Lab B09 — FamilyDashboard hiérarchisé sans couleur

> **Module associé :** [`modules/b09-hierarchie-visuelle.md`](../../modules/b09-hierarchie-visuelle.md)
> **Forme :** Zéro — construire de zéro deux états d'un même écran, en niveaux de gris.
> **Outil :** Figma.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.2 (les trois leviers hors couleur, le point focal unique) — c'est le cœur de l'exercice.
- §2.3 "L'épreuve de vérité" — comprendre POURQUOI on travaille en gris, pas juste s'y plier.
- §3 Exemple A et B — montrent comment le point focal change selon l'état de l'écran.

Ne pas consulter de dashboard déjà coloré avant d'avoir produit sa propre version en gris —
le but est de prouver que la hiérarchie tient structurellement, pas de recopier un résultat.

## Brief

Reprendre (ou inventer de façon cohérente avec le produit) le contenu du `FamilyDashboard`
TribuZen : statut des routines du jour, liste des enfants, résumé gazette, zone d'alerte.

Produire **deux frames Figma**, strictement en niveaux de gris (aucune couleur, uniquement du
blanc au noir) :

1. **État "une alerte active"** — l'alerte doit être le point focal incontestable.
2. **État "aucune alerte"** — le point focal légitime doit se déplacer vers le résumé des
   routines du jour.

Chaque frame doit utiliser au moins 3 niveaux de hiérarchie distincts et mesurables (taille de
police différente, poids différent, espacement différent entre les groupes).

## Livrable attendu

- Deux frames Figma nommées explicitement (`01-avec-alerte`, `02-sans-alerte`), strictement
  en niveaux de gris.
- Une note texte qui annote, pour chaque frame, quel élément est le point focal et PAR QUEL
  levier (taille, poids, ou espace — ou une combinaison) il l'est devenu.

## Rubrique de vérification

**Rubrique objective :**
- Les deux frames ne contiennent AUCUNE couleur (vérifiable à l'œil ou par inspection des
  styles Figma utilisés — uniquement des valeurs de gris/blanc/noir).
- Chaque frame a au moins 3 tailles de police ou poids distincts utilisés de façon cohérente
  (pas un mélange arbitraire).
- Le point focal de chaque frame est annoté avec le ou les leviers utilisés (taille/poids/
  espace), nommés explicitement.
- Le point focal diffère entre les deux frames et correspond à l'état réel décrit dans le
  brief (alerte vs pas d'alerte).

**Revue qualitative :** la question n'est jamais "est-ce que c'est joli en gris" (ça ne doit
pas forcément l'être) mais "un regard de 2-3 secondes identifie-t-il spontanément le bon
élément comme le plus important, sur CHACUNE des deux frames, sans explication orale".

## Variante J+30 (fading)

Reprendre les deux frames et ajouter une **troisième variante colorée** (palette sauge/
terracotta/blanc chaud de `design.md`) qui respecte EXACTEMENT la même hiérarchie de
taille/poids/espace déjà posée — la couleur ne doit rien changer à l'ordre de lecture, elle
doit seulement le renforcer. Si la couleur change l'ordre de lecture par rapport à la version
grise, c'est un signal que la hiérarchie grise n'était pas assez forte au départ.
