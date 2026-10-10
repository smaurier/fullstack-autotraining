---
titre: Perception visuelle et lois de la Gestalt
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [proximité, similarité, continuité, clôture, figure/fond, point focal, conflit entre lois de la Gestalt]
outcomes: [reconnaître les 6 lois de la Gestalt dans une interface existante, grouper un même contenu de 3 façons différentes en appliquant une loi distincte à chaque fois, identifier un conflit entre deux lois et trancher lequel doit dominer]
prerequis: [b03-typographie]
next: b05-composition-grille
tribuzen: un dashboard dense de TribuZen (FamilyDashboard) regroupé visuellement de 3 façons différentes sans changer le contenu
last-reviewed: 2026-10
---

# Perception visuelle et lois de la Gestalt

> **Outcomes — tu sauras FAIRE :** reconnaître les 6 lois de la Gestalt à l'œuvre dans une
> interface existante, grouper un même contenu de 3 façons différentes en appliquant chaque
> fois une loi distincte et non ambiguë, et identifier un conflit entre deux lois pour
> trancher consciemment laquelle doit dominer.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

`FamilyDashboard` de TribuZen affiche, sur un même écran, des routines, des enfants et des
statuts. Aujourd'hui, la disposition de cet écran a probablement été décidée "à l'œil" —
certains éléments sont proches parce que ça semblait logique, certaines couleurs se
répètent parce qu'elles appartenaient déjà à la palette. Le résultat peut très bien être
lisible sans que personne ne sache dire PAR QUEL MÉCANISME il l'est.

Ce module nomme ce mécanisme. Les lois de la Gestalt ne sont pas des recommandations de bon
goût : ce sont des descriptions documentées de la façon dont le cerveau humain organise des
formes brutes en groupes et en relations, QUE LE DESIGNER LES CONNAISSE OU NON. Un designer
qui les ignore les subit quand même — il produit des groupements involontaires. Un designer
qui les connaît les choisit.

## 2. Théorie complète, concise

### 2.1 Proximité

Des éléments spatialement proches sont perçus comme appartenant à un même groupe, même sans
aucune autre indication visuelle (pas de cadre, pas de couleur commune). C'est la loi la
plus utilisée implicitement dans toute interface : l'espacement entre deux éléments EST déjà
une déclaration de groupement, que ce soit voulu ou non. Un espacement incohérent entre des
éléments qui devraient être liés (ex. un label et son champ de saisie) casse silencieusement
cette perception.

### 2.2 Similarité

Des éléments qui partagent une forme, une couleur ou une taille sont perçus comme liés, MÊME
quand ils sont physiquement éloignés les uns des autres. C'est le mécanisme qui permet, par
exemple, de signaler que trois badges de statut dispersés sur un écran appartiennent à la
même catégorie sémantique simplement en leur donnant la même couleur — sans les rapprocher
spatialement.

### 2.3 Continuité (bonne continuation)

L'œil suit une ligne ou une courbe fluide plutôt que de la décomposer en segments discontinus
ou en angles brisés. Une série d'éléments alignés le long d'une courbe est perçue comme une
séquence continue même si chaque élément est, en soi, une forme indépendante — c'est ce
mécanisme qui rend lisible une timeline ou une progression d'étapes alignées.

### 2.4 Clôture (closure)

Le cerveau complète mentalement une forme incomplète dès que l'essentiel de ses indices est
présent — il "ferme" la forme lui-même. C'est le mécanisme derrière un logo qui suggère une
forme sans la dessiner entièrement (un cercle suggéré par trois arcs disjoints reste perçu
comme un cercle), ou derrière une carte dont le contour n'est marqué que par une ombre légère
plutôt qu'un trait continu — le cerveau referme le contour tout seul.

### 2.5 Figure/fond

