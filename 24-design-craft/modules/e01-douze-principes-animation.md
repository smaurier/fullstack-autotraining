---
titre: Les 12 principes de l'animation, adaptés à l'écran
cours: 24-design-craft
bloc: E — Motion design (After Effects/Lottie + Rive)
notions: [easing, timing, anticipation, poids/masse perçue, les 12 principes Disney, animation comme communication vs décoration]
outcomes: [reconnaître les 4 principes les plus transférables à l'UI dans une animation existante, choisir une courbe d'easing selon l'intention, justifier par écrit pourquoi une micro-interaction anime ou n'anime pas]
prerequis: []
next: e02-after-effects-fondamentaux
tribuzen: états idle/loading/erreur/succès de TribuZen (invitation, pilotage GPU du capstone) — quelle animation communique quel état
last-reviewed: 2026-10
---

# Les 12 principes de l'animation, adaptés à l'écran

> **Outcomes — tu sauras FAIRE :** reconnaître les 4 principes les plus transférables à
> l'UI (easing, timing, anticipation, poids perçu) dans une animation existante, choisir
> une courbe d'easing selon l'intention communiquée, et justifier par écrit pourquoi une
> micro-interaction doit animer — ou ne doit PAS animer.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Un bouton "Déployer le GPU" change d'état après un clic : `idle` → `loading` → `succès`.
Deux implémentations possibles pour la transition `idle` → `loading` :

1. Le spinner apparaît instantanément, à vitesse linéaire, dès la frame 0.
2. Le bouton se contracte légèrement (anticipation), puis le spinner apparaît avec une
   accélération progressive (ease-in), tourne à vitesse constante.

La version 2 ne prend pas plus de place ni plus de budget de développement — elle demande
juste de connaître et d'appliquer consciemment deux principes vieux de 90 ans (anticipation,
easing). Sans ce module, on anime "à l'instinct" et le résultat est soit plat (version 1),
soit sur-animé sans raison. Les 12 principes de l'animation, posés en 1981 par deux
animateurs Disney (Frank Thomas, Ollie Johnston) pour le dessin animé traditionnel, se
transposent presque tous à l'interface — ce module isole les 4 qui comptent vraiment pour
une micro-interaction produit, pas les 12 en détail (certains, comme le "squash and
stretch" cartoonesque, ne s'appliquent pas à une UI sérieuse).

## 2. Théorie complète, concise

### 2.1 Les 12 principes — origine et tri pour l'écran

Les 12 principes couvrent du dessin animé complet (arcs, exagération, mise en scène). Pour
une interface produit, 4 principes concentrent presque toute la valeur ; les autres restent
utiles en motion de marque (Bloc E module 2-3) mais rarement en micro-interaction UI.

### 2.2 Timing — la vitesse comme information

Le *timing* est le nombre de frames (ou de millisecondes) qu'une action prend. Ce n'est pas
qu'une question de "fluide vs saccadé" : le timing communique la **nature** de l'action.
Un changement d'état instantané (0ms) signale une action système invisible (ex. une case à
cocher). Un timing de 150-300ms signale une transition d'interface perçue comme fluide sans
ralentir l'utilisateur. Au-delà de 400-500ms sur une action fréquente, l'utilisateur perçoit
une lenteur — le timing devient un coût UX, pas un supplément esthétique.

### 2.3 Easing — la courbe de vitesse comme intention

Une animation à vitesse constante (*linear*) paraît mécanique — rien dans le monde physique
n'accélère et ne décélère jamais. Trois familles d'easing et leur intention :

- **Ease-out** (démarre vite, ralentit à l'arrivée) : pour un élément qui ENTRE dans
  l'écran ou se pose (menu qui s'ouvre, carte qui apparaît). Communique "j'arrive et je
  m'installe".
- **Ease-in** (démarre lentement, accélère) : pour un élément qui PART ou disparaît (toast
  qui se referme, modal qui se ferme). Communique "je m'en vais".
