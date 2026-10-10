---
titre: Architecture de l'information — sitemap, navigation, tri par cartes
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [sitemap vs wireframe, tri par cartes ouvert vs fermé, structure hiérarchique, structure à facettes, structure séquentielle, IA avant mise en page]
outcomes: [construire un sitemap complet distinct d'une mise en page, choisir et justifier un type de structure de navigation, conduire un tri par cartes ouvert pour faire émerger une catégorisation plutôt que l'imposer]
prerequis: [a02-benchmark-concurrentiel]
next: a04-user-flows-wireframes
tribuzen: sitemap complet de TribuZen (famille, enfants, routines, GazettePreview, dashboard) construit par tri par cartes plutôt que décidé a priori
last-reviewed: 2026-10
---

# Architecture de l'information — sitemap, navigation, tri par cartes

> **Outcomes — tu sauras FAIRE :** construire un sitemap complet et le distinguer clairement
> d'une mise en page, choisir un type de structure de navigation et le justifier plutôt que
> le deviner, conduire un tri par cartes ouvert pour faire émerger une catégorisation plutôt
> que l'imposer depuis ton propre point de vue.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

TribuZen gère aujourd'hui plusieurs domaines mélangés dans la tête de son unique utilisateur-
développeur : la famille (profils, enfants), les routines (matin/soir, tâches), la gazette
(`GazettePreview`) et un dashboard de suivi. Si on demande "où devrait vivre la gestion d'un
enfant par rapport aux routines : dans le même menu, un sous-menu, un onglet séparé ?", la
réponse spontanée serait "là où ça me semble logique" — exactement le même défaut de
raisonnement que la palette "ça allait bien" du module B02.

Le risque concret : une IA décidée au jugé tient tant qu'il n'y a qu'un seul utilisateur qui
connaît déjà toute la structure par cœur (lui-même). Elle s'effondre dès qu'une tierce
personne (Elda, un recruteur qui teste le produit, un futur utilisateur réel de TribuZen)
doit la comprendre sans explication orale. Ce module construit la méthode pour qu'une
structure de navigation soit justifiable et testée, pas seulement familière à son auteur.

## 2. Théorie complète, concise

### 2.1 Sitemap : une arborescence, pas une mise en page

