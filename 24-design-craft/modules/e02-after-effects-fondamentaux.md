---
titre: After Effects fondamentaux — keyframes, courbes de vitesse, vectoriel
cours: 24-design-craft
bloc: E — Motion design (After Effects/Lottie + Rive)
notions: [keyframes et interpolation, graph editor et courbes de vitesse, formes vectorielles vs rasterisées, calques et parenting, précomposition, pourquoi rester 100% vectoriel pour l'export Lottie]
outcomes: [poser des keyframes et ajuster leur courbe dans le graph editor, construire une animation en formes vectorielles exportables, organiser un projet AE en calques/précompositions propres pour un export Lottie sans surprise]
prerequis: [e01-douze-principes-animation]
next: e03-pipeline-lottie
tribuzen: illustration d'onboarding TribuZen (module suivant) et animation de chargement du capstone console GPU
last-reviewed: 2026-10
---

# After Effects fondamentaux — keyframes, courbes de vitesse, vectoriel

> **Outcomes — tu sauras FAIRE :** poser des keyframes et ajuster leur courbe de vitesse
> dans le Graph Editor pour obtenir l'easing voulu (module précédent), construire une
> animation entièrement en formes vectorielles, et organiser un projet en calques et
> précompositions propres — condition pour un export Lottie qui ne surprend pas.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Tu veux animer l'apparition d'une coche de succès (voir module précédent, exemple A). Sans
connaître l'outil, deux pièges classiques en 10 minutes de manipulation : (1) dessiner la
coche en important une image PNG plutôt qu'en forme vectorielle — elle sera floue si
agrandie et IMPOSSIBLE à exporter en Lottie (Lottie ne sait animer que des formes
vectorielles, pas des rasters) ; (2) animer l'opacité et l'échelle avec les keyframes par
défaut d'After Effects, qui sont en vitesse **constante** (linéaire) — exactement l'effet
mécanique que le module précédent dit d'éviter. Ce module donne les gestes concrets pour
éviter ces deux pièges dès la première animation.

## 2. Théorie complète, concise

### 2.1 Keyframes — la valeur à un instant donné

Un keyframe fixe la valeur d'une propriété (position, échelle, opacité, rotation) à un
instant précis de la timeline. Entre deux keyframes, After Effects **interpole**
automatiquement les valeurs intermédiaires. Poser un keyframe : cliquer le chronomètre à
côté de la propriété (ex. "Scale") active l'enregistrement, puis déplacer le playhead et
changer la valeur crée un nouveau keyframe automatiquement.

**Piège d'entrée immédiat** : les keyframes par défaut sont en interpolation linéaire
(vitesse constante) — exactement ce qu'il faut corriger via le Graph Editor (2.2) pour
obtenir l'easing du module précédent.

### 2.2 Graph Editor — la courbe de vitesse visualisée

Le Graph Editor affiche la vitesse d'une propriété dans le temps sous forme de courbe,
pas juste les keyframes sur une ligne. Basculer en mode "Speed Graph" (plutôt que "Value
Graph") affiche directement la vitesse — une ligne plate = vitesse constante (linéaire,
l'effet mécanique à éviter) ; une courbe qui monte puis descend = ease-in puis ease-out.

Les préréglages "Easy Ease" (raccourci `F9` sur un keyframe sélectionné) posent un
ease-in-out par défaut, à affiner ensuite en tirant les poignées de la courbe dans le
Graph Editor pour obtenir précisément un ease-out seul (sortie de poignée plate, entrée de
poignée inclinée) ou un ease-in seul (l'inverse).

### 2.3 Formes vectorielles — la seule matière exportable en Lottie

Un calque de forme (*Shape Layer*, menu Calque → Nouveau → Calque de forme) est défini par
des points vectoriels (chemins, courbes de Bézier) — comme un objet Figma ou Illustrator,
pas une grille de pixels. Lottie (module suivant) ne sait rejouer QUE des propriétés
vectorielles : position, échelle, rotation, opacité, et la géométrie du chemin lui-même.

**Ce qui NE passe PAS en Lottie**, à éviter dès la construction : les calques vidéo/image
raster, les effets de flou complexes (certains flous simples passent, pas tous), les
expressions JavaScript-like trop custom (certaines sont supportées par le renderer Lottie,
beaucoup ne le sont pas — à tester, voir module suivant), les styles de calque avancés
(ombre portée native AE ne passe pas toujours fidèlement — recréer l'ombre comme une forme
vectorielle séparée est plus fiable).

### 2.4 Calques, parenting et précomposition

Le **parenting** (icône spirale dans le panneau Timeline) attache un calque "enfant" à un
calque "parent" : déplacer/tourner le parent déplace l'enfant avec lui, sans dupliquer les
keyframes. Utile pour une icône composée de plusieurs formes qui doivent bouger ensemble
(ex. le corps et le reflet d'une coche).

Une **précomposition** (sélectionner plusieurs calques → clic droit → Précomposer) regroupe
un ensemble de calques en un seul calque imbriqué, avec sa propre timeline interne. Utile
pour isoler une animation complexe (ex. le spinner de chargement) comme un bloc réutilisable
— et c'est aussi le niveau auquel Bodymovin (module suivant) exporte proprement : une
structure plate avec trop de calques non groupés complique l'export et le débogage.

## 3. Worked examples

### Exemple A — animer la coche de succès avec easing correct (suite du module E01)

1. Dessiner la coche comme un **Shape Layer** avec l'outil Plume (Pen tool) — un seul
   chemin vectoriel, pas une image importée.
2. Poser un keyframe Scale à 0% sur la frame 0, puis 103% sur la frame 10 (overshoot), puis
   100% sur la frame 13 (retour) — trois keyframes, pas deux, pour obtenir l'overshoot du
   module précédent.
3. Sélectionner les trois keyframes, `F9` (Easy Ease), puis ouvrir le Graph Editor en mode
   Speed Graph pour vérifier que la courbe monte puis redescend sans plateau plat au milieu
   (un plateau signifierait une vitesse constante non voulue entre deux segments).
4. Vérifier qu'aucun effet non-vectoriel (flou gaussien lourd, style de calque "Ombre
   portée" natif) n'a été appliqué — recréer l'ombre comme une forme séparée à opacité
   réduite si besoin, pour un export Lottie fiable.

### Exemple B — organiser un projet en précomposition avant l'export

Une animation d'onboarding (module E02 appliqué au lab suivant) comporte 5 formes
(illustration, 2 éléments de décor, texte, bouton). Plutôt que 5 calques plats dans la
timeline principale : précomposer l'illustration + décor ensemble (bloc visuel fixe pendant
l'intro), garder texte et bouton en calques séparés au niveau principal (ils ont leur propre
timing d'apparition, décalé du reste). Résultat : une structure lisible, un export Lottie
qui groupe logiquement les éléments plutôt qu'une liste plate de 5 formes sans hiérarchie.

## 4. Pièges & misconceptions

- **Importer une image PNG/JPG "pour aller plus vite".** Rend l'export Lottie impossible
  pour cet élément (Lottie ignore ou rasterise les calques non-vectoriels, perdant tout
  l'intérêt du format léger). Toujours redessiner en Shape Layer, même si ça prend 2 minutes
  de plus qu'un import.

- **Laisser les keyframes en interpolation linéaire par défaut.** C'est l'erreur la plus
  fréquente chez un débutant AE — l'animation "a l'air de marcher" (les valeurs changent
  bien) mais paraît mécanique. Toujours vérifier le Graph Editor en Speed Graph, pas
  seulement la timeline.

- **Multiplier les effets de calque avancés par réflexe (flous, lueurs, styles).** Beaucoup
  ne survivent pas à l'export Lottie ou se dégradent. Tester l'export tôt (module suivant)
  plutôt que de construire toute l'animation puis découvrir au moment de l'export que la
  moitié des effets a disparu.

- **Confondre parenting et précomposition.** Le parenting lie des propriétés de
  transformation (position/rotation/échelle) entre calques qui restent indépendants dans la
  liste ; la précomposition regroupe physiquement plusieurs calques en un seul bloc avec sa
  propre timeline. Les deux outils résolvent des problèmes différents — parenting pour "ce
  calque suit ce calque", précomposition pour "ce groupe devient une seule unité".

## 5. Ancrage TribuZen

L'illustration d'onboarding TribuZen (lab suivant, module E03) et l'animation de chargement
du flow de pilotage GPU (capstone) se construisent avec ces gestes :
- Toute forme dessinée en Shape Layer (Pen tool), jamais importée en raster — condition de
  survie à l'export Lottie du module suivant.
- Les transitions d'état idle/loading/succès (ancrées au module E01) utilisent des
  keyframes avec easing corrigé via Graph Editor, jamais l'interpolation linéaire par
  défaut.
- Les éléments qui doivent bouger ensemble (ex. logo TribuZen + son ombre vectorielle
  recréée) sont liés par parenting plutôt que dupliqués en keyframes identiques.

## 6. Points clés

1. Un keyframe fixe une valeur à un instant ; l'interpolation par défaut entre deux
   keyframes est linéaire (vitesse constante) — à corriger systématiquement.
2. Le Graph Editor en mode Speed Graph visualise la vitesse réelle dans le temps — une
   ligne plate signale une interpolation linéaire non voulue.
3. Seules les formes vectorielles (Shape Layers) survivent à un export Lottie fidèle —
   jamais d'image raster importée pour un élément qui doit s'animer.
4. Le parenting lie des transformations entre calques indépendants ; la précomposition
   regroupe physiquement des calques en une seule unité avec sa propre timeline.
5. Tester l'export Lottie tôt dans la construction évite de découvrir après coup que des
   effets avancés (flous, styles de calque) ne sont pas passés.

## 7. Seeds Anki

```
Quelle est l'interpolation par défaut entre deux keyframes AE, et quel est le risque ?|Linéaire (vitesse constante) — paraît mécanique, à corriger via le Graph Editor (Easy Ease puis ajustement des poignées)
Pourquoi une forme doit-elle être un Shape Layer et jamais une image importée, pour ce cours ?|Lottie ne sait rejouer que des propriétés vectorielles — une image raster ne survit pas à l'export ou perd tout l'intérêt du format léger
Que montre le Graph Editor en mode Speed Graph ?|La vitesse réelle d'une propriété dans le temps — une ligne plate indique une interpolation linéaire, une courbe montre l'easing appliqué
Quelle est la différence entre parenting et précomposition ?|Le parenting lie les transformations entre calques qui restent indépendants dans la liste ; la précomposition regroupe physiquement plusieurs calques en une seule unité avec sa propre timeline
Quels éléments AE ne survivent généralement pas à un export Lottie fidèle ?|Les calques raster/vidéo, de nombreux effets de flou avancés, les styles de calque natifs (ombre portée) et certaines expressions complexes — à tester tôt, pas supposer
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/e02-after-effects-fondamentaux/`. Tu y construis une
> illustration d'onboarding TribuZen entièrement vectorielle (Shape Layers), animée avec
> keyframes et easing corrigé via le Graph Editor, organisée en précomposition — prête
> pour l'export Lottie du module suivant. Brief et rubrique dans le README du lab.
