---
titre: Discovery — reformuler un besoin flou en problème utilisateur
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [besoin exprimé vs besoin réel, problème utilisateur vs liste de features, 5 Pourquoi, reformulation en "Comment pourrions-nous", critères de succès mesurables, cadrage avant solution]
outcomes: [transformer un brief flou en un énoncé de problème utilisateur précis, distinguer une feature demandée d'un problème sous-jacent, écrire des critères de succès vérifiables avant de proposer une solution]
prerequis: []
next: a02-benchmark-concurrentiel
tribuzen: reformulation du brief "améliore la console Kerion" (générique) en problème utilisateur réel, appliqué au capstone
last-reviewed: 2026-10
---

# Discovery — reformuler un besoin flou en problème utilisateur

> **Outcomes — tu sauras FAIRE :** transformer un brief flou ("améliore le site", "refais
> la console") en un énoncé de problème utilisateur précis et actionnable, distinguer une
> feature demandée d'un problème réel sous-jacent, et écrire des critères de succès
> vérifiables AVANT de proposer la moindre solution visuelle.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un brief arrive, typique de ce que tu recevrais vraiment en poste : *"Il faut repenser
l'interface de la console, de l'inscription au pilotage des GPU."* (brief réel, tiré de
l'offre Kerion Cloud qui a déclenché ce cours).

Réflexe à éviter — ouvrir directement Figma et commencer à dessiner un dashboard parce que
"console = dashboard avec des graphiques". C'est traiter le brief comme une commande de
feature, pas comme un problème à comprendre. Deux mois de travail visuel peuvent être
produits sur la base d'une mauvaise compréhension du problème réel — et c'est le designer,
pas le client, qui en porte la responsabilité professionnelle.

Ce module donne la méthode pour, AVANT tout Figma : extraire le problème utilisateur réel
derrière ce brief, distinguer ce qui est vraiment demandé de ce qui est supposé, et écrire
ce qui prouvera que le travail a réussi.

## 2. Théorie complète, concise

### 2.1 Besoin exprimé vs besoin réel

Un brief exprime presque toujours une **solution supposée** ("repenser l'interface"), pas
le **problème** qui la motive. Le travail de discovery consiste à remonter du brief au
problème. Méthode des **5 Pourquoi** (origine : Toyota, production industrielle,
transposée au design produit) :

```
Brief : "Repenser l'interface de la console, de l'inscription au pilotage des GPU."

Pourquoi ? → Parce que la console actuelle a été construite au fil de l'eau, sans designer.
Pourquoi c'est un problème ? → Parce que les nouveaux clients se perdent entre l'inscription
  et le premier déploiement GPU.
Pourquoi se perdent-ils ? → Parce que le parcours mélange des actions techniques (choisir
  un GPU, configurer un volume) et des actions administratives (facturation, équipe) sans
  séparation claire.
Pourquoi c'est grave pour l'entreprise ? → Parce qu'un client qui abandonne avant son
  premier déploiement ne devient jamais un client payant récurrent.
Pourquoi maintenant ? → Parce que l'entreprise grandit vite et que chaque friction coûte
  proportionnellement plus de clients perdus.
```

Le problème réel n'est plus "l'interface est moche" (ce que "repenser l'interface" laisse
supposer) — c'est **"les nouveaux clients abandonnent avant leur premier déploiement GPU
parce que le parcours mélange des logiques techniques et administratives sans les
séparer."** Ce problème-là a une solution vérifiable ; "repenser l'interface" n'en a pas.

### 2.2 Distinguer une feature d'un problème

Une **feature** est une solution déjà choisie ("ajoute un bouton pour comparer les prix").
Un **problème** est ce que la feature est censée résoudre ("l'utilisateur ne sait pas s'il
fait le bon choix de GPU pour son budget"). La même feature peut résoudre — ou pas — le
problème réel : un bouton de comparaison de prix ne règle rien si le vrai problème est que
les unités de facturation (GPU/heure vs GPU/mois) ne sont pas comprises du tout.

**Règle pratique** : face à une demande formulée comme une feature ("il faut un bouton
X"), toujours demander "quel problème ce bouton résout-il pour l'utilisateur ?" avant de la
designer. Si la réponse est vague ou circulaire ("parce que les autres l'ont"), le problème
n'est pas encore identifié — continuer le travail de discovery avant de dessiner quoi que
ce soit.

### 2.3 Reformulation en "Comment pourrions-nous" (How Might We)

Technique issue du design thinking (IDEO, popularisée dans les années 2000) : transformer
un problème identifié en une question ouverte qui invite plusieurs solutions possibles,
plutôt qu'en fermer une seule prématurément.

```
Problème : "Les nouveaux clients abandonnent avant leur premier déploiement GPU parce que
le parcours mélange technique et administratif."

Mauvaise reformulation (ferme la solution trop vite) :
"Comment pourrions-nous ajouter un wizard d'onboarding en 5 étapes ?"
→ C'est déjà une solution (un wizard), pas une question ouverte.

Bonne reformulation (ouvre l'espace de solutions) :
"Comment pourrions-nous aider un nouveau client à atteindre son premier déploiement GPU
sans qu'il ait à comprendre la facturation avant d'avoir vu le résultat ?"
→ Plusieurs solutions possibles : séparer visuellement les deux parcours, différer
l'affichage des coûts, proposer un GPU "gratuit à l'essai" pour le premier déploiement, etc.
La question n'a pas pré-choisi la réponse.
```

### 2.4 Critères de succès mesurables, écrits AVANT la solution

Un problème bien formulé permet d'écrire, avant toute maquette, ce qui prouvera que la
solution fonctionne. Sans ça, "c'est mieux" reste une opinion invérifiable.

```
Problème : accès ci-dessus (confusion technique/administratif).

Critères de succès (à écrire AVANT de designer quoi que ce soit) :
- Un nouveau client complète son premier déploiement GPU sans visiter l'écran de
  facturation (mesurable : parcours d'usage, pas d'opinion).
- Le temps entre inscription et premier déploiement GPU diminue par rapport à l'existant
  (mesurable : métrique produit, pas "ça a l'air plus rapide").
- Testé auprès de 5 utilisateurs novices (module A7, test utilisateur) : aucun ne confond
  spontanément une action de configuration GPU avec une action de facturation.
```

Ces critères ne sont pas un rapport à produire après coup pour se justifier — ils doivent
exister AVANT la première maquette, pour que la solution soit conçue pour les remplir,
pas évaluée après coup avec des critères inventés pour coller au résultat.

## 3. Worked examples

### Exemple A — refaire la reformulation du brief Kerion complet

Brief complet (celui qui a déclenché ce cours) :

> *"Refondre le site web, du wireframe à la mise en ligne. Faire évoluer la charte
> graphique et la décliner sur tous nos supports. Repenser l'interface de la console, de
> l'inscription au pilotage des GPU. Construire notre design system avec les
> développeurs."*

Ce brief contient EN RÉALITÉ trois problèmes distincts, pas un seul — un piège fréquent
des briefs réels : ils empilent plusieurs problèmes sous une seule formulation globale.

1. **Problème marque** : l'entreprise grandit sans identité visuelle dédiée, ce qui nuit à
   sa crédibilité face à des clients qui évaluent un fournisseur d'infra critique (pas de
   solution pré-choisie encore — pourrait être une refonte de marque complète ou un
   ajustement ciblé).
2. **Problème produit/conversion** : le site actuel ne convertit peut-être pas assez de
   visiteurs en inscrits (à vérifier par benchmark, module A2, avant de l'affirmer).
3. **Problème d'usage/rétention** : les clients inscrits n'atteignent peut-être pas leur
   premier déploiement GPU facilement (le problème développé en 2.1 ci-dessus).

Traiter ces trois problèmes avec UNE seule solution visuelle ("une nouvelle charte") serait
une erreur de cadrage — chacun a sa propre reformulation "Comment pourrions-nous" et ses
propres critères de succès, même s'ils partagent la même direction artistique en sortie.

### Exemple B — repérer une feature déguisée en problème

Une partie prenante (fictive, pour l'exercice) dit : *"Il faut un tableau de bord avec des
graphiques en temps réel pour l'usage GPU."* Appliquer la méthode :

1. Quel problème ce tableau de bord résout-il ? → "Les clients ne savent pas combien ils
   dépensent avant de recevoir la facture."
2. Est-ce que "graphiques en temps réel" est la seule solution à ce problème ? → Non — une
   estimation de coût AVANT de lancer une action (voir capstone, module de facturation à
   l'usage) répond au même problème sans nécessiter de temps réel ni de graphiques
   complexes à maintenir.
3. Reformulation ouverte : "Comment pourrions-nous permettre à un client de savoir ce
   qu'une action va lui coûter avant de la valider ?" — ça n'impose plus un dashboard
   temps réel comme solution unique.

## 4. Pièges & misconceptions

- **Accepter le brief tel quel et ouvrir Figma directement.** C'est le réflexe le plus
  coûteux de ce module — produire du travail visuel sur un problème mal cadré oblige à tout
  refaire une fois le vrai problème découvert, souvent après des semaines de travail.

- **Confondre "poser des questions" et "douter de la légitimité du client".** Le 5 Pourquoi
  n'est pas un interrogatoire suspicieux — c'est une méthode de collaboration qui sert
  AUSSI le client (le brief enterre parfois lui-même le vrai problème sans le vouloir).

- **S'arrêter au premier "pourquoi" qui semble suffisant.** Trois "pourquoi" ("c'est moche
  → parce qu'on n'a pas de designer → parce que l'entreprise a grandi vite") restent
  souvent au niveau de la cause, pas du problème utilisateur réel. Pousser jusqu'à
  atteindre un impact mesurable sur l'utilisateur ou le business, pas juste une raison
  organisationnelle.

- **Écrire des critères de succès APRÈS avoir designé la solution.** À ce moment, le risque
  de les écrire pour justifier ce qui a déjà été fait (biais de confirmation) est quasi
  automatique. Les critères doivent exister avant, signés/validés si possible par qui a
  émis le brief.

- **Traiter un brief multi-problèmes comme un seul problème.** Voir Exemple A — un brief
  réel empile souvent plusieurs problèmes sous une formulation unique ; les traiter
  séparément évite une solution qui sert bien un problème et mal les deux autres.

## 5. Ancrage TribuZen

TribuZen a déjà un fil-rouge de features demandées (gazette hebdomadaire, dashboard
familial, ressources contextuelles). Appliquer ce module avant tout nouveau lab-geste visuel
des blocs C/D :

- Avant de designer `GazettePreview` (prévu au Bloc A module 4) : écrire le problème
  utilisateur réel ("un parent surchargé n'a pas le temps de suivre l'activité
  hebdomadaire de la famille") plutôt que de partir directement de la feature nommée.
- Les critères de succès de TribuZen peuvent s'ancrer sur des métriques produit réelles
  déjà suivies (si elles existent) plutôt que sur des critères inventés après coup.

## 6. Points clés

1. Un brief exprime une solution supposée, pas le problème — la méthode des 5 Pourquoi
   remonte du brief au problème utilisateur réel.
2. Une feature ("ajoute un bouton X") n'est pas un problème — toujours demander "quel
   problème ça résout" avant de la designer.
3. La reformulation "Comment pourrions-nous" doit rester une question ouverte, jamais une
   solution déjà choisie déguisée en question.
4. Les critères de succès se définissent AVANT la solution, pas après — sinon ils ne
   prouvent rien, ils justifient.
5. Un brief réel empile souvent plusieurs problèmes distincts sous une formulation globale
   — les séparer avant de proposer une direction unique.

## 7. Seeds Anki

```
Que remonte-t-on avec la méthode des 5 Pourquoi en discovery ?|Du brief exprimé (une solution supposée) vers le problème utilisateur réel sous-jacent
Comment distinguer une feature d'un problème ?|Une feature est une solution déjà choisie ; un problème est ce qu'elle est censée résoudre — toujours demander "quel problème ça résout" avant de designer
Qu'est-ce qui rend une reformulation "Comment pourrions-nous" mauvaise ?|Si elle contient déjà une solution précise (ex. "un wizard en 5 étapes") au lieu de rester une question ouverte à plusieurs solutions possibles
Quand faut-il écrire les critères de succès d'un projet design ?|AVANT de proposer la moindre solution visuelle — sinon ils risquent de justifier ce qui a déjà été fait plutôt que de le prouver
Pourquoi un brief réel empile-t-il souvent plusieurs problèmes ?|Parce qu'il est formulé du point de vue de celui qui l'écrit, qui mélange souvent marque, conversion et usage sous une seule demande globale
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a01-discovery/`. Tu y reformules le
> brief Kerion complet (ou un brief générique équivalent) en 1 problème utilisateur précis
> + 3 user flows texte — zéro Figma à ce stade. Brief et rubrique de vérification dans le
> README du lab : la preuve attendue est la distinction explicite des 3 problèmes empilés
> dans le brief (marque, conversion, usage) et au moins une reformulation "Comment
> pourrions-nous" correctement ouverte pour chacun.
