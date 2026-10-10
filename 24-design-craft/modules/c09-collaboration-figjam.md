---
titre: Collaboration temps réel & FigJam — process d'équipe, pas solo
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [commentaires épinglés vs commentaires externes, FigJam distinct du fichier de design, tri par cartes réel entre plusieurs personnes, traduction des post-its en structure exploitable]
outcomes: [animer un atelier FigJam de discovery ou de critique collective, distinguer un atelier FigJam d'un fichier de design Figma dans leur usage respectif, traduire explicitement le résultat brut d'un atelier en une structure actionnable]
prerequis: [c08-plugins-utiles]
next: d01-positionnement-outil
tribuzen: atelier FigJam de discovery ou de critique collective (avec Elda comme pair réel si possible) traduit en wireframe exploitable, pont direct avec le module A04
last-reviewed: 2026-10
---

# Collaboration temps réel & FigJam — process d'équipe, pas solo

> **Outcomes — tu sauras FAIRE :** animer un atelier FigJam de discovery ou de critique
> collective, distinguer clairement l'usage d'un fichier FigJam de celui d'un fichier de
> design Figma, et traduire explicitement le résultat brut d'un atelier (post-its) en une
> structure exploitable plutôt que le laisser à l'état d'exercice social sans suite.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Tous les labs produits depuis le module A01 ont été réalisés SEUL — c'est une contrainte
réelle du contexte de Sylvain (unique développeur de TribuZen), mais ce n'est pas comment le
métier se pratique en équipe. Le module A03 a déjà introduit le tri par cartes "simulé seul,
en se forçant à l'honnêteté" — une approximation honnête, pas l'expérience réelle. Un
recruteur qui évalue un profil "créatif-front-end hybride" (cf. brief Kerion) voudra savoir
si le candidat sait aussi FACILITER un atelier collectif, pas seulement produire seul.

Ce module ferme cette approximation en organisant un vrai atelier avec au moins une autre
personne réelle (Elda, ou un pair équivalent), et en traitant son résultat correctement : un
tas de post-its n'est pas encore un livrable de conception.

## 2. Théorie complète, concise

### 2.1 Commentaires épinglés : la collaboration DANS le fichier, pas à côté

Figma permet des commentaires épinglés directement sur un élément précis d'un design (un
bouton, une zone de texte) — contrairement à un commentaire général perdu dans un fil
Slack ou un email externe qui oblige à chercher "de quoi on parle". Le commentaire épinglé
reste visible exactement là où il s'applique, pour tous les collaborateurs du fichier, en
temps réel (curseurs multiples visibles pendant une session simultanée).

### 2.2 FigJam : un outil distinct, pas "Figma avec des post-its"

**FigJam** est un type de fichier à part dans Figma, pensé pour les ATELIERS plutôt que la
production de maquettes : post-its, votes, formes de brainstorming, chronomètre d'atelier
intégré. La distinction d'usage est nette :
- **Figma (design)** : produire un livrable de conception précis (composants, maquettes,
  prototypes) — ce que tous les modules C01-C08 ont pratiqué.
- **FigJam (atelier)** : faire émerger des idées collectivement, en vrac, avant toute
  structuration — proche d'un vrai tableau blanc physique avec des post-its, pas d'un outil
  de production finale.