Distinction entre l'élément perçu comme le sujet actif de l'attention (la figure) et
l'arrière-plan sur lequel il se détache (le fond). Cette distinction n'est pas toujours
stable : une interface où le contraste figure/fond est ambigu (ex. une carte dont la couleur
de fond est trop proche de la couleur du fond de page) produit une lecture hésitante, où
l'œil doit faire un effort actif pour décider ce qui est devant et ce qui est derrière.

### 2.6 Point focal (emphasis)

Un élément visuellement dominant (par taille, contraste, couleur ou isolement) capte
l'attention en premier, avant tout le reste de l'écran. Une interface sans aucun point focal
clair laisse l'œil errer sans savoir par où commencer ; une interface avec plusieurs points
focaux de force égale crée une compétition visuelle non résolue.

### 2.7 Quand deux lois entrent en conflit

Les lois de la Gestalt ne s'appliquent pas en isolation — elles peuvent se contredire sur un
même écran. Cas typique : deux éléments sont **proches spatialement** (loi de proximité, qui
pousse à les percevoir comme un groupe) mais ont des **couleurs très différentes** (loi de
similarité, qui pousse à les percevoir comme distincts). Le cerveau ne reste pas neutre face
à ce conflit — il tranche, souvent en faveur de la loi dont le signal est le plus fort
(typiquement la similarité de couleur l'emporte sur une proximité modérée). Un designer qui
ignore ce mécanisme produit un groupement accidentel et non voulu ; un designer qui le
connaît choisit délibérément laquelle des deux lois doit l'emporter, en renforçant le signal
de celle qu'il veut dominante (ex. augmenter l'espacement pour neutraliser une proximité non
voulue, ou unifier la couleur pour neutraliser une dissemblance non voulue).

## 3. Worked examples

### Exemple A — identifier les lois à l'œuvre sur un dashboard existant

Observation d'un `FamilyDashboard` TribuZen existant, carte par carte :

1. Les cartes de routines du même enfant sont-elles rapprochées spatialement (proximité) ou
   dispersées sur l'écran ? Si rapprochées, c'est déjà une déclaration implicite de
   groupement par enfant — à vérifier qu'elle est voulue.
2. Les badges de statut (fait/à faire/en retard) partagent-ils une couleur cohérente à
   travers tout l'écran (similarité), ou chaque carte utilise-t-elle une palette locale
   différente qui casse la reconnaissance immédiate du statut ?
3. Y a-t-il un élément qui capte clairement l'attention en premier (point focal), ou l'œil
   doit-il chercher activement où commencer ?

### Exemple B — grouper le même contenu de 3 façons différentes

Avec la même liste de routines (contenu identique, aucun mot changé) :

1. **Par proximité seule** : rapprocher spatialement les routines d'un même enfant, sans
   aucune couleur distinctive — le groupement se lit uniquement par l'espacement.
2. **Par similarité seule** : disperser les routines sur l'écran sans les rapprocher, mais
   donner à chaque enfant une couleur d'accent cohérente sur toutes ses routines — le
   groupement se lit uniquement par la couleur, malgré l'éloignement spatial.
3. **Par continuité** : aligner les routines d'un enfant le long d'une ligne de temps
   horizontale continue (une frise d'heures de la journée) — le groupement se lit par la
   position sur une trajectoire partagée, pas par la proximité brute ni par la couleur.

Chaque version communique une information légèrement différente : la version 1 dit "ces
éléments sont ensemble ICI" ; la version 2 dit "ces éléments appartiennent à la même
catégorie PARTOUT sur l'écran" ; la version 3 dit "ces éléments suivent un ORDRE temporel".

## 4. Pièges & misconceptions

- **Croire que ces lois sont des "trucs esthétiques" optionnels.** Ce sont des mécanismes de
  perception documentés par la psychologie cognitive — ils s'appliquent MÊME quand le
  designer ne les connaît pas. La question n'est jamais "dois-je les utiliser" mais "est-ce
  que je les choisis consciemment ou est-ce que je les subis".

- **Confondre proximité et similarité.** Voir §2.7 — deux lois différentes, qui peuvent
  entrer en conflit sur un même écran. Rapprocher deux éléments (proximité) ne suffit pas à
  les faire percevoir comme liés si leur dissemblance visuelle (similarité) envoie un signal
  contraire plus fort.

- **Multiplier les points focaux de force égale.** Si tout est mis en avant (plusieurs
  éléments également contrastés, également grands), rien ne l'est réellement — le point
  focal n'existe que par contraste RELATIF au reste de l'écran.

- **Compter sur la clôture pour masquer un contour réellement absent.** La clôture fonctionne
  quand l'essentiel des indices de la forme est présent (ex. 3 arcs bien positionnés qui
  suggèrent un cercle) — elle ne fonctionne pas si trop peu d'indices sont donnés, le
  cerveau échoue alors simplement à reconnaître une forme cohérente.

