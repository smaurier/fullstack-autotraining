---
titre: Théorie de la couleur, complète
cours: 24-design-craft
bloc: B — Culture et théorie du design
notions: [cercle chromatique, harmonies complémentaire analogue triadique, modèles RVB CMJN HSL, psychologie et symbolique culturelle de la couleur, différence entre théorie de la couleur et accessibilité WCAG]
outcomes: [construire une palette par une harmonie choisie et nommée plutôt qu'au goût, choisir un modèle de couleur selon le support, anticiper une connotation culturelle avant de la subir, distinguer théorie de la couleur et contrainte de contraste accessible]
prerequis: [b01-histoire-du-design]
next: b03-typographie
tribuzen: palette sauge/terracotta/blanc chaud de design.md — reconstruire sa logique d'harmonie plutôt que de la prendre comme acquise
last-reviewed: 2026-10
---

# Théorie de la couleur, complète

> **Outcomes — tu sauras FAIRE :** construire une palette par une harmonie chromatique
> choisie et nommée (pas au goût), choisir le bon modèle de couleur selon le support
> (écran vs impression), anticiper la connotation culturelle d'une couleur avant de la
> subir en production, et distinguer clairement théorie de la couleur et contrainte
> d'accessibilité WCAG — les deux sont nécessaires, aucune ne remplace l'autre.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

`tribuzen/design.md` pose déjà une palette : sauge, terracotta, blanc chaud. Si on demande
"pourquoi ces trois couleurs ensemble plutôt que trois autres ?", la réponse honnête
aujourd'hui serait "ça allait bien visuellement" — une réponse de goût, pas de théorie.

Imaginons maintenant qu'un client (ou un recruteur type Maxence/Arkane) demande d'étendre
cette palette avec une quatrième couleur pour un état d'erreur, et une cinquième pour un
badge "nouveau". Sans théorie, le choix se refait au hasard, avec le risque réel de produire
une palette qui jure visuellement ou qui envoie un signal culturel non voulu (le rouge
n'est pas universellement "danger" ; le blanc n'est pas universellement "pureté"). Avec la
théorie de ce module, l'extension se calcule : quelle relation chromatique (complémentaire,
analogue) la nouvelle couleur doit-elle avoir avec sauge/terracotta pour rester dans le même
système, et quelle connotation culturelle vérifier avant de la figer.

## 2. Théorie complète, concise

### 2.1 Le cercle chromatique — l'outil, pas la décoration

Le cercle chromatique organise les couleurs selon leur relation angulaire. Trois familles
de relations, utilisées pour justifier une palette plutôt que la deviner :

