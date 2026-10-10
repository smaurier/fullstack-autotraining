---
titre: Rive — state machines, inputs, blend states
cours: 24-design-craft
bloc: E — Motion design (After Effects/Lottie + Rive)
notions: [state machine Rive, input booléen/nombre/trigger, blend state continu, différence architecturale avec Lottie, animation pilotée par un vrai état d'app]
outcomes: [construire une state machine Rive à plusieurs états connectés par des transitions, piloter une transition par un input testé plutôt que par une prévisualisation statique, distinguer une animation pilotée par état d'une animation qui rejoue un timeline fixe]
prerequis: [e03-pipeline-lottie]
next: e05-choix-outil-motion
tribuzen: micro-interaction Rive pilotée par l'état réel du pilotage GPU du capstone (idle/loading/erreur/succès) comme une seule state machine
last-reviewed: 2026-10
---

# Rive — state machines, inputs, blend states

> **Outcomes — tu sauras FAIRE :** construire une state machine Rive à plusieurs états
> connectés par des transitions, piloter une transition par un input réellement testé
> plutôt qu'une prévisualisation statique isolée, et distinguer une animation pilotée par
> un état d'application d'une animation qui rejoue simplement un timeline fixe.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le capstone "console SaaS GPU" a besoin d'un indicateur visuel de statut de pilotage :
idle, loading, erreur, succès. Le réflexe issu du module précédent (Lottie) serait de
construire 4 animations séparées et de les basculer en code selon l'état applicatif réel.
Ça fonctionnerait visuellement, mais ce serait l'outil fondamentalement inadapté au besoin :
les 4 "fichiers" n'ont aucune relation entre eux, aucune transition fluide n'existe entre
loading et succès, et chaque nouvel état futur (ex. un état "en pause") obligerait à
reconstruire une cinquième animation isolée. Rive résout ce problème par construction : un
seul graphe, où CHAQUE état existe en relation avec les autres.

## 2. Théorie complète, concise

### 2.1 State machine — le concept central de Rive

Une **state machine** est un graphe d'états (idle, loading, erreur, succès) reliés par des
**transitions**. Contrairement à une simple liste d'animations indépendantes, chaque
transition est une relation EXPLICITE et ANIMÉE entre deux états précis — passer de "idle"
à "loading" peut avoir une transition visuelle différente de celle entre "loading" et
"erreur", pensée spécifiquement pour ce passage.

### 2.2 Inputs — ce qui pilote le graphe depuis l'application réelle

Un **input** est une valeur envoyée depuis le code de l'application hôte vers la state
machine Rive, qui détermine quelle transition se déclenche. Trois types principaux :
**booléen** (vrai/faux, ex. "chargement en cours"), **nombre** (une valeur continue, ex. un
pourcentage de progression réelle), **trigger** (un événement ponctuel sans état persistant,
ex. "une erreur vient de se produire"). C'est la différence fondamentale avec Lottie
(module E03) : Lottie rejoue un timeline PRÉ-CALCULÉ à l'avance ; Rive réagit à un VRAI
état envoyé en temps réel par l'application.

### 2.3 Blend states — la transition continue pilotée par un nombre

Un **blend state** permet à l'animation de varier de façon continue selon la valeur d'un
input numérique, plutôt que de basculer brutalement entre deux animations discrètes. Pour
une barre de progression réelle (ex. "pourcentage de VRAM utilisée par un job GPU"),
l'animation suit en continu la valeur reçue — à 23%, 24%, 25%, l'interpolation se fait
automatiquement dans le graphe, sans avoir à créer une animation séparée pour chaque palier.

### 2.4 Rive vs Lottie — une différence d'architecture, pas de qualité visuelle

Le point à ne jamais confondre : Lottie et Rive ne sont pas deux outils de qualité
différente, l'un "plus simple" et l'autre "plus avancé" en général — ce sont deux
architectures différentes pour deux besoins différents (approfondi au module E05). Une
animation de marque purement décorative n'a besoin d'aucun input ni state machine ; une
micro-interaction qui doit refléter un vrai état d'application a structurellement besoin de
ce que Lottie ne fournit pas.

## 3. Worked examples

### Exemple A — construire la state machine idle/loading/erreur/succès du capstone

1. Créer 4 artboards/états dans Rive, chacun avec sa propre animation visuelle (idle
   discret, loading avec rotation continue, erreur avec une secousse brève, succès avec
   une coche qui apparaît).
2. Créer un input booléen `isLoading` et un input trigger `onError` et `onSuccess`.
3. Construire les transitions : idle → loading (déclenchée par `isLoading` = vrai), loading
   → succès (déclenchée par `onSuccess`), loading → erreur (déclenchée par `onError`),
   erreur/succès → idle après un délai (transition automatique).
4. Dans l'outil de prévisualisation Rive (pas seulement en statique), déclencher manuellement
   chaque input dans l'ordre réel d'un scénario (idle → loading → succès) et vérifier que
   les transitions s'enchaînent sans saut visuel brutal non voulu.

### Exemple B — un blend state pour une barre de consommation GPU réelle

1. Créer un input numérique `vramPercent` (0 à 100).
2. Lier ce nombre à une animation de remplissage de barre en blend state continu plutôt
   qu'à des paliers discrets (0%, 25%, 50%...).
3. Tester en faisant varier manuellement `vramPercent` de 0 à 100 dans la prévisualisation :
   le remplissage doit suivre fluidement, sans à-coup entre deux valeurs proches (23 puis
   24), preuve que le blend est continu et pas une suite d'étapes figées.

## 4. Pièges & misconceptions

- **Construire 4 animations séparées plutôt qu'une state machine unique.** Voir le cas
  concret — perd toute relation entre les états, complique l'ajout d'un futur état, et
  rend impossible une transition visuelle fluide entre deux états adjacents.

- **Vérifier une state machine uniquement en prévisualisation statique de chaque état
  isolément.** Un état peut paraître correct seul et pourtant produire une transition
  cassée ou un saut brutal une fois réellement enchaîné — toujours tester le SCÉNARIO
  complet (Exemple A, étape 4), pas chaque état en isolation.

- **Utiliser des paliers discrets pour une valeur qui varie en continu.** Voir Exemple B —
  une barre de consommation réelle doit utiliser un blend state continu, pas 5 animations
  figées à 0/25/50/75/100% qui produiraient des sauts visibles entre les paliers.

- **Confondre Rive et Lottie par leur rendu visuel final.** Les deux peuvent produire un
  résultat visuel similaire à l'écran pour un cas simple — la différence n'est jamais
  visible à l'œil sur un rendu statique, elle est dans l'architecture (piloté par état vs
  timeline pré-calculé), approfondie au module E05.

## 5. Ancrage TribuZen

- L'indicateur de statut du flow de pilotage GPU du capstone (idle/loading/erreur/succès)
  se construit comme UNE state machine Rive avec des inputs réels, jamais comme 4 fichiers
  d'animation séparés basculés en code.
- Toute future barre de consommation ou de progression réelle de TribuZen (ex. progression
  d'une routine en cours) est un candidat direct pour un blend state plutôt qu'une animation
  Lottie à paliers.

## 6. Points clés

1. Une state machine Rive est un graphe d'états reliés par des transitions explicites —
   pas une liste d'animations indépendantes.
2. Un input (booléen, nombre, trigger) est une valeur envoyée depuis l'application réelle
   qui pilote quelle transition se déclenche — c'est la différence architecturale avec
   Lottie, qui rejoue un timeline pré-calculé.
3. Un blend state permet une transition continue pilotée par une valeur numérique réelle,
   sans créer une animation séparée par palier.
4. Vérifier une state machine exige de tester le scénario complet enchaîné, pas chaque état
   isolément en prévisualisation statique.
5. Rive et Lottie ne se distinguent pas par la qualité visuelle mais par l'architecture :
   piloté par un vrai état d'app (Rive) vs timeline pré-calculé (Lottie).

## 7. Seeds Anki

```
Qu'est-ce qu'une state machine dans Rive ?|Un graphe d'états reliés par des transitions explicites et animées, piloté par des inputs envoyés depuis l'application réelle
Quels sont les trois types d'inputs Rive ?|Booléen (vrai/faux), nombre (valeur continue), trigger (événement ponctuel sans état persistant)
Qu'est-ce qu'un blend state et quand l'utiliser ?|Une transition continue pilotée par un input numérique — utile pour une valeur qui varie en continu (ex. pourcentage réel), évite les sauts visibles entre paliers discrets
Quelle est la différence architecturale entre Rive et Lottie ?|Rive réagit en temps réel à de vrais inputs d'application via une state machine ; Lottie rejoue un timeline pré-calculé à l'avance, sans réaction à un état d'app
Pourquoi tester chaque état d'une state machine isolément ne suffit-il pas ?|Un état peut paraître correct seul et pourtant produire une transition cassée une fois enchaîné dans un vrai scénario — il faut tester le scénario complet
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/e04-rive-state-machines/`. Tu y construis la state
> machine idle/loading/erreur/succès du capstone avec ses transitions pilotées par de vrais
> inputs testés — brief complet et rubrique de vérification dans le README du lab.
