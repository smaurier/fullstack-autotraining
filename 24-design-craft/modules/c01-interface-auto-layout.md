---
titre: Interface, frames, auto-layout — le vrai levier de productivité
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [frame vs groupe, auto-layout direction/gap/padding, mode resize Hug contents vs Fill container, imbrication d'auto-layouts, responsive pensé dès la construction]
outcomes: [construire un composant en auto-layout qui s'adapte à un contenu variable sans retouche manuelle, choisir le bon mode de resize (Hug vs Fill) à chaque niveau d'imbrication, diagnostiquer pourquoi un auto-layout imbriqué casse quand le contenu change]
prerequis: []
next: c02-composants-variants
tribuzen: RoutineCard de TribuZen construite en auto-layout responsive, miroir du composant React déjà codé
last-reviewed: 2026-10
---

# Interface, frames, auto-layout — le vrai levier de productivité

> **Outcomes — tu sauras FAIRE :** construire un composant en auto-layout qui absorbe un
> contenu variable sans aucune retouche manuelle, choisir le bon mode de resize (Hug contents
> vs Fill container) à chaque niveau d'imbrication, et diagnostiquer pourquoi un auto-layout
> imbriqué casse dès que son contenu change.
> **Difficulté :** ⭐

## 1. Cas concret d'abord

`RoutineCard` existe déjà en React dans TribuZen : un composant qui affiche le nom d'une
routine, une icône optionnelle, et s'adapte déjà à un contenu variable grâce à Flexbox/CSS.
Le reflexe d'un profil dev qui découvre Figma est de construire la MÊME carte avec des
calques positionnés à la main, pixel par pixel — puis de devoir tout repositionner dès qu'une
routine a un nom plus long que celle utilisée pour la maquette. C'est exactement le problème
que Flexbox résout déjà côté code, et que l'auto-layout résout côté Figma — avec un
vocabulaire différent mais la même idée.

Ce module construit la version Figma de `RoutineCard` pour qu'elle absorbe un nom de routine
de 3 caractères ou de 40 caractères, avec ou sans icône, SANS qu'un seul calque ait besoin
d'être déplacé à la main entre les deux cas.

## 2. Théorie complète, concise

### 2.1 Frame : un conteneur, pas une photo de la mise en page

Une **frame** Figma est un conteneur qui peut contenir d'autres éléments et réagir à leur
contenu. Elle remplace l'ancien "groupe" (un simple rassemblement visuel d'éléments figés à
leur position relative) : un groupe ne sait pas s'adapter, une frame en auto-layout le sait.
Toute mise en page pensée comme responsive dès le départ doit démarrer en frame, jamais en
groupe — le groupe est réservé à des éléments qui ne changeront jamais de taille relative.

### 2.2 Auto-layout : l'équivalent Figma de Flexbox

L'auto-layout ajoute à une frame un comportement d'agencement automatique, directement
comparable à Flexbox CSS :

| Concept Figma | Équivalent CSS Flexbox |
|---|---|
| Direction (horizontal/vertical) | `flex-direction: row / column` |
| Gap | `gap` |
| Padding | `padding` |
| Alignement | `align-items` / `justify-content` |

### 2.3 Les deux modes de resize — le piège n°1 du débutant

Chaque enfant d'un auto-layout a un mode de resize indépendant :

- **Hug contents** : la frame se redimensionne pour épouser exactement son contenu — un
  bouton avec "Hug" en largeur devient aussi large que son texte, ni plus ni moins. Équivalent
  CSS : `width: fit-content`.
- **Fill container** : l'élément s'étire pour occuper tout l'espace disponible dans son
  parent. Équivalent CSS : `flex: 1` ou `width: 100%` selon le contexte.

Confondre les deux est l'erreur la plus fréquente : un texte en "Hug" à l'intérieur d'une
carte qui devrait "Fill" produit une carte qui reste collée à la largeur de son texte le plus
court testé, au lieu de s'étirer pour remplir son conteneur — visuellement, la carte semble
"ne pas réagir" alors que l'auto-layout fonctionne exactement comme configuré.

### 2.4 Imbrication : chaque niveau a SA propre configuration

Un auto-layout vertical peut contenir un auto-layout horizontal (ex. une carte verticale qui
contient une ligne horizontale icône+texte). Chaque niveau a sa propre direction, son propre
gap, et surtout son propre mode de resize par enfant. L'erreur fréquente : configurer
correctement le niveau extérieur et oublier que le niveau intérieur a BESOIN de sa propre
configuration de resize — sans quoi il garde un comportement par défaut qui casse dès que le
contenu change (ex. une icône qui se retrouve écrasée parce que son conteneur immédiat n'est
pas en "Hug" alors que le conteneur parent est en "Fill").

### 2.5 Pourquoi c'est LE levier de productivité

Un composant en auto-layout correctement configuré à tous ses niveaux absorbe n'importe quel
contenu variable (texte plus long, élément optionnel absent) sans qu'un designer ait besoin
de rouvrir le fichier pour repositionner un seul calque. Un groupe à l'ancienne, lui, doit
être retouché à la main à CHAQUE changement de contenu — le gain de temps n'est pas marginal,
il est structurel : c'est la différence entre un composant qui se maintient lui-même et un
composant qu'il faut entretenir manuellement à chaque usage.

## 3. Worked examples

### Exemple A — `RoutineCard` avec icône optionnelle

1. Frame racine en auto-layout vertical, padding uniforme, gap entre le haut (icône+titre) et
   le reste.
