# 02. SVG, Canvas, WebGL

> **Outcome :** à la fin, tu sais choisir ton substrat sur des critères mesurables, et tu sais
> que ce choix est **d'abord** un choix d'accessibilité, pas de performance.
>
> **Lab :** [lab-02 : SVG contre Canvas](../labs/lab-02-svg-contre-canvas/README)

## 1. Le mécanisme : trois natures différentes

| | SVG | Canvas 2D | WebGL |
|---|---|---|---|
| Nature | des **éléments du DOM** | une **image** pilotée par script | un **pipeline GPU** |
| Chaque forme est | un nœud, inspectable, stylable | des pixels, rien de plus | un triangle |
| Dans l'arbre d'accessibilité | **oui** | **non** : un seul nœud opaque | **non** |
| Évènements par forme | oui, natifs | non : à calculer soi-même | non |
| Style en CSS | oui | non | non |
| Coût | un nœud par forme | une passe de dessin | le GPU |
| Plafond pratique | quelques milliers de nœuds | quelques dizaines de milliers | millions |

### 1.1 La conséquence qu'on n'anticipe pas

Un canvas est, pour une technologie d'assistance, **une image sans alternative**. Pas un
graphique dégradé : rien.

```html
<!-- Ce que le lecteur d'écran « voit » d'un canvas -->
<canvas width="600" height="400"></canvas>
<!-- → un élément sans rôle, sans nom, sans contenu -->
```

Donc : **passer de SVG à Canvas pour gagner en performance transforme un graphique accessible en
image muette**, et il faut reconstruire l'accessibilité à la main, par un tableau équivalent et
une description. C'est faisable, c'est le module 06, et c'est du travail.

La règle de décision qui en découle, et elle est l'inverse de celle qu'on entend d'habitude :
**commence par SVG, et ne change que quand tu as mesuré que ça ne tient pas.** Le seuil n'est
pas théorique, il se mesure, et c'est l'objet du lab 02.

### 1.2 Où est le vrai coût de SVG

Pas dans le dessin : dans le **nombre de nœuds**. Chaque `<circle>` est un élément du DOM, avec
son style calculé, sa participation au layout, ses écouteurs potentiels. Mille nœuds passent
sans effort ; cinquante mille font ramer le navigateur, et surtout toute **mise à jour** devient
coûteuse, parce qu'elle touche l'arbre.

C'est le même mécanisme que le pipeline du cours 25 module 04 : ce qui coûte, c'est de refaire le
layout et le style, pas de peindre.

### 1.3 Canvas : ce qu'il faut recoder

Passer à Canvas, c'est perdre et devoir réécrire :

- **la détection de survol** : plus d'évènement par forme. Il faut soit une recherche
  géométrique, soit un canvas caché qui encode un identifiant par couleur ;
- **le style** : plus de CSS, tout est en paramètres de dessin ;
- **l'accessibilité** : voir § 1.1 ;
- **la netteté** : il faut gérer `devicePixelRatio` à la main, sinon c'est flou sur un écran à
  haute densité.

```js
// Sans ça, un canvas est flou sur tout écran moderne
const dpr = window.devicePixelRatio || 1;
canvas.width = largeurCss * dpr;
canvas.height = hauteurCss * dpr;
canvas.style.inlineSize = `${largeurCss}px`;
canvas.style.blockSize = `${hauteurCss}px`;
contexte.scale(dpr, dpr);
```

### 1.4 WebGL : quand, et à quel prix

Au-delà de quelques dizaines de milliers de marques, ou pour un rendu continu à soixante images
par seconde. Le prix : un modèle de programmation entièrement différent, aucune accessibilité
native, et une dette de maintenance réelle.

Pour ce cours, WebGL arrive au module 07 par `pixi_js` et `three_js`, c'est-à-dire par des
librairies qui en masquent le pipeline. La 3D pour elle-même est le cours 23.

## 2. La règle de choix, en trois questions

