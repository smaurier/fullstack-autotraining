---
titre: Publication, domaines et SEO de base
cours: 24-design-craft
bloc: D — Framer (outil)
notions: [domaine custom vs sous-domaine générique, meta tags et Open Graph, aperçu de partage social, poids des images et performance perçue, crédibilité du premier lien partagé]
outcomes: [publier un projet Framer avec un domaine soigné, configurer les meta tags de partage social et vérifier l'aperçu généré, mesurer et justifier le poids d'une page avant de la considérer livrable]
prerequis: [d06-code-overrides]
next: aucun — dernier module du Bloc D
tribuzen: publication soignée de la landing page vitrine de TribuZen, livrable final présentable tel quel à un recruteur de ce type
last-reviewed: 2026-10
---

# Publication, domaines et SEO de base

> **Outcomes — tu sauras FAIRE :** publier un projet Framer avec un domaine soigné,
> configurer les meta tags de partage social et vérifier réellement l'aperçu qu'ils
> génèrent, et mesurer le poids d'une page avant de la considérer comme un livrable
> présentable.
> **Difficulté :** ⭐

## 1. Cas concret d'abord

La landing page TribuZen est construite (D01-D06). Le réflexe serait de considérer le
travail terminé au moment où elle "a l'air finie" dans l'éditeur Framer. Mais le moment où
cette page compte vraiment n'est pas quand elle est ouverte dans l'éditeur — c'est quand un
recruteur de ce type (le profil de poste qui a déclenché ce cours entier, voir README) colle le lien dans un
message LinkedIn ou un email. À cet instant précis, si les meta tags de partage ne sont pas
configurés, la plateforme de destination affiche un aperçu vide, cassé, ou un texte
générique sans rapport avec le contenu réel — la toute première impression, avant même un
clic, se joue sur ce détail invisible dans l'éditeur.

## 2. Théorie complète, concise

### 2.1 Domaine — crédibilité perçue avant tout contenu

Un sous-domaine générique fourni par défaut par une plateforme (ex. un sous-domaine
automatique au nom aléatoire) signale immédiatement "projet non finalisé" à quelqu'un
d'expérimenté. Un domaine custom ou un sous-domaine soigné et nommé (même gratuit) change
cette première perception avant qu'un seul mot du contenu ne soit lu. Ce n'est pas un
détail technique secondaire : c'est littéralement la première information perçue.

### 2.2 Meta tags et Open Graph — ce qui pilote l'aperçu de partage

Les meta tags de base (`title`, `description`) pilotent ce qu'affichent les moteurs de
recherche et les onglets de navigateur. Les balises **Open Graph** (`og:title`,
`og:description`, `og:image`) pilotent spécifiquement l'aperçu généré quand le lien est
collé dans une plateforme sociale ou une messagerie (LinkedIn, Slack, email dans certains
clients). Sans `og:image` définie explicitement, la plateforme choisit arbitrairement une
image de la page (parfois un simple favicon, parfois rien) — un résultat non maîtrisé.

### 2.3 Performance perçue — le poids avant le premier rendu

Le "temps de chargement perçu" n'est pas une métrique abstraite de développeur : c'est le
temps entre le clic sur le lien et le moment où la personne voit quelque chose de cohérent.
Les deux leviers les plus directs côté Framer : le poids des images (toujours exporter dans
un format et une résolution adaptés à l'affichage réel, jamais une image source brute non
compressée) et le nombre d'animations lourdes chargées dès le premier écran (lien direct
avec le module E06 du Bloc Motion, sur le poids des fichiers Lottie).

### 2.4 Le livrable n'est jamais "fini dans l'éditeur" — il est fini publié et vérifié

La discipline de ce module est de considérer la publication comme une ÉTAPE DE
VÉRIFICATION, pas une formalité finale. Publier, puis coller le lien dans un contexte réel
(une conversation, un email à soi-même) pour voir l'aperçu généré réellement — jamais
supposer que la configuration des meta tags "doit marcher" sans l'avoir vu produire un
résultat concret.

## 3. Worked examples

### Exemple A — configurer et vérifier l'aperçu de partage de la landing page TribuZen

1. Définir `og:title` ("TribuZen — application familiale conçue et développée en solo"),
   `og:description` (1-2 phrases qui résument le projet, pas une phrase générique type
   "Bienvenue sur mon site"), `og:image` (une capture d'écran soignée du produit, pas le
   logo seul).
