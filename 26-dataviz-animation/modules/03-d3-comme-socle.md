# 03. D3 comme socle, pas comme librairie de graphiques

> **Outcome :** à la fin, tu sais que D3 n'est pas une librairie de graphiques mais une boîte à
> outils, tu sais utiliser ses échelles et ses générateurs **sans** lui laisser le DOM, et tu
> sais pourquoi c'est devenu la façon normale de l'employer.
>
> **Lab :** [lab-01 : échelle et axe](../labs/lab-01-echelle-et-axe/README)

## 1. Le malentendu fondateur

D3 ne dessine pas de graphiques. Il n'a pas de fonction `barChart()`. Ce qu'il fournit, ce sont
des **briques** :

| Module | Ce qu'il donne | Dessine-t-il ? |
|---|---|---|
| `d3-scale` | des fonctions valeur vers pixel | non |
| `d3-shape` | des générateurs de chemins SVG, sous forme de **chaînes** | non |
| `d3-array` | extremums, quantiles, regroupements, bissection | non |
| `d3-axis` | des axes, et là oui, il touche au DOM | oui |
| `d3-selection` | une manipulation du DOM à la jQuery | oui |
| `d3-interpolate`, `d3-color` | interpolation de valeurs et de couleurs | non |
| `d3-geo`, `d3-hierarchy`, `d3-force` | projections, arbres, simulations | non |

**La distinction qui change tout :** les modules de la colonne « non » sont des fonctions pures.
Ils prennent des nombres et rendent des nombres ou des chaînes. Ils n'ont aucune opinion sur
React, Vue, ou le DOM.

## 2. La façon moderne de l'employer

L'usage historique laissait D3 manipuler le DOM par `d3-selection`, avec le motif
`enter`/`update`/`exit`. Dans une application React ou Vue, cela produit **deux systèmes qui se
disputent le même DOM**, ce qui est une source de bugs difficiles.

L'usage actuel, et le seul que ce cours enseigne :

```js
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { max } from 'd3-array';

// D3 CALCULE. Il ne touche à rien.
const x = scaleBand().domain(mois).range([0, largeur]).padding(0.2);
const y = scaleLinear().domain([0, max(donnees, (d) => d.inscrits)]).nice().range([hauteur, 0]);

const chemin = line()
  .x((d) => x(d.mois) + x.bandwidth() / 2)
  .y((d) => y(d.inscrits))
  .curve(curveMonotoneX)(donnees);   // → une chaîne "M0,120L40,80…"
```

Puis **ton framework rend**, en l'occurrence du JSX :

```jsx
<svg viewBox={`0 0 ${largeur} ${hauteur}`} role="img" aria-labelledby="titre-graphe">
  <title id="titre-graphe">Inscriptions par mois, 2026</title>
  <path d={chemin} fill="none" stroke="currentColor" strokeWidth="2" />
  {donnees.map((d) => (
    <circle key={d.mois} cx={x(d.mois) + x.bandwidth() / 2} cy={y(d.inscrits)} r="4" />
  ))}
</svg>
```

Trois bénéfices, et le troisième est le plus important :

1. **Un seul système touche le DOM**, donc pas de conflit.
2. **Le rendu est inspectable** comme n'importe quel composant.
3. **L'accessibilité est à sa place** : le `role`, le `<title>`, les attributs ARIA sont écrits
   dans ton balisage, et non injectés par une bibliothèque. C'est le module 06.

## 3. Les briques utiles, en pratique

### 3.1 Les échelles, au-delà du module 01

```js
import { scaleSqrt, scaleOrdinal, scaleQuantize, scaleSequential } from 'd3-scale';
import { interpolateViridis } from 'd3-scale-chromatic';

// Aire, pas rayon : rappel du module 01 § 3.2
const r = scaleSqrt().domain([0, max(donnees, (d) => d.total)]).range([2, 28]);

// Catégories vers couleurs
const couleur = scaleOrdinal().domain(ateliers).range(palette);

// Quantité vers couleur, pour une carte de chaleur
const chaleur = scaleSequential(interpolateViridis).domain([0, maxi]);
```

Un mot sur les palettes séquentielles : les palettes dites perceptuellement uniformes, comme
viridis, ont été construites pour que des écarts égaux de valeur donnent des écarts égaux de
**clarté perçue**. C'est la même idée qu'OKLCH au cours 25 module 10, appliquée à une rampe.
Elles restent aussi lisibles en niveaux de gris, ce qui est un bon indice de conformité à
`3.1 (A)`.

### 3.2 Les générateurs de forme

```js
import { line, area, arc, pie, stack, curveMonotoneX, curveStepAfter } from 'd3-shape';
```

Le choix de la courbe n'est pas décoratif : `curveMonotoneX` n'invente pas d'extremum entre deux
points, alors qu'une courbe cardinale peut dépasser les valeurs réelles. **Une interpolation qui
dépasse les données est un mensonge graphique**, au même titre que ceux du module 01.

