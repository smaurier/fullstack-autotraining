---
titre: Styles & tokens Figma — le pont direct avec les tokens CSS
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [style Figma couleur/texte/effet, Figma Variables et modes, nommage par usage vs par valeur, correspondance token Figma / custom property CSS]
outcomes: [créer un système de styles/tokens Figma nommés sémantiquement par usage, utiliser une variable Figma pilotée par un mode, anticiper la correspondance avec les tokens CSS du cours 06 dès la construction dans Figma]
prerequis: [c02-composants-variants]
next: c04-prototypage
tribuzen: styles/tokens Figma miroir exact de la palette sauge/terracotta/blanc chaud et de la typo Fraunces/Inter de design.md
last-reviewed: 2026-10
---

# Styles & tokens Figma — le pont direct avec les tokens CSS

> **Outcomes — tu sauras FAIRE :** créer un système de styles/tokens Figma nommés
> sémantiquement par leur usage plutôt que par leur valeur, utiliser une variable Figma
> pilotée par un mode (light/dark ou équivalent), et anticiper la correspondance avec les
> tokens CSS du cours 06 dès la construction du fichier Figma.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le composant `Button` du module C02 a besoin d'une couleur de fond pour son variant
`destructive`. Le réflexe rapide est de cliquer sur le sélecteur de couleur et de choisir une
teinte rouge à l'œil, directement sur le calque. Six mois plus tard, un deuxième composant a
besoin de la même couleur d'alerte — et personne ne se souvient de la valeur hexadécimale
exacte utilisée sur le bouton. Pire : si la couleur de marque change un jour, il faut
retrouver et corriger CHAQUE calque qui l'utilise un par un, sans aucune garantie d'en avoir
trouvé 100%. C'est exactement le problème qu'une variable CSS (`--color-destructive`) résout
côté code — ce module construit l'équivalent Figma de cette garantie, AVANT de styliser quoi
que ce soit.

## 2. Théorie complète, concise

### 2.1 Styles Figma : la version historique du token

Un **style** Figma (couleur, texte, ou effet comme une ombre) est une valeur nommée et
réutilisable. Dès qu'une couleur ou une configuration de texte est utilisée plus d'une fois
dans un fichier, elle DOIT devenir un style — jamais une valeur répétée manuellement sur
chaque calque. C'est le mécanisme historique de Figma, toujours valide et toujours la base.

### 2.2 Figma Variables : des valeurs qui changent selon un mode

Les **Variables** Figma sont un mécanisme plus récent qui ajoute une capacité que les styles
seuls n'ont pas : une variable peut avoir des valeurs DIFFÉRENTES selon un **mode** actif (ex.
`light` / `dark`, ou `brand-A` / `brand-B`). Un composant qui référence une variable plutôt
qu'un style fixe change automatiquement d'apparence quand le mode change — sans qu'aucun
calque n'ait besoin d'être retouché. C'est l'équivalent Figma d'une custom property CSS qui
change de valeur selon un attribut `data-theme` sur la racine du document.

### 2.3 Nommer par USAGE, jamais par VALEUR

La règle qui structure tout ce module : un token (style ou variable) doit porter un nom qui
décrit son RÔLE dans l'interface, jamais sa valeur brute.

```
Mauvais nommage (par valeur)        Bon nommage (par usage)
─────────────────────────────       ─────────────────────────
"orange-1"                          "color-accent" ou "color-cta"
"rouge-vif"                         "color-destructive"
"vert-sauge"                        "color-brand-primary"
```

Le mauvais nommage casse silencieusement dès que la valeur change : si "orange-1" devient un
jour une couleur bleue (refonte de marque), le nom reste "orange-1" alors qu'il ne décrit plus
rien de vrai — toute personne qui lit ce nom plus tard est activement induite en erreur. Le
bon nommage reste vrai quelle que soit la valeur réelle sous-jacente : "color-accent" reste
l'accent, qu'il soit orange aujourd'hui ou bleu demain.

### 2.4 Le pont direct avec le cours 06 : un token Figma = un token CSS

Le cours 06 (`21-design-system/`) construit des tokens CSS (custom properties) consommés
par le code. Pour que la synchro Figma → code du module C07 (à venir) fonctionne réellement,
le nommage posé ICI doit déjà correspondre 1:1 à ce que le code attend :

```
Token Figma (nommé par usage)   →   Token CSS équivalent (cours 06)
color-brand-primary             →   --color-brand-primary
color-accent                    →   --color-accent
color-destructive               →   --color-destructive
```

Construire ce pont APRÈS coup (renommer tous les tokens Figma une fois que le code existe
déjà) coûte bien plus cher que de le penser dès cette étape — même logique que l'architecture
de l'information du module A03 : la structure se pense avant l'application, pas après.

## 3. Worked examples

### Exemple A — construire le système de tokens couleur de TribuZen

1. Identifier les couleurs de `design.md` : sauge, terracotta, blanc chaud (voir module B02
   pour la théorie complète de cette palette).
2. Nommer par rôle plutôt que par teinte : sauge devient `color-brand-primary` (couleur de
   marque dominante), terracotta devient `color-accent` (accent, CTA), blanc chaud devient
   `color-surface` (fond).
