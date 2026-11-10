# 01. Encoder une donnée

> **Outcome :** à la fin, tu sais choisir une variable visuelle en connaissant son efficacité
> relative, tu sais ce qu'une échelle fait à ta donnée, et tu reconnais les cinq mensonges
> graphiques les plus répandus, dont deux que presque tout le monde commet de bonne foi.
>
> **Lab :** [lab-01 : échelle et axe](../labs/lab-01-echelle-et-axe/README)

## 1. Le mécanisme : un graphique est un encodage

Un graphique n'est pas une illustration. C'est une **traduction** d'une donnée en une propriété
visuelle, et cette traduction est soit fidèle, soit fausse. Il n'y a pas de troisième cas.

```
donnée        →   échelle   →   variable visuelle   →   perception
340 inscrits      domaine        hauteur 212 px          « deux fois plus »
                  [0, 500]
```

Trois endroits où ça peut mentir, et ce module les traite dans cet ordre : le **choix de la
variable visuelle**, le **réglage de l'échelle**, et la **lecture** que l'œil en fait.

### 1.1 Les variables visuelles ne sont pas équivalentes

L'œil ne lit pas toutes les propriétés avec la même précision. L'ordre est connu, mesuré depuis
les années 1980, et il est stable :

| Rang | Variable | Précision de lecture | Bon pour |
|---|---|---|---|
| 1 | **position** sur une échelle commune | excellente | comparer des valeurs |
| 2 | **position** sur des échelles alignées | très bonne | petits multiples |
| 3 | **longueur** | bonne | barres |
| 4 | **angle**, **pente** | moyenne | tendances, camemberts |
| 5 | **aire** | faible | ordres de grandeur seulement |
| 6 | **teinte**, **saturation** | faible | catégories, pas quantités |
| 7 | **volume**, **courbure** | très faible | rien de quantitatif |

**La conséquence pratique est brutale :** si tu veux qu'on compare des valeurs, tu utilises une
position ou une longueur. Donc un diagramme en barres. Le camembert est au rang 4, et la bulle au
rang 5.

Ce n'est pas un interdit esthétique. C'est que l'œil se trompe davantage, et de façon
**mesurable** : sur une aire, l'erreur d'estimation d'un lecteur est couramment de 30 à 40 %.

### 1.2 Pourquoi un camembert est un mauvais défaut

Trois parts, ça passe. Huit parts, ça ne passe plus : comparer deux angles non adjacents est
l'une des tâches les moins précises de la liste. Et la variante en anneau retire le centre, donc
l'angle lui-même, ce qui ne laisse que la longueur d'arc.

La règle utile : **un camembert répond à une seule question**, « quelle part du tout ». Si la
question est « lequel est le plus grand » ou « comment ça évolue », c'est le mauvais graphique.

### 1.3 La couleur n'est pas une quantité

La teinte est catégorielle : rouge n'est pas « plus » que bleu. Pour encoder une quantité par la
couleur, il faut une **échelle séquentielle** sur la clarté, et elle reste au rang 6, donc à
réserver aux cartes de chaleur où aucune position n'est disponible.

Et le point qui relie au module 06 : **une information portée par la seule couleur est non
conforme**, critère `3.1 (A)`. Dans un graphique, cela veut dire qu'une légende par couleur seule
ne suffit pas : il faut un motif, une étiquette directe, ou un ordre.

## 2. Les échelles

Une échelle est une fonction : elle prend une valeur de ton **domaine** (les données) et rend une
valeur de ton **étendue** (des pixels, des couleurs).

### 2.1 Les quatre familles

```js
// Linéaire : pour des quantités continues. Le cas par défaut.
const y = scaleLinear().domain([0, 500]).range([hauteur, 0]);

// Logarithmique : quand les ordres de grandeur sont très différents.
// ⚠️ Impossible avec des zéros ou des négatifs dans le domaine.
const y = scaleLog().domain([1, 100_000]).range([hauteur, 0]);

// Ordinale par bande : pour des catégories. Rend aussi une largeur de barre.
const x = scaleBand().domain(['janvier', 'février', 'mars']).range([0, largeur]).padding(0.2);

// Temporelle : comme linéaire, mais avec des graduations qui tombent juste.
const x = scaleTime().domain([new Date('2026-01-01'), new Date('2026-12-31')]).range([0, largeur]);
```

Noter l'inversion de l'étendue sur l'axe vertical : `[hauteur, 0]`. En SVG, l'origine est en haut
à gauche, donc une valeur élevée doit donner un `y` **petit**. C'est l'erreur de débutant la plus
fréquente, et elle produit un graphique à l'envers, pas une erreur.

### 2.2 Le domaine se calcule, il ne s'écrit pas

```js
// ⛔ Fragile : la donnée dépassera un jour, et la barre sortira du cadre
.domain([0, 500])

// ✅ Calculé depuis la donnée
.domain([0, Math.max(...valeurs)])

// ✅ Et avec une marge, pour que la plus grande barre ne touche pas le bord
.domain([0, Math.max(...valeurs) * 1.05])
```

### 2.3 `nice()`, et pourquoi les graduations sauvages gênent