Un **sitemap** est la liste structurée et hiérarchisée de tous les écrans/pages d'un produit
et de leurs relations parent-enfant. Il ne dit RIEN sur l'apparence d'un écran (couleurs,
emplacement des boutons) — c'est une carte de territoire, pas une photo du paysage. Confondre
les deux est l'erreur la plus fréquente d'un profil qui vient du développement : on a
tendance à penser "écran" (le composant qu'on va coder) avant de penser "où cet écran vit
dans la hiérarchie globale et comment on y arrive".

Un sitemap se note simplement en arbre texte :

```
TribuZen
├── Accueil / Dashboard famille
├── Famille
│   ├── Profils (liste)
│   │   └── Profil enfant (détail)
│   └── Paramètres famille
├── Routines
│   ├── Routine du matin
│   └── Routine du soir
└── Gazette
    └── GazettePreview
```

Ce schéma seul révèle déjà une question de structure non tranchée : "Routines" est-il un
domaine au même niveau que "Famille", ou une sous-rubrique de chaque profil enfant ? Le
sitemap force cette question à être posée explicitement, avant qu'un seul pixel soit dessiné.

### 2.2 Tri par cartes : faire émerger la catégorisation plutôt que la décréter

Le **tri par cartes** (card sorting) consiste à écrire chaque contenu/fonction sur une carte
isolée (physique ou virtuelle), puis à les regrouper en catégories. Il existe en deux formes
qu'il ne faut jamais confondre :

- **Tri ouvert** : aucune catégorie n'est donnée au départ — c'est le participant (ou soi-
  même, en se forçant à l'honnêteté) qui invente et nomme les groupes au fur et à mesure.
  Utile en phase de **discovery**, quand la structure n'existe pas encore : il révèle des
  regroupements mentaux naturels qu'une structure imposée aurait pu rater.
- **Tri fermé** : les catégories sont données à l'avance (ex. "Famille", "Routines",
  "Gazette"), et la tâche consiste à ranger chaque carte dans l'une d'elles. Utile en phase
  de **validation**, une fois qu'une IA candidate existe déjà et qu'on veut vérifier qu'elle
  tient face à un regard neuf.

Faire un tri fermé avant d'avoir jamais fait de tri ouvert revient à valider une structure
qu'on n'a jamais vraiment mise à l'épreuve — on vérifie que les catégories choisies
"fonctionnent", jamais si elles sont les bonnes catégories en premier lieu.

### 2.3 Trois familles de structures de navigation

- **Hiérarchique** : arborescence stricte, un chemin parent → enfant, l'utilisateur descend
  et remonte. Convient à un contenu qui a une vraie hiérarchie naturelle (ex. Famille →
  Profil enfant → Routines de cet enfant).
- **À facettes** (ou croisée) : plusieurs axes de filtrage indépendants combinables (ex.
  filtrer les routines par enfant ET par moment de la journée simultanément). Convient à un
  contenu qui a plusieurs dimensions également valides, sans hiérarchie naturelle entre elles.
- **Séquentielle** (wizard) : une suite d'étapes imposée, sans retour en arrière libre.
  Convient à un processus qui DOIT se dérouler dans un ordre (ex. un onboarding, la création
  d'une routine en plusieurs étapes guidées).

Le choix n'est pas esthétique : il découle de la nature du contenu. Un dashboard dense (type
capstone console GPU) mélange souvent les trois à des niveaux différents (hiérarchique pour
la navigation globale, à facettes pour filtrer une liste de ressources, séquentielle pour un
flux de paiement) — ce n'est pas une incohérence, c'est la bonne structure pour chaque sous-
problème.

### 2.4 La règle qui structure tout le module : IA avant mise en page

Un wireframe (module suivant, A04) représente un écran. Un sitemap représente la relation
ENTRE les écrans. Faire un wireframe avant d'avoir validé le sitemap revient à décorer une
pièce avant de savoir si le mur qui la sépare du couloir doit exister. Toute correction de
structure après coup oblige à refaire le travail de mise en page déjà produit — pas parce que
la mise en page était mauvaise, mais parce qu'elle reposait sur une hiérarchie qui a changé.

## 3. Worked examples

### Exemple A — sitemap TribuZen construit par tri par cartes ouvert (simulé seul)

1. Lister chaque écran/fonction connu sur une "carte" séparée, sans aucune catégorie en tête :
   Profils, Routine matin, Routine soir, GazettePreview, Dashboard, Paramètres famille,
   Historique routines, Détail enfant.
2. Regrouper ces cartes en se forçant à ÉCRIRE pourquoi chaque carte rejoint telle autre —
   jamais au geste seul. Ex. : "Détail enfant" et "Profils" vont ensemble parce que l'un est
   le point d'entrée de l'autre (relation parent-enfant directe). "Historique routines" peut
   légitimement rejoindre soit "Routines" (même domaine fonctionnel) soit "Dashboard" (même
   usage : consulter un résumé) — ce doute, documenté, EST le résultat utile du tri : il
   révèle une ambiguïté réelle de la structure, pas un simple oubli.
3. Nommer les groupes a posteriori, jamais avant : "Famille" (Profils + Détail enfant +
   Paramètres famille), "Routines" (Routine matin + soir + Historique), "Gazette"
   (GazettePreview), "Vue d'ensemble" (Dashboard).
4. Transformer en sitemap arborescent (voir 2.1) et choisir la structure : ici hiérarchique
   pour la navigation principale, avec un sous-niveau à facettes pour l'historique des
   routines (filtrable par enfant ET par type de routine).

### Exemple B — distinguer sitemap et wireframe sur un même besoin

Besoin : "ajouter un écran de paramètres pour chaque enfant individuellement."

- Réponse SITEMAP (ce module) : où ce nouvel écran se rattache-t-il ? Sous "Détail enfant"
  (hiérarchique, cohérent avec l'existant) ou comme une entrée séparée au même niveau que
  "Paramètres famille" ? La question se tranche sans dessiner un seul bouton.
- Réponse WIREFRAME (module A04, PAS ce module) : quels champs, dans quel ordre, quel bouton
  de sauvegarde. Si cette deuxième question est posée avant la première, le futur écran
  wireframé dépend d'un rattachement qui n'a pas encore été validé — risque réel de devoir
  jeter le wireframe si le rattachement change.

## 4. Pièges & misconceptions

- **Confondre sitemap et wireframe.** Le sitemap répond "où", pas "comment c'est affiché" —
  voir Exemple B. Un profil dev a tendance à sauter directement à l'écran concret.

- **Confondre tri ouvert et tri fermé.** Faire un tri fermé en pensant qu'il "découvre" une
  structure — il ne fait que vérifier une structure déjà posée. Si la structure n'existe pas
  encore, le tri ouvert est obligatoire en premier (voir 2.2).

- **Choisir une structure de navigation par habitude plutôt que par nature de contenu.** Une
  structure hiérarchique appliquée à un contenu qui a en réalité plusieurs dimensions
  indépendantes (ex. filtrer par enfant ET par type) force l'utilisateur à naviguer en
  profondeur pour des combinaisons qu'une structure à facettes aurait permis en un geste.

- **Dessiner un wireframe avant d'avoir figé le sitemap "juste pour avancer".** Le coût
  apparent économisé (ne pas attendre) se paie plus cher ensuite (refaire le wireframe une
  fois la structure corrigée) — voir la règle centrale en 2.4.

## 5. Ancrage TribuZen

- Le sitemap complet de TribuZen (Exemple A) devient un document de référence réutilisable
  dès qu'un nouvel écran est envisagé : la première question à se poser est "où dans cet
  arbre", pas "à quoi ça ressemble".
- L'ambiguïté détectée sur "Historique routines" (Routines vs Dashboard) est un vrai sujet
  ouvert pour TribuZen — à trancher explicitement plutôt qu'à laisser flotter implicitement
  dans le code actuel.
- Toute évolution future du produit (nouvel écran, nouvelle fonction) passe par une mise à
  jour explicite du sitemap avant tout wireframe — discipline à tenir même pour un ajout qui
  semble mineur.

## 6. Points clés

1. Un sitemap est une arborescence de relations entre écrans — il ne dit rien sur
   l'apparence d'un écran, c'est le rôle du wireframe (module suivant).
2. Le tri par cartes ouvert (catégories émergentes) sert à découvrir une structure ; le tri
   fermé (catégories données) sert seulement à la valider — ne jamais substituer l'un à l'autre.
3. Trois familles de structures de navigation existent (hiérarchique, à facettes,
   séquentielle) et le choix dépend de la nature du contenu, pas du goût.
4. Un contenu dense (dashboard, console) mélange souvent les trois structures à des niveaux
   différents — ce n'est pas une incohérence si chaque sous-problème a la structure adaptée.
5. Corriger une structure après avoir produit des wireframes oblige à refaire ce travail —
   d'où la règle "IA avant mise en page", jamais l'inverse.

## 7. Seeds Anki

```
Quelle est la différence entre un sitemap et un wireframe ?|Le sitemap décrit les relations entre écrans (structure) ; le wireframe décrit l'intérieur d'un écran (mise en page) — deux questions indépendantes
Quelle est la différence entre un tri par cartes ouvert et fermé ?|Ouvert : aucune catégorie donnée, elles émergent du participant (discovery) ; fermé : catégories données à l'avance, on range dedans (validation)
Pourquoi faire un tri par cartes fermé avant un tri ouvert est une erreur ?|Le tri fermé ne fait que vérifier une structure déjà posée — s'il n'y a pas encore de structure à vérifier, il ne découvre rien
Quelles sont les trois familles de structures de navigation ?|Hiérarchique (arborescence stricte), à facettes (filtres croisés indépendants), séquentielle (étapes imposées, type wizard)
Pourquoi ne jamais faire un wireframe avant d'avoir validé le sitemap ?|Toute correction de structure après coup oblige à refaire le travail de mise en page déjà produit, qui reposait sur une hiérarchie qui a changé
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a03-architecture-information/`. Tu y construis le
> sitemap complet de TribuZen par un vrai tri par cartes documenté, et tu choisis/justifies
> la structure de navigation — brief complet et rubrique de vérification dans le README du lab.
