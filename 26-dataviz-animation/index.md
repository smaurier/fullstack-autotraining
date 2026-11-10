---
layout: home

hero:
  name: "Dataviz & Animation"
  text: "Encoder sans mentir, animer sans trahir"
  tagline: "13 modules, 6 labs à oracle. Le module qui justifie ce cours est le 06 : les graphiques accessibles, un croisement que presque personne n'occupe."
  actions:
    - theme: brand
      text: "Commencer"
      link: /modules/00-prerequis-et-protocole
    - theme: alt
      text: "Graphiques accessibles"
      link: /modules/06-graphiques-accessibles
    - theme: alt
      text: "Couverture des enquêtes"
      link: /couverture-state-of

features:
  - title: Encoder, pas décorer
    details: "Variables visuelles et leur efficacité relative, échelles linéaire, log, ordinale et temporelle, et les mensonges graphiques courants : axe tronqué, aire contre rayon, double axe. Le module qui évite de faire un joli graphique faux."
  - title: Trois substrats, une règle de choix
    details: "SVG est dans le DOM, Canvas est une image opaque, WebGL est un pipeline. Le choix se fait sur le nombre d'éléments, le besoin d'interaction, et ce qui reste accessible. La conséquence du choix est d'abord une conséquence d'accessibilité."
  - title: Des graphiques accessibles
    details: "Alternative pertinente, tableau de données équivalent, navigation clavier dans une série, contraste des séries, motif en plus de la couleur. Avec un verdict par librairie : ce qu'elle livre, ce qu'elle oblige à recoder."
  - title: Animer sans trahir
    details: "Easing et ce qu'il raconte, timelines, animations liées au défilement, pipeline depuis After Effects. Et prefers-reduced-motion traité comme un contrat, pas comme une option."
---

## Où ce cours vit dans le curriculum

**En BIBLIOTHÈQUE.** Aucun ordre imposé, tiré par un besoin daté, comme Vue, Angular, React
Native et WebGPU. C'est ce qui permet de l'ouvrir sans toucher à l'ordre des arcs ni au plafond
d'apprentissage.

**Fil rouge : Nahual**, pas TribuZen. C'est là que la matière a un usage réel : la série de
tableaux, le mode récit, la scène.

## Pourquoi ce cours existe

Le 09/11/2026, un croisement des enquêtes State of JS et State of React contre les 2 418
fichiers du curriculum a classé les librairies de graphiques et d'animation en « bruit pour ton
profil ». C'était faux, et Sylvain l'a corrigé : « les librairies de graphique et d'animations,
je trouve ça important. J'aimerais approfondir ça aussi. »

C'est cohérent avec un profil qui tient précisément à l'hybridation entre technique et
artistique, et avec les projets qui existent déjà : la série de tableaux WebGL, Nahual, R3F.

Et il y a un angle que presque personne n'occupe : **la dataviz accessible**. Le module 06 est
la raison d'être de ce cours.

## Structure

| # | Module | Lab | Ce qui s'y joue |
|---|--------|-----|-----------------|
| 00 | [Prérequis et protocole](/modules/00-prerequis-et-protocole) | aucun | Comment on travaille ici |
| 01 | [Encoder une donnée](/modules/01-encoder-une-donnee) | [01](/labs/lab-01-echelle-et-axe/README) | Variables visuelles, échelles, mensonges |
| 02 | [SVG, Canvas, WebGL](/modules/02-svg-canvas-webgl) | [02](/labs/lab-02-svg-contre-canvas/README) | Trois substrats, une règle de choix |
| 03 | [D3 comme socle](/modules/03-d3-comme-socle) | [01](/labs/lab-01-echelle-et-axe/README) | Une boîte à outils, pas une librairie de graphiques |
| 04 | [Les wrappers React](/modules/04-wrappers-react) | aucun | Grille de choix sur cinq axes |
| 05 | [Les suites complètes](/modules/05-suites-completes) | aucun | Licences, poids, accessibilité livrée |
| 06 | [Graphiques accessibles](/modules/06-graphiques-accessibles) | [03](/labs/lab-03-graphique-accessible/README) | **Le module qui justifie ce cours** |
| 07 | [Performance](/modules/07-performance-dataviz) | aucun | Dix mille points, et quand passer à WebGL |
| 08 | [Principes de l'animation](/modules/08-principes-de-l-animation) | aucun | Easing, timing, ce que le mouvement dit |
| 09 | [GSAP et timelines](/modules/09-gsap-et-timelines) | [04](/labs/lab-04-timeline-gsap/README) | Orchestrer, et la question de la licence |
| 10 | [Motion et physique](/modules/10-motion-et-physique) | [05](/labs/lab-05-animation-de-layout/README) | Physique contre durée, coût en re-rendus |
| 11 | [Pipeline designer](/modules/11-pipeline-designer) | [06](/labs/lab-06-lottie-respectueux/README) | Depuis After Effects, Lottie, Rive |
| 12 | [Animation accessible](/modules/12-animation-accessible) | [04](/labs/lab-04-timeline-gsap/README), [06](/labs/lab-06-lottie-respectueux/README) | Le contrat, et comment dégrader |

## Ce que ce cours n'est pas

Il ne remplace pas le cours 25 HTML & CSS, qui porte le mouvement **natif** (module 12),
`prefers-reduced-motion` et le contraste. Ce cours commence là où le natif ne suffit plus, et il
y renvoie constamment.

Il ne traite pas non plus la 3D pour elle-même : c'est le cours 23 WebGPU et 3D.
