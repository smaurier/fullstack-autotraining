# 06. Les graphiques accessibles

> **Outcome :** à la fin, tu sais rendre un graphique utilisable sans le voir, tu sais écrire une
> alternative qui dit quelque chose, tu sais quand un tableau équivalent est obligatoire, et tu
> sais vérifier tout cela dans l'arbre d'accessibilité plutôt que de l'espérer.
>
> **Lab :** [lab-03 : graphique accessible](../labs/lab-03-graphique-accessible/README)

> **C'est le module qui justifie ce cours.** Les graphiques accessibles sont un croisement que
> presque personne n'occupe : les spécialistes de la dataviz parlent peu d'accessibilité, et les
> spécialistes de l'accessibilité parlent peu de dataviz.

## 1. Le problème, posé correctement

Un graphique encode l'information dans de la **géométrie**. Pour quelqu'un qui ne voit pas la
géométrie, il n'y a rien. Ce n'est pas un problème de balisage : c'est que **l'information n'est
nulle part sous forme de texte**.

D'où une conséquence que les outils automatiques ne disent jamais : un graphique peut passer
`axe` sans une violation et rester totalement inutilisable. `axe` vérifie qu'une image a un
`alt` ; il ne peut pas vérifier que l'`alt` dit quelque chose d'utile.

La question juste n'est donc pas « mon graphique est-il conforme », c'est : **que veux-tu que
la personne apprenne, et par quel chemin l'apprend-elle si elle ne voit pas le dessin ?**

## 2. Les quatre niveaux

| Niveau | Ce qui existe | Conforme ? |
|---|---|---|
| **0** | un canvas ou un SVG nu | non : image sans alternative, `1.1 (A)` |
| **1** | un rôle et une alternative pertinente | minimum, `1.1 (A)` et `1.3 (A)` |
| **2** | plus un **tableau de données équivalent** | le niveau à viser |
| **3** | plus une **navigation au clavier** dans les données | pour un graphique interactif |

Le niveau 2 est la cible par défaut. Le niveau 3 devient obligatoire dès que le graphique est
**interactif** : s'il y a du survol qui révèle de l'information, cette information doit être
atteignable au clavier, critère `7.3 (A)`.

## 3. Niveau 1 : le rôle et l'alternative

### 3.1 La structure minimale, en SVG

```html
<figure>
  <svg role="img" aria-labelledby="t-inscriptions d-inscriptions" viewBox="0 0 600 300">
    <title id="t-inscriptions">Inscriptions aux ateliers, 2026</title>
    <desc id="d-inscriptions">
      Progression de 120 inscriptions en janvier à 340 en juin, avec un creux à 90 en mars.
    </desc>
    <!-- les marques, toutes aria-hidden : elles ne portent rien de lisible -->
    <g aria-hidden="true">…</g>
  </svg>
  <figcaption>
    Inscriptions aux ateliers, 2026.
    <a href="#tableau-inscriptions">Voir les données</a>
  </figcaption>
</figure>
```

Quatre décisions dans ce fragment, et chacune a sa raison.

**`role="img"`** : sans lui, un SVG est annoncé de façon inconsistante selon les moteurs, et ses
dizaines de nœuds internes peuvent être parcourus un par un. Avec lui, c'est **une** image, avec
**un** nom.

**`<title>` et `<desc>` reliés par `aria-labelledby`** : le `<title>` seul suffit pour le nom,
mais le relier explicitement est plus robuste. Et l'ordre des identifiants compte : le titre
d'abord.

**Les marques en `aria-hidden="true"`** : un `<rect>` ou un `<circle>` ne dit rien d'utile. Les
laisser dans l'arbre produit un bruit de cent nœuds vides.

**Le lien vers les données** dans la légende, visible. C'est le niveau 2, et c'est le § 4.

### 3.2 Écrire une alternative qui dit quelque chose

C'est la partie que les outils ne peuvent pas juger, et c'est celle qui compte.

```html
<!-- ⛔ Décrit le contenant, pas le contenu -->
<desc>Graphique en barres des inscriptions</desc>

<!-- ⛔ Décrit la forme, ce que la personne ne peut pas vérifier -->
<desc>Courbe montante avec un pic au milieu</desc>

<!-- ✅ Dit ce qu'il faut retenir, puis les repères -->
<desc>
  Les inscriptions ont presque triplé sur le premier semestre, de 120 en janvier à 340 en
  juin. Seule exception : un creux à 90 en mars, le mois de la fermeture de la salle.
</desc>
```

