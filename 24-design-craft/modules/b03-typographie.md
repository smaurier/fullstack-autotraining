---
titre: Typographie comme discipline
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [anatomie de la lettre, classifications serif sans-serif slab script display, histoire du plomb aux variable fonts, kerning vs tracking, leading, veuves et orphelines, mesure de ligne, hiérarchie et grille éditoriale]
outcomes: [nommer les parties d'une lettre et classer une police dans sa famille historique, distinguer kerning et tracking sans les confondre, corriger une mesure de ligne et des veuves/orphelines sur une page réelle, justifier un pairing typographique par la théorie plutôt qu'au goût]
prerequis: [b02-theorie-couleur]
next: b04-gestalt
tribuzen: pairing Fraunces (serif display) + Inter (sans-serif texte) de design.md — comprendre par la théorie pourquoi ce contraste fonctionne, puis corriger la micro-typographie de nahual.fr
last-reviewed: 2026-10
---

# Typographie comme discipline

> **Outcomes — tu sauras FAIRE :** nommer les parties d'une lettre et situer une police dans
> sa famille historique, distinguer sans les confondre le kerning et le tracking, corriger
> une mesure de ligne et des veuves/orphelines sur une page réelle, et justifier un pairing
> typographique par la théorie plutôt qu'au goût.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

`design.md` de TribuZen a déjà tranché un pairing : Fraunces en display (titres) et Inter en
texte courant. Si on demande "pourquoi ces deux polices ensemble plutôt que deux autres ?",
la réponse honnête aujourd'hui ressemble à celle déjà posée pour la couleur en b02 — "ça
allait bien". Un recruteur ou un client qui demande d'étendre le système (ajouter une
troisième police pour du code affiché, ou remplacer Inter par une police propriétaire) ne
peut pas être servi par une réponse de goût.

En même temps, `nahual.fr` existe déjà en page réelle, écrite sans grille éditoriale
consciente. Ouvrir cette page aujourd'hui révèle probablement, sans qu'on l'ait cherché, au
moins une ligne veuve (un mot ou une courte ligne isolée en bas de paragraphe) et une mesure
de ligne trop large sur certains blocs de texte — des défauts invisibles tant qu'on ne sait
pas les nommer, et qui fatiguent silencieusement la lecture. Ce module donne le vocabulaire
et la méthode pour les voir, les nommer, et les corriger.

## 2. Théorie complète, concise

### 2.1 Anatomie de la lettre — le vocabulaire de base

Une lettre se décompose en parties nommées, utilisées ensuite pour comparer des polices
entre elles sans vague à l'âme :

- **x-height** : hauteur des minuscules sans hampe (la hauteur d'un "x"). Deux polices à la
  même taille en points peuvent paraître très différentes en taille perçue si leur x-height
  diffère — c'est souvent la vraie cause d'un "ça a l'air trop petit" malgré une taille
  identique en pixels.
- **Hampe montante (ascender) / hampe descendante (descender)** : la partie d'une lettre
  comme "h" ou "l" qui dépasse au-dessus de l'x-height, ou comme "p"/"g" qui descend sous la
  ligne de base.
- **Empattement (serif) / linéale (sans-serif)** : le petit trait terminal à l'extrémité des
  traits d'une lettre (serif) ou son absence (sans-serif, littéralement "sans empattement").
- **Fût** : le trait vertical principal d'une lettre (le "jambage" d'un "h" ou d'un "n").
- **Contre-forme (counter)** : l'espace fermé ou semi-fermé à l'intérieur d'une lettre (le
  "trou" d'un "o", d'un "e" ou d'un "a"). Une contre-forme trop petite à faible taille
  d'affichage rend une police illisible en petit corps (texte d'interface dense, ex. labels
  de formulaire) même si elle est parfaitement lisible en grand (titre).
- **Terminal** : la façon dont un trait se termine (droit, arrondi, en pointe) — une
  signature visuelle de la police au même titre que son empattement.

### 2.2 Classifications réelles — situer une police, pas la deviner

