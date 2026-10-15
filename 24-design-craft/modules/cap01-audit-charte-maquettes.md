---
titre: Capstone — Mois 1-3 : audit, charte, premières maquettes
cours: 24-design-craft
bloc: Capstone — Étude de cas console SaaS GPU
notions: [audit critique d'une console réelle, grille heuristique appliquée à un produit externe, charte graphique nouvelle pour un produit fictif, maquettes Figma cohérentes avec une charte, process documenté vs résultat final seul]
outcomes: [auditer critiquement une console technique réelle avec une grille heuristique nommée, produire une charte graphique complète pour un produit fictif de l'archétype "console SaaS dense en données", produire des maquettes Figma qui appliquent visiblement cette charte, documenter par écrit le raisonnement complet qui relie l'audit à la charte puis aux maquettes]
prerequis: [a05-heuristiques-ux, f01-anatomie-identite]
next: cap02-site-prototype-design-system
tribuzen: capstone console GPU fictive — client fictif Kerion Cloud, miroir générique de l'archétype "console technique dense en données" révélé par un échange réel anonymisé, jamais construit pour une entreprise réelle
last-reviewed: 2026-10
---

# Capstone — Mois 1-3 : audit, charte, premières maquettes

> **Outcomes — tu sauras FAIRE :** auditer critiquement une console technique réelle avec une
> grille heuristique nommée, produire une charte graphique complète pour un produit fictif,
> produire des maquettes Figma qui appliquent visiblement cette charte, et documenter par
> écrit le raisonnement qui relie les trois étapes entre elles.
> **Difficulté :** ⭐⭐⭐⭐

## 0. Ce que ce capstone n'est PAS

À dire une fois, clairement, avant tout le reste : ce capstone n'a jamais été construit pour
une entreprise réelle. Son client, **Kerion Cloud, est une société fictive** inventée pour
l'exercice. Ce qui est réel, en revanche, c'est l'archétype de poste : un échange avec une
personne du recrutement d'un fournisseur de GPU cloud, en octobre 2026, a révélé un besoin
de marché — "designer-développeur hybride qui repense une console technique dense en données
et fait évoluer une charte graphique" — tout en confirmant que le profil ne correspondait pas
à CETTE offre précise. Le capstone reprend l'archétype, pas l'entreprise : l'exercice sert
de pièce de portfolio réutilisable pour n'importe quelle offre future de ce type, jamais une
candidature déguisée en exercice d'école. Si un jour ce capstone est montré en entretien, le
récit correct est "j'ai construit cette pièce pour me préparer à ce type de poste", jamais
"j'ai fait ça pour vous".

## 1. Cas concret d'abord

Après des dizaines de modules de théorie et d'outil (process en Bloc A, culture en Bloc B,
Figma en Bloc C, Framer en Bloc D, motion en Bloc E, marque en Bloc F), la question qui reste
sans réponse est la plus importante pour un entretien réel : est-ce que tout ça s'articule
en UN projet cohérent, ou seulement en une collection d'exercices isolés ? Un recruteur qui
évalue un profil hybride créatif-front-end ne demande jamais "montre-moi ton meilleur
exercice de typographie" — il demande "montre-moi un projet complet, et explique-moi pourquoi
tu as fait chaque choix". Ce capstone construit cette pièce manquante : pas un nouveau module
de compétence, mais la preuve que les compétences déjà acquises se combinent.

