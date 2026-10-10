---
titre: Composition, grille et proportion
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [grille suisse, nombre d'or et son statut réel, grilles modulaires, rythme vertical / baseline grid, lien avec la grille 8pt déjà pratiquée en code]
outcomes: [construire une grille modulaire de colonnes pour une mise en page dense, justifier un rythme vertical par des multiples d'une unité constante, évaluer le nombre d'or comme un outil parmi d'autres plutôt qu'une loi universelle, relier la grille de design à la grille 8pt déjà utilisée en CSS]
prerequis: [b04-gestalt]
next: b06-semiotique
tribuzen: grille modulaire et rythme vertical appliqués à un dashboard TribuZen dense (FamilyDashboard), avec au moins 5 espacements réels vérifiés comme multiples d'une unité
last-reviewed: 2026-10
---

# Composition, grille et proportion

> **Outcomes — tu sauras FAIRE :** construire une grille modulaire de colonnes pour une mise
> en page dense, justifier un rythme vertical par des multiples d'une unité constante,
> évaluer le nombre d'or comme un outil parmi d'autres plutôt qu'une loi universelle de la
> beauté, et relier explicitement la grille de design à la grille 8pt déjà utilisée côté code.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Côté code, TribuZen utilise déjà une grille 8pt implicite via Tailwind (les espacements
`p-2`, `p-4`, `p-6`... sont tous des multiples de 8px, ou de 4px pour les demi-pas). Cette
discipline existe en CSS sans qu'un équivalent conscient existe forcément côté maquette :
rien ne garantit aujourd'hui que les espacements dessinés dans Figma pour un écran comme
`FamilyDashboard` respectent la même unité, ou que les colonnes de la mise en page suivent
une structure modulaire plutôt qu'un positionnement libre au pixel près.

Ce module construit côté design exactement la même discipline que la grille 8pt côté code —
et une mise en garde nécessaire sur le nombre d'or, souvent présenté comme la clé magique de
toute composition harmonieuse, alors que son statut réel est beaucoup plus modeste.

## 2. Théorie complète, concise

### 2.1 Grille suisse — la structure héritée du module B01

Héritée du Swiss Style/International Typographic Style (voir module B01) : une grille de
colonnes RÉGULIÈRES et STRICTES, avec des gouttières (espaces entre colonnes) constantes.
Chaque élément de mise en page se pose sur une ou plusieurs colonnes entières, jamais entre
deux colonnes de façon arbitraire. C'est la structure qui rend une composition dense (comme
un dashboard à plusieurs blocs d'information) lisible malgré la quantité d'éléments.

### 2.2 Le nombre d'or — un outil de proportion, pas une loi de la beauté

Le nombre d'or (φ ≈ 1,618) est un rapport de proportion réel, mathématiquement défini, qui
apparaît effectivement dans certaines structures naturelles et dans certaines œuvres
historiques. **Point de vigilance honnête, nécessaire ici** : son statut de "loi universelle
de la beauté visuelle", très répandu dans la culture design populaire, est largement
surévalué et en grande partie une rationalisation rétrospective — de nombreuses attributions
historiques au nombre d'or (certains tableaux, certains bâtiments) ont été démontrées comme
approximatives ou anecdotiques plutôt que comme des règles de construction délibérées et
systématiques. Il n'existe pas de preuve scientifique solide qu'un rapport proche de 1,618
soit perçu comme "plus beau" qu'un autre rapport proche (ex. 1,5 ou 1,7) par un œil humain
moyen. **Conséquence pratique pour ce module** : utiliser le nombre d'or comme UN outil de
proportion possible parmi d'autres (il donne un rapport agréable et facile à calculer pour
une mise en page à deux zones, ex. une barre latérale et un contenu principal), jamais comme
une vérité esthétique absolue qui dispense de vérifier le résultat à l'œil et par l'usage
réel.

### 2.3 Grilles modulaires — lignes et colonnes combinables

Une grille modulaire ajoute une dimension horizontale (des lignes, pas seulement des
colonnes) à la grille suisse : la page se découpe en MODULES rectangulaires combinables,
chacun pouvant accueillir un bloc de contenu. C'est la structure naturelle d'un dashboard
dense : chaque carte d'information occupe un nombre entier de modules, jamais une fraction
arbitraire — ce qui garantit que l'ensemble reste aligné même avec un contenu hétérogène
(une carte courte, une carte longue, toutes deux alignées sur la même trame).

### 2.4 Rythme vertical (baseline grid) — le pont direct avec le code

Tous les espacements verticaux (marges, paddings, hauteurs de ligne) sont des **multiples
d'une unité constante** choisie une fois pour tout le système (souvent 4px ou 8px). C'est
EXACTEMENT le même principe que la grille 8pt déjà pratiquée côté Tailwind/CSS — ce module
ne découvre pas un nouveau concept, il transpose côté maquette une discipline déjà acquise
côté code. La différence pratique : côté code, l'unité est imposée par les classes
utilitaires (`p-2` = 8px) ; côté Figma, rien n'impose cette discipline par défaut — c'est au
designer de la déclarer et de la tenir manuellement (ou via les "layout grids"/variables
Figma, approfondis en Bloc C).

## 3. Worked examples

### Exemple A — vérifier le rythme vertical réel d'un dashboard existant

Sur un `FamilyDashboard` TribuZen existant :

1. Choisir l'unité de base supposée (ex. 8px, cohérente avec la grille Tailwind déjà en
   usage côté code).
