# 07. Performance d'une visualisation

> **Outcome :** à la fin, tu sais où va réellement le temps dans un graphique lent, tu connais
> les quatre leviers par ordre de rendement, et tu sais à quel moment passer à WebGL devient un
> choix défendable plutôt qu'un réflexe.

## 1. Où va le temps, en réalité

Trois coûts à ne pas confondre, parce qu'ils ne se soignent pas de la même façon.

| Coût | Symptôme | Levier |
|---|---|---|
| **Préparer les données** | le premier rendu est lent, puis tout va bien | agréger en amont, mémoïser |
| **Construire le DOM** | lent au montage, et à chaque mise à jour | réduire le nombre de nœuds, ou changer de substrat |
| **Peindre et composer** | ça rame en continu, au défilement ou à l'animation | `transform` et `opacity`, voir cours 25 module 04 |

Le diagnostic se fait dans l'onglet de performance, pas à l'intuition. **Un graphique lent n'est
presque jamais lent pour la raison qu'on croit** : on soupçonne le dessin, et c'est souvent la
préparation des données ou le nombre de nœuds.

## 2. Les quatre leviers, par rendement décroissant

### 2.1 Afficher moins de données

Le levier le plus efficace, et le plus négligé parce qu'il demande une décision produit plutôt
qu'une astuce technique.

Dix mille points sur six cents pixels de large, cela fait **seize points par pixel**. Quinze
d'entre eux sont invisibles. Les afficher coûte, et n'apprend rien.

Trois façons honnêtes de réduire :

- **agréger** : une moyenne, une médiane ou une somme par intervalle de temps ;
- **échantillonner intelligemment** : un algorithme qui conserve les extremums et la silhouette
  de la courbe, plutôt qu'un point sur dix qui peut gommer un pic ;
- **découper** : afficher une fenêtre, et donner un moyen de se déplacer.

**L'écueil à éviter :** un échantillonnage naïf **ment** au sens du module 01. Prendre un point
sur dix peut supprimer exactement le pic qui justifiait le graphique. Si tu échantillonnes,
conserve les extremums.

### 2.2 Réduire le nombre de nœuds

```jsx
// ⛔ Trois nœuds par point : 30 000 nœuds pour 10 000 points
{points.map((p) => (
  <g key={p.id}>
    <circle cx={x(p.date)} cy={y(p.valeur)} r="3" />
    <title>{p.libelle}</title>
  </g>
))}

// ✅ Un seul nœud pour toute la série
<path d={ligne(points)} fill="none" stroke="currentColor" />
```

Rappel du module 02 : le coût de SVG est dans le **nombre de nœuds**, et surtout dans les mises à
jour, parce que chaque nœud participe au style et au layout.

Et une conséquence d'accessibilité, du module 06 § 6 : trente mille nœuds, c'est aussi trente
mille entrées potentielles dans l'arbre. `aria-hidden` sur le groupe des marques règle les deux
problèmes à la fois.

### 2.3 Ne recalculer que ce qui change

```jsx
// Les echelles ne dependent que des donnees et des dimensions
const x = useMemo(() => scaleTime().domain(extent(donnees, (d) => d.date)).range([0, largeur]),
  [donnees, largeur]);

// Le chemin ne depend que des echelles et des donnees
const chemin = useMemo(() => ligne(donnees), [donnees, x, y]);
```

Sans mémoïsation, un survol qui change un état de composant recalcule les échelles et regénère la
chaîne de chemin à chaque mouvement de souris. C'est la cause la plus fréquente d'un graphique
qui rame **à l'interaction** alors qu'il se monte vite.

### 2.4 Changer de substrat, en dernier

Et seulement après avoir mesuré que les trois premiers leviers ne suffisent pas.

```
SVG            jusqu'à ~2 000 marques interactives
Canvas 2D      jusqu'à ~50 000 marques, interaction à recoder
WebGL          au-delà, ou rendu continu à 60 images par seconde
```

Ces ordres de grandeur sont des **points de départ de mesure**, pas des vérités : ils dépendent de
la complexité de chaque marque et de la machine cible. Le lab 02 fait la mesure.

Le vrai coût du changement est au module 02 § 1.1 : on perd l'accessibilité native, les évènements
par forme, et le style en CSS.

## 3. `OffscreenCanvas` et les travailleurs

Quand la préparation des données est le goulot, elle peut sortir du fil principal :

```js
// Le travailleur calcule et dessine, le fil principal reste disponible
const horsEcran = canvas.transferControlToOffscreen();
travailleur.postMessage({ canvas: horsEcran, donnees }, [horsEcran]);
```

