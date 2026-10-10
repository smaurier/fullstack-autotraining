---
titre: Cohérence marque ↔ produit — le pont vers les tokens
cours: 24-design-craft
bloc: F — Identité de marque multi-supports
notions: [token sémantique vs valeur recopiée, correspondance marque→token documentée vs implicite, palette de marque partiellement traduite en tokens, nommage par usage vs nommage par valeur]
outcomes: [relier explicitement chaque couleur/typo de marque à un token produit ou justifier son absence de correspondance, nommer un token par son usage plutôt que par sa valeur, documenter une correspondance marque→token traçable dans le temps]
prerequis: [f03-declinaison-multi-supports]
next: f05-licences-typo
tribuzen: tableau de correspondance entre le brand book Nuada/TribuZen et les tokens Figma/CSS du cours 06
last-reviewed: 2026-10
---

# Cohérence marque ↔ produit — le pont vers les tokens

> **Outcomes — tu sauras FAIRE :** relier explicitement chaque couleur et typographie de
> marque à un token produit (ou justifier pourquoi aucun token ne lui correspond), nommer un
> token par son usage plutôt que par sa valeur brute, et documenter cette correspondance de
> façon traçable dans le temps, pas seulement "dans la tête".
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le brand book de Nuada (module F02) fixe une couleur de marque exacte. Le cours 06
(`21-design-system/`) consomme des tokens CSS/Tamagui pour construire l'UI produit. Entre les
deux, une question simple révèle un trou fréquent : si la couleur de marque change demain
(refonte, nouvelle teinte), QUELS tokens produit doivent changer en miroir, et lesquels ne
sont pas concernés ?

Si la réponse n'est écrite nulle part, elle vit "dans la tête" de la seule personne qui a fait
le lien — ici Sylvain. Le jour où quelqu'un d'autre (un dev qui rejoint le projet, ou lui-même
six mois plus tard sans s'en souvenir) doit faire cette mise à jour, il doit soit deviner, soit
tout réinspecter depuis zéro. Ce module construit le document qui évite ça : la correspondance
marque → token, écrite une fois, consultée ensuite.

## 2. Théorie complète, concise

### 2.1 Token sémantique vs valeur recopiée — la même discipline qu'en code

Un token mal nommé recopie une valeur (`terracotta-500`, ou pire directement `#C97B4A`) :
il dit QUOI, jamais POURQUOI. Un token sémantique nomme un USAGE (`color-accent`,
`color-cta`, `color-danger`) : il dit à quoi il sert, indépendamment de sa valeur actuelle.
C'est exactement la discipline de nommage déjà rencontrée côté outil Figma (module C03,
styles & tokens) et côté théorie sémiotique (Bloc B module 6, signifiant/signifié) — un bon
nom de token EST un signe qui porte du sens d'usage, pas une étiquette de valeur.

**Pourquoi ça compte concrètement** : si la couleur d'accent de la marque change de teinte,
un token nommé `color-accent` reste valide sémantiquement (on change juste sa valeur
sous-jacente) ; un token nommé `terracotta-500` devient littéralement faux (on garderait un
nom de couleur qui ne correspond plus à la couleur réelle) — un piège qui se révèle
exactement au moment où on en a le moins besoin, en pleine refonte.

### 2.2 Toutes les couleurs de marque n'ont pas un token produit équivalent

Rappel du module F01 : palette de marque et palette produit ne sont pas identiques. Une
conséquence directe ici : certaines couleurs de marque (ex. une couleur utilisée uniquement
sur le logo imprimé) n'ont tout simplement AUCUN usage en token produit — ce n'est pas un
oubli à combler, c'est une absence légitime à documenter explicitement ("cette couleur reste
réservée à l'usage logo, aucun token produit ne la consomme") plutôt qu'à laisser comme un
flou qui ressemble à un oubli.

### 2.3 Documenter la correspondance — un tableau, pas une intuition

La forme la plus simple et la plus robuste : un tableau à trois colonnes — couleur/typo de
marque (nom + valeur exacte), token(s) produit correspondant(s) (nom sémantique), justification
si aucune correspondance n'existe. Ce tableau devient le document de référence consulté à
chaque évolution de l'un ou l'autre côté (marque ou produit) — il remplace la mémoire humaine
par un artefact vérifiable.

### 2.4 Le piège du lien implicite — pourquoi il se paie plus tard, jamais tout de suite

