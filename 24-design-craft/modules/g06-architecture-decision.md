---
titre: Architecture de la décision — persuader sans manipuler
cours: 24-design-craft
bloc: G — Parcours & conversion
notions: [une action primaire par écran, hiérarchie d'action à quatre niveaux, action destructive, architecture des objections, les trois formes de preuve, risque perçu, le test en trois questions]
outcomes: [hiérarchiser les actions d'un écran pour qu'une seule porte la décision, traiter les objections d'un parcours à l'endroit où elles apparaissent, distinguer une persuasion légitime d'un dark pattern par un test explicite]
prerequis: [a08-ethique-dark-patterns, g05-mesurer-un-parcours]
next: ""
tribuzen: page d'entrée principale de nuada-audit.com réécrite par l'architecture des objections, et test en trois questions appliqué à son écran de conversion
last-reviewed: 2026-10
---

# Architecture de la décision — persuader sans manipuler

> **Outcomes — tu sauras FAIRE :** hiérarchiser les actions d'un écran pour qu'une seule
> porte la décision, traiter les objections d'un parcours à l'endroit exact où elles
> apparaissent, et séparer une persuasion légitime d'un dark pattern par un test explicite
> plutôt que par un sentiment.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le module A08 t'a appris la limite : ce qu'est un dark pattern, pourquoi le consentement
arraché ne vaut rien, où est la frontière juridique. C'est une borne, et une borne ne dit pas
quoi faire du terrain qu'elle délimite. Résultat possible et très répandu chez les profils
honnêtes : par peur de manipuler, on ne guide plus du tout. On publie une page qui expose des
informations, aucune action ne prime, et on appelle ça de la neutralité.

Ce n'est pas de la neutralité, c'est un transfert de charge. Un écran où rien ne prime
oblige l'utilisateur à arbitrer à ta place, avec moins d'informations que toi. La loi de Hick
(A05) décrit le coût exact de ce transfert.

Ce module est donc le pendant constructif de A08 : comment conduire quelqu'un vers une
sortie assumée, en servant son intérêt, et comment le vérifier.

## 2. Théorie complète, concise

### 2.1 Une action primaire par écran

Ce n'est pas une règle esthétique, c'est une règle de décision : **un écran a une entrée
d'action**, celle que tu recommandes si la personne ne sait pas quoi faire. Deux boutons de
même poids visuel signifient « choisis toi-même », ce qui est précisément le service que
l'écran devait rendre.

La formulation utile : « si cette personne ne devait faire qu'une seule chose ici, laquelle
sert le mieux son intérêt ? ». La réponse devient l'action primaire. S'il n'y a pas de
réponse, l'écran a probablement deux rôles et devrait être deux écrans.

### 2.2 Hiérarchie d'action à quatre niveaux

| Niveau | Rôle | Traitement |
|---|---|---|
| **Primaire** | La décision recommandée, une seule | Plein poids visuel, position prévisible |
| **Secondaire** | L'alternative légitime | Visible, lisible, clairement moins appuyée |
| **Tertiaire** | Les sorties annexes (aide, détails, plus tard) | Lien discret, jamais caché |
| **Destructive** | Supprimer, annuler, résilier | Jamais primaire, jamais adjacente à la primaire, confirmation qui nomme la conséquence |

Deux fautes de hiérarchie à connaître, parce qu'elles basculent directement dans A08 :
rendre l'action destructive attirante, et rendre le refus (« Non merci ») moins lisible que
l'acceptation. Dans les deux cas le poids visuel ne reflète plus l'intérêt de l'utilisateur
mais celui de l'émetteur.

### 2.3 L'architecture des objections

Une **objection** est une raison de ne pas continuer. Elles sont peu nombreuses, elles sont
toujours les mêmes pour un parcours donné, et elles sont la cause directe des pertes mesurées
au module G05.

La méthode est mécanique :

1. Lister les objections réelles, par étape du parcours (G02 les a déjà en partie révélées
   dans la ligne « ce qu'elle pense »).
2. Pour chacune, décider **où** elle est traitée : sur cette page, sur une page dédiée, dans
   un email, dans le devis, ou pas du tout (choix légitime s'il est assumé).
3. Vérifier qu'aucune objection n'est traitée trois fois — la répétition est la marque d'une
   page qui argumente au lieu d'informer.

Une objection non traitée est une perte d'étape. Une objection traitée trop tard dans le
parcours est une perte aussi : si le prix est l'objection principale et qu'il n'apparaît qu'à
la quatrième page, les trois premières travaillent dans le vide.

### 2.4 Les trois formes de preuve, et celle que tu peux produire

- **La preuve sociale** : d'autres l'ont fait. Références, témoignages, nombre de clients.
  Puissante et, pour toi, structurellement limitée au début — et une preuve sociale empruntée
  ou gonflée est un mensonge, pas une technique.
- **La preuve technique** : voici comment je travaille. Méthode détaillée, certification,
  extrait de livrable réel, démonstration vérifiable.
- **La preuve de garantie** : voici ce que je m'engage à faire. Délai annoncé, conditions,
  périmètre écrit, ce qui se passe si ça ne va pas.

Pour un profil comme le tien, la hiérarchie est claire et c'est une bonne nouvelle : la
**preuve technique et la garantie sont les plus solides, et ce sont les seules que tu peux
produire sans jamais rien emprunter**. Un extrait d'audit réel anonymisé, une méthode écrite
étape par étape, un délai de réponse tenu, valent plus qu'une page de témoignages
invérifiables — et elles résistent à un contradicteur.

### 2.5 Réduire le risque perçu plutôt qu'augmenter la pression

Il y a deux façons de faire franchir une étape : augmenter l'incitation, ou diminuer ce que
la personne croit risquer. La seconde est presque toujours la meilleure, et c'est celle qui
ne dérive jamais vers A08.

Les leviers de réduction du risque sont concrets : annoncer ce qui se passe après le clic,
annoncer le délai, rendre la sortie possible (« vous pourrez modifier ensuite »), montrer la
longueur réelle du parcours au lieu de la masquer, dire le prix. Chacun supprime une
inconnue, et une inconnue est ce qui fait reculer.

### 2.6 Le test en trois questions

La différence entre persuasion légitime et dark pattern n'est pas l'efficacité — les deux
fonctionnent. C'est **l'intérêt servi**. Pour ne pas en juger à l'instinct, trois questions à
poser sur l'écran fini :

1. **L'information nécessaire à la décision est-elle complète et au même niveau de
   visibilité que l'incitation ?** (prix, engagement, durée, conséquence)
2. **Le refus est-il aussi facile et aussi lisible que l'acceptation ?**
3. **Serais-je à l'aise de montrer cet écran à la personne concernée en lui expliquant
   pourquoi il est conçu comme ça ?**

Trois oui : persuasion légitime. Un seul non : l'écran sert ton intérêt contre le sien, quel
que soit le vocabulaire qu'on emploie pour le décrire. C'est un test écrit, traçable, et
opposable — ce qui est exactement ce qu'il faut pour défendre un choix de conception en
réunion.

## 3. Worked examples

### Exemple A — page d'entrée de nuada réécrite par les objections

Objections réelles du JTBD « mise en demeure reçue » (module G01), dans l'ordre où elles
apparaissent :

| # | Objection | Traitée où | Comment |
|---|---|---|---|
| 1 | « Est-ce que ça me concerne vraiment ? » | Page d'entrée, en haut | Une phrase qui nomme les cas concernés, sans jargon |
| 2 | « Combien de temps ça prend ? » | Page d'entrée, près de l'action | Délai de réalisation annoncé en clair |
| 3 | « Combien ça coûte ? » | Page d'entrée, section tarifs | Prix d'entrée affiché, pas « sur devis » seul |
| 4 | « Est-ce qu'il sait vraiment faire ? » | Page méthode + extrait de livrable | Preuve technique, pas témoignage |
| 5 | « Et si je peux le faire en interne ? » | Page méthode, assumée | Dire quand l'interne suffit — ce qui rend le reste crédible |

Hiérarchie d'action de la page qui en découle :

```
Primaire    : "Demander un audit"          (l'action qui sert le JTBD dominant)
Secondaire  : "Voir la méthode"            (sert l'objection 4, et le JTBD informationnel)
Tertiaire   : "Lire un extrait d'audit"    (preuve technique, lien discret)
Aucune action destructive sur cette page.
```

L'objection 5 traitée honnêtement est contre-intuitive et pourtant la plus efficace : dire
dans quels cas le client n'a pas besoin de toi rend crédible tout ce que tu dis des cas où il
en a besoin.

### Exemple B — deux versions d'un même écran de confirmation, testées

Écran : confirmation d'un abonnement payant mensuel.

**Version 1.** Prix mensuel affiché en grand, durée d'engagement en clair à côté, bouton
primaire « Confirmer l'abonnement », lien secondaire de même taille « Revenir au plan
gratuit », mention de la date du premier prélèvement.

**Version 2.** Bouton primaire « Profiter de l'offre », prix en gris clair sous le bouton,
engagement de douze mois mentionné dans les conditions liées, refus sous forme de lien gris
« je ne souhaite pas améliorer mon expérience ».

Test appliqué :

```
                                      V1    V2
1. Info complète et aussi visible ?   oui   NON (prix en gris, engagement en lien)
2. Refus aussi facile et lisible ?    oui   NON (libellé culpabilisant, contraste faible)
3. Montrable en l'expliquant ?        oui   NON
```

V2 échoue aux trois. Le point important pour ta pratique : V2 **convertira probablement
mieux à court terme**, et ça ne change rien au verdict. L'efficacité n'a jamais été le
critère du test.

## 4. Pièges & misconceptions

- **Deux actions primaires.** L'utilisateur arbitre à ta place, avec moins d'informations.

- **Confondre neutralité et absence de hiérarchie.** Ne rien recommander n'est pas neutre,
  c'est transférer la charge de décision.

- **L'action destructive mise en valeur**, ou placée à côté de la primaire.

- **Le refus moins lisible que l'acceptation.** Faute de hiérarchie qui bascule directement
  en dark pattern.

- **La preuve empruntée.** Témoignages gonflés, chiffres invérifiables, références qui n'en
  sont pas. Hors de question, et inutile : la preuve technique est plus forte.

- **Traiter toutes les objections sur une seule page.** La page devient un plaidoyer. Chaque
  objection a un endroit, et une seule fois.

- **Traiter l'objection principale trop tard.** Si le prix est l'objection n°1 et n'apparaît
  qu'en page 4, les pages 1 à 3 travaillent dans le vide.

- **Juger la frontière éthique à l'instinct.** Le test en trois questions est écrit pour être
  opposable, y compris contre ta propre envie de convertir.

## 5. Ancrage nuada / nahual

- L'architecture des objections de nuada (Exemple A) est le livrable du lab, et ses effets se
  lisent dans l'entonnoir instrumenté au module G05 : une objection correctement traitée
  déplace une perte d'étape, et c'est vérifiable.
- Sur nahual, la sortie B est un contact. L'objection dominante d'un recruteur n'est pas le
  prix mais le risque : « est-ce que ce profil correspond vraiment à ce qu'il affiche ? ».
  La réponse est de la preuve technique (du code lisible, un cas documenté), jamais de la
  preuve sociale.
- Le test en trois questions s'applique aussi à ton propre portfolio : un portfolio qui
  survend échoue à la question 3.

## 6. Points clés

1. Un écran a une action primaire, celle qui sert le mieux l'intérêt de la personne si elle
   ne sait pas quoi faire ; deux primaires transfèrent la décision.
2. La hiérarchie d'action a quatre niveaux, et l'action destructive n'est jamais primaire ni
   adjacente à la primaire.
3. Une objection non traitée, ou traitée trop tard, est une perte d'étape mesurable.
4. Des trois formes de preuve, la preuve technique et la garantie sont les plus solides et
   les seules qui ne s'emprunte pas.
5. Réduire le risque perçu (annoncer prix, délai, conséquence, réversibilité) marche mieux
   qu'augmenter la pression, et ne dérive jamais.
6. Le test en trois questions (information complète et visible, refus aussi facile,
   montrable en l'expliquant) sépare persuasion et manipulation — l'efficacité n'est pas un
   critère.

## 7. Seeds Anki

```
Pourquoi un écran sans action primaire n'est-il pas neutre ?|Parce qu'il transfère la charge de décision à l'utilisateur, qui arbitre avec moins d'informations que le concepteur
Quels sont les quatre niveaux de la hiérarchie d'action ?|Primaire (la décision recommandée, une seule), secondaire (alternative légitime), tertiaire (sorties annexes), destructive (jamais primaire ni adjacente à la primaire)
Qu'est-ce qu'une objection en architecture de décision ?|Une raison de ne pas continuer ; non traitée ou traitée trop tard, elle produit une perte d'étape mesurable dans l'entonnoir
Quelles sont les trois formes de preuve et laquelle est la plus solide pour un profil débutant ?|Sociale, technique, garantie — la technique et la garantie, parce qu'elles ne s'empruntent pas et se vérifient
Quel est le test en trois questions qui sépare persuasion et dark pattern ?|1. L'information nécessaire est-elle complète et aussi visible que l'incitation ? 2. Le refus est-il aussi facile et lisible ? 3. Serais-je à l'aise de montrer et d'expliquer cet écran à la personne concernée ?
Pourquoi l'efficacité n'est-elle pas un critère dans ce test ?|Parce qu'un dark pattern convertit souvent mieux à court terme : le critère est l'intérêt servi, pas le résultat obtenu
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/g06-architecture-decision/`. Tu y réécris la page
> d'entrée principale de nuada-audit.com par l'architecture des objections (tableau objection
> vers emplacement vers traitement), tu poses sa hiérarchie d'action à quatre niveaux, et tu
> appliques le test en trois questions à l'écran de conversion — brief complet et rubrique
> dans le README du lab.
