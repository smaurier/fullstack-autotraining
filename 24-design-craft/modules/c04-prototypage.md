---
titre: Prototypage — connexions, overlays, variables, états
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [connexions entre frames, types de transition instant/dissolve/slide/push, overlay vs navigation complète, variable pilotant un état sans dupliquer de frame]
outcomes: [construire un prototype cliquable complet avec des transitions dont le type correspond à l'intention, distinguer un overlay d'une navigation complète selon que le contexte derrière doit rester visible, piloter l'état d'un composant par une variable plutôt que par des frames dupliquées]
prerequis: [c03-styles-tokens]
next: c05-dev-mode-handoff
tribuzen: prototype cliquable complet d'un flow TribuZen (onboarding ou GazettePreview) avec de vraies transitions configurées
last-reviewed: 2026-10
---

# Prototypage — connexions, overlays, variables, états

> **Outcomes — tu sauras FAIRE :** construire un prototype cliquable complet dont chaque
> transition correspond à une vraie intention (déplacement spatial vs changement d'état),
> distinguer un overlay d'une navigation complète selon que le contexte derrière doit rester
> visible, et piloter l'état d'un composant par une variable plutôt que par des frames
> dupliquées.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un prototype Figma composé uniquement de flèches statiques entre des frames figées ("clic ici
→ frame suivante") ne prouve rien de plus qu'un diagramme papier : il ne révèle ni le ressenti
réel d'une transition, ni si une modale doit garder le contexte visible derrière elle, ni
comment un composant doit se comporter selon un état qui peut changer plusieurs fois (ouvert/
fermé, chargé/en erreur). Un recruteur ou un pair qui teste le prototype en mode présentation
doit avoir l'impression d'utiliser une vraie application, pas de feuilleter un diaporama. Ce
module construit cette différence.

## 2. Théorie complète, concise

### 2.1 Connexions : le type de transition PORTE une intention

Une connexion relie un déclencheur (clic, hover) sur un élément à une destination (une autre
frame). Le type de transition choisi communique quelque chose de précis, pas une simple
préférence esthétique :

- **Instant** : aucune animation, changement immédiat — approprié pour une action qui ne
  nécessite aucune orientation spatiale (ex. une case à cocher qui change d'état).
- **Dissolve** (fondu) : suggère un **changement d'état** sans déplacement dans l'espace de
  l'interface — approprié pour un contenu qui se remplace sur place (ex. un chargement qui se
  résout en contenu).
- **Slide / Push** : suggère un **déplacement spatial** réel — approprié pour une navigation
  qui fait progresser l'utilisateur dans une hiérarchie (avancer dans un onboarding, ouvrir un
  écran de détail).

Choisir un slide pour un simple changement d'état (ou l'inverse) communique une fausse
intention à l'utilisateur qui teste le prototype — le type de transition n'est jamais un
détail cosmétique.

### 2.2 Overlay : garder le contexte visible, par choix

Un **overlay** est une frame qui se superpose à la frame de base SANS la remplacer — le
contexte derrière reste visible (souvent assombri) et parfois cliquable pour fermer l'overlay
(clic en dehors). C'est le mécanisme Figma pour prototyper une modale ou un popover. Une
**navigation complète**, à l'inverse, remplace entièrement la frame visible — le contexte
précédent disparaît tant qu'on ne revient pas en arrière explicitement.

Le critère de choix n'est pas la taille visuelle de l'élément qui apparaît (une modale peut
être très grande) mais une question précise : **est-ce que l'utilisateur doit pouvoir
percevoir qu'il n'a pas quitté son contexte de départ ?** Si oui, c'est un overlay.

### 2.3 Variables pilotant un état : UN composant, plusieurs apparences

Une **variable** (ex. un booléen `isOpen`, ou une énumération `status`: idle/loading/erreur/
succès) peut piloter l'apparence d'un MÊME composant à travers une action de prototypage (clic
→ "changer la valeur de la variable") plutôt que de naviguer entre N frames dupliquées, une
par état possible. C'est la même logique que la state machine du Bloc E (Rive, module E04) :
un seul objet, un état qui change, pas une collection de copies figées.

### 2.4 Pourquoi tester en mode présentation du début à la fin, pas écran par écran

Un prototype qui fonctionne frame par frame en mode édition peut échouer en mode présentation
réel (une connexion mal ciblée, un overlay qui ne se ferme pas). La seule vérification fiable
est de parcourir le flow ENTIER en mode présentation, du premier écran au dernier, exactement
comme le ferait un utilisateur réel ou un recruteur qui teste le livrable sans explication
orale.

## 3. Worked examples

### Exemple A — prototyper un flow `GazettePreview` complet

1. Écran 1 (déclenchement) → Écran 2 (chargement) : transition **dissolve**, parce qu'il n'y
   a aucun déplacement spatial, juste un changement d'état (en attente → chargé).