La règle, et elle est écrite dans le référentiel au critère `1.3 (A)` : l'alternative doit être
**pertinente**, c'est-à-dire remplir la même fonction que l'image. La fonction d'un graphique
n'est pas d'être un graphique, c'est de faire comprendre quelque chose.

Trois éléments dans une bonne alternative :

1. **la conclusion** : ce que le graphique montre ;
2. **les repères** : les extremums, l'ordre de grandeur ;
3. **l'anomalie**, s'il y en a une, et son explication si tu la connais.

Et une limite de longueur assumée : si l'alternative dépasse deux ou trois phrases, c'est que les
données doivent être dans un tableau. C'est exactement ce que disent les critères `1.6 (A)` et
`1.7 (A)` sur la description détaillée : quand l'alternative doit être **structurée**, elle ne
tient pas dans un attribut, elle va dans un contenu adjacent ou derrière un lien.

## 4. Niveau 2 : le tableau de données équivalent

### 4.1 Pourquoi un tableau et pas une liste

Parce qu'un tableau de données est **navigable** : un lecteur d'écran annonce « colonne Mois,
ligne 3 », permet de se déplacer de cellule en cellule, et de comparer. Une liste de phrases ne
permet pas de comparer.

```html
<details id="tableau-inscriptions">
  <summary>Données du graphique, 6 mois</summary>
  <table>
    <caption>Inscriptions aux ateliers par mois, 2026</caption>
    <thead>
      <tr>
        <th scope="col">Mois</th>
        <th scope="col">Inscriptions</th>
      </tr>
    </thead>
    <tbody>
      <tr><th scope="row">Janvier</th><td>120</td></tr>
      <tr><th scope="row">Février</th><td>145</td></tr>
      <tr><th scope="row">Mars</th><td>90</td></tr>
    </tbody>
  </table>
</details>
```

Les critères qui s'appliquent sont ceux du thème 5, vus au cours 25 module 17 : `5.4 (A)` et
`5.5 (A)` pour le titre, `5.6 (A)` et `5.7 (A)` pour les en-têtes et leur portée.

### 4.2 Visible, replié, ou masqué ?

Trois options, et une seule est fautive.

| Option | Verdict |
|---|---|
| Tableau **visible** sous le graphique | parfait, et utile à tout le monde |
| Tableau dans un `<details>` replié | très bon, et c'est le défaut raisonnable |
| Tableau en **masquage visuel** | ⛔ à éviter |

La troisième option est tentante et fautive, pour une raison précise : elle réserve les données à
ceux qui utilisent une technologie d'assistance. Or **beaucoup de gens veulent les chiffres** :
une personne malvoyante sans lecteur d'écran, quelqu'un qui veut copier une valeur, quelqu'un
qui ne lit pas bien les graphiques. Un `<details>` sert tout le monde.

Rappel du cours 25 module 15 : si le contenu doit rester trouvable par la recherche du
navigateur, `hidden="until-found"` plutôt qu'un repli qui le retire de la page.

### 4.3 Et pour un canvas, c'est obligatoire

Pour un rendu canvas ou un SVG animé, le référentiel parle de **média non temporel**, critères
`4.8 (A)`, `4.9 (A)` et `4.12 (A)` : une alternative équivalente est requise. Le cours 25 a
déclaré ces critères hors de son périmètre en renvoyant explicitement ici.

Et le tableau devient alors le **seul** chemin vers l'information, puisque le canvas n'expose
rien.

## 5. Les séries, la couleur et le contraste

### 5.1 Ne pas distinguer les séries par la seule couleur

```html
<!-- ⛔ Deux courbes, deux couleurs, une légende de couleurs. Non conforme 3.1 (A). -->
<path class="serie-cuisine" /><path class="serie-jardinage" />
```

`3.1 (A)` interdit de porter une information par la seule couleur. Pour des séries, quatre
réponses, par ordre de robustesse :

1. **l'étiquette directe** : le nom de la série écrit au bout de sa courbe. La meilleure, parce
   qu'elle supprime aussi l'aller-retour vers la légende ;
2. **le motif** : trait pointillé, tireté, ou une texture de remplissage ;
3. **la forme du marqueur** : rond, carré, triangle ;
4. **l'ordre** : pour des barres empilées, l'ordre constant plus une étiquette.

