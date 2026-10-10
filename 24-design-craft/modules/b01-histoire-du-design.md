---
titre: Histoire du design graphique et du web design
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [Bauhaus, Swiss Style / International Typographic Style, De Stijl, skeuomorphisme, flat design, material design, design systems contemporains, grille éditoriale héritée du print]
outcomes: [reconnaître les codes visuels de 4 mouvements majeurs sur un écran donné, expliquer d'où vient une convention UI qu'on applique sans la questionner, redessiner un même écran dans 3 langages visuels différents]
prerequis: []
next: b02-theorie-couleur
tribuzen: design.md de TribuZen (palette sauge/terracotta/blanc chaud, typo Fraunces+Inter) — comprendre de quelle lignée visuelle cette direction hérite
last-reviewed: 2026-10
---

# Histoire du design graphique et du web design

> **Outcomes — tu sauras FAIRE :** reconnaître les codes de 4 mouvements majeurs (Bauhaus,
> Swiss Style, skeuomorphisme, flat design) sur un écran donné, expliquer la généalogie
> d'une convention UI que tu appliques aujourd'hui sans y penser, et redessiner un même
> contenu dans 3 langages visuels différents pour prouver que tu les distingues en pratique,
> pas seulement en les nommant.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Tu ouvres Figma pour maquetter l'écran de connexion de TribuZen. Sans y penser, tu poses :
une grille de 12 colonnes, une hiérarchie typographique à 3 niveaux, un bouton plat sans
dégradé ni ombre portée lourde, un espacement systématique en multiples de 8px.

Aucune de ces décisions n'est neutre ou "juste du bon goût". La grille de 12 colonnes vient
de la composition éditoriale du **Swiss Style** des années 1950. Le bouton plat sans relief
vient d'une rupture délibérée avec le **skeuomorphisme** qu'Apple lui-même a abandonné en
2013 (iOS 7). L'espacement en multiples de 8 vient d'une discipline de **grille modulaire**
héritée du **Bauhaus**, pas d'une convention arbitraire des design systems modernes.

Si tu ne connais pas cette généalogie, tu appliques ces règles par imitation — tu ne sais
pas quand il est légitime de s'en écarter, ni comment argumenter un choix face à un
designer senior ou un client qui questionne une direction artistique. Ce module répond à
ça : savoir D'OÙ viennent les conventions, pour pouvoir un jour s'en écarter sciemment
plutôt que par ignorance.

## 2. Théorie complète, concise

### 2.1 Bauhaus (1919-1933) — la grille et la fonction avant la décoration

École allemande fondée par Walter Gropius. Principe fondateur : **la forme suit la
fonction** (*form follows function*) — un objet ou une page n'est pas décoré après coup,
sa structure EST sa décoration. Trois apports qui irriguent encore tout le design
d'interface aujourd'hui :

- **La grille comme outil de composition**, pas comme contrainte technique. Avant le
  Bauhaus, une page se composait à l'œil ; après, elle se construit sur un système de
  colonnes et de modules répétables.
- **Typographie géométrique sans empattement** (sans-serif) comme expression de la
  modernité industrielle — ancêtre direct de l'esthétique "neutre" que presque toute UI
  contemporaine utilise par défaut (San Francisco, Roboto, Inter).
- **Hiérarchie par le contraste de taille/poids**, pas par l'ornement. Un titre se
  distingue du corps de texte par sa taille et son poids, jamais par une bordure décorative.

### 2.2 Swiss Style / International Typographic Style (années 1950-60)

Développé en Suisse (Josef Müller-Brockmann, Armin Hofmann), c'est la **systématisation**
des idées du Bauhaus en un outil de composition reproductible : la **grille modulaire**.
Une page est divisée en colonnes et lignes de base (baseline grid) ; chaque élément
(titre, image, texte) occupe un nombre entier de modules. Deux designers différents,
suivant la même grille, produisent des compositions cohérentes entre elles — c'est
exactement le principe qui permet à une équipe de 10 personnes de produire un site
cohérent aujourd'hui sans que chacun invente sa propre mise en page.

