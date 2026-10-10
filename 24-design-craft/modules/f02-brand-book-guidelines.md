---
titre: Brand book et guidelines — un document utilisable sans toi
cours: 24-design-craft
bloc: F — Identité de marque multi-supports
notions: [brand book vs moodboard, règle vérifiable vs impression esthétique, usage autorisé vs interdit annoté, test d'utilisabilité par un tiers, contenu minimal d'un document de marque]
outcomes: [distinguer un brand book d'un moodboard par le critère de vérifiabilité, produire un document de marque qui ne nécessite aucune question orale pour être appliqué, construire au moins un contre-exemple annoté pour chaque règle de marque]
prerequis: [f01-anatomie-identite]
next: f03-declinaison-multi-supports
tribuzen: mini brand book complet pour Nuada (ou nahual.fr), testé par un tiers ou par soi-même à froid
last-reviewed: 2026-10
---

# Brand book et guidelines — un document utilisable sans toi

> **Outcomes — tu sauras FAIRE :** distinguer un brand book d'un moodboard par un critère
> objectif de vérifiabilité, produire un document de marque que quelqu'un d'autre peut
> appliquer sans te poser une seule question, et construire pour chaque règle au moins un
> contre-exemple qui montre ce qu'il ne faut PAS faire.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Tu as documenté l'anatomie du logo Nuada (module F01) : grille, zone de protection, usages
interdits. Imagine maintenant qu'un partenaire (un confrère RGAA qui veut relayer Nuada sur
son propre site, ou un futur stagiaire) te demande le fichier de marque pour produire lui-même
une bannière. Tu lui envoies... quoi exactement ? Un lien Figma avec le logo et "fais
attention à rester cohérent" ne suffit pas — ce n'est pas un document, c'est de la confiance
aveugle. S'il choisit une couleur de fond qui casse le contraste du logo, ou étire le symbole
pour remplir son espace, la faute n'est pas la sienne : c'est l'absence de règles écrites.

Ce module construit le document qui rend cette situation impossible : un brand book qui
répond déjà à chaque question avant qu'elle soit posée.

## 2. Théorie complète, concise

### 2.1 Brand book ≠ moodboard — le critère de vérifiabilité

Un **moodboard** est une planche de références qui donne une IMPRESSION (collage d'images,
de couleurs, de textures qui "vont ensemble"). Un **brand book** est un document de RÈGLES
précises et vérifiables : un code couleur exact (`#8BA888`, pas "un vert proche de la sauge"),
une police nommée avec sa source exacte (`Fraunces`, variable font, Google Fonts), un ratio de
zone de protection chiffré. La différence n'est pas de degré, elle est de nature : un moodboard
inspire, un brand book se CONTRÔLE — on peut vérifier objectivement si un usage le respecte ou
pas. Un document qui ne permet pas cette vérification n'est pas encore un brand book, quelle
que soit sa qualité esthétique.

### 2.2 Le test de validité : la question qui ne devrait jamais se poser

Critère opérationnel pour juger si un brand book est complet : **peut-il être appliqué par
quelqu'un qui n'a jamais parlé au créateur de la marque, sans qu'il ait besoin de poser une
seule question ?** Si la réponse implique "il faudrait lui demander" pour un cas d'usage
plausible, le document est incomplet sur ce point précis — pas vaguement perfectible, un trou
identifiable et comblable.

Ce test se fait concrètement en se mettant à la place d'un tiers naïf et en listant les
décisions qu'il devrait prendre pour produire un livrable courant (bannière, post réseau
social, slide) : chaque décision non couverte par une règle écrite est un trou du brand book.

### 2.3 Contenu minimal attendu

Un brand book fonctionnel rassemble, au minimum :

1. **Logo** : construction (renvoi au module F01), zone de protection, usages interdits.
2. **Palette de marque** : codes exacts (hex, et idéalement HSL pour permettre des variations
   raisonnées, voir Bloc B module 2), avec le rôle de chaque couleur nommé (couleur principale,
   couleur d'accent, neutre).
3. **Typographie de marque** : police(s) exacte(s), source de téléchargement/licence (lien
   direct avec le module F05 à venir), hiérarchie d'usage (quelle police/quel poids pour un
   titre, un corps de texte, une signature).
4. **Au moins un exemple d'application réussie ET un exemple d'application incorrecte
   annotée** — voir 2.4, c'est la section la plus souvent absente et la plus utile.

### 2.4 Pourquoi le contre-exemple compte autant que l'exemple

Un brand book qui ne montre QUE des applications réussies enseigne "à quoi ça doit ressembler"
mais jamais "comment reconnaître une erreur avant de la commettre". Un tiers qui n'a vu que des
bons exemples n'a aucun signal d'alarme interne quand il produit, sans le savoir, un mauvais
usage (logo étiré de 5%, à peine visible à l'œil non entraîné, mais qui dérive déjà de la
grille du module F01). Montrer explicitement un contre-exemple annoté ("NE PAS faire ceci,
parce que...") donne ce signal d'alarme de façon beaucoup plus efficace qu'une règle énoncée
abstraitement.

## 3. Worked examples

### Exemple A — construire la section palette d'un brand book Nuada

1. Reprendre les couleurs de marque Nuada existantes (ou les fixer si elles ne sont pas
   encore figées) et les convertir en codes hexadécimaux exacts, pas approximatifs.
2. Nommer le RÔLE de chaque couleur : laquelle est la couleur principale (logo, fond de
   marque), laquelle est la couleur d'accent (CTA, éléments d'attention), laquelle est
   neutre (texte, fond secondaire).
