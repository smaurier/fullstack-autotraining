# Lab C01 — RoutineCard en auto-layout responsive

> **Module associé :** [`modules/c01-interface-auto-layout.md`](../../modules/c01-interface-auto-layout.md)
> **Forme :** Zéro — construire un composant Figma de zéro.
> **Outil :** Figma.

## Lire avant

Relire précisément :
- §2.3 "Les deux modes de resize" — Hug contents vs Fill container, le piège n°1.
- §2.4 "Imbrication : chaque niveau a SA propre configuration" — ne pas configurer que le
  niveau extérieur.
- §3 Exemple A (construction pas à pas) et Exemple B (méthode de diagnostic si ça casse).

## Brief

Construire `RoutineCard` en Figma, miroir du composant React déjà codé dans TribuZen : une
carte avec une icône optionnelle et le nom d'une routine.

Tester EXACTEMENT 3 cas de contenu, dans la même frame de composant (via variants ou en
dupliquant l'instance, pas le composant principal) :
1. Nom de routine court (ex. "Dodo") avec icône.
2. Nom de routine long (ex. "Ranger la chambre et préparer le cartable") sans icône — doit
   passer à la ligne proprement, pas déborder.
3. Nom de routine court sans icône.

## Livrable attendu

- Un composant Figma `RoutineCard` avec auto-layout configuré à tous ses niveaux.
- 3 instances du composant, une par cas de contenu listé ci-dessus.
- Aucune instance ne doit avoir de calque déplacé manuellement par rapport au composant
  principal — seul le contenu (texte, présence de l'icône) change.

## Rubrique de vérification

**Rubrique objective :**
- Les 3 instances existent et affichent correctement leur contenu respectif.
- Aucun déplacement manuel de calque n'est visible entre les instances (vérifiable en
  comparant les positions relatives via l'inspecteur Figma).
- Le mode de resize (Hug/Fill) de chaque élément est cohérent avec son rôle : l'icône reste en
  Hug (taille fixe), le texte en Fill avec retour à la ligne activé.
- Le cas 2 (texte long) tient sur plusieurs lignes sans déborder du conteneur ni le faire
  exploser horizontalement.

**Revue qualitative :** le brief demandait un composant qui s'adapte SANS retouche manuelle —
la question n'est jamais "est-ce que ça a l'air correct sur CETTE instance" mais "est-ce que
je pourrais ajouter une 4e instance avec un contenu encore plus extrême sans toucher un seul
calque, juste en changeant le texte et en activant/désactivant l'icône".

## Variante J+30 (fading)

Reprendre `RoutineCard` et ajouter un 4e cas : un badge de statut optionnel (ex. "fait" /
"en retard") qui peut apparaître à droite de la carte. Contrainte : ce badge doit lui aussi
suivre la règle Hug/Fill posée dans le module — ne pas casser la configuration déjà posée
pour l'icône et le texte en l'ajoutant.