2. Sous-frame horizontale (icône + titre) : icône en mode "Hug" (taille fixe, ne doit jamais
   s'étirer), titre en mode "Fill" (occupe tout l'espace restant sur la ligne).
3. Si l'icône est absente dans une variante, sa sous-frame disparaît et le titre en "Fill"
   récupère automatiquement tout l'espace — AUCUN repositionnement manuel nécessaire si les
   modes de resize ont été correctement posés au point 2.
4. Le texte du titre est lui-même configuré pour passer à la ligne (pas en "Hug" figé sur une
   seule ligne) : un nom de routine long doit pouvoir s'étaler sur 2 lignes sans déborder du
   conteneur.

### Exemple B — diagnostiquer un auto-layout qui casse

Symptôme : une carte reste étroite malgré un texte long qui devrait la forcer à s'étirer.

1. Vérifier le mode de resize du texte lui-même — s'il est en "Hug", le texte déborde ou
   force un élargissement non désiré au lieu de passer à la ligne (comportement attendu d'un
   texte en largeur fixe, pas d'un texte responsive).
2. Vérifier le mode de resize de la frame parente — si elle est elle-même en "Hug" plutôt
   qu'en "Fill" par rapport à SON propre parent, elle ne peut physiquement pas s'étirer, peu
   importe la configuration de ses enfants.
3. Conclusion : un auto-layout qui "ne réagit pas" n'est presque jamais un bug Figma — c'est
   un mode de resize mal posé à un niveau précis de l'imbrication, à chercher niveau par
   niveau plutôt qu'à "retaper toute la carte".

## 4. Pièges & misconceptions

- **Confondre Hug contents et Fill container.** Voir 2.3 — c'est l'erreur la plus fréquente,
  et elle se diagnostique toujours niveau par niveau (voir Exemple B), jamais en devinant.

- **Utiliser un groupe là où une frame en auto-layout s'impose.** Un groupe ne réagit jamais
  à son contenu — s'il y a la moindre chance que le contenu varie (texte, présence/absence
  d'un élément), c'est une frame en auto-layout dès la construction, pas un groupe "pour
  l'instant" qu'on migrera plus tard.

- **Oublier de configurer le resize à CHAQUE niveau d'imbrication.** Configurer seulement le
  niveau extérieur et laisser les niveaux intérieurs au comportement par défaut — voir 2.4.

- **Figer un texte en largeur fixe par réflexe.** Un titre qui doit accueillir un contenu
  variable doit pouvoir passer à la ligne et s'étirer (Fill + retour à la ligne activé), pas
  rester sur une seule ligne qui débordera tôt ou tard.

## 5. Ancrage TribuZen

- `RoutineCard` en Figma devient la référence visuelle directe du composant React déjà codé
  — toute évolution future du design du composant (code ou Figma) doit se vérifier dans les
  deux sens.
- La même logique d'auto-layout (icône optionnelle en "Hug", contenu principal en "Fill")
  s'applique à tout autre composant dense de TribuZen (ex. une ligne du `FamilyDashboard`).
- Les modes de resize posés ici anticipent directement le composant `Button` en variants du
  module suivant (C02) : un bouton doit lui aussi choisir Hug (taille au texte) ou Fill
  (pleine largeur) selon son usage.

## 6. Points clés

1. Une frame en auto-layout est l'équivalent Figma de Flexbox : direction, gap, padding,
   alignement se configurent de la même façon conceptuelle.
2. Hug contents (s'ajuste au contenu) et Fill container (occupe l'espace disponible) sont
   deux modes de resize différents, à ne jamais confondre — c'est l'erreur la plus fréquente.
3. Chaque niveau d'un auto-layout imbriqué a SA PROPRE configuration de resize — configurer
   le niveau extérieur ne suffit pas.
4. Un composant en auto-layout bien configuré absorbe un contenu variable sans retouche
   manuelle ; un groupe à l'ancienne doit être repositionné à la main à chaque changement.
5. Diagnostiquer un auto-layout qui casse se fait niveau par niveau, jamais en devinant ou en
   retapant tout le composant.

## 7. Seeds Anki

```
Quelle est la différence entre Hug contents et Fill container ?|Hug contents ajuste la taille au contenu (comme width:fit-content) ; Fill container occupe tout l'espace disponible du parent (comme flex:1)
Pourquoi une frame est-elle préférable à un groupe dès qu'un contenu peut varier ?|Une frame en auto-layout réagit automatiquement au contenu (texte plus long, élément absent) ; un groupe reste figé et doit être repositionné à la main
Pourquoi configurer seulement le niveau extérieur d'un auto-layout imbriqué ne suffit-il pas ?|Chaque niveau d'imbrication a son propre mode de resize indépendant — le niveau intérieur garde un comportement par défaut tant qu'il n'est pas configuré explicitement
Quel est l'équivalent CSS de l'auto-layout Figma ?|Flexbox : direction = flex-direction, gap = gap, padding = padding, alignement = align-items/justify-content
Comment diagnostiquer un auto-layout qui ne s'étire pas malgré un contenu long ?|Vérifier le mode de resize niveau par niveau, de l'élément concerné jusqu'à la frame racine — le blocage vient presque toujours d'un niveau en Hug qui devrait être en Fill
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c01-interface-auto-layout/`. Tu y construis
> `RoutineCard` en auto-layout testée sur 3 cas de contenu différents, sans aucun
> ajustement manuel — brief complet et rubrique de vérification dans le README du lab.
