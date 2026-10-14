---
titre: Capstone — Mois 4-6 : site prototypé, design system, flow de pilotage
cours: 24-design-craft
bloc: Capstone — Étude de cas console SaaS GPU
notions: [prototype navigable vs maquette statique, premiers composants d'un design system de console, flow dense en données, micro-interaction justifiée vs gratuite, livrable présentable en entretien avec récit de process]
outcomes: [prototyper un site vitrine navigable à partir des maquettes du mois 3, produire au moins deux composants du design system de la console en variants Figma complets, construire un flow de pilotage avec une micro-interaction Rive justifiée par un état réel, préparer le récit de process pour une présentation orale]
prerequis: [cap01-audit-charte-maquettes]
next: cap03-facturation-usage
tribuzen: capstone console GPU fictive — flow d'onboarding et de dashboard de pilotage, prototype du site vitrine en Framer, design system naissant en Figma
last-reviewed: 2026-10
---

# Capstone — Mois 4-6 : site prototypé, design system, flow de pilotage

> **Outcomes — tu sauras FAIRE :** prototyper un site vitrine navigable à partir de maquettes
> statiques, produire les premiers composants d'un design system de console en variants
> complets, construire un flow de pilotage avec une micro-interaction justifiée par un état
> réel, et préparer le récit de ce travail pour une présentation orale.
> **Difficulté :** ⭐⭐⭐⭐

## 1. Cas concret d'abord

Le mois 3 (cap01) s'est arrêté à des maquettes Figma statiques — des images qui montrent ce
qu'un écran pourrait être, mais qu'aucun recruteur ni futur utilisateur ne peut réellement
toucher. La question posée par ce module est celle qu'un vrai poste de ce type pose
nécessairement après la phase de conception : "et maintenant, ça marche vraiment ?" Un site
vitrine qui reste une image Figma ne prouve pas qu'il fonctionne en responsive réel, qu'un
visiteur peut cliquer dessus, ou qu'un composant d'interface réagit correctement à un
changement d'état. Ce module transforme les livrables statiques du mois 1-3 en objets qui
se manipulent réellement.

## 2. Théorie complète, concise

### 2.1 Du site vitrine statique au prototype navigable

Les maquettes Figma du mois 3 montrent un site vitrine à plat. Ce module les transforme en
prototype réellement navigable — soit en Framer (Bloc D : d01 à d07, positionnement, canvas
responsive, interactions, publication), soit en Figma→React si le profil dev de Sylvain rend
cette voie plus pertinente pour une pièce de portfolio technique. Le choix entre les deux
suit directement la règle du module d01 (positionnement de l'outil) : un site vitrine simple
à moyen, sans logique métier complexe, est un terrain naturel pour Framer ; s'il faut
démontrer une maîtrise de l'intégration React pour ce poste précis, Figma→React devient
pertinent. Les deux choix sont défendables — ce qui compte est de savoir ARGUMENTER lequel a
été choisi et pourquoi, pas de suivre un chemin unique imposé.

### 2.2 Les premiers composants du design system — pas le site, la console elle-même

Il existe une distinction importante à ne jamais perdre : le site vitrine (ce qui présente le
produit au monde) et la console elle-même (l'outil de pilotage que l'utilisateur authentifié
utilise au quotidien) sont deux objets différents avec des exigences différentes. Ce module
exige au moins deux composants du design system DE LA CONSOLE — un `Button` et un composant
de données (ex. une carte de statut) — construits en variants Figma complets (c02), avec des
styles/tokens nommés (c03) reliés à la charte produite au mois 2. C'est le début du design
system qui, dans un vrai poste, serait ensuite consommé par une équipe de développement
(cours 06 pour le pendant code).

### 2.3 Le flow de pilotage dense en données — le cœur de la "console", pas son emballage

Le site vitrine et le design system restent des moyens au service d'un objectif plus
important : un flow de pilotage réel (onboarding → dashboard d'usage) qui simule l'expérience
d'un utilisateur technique qui pilote une ressource (ici, fictivement, du calcul GPU). Ce flow
doit intégrer AU MOINS une micro-interaction Rive (Bloc E, e04 state machines) pilotée par un
état réel du flow — par exemple un indicateur de statut qui transite réellement entre
idle/loading/erreur/succès selon ce qui se passe dans le flow, pas une animation jouée en
boucle sans rapport avec l'état de l'application. La règle du module b10/e05 s'applique
strictement ici : la micro-interaction doit être JUSTIFIÉE (elle communique un vrai état), pas
gratuite (elle ne fait qu'impressionner).

### 2.4 Le livrable final se raconte, il ne se contemple pas seul

Un piège fréquent et coûteux en entretien : présenter uniquement des écrans, aussi réussis
soient-ils, sans pouvoir expliquer pourquoi chaque décision a été prise. Le capstone entier
doit pouvoir se raconter en suivant la structure d'étude de cas déjà pratiquée en a12
(problème → contraintes → décision → résultat → enseignement), puis se pitcher à l'oral en 3
minutes chronométrées comme en a13 — avec un vrai contradicteur, pas une répétition solo. Ce
module prépare ce récit, il ne se contente pas de produire des écrans.

### 2.5 Le récit a besoin d'un chiffre : l'entonnoir d'activation du capstone

Le module A01 posait, comme critère de succès du brief console GPU, que « le temps entre
l'inscription et le premier déploiement GPU diminue ». C'est un critère d'entonnoir, et le
capstone doit le traiter explicitement plutôt que le laisser en intention.

Concrètement, le capstone produit **l'entonnoir d'activation** du parcours « inscription →
premier déploiement GPU », avec la méthode du module G05 : les étapes observables et
séquentielles, la perte entre chaque étape, et la base de référence du parcours existant avant
toute refonte. Appliqué au produit long d'un SaaS, c'est le temps jusqu'à la première valeur
du module H05 — ici, le premier déploiement qui tourne.

Sans ce chiffre, le capstone reste une démonstration d'écrans. Avec lui, il devient le récit
d'un résultat, et c'est la seule version qui résiste à la question « et ça a servi à quoi ? »
en entretien.

## 3. Worked examples

### Exemple A — flow de pilotage avec une micro-interaction Rive justifiée

1. Définir l'état réel que la micro-interaction doit représenter : par exemple, le statut
   d'un job de calcul GPU fictif, avec quatre états possibles (idle, loading, erreur, succès).
2. Construire cet état comme UNE state machine Rive (pas quatre animations séparées, voir
   e04) avec des inputs qui correspondent aux transitions réelles du flow (ex. un input
   "lancement" qui déclenche la transition idle→loading).
3. Intégrer cette state machine dans le flow prototypé : au moment où l'utilisateur simulé
   déclenche une action, l'indicateur transite réellement — ce n'est jamais une vidéo jouée en
   boucle indépendamment de l'action de l'utilisateur.
4. Documenter par écrit pourquoi CETTE micro-interaction précise a été choisie à cet endroit
   précis du flow (feedback d'état réel), pas ajoutée "parce que ça rend bien".

### Exemple B — choisir entre Framer et Figma→React pour le site vitrine, et le défendre

Une candidate légitime pourrait choisir Framer "parce que c'est plus rapide et que la
publication est immédiate" — réponse correcte si le site vitrine reste simple. Une autre
pourrait choisir Figma→React "pour démontrer une maîtrise technique directement transférable
à l'intégration de composants au travail" — réponse également correcte si l'objectif du
portfolio est de prouver cette compétence précise. Ce qui serait INCORRECT : ne pas avoir de
réponse du tout à la question "pourquoi cet outil plutôt que l'autre ?" posée en entretien.

## 4. Pièges & misconceptions

- **Confondre le site vitrine et la console elle-même.** Produire uniquement un beau site
  vitrine sans jamais construire le flow de pilotage réel (le cœur de l'archétype de poste
  visé) manque la cible de ce capstone précis.

- **Ajouter une micro-interaction Rive "pour le portfolio" sans état réel derrière.** Une
  animation impressionnante mais qui ne réagit à rien de réel dans le flow viole directement
  le principe b10/e05 (feedback vs décoration) — et un recruteur technique le repère vite en
  demandant "qu'est-ce qui déclenche cette animation exactement ?".

- **Livrer uniquement des écrans sans préparer le récit de process.** Voir 2.4 — c'est le
  piège le plus coûteux en situation réelle d'entretien, où la question "pourquoi ce choix ?"
  arrive presque systématiquement.

- **Choisir Framer ou Figma→React sans pouvoir justifier le choix.** Les deux sont
  défendables (voir Exemple B) ; l'absence de justification ne l'est pas.

## 5. Ancrage TribuZen

- Le flow de pilotage GPU fictif de ce module réutilise directement la méthode de state
  machine apprise en e04 (TribuZen lui-même n'a pas d'équivalent direct — c'est le produit
  fictif du capstone, pas TribuZen, qui porte ce flow).
- Les composants Button + carte de statut produits ici préfigurent une méthode transférable à
  TribuZen si son propre design system doit un jour être formalisé en Figma (pont avec le
  cours 06 côté code).
- Le document de process complète directement celui produit en cap01 — la continuité entre
  les deux mois est elle-même évaluée en cap03 et dans le récit final du capstone.

## 6. Points clés

1. Un site vitrine statique (maquettes) et un prototype navigable (Framer ou Figma→React)
   sont deux niveaux de preuve différents — un recruteur veut toucher le second, pas
   seulement regarder le premier.
2. Le site vitrine et la console elle-même sont deux objets distincts aux exigences
   différentes — ne jamais les confondre dans le périmètre du capstone.
3. Au moins deux composants du design system de la console (ex. Button, carte de statut)
   doivent exister en variants Figma complets, reliés à la charte du mois 2.
4. Une micro-interaction Rive n'a sa place dans le flow que si elle réagit à un état réel de
   l'application — jamais ajoutée pour impressionner sans logique derrière.
5. Le choix entre Framer et Figma→React pour le site vitrine est défendable dans les deux
   sens, à condition de pouvoir l'argumenter explicitement.
6. Le capstone se raconte (structure a12, pitch a13) — des écrans seuls, sans récit, ne
   suffisent jamais en situation d'entretien réelle.

## 7. Seeds Anki

```
Quelle est la différence entre le site vitrine et la console dans ce capstone ?|Le site vitrine présente le produit au monde ; la console est l'outil de pilotage que l'utilisateur authentifié utilise au quotidien — deux objets aux exigences différentes, jamais à confondre
Pourquoi une micro-interaction Rive doit-elle réagir à un état réel du flow ?|Sinon elle devient une décoration gratuite plutôt qu'un feedback utile (principe b10/e05) — et un recruteur technique demande souvent ce qui déclenche exactement l'animation
Sur quoi se base le choix entre Framer et Figma→React pour le site vitrine ?|La règle de positionnement du module d01 : site simple sans logique métier → Framer ; besoin de démontrer une maîtrise d'intégration React → Figma→React. Les deux sont défendables s'ils sont argumentés
Quels composants minimum du design system doit produire ce module ?|Au moins un Button et un composant de données (ex. carte de statut), en variants Figma complets, reliés aux styles/tokens de la charte du mois 2
Pourquoi le capstone doit-il être préparé pour une présentation orale (a13) et pas seulement montré en écrans ?|Un entretien pose presque toujours la question "pourquoi ce choix ?" — des écrans seuls sans récit de process ne suffisent jamais à y répondre
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/cap02-site-prototype-design-system/`. Tu y prototypes
> le site vitrine, tu produis les premiers composants du design system, tu construis le flow
> de pilotage avec sa micro-interaction Rive, et tu prépares le récit de process — brief
> complet et rubrique de vérification dans le README du lab.
