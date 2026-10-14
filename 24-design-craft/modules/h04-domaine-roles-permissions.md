---
titre: Domaine métier, rôles et permissions
cours: 24-design-craft
bloc: H — Design produit (éditeur logiciel)
notions: [modèle de domaine et cardinalités, vocabulaire métier comme contrainte, concevoir par permission et non par rôle, les trois réponses à "pas le droit", concevoir la variante la plus pauvre d'abord, ce qu'un thème peut et ne peut pas changer]
outcomes: [modéliser un domaine avec ses cardinalités avant de dessiner, concevoir un écran par permissions plutôt que par rôles, choisir entre masquer, désactiver avec explication et proposer un chemin]
prerequis: [h03-matrice-etats]
next: h05-parcours-long-saas
tribuzen: TribuZen pour le modèle de domaine et les permissions ; fil rouge « Nahual 2D » pour la frontière de thème entre les deux modes (ce qui peut différer, ce qui ne doit jamais différer)
last-reviewed: 2026-10
---

# Domaine métier, rôles et permissions

> **Outcomes — tu sauras FAIRE :** modéliser un domaine avec ses cardinalités avant de
> dessiner, concevoir un écran par permissions plutôt que par rôles, et choisir entre
> masquer, désactiver avec explication, ou proposer un chemin.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le module A03 impose de construire le sitemap avant la mise en page : la structure des écrans
avant leur contenu. Il manque l'étage en dessous, qui est le plus déterminant dans un
logiciel métier : **la structure des données et des droits**.

Un exemple qui tombe toujours juste. Un designer dessine un écran « devis » avec un titre, un
client, des lignes, un total. Puis il apprend qu'un devis a plusieurs **versions**, que deux
d'entre elles peuvent être envoyées au même client, qu'une version acceptée ne peut plus être
modifiée, et que le commercial voit le prix d'achat tandis que le client ne voit que le prix
de vente. L'écran n'est pas à ajuster, il est faux : il modélisait une entité qui n'existe pas.

Aucune compétence Figma ne rattrape ça. C'est un travail de modélisation, et c'est une des
différences les plus visibles entre un designer d'interface et un designer produit.

## 2. Théorie complète, concise

### 2.1 Modéliser avant de dessiner

Avant toute maquette d'un écran métier, écrire les **entités**, leurs **relations** et leurs
**cardinalités** :

```
Foyer  1 ──── n  Parent
Foyer  1 ──── n  Enfant
Enfant 1 ──── n  Routine
Routine 1 ─── n  Occurrence (une exécution datée)
Occurrence 1 ─ n  Tâche réalisée
Foyer  1 ──── n  Gazette (une par semaine)
```

Les cardinalités sont le cœur du sujet, parce qu'une erreur de cardinalité produit un écran
faux, pas un écran perfectible. Trois questions à poser systématiquement :

1. **Un ou plusieurs ?** Un enfant a-t-il une routine du matin ou plusieurs ?
2. **Obligatoire ou optionnel ?** Un enfant peut-il exister sans aucune routine ? (Si oui,
   il y a un état vide à concevoir, et le module H03 le réclamera.)
3. **Qu'est-ce qui est immuable, et à partir de quand ?** Une occurrence passée est-elle
   modifiable ? Un historique corrigeable est un autre produit qu'un historique figé.

### 2.2 Le vocabulaire métier est une contrainte, pas un détail de rédaction

Dans un logiciel professionnel, les utilisateurs ont déjà un vocabulaire, qu'ils emploient
entre eux, au téléphone, dans leurs documents. Ce vocabulaire gagne contre toute amélioration
rédactionnelle, même quand il est laid, technique ou historique.

Renommer un terme métier pour « plus de clarté » produit trois dégâts : l'utilisateur ne
reconnaît plus sa propre tâche, l'équipe interne et le client ne parlent plus la même langue,
et le support doit traduire à chaque échange. Le module G03 disait déjà qu'un libellé doit
permettre de **prédire** ; ici la contrainte est plus forte : il doit **coïncider**.

La bonne pratique : constituer un lexique partagé (terme métier, définition, ce qu'il ne veut
pas dire) et s'y tenir dans l'interface, dans les maquettes et dans le code. Les divergences
de vocabulaire entre ces trois endroits sont une source permanente de malentendus.

### 2.3 Concevoir par permission, jamais par rôle