Pour une donnée en escalier, un stock relevé une fois par jour par exemple, `curveStepAfter` dit
la vérité et la ligne droite non.

### 3.3 `d3-array`, sous-estimé

```js
import { max, extent, bisector, group, rollup, quantile } from 'd3-array';

const [mini, maxi] = extent(donnees, (d) => d.inscrits);     // domaine en une ligne
const parAtelier = group(donnees, (d) => d.atelier);          // une Map
const totaux = rollup(donnees, (v) => v.length, (d) => d.atelier);
const median = quantile(valeurs, 0.5);
```

À noter : `group` et `rollup` font ce que `Map.groupBy` du cours 10 module 16 fait désormais
nativement pour le premier cas. Si tu n'utilises D3 que pour ça, **tu n'as plus besoin de D3**.

### 3.4 Les axes : la seule brique qui touche le DOM

```js
import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

// Dans un effet, sur une ref : c'est l'exception assumée
useEffect(() => {
  select(refAxe.current).call(axisBottom(x));
}, [x]);
```

C'est acceptable, et c'est aussi parfaitement remplaçable : un axe est une ligne, des
graduations et des étiquettes, donc une boucle de JSX d'une quinzaine de lignes. Le lab 01 le
fait à la main, exprès, parce qu'un axe écrit soi-même est un axe dont on contrôle
l'accessibilité et le nombre de graduations.

## 4. Le coût, et comment ne pas le payer

D3 est **modulaire**. Importer `d3` entier tire tout, y compris les projections géographiques et
la simulation de forces dont tu n'as pas besoin.

```js
// ⛔ tire l'ensemble
import * as d3 from 'd3';

// ✅ seulement ce qui sert
import { scaleLinear } from 'd3-scale';
import { line } from 'd3-shape';
```

C'est l'application directe de la question 3 de la grille du cours 25 module 21 : est-ce que ça
remplace du code existant, ou est-ce que ça en ajoute ? Importer `d3-scale` pour des échelles
remplace du code mathématique délicat. Importer `d3` entier ajoute trois cents kilo-octets.

## 5. L'accessibilité dans ce module

D3 n'en fournit **aucune**, et c'est normal : il ne rend pas de DOM dans l'usage enseigné ici.
Toute l'accessibilité est donc dans **ton** balisage, ce qui est une bonne nouvelle : rien ne
t'est imposé, rien ne t'est caché.

Les critères s'appliquent à ce que tu écris, et le module 06 les traite : `1.1 (A)` et `1.3 (A)`
pour l'alternative, `3.1 (A)` pour ne pas tout dire par la couleur, `3.3 (AA)` pour le contraste
des séries.

Un point précis, pour les axes faits à la main : les étiquettes de graduation doivent rester
lisibles à 200 % de zoom, critère `10.4 (AA)`, donc exprimées en unités relatives et non en
pixels fixes dans un `viewBox` qui ne les suit pas.

## 6. Ce que l'enquête interroge, et où c'est traité

Item rattaché à ce module : `d3`.

Son score dans les enquêtes est trompeur. D3 est très utilisé, et de moins en moins pour
dessiner : il est devenu une dépendance **de calcul**, souvent présente par l'intermédiaire
d'une autre librairie. `visx` et `recharts` du module 04 s'appuient tous deux sur ses échelles.

## 7. Les pièges

1. **Chercher `d3.barChart()`.** Ça n'existe pas, et ce n'est pas un oubli.
2. **Laisser `d3-selection` manipuler le DOM dans une application React ou Vue.** Deux systèmes,
   un seul DOM.
3. **Importer `d3` en entier.**
4. **Choisir une courbe qui dépasse les données.** `curveMonotoneX` plutôt qu'une cardinale.
5. **Utiliser une ligne droite pour une donnée en escalier.**
6. **Garder D3 uniquement pour `group`.** `Map.groupBy` est native, cours 10 module 16.
7. **Oublier que les échelles sont des fonctions pures**, donc testables sans DOM, ce qui est
   exactement ce que le lab 01 exploite.

## 8. Lire avant le lab

Pour [lab-01](../labs/lab-01-echelle-et-axe/README) : § 2 en entier, § 3.1 et § 3.2, § 5. Plus
le module 01 § 2 et § 3.

## 9. Auto-test

1. Pourquoi D3 n'a-t-il pas de fonction `barChart()` ?
2. Quels modules de D3 ne touchent jamais au DOM, et pourquoi est-ce ce qui les rend utilisables
   partout ?
3. Que se passe-t-il quand `d3-selection` et React se disputent le même nœud ?
4. Pourquoi `curveMonotoneX` plutôt qu'une courbe cardinale ?
5. Que gagne-t-on à écrire son axe à la main plutôt qu'avec `d3-axis` ?
6. Quelle accessibilité D3 fournit-il, et pourquoi est-ce une bonne nouvelle ?
7. Dans quel cas n'as-tu plus besoin de D3 du tout ?
