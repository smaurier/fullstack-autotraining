---
titre: Concevoir dans l'existant, pas sur page blanche
cours: 24-design-craft
bloc: H — Design produit (éditeur logiciel)
notions: [inventaire avant proposition, le précédent, coût réel d'un composant de plus, dette de design, modification minimale qui résout, périmètre d'un ticket de design]
outcomes: [inventorier les motifs existants d'un produit avant de proposer quoi que ce soit, proposer la modification minimale qui résout un problème nommé, dire explicitement ce qu'on ne touche pas et pourquoi]
prerequis: [a10-design-critique, a11-design-ops-handoff]
next: h02-patterns-donnees-denses
tribuzen: fil rouge « Nahual 2D » (design system Figma du portfolio + déclinaison 2D sans WebGL) — inventaire des motifs existants de nahual.fr puis modification minimale ; calibration sur un ticket professionnel, notes de méthode hors dépôt
last-reviewed: 2026-10
---

# Concevoir dans l'existant, pas sur page blanche

> **Outcomes — tu sauras FAIRE :** inventorier les motifs déjà présents dans un produit
> avant de proposer quoi que ce soit, proposer la modification minimale qui résout le
> problème nommé, et écrire explicitement ce que tu ne touches pas et pourquoi.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Tout le bloc A du cours est construit sur un enchaînement de page blanche : un brief flou,
une discovery, un sitemap, des wireframes, un prototype. C'est l'enchaînement qu'on enseigne
dans les écoles de design, et c'est celui qui décrit le moins bien le métier réel.

Dans un éditeur logiciel, un designer produit passe l'essentiel de son temps à l'inverse :
ajouter une colonne à un écran qui existe depuis trois ans, créer un nouvel état d'un
composant utilisé dans quarante écrans, insérer une étape dans un parcours que des milliers
de personnes connaissent par cœur. La question n'est jamais « quel est le meilleur écran
possible », c'est « quel est le plus petit changement qui résout le problème sans casser
l'accord tacite passé avec les utilisateurs et avec les quarante autres écrans ».

Ce module est aussi un alignement avec une règle de travail déjà posée ailleurs dans ce
curriculum : la formation doit entraîner à **intervenir dans de l'existant**, jamais à
produire un exercice à côté. Le cours 24, tel qu'il était écrit, était le seul à ne pas
respecter cette règle.

## 2. Théorie complète, concise

### 2.1 L'inventaire avant la proposition

Le réflexe inverse de l'école : avant de dessiner, chercher si le problème est déjà résolu
quelque part dans le produit. Trois questions, dans cet ordre :

1. **Ce motif existe-t-il déjà ailleurs ?** Un écran de filtre, une confirmation
   destructive, un état vide : il y a presque toujours un précédent.
2. **Sous quel nom ?** Le nom du composant dans le design system, et le mot employé dans
   l'interface. Les deux comptent, et ils diffèrent souvent.
3. **Pourquoi a-t-il été fait comme ça ?** Une contrainte technique, une demande client, une
   décision oubliée. Supposer qu'un choix bizarre est une erreur est l'erreur la plus
   fréquente d'un nouvel arrivant.

Un inventaire prend vingt minutes et évite deux jours de travail jeté. Il produit aussi, en
passant, la carte mentale du produit que seule l'ancienneté donne d'habitude.

### 2.2 Le précédent : chaque écran engage les suivants

Dans un produit vivant, un écran n'est pas une œuvre isolée : c'est une **jurisprudence**.
Si tu résous ton écran en plaçant l'action principale à un endroit inhabituel, tu as créé un
précédent contradictoire, et le coût de cette contradiction ne se paie pas sur ton écran —
il se paie sur tous les autres, sous forme d'hésitation à chaque usage.

La conséquence pratique est dure à accepter quand on arrive avec un œil neuf : **une solution
moins bonne mais cohérente bat souvent une solution meilleure mais isolée**. Si tu estimes
que la convention existante est mauvaise, le travail juste n'est pas de la contourner sur ton
écran, c'est de la faire changer partout — donc d'ouvrir un sujet séparé, chiffré, assumé.

### 2.3 Le coût réel d'un composant de plus

Ajouter un variant au design system paraît gratuit depuis Figma. Il ne l'est pas. Le coût
réel, pour un composant partagé :

- l'implémentation en code, et ses tests ;
- la documentation, sinon personne ne saura qu'il existe ;
- les tests visuels de non-régression ;
- la traduction de ses éventuels libellés, dans toutes les langues du produit ;
- sa déclinaison dans tous les thèmes si le produit est en marque blanche ;
- et surtout, la charge mentale permanente de l'arbitrage « lequel des deux variants
  j'utilise ? » pour tous ceux qui l'utiliseront ensuite.

