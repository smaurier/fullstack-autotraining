---
titre: Mouvement et micro-interactions — quand animer, pas comment
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [feedback d'état, orientation spatiale, attention sur un changement, prefers-reduced-motion, feedback vs distraction, pont vers le motion design]
outcomes: [justifier par écrit qu'une micro-interaction répond à une des 3 raisons légitimes d'animer, implémenter un fallback prefers-reduced-motion, distinguer un feedback utile d'une distraction qui retarde la tâche]
prerequis: [b09-hierarchie-visuelle]
next: b11-direction-artistique
tribuzen: micro-interaction justifiée ajoutée à un composant TribuZen existant, avec fallback prefers-reduced-motion
last-reviewed: 2026-10
---

# Mouvement et micro-interactions — quand animer, pas comment

> **Outcomes — tu sauras FAIRE :** justifier par écrit qu'une micro-interaction répond à une
> des 3 raisons légitimes d'animer avant de la produire, implémenter systématiquement un
> fallback `prefers-reduced-motion`, et distinguer un feedback qui aide réellement d'une
> distraction qui retarde la tâche en cours.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un bouton "Valider la routine" de TribuZen qui change instantanément d'état au clic (texte
qui disparaît, nouvel état qui apparaît sans transition) laisse un doute légitime : l'action
a-t-elle vraiment été prise en compte, ou l'app a-t-elle juste changé d'avis tout seule ? À
l'inverse, un bouton qui déclenche une animation de confettis de 3 secondes avant de confirmer
retarde une information que l'utilisateur veut IMMÉDIATEMENT (routine faite, point).

Les deux extrêmes ratent la question que ce module pose avant tout outil d'animation : QUAND
une interface doit-elle bouger, et pourquoi. Le Bloc E (After Effects, Lottie, Rive) apprendra
COMMENT produire ces animations une fois que ce module a réglé le QUAND.

## 2. Théorie complète, concise

### 2.1 Trois raisons légitimes d'animer, et une seule illégitime

- **Feedback d'état** : confirmer qu'une action a bien été prise en compte par le système
  (ex. une légère pulsation sur le bouton "Valider" au moment du clic, avant même que le
  nouvel état n'apparaisse) — répond directement à l'heuristique de Nielsen "visibilité de
  l'état du système" déjà vue en [[a05-heuristiques-ux]].
- **Orientation spatiale** : montrer d'où vient et où va un élément lors d'un changement
  d'écran ou d'état (ex. une carte qui s'agrandit en place plutôt que de disparaître pour
  faire apparaître un nouvel écran sans lien visuel) — aide à construire un modèle mental de
  "où suis-je maintenant" sans effort cognitif.
- **Attirer l'attention sur un changement important** : signaler qu'une donnée vient de
  changer sans action explicite de l'utilisateur (ex. une nouvelle alerte qui apparaît sur le
  `FamilyDashboard`) — à utiliser avec parcimonie, sinon l'effet s'use.
- **La seule raison illégitime : la décoration gratuite.** Une animation qui n'apporte aucune
  des trois informations ci-dessus est un coût (temps, poids de fichier, distraction) sans
  bénéfice. "C'est joli" n'est jamais, seul, une justification suffisante.

### 2.2 `prefers-reduced-motion` : non négociable, pas une option de confort

Les navigateurs modernes exposent la préférence système `prefers-reduced-motion` (activable
par l'utilisateur dans son système d'exploitation). Elle existe pour des raisons médicales
réelles — troubles vestibulaires, sensibilité qui peut provoquer nausée ou vertige face à un
mouvement non désiré à l'écran — pas pour le confort esthétique d'un utilisateur pressé.

Conséquence pratique : TOUTE micro-interaction animée doit avoir un équivalent statique
immédiat (le changement d'état se produit sans transition visuelle, mais l'information reste
identique) activé quand cette préférence est détectée. Ce n'est pas une dégradation
acceptable de l'expérience — pour l'utilisateur concerné, c'est la seule expérience
accessible.

### 2.3 Feedback utile vs distraction : le test du retard d'information

Une animation de feedback utile ne retarde jamais une information que l'utilisateur veut
immédiatement — elle l'ACCOMPAGNE. Une animation qui devient une distraction retarde cette
information pour le plaisir de l'effet (voir le cas des confettis de 3 secondes en 1).

Test pratique : chronométrer le temps entre l'action de l'utilisateur et le moment où
l'information finale (le nouvel état réel) est pleinement lisible. Si ce temps dépasse ce
qu'exige la seule animation de transition la plus courte possible pour l'objectif visé
(feedback/orientation/attention), l'animation a dérivé vers la distraction.

### 2.4 Pont explicite vers le Bloc E

Ce module répond à "faut-il animer, et pourquoi" avec des critères vérifiables. Le Bloc E
(douze principes de l'animation, After Effects, Lottie, Rive) répond à "comment produire
cette animation avec le bon outil et la bonne qualité d'exécution (timing, easing)" une fois
la décision de ce module prise. Décider d'animer sans savoir pourquoi, puis chercher
l'outil le plus impressionnant, inverse l'ordre logique — et produit exactement le genre de
décoration gratuite que 2.1 écarte.

## 3. Worked examples

### Exemple A — bouton "Valider la routine" de TribuZen

1. Raison légitime identifiée : feedback d'état (confirmer la prise en compte du clic).
2. Animation minimale suffisante : une légère variation de poids/opacité du bouton au clic
   (quelques centaines de millisecondes), suivie du changement d'état réel sans délai ajouté.
3. Fallback `prefers-reduced-motion` : le changement d'état s'applique instantanément, sans
   la variation intermédiaire — l'information finale (routine validée) est identique.
4. Vérification du test de retard (2.3) : le temps entre clic et état final lisible n'est pas
   plus long qu'avec la transition la plus courte possible pour le feedback visé.

### Exemple B — alerte qui apparaît sur le `FamilyDashboard`

1. Raison légitime : attirer l'attention sur un changement important survenu sans action
   explicite de l'utilisateur.
2. Risque identifié : si chaque petit changement du dashboard utilise la même animation
   d'attention, l'utilisateur apprend à l'ignorer (effet d'usure) — à réserver aux vraies
   priorités, cohérent avec la hiérarchie à point focal unique de [[b09-hierarchie-visuelle]].
3. Fallback : l'alerte apparaît immédiatement visible par sa hiérarchie statique (taille,
   poids, position) même sans l'animation d'entrée, pour les utilisateurs en mode réduit.

