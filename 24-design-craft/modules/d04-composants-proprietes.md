---
titre: Composants, variants, propriétés exposées — le pont direct vers React props
cours: 24-design-craft
bloc: D — Framer (outil)
notions: [composant Framer réutilisable, propriétés exposées comme interface publique, comparaison directe avec les props React, discipline de conception d'API appliquée au design no-code]
outcomes: [construire un composant Framer réutilisable avec des propriétés exposées cohérentes, comparer explicitement une propriété Framer à une prop React équivalente, diagnostiquer une API de composant surchargée de propriétés inutiles]
prerequis: [d03-interactions-effects]
next: d05-cms-framer
tribuzen: composant de carte de fonctionnalité de la landing page TribuZen, comparé explicitement à son équivalent en props React
last-reviewed: 2026-10
---

# Composants, variants, propriétés exposées — le pont direct vers React props

> **Outcomes — tu sauras FAIRE :** construire un composant Framer réutilisable avec
> des propriétés exposées cohérentes, comparer explicitement chaque propriété Framer à
> la prop React équivalente qu'elle remplacerait en code, et diagnostiquer une API de
> composant surchargée de propriétés qui exposent trop de détails internes.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

La landing page TribuZen (modules D02-D03) répète la même carte de fonctionnalité
plusieurs fois, avec un texte et une icône différents chaque fois. Sans composant
réutilisable, chaque carte est une copie indépendante — modifier le style d'une carte
n'affecte pas les autres, exactement le même problème que dupliquer un composant
React au lieu de le paramétrer avec des props.

C'est le point où le profil dev de Sylvain cesse d'être un simple atout théorique et
devient un raccourci de compréhension concret : ce module n'introduit pas un concept
nouveau, il montre qu'un concept déjà parfaitement maîtrisé en code (une API de
composant bien conçue) a un équivalent direct dans Framer, sous un autre vocabulaire.

## 2. Théorie complète, concise

### 2.1 Composant Framer réutilisable : la même logique qu'un composant React

Un composant Framer a un **maître** (la définition) et des **instances** (les copies
utilisées sur la page) — logique identique à un composant Figma (module C02), mais ici
le composant est déjà en production. Modifier le maître propage le changement à
toutes les instances, sauf sur les propriétés explicitement rendues modifiables par
instance (2.2).

### 2.2 Propriétés exposées : l'interface publique du composant

Les **propriétés exposées** (texte, image, variant visuel, booléen) apparaissent dans
un panneau dédié pour quiconque place une instance du composant — c'est littéralement
l'équivalent d'une liste de **props** d'un composant React : une interface publique
qui permet de personnaliser chaque instance SANS toucher à la structure interne du
composant.

| Framer | React | Rôle |
|---|---|---|
| Propriété de texte exposée | `prop: string` | Contenu personnalisable par instance |
| Propriété d'image exposée | `prop: imageUrl` ou `children` | Média personnalisable |
| Variant visuel exposé | `prop: variant` (ex. `cva`) | Choix d'apparence prédéfini |
| Propriété booléenne exposée | `prop: boolean` | Bascule d'un état simple (ex. `disabled`) |

### 2.3 Où la frontière design/code s'efface le plus dans tout ce cours

En Figma (C02), les variants restent dans l'outil de design — un développeur doit
ensuite les recoder. En Framer, les propriétés exposées pilotent un composant qui est
DÉJÀ le produit en production : il n'y a plus d'étape de recodage. C'est le point du
cours où la distinction design/dev s'efface le plus directement — raison
supplémentaire pour appliquer ici la même rigueur de conception d'API qu'en code.

### 2.4 La discipline d'API s'applique à l'identique, pas par analogie vague

Une bonne API de composant React expose le MINIMUM de props nécessaires pour couvrir
les cas d'usage réels, sans rendre modifiable chaque détail interne "juste au cas où".
La même discipline s'applique mot pour mot à un composant Framer : exposer trop de
propriétés (position interne d'un élément, détail de mise en page qui ne devrait
jamais varier) produit la même dette de complexité qu'une API React mal pensée —
chaque propriété exposée en plus est une décision qui doit être justifiée, pas ajoutée
par réflexe de flexibilité.

## 3. Worked examples

### Exemple A — composant `FeatureCard` avec 3 propriétés exposées, pensées comme des props

