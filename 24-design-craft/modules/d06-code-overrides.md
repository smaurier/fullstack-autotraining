---
titre: Code Overrides — TS/React dans Framer
cours: 24-design-craft
bloc: D — Framer (outil)
notions: [Code Override, limite des outils natifs Framer, logique custom injectée, avantage du profil dev hybride, risque de sur-ingénierie]
outcomes: [identifier un besoin que les outils natifs Framer ne couvrent pas, écrire un Code Override TS/React ciblé pour ce besoin précis, justifier par écrit pourquoi un outil natif n'aurait pas suffi avant d'écrire du code]
prerequis: [d05-cms-framer]
next: d07-publication-seo
tribuzen: un Code Override simple sur la landing page vitrine de TribuZen, là où les Stacks/variants/Collections ne suffisent plus
last-reviewed: 2026-10
---

# Code Overrides — TS/React dans Framer

> **Outcomes — tu sauras FAIRE :** identifier un besoin réel que les outils natifs de
> Framer ne couvrent pas, écrire un Code Override TS/React ciblé pour ce besoin précis, et
> justifier par écrit pourquoi un outil natif n'aurait pas suffi avant même d'ouvrir
> l'éditeur de code.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Les modules D02 à D05 ont construit toute la landing page TribuZen avec des outils
purement visuels — Stacks, variants, Collection. Un designer sans aucune compétence de
développement peut aller jusque-là. Ce module couvre exactement le point où ce designer
s'arrêterait et où le profil hybride de Sylvain commence : un besoin qui dépasse ce que le
panneau de propriétés de Framer permet d'exprimer visuellement (une validation de champ
avec une règle métier simple, un compteur qui réagit à un clic, un appel à une API externe
légère). Un **Code Override** est le point d'extension officiel de Framer pour exactement
ce cas — pas un contournement bricolé, un mécanisme prévu par l'outil lui-même.

## 2. Théorie complète, concise

### 2.1 Qu'est-ce qu'un Code Override, précisément

Un Code Override est un composant TS/React écrit à la main dans un fichier de code lié au
projet Framer, qui vient envelopper ou remplacer le comportement d'un élément du canvas.
Techniquement, c'est une fonction qui reçoit les props du composant Framer visé et retourne
des props modifiées ou étendues (ex. ajouter un gestionnaire de clic, injecter un état React
avec `useState`, appeler une fonction au montage avec `useEffect`). Le résultat visuel reste
piloté par Framer ; seule la LOGIQUE ajoutée est du vrai code exécuté.

### 2.2 La frontière avec les propriétés exposées (module D04)

Une propriété exposée (D04) reste entièrement dans le système visuel natif : elle permet à
quelqu'un sans code de changer une valeur dans le panneau Framer (texte, variante, image).
Un Code Override, lui, écrit un comportement qui n'EXISTE PAS dans le vocabulaire visuel de
Framer — un état qui change en réponse à une interaction complexe, un calcul, un appel
réseau. La distinction est nette : si le besoin peut se décrire entièrement comme "une
valeur que quelqu'un choisit dans un panneau", une propriété exposée suffit ; si le besoin
nécessite d'exécuter une LOGIQUE qui réagit dynamiquement, il faut un Code Override.

### 2.3 Pourquoi c'est le terrain d'avantage réel du profil dev

Un designer pur qui utilise Framer s'arrête structurellement à la frontière décrite en 2.2
— il n'a pas la compétence pour écrire la logique manquante. Un profil hybride comme celui
visé par cette formation (et explicitement par l'offre qui a déclenché ce
cours) peut franchir cette frontière lui-même, sans dépendre d'un développeur tiers pour
chaque besoin qui dépasse le visuel pur. C'est un avantage concret et démontrable, pas une
affirmation abstraite de polyvalence.

### 2.4 Le piège inverse : la sur-ingénierie par réflexe de développeur

Parce qu'écrire du code est confortable pour un profil dev, le risque symétrique est
d'utiliser un Code Override pour un besoin que les outils natifs auraient parfaitement
couvert — par réflexe, pas par nécessité. Chaque Code Override ajoute une dépendance à du
code à maintenir, alors qu'un Stack ou un variant natif reste modifiable visuellement par
n'importe qui, y compris un futur collaborateur designer sans compétence de code. La
discipline de ce module n'est pas "coder dès que possible" mais "coder seulement quand le
besoin dépasse réellement ce que 2.2 permet de couvrir visuellement".

## 3. Worked examples

### Exemple A — une validation de champ custom sur un formulaire de contact

Besoin : le champ email du formulaire de contact de la landing page doit afficher une
bordure rouge en temps réel si le format saisi n'est pas un email valide, avant la
soumission.

1. Vérifier d'abord qu'aucun outil natif ne couvre ce besoin — Framer ne propose pas de
   validation de format en temps réel sur un champ texte nativement.
