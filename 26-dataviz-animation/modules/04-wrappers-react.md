# 04. Les wrappers React

> **Outcome :** à la fin, tu sais départager `recharts`, `nivo`, `visx`, `victory`, `tremor` et
> `react-vis` sur cinq axes mesurables, et tu sais pourquoi « quel est le meilleur » n'est pas la
> bonne question.

## 1. Deux familles, pas une

La confusion la plus coûteuse de ce domaine. Ces six noms ne font pas la même chose.

| Famille | Ce que tu écris | Ce que tu contrôles | Exemples |
|---|---|---|---|
| **Composants finis** | `<LineChart data={…} />` | ce que les props exposent | `recharts`, `nivo`, `victory`, `tremor`, `react-vis` |
| **Primitives** | ton propre graphique, avec leurs briques | tout | `visx` |

`visx` n'est pas « un meilleur recharts ». C'est une collection de primitives, maintenue par
Airbnb, qui enveloppe les modules de calcul de D3 dans des composants React. Tu assembles
toi-même les axes, les marques et les interactions. Donc plus de travail, et aucune limite.

**La question utile n'est donc pas « lequel est le meilleur », mais « à quelle distance de mes
besoins se trouve le cadre que j'accepte ».**

## 2. La grille, cinq axes

Pour chaque candidat, cinq questions auxquelles on peut répondre par une mesure ou par une
lecture de documentation, jamais par une impression.

### Axe 1. Jusqu'où va le cadre, et que se passe-t-il quand on en sort ?

C'est l'axe décisif, et le plus oublié. Tout va bien jusqu'au jour où le design demande une
annotation, un axe cassé, une série en escalier mêlée à une série lisse, ou un survol
personnalisé.

Trois réponses possibles, et il faut savoir laquelle tu achètes :

- **on peut composer** : la librairie expose des sous-composants et accepte des enfants
  arbitraires. `recharts` et `visx` sont de ce côté ;
- **on peut configurer** : une prop existe peut-être. `nivo` et `victory` sont très
  configurables, mais dans leur cadre ;
- **on recommence** : rien n'est prévu, il faut sortir de la librairie pour ce graphique-là.

**Le symptôme d'un mauvais choix** n'est pas une lenteur, c'est un graphique sur dix réécrit à
part, avec un rendu qui ne ressemble pas aux neuf autres.

### Axe 2. Le poids réel, mesuré

```bash
# Le poids annonce par la page d'accueil n'est pas le poids que TU paieras.
npx source-map-explorer dist/assets/*.js
```

Ce qui compte est le poids **après élagage**, sur ton usage réel. Une librairie monolithique fait
entrer tous ses types de graphiques pour un seul utilisé ; une librairie modulaire n'apporte que
ce que tu importes. Le rapport entre les deux atteint couramment un facteur cinq.

### Axe 3. L'accessibilité livrée

**L'axe sur lequel presque personne ne compare**, et c'est le sujet du module 06. Trois questions
à poser à la documentation :

1. Le graphique a-t-il un **rôle** et un **nom accessible** par défaut ?
2. Un **tableau de données équivalent** est-il fourni, ou faut-il l'écrire ?
3. Les séries sont-elles distinguables **autrement que par la couleur** ?

Si la documentation ne répond pas aux trois, la réponse est non, et c'est à ta charge. Ce n'est
pas disqualifiant, c'est une charge à chiffrer.

### Axe 4. La maintenance

Dernière version publiée, nombre de mainteneurs, et surtout : la librairie suit-elle les versions
de React ? Une librairie de graphiques qui bloque une mise à jour de React est une dette qui se
paie au pire moment.

### Axe 5. Le rendu par défaut

Combien de lignes pour qu'un graphique soit **présentable** ? Certaines librairies sortent un
rendu correct d'emblée, d'autres demandent trente lignes de thème. Cet axe compte surtout quand
on fait beaucoup de graphiques et peu de design.

## 3. Les candidats, caractérisés

Les caractérisations ci-dessous sont des **points de départ de vérification**, pas des verdicts :
l'axe 4 bouge, et c'est à toi de le relever au moment du choix.

**`recharts`** : composants finis, mais **composables** : un graphique se construit en imbriquant
`<CartesianGrid>`, `<XAxis>`, `<Line>`, `<Tooltip>`. Le compromis le plus équilibré entre « ça
marche tout de suite » et « je peux sortir du cadre ». S'appuie sur D3 pour les calculs.