1. Propriétés exposées : `titre` (texte), `icone` (image), `mise-en-avant` (booléen,
   change la bordure visuelle).
2. Correspondance React explicite : `titre` ↔ `title: string`, `icone` ↔
   `icon: ReactNode`, `mise-en-avant` ↔ `highlighted?: boolean` — une API minimale de 3
   props, chacune justifiée par un vrai besoin de variation entre instances.
3. Utiliser le composant 3 fois sur la landing page avec des valeurs différentes :
   modifier le maître (ex. la forme du cadre) se propage aux 3 instances
   automatiquement, seules les 3 propriétés exposées varient par carte.

### Exemple B — diagnostiquer une API surchargée

Composant `FeatureCard` avec 9 propriétés exposées : position du texte, taille exacte
de l'icône en pixels, couleur de fond en hexadécimal libre, épaisseur de bordure,
etc. Diagnostic : la plupart de ces propriétés ne varient JAMAIS réellement entre les
instances utilisées sur la page — elles ont été exposées "par flexibilité", pas par
besoin constaté. Correction : les retirer du panneau de propriétés exposées et les
fixer dans le composant maître ; ne garder exposé que ce qui varie réellement, comme
une revue de props React qui élimine les options jamais utilisées.

## 4. Pièges & misconceptions

- **Exposer une propriété "au cas où elle servirait un jour" plutôt que pour un besoin
  constaté.** Voir Exemple B — une API de composant se construit sur l'usage réel, pas
  sur une flexibilité hypothétique, que ce soit en React ou en Framer.

- **Oublier la comparaison explicite avec React.** Le bénéfice pédagogique de ce
  module disparaît si la correspondance props Framer ↔ props React n'est jamais
  écrite — c'est cette mise en mots qui transforme une manipulation d'outil en
  compétence transférable.

- **Modifier directement une instance au lieu du maître pour un changement qui
  devrait s'appliquer à toutes.** Symptôme d'avoir perdu la distinction maître/
  instance — revenir au composant source pour tout changement structurel.

## 5. Ancrage TribuZen

- Le composant `FeatureCard` de la landing page devient réutilisable et cohérent sur
  toute la page, avec une API documentée et comparée au composant React équivalent
  qu'un développeur écrirait pour le même besoin.
- Cette discipline de conception d'API minimale se retrouvera telle quelle dans le
  Bloc C (Figma, composants/variants) si ce module est repris après coup, et dans le
  cours 06 (design system en code) côté implémentation réelle.

## 6. Points clés

1. Un composant Framer a un maître et des instances — logique identique à un
   composant Figma ou React.
2. Les propriétés exposées sont l'interface publique du composant — l'équivalent
   direct des props React, personnalisables par instance sans toucher à la structure.
3. Framer est le point du cours où la frontière design/dev s'efface le plus : le
   composant piloté par ses propriétés exposées est déjà en production.
4. La discipline de conception d'API (minimum nécessaire, justifié par l'usage réel)
   s'applique à l'identique en Framer et en React.
5. Une propriété exposée qui ne varie jamais réellement entre les instances utilisées
   est un signal d'API surchargée, à retirer et fixer dans le composant maître.

## 7. Seeds Anki

```
Qu'est-ce qu'une propriété exposée dans un composant Framer, en termes React ?|L'équivalent direct d'une prop : une interface publique personnalisable par instance, sans toucher à la structure interne
Pourquoi le Bloc D est-il le point du cours où design et dev se rapprochent le plus ?|Les propriétés exposées pilotent un composant déjà en production, sans étape de recodage séparée contrairement à Figma
Quel est le critère pour décider si une propriété doit être exposée ?|Un besoin de variation réellement constaté entre les instances utilisées, jamais "au cas où" par flexibilité hypothétique
Quel est le signal diagnostique d'une API de composant surchargée ?|Des propriétés exposées qui ne varient jamais réellement entre les instances existantes de ce composant
Que faut-il faire si un changement structurel doit s'appliquer à toutes les instances ?|Le faire sur le composant maître, jamais sur une instance individuelle
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/d04-composants-proprietes/`. Tu y construis le
> composant `FeatureCard` réutilisable avec ses propriétés exposées comparées
> explicitement à leur équivalent React — brief complet et rubrique de vérification
> dans le README du lab.