```css
/* Un motif, et il reste visible en contraste force (cours 25, module 08) */
.serie-jardinage { stroke-dasharray: 6 4; }
```

**Le test rapide :** passe le graphique en niveaux de gris. Si tu ne distingues plus les séries,
`3.1 (A)` n'est pas respecté. C'est aussi la raison pour laquelle les palettes perceptuellement
uniformes du module 03 § 3.1 sont un bon départ : elles restent lisibles en gris.

### 5.2 Le contraste, avec quoi exactement

`3.3 (AA)` demande 3:1 pour un élément non textuel porteur d'information. Dans un graphique,
cela concerne :

- chaque **série** contre le **fond** ;
- les séries **entre elles** quand elles se touchent, par exemple des barres empilées adjacentes
  ou des parts de camembert ;
- les **axes** et les **graduations** ;
- l'**indicateur de focus** du module § 6.

Et `3.2 (AA)` s'applique au texte du graphique : étiquettes de graduation, légende, étiquettes de
données, au seuil de 4,5:1 pour une taille normale.

Le piège de mesure, qui vient du cours 25 module 10 § 4.1 : le ratio se calcule sur les couleurs
**réellement appliquées**, pas sur celles de la maquette. Une opacité de 0,8 sur une série change
sa couleur effective.

### 5.3 Les étiquettes doivent survivre au zoom

`10.4 (AA)` : le texte reste lisible à 200 %. Dans un SVG avec `viewBox`, le texte suit l'échelle
du graphique, ce qui est souvent le comportement voulu. Mais si tu fixes une taille en unités de
`viewBox`, le texte **ne suit pas** les préférences de taille de l'utilisateur.

Le compromis courant : les étiquettes dans le SVG pour qu'elles se placent, et une taille
exprimée de façon à rester lisible, vérifiée par un zoom réel à 200 %.

## 6. Niveau 3 : la navigation au clavier

Dès qu'il y a du survol qui révèle une information, il faut un chemin clavier, critère
`7.3 (A)`.

```html
<svg role="img" aria-labelledby="t d">
  <title id="t">Inscriptions par mois</title>
  <desc id="d">…</desc>

  <!-- Chaque point est focusable et porte son propre nom accessible -->
  <g role="list" aria-label="Points de données">
    <circle role="listitem" tabindex="0" aria-label="Janvier : 120 inscriptions" cx="40" cy="180" r="5" />
    <circle role="listitem" tabindex="0" aria-label="Février : 145 inscriptions" cx="120" cy="150" r="5" />
  </g>
</svg>
```

Deux mises en garde, et elles sont importantes.

**N'applique pas ce motif à mille points.** Mille arrêts de tabulation sont une torture. Au-delà
d'une vingtaine de marques, le tableau du § 4 est le bon chemin, et il est meilleur : il permet de
comparer.

**Le focus doit être visible**, critère `10.7 (A)`, et dans un SVG cela demande un soin
particulier :

```css
/* outline ne se comporte pas de la meme facon sur tous les elements SVG */
circle:focus-visible {
  outline: 2px solid var(--focus);
  outline-offset: 2px;
}
/* Repli robuste : on epaissit et on entoure la marque elle-meme */
circle:focus-visible {
  stroke: var(--focus);
  stroke-width: 3;
  paint-order: stroke;
}
```

### 6.1 Annoncer une valeur au survol et au focus

Si le graphique affiche une infobulle, elle doit apparaître **au focus aussi**, critère
`10.14 (AA)`, être fermable par `Échap` et rester survolable, critère `10.13 (AA)`. C'est le
module 09 du cours 25.

Et pour annoncer une valeur sans déplacer le focus, une région de statut, critère `7.5 (AA)` :

```html
<p class="visuellement-masque" role="status" id="valeur-active"></p>
```

## 7. Le verdict par librairie

Ce que les familles livrent, et ce qu'elles laissent à ta charge. **À vérifier dans l'arbre,
pas dans la documentation :** le § 8 donne le geste.

| Famille | Rôle et nom | Tableau équivalent | Séries sans couleur | Clavier |
|---|---|---|---|---|
| Fait main, SVG (lab 03) | à toi, donc total | à toi | à toi | à toi |
| `visx` (primitives) | à toi | à toi | à toi | à toi |
| `recharts`, `nivo`, `victory` | partiel | rarement | rarement par défaut | partiel |
| `tremor` | partiel | non | non | non |
| Suites canvas (`chart.js`) | **rien** : image opaque | obligatoire | à toi | impossible dans le canvas |
| `highcharts` | module d'accessibilité documenté | fourni | options disponibles | fourni |

