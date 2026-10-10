---
titre: Pipeline Bodymovin → Lottie — export et test réel
cours: 24-design-craft
bloc: E — Motion design (After Effects/Lottie + Rive)
notions: [plugin Bodymovin, format JSON vectoriel Lottie, runtime lottie-web, effets AE non supportés en export, discipline de test précoce dans le navigateur]
outcomes: [exporter une animation After Effects en Lottie via Bodymovin, intégrer et vérifier le rendu réel dans un navigateur, identifier et corriger une perte d'effet silencieuse à l'export]
prerequis: [e02-after-effects-fondamentaux]
next: e04-rive-state-machines
tribuzen: animation de chargement/succès TribuZen exportée Lottie, intégrée dans une vraie page, poids de fichier mesuré et justifié
last-reviewed: 2026-10
---

# Pipeline Bodymovin → Lottie — export et test réel

> **Outcomes — tu sauras FAIRE :** exporter une animation After Effects en Lottie via
> Bodymovin, intégrer et vérifier le rendu réel dans un navigateur plutôt que dans l'aperçu
> After Effects, et identifier une perte d'effet silencieuse à l'export avant qu'elle ne
> devienne un problème de livraison finale.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

La coche de succès animée du module E02 est construite entièrement en formes vectorielles,
avec un easing corrigé via le Graph Editor. Dans After Effects, elle est parfaite. Le
réflexe serait de considérer le travail fini à ce stade. Mais l'animation n'existera
réellement, pour un utilisateur de TribuZen ou un visiteur de nahual.fr, qu'une fois rejouée
dans un navigateur — et ce passage de l'aperçu After Effects au rendu navigateur n'est
jamais garanti silencieusement : c'est tout l'objet de ce module.

## 2. Théorie complète, concise

### 2.1 Bodymovin — le plugin qui traduit AE en JSON vectoriel

