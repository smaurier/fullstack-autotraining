# Lab D04 — Composant `FeatureCard`, API comparée à React

> **Module associé :** [`modules/d04-composants-proprietes.md`](../../modules/d04-composants-proprietes.md)
> **Forme :** Incrémental — reprendre la landing page des labs D02/D03.
> **Outil :** Framer.

## Lire avant

Relire précisément :
- §2.2 et le tableau de correspondance Framer ↔ React.
- L'Exemple A (3 propriétés justifiées) ET l'Exemple B (diagnostic d'une API
  surchargée) — le lab évalue autant la capacité à exposer le nécessaire qu'à refuser
  l'inutile.

## Brief

Construire un composant Framer réutilisable `FeatureCard` pour la section
"fonctionnalités" de la landing page TribuZen, avec **au moins 3 propriétés
exposées** (ex. texte, image, variant visuel). L'utiliser au moins 3 fois sur la page
avec des valeurs différentes par instance.

Écrire ensuite, pour CHAQUE propriété exposée, sa correspondance exacte avec une prop
React équivalente (nom de la prop, type, rôle) — comme dans le tableau du module.

## Livrable attendu

- Un composant `FeatureCard` avec au moins 3 propriétés exposées, utilisé 3 fois sur
  la landing page avec des valeurs distinctes par instance.
- Un document de correspondance : pour chaque propriété exposée, la prop React
  équivalente (nom, type TypeScript plausible, rôle en une phrase).
- Une vérification que modifier le composant maître (ex. la forme du cadre) se
  propage aux 3 instances sans affecter leurs propriétés exposées respectives.

## Rubrique de vérification

**Rubrique objective :**
- Composant réutilisé 3 fois avec des valeurs différentes par instance.
- Au moins 3 correspondances Framer↔React documentées, chacune avec un type
  plausible et un rôle clair.
- La propagation d'un changement du maître vers les 3 instances est vérifiée et
  décrite.

**Revue qualitative :** l'ensemble des propriétés exposées constitue-t-il une API
minimale et justifiée (3-5 propriétés qui varient réellement) ou une API surchargée
(propriétés qui ne varient jamais entre les 3 instances réelles de la page) — relire
l'Exemple B du module avant de trancher sur son propre composant.

## Variante J+30 (fading)

Construire un second composant de la landing page (ex. un bloc témoignage ou une
ligne de pied de page) et, cette fois, commencer par exposer délibérément 6-7
propriétés, puis appliquer le diagnostic de l'Exemple B pour en retirer celles qui ne
varient jamais entre les instances réelles utilisées — documenter l'avant/après et le
nombre de propriétés retirées avec leur justification.
