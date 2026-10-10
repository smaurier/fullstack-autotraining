---
titre: Écrire une étude de cas — structurer un récit de portfolio
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [structure problème/contraintes/décision/résultat/enseignement, étude de cas vs galerie d'images, enseignement comme étape la plus crédible, contrainte ou compromis assumé par écrit]
outcomes: [structurer un projet en récit problème-contraintes-décision-résultat-enseignement, distinguer une étude de cas d'une simple galerie d'écrans, nommer par écrit au moins une contrainte réelle ou un compromis assumé plutôt qu'un succès lisse]
prerequis: [a11-design-ops-handoff]
next: a13-pitch-oral
tribuzen: étude de cas écrite du dossier de handoff produit au module A11, au format récit de portfolio réutilisable
last-reviewed: 2026-10
---

# Écrire une étude de cas — structurer un récit de portfolio

> **Outcomes — tu sauras FAIRE :** structurer un projet en récit problème-contraintes-
> décision-résultat-enseignement, distinguer une étude de cas d'une simple galerie d'écrans,
> et nommer par écrit au moins une contrainte réelle ou un compromis assumé plutôt qu'un
> succès lisse et peu crédible.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un portfolio affiche trois écrans de `RoutineCard` côte à côte, avec la légende "Refonte du
composant RoutineCard pour TribuZen." Visuellement correct, mais un recruteur qui lit ça ne
sait RIEN du raisonnement : pourquoi ce composant a-t-il été retravaillé, quelles contraintes
ont pesé sur les décisions prises, qu'est-ce qui a été essayé puis abandonné. Sans ce récit,
les trois écrans ne prouvent qu'une compétence esthétique — jamais une compétence de
résolution de problème, qui est pourtant ce qu'un poste de design attend réellement.

Le dossier de handoff produit au module A11 contient déjà toute la matière première
(contraintes, décisions, tokens, états) — ce module ne rajoute pas de travail de design, il
transforme cette matière en un récit lisible par quelqu'un qui n'a jamais vu le produit.

## 2. Théorie complète, concise

### 2.1 La structure en cinq étapes, toujours dans cet ordre

- **Problème** : quel besoin utilisateur ou quel dysfonctionnement a motivé ce travail — pas
  une liste de features, un vrai problème (cf. module A01, discovery).
- **Contraintes** : qu'est-ce qui a limité les options possibles (temps, technique, contrainte
  d'accessibilité, cohérence avec un système existant) — une étude de cas sans contrainte
  nommée laisse croire que tout était possible, ce qui n'est jamais crédible.
- **Décision** : quel choix a été fait, et pourquoi CE choix plutôt qu'une autre option
  envisagée — la décision doit être justifiée, pas seulement décrite.
- **Résultat** : ce qui a été livré concrètement (écrans, composant, prototype) — c'est la
  seule étape où les images comptent, et elles arrivent ici, pas en ouverture du récit.
- **Enseignement** : ce que ce projet a appris, ce qui serait fait différemment aujourd'hui —
  l'étape la plus souvent oubliée, et la plus crédible aux yeux d'un recruteur expérimenté,
  parce qu'elle prouve une capacité de recul plutôt qu'une simple exécution.

### 2.2 Étude de cas vs galerie d'images — ce qui distingue les deux

Une galerie d'images montre un RÉSULTAT. Une étude de cas prouve un PROCESS et un
raisonnement derrière ce résultat. Les deux peuvent utiliser exactement les mêmes écrans
finaux — la différence tient entièrement au texte qui les entoure : sans les quatre autres
étapes (problème, contraintes, décision, enseignement), même le plus beau résultat reste une
image isolée qu'on ne peut pas évaluer professionnellement.

### 2.3 Pourquoi l'enseignement est l'étape la plus crédible

Un succès présenté comme parfait, sans aucune contrainte ni compromis mentionné, sonne faux
pour quiconque a l'expérience réelle du métier — aucun projet ne se déroule sans aucune
contrainte. À l'inverse, nommer explicitement ce qui serait fait différemment aujourd'hui
prouve une vraie capacité de recul critique sur son propre travail, une compétence que peu de
candidats démontrent par écrit alors qu'elle est directement transférable à n'importe quel
futur poste.

## 3. Worked examples

### Exemple A — transformer le handoff de `RoutineCard` (module A11) en étude de cas

1. **Problème** : les parents utilisateurs de TribuZen perdaient le fil de la progression des
   routines du matin, le composant existant n'affichait que le nom de la routine sans son
   statut.
2. **Contraintes** : le composant devait rester lisible même avec 4-5 routines affichées côte
   à côte sur un écran mobile étroit, et respecter la palette sauge/terracotta déjà posée par
   `design.md` sans introduire de nouvelle couleur.
3. **Décision** : ajout d'un indicateur d'état visuel compact (coché/en retard) plutôt qu'un
   badge textuel, pour rester lisible à petite taille — décision justifiée par un test
   d'encombrement visuel sur mobile, pas par préférence esthétique seule.
4. **Résultat** : le composant `RoutineCard` tel que documenté dans le dossier de handoff du
   module A11, avec ses états défaut/hover/complété/en retard.
5. **Enseignement** : l'état "en retard" n'avait pas été anticipé dès le premier jet — ajouté
   après coup, ce qui a complexifié rétroactivement le token de couleur d'alerte ; aujourd'hui,
   lister tous les états possibles AVANT de choisir une palette éviterait cette reprise.

### Exemple B — reconnaître une étude de cas incomplète

Une étude de cas qui saute directement de "Problème" à "Résultat", sans jamais mentionner de
contrainte ni de décision argumentée, ressemble à une affirmation ("j'ai résolu ce problème")
plutôt qu'à une preuve. Un recruteur expérimenté repère immédiatement l'absence de
raisonnement explicite — la correction n'est pas d'ajouter plus d'images, mais d'écrire les
deux étapes manquantes.

## 4. Pièges & misconceptions

- **Ne mentionner que les succès, jamais une contrainte réelle.** Ça sonne faux et peu
  crédible — un vrai projet comporte toujours au moins une limite ou un compromis, le taire
  n'aide pas, il affaiblit la crédibilité du récit entier.

- **Sauter l'étape "Enseignement" parce qu'elle semble optionnelle.** C'est l'étape la plus
  différenciante aux yeux d'un recruteur expérimenté — l'omettre revient à cacher exactement
  la preuve de recul qui distingue un profil junior d'un profil senior.

- **Présenter le résultat en ouverture du récit.** Les images doivent arriver après le
  problème, les contraintes et la décision — les montrer en premier invite le lecteur à juger
  l'esthétique avant de comprendre le raisonnement.

- **Confondre "décrire une décision" et "justifier une décision".** "J'ai choisi un indicateur
  visuel compact" décrit ; "j'ai choisi un indicateur visuel compact parce que les badges
  textuels devenaient illisibles à 4-5 routines sur mobile" justifie — seule la seconde forme
  prouve un raisonnement.

## 5. Ancrage TribuZen

- Le dossier de handoff du module A11 devient directement la matière première de cette étude
  de cas — aucun nouveau travail de design, seulement une mise en récit.
- Cette étude de cas, une fois écrite, est directement réutilisable sur un profil public
  (portfolio, LinkedIn) sans retouche supplémentaire.
- Le pont avec le module suivant (A13, pitch oral) est direct : le récit écrit ici devient la
  base du pitch à défendre à voix haute.

## 6. Points clés

1. La structure d'une étude de cas suit toujours cinq étapes dans cet ordre : problème,
   contraintes, décision, résultat, enseignement.
2. Une galerie d'images montre un résultat ; une étude de cas prouve un raisonnement — la
   différence tient au texte qui entoure les mêmes images.
3. Taire toute contrainte ou tout compromis rend un récit moins crédible, pas plus impressionnant.
4. L'étape "Enseignement" est la plus souvent oubliée et la plus différenciante aux yeux d'un
   recruteur expérimenté.
5. "Décrire" une décision et "justifier" une décision sont deux actes différents — seule la
   justification prouve un raisonnement.

## 7. Seeds Anki

```
Quelles sont les cinq étapes d'une étude de cas, dans l'ordre ?|Problème, contraintes, décision, résultat, enseignement — toujours dans cet ordre, le résultat n'arrive jamais en premier
Qu'est-ce qui distingue une étude de cas d'une galerie d'images ?|Les mêmes images peuvent servir aux deux ; seule l'étude de cas ajoute le texte qui prouve le raisonnement (problème, contraintes, décision, enseignement)
Pourquoi l'étape "Enseignement" est-elle la plus crédible aux yeux d'un recruteur ?|Elle prouve une capacité de recul critique sur son propre travail, une compétence rarement démontrée par écrit alors qu'elle est directement transférable
Pourquoi ne jamais présenter uniquement des succès sans aucune contrainte dans une étude de cas ?|Ça sonne faux pour quiconque a l'expérience réelle du métier — aucun projet ne se déroule sans aucune contrainte, la taire affaiblit la crédibilité
Quelle est la différence entre décrire une décision et la justifier ?|Décrire dit CE qui a été choisi ; justifier dit POURQUOI ce choix plutôt qu'une autre option — seule la justification prouve un raisonnement
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a12-etude-de-cas-ecrite/`. Tu y transformes le dossier
> de handoff du module A11 en récit complet de portfolio, avec au moins une contrainte ou un
> compromis réel assumé — brief complet et rubrique de vérification dans le README du lab.