**`nivo`** : très riche, très configurable, un rendu par défaut soigné, et beaucoup de types de
graphiques peu courants. Le cadre est confortable et plus fermé : on configure plutôt qu'on
compose.

**`visx`** : des primitives. C'est le choix quand le design est une contrainte forte ou quand le
graphique est le produit. Demande d'avoir compris les modules 01 et 03, sinon on réinvente des
mensonges graphiques avec de belles briques.

**`victory`** : composants finis, une API de longue date, une attention particulière portée aux
plateformes mobiles.

**`tremor`** : orienté tableaux de bord, pensé avec Tailwind, et bien plus que des graphiques :
des cartes, des indicateurs, des listes. Le bon choix quand on fait un tableau de bord et non une
visualisation.

**`react-vis`** : historique. À vérifier en premier sur l'axe 4.

## 4. L'arbre de décision

```
Le graphique est-il le produit, ou un élément d'interface ?
├── le produit            → visx, et les modules 01 et 03 d'abord
└── un élément
    ├── c'est un tableau de bord                  → tremor
    ├── j'ai besoin de types inhabituels          → nivo
    └── cas courant, et je veux pouvoir sortir du cadre → recharts
```

Et une branche qu'on oublie : **ai-je besoin d'une librairie ?** Un graphique en barres simple,
c'est une boucle de `<rect>` et deux échelles. Le lab 01 le prouve en une trentaine de lignes. Au
prix de zéro dépendance, de zéro contrainte de design et d'une accessibilité maîtrisée.

C'est la question 3 de la grille du cours 25 module 21 : est-ce que ça remplace du code, ou ça en
ajoute ? Pour un seul graphique simple, une librairie **ajoute**.

## 5. L'accessibilité dans ce module

L'axe 3 est le sujet du module 06, et il s'applique à toutes ces librairies de la même façon :
ce qui n'est pas livré est à ta charge, et il faut le savoir **avant** de choisir.

Un point structurel vaut pour la famille entière : plus une librairie rend de DOM à ta place,
moins tu contrôles son arbre d'accessibilité. `visx` te laisse tout écrire, donc tout contrôler.
Une librairie à composants finis t'oblige à passer par ses props, et si la prop n'existe pas,
l'attribut ne peut pas être posé.

C'est le même arbitrage qu'au cours 25 module 16 entre styler le natif et reconstruire : plus
d'abstraction, moins de prise.

## 6. Ce que l'enquête interroge, et où c'est traité

Items rattachés à ce module : `recharts`, `nivo`, `visx`, `victory`, `tremor`, `react_vis`.

Lecture utile de la question `data_visualization_libraries` de State of React : elle mélange
dans une même liste des composants finis et des primitives, ce qui est exactement la confusion du
§ 1. Un score de satisfaction y compare donc des objets de nature différente, et ne dit rien de
ce qui doit guider ton choix.

## 7. Les pièges

1. **Comparer `visx` à `recharts`.** Primitives contre composants finis : pas la même famille.
2. **Choisir sur le rendu par défaut.** C'est l'axe 5, le moins important à long terme.
3. **Ne pas poser les trois questions d'accessibilité.** La charge existe quand même, elle est
   juste découverte plus tard.
4. **Mesurer le poids sur la page d'accueil du projet** au lieu de son propre bundle.
5. **Oublier de demander si on peut sortir du cadre.** Un graphique sur dix réécrit à part, et un
   rendu incohérent.
6. **Prendre une librairie pour un seul graphique simple.** Deux échelles et une boucle suffisent.
7. **Négliger l'axe 4.** Une librairie de graphiques peut bloquer une montée de version de React.

## 8. Auto-test

1. Quelle est la différence de nature entre `visx` et `recharts` ?
2. Énonce les cinq axes de la grille.
3. Quel est l'axe décisif, et quel est le symptôme d'un mauvais choix sur cet axe ?
4. Quelles trois questions poser à la documentation sur l'accessibilité ?
5. Comment mesure-t-on le poids réel d'une librairie de graphiques ?
6. Dans quel cas n'as-tu besoin d'aucune librairie ?
7. Pourquoi un score de satisfaction d'enquête est-il peu utile sur cette question précise ?
