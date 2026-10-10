---
titre: Hiérarchie visuelle appliquée à l'écran — poids, taille, contraste
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [hiérarchie par la taille, hiérarchie par le poids/contraste, hiérarchie par l'espace, point focal, hiérarchie indépendante de la couleur, lecture en niveaux de gris comme épreuve de vérité]
outcomes: [construire une hiérarchie visuelle lisible sans aucune couleur, identifier un point focal unique sur un écran dense, distinguer "ajouter de la couleur" de "créer de la hiérarchie", vérifier qu'une hiérarchie tient en niveaux de gris avant de l'habiller]
prerequis: [b08-culture-visuelle-veille]
next: b10-mouvement-micro-interactions
tribuzen: FamilyDashboard hiérarchisé en niveaux de gris, preuve que la lisibilité ne dépend pas de la couleur
last-reviewed: 2026-10
---

# Hiérarchie visuelle appliquée à l'écran — poids, taille, contraste

> **Outcomes — tu sauras FAIRE :** construire une hiérarchie visuelle lisible sans aucune
> couleur, identifier le point focal d'un écran dense en moins de 2 secondes de regard,
> distinguer l'ajout de couleur de la création de hiérarchie, et vérifier qu'une mise en page
> tient en niveaux de gris avant même de penser à la palette.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le `FamilyDashboard` de TribuZen affiche, sur un même écran, le statut des routines du jour,
la liste des enfants, un résumé de la gazette et des alertes éventuelles. Si on demande
"qu'est-ce que je dois regarder en premier en ouvrant cet écran ?", la réponse honnête
aujourd'hui dépend surtout de la couleur : l'alerte rouge saute aux yeux, le reste suit au
hasard de la disposition.

Le problème : si deux alertes existent en même temps, ou si l'écran est consulté par un
utilisateur daltonien (le rouge/vert est la confusion la plus fréquente), ou si l'écran est
exporté en PDF noir et blanc pour un compte-rendu, la hiérarchie s'effondre — elle n'existait
que PAR la couleur, jamais indépendamment d'elle. Ce module construit une hiérarchie qui tient
déjà debout avant que la couleur n'entre en jeu.

## 2. Théorie complète, concise

### 2.1 Trois leviers de hiérarchie qui n'ont rien à voir avec la couleur

- **La taille.** Ce qui est grand est vu en premier, structurellement, avant toute
  interprétation du contenu. Un titre à 32px domine un corps de texte à 14px quelle que soit
  leur couleur respective.
- **Le poids / le contraste de valeur.** Une forme sombre et épaisse (texte en gras, bloc
  plein) domine une forme claire et fine (texte léger, contour fin) — c'est un contraste de
  LUMINANCE (clair/sombre), pas de teinte (rouge/bleu). Une interface entièrement en niveaux
  de gris peut avoir une hiérarchie de poids parfaitement lisible.
- **L'espace.** Un élément isolé par du vide autour de lui attire l'attention plus qu'un
  élément collé à dix autres — c'est une application directe de la loi de clôture/figure-fond
  déjà vue en [[b04-gestalt]] (un élément qui se détache nettement du fond est lu comme la
  figure, le reste comme le fond).

### 2.2 Le point focal : une hiérarchie a UNE entrée, pas plusieurs

Une hiérarchie visuelle réussie dirige l'œil vers UN point d'entrée clair — le **point
focal** (déjà nommé en b04) — avant de laisser l'œil explorer le reste dans un ordre
secondaire. Un écran où trois éléments sont traités avec la même taille, le même poids et la
même isolation n'a pas de hiérarchie : il a trois points focaux qui se neutralisent, et l'œil
ne sait pas où commencer.

Ce n'est pas qu'un seul élément doive dominer tout l'écran en permanence — c'est que, À UN
INSTANT DONNÉ (un état de l'interface), un seul élément doit porter le poids maximal. Sur le
`FamilyDashboard`, si une alerte existe, elle doit être LE point focal de cet état précis ; en
l'absence d'alerte, le point focal peut légitimement redevenir le résumé des routines du jour.

### 2.3 L'épreuve de vérité : la hiérarchie tient-elle en niveaux de gris ?

Méthode de vérification directe : désaturer entièrement une maquette (ou la concevoir
directement en niveaux de gris, comme ce module le demande). Si la hiérarchie reste lisible —
on identifie toujours le point focal, on distingue toujours les niveaux d'importance — alors
elle repose sur la taille/le poids/l'espace, pas sur la couleur. Si elle s'effondre en gris,
elle n'était pas une hiérarchie visuelle : c'était un codage couleur déguisé en hiérarchie.

Cette épreuve a trois justifications concrètes, pas seulement esthétiques :
1. **Accessibilité** : un utilisateur daltonien (environ 8% des hommes pour le
   rouge-vert) vit en permanence dans cette version désaturée.
2. **Contexte technique** : un export PDF en N&B, un écran mal calibré, une impression — la
   couleur n'est jamais garantie de passer intacte.
3. **Discipline de conception** : construire la hiérarchie en gris D'ABORD force à résoudre le
   vrai problème (taille/poids/espace) avant de se réfugier dans "je mets du rouge et ça se
   verra" — un réflexe qui masque une hiérarchie non pensée plutôt que de la résoudre.

### 2.4 Pourquoi la couleur vient ENSUITE, jamais à la place

La couleur a un vrai rôle — accélérer la reconnaissance d'un statut déjà connu (le rouge
"confirme" l'alerte déjà visible par sa taille/poids/isolement), ou distinguer des catégories
à égalité de hiérarchie (voir [[b02-theorie-couleur]] sur les harmonies). Mais la couleur ne
peut pas CRÉER une hiérarchie qui n'existe pas structurellement : elle la renforce ou elle ne
fait que la décorer sans effet réel.

## 3. Worked examples

### Exemple A — `FamilyDashboard` hiérarchisé sans couleur, avec une alerte active

1. Identifier le point focal de l'état "une alerte existe" : l'alerte devient l'élément le
   plus grand ET le plus sombre/épais de l'écran (taille + poids combinés), isolée par un
   espace net au-dessus du reste.
2. Le résumé des routines du jour passe en second niveau : taille intermédiaire, poids
   normal, pas isolé mais regroupé avec les éléments de même rang.
3. La liste des enfants et le résumé gazette passent en troisième niveau : taille réduite,
   poids léger, densité plus élevée (ils peuvent être proches les uns des autres car ils sont
   au même rang — cohérent avec la loi de proximité de b04).
4. Vérification : en photographiant l'écran en gris pur, un regard de 2 secondes doit encore
   aller d'abord vers l'alerte, puis vers le résumé de routines, jamais vers la liste
   d'enfants en premier.

### Exemple B — le même dashboard SANS alerte

Sans alerte active, le point focal légitime redevient le résumé des routines du jour (c'est
l'information la plus actionnable pour l'utilisateur à ce moment). La hiérarchie n'est donc
pas figée sur UN élément pour toujours : elle réagit à l'état réel de l'écran — ce qui
suppose d'avoir pensé, dès la maquette, à quoi ressemble CHAQUE état, pas seulement le plus
spectaculaire (l'alerte).

## 4. Pièges & misconceptions

- **Confondre "ajouter de la couleur vive" et "créer de la hiérarchie".** Une interface très
  colorée sans différence de taille/poids/espace entre ses éléments reste confuse — la
  couleur attire l'œil une fraction de seconde mais ne dit rien sur l'ORDRE d'importance une
  fois le premier regard passé.

- **Donner la même importance visuelle à tout, par peur de "hiérarchiser à tort".** Le risque
  inverse existe : vouloir rester neutre produit un écran plat où rien ne guide le regard —
  l'absence de hiérarchie est aussi un problème que l'excès de hiérarchie.

- **Fixer un seul point focal pour tous les états de l'écran.** Voir Exemple B — le point
  focal légitime change selon l'état réel des données, pas selon l'élément qu'on a trouvé le
  plus intéressant à designer.

- **Ne tester la hiérarchie qu'en couleur.** Sans l'épreuve des niveaux de gris (2.3), une
  hiérarchie peut sembler fonctionner à l'écran alors qu'elle ne tient que par un codage
  couleur fragile.

## 5. Ancrage TribuZen

- Le `FamilyDashboard` doit être repensé pour chaque état réel (avec alerte, sans alerte,
  avec plusieurs enfants, avec un seul) avec un point focal qui change légitimement selon
  l'état, jamais figé par habitude de conception.
- L'épreuve des niveaux de gris devient un réflexe de vérification à appliquer à tout nouvel
  écran dense de TribuZen avant de considérer la maquette terminée.
- Le pont avec b02 (théorie couleur) se clarifie : la palette sauge/terracotta choisit QUELLES
  couleurs, ce module décide QUAND la couleur a quelque chose à renforcer.

## 6. Points clés

1. Trois leviers de hiérarchie ne dépendent pas de la couleur : la taille, le poids/contraste
   de luminance, et l'espace/isolement.
2. Un écran a un point focal unique à un instant donné — plusieurs éléments à poids égal se
   neutralisent et l'œil ne sait pas où commencer.
3. L'épreuve de vérité d'une hiérarchie est de la désaturer : si elle s'effondre en niveaux de
   gris, elle reposait sur un codage couleur, pas sur une vraie hiérarchie.
4. Le point focal légitime change selon l'état réel de l'interface (avec/sans alerte) — il
   faut l'avoir pensé pour chaque état, pas seulement le plus spectaculaire.
5. La couleur renforce une hiérarchie déjà existante structurellement ; elle ne peut pas en
   créer une à elle seule.

## 7. Seeds Anki

```
Quels sont les trois leviers de hiérarchie visuelle indépendants de la couleur ?|La taille, le poids/contraste de luminance (clair/sombre), et l'espace/isolement d'un élément
Pourquoi tester une hiérarchie en niveaux de gris ?|Si elle s'effondre sans couleur, elle reposait sur un codage couleur fragile plutôt que sur une vraie hiérarchie structurelle (accessibilité daltonisme, export N&B, discipline de conception)
Qu'est-ce qu'un point focal, et pourquoi un écran ne doit en avoir qu'un à la fois ?|L'élément qui porte le poids maximal d'attention à un instant donné — plusieurs points focaux à poids égal neutralisent l'ordre de lecture
Le point focal d'un écran doit-il toujours être le même élément ?|Non — il doit correspondre à l'état réel des données (ex. une alerte devient le point focal seulement quand elle existe)
La couleur peut-elle créer une hiérarchie à elle seule ?|Non — elle renforce une hiérarchie déjà construite par la taille/le poids/l'espace, elle ne la remplace pas
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b09-hierarchie-visuelle/`. Tu y hiérarchises le
> `FamilyDashboard` TribuZen en niveaux de gris uniquement — brief complet et rubrique de
> vérification dans le README du lab.
