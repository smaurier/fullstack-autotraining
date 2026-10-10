---
titre: Choisir Lottie, Rive ou CSS/Framer Motion natif
cours: 24-design-craft
bloc: E — Motion design (After Effects/Lottie + Rive)
notions: [Lottie pour l'animation de marque linéaire, Rive pour l'interactivité pilotée par état, CSS/Framer Motion natif pour une transition simple, règle du plus simple outil qui suffit, Framer Motion la librairie React vs Framer l'outil de design]
outcomes: [analyser un besoin d'animation selon ses contraintes réelles avant de choisir un outil, appliquer la règle du plus simple outil qui suffit plutôt que l'outil le plus récemment appris, distinguer explicitement Framer Motion (librairie React du cours 06) de Framer (outil de design du Bloc D)]
prerequis: [e04-rive-state-machines]
next: e06-performance-a11y-mouvement
tribuzen: comparer sur un même bouton d'action du capstone les 3 implémentations possibles et trancher par écrit laquelle gagne
last-reviewed: 2026-10
---

# Choisir Lottie, Rive ou CSS/Framer Motion natif

> **Outcomes — tu sauras FAIRE :** analyser un besoin d'animation selon ses contraintes
> réelles avant de choisir un outil, appliquer la règle du plus simple outil qui suffit
> plutôt que l'outil le plus récemment appris ou le plus impressionnant, et distinguer sans
> confusion Framer Motion (la librairie d'animation React déjà pratiquée au cours 06) de
> Framer (l'outil de design du Bloc D de ce cours).
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Après E03 (Lottie) et E04 (Rive), le risque naturel est d'appliquer le dernier outil appris
à chaque nouveau besoin d'animation — exactement le même biais que choisir un framework
backend parce qu'on vient de l'apprendre, pas parce qu'il convient au problème. Un bouton
du capstone qui a juste besoin de changer légèrement d'apparence au clic ne justifie ni
Lottie ni Rive : un simple hover/transition natif suffit, et en ajouter plus serait de la
complexité non justifiée. Ce module pose la règle de décision qui évite ce biais.

## 2. Théorie complète, concise

### 2.1 Lottie — animation de marque, linéaire, sans interactivité fine

Bon choix quand le besoin est une animation de MARQUE qui rejoue une séquence fixe,
identique à chaque déclenchement : hero animé d'un site vitrine, illustration d'onboarding,
état de succès générique. Pas de réaction à un état d'application continu — juste "joue
cette séquence". Léger à intégrer (module E03), mais structurellement incapable de réagir
à un vrai état d'app en continu (module E04, §2.4).

### 2.2 Rive — interactivité pilotée par un état réel

Bon choix quand l'animation doit réagir à un VRAI état d'application qui change en continu
ou de façon événementielle (module E04) : une state machine avec des transitions pilotées
par des inputs réels. Nécessite plus de setup (construire le graphe, définir les inputs)
qu'une animation Lottie simple — un coût justifié seulement quand l'interactivité réelle en
a besoin.

### 2.3 CSS natif / Framer Motion — le plus simple, pour une transition basique

**Framer Motion** est la librairie d'animation React déjà pratiquée au cours 06
(`21-design-system/`) — **à ne jamais confondre** avec Framer, l'outil de design et de
publication vu au Bloc D de CE cours. Même nom, deux produits complètement différents d'une
même entreprise : l'un est une librairie de code pour React, l'autre un éditeur visuel
no-code. Pour une transition simple (hover, fade, slide, changement d'état visuel au clic),
une simple transition CSS ou un appel Framer Motion suffit — sans justifier l'intégration
d'un outil externe supplémentaire (Lottie ou Rive) pour un besoin que 2-3 lignes de code
auraient couvert.

### 2.4 La règle de décision : le plus simple qui suffit, jamais le plus impressionnant

Face à un nouveau besoin d'animation, l'ordre de questionnement correct n'est jamais "quel
outil ai-je le plus récemment appris" mais, dans cet ordre :
1. Un simple CSS/Framer Motion natif suffit-il (transition basique, pas d'état complexe) ?
   Si oui, s'arrêter là.
2. Sinon, le besoin est-il une animation de marque SANS interactivité réelle fine (séquence
   fixe) ? Lottie.
3. Sinon, le besoin réagit-il à un vrai état d'application en continu ou événementiel ?
   Rive.

Un bouton avec juste un effet de survol ne justifie JAMAIS Rive — c'est le test le plus
simple pour détecter un choix fait par réflexe plutôt que par analyse réelle du besoin.

## 3. Worked examples

### Exemple A — un bouton d'action du capstone avec état de chargement

Besoin : le bouton "Lancer le job GPU" doit afficher un état de chargement pendant
l'exécution, puis revenir à son état normal ou afficher une erreur.

1. Analyse CSS/Framer Motion : couvre un simple changement visuel (opacité réduite, icône
   de spinner CSS basique) mais ne gère pas élégamment un ENCHAÎNEMENT d'états avec
   transitions nommées (idle → loading → succès/erreur).
2. Analyse Lottie : pourrait animer un spinner joli, mais ne réagit pas nativement à l'état
   réel de la requête — il faudrait quand même du code pour déclencher/arrêter la lecture,
   et aucune transition fluide entre les 3 états n'existe nativement.
3. Analyse Rive : state machine déjà construite au lab E04 pour exactement ce scénario
   (idle/loading/erreur/succès) — c'est le candidat qui correspond le mieux à un
   enchaînement d'états réel avec transitions pensées.
4. Décision argumentée : Rive gagne ici parce que le besoin est précisément un enchaînement
   d'états réels, pas une simple transition visuelle isolée.

### Exemple B — le piège inverse : un hover de carte qui ne justifie rien de plus que CSS

Besoin : une carte de la landing page doit légèrement s'élever (ombre plus marquée) au
survol de la souris.

1. Analyse : c'est une transition basique entre deux états visuels statiques (normal,
   survolé), sans état d'application à piloter.
2. Décision : CSS natif (ou Framer Motion si déjà dans un contexte React) — ni Lottie ni
   Rive n'apportent quoi que ce soit ici, leur setup serait une complexité pure sans
   bénéfice.

## 4. Pièges & misconceptions

- **Confondre Framer Motion (librairie React, cours 06) et Framer (outil de design, Bloc D
  de ce cours).** Même nom commercial, produits et usages totalement différents — toujours
  préciser lequel est visé dans une conversation ou une documentation technique.

- **Choisir l'outil le plus récemment appris par réflexe plutôt que par analyse du besoin.**
  Voir Exemple B — un besoin de transition basique ne devient pas plus légitime pour Rive
  parce que Rive vient d'être appris au module précédent.

- **Croire qu'un outil est "meilleur" dans l'absolu.** Les 3 options ne sont pas hiérarchisées
  par qualité mais par adéquation au besoin — Rive n'est pas "supérieur" à CSS natif, il est
  adapté à un besoin différent (voir 2.4, l'ordre de questionnement pose d'abord le cas le
  plus simple, pas le plus avancé).

## 5. Ancrage TribuZen

- Le bouton "Lancer le job GPU" du capstone (Exemple A) justifie Rive par la réalité du
  besoin (enchaînement d'états réel), pas par préférence.
- Toute transition de survol ou de clic simple sur TribuZen ou la landing page du Bloc D
  doit d'abord être testée comme un besoin CSS/Framer Motion natif avant d'envisager un
  outil externe — même discipline que le piège de sur-ingénierie du module D06.

## 6. Points clés

1. Lottie convient à une animation de marque linéaire sans interactivité fine ; Rive
   convient à une interactivité pilotée par un vrai état d'application ; CSS/Framer Motion
   natif convient à une transition basique.
2. Framer Motion (librairie React, cours 06) et Framer (outil de design, Bloc D) sont deux
   produits distincts malgré le nom partagé — ne jamais les confondre.
3. La règle de décision suit un ordre fixe : vérifier d'abord si CSS/Framer Motion natif
   suffit, avant d'envisager Lottie, avant d'envisager Rive.
4. Un besoin de transition basique (hover simple) ne justifie jamais Rive ni Lottie — c'est
   le test le plus rapide pour détecter un choix fait par réflexe.
5. Les 3 outils ne sont pas hiérarchisés par qualité générale mais par adéquation au besoin
   réel analysé.

## 7. Seeds Anki

```
Quand Lottie est-il le bon choix ?|Pour une animation de marque linéaire sans besoin d'interactivité fine réagissant à un état d'app (hero, illustration d'onboarding, état de succès générique)
Quand Rive est-il le bon choix ?|Quand l'animation doit réagir à un vrai état d'application en continu ou événementiel via une state machine pilotée par des inputs réels
Quelle est la différence entre Framer Motion et Framer ?|Framer Motion est la librairie d'animation React (cours 06) ; Framer est l'outil de design et publication no-code (Bloc D) — même nom commercial, produits totalement différents
Quelle est la règle de décision entre les 3 outils de motion ?|Vérifier d'abord si CSS/Framer Motion natif suffit ; sinon envisager Lottie pour une séquence de marque fixe ; sinon Rive pour une interactivité pilotée par état
Pourquoi un simple hover de bouton ne justifie-t-il jamais Rive ?|C'est une transition basique entre deux états visuels statiques sans état d'application réel à piloter — CSS natif suffit, ajouter Rive serait une complexité sans bénéfice
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/e05-choix-outil-motion/`. Tu y compares les 3
> implémentations possibles sur un même bouton d'action du capstone et tranches par écrit
> laquelle gagne — brief complet et rubrique de vérification dans le README du lab.
