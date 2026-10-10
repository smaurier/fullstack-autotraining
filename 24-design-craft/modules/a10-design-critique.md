---
titre: Design critique — donner et recevoir un retour structuré
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [critique vs opinion, grille objectif/contrainte/décision, feedback sandwich à éviter, question ouverte vs directive, recevoir une critique sans posture défensive, plan de révision argumenté]
outcomes: [structurer une critique de design autour du brief plutôt que du goût, poser des questions qui font réfléchir le designer plutôt que de lui dicter la solution, transformer une critique reçue en plan de révision argumenté sans réaction défensive]
prerequis: [a01-discovery]
next: a11-design-ops-handoff
tribuzen: critique structurée d'une maquette TribuZen existante ou d'un projet perso (nahual.fr, nuada-audit)
last-reviewed: 2026-10
---

# Design critique — donner et recevoir un retour structuré

> **Outcomes — tu sauras FAIRE :** structurer une critique de design autour du brief et
> des contraintes plutôt que du goût personnel, poser des questions qui font réfléchir
> l'auteur plutôt que de lui dicter une solution, et transformer une critique reçue en
> plan de révision argumenté sans réaction défensive.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un pair te montre sa maquette pour l'écran de pilotage GPU du capstone. Réaction
spontanée possible : "j'aime pas trop les couleurs, je trouve ça un peu froid." Cette
phrase est une opinion — elle ne dit rien d'actionnable, ne référence aucun brief, et met
l'auteur en position de devoir deviner ce qui ne va pas ou de défendre son choix sans
levier objectif pour trancher.

Une critique professionnelle ne porte jamais sur le goût — elle porte sur l'écart entre
ce qui a été produit et ce qui était demandé (le brief, les contraintes d'accessibilité,
les critères de succès définis en discovery). Ce module donne la structure pour donner
ce type de retour, et — tout aussi important — pour en recevoir un sans tomber dans la
défense réflexe qui empêche d'entendre ce qui est réellement dit.

## 2. Théorie complète, concise

### 2.1 Critique vs opinion — le test de l'actionnable

Une opinion ("j'aime pas", "c'est joli") ne peut pas être contestée ni appliquée — elle
dépend du goût de celui qui la formule. Une critique professionnelle référence toujours
un élément vérifiable : le brief (module A1), une heuristique nommée (module A5), un
critère d'accessibilité (module A6), ou un critère de succès défini en amont.

```
Opinion (non actionnable) : "Je trouve que ce bouton ne ressort pas assez."

Critique structurée (actionnable) : "Le brief demandait que l'action principale de
l'écran soit identifiable en moins de 3 secondes (critère de succès du module A1).
Ce bouton a le même poids visuel que les 4 actions secondaires autour — rien ne
indique visuellement qu'il est LA priorité de l'écran."
```

La seconde version pointe un écart précis entre le livrable et une exigence posée en
amont — l'auteur peut la discuter, la contester avec des arguments, ou l'accepter et
corriger, mais il ne subit pas une préférence invérifiable.

### 2.2 La grille objectif / contrainte / décision

Structure systématique pour mener une critique sans dériver vers le goût personnel :

1. **Objectif** : quel problème cet écran/composant devait-il résoudre (remonter au
   brief du module A1 si besoin) ?
2. **Contrainte** : quelles règles s'appliquaient (accessibilité, design system existant,
   contrainte technique connue) ?
3. **Décision** : qu'est-ce que la solution proposée a choisi de faire, et cette
   décision répond-elle à l'objectif dans les contraintes posées ?

Une critique qui suit cette grille reste ancrée sur des faits vérifiables plutôt que sur
une préférence, même quand elle est sévère.

### 2.3 Questions ouvertes plutôt que directives imposées

Une bonne critique interroge plutôt qu'elle ne dicte — l'auteur garde la responsabilité
de la solution, le critique l'aide à voir un angle mort qu'il n'a peut-être pas
considéré.

