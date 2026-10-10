---
titre: Conventions de plateforme — HIG (iOS) et Material Design (Android)
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [Human Interface Guidelines, navigation par onglets et gestes natifs, Material Design, élévation et FAB et ripple, se conformer vs s'écarter consciemment, limite honnête liée à Tamagui]
outcomes: [reconnaître les conventions HIG et Material sur une interface donnée, décider quand s'y conformer et quand s'en écarter consciemment, documenter un écart de convention native sans jamais casser un geste fonctionnel]
prerequis: [b11-direction-artistique]
next: 
tribuzen: comparaison conceptuelle d'un écran TribuZen en déclinaisons web/HIG/Material, limite Tamagui signalée explicitement si non disponible
last-reviewed: 2026-10
---

# Conventions de plateforme — HIG (iOS) et Material Design (Android)

> **Outcomes — tu sauras FAIRE :** reconnaître les conventions HIG et Material sur une
> interface donnée, décider explicitement quand s'y conformer (attentes natives fortes) et
> quand s'en écarter consciemment pour une identité de marque, et documenter chaque écart
> sans jamais casser un geste fonctionnel natif.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Si TribuZen devait un jour exister en app mobile native (iOS et Android) plutôt qu'en web
seul, une question se pose immédiatement : le même écran de liste de routines doit-il
ressembler à un écran iOS natif sur iPhone, à un écran Android natif sur un téléphone
Android, ou garder une apparence identique partout ? Répondre "comme on sent" revient à
ignorer deux systèmes de conventions construits depuis plus d'une décennie par Apple et
Google, avec de vraies attentes d'usage derrière chaque choix.

Ce module construit la méthode pour répondre à cette question consciemment : connaître les
conventions, décider où s'y plier et où s'en écarter, et documenter chaque écart plutôt que
de le subir sans s'en apercevoir.

## 2. Théorie complète, concise

### 2.1 Human Interface Guidelines (Apple / iOS)

- **Navigation par onglets en bas d'écran** (tab bar) : les sections principales d'une app
  restent accessibles en permanence, en bas, où le pouce atteint facilement (lien direct avec
  la loi de Fitts déjà vue en [[a05-heuristiques-ux]] : zone proche et large, atteinte rapide).
- **Gestes natifs** : le swipe depuis le bord gauche pour revenir en arrière est une attente
  système profondément ancrée — casser ce geste (même pour une bonne raison visuelle) produit
  une frustration immédiate et récurrente, pas une simple surprise ponctuelle.
- **Grands titres (large titles)** qui occupent beaucoup d'espace en haut d'écran puis
  rétrécissent au scroll — convention visuelle reconnaissable d'une app "qui se comporte
  comme chez elle" sur iOS.
- **Composants système reconnaissables** (boutons, champs, sélecteurs) dont l'apparence suit
  les mises à jour du système — un choix de ne pas les personnaliser profite automatiquement
  des évolutions futures d'Apple.

### 2.2 Material Design (Google / Android)

- **Élévation simulée par des ombres** : contrairement à une ombre purement décorative,
  l'élévation Material représente une hauteur physique CONCEPTUELLE — un élément plus élevé
  (plus d'ombre) est perçu comme plus proche de l'utilisateur et plus important dans la pile
  d'interaction, pas juste "plus joli".
- **FAB (Floating Action Button)** : bouton circulaire flottant réservé à L'action principale
  de l'écran (une seule à la fois, jamais plusieurs FAB en concurrence) — convention qui
  rejoint directement le principe du point focal unique vu en [[b09-hierarchie-visuelle]].
- **Effet "ripple"** : une onde qui part du point exact de contact au toucher — un feedback
  tactile immédiat qui répond à la raison légitime "feedback d'état" déjà vue en
  [[b10-mouvement-micro-interactions]].

### 2.3 Quand se conformer, quand s'écarter consciemment

**Se conformer** quand l'utilisateur a une attente NATIVE forte et fonctionnelle — le geste
de retour, la position de l'action principale, l'accessibilité système (taille de police
système, VoiceOver/TalkBack). S'en écarter ici ne surprend pas agréablement : ça frustre,
parce que l'utilisateur a appris ce geste sur TOUTES ses autres apps, pas seulement sur
celle-ci.

**S'écarter consciemment** quand une identité de marque forte a besoin de se distinguer
visuellement (palette, typographie, formes de composants) — à condition stricte de ne JAMAIS
casser un geste ou une attente FONCTIONNELLE native, seulement l'esthétique de surface.
Documenter chaque écart (quelle convention, pourquoi elle est volontairement différente) est
la différence entre un choix de marque assumé et une incohérence non maîtrisée.

### 2.4 Limite honnête à assumer explicitement pour ce module

Une comparaison complète et rigoureuse suppose un même code source cross-platform (comme
Tamagui, prévu au cours 06) capable de produire réellement un rendu web, iOS et Android à
partir d'une même base, pour comparer un VRAI résultat exécuté plutôt qu'une supposition.
Ce chantier (`21-design-system/labs/lab-08-tamagui-de-zero`) n'était pas construit au
22/09/2026. Tant qu'il ne l'est pas, ce module et son lab se limitent à une comparaison
**conceptuelle et visuelle** (maquettes Figma des trois déclinaisons, raisonnement écrit sur
les écarts), sans rendu cross-platform réellement exécuté — à documenter explicitement comme
telle plutôt qu'à masquer cette limite sous un faux semblant de preuve technique.

## 3. Worked examples

### Exemple A — un écran TribuZen "liste de routines" en 3 déclinaisons

1. **Web générique** (base actuelle de TribuZen) : navigation latérale ou top bar, boutons
   arrondis cohérents avec `design.md`, aucune convention de plateforme mobile particulière.
2. **Déclinaison HIG** : navigation par tab bar en bas (Routines, Famille, Gazette, Profil),
   grand titre "Routines" qui rétrécit au scroll, geste de retour natif préservé pour toute
   navigation en profondeur (ex. détail d'une routine).
3. **Déclinaison Material** : même structure de tab bar adaptée aux conventions Android
   (bottom navigation bar légèrement différente visuellement), FAB "+" pour ajouter une
   routine (action principale unique de cet écran), élévation visible sur les cartes de
   routine pour indiquer qu'elles sont interactives (pressables).
4. Écart assumé documenté : la palette sauge/terracotta reste identique dans les 3
   déclinaisons (choix de marque volontaire) — mais les FORMES de composants (tab bar, FAB,
   élévation) suivent chaque convention native, parce que ce sont des attentes fonctionnelles,
   pas esthétiques.

### Exemple B — un geste qu'on ne doit jamais casser

Besoin fictif : une direction artistique très distinctive souhaite remplacer le geste de
retour natif par un bouton personnalisé en haut à droite, pour "renforcer l'identité".
Analyse selon 2.3 : ceci casse une attente FONCTIONNELLE (le swipe retour), pas seulement
esthétique — à refuser, quelle que soit la force de l'argument de marque. Le bouton
personnalisé peut coexister EN PLUS du geste natif préservé, jamais à sa place.

## 4. Pièges & misconceptions

- **Traiter HIG et Material comme de simples styles visuels interchangeables.** Certains
  éléments (FAB, ripple, élévation côté Material ; grands titres, tab bar, geste de retour
  côté HIG) portent une vraie fonction d'usage, pas seulement un look.

- **Casser un geste fonctionnel natif pour une raison purement esthétique.** Voir Exemple B —
  la règle stricte du module : jamais de compromis sur le fonctionnel, de la liberté sur
  l'esthétique de surface.

- **Multiplier les FAB ou actions "principales" sur un même écran.** Contredit directement le
  principe du point focal unique de [[b09-hierarchie-visuelle]] — un FAB par écran, pas plus.

- **Présenter une comparaison théorique comme un rendu cross-platform réellement testé.**
  Voir 2.4 — tant que Tamagui n'est pas prêt, l'honnêteté impose de documenter la limite,
  jamais de la dissimuler sous une fausse preuve d'exécution réelle.

## 5. Ancrage TribuZen

- L'écran "liste de routines" (Exemple A) devient le cas de référence pour toute future
  déclinaison mobile native de TribuZen, si ce chantier se concrétise un jour.
- La règle "jamais casser un geste fonctionnel natif pour l'esthétique" (Exemple B) s'ajoute
  à la checklist de handoff ([[a11-design-ops-handoff]]) dès qu'un composant mobile natif
  sera envisagé.
- La limite Tamagui (2.4) reste un sujet à revérifier explicitement avant de prétendre que ce
  module est "complètement" pratiqué en conditions réelles cross-platform.

## 6. Points clés

1. HIG (navigation par onglets, gestes natifs, grands titres) et Material (élévation, FAB,
   ripple) sont des conventions avec de vraies fonctions d'usage, pas de simples styles.
2. Se conformer aux attentes NATIVES fonctionnelles (gestes, position des actions) ; s'écarter
   consciemment seulement sur l'esthétique de surface pour une identité de marque assumée.
3. Un geste fonctionnel natif (ex. swipe retour) ne doit jamais être cassé, quelle que soit la
   force de l'argument de marque — un ajout esthétique peut coexister, jamais s'y substituer.
4. Le FAB Material est réservé à une seule action principale par écran — cohérent avec le
   principe du point focal unique.
5. Sans Tamagui fonctionnel, la comparaison cross-platform de ce module reste conceptuelle et
   doit être documentée comme telle, jamais présentée comme un rendu réellement testé.

## 7. Seeds Anki

```
Quelle est la fonction réelle de l'élévation en Material Design, au-delà du style ?|Elle représente une hauteur physique conceptuelle : un élément plus élevé est perçu comme plus proche et plus important dans la hiérarchie d'interaction
Pourquoi ne jamais remplacer le geste de retour natif par un bouton personnalisé ?|C'est une attente fonctionnelle apprise sur toutes les apps de l'utilisateur — la casser frustre systématiquement, l'identité de marque doit s'exprimer sur l'esthétique, pas sur le geste
Combien de FAB (Floating Action Button) un écran Material doit-il avoir au maximum ?|Un seul — il représente l'action principale unique de l'écran, cohérent avec le principe du point focal unique
Quand est-il légitime de s'écarter des conventions HIG/Material ?|Sur l'esthétique de surface (palette, typo, formes) pour une identité de marque assumée — jamais sur une attente fonctionnelle native
Pourquoi ce module limite-t-il son lab à une comparaison conceptuelle plutôt qu'un rendu cross-platform réel ?|Parce que Tamagui, l'outil cross-platform prévu au cours 06, n'était pas construit au 22/09/2026 — mieux vaut documenter la limite honnêtement que simuler un faux rendu exécuté
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b12-conventions-plateforme/`. Tu y compares un écran
> TribuZen en 3 déclinaisons conceptuelles web/HIG/Material, en documentant honnêtement la
> limite Tamagui si elle s'applique encore — brief complet et rubrique de vérification dans
> le README du lab.
