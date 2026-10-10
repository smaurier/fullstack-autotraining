---
titre: Performance et accessibilité du mouvement
cours: 24-design-craft
bloc: E — Motion design (After Effects/Lottie + Rive)
notions: [budget de poids pour un fichier Lottie, prefers-reduced-motion, fallback statique obligatoire, mesure réelle vs estimation qualitative de performance]
outcomes: [mesurer et comparer le poids de fichiers Lottie/Rive à un budget cible, appliquer prefers-reduced-motion à chaque animation individuellement, produire un fallback statique fidèle pour chaque animation plutôt qu'un écran vide]
prerequis: [e05-choix-outil-motion]
next: aucun — dernier module du Bloc E
tribuzen: portfolio piece finale avec 2-3 animations de marque (Lottie) et 1 micro-interaction produit (Rive), poids total mesuré, prefers-reduced-motion respecté partout
last-reviewed: 2026-10
---

# Performance et accessibilité du mouvement

> **Outcomes — tu sauras FAIRE :** mesurer et comparer le poids de fichiers Lottie/Rive à
> un budget cible plutôt que de l'estimer, appliquer `prefers-reduced-motion` à chaque
> animation individuellement et pas seulement à une animation témoin, et produire un
> fallback statique fidèle pour chaque animation plutôt qu'un écran vide ou cassé.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Les modules E01 à E05 ont produit, un par un, des animations correctement construites et
correctement choisies. Ce module pose la question qui n'a encore jamais été posée à
l'échelle de l'ensemble : quand ces animations sont RASSEMBLÉES sur une même page portfolio
(2-3 Lottie + 1 Rive), que devient le poids total de la page, et que voit un visiteur qui a
activé la préférence système "réduire les animations" (une vraie préférence d'accessibilité,
pas un cas marginal) ? Si la réponse n'a jamais été mesurée ni testée, la page portfolio
finale — précisément le livrable destiné à un recruteur — peut être lente ou, pire,
inutilisable pour un visiteur sensible au mouvement.

## 2. Théorie complète, concise

### 2.1 Le poids ne se devine pas, il se mesure — à l'échelle de l'ensemble

Chaque animation individuelle a déjà été mesurée isolément (modules E03, E04). Ce module
ajoute la discipline de mesurer le poids CUMULÉ de toutes les animations d'une même page —
un total qui n'est pas la simple addition naïve si des ressources sont partagées (polices,
assets communs), mais qui doit dans tous les cas être un chiffre réel vérifié, jamais une
estimation du type "elles sont toutes petites donc ça doit aller".

### 2.2 `prefers-reduced-motion` — déjà posé au module B10, à appliquer sans exception

Le module B10 (Bloc B) a déjà introduit cette media query CSS, qui détecte une préférence
système d'accessibilité réelle (liée notamment aux troubles vestibulaires, où le mouvement
peut provoquer un malaise physique, pas juste une gêne esthétique). La discipline de CE
module est l'exhaustivité : vérifier et gérer cette préférence sur CHAQUE animation d'une
page (toutes les Lottie, la micro-interaction Rive), pas seulement sur une animation témoin
vérifiée une fois puis oubliée pour les suivantes.

### 2.3 Fallback statique — une image fidèle, jamais un vide