## 5. Ancrage TribuZen

- Le `FamilyDashboard` existant peut être audité avec la grille des 6 lois pour repérer les
  groupements involontaires (proximité non voulue, similarité cassée par une palette
  incohérente) avant toute refonte visuelle.
- Le choix entre grouper par proximité, par similarité ou par continuité (Exemple B) doit
  être fait consciemment selon l'information qu'on veut réellement communiquer (localisation
  vs catégorie vs ordre), pas par défaut.
- Tout futur point focal ajouté à une interface TribuZen (ex. une alerte, un CTA principal)
  doit être évalué par contraste relatif au reste de l'écran, pas en isolation.

## 6. Points clés

1. Proximité : des éléments spatialement proches sont perçus comme un groupe, même sans
   autre indice visuel.
2. Similarité : des éléments qui partagent forme/couleur/taille sont perçus comme liés, même
   éloignés spatialement.
3. Continuité : l'œil suit une ligne ou une courbe fluide plutôt que des angles brisés.
4. Clôture : le cerveau complète une forme incomplète si l'essentiel de ses indices est
   présent.
5. Figure/fond : distinction entre le sujet perçu (figure) et l'arrière-plan (fond) — une
   interface ambiguë sur ce point devient illisible.
6. Proximité et similarité peuvent entrer en conflit sur un même écran — le designer doit
   choisir consciemment laquelle doit dominer en renforçant son signal.

## 7. Seeds Anki

```
Quelle est la différence entre la loi de proximité et la loi de similarité ?|Proximité = des éléments proches spatialement sont perçus comme un groupe ; similarité = des éléments qui partagent forme/couleur/taille sont perçus comme liés même éloignés
Que se passe-t-il quand la proximité et la similarité entrent en conflit sur un même écran ?|Le cerveau tranche en faveur du signal le plus fort, souvent la similarité de couleur sur une proximité modérée — le designer doit renforcer consciemment le signal qu'il veut dominant
Qu'est-ce que la loi de clôture (closure) ?|Le cerveau complète mentalement une forme incomplète si l'essentiel de ses indices visuels est présent, par exemple un cercle suggéré par trois arcs disjoints
Pourquoi une interface sans aucun point focal pose-t-elle problème ?|L'œil n'a aucun endroit par où commencer à lire l'écran — le point focal n'existe que par contraste relatif au reste de l'écran
Les lois de la Gestalt s'appliquent-elles seulement si le designer les connaît ?|Non — elles s'appliquent toujours, que le designer les connaisse ou non. Les ignorer ne les désactive pas, ça produit juste des groupements involontaires
Qu'est-ce que la distinction figure/fond ?|La distinction entre l'élément perçu comme le sujet actif (figure) et l'arrière-plan sur lequel il se détache (fond) — ambiguë, elle rend la lecture hésitante
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b04-gestalt/`. Tu y regroupes un même contenu de 3
> façons différentes en appliquant chaque fois une loi de la Gestalt distincte et non
> ambiguë — brief complet et rubrique de vérification dans le README du lab.