Confondre les deux revient à essayer de "designer proprement" pendant un brainstorm (ce qui
bride la génération d'idées) ou à laisser un résultat FigJam brut comme s'il était déjà une
spec de conception (ce qui saute l'étape de structuration).

### 2.3 Tri par cartes réel vs simulé seul (pont avec A03)

Le module A03 a pratiqué un tri par cartes simulé seul, en se forçant à documenter chaque
regroupement par écrit pour pallier l'absence d'un vrai regard extérieur. Un atelier FigJam
avec une vraie deuxième personne permet un tri par cartes RÉEL : les regroupements émergent
d'un point de vue qui n'est pas celui de l'auteur du produit, révélant des ambiguïtés que
l'auteur seul, trop familier avec sa propre structure mentale, ne voit plus.

### 2.4 Le processus en deux temps, obligatoire

Un atelier FigJam réussi produit, à la fin, un tas de post-its en vrac — c'est un résultat
BRUT, pas un livrable. Le processus complet exige une seconde étape explicite :

1. **Collecte** (l'atelier lui-même) : post-its, regroupements informels pendant la session,
   votes éventuels — l'objectif est le volume et la diversité des idées, pas la clarté finale.
2. **Traduction** (après l'atelier, par le facilitateur) : transformer ce résultat brut en
   une structure actionnable — un sitemap (pont A03), un wireframe (pont A04), une liste de
   priorités tranchée.

Sauter l'étape 2 est le piège central de ce module : un atelier qui reste à l'état de
post-its devient un exercice social sympathique sans aucune suite concrète pour le produit.

## 3. Worked examples

### Exemple A — atelier de discovery avec Elda, traduit en wireframe

Sujet : un écran TribuZen pas encore designé (ex. une vue "historique des routines" sur
plusieurs semaines).

1. Ouvrir un fichier FigJam, poser la question ouverte en haut ("qu'est-ce qu'on voudrait
   voir/savoir sur l'historique des routines ?").
2. Demander à Elda (ou un pair réel) d'écrire librement des post-its pendant 10-15 minutes,
   sans jugement ni tri pendant cette phase — le volume prime sur la clarté.
3. Une fois la collecte terminée, regrouper les post-its ensemble à voix haute (equivalent
   d'un tri par cartes réel, cf. 2.3) — noter les regroupements qui émergent du point de vue
   d'Elda, potentiellement différents de ceux que Sylvain aurait faits seul.
4. Après l'atelier (phase de traduction, 2.4) : transformer les groupes de post-its en un
   wireframe basse fidélité (pont module A04) qui répond explicitement aux idées les plus
   représentées, pas à la préférence personnelle du facilitateur.

### Exemple B — critique collective d'une maquette existante via FigJam

1. Partager une maquette existante (ex. nahual.fr) en lecture dans un fichier FigJam avec une
   zone de post-its à côté.
2. Demander à un pair de poser, en post-its, des critiques structurées selon le format du
   module A10 (objectif/contrainte/décision, jamais "j'aime pas").
3. Regrouper les critiques par thème (ex. toutes celles sur la navigation ensemble, toutes
   celles sur la lisibilité ensemble) — traduire en un plan de révision priorisé (pont A10).

## 4. Pièges & misconceptions

- **Laisser le résultat d'un atelier FigJam à l'état de post-its sans traduction.** Voir 2.4
  — c'est le piège central, l'atelier devient un exercice social sans suite concrète pour le
  produit.

- **Essayer de "designer proprement" pendant la phase de collecte.** Ça bride la génération
  d'idées — la structuration vient APRÈS, jamais pendant (même logique que le thumbnailing du
  module B07 : volume avant qualité).

- **Confondre un commentaire épinglé Figma et un fil de discussion externe (Slack, email).**
  Le commentaire épinglé reste visible exactement là où il s'applique — un commentaire
  externe oblige à chercher le contexte, ce qui dilue la collaboration.

- **Faire un atelier seul en se disant "FigJam quand même" sans vraie deuxième personne.**
  Ce module exige explicitement un tri par cartes RÉEL (2.3) — l'approximation seule a déjà
  été pratiquée en A03, ne pas la répéter ici sous un autre nom.

## 5. Ancrage TribuZen

- La vue "historique des routines" (ou tout autre écran traité par l'Exemple A) devient un
  nouveau candidat de wireframe à intégrer au sitemap du module A03.
- Le format de traduction post-its → wireframe (2.4) devient réutilisable pour tout futur
  atelier, y compris ceux prévus plus tard autour du capstone console GPU.
- Le réflexe "collecte puis traduction, jamais l'un sans l'autre" prépare directement à toute
  collaboration future en mission réelle (ex. un atelier avec une équipe produit chez un futur
  employeur type Kerion), où le même piège (post-its jamais traduits) coûte cher en réunion.

## 6. Points clés

1. Les commentaires épinglés gardent la discussion exactement là où elle s'applique,
   contrairement à un fil externe qui dilue le contexte.
2. FigJam (atelier, génération d'idées en vrac) et Figma design (production précise) sont
   deux usages distincts — confondre les deux bride l'un ou saute l'autre.
3. Un atelier avec une vraie deuxième personne permet un tri par cartes réel, révélant des
   angles morts invisibles à l'auteur seul du produit.
4. Le processus a deux temps obligatoires : collecte (volume, pas de tri) puis traduction
   (structure actionnable) — sauter le second transforme l'atelier en exercice sans suite.
5. La structuration doit venir APRÈS la collecte, jamais pendant, pour ne pas brider la
   génération d'idées.

## 7. Seeds Anki

```
Quelle est la différence d'usage entre FigJam et un fichier de design Figma ?|FigJam sert aux ateliers (génération d'idées en vrac, post-its, votes) ; le fichier de design produit un livrable de conception précis (composants, maquettes)
Pourquoi un commentaire épinglé Figma est-il préférable à un fil de discussion externe ?|Il reste visible exactement sur l'élément concerné pour tous les collaborateurs, contrairement à un commentaire externe qui oblige à chercher le contexte
Quel est le piège central de ce module concernant le résultat d'un atelier FigJam ?|Laisser le résultat à l'état de post-its bruts sans le traduire en structure actionnable — l'atelier devient alors un exercice social sans suite concrète
Quelles sont les deux phases obligatoires d'un atelier FigJam bien mené ?|Collecte (volume d'idées, pas de tri pendant cette phase) puis traduction (transformer le résultat brut en structure exploitable, ex. wireframe)
Pourquoi un tri par cartes réel avec un pair révèle-t-il des choses qu'un tri simulé seul ne révèle pas ?|Les regroupements émergent d'un point de vue différent de celui de l'auteur, qui est souvent trop familier avec sa propre structure mentale pour en voir les ambiguïtés
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c09-collaboration-figjam/`. Tu y organises un vrai
> atelier FigJam avec un pair réel, produis au moins 15 post-its, puis traduis explicitement
> ce résultat en wireframe — brief complet et rubrique de vérification dans le README du lab.
