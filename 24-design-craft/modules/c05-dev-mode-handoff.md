---
titre: Dev Mode / handoff — ce qu'un dev doit pouvoir lire sans demander
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [Dev Mode Figma, calques nommés explicitement, specs générées automatiquement, dépendance aux tokens déjà posés, handoff outillé vs handoff manuel]
outcomes: [préparer un fichier Figma pour que Dev Mode produise des specs fiables, nommer systématiquement les calques pour qu'aucun ne reste orphelin, diagnostiquer pourquoi un fichier mal préparé rend Dev Mode trompeur plutôt qu'utile]
prerequis: [c04-prototypage]
next: c06-bibliotheques-gouvernance
tribuzen: préparation d'un fichier TribuZen existant pour Dev Mode, zéro calque orphelin, zéro valeur libre
last-reviewed: 2026-10
---

# Dev Mode / handoff — ce qu'un dev doit pouvoir lire sans demander

> **Outcomes — tu sauras FAIRE :** préparer un fichier Figma pour que Dev Mode produise des
> specs fiables, nommer systématiquement les calques pour qu'aucun ne reste orphelin, et
> diagnostiquer pourquoi un fichier mal préparé rend Dev Mode trompeur plutôt qu'utile.
> **Difficulté :** ⭐

## 1. Cas concret d'abord

Un fichier Figma envoyé à un dev (ou à soi-même, en mode "autre casquette", cf. module A11)
contient des calques nommés "Rectangle 47", "Groupe 12", "Frame copy 3" — l'héritage de
manipulations successives sans jamais renommer. Ouvrir Dev Mode sur ce fichier produit des
specs CSS techniquement exactes mais totalement illisibles : impossible de savoir quel
"Rectangle 47" correspond au bouton principal versus un fond décoratif. Le dev pose alors la
question qu'un bon handoff devait éviter. Ce module construit la discipline qui rend Dev Mode
réellement utile, plutôt qu'un outil qui donne un faux sentiment de clarté sur un fichier mal
préparé.

## 2. Théorie complète, concise

### 2.1 Dev Mode : une vue d'inspection, pas un correcteur

**Dev Mode** est une vue Figma dédiée à l'inspection : elle affiche des mesures précises
(dimensions, espacements), génère des specs CSS approximatives, et permet d'inspecter les
tokens/styles utilisés par un calque sélectionné. Point essentiel : Dev Mode **affiche
fidèlement ce qui existe déjà dans le fichier** — il ne corrige rien, ne devine rien, et ne
rend pas lisible un fichier qui ne l'était pas avant.

### 2.2 Les deux prérequis qui rendent Dev Mode utile

Dev Mode ne produit des specs fiables que si deux conditions, déjà construites dans les
modules précédents de ce bloc, sont remplies :

1. **Calques nommés explicitement** — jamais "Rectangle 47" ou "Groupe 12" par défaut, mais
   des noms qui décrivent le rôle du calque ("bouton-principal", "icone-routine",
   "fond-carte"). Un calque orphelin (nom par défaut non renommé) force le dev à deviner.
2. **Tokens/styles utilisés partout, aucune valeur libre** (module C03) — Dev Mode affiche
   le NOM du token s'il existe ("color-accent") ; s'il n'existe pas, il affiche une valeur
   hexadécimale brute sans aucune indication de son rôle sémantique.

Sans ces deux conditions, Dev Mode affiche des informations techniquement correctes mais
sémantiquement vides — un dev lit "Rectangle 47, background #C4714A" sans savoir si c'est le
CTA principal ou un fond décoratif accessoire.

### 2.3 Pourquoi un Dev Mode mal préparé est PIRE qu'aucune spec

Un fichier sans Dev Mode force le dev à poser des questions explicitement — l'incertitude est
visible et assumée. Un fichier avec Dev Mode activé mais mal préparé donne l'ILLUSION d'une
spec complète et fiable (des chiffres précis, des valeurs CSS générées) alors que le sens
réel (quel élément, quel rôle) reste absent. Le dev risque alors de deviner avec confiance
plutôt que de questionner — le pire des deux scénarios, parce que l'erreur qui en résulte
n'est détectée que plus tard, en recette.

### 2.4 Le lien explicite avec le module A11 (Design Ops/handoff)

Le module A11 du Bloc A pose le principe général du handoff propre (nommage, versioning,
specs lisibles sans question). Ce module C05 est la version OUTILLÉE de ce même principe,
appliquée spécifiquement à Dev Mode Figma : la discipline est identique, l'outil change.

## 3. Worked examples

### Exemple A — auditer un fichier existant avant d'activer Dev Mode

1. Ouvrir le panneau de calques du fichier (ex. celui du lab C04) et scanner visuellement
   les noms : tout nom par défaut ("Frame 12", "Rectangle 3", "Group") est un calque
   orphelin à renommer.
2. Renommer chaque calque orphelin avec un nom qui décrit son RÔLE dans l'interface, pas sa
   forme géométrique ("fond-carte-routine" plutôt que "Rectangle 3").
