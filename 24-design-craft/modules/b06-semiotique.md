---
titre: Sémiotique et communication visuelle
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [signe signifiant signifié de Saussure, triade de Peirce icône indice symbole, arbitraire du signe, redondance texte/image, convention visuelle apprise vs ressemblance naturelle]
outcomes: [classer un signe visuel icône/indice/symbole au sens de Peirce, distinguer un signifiant arbitraire d'un signifiant motivé, décider si une redondance texte/image aide ou alourdit une interface, corriger un signe ambigu en nommant précisément pourquoi il échoue]
prerequis: [b05-composition-grille]
next: b07-dessin-croquis
tribuzen: icônes de statut idle/loading/erreur/succès du pilotage GPU (capstone) et pictogrammes existants de nahual.fr/nuada-audit — vérifier que chaque signe porte vraiment le sens qu'on lui attribue
last-reviewed: 2026-10
---

# Sémiotique et communication visuelle

> **Outcomes — tu sauras FAIRE :** classer un signe visuel (icône, couleur, forme) selon qu'il
> ressemble à ce qu'il représente, qu'il en est la trace, ou qu'il en est la convention pure ;
> décider si une redondance texte/image sert l'utilisateur ou l'alourdit ; corriger un signe
> ambigu en nommant précisément le mécanisme qui échoue.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le capstone (console de pilotage GPU) prévoit un statut à quatre états : idle, loading,
erreur, succès. Le réflexe immédiat est de coder ça en couleur — gris, bleu, rouge, vert —
et de considérer le problème réglé. Mais un utilisateur daltonique (protanopie, la forme la
plus fréquente) ne distingue pas fiablement rouge et vert à faible saturation. Et rien dans
un rond rouge ne dit "erreur" de façon naturelle : c'est une convention apprise, pas une
ressemblance. Si cette convention n'est pas doublée d'un second signal (forme, icône, texte),
l'interface échoue silencieusement pour une partie des utilisateurs — pas parce que la
couleur est mal choisie, mais parce qu'on a confondu "signe que moi je comprends" et "signe
qui porte son sens de façon fiable pour n'importe qui".

Ce module donne le vocabulaire pour nommer précisément ce qui se joue dans ce genre de choix,
plutôt que de le régler au pifomètre ou — pire — de le découvrir en test utilisateur (module
A.9) après coup.

## 2. Théorie complète, concise

### 2.1 La triade de Saussure — signifiant, signifié, et leur lien arbitraire

Ferdinand de Saussure (linguiste, début XXe) décompose tout signe en deux faces indissociables :

- **Le signifiant** : la forme perçue elle-même — une couleur, une forme, un son, un mot.
  Pour notre rond rouge : la couleur rouge, matériellement.
- **Le signifié** : le concept associé — "danger", "erreur", "stop".

Le point central de Saussure, et le plus souvent oublié en design : **le lien entre les deux
est arbitraire**, pas naturel. Rien dans la longueur d'onde du rouge ne dit intrinsèquement
"danger" — c'est une association apprise par convention culturelle (déjà vu en B.2 : le rouge
signifie chance et prospérité en Chine, pas danger). Un signifiant n'a de sens que parce
qu'une communauté a appris à l'associer à un signifié donné, et cette association peut varier
d'une communauté à l'autre, ou changer avec le temps (le rond rouge pour "stop" lui-même est
une convention du XXe siècle, pas une évidence intemporelle).

**Conséquence pratique directe** : si un signe repose sur une convention apprise, il faut
vérifier que le public cible a bien appris CETTE convention précise — ne jamais supposer
qu'un signe "parle de lui-même" universellement.

### 2.2 La triade de Peirce — icône, indice, symbole

Charles Sanders Peirce (philosophe/logicien, contemporain de Saussure) propose une
classification complémentaire, plus fine pour trancher des cas concrets d'interface : elle
classe les signes selon la NATURE du lien entre signifiant et signifié, pas seulement
l'arbitraire ou non de ce lien.