2. Écrire un Code Override qui enveloppe le champ : état local (`useState`) pour la valeur
   saisie, fonction de validation simple (expression régulière basique), changement de
   style conditionnel selon la validité.
3. Documenter la décision : "aucune propriété exposée ne peut exprimer une condition
   dynamique basée sur la saisie utilisateur — Code Override justifié."

### Exemple B — le piège inverse : NE PAS coder un changement de couleur au survol

Besoin apparent : le bouton principal doit changer de couleur au survol de la souris.

1. Réflexe de développeur : écrire un Code Override avec un `onMouseEnter`/`onMouseLeave`
   qui change une variable de couleur.
2. Vérification avant de coder (2.4) : Framer propose nativement un variant "hover" sur
   n'importe quel composant, généré automatiquement sans une ligne de code.
3. Conclusion : le Code Override est ici une sur-ingénierie inutile — le variant natif
   suffit, est plus rapide à produire, et reste modifiable par un designer sans compétence
   de code en cas d'évolution future.

## 4. Pièges & misconceptions

- **Utiliser un Code Override pour un besoin qu'un variant/Stack natif aurait couvert.**
  Voir Exemple B — complique la maintenance pour un gain nul, et retire la possibilité à un
  futur collaborateur designer de modifier le comportement sans toucher au code.

- **Écrire un Code Override sans d'abord vérifier la frontière du module D04.** Le réflexe
  correct est toujours : "est-ce que ça se décrit comme une valeur choisie dans un panneau,
  ou comme une logique qui réagit dynamiquement ?" avant d'ouvrir l'éditeur de code.

- **Confondre Code Override et développement d'une vraie application.** Un Code Override
  reste une extension PONCTUELLE d'un composant Framer existant, pas une architecture
  applicative complète — dès que plusieurs Code Overrides commencent à partager un état
  complexe entre eux, c'est un signal que le projet a dépassé ce que Framer doit porter
  (voir module D01, le critère de complexité métier).

## 5. Ancrage TribuZen

- La validation du formulaire de contact de la landing page TribuZen (Exemple A) est un
  Code Override légitime et documenté : aucun outil natif ne couvre ce besoin.
- Tout changement de style au survol ou au clic doit d'abord être testé comme un variant
  natif (D04) avant d'envisager un Code Override — discipline systématique, pas ponctuelle.
- La frontière de ce module confirme, en pratique et pas seulement en théorie (D01), que
  TribuZen l'app reste hors de portée de Framer : le nombre de Code Overrides qu'il faudrait
  pour reproduire son état partagé entre écrans dépasserait très vite ce que l'outil est
  fait pour porter.

## 6. Points clés

1. Un Code Override est un composant TS/React qui injecte une logique dans un élément
   Framer — le point d'extension officiel de l'outil, pas un contournement bricolé.
2. La frontière avec une propriété exposée (D04) : une valeur choisie dans un panneau reste
   native ; une logique qui réagit dynamiquement nécessite un Code Override.
3. C'est le terrain où un profil dev hybride a un avantage réel et démontrable sur un
   designer pur, qui s'arrête structurellement à cette frontière.
4. Le piège symétrique est la sur-ingénierie : coder par réflexe un besoin qu'un outil natif
   (variant, Stack) aurait parfaitement couvert, plus simplement et plus durablement.
5. Plusieurs Code Overrides qui commencent à partager un état complexe entre eux signalent
   que le projet a dépassé ce que Framer est fait pour porter (pont avec le module D01).

## 7. Seeds Anki

```
Qu'est-ce qu'un Code Override dans Framer ?|Un composant TS/React écrit à la main qui injecte une logique custom dans un élément du canvas — le point d'extension officiel de l'outil
Quelle est la frontière entre propriété exposée (D04) et Code Override ?|Une valeur choisie dans un panneau reste une propriété exposée native ; une logique qui réagit dynamiquement à une interaction nécessite un Code Override
Pourquoi un Code Override est-il le terrain d'avantage du profil dev hybride ?|Un designer pur s'arrête à la frontière des outils natifs ; un profil qui sait coder peut franchir cette frontière lui-même sans dépendre d'un développeur tiers
Quel est le piège symétrique du Code Override ?|La sur-ingénierie : coder par réflexe un besoin qu'un outil natif (variant, Stack) aurait couvert plus simplement et de façon plus durable
Que signale la multiplication de Code Overrides qui partagent un état complexe entre eux ?|Que le projet a dépassé la complexité métier que Framer est fait pour porter — signal de retour vers Figma+dev (module D01)
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/d06-code-overrides/`. Tu y identifies un besoin réel
> de la landing page TribuZen qui dépasse les outils natifs, et tu écris le Code Override
> correspondant avec sa justification écrite — brief complet et rubrique de vérification
> dans le README du lab.