- **Complémentaires** (opposées sur le cercle, ex. bleu/orange, rouge/vert) — contraste
  maximal, forte énergie visuelle. Utile pour un CTA qui doit sortir du reste de l'écran
  sans ambiguïté. Risque : vibration visuelle désagréable si les deux couleurs sont
  utilisées à surface égale et à pleine saturation — on complémente en déséquilibrant les
  proportions (une couleur dominante à 80-90%, l'autre en accent).
- **Analogues** (voisines sur le cercle, ex. sauge-vert/terracotta-orange sont presque sur
  ce schéma) — harmonie douce, cohérente, peu de tension visuelle. C'est très probablement
  le schéma déjà utilisé intuitivement par TribuZen (voir Worked example A).
- **Triadiques** (trois couleurs équidistantes sur le cercle, 120° d'écart) — équilibre
  entre harmonie et contraste, utilisé quand une palette a besoin de 3 couleurs d'égale
  importance (ex. 3 catégories de contenu à distinguer visuellement sans hiérarchie entre
  elles).

### 2.2 Modèles de couleur — RVB, CMJN, HSL : pas des synonymes

- **RVB (RGB)** : modèle additif, lumière émise (écrans). Un pixel blanc = rouge+vert+bleu
  à pleine intensité. C'est le modèle natif du numérique — Figma, CSS, Framer travaillent
  en RVB (ou ses dérivés hexadécimaux).
- **CMJN (CMYK)** : modèle soustractif, encre déposée sur papier (impression). Le blanc
  n'est PAS "toutes les encres à fond" — c'est l'absence d'encre, le papier lui-même. Une
  couleur qui paraît vibrante en RVB sur écran (ex. un bleu électrique) peut paraître terne
  une fois imprimée en CMJN — les gammuts (plages de couleurs reproductibles) ne sont pas
  identiques. **Conséquence pratique pour le Bloc F (marque multi-supports)** : une charte
  graphique qui doit sortir en impression (carte de visite, flyer) doit être vérifiée en
  CMJN avant livraison, pas supposée identique au rendu écran.
- **HSL (Teinte/Saturation/Luminosité)** : modèle perceptuel, pensé pour les humains, pas
  pour les capteurs. La Teinte (Hue, 0-360°) correspond à la position sur le cercle
  chromatique ; la Saturation contrôle l'intensité (0% = gris) ; la Luminosité contrôle la
  clarté (0% = noir, 100% = blanc). **C'est le modèle à utiliser pour RAISONNER sur une
  palette** (varier la luminosité d'une même teinte donne les nuances 100-900 d'un design
  system, exactement ce que fait Tailwind avec `sage-100` → `sage-900`), même si le fichier
  final est stocké en hexadécimal RVB.

### 2.3 Harmonies en pratique — construire, pas deviner

```
Palette TribuZen reconstruite par la théorie (exemple de méthode, pas la palette finale) :

1. Choisir une teinte de base en HSL : sauge ≈ hsl(140, 20%, 45%) — vert désaturé, luminosité moyenne
2. Chercher l'harmonie ANALOGUE (±30-40° sur le cercle) pour la deuxième couleur :
   terracotta ≈ hsl(20, 55%, 55%) — à ~120° de sauge, pas strictement analogue au sens
   strict (30°), c'est en réalité une relation plus proche d'une harmonie "tierce" douce.
   Honnêteté du module : la palette existante de TribuZen n'est pas un manuel d'harmonie
   pure — c'est normal, les palettes réelles mélangent souvent les logiques. Le but de ce
   module n'est pas de "corriger" TribuZen mais de savoir NOMMER la logique employée.
3. Le blanc chaud n'est pas sur le cercle chromatique (c'est une quasi-neutre, forte
   luminosité, très faible saturation) — il joue le rôle de fond, pas de couleur d'accent.
4. Pour étendre (cas concret ci-dessus) : une couleur d'erreur doit rester lisible comme
   "différente et alarmante" sans jurer avec sauge/terracotta — un rouge-brique légèrement
   désaturé (proche de la famille terracotta en teinte mais plus saturé et plus sombre en
   luminosité) reste dans le même système tout en se distinguant clairement.
```

### 2.4 Psychologie et symbolique culturelle — ne jamais supposer l'universel

Une couleur ne porte pas un sens fixe et universel — le sens est culturellement construit
et varie significativement :

| Couleur | Occident (général) | Autre lecture possible |
|---|---|---|
| Rouge | Danger, urgence, amour | Chance et prospérité (Chine) |
| Blanc | Pureté, propreté, mariage | Deuil (Inde, certaines cultures d'Asie de l'Est) |
| Vert | Nature, croissance, "OK" | Peut signifier maladie/jalousie dans certains contextes historiques occidentaux |
| Violet | Luxe, créativité, spiritualité | Deuil (Brésil, Thaïlande) |

**Conséquence pratique** : une palette pensée uniquement pour un marché français (comme
TribuZen, usage familial francophone pour l'instant) n'a pas besoin de neutraliser toute
connotation culturelle — mais le SAVOIR évite une erreur si le produit s'internationalise
un jour, et c'est une question légitime à poser en entretien ou en mission dès qu'un client
vise un marché international.

### 2.5 Théorie de la couleur ≠ contraste WCAG — deux disciplines, pas une seule

Point de vigilance explicite : le contraste WCAG (ratio de luminance entre texte et fond,
seuils 4.5:1 / 3:1 selon le contexte) est une **contrainte d'accessibilité**, mesurée par un
outil, binaire (conforme/non conforme). La théorie de la couleur de ce module est une
**discipline de composition** (quelle relation entre les teintes, quelle connotation).

Une palette peut être harmonieuse selon la théorie (ex. deux couleurs analogues, esthétique
cohérente) et complètement non conforme WCAG (si les deux couleurs ont une luminosité trop
proche, le contraste texte/fond s'effondre). Inversement, une palette peut être 100%
conforme WCAG et esthétiquement incohérente (des couleurs qui respectent le contraste mais
n'ont aucune relation chromatique entre elles). **Les deux validations sont nécessaires et
indépendantes** — ce module construit la palette, un module ultérieur (déjà présent côté
Bloc A/C du cours) vérifie son contraste avec un outil réel.

## 3. Worked examples

### Exemple A — nommer la logique de la palette TribuZen existante

Palette donnée : sauge (vert désaturé), terracotta (orange-brun), blanc chaud.

1. Convertir chaque couleur en HSL pour raisonner sur sa position : sauge ≈ 140°,
   terracotta ≈ 20°. Écart angulaire ≈ 120° — proche d'une relation triadique douce plutôt
   qu'analogue stricte, mais désaturée (faible saturation sur les deux) ce qui adoucit la
   tension qu'une vraie triade pleinement saturée aurait produite.
2. Le blanc chaud (haute luminosité, très faible saturation, légère teinte chaude côté
   jaune/orange) crée une cohérence avec terracotta (même famille chaude) tout en restant
   assez neutre pour servir de fond sans dominer visuellement.
3. Conclusion nommable : "palette à dominante désaturée, deux teintes en tension douce
   (~120°), un fond neutre chaud qui rejoint une des deux teintes d'accent." C'est une
   phrase qu'on peut défendre en entretien — "ça allait bien" ne l'est pas.

### Exemple B — étendre la palette pour un état d'erreur sans la casser

Besoin : une couleur d'erreur distincte, pas dans la palette actuelle.

1. Contrainte théorique : rester dans la même famille de saturation (désaturée, cohérente
   avec sauge/terracotta) pour ne pas introduire une couleur "criarde" qui jure.
2. Contrainte sémantique : le rouge reste la connotation danger/erreur la plus robuste en
   UI occidentale (voir 2.4) — pas de raison de s'en écarter pour un produit francophone.
3. Résultat : un rouge-brique désaturé, proche en teinte de terracotta mais décalé vers le
   rouge pur et plus sombre en luminosité pour se distinguer sans jurer. Vérification WCAG
   (module séparé) à faire ensuite sur le blanc chaud en fond — ne pas supposer que "ça doit
   marcher" parce que la théorie de couleur est respectée.

## 4. Pièges & misconceptions

- **Confondre harmonie chromatique et accessibilité.** Voir 2.5 — une palette harmonieuse
  peut échouer un test de contraste, et réciproquement. Toujours vérifier les deux,
  séparément, avec les bons outils pour chacune.

- **Supposer qu'une couleur a un sens universel.** "Le vert = succès" est une convention UI
  très répandue en Occident, pas une loi universelle de la perception. Documenter la
  connotation visée explicitement plutôt que la supposer acquise, surtout dès qu'un produit
  vise un marché culturellement différent.

- **Travailler en RVB/hexadécimal pour raisonner sur une palette.** Faire varier `#8BA888`
  pour obtenir une nuance plus claire à l'œil est fastidieux et imprécis. Convertir en HSL,
  faire varier la Luminosité (ou la Saturation), reconvertir — c'est exactement la méthode
  utilisée pour générer les échelles 100-900 d'un design system.

- **Oublier le CMJN pour un support qui sera imprimé.** Une couleur vérifiée uniquement à
  l'écran (RVB) peut décevoir une fois imprimée (carte de visite, flyer du Bloc F) — les
  gammuts RVB et CMJN ne se recouvrent pas totalement, certains bleus/verts vifs RVB n'ont
  pas d'équivalent fidèle en CMJN.

- **Choisir une harmonie complémentaire à pleine saturation sur les deux couleurs à parts
  égales.** Produit une vibration visuelle inconfortable (effet "after-image" rétinien). La
  règle pratique : une couleur dominante (80-90% de la surface), l'autre en accent ponctuel.

## 5. Ancrage TribuZen

- La palette `design.md` (sauge/terracotta/blanc chaud) peut désormais être documentée avec
  sa logique d'harmonie réelle (Exemple A) plutôt que comme un choix esthétique flottant —
  à ajouter dans `design.md` comme justification écrite.
- Toute extension future de palette (état d'erreur, badge, catégorie de contenu) doit
  passer par le raisonnement de l'Exemple B : position HSL relative, cohérence de
  saturation, connotation sémantique vérifiée — pas un choix au goût isolé.
- Les échelles de nuances (si TribuZen en construit, ex. `sage-100` à `sage-900` pour les
  tokens Tamagui du cours 06) se construisent en faisant varier la Luminosité HSL à teinte
  et saturation constantes — méthode directement issue de 2.2.

## 6. Points clés

1. Le cercle chromatique organise 3 familles de relations utiles pour justifier une
   palette : complémentaire (contraste fort), analogue (harmonie douce), triadique
   (équilibre à 3 couleurs).
2. RVB (écran, additif), CMJN (impression, soustractif) et HSL (perceptuel, pour raisonner)
   ne sont pas interchangeables — un rendu RVB peut décevoir en CMJN.
3. HSL est le modèle pour RAISONNER sur une palette (faire varier teinte/saturation/
   luminosité séparément) même si le stockage final reste en hexadécimal.
4. Aucune couleur n'a un sens universel — la symbolique est culturellement construite,
   à documenter explicitement plutôt qu'à supposer.
5. Théorie de la couleur (composition, harmonie) et accessibilité WCAG (contraste mesuré)
   sont deux disciplines indépendantes — valider les deux séparément, jamais l'une à la
   place de l'autre.
6. Une harmonie complémentaire à pleine saturation sur deux couleurs à parts égales produit
   une vibration visuelle inconfortable — déséquilibrer les proportions (dominante/accent).

## 7. Seeds Anki

```
Quelle est la différence entre une harmonie complémentaire et une harmonie analogue ?|Complémentaire = couleurs opposées sur le cercle (contraste fort) ; analogue = couleurs voisines (harmonie douce, peu de tension)
Pourquoi RVB et CMJN ne donnent-ils pas toujours le même résultat visuel ?|RVB (additif, écran) et CMJN (soustractif, impression) ont des gammuts différents — certaines couleurs vives en RVB n'ont pas d'équivalent fidèle en CMJN
Pourquoi utiliser HSL plutôt que RVB pour raisonner sur une palette ?|HSL sépare teinte/saturation/luminosité de façon perceptuelle — faire varier la luminosité seule donne directement les nuances d'une échelle de design system
Le contraste WCAG et la théorie de la couleur sont-ils la même chose ?|Non — le contraste WCAG est une contrainte d'accessibilité mesurée par un outil ; la théorie de la couleur est une discipline de composition (harmonie, connotation). Les deux sont nécessaires, indépendamment.
Pourquoi éviter une harmonie complémentaire à pleine saturation sur deux couleurs à parts égales ?|Ça produit une vibration visuelle inconfortable (effet after-image) — il faut déséquilibrer les proportions (une dominante, une en accent)
Le rouge signifie-t-il "danger" dans toutes les cultures ?|Non — en Chine par exemple le rouge connote la chance et la prospérité, pas le danger. La symbolique des couleurs est culturellement construite, jamais universelle par défaut.
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/b02-theorie-couleur/`. Tu y construis une palette
> complète pour TribuZen (ou l'étends) en choisissant et nommant explicitement une harmonie
> chromatique, en vérifiant une connotation culturelle, et en justifiant le modèle de
> couleur utilisé — brief complet et rubrique de vérification dans le README du lab.