2. Écran 2 → Écran 3 (aperçu de la gazette) : transition **slide**, parce que l'utilisateur
   progresse réellement d'une étape à l'autre dans un flow linéaire.
3. Un bouton "Options d'envoi" sur l'écran 3 ouvre un **overlay** (pas une navigation
   complète) : l'utilisateur doit voir qu'il reste sur l'aperçu de la gazette, juste avec des
   options temporairement superposées.
4. Tester l'ensemble en mode présentation du début à la fin, sans repasser en mode édition
   entre chaque étape.

### Exemple B — piloter un statut GPU par variable plutôt que par 4 frames

Besoin : un composant de statut (idle/loading/erreur/succès) pour le capstone console GPU.

- **Mauvaise approche** : créer 4 frames séparées, une par statut, et prototyper une
  navigation entre elles — ça fonctionne visuellement mais ne représente pas la réalité d'un
  composant qui change d'état en place dans l'application.
- **Bonne approche** : créer UNE variable `status` à 4 valeurs, un seul composant dont
  l'apparence (couleur, icône, texte) dépend de cette variable, et des actions de
  prototypage qui changent la valeur de la variable plutôt que de naviguer entre frames — le
  composant reste physiquement au même endroit de l'écran, seul son état visuel change,
  exactement comme en production.

## 4. Pièges & misconceptions

- **Choisir un type de transition sans réfléchir à l'intention qu'il communique.** Voir
  2.1 — un slide pour un simple changement d'état, ou l'inverse, trompe l'utilisateur du
  prototype sur ce qui se passe réellement.

- **Confondre overlay et navigation complète pour une modale.** Voir 2.2 — le critère est
  "le contexte derrière doit-il rester perceptible", pas la taille de l'élément qui apparaît.

- **Dupliquer des frames pour représenter les états d'un même composant.** Voir
  l'Exemple B — ça fonctionne visuellement en prototype mais ne teste pas la vraie mécanique
  d'un composant qui change d'état en restant au même endroit (préparation directe au module
  E04 sur les state machines Rive).

- **Ne tester qu'écran par écran en mode édition, jamais le flow complet en mode
  présentation.** Voir 2.4 — une connexion mal ciblée ou un overlay mal fermé ne se révèle
  souvent qu'en parcourant tout le flow comme un vrai utilisateur le ferait.

## 5. Ancrage TribuZen

- Le prototype `GazettePreview` (Exemple A) devient un livrable testable directement en
  entretien ou avec un pair (Elda), sans explication orale préalable.
- La logique de variable pilotant un état (Exemple B) s'applique à tout composant TribuZen
  qui a plusieurs états réels (une routine faite/en cours/en retard) — à privilégier
  systématiquement sur la duplication de frames.
- Ce prototype devient la base directe du module C05 (Dev Mode/handoff) : un fichier déjà
  propre en prototypage se prépare plus facilement pour l'inspection dev.

## 6. Points clés

1. Le type de transition choisi (instant/dissolve/slide/push) communique une intention
   précise — déplacement spatial ou changement d'état, jamais un choix cosmétique neutre.
2. Un overlay garde le contexte derrière lui visible et perceptible ; une navigation complète
   le remplace entièrement — le critère de choix est la perception de contexte, pas la taille.
3. Une variable qui pilote l'apparence d'un composant (plutôt que des frames dupliquées par
   état) représente fidèlement un composant qui change d'état en restant au même endroit.
4. La seule vérification fiable d'un prototype est de le parcourir en mode présentation du
   début à la fin, comme le ferait un vrai utilisateur sans explication orale.
5. Prototyper des états par variable plutôt que par duplication de frames anticipe
   directement la logique des state machines du Bloc E (motion).

## 7. Seeds Anki

```
Que communique le choix entre une transition dissolve et une transition slide ?|Dissolve suggère un changement d'état sans déplacement spatial ; slide suggère une vraie progression/déplacement dans la hiérarchie de l'interface
Quel est le critère pour choisir un overlay plutôt qu'une navigation complète ?|Si le contexte derrière doit rester visible et perceptible par l'utilisateur, c'est un overlay ; sinon c'est une navigation complète
Pourquoi piloter l'état d'un composant par une variable plutôt que par des frames dupliquées ?|Une variable représente fidèlement un composant qui change d'état en restant au même endroit de l'écran, comme en production ; dupliquer des frames ne teste que l'apparence, pas la mécanique réelle
Pourquoi tester un prototype en mode présentation complet plutôt qu'écran par écran ?|Une connexion mal ciblée ou un overlay mal fermé ne se révèle souvent qu'en parcourant le flow entier comme un vrai utilisateur
Quel type de transition choisir pour une case à cocher qui change d'état ?|Instant — aucune orientation spatiale n'est nécessaire pour ce type de changement immédiat
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c04-prototypage/`. Tu y construis un prototype
> cliquable complet d'un flow TribuZen avec au moins une transition slide et un overlay —
> brief complet et rubrique de vérification dans le README du lab.