- **Icône** — le signifiant **ressemble** à ce qu'il représente. Une icône d'imprimante qui
  dessine une imprimante stylisée ; une icône de corbeille qui dessine une corbeille. Le lien
  est motivé par la ressemblance visuelle, donc plus facilement décodable sans apprentissage
  préalable — mais seulement si la ressemblance reste reconnaissable à la taille et au niveau
  de détail affiché (une icône trop stylisée perd sa part iconique et devient un symbole pur).
- **Indice** — le signifiant est la **trace, la conséquence ou la contiguïté causale** de ce
  qu'il représente, sans lui ressembler. De la fumée indique un feu (elle n'y ressemble pas,
  elle en est la conséquence physique). En interface : une barre de progression qui avance est
  un indice d'un calcul en cours — elle ne "ressemble" pas au calcul, elle en est la trace
  observable en temps réel.
- **Symbole** — le lien est **purement conventionnel, appris, sans ressemblance ni causalité**.
  Le rouge = erreur n'a aucune ressemblance avec une erreur et n'en est pas la trace causale :
  c'est une pure convention apprise, exactement comme un mot de n'importe quelle langue. La
  plupart des icônes d'interface, une fois qu'on regarde précisément, sont en réalité des
  symboles déguisés en icônes : une disquette pour "sauvegarder" ne ressemble plus à rien que
  la quasi-totalité des utilisateurs actuels n'ont jamais manipulé physiquement — elle a migré
  d'icône (ressemblance réelle à l'objet, dans les années 1990) à symbole pur (convention
  apprise par répétition, aujourd'hui).

Ces trois catégories ne sont pas étanches : un même signe peut glisser de l'une à l'autre avec
le temps (disquette) ou combiner les trois (une icône de corbeille rouge qui clignote combine
icône — ressemblance à une corbeille —, et symbole — le rouge = alerte).

### 2.3 Redondance texte/image — quand elle aide, quand elle trahit

Un signe purement symbolique (donc non devinable sans apprentissage) est fragile seul. Deux
stratégies pour le renforcer, à ne pas confondre :

- **La redondance qui AIDE** : associer un texte court au symbole pour lever une ambiguïté
  réelle, particulièrement utile pour l'accessibilité (un lecteur d'écran ne "voit" pas la
  couleur rouge, il a besoin du texte ou d'un attribut équivalent pour restituer "erreur") et
  pour la reconnaissance rapide (le cerveau confirme par deux canaux indépendants, plus
  robuste qu'un seul). C'est strictement nécessaire quand le signe est un symbole pur sans
  composante iconique de secours (cf. module A.6, accessibilité conception : ne jamais coder
  un statut uniquement par la couleur).
- **La redondance qui TRAHIT** : répéter la même information sans qu'elle lève une ambiguïté
  réelle — un bouton "Supprimer" avec une icône de corbeille ET le mot "Supprimer" ET une
  bulle d'aide qui dit "cliquez ici pour supprimer" empile trois signaux identiques sans
  qu'aucun des deux premiers ne soit ambigu. Ce surplus alourdit visuellement l'interface et,
  à l'excès, peut lire comme un manque de confiance dans l'utilisateur (infantilisation).

Le test pour trancher n'est jamais "est-ce que ça peut aider un peu" (presque toujours vrai)
mais "le signe de base est-il un symbole pur, ambigu, ou dépendant d'un canal sensoriel
inaccessible à une partie du public — et seulement dans ce cas, la redondance est nécessaire,
pas optionnelle.

## 3. Worked examples

### Exemple A — classer les 4 états de statut GPU du capstone

États à communiquer : idle, loading, erreur, succès.

1. **Idle** — généralement un gris neutre + absence d'animation. Le gris seul est un
   **symbole faible** (convention "neutre/inactif" apprise, pas universelle) — souvent
   accompagné d'une icône "pause" ou d'un simple tiret, qui eux sont plus proches de l'**icône**
   (une pause ressemble conceptuellement à l'arrêt).
2. **Loading** — un spinner animé est un **indice** : son mouvement continu est la trace
   observable d'un calcul en cours, pas une ressemblance arbitraire. C'est pour ça qu'un
   spinner qui s'arrête de tourner sans disparaître se lit instantanément comme un bug : la
   trace causale (le mouvement = le calcul avance) est rompue.
3. **Erreur** — rouge + souvent une icône triangle/point d'exclamation. Le rouge est un
   **symbole pur** (aucune ressemblance, aucune trace causale avec une erreur). Le triangle
   d'alerte, en revanche, est hérité de la signalétique routière — un symbole lui aussi, mais
   plus robuste car appris très largement, hors contexte numérique.
4. **Succès** — vert + coche. Même diagnostic que l'erreur : symbole pur pour le vert, la
   coche est plus proche d'une convention graphique universelle (on "cocherait" de la même
   façon dans de nombreux contextes d'écriture manuelle).

**Conclusion actionnable** : idle et erreur reposent fortement sur des symboles purs (couleur
+ forme conventionnelle) — ce sont EXACTEMENT les deux états qui doivent être doublés d'un
texte explicite pour rester lisibles sans dépendre de la perception des couleurs ni d'une
convention culturelle supposée acquise. Loading, parce qu'il s'appuie sur un indice
(mouvement réel), est intrinsèquement plus robuste — mais reste à doubler d'un texte pour
l'accessibilité (un lecteur d'écran ne perçoit pas l'animation).

### Exemple B — la disquette, étude de la dérive icône → symbole

Le pictogramme "sauvegarder" (une disquette 3,5 pouces stylisée) est un cas pédagogique
classique : dans les années 1990, c'était une véritable **icône** (ressemblance directe à un
objet manipulé quotidiennement). En 2026, la quasi-totalité des utilisateurs n'a jamais tenu
de disquette physique — le signe a glissé vers le **symbole pur** : il fonctionne uniquement
parce qu'il a été répété et appris par convention logicielle (bouton "sauvegarder" toujours
représenté ainsi), pas parce qu'il ressemble encore à quoi que ce soit de reconnu. Nommer
cette dérive évite une erreur fréquente : croire qu'une icône "universellement comprise"
l'est par ressemblance naturelle, alors qu'elle l'est uniquement par répétition culturelle —
ce qui veut dire qu'elle peut échouer totalement auprès d'un public qui n'a jamais été exposé
à cette convention logicielle précise (utilisateurs très jeunes, ou peu familiers du
vocabulaire visuel du logiciel).

## 4. Pièges & misconceptions

- **Croire qu'une icône "parle d'elle-même" universellement.** La plupart des icônes d'UI
  sont en réalité des symboles conventionnels appris par répétition (disquette, voir Exemple
  B), pas des icônes au sens de Peirce. Vérifier systématiquement : est-ce que ce signe
  ressemble vraiment à ce qu'il représente, ou est-ce que je le comprends uniquement parce
  que je l'ai déjà vu cent fois dans d'autres logiciels ?

- **Confondre indice et symbole.** Un spinner qui tourne est un indice (trace réelle d'un
  calcul en cours) ; la couleur rouge d'une erreur est un symbole (convention pure, aucune
  trace causale). Les deux demandent des vérifications différentes : un indice cassé (spinner
  figé) trahit un vrai bug de synchronisation signe/état ; un symbole mal choisi (rouge sans
  autre canal) trahit un problème d'accessibilité ou d'universalité culturelle, pas un bug.