C'est précisément là que ton profil a un avantage réel sur un designer qui ne code pas : tu
sais ce que coûte un variant de plus, parce que tu l'as implémenté. Un designer qui connaît
le coût arbitre mieux qu'un designer qui l'ignore, et cet arbitrage est visible en réunion.

### 2.4 La dette de design : la nommer, pas la corriger en passant

Un produit ancien porte des incohérences : trois styles de bouton, deux façons d'afficher une
date, un composant abandonné encore utilisé dans six écrans. C'est de la **dette de design**,
et elle se traite comme la dette technique.

Trois réponses, à choisir explicitement :

- **Corriger dans le périmètre** — si la correction est dans l'écran qu'on touche de toute
  façon, et qu'elle ne change pas de comportement.
- **Ouvrir un sujet de dette** — si la correction dépasse l'écran : elle est tracée, chiffrée,
  priorisée ailleurs.
- **Documenter et laisser** — si la corriger maintenant coûte plus que ce qu'elle gêne.

Ce qui n'est pas une réponse : **corriger silencieusement**. Une correction non annoncée dans
un ticket est une régression pour quelqu'un d'autre — celui qui comptait sur le comportement
d'avant, ou celui qui relit la différence sans comprendre pourquoi elle est là.

### 2.5 La modification minimale qui résout

C'est le critère de sortie d'un ticket de design, et la phrase à se répéter : non pas « le
meilleur écran possible », mais **le plus petit changement qui résout le problème nommé sans
créer de précédent nouveau**.

Deux corollaires :

- **Écrire ce qu'on ne touche pas.** Un livrable de design dans l'existant contient une liste
  explicite des choses laissées en place, et pourquoi. Sans cette liste, le relecteur ne sait
  pas si une incohérence restante est un oubli ou une décision.
- **Le périmètre vient du ticket**, pas de l'envie. Si le ticket demande une colonne et que
  l'écran mérite une refonte, les deux sont vrais : on livre la colonne, et on ouvre la
  refonte comme sujet séparé avec son chiffrage.

## 3. Worked examples

### Exemple A — « ajouter une colonne au tableau », traité par inventaire

Demande : afficher une information supplémentaire dans un tableau de suivi existant.

```
1. INVENTAIRE (20 min)
   - Le tableau existe-t-il ailleurs ?  Oui, même composant dans 3 écrans.
   - Combien de colonnes aujourd'hui ?  7, dont 2 déjà peu lues.
   - Y a-t-il un mécanisme de colonnes configurables ?  Non.
   - Un précédent de "colonne ajoutée" existe-t-il ?  Oui, 2 fois, par ajout simple.
   - Largeur disponible ?  Le tableau défile déjà horizontalement sur petit écran.

2. PROBLÈME REFORMULÉ (module A01)
   Pas "ajouter une colonne" mais "permettre de décider sans ouvrir le détail de chaque
   ligne" — ce qui admet plusieurs solutions.

3. OPTIONS
   a) Ajouter la 8e colonne          : suit le précédent, aggrave le défilement.
   b) Remplacer une colonne peu lue  : garde 7 colonnes, demande une décision éditoriale.
   c) Colonnes configurables         : résout pour toujours, coût très supérieur au ticket.

4. PROPOSITION : (b), avec (c) ouverte comme sujet séparé et chiffrée.

5. CE QUE JE NE TOUCHE PAS, ET POURQUOI
   - Le style du tableau : hors périmètre, et le précédent est cohérent dans 3 écrans.
   - Le tri par défaut : non demandé, et le changer modifierait l'habitude des utilisateurs.
   - La dette des 2 styles de date dans ce tableau : documentée, sujet séparé ouvert.
```

Le livrable n'est pas une maquette, c'est une maquette **plus** ce raisonnement. C'est
exactement ce qui distingue un designer produit d'un exécutant.

### Exemple B — la même demande traitée en refonte, et le chiffrage comparé

Si la même demande est traitée en « refonte de l'écran » : nouvelle hiérarchie, colonnes
configurables, filtres repensés. Résultat plausible : trois à cinq jours de conception, une
revue plus lourde, un développement bien supérieur, une re-formation des utilisateurs, et un
risque de régression sur trois écrans.

Comparé à l'option (b) : une demi-journée, aucune re-formation, aucun précédent nouveau.

