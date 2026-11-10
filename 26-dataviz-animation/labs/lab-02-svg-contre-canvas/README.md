# Lab 02. SVG contre Canvas, mesuré dans l'arbre

> **Outcome :** à la fin, tu as fait l'expérience de la différence entre les deux substrats
> plutôt que de l'avoir lue. Tu sais qu'un SVG laissé tel quel inonde l'arbre d'accessibilité de
> nœuds vides, qu'un canvas n'y expose rien du tout, et que dans les deux cas le travail est à
> ta charge, mais que ce n'est pas le même travail.
>
> **Vrai outil :** un navigateur réel (Chromium via Playwright), l'arbre d'accessibilité calculé
> lu par CDP, et `axe-core`. L'oracle compare ce que les deux substrats **exposent**, pas ce
> qu'ils affichent.
>
> **Feedback :** `npm run lab:02` depuis `labs/`. RED tant que `src/` ne satisfait pas l'oracle.
> `npm run solution:02` prouve que l'oracle est juste, et tu ne l'ouvres pas avant ton GREEN.

## Lire avant (une lecture bornée, pas le module entier)

Module [`02-svg-canvas-webgl`](../../modules/02-svg-canvas-webgl), **une fois** :

- § 1 et son tableau de comparaison
- § 1.1 ce que SVG coûte, et où
- § 1.3 `devicePixelRatio`
- § 4 la règle de choix

Et module [`06-graphiques-accessibles`](../../modules/06-graphiques-accessibles) § 3.2, juste
pour la règle sur l'alternative : elle doit donner les repères, pas décrire le contenant.

Ensuite : page blanche.

## Énoncé

`src/index.html` et `src/rendu.js` dessinent **le même graphique deux fois** : une fois en SVG,
une fois en Canvas. À l'écran, ils sont indiscernables. Dans l'arbre d'accessibilité, l'un
n'existe pas et l'autre existe mal.

Tu corriges les deux, chacun selon sa nature :

- le **SVG** a un contenu, donc le travail consiste à le discipliner : un seul nœud utile,
  nommé, et les marques exclues de l'arbre ;
- le **canvas** n'a aucun contenu, donc le travail consiste à lui en donner un : un rôle, un nom
  qui dit les chiffres, et un chemin vers les données ;
- les deux partagent un **tableau de données équivalent**, visible pour tout le monde.

Il y a aussi un défaut qui ne concerne pas l'accessibilité : le canvas est flou. Le module 02
§ 1.3 dit pourquoi en trois lignes.

```bash
npm run lab:02
```

## Vérifier

Le contrat exact attendu par l'oracle :

| Ce qui est vérifié | Critère ou section |
|---|---|
| le SVG est **une** image nommée dans l'arbre, pas des dizaines de nœuds | `1.1 (A)` |
| les marques du SVG sortent de l'arbre, et l'arbre entier reste sous 60 nœuds | module 02 § 1.1 |
| le canvas reçoit un rôle `img` et un nom accessible | `1.1 (A)` |
| le nom du canvas contient des **chiffres** : il dit l'information, pas le contenant | `1.3 (A)` |
| un tableau de données équivalent existe, et il est atteignable | `1.3 (A)` |
| le tableau n'est **pas** en masquage visuel : il sert tout le monde | module 06 § 5.1 |
| le canvas est net sur un écran à haute densité | module 02 § 1.3 |
| `axe` ne trouve aucune violation | nécessaire, pas suffisant |

Note l'assertion sur le nombre de nœuds : c'est elle qui transforme « le SVG encombre l'arbre »
en fait vérifiable. Sans `aria-hidden` sur le groupe de marques, elle passe de quelques dizaines
à plus d'une centaine.

## Sonde de rougissement

Un oracle qui ne peut pas rougir ne prouve rien. Une fois au GREEN, retire l'exclusion des
marques dans `src/index.html` :

```diff
- <g id="marques-svg" aria-hidden="true"></g>
+ <g id="marques-svg"></g>
```

Puis relance :

```bash
npm run lab:02
```

**Attendu :** le test « les marques du SVG sortent de l'arbre » échoue, et son message te donne
le nombre de nœuds réellement comptés. Si l'oracle reste vert, il est cassé et ce lab ne compte
pas : signale-le.

Remets l'attribut ensuite.

## Ce que ce lab ne demande pas

Il ne demande pas de choisir un substrat « meilleur ». Les deux sont justes dans leur domaine,
et c'est la règle de choix du § 4 qui tranche, pas le confort. Il ne demande pas non plus de
WebGL : le module l'explique, le lab ne l'exerce pas, parce que le seuil où WebGL devient
nécessaire n'est pas atteint par un graphique de quatre barres.