```
Directive imposée (retire l'auteur de la décision) :
"Mets le bouton en orange et agrandis-le de 20%."

Question ouverte (laisse l'auteur décider en connaissance de cause) :
"Comment un utilisateur saurait-il, en regardant cet écran 3 secondes, quelle est
l'action principale attendue ?"
```

La question ouverte n'impose pas de solution — elle met l'auteur face au problème
identifié et le laisse chercher sa propre réponse, ce qui construit sa compétence plutôt
que de la contourner.

### 2.4 Le piège du "feedback sandwich" — pourquoi l'éviter ici

Technique répandue consistant à encadrer une critique négative entre deux compliments
("C'est super, mais... et sinon c'est top"). Problème documenté : elle dilue le message
réel, l'auteur retient souvent les compliments et minimise la critique, ou au contraire
se méfie de tout compliment futur en anticipant une critique cachée derrière.
**Alternative recommandée dans ce cours** : séparer clairement ce qui fonctionne (nommé
sans l'enrober autour de la critique) de ce qui doit changer (nommé avec la grille 2.2),
sans les mélanger dans la même phrase.

### 2.5 Recevoir une critique sans posture défensive

Recevoir une critique professionnellement suit une séquence délibérée, pas une réaction
spontanée :

1. **Écouter jusqu'au bout** sans préparer sa défense pendant que l'autre parle encore.
2. **Reformuler ce qui a été compris** avant de réagir ("Si je comprends bien, le
   problème c'est que l'action principale ne ressort pas assez par rapport au brief —
   c'est ça ?") — ça vérifie qu'on a bien entendu, et ça ralentit la réaction
   défensive automatique.
3. **Distinguer un désaccord factuel d'un inconfort personnel.** Si la critique repose
   sur un fait vérifiable (le critère de succès n'est effectivement pas atteint), elle
   n'est pas négociable au niveau du constat — seule la solution à apporter reste
   ouverte. Si elle repose sur une préférence du critique non ancrée au brief, c'est
   légitime de le signaler et de demander la justification manquante.
4. **Produire un plan de révision écrit**, pas une réaction verbale immédiate — voir
   Exemple B.

## 3. Worked examples

### Exemple A — critique structurée avec la grille objectif/contrainte/décision

Maquette critiquée : écran de pilotage GPU du capstone, qui affiche 6 cartes GPU de
taille identique sans hiérarchie visuelle.

```
Objectif (brief module A1) : aider l'utilisateur à choisir rapidement le GPU adapté à
son budget et son besoin, sans qu'il ait à comparer manuellement 6 fiches identiques.

Contrainte : accessibilité — contraste minimum 4.5:1, zones tactiles 44px (module A6).

Décision observée : les 6 cartes GPU ont exactement le même poids visuel (même
taille, même couleur de bordure), aucune ne met en avant un GPU "recommandé" ou
"le plus populaire" qui réduirait la charge de décision.

Écart : l'objectif demandait une AIDE à la décision rapide ; la décision actuelle
reproduit la charge cognitive d'un tableau comparatif brut, sans hiérarchie qui
accélère le choix.

Question ouverte posée à l'auteur : "Si un utilisateur presse, sur quelle carte son
regard devrait-il se poser en premier, et qu'est-ce qui dans la maquette actuelle
produit ça ?"
```

### Exemple B — recevoir la critique de l'Exemple A et produire un plan de révision

```
PLAN DE RÉVISION — suite à la critique sur la hiérarchie des cartes GPU

Reformulation du problème reçu : les 6 cartes GPU n'ont pas de hiérarchie visuelle,
ce qui reproduit la charge de comparaison manuelle que le brief voulait réduire.

Accord/désaccord : accord sur le constat — en relisant mon propre brief (module A1),
je confirme que l'objectif était bien de réduire cette charge, et la maquette actuelle
ne le fait pas.

Actions prévues :
1. Identifier un critère objectif de mise en avant (GPU le plus utilisé par des
   profils similaires, ou meilleur rapport perf/prix) plutôt qu'un choix arbitraire.
2. Donner à cette carte un traitement visuel distinct (pas juste une couleur plus
   vive — un badge "Recommandé" textuel, pour rester accessible aux daltoniens,
   cohérent avec le module B2 théorie de la couleur).
3. Revérifier le contraste de ce nouveau badge contre le fond de carte (contrainte
   accessibilité toujours active).
```

Ce plan ne défend pas le choix initial — il accepte le constat vérifié, et transforme la
critique en actions précises plutôt qu'en une réaction d'accord vague ("ok je vais
regarder ça").

## 4. Pièges & misconceptions

- **Formuler une critique comme une préférence personnelle.** "J'aime pas" ne référence
  rien de vérifiable — l'auteur ne peut ni la contester ni l'appliquer de façon
  constructive. Toujours remonter à la grille objectif/contrainte/décision.

- **Donner des directives précises plutôt que des questions ouvertes.** Dicter la
  solution ("mets-le en orange") retire la responsabilité de la décision à l'auteur et
  ne construit aucune compétence — ni pour lui, ni pour la qualité de la prochaine
  maquette qu'il produira seul.

- **Utiliser le feedback sandwich par réflexe social.** Voir 2.4 — ça dilue le message
  et peut créer une méfiance généralisée envers les compliments futurs.

- **Préparer sa défense pendant que l'autre critique encore.** Ça empêche d'entendre
  réellement le point soulevé — toujours reformuler avant de réagir (2.5, étape 2).

- **Confondre un désaccord factuel et un inconfort personnel lors de la réception
  d'une critique.** Si le critère de succès n'est objectivement pas atteint, ce n'est
  pas négociable au niveau du constat — seule la solution reste à discuter. Le
  confondre avec "je n'ai pas envie d'entendre ça" empêche toute progression.

## 5. Ancrage TribuZen

Toute revue de maquette TribuZen (seul en auto-critique, ou avec un pair comme Elda)
passe par la grille objectif/contrainte/décision plutôt que par un jugement direct. Le
plan de révision (Exemple B) devient une pièce traçable du process — utile en
entretien pour montrer qu'on sait recevoir une critique sans la défendre
systématiquement, une des qualités explicitement citées dans l'offre Kerion
("exigeant sur le détail").

## 6. Points clés

1. Une critique professionnelle référence toujours un brief, une heuristique ou un
   critère vérifiable — jamais une préférence invérifiable.
2. La grille objectif/contrainte/décision structure une critique en restant ancrée sur
   des faits plutôt que sur le goût.
3. Une question ouverte laisse l'auteur responsable de la solution ; une directive
   imposée le retire de cette responsabilité.
4. Le feedback sandwich dilue le message réel — séparer clairement ce qui fonctionne de
   ce qui doit changer.
5. Recevoir une critique commence par une reformulation avant toute réaction, et se
   termine par un plan de révision écrit, pas une réponse verbale immédiate.

## 7. Seeds Anki

```
Quel est le test pour distinguer une opinion d'une critique professionnelle ?|L'actionnable : une critique référence un brief/une heuristique/un critère vérifiable ; une opinion ("j'aime pas") ne référence rien de contestable ou d'applicable
Que vérifie la grille objectif/contrainte/décision dans une critique ?|L'écart entre ce que la solution devait résoudre (objectif), les règles qui s'appliquaient (contrainte), et ce que la solution a effectivement choisi de faire (décision)
Pourquoi préférer une question ouverte à une directive imposée en critique ?|La question laisse l'auteur responsable de trouver sa propre solution et construit sa compétence ; la directive le retire de cette responsabilité
Quel est le problème du feedback sandwich ?|Il dilue le message réel — l'auteur retient souvent les compliments et minimise la critique, ou se méfie des compliments futurs
Quelle est la première étape pour recevoir une critique sans réaction défensive ?|Reformuler ce qui a été compris avant de réagir, pour vérifier qu'on a bien entendu et ralentir la réaction défensive automatique
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a10-design-critique/`. Tu y critiques
> structurellement une maquette existante (nahual.fr, nuada-audit, ou une maquette de
> pair) via la grille objectif/contrainte/décision, en trouvant au moins 3 écarts
> vérifiables — pas des préférences esthétiques. Brief complet et rubrique de
> vérification dans le README du lab.