La refonte n'est pas interdite — elle est peut-être même juste à terme. Ce qui est interdit,
c'est de la livrer **à la place** de ce qui était demandé, sans l'avoir chiffrée ni fait
valider. Savoir dire « voilà la version d'une demi-journée, voilà la version de quatre jours,
et voilà ce que la seconde apporte » est une compétence de métier, traitée au module H06.

## 4. Pièges & misconceptions

- **Refondre là où il fallait ajuster.** Le réflexe le plus coûteux et le plus courant quand
  on arrive avec un œil neuf sur un produit ancien.

- **Proposer sans inventaire.** On réinvente un motif qui existait, sous un autre nom, et on
  crée une incohérence de plus.

- **Supposer qu'un choix existant est une erreur.** Il a souvent une raison qui n'est pas
  écrite. La chercher fait partie du travail.

- **Introduire un nouveau composant par confort.** Le coût réel est celui du §2.3, et il est
  payé par d'autres que toi.

- **Corriger une dette hors périmètre silencieusement.** C'est une régression pour quelqu'un.

- **Ignorer le précédent.** Une solution meilleure mais isolée dégrade l'ensemble du produit.

- **Ne pas écrire ce qu'on ne touche pas.** Le relecteur ne peut alors pas distinguer un
  oubli d'une décision.

## 5. Ancrage TribuZen et pratique professionnelle

- Le lab se fait sur un écran TribuZen **existant** avec une demande d'évolution réelle : le
  but est de produire l'inventaire, la proposition minimale et la liste du non-touché.
- Un deuxième exercice, à faire dans ton contexte professionnel, vaut plus que n'importe quel
  lab : prendre un ticket d'évolution réel, produire l'inventaire et la proposition minimale,
  et **comparer ensuite** à ce qui a effectivement été conçu par les designers du produit.
  L'écart est la note.
- Garde-fou sans exception, pour ce dépôt public : rien de confidentiel ici. Ce que tu
  ramènes d'un contexte professionnel est une **note de méthode** dans ton espace privé —
  jamais une capture, un export, un nom de client, un nom de composant interne, une donnée
  ou un libellé métier. Le dépôt `fullstack-autotraining` est public : il ne contient que
  TribuZen et le produit fictif du capstone.

## 6. Points clés

1. Dans un produit existant, l'inventaire (ce motif existe-t-il, sous quel nom, pourquoi
   ainsi) précède toute proposition.
2. Chaque écran crée un précédent : une solution moins bonne mais cohérente bat souvent une
   solution meilleure mais isolée.
3. Un composant de plus coûte du code, des tests, de la documentation, de la traduction, des
   thèmes, et un arbitrage permanent pour tous les suivants.
4. La dette de design se corrige dans le périmètre, s'ouvre comme sujet, ou se documente —
   jamais silencieusement.
5. Le critère de sortie est la modification minimale qui résout le problème nommé, et le
   livrable contient la liste explicite de ce qu'on ne touche pas.

## 7. Seeds Anki

```
Quelles sont les trois questions de l'inventaire avant de proposer dans l'existant ?|Ce motif existe-t-il déjà ailleurs ? Sous quel nom (composant et mot d'interface) ? Pourquoi a-t-il été fait comme ça ?
Pourquoi une solution moins bonne mais cohérente bat-elle souvent une meilleure solution isolée ?|Parce qu'un écran crée un précédent : le coût de la contradiction se paie sur tous les autres écrans, en hésitation permanente
Quel est le coût réel d'un variant de plus dans un design system ?|Code et tests, documentation, tests visuels, traductions, déclinaisons de thèmes, et l'arbitrage permanent "lequel j'utilise" pour tous les suivants
Quelles sont les trois réponses légitimes à une dette de design, et la réponse interdite ?|Corriger dans le périmètre, ouvrir un sujet chiffré, documenter et laisser — interdit : corriger silencieusement, qui est une régression pour quelqu'un
Quel est le critère de sortie d'un ticket de design dans l'existant ?|La modification minimale qui résout le problème nommé sans créer de précédent nouveau, accompagnée de la liste écrite de ce qu'on ne touche pas
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/h01-concevoir-dans-existant/`. Tu y traites une
> évolution d'un écran TribuZen existant par inventaire puis modification minimale, avec la
> liste écrite du non-touché, et tu mets en place l'exercice de calibration sur un ticket
> professionnel réel (maquetter avant de voir la maquette officielle, puis comparer) — brief
> complet, garde-fou de confidentialité et rubrique dans le README du lab.