Caractéristiques reconnaissables : alignement à gauche strict (jamais de texte centré sur
un paragraphe), hiérarchie typographique forte avec peu de corps de police (souvent un
seul : Helvetica à l'origine), usage de l'espace blanc comme élément actif de composition
(pas un "reste" entre les éléments, mais un choix).

**Lien direct avec aujourd'hui** : la grille 12 colonnes de Bootstrap, Tailwind, Figma
elle-même, est une transposition numérique directe de la grille modulaire suisse. Quand tu
poses `grid-cols-12` dans Tailwind, tu actionnes un outil de composition inventé pour du
papier en 1950.

### 2.3 De Stijl (1917-1931) — abstraction géométrique et palette réduite

Mouvement néerlandais (Piet Mondrian, Theo van Doesburg). Apport principal pour l'UI :
la **réduction à des formes géométriques pures** (lignes horizontales/verticales, carrés,
rectangles) et une **palette volontairement limitée** (souvent les 3 couleurs primaires +
noir/blanc/gris). C'est la généalogie directe de l'esthétique "flat" moderne — un bouton
flat design n'est pas une absence de style, c'est une discipline héritée de De Stijl :
composer avec des aplats de couleur et des formes géométriques simples, sans dégradé ni
texture.

### 2.4 Skeuomorphisme (approx. 2000-2013 en UI numérique)

Technique consistant à imiter visuellement un objet réel pour rendre une interface
numérique intuitive par analogie : l'app Notes d'iOS imitait un carnet à spirale, l'icône
Calculatrice imitait une calculatrice physique avec boutons en relief et ombre portée.
Logique pédagogique réelle à son époque : les utilisateurs découvraient le tactile, l'
analogie avec l'objet physique réduisait la charge cognitive d'apprentissage.

**Pourquoi ça a disparu** : une fois la génération d'utilisateurs familiarisée avec le
tactile (vers 2012-2013), le coût de l'imitation (bruit visuel, incohérence entre apps,
impossible à maintenir à grande échelle avec des dizaines d'écrans) a dépassé le bénéfice
pédagogique. Apple a basculé sur iOS 7 (2013) vers le flat design du jour au lendemain —
un des virages de direction artistique les plus radicaux et les mieux documentés de
l'histoire du design produit.

### 2.5 Flat design (2013 → aujourd'hui, en évolution constante)

Rupture volontaire avec le skeuomorphisme : suppression des ombres portées lourdes, des
textures, des dégradés complexes, des reliefs. Composition par aplats de couleur,
typographie comme élément hiérarchique principal, icônes réduites à des pictogrammes
géométriques simples. Descendant direct esthétique de De Stijl et du Bauhaus (formes
géométriques pures, fonction avant décoration), mais appliqué à l'écran avec les
contraintes propres au numérique (densité d'information, répétabilité à l'échelle d'un
design system).

**Nuance importante** : le flat design "pur" (2013-2015) a lui-même évolué — "flat 2.0"
ou "semi-flat" réintroduit des ombres très subtiles (élévation Material Design, voir
module B12 sur les conventions de plateforme) pour redonner une hiérarchie de profondeur
sans revenir au skeuomorphisme. Ce n'est pas un retour en arrière, c'est un raffinement :
l'ombre n'imite plus un objet physique, elle communique une relation spatiale abstraite
(ce composant est "au-dessus" de celui-ci dans l'interface).

### 2.6 Design systems contemporains — la synthèse, pas une rupture

Un design system moderne (Material Design de Google, Human Interface Guidelines d'Apple,
les design systems internes des grandes entreprises tech) n'invente pas une nouvelle
esthétique : il **systématise** les héritages précédents en un ensemble de règles
réutilisables à l'échelle d'une organisation — exactement ce que le Swiss Style faisait
pour une page imprimée, un design system le fait pour des milliers d'écrans produits par
des centaines de personnes. La discipline est la même ; l'échelle a changé.

## 3. Worked examples

### Exemple A — le même écran de connexion, trois langages visuels

Prenons un écran de connexion minimal (logo, champ email, champ mot de passe, bouton
"Se connecter") et décrivons comment il se composerait dans trois langages différents —
l'objectif du lab associé est de produire réellement ces trois versions dans Figma, mais
voici le raisonnement qui doit précéder le geste :

**Version Bauhaus/Swiss Style** : grille stricte, alignement gauche sur tous les éléments
(jamais de centrage), typographie sans-serif géométrique unique pour tout l'écran (un seul
corps de police, variation uniquement par taille/poids), palette réduite à 2-3 couleurs
maximum, bouton rectangulaire sans arrondi, espacement rigoureusement modulaire (tout en
multiples d'une unité de base).

**Version flat design contemporain** : les mêmes principes de palette réduite et de formes
géométriques, mais avec un centrage vertical/horizontal de la carte de connexion (le Swiss
Style strict n'impose pas ça, c'est une convention UI moderne pour les formulaires courts),
un bouton avec un radius léger (convention de douceur perceptuelle quasi-universelle en
2026, absente du Swiss Style historique), et une ombre très subtile sous la carte
(élévation, héritage Material).

**Version skeuomorphique (exercice contre-intuitif)** : le champ de saisie imite un carnet
avec une texture de papier, le bouton a un dégradé et une ombre portée marquée qui le fait
paraître "cliquable" par imitation physique, le logo a un reflet. Produire cette version
n'est pas un exercice nostalgique gratuit — c'est la preuve qu'on comprend PAR LA PRATIQUE
pourquoi elle a été abandonnée (bruit visuel, incohérence à l'échelle), pas seulement parce
qu'on l'a lu.

### Exemple B — reconnaître la généalogie d'une convention qu'on utilise déjà

TribuZen utilise Tailwind avec une grille `grid-cols-12` et un espacement en multiples de 4
(`space-y-4`, `p-8`, etc. — multiples de 0.25rem = 4px). Décomposition généalogique :

1. La grille 12 colonnes → Swiss Style (divisibilité par 2, 3, 4, 6 — flexible pour
   différentes mises en page sans changer de système).
2. L'espacement systématique en multiples d'une unité de base → discipline de grille
   modulaire du Bauhaus, transposée au pixel.
3. La typographie Inter (sans-serif géométrique, neutre) choisie pour TribuZen → héritage
   direct de la typographie Bauhaus/Swiss, choisie pour sa neutralité et sa lisibilité à
   toutes tailles d'écran, pas par défaut arbitraire.

Cette décomposition n'est pas un exercice académique gratuit : elle permet d'argumenter un
choix de direction artistique en entretien ou face à un client ("j'ai choisi cette grille
parce qu'elle offre une flexibilité de composition prouvée depuis 70 ans, pas parce que
c'est le défaut de Tailwind").

## 4. Pièges & misconceptions

- **Croire que "flat design" veut dire "sans effort/sans style".** C'est l'inverse : flat
  design est une discipline qui interdit de masquer un mauvais choix de hiérarchie derrière
  un dégradé ou une ombre décorative. Sans ces béquilles visuelles, la hiérarchie doit
  fonctionner uniquement par la typographie, la couleur et l'espace — c'est PLUS exigeant,
  pas moins.

- **Confondre Bauhaus et Swiss Style.** Le Bauhaus pose les principes (fonction avant
  décoration, grille, typographie géométrique) dans un cadre pédagogique allemand des
  années 1920 ; le Swiss Style les systématise 30 ans plus tard en un outil de composition
  reproductible (la grille modulaire précise, avec lignes de base). *Correct* : Bauhaus =
  philosophie fondatrice, Swiss Style = méthode de composition opérationnelle qui en
  découle.

- **Penser que le skeuomorphisme était "une erreur" de design.** Il répondait à un vrai
  besoin pédagogique (familiariser des utilisateurs novices avec le tactile) à un moment
  donné. Il a cessé d'être pertinent quand ce besoin a disparu — pas parce que c'était
  intrinsèquement mauvais. Comprendre ça évite de juger une direction artistique dans
  l'absolu plutôt que par rapport à son contexte et son utilisateur réel.

- **Croire qu'une direction artistique "moderne" n'a pas de généalogie.** Tout ce qui
  paraît "neutre" ou "par défaut" dans une interface actuelle (grille 12 colonnes,
  typographie sans-serif, espacement en 8pt, bouton plat avec radius léger) est le résultat
  de décisions historiques précises, prises par des designers nommés, à des dates
  identifiables. Rien n'est "juste comme ça".

## 5. Ancrage TribuZen

`tribuzen/design.md` pose déjà une direction artistique (palette sauge/terracotta/blanc
chaud, typographie Fraunces + Inter, tokens RGAA). Ce module permet de **nommer sa
généalogie** plutôt que de la laisser implicite :

- **Inter** (sans-serif géométrique, UI) : héritage direct Bauhaus/Swiss — neutralité et
  lisibilité à toutes tailles, le même raisonnement que le choix d'Helvetica en 1957.
- **Fraunces** (serif à fort contraste, pour les titres/moments chaleureux) : rupture
  volontaire avec la neutralité Swiss — un choix de caractère affirmé pour la couche
  émotionnelle de la marque, là où Inter reste l'outil fonctionnel. Nommer cette tension
  (neutre fonctionnel vs expressif émotionnel) rend le choix de pairing typographique
  argumentable plutôt qu'intuitif.
- La grille et l'espacement de TribuZen (à poser en Figma dans le Bloc C) devront suivre la
  même discipline modulaire que celle du code (Tailwind `space-y-4`, `grid-cols-12`) —
  cohérence design ↔ code qui sera rendue explicite et outillée dans le Bloc C (pont
  Figma Variables ↔ tokens).

## 6. Points clés

1. Bauhaus (1919-1933) : forme suit fonction, grille comme outil de composition,
   typographie géométrique sans-serif, hiérarchie par contraste de taille/poids.
2. Swiss Style (1950-60) : systématisation en grille modulaire reproductible — ancêtre
   direct de la grille 12 colonnes (Bootstrap, Tailwind, Figma).
3. De Stijl (1917-1931) : abstraction géométrique, palette réduite — généalogie directe
   du flat design.
4. Skeuomorphisme (2000-2013) : imitation du réel pour réduire la charge cognitive
   d'apprentissage du tactile — abandonné (iOS 7, 2013) une fois ce besoin disparu, pas
   parce qu'il était "mauvais" en soi.
5. Flat design (2013→) : rupture avec l'imitation, composition par aplats et typographie ;
   a évolué vers un "flat 2.0" qui réintroduit une élévation abstraite subtile.
6. Un design system contemporain systématise ces héritages à l'échelle d'une organisation
   — même discipline que le Swiss Style, échelle différente.
7. Rien dans une interface "neutre" ou "par défaut" n'est arbitraire — chaque convention a
   une généalogie identifiable, utile pour argumenter un choix de direction artistique.

## 7. Seeds Anki

```
Quel principe fondateur du Bauhaus se retrouve dans toute UI moderne ?|"La forme suit la fonction" — la structure d'un élément EST sa décoration, pas un ajout après coup
D'où vient la grille 12 colonnes utilisée par Tailwind/Bootstrap/Figma ?|De la grille modulaire du Swiss Style / International Typographic Style (années 1950), transposition numérique d'un outil de composition éditoriale papier
Pourquoi le skeuomorphisme a-t-il disparu des interfaces après 2013 ?|Le besoin pédagogique qu'il servait (familiariser des utilisateurs novices au tactile par analogie avec des objets réels) avait disparu — pas parce qu'il était intrinsèquement mauvais
Quelle est la différence entre Bauhaus et Swiss Style ?|Bauhaus = philosophie fondatrice (fonction avant décoration, typographie géométrique) ; Swiss Style = systématisation 30 ans plus tard en méthode de composition opérationnelle (grille modulaire précise)
De quel mouvement le flat design hérite-t-il directement ?|De Stijl — composition par aplats de couleur et formes géométriques pures, palette volontairement réduite
Qu'est-ce que le "flat 2.0" ou semi-flat ?|Une évolution du flat design qui réintroduit une élévation/ombre très subtile pour communiquer une relation spatiale abstraite entre composants, sans revenir à l'imitation skeuomorphique du réel
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b01-trois-langages-visuels/`. Tu y redessines dans
> Figma un même écran fictif (connexion ou équivalent) dans 3 langages visuels différents
> (Bauhaus/Swiss Style, flat design contemporain, skeuomorphisme) — brief complet et
> rubrique de vérification dans le README du lab (pas de corrigé caché : la preuve est la
> capacité à nommer, pour chaque version, à quel mouvement historique chaque décision
> appartient et pourquoi).
