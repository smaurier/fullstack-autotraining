---
titre: Patterns de données denses — tableaux, filtres, volume
cours: 24-design-craft
bloc: H — Design produit (éditeur logiciel)
notions: [tableau vs liste vs cartes, colonnes comme décision éditoriale, tri et son indicateur, emplacement des filtres, filtres actifs visibles, pagination vs défilement infini vs virtualisation, sélection et actions en lot, édition inline, densité, squelettes de chargement]
outcomes: [choisir et justifier la forme d'affichage d'un jeu de données, réduire des colonnes candidates à un ensemble décisionnel, choisir un mode de parcours du volume selon le besoin de retour à une position, concevoir les états d'un tableau éditable]
prerequis: [h01-concevoir-dans-existant, b09-hierarchie-visuelle]
next: h03-matrice-etats
tribuzen: TribuZen (exception assumée du bloc H : un portfolio n'a pas de données denses) — écran d'historique des routines filtrable par enfant et par type, éprouvé sur 0, 7 et 5000 lignes
last-reviewed: 2026-10
---

# Patterns de données denses — tableaux, filtres, volume

> **Outcomes — tu sauras FAIRE :** choisir et justifier la forme d'affichage d'un jeu de
> données, réduire une liste de colonnes candidates à un ensemble qui sert la décision,
> choisir un mode de parcours du volume sur un critère explicite, et concevoir les états d'un
> tableau éditable que personne ne maquette d'habitude.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le capstone du cours parle d'un « flow dense en données » et le module A03 note qu'un
dashboard mélange les trois familles de structure. Aucun module n'explique comment on conçoit
réellement un tableau de travail, et c'est pourtant le composant central de n'importe quel
logiciel professionnel.

Le symptôme d'un tableau conçu sans méthode est toujours le même : il a été dessiné avec cinq
lignes de données courtes et inventées. En production il reçoit zéro ligne le premier jour,
cinq mille au bout d'un an, des libellés deux fois plus longs que prévu, et des valeurs
négatives que personne n'avait imaginées. Les trois quarts des tickets d'interface d'un
logiciel métier naissent là.

## 2. Théorie complète, concise

### 2.1 Choisir la forme : tableau, liste ou cartes

- **Tableau** — quand l'utilisateur **compare** des entités sur les mêmes axes. La colonne
  est ce qui rend la comparaison possible : l'œil descend une colonne pour trouver le plus
  grand, le plus ancien, l'anomalie.
- **Liste** — quand il y a un seul axe de lecture et qu'on parcourt pour trouver un élément.
- **Cartes** — quand chaque entité est lue **pour elle-même**, avec plusieurs informations
  hétérogènes (une image, un statut, une action).

Le tableau n'est pas « la version professionnelle » d'une liste, et les cartes ne sont pas
« la version moderne » d'un tableau. Choisir des cartes pour des données comparables détruit
la comparaison : l'œil ne peut plus descendre un axe.

### 2.2 Les colonnes sont une décision éditoriale

Le fait qu'une donnée existe n'est pas une raison de l'afficher. Trois critères pour retenir
une colonne :

1. **Elle sert une décision** que l'utilisateur prend sur cet écran. Sinon elle appartient au
   détail de la ligne, pas à la liste.
2. **Elle discrimine.** Une colonne dont 95 % des valeurs sont identiques ne sert qu'à
   repérer les 5 % — auquel cas un filtre ou un marqueur fait mieux, pour un dixième de la
   largeur.
3. **Elle est lisible à sa largeur réelle.** La largeur se calibre sur le contenu **le plus
   long réellement observé**, pas sur un exemple inventé court. Un nom de société tronqué à
   mi-mot rend la colonne inutile.

Quatre mécanismes à décider explicitement : l'ordre des colonnes (de la plus décisive à la
moins), le gel de la première colonne (celle qui identifie la ligne, sinon on perd le repère
en défilant), la configuration par l'utilisateur, et la **persistance** de cette
configuration (un réglage perdu au rechargement est pire que pas de réglage du tout).

### 2.3 Tri : l'état doit être visible et stable

Un tri sans indicateur visible de la colonne et du sens est un piège : l'utilisateur lit un
ordre qu'il n'a pas demandé et croit lire l'ordre naturel. Trois décisions à écrire : le tri
par défaut (et pourquoi), le comportement des valeurs vides (toujours en fin, jamais
mélangées), et la persistance ou non du tri d'une visite à l'autre.

### 2.4 Filtres : trois emplacements, une règle non négociable

- **En ligne au-dessus du tableau** — deux ou trois filtres fréquents, à portée immédiate.
- **En panneau latéral** — nombreux filtres, combinables, parcours exploratoire.
- **Par colonne** — filtre au niveau de l'en-tête, pour un public expert et une forte densité.

La règle non négociable, déjà posée en G03 : **les filtres actifs restent visibles en
permanence**, avec le compte de résultats et un moyen de les réinitialiser. Un utilisateur
qui lit une liste filtrée en croyant lire la liste complète prend une décision sur une donnée
fausse, et c'est la faute de l'écran, pas la sienne.

### 2.5 Parcourir le volume : un seul critère de choix

| Mécanisme | Quand | Pourquoi |
|---|---|---|
| **Pagination** | Écran de travail, besoin de revenir à une position, de citer « page 3 », d'imprimer | Prédictible et adressable |
| **Défilement infini** | Exploration, consultation sans objectif précis | Confortable, mais on ne revient jamais à sa place |
| **Virtualisation** | Gros volume à parcourir d'un bloc, sans découpage logique | Technique et invisible ; se combine avec les deux autres |

Le critère de décision tient en une question : **faut-il pouvoir revenir à une position
précise ?** Si oui, pagination. Un écran de travail où l'utilisateur ouvre une ligne, agit,
puis revient, est détruit par le défilement infini : il revient en haut, à chaque fois. Autre
conséquence connue du défilement infini : il rend un pied de page inatteignable.

### 2.6 Sélection et actions en lot

Trois décisions que les maquettes omettent presque toujours :

- **La portée de la sélection** : « tout sélectionner » veut dire la page visible, ou
  l'ensemble des résultats filtrés ? Les deux sont légitimes, l'ambiguïté ne l'est pas. Le
  compteur doit dire laquelle (« 25 sélectionnés sur cette page » vs « 1 248 résultats »).
- **La persistance** : la sélection survit-elle au changement de page, de filtre, de tri ?
  Décider, et le montrer.
- **L'action destructive en lot** : la confirmation nomme le **nombre** et la **nature** de ce
  qui sera supprimé, et le résultat rend compte par élément quand une partie échoue — un lot
  de 50 où 3 échouent doit dire lesquels.

### 2.7 L'édition inline crée des états que personne ne maquette

Rendre une cellule éditable dans la liste multiplie les états, et c'est le pont direct vers
le module H03 :

- modifié non enregistré (et ce qui se passe si l'utilisateur quitte la page) ;
- enregistrement en cours, **par ligne** et non pour tout le tableau ;
- échec d'enregistrement d'une ligne pendant que les autres réussissent ;
- conflit : quelqu'un d'autre a modifié la même ligne entre-temps ;
- validation d'une valeur qui dépend d'une autre cellule de la même ligne.

Un tableau éditable sans l'état « échec sur une seule ligne » produit en production la pire
des situations : l'utilisateur croit avoir enregistré, et n'a pas enregistré.

### 2.8 Densité et chargement

- **Densité** : proposer un mode compact et un mode confortable est un vrai service dans un
  outil de travail — l'utilisateur expert veut voir trente lignes, l'occasionnel veut
  respirer. C'est un réglage, donc il se persiste.
- **Squelettes de chargement** : ils doivent avoir la **forme et le nombre** du contenu final,
  sinon la page saute quand les données arrivent. Un squelette de trois lignes suivi de vingt
  lignes réelles est pire qu'un indicateur de chargement simple.

## 3. Worked examples

### Exemple A — réduire douze colonnes candidates à cinq

Écran : historique des routines TribuZen. Colonnes candidates listées sans filtre :

```
1  Date            6  Heure de fin          11  Créé par
2  Enfant          7  Durée                 12  Modifié le
3  Type de routine 8  Statut
4  Nombre de tâches 9  Commentaire
5  Heure de début  10 Identifiant interne
```

Application des trois critères du §2.2 :

```
RETENUES (5)
  Date            sert la décision (chercher un jour), discrimine, courte
  Enfant          sert la décision, discrimine, à geler car identifie la ligne
  Type            sert la décision, discrimine (matin/soir)
  Statut          sert la décision principale ("est-ce que ça s'est bien passé")
  Nombre de tâches  seule mesure de volume, discrimine, très courte

ÉCARTÉES, AVEC RAISON
  Heure début/fin  → dérivables, vont au détail de la ligne
  Durée            → calculée, utile en tri mais pas en lecture → à exposer comme tri
  Commentaire      → longueur imprévisible, casse la grille → icône "a un commentaire"
  Identifiant      → ne sert à aucune décision utilisateur
  Créé par         → 95 % de valeurs identiques (un seul parent actif) → non discriminante
  Modifié le       → sert au support, pas à l'utilisateur → détail de la ligne
```

Noter la colonne « Commentaire » : elle est écartée comme colonne mais conservée comme
**marqueur**. C'est le réflexe à prendre, celui qui évite les deux extrêmes (tout afficher,
ou perdre l'information).

Les états de chargement et de volume associés, à concevoir en même temps et pas après :

```
0 ligne           état vide actionnable ("aucune routine enregistrée" + créer)
0 résultat filtré état différent du précédent ("aucun résultat pour ces filtres" + réinitialiser)
7 lignes          pas de pagination affichée, pagination inutile
5000 lignes       pagination + compteur + le tri devient indispensable
chargement        squelette de la hauteur de la page de résultats attendue
erreur            message en place du tableau, filtres conservés, action réessayer
```

Les deux premiers états sont **toujours** confondus dans les maquettes débutantes, et ils
appellent des messages opposés : l'un propose de créer, l'autre propose de retirer un filtre.

### Exemple B — le même écran en défilement infini, et pourquoi c'est un mauvais choix

Scénario d'usage réel : le parent regarde l'historique, repère une journée qui s'est mal
passée au milieu de la liste, ouvre le détail, revient.

En défilement infini, il revient en haut de la liste et doit refaire défiler. Si la liste
compte un an d'historique, l'écran est inutilisable pour ce scénario — qui est le scénario
principal. Le critère du §2.5 le disait d'avance : il faut revenir à une position précise,
donc pagination.

## 4. Pièges & misconceptions

- **Tout afficher parce que la donnée existe.** La colonne est une décision éditoriale.

- **Des cartes pour des données comparables.** On détruit la comparaison en colonne.

- **Une largeur de colonne calibrée sur un exemple court.** En production, la troncature rend
  la colonne inutile.

- **Des filtres actifs invisibles.** L'utilisateur décide sur une liste partielle sans le
  savoir.

- **Confondre « aucune donnée » et « aucun résultat pour ce filtre ».** Deux états, deux
  messages, deux actions.

- **Le défilement infini sur un écran de travail.** Aucun retour possible à une position.

- **Une sélection « tout » ambiguë.** Page visible ou résultats filtrés : il faut le dire.

- **Un tableau éditable sans échec par ligne.** L'utilisateur croit avoir enregistré.

- **Tester avec cinq lignes.** Il faut éprouver à 0, à quelques unités, et à plusieurs
  milliers — ce sont trois écrans différents.

- **Un squelette qui ne ressemble pas au contenu final.** La page saute à l'arrivée des
  données.

## 5. Ancrage TribuZen

- L'écran d'historique (Exemple A) reprend la structure à facettes déjà identifiée en A03 :
  filtrable par enfant **et** par type. C'est le même besoin, traité cette fois au niveau du
  composant.
- La colonne « Enfant » gelée et le marqueur de commentaire sont deux décisions réutilisables
  directement dans l'implémentation en code.
- Les six états de volume et de chargement listés en fin d'Exemple A sont l'amorce de la
  matrice d'états du module suivant (H03) — ils ne sont pas exhaustifs, c'est précisément ce
  que H03 va corriger.

## 6. Points clés

1. Tableau pour comparer, liste pour parcourir un axe, cartes pour lire chaque entité seule —
   le tableau n'est pas une liste professionnelle.
2. Une colonne se garde si elle sert une décision, discrimine, et reste lisible à sa largeur
   réelle ; sinon elle devient un détail de ligne ou un marqueur.
3. Les filtres actifs doivent rester visibles avec le compte de résultats, sinon l'utilisateur
   décide sur une donnée fausse.
4. Le choix pagination / défilement infini / virtualisation se tranche par une question :
   faut-il revenir à une position précise ?
5. « Aucune donnée » et « aucun résultat pour ce filtre » sont deux états distincts, avec deux
   messages et deux actions opposées.
6. L'édition inline crée des états par ligne (modifié, en cours, échec, conflit) sans lesquels
   l'utilisateur croit avoir enregistré.
7. Un écran de données se conçoit et s'éprouve sur trois volumes : zéro, quelques unités,
   plusieurs milliers.

## 7. Seeds Anki

```
Quand choisit-on un tableau plutôt que des cartes ?|Quand l'utilisateur compare des entités sur les mêmes axes : la colonne rend la comparaison possible, les cartes la détruisent
Quels sont les trois critères pour garder une colonne ?|Elle sert une décision prise sur cet écran, elle discrimine (valeurs non quasi identiques), elle reste lisible à sa largeur réelle
Pourquoi les filtres actifs doivent-ils rester visibles ?|Sinon l'utilisateur lit une liste partielle en croyant lire la liste complète, et décide sur une donnée fausse
Quel est le critère de choix entre pagination et défilement infini ?|Faut-il pouvoir revenir à une position précise ? Si oui pagination — un écran de travail est détruit par le défilement infini
Pourquoi "aucune donnée" et "aucun résultat pour ce filtre" sont-ils deux états distincts ?|Ils appellent des actions opposées : créer un premier élément, ou retirer un filtre
Quels états l'édition inline ajoute-t-elle à un tableau ?|Modifié non enregistré, enregistrement en cours par ligne, échec d'une ligne pendant que d'autres réussissent, conflit avec une modification concurrente, validation dépendante d'une autre cellule
Sur combien de volumes de données faut-il éprouver un écran de liste ?|Trois : zéro, quelques unités, plusieurs milliers — ce sont trois écrans différents
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/h02-patterns-donnees-denses/`. Tu y conçois l'écran
> d'historique des routines TribuZen : forme justifiée, cinq colonnes retenues sur douze avec
> la raison de chaque exclusion, filtres et leur emplacement, mode de parcours du volume
> justifié, et les six états de volume/chargement — éprouvé sur 0, 7 et 5000 lignes. Brief
> complet et rubrique dans le README du lab.
