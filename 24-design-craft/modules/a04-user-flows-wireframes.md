---
titre: User flows & wireframes basse fidélité
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [user flow vs wireframe, fidélité comme outil de communication, embranchement et point d'erreur, wireframe haute-fidélité déguisée, structure avant esthétique]
outcomes: [tracer un user flow complet avec décisions et points d'erreur, produire des wireframes basse fidélité sans glisser vers une fausse haute fidélité, faire comprendre un chemin à un tiers sans explication orale]
prerequis: [a03-architecture-information]
next: a05-heuristiques-ux
tribuzen: flow complet GazettePreview de TribuZen (pas encore designé), du déclenchement à la prévisualisation avec au moins une branche d'erreur
last-reviewed: 2026-10
---

# User flows & wireframes basse fidélité

> **Outcomes — tu sauras FAIRE :** tracer un user flow complet avec ses décisions et ses
> points d'erreur, produire des wireframes basse fidélité qui restent volontairement pauvres
> en finition, et t'assurer qu'un tiers comprend un chemin complet sans explication orale.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le module précédent (A03) a situé `GazettePreview` dans le sitemap de TribuZen, mais sans
dire comment on y arrive, ni ce qui se passe si quelque chose échoue (ex. aucune routine
enregistrée à prévisualiser, ou un enfant n'a pas encore de profil complet). Dessiner
directement l'écran final de `GazettePreview` dans Figma, avec de vraies couleurs TribuZen
et la vraie police Fraunces, répond à "à quoi ça ressemble" avant même d'avoir répondu à "par
quel chemin on y arrive, et que se passe-t-il quand ça ne marche pas".

Ce module sépare explicitement les deux questions : le **user flow** répond à la seconde (le
chemin, les décisions, les échecs), le **wireframe basse fidélité** répond à la première,
mais volontairement en basse résolution pour ne pas polluer la discussion de structure avec
des débats de couleur prématurés.

## 2. Théorie complète, concise

### 2.1 User flow : un graphe, pas un écran

Un **user flow** est un diagramme représentant le **chemin logique** qu'un utilisateur suit
pour accomplir une tâche : une suite d'étapes, des points de décision (embranchements), et
des points d'erreur ou de sortie. Ce n'est PAS une maquette — un flow peut se dessiner
entièrement avec des rectangles et des flèches, sans qu'aucun écran ne soit encore conçu.

Notation minimale suffisante :
- **Rectangle** = une étape/écran (nommé, pas dessiné).
- **Losange** = une décision (ex. "une routine existe-t-elle déjà ?").
- **Flèche** = une transition, étiquetée par l'action qui la déclenche (ex. "clique sur
  Prévisualiser").
- Un flow sans AUCUN losange est suspect : ça signifie qu'aucun cas alternatif n'a été
  envisagé, ce qui est rarement vrai dans un produit réel.

### 2.2 Wireframe basse fidélité : la fidélité comme outil de communication, pas comme manque de compétence

Un **wireframe basse fidélité** représente un écran avec le minimum de détail visuel : gris,
placeholders ("Texte"), formes génériques pour les images, pas de couleur de marque, pas de
police finale. Le niveau de fidélité n'est pas un indicateur du temps qu'on a passé ou de sa
compétence Figma — c'est un **choix délibéré de communication**.

Pourquoi délibéré : si un wireframe de revue contient déjà la vraie palette sauge/terracotta
et la vraie typo Fraunces+Inter, les retours qu'il va recevoir porteront sur "j'aime/j'aime
pas la couleur" plutôt que sur "est-ce que cette structure d'écran répond au besoin". Garder
le wireframe pauvre force la discussion à rester sur la structure — exactement le même
principe que le wireframe "papier ou kit gris" cité dans le brouillon de ce cours.

### 2.3 Le piège de la haute-fidélité déguisée

Un wireframe qui utilise des polices système par défaut mais des proportions, espacements et
compositions déjà très travaillés (ombres, radius soignés, alignements pixel-perfect) est une
**haute fidélité déguisée** : il a l'air "pas fini" en surface, mais il porte déjà des
décisions esthétiques fortes qui influenceront la discussion autant qu'une vraie maquette
colorée. La bonne pratique : accepter des espacements grossiers et des proportions
approximatives à ce stade — l'inconfort visuel est voulu, il garde la conversation sur la
structure.

### 2.4 Un flow complet a plusieurs wireframes reliés, pas un écran isolé

Une erreur fréquente de lecture du mot "wireframe" : penser à UN écran. Un user flow complet
mobilise en réalité **plusieurs** wireframes reliés entre eux par les mêmes transitions que
le flow a décrites en 2.1 — le flow est le squelette logique, les wireframes sont la chair
visuelle (pauvre) de chaque étape de ce squelette. Produire seulement l'écran "principal" du
flow sans les écrans d'erreur ou d'état vide revient à documenter un chemin heureux qui ne
reflète pas l'usage réel.

## 3. Worked examples

### Exemple A — user flow complet de GazettePreview avec une branche d'erreur

1. Étape 1 (rectangle) : "Dashboard famille" — point de départ, bouton "Voir la gazette".
2. Décision (losange) : "Au moins une routine enregistrée cette semaine ?"
   - Si NON → Étape "État vide gazette" (message + action "créer une routine"), fin de flow
     alternatif.
   - Si OUI → continue.
3. Étape 2 : "Génération de la prévisualisation" (état de chargement, car potentiellement
   asynchrone).
4. Décision : "Génération réussie ?"
   - Si NON (erreur technique) → Étape "Erreur de génération" (message + action "réessayer"),
     retour possible vers Étape 2.
   - Si OUI → continue.
5. Étape 3 : "GazettePreview affichée" — état final heureux du flow.

Ce flow a 5 étapes nommées et 2 décisions — sans jamais dessiner un seul écran réel. Il
révèle déjà 2 écrans qu'un dev pressé oublie souvent (état vide, état d'erreur) avant même
d'ouvrir Figma.

### Exemple B — wireframes basse fidélité des 4 écrans du flow A

Pour chaque rectangle du flow A (Dashboard famille, État vide, Génération, GazettePreview
affichée, Erreur de génération), produire un wireframe gris : zones rectangulaires nommées
("Zone titre", "Zone contenu", "Bouton action principal"), aucune couleur de marque, police
système par défaut. Chaque wireframe porte le nom exact de l'étape du flow dont il est issu
— la traçabilité entre flow et wireframes doit être explicite, pas implicite.

## 4. Pièges & misconceptions

- **Dessiner directement l'écran "heureux" sans flow préalable.** Sans le flow, les cas
  d'état vide et d'erreur (Exemple A) sont presque toujours oubliés — ils n'apparaissent
  qu'en codant, trop tard pour une vraie décision de conception.

- **Un flow sans aucune décision (losange).** Signale que les cas alternatifs n'ont pas été
  envisagés — à relire systématiquement avant de passer au wireframe (voir 2.1).

- **Haute fidélité déguisée** (voir 2.3) — polices système mais compositions déjà abouties.
  Se forcer à des proportions volontairement grossières à ce stade.

- **Confondre flow et wireframe.** Le flow décrit le CHEMIN (voir 2.1), le wireframe décrit
  un ÉCRAN (voir 2.2) — un flow complet a plusieurs wireframes, jamais un seul (voir 2.4).

- **Montrer uniquement l'écran principal, pas les écrans d'erreur/vide produits par le
  flow.** Un flow qui révèle 2 décisions doit produire au moins 2 écrans alternatifs en plus
  de l'écran heureux — sinon le travail du flow n'a servi à rien.

## 5. Ancrage TribuZen

- Le flow `GazettePreview` (Exemple A) devient la référence à suivre pour câbler les vrais
  états (vide, chargement, erreur, succès) une fois ce flow passé en code — directement
  réutilisable comme spec dans le futur lab de handoff (module A11).
- La discipline "flow avant wireframe, wireframe gris avant couleur" s'applique à tout futur
  écran TribuZen, pas seulement à `GazettePreview`.
- Les wireframes gris produits ici serviront de base de départ aux labs Figma du Bloc C
  (auto-layout, composants) — sans qu'aucune décision de couleur/typo n'ait encore été prise
  à ce stade, volontairement.

## 6. Points clés

1. Un user flow est un graphe de chemin (étapes, décisions, erreurs) — pas une maquette,
   pas un écran.
2. Un flow sans aucune décision (losange) signale presque toujours des cas alternatifs non
   envisagés.
3. La basse fidélité d'un wireframe est un choix de communication délibéré : elle force la
   discussion sur la structure plutôt que sur l'esthétique.
4. La haute fidélité déguisée (polices système mais compositions déjà abouties) annule ce
   bénéfice sans que ça se voie au premier regard.
5. Un flow complet produit PLUSIEURS wireframes reliés — montrer seulement l'écran heureux
   ignore le travail fait sur les décisions du flow.

## 7. Seeds Anki

```
Quelle est la différence entre un user flow et un wireframe ?|Le flow décrit le chemin logique (étapes, décisions, erreurs) ; le wireframe décrit l'intérieur d'un écran précis — deux niveaux différents
Pourquoi un wireframe sans aucun losange (décision) dans le flow associé est suspect ?|Ça signifie qu'aucun cas alternatif (erreur, état vide) n'a été envisagé, ce qui est rarement vrai dans un produit réel
Pourquoi garder un wireframe en basse fidélité (gris, sans couleur de marque) ?|Pour que les retours portent sur la structure de l'écran plutôt que sur des débats esthétiques prématurés
Qu'est-ce qu'une "haute fidélité déguisée" en wireframe ?|Un wireframe qui utilise des polices système mais des compositions/espacements déjà très aboutis — il porte déjà des décisions esthétiques malgré une apparence "pas finie"
Pourquoi un flow complet produit-il plusieurs wireframes et jamais un seul ?|Chaque étape/rectangle du flow correspond à un écran distinct (dont les états d'erreur et d'état vide) — montrer seulement l'écran heureux ignore les décisions du flow
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a04-user-flows-wireframes/`. Tu y traces le flow complet
> de `GazettePreview` avec au moins une branche d'erreur, puis tu produis les wireframes
> basse fidélité de chaque écran du flow — brief complet et rubrique de vérification dans le
> README du lab.