Quand `prefers-reduced-motion` est activé, l'animation ne doit pas simplement s'arrêter en
laissant un espace vide ou un premier frame incohérent (ex. une coche de succès figée à 0%
d'opacité, donc invisible) — elle doit être remplacée par une image statique qui représente
fidèlement l'ÉTAT FINAL ou l'état le plus significatif de l'animation. Un spinner de
chargement sans mouvement devient, par exemple, une icône de chargement statique
reconnaissable, pas un cercle vide ambigu.

### 2.4 Mesurer n'est pas facultatif même pour un "petit" fichier

Le piège le plus fréquent de ce module est de considérer la mesure comme optionnelle parce
que chaque fichier "a l'air léger" individuellement. La discipline établie dans tout ce bloc
(E03 à E06) est systématique : toute affirmation de performance est un chiffre vérifié,
jamais une impression, y compris quand l'intuition semble évidente.

## 3. Worked examples

### Exemple A — mesurer le poids cumulé de la page portfolio finale

1. Lister chaque asset de motion de la page : 2 animations Lottie de marque (ex. hero +
   illustration d'onboarding), 1 micro-interaction Rive (statut GPU du module E04).
2. Mesurer le poids de chaque fichier individuellement (déjà fait aux modules E03/E04), puis
   charger la page complète et mesurer le poids réel transféré au chargement (outil de
   mesure réseau du navigateur) — pas la somme arithmétique supposée, la mesure réelle.
3. Comparer ce total à un budget cible raisonnable pour une page portfolio (ordre de
   grandeur : quelques centaines de Ko pour l'ensemble des assets de motion, pas plusieurs
   Mo) et documenter l'écart s'il existe.

### Exemple B — fallback statique fidèle pour la state machine Rive du capstone

1. Activer `prefers-reduced-motion` (via les outils de développement du navigateur ou le
   réglage système) et observer le rendu actuel de la micro-interaction Rive du module E04.
2. Si le résultat est un état figé incohérent (ex. figé en plein milieu d'une transition
   loading → succès), produire un fallback statique explicite qui représente l'état "idle"
   ou l'état final pertinent selon le contexte, pas un frame arbitraire de la transition.
3. Vérifier que ce fallback reste visuellement cohérent avec le reste de la page (mêmes
   couleurs, même style) plutôt que de casser la mise en page.

## 4. Pièges & misconceptions

- **Vérifier `prefers-reduced-motion` sur une seule animation témoin puis supposer que les
  autres suivent la même logique.** Chaque animation a sa propre implémentation technique
  (Lottie vs Rive, par exemple) — la préférence doit être testée et gérée sur CHAQUE
  animation individuellement, voir 2.2.

- **Laisser un fallback vide ou un frame arbitraire de l'animation en cours.** Voir Exemple
  B — un visiteur qui a activé cette préférence d'accessibilité doit voir quelque chose de
  cohérent, jamais un vide ou un état visuel ambigu.

- **Additionner arithmétiquement les poids individuels déjà mesurés sans vérifier le poids
  réel chargé par la page.** Des ressources partagées (polices, assets communs entre
  animations) peuvent faire diverger la somme naïve du poids réel transféré — toujours
  mesurer la page complète, pas seulement sommer des mesures isolées.

- **Croire qu'un "petit" fichier dispense de le mesurer.** Voir 2.4 — la discipline de
  mesure systématique de ce bloc entier ne tolère aucune exception par intuition.

## 5. Ancrage TribuZen

- La page portfolio finale (TribuZen ou nahual.fr) qui rassemble les animations produites
  aux modules E01-E05 passe par cette double vérification avant d'être considérée comme un
  livrable terminé : poids total mesuré, `prefers-reduced-motion` géré sur CHAQUE animation.
- La state machine Rive du capstone (module E04) a désormais un fallback statique fidèle et
  documenté, pas seulement une version animée fonctionnelle.
- Ce module boucle le Bloc E : chaque animation produite depuis E01 doit repasser par cette
  double vérification avant son intégration finale dans un livrable présentable.

## 6. Points clés

1. Le poids d'une page qui cumule plusieurs animations doit être mesuré RÉELLEMENT au
   chargement, jamais estimé par simple addition des poids individuels déjà connus.
2. `prefers-reduced-motion` doit être vérifié et géré sur CHAQUE animation d'une page, pas
   sur une seule animation témoin supposée représentative des autres.
3. Un fallback statique doit représenter fidèlement l'état final ou le plus significatif de
   l'animation — jamais un vide ou un frame arbitraire figé en cours de transition.
4. Aucune exception à la discipline de mesure, même pour un fichier qui "a l'air léger" par
   intuition.
5. Ce module clôt le Bloc E : toute animation produite aux modules précédents doit repasser
   par cette double vérification avant intégration finale.

## 7. Seeds Anki

```
Pourquoi additionner les poids individuels déjà mesurés ne suffit-il pas pour une page qui cumule plusieurs animations ?|Des ressources partagées (polices, assets communs) peuvent faire diverger la somme naïve du poids réellement transféré au chargement — il faut mesurer la page complète
Sur combien d'animations d'une même page faut-il vérifier prefers-reduced-motion ?|Sur chacune individuellement — chaque implémentation technique (Lottie, Rive) gère cette préférence différemment, vérifier une seule animation témoin ne suffit pas
Que doit montrer un fallback statique quand prefers-reduced-motion est activé ?|L'état final ou le plus significatif de l'animation, de façon fidèle et cohérente avec le reste de la page — jamais un vide ou un frame arbitraire figé en transition
Pourquoi la préférence prefers-reduced-motion n'est-elle pas un cas marginal ?|Elle est liée notamment aux troubles vestibulaires, où le mouvement peut provoquer un malaise physique réel, pas seulement une gêne esthétique
Quelle discipline de mesure s'applique même à un fichier qui semble léger ?|Toute affirmation de performance doit être un chiffre réel vérifié, jamais une estimation qualitative, y compris quand l'intuition semble évidente
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/e06-performance-a11y-mouvement/`. Tu y assembles la
> page portfolio finale du Bloc E, mesures son poids réel et vérifies `prefers-reduced-motion`
> sur chaque animation — brief complet et rubrique de vérification dans le README du lab.