3. Créer une variable (pas seulement un style) pour chacune, avec un mode `light` déjà en
   place même si un mode `dark` n'existe pas encore côté produit — anticiper la variation
   future sans la construire prématurément.
4. Vérifier qu'aucun calque du fichier (voir les composants des modules C01/C02) n'utilise
   une valeur de couleur libre : tout doit référencer une des variables créées ici.

### Exemple B — diagnostiquer un mauvais nommage avant qu'il ne coûte cher

Un token nommé `terracotta-500` est utilisé à la fois comme couleur de bouton CTA et comme
couleur d'un badge "nouveau". Un jour, le CTA doit changer de couleur pour des raisons
d'accessibilité (contraste insuffisant, voir Bloc A module 6) mais le badge "nouveau" doit
garder sa couleur actuelle. Avec un nommage par valeur, les deux usages partagent le MÊME
token — changer l'un casse l'autre sans que ce soit visible immédiatement. Le bon nommage
aurait séparé `color-cta` et `color-badge-new` dès le départ, même s'ils partageaient
temporairement la même valeur de couleur : deux noms, deux usages, une seule coïncidence de
valeur qui peut diverger sans drame le jour où c'est nécessaire.

## 4. Pièges & misconceptions

- **Nommer un token par sa valeur plutôt que par son usage.** Voir 2.3 et l'Exemple B — le
  piège central de ce module, celui qui coûte le plus cher à corriger après coup.

- **Utiliser une valeur de couleur/texte libre "juste pour cette fois".** Chaque exception
  devient un calque invisible à corriger manuellement le jour où le token change — exactement
  le problème du cas concret en 1.

- **Créer un token différent pour chaque usage qui PARTAGE la même valeur par coïncidence.**
  Inversement au piège précédent : si deux usages ont vraiment le même RÔLE sémantique (ex.
  deux boutons CTA différents mais tous deux de type "accent principal"), un seul token
  suffit — créer deux tokens par excès de prudence complique sans bénéfice.

- **Construire les styles/tokens APRÈS avoir stylisé les composants.** Ce module précède
  volontairement C04/C05 dans l'ordre — styliser d'abord puis "tokeniser" après coup oblige à
  retrouver et remplacer chaque valeur libre une par une, exactement le travail que ce module
  cherche à éviter en amont.

## 5. Ancrage TribuZen

- Le système de tokens construit ici devient la référence unique pour tous les futurs
  composants Figma de TribuZen (Button du C02 à reconnecter à ces tokens, tout composant
  futur à construire directement sur eux).
- La correspondance Figma ↔ CSS posée en 2.4 est le prérequis direct du pipeline bout-en-bout
  du module C07 (Figma Variables → Style Dictionary → tokens CSS/Tamagui) — vérifier qu'elle
  est bien respectée avant de lancer ce module plus tard.
- Toute extension future de la palette (un token d'erreur, par exemple, cf. module B02
  Exemple B) doit suivre la même discipline de nommage par usage posée ici.

## 6. Points clés

1. Un style Figma est une valeur nommée réutilisable ; une variable Figma ajoute la capacité
   de changer de valeur selon un mode actif (light/dark, brand A/B).
2. Un token doit être nommé par son USAGE (`color-accent`) jamais par sa VALEUR
   (`orange-1`) — le nommage par valeur casse silencieusement dès que la valeur change.
3. Le nommage posé dans Figma doit correspondre 1:1 au nommage des tokens CSS du cours 06
   dès cette étape, pas après coup.
4. Deux usages qui partagent la même valeur par coïncidence méritent deux tokens distincts
   s'ils ont des rôles sémantiques différents — sinon ils divergeront sans qu'on s'en rende
   compte le jour où l'un doit changer sans l'autre.
5. Construire le système de tokens AVANT de styliser les composants évite d'avoir à
   retrouver et remplacer des valeurs libres après coup.

## 7. Seeds Anki

```
Quelle est la différence entre un style Figma et une variable Figma ?|Un style est une valeur nommée réutilisable ; une variable ajoute la capacité de changer de valeur selon un mode actif (ex. light/dark)
Pourquoi nommer un token par son usage plutôt que par sa valeur ?|Le nom par usage (color-accent) reste vrai même si la valeur change ; le nom par valeur (orange-1) devient trompeur dès que la couleur change
Que doit anticiper le nommage des tokens Figma pour le pipeline du module C07 ?|Une correspondance 1:1 avec le nommage des tokens CSS du cours 06, posée dès la construction dans Figma, pas après coup
Pourquoi deux usages qui partagent la même valeur de couleur méritent parfois deux tokens différents ?|Parce qu'ils peuvent avoir besoin de diverger un jour (ex. accessibilité) sans que l'autre usage soit affecté — un seul token les lierait à tort
Pourquoi construire le système de tokens avant de styliser les composants ?|Pour éviter de devoir retrouver et remplacer une à une des valeurs de couleur/texte libres après coup, une fois les composants déjà stylisés
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c03-styles-tokens/`. Tu y construis le système complet
> de styles/tokens couleur et texte de TribuZen, nommés par usage — brief complet et rubrique
> de vérification dans le README du lab.
