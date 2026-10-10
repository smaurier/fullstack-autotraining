---
titre: Benchmark concurrentiel — analyser avant de designer
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [benchmark structuré vs inspiration non méthodique, grille de critères comparables, repérer un pattern qui marche vs un pattern copié aveuglément, benchmark direct vs benchmark par analogie]
outcomes: [analyser 3-5 produits comparables selon une grille de critères explicite, distinguer un pattern qui résout un problème précis d'un pattern copié par mimétisme, documenter un benchmark de façon réutilisable pour justifier une décision de design]
prerequis: [a01-discovery]
next: a03-architecture-information
tribuzen: benchmark de 3-5 consoles/dashboards réels avant de designer le flow de pilotage GPU du capstone
last-reviewed: 2026-10
---

# Benchmark concurrentiel — analyser avant de designer

> **Outcomes — tu sauras FAIRE :** analyser 3-5 produits comparables selon une grille de
> critères explicite, distinguer un pattern qui résout vraiment un problème d'un pattern
> copié par mimétisme, et documenter un benchmark de façon à pouvoir t'en servir pour
> justifier une décision de design face à un pair ou un client.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le problème utilisateur du module précédent est posé : *"les nouveaux clients abandonnent
avant leur premier déploiement GPU parce que le parcours mélange technique et
administratif."* Réflexe fréquent et dangereux à ce stade : ouvrir Dribbble, trouver une
maquette de dashboard qui "a l'air bien", et s'en inspirer directement.

Le problème de ce réflexe : une maquette Dribbble est une image statique, souvent un
exercice de style sans contrainte produit réelle (pas de vraies données, pas de vrai
utilisateur, pas de contrainte business). Elle ne prouve RIEN sur ce qui résout le problème
identifié. Un benchmark structuré, lui, regarde des **produits réels en usage réel** et
isole ce qui, dans leurs choix, répond à un problème comparable au tien — ou au contraire,
ce qui échoue chez eux et qu'il faut éviter de reproduire.

## 2. Théorie complète, concise

### 2.1 Benchmark structuré vs inspiration non méthodique

Une inspiration non méthodique collecte des images qui "plaisent" sans critère explicite —
le risque est de copier une esthétique sans copier (ou sans même identifier) le
raisonnement produit qui l'a produite. Un **benchmark structuré** répond à une question
précise ("comment ces produits gèrent-ils la séparation technique/administratif ?") sur un
échantillon choisi (3-5 produits, pas 20 — au-delà, l'analyse devient superficielle), avec
une **grille de critères identique pour chacun**, permettant une comparaison réelle plutôt
qu'une collection d'impressions.

### 2.2 Construire une grille de critères

La grille doit découler directement du problème utilisateur posé en discovery (module A1),
pas être générique. Pour le cas de la console GPU :

| Critère | Vercel | AWS Console | Stripe Dashboard |
|---|---|---|---|
| Séparation visuelle technique/facturation | ? | ? | ? |
| Nombre de clics avant 1er déploiement/action | ? | ? | ? |
| Coût affiché avant ou après l'action | ? | ? | ? |
| Vocabulaire technique expliqué ou présupposé | ? | ? | ? |

Chaque case se remplit par une observation factuelle (pas une opinion) — "3 clics, menu
latéral séparé facturation/compute" plutôt que "c'est propre". Cette discipline factuelle
est ce qui transforme une admiration vague ("j'aime Vercel") en matériau de décision
("Vercel sépare physiquement compute et billing dans la navigation principale, pas dans
des onglets d'un même écran — à tester si ça réduit la confusion sur TribuZen/le capstone").

### 2.3 Benchmark direct vs benchmark par analogie

Un **benchmark direct** compare des produits du même domaine (consoles cloud entre elles).
Un **benchmark par analogie** regarde un domaine différent qui a résolu un problème
structurellement comparable — par exemple, comment une app bancaire affiche un coût avant
une validation de virement peut éclairer l'écran de facturation à l'usage du capstone, même
si une banque n'a rien à voir avec du cloud GPU. Le benchmark par analogie évite le piège
de ne regarder que les concurrents directs, qui ont souvent les mêmes angles morts que toi
(s'ils avaient résolu le problème, lui aussi aurait probablement un bon parcours).

### 2.4 Repérer un pattern qui marche vs un pattern copié aveuglément

Un pattern visuel observé chez un produit référence (ex. Stripe) n'est "bon" que dans son
contexte : Stripe affiche une facturation complexe à des développeurs déjà familiers avec la
notion d'API — copier ce pattern pour un public moins technique sans l'adapter reproduit
une solution hors contexte. La question systématique après chaque observation : "ce pattern
fonctionne ICI pourquoi, et est-ce que cette raison s'applique à MON utilisateur ?"

## 3. Worked examples

### Exemple A — benchmark appliqué au problème de la console GPU (capstone)

Problème : les nouveaux clients abandonnent avant leur premier déploiement car le parcours
mélange technique et administratif (module A1).

Échantillon choisi (3 produits, benchmark direct + 1 analogie) : Vercel (déploiement
développeur), AWS Console (cloud généraliste, référence du "trop complexe"), Stripe
Dashboard (facturation développeur, référence qualité), + analogie : une app bancaire pour
le critère "coût avant action".

Observation factuelle sur Vercel : le premier déploiement se fait en 1 clic depuis un repo
Git connecté, AUCUNE mention de facturation n'apparaît avant que l'utilisateur consulte
explicitement l'onglet Billing. Enseignement transférable : séparer radicalement le premier
geste technique de toute information de coût, pas juste visuellement — temporellement.

Observation factuelle sur AWS Console : la création d'une instance EC2 affiche un
sélecteur de type d'instance avec le prix/heure affiché EN MÊME TEMPS que la configuration
technique — ça répond en partie au critère "coût avant action", mais noyé dans une
interface qui présuppose déjà une expertise cloud. Enseignement : afficher le coût avant
l'action est bon, mais seulement si la densité d'information autour reste maîtrisée —
contre-exemple à ne pas reproduire sur la densité.

### Exemple B — distinguer un pattern transférable d'un pattern hors contexte

Observation sur Stripe Dashboard : des graphiques temps réel de revenus en page d'accueil.
Question de contexte : Stripe sert des équipes finance qui consultent CE produit
spécifiquement pour suivre des revenus au jour le jour — le graphique répond à un besoin de
monitoring récurrent. Pour un nouveau client qui n'a pas encore fait son premier
déploiement GPU, un graphique de consommation vide ou à zéro n'apporterait aucune valeur et
ajouterait de la complexité visuelle au pire moment (onboarding). Conclusion documentée :
ne pas reproduire le graphique temps réel en page d'accueil pour un nouvel utilisateur —
le réserver à un état "client actif" plus avancé, hors scope du capstone immédiat.

## 4. Pièges & misconceptions

- **Confondre benchmark et moodboard esthétique.** Un benchmark répond à une question
  précise avec des observations factuelles ; un moodboard collecte des ambiances visuelles.
  Les deux sont utiles mais à des moments différents du process (benchmark en discovery,
  moodboard en direction artistique, module B11).

- **Benchmarker uniquement des produits qui "ont l'air bien".** Un produit qui échoue sur
  ton critère précis est une donnée aussi utile qu'un produit qui réussit — AWS Console
  dans l'exemple A est benchmarké justement pour sa densité excessive, pas pour l'imiter.

- **Copier un pattern sans vérifier le contexte qui le justifie.** Voir Exemple B — le
  même élément visuel (graphique temps réel) est pertinent dans un contexte et nuisible
  dans un autre.

- **Benchmarker trop large (10+ produits) et perdre la profondeur.** 3-5 produits analysés
  en profondeur avec une grille précise valent plus que 15 produits survolés superficiellement.

## 5. Ancrage TribuZen

Avant de designer `GazettePreview` ou `FamilyDashboard` (labs des modules suivants) :
benchmarker 3-5 apps familiales ou de gestion de foyer réelles (pas forcément des concurrents
directs — une app de calendrier familial, une app de gestion de tâches partagées) sur le
critère précis "comment l'app évite de surcharger un parent déjà occupé" — directement
transférable au problème TribuZen identifié ailleurs dans le parcours de Sylvain.

## 6. Points clés

1. Un benchmark structuré répond à une question précise avec une grille de critères
   identique pour chaque produit — pas une collecte d'impressions esthétiques.
2. La grille de critères découle du problème utilisateur posé en discovery, jamais générique.
3. Le benchmark par analogie (un domaine différent qui a résolu un problème structurellement
   comparable) évite l'angle mort de ne regarder que des concurrents qui partagent souvent
   les mêmes défauts.
4. Un produit qui échoue sur ton critère est une donnée aussi utile qu'un produit qui réussit.
5. Un pattern observé n'est transférable que si le contexte qui le justifie s'applique
   aussi à ton utilisateur — toujours vérifier le "pourquoi" avant de copier le "quoi".

## 7. Seeds Anki

```
Quelle est la différence entre un benchmark structuré et une inspiration non méthodique ?|Le benchmark répond à une question précise avec une grille de critères identique pour chaque produit ; l'inspiration collecte des images sans critère explicite, au risque de copier une esthétique sans en comprendre le raisonnement produit
D'où doit découler la grille de critères d'un benchmark ?|Directement du problème utilisateur posé en discovery — jamais une grille générique copiée d'un template
Qu'est-ce qu'un benchmark par analogie ?|Comparer avec un produit d'un domaine différent qui a résolu un problème structurellement comparable, pour éviter de ne regarder que des concurrents qui partagent souvent les mêmes angles morts
Pourquoi un pattern observé chez un concurrent n'est-il pas automatiquement transférable ?|Parce qu'il répond à un contexte précis (public, besoin, fréquence d'usage) — il faut vérifier que ce contexte s'applique aussi à son propre utilisateur avant de le copier
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a02-benchmark-concurrentiel/`. Tu y produis un
> benchmark écrit de 3-5 consoles/dashboards réels avant de designer le flow de pilotage
> GPU du capstone — grille de critères, observations factuelles, enseignements
> transférables documentés. Brief complet et rubrique dans le README du lab.