2. Publier la page.
3. Coller le lien publié dans un message test (ex. à soi-même sur une messagerie qui génère
   des aperçus) et observer le résultat réel — pas supposer qu'il est correct.
4. Si l'image ou le texte de l'aperçu ne correspond pas à ce qui a été configuré, vérifier
   que la plateforme n'a pas mis en cache une version antérieure non publiée — republier et
   retester avant de conclure à un bug.

### Exemple B — mesurer et réduire le poids d'une image de couverture

1. Une image de couverture importée directement depuis un export Figma pèse 4,2 Mo (PNG
   non compressé à pleine résolution).
2. Exporter en format WebP ou JPEG compressé à la résolution réellement affichée (pas la
   résolution source) — poids obtenu : 180 Ko, visuellement indiscernable à l'affichage
   normal.
3. Documenter la mesure avant/après plutôt que d'affirmer "l'image est optimisée" sans
   chiffre.

## 4. Pièges & misconceptions

- **Publier sans vérifier l'aperçu de partage social.** Voir le cas concret — le lien envoyé
  à un recruteur peut s'afficher vide ou cassé sans que rien dans l'éditeur Framer ne
  l'indique visuellement.

- **Importer une image source brute "parce que ça ira plus vite".** Un poids non maîtrisé
  dégrade le temps de chargement perçu dès le premier écran — voir Exemple B, le gain de
  compression est souvent massif pour une perte visuelle nulle à l'affichage normal.

- **Affirmer qu'une page est "optimisée" sans l'avoir mesurée.** Le module E06 (Bloc Motion)
  pose la même discipline : chaque affirmation de performance doit être un chiffre réel
  mesuré, jamais une estimation.

- **Confondre domaine custom et nom de domaine acheté obligatoirement.** Un sous-domaine
  gratuit bien nommé (ex. `tribuzen.framer.website` plutôt qu'un identifiant aléatoire)
  règle déjà une grande partie du problème de crédibilité — l'achat d'un domaine propre est
  une amélioration, pas un prérequis pour publier correctement.

## 5. Ancrage TribuZen

- La landing page TribuZen, publiée avec ses meta tags vérifiés et son poids mesuré, devient
  le livrable final présentable tel quel à un recruteur — l'objectif explicite nommé dans le
  README du cours et dans le brouillon qui a motivé toute la formation.
- Cette page est aussi le candidat direct pour héberger le futur portfolio piece du Bloc E
  (animations Lottie/Rive, module E06) — les deux disciplines de mesure de poids se
  cumulent sur un même livrable final.

## 6. Points clés

1. Le domaine (custom ou sous-domaine soigné) est la première information perçue, avant
   même le contenu — ce n'est jamais un détail secondaire.
2. Les balises Open Graph (`og:title`, `og:description`, `og:image`) pilotent l'aperçu
   généré quand un lien est partagé — sans elles, le résultat n'est pas maîtrisé.
3. Le poids des images (format et résolution adaptés à l'affichage réel) est le levier le
   plus direct de performance perçue sur une page Framer.
4. La publication est une étape de vérification, pas une formalité : toujours tester le
   lien réel dans un contexte de partage avant de considérer le travail terminé.
5. Chaque affirmation de performance doit être un chiffre mesuré — jamais une estimation
   qualitative non vérifiée.

## 7. Seeds Anki

```
Pourquoi le domaine d'un site publié compte-t-il avant même son contenu ?|C'est la première information perçue par quelqu'un qui reçoit le lien — un sous-domaine générique signale "non finalisé" avant qu'un mot du contenu soit lu
Que pilotent les balises Open Graph ?|L'aperçu (titre, description, image) généré quand un lien est partagé sur une plateforme sociale ou une messagerie — sans elles, le résultat n'est pas maîtrisé
Quel est le levier le plus direct pour réduire le poids d'une page Framer ?|Exporter les images au format et à la résolution adaptés à l'affichage réel, jamais la résolution source brute
Pourquoi la publication doit-elle être traitée comme une étape de vérification ?|Parce que rien dans l'éditeur Framer ne révèle visuellement un aperçu de partage cassé — il faut coller le lien réel dans un contexte de partage pour le voir
Comment documenter correctement une optimisation de performance ?|Avec un chiffre réel mesuré avant/après (poids en Ko), jamais une affirmation qualitative comme "c'est optimisé"
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/d07-publication-seo/`. Tu y publies la landing page
> TribuZen avec domaine, meta tags Open Graph vérifiés et poids mesuré — brief complet et
> rubrique de vérification dans le README du lab.
