---
titre: Le cycle de vie d'une maquette en équipe
cours: 24-design-craft
bloc: H — Design produit (éditeur logiciel)
notions: [la maquette comme spécification datée, critères d'acceptation côté design, découpage et chiffrage d'un chantier design, revue vs critique, arbitrage avec un responsable produit, demandes contradictoires tracées, source de vérité maquette ou code]
outcomes: [écrire des critères d'acceptation qui rendent une revue de design vérifiable, chiffrer un chantier design en deux versions, tracer par écrit l'arbitrage de deux demandes contradictoires, définir la source de vérité d'un composant]
prerequis: [h05-parcours-long-saas, a11-design-ops-handoff, a10-design-critique]
next: ""
tribuzen: fil rouge « Nahual 2D » — ticket de design complet du design system et convention écrite de source de vérité (maquette ou code, par objet)
last-reviewed: 2026-10
---

# Le cycle de vie d'une maquette en équipe

> **Outcomes — tu sauras FAIRE :** écrire des critères d'acceptation qui rendent une revue de
> design vérifiable, chiffrer un chantier en deux versions, tracer par écrit l'arbitrage de
> deux demandes contradictoires, et définir la source de vérité d'un composant.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le module A11 traite le handoff : comment transmettre une maquette au développement. Le
module A10 traite la critique : comment améliorer un travail en cours. Entre les deux, il
manque toute la vie sociale et politique d'une maquette dans une équipe produit, et c'est là
que se joue la différence entre quelqu'un qui dessine bien et quelqu'un sur qui on compte.

Le symptôme le plus courant, dans n'importe quelle équipe : deux maquettes du même écran
existent, aucune n'est marquée obsolète, et un développeur implémente la mauvaise. Personne
n'a mal travaillé. Il manquait simplement une discipline de cycle de vie — datation,
critères, arbitrage tracé, source de vérité.

## 2. Théorie complète, concise

### 2.1 Une maquette est une spécification, donc elle est datée et périssable

Trois conséquences qu'il faut assumer dès la première maquette :

- **Elle porte une date et une version.** Sans ça, impossible de savoir laquelle est vraie.
- **Elle porte un statut** : en cours, en revue, validée, implémentée, obsolète. Une maquette
  validée n'est pas une maquette implémentée : l'écart entre les deux est normal et doit être
  visible.
- **Elle est marquée obsolète explicitement** quand elle est remplacée. Ne pas la supprimer
  (l'historique a de la valeur) mais ne jamais la laisser lisible comme si elle était vraie.

La pire pathologie n'est pas la maquette fausse, c'est la maquette **ambiguë** : celle dont
personne ne peut dire si elle décrit le produit actuel, le produit souhaité ou une idée
abandonnée.

### 2.2 Les critères d'acceptation côté design

Sans critères écrits, une revue de design devient une conversation de goût, et le travail est
jugé par la personne la plus insistante de la réunion. Avec critères, la revue devient
vérifiable.

Un critère d'acceptation de design est une affirmation qu'on peut déclarer vraie ou fausse :

```
Mauvais critère  : "l'écran est clair et moderne"
Bons critères    :
- Tous les états de la matrice marqués M sont maquettés (H03).
- Aucun nouveau composant n'est créé ; les composants réutilisés sont nommés.
- Le contraste de tous les textes est mesuré et conforme (A06).
- Le texte le plus long réel du jeu de données est présent dans la maquette.
- La variante du profil le moins doté est fournie (H04).
- Ce qui n'est pas touché est listé avec sa raison (H01).
```

Chacun de ces critères est opposable. C'est exactement le même esprit que le modèle d'oracle
de ce cours : rubrique objective d'abord, revue qualitative ensuite — jamais « j'aime / je
n'aime pas ».

### 2.3 Découper et chiffrer un chantier de design

Un chantier de design se découpe comme un chantier de code : par unité livrable et
vérifiable. Unités typiques : un écran, un composant, une matrice d'états, un parcours, une
déclinaison de thème.

Et il se **chiffre**. Savoir dire « ça, c'est trois jours » est une compétence de métier, pas
une trahison de l'artisanat. Mieux : savoir proposer **deux versions**.

```
Demande : refondre l'écran d'historique.

Version 1 jour   : colonnes réduites et hiérarchisées, états vide et erreur, pas de
                   filtres nouveaux. Résout la lisibilité.
Version 4 jours  : + filtres à facettes, colonnes configurables persistées, matrice
                   d'états complète, variantes de droits. Résout la lisibilité ET
                   l'exploration.
Ce que la V4 apporte que la V1 n'apporte pas : la consultation par enfant sur une
période, qui est le besoin exprimé dans 3 demandes de support.
```

Présenter ces deux versions déplace la conversation : elle ne porte plus sur ton temps mais
sur ce que l'équipe veut acheter. C'est la position la plus solide qu'un designer puisse
occuper dans un arbitrage.

### 2.4 Revue et critique sont deux rituels distincts

| | Critique (A10) | Revue (ce module) |
|---|---|---|
| But | Améliorer un travail en cours | Décider si ça passe |
| Moment | Pendant la conception | À la fin |
| Posture | Explorer, proposer, douter | Vérifier contre des critères |
| Sortie | Des pistes | Une décision : validé, à corriger, refusé |

Les mélanger dans la même réunion produit le pire des deux : on rouvre la conception au
moment de décider, et on décide à partir d'idées non travaillées. La règle pratique : si
quelqu'un propose une nouvelle idée en revue, elle est notée comme sujet séparé, pas traitée
sur place.

### 2.5 Arbitrer, et encaisser deux demandes contradictoires

Deux interlocuteurs demandent l'inverse l'un de l'autre : l'un veut plus d'informations à
l'écran, l'autre veut simplifier. C'est une situation normale, pas un dysfonctionnement.

La méthode, en quatre temps :

1. **Ramener au problème utilisateur** (A01) et aux critères de succès. Souvent, l'un des deux
   ne répond à aucun problème nommé, et la contradiction se dissout.
2. **Expliciter le coût de chaque option**, par écrit, sans plaidoyer.
3. **Faire trancher par celui qui en a l'autorité.** Un designer éclaire un arbitrage ; il ne
   s'arroge pas une décision de produit qui ne lui appartient pas.
4. **Tracer la décision par écrit**, avec sa date, son auteur et sa raison.

Ce qui est interdit : **arbitrer en silence dans la maquette**. Choisir discrètement le camp
de l'un des deux et livrer, c'est prendre une décision de produit sans mandat et sans trace.
Trois mois plus tard, personne ne saura pourquoi l'écran est comme ça, et la discussion
recommencera de zéro.

### 2.6 La source de vérité : la question qui coûte le plus cher quand elle n'est pas tranchée

Quand la maquette et le produit en production divergent, lequel a raison ? La réponse doit
être écrite une fois pour toutes, et elle n'est pas la même partout :

- **Pour un composant du design system** : le code est généralement la source de vérité, car
  c'est lui qui est livré, testé et versionné. La maquette décrit alors l'intention, et toute
  divergence constatée est soit un bug, soit une évolution à demander.
- **Pour un écran ou un parcours** : la maquette validée est généralement la source de vérité,
  car elle porte des décisions que le code ne documente pas.
- **Pour les valeurs de base** (couleurs, espacements, typographie) : une seule source,
  idéalement générée dans les deux sens (c'est le sujet du pont tokens, modules C03 et F04).

Ce qui compte n'est pas de choisir la même réponse que tout le monde : c'est que la réponse
soit **écrite et connue**. L'ambiguïté sur ce point produit des semaines de travail perdu, des
corrections qui se contredisent, et des conversations sans fin sur qui a tort.

## 3. Worked examples

### Exemple A — un ticket de design complet

```
TITRE
Historique des routines : rendre la semaine passée consultable par enfant

PROBLÈME (A01)
Un parent qui veut comprendre ce qui s'est mal passé doit ouvrir chaque journée une
par une. 3 demandes de support le mentionnent ce trimestre.

CRITÈRES DE SUCCÈS (A01)
- Le temps pour répondre à "comment s'est passée la semaine de X" passe sous 30 s
  (base de référence actuelle : 2 min 10, mesurée sur une personne — G05).

PÉRIMÈTRE
Inclus   : l'écran d'historique, ses filtres, ses états.
Exclu    : la gazette, le dashboard, le style du tableau (précédent cohérent sur
           3 écrans, voir H01).

CRITÈRES D'ACCEPTATION (DESIGN)
- Les 5 colonnes retenues sont justifiées, les exclusions documentées (H02).
- Filtres enfant + type, filtres actifs visibles avec compteur de résultats.
- Pagination (retour à une position nécessaire, H02 §2.5).
- Toutes les cases M de la matrice d'états sont maquettées, dont :
  état vide, aucun résultat pour ces filtres, chargement, erreur, lecture seule (H03).
- Variante du profil "Invité" fournie en premier (H04).
- Contrastes mesurés et conformes (A06).
- Aucun nouveau composant ; composants réutilisés nommés (H01).
- Liste écrite de ce qui n'est pas touché, avec raisons.

CHIFFRAGE
V1 (1 j)  : colonnes + états + pagination.
V4 (4 j)  : + facettes, colonnes configurables persistées, variantes de droits.
Apport de la V4 : la consultation par enfant sur une période, qui est le besoin
exprimé dans les 3 demandes de support.

STATUT
Maquette v1 — 14/10/2026 — en revue.
```

Ce ticket est vérifiable ligne par ligne. Une revue peut dire « le critère 4 n'est pas
rempli » au lieu de « je ne suis pas convaincu ».

### Exemple B — deux demandes contradictoires, tracées

```
DEMANDE A (support) : afficher le commentaire dans le tableau, les parents le
                      cherchent.
DEMANDE B (produit) : réduire la densité du tableau, il est illisible sur petit écran.

1. RETOUR AU PROBLÈME
   A répond à un problème nommé (3 demandes de support).
   B répond à un problème nommé (illisibilité mobile constatée).
   → Les deux sont légitimes. La contradiction est réelle.

2. COÛT DE CHAQUE OPTION
   - Afficher le commentaire en colonne : longueur imprévisible, casse la grille,
     aggrave exactement le problème B.
   - Ne pas l'afficher : le besoin A reste non servi.
   - Troisième voie : un marqueur "a un commentaire" + le texte au survol et dans le
     détail de la ligne (H02 §2.2). Sert A sans aggraver B.

3. DÉCISION
   Tranchée par le responsable produit le 14/10/2026 : troisième voie retenue.

4. TRACE
   Écrite dans le ticket. Raison : sert le besoin A sans dégrader la lisibilité,
   coût inférieur aux deux options initiales.
```

Noter que la troisième voie n'a pas été inventée par autorité : elle est apparue parce que le
coût des deux options a été écrit. C'est la fonction du point 2, et c'est la valeur réelle
qu'un designer apporte dans un arbitrage.

## 4. Pièges & misconceptions

- **Une maquette sans date ni statut.** Personne ne peut dire si elle décrit l'actuel, le
  souhaité ou l'abandonné.

- **Deux versions vivantes du même écran.** Un développeur implémentera la mauvaise, et ce ne
  sera pas sa faute.

- **Des critères d'acceptation absents ou non falsifiables.** « Clair et moderne » n'est pas
  un critère ; la revue redevient une conversation de goût.

- **Mélanger revue et critique.** On rouvre la conception au moment de décider.

- **Arbitrer en silence dans la maquette.** C'est prendre une décision de produit sans mandat
  et sans trace.

- **Refuser de chiffrer.** Le chiffrage n'est pas une trahison de l'artisanat : c'est ce qui
  permet de proposer deux versions et de déplacer la conversation sur la valeur.

- **Une source de vérité implicite.** Le poste de dépense le plus invisible et le plus élevé
  d'une équipe produit.

## 5. Ancrage TribuZen

- Le ticket de l'Exemple A est à produire en entier dans le lab : il rassemble les livrables
  de H01 (non-touché), H02 (colonnes), H03 (matrice), H04 (variante la plus pauvre) et G05
  (base de référence). C'est le module de synthèse du bloc H.
- La convention de source de vérité (§2.6) est à écrire pour TribuZen et à placer dans le
  dépôt du projet, pas dans une note personnelle — elle n'a de valeur que partagée.
- L'arbitrage tracé de l'Exemple B est directement réutilisable comme modèle de décision
  écrite dans n'importe quel projet, y compris les projets personnels où l'arbitre est toi.

## 6. Points clés

1. Une maquette est une spécification : datée, versionnée, avec un statut, et marquée obsolète
   explicitement quand elle est remplacée.
2. Des critères d'acceptation falsifiables transforment une revue de goût en revue vérifiable.
3. Un chantier de design se découpe et se chiffre, et proposer deux versions déplace la
   conversation sur la valeur plutôt que sur le temps.
4. La critique améliore un travail en cours, la revue décide s'il passe — deux rituels, deux
   postures, jamais la même réunion.
5. Face à deux demandes contradictoires : ramener au problème, écrire le coût de chaque
   option, faire trancher par qui a l'autorité, tracer la décision — jamais arbitrer en
   silence dans la maquette.
6. La source de vérité (code ou maquette, selon l'objet) doit être écrite une fois pour
   toutes : son ambiguïté coûte des semaines.

## 7. Seeds Anki

```
Quels sont les trois attributs obligatoires d'une maquette traitée comme une spécification ?|Une date et une version, un statut (en cours, en revue, validée, implémentée, obsolète), et un marquage explicite d'obsolescence quand elle est remplacée
Qu'est-ce qui distingue un bon critère d'acceptation de design ?|Il est falsifiable : on peut le déclarer vrai ou faux ("toutes les cases M sont maquettées"), contrairement à "l'écran est clair et moderne"
Pourquoi proposer deux versions chiffrées d'un chantier de design ?|Ça déplace la conversation du temps passé vers la valeur achetée, et c'est la position la plus solide dans un arbitrage
Quelle est la différence entre une critique et une revue de design ?|La critique améliore un travail en cours (explorer, proposer) ; la revue décide s'il passe (vérifier contre des critères) — les mélanger rouvre la conception au moment de décider
Quels sont les quatre temps de l'arbitrage de deux demandes contradictoires ?|Ramener au problème utilisateur, écrire le coût de chaque option, faire trancher par qui a l'autorité, tracer la décision par écrit — jamais arbitrer en silence dans la maquette
Pourquoi la source de vérité doit-elle être écrite ?|Parce que quand maquette et production divergent, l'ambiguïté sur qui a raison produit des semaines de travail perdu et des corrections contradictoires
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/h06-cycle-vie-maquette/`. Tu y écris un ticket de design
> complet pour une évolution TribuZen (problème, critères de succès, périmètre, critères
> d'acceptation falsifiables, chiffrage en deux versions, statut daté), et la convention de
> source de vérité du projet — brief complet et rubrique dans le README du lab.