- **Ajouter de la redondance texte/image par réflexe de prudence, sans vérifier si elle lève
  une vraie ambiguïté.** Voir 2.3 — le test est "ce signe est-il un symbole pur ambigu ou
  dépendant d'un canal inaccessible", pas "est-ce que plus d'explication peut faire de mal".

- **Supposer qu'un signe testé et compris par soi-même l'est universellement.** Un designer
  qui connaît déjà la convention logicielle (et la plupart des conventions UI du marché) perd
  la capacité de voir qu'un signe est un symbole opaque pour un public qui ne les a jamais
  rencontrées — d'où l'intérêt du test utilisateur (module A.9) pour vérifier, pas supposer.

## 5. Ancrage TribuZen

- Les quatre états de statut GPU du capstone (idle/loading/erreur/succès) doivent être
  audités avec la grille de l'Exemple A avant la maquette finale : lesquels reposent sur un
  symbole pur, lesquels ont besoin d'un texte en plus de la couleur.
- Les pictogrammes déjà présents sur nahual.fr ou nuada-audit peuvent être repassés dans la
  même grille (icône/indice/symbole) pour vérifier qu'aucun bouton d'action critique ne repose
  uniquement sur un symbole non doublé.
- Toute future icône ajoutée à TribuZen devrait être classée explicitement AVANT d'être
  validée, pas choisie seulement parce qu'elle "a l'air parlante".

