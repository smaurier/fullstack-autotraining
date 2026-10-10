---
titre: Heuristiques de Nielsen et lois de l'UX — critiquer, pas réciter
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [10 heuristiques de Nielsen, loi de Hick, loi de Fitts, loi de Miller, heuristique comme guide pondérable vs règle absolue, critique structurée vs préférence esthétique]
outcomes: [nommer et appliquer les 10 heuristiques de Nielsen pour critiquer une interface existante, utiliser les lois de Hick, Fitts et Miller pour justifier un problème d'usage précis, distinguer une violation heuristique réelle d'une préférence de goût déguisée]
prerequis: [a04-user-flows-wireframes]
next: a06-accessibilite-conception
tribuzen: critique heuristique structurée de nahual.fr ou nuada-audit.netlify.app pour trouver 5 vrais problèmes nommés
last-reviewed: 2026-10
---

# Heuristiques de Nielsen et lois de l'UX — critiquer, pas réciter

> **Outcomes — tu sauras FAIRE :** nommer et appliquer les 10 heuristiques de Nielsen pour
> critiquer une interface existante, mobiliser les lois de Hick, Fitts et Miller pour
> justifier un problème d'usage précis plutôt qu'une impression, et distinguer une vraie
> violation heuristique d'une préférence esthétique déguisée en argument technique.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

"Je trouve que ce menu est confus" est une opinion. "Ce menu viole l'heuristique de
reconnaissance plutôt que rappel parce qu'il demande à l'utilisateur de se souvenir d'un
code de statut sans jamais l'afficher en clair" est une critique actionnable. La différence
n'est pas de vocabulaire : la deuxième phrase pointe un mécanisme précis, vérifiable par un
tiers, et suggère implicitement la correction. La première ne donne rien à corriger.

Les heuristiques et lois de ce module sont l'outil pour transformer systématiquement la
première phrase en la seconde — appliqué ici à une vraie interface existante (nahual.fr ou
nuada-audit), pas à un exemple abstrait de manuel.

## 2. Théorie complète, concise

### 2.1 Les 10 heuristiques de Nielsen — nommées, pas paraphrasées au hasard

Jakob Nielsen a formalisé en 1994 dix principes d'utilisabilité, toujours la référence
standard pour une critique structurée d'interface :

1. **Visibilité de l'état du système** — l'utilisateur sait toujours ce qui se passe
   (chargement, succès, erreur) sans deviner.
2. **Correspondance avec le monde réel** — le vocabulaire et les métaphores utilisés
   correspondent à ceux de l'utilisateur, pas au jargon interne du système.
3. **Contrôle et liberté de l'utilisateur** — une sortie de secours existe (annuler, retour
   arrière) pour toute action engagée par erreur.
4. **Cohérence et standards** — un même élément se comporte de la même façon partout dans le
   produit ; on suit les conventions de la plateforme sauf raison explicite de s'en écarter.
5. **Prévention des erreurs** — mieux vaut empêcher une erreur (désactiver un bouton
   incohérent) que de bien l'afficher après coup.
6. **Reconnaissance plutôt que rappel** — l'information nécessaire est visible à l'écran,
   l'utilisateur n'a pas besoin de la retenir d'un écran à l'autre (voir Cas concret).
7. **Flexibilité et efficacité d'usage** — des raccourcis existent pour l'utilisateur
   expert, sans gêner le débutant qui ne les utilise pas.
8. **Esthétique et design minimaliste** — chaque élément visible doit justifier sa présence ;
   tout ce qui n'aide pas directement la tâche est du bruit.
9. **Aide au diagnostic et à la récupération d'erreurs** — un message d'erreur dit
   précisément ce qui s'est passé et comment s'en sortir (pont direct avec le futur module
   A07 UX writing).
10. **Aide et documentation** — même un produit bien conçu a parfois besoin d'une aide
    contextuelle, accessible sans forcer une lecture longue.

### 2.2 Loi de Hick : le coût du choix

La **loi de Hick** établit que le temps nécessaire pour prendre une décision augmente avec le
nombre d'options proposées (de façon logarithmique, pas linéaire, mais la direction compte
plus que la formule exacte pour une critique de design). Conséquence directe pour un menu
dense (type console de pilotage GPU du capstone) : chaque option supplémentaire visible
simultanément ralentit TOUTES les décisions, pas seulement celle liée à cette option — d'où
l'intérêt de regrouper ou masquer les options rares plutôt que de tout exposer à plat.

