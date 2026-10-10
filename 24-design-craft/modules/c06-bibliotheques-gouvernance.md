---
titre: Bibliothèques partagées & gouvernance de fichiers
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [bibliothèque Figma team library, instance liée vs copie détachée, publication de bibliothèque, un système / plusieurs fichiers consommateurs, pollution d'une bibliothèque par une exception locale]
outcomes: [organiser un projet en une bibliothèque de composants publiée et des fichiers de travail qui la consomment, publier une mise à jour de composant et vérifier sa propagation, reconnaître et éviter la duplication manuelle de composants entre fichiers]
prerequis: [c05-dev-mode-handoff]
next: c07-pont-figma-code
tribuzen: structurer TribuZen en une bibliothèque de composants (Button, RoutineCard, tokens) consommée par les fichiers de travail (flows, écrans), jamais l'inverse
last-reviewed: 2026-10
---

# Bibliothèques partagées & gouvernance de fichiers

> **Outcomes — tu sauras FAIRE :** organiser un projet Figma en une bibliothèque de
> composants publiée consommée par des fichiers de travail séparés, publier une mise à jour
> de composant et vérifier qu'elle se propage réellement, et reconnaître le moment où une
> duplication manuelle de composants recrée le problème que tout le Bloc C a essayé de
> résoudre depuis le module C02.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Après les modules C01 à C05, TribuZen a un `Button` en variants, un `RoutineCard` en
auto-layout, des styles/tokens de couleur et de texte, un prototype cliquable, et un fichier
préparé pour Dev Mode. Tout ça vit, pour l'instant, probablement dans **un seul fichier**
— ou pire, dispersé dans plusieurs fichiers qui ont chacun leur propre copie du `Button`,
recopiée à la main chaque fois qu'un nouvel écran en avait besoin.

Le problème arrive au premier changement : la couleur d'accent du `Button` doit évoluer
(cf. module B02, extension de la palette pour un état d'erreur). Si trois fichiers ont
chacun leur propre copie du `Button`, la mise à jour doit être refaite trois fois, à la main,
avec un risque réel d'en oublier une — exactement le problème qu'un design system en code
(cours 06, Tailwind/shadcn) résout par un composant unique importé partout. Ce module
transpose la même discipline côté Figma : **une source, plusieurs consommateurs**.

## 2. Théorie complète, concise

### 2.1 Bibliothèque Figma (team library) : un fichier source publié

Une **bibliothèque** est un fichier Figma ordinaire, à une différence près : il peut être
**publié**. La publication rend ses composants et styles disponibles dans le panneau
"Assets" de n'importe quel autre fichier du même espace de travail, via "insert from
library". Quand un composant de la bibliothèque est inséré dans un autre fichier, Figma crée
une **instance liée** — pas une copie indépendante.

### 2.2 Instance liée vs copie détachée : la distinction qui fait tout fonctionner

- **Instance liée** : reste connectée à son composant principal dans la bibliothèque source.
  Toute mise à jour publiée du composant principal se propage à l'instance (après
  acceptation de la mise à jour côté fichier consommateur).
- **Copie détachée** (`Detach instance` dans Figma, ou un simple copier-coller d'un calque
  qui n'est pas une instance) : devient un objet autonome, plus aucun lien avec la
  bibliothèque. Toute mise à jour future du composant source ne l'affectera JAMAIS.

Le piège le plus coûteux du module : détacher une instance "pour la modifier plus
librement" puis oublier qu'elle est devenue orpheline — elle survit visuellement identique
au composant source jusqu'au jour où ce dernier change, et là elle dérive silencieusement.

### 2.3 Le flux de publication : un geste explicite, pas un synchro continue

Modifier un composant DANS le fichier bibliothèque ne met PAS à jour les fichiers
consommateurs en temps réel. Il faut :
1. Modifier le composant principal dans le fichier bibliothèque.
2. **Publier** la bibliothèque (bouton dédié, avec un résumé des changements, comme un commit).
3. Dans chaque fichier consommateur, Figma signale qu'une mise à jour est disponible — elle
   doit être explicitement **acceptée** (comme un `git pull` après un `git push` ailleurs).

Cette latence volontaire est une protection : elle évite qu'une modification en cours de
travail (pas encore finalisée) ne casse tous les fichiers consommateurs en direct.

### 2.4 Gouvernance : une bibliothèque de vérité, plusieurs fichiers de travail

La règle structurante de ce module : **UN fichier porte le système (la bibliothèque),
PLUSIEURS fichiers de travail le consomment**. Jamais l'inverse. Concrètement pour TribuZen :

```
tribuzen-design-system.fig   (bibliothèque, publiée)
├── Button (composant + variants)
├── RoutineCard (composant)
├── Styles couleur (sauge/terracotta/blanc chaud)
└── Styles texte (Fraunces/Inter)

tribuzen-ecrans-famille.fig  (fichier de travail, consomme la bibliothèque)
tribuzen-ecrans-routines.fig (fichier de travail, consomme la bibliothèque)
tribuzen-capstone-gpu.fig    (fichier de travail, consomme la bibliothèque)
```

Chaque fichier de travail insère des INSTANCES depuis `tribuzen-design-system.fig` — aucun
d'eux ne possède sa propre copie du `Button`.

### 2.5 Le piège du besoin ponctuel : ne jamais travailler directement dans la bibliothèque

Un besoin spécifique à UN seul fichier de travail (ex. un `Button` légèrement différent pour
un seul écran très particulier du capstone) ne doit JAMAIS être codé en modifiant le composant
dans le fichier bibliothèque "parce que c'est plus simple". Ça pollue le système partagé
avec une exception locale qui affectera TOUS les consommateurs à la prochaine publication.
La bonne réponse : soit créer une variante dédiée dans la bibliothèque (si le besoin est
réellement généralisable), soit accepter une instance détachée documentée comme exception
locale ASSUMÉE dans ce seul fichier (jamais silencieuse).

## 3. Worked examples

### Exemple A — réorganiser TribuZen en bibliothèque + fichier de travail

1. Créer (ou désigner) un fichier `tribuzen-design-system.fig` contenant les composants déjà
   produits en C01-C05 : `Button` (variants), `RoutineCard` (auto-layout), styles couleur et
   texte.
2. Publier ce fichier comme bibliothèque (résumé de publication : "Design system TribuZen v1
   — Button, RoutineCard, styles couleur/texte").
3. Dans un fichier de travail séparé, insérer ces composants depuis le panneau Assets — ils
   apparaissent comme instances liées, reconnaissables par leur icône de composant dans le
   panneau calques.
4. Vérifier le lien : sélectionner une instance dans le fichier de travail, Figma doit
   proposer "Go to main component" et pointer vers le fichier bibliothèque.

### Exemple B — publier une mise à jour et vérifier sa propagation

1. Dans `tribuzen-design-system.fig`, modifier la couleur d'accent du `Button` (ex. ajouter
   la variante d'erreur rouge-brique du module B02).
2. Publier la bibliothèque avec un résumé explicite du changement.
3. Ouvrir le fichier de travail : Figma affiche une pastille de mise à jour disponible sur
   le panneau Assets ou directement sur les instances concernées.
4. Accepter la mise à jour — vérifier que TOUTES les instances du `Button` dans ce fichier de
   travail reflètent le changement, sans avoir touché une seule instance à la main.
5. Contre-exemple pédagogique volontaire : détacher UNE instance avant la publication, répéter
   l'étape 4, constater qu'elle seule reste inchangée — preuve visuelle de ce que "détacher"
   signifie réellement.

## 4. Pièges & misconceptions

- **Détacher une instance "pour aller plus vite" sans noter que c'est désormais une
  exception.** Elle dérive silencieusement à la prochaine mise à jour du composant source —
  voir 2.2 et le contre-exemple de l'Exemple B.

- **Modifier un composant directement dans un fichier de travail en pensant que ça "remonte"
  à la bibliothèque.** Le sens de la synchronisation est bibliothèque → consommateurs, jamais
  l'inverse — un fichier de travail ne peut pas modifier la source.

- **Travailler dans le fichier bibliothèque pour un besoin ponctuel d'un seul projet** (voir
  2.5) — ça propage une exception locale à tous les consommateurs à la prochaine publication.

- **Publier sans résumé de changement explicite.** Un historique de publications vides de
  sens ("update", "fix") rend impossible de savoir, six mois plus tard, pourquoi une mise à
  jour a été acceptée ou refusée dans un fichier de travail donné.

## 5. Ancrage TribuZen

- La bibliothèque `tribuzen-design-system.fig` devient la source de vérité unique pour tout
  nouveau composant produit dans les labs suivants (C07 à C09, et au-delà) — plus aucun
  composant ne doit être recréé localement dans un fichier de travail.
- Toute extension future de palette ou de composant (ex. l'état d'erreur du module B02, ou
  un composant du capstone) suit désormais ce flux : modification dans la bibliothèque,
  publication avec résumé, acceptation explicite dans chaque fichier de travail concerné.
- Cette organisation prépare directement le module C07 (pont Figma ↔ code) : une bibliothèque
  propre et publiée est plus facile à scripter/exporter qu'un ensemble de fichiers dispersés
  avec des copies divergentes.

## 6. Points clés

1. Une bibliothèque Figma publiée transforme un composant inséré ailleurs en instance LIÉE,
   pas en copie — c'est ce lien qui permet la propagation des mises à jour.
2. Détacher une instance la rend définitivement sourde à toute future mise à jour du
   composant source — à documenter explicitement si c'est une exception assumée.
3. La publication est un geste explicite (comme un commit), pas une synchronisation continue
   — chaque fichier consommateur doit accepter la mise à jour.
4. Gouvernance = une bibliothèque de vérité, plusieurs fichiers de travail consommateurs —
   jamais l'inverse, jamais de copie manuelle dupliquée entre fichiers.
5. Un besoin ponctuel d'un seul fichier ne justifie jamais de modifier directement la
   bibliothèque partagée — soit une vraie variante généralisable, soit une exception locale
   documentée.

## 7. Seeds Anki

```
Quelle est la différence entre une instance liée et une copie détachée dans Figma ?|L'instance liée reste connectée au composant principal et reçoit ses mises à jour publiées ; la copie détachée devient autonome et ne recevra plus jamais de mise à jour
Que se passe-t-il quand on modifie un composant dans le fichier bibliothèque ?|Rien d'automatique pour les consommateurs — il faut explicitement PUBLIER la bibliothèque, puis chaque fichier consommateur doit ACCEPTER la mise à jour
Pourquoi ne jamais modifier directement un composant dans le fichier bibliothèque pour un besoin ponctuel d'un seul projet ?|Ça propage l'exception locale à TOUS les fichiers consommateurs à la prochaine publication, polluant le système partagé
Quelle est la règle de gouvernance centrale de ce module ?|Une bibliothèque de vérité qui porte le système, plusieurs fichiers de travail qui la consomment — jamais l'inverse, jamais de duplication manuelle
Comment vérifier qu'une instance est bien liée à son composant source ?|La sélectionner et utiliser "Go to main component" — si le lien existe, Figma pointe vers le composant dans le fichier bibliothèque
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c06-bibliotheques-gouvernance/`. Tu y réorganises les
> fichiers Figma produits en C01-C05 en une bibliothèque publiée + un fichier de travail
> consommateur, puis tu publies une vraie mise à jour et vérifies sa propagation — brief
> complet et rubrique de vérification dans le README du lab.
