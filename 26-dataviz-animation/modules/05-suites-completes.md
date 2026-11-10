# 05. Les suites complètes

> **Outcome :** à la fin, tu sais que le premier critère de choix d'une suite de graphiques n'est
> ni la beauté ni la performance mais la **licence**, et tu sais vérifier les quatre critères
> toi-même au lieu de les lire dans un comparatif.

## 1. Le critère qui tue un choix : la licence

C'est le premier, et c'est contre-intuitif pour un développeur. Une suite choisie, intégrée,
déployée, puis retirée six mois plus tard par le service juridique, c'est un trimestre perdu.

**État relevé le 10/11/2026**, via le registre npm, qui est la source primaire :

| Suite | Champ `license` du paquet | Version alors publiée |
|---|---|---|
| **ECharts** | `Apache-2.0` | 6.1.0 |
| **Chart.js** | `MIT` | 4.6.1 |
| **ApexCharts** | `SEE LICENSE IN LICENSE.md` | 8.8.1 |
| **Highcharts** | `https://www.highcharts.com/license` | 13.1.1 |

Les deux dernières lignes sont les plus importantes, parce qu'elles contredisent une croyance
répandue.

**Highcharts est une licence commerciale.** Le site l'énonce : « When you are ready to use the
software for commercial projects, the appropriate license must be in place. » On peut inspecter
et expérimenter librement ; **déployer commercialement demande une licence payante**. Ce n'est pas
un défaut, c'est un modèle, et il faut l'avoir dit avant d'intégrer.

**ApexCharts n'est pas sous licence MIT**, contrairement à ce que beaucoup de comparatifs
affirment, et c'est le piège le plus courant du domaine. C'est une licence propre à seuil : libre
pour les personnes et les organisations sous **deux millions de dollars** de revenus, budget ou
financement, usage commercial inclus ; **licence payante au-delà**. Quelques types de graphiques
sont par ailleurs réservés aux détenteurs d'une clé.

### Comment vérifier soi-même, en dix secondes

```bash
npm view <paquet> license version
```

Si la réponse n'est pas un identifiant de licence standard du genre `MIT`, `Apache-2.0` ou
`BSD-3-Clause`, mais une phrase ou une URL, **arrête-toi et lis le texte**. C'est le signal que
la licence n'est pas une licence libre usuelle.

Cette vérification coûte dix secondes et doit précéder toute évaluation technique. Les chiffres
du tableau ci-dessus sont datés : refais la commande au moment de ton choix.

## 2. Les trois autres critères

### 2.1 Le poids réel

Une suite complète apporte beaucoup de types de graphiques, donc beaucoup de code. La question
n'est pas le poids total mais ce que **ton** bundle emporte :

```bash
# ECharts se construit a la carte : seuls les modules importes entrent
npx source-map-explorer dist/assets/*.js
```

ECharts documente une construction personnalisée ; Chart.js s'appuie sur l'enregistrement
explicite des composants, ce qui permet l'élagage. Dans les deux cas, l'import global annule le
bénéfice :

```js
// ⛔ tout entre
import * as echarts from 'echarts';
import Chart from 'chart.js/auto';

// ✅ seulement ce qui sert
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
```

Le `chart.js/auto` est un piège de confort : il existe pour les démarrages rapides, et il entre
souvent en production sans que personne ne le remarque.

### 2.2 Le substrat, et ce qu'il implique

C'est le module 02 appliqué : **Chart.js et ApexCharts dessinent, respectivement, sur canvas et
en SVG**, et ECharts sait faire les deux.

| Substrat | Conséquence directe |
|---|---|
| canvas | aucune accessibilité native, tout à reconstruire, et la masse de points passe |
| SVG | des nœuds inspectables et stylables, et un plafond de quelques milliers de marques |

Un rendu canvas n'est pas disqualifiant : il demande de budgéter le travail du module 06. Un
rendu SVG ne garantit pas l'accessibilité non plus, il la rend possible.

### 2.3 L'accessibilité livrée

Les trois questions du module 04, posées à la documentation :

1. un **rôle** et un **nom accessible** par défaut ?
2. un **tableau de données équivalent**, ou à écrire ?
3. les séries distinguables **autrement que par la couleur** ?

Highcharts est, historiquement, la suite qui a le plus investi sur ce terrain, avec un module
d'accessibilité documenté. C'est un argument réel, à mettre en face de son modèle de licence.

