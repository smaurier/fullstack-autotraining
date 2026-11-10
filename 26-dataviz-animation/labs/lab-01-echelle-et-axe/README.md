# Lab 01. Une échelle et un axe, à la main

> **Outcome :** à la fin, tu sais écrire les trois fonctions sur lesquelles repose toute
> visualisation, librairie ou pas : une échelle linéaire qui gère une étendue inversée, une
> échelle de racine pour encoder une aire, et des graduations lisibles. Et tu sais poser la
> géométrie d'un diagramme en barres dont la longueur encode vraiment la valeur.
>
> **Vrai outil :** aucun. Ce sont des fonctions **pures**, donc l'oracle vérifie des propriétés
> mathématiques et pas un rendu. C'est la seule façon de prouver qu'un encodage est fidèle : un
> rapport de valeurs doit se retrouver dans un rapport de longueurs, et c'est une assertion.
>
> **Feedback :** `npm run lab:01` depuis `labs/`. RED tant que `src/echelles.ts` ne satisfait
> pas l'oracle. `npm run solution:01` prouve que l'oracle est juste, et tu ne l'ouvres pas avant
> ton GREEN.

## Lire avant (une lecture bornée, pas le module entier)

Module [`01-encoder-une-donnee`](../../modules/01-encoder-une-donnee), **une fois** :

- § 1.1 le classement des variables visuelles, avec son tableau
- § 2 en entier, les échelles
- § 3.1 l'axe tronqué
- § 3.2 l'aire contre le rayon

Et module [`03-d3-comme-socle`](../../modules/03-d3-comme-socle) § 2 et § 3.1, pour voir la
forme que d3 donne aux mêmes objets. Tu n'utilises pas d3 ici : tu écris ce qu'il fait.

Ensuite : page blanche. Le module ne se rouvre qu'en dépannage ciblé, sur la section que le test
qui échoue désigne.

## Énoncé

`src/echelles.ts` contient quatre signatures et quatre `throw new Error("a implementer")`.
Tu les implémentes. Tu ne changes ni les noms, ni les signatures, ni les types.

```bash
npm run lab:01
```

Aucune dépendance n'est autorisée : si tu te retrouves à vouloir installer `d3-scale`, tu es
sorti du sujet. Le but du lab est précisément de savoir ce que `d3-scale` fait.

Quatre pièges t'attendent, et ils sont tous dans le module :

1. l'étendue d'un axe vertical en SVG s'écrit `[hauteur, 0]`, donc l'échelle doit fonctionner
   dans les deux sens ;
2. un domaine plat arrive dès que toutes les valeurs sont égales, et il ne doit pas rendre `NaN` ;
3. encoder une quantité sur un **rayon** de cercle élève l'écart au carré, donc il faut la racine ;
4. des graduations obtenues en divisant le domaine en cinq donnent `69,4` et `138,8` : un lecteur
   qui doit interpoler ne lit pas, il devine.

## Vérifier

Le contrat exact attendu par l'oracle :

| Ce qui est vérifié | Où c'est expliqué |
|---|---|
| `echelleLineaire` mappe les bornes du domaine sur les bornes de l'étendue | § 2.1 |
| elle gère une étendue **inversée**, qui est le cas normal en SVG | § 2.1 |
| elle est linéaire : un rapport de valeurs se retrouve dans les positions | § 1.1 |
| elle ne rend pas `NaN` sur un domaine plat | § 2.1 |
| `echelleRacine` encode l'**aire** : quatre fois la valeur, deux fois le rayon | § 3.2 |
| elle n'est pas linéaire, et c'est le point | § 3.2 |
| `graduationsRondes` rend des valeurs lisibles, pas des interpolations | § 2.3 |
| elle couvre le domaine sans le dépasser, et survit à un domaine plat | § 2.3 |
| `barresDepuis` part de **zéro** : la longueur encode la valeur | § 3.1 |
| la plus grande barre occupe toute la hauteur | § 2.1 |
| les barres restent dans le cadre, ne se chevauchent pas, gardent l'ordre | § 2.2 |
| le domaine est **calculé** : ajouter une valeur plus grande rééchelonne tout | § 2.1 |
| une liste vide ne casse rien | robustesse |

## Sonde de rougissement

Un oracle qui ne peut pas rougir ne prouve rien. Une fois au GREEN, tronque volontairement l'axe
dans `barresDepuis` :

```diff
  const maxi = Math.max(...donnees.map((d) => d.valeur));
+ const mini = Math.min(...donnees.map((d) => d.valeur));

- const y = echelleLineaire({ domaine: [0, maxi], etendue: [hauteur, 0] });
+ const y = echelleLineaire({ domaine: [mini, maxi], etendue: [hauteur, 0] });
```

Puis relance :

```bash
npm run lab:01
```

**Attendu :** le test « l'axe part de ZÉRO » échoue, et son message te donne le rapport obtenu
au lieu de 2. Si l'oracle reste vert après cette modification, il est cassé et ce lab ne compte
pas : signale-le.

C'est exactement le mensonge graphique du module 01 § 3.1, et tu viens de le rendre mesurable.

## Ce que ce lab ne demande pas

Il ne demande aucun rendu, aucun SVG, aucun DOM. Le dessin arrive au lab 02. Ici on établit que
les nombres sont justes, parce qu'un graphique faux et joli reste faux.
