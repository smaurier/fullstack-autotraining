---
titre: Interactions & effects — scroll, hover, transitions sans code
cours: 24-design-craft
bloc: D — Framer (outil)
notions: [animations déclenchées au scroll, états hover natifs, transitions entre états, prefers-reduced-motion dans un outil no-code, discipline b10 appliquée sans écrire de ligne de code]
outcomes: [configurer une interaction scroll ou hover justifiée sans écrire de code, appliquer la discipline du module b10 (feedback/orientation, jamais décoration gratuite) dans un contexte no-code, vérifier et documenter le comportement d'une interaction avec le mouvement réduit activé]
prerequis: [d02-canvas-breakpoints-stacks]
next: d04-composants-proprietes
tribuzen: landing page vitrine de TribuZen enrichie d'interactions scroll/hover justifiées, mouvement réduit respecté
last-reviewed: 2026-10
---

# Interactions & effects — scroll, hover, transitions sans code

> **Outcomes — tu sauras FAIRE :** configurer une interaction de scroll ou de hover
> réellement justifiée sans écrire une ligne de code, appliquer la discipline du
> module B10 (feedback ou orientation, jamais décoration gratuite) dans un contexte
> no-code où la facilité technique rend la tentation plus forte, et vérifier
> concrètement le comportement d'une interaction avec la préférence de mouvement
> réduit activée.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

La structure responsive de la landing page TribuZen (module D02) est posée, mais elle
est statique — rien ne bouge. Framer propose, en quelques clics, des animations au
scroll, des effets au survol, des transitions entre états. C'est précisément cette
facilité qui constitue le piège de ce module : en code, animer quoi que ce soit coûte
du temps (écrire la logique, tester les cas limites), ce qui dissuade naturellement
d'empiler des effets gratuits. Dans Framer, le même effet coûte un clic — la barrière
naturelle contre la décoration disparaît, alors que la règle de fond (module B10 du
Bloc B) reste exactement la même : une animation sert à donner un feedback ou une
orientation, jamais à "faire joli" sans fonction.

## 2. Théorie complète, concise

### 2.1 Le catalogue natif Framer, en trois familles

- **Scroll** : une apparition progressive d'un élément quand il entre dans le
  viewport, un effet de parallax léger (un élément qui défile à une vitesse
  différente du reste) — tout réglable par des curseurs visuels, sans code.
- **Hover** : un changement visuel au survol (couleur, taille, position) — défini
  comme un état alternatif du même élément, pas un second élément séparé.
- **Transitions** : le passage entre deux états d'un composant (ex. ouvert/fermé d'un
  menu) avec une courbe de vitesse réglable — conceptuellement la même chose que les
  courbes d'easing déjà vues en motion design (module E01), appliquées ici sans AE.

### 2.2 La règle de B10 s'applique ICI, sans exception liée à l'outil

Le module B10 (Bloc B) a posé la règle : une micro-interaction se justifie par un
**feedback** (confirmer qu'une action a eu lieu) ou une **orientation** (aider à
comprendre où on se trouve, où regarder), jamais par pure décoration. Rien dans la
nature no-code de Framer ne change cette règle — au contraire, elle compte *davantage*
ici, précisément parce que l'absence de friction technique encourage à en ajouter
sans réfléchir. Avant de configurer une interaction, la question à se poser reste
celle de B10 : "qu'est-ce que cette animation COMMUNIQUE à l'utilisateur, en plus de
ce que montre déjà l'état statique ?"

### 2.3 `prefers-reduced-motion`, même dans un outil visuel

La préférence système "mouvement réduit" (déjà vue en B10 et en motion design E06)
reste pertinente même sans écrire de media query : Framer propose un réglage
équivalent qui permet de définir un comportement alternatif (statique ou atténué)
quand cette préférence est active côté utilisateur. Ignorer ce réglage parce que
"c'est no-code donc ça ne concerne que le code" est une erreur — la préférence
utilisateur ne dépend pas de l'outil qui a produit le site, elle dépend du système de
la personne qui le consulte.

### 2.4 Pourquoi la facilité technique est le vrai sujet du module

La compétence technique (cliquer pour ajouter un effet) est triviale dans Framer — ce
module ne porte quasiment pas sur "comment faire techniquement", il porte sur "quand
décider de le faire". La vraie compétence évaluée ici est la même discipline de
jugement que celle du Bloc B, pas une compétence d'outil nouvelle.

## 3. Worked examples

### Exemple A — un hover de carte, justifié