Ce que cela règle : l'interface ne gèle plus pendant le calcul. Ce que cela ne règle pas : le
calcul prend le même temps, et l'accessibilité reste à zéro, puisque c'est toujours un canvas.

À réserver aux cas où la mesure montre un blocage du fil principal de plusieurs centaines de
millisecondes. Le cours 10 module 13 traite l'ordonnancement.

## 4. Les librairies WebGL de l'enquête

**`pixi_js`** : un moteur de rendu 2D accéléré. Le bon choix pour une masse de marques 2D, des
nuages de points très denses ou des cartes à forte densité. Il ne sait rien des données : tu
gardes les échelles du module 03.

**`three_js`** : un moteur 3D. Dans un contexte de dataviz, il sert aux visualisations
volumétriques, aux globes, aux surfaces. C'est aussi le socle de la série de tableaux de Nahual,
et la 3D pour elle-même est le cours 23 WebGPU et 3D.

Dans les deux cas, la règle du module 06 s'applique sans adoucissement : **aucune accessibilité
native**, donc un tableau équivalent obligatoire, et une alternative qui dit ce que la
visualisation montre.

## 5. Mesurer, pas supposer

```js
// Encadrer le travail suspect, puis lire dans l'onglet Performance
performance.mark('prep-debut');
const prepares = agreger(donnees);
performance.mark('prep-fin');
performance.measure('preparation', 'prep-debut', 'prep-fin');
```

Et la règle de méthode, qui vient du cours 10 : **un gain se mesure avant et après, sur la même
machine, avec un échauffement**. Un chiffre unique ne prouve rien.

La question à se poser avant d'optimiser : **quel est le budget ?** Un graphique de tableau de
bord consulté une fois par jour n'a pas besoin de soixante images par seconde. Optimiser sans
budget, c'est travailler sans critère d'arrêt.

## 6. L'accessibilité dans ce module

Deux points, et le second est le plus important de la page.

**`aria-hidden` sur les marques** sert la performance et l'accessibilité en même temps : moins de
nœuds dans l'arbre, et pas de bruit pour le lecteur d'écran. Module 06 § 3.1.

**Toute optimisation qui change le substrat a un coût d'accessibilité**, et ce coût doit entrer
dans la décision. Un passage à Canvas ou à WebGL rend un tableau équivalent **obligatoire**, et
ce n'est pas un détail : c'est du travail à budgéter au même titre que le reste.

Un graphique rapide et muet est un régression, pas une optimisation.

## 7. Ce que l'enquête interroge, et où c'est traité

Items rattachés à ce module : `pixi_js`, `three_js`.

Observation : ces deux-là apparaissent dans la question sur les graphiques et l'animation de
State of JS, aux côtés de D3 et de Chart.js. L'enquête met donc dans un même sac des outils de
**dataviz** et des moteurs de **rendu**, ce qui n'aide pas à décider. La distinction du § 4
compte plus que leur score.

## 8. Les pièges

1. **Optimiser le dessin alors que le coût est dans la préparation.** Mesurer d'abord.
2. **Échantillonner naïvement.** Un point sur dix peut supprimer le pic qui justifiait le
   graphique.
3. **Trois nœuds par point.** Un `<path>` pour toute la série.
4. **Oublier la mémoïsation.** Le graphique rame à l'interaction, pas au montage.
5. **Changer de substrat par réflexe.** C'est le dernier levier, après mesure.
6. **Croire qu'`OffscreenCanvas` accélère le calcul.** Il le déplace.
7. **Optimiser sans budget.** Aucun critère d'arrêt.
8. **Ne pas budgéter le coût d'accessibilité d'un changement de substrat.** Un graphique rapide
   et muet est une régression.

## 9. Auto-test

1. Quels sont les trois coûts à distinguer, et leur symptôme respectif ?
2. Quel est le levier le plus efficace, et pourquoi est-il négligé ?
3. En quoi un échantillonnage naïf est-il un mensonge au sens du module 01 ?
4. Pourquoi un graphique peut-il se monter vite et ramer à l'interaction ?
5. Donne les ordres de grandeur des trois substrats, et dis pourquoi ce sont des points de départ.
6. Que règle `OffscreenCanvas`, et que ne règle-t-il pas ?
7. Quelle question se poser avant d'optimiser ?
8. Pourquoi `aria-hidden` sur les marques sert-il deux objectifs à la fois ?