3. Documenter au moins une combinaison INTERDITE explicitement : par exemple, poser le logo
   dans sa version couleur sur un fond d'une des couleurs d'accent (contraste insuffisant ou
   clash visuel) — montrer un visuel du cas interdit, pas seulement le décrire en texte.

### Exemple B — le test du tiers naïf, appliqué

Un stagiaire doit produire une bannière LinkedIn pour Nuada à partir du brand book produit en
Exemple A. Questions qu'il pourrait se poser, et vérification si le document y répond déjà :

- "Quelle couleur de fond je peux utiliser derrière le logo ?" → répondu si la section palette
  nomme explicitement les fonds autorisés (pas juste "la palette existe").
- "Je peux recolorer le logo dans la couleur d'accent pour qu'il se détache plus ?" → répondu
  si les usages interdits du module F01 couvrent explicitement le recoloriage.
- "Quelle taille minimale pour que le logo reste lisible sur une bannière 1200×628px ?" →
  si cette question n'a AUCUNE réponse dans le document actuel, c'est un trou réel à combler
  (taille minimale de reproduction, souvent absente des premières versions d'un brand book).

## 4. Pièges & misconceptions

- **Confondre brand book et moodboard.** Un moodboard donne une direction, un brand book
  donne des règles vérifiables — voir 2.1. Les deux ont leur place, mais à des moments
  différents du processus (moodboard en amont, brand book en livrable final).

- **Ne montrer que des exemples réussis.** Voir 2.4 : sans contre-exemple annoté, un tiers n'a
  aucun signal d'alarme pour reconnaître une erreur avant de la produire.

- **Croire qu'un brand book "complet sur le papier" l'est réellement.** Le seul test fiable
  est de le confronter à un usage réel produit par quelqu'un d'autre (ou soi-même à froid,
  voir le lab) — une relecture solo ne révèle pas les trous qu'on ne voit pas parce qu'on
  connaît déjà implicitement la réponse.

- **Documenter des règles non vérifiables** ("rester fidèle à l'esprit de la marque", "garder
  une impression de modernité") — ce sont des intentions, pas des règles ; un brand book doit
  pouvoir être contrôlé objectivement, voir 2.1.

## 5. Ancrage TribuZen

- Nuada est le candidat naturel pour ce lab : une marque réelle, en production
  (nuada-audit.netlify.app), qui n'a jamais eu de document de règles écrit au-delà de son
  usage courant par son créateur.
- Le brand book produit ici devient la référence unique pour tout le reste du Bloc F : les
  déclinaisons multi-supports (module F03) et le pont vers les tokens produit (module F04)
  partent de CE document, jamais d'une nouvelle interprétation de la marque.
- Si TribuZen se dote un jour d'une identité de marque formelle (au-delà des tokens UI de
  `design.md`), ce module s'applique de la même façon : d'abord l'anatomie (F01), puis ce
  brand book complet, avant toute déclinaison.

## 6. Points clés

1. Un brand book se distingue d'un moodboard par la vérifiabilité de ses règles — codes
   exacts, pas une impression esthétique partagée.
2. Le test de validité : peut-il être appliqué sans qu'aucune question ne se pose à
   quelqu'un qui n'a jamais parlé au créateur de la marque ?
3. Le contenu minimal couvre logo, palette (avec rôle de chaque couleur), typographie
   (avec hiérarchie d'usage) et au moins un exemple réussi + un contre-exemple annoté.
4. Le contre-exemple compte autant que l'exemple réussi : il donne le signal d'alarme qu'une
   règle abstraite ne donne pas.
5. La seule vérification fiable d'un brand book est un usage réel par un tiers (ou soi-même
   à froid) — une relecture solo ne révèle pas ses propres trous.

## 7. Seeds Anki

```
Quelle est la différence fondamentale entre un moodboard et un brand book ?|Un moodboard donne une impression esthétique ; un brand book donne des règles vérifiables objectivement (codes exacts, pas des sensations)
Quel est le test de validité d'un brand book ?|Peut-il être appliqué par quelqu'un qui n'a jamais parlé au créateur, sans qu'il ait besoin de poser une seule question ?
Pourquoi un contre-exemple annoté est-il aussi important qu'un exemple réussi ?|Il donne un signal d'alarme concret pour reconnaître une erreur avant de la commettre, qu'une règle énoncée abstraitement ne donne pas
Citer les 4 éléments minimaux d'un brand book fonctionnel.|Logo (construction, zone de protection, interdits), palette de marque (codes exacts, rôles), typographie de marque (sources, hiérarchie), exemple réussi + contre-exemple annoté
Pourquoi une relecture solo ne suffit-elle pas à vérifier un brand book ?|Le créateur connaît déjà implicitement les réponses non écrites — seul un usage par un tiers révèle les trous réels du document
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/f02-brand-book-guidelines/`. Tu y produis le brand book
> complet de Nuada (ou nahual.fr) et tu le fais passer au test du tiers naïf — brief complet
> et rubrique de vérification dans le README du lab.
