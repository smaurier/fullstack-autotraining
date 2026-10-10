---
titre: Design Ops — nommage, versioning, handoff dev propre
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [convention de nommage de fichiers/frames, versioning natif vs copies manuelles, dossier de handoff complet, specs dimensionnelles et tokens nommés, tous les états d'un composant]
outcomes: [nommer fichiers et frames selon une convention de statut explicite, utiliser le versioning natif d'un outil plutôt que des copies manuelles, produire un dossier de handoff qu'un développeur peut coder sans poser de question]
prerequis: [a10-design-critique]
next: a12-etude-de-cas-ecrite
tribuzen: dossier de handoff complet d'un composant TribuZen, testé en se mettant soi-même en rôle développeur
last-reviewed: 2026-10
---

# Design Ops — nommage, versioning, handoff dev propre

> **Outcomes — tu sauras FAIRE :** nommer fichiers et frames selon une convention de statut
> explicite, utiliser le versioning natif d'un outil plutôt que des copies manuelles qui
> cassent la traçabilité, et produire un dossier de handoff complet qu'un développeur peut
> coder sans revenir poser de question.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un fichier Figma TribuZen s'appelle "Routines v2 FINAL (2)". Impossible de savoir, sans
l'ouvrir, s'il s'agit vraiment de la version actuelle, ni ce qui distingue cette copie de la
précédente, ni si quelqu'un travaille encore sur une autre branche de ce même fichier. Et
quand Sylvain lui-même, une semaine plus tard, doit coder le composant `RoutineCard` depuis
ce fichier, il découvre un calque nommé "Rectangle 47" sans aucune indication de token de
couleur, de padding exact, ni de ce qui se passe à l'état "hover".

Ce n'est pas un problème d'outil : Figma offre un historique de versions natif et un Dev Mode
pensé exactement pour éviter ça. Le problème est une discipline absente — celle que ce module
construit, parce qu'un livrable de design qui n'est pas nommé, versionné et handoffé
proprement n'est, en pratique, pas terminé : il reste entièrement dans la tête de la personne
qui l'a produit.

## 2. Théorie complète, concise

### 2.1 Nommage de fichiers et de frames — un statut explicite, jamais un suffixe ambigu

La règle est simple : le nom d'un fichier ou d'une frame doit porter son STATUT de façon non
ambiguë, pas un numéro de version informel. Convention recommandée : préfixer par l'état —
`[Draft]`, `[Review]`, `[Final]` — plutôt que des suffixes comme "v2", "finalV3",
"FINAL (2)" qui n'indiquent jamais lequel des fichiers portant ce nom est réellement à jour.

Un nom de frame suit la même logique à l'intérieur d'un fichier : `RoutineCard — Default`,
`RoutineCard — Hover`, `RoutineCard — Disabled` plutôt que "Frame 12", "Frame 13" qui ne
disent rien du contenu sans ouvrir chaque frame une à une.

### 2.2 Versioning natif vs copies manuelles — pourquoi le second casse la traçabilité

Figma (comme la plupart des outils de design modernes) conserve un historique de versions
natif : chaque sauvegarde significative peut être nommée et restaurée sans dupliquer le
fichier. Créer à la place une copie manuelle ("Routines v2.fig", "Routines v3.fig") produit
plusieurs fichiers physiquement distincts qui peuvent diverger silencieusement — si une
correction est faite sur la copie v2 alors que quelqu'un travaille déjà sur v3, l'information
se perd, et il n'existe aucun moyen fiable de savoir laquelle des deux contient la vérité.

Le réflexe correct : UN fichier de travail, versionné nativement avec des noms de version
explicites ("Avant retour client du 10/10"), jamais une collection de copies parallèles.

### 2.3 Handoff dev complet — ce qu'un développeur doit pouvoir lire SANS poser de question

Un handoff n'est pas un lien Figma envoyé seul. Il doit contenir, systématiquement :
- les **specs dimensionnelles** (tailles, espacements, exprimés en valeurs exactes, pas
  "à peu près"),
- les **tokens nommés** utilisés (couleur `color-accent`, pas `#C65D3B` brut — un hexadécimal
  sans nom force le développeur à deviner s'il s'agit d'une valeur volontaire ou d'un oubli),
- **tous les états** du composant (défaut, hover, focus, disabled, erreur — pas seulement
  l'état par défaut, qui est souvent le seul maquetté en pratique),
- des **annotations** qui expliquent les comportements non visibles sur une capture statique
  (ex. "ce bouton se désactive tant que le formulaire n'est pas valide").

Un fichier Figma propre et un Dev Mode bien préparé (module C05, à venir côté outil) sont des
conditions nécessaires mais pas suffisantes : le handoff est la DISCIPLINE qui garantit que
rien n'est oublié, l'outil n'est que le support.

### 2.4 Le test ultime d'un bon handoff

Un handoff est complet si la personne qui le reçoit peut coder le composant SANS revenir
demander une précision au designer. C'est un critère binaire et vérifiable : soit une
question surgit en cours de développement, soit non. Si une question surgit, le handoff était
incomplet — pas le développeur insuffisamment compétent.

## 3. Worked examples

### Exemple A — nommer et versionner un fichier TribuZen correctement

Fichier initial : "Routines v2 FINAL (2).fig"

1. Renommer en `[Review] Routines — flow matin/soir` — le statut ("en revue") remplace le
   numéro de version ambigu.
2. Utiliser l'historique de versions natif de Figma pour nommer un point de sauvegarde
   significatif : "Avant retour client du 10/10" plutôt que de dupliquer le fichier.
3. Une fois validé : renommer en `[Final] Routines — flow matin/soir` — le changement de
   statut EST l'information de version, pas un nouveau fichier.

### Exemple B — produire le handoff complet d'un composant `RoutineCard`

1. Lister tous les états du composant : défaut, hover, routine complétée (coché), routine en
   retard (alerte visuelle).
2. Documenter chaque état avec ses tokens nommés (couleur de fond, couleur de texte, espacement
   interne) — jamais de valeur hexadécimale brute sans nom.
3. Annoter les comportements non visibles : "l'état 'en retard' apparaît automatiquement après
   l'heure prévue de la routine, pas sur une action de l'utilisateur."
4. Test : se mettre soi-même en rôle "développeur" une heure plus tard, ouvrir seulement le
   dossier de handoff (pas le fichier Figma source), et vérifier qu'aucune question ne surgit.

## 4. Pièges & misconceptions

- **Un lien Figma envoyé seul, sans contexte.** Le développeur doit alors deviner la logique,
  les tokens, les états manquants — ce n'est pas un handoff, c'est un pari sur sa capacité à
  improviser correctement.

- **Confondre "le fichier est propre" et "le handoff est complet".** Un fichier Figma bien
  organisé (frames nommées, auto-layout) est une bonne base, mais sans documentation explicite
  des tokens et des états, il reste un fichier de design, pas un handoff.

- **Documenter seulement l'état par défaut d'un composant.** La plupart des bugs d'intégration
  viennent des états oubliés (hover, disabled, erreur) jamais maquettés ni documentés.

- **Multiplier les copies de fichiers "au cas où".** Chaque copie non versionnée nativement
  est une source potentielle de divergence silencieuse — le versioning natif existe
  précisément pour éviter ce risque.

## 5. Ancrage TribuZen

- Toute la bibliothèque de composants TribuZen (module C06, à venir côté outil) bénéficie
  directement de cette convention de nommage par statut, plutôt que des copies au hasard.
- Le dossier de handoff produit dans ce module devient le document de référence que Sylvain,
  en rôle développeur, consulte pour coder réellement le composant — pas le fichier Figma
  source qu'il devrait rouvrir et réinterpréter.
- Cette discipline prépare directement l'étude de cas du module suivant (A12) : un process
  documenté proprement se raconte beaucoup plus facilement qu'un process resté dans la tête.

## 6. Points clés

1. Un nom de fichier ou de frame doit porter son statut de façon explicite (Draft/Review/
   Final), jamais un numéro de version informel ambigu.
2. Le versioning natif d'un outil de design remplace les copies manuelles, qui créent un
   risque réel de divergence silencieuse entre plusieurs fichiers.
3. Un handoff complet documente les specs dimensionnelles exactes, les tokens nommés
   (jamais de hex brut), TOUS les états d'un composant, et les comportements non visibles.
4. Le test d'un bon handoff est binaire : si une question surgit en développement, le
   handoff était incomplet, indépendamment de la compétence du développeur.

## 7. Seeds Anki

```
Quelle convention de nommage de fichier remplace un numéro de version informel ?|Un préfixe de statut explicite ([Draft], [Review], [Final]) plutôt que des suffixes comme "v2" ou "FINAL (2)" qui n'indiquent jamais lequel des fichiers est réellement à jour
Pourquoi les copies manuelles de fichiers sont-elles risquées par rapport au versioning natif ?|Elles peuvent diverger silencieusement : une correction faite sur une copie peut être ignorée si quelqu'un travaille déjà sur une autre, sans moyen fiable de savoir laquelle contient la vérité
Pourquoi un handoff doit-il utiliser des tokens nommés plutôt que des valeurs hexadécimales brutes ?|Un hex brut sans nom force le développeur à deviner si c'est une valeur volontaire ou un oubli ; un token nommé porte l'intention explicitement
Quel est le test ultime pour savoir si un handoff est complet ?|Si la personne qui le reçoit peut coder le composant sans jamais revenir poser de question — un critère binaire, pas une impression de qualité
Quelle erreur de handoff est la plus fréquente concernant les états d'un composant ?|Documenter seulement l'état par défaut, en oubliant hover, disabled, focus, erreur — la plupart des bugs d'intégration viennent de ces états oubliés
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a11-design-ops-handoff/`. Tu y produis le dossier de
> handoff complet d'un composant TribuZen et testes toi-même, en rôle développeur, s'il est
> réellement suffisant — brief complet et rubrique de vérification dans le README du lab.
