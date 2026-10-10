---
titre: Capstone — Flow de facturation à l'usage
cours: 24-design-craft
bloc: Capstone — Étude de cas console SaaS GPU
notions: [compteur de consommation en temps quasi réel, estimation de coût avant confirmation d'action, historique de facturation lisible, hiérarchie visuelle appliquée à une information financière critique, oracle qualitatif "je comprends ce que ça va me coûter avant de cliquer"]
outcomes: [construire un compteur de consommation visible en permanence, afficher une estimation de coût AVANT toute confirmation d'action qui engage une dépense, construire un historique de facturation consultable sans support, hiérarchiser visuellement une information de coût pour qu'elle soit impossible à manquer]
prerequis: [cap02-site-prototype-design-system]
next: ""
tribuzen: capstone console GPU fictive — dernier module du cours, flow de facturation à l'usage du pilotage GPU, synthèse de la quasi-totalité des blocs précédents
last-reviewed: 2026-10
---

# Capstone — Flow de facturation à l'usage

> **Outcomes — tu sauras FAIRE :** construire un compteur de consommation en temps quasi réel,
> afficher une estimation de coût avant toute confirmation d'action payante, construire un
> historique de facturation lisible sans support, et hiérarchiser visuellement une
> information de coût pour qu'elle soit impossible à manquer.
> **Difficulté :** ⭐⭐⭐⭐⭐

## 1. Cas concret d'abord

Un dashboard de contenu classique (comme la plupart des écrans construits dans le reste du
cours, y compris cap02) a pour enjeu principal la lisibilité : si une information est mal
hiérarchisée, l'utilisateur perd du temps mais ne perd rien d'autre. Un flow de facturation
à l'usage change radicalement l'enjeu : si l'utilisateur ne comprend pas ce qu'une action va
lui coûter avant de cliquer, il peut engager une vraie dépense sans l'avoir anticipée. C'est
exactement le type de dashboard que des consoles comme Vercel, AWS ou Stripe doivent
résoudre en permanence — le genre d'écran qui, mal conçu, détruit la confiance d'un
utilisateur en un seul clic malheureux. Ce dernier module du cours construit ce cas
spécifique, le plus exigeant en responsabilité de tout le capstone.

## 2. Théorie complète, concise

### 2.1 Pourquoi la facturation à l'usage est un genre à part

Noté dès le brouillon initial de ce cours (confrontation à l'offre réelle Kerion Cloud,
§1bis) : une console de pilotage technique dense en données n'est pas un genre générique.
Son sous-cas le plus exigeant est la facturation à l'usage, qui ajoute une exigence de
CONFIANCE au-dessus de l'exigence habituelle de lisibilité. L'utilisateur doit pouvoir
ANTICIPER un coût avant de s'engager — un dashboard de contenu classique n'a jamais cette
contrainte temporelle stricte (l'ordre d'affichage de l'information n'a presque jamais
d'impact financier réel ailleurs dans ce cours).

### 2.2 Les trois composants obligatoires du flow

1. **Compteur de consommation en temps quasi réel** : visible en PERMANENCE pendant que la
   ressource (ici, du calcul GPU fictif) est utilisée — jamais caché dans un sous-menu qu'il
   faudrait ouvrir pour vérifier sa consommation en cours.
2. **Estimation de coût AVANT confirmation** : la règle la plus importante de tout le module
   est le MOMENT de l'affichage. L'estimation doit apparaître avant que l'utilisateur ne
   valide une action qui engage une dépense, jamais après. Un coût révélé après coup, même
   affiché clairement, a déjà violé la confiance de l'utilisateur au moment du clic.
3. **Historique de facturation consultable** : lisible sans support ni explication orale —
   chaque ligne doit permettre de comprendre à quoi correspond la dépense, pas seulement un
   montant brut sans contexte.

### 2.3 L'oracle qualitatif central : "je comprends ce que ça va me coûter avant de cliquer ?"

Ce module introduit un test de validation différent du reste du cours : une question binaire
posée à un testeur réel (tiers ou soi-même à froid, en ayant oublié les détails de sa propre
conception) à chaque étape du flow. Si la réponse est NON à n'importe quelle étape, le flow
ÉCHOUE — indépendamment de sa qualité esthétique, de la cohérence de sa charte, ou de la
sophistication de ses micro-interactions. C'est l'un des rares endroits du cours où une seule
question qualitative prime explicitement sur toute rubrique objective de forme.

### 2.4 Pourquoi la hiérarchie visuelle compte plus ici qu'ailleurs

Le module `b09-hierarchie-visuelle` enseigne que le poids, la taille et l'espace guident
l'œil avant même la couleur. Dans ce module précis, cette règle n'est plus seulement une
question de confort de lecture : une estimation de coût noyée visuellement parmi des
informations secondaires (ex. affichée à la même taille que la date de dernière connexion)
produit un vrai dommage financier potentiel, pas seulement une gêne esthétique. L'information
de coût doit être visuellement DOMINANTE sur l'écran de confirmation — jamais une mention
discrète en petit texte gris, même si elle est techniquement présente.

### 2.5 Pont avec l'accessibilité de conception (a06)

Une information critique affichée uniquement par la couleur (ex. un montant en rouge sans
autre indice) échoue le même principe que celui du module a06 (ne jamais utiliser la couleur
seule pour porter un sens critique) — ici appliqué à une information financière plutôt
qu'à un état de formulaire, mais la même discipline de conception s'applique : taille, poids,
position ET couleur, jamais la couleur seule.

## 3. Worked examples

### Exemple A — écran de confirmation d'action payante, bien et mal hiérarchisé

**Version qui échoue** : un bouton "Lancer le calcul" avec, juste en dessous, en petit texte
gris de même poids que la mention "dernière connexion il y a 3 jours" : "Coût estimé : 4,20€".
Un testeur presse le bouton sans avoir vraiment lu le montant — la question oracle (2.3)
reçoit un NON.

**Version qui réussit** : avant même d'afficher le bouton "Lancer le calcul", un encart
visuellement dominant (taille de police supérieure, poids fort, position au-dessus du
bouton, pas seulement une couleur) affiche "Coût estimé pour ce calcul : 4,20€" — le bouton
de confirmation ne peut être cliqué qu'après que cet encart ait été visuellement impossible à
manquer. Un testeur répond OUI sans hésitation à la question oracle.

### Exemple B — historique de facturation lisible vs liste de montants bruts

**Version qui échoue** : une liste de lignes "- 2,10€", "- 5,40€", "- 0,80€" sans contexte —
l'utilisateur ne sait pas à quelle action chaque montant correspond.
**Version qui réussit** : chaque ligne associe explicitement le montant à l'action qui l'a
généré ("Calcul GPU #4821, 12 min, 2,10€") — l'historique devient compréhensible SANS avoir
besoin de contacter un support.

## 4. Pièges & misconceptions

- **Afficher le coût estimé APRÈS confirmation plutôt qu'avant.** La violation la plus grave
  possible de ce module — même un affichage ultérieur parfaitement clair ne répare pas la
  confiance déjà rompue au moment du clic (voir 2.2 point 2).

- **Noyer l'estimation de coût visuellement parmi des informations secondaires.** Voir
  Exemple A — la règle b09 n'est pas optionnelle ici, elle a un enjeu financier réel.

- **Confondre "le montant est techniquement affiché" et "le montant est compris avant de
  cliquer".** Deux choses différentes — la rubrique qualitative de ce module teste
  explicitement la seconde, pas la première (voir 2.3).

- **Construire un historique de montants bruts sans contexte d'action.** Voir Exemple B — un
  historique illisible sans support oral échoue le brief même s'il est exhaustif.

## 5. Ancrage TribuZen

- Ce module ferme le capstone console GPU fictive construit depuis cap01 — TribuZen lui-même
  n'a pas de flow de facturation (produit familial, pas commercial), mais la discipline de
  hiérarchie visuelle appliquée à une information critique (2.4) reste directement
  transférable à tout futur écran TribuZen qui porterait une information sensible.
- Ce module est le dernier du cours entier dans l'ordre de rédaction — sa synthèse mobilise
  explicitement a06 (accessibilité de conception), b09 (hiérarchie visuelle), le design
  system et le flow produits en cap02, et la charte produite en cap01.

## 6. Points clés

1. Un flow de facturation à l'usage ajoute une exigence de CONFIANCE au-dessus de l'exigence
   habituelle de lisibilité — un dashboard de contenu classique n'a jamais cette contrainte.
2. Trois composants obligatoires : compteur en temps quasi réel visible en permanence,
   estimation de coût AVANT confirmation (jamais après), historique lisible sans support.
3. Le moment de l'affichage de l'estimation de coût est la règle la plus importante du
   module — avant, jamais après la confirmation d'une action payante.
4. L'oracle qualitatif central ("je comprends ce que ça va me coûter avant de cliquer ?")
   prime sur toute qualité esthétique — une réponse NON à n'importe quelle étape fait échouer
   le flow entier.
5. L'information de coût doit être visuellement dominante (poids, taille, position), jamais
   portée par la seule couleur ni noyée parmi des informations secondaires.
6. Un historique de facturation doit relier chaque montant à l'action qui l'a généré, jamais
   une liste de montants bruts sans contexte.

## 7. Seeds Anki

```
Pourquoi la facturation à l'usage est-elle un genre de dashboard à part ?|Elle ajoute une exigence de confiance (anticiper un coût avant de s'engager) au-dessus de l'exigence habituelle de lisibilité — un dashboard de contenu classique n'a jamais cette contrainte
Quelle est la règle la plus importante du flow de facturation à l'usage ?|L'estimation de coût doit être affichée AVANT la confirmation d'une action payante, jamais après — le moment de l'affichage compte plus que sa clarté
Quel est l'oracle qualitatif central de ce module ?|"Est-ce que je comprends ce que ça va me coûter avant de cliquer ?" posé à un testeur réel — une réponse non à n'importe quelle étape fait échouer le flow, indépendamment de sa qualité esthétique
Pourquoi l'information de coût ne doit-elle jamais être portée par la seule couleur ?|Même principe que a06 (ne jamais utiliser la couleur seule pour un sens critique) — ici appliqué à une information financière, il faut aussi la taille, le poids et la position
Qu'est-ce qui rend un historique de facturation illisible même s'il est exhaustif ?|Une liste de montants bruts sans contexte d'action associée — chaque ligne doit relier le montant à l'action qui l'a généré
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/cap03-facturation-usage/`. Tu y construis le flow
> complet de facturation à l'usage du capstone et tu le testes explicitement contre la
> question "je comprends ce que ça va me coûter avant de cliquer ?" — brief complet et
> rubrique de vérification dans le README du lab. C'est le dernier lab du cours entier.