- **Serif** : quatre sous-familles historiques distinctes, pas une seule catégorie.
  **Humanist** (empattements organiques, hérités de la calligraphie à la plume, ex. famille
  proche de Jenson) ; **transitional** (contraste modéré entre pleins et déliés, empattements
  plus géométriques, ex. famille proche de Times) ; **didone** (fort contraste, empattements
  très fins, ex. famille proche de Bodoni — Fraunces, utilisée par TribuZen, s'inspire d'une
  tradition didone/display adoucie par des courbes plus organiques, voir §2.4) ; **slab
  serif** (empattements épais, rectangulaires, construction proche du sans-serif avec un
  empattement ajouté — catégorie à part car sa lisibilité en petit corps se comporte comme un
  sans-serif, pas comme un serif classique).
- **Sans-serif** : trois sous-familles. **Grotesque** (premières sans-serif du XIXe, formes
  un peu irrégulières) ; **géométrique** (construite sur des formes géométriques pures,
  cercles et lignes droites, ex. famille proche de Futura) ; **humanist sans** (formes
  géométriques mais proportions issues de l'écriture humaine, meilleure lisibilité en texte
  long — Inter, utilisée par TribuZen, appartient à cette famille).
- **Script** : imite l'écriture manuscrite, liée ou non — usage display quasi exclusif,
  jamais en texte courant (lisibilité trop faible à petit corps).
- **Display** : conçue pour être vue en grand (titres, affiches), pas pour être lue en
  continu — contraste fort, personnalité marquée, souvent illisible ou fatigante en corps de
  texte.

### 2.3 Histoire condensée — du plomb aux variable fonts

- **Caractères mobiles (Gutenberg, XVe siècle)** : chaque lettre est une pièce de métal
  physique, fondue une fois pour une taille et un poids donnés. Changer de taille = fondre un
  nouveau jeu de caractères.
- **Photocomposition (XXe siècle)** : la lettre devient une image projetée, agrandissable
  optiquement — premier découplage entre le dessin de la lettre et sa taille physique.
- **Fontes numériques (fin XXe)** : la lettre devient un contour vectoriel (PostScript,
  TrueType) — un seul fichier numérique sert toutes les tailles, mais un poids (regular,
  bold...) reste un fichier séparé.
- **Variable fonts (format OpenType depuis 2016)** : un seul fichier contient un espace
  continu d'axes (le plus courant : `wght` pour le poids, de 100 à 900 sans paliers fixes ;
  aussi `wdth` pour la largeur, `slnt` pour l'inclinaison). Conséquence directe pour un
  design system (cours 06) : une seule fonte variable peut remplacer 6 ou 8 fichiers de poids
  fixes, et une interface peut interpoler le poids d'un texte en continu (ex. un hover qui
  épaissit légèrement un label) — impossible avec les fontes à poids fixes d'avant 2016.

### 2.4 Micro-typographie — le niveau du détail invisible qui compte

- **Kerning** : ajustement de l'espace entre DEUX lettres spécifiques dont la combinaison
  produit un espace visuellement faux (ex. "AV" où le "A" et le "V" laissent un trou visuel
  si on ne les rapproche pas légèrement). Le kerning est intégré dans la police elle-même
  (table de paires de kerning) et activé par défaut dans Figma/CSS (`font-kerning: normal`).
- **Tracking** : espacement appliqué UNIFORMÉMENT à un groupe entier de caractères ou à un
  bloc de texte (ex. un peu plus de tracking positif sur un petit label en majuscules pour
  compenser la densité visuelle des capitales). **Piège le plus fréquent du domaine** :
  confondre les deux. Le kerning corrige UNE paire précise sans toucher au reste ; le tracking
  modifie TOUT un bloc de façon égale. Un designer qui "ajoute du tracking pour corriger un
  problème de kerning localisé" dérègle tout le bloc pour corriger un seul endroit.
- **Leading (interlignage)** : distance verticale entre deux lignes de base successives.
  Trop serré, le texte devient difficile à suivre ligne à ligne (l'œil accroche la ligne du
  dessous) ; trop large, le texte perd sa cohésion de bloc.
- **Veuve / orpheline** : une **veuve** est la dernière ligne d'un paragraphe isolée seule en
  haut d'une colonne ou d'une page suivante ; une **orpheline** est la première ligne d'un
  paragraphe isolée seule en bas d'une colonne, séparée du reste du paragraphe qui continue
  ailleurs. Les deux cassent la lecture en créant une rupture visuelle non voulue.
