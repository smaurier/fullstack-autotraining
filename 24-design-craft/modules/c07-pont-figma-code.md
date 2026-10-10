---
titre: Pont outillé Figma ↔ code — Variables, Tokens Studio, Style Dictionary
cours: 24-design-craft
bloc: C — Figma (outil)
notions: [Figma Variables API, Tokens Studio, Style Dictionary, pipeline de tokens bout-en-bout, source unique de vérité pour un design system, dépendance honnête vs faux récepteur bricolé]
outcomes: [exporter les tokens Figma vers un JSON structuré, transformer ce JSON en sorties multiples avec Style Dictionary, documenter honnêtement une dépendance non satisfaite plutôt que bricoler un faux pont]
prerequis: [c06-bibliotheques-gouvernance]
next: c07bis-figma-ai-assiste
tribuzen: pipeline réel de tokens Figma Variables vers tokens CSS/Tamagui consommés par le cours 06 (21-design-system)
last-reviewed: 2026-10
---

# Pont outillé Figma ↔ code — Variables, Tokens Studio, Style Dictionary

> **Outcomes — tu sauras FAIRE :** exporter les tokens Figma vers un JSON structuré et
> versionnable, transformer ce JSON en plusieurs sorties de code avec Style Dictionary à
> partir d'une seule source de vérité, et documenter honnêtement l'état d'une dépendance
> amont plutôt que bricoler un faux récepteur qui ne prouve rien.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le module C03 a produit des styles/tokens Figma pour la palette TribuZen (sauge, terracotta,
blanc chaud) et la typographie (Fraunces, Inter). Le cours 06 (`21-design-system/`) construit
en parallèle un design system EN CODE — Tailwind, tokens CSS, Tamagui. Si personne ne relie
explicitement les deux, le risque concret est que les deux évoluent chacun de leur côté :
un ajustement de la couleur d'accent décidé dans Figma (ex. l'extension pour l'état d'erreur,
module B02) n'a aucune raison mécanique de se retrouver un jour dans le code — quelqu'un doit
le recopier à la main, avec le risque d'oubli ou d'erreur déjà rencontré au module C06 à
l'échelle d'un seul fichier Figma, mais ici à l'échelle Figma-vers-code.

Ce module construit le pipeline qui évite cette recopie manuelle : une seule source
(Figma Variables), transformée automatiquement en plusieurs sorties de code.

## 2. Théorie complète, concise

### 2.1 Figma Variables API : la porte d'entrée programmatique

Les **Variables** Figma (couleurs, nombres, chaînes, booléens, avec des modes comme
light/dark) ne sont pas seulement consultables à l'œil dans l'interface : Figma expose une
**API** qui permet de les lire et de les exporter par programme (via un plugin ou l'API REST
Figma). C'est cette porte d'entrée qui rend possible toute automatisation ultérieure — sans
elle, la seule option serait de relire les valeurs à l'œil et de les retaper à la main dans
le code, ce que ce module cherche justement à éliminer.

### 2.2 Tokens Studio : structurer les tokens avant de les exporter

