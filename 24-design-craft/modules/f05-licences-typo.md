---
titre: Licences typographiques et droits d'usage — mini-module
cours: 24-design-craft
bloc: F — Identité de marque multi-supports
notions: [licence desktop vs licence web, usage SaaS vs print, embedding web, licences d'image stock, licences Creative Commons CC0/BY/BY-SA, questions à poser avant usage commercial]
outcomes: [vérifier si une police est autorisée en usage web/commercial avant de l'intégrer, distinguer les grandes variantes de licence d'image (stock, Creative Commons), poser les bonnes questions avant de livrer une charte plutôt que de supposer un usage libre]
prerequis: [f04-pont-marque-tokens]
next: aucun — dernier module du Bloc F
tribuzen: checklist d'1 page de licences appliquée au brand book Nuada/nahual.fr produit en F02
last-reviewed: 2026-10
---

# Licences typographiques et droits d'usage — mini-module

> **Outcomes — tu sauras FAIRE :** vérifier si une police est autorisée en usage web ou
> commercial avant de l'intégrer dans un livrable, reconnaître les grandes variantes de
> licence d'image (stock payant, Creative Commons), et poser les 2-3 bonnes questions avant
> de livrer une charte plutôt que de supposer qu'une ressource trouvée en ligne est libre.
> **Difficulté :** ⭐ — module volontairement léger, pas un cours de droit.

## 1. Cas concret d'abord

Le brand book Nuada (module F02) nomme une police précise pour la typographie de marque. Une
question simple, jamais posée jusqu'ici dans ce cours : cette police peut-elle légalement
être intégrée sur le site web de Nuada (`@font-face`), ou la licence utilisée ne couvre-t-elle
qu'un usage bureautique (documents Word, PDF) ? Et les icônes/images du brand book : d'où
viennent-elles exactement, et sous quelle licence ?

Ce ne sont pas des questions théoriques : une police trouvée "gratuite" sur un site
d'agrégation peut très bien interdire l'usage commercial, ou exiger une licence web séparée
au-delà d'un certain nombre de vues mensuelles. Ce module ne fait pas de Sylvain un juriste —
il donne les 2-3 questions à poser systématiquement avant de considérer une charte comme
livrable, pour ne jamais découvrir le problème après coup.

## 2. Théorie complète, concise

### 2.1 Licence desktop vs licence web — deux usages, souvent deux licences distinctes

Une police achetée ou téléchargée pour un usage "desktop" (traitement de texte, mise en page
print) n'autorise PAS automatiquement son intégration sur un site web via `@font-face`. De
nombreux fondeurs de caractères vendent une licence desktop et une licence web SÉPARÉMENT,
cette dernière étant parfois limitée par un nombre de vues de page par mois, ou par un nombre
de domaines couverts. Intégrer un fichier de police "parce qu'on l'a déjà sur son ordinateur"
sans vérifier la licence web est l'erreur la plus fréquente et la plus silencieuse (le site
fonctionne techniquement, le problème est purement contractuel et invisible à l'usage).

### 2.2 Usage SaaS vs print — une distinction qui existe aussi dans certaines licences

Au-delà du web, certaines licences distinguent encore l'usage "produit imprimé" de l'usage
"logiciel/SaaS qui embarque la police dans son interface" — ce ne sont pas toujours les mêmes
droits. Une police autorisée pour une brochure imprimée n'est pas nécessairement autorisée
pour une application web qui l'intègre et la sert à chaque utilisateur. Le réflexe à retenir :
chaque nouveau CONTEXTE d'usage (print, web, SaaS) mérite une vérification explicite de la
licence, jamais une généralisation depuis un usage déjà vérifié pour un autre contexte.

### 2.3 Droits d'image — stock payant et licences libres

- **Stock payant** : chaque banque d'images a ses propres conditions — vérifier précisément
  si l'usage commercial est illimité ou pas, et si une attribution reste requise malgré le
  paiement (certaines licences payantes l'exigent quand même pour certains tiers de prix).
- **Licences libres de type Creative Commons** : plusieurs variantes à ne jamais confondre —
  **CC0** (domaine public, aucune restriction, pas même d'attribution requise), **CC BY**
  (utilisation libre à condition de créditer l'auteur), **CC BY-SA** (utilisation libre avec
  attribution, mais toute œuvre dérivée doit être repartagée sous la même licence — contrainte
  qui peut être incompatible avec une charte de marque propriétaire fermée).
- **Le réflexe central** : ne JAMAIS supposer qu'une image "trouvée sur Google" est libre de
  droits — un moteur de recherche d'images affiche des résultats, pas des garanties de
  licence ; la licence réelle doit être vérifiée à la source (le site qui héberge l'image).

### 2.4 Portée volontairement limitée de ce module — et pourquoi c'est assumé

Ce module ne prétend pas transformer Sylvain en juriste de la propriété intellectuelle — ce
serait hors de portée et hors sujet pour ce cours. L'objectif réaliste et suffisant : savoir
identifier qu'une question de licence EXISTE pour une ressource donnée, et savoir où aller
chercher la réponse exacte (la page de licence officielle de la police ou de l'image), plutôt
que de supposer. Un designer qui sait POSER la question au bon moment évite l'immense
majorité des problèmes, même sans maîtriser le détail juridique de chaque type de licence.

## 3. Worked examples

### Exemple A — vérifier la licence d'une police de marque

Police nommée dans le brand book F02 (ex. Fraunces, Inter — toutes deux distribuées via
Google Fonts dans le cas de TribuZen).

1. Identifier la source de distribution (Google Fonts, fondeur indépendant, marketplace de
   polices).
2. Si la source est Google Fonts : ces polices sont distribuées sous licence libre (souvent
   Open Font License), généralement sans restriction d'usage commercial ni de distinction
   web/desktop/SaaS — mais VÉRIFIER la licence spécifique affichée sur la page de la police
   plutôt que de généraliser "Google Fonts = toujours libre" sans contrôle.
3. Si la source est un fondeur indépendant payant : chercher explicitement une mention
   "web license" ou "SaaS license" distincte de la licence desktop, et son éventuelle limite
   de trafic ou de domaines.

### Exemple B — checklist appliquée à une image du brand book

Une icône ou photo utilisée dans le brand book provient d'une banque d'images.

1. Retrouver la page source exacte de l'image (pas une recherche d'images générique).
2. Lire la mention de licence affichée : usage commercial autorisé ? attribution requise ?
   (et si oui, sous quelle forme exacte : mention de l'auteur, lien vers la source).
3. Documenter la réponse dans la checklist (module 5, lab) avec la source exacte citée —
   pas "probablement libre", une réponse vérifiée et sourcée.

## 4. Pièges & misconceptions

- **Supposer qu'une police "déjà installée sur l'ordinateur" est utilisable partout.** Voir
  2.1 — licence desktop et licence web sont souvent distinctes et vendues séparément.

- **Croire qu'une image "trouvée sur Google" est libre de droits par défaut.** Voir 2.3 — un
  moteur de recherche affiche des résultats visuels, jamais une garantie de licence ; la
  vérification se fait à la source.

- **Confondre les variantes de Creative Commons.** CC0 (aucune restriction), CC BY
  (attribution requise), CC BY-SA (attribution + partage à l'identique obligatoire pour les
  dérivés) ne donnent PAS les mêmes droits — une charte de marque propriétaire peut être
  incompatible avec une ressource CC BY-SA si elle en dérive une œuvre fermée.

- **Généraliser une vérification de licence d'un contexte à un autre.** Une police vérifiée
  pour un usage print n'est pas automatiquement vérifiée pour un usage web ou SaaS — chaque
  nouveau contexte mérite sa propre vérification (voir 2.2).

## 5. Ancrage TribuZen

- Les polices Fraunces et Inter de `design.md` sont distribuées via Google Fonts — vérifier
  explicitement leur licence réelle (généralement permissive) plutôt que de la supposer
  simplement parce qu'elles sont gratuites à télécharger.
- Toute image/icône future ajoutée au brand book Nuada ou au produit TribuZen doit passer par
  la checklist du lab F05 avant d'être considérée livrable, même pour un usage interne.

## 6. Points clés

1. Licence desktop et licence web sont souvent deux licences distinctes — vérifier
   explicitement avant toute intégration `@font-face`.
2. Certaines licences distinguent aussi usage print et usage SaaS — chaque nouveau contexte
   d'usage mérite sa propre vérification.
3. CC0, CC BY et CC BY-SA ne donnent pas les mêmes droits — CC BY-SA impose un partage à
   l'identique des œuvres dérivées, potentiellement incompatible avec une marque fermée.
4. Ne jamais supposer qu'une image "trouvée en ligne" est libre de droits — vérifier à la
   source, pas au moteur de recherche.
5. L'objectif réaliste de ce module est de savoir IDENTIFIER qu'une question de licence
   existe et où chercher la réponse, pas de maîtriser le droit de la propriété intellectuelle.

## 7. Seeds Anki

```
Une police utilisable en desktop est-elle automatiquement utilisable sur un site web ?|Non — de nombreux fondeurs vendent une licence web séparée de la licence desktop, parfois limitée par le trafic ou le nombre de domaines
Quelle est la différence entre CC0, CC BY et CC BY-SA ?|CC0 : aucune restriction. CC BY : attribution requise. CC BY-SA : attribution + toute œuvre dérivée doit être repartagée sous la même licence
Une image trouvée via un moteur de recherche d'images est-elle libre de droits par défaut ?|Non — le moteur affiche des résultats visuels, jamais une garantie de licence ; il faut vérifier la licence à la source qui héberge l'image
Quel est l'objectif réaliste de ce mini-module sur les licences ?|Savoir identifier qu'une question de licence existe pour une ressource donnée et savoir où vérifier la réponse exacte, pas maîtriser le droit de la propriété intellectuelle
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/f05-licences-typo/`. Tu y produis la checklist d'1 page
> de vérification de licences appliquée réellement au brand book produit en F02 — brief
> complet et rubrique de vérification dans le README du lab.