Une correspondance marque → token qui n'existe que dans la tête du créateur fonctionne
parfaitement... tant que c'est lui qui fait toutes les mises à jour. Le coût caché apparaît au
premier changement fait par quelqu'un d'autre (ou par lui-même après une longue pause) : sans
document, il n'y a aucun moyen de savoir à coup sûr quels tokens sont concernés par un
changement de marque, donc soit on les change tous par précaution (risque de casser des tokens
qui n'avaient pas de lien avec la marque), soit on n'en change qu'une partie et on introduit une
incohérence silencieuse.

## 3. Worked examples

### Exemple A — construire le tableau de correspondance pour Nuada/TribuZen

| Couleur/typo de marque (brand book) | Valeur exacte | Token produit correspondant | Justification si absent |
|---|---|---|---|
| Couleur principale Nuada | `#2F5D4E` (exemple) | `color-brand-primary` | — |
| Couleur d'accent Nuada | `#E8A33D` (exemple) | `color-cta` | — |
| Couleur du logo imprimé uniquement | `#1A1A1A` | *(aucun)* | Réservée aux supports print, jamais consommée en UI produit |
| Police de marque (titres communication) | Fraunces | *(aucun token direct)* | Utilisée en display/communication ; l'UI produit consomme `font-heading` qui PEUT partager cette police sans que ce soit automatique — à vérifier cas par cas |

Chaque ligne est vérifiable : on peut relire le brand book, relire les tokens du cours 06, et
confirmer ou infirmer chaque correspondance — ce n'est plus une affirmation, c'est un document
contrôlable.

### Exemple B — tester la robustesse du tableau à un changement

Simuler un changement de la couleur d'accent de la marque (nouvelle teinte). Avec le tableau
de l'Exemple A : on sait IMMÉDIATEMENT que `color-cta` doit être mis à jour en miroir, et que
`color-brand-primary` et les deux lignes "aucun" ne sont pas concernées. Sans le tableau, cette
même question demanderait de ré-inspecter tout le design system à la recherche de chaque usage
de l'ancienne couleur — un coût bien plus élevé, payé à chaque changement futur plutôt qu'une
seule fois à la rédaction du document.

## 4. Pièges & misconceptions

- **Nommer un token par sa valeur plutôt que son usage.** Voir 2.1 — ça fonctionne jusqu'au
  premier changement de valeur, où le nom devient littéralement faux.

- **Supposer que toute couleur de marque a forcément un équivalent produit.** Voir 2.2 —
  l'absence de correspondance est une information légitime à documenter, pas un trou à
  combler artificiellement en inventant un token inutile.

- **Garder la correspondance "dans la tête" plutôt que dans un document.** Voir 2.4 — le coût
  n'apparaît jamais tout de suite, seulement au premier changement fait sans le créateur
  d'origine disponible ou sans qu'il s'en souvienne précisément.

- **Changer tous les tokens par précaution face à un changement de marque, sans vérifier
  lesquels sont réellement concernés.** Produit l'effet inverse de celui recherché : plus
  d'incohérence, pas moins, en touchant des tokens qui n'avaient aucun lien réel avec la
  marque.

## 5. Ancrage TribuZen

- Le tableau de correspondance (Exemple A) s'applique directement entre `design.md`
  (palette sauge/terracotta/blanc chaud, typo Fraunces + Inter) et les tokens CSS/Tamagui
  consommés par le cours 06 — document à produire même si TribuZen n'a pas de marque
  "officielle" séparée de ses tokens produit (le cas le plus simple : palette de marque et
  palette produit sont alors largement les mêmes, ce qui doit aussi être dit explicitement
  plutôt que supposé).
- Pour Nuada, projet avec une identité de marque plus distincte de son UI produit, ce tableau
  a davantage de lignes "aucune correspondance" légitimes à documenter.

## 6. Points clés

1. Un token sémantique nomme un usage (`color-cta`), jamais une valeur recopiée
   (`terracotta-500`) — même discipline qu'en code, vue aussi en sémiotique (Bloc B).
2. Toutes les couleurs/typos de marque n'ont pas de token produit équivalent — l'absence
   légitime se documente, elle ne se comble pas artificiellement.
3. Un tableau à trois colonnes (marque, token, justification si absent) transforme une
   correspondance implicite en document vérifiable.
4. Le coût d'un lien implicite ne se paie jamais immédiatement, seulement au premier
   changement fait sans la mémoire du créateur d'origine.
5. Face à un changement de marque, le tableau permet de savoir exactement quels tokens
   sont concernés, évitant à la fois le sous-changement et le sur-changement par précaution.

## 7. Seeds Anki

```
Quelle est la différence entre un token sémantique et un token nommé par sa valeur ?|Le token sémantique nomme un usage (color-cta) qui reste valide si la valeur change ; le token nommé par sa valeur (terracotta-500) devient faux au premier changement
Toutes les couleurs de marque ont-elles un token produit équivalent ?|Non — certaines restent réservées à un usage de marque (ex. print) sans jamais être consommées en UI ; cette absence se documente explicitement
Pourquoi documenter la correspondance marque→token dans un tableau plutôt que de la garder en tête ?|Le coût d'un lien implicite apparaît au premier changement fait sans la mémoire du créateur d'origine, obligeant à tout réinspecter
Quel est le risque de changer tous les tokens par précaution face à un changement de marque ?|Ça introduit de l'incohérence en touchant des tokens qui n'avaient en réalité aucun lien avec la couleur de marque modifiée
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/f04-pont-marque-tokens/`. Tu y produis le tableau de
> correspondance complet entre le brand book produit en F02 et les tokens produit existants
> ou à créer — brief complet et rubrique de vérification dans le README du lab.