1. **Combien de marques à l'écran, au maximum réel ?** Moins de deux mille, SVG sans réfléchir.
2. **Faut-il interagir avec chaque marque ?** Si oui, SVG donne les évènements gratuitement, et
   Canvas demande de les recoder.
3. **Y a-t-il un rendu continu ?** Une animation à soixante images par seconde sur beaucoup
   d'éléments pousse vers Canvas ou WebGL.

Et une quatrième question, qui n'est pas technique : **qui maintiendra ça ?** Un graphique SVG se
débogue dans l'inspecteur. Un canvas se débogue avec des `console.log` et de la patience.

## 3. Le cas hybride, souvent le bon

```
SVG pour les axes, les étiquettes, la légende, les éléments interactifs
Canvas pour le nuage de 50 000 points, superposé en dessous
```

On garde l'accessibilité et le style là où ils comptent, et la performance là où elle manque.
C'est la solution qu'utilisent la plupart des librairies sérieuses quand le volume monte, et elle
est rarement envisagée spontanément.

## 4. L'accessibilité dans ce module

Le choix du substrat **est** une décision d'accessibilité, et c'est le point à retenir.

| Substrat | Ce qui est fourni | Ce qui reste à faire |
|---|---|---|
| SVG | des nœuds inspectables, stylables, focusables | `role="img"` plus alternative, ou une structure navigable |
| Canvas | **rien** | tout : rôle, nom, alternative, tableau équivalent |
| WebGL | **rien** | tout, idem |

Les critères concernés, traités en détail au module 06 : `1.1 (A)` et `1.3 (A)` pour
l'alternative, `4.8 (A)` et `4.9 (A)` pour les médias non temporels, `3.3 (AA)` pour le
contraste des séries.

Note sur `4.8` et `4.9` : le référentiel traite `canvas` et le SVG animé comme des **médias non
temporels**, qui doivent avoir une alternative équivalente. Le cours 25 les a déclarés hors de
son périmètre en renvoyant explicitement ici.

## 5. Ce que l'enquête interroge, et où c'est traité

Aucun item n'est rattaché directement à ce module : les enquêtes interrogent des **librairies**,
pas des substrats. `pixi_js` et `three_js` sont au module 07.

Pourtant le choix du substrat détermine tout le reste, y compris quelles librairies sont
disponibles. C'est le même constat qu'au module 01 : ce qui structure n'est pas ce qu'on
interroge.

## 6. Les pièges

1. **Passer à Canvas pour la performance sans refaire l'accessibilité.** Un graphique devient une
   image muette.
2. **Oublier `devicePixelRatio`.** Flou sur tout écran moderne.
3. **Croire que SVG coûte au dessin.** Il coûte au **nombre de nœuds**, et surtout aux mises à
   jour.
4. **Partir sur Canvas « par précaution ».** Sans mesure, c'est un coût payé pour rien.
5. **Ne pas envisager l'hybride.** SVG pour les axes et l'interaction, Canvas pour la masse.
6. **Recoder le survol en parcourant toutes les formes à chaque mouvement de souris.** Un canvas
   caché à couleur-identifiant est en temps constant.

## 7. Lire avant le lab

Pour [lab-02](../labs/lab-02-svg-contre-canvas/README) : § 1 et son tableau, § 1.1, § 1.3, § 4.

## 8. Auto-test

1. Que « voit » une technologie d'assistance d'un `<canvas>` ?
2. Où est le vrai coût de SVG, et pourquoi les mises à jour coûtent-elles plus que le premier
   rendu ?
3. Cite quatre choses à recoder en passant à Canvas.
4. Quelles sont les trois questions de la règle de choix, et la quatrième non technique ?
5. Décris le montage hybride, et ce qu'il préserve.
6. Que se passe-t-il si tu oublies `devicePixelRatio` ?
7. Comment le référentiel qualifie-t-il un `canvas` ou un SVG animé ?
