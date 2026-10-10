---
titre: Positionnement de l'outil — Framer ou Figma+dev, lequel et pourquoi
cours: 24-design-craft
bloc: D — Framer (outil)
notions: [Framer comme outil de design ET de publication, site vitrine simple vs logique métier complexe, coût de l'étape "dev transforme la maquette" court-circuité, critères de décision Framer vs Figma+dev]
outcomes: [positionner un projet donné sur l'axe Framer vs Figma+dev à partir de critères explicites, anticiper qu'un produit a une vraie logique métier avant de buter contre les limites de l'outil, distinguer un site vitrine candidat Framer d'une application qui ne l'est pas]
prerequis: [c02-composants-variants, c04-prototypage]
next: d02-canvas-breakpoints-stacks
tribuzen: trancher que TribuZen l'app n'est pas un candidat Framer (logique métier réelle) mais qu'une landing page vitrine séparée pour la présenter l'est
last-reviewed: 2026-10
---

# Positionnement de l'outil — Framer ou Figma+dev, lequel et pourquoi

> **Outcomes — tu sauras FAIRE :** positionner un projet donné sur l'axe Framer vs
> Figma+dev à partir de critères explicites (pas une préférence d'outil), anticiper
> qu'un produit a une vraie logique métier avant de buter contre les limites de
> l'outil en cours de route, et distinguer un site vitrine candidat Framer d'une
> application qui n'en est clairement pas un.
> **Difficulté :** ⭐

## 1. Cas concret d'abord

Après les blocs C (Figma) et avant de se lancer dans Framer, la question naïve serait
« je sais déjà faire des maquettes en Figma, pourquoi apprendre un deuxième outil ? ».
La réponse tient en une phrase : **Figma ne publie rien**. Un fichier Figma, même
prototypé, reste une maquette — quelqu'un (un développeur, ou soi-même en mode dev)
doit ensuite la recoder entièrement pour qu'elle existe en ligne. Framer supprime
cette étape : un site conçu dans Framer EST le site publié, avec un vrai domaine, dès
qu'on clique sur "Publier".

Ça change radicalement la question à se poser avant d'ouvrir l'outil. Pas « quel outil
je préfère ? » mais « ce projet a-t-il besoin que la maquette et le produit final
soient la MÊME chose, ou ai-je besoin d'une étape de développement séparée parce que
le produit a une logique que l'outil visuel ne peut pas porter ? ». TribuZen (l'app
familiale) et une landing page de présentation de TribuZen ne se posent pas du tout
la même réponse à cette question — c'est tout l'objet de ce module.

## 2. Théorie complète, concise

### 2.1 La différence structurante : outil de design pur vs outil de design ET de publication

Figma produit des **artefacts intermédiaires** : maquettes, prototypes cliquables,
spécifications pour un dev. Rien de ce qui sort de Figma n'est consultable par un
utilisateur final sans un travail de code séparé.

Framer produit directement un **artefact final** : un site réel, hébergé, avec un
domaine, accessible par n'importe qui dès la publication. Ce n'est pas "Figma avec un
bouton publier en plus" — c'est une catégorie d'outil différente, qui fusionne deux
métiers habituellement séparés (designer qui maquette, développeur qui code) en un
seul geste. Traiter Framer comme un simple raccourci de Figma fait sous-estimer ce
qu'il peut réellement remplacer, et sur-estimer ce qu'il peut porter (voir 2.3).

### 2.2 Quand Framer est le bon choix

Trois critères convergents rendent Framer pertinent :
- **Complexité métier faible à nulle** : pas d'authentification réelle d'utilisateurs,
  pas de base de données propre au produit, pas de calcul métier (facturation, règles
  de gestion). Le contenu peut être géré par son CMS intégré (vu au module D05), pas
  par une logique applicative.
- **Besoin de rapidité de mise en ligne** : un site vitrine, un portfolio, un teaser
  produit, une landing page de lancement — le temps entre "idée" et "en ligne" compte
  plus que le contrôle fin du code.
- **Pas de besoin d'intégration backend propre** : si le site doit un jour parler à
  une vraie API (paiement, données utilisateur persistées ailleurs que dans le CMS),
  c'est un signal que Framer seul ne suffira pas (voir le Code Override du module D06
  pour la limite exacte de ce qu'on peut encore faire avant de basculer).

### 2.3 Quand c'est l'inverse : Figma (maquette) + développement réel

Dès qu'un produit a une **vraie logique applicative** — état complexe partagé entre
plusieurs écrans, authentification réelle, règles métier, performance fine à
contrôler — la bonne séquence reste : concevoir en Figma (blocs A à C de ce cours),
puis coder réellement (React/Next, comme le reste du curriculum `fullstack-autotraining`).

**TribuZen est l'exemple canonique de ce deuxième cas.** L'app gère des profils
familiaux, des routines datées, un état partagé entre plusieurs écrans (dashboard,
gazette, routines) — aucune de ces briques n'a sa place dans un outil no-code pensé
pour des sites vitrines. Vouloir "faire TribuZen en Framer" buterait très vite contre
des murs que l'outil n'est pas fait pour franchir.

### 2.4 Le piège structurant à anticiper, pas à découvrir en cours de route

Le vrai risque n'est pas de choisir le mauvais outil une fois pour toutes — c'est de
commencer un projet dans Framer en sous-estimant sa complexité métier réelle, et de
découvrir les limites de l'outil à mi-chemin, après avoir déjà investi du temps. La
discipline de ce module est d'évaluer la complexité métier AVANT d'ouvrir Framer, pas
pendant.

## 3. Worked examples

### Exemple A — TribuZen l'app : pourquoi ce n'est PAS un candidat Framer

1. Authentification/profils familiaux réels → logique métier, pas du contenu éditorial.
2. État partagé (une routine modifiée sur un écran doit se refléter sur le dashboard)
   → nécessite une vraie gestion d'état applicatif, hors de portée d'un CMS Framer.
3. Conclusion : TribuZen reste Figma (conception) + développement réel (React), comme
   c'est déjà le cas dans le reste du curriculum — ce module ne remet rien en cause,
   il justifie formellement une évidence déjà pratiquée.

### Exemple B — une landing page de présentation de TribuZen : un VRAI candidat Framer

1. Objectif : présenter le projet (teaser, captures d'écran, lien vers le dépôt/le
   portfolio) — c'est du contenu éditorial statique, pas une logique applicative.
2. Pas besoin de compte utilisateur, pas d'état partagé entre pages.
3. Besoin de rapidité : cette page n'a pas besoin du même investissement qu'un cycle
   de développement complet pour exister.
4. Conclusion : Framer est pertinent ici — c'est précisément ce que construisent les
   modules D02 à D07 de ce bloc, sur cette landing page, pas sur l'app elle-même.

## 4. Pièges & misconceptions

- **"Je sais déjà maquetter en Figma, donc Framer ne m'apporte rien de nouveau."** Faux
  — Framer n'est pas un deuxième outil de maquette, c'est un outil qui supprime
  l'étape de développement pour les projets qui n'en ont pas besoin (voir 2.1).

- **Choisir Framer par habitude de l'outil plutôt que par nature du projet.** Le
  critère n'est jamais "quel outil je maîtrise déjà" mais "ce projet a-t-il une
  logique métier" (voir 2.2 vs 2.3) — un profil dev qui préfère Framer parce qu'il va
  plus vite doit quand même vérifier ce critère avant de s'y engager.

- **Découvrir la complexité métier en cours de route plutôt qu'avant.** Le coût d'un
  mauvais choix d'outil se paie cher à mi-projet (voir 2.4) — l'analyse du module doit
  se faire AVANT d'ouvrir Framer, jamais après avoir commencé à construire.

## 5. Ancrage TribuZen

- TribuZen l'app reste et doit rester un projet Figma+dev — ce module ne change rien
  à cette pratique déjà en place, il la justifie formellement par des critères
  explicites plutôt que par une évidence non questionnée.
- La landing page vitrine de présentation de TribuZen devient, à partir de ce module,
  le terrain d'application concret de tout le reste du Bloc D (D02 à D07) — chaque
  module suivant construit une partie de cette même landing page.
- Le futur site de la marque Nuada (audits RGAA) est un deuxième candidat Framer
  plausible, à garder en tête comme second cas d'application possible du bloc.

## 6. Points clés

1. Framer est un outil de design ET de publication — un site Framer publié EST le
   produit final, contrairement à une maquette Figma qui doit toujours être recodée.
2. Framer convient à un contenu éditorial sans logique métier (site vitrine, teaser,
   portfolio) ; une application à état complexe reste Figma+dev.
3. TribuZen l'app est un cas Figma+dev ; une landing page de présentation de TribuZen
   est un cas Framer légitime — même produit, deux chantiers de nature différente.
4. Le choix d'outil doit se décider AVANT de commencer à construire, jamais découvert
   en cours de route après avoir buté sur une limite.
5. Le Code Override (module D06) marque la limite exacte de ce qu'on peut encore faire
   dans Framer avant qu'un vrai backend devienne nécessaire.

## 7. Seeds Anki

```
Quelle est la différence structurante entre Figma et Framer ?|Figma produit des artefacts intermédiaires (maquettes) qu'un dev doit recoder ; Framer publie directement le site final, avec un vrai domaine
Quels sont les 3 critères qui rendent Framer pertinent pour un projet ?|Complexité métier faible à nulle, besoin de rapidité de mise en ligne, pas besoin d'intégration backend propre
Pourquoi TribuZen (l'app) n'est-il pas un bon candidat Framer ?|Il a un état partagé entre écrans et une logique métier réelle (profils, routines) — hors de portée d'un outil no-code pensé pour du contenu éditorial
Pourquoi une landing page de présentation de TribuZen EST un bon candidat Framer ?|C'est du contenu éditorial statique sans compte utilisateur ni état partagé — exactement le terrain d'un outil de design et publication
Quel est le principal piège de ce module ?|Découvrir la complexité métier d'un projet en cours de route dans Framer plutôt que l'avoir évaluée avant de commencer
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/d01-positionnement-outil/`. Tu y positionnes 3 cas
> réels/fictifs sur l'axe Framer vs Figma+dev et justifies chaque choix par les
> critères du module — brief complet et rubrique de vérification dans le README du lab.