### 2.3 Loi de Fitts : le coût de la cible

La **loi de Fitts** établit que le temps pour atteindre une cible dépend de sa **taille** et
de sa **distance** par rapport à la position de départ — une cible petite et lointaine prend
plus de temps (et génère plus d'erreurs de clic) qu'une cible grande et proche. C'est la
justification théorique directe de la future règle des zones tactiles 44px (module A06,
accessibilité en conception) : ce n'est pas une convention arbitraire, c'est une loi de
performance motrice mesurable.

### 2.4 Loi de Miller : le coût de la mémoire

La **loi de Miller** (le fameux "7±2") décrit la capacité limitée de la mémoire de travail à
court terme : un humain retient en moyenne 5 à 9 éléments simultanément sans effort. Elle ne
concerne pas le nombre de CHOIX possibles (ça, c'est Hick) mais la quantité d'information
qu'on demande de **garder en tête** entre deux écrans ou pendant une tâche (ex. retenir un
code généré à l'écran précédent pour le retaper plus loin).

### 2.5 Une heuristique est un guide à pondérer, jamais une règle absolue

Le piège le plus fréquent d'un débutant qui découvre ces outils : les appliquer comme des
lois gravées dans le marbre. Exemple concret : l'heuristique 4 (cohérence) recommande qu'un
bouton se comporte toujours pareil — mais une action **destructrice et irréversible** (ex.
supprimer définitivement un enfant du profil familial) DOIT visuellement et comportementalement
se distinguer des autres boutons, même si ça "casse" une cohérence stricte de style. La bonne
lecture : la cohérence sert la prévisibilité, et une rupture délibérée et visible sert ici un
objectif heuristique plus important (la prévention d'erreur, heuristique 5) — les
heuristiques se pèsent entre elles, elles ne se cochent pas une par une sans jugement.

## 3. Worked examples

### Exemple A — critique heuristique d'un menu de navigation dense (cas générique console GPU)

Observation : un menu latéral affiche 14 options à plat, sans aucun regroupement, triées par
ordre alphabétique de nom technique interne.

- **Heuristique 2 violée** (correspondance monde réel) : les noms techniques internes ne
  correspondent pas au vocabulaire métier de l'utilisateur.
- **Heuristique 6 violée** (reconnaissance plutôt que rappel) : l'ordre alphabétique de noms
  techniques oblige à se RAPPELER où se trouve une fonction plutôt que de la RECONNAÎTRE par
  un regroupement logique (ex. "Facturation", "Monitoring", "Paramètres").
- **Loi de Hick mobilisée** : 14 options à plat ralentissent toute décision, même pour
  l'option la plus utilisée — regrouper en 4-5 catégories réduirait le coût de décision à
  chaque niveau, même si le nombre total d'options reste identique.

Correction suggérée (découle directement du diagnostic, pas ajoutée après coup) : regrouper
les 14 options en 4-5 catégories nommées en vocabulaire métier, triées par fréquence d'usage
plutôt qu'alphabétiquement.

### Exemple B — distinguer une vraie violation d'une préférence de goût

Observation sur nahual.fr (ou nuada-audit) : "le bouton principal n'a pas la couleur que
j'aurais choisie."

- Ce n'est PAS une violation heuristique : aucune des 10 heuristiques ne prescrit une couleur
  précise. C'est une préférence esthétique, à traiter comme telle (légitime en soi, mais pas
  un problème d'utilisabilité).
- Reformulation en critique actionnable SI un vrai problème existe : "le bouton principal a
  un contraste de 2.8:1 avec son fond, sous le seuil WCAG de 4.5:1" — ÇA, c'est mesurable,
  vérifiable par un tiers, et rattachable à l'heuristique 8 (esthétique au service de la
  tâche) combinée à une contrainte d'accessibilité (hors scope strict des heuristiques de
  Nielsen, mais le réflexe de vérifier reste le même : preuve avant jugement).

## 4. Pièges & misconceptions

- **Traiter une heuristique comme une règle absolue.** Voir 2.5 — une rupture de cohérence
  délibérée peut servir un objectif heuristique plus important (prévention d'erreur sur une
  action dangereuse).

- **Confondre loi de Hick et loi de Miller.** Hick = coût du NOMBRE DE CHOIX visibles à un
  instant donné ; Miller = coût de ce qu'on demande de GARDER EN MÉMOIRE entre deux moments.
  Un menu avec 20 options visibles (problème de Hick) n'a pas le même mécanisme qu'un
  formulaire qui demande de retenir un code généré 2 écrans plus tôt (problème de Miller).

- **Citer une heuristique sans dire POURQUOI elle est violée dans ce cas précis.** "Ça viole
  l'heuristique 4" sans expliquer le mécanisme concret n'est pas plus actionnable que "je
  n'aime pas" — voir Cas concret d'abord.

- **Déguiser une préférence esthétique en violation heuristique** (voir Exemple B) — vérifier
  systématiquement qu'un mécanisme nommé et mesurable est en jeu avant de parler de violation.

## 5. Ancrage TribuZen

- La grille des 10 heuristiques + 3 lois devient l'outil de critique par défaut pour toute
  revue future d'un écran TribuZen (y compris en auto-critique, avant de montrer un écran à
  quelqu'un d'autre).
