---
titre: La matrice d'états — le livrable qui supprime les bugs d'interface
cours: 24-design-craft
bloc: H — Design produit (éditeur logiciel)
notions: [matrice composant par état, quatre familles d'états (donnée, système, droit, interaction), contenu extrême, trois valeurs par case (maquetté/hérité/hors périmètre), priorisation par non-déductibilité]
outcomes: [dresser une matrice d'états sans aucune case vide, distinguer un état à maquetter d'un état hérité du design system, produire les maquettes des seules cases dont le comportement n'est pas déductible]
prerequis: [h02-patterns-donnees-denses, a07-ux-writing]
next: h04-domaine-roles-permissions
tribuzen: fil rouge « Nahual 2D » — matrice d'états de la bascule 3D/2D (chargement, WebGL absent, mouvement réduit, glissement, focus clavier), zéro case vide
last-reviewed: 2026-10
---

# La matrice d'états — le livrable qui supprime les bugs d'interface

> **Outcomes — tu sauras FAIRE :** dresser une matrice d'états sans aucune case vide,
> distinguer un état à maquetter d'un état hérité du design system, et produire les maquettes
> des seules cases dont le comportement n'est pas déductible.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Prends n'importe quel flux de tickets d'interface d'un logiciel en production. Tu y trouveras,
dans cet ordre de fréquence : un libellé qui déborde de son conteneur, un état vide sans
message, un composant dont la couleur de fond manque dans un cas précis, un bouton actif
alors que l'utilisateur n'a pas le droit, un pluriel faux quand il n'y a qu'un élément, un
montant qui casse la mise en page à partir de sept chiffres.

Aucun de ces tickets n'est un bug de code au sens strict. Chacun est **une case d'une matrice
que personne n'a dressée**. Le module A04 a déjà fait une partie du chemin en imposant les
états d'erreur et vide dans un user flow. La matrice d'états généralise cette discipline au
niveau du composant, et c'est l'un des livrables les plus reconnaissables d'un designer
produit expérimenté.

## 2. Théorie complète, concise

### 2.1 Quatre familles d'états

**Famille 1 — les états de donnée.** Ce que le contenu fait au composant.

```
vide · un seul élément · plusieurs · beaucoup (au-delà de l'affichage prévu) ·
valeur nulle / zéro · valeur négative · texte le plus long réellement possible ·
texte dans la langue la plus verbeuse du produit · caractères inattendus
```

**Famille 2 — les états système.** Ce que l'infrastructure fait au composant.

```
chargement initial · rechargement (données déjà affichées) · erreur de récupération ·
erreur d'enregistrement · lenteur (plus long que prévu) · hors ligne ·
donnée périmée / conflit de version
```

**Famille 3 — les états de droit.** Ce que les permissions font au composant. Développé au
module H04.

```
lecture seule · action non autorisée pour ce rôle · fonctionnalité non souscrite ·
donnée partiellement masquée · entité verrouillée par quelqu'un d'autre
```

**Famille 4 — les états d'interaction.** Ceux que le design system couvre d'habitude, et
qu'il faut donc vérifier plutôt que redessiner.

```
repos · survol · focus clavier · pressé · désactivé · sélectionné · invalide
```

Les familles 1, 2 et 3 sont celles que les maquettes oublient. La famille 4 est celle que
les maquettes refont inutilement.

### 2.2 Le contenu extrême n'est pas un cas marginal

Le plus long nom réel, pas un nom inventé court. Le montant à sept chiffres. La traduction
allemande, régulièrement 30 à 40 % plus longue que le français. Le cas « un seul élément »,
où tous les pluriels écrits au hasard cassent (« 1 éléments sélectionnés »). Le zéro, qui
n'est ni vide ni une valeur normale. Le négatif, qui change un signe, une couleur, parfois un
sens.

Ces cas ne sont pas des curiosités : ce sont les premiers à apparaître en production, parce
que la réalité est plus variée que les données de démonstration.

### 2.3 La matrice : trois valeurs possibles par case, et aucune case vide

La matrice se dresse en tableau, composants ou zones en lignes, états en colonnes. Chaque
case porte **obligatoirement** l'une de trois valeurs :

- **M (maquetté)** — le comportement n'est pas déductible, une maquette existe.
- **H (hérité)** — le design system le définit déjà, on ne le redessine pas, on le nomme.
- **X (hors périmètre, explicitement)** — on a décidé de ne pas le traiter, et on l'écrit.

La règle unique : **une case vide est interdite**. C'est le vide qui produit les bugs, parce
qu'une case vide n'est pas « rien à faire », c'est « personne n'y a pensé ». Un X assumé est
infiniment préférable à un blanc : il est visible en revue, et il peut être contesté.

### 2.4 Prioriser honnêtement : la non-déductibilité

Une matrice complète peut compter soixante cases. Personne ne maquette soixante cases, et
une matrice bureaucratique ne sera pas lue.

Le critère de tri est la **déductibilité** : si un développeur compétent, en lisant le design
system et les cases voisines, produit le bon résultat sans maquette, la case est **H**. Si
deux développeurs raisonnables produiraient deux résultats différents, la case est **M** et
mérite une maquette.

C'est ce critère qui distingue une matrice utile d'un formulaire administratif : elle
concentre l'effort de dessin là où l'ambiguïté existe, et elle documente le reste en une
lettre.

### 2.5 La matrice comme pièce de spécification

Trois usages concrets, qui expliquent pourquoi c'est un livrable et pas une note personnelle :

- **En conception** : elle révèle les écrans manquants avant qu'ils soient oubliés.
- **En revue** : elle rend la revue vérifiable (« la case conflit est vide » est un constat,
  pas un avis), ce qui rejoint les critères d'acceptation du module H06.
- **En recette et en test** : elle est, telle quelle, la liste des cas à vérifier. C'est le
  pont le plus direct entre ce cours et la culture de test du reste du curriculum.

## 3. Worked examples

### Exemple A — matrice d'un composant de liste

Composant : la liste des routines d'un enfant dans TribuZen. États retenus en colonnes, zones
du composant en lignes.

| Zone | vide | 1 élément | beaucoup | texte long | chargement | erreur | lecture seule |
|---|---|---|---|---|---|---|---|
| En-tête (titre + compteur) | **M** | **M** | H | H | H | H | **M** |
| Corps (les lignes) | **M** | H | **M** | **M** | **M** | **M** | H |
| Action principale | **M** | H | H | H | H | X | **M** |
| Pied (pagination) | X | X | **M** | H | H | X | H |

Lecture des décisions, case par case sur les plus intéressantes :

```
En-tête / vide         M : le compteur n'a pas de sens à zéro → titre seul, à dessiner.
En-tête / 1 élément    M : "1 routine", pas "1 routines" → la règle de pluriel est à écrire.
Corps / beaucoup       M : au-delà de 20, pagination + ce que devient la hauteur.
Corps / texte long     M : troncature ou retour à la ligne ? Deux devs feraient différemment.
Corps / erreur         M : message en place des lignes, filtres conservés.
Action / erreur        X : explicitement non traité — l'action reste telle quelle en cas
                           d'erreur de chargement de la liste, décision assumée.
Action / lecture seule M : masquée ou désactivée avec explication ? → voir H04.
Pied / vide            X : pas de pagination à zéro, déduction évidente, inutile à dessiner.
```

Résultat : sur 28 cases, 11 **M** à dessiner, 13 **H** documentées en une lettre, 4 **X**
assumées. Zéro case vide. Le travail de dessin a été réduit de 60 % **sans** perdre un seul
cas — c'est tout l'intérêt de la méthode.

### Exemple B — trois bugs d'interface remontés à leur case manquante

| Bug observé en production | Case manquante |
|---|---|
| « 1 tâches terminées » dans le résumé | Compteur / état « 1 élément » |
| L'écran affiche une liste vide sans aucun message, l'utilisateur croit à une panne | Corps / état « vide » (confondu avec l'état chargement terminé) |
| Un utilisateur sans droit d'édition clique sur « Modifier » et reçoit une erreur serveur | Action principale / état « action non autorisée » |

Les trois sont des cases, pas des bugs de logique. Le troisième est le plus coûteux :
l'utilisateur a été laissé agir pour être refusé ensuite, ce qui est précisément ce que le
module H04 interdit.

## 4. Pièges & misconceptions

- **Ne maquetter que l'état heureux.** Le défaut d'origine, déjà signalé en A04 au niveau du
  flow, et qui se reproduit au niveau du composant.

- **Laisser une case vide.** Interdit. Un X assumé est contestable en revue, un blanc est
  invisible jusqu'à la production.

- **Oublier la famille des droits.** C'est celle qui produit les pires expériences : laisser
  agir puis refuser.

- **Tester avec des données courtes et propres.** Le contenu extrême est le premier à arriver
  en production.

- **Confondre vide et erreur de chargement.** Deux messages, deux actions.

- **Redessiner la famille interaction.** Le design system la couvre : on la vérifie et on la
  note H, on ne la refait pas.

- **Produire une matrice exhaustive illisible.** Sans le critère de non-déductibilité, la
  matrice devient une bureaucratie que personne ne lit.

## 5. Ancrage TribuZen

- La matrice de l'Exemple A complète les six états listés en fin de module H02 : on passe
  d'une liste intuitive à une couverture vérifiable.
- Les cases **M** produites ici alimentent directement les labs Figma du bloc C : ce sont
  elles, et seulement elles, qui méritent d'être dessinées en variants.
- La colonne « lecture seule » est volontairement incomplète à ce stade et sera reprise après
  le module H04, qui définit les trois réponses possibles à « pas le droit ».

## 6. Points clés

1. Un bug d'interface en production est presque toujours une case de matrice que personne
   n'a dressée.
2. Quatre familles d'états : donnée, système, droit, interaction — les trois premières sont
   oubliées, la quatrième est refaite inutilement.
3. Le contenu extrême (texte le plus long réel, zéro, négatif, un seul élément, langue
   verbeuse) n'est pas marginal : il arrive en premier.
4. Chaque case porte M (maquetté), H (hérité du design system) ou X (hors périmètre assumé) —
   une case vide est interdite.
5. Le critère de tri est la non-déductibilité : si deux développeurs raisonnables
   produiraient deux résultats différents, il faut une maquette.
6. La matrice sert trois fois : en conception, en revue comme critère vérifiable, et en
   recette comme liste de cas à tester.

## 7. Seeds Anki

```
Quelles sont les quatre familles d'états d'un composant ?|Donnée (vide, un, beaucoup, zéro, négatif, texte long), système (chargement, erreur, lenteur, hors ligne, conflit), droit (lecture seule, non autorisé, non souscrit), interaction (survol, focus, désactivé...)
Quelles sont les trois valeurs possibles d'une case de matrice d'états ?|M maquetté (comportement non déductible), H hérité du design system, X hors périmètre explicitement — jamais vide
Pourquoi une case vide est-elle interdite dans une matrice d'états ?|Parce qu'une case vide n'est pas "rien à faire" mais "personne n'y a pensé" : c'est exactement ce qui produit les bugs d'interface
Quel critère décide qu'une case mérite une maquette ?|La non-déductibilité : si deux développeurs raisonnables produiraient deux résultats différents, il faut une maquette ; sinon la case est héritée
Quels sont les trois usages d'une matrice d'états ?|En conception (révéler les écrans manquants), en revue (critère vérifiable plutôt qu'avis), en recette (liste des cas à tester)
Pourquoi l'état "1 seul élément" est-il systématiquement un piège ?|Parce que tous les libellés écrits au pluriel par défaut cassent dessus ("1 éléments sélectionnés")
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/h03-matrice-etats/`. Tu y dresses la matrice complète
> d'un composant TribuZen existant avec zéro case vide, au moins un état de droit et un état
> de contenu extrême, puis tu produis les maquettes des seules cases marquées M — brief
> complet et rubrique dans le README du lab.