Un domaine calculé donne `[0, 347]`, donc des graduations à 0, 69,4, 138,8… illisibles.
`nice()` arrondit le domaine aux bornes « rondes » les plus proches, ici `[0, 350]`.

C'est un détail de lisibilité, et il compte : un lecteur qui doit interpoler entre 69,4 et 138,8
ne lit pas, il devine.

## 3. Les cinq mensonges graphiques

Les deux premiers sont commis de bonne foi, tous les jours.

### 3.1 L'axe tronqué

```js
// Les valeurs vont de 320 à 340. L'axe part de 315 : l'écart paraît ENORME.
.domain([315, 345])
```

Une variation de 6 % occupe alors toute la hauteur du graphique. Ce n'est pas faux
arithmétiquement, et c'est trompeur perceptivement, parce que la **longueur** de la barre n'est
plus proportionnelle à la valeur.

**La règle :** pour un diagramme en **barres**, l'axe commence à zéro. Toujours. La longueur est
l'encodage, et une longueur tronquée est un mensonge.

**L'exception :** pour une **courbe**, l'encodage est la *pente*, pas la longueur. Tronquer y est
légitime, et souvent nécessaire pour voir quoi que ce soit. Mais il faut alors le **signaler**,
par une rupture d'axe visible ou une mention.

C'est la distinction qui sépare quelqu'un qui a appris la règle par cœur de quelqu'un qui l'a
comprise : « toujours commencer à zéro » est faux pour une courbe.

### 3.2 L'aire contre le rayon

```js
// ⛔ Une valeur 4 fois plus grande donne un cercle 4 fois plus LARGE,
//    donc 16 fois plus GRAND en surface. L'œil lit l'aire.
const r = scaleLinear().domain([0, max]).range([0, 40]);

// ✅ On encode l'AIRE, donc le rayon suit une racine carrée
const r = scaleSqrt().domain([0, max]).range([0, 40]);
```

Le piège est que les deux versions « marchent » et produisent un joli graphique. La première
multiplie les écarts par leur carré, silencieusement. C'est le mensonge le plus fréquent des
cartes à bulles, et il est presque toujours involontaire.

### 3.3 Le double axe

Deux séries, deux axes verticaux d'échelles différentes. Le problème : **le point de croisement
des deux courbes n'a aucune signification**, et il dépend entièrement du réglage choisi. On peut
faire dire ce qu'on veut en déplaçant une borne.

L'alternative honnête : deux graphiques empilés partageant l'axe horizontal, ou une normalisation
explicite, par exemple en indice base 100.

### 3.4 L'ordre arbitraire des catégories

Un diagramme en barres dont les catégories sont rangées par ordre alphabétique rend la
comparaison inutilement difficile. Trier par valeur rend la question « lequel est le plus grand »
immédiate.

Deux exceptions où l'ordre naturel primes : un ordre **temporel**, et un ordre **intrinsèque**
comme des tranches d'âge.

### 3.5 Le volume

Un cube ou un pictogramme redimensionné dans les trois dimensions multiplie l'écart par son cube.
Rang 7 du tableau du § 1.1. À ne jamais utiliser pour une quantité.

## 4. Ce que l'enquête interroge, et où c'est traité

Aucun item d'enquête n'est rattaché à ce module, et c'est une information en soi : **aucune
enquête ne demande « savez-vous choisir une variable visuelle ».** Elles demandent quelle
librairie tu utilises.

C'est précisément pour ça que ce module existe en premier. Une librairie te donnera un camembert
à huit parts avec un rayon proportionnel à la valeur, sans broncher : la justesse de l'encodage
n'est pas de son ressort, elle est du tien.

## 5. Les pièges

1. **Oublier d'inverser l'étendue verticale.** Le graphique est à l'envers, sans erreur.
2. **Écrire le domaine en dur.** La donnée dépassera.
3. **Encoder une quantité sur un rayon linéaire.** Les écarts sont élevés au carré.
4. **Tronquer l'axe d'un diagramme en barres.** La longueur cesse d'encoder la valeur.
5. **Appliquer « toujours commencer à zéro » à une courbe.** C'est faux : l'encodage y est la
   pente.
6. **Choisir un camembert pour comparer.** Rang 4, et pire au-delà de trois parts.
7. **Encoder une quantité par la teinte.** Catégorielle, et non conforme `3.1 (A)` si elle porte
   seule l'information.
8. **Trier par ordre alphabétique** ce qui demande à être comparé.

## 6. Lire avant le lab

Pour [lab-01](../labs/lab-01-echelle-et-axe/README) : § 1.1 et son tableau, § 2 en entier, § 3.1
et § 3.2. Une lecture, puis page blanche.

## 7. Auto-test

1. Classe par précision de lecture : aire, position sur échelle commune, angle, longueur.
2. Pourquoi l'étendue d'une échelle verticale s'écrit-elle `[hauteur, 0]` ?
3. Quelle échelle pour encoder une quantité sur la taille d'un cercle, et pourquoi ?
4. Un diagramme en barres doit-il toujours partir de zéro ? Et une courbe ? Justifie par
   l'encodage.
5. Pourquoi le croisement de deux courbes sur un double axe n'a-t-il aucun sens ?
6. À quelle unique question un camembert répond-il correctement ?
7. Pourquoi aucune enquête n'interroge le sujet de ce module ?