2. Mesurer 5 espacements verticaux réels de la maquette (entre deux cartes, entre un titre
   et son contenu, le padding interne d'une carte, etc.).
3. Vérifier que chacun est un multiple exact de 8px. Si l'un d'eux donne, par exemple, 14px
   ou 22px, c'est un défaut documenté — la grille déclarée n'est pas tenue dans le vrai
   composant, exactement le piège nommé en §4.

### Exemple B — construire une grille modulaire à partir de zéro

Pour un dashboard dense à produire :

1. Choisir le nombre de colonnes (ex. 12, standard flexible qui se divise en 2, 3, 4 ou 6
   parts égales) et la largeur de gouttière.
2. Décider où le nombre d'or peut légitimement aider : par exemple, une mise en page à deux
   zones (liste de routines à gauche, détail à droite) peut utiliser un rapport proche de φ
   entre les deux largeurs comme point de départ RAISONNABLE — puis vérifier à l'œil et par
   l'usage réel (est-ce que la zone de détail a assez de place pour son contenu réel) plutôt
   que de s'arrêter à "c'est le nombre d'or donc c'est juste".
3. Poser chaque carte d'information sur un nombre entier de modules de la grille — jamais une
   largeur en pixels choisie indépendamment de la trame.

## 4. Pièges & misconceptions

- **Appliquer le nombre d'or dogmatiquement à toute mise en page.** Voir §2.2 — son statut
  de loi esthétique universelle est largement un mythe. Se demander d'abord si un problème
  de proportion réel existe (deux zones à équilibrer, par exemple), puis évaluer SI le
  nombre d'or y répond mieux qu'un autre rapport simple, jamais l'inverse.

- **Déclarer un rythme vertical qui n'est pas tenu dans les vrais composants.** Voir Exemple
  A — une grille existe souvent "sur le papier" (dans les specs ou dans l'intention du
  designer) sans être vérifiée composant par composant. Un seul espacement non conforme
  suffit à rompre la cohérence perçue, même si le reste de l'écran la respecte.

- **Confondre grille suisse (colonnes seules) et grille modulaire (colonnes + lignes).** La
  grille suisse structure l'horizontal ; la grille modulaire structure les deux dimensions —
  nécessaire dès qu'une mise en page doit aligner des blocs de hauteurs variables, comme un
  dashboard à cartes hétérogènes.

- **Changer d'unité de base en cours de projet sans tout recalculer.** Passer de 8px à 10px
  à mi-chemin casse tous les multiples déjà posés sur l'ancienne unité — un changement
  d'unité de base est une décision structurelle, pas un ajustement local.

## 5. Ancrage TribuZen

- `FamilyDashboard` peut être audité (Exemple A) pour vérifier que son rythme vertical
  déclaré (probablement 8px, cohérent avec la grille Tailwind déjà en usage côté code) est
  réellement tenu dans la maquette, avant toute extension du dashboard.
- Toute nouvelle carte ou module ajouté au design system TribuZen doit se poser sur un
  nombre entier de modules de la grille, jamais sur une largeur choisie indépendamment.
- Le pont entre unité de design (Figma) et unité de code (Tailwind `p-*`) doit rester le
  même nombre — 8px côté maquette doit produire 8px côté composant, pas une approximation.

## 6. Points clés

1. La grille suisse structure l'horizontal par des colonnes régulières à gouttières
   constantes, héritée du Swiss Style.
2. Le nombre d'or (φ ≈ 1,618) est un outil de proportion réel mais son statut de loi
   esthétique universelle est largement un mythe surévalué — à utiliser comme UNE option
   parmi d'autres, jamais comme une vérité absolue.
3. Une grille modulaire ajoute des lignes à la grille de colonnes, pour aligner des blocs de
   hauteurs variables sur une même trame.
4. Le rythme vertical (baseline grid) applique côté maquette exactement le même principe que
   la grille 8pt déjà pratiquée côté Tailwind/CSS.
5. Une grille déclarée "sur le papier" doit être VÉRIFIÉE composant par composant — un
   espacement non conforme suffit à rompre la cohérence perçue.
6. Changer l'unité de base d'un système de grille est une décision structurelle qui invalide
   tous les multiples déjà posés — jamais un ajustement local anodin.

## 7. Seeds Anki

```
Le nombre d'or est-il une loi scientifique de la beauté visuelle ?|Non — c'est un rapport de proportion réel mais son statut de loi esthétique universelle est largement un mythe surévalué et rationalisé après coup, sans preuve scientifique solide
Quelle est la différence entre une grille suisse et une grille modulaire ?|La grille suisse structure uniquement l'horizontal (colonnes) ; la grille modulaire ajoute des lignes pour créer des modules combinables dans les deux dimensions
Qu'est-ce que le rythme vertical (baseline grid) ?|La règle selon laquelle tous les espacements verticaux sont des multiples d'une unité constante choisie une fois pour tout le système
Quel est le lien entre le rythme vertical côté design et la grille 8pt côté code ?|C'est exactement le même principe appliqué dans deux contextes différents — côté code l'unité est imposée par les classes utilitaires, côté design elle doit être déclarée et tenue manuellement
Pourquoi une grille "déclarée sur le papier" peut-elle ne pas être respectée en pratique ?|Parce que personne ne vérifie composant par composant que chaque espacement réel est un multiple exact de l'unité choisie — un seul écart suffit à rompre la cohérence perçue
Quand peut-on légitimement utiliser le nombre d'or dans une mise en page ?|Comme point de départ raisonnable pour équilibrer deux zones, à condition de vérifier ensuite à l'œil et par l'usage réel — jamais comme une justification suffisante en elle-même
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b05-composition-grille/`. Tu y construis une grille
> modulaire complète pour un dashboard TribuZen dense et vérifies un rythme vertical justifié
> sur au moins 5 espacements réels — brief complet et rubrique de vérification dans le README
> du lab.