**Tokens Studio** est un plugin tiers très utilisé pour gérer des tokens plus complexes que
ce que les styles natifs Figma permettent seuls : alias (un token qui référence un autre
token plutôt qu'une valeur brute), thèmes multiples (ex. light/dark, ou marque A/marque B),
et surtout un **export JSON structuré** avec une possibilité de synchronisation Git directe.
C'est l'outil qui transforme des styles Figma épars en un fichier de données exploitable par
un outil de build.

### 2.3 Style Dictionary : une source, plusieurs sorties

**Style Dictionary** (outil open-source d'Amazon) prend en entrée UN fichier JSON de tokens
et génère, à partir de cette seule source, plusieurs **sorties** adaptées à différentes
cibles : CSS custom properties (`--color-accent: ...`), un module JS/TS exportable, des
ressources natives iOS ou Android si besoin un jour. Le principe central : la source de
vérité est unique (le JSON), les sorties sont dérivées, jamais maintenues à la main en
parallèle.

```
Figma Variables (sauge, terracotta, blanc chaud, Fraunces, Inter)
        │  export (Tokens Studio ou API Figma)
        ▼
   tokens.json  (source unique de vérité)
        │  Style Dictionary (build)
        ▼
  ┌─────────────┬─────────────┬─────────────┐
  │ tokens.css  │ tokens.ts   │ (iOS/Android│
  │ (--color-*) │ (objet JS)  │  si besoin) │
  └─────────────┴─────────────┴─────────────┘
```

### 2.4 Le pipeline bout-en-bout, et ce qu'il prouve réellement

Le pipeline complet visé : **Figma Variables → export JSON (Tokens Studio) → Style
Dictionary → tokens CSS/Tamagui consommés par le cours 06**. Ce n'est pas une démonstration
théorique : le but est de faire tourner réellement chaque étape et de vérifier que la sortie
CSS générée est effectivement UTILISABLE par le code du cours 06 — pas juste "ça devrait
marcher en théorie". C'est précisément le terrain où un profil dev dépasse un designer pur :
comprendre ET scripter cette chaîne, pas seulement en parler.

### 2.5 Dépendance honnête : vérifier avant de prétendre un pont complet

Ce pipeline suppose que le cours 06 a déjà de VRAIS tokens côté code prêts à recevoir cette
sortie. Si ce n'est pas le cas au moment du lab, la bonne pratique n'est pas de bricoler un
faux récepteur (un fichier CSS fictif qui ne sert à rien de réel) pour "faire comme si" le
pont était complet — ce serait un corrigé déguisé qui ne prouve rien, contraire à la
discipline d'honnêteté du cours. La bonne pratique : exécuter le pipeline jusqu'à la sortie
Style Dictionary réelle, documenter explicitement l'état de la dépendance (prêt / pas prêt),
et reporter l'intégration finale au moment où le cours 06 est prêt à la recevoir.

## 3. Worked examples

### Exemple A — exporter et transformer la palette TribuZen

1. Dans Figma, structurer les Variables de couleur (sauge, terracotta, blanc chaud, et
   l'extension d'erreur du module B02) avec Tokens Studio.
2. Exporter en JSON : chaque couleur devient une entrée nommée sémantiquement (ex.
   `color.sage.500`, `color.terracotta.500`, `color.error.500`), pas juste une valeur hex
   brute sans nom.
3. Configurer Style Dictionary avec ce JSON en entrée et une sortie CSS custom properties en
   cible.
4. Lancer le build Style Dictionary — vérifier que le fichier CSS généré contient bien
   `--color-sage-500: #...;` etc., directement utilisable par une feuille de style.

### Exemple B — documenter une dépendance non satisfaite plutôt que la bricoler

Situation : au moment du lab, le cours 06 n'a pas encore de structure de tokens CSS prête à
recevoir cet export (cas réel possible, à vérifier avant de commencer).

1. Exécuter quand même tout le pipeline jusqu'à la sortie Style Dictionary — la partie Figma
   → JSON → CSS est indépendante de l'état du cours 06.
2. Documenter explicitement : "le cours 06 n'a pas encore de structure de tokens prête à
   recevoir cette sortie au [date] — la sortie CSS générée est prête mais pas encore
   intégrée."
3. Ne JAMAIS créer un fichier CSS fictif dans le cours 06 juste pour "montrer que ça marche"
   — ça produirait une preuve fausse d'une intégration qui n'a pas eu lieu.

## 4. Pièges & misconceptions

- **Exporter des valeurs hex brutes sans nom sémantique.** `#8BA888` seul ne dit rien ; un
  token nommé `color.sage.500` porte l'intention et reste lisible même si la valeur change.

- **Croire que Style Dictionary "devine" la structure des tokens.** Il transforme
  exactement ce qu'on lui donne en entrée — un JSON mal structuré produit une sortie mal
  structurée, le soin apporté en amont (Tokens Studio) compte autant que l'outil de build.

- **Bricoler un faux récepteur côté cours 06 pour prétendre que le pont est complet** — voir
  2.5. C'est le piège le plus coûteux du module car il produit une preuve de réussite fausse.

- **Modifier directement le fichier CSS généré à la main après un build.** Toute correction
  doit remonter à la source (Figma Variables ou le JSON), sinon le prochain build écrase la
  correction sans explication apparente.

## 5. Ancrage TribuZen

- Le JSON de tokens TribuZen devient la source de vérité réutilisée à chaque évolution de
  palette ou de typographie décidée côté Figma (modules B02, B03) — plus de recopie manuelle
  vers le code.
- L'état de la dépendance avec le cours 06, documenté honnêtement dans ce lab, est un vrai
  signal de planning : il indique quand l'intégration finale peut réellement avoir lieu.
- Ce pipeline, une fois fiable, devient un argument concret de portfolio : la preuve d'un
  profil qui comprend le design ET sait le relier au code par l'outillage, pas seulement par
  la bonne volonté de recopier à la main.

## 6. Points clés

1. Les Figma Variables sont exposées par une API — c'est elle qui rend possible toute
   automatisation, sans elle il faudrait tout retaper à la main dans le code.
2. Tokens Studio structure les tokens (alias, thèmes) avant export, Style Dictionary
   transforme cette source unique en plusieurs sorties de code.
3. Le principe central : une source unique de vérité, des sorties dérivées — jamais
   maintenues manuellement en parallèle.
4. Vérifier l'état réel d'une dépendance amont (ici le cours 06) avant de prétendre un pont
   complet — documenter honnêtement plutôt que bricoler un faux récepteur.
5. Ce pipeline est le terrain où un profil dev dépasse un designer pur : savoir scripter la
   chaîne Figma → code, pas seulement en parler en entretien.

## 7. Seeds Anki

```
Que permet l'API Figma Variables que le panneau visuel seul ne permet pas ?|Lire et exporter les variables par programme (plugin ou API REST), porte d'entrée de toute automatisation vers le code
Quel est le rôle de Tokens Studio dans ce pipeline ?|Structurer les tokens (alias, thèmes multiples) et les exporter en JSON structuré, avant transformation par Style Dictionary
Quel est le principe central de Style Dictionary ?|Une seule source de tokens (JSON) en entrée, plusieurs sorties de code générées (CSS, JS, natif) — jamais maintenues manuellement en parallèle
Que faire si le récepteur du pipeline (ici le cours 06) n'est pas prêt à recevoir la sortie ?|Exécuter le pipeline jusqu'à la sortie réelle, documenter honnêtement l'état de la dépendance, ne jamais bricoler un faux récepteur pour simuler une intégration
Pourquoi nommer les tokens sémantiquement (ex. color.sage.500) plutôt qu'exporter des valeurs hex brutes ?|Un nom sémantique porte l'intention et reste lisible même si la valeur change ; une valeur hex brute seule ne dit rien du rôle du token
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/c07-pont-figma-code/`. Tu y exportes réellement les
> tokens Figma de TribuZen vers un JSON, tu les transformes en sortie CSS via Style
> Dictionary, et tu documentes honnêtement l'état de la dépendance avec le cours 06 — brief
> complet et rubrique de vérification dans le README du lab.