3. Sélectionner chaque composant un par un en Dev Mode et vérifier que les valeurs affichées
   (couleur, texte) montrent bien un NOM de token (cf. module C03), pas une valeur
   hexadécimale brute — si une valeur brute apparaît, c'est qu'un calque utilise encore une
   valeur libre à corriger.
4. Seulement une fois ces deux vérifications terminées, considérer le fichier prêt pour un
   handoff réel.

### Exemple B — diagnostiquer un handoff qui a mal tourné

Symptôme : un dev a implémenté un composant avec un espacement visiblement différent de la
maquette, malgré un handoff en Dev Mode.

1. Vérifier si le calque concerné était nommé explicitement — s'il s'appelait "Frame 8", le
   dev a probablement travaillé sur le bon élément visuel mais sans certitude sur l'intention
   exacte derrière chaque mesure.
2. Vérifier si l'espacement provenait d'un token d'espacement nommé ou d'une valeur libre —
   une valeur libre (ex. "17px" sans nom) laisse le dev deviner si c'est une valeur
   intentionnelle précise ou une approximation issue d'un glisser-déposer imprécis.
3. Conclusion : l'erreur de handoff vient presque toujours d'un défaut de préparation en
   amont (C03, nommage de calques), jamais d'un défaut de l'outil Dev Mode lui-même.

## 4. Pièges & misconceptions

- **Croire que Dev Mode "corrige" automatiquement un fichier mal organisé.** Voir 2.1 — Dev
  Mode affiche fidèlement ce qui existe, il ne devine jamais l'intention derrière un calque
  mal nommé.

- **Activer Dev Mode sur un fichier non préparé en pensant gagner du temps.** Voir 2.3 — le
  résultat est pire qu'aucune spec, parce que l'illusion de clarté encourage le dev à deviner
  avec confiance plutôt qu'à questionner.

- **Renommer les calques "pour faire propre" sans réfléchir au RÔLE qu'ils décrivent.** Un
  nom descriptif de forme ("rectangle-rouge") n'est pas meilleur qu'un nom par défaut — le nom
  doit décrire la fonction ("bouton-cta-principal"), pas l'apparence.

- **Considérer le handoff terminé après le renommage sans vérifier les valeurs libres.** Les
  deux conditions de 2.2 (nommage ET tokens) sont nécessaires ensemble — l'une sans l'autre
  laisse le fichier à moitié préparé.

## 5. Ancrage TribuZen

- Le fichier du lab C04 (prototype `GazettePreview` ou équivalent) devient le premier fichier
  TribuZen réellement préparé pour un handoff Dev Mode complet.
- La discipline posée ici (zéro calque orphelin, zéro valeur libre) doit devenir systématique
  pour tout futur fichier Figma de TribuZen, pas une correction ponctuelle une fois par cours.
- Ce module prépare directement le module C06 (bibliothèques partagées) : un fichier propre
  en nommage et en tokens est le prérequis pour en faire une source de vérité partagée.

## 6. Points clés

1. Dev Mode affiche fidèlement ce qui existe dans un fichier — il ne corrige ni ne devine
   l'intention derrière un calque mal nommé ou une valeur libre.
2. Deux conditions rendent Dev Mode utile : des calques nommés par leur rôle, et des
   tokens/styles utilisés partout plutôt que des valeurs libres.
3. Un Dev Mode activé sur un fichier mal préparé est pire qu'aucune spec : il donne une
   illusion de clarté qui encourage à deviner avec confiance plutôt qu'à questionner.
4. Ce module est la version outillée (Figma Dev Mode) du principe général de handoff déjà
   posé en A11 — même discipline, outil spécifique.
5. Une erreur d'implémentation après un handoff en Dev Mode vient presque toujours d'un
   défaut de préparation amont, jamais d'un défaut de l'outil lui-même.

## 7. Seeds Anki

```
Dev Mode corrige-t-il un fichier Figma mal organisé ?|Non — Dev Mode affiche fidèlement ce qui existe déjà, il ne devine ni ne corrige l'intention derrière un calque mal nommé ou une valeur libre
Quelles sont les deux conditions qui rendent Dev Mode réellement utile ?|Des calques nommés explicitement par leur rôle, et des tokens/styles utilisés partout plutôt que des valeurs libres
Pourquoi un Dev Mode activé sur un fichier mal préparé est-il pire qu'aucune spec ?|Il donne une illusion de clarté (chiffres précis, specs générées) qui encourage le dev à deviner avec confiance plutôt qu'à poser une question
Un nom de calque comme "rectangle-rouge" est-il un bon nommage ?|Non — il décrit l'apparence, pas le rôle fonctionnel. Un bon nom décrit la fonction ("bouton-cta-principal"), pas la forme ou la couleur
D'où vient presque toujours une erreur d'implémentation après un handoff en Dev Mode ?|D'un défaut de préparation amont (calque mal nommé, valeur libre non tokenisée), rarement d'un défaut de l'outil Dev Mode lui-même
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c05-dev-mode-handoff/`. Tu y prépares un fichier
> TribuZen existant pour Dev Mode, zéro calque orphelin et zéro valeur libre — brief complet
> et rubrique de vérification dans le README du lab.
