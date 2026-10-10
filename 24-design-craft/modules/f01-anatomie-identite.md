---
titre: Anatomie d'une identité de marque
cours: 24-design-craft
bloc: F — Identité de marque multi-supports
notions: [construction géométrique du logo, zone de protection, usages interdits, palette de marque vs palette produit, typographie de marque vs typographie UI]
outcomes: [analyser la construction géométrique d'un logo existant, définir une zone de protection et des usages interdits, distinguer une palette de marque d'une palette produit, choisir une typographie de marque argumentée]
prerequis: []
next: f02-brand-book-guidelines
tribuzen: préparer l'anatomie de l'identité Nuada (ou nahual.fr) avant de produire le brand book complet en f02/lab f01
last-reviewed: 2026-10
---

# Anatomie d'une identité de marque

> **Outcomes — tu sauras FAIRE :** analyser la construction géométrique d'un logo existant
> (grille, zone de protection, usages interdits), distinguer une palette de marque d'une
> palette produit, et choisir une typographie de marque argumentée plutôt qu'au goût.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Tu reprends le projet **Kley** (refonte DA + logo + site pour un client industriel, livrée
en 2016). Dix ans plus tard, tu dois être capable d'expliquer : sur quelle grille le logo
est construit, quelle zone de protection l'entoure, ce qu'il est interdit de faire avec
(l'étirer, le recolorer, le poser sur un fond qui casse le contraste), et pourquoi la
palette du logo n'est pas forcément celle de l'ensemble du site.

Si tu ne peux pas répondre à ces quatre questions sur ton propre travail, tu n'as pas
construit une identité — tu as produit une image qui ressemble à un logo. La différence
est structurelle, pas esthétique : une identité se décline sans perdre sa cohérence (print,
web, réseaux sociaux, un favicon de 16px) ; une image ne survit pas à la déclinaison.

## 2. Théorie complète, concise

### 2.1 Construction géométrique du logo

Un logo professionnel n'est (presque) jamais dessiné à l'œil : il repose sur une grille de
construction explicite (cercles, carrés, angles précis) qui garantit sa reproductibilité à
l'identique par n'importe qui, à n'importe quelle taille. Cette grille se documente dans le
brand book (module F02) sous forme de schéma annoté — pas un détail décoratif, c'est ce qui
permet à un tiers (imprimeur, intégrateur, stagiaire) de ne JAMAIS redessiner le logo à
main levée.

**Pourquoi ça compte concrètement** : un logo redessiné "à l'œil" par quelqu'un qui n'a pas
la grille dérive visiblement au fil des usages (proportions légèrement différentes sur
chaque support) — un défaut invisible pris isolément, flagrant une fois tous les supports
mis côte à côte.

### 2.2 Zone de protection (clear space)

Espace minimal, exprimé en unité relative au logo lui-même (souvent la hauteur d'un élément
du logo, notée `x`), à l'intérieur duquel aucun autre élément (texte, image, bord de page)
ne doit empiéter. Ce n'est pas une préférence esthétique — un logo sans zone de protection
documentée finit tôt ou tard collé à un bord de page ou à côté d'un autre logo sans espace,
dans un support que tu ne contrôles pas (une newsletter partenaire, un slide d'un tiers).

### 2.3 Usages interdits

Liste explicite de ce qu'il ne faut JAMAIS faire : étirer disproportionnellement, recolorer
hors de la palette validée, poser sur un fond qui casse le contraste minimal, ajouter une
ombre/un effet non prévu, extraire un élément du logo pour l'utiliser seul sans validation.
Documenter ces interdits n'est pas de la rigidité gratuite — c'est ce qui évite qu'un tiers
bien intentionné mais non formé dégrade la marque sans s'en rendre compte.

### 2.4 Palette de marque vs palette produit

Distinction souvent ignorée par un profil dev qui n'a connu que des design tokens produit :
la **palette de marque** (couleurs du logo, de la charte print/corporate) et la **palette
produit** (couleurs sémantiques d'une UI : succès, erreur, warning, états interactifs) ne
sont PAS nécessairement identiques. Une couleur de marque forte et saturée peut être
inutilisable comme couleur d'action principale d'une UI (contraste insuffisant, trop
agressive répétée sur des centaines de boutons) — la palette produit en dérive souvent une
version ajustée (teinte conservée, luminosité/saturation recalibrées pour l'usage UI), pas
une copie 1:1.

### 2.5 Typographie de marque vs typographie UI

Même logique que la couleur : la typographie de marque (souvent une police de caractère,
parfois custom, utilisée en très grand sur un support de communication) peut différer de la
typographie UI (choisie pour sa lisibilité à petite taille, son nombre de poids disponibles,
sa performance de chargement web). Les deux doivent être choisies en cohérence consciente
l'une avec l'autre (pairing argumenté, pas accidentel) — voir Bloc B module 3 (typographie
comme discipline) pour la théorie complète du pairing.

## 3. Worked examples

### Exemple A — décomposer l'anatomie du logo Kley (ou équivalent)

Face à un logo déjà produit (Kley 2016, ou tout logo existant à disposition) :

1. Identifier la grille de construction probable (cercles, carrés, angles) en traçant des
   guides sur une capture du logo dans Figma.
2. Définir une zone de protection cohérente avec les proportions du logo (ex. `1x` = la
   hauteur du symbole, zone de protection = `1x` tout autour minimum).
3. Lister au moins 4 usages interdits concrets (pas génériques) : ex. "ne jamais poser le
   logo blanc sur un fond de luminosité inférieure à X%", "ne jamais séparer le symbole du
   nom de marque sans validation".
4. Comparer la couleur principale du logo à la couleur d'action principale choisie pour un
   produit (si elle existe) — documenter si c'est la même teinte ajustée ou une couleur
   différente, et pourquoi.

### Exemple B — palette de marque ≠ palette produit, cas concret

Une marque a un rouge saturé comme couleur signature (logo, print). Utiliser ce même rouge
comme couleur de bouton "Valider" répété sur chaque écran d'une console produirait une
fatigue visuelle et un signal d'alerte involontaire (le rouge est culturellement associé à
l'erreur/danger en UI, voir Bloc B module 2 théorie de la couleur). Solution : le rouge de
marque reste réservé aux usages de marque (logo, landing, documents) ; la palette produit
dérive une couleur d'action distincte, cohérente avec le système mais pas identique.

## 4. Pièges & misconceptions

- **Redessiner un logo "à l'œil" parce que "ça se ressemble".** Sans la grille de
  construction documentée, chaque redessin dérive légèrement — invisible isolément,
  flagrant une fois plusieurs versions comparées côte à côte.

- **Croire que la palette de marque DOIT être la palette produit.** C'est l'erreur la plus
  fréquente d'un profil dev qui pense "tokens" avant de penser "marque" — voir Exemple B.
  Les deux palettes communiquent, elles ne sont pas identiques par défaut.

- **Omettre les usages interdits parce que "c'est évident".** Ce qui est évident pour le
  créateur de la charte ne l'est jamais pour un tiers qui la découvre — un stagiaire
  marketing, un partenaire externe, un intégrateur presse.

- **Confondre zone de protection et marge de mise en page.** La zone de protection est
  relative au logo (en `x`, proportionnelle), pas une valeur fixe en pixels qui ne
  s'adapterait pas si le logo est redimensionné.

## 5. Ancrage TribuZen

TribuZen n'a pas encore de logo construit formellement (le fil-rouge s'est concentré sur
les tokens UI via `design.md`). Ce module prépare le travail à faire AVANT le brand book
complet (module F02, lab F01) : si TribuZen devait avoir un logo, il faudrait documenter sa
grille, sa zone de protection et ses usages interdits avant toute déclinaison — même
discipline que pour un vrai client, pas une exception parce que c'est un projet perso.

## 6. Points clés

1. Un logo professionnel repose sur une grille de construction documentée, jamais sur un
   dessin "à l'œil" reproduit de mémoire.
2. La zone de protection s'exprime en unité relative au logo (`x`), pas en pixels fixes.
3. Les usages interdits se documentent explicitement — ce qui est évident pour le créateur
   ne l'est jamais pour un tiers.
4. La palette de marque et la palette produit communiquent mais ne sont pas identiques —
   une couleur de marque forte dérive souvent une version ajustée pour l'usage UI répété.
5. Même logique pour la typographie : marque et UI peuvent différer, le pairing doit rester
   argumenté (Bloc B module 3).

## 7. Seeds Anki

```
Pourquoi un logo repose-t-il sur une grille de construction documentée ?|Pour garantir sa reproductibilité à l'identique par un tiers, sans dérive progressive au fil des redessins "à l'œil"
En quelle unité s'exprime une zone de protection de logo ?|En unité relative au logo lui-même (notée x, souvent la hauteur d'un élément du logo), pas en pixels fixes
Pourquoi documenter des usages interdits explicites ?|Parce que ce qui est évident pour le créateur de la charte ne l'est jamais pour un tiers qui la découvre sans contexte
La palette de marque doit-elle être identique à la palette produit ?|Non — une couleur de marque forte et saturée peut être inutilisable répétée comme couleur d'action UI ; la palette produit en dérive souvent une version ajustée
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/f01-anatomie-identite/`. Ce module prépare l'analyse
> d'anatomie (grille, zone de protection, usages interdits, palettes) qui devient la
> première section du mini brand book complet produit dans le lab F01 — brief et rubrique
> dans le README du lab.