- **Ease-in-out** : pour un mouvement qui reste à l'écran et se déplace d'un point A à un
  point B (drag, repositionnement). Communique une transition continue, pas une arrivée ou
  un départ.

Utiliser ease-out sur une sortie (au lieu d'ease-in) n'est pas juste "moins joli" — ça
communique l'inverse de ce qui se passe réellement (un élément qui semble accélérer en
disparaissant paraît "jeté" plutôt que "refermé").

### 2.4 Anticipation — préparer l'action avant qu'elle n'arrive

Un mouvement qui démarre nettement dans une direction, sans préparation, paraît abrupt.
L'anticipation introduit un micro-mouvement inverse ou préparatoire avant l'action
principale (le bouton qui se contracte légèrement avant que le spinner apparaisse,
l'exemple du §1). En UI, l'anticipation se limite à quelques frames (50-100ms) — jamais
un effet perceptible en soi, mais un signal que "quelque chose va se passer" qui rend
l'action suivante moins brutale.

### 2.5 Poids et masse perçue (follow-through / overshoot)

Un élément qui s'arrête net à sa position finale paraît rigide, sans masse. Un léger
dépassement (*overshoot*) suivi d'un retour (*settle*) — l'élément va légèrement au-delà de
sa cible puis revient — communique une masse et une élasticité, perçues comme "naturelles"
par le système visuel humain (c'est littéralement comment un objet physique réel se
comporte sous inertie). En UI, un overshoot de 2-5% de la distance parcourue suffit ; au-delà,
ça devient une distraction cartoonesque inadaptée à un produit sérieux (SaaS B2B, console
technique) — à réserver aux moments de célébration volontaire (succès, pas chaque clic).

### 2.6 Animation comme communication, jamais comme décoration gratuite

Principe transversal, pas un des 12 originaux mais la règle qui les chapeaute tous en UI :
chaque animation doit répondre à "qu'est-ce que ça communique à l'utilisateur que le texte
ou la couleur seuls ne communiquent pas ?". Si la réponse est "rien, c'est joli", c'est une
décoration — légitime en motion de marque pur (Bloc E module 2-3), jamais en micro-
interaction produit où chaque milliseconde ajoutée a un coût cognitif et un coût batterie.

## 3. Worked examples

### Exemple A — appliquer les 4 principes à la transition idle → loading → succès du GPU

1. **Anticipation** : au clic sur "Déployer", le bouton se contracte à 97% de sa taille sur
   80ms (ease-out) avant que l'état `loading` n'apparaisse — signale que l'action a été
   reçue avant même que le spinner démarre.
2. **Timing** : le spinner tourne à vitesse constante (rotation continue, pas d'easing sur
   une boucle infinie — l'easing n'a de sens que sur un mouvement avec un début et une fin).
3. **Easing** : la transition `loading` → `succès` (apparition d'une coche verte) utilise un
   ease-out de 200ms — la coche "arrive et se pose".
4. **Poids** : la coche dépasse légèrement sa taille finale (103%) puis revient à 100% sur
   les 50ms suivantes (overshoot) — signale la réussite avec un léger "rebond" de
   satisfaction, sans tomber dans le cartoonesque (overshoot contenu à 3%).

### Exemple B — reconnaître une animation mal timée sur une interface existante

Une modal de confirmation (TribuZen, suppression d'une invitation) s'ouvre en 600ms avec un
easing linéaire. Diagnostic avec la grille de ce module :
- Timing trop long (600ms sur une action fréquente = coût perçu de lenteur).
- Pas d'easing adapté : linéaire sur une entrée devrait être ease-out.
- Correction : 200-250ms, ease-out. Le contenu de la modal ne change pas, seule la courbe
  et la durée — preuve que la théorie de ce module s'applique sans toucher au visuel produit.

## 4. Pièges & misconceptions

- **Croire que "plus fluide" veut dire "plus lent".** Une animation lente n'est pas plus
  fluide, elle est juste plus lente — et perçue comme un obstacle au-delà de 300-400ms sur
  une action fréquente. La fluidité vient de l'easing correct, pas de la durée.

- **Appliquer un overshoot à chaque interaction.** Réservé aux moments de confirmation/
  célébration (succès d'une action importante) — sur un hover ou un focus, un overshoot
  systématique devient fatigant et nuit à la crédibilité d'un produit technique (console
  GPU, pas un jeu).

- **Utiliser ease-in sur une entrée par habitude.** Une entrée (élément qui apparaît)
  utilise ease-out (il "arrive et se pose") ; ease-in est pour les sorties. Inverser les deux
  communique l'inverse de ce qui se passe, même si l'œil non entraîné ne sait pas nommer
  pourquoi "ça sonne faux".

- **Traiter les 12 principes comme une checklist à appliquer intégralement partout.** La
  plupart (squash/stretch cartoonesque, exagération, mise en scène complexe) viennent du
  long métrage animé et n'ont pas leur place dans une micro-interaction produit. Les 4
  retenus ici (timing, easing, anticipation, poids) couvrent l'essentiel du transfert.

## 5. Ancrage TribuZen

Les transitions d'état `idle`/`loading`/`erreur`/`succès` de TribuZen (invitation familiale,
et le flow de pilotage GPU fictif du capstone) sont le terrain d'application direct :
- `idle` → `loading` : anticipation courte (contraction légère du contrôle), puis timing
  constant du spinner.
- `loading` → `succès` : ease-out + léger overshoot contenu (2-3%) — signale la réussite
  sans décoration gratuite.
- `loading` → `erreur` : PAS d'overshoot (une erreur n'est pas un moment de célébration),
  ease-in-out neutre, timing légèrement plus court (l'utilisateur veut comprendre l'erreur
  vite, pas savourer une transition).

## 6. Points clés

1. Timing = la durée comme information, pas qu'une question de fluidité — trop long devient
   un coût perçu au-delà de 400-500ms sur une action fréquente.
2. Easing = la courbe comme intention : ease-out pour une entrée, ease-in pour une sortie,
   ease-in-out pour un déplacement continu.
3. Anticipation = un micro-mouvement préparatoire (quelques frames) avant l'action
   principale, pas un effet visible en soi.
4. Poids/overshoot = un léger dépassement (2-5%) suivi d'un retour communique une masse
   naturelle — réservé aux moments de confirmation, pas systématique.
5. Toute animation doit répondre à "qu'est-ce que ça communique" — sinon c'est une
   décoration à réserver au motion de marque, jamais à la micro-interaction produit.

## 7. Seeds Anki

```
Que communique le timing d'une animation au-delà de sa fluidité ?|La nature de l'action — un timing trop long (>400-500ms) sur une action fréquente devient un coût UX perçu, pas un supplément esthétique
Quel easing utiliser pour un élément qui ENTRE dans l'écran, et pourquoi ?|Ease-out (démarre vite, ralentit à l'arrivée) — communique "j'arrive et je m'installe"
Quel easing utiliser pour un élément qui SORT de l'écran ?|Ease-in (démarre lentement, accélère) — communique "je m'en vais"
Qu'est-ce que l'anticipation dans une micro-interaction UI ?|Un micro-mouvement préparatoire de quelques frames (50-100ms) avant l'action principale, jamais un effet perceptible en soi
Quand réserver l'overshoot (léger dépassement puis retour) ?|Aux moments de confirmation/célébration (succès d'une action) — pas systématiquement, sous peine de fatiguer et de nuire au sérieux d'un produit technique
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/e01-douze-principes-animation/`. Tu y animes en
> After Effects une transition d'état idle → loading → succès (ex. déploiement GPU
> fictif), en appliquant explicitement timing, easing, anticipation et poids — puis
> l'exportes en Lottie et l'intègres dans une vraie page. Brief et rubrique dans le README
> du lab.
