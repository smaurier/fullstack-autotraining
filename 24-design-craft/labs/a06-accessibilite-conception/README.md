# Lab A06 — Annoter l'accessibilité d'un flow au stade maquette

> **Module associé :** [`modules/a06-accessibilite-conception.md`](../../modules/a06-accessibilite-conception.md)
> **Forme :** Itération — reprendre un flow TribuZen existant, pas en créer un nouveau.
> **Outil :** Figma (ou le wireframe déjà produit en A04).

## Lire avant

Relire précisément, pas tout le module :
- §2.1 (ordre de focus) et l'Exemple A — c'est la méthode d'annotation attendue.
- §2.3 (pattern d'erreur) et l'Exemple B — la combinaison texte + icône, jamais la couleur seule.
- §4 "Pièges & misconceptions" — en particulier le piège "taille visuelle vs zone cliquable".

Ne pas regarder de checklist RGAA complète avant d'avoir fait ce lab une première fois à la
main — l'objectif est de prouver un réflexe de conception, pas de cocher une liste externe.

## Brief

Choisir un flow TribuZen existant (onboarding ou une routine déjà wireframée en A04).

Sur chaque écran du flow :
1. Numéroter l'ordre de focus attendu de tous les éléments interactifs (annotation visible
   sur la maquette).
2. Mesurer (ou documenter en px) la zone cliquable de chaque élément interactif ; agrandir
   celles qui sont sous 44×44px.
3. Repérer au moins 2 messages d'erreur de formulaire du flow et les corriger pour qu'ils ne
   dépendent jamais de la couleur seule (ajouter texte explicite + icône).

## Livrable attendu

- Les écrans du flow annotés (ordre de focus numéroté, zones tactiles mesurées).
- Les 2 corrections de messages d'erreur, avant/après, avec le texte exact et l'icône ajoutée.
- Une note qui liste tous les éléments interactifs de chaque écran — preuve qu'aucun n'a été
  oublié dans la numérotation.

## Rubrique de vérification

**Rubrique objective :**
- Ordre de focus numéroté sur 100% des écrans du flow, sans élément interactif oublié.
- Chaque zone tactile est mesurée ; toute zone sous 44×44px est signalée et corrigée (nouvelle
  mesure documentée).
- Les 2 messages d'erreur corrigés combinent texte explicite + icône, la couleur seule n'est
  jamais le seul signal restant.

**Revue qualitative :** la question n'est jamais "est-ce que ça a l'air accessible" mais "un
utilisateur au clavier seul, ou une personne daltonienne, suivrait-il ce flow sans
confusion ni information manquante" — vérifier concrètement en suivant soi-même l'ordre
numéroté au doigt sur l'écran, dans l'ordre exact annoté.

## Variante J+30 (fading)

Reprendre un DEUXIÈME flow TribuZen (différent du premier) et refaire l'exercice sans
relire le module — seulement à partir de la mémoire des 4 points (focus, zones tactiles,
pattern d'erreur, hiérarchie de titres). Contrainte supplémentaire : inclure au moins un cas
où deux boutons sont visuellement proches mais doivent avoir un ordre de focus contre-
intuitif (ex. un bouton "Annuler" positionné avant "Valider" dans le flux logique même s'il
apparaît après visuellement) — documenter explicitement pourquoi.