## 6. Points clés

1. Un signe se décompose en signifiant (la forme perçue) et signifié (le concept) — leur lien
   est le plus souvent arbitraire et appris, jamais naturel par défaut (Saussure).
2. La triade de Peirce classe un signe selon la nature de ce lien : icône (ressemblance),
   indice (trace causale), symbole (convention pure sans ressemblance ni causalité).
3. La plupart des icônes d'interface, à l'usage, dérivent vers le symbole pur (la disquette)
   — leur lisibilité tient à la répétition culturelle, pas à une ressemblance réelle.
4. Un indice cassé (ex. un spinner figé) signale un bug de synchronisation ; un symbole
   ambigu (ex. couleur seule) signale un problème d'accessibilité ou d'universalité.
5. La redondance texte/image n'est utile que si le signe de base est un symbole pur ambigu ou
   dépend d'un canal sensoriel inaccessible — sinon elle alourdit sans bénéfice réel.
6. Ne jamais supposer qu'un signe "parle de lui-même" pour un public qui n'a pas appris la
   même convention que soi — vérifier, pas supposer.

## 7. Seeds Anki

```
Quelle est la différence entre le signifiant et le signifié d'un signe (Saussure) ?|Le signifiant est la forme perçue (ex. la couleur rouge) ; le signifié est le concept associé (ex. "danger") — leur lien est arbitraire, appris, pas naturel.
Quelles sont les trois catégories de la triade de Peirce ?|Icône (ressemblance réelle au référent), indice (trace ou conséquence causale), symbole (lien purement conventionnel appris, sans ressemblance ni causalité).
Pourquoi l'icône de disquette pour "sauvegarder" est-elle un bon exemple de dérive icône → symbole ?|Dans les années 1990 elle ressemblait à un objet réel manipulé (icône) ; aujourd'hui elle fonctionne uniquement par convention logicielle apprise, sans ressemblance reconnue par la majorité des utilisateurs (symbole pur).
Un spinner de chargement qui tourne est-il un indice ou un symbole ?|Un indice — son mouvement est la trace causale réelle d'un calcul en cours, pas une convention arbitraire.
Quand la redondance texte/image aide-t-elle vraiment une interface ?|Quand le signe de base est un symbole pur ambigu, ou dépend d'un canal sensoriel inaccessible à une partie du public (ex. la couleur seule pour un utilisateur daltonique ou un lecteur d'écran).
Pourquoi ne faut-il jamais coder un statut d'erreur uniquement par la couleur rouge ?|Parce que le rouge = erreur est un symbole pur (convention apprise, aucune ressemblance ni trace causale) — il échoue pour les utilisateurs daltoniques et n'est pas restitué par un lecteur d'écran sans texte associé.
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b06-semiotique/`. Tu y critiques sémiotiquement une
> interface réelle (nahual.fr, nuada-audit, ou les icônes de statut du capstone) : classer
> chaque signe au sens de Peirce, identifier les échecs, proposer une correction — brief
> complet et rubrique de vérification dans le README du lab.