**Et la vérification ne se fait pas dans la documentation**, elle se fait dans l'inspecteur
d'accessibilité : rends un graphique de démonstration, ouvre l'arbre, et regarde ce qu'il
contient. C'est le geste du module 06 § 5.

## 3. L'arbre de décision

```
L'organisation a-t-elle un budget d'outillage et une exigence d'accessibilité forte ?
├── oui, et le juridique accepte une licence commerciale → Highcharts, pour son module a11y
└── non, licence libre exigée
    ├── beaucoup de types de graphiques, volume important → ECharts (Apache-2.0)
    ├── quelques graphiques simples, bundle minimal       → Chart.js (MIT), imports explicites
    └── je suis sous le seuil ApexCharts et je le resterai → possible, en le DOCUMENTANT
```

La dernière branche mérite sa mise en garde : un seuil de licence lié au chiffre d'affaires est
une **dette conditionnelle**. Elle ne coûte rien aujourd'hui et se déclenche le jour d'une
croissance ou d'un rachat, c'est-à-dire au pire moment. Si on l'accepte, on l'écrit dans un ADR
avec la date du relevé.

## 4. Une suite, ou un wrapper React ?

Les deux familles se recoupent, et le critère de départage est simple.

- **Une suite** est agnostique du framework : elle prend un conteneur et dessine dedans. Donc
  elle s'intègre partout, et elle s'intègre mal : il faut un effet, une référence, un nettoyage,
  et une gestion du redimensionnement.
- **Un wrapper React** du module 04 parle React : état, props, rendu déclaratif.

En React, un wrapper est presque toujours plus simple, sauf si tu as besoin d'un type de
graphique que seule une suite fournit. Et dans ce cas, encapsule-la dans **un** composant dédié,
avec son nettoyage, plutôt que de disperser des appels impératifs.

## 5. L'accessibilité dans ce module

Les critères sont ceux du module 06, et un point propre à ces suites mérite d'être dit : **plus la
librairie rend de DOM à ta place, moins tu peux corriger son arbre.** Avec un rendu canvas, tu ne
peux rien corriger du tout : tu ne peux qu'**ajouter** à côté, par une alternative textuelle et un
tableau.

C'est pourquoi la question 3 du § 2.3 est éliminatoire en pratique : si les séries ne sont
distinguables que par la couleur et que la librairie ne permet pas d'y ajouter un motif, le
graphique sera non conforme à `3.1 (A)` et tu ne pourras pas le réparer sans sortir de la
librairie.

## 6. Ce que l'enquête interroge, et où c'est traité

Items rattachés à ce module : `echarts`, `highcharts`, `apexcharts`, `chart_js`.

Observation utile : ces quatre apparaissent **à la fois** dans State of JS, par la question sur
les graphiques et l'animation, et dans State of React, par la question sur la visualisation de
données. Une suite agnostique du framework est donc comptée deux fois, ce qui gonfle sa présence
apparente par rapport à un wrapper React. Un graphique d'enquête ne corrige pas ce biais.

## 7. Les pièges

1. **Croire qu'ApexCharts est sous licence MIT.** C'est une licence à seuil de deux millions de
   dollars.
2. **Intégrer Highcharts sans valider la licence commerciale.** Le retrait se décide ailleurs
   que dans l'équipe technique.
3. **Importer `chart.js/auto` en production.** Pratique pour démarrer, coûteux ensuite.
4. **Importer `echarts` en entier** alors que la construction à la carte est documentée.
5. **Ignorer le substrat.** Un rendu canvas implique le travail du module 06, à budgéter.
6. **Lire l'accessibilité dans la documentation** au lieu de l'inspecter dans l'arbre.
7. **Disperser des appels impératifs** d'une suite dans plusieurs composants React, au lieu d'un
   seul composant avec son nettoyage.
8. **Accepter une licence à seuil sans l'écrire.** La dette se déclenche au pire moment.

## 8. Auto-test

1. Quel est le premier critère de choix d'une suite, et pourquoi n'est-ce pas technique ?
2. Quelle commande vérifie une licence en dix secondes, et quel signal doit alerter ?
3. Vrai ou faux : ApexCharts est sous licence MIT. Justifie.
4. Que change le modèle de Highcharts, et quel argument technique le compense ?
5. Pourquoi `chart.js/auto` est-il un piège ?
6. En quoi le substrat d'une suite détermine-t-il le travail d'accessibilité restant ?
7. Laquelle des trois questions d'accessibilité est éliminatoire en pratique, et pourquoi ?
8. Pourquoi ces suites paraissent-elles plus présentes qu'elles ne le sont dans les enquêtes ?