Un **rôle** est un paquet de permissions. Si tu conçois par rôle (« l'écran de l'admin »,
« l'écran du vendeur »), chaque nouveau rôle impose une nouvelle conception, et les rôles
hybrides sont ingérables.

Concevoir par **permission** signifie que chaque élément de l'écran est associé à la
permission qui le conditionne :

```
Zone / élément              Permission requise
Liste des routines          routine:lire
Bouton "Créer une routine"  routine:creer
Menu "Supprimer"            routine:supprimer
Colonne "Créé par"          foyer:administrer
Export de l'historique      historique:exporter
```

Un rôle devient alors une simple combinaison, et un nouveau rôle ne coûte rien en conception.
C'est aussi ce qui rend la matrice d'états (H03) tenable : la colonne « droit » se décline
par permission, pas par profil.

### 2.4 Les trois réponses à « pas le droit », et quand utiliser chacune

- **Masquer** — quand l'**existence même** de la fonction est confidentielle, ou quand elle
  n'a aucun sens pour ce profil. Coût : l'utilisateur ne peut pas savoir que ça existe, donc
  ne peut pas le demander.
- **Désactiver avec explication** — quand la fonction existe mais pas pour cet utilisateur, et
  qu'il est légitime qu'il le sache. **L'explication est obligatoire** : un élément désactivé
  sans raison est une énigme, et l'utilisateur en conclut que le logiciel est cassé.
- **Expliquer et proposer un chemin** — quand l'accès est possible mais conditionné : une
  option non souscrite, un droit à demander à un administrateur. L'écran dit alors quoi faire
  pour l'obtenir.

Et la réponse interdite, qui est pourtant la plus fréquente par défaut : **laisser agir puis
refuser**. Un bouton actif qui produit une erreur après le clic fait perdre du temps, laisse
croire à une panne, et donne l'impression que le logiciel ne sait pas ce qu'il fait. C'était
le troisième bug de l'Exemple B du module H03.

### 2.5 Concevoir la variante la plus pauvre d'abord

Réflexe contre-intuitif et pourtant décisif : maquetter d'abord l'écran du profil qui a **le
moins de droits**.

Raison : c'est cette variante qui casse la mise en page. Un écran dessiné pour l'administrateur
puis « adapté » en retirant des éléments produit des écrans troués — une colonne vide, une
barre d'actions avec un seul bouton perdu au milieu, une zone qui n'a plus de contenu. À
l'inverse, un écran conçu pour le profil le plus pauvre puis enrichi reste cohérent dans les
deux cas, parce que chaque ajout a été pensé comme un ajout.

### 2.6 Marque blanche : ce qu'un thème peut changer, et ce qu'il ne doit jamais changer

Quand un produit est décliné sous plusieurs marques, la frontière doit être écrite une fois
pour toutes :

| Peut varier | Ne doit jamais varier |
|---|---|
| Couleurs, logo, typographie | La structure des écrans |
| Densité et rayons, dans une limite définie | La position des actions |
| Illustrations, ton éditorial de surface | Les libellés métier |
| Fonctionnalités activées (par souscription) | L'ordre des étapes d'un parcours |

La règle qui en découle : **un thème qui déplace les choses n'est pas un thème, c'est un
produit différent**. Dès que la structure varie par marque, la maintenance explose et aucune
maquette ne reste vraie. C'est l'une des décisions qu'un designer produit doit savoir
défendre, parce que la demande commerciale pousse naturellement dans l'autre sens.

## 3. Worked examples

### Exemple A — modèle de domaine TribuZen et deux écrans qu'il corrige

Modèle écrit avec les trois questions du §2.1 :

```
Foyer      1 ─ n Parent        (plusieurs parents possibles, minimum 1)
Foyer      1 ─ n Enfant        (minimum 0 → état vide à concevoir)
Enfant     1 ─ n Routine       (PLUSIEURS routines par moment de journée possibles)
Routine    1 ─ n Occurrence    (une par date d'exécution ; une occurrence passée est
                                FIGÉE : corrigeable seulement dans les 48 h)
Occurrence 1 ─ n Tâche         (minimum 1)
Foyer      1 ─ n Gazette       (une par semaine, générée, non modifiable)
```

Deux écrans que ce modèle corrige immédiatement :

1. **L'écran de routine** supposait implicitement une routine du matin et une du soir. Le
   modèle dit « plusieurs par moment » : l'écran doit donc être une liste, avec un état
   « une seule routine » et un état « beaucoup » (matrice H03), pas deux emplacements fixes.
2. **L'écran d'historique** supposait l'historique consultable seulement. Le modèle dit
   « corrigeable 48 h » : il faut donc un état « modifiable » et un état « figé », avec une
   explication du passage de l'un à l'autre — sinon l'utilisateur ne comprend pas pourquoi
   la même ligne était éditable hier et ne l'est plus.

Le second point est exactement le genre de règle qui ne se voit pas dans une maquette et
qui se voit en production.

### Exemple B — un écran, trois profils, en commençant par le plus pauvre

Profils définis par permissions, pas par rôles :

```
Profil "Invité"   : routine:lire, historique:lire
Profil "Parent"   : + routine:creer, routine:modifier, occurrence:corriger
Profil "Référent" : + foyer:administrer, historique:exporter, parent:inviter
```

Conception dans l'ordre imposé par le §2.5 :

```
1. VARIANTE INVITÉ (la plus pauvre) — conçue en premier
   - Liste des routines en lecture, sans menu d'actions par ligne.
   - Aucune barre d'actions en haut : la zone n'existe pas, elle n'est pas vide.
   - Mention explicite "Lecture seule" dans l'en-tête, avec l'explication
     ("vous avez été invité par le référent du foyer").
   → L'écran est complet et cohérent, sans trou.

2. VARIANTE PARENT — ajouts
   - Menu d'actions par ligne (modifier).
   - Barre d'actions avec une action primaire : "Créer une routine" (G06 : une seule).
   - L'historique devient éditable dans la fenêtre de 48 h, figé au-delà, avec explication.

3. VARIANTE RÉFÉRENT — ajouts
   - Colonne "Créé par" (permission foyer:administrer).
   - Action secondaire "Exporter" ; action "Inviter un parent" en tertiaire.
   - L'action destructive "Retirer un parent" : jamais primaire, confirmation qui nomme
     la personne retirée (G06 §2.2).
```

Résultat : trois variantes cohérentes, aucune case de droit laissée vide dans la matrice, et
aucun bouton actif qui échouerait après le clic.

## 4. Pièges & misconceptions

- **Dessiner pour l'administrateur et « adapter » ensuite.** Produit des écrans troués (§2.5).

- **Concevoir par rôle.** Chaque nouveau rôle impose une refonte, et les profils hybrides
  deviennent ingérables.

- **Laisser agir puis refuser.** La pire des réponses à « pas le droit », et la plus fréquente
  par défaut.

- **Désactiver sans expliquer.** L'utilisateur conclut que le logiciel est cassé.

- **Masquer par défaut.** Confortable à dessiner, mais l'utilisateur ne peut plus découvrir ni
  demander la fonction.

- **Renommer le vocabulaire métier pour plus de clarté.** On désynchronise l'équipe, le client
  et le support.

- **Ignorer les cardinalités.** Supposer « un » là où il y a « plusieurs » rend l'écran faux,
  pas perfectible.

- **Un thème qui déplace les éléments.** Ce n'est plus un thème, c'est un second produit à
  maintenir.

## 5. Ancrage TribuZen

- Le modèle de domaine de l'Exemple A est à produire en entier dans le lab, et il doit
  corriger au moins un écran existant — c'est le critère de réussite.
- Les trois profils par permissions (Exemple B) complètent la colonne « droit » laissée
  volontairement incomplète dans la matrice du module H03.
- La règle des 48 h sur les occurrences est un exemple de règle métier qui n'apparaît dans
  aucune maquette et qui doit vivre dans le lexique partagé du §2.2.

## 6. Points clés

1. Les cardinalités s'écrivent avant toute maquette : une erreur de cardinalité rend l'écran
   faux, pas perfectible.
2. Le vocabulaire métier est une contrainte : il doit coïncider avec celui des utilisateurs,
   pas seulement être clair.
3. On conçoit par permission et non par rôle, pour qu'un nouveau rôle ne coûte rien.
4. Trois réponses à « pas le droit » : masquer (existence confidentielle), désactiver **avec
   explication**, ou expliquer et proposer un chemin — jamais laisser agir puis refuser.
5. On maquette d'abord la variante la plus pauvre : c'est elle qui casse la mise en page, et
   l'enrichir ensuite évite les écrans troués.
6. Un thème peut changer les couleurs et la typographie ; s'il change la structure, la
   position des actions ou les libellés métier, ce n'est plus un thème.

## 7. Seeds Anki

```
Pourquoi une erreur de cardinalité est-elle plus grave qu'une erreur de mise en page ?|Parce qu'elle rend l'écran faux : il modélise une entité qui n'existe pas (ex. un devis sans versions), ce qu'aucun ajustement visuel ne rattrape
Pourquoi concevoir par permission plutôt que par rôle ?|Un rôle est un paquet de permissions : concevoir par rôle impose une nouvelle conception à chaque rôle et rend les profils hybrides ingérables
Quelles sont les trois réponses à "pas le droit" et laquelle est interdite ?|Masquer (existence confidentielle), désactiver avec explication obligatoire, expliquer et proposer un chemin — interdit : laisser agir puis refuser après le clic
Pourquoi maquetter d'abord la variante du profil le plus pauvre ?|C'est elle qui casse la mise en page ; partir de l'écran riche et retirer des éléments produit des écrans troués
Que peut changer un thème de marque blanche, et que ne doit-il jamais changer ?|Peut : couleurs, logo, typographie, densité dans une limite. Ne doit jamais : structure des écrans, position des actions, libellés métier, ordre des étapes
Pourquoi ne jamais renommer un terme métier pour plus de clarté ?|L'utilisateur ne reconnaît plus sa tâche, l'équipe et le client ne parlent plus la même langue, et le support doit traduire à chaque échange
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/h04-domaine-roles-permissions/`. Tu y produis le modèle
> de domaine de TribuZen avec ses cardinalités et au moins une règle d'immuabilité, tu
> définis trois profils par permissions, et tu maquettes l'écran principal dans sa variante
> la plus pauvre puis la plus riche — brief complet et rubrique dans le README du lab.