**Bodymovin** est un plugin After Effects (gratuit, maintenu par Airbnb à l'origine) qui
exporte une composition en un fichier **Lottie** : un fichier JSON qui décrit l'animation
sous forme de données vectorielles (positions, formes, keyframes, courbes de vitesse) —
pas une vidéo, pas une suite d'images. Ce fichier JSON est ensuite rejoué par une librairie
runtime : `lottie-web` côté navigateur, `lottie-react-native` côté mobile. Le rendu final
dépend donc de DEUX éléments : la qualité de l'export Bodymovin ET la fidélité du moteur de
rendu qui le rejoue.

### 2.2 Ce qui ne survit pas à l'export — à vérifier systématiquement

Le module E02 a déjà posé la règle de construction (formes vectorielles uniquement). Ce
module ajoute la discipline de VÉRIFICATION après export : certains effets After Effects
n'ont simplement pas d'équivalent dans le format Lottie ou dans le moteur `lottie-web` —
notamment certains flous avancés, certaines expressions scriptées complexes, et les styles
de calque natifs (ombre portée, lueur). Bodymovin exporte parfois ces éléments en les
ignorant silencieusement, SANS message d'erreur visible dans After Effects — le fichier
JSON s'exporte "avec succès" tout en ayant perdu un élément visuel.

### 2.3 Tester dans le vrai navigateur, pas dans l'aperçu Bodymovin seul

Bodymovin propose un aperçu intégré, utile mais insuffisant : la discipline correcte est de
charger le fichier JSON exporté dans un vrai contexte `lottie-web` (une page de test minimale
suffit) et de comparer image par image avec l'aperçu After Effects d'origine. C'est le seul
moment où une divergence silencieuse (2.2) devient visible — jamais avant.

### 2.4 Pourquoi tester tôt coûte moins cher que tester à la fin

Construire une animation complète de 20 secondes avec un effet non supporté noyé au milieu,
puis découvrir la perte seulement à l'export final, oblige à reconstruire une partie du
travail déjà fait. Exporter et tester un premier segment court DÈS que l'animation utilise
un effet non trivial (pas seulement à la toute fin du projet) permet de corriger la
construction avant d'avoir investi dans la suite.

## 3. Worked examples

### Exemple A — exporter et vérifier la coche de succès du module E02

1. Dans After Effects, avec le panneau Bodymovin ouvert, sélectionner la composition de la
   coche de succès et lancer le rendu (Render) vers un fichier `.json`.
2. Charger ce fichier dans une page HTML minimale avec `lottie-web` (`loadAnimation` sur un
   conteneur DOM) et l'ouvrir dans un vrai navigateur.
3. Comparer image par image (ou en ralenti) le rendu navigateur avec l'aperçu After Effects
   d'origine : la courbe d'easing du Graph Editor (module E02) est-elle bien rejouée, ou
   l'animation paraît-elle plus linéaire/mécanique dans le navigateur ?
4. Mesurer le poids du fichier JSON obtenu (`.json`, pas une vidéo) — une coche simple à
   3 keyframes doit rester de l'ordre de quelques Ko, pas plusieurs centaines.

### Exemple B — détecter une perte silencieuse d'effet

Une illustration d'onboarding utilise une légère ombre portée native AE sur l'illustration
principale (style de calque, pas une forme séparée).

1. Export Bodymovin : aucune erreur signalée dans After Effects.
2. Rendu navigateur réel : l'illustration apparaît sans aucune ombre — l'effet a été
   silencieusement ignoré par l'export, exactement le risque nommé en 2.2.
3. Correction : recréer l'ombre comme une forme vectorielle séparée à opacité réduite
   (technique déjà anticipée au module E02, §2.3) plutôt que comme un style de calque natif,
   puis réexporter et revérifier dans le navigateur.

## 4. Pièges & misconceptions

- **Considérer l'export "réussi" parce qu'aucune erreur n'apparaît dans After Effects.**
  Voir Exemple B — Bodymovin peut ignorer silencieusement un effet non supporté sans
  message d'erreur. L'absence d'erreur n'est pas une preuve de fidélité.

- **Se fier uniquement à l'aperçu intégré de Bodymovin.** Utile pour un contrôle rapide,
  insuffisant pour garantir le comportement dans le runtime `lottie-web` réellement utilisé
  en production — toujours tester dans un vrai navigateur.

- **Attendre la fin complète du projet pour faire le premier export de test.** Repousse la
  découverte d'un problème de compatibilité au moment où il coûte le plus cher à corriger
  (voir 2.4) — exporter et tester dès qu'un effet non trivial est introduit.

- **Supposer qu'un fichier Lottie est "forcément léger" sans le mesurer.** Une animation
  avec de nombreux calques ou des chemins vectoriels très détaillés peut produire un JSON
  lourd malgré le format — mesurer systématiquement (pont direct avec le module E06).

## 5. Ancrage TribuZen

- L'animation de chargement/succès de TribuZen (module E02) suit ce pipeline complet :
  export Bodymovin, test réel dans un navigateur, mesure de poids documentée avant toute
  intégration dans une vraie page du produit.
- Toute illustration d'onboarding future de TribuZen qui utilise un effet de style de calque
  natif (ombre, lueur) doit être revue selon l'Exemple B avant export, pas après.
- L'animation de chargement du flow de pilotage GPU du capstone suit la même discipline de
  test précoce — un dashboard dense ne tolère pas une animation qui "a l'air de marcher"
  dans l'éditeur mais échoue silencieusement en production.

## 6. Points clés

1. Bodymovin exporte une composition AE en JSON Lottie, rejoué ensuite par un runtime
   (`lottie-web` côté navigateur) — le rendu final dépend des deux étapes.
2. Certains effets AE (flous avancés, styles de calque natifs, expressions complexes) ne
   survivent pas à l'export, parfois SANS message d'erreur visible.
3. La seule vérification fiable est un test réel dans un navigateur via `lottie-web`,
   jamais l'aperçu Bodymovin seul ni l'aperçu After Effects d'origine.
4. Tester tôt (dès qu'un effet non trivial est introduit) coûte bien moins cher que
   découvrir une perte d'effet à la livraison finale.
5. Le poids du fichier JSON doit toujours être mesuré, jamais supposé "léger par nature du
   format".

## 7. Seeds Anki

```
Que fait le plugin Bodymovin ?|Il exporte une composition After Effects en un fichier JSON Lottie (données vectorielles), rejoué ensuite par un runtime comme lottie-web
Pourquoi une perte d'effet à l'export Lottie peut-elle passer inaperçue ?|Bodymovin peut ignorer silencieusement un effet non supporté (flou avancé, style de calque natif) sans afficher d'erreur dans After Effects
Où faut-il vérifier le rendu final d'un export Lottie ?|Dans un vrai navigateur via le runtime lottie-web — l'aperçu Bodymovin ou l'aperçu After Effects d'origine ne suffisent pas
Pourquoi tester l'export tôt plutôt qu'à la fin du projet ?|Découvrir une perte d'effet après avoir construit toute l'animation oblige à reconstruire le travail déjà fait — tester dès qu'un effet non trivial apparaît limite ce coût
Un fichier Lottie est-il toujours léger ?|Non — de nombreux calques ou des chemins vectoriels détaillés peuvent produire un JSON lourd malgré le format ; le poids doit être mesuré, jamais supposé
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/e03-pipeline-lottie/`. Tu y exportes l'animation du
> module E02 en Lottie et vérifies sa fidélité dans un vrai navigateur — brief complet et
> rubrique de vérification dans le README du lab.
