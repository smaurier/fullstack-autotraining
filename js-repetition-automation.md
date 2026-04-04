# Automatisation de la répétition JavaScript

## Objectif

Transformer la répétition JS du curriculum en système mesurable plutôt qu'en ajouts ponctuels.

## Problème

Aujourd'hui, les rappels JS existent déjà mais ils sont dispersés :

- certains sont explicites dans les labs ;
- d'autres n'existent que dans les solutions ;
- d'autres encore sont présents dans les modules mais pas réactivés en pratique.

Le risque n'est pas le manque de contenu, mais le manque de pilotage de la répétition.

## Principe

Pour chaque concept JS important, on veut connaître :

1. sa première exposition ;
2. ses occurrences de réactivation ;
3. son contexte d'usage ;
4. son nombre total de répétitions dans le parcours.

## Concepts à suivre en priorité

- destructuring
- spread
- template literals
- JSON.parse / JSON.stringify
- RegExp
- matchAll
- call / apply / bind
- Promise.finally
- callback error-first
- Object.entries / Object.fromEntries / Object.keys / Object.values
- Set
- prototype / Object.create
- try / catch / finally
- generators / iterators
- URLSearchParams

## Convention légère

Quand un lab ajoute un rappel explicite, préférer un commentaire visible de ce type :

```ts
// TODO : Rappel JS — Object.entries
// TODO : Rappel JS avance — generators
```

Cette convention n'est pas obligatoire pour l'historique, mais elle facilite l'audit automatique.

## Ce qu'on peut automatiser dès maintenant

### 1. Audit de présence

Le script [scripts/audit-js-repetition.mjs](scripts/audit-js-repetition.mjs) scanne les cours ciblés et remonte :

- les concepts détectés ;
- leurs occurrences ;
- les concepts absents ou faiblement répétés.

### 2. Détection des angles morts

On peut fixer un seuil simple :

- 1 occurrence = fragile
- 2 occurrences = acceptable
- 3 occurrences ou plus = ancrage correct

### 3. Priorisation des futurs enrichissements

Les prochaines itérations doivent d'abord renforcer les concepts à 0 ou 1 occurrence utile, par exemple :

- Proxy / Reflect
- Intl / Date / timezones
- URL / URLSearchParams
- iterables / generators

## Étape suivante recommandée

Ajouter une petite couche de métadonnées structurées dans les labs, par exemple :

```ts
// JS-REPETITION: generators,urlsearchparams
```

Avantage : l'audit devient fiable sans heuristiques.

## Règle de conception

Une répétition utile doit toujours :

1. apparaître dans un contexte métier crédible ;
2. rester courte ;
3. réactiver un concept déjà vu, pas ouvrir un nouveau tunnel théorique ;
4. être visible côté exercice, pas seulement dans la solution.