Deux lectures de ce tableau.

**Le fait main et `visx` sont en haut de la colonne « à toi », et c'est une bonne nouvelle.** Rien
ne t'est imposé, rien ne t'est caché, et tu peux atteindre le niveau 3. C'est l'inverse d'une
contrainte.

**Highcharts est la seule ligne où presque tout est fourni**, et c'est son argument face à son
modèle de licence du module 05.

## 8. Comment vérifier, vraiment

Quatre gestes, dans cet ordre. Aucun ne prend plus de deux minutes.

1. **L'inspecteur d'accessibilité.** Rends le graphique, ouvre l'arbre. Combien de nœuds ?
   Qu'est-ce qu'ils disent ? Un canvas donnera un nœud sans nom, et c'est le verdict.
2. **Le niveau de gris.** Un filtre de saturation nulle. Si les séries se confondent, `3.1 (A)`
   n'est pas respecté.
3. **Le clavier seul.** `Tab` : atteint-on l'information ? Combien d'arrêts ?
4. **Le lecteur d'écran, les yeux fermés.** C'est le seul test qui dise si ton alternative est
   utile. Le réflexe du cours 25 module 20 § 4.2 s'applique : tant qu'on regarde l'écran, on
   complète mentalement ce que la voix ne dit pas.

Et la question finale, qui résume tout le module : **si on me lit cette page au téléphone,
est-ce que j'apprends ce que le graphique voulait me dire ?**

## 9. Ce que l'enquête interroge, et où c'est traité

Aucun item n'est rattaché à ce module, et c'est le constat le plus parlant de tout ce cours :
**aucune enquête ne demande si les graphiques que tu produis sont accessibles.** Elles demandent
quelle librairie tu utilises et si tu es satisfait.

C'est précisément pour cela que ce croisement est libre. L'accessibilité des graphiques n'est pas
mesurée par la profession, donc elle n'est pas comparée, donc personne ne s'y positionne.

## 10. Les pièges

1. **Croire qu'`axe` vert vaut quelque chose ici.** Il vérifie la présence d'un `alt`, pas sa
   pertinence.
2. **Décrire le contenant** : « graphique en barres des inscriptions » n'apprend rien.
3. **Décrire la forme** : « courbe montante » n'est pas vérifiable par qui ne voit pas.
4. **Laisser les marques dans l'arbre.** Cent nœuds vides à parcourir.
5. **Masquer visuellement le tableau de données.** Il sert à tout le monde : un `<details>`.
6. **Rendre mille points focusables.** Mille arrêts de tabulation. Le tableau, au-delà de vingt
   marques.
7. **Distinguer les séries par la seule couleur.** Non conforme `3.1 (A)`. Le test du niveau de
   gris le montre en dix secondes.
8. **Oublier le contraste entre séries adjacentes**, et pas seulement contre le fond.
9. **Calculer le contraste sur les couleurs de la maquette** alors qu'une opacité les a
   déplacées.
10. **Oublier que le focus visible demande un traitement propre en SVG.**
11. **Lire l'accessibilité d'une librairie dans sa documentation** au lieu d'inspecter son arbre.

## 11. Lire avant le lab

Pour [lab-03](../labs/lab-03-graphique-accessible/README) : § 2, § 3 en entier, § 4.1 et 4.2,
§ 5.1, § 8. Une lecture, puis page blanche.

## 12. Auto-test

1. Pourquoi un graphique peut-il passer `axe` sans violation et rester inutilisable ?
2. Cite les quatre niveaux, et dis lequel est la cible par défaut.
3. Quels trois éléments composent une bonne alternative ?
4. À partir de quand l'alternative doit-elle devenir un tableau, et quels critères le disent ?
5. Pourquoi un tableau en masquage visuel est-il fautif, alors qu'il est techniquement lisible
   par un lecteur d'écran ?
6. Donne les quatre façons de distinguer des séries sans la couleur, de la plus robuste à la
   moins.
7. Quel test de dix secondes révèle une non-conformité `3.1 (A)` sur un graphique ?
8. Avec quoi le contraste d'une série doit-il être mesuré, en plus du fond ?
9. À partir de combien de marques la navigation point par point devient-elle une mauvaise idée ?
10. Quels sont les quatre gestes de vérification, et lequel juge la pertinence de l'alternative ?