Le découpage en trois modules suit une trame de "6 premiers mois" typique de ce genre de
poste (audit → charte → maquettes, puis prototype → design system → flow produit, puis le
cas le plus difficile du genre : la facturation à l'usage) — pas un vrai calendrier, une
structure narrative qui donne au récit final une colonne vertébrale claire.

## 2. Théorie complète, concise

### 2.1 Pourquoi commencer par un audit d'une VRAIE console, jamais une fictive

Le premier réflexe serait de passer directement à la charte ou aux maquettes — "j'ai déjà une
idée de ce que je veux faire". C'est exactement le piège déjà nommé en a01 (discovery) et en
b07 (dessin comme outil de pensée, pas de rendu) : la première idée qui vient est souvent la
plus conventionnelle, jamais la mieux informée. L'audit d'une console RÉELLE et publique
(Vercel, la console AWS, le dashboard Stripe, ou toute console technique comparable) ancre le
travail dans de l'observable vérifiable, pas dans une intuition esthétique. Une console
inventée de toutes pièces ne peut pas être auditée sérieusement : il n'y a rien à observer, on
ne fait que projeter ses propres goûts en les habillant de vocabulaire d'audit.

L'audit réutilise explicitement la grille heuristique du module a05 (les 10 heuristiques de
Nielsen, les lois de Hick/Fitts/Miller) : chaque problème ou force identifié doit être nommé
avec le vocabulaire exact de cette grille, jamais avec une préférence esthétique déguisée
("je n'aime pas ce menu" n'est pas un audit ; "ce menu viole la loi de Hick avec 14 options non
groupées, le temps de décision explose" en est un).

### 2.2 De l'audit à la charte : la décision doit découler d'un constat, jamais l'inverse

Une charte graphique n'est pas un exercice de goût personnel détaché de tout contexte — elle
répond à des problèmes identifiés. Si l'audit a révélé qu'une console existante paraît froide
et intimidante pour des utilisateurs techniques mais non-experts, la charte produite peut
explicitement choisir une palette moins austère, une typographie plus chaleureuse (cf. b01,
b03) — et ce choix se justifie par un constat précis de l'audit, pas par un goût personnel
affirmé sans preuve. Le Bloc F (identité de marque, f01 anatomie de l'identité, f02 brand
book) fournit la méthode : logo, palette de marque vs palette produit, typographie de marque,
le tout documenté dans un vrai brand book utilisable par un tiers.

### 2.3 De la charte aux maquettes : appliquer, pas décorer après coup

Les maquettes du mois 3 ne sont pas un exercice Figma indépendant de la charte — elles DOIVENT
appliquer visiblement les décisions de charte produites au mois 2 (couleurs exactes, typo
exacte, logo et ses usages). Le Bloc C (c01 interface/auto-layout, c02 composants/variants,
c03 styles/tokens) fournit l'outillage : des styles/tokens Figma nommés et reliés directement
aux valeurs de la charte, pas des couleurs choisies à l'œil dans le panneau de remplissage.

### 2.4 Pourquoi le document de process compte autant que les livrables visuels

Un jury ou un recruteur qui évalue ce type de poste ne juge jamais un écran isolé — il juge
la capacité à raisonner sur un problème produit de bout en bout. Le document de process
(inspiré directement de a12, étude de cas écrite : problème → contraintes → décision →
résultat → enseignement) est le livrable qui transforme trois exercices techniques séparés
en UNE histoire cohérente. Sans lui, l'audit, la charte et les maquettes restent trois
artefacts juxtaposés sans preuve qu'ils se répondent.

## 3. Worked examples

### Exemple A — trame complète sur une console publique réelle (méthode, pas un corrigé figé)

1. **Audit (mois 1)** : choisir une console réelle (ex. la console Vercel). Observer son
   dashboard de déploiements. Appliquer la grille a05 : la hiérarchie de l'information
   (b09, pas encore couverte à ce stade du cours mais le réflexe "poids/taille/espace avant
   couleur" s'applique déjà) est-elle claire ? Le nombre d'actions proposées simultanément
   viole-t-il la loi de Hick à un endroit précis ? Noter 5 constats nommés, positifs et
   négatifs, chacun relié à une heuristique ou une loi précise.
2. **Charte (mois 2)** : à partir d'un constat de l'audit (ex. "la console auditée est
   efficace mais visuellement austère pour un public non-expert"), choisir une direction de
   charte qui répond explicitement à ce constat — pas une direction choisie au hasard puis
   justifiée après coup. Produire logo, palette, typographie, usages autorisés/interdits
   (f01, f02).
3. **Maquettes (mois 3)** : au moins 3 écrans clés (dashboard d'accueil, une vue de détail
   dense en données, un écran de confirmation d'action) qui appliquent la charte avec des
   styles/tokens Figma nommés (c03), construits en composants réutilisables (c02).
4. **Document de process** : un texte qui relie explicitement chaque décision de charte à un
   constat précis de l'audit, et chaque choix de maquette à une règle précise de la charte —
   la continuité EST la preuve de rigueur, pas la qualité isolée de chaque étape.

### Exemple B — distinguer un audit honnête d'un audit de confirmation

Un audit "de confirmation" part d'une direction de charte déjà choisie et ne cherche que des
arguments pour la justifier après coup ("je voulais une palette chaleureuse, donc je note que
la console auditée est trop froide"). Un audit honnête note TOUT ce qui fonctionne ET tout ce
qui échoue dans la console auditée, y compris ce qui contredirait une direction esthétique
déjà préférée — exactement la même discipline que la revue qualitative du cours entier
("le brief demandait Y, le livrable fait/ne fait pas Y", jamais "j'aime/j'aime pas").

## 4. Pièges & misconceptions

- **Sauter l'audit et partir directement sur la charte "parce qu'on sait déjà où on va".**
  Le piège le plus probable de ce module précis — voir 2.1. Sans audit réel, rien ne distingue
  une charte argumentée d'une préférence esthétique habillée de vocabulaire professionnel.

- **Auditer une console fictive inventée pour l'occasion.** Il n'y a rien d'observable à
  critiquer dans une console qui n'existe pas — l'audit doit porter sur un produit réel.

- **Construire une charte déconnectée des constats de l'audit.** Si la charte ne répond à
  aucun constat précis, le document de process du mois 1-3 sonnera creux devant un jury ou un
  recruteur — la continuité audit→charte est ce qui distingue ce capstone d'un simple exercice
  Figma isolé.

- **Produire des maquettes qui ignorent la charte produite au mois 2** (couleurs approximées
  à l'œil plutôt que les valeurs exactes de la charte, typographie différente "parce que ça
  allait mieux sur cet écran précis"). La cohérence de marque (b11, f04, pas encore couverts
  à ce stade mais le principe s'applique déjà) commence dès la première maquette, pas après.

## 5. Ancrage TribuZen

- Le produit fictif de ce module n'est PAS TribuZen lui-même (TribuZen est un produit
  familial, pas une console technique) — c'est un produit fictif de l'archétype "console SaaS
  de pilotage technique", construit spécifiquement pour ce capstone et poursuivi dans cap02
  et cap03.
- La méthode d'audit (grille a05 appliquée à un produit réel existant) est directement
  réutilisable pour auditer TribuZen lui-même à l'occasion, ou toute future offre d'emploi de
  cet archétype — la compétence transfère, pas seulement le livrable de ce capstone précis.
- Le document de process de ce module devient la première partie du récit complet du
  capstone, complété par cap02 et cap03 avant d'être pitché à l'oral (a13).

## 6. Points clés

1. Ce capstone est un exercice générique d'archétype, jamais une candidature déguisée pour une
   entreprise précise — à rappeler explicitement si la pièce est montrée en entretien.
2. L'audit doit porter sur une console RÉELLE et publique, jamais une console fictive
   inventée pour l'occasion — sinon rien n'est observable à critiquer.
3. L'audit réutilise la grille heuristique a05 (Nielsen + Hick/Fitts/Miller) avec le
   vocabulaire exact, jamais une préférence esthétique déguisée.
4. Chaque décision de charte doit découler d'un constat précis de l'audit — la continuité
   audit→charte est la preuve de rigueur, pas la qualité isolée de chaque étape.
5. Les maquettes doivent appliquer visiblement la charte via des styles/tokens Figma nommés,
   jamais des couleurs approximées à l'œil.
6. Le document de process qui relie les trois étapes compte autant que les livrables visuels
   eux-mêmes — sans lui, l'ensemble reste trois artefacts juxtaposés.

## 7. Seeds Anki

```
Pourquoi le client du capstone est-il une société fictive ?|Kerion Cloud est inventée pour l'exercice : seul l'archétype de poste est réel, et le capstone le reprend de poste révélé par l'échange, jamais l'entreprise elle-même
Pourquoi auditer une console RÉELLE plutôt qu'une console fictive inventée ?|Une console fictive n'offre rien d'observable à critiquer — l'audit deviendrait une projection de goûts personnels habillée de vocabulaire d'audit
Quelle grille réutiliser pour l'audit du mois 1 ?|La grille heuristique du module a05 (10 heuristiques de Nielsen + lois de Hick, Fitts, Miller), avec le vocabulaire exact, jamais une préférence esthétique déguisée
Qu'est-ce qui distingue un audit honnête d'un audit de confirmation ?|L'audit honnête note tout ce qui fonctionne ET tout ce qui échoue, y compris ce qui contredirait une direction esthétique déjà préférée ; l'audit de confirmation ne cherche que des arguments pour justifier un choix déjà fait
Pourquoi le document de process compte-t-il autant que les livrables visuels ?|Un recruteur juge la capacité à raisonner sur un problème produit de bout en bout, pas la qualité isolée d'un écran — sans le document de process, audit/charte/maquettes restent trois artefacts juxtaposés
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/cap01-audit-charte-maquettes/`. Tu y choisis une
> console technique publique réelle, tu l'audites avec la grille a05, tu produis une charte
> graphique pour un produit fictif de cet archétype, puis au moins 3 maquettes Figma
> cohérentes — brief complet et rubrique de vérification dans le README du lab.