- **Mesure de ligne** : longueur d'une ligne de texte, mesurée en nombre de caractères par
  ligne. Repère de lisibilité en lecture longue : **environ 50 à 75 caractères par ligne**.
  Au-delà, l'œil perd le fil en revenant à la ligne (il doit retraverser une trop grande
  distance horizontale) ; en-deçà, la lecture devient hachée par des retours à la ligne trop
  fréquents.

### 2.5 Macro-typographie — hiérarchie et grille éditoriale

- **Hiérarchie** : une échelle de tailles cohérente (pas une suite arbitraire de valeurs) qui
  signale sans ambiguïté ce qui est titre, sous-titre, corps, légende — l'œil doit savoir où
  commencer à lire avant même de comprendre le contenu.
- **Grille éditoriale** : structure de colonnes héritée du print (approfondie en b05) qui
  organise où le texte peut se poser sur une page ou un écran — la typographie ne vit jamais
  seule, elle habite toujours une grille.

### 2.6 Le pairing Fraunces + Inter de TribuZen, analysé par la théorie

Fraunces (serif display, proche d'une filiation didone adoucie par des courbes plus
organiques et "wonky" — contraste marqué mais pas glacial) pour les titres, Inter (sans-serif
humanist, formes géométriques tempérées par des proportions issues de l'écriture) pour le
texte courant. Le pairing fonctionne parce qu'il associe deux rôles typographiques
différents plutôt que deux variations d'un même rôle : Fraunces porte la **chaleur et la
personnalité de marque** en display (lu en un coup d'œil, jamais en continu), Inter porte la
**neutralité et la lisibilité** en texte (lu en continu, jamais remarqué pour lui-même). Un
pairing de deux polices display, ou de deux polices texte très proches l'une de l'autre,
produirait soit un conflit de personnalité soit une absence totale de contraste hiérarchique
— les deux rôles doivent rester clairement distincts.

## 3. Worked examples

### Exemple A — identifier 3 défauts de micro-typographie sur une page réelle

Méthode appliquée à un bloc de texte existant de `nahual.fr` (ex. un paragraphe de
présentation du projet) :

1. **Mesurer la mesure de ligne actuelle** : compter (ou mesurer via un outil de dev, ex.
   `ch` en CSS) le nombre de caractères par ligne sur le bloc le plus large. Si le résultat
   dépasse 75, c'est un défaut documenté, pas une impression.
2. **Chercher une veuve ou une orpheline** : relire chaque paragraphe en cherchant une
   dernière ligne isolée en haut d'un bloc suivant, ou une première ligne isolée en bas d'un
   bloc. Si trouvée, noter le paragraphe précis.
3. **Vérifier une confusion kerning/tracking** : si du texte en majuscules (ex. un label de
   navigation) paraît visuellement trop serré ou trop aéré, vérifier si c'est un problème de
   tracking global (à corriger uniformément) plutôt qu'une tentative de correction lettre par
   lettre (qui serait un emploi erroné du kerning pour un problème de tracking).

### Exemple B — corriger la mesure de ligne sans tout casser

Un bloc de texte à 95 caractères par ligne (trop large) sur une largeur de conteneur de
800px avec un corps de texte à 16px :

1. Calculer la largeur de conteneur cible pour revenir dans la fourchette 50-75 caractères à
   corps constant — réduire la largeur du bloc de texte (pas forcément celle de toute la
   page) ou introduire une colonne secondaire si l'espace le permet.
2. Vérifier que la réduction ne crée pas de nouvelles veuves/orphelines : raccourcir une
   ligne change où le texte se coupe, et peut créer un nouveau défaut en corrigeant l'ancien
   — toujours relire après correction, jamais supposer que c'est réglé.

## 4. Pièges & misconceptions

- **Confondre kerning et tracking.** Voir §2.4 — le kerning corrige une paire précise, le
  tracking modifie un bloc entier de façon uniforme. Utiliser l'un pour faire le travail de
  l'autre dérègle soit une seule paire (tracking appliqué localement, impossible proprement),
  soit tout un bloc (kerning qu'on tente d'appliquer globalement, ce qui n'existe pas).

- **Négliger la mesure de ligne.** Un bloc de texte trop large en lecture longue fatigue
  l'œil même avec une excellente police — la qualité de la police ne compense pas une mesure
  de ligne hors de la fourchette 50-75 caractères.

- **Croire qu'une police "a l'air plus petite" alors que sa taille en points est identique.**
  C'est presque toujours un écart de x-height entre deux polices comparées à la même taille
  nominale (voir §2.1), pas une illusion.

- **Traiter le slab serif comme un serif classique.** Sa construction (empattements épais et
  rectangulaires) le fait se comporter comme un sans-serif en lisibilité à petit corps — une
  erreur fréquente est de lui appliquer les mêmes règles de taille minimale qu'à un serif fin
  comme un transitional ou un didone.

- **Choisir un pairing de deux polices display, ou de deux polices texte trop proches.** Voir
  §2.6 — le pairing fonctionne par contraste de RÔLE (display vs texte), pas seulement de
  forme. Deux polices du même rôle produisent soit un conflit, soit une absence de hiérarchie
  perceptible.

## 5. Ancrage TribuZen

- Le pairing Fraunces + Inter de `design.md` peut désormais être documenté avec sa logique
  réelle (Exemple de §2.6 : contraste de rôle display/texte) plutôt que comme un choix
  esthétique flottant — à ajouter dans `design.md` comme justification écrite, au même
  endroit où b02 ajoute la justification de la palette.
- `nahual.fr`, en chantier, est le terrain réel pour appliquer les corrections de micro-
  typographie (lab associé) — un travail qui profite directement au site, pas seulement à
  l'exercice.
- Toute future extension du design system TribuZen (ex. une police de code affichée dans un
  futur module technique) doit se justifier par un rôle typographique distinct, pas par un
  "ça se marie bien" — même exigence que pour la couleur en b02.

## 6. Points clés

1. L'anatomie de la lettre (x-height, hampe, empattement, contre-forme, terminal) donne le
   vocabulaire pour comparer deux polices sans vague à l'âme.
2. Serif se décompose en 4 familles historiques distinctes (humanist, transitional, didone,
   slab serif) ; sans-serif en 3 (grotesque, géométrique, humanist sans) — slab serif se
   comporte en lisibilité comme un sans-serif malgré son nom.
3. Les variable fonts (depuis 2016) remplacent plusieurs fichiers de poids fixes par un seul
   fichier à axes continus (`wght`, `wdth`, `slnt`).
4. Kerning (une paire précise) et tracking (un bloc entier) ne sont jamais interchangeables —
   la confusion des deux est le piège le plus fréquent du domaine.
5. La mesure de ligne optimale pour la lecture longue se situe entre 50 et 75 caractères par
   ligne — en dehors, la lecture se dégrade silencieusement.
6. Un pairing typographique fonctionne par contraste de RÔLE (display chaleureux vs texte
   neutre, comme Fraunces + Inter), pas par simple compatibilité esthétique.

## 7. Seeds Anki

```
Quelle est la différence entre le kerning et le tracking ?|Le kerning ajuste l'espace entre UNE paire de lettres précise ; le tracking ajuste uniformément l'espacement d'un bloc entier de texte
Qu'est-ce qu'une veuve en typographie, et une orpheline ?|Veuve = dernière ligne d'un paragraphe isolée seule en haut d'une colonne suivante ; orpheline = première ligne isolée seule en bas d'une colonne, séparée du reste du paragraphe
Quelle est la fourchette de mesure de ligne recommandée pour la lecture longue ?|Environ 50 à 75 caractères par ligne — au-delà l'œil perd le fil, en-deçà la lecture devient hachée
Pourquoi le slab serif se comporte-t-il comme un sans-serif en petit corps malgré son nom de serif ?|Ses empattements épais et rectangulaires produisent une construction proche du sans-serif en lisibilité, contrairement aux serifs fins (transitional, didone)
Qu'est-ce qu'une variable font et depuis quand existe ce format ?|Un seul fichier de police contenant des axes continus (poids, largeur...) au lieu d'un fichier séparé par poids — format OpenType disponible depuis 2016
Pourquoi le pairing Fraunces (display) + Inter (texte) fonctionne-t-il théoriquement ?|Il associe deux rôles typographiques distincts (chaleur de marque en display, neutralité lisible en texte) plutôt que deux variations d'un même rôle
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b03-typographie/`. Tu y corriges au moins 3 problèmes
> réels de micro-typographie sur une page de nahual.fr et documentes la hiérarchie
> typographique finale — brief complet et rubrique de vérification dans le README du lab.