- L'Exemple A (menu dense mal regroupé) est directement transposable au capstone console GPU
  — l'angle "dashboard technique dense" identifié dans le brouillon de ce cours trouve ici
  son premier outil concret d'analyse.
- Le module A10 (design critique, déjà écrit) et ce module se complètent : ici on nomme le
  problème avec un vocabulaire précis, là-bas on structure la façon de le communiquer à un
  tiers.

## 6. Points clés

1. Les 10 heuristiques de Nielsen donnent un vocabulaire précis pour transformer une
   impression ("c'est confus") en un mécanisme nommé et actionnable.
2. La loi de Hick dit que le temps de décision croît avec le nombre d'options visibles — un
   argument direct pour regrouper un menu dense plutôt que tout exposer à plat.
3. La loi de Fitts dit que le temps pour atteindre une cible dépend de sa taille et de sa
   distance — fondement direct des zones tactiles 44px du futur module A06.
4. La loi de Miller concerne la mémoire de travail (5-9 éléments), PAS le nombre de choix
   (ça, c'est Hick) — ne jamais confondre les deux mécanismes.
5. Une heuristique est un guide à pondérer selon le contexte, jamais une règle absolue — une
   rupture délibérée de cohérence peut servir un objectif heuristique plus important.
6. Une critique de design n'est valide que si elle nomme un mécanisme vérifiable par un
   tiers — sinon c'est une préférence esthétique déguisée.

## 7. Seeds Anki

```
Quelles sont les heuristiques de Nielsen 6 et 9, en une phrase chacune ?|6 = reconnaissance plutôt que rappel (l'info nécessaire reste visible, pas à retenir) ; 9 = aide au diagnostic et récupération d'erreurs (le message dit quoi faire)
Que dit la loi de Hick ?|Le temps de décision augmente avec le nombre d'options visibles simultanément — un menu dense ralentit toute décision, pas seulement celle liée à l'option en trop
Que dit la loi de Fitts et à quoi sert-elle concrètement en UI ?|Le temps pour atteindre une cible dépend de sa taille et de sa distance — justifie directement la règle des zones tactiles 44px
Quelle est la différence entre la loi de Hick et la loi de Miller ?|Hick = coût du nombre de choix visibles à un instant donné ; Miller = coût de ce qu'on doit garder en mémoire entre deux moments — deux mécanismes différents
Pourquoi une heuristique n'est-elle pas une règle absolue ?|Parce que deux heuristiques peuvent entrer en tension (ex. cohérence vs prévention d'erreur sur une action dangereuse) — il faut les pondérer selon le contexte, pas les cocher mécaniquement
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a05-heuristiques-ux/`. Tu y critiques une maquette
> existante (nahual.fr ou nuada-audit) avec la grille des 10 heuristiques + 3 lois, pour
> trouver et documenter 5 vrais problèmes nommés — brief complet et rubrique de vérification
> dans le README du lab.