Besoin : donner un feedback clair que les cartes de fonctionnalité (module D02) sont
cliquables/interactives, pas juste des blocs de texte statiques.
1. État hover : légère élévation visuelle (ombre plus marquée) + changement de couleur
   de bordure.
2. Justification écrite : "communique que la carte répond à l'interaction, oriente
   vers l'action possible" — un critère de B10 (feedback) explicitement rempli.
3. Vérification mouvement réduit : le changement de couleur de bordure reste actif
   (il n'implique pas de mouvement), l'élévation (qui peut impliquer une translation)
   est désactivée ou réduite dans le réglage équivalent Framer.

### Exemple B — une apparition au scroll, à justifier ou écarter

Besoin apparent : "les sections apparaissent en fondu quand on scrolle, ça fait plus
moderne."
1. Appliquer le test de B10 : est-ce un feedback (confirme une action) ? Non, il n'y a
   pas d'action utilisateur. Est-ce une orientation (aide à comprendre où regarder) ?
   Faiblement — l'ordre de lecture est déjà clair par la mise en page statique.
2. Conclusion honnête : cet effet est probablement DÉCORATIF, pas fonctionnel, au sens
   de la règle du module — soit on l'écarte, soit on le justifie autrement (ex. guider
   l'œil sur une page très longue où l'ordre de lecture n'est pas évident sans lui).
   Le module n'interdit pas l'effet, il interdit de l'ajouter SANS se poser la question.

## 4. Pièges & misconceptions

- **"C'est no-code donc ça ne coûte rien, j'en ajoute partout."** Voir 2.4 — le coût
  technique a disparu, pas le coût cognitif pour l'utilisateur qui subit trop
  d'animations ; la règle de jugement de B10 reste entière.

- **Ignorer le réglage mouvement réduit parce que "Framer gère ça tout seul".** Framer
  propose le réglage, il ne l'active pas automatiquement à la bonne granularité — le
  vérifier explicitement comme en Exemple A, pas le supposer.

- **Confondre "ça a l'air plus moderne" et "ça communique quelque chose de plus."**
  Voir Exemple B — la question de B10 n'est jamais esthétique, toujours fonctionnelle.

## 5. Ancrage TribuZen

- La landing page vitrine (D02) reçoit ici ses premières interactions, chacune
  justifiée par écrit selon la grille B10 avant d'être conservée.
- Le réglage mouvement réduit de cette page devient le premier cas vérifié avant le
  Bloc E (motion design), où la même exigence reviendra sur des animations plus
  complexes (Lottie, Rive).

## 6. Points clés

1. Framer propose nativement scroll, hover et transitions, entièrement configurables
   sans écrire de code.
2. La règle du module B10 (feedback ou orientation, jamais décoration gratuite)
   s'applique sans exception, et compte davantage ici car la facilité technique
   abaisse la barrière contre l'excès.
3. Le réglage mouvement réduit équivalent existe dans Framer et doit être vérifié
   explicitement pour chaque interaction ayant du mouvement.
4. La compétence du module est un jugement (quand animer), pas une compétence
   technique (comment animer, qui est triviale dans l'outil).
5. Un effet qui ne remplit ni la fonction de feedback ni celle d'orientation doit être
   écarté ou re-justifié autrement, jamais conservé par défaut.

## 7. Seeds Anki

```
Quelles sont les 3 familles d'interactions natives Framer vues dans ce module ?|Scroll (apparition progressive, parallax), hover (état alternatif au survol), transitions entre états
La règle du module B10 change-t-elle parce que Framer est no-code ?|Non — elle s'applique sans exception, et compte davantage car la facilité technique encourage la décoration gratuite
Pourquoi vérifier explicitement le réglage mouvement réduit dans Framer ?|Le réglage existe mais n'est pas activé automatiquement à la bonne granularité — il faut le configurer et le tester, pas le supposer géré
Quelle question poser avant de garder une animation de scroll "parce que ça fait moderne" ?|Est-ce qu'elle donne un feedback ou une orientation réelle, ou est-ce une pure décoration à écarter ou re-justifier
Quelle est la vraie compétence évaluée par ce module ?|Un jugement (quand animer), pas une compétence technique — la technique est triviale dans l'outil
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/d03-interactions-effects/`. Tu y ajoutes à la
> landing page des interactions scroll/hover justifiées selon la grille B10, avec
> vérification du mouvement réduit — brief complet et rubrique de vérification dans
> le README du lab.