## 4. Pièges & misconceptions

- **Animer "pour faire moderne" sans raison identifiée.** Si aucune des 3 raisons légitimes
  ne s'applique clairement, la réponse par défaut est de NE PAS animer, pas de choisir la
  moins mauvaise justification a posteriori.

- **Traiter `prefers-reduced-motion` comme une optimisation facultative "à faire si le temps
  le permet".** C'est une condition d'accessibilité au même titre que le contraste WCAG —
  absente, l'interface est inutilisable pour une partie réelle des utilisateurs, pas juste
  moins agréable.

- **Confondre durée d'animation et qualité de feedback.** Une animation plus longue n'est pas
  un feedback plus fort — au-delà d'un seuil court, elle devient un retard perçu comme de la
  lenteur du système, pas comme une confirmation.

- **Réutiliser la même animation d'attention pour tout changement, important ou mineur.**
  L'usure de l'effet (voir Exemple B) rend l'animation inutile au moment où elle compterait
  vraiment.

## 5. Ancrage TribuZen

- Chaque composant TribuZen qui déclenche une action utilisateur (valider une routine, ajouter
  un enfant, publier la gazette) doit avoir sa raison d'animer (ou de ne pas animer) écrite
  explicitement, pas décidée à l'instinct en codant.
- Le fallback `prefers-reduced-motion` devient une case de la checklist de handoff ([[a11-design-ops-handoff]])
  pour tout composant animé livré au dev.
- Les cas qui nécessitent une vraie production d'animation (pas une simple transition CSS)
  sont transférés au Bloc E, avec la raison déjà validée par ce module.

## 6. Points clés

1. Trois raisons légitimes d'animer : feedback d'état, orientation spatiale, attirer
   l'attention sur un changement important — tout le reste est de la décoration gratuite.
2. `prefers-reduced-motion` exige un fallback statique systématique, pour une raison
   d'accessibilité réelle, pas un confort esthétique optionnel.
3. Une animation de feedback ne doit jamais retarder l'information finale au-delà du temps
   minimal nécessaire à la transition — au-delà, c'est une distraction.
4. Ce module décide QUAND animer ; le Bloc E (After Effects/Lottie/Rive) apprend COMMENT,
   une fois la décision prise, jamais avant.
5. Répéter la même animation d'attention pour tout changement use son effet au moment où il
   compterait le plus.

## 7. Seeds Anki

```
Quelles sont les trois raisons légitimes d'animer une interface ?|Feedback d'état, orientation spatiale, attirer l'attention sur un changement important
Pourquoi `prefers-reduced-motion` n'est-il pas une option de confort ?|Il répond à un besoin médical réel (troubles vestibulaires) — sans fallback statique, l'interface est inutilisable pour ces utilisateurs
Comment distinguer un feedback animé utile d'une distraction ?|Le feedback utile n'allonge pas le temps avant que l'information finale soit lisible au-delà du strict nécessaire ; la distraction retarde cette information pour l'effet
Pourquoi répéter la même animation d'attention sur chaque petit changement est un piège ?|L'utilisateur apprend à l'ignorer (usure de l'effet) et elle devient inefficace au moment d'une vraie priorité
Quelle est la relation entre ce module et le Bloc E (motion design) ?|Ce module décide QUAND animer (le motif légitime) ; le Bloc E apprend COMMENT produire l'animation avec le bon outil, une fois le QUAND tranché
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b10-mouvement-micro-interactions/`. Tu y ajoutes une
> micro-interaction justifiée à un composant TribuZen existant, avec son fallback
> `prefers-reduced-motion` — brief complet et rubrique de vérification dans le README du lab.
