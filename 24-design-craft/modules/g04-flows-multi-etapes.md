---
titre: Flows multi-étapes — wizard, divulgation progressive, reprise
cours: 24-design-craft
bloc: G — Parcours & conversion
notions: [page unique vs sections vs wizard, le stepper comme promesse, divulgation progressive vs dissimulation, moment de la validation, sauvegarde et reprise, l'étape comme route, retour arrière navigateur]
outcomes: [choisir et justifier la forme d'un parcours en plusieurs étapes, concevoir un mécanisme de reprise qui survit à la fermeture de l'onglet, placer la validation au bon moment plutôt qu'à chaque frappe]
prerequis: [g03-patterns-navigation]
next: g05-mesurer-un-parcours
tribuzen: création guidée d'une routine TribuZen en plusieurs étapes — choix de forme justifié, matrice de dépendances, reprise, table étape vers URL
last-reviewed: 2026-10
---

# Flows multi-étapes — wizard, divulgation progressive, reprise

> **Outcomes — tu sauras FAIRE :** choisir et justifier la forme d'un parcours en plusieurs
> étapes, concevoir une reprise qui survit à la fermeture de l'onglet, et placer la
> validation au moment où elle aide plutôt qu'au moment où elle harcèle.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le module A03 cite la structure **séquentielle** (wizard) comme l'une des trois familles de
navigation, en une ligne, et passe à autre chose. Or c'est la famille qui concentre le plus
d'échecs réels : un parcours de devis, une création de compte, une configuration de produit,
une déclaration. C'est là que les gens abandonnent, et c'est là que le travail de conception
est le plus technique.

Le réflexe de développeur ne sauve pas ici. Un formulaire en quatre étapes codé avec un
état local React fonctionne parfaitement en démonstration, et casse sur quatre points que
personne n'a maquettés : le rafraîchissement de la page, le bouton retour du navigateur, le
lien envoyé à un collègue pour qu'il finisse, et l'erreur serveur à la dernière étape qui
renvoie l'utilisateur à un formulaire vide.

## 2. Théorie complète, concise

### 2.1 Trois formes, un critère de choix

| Forme | Quand elle gagne | Ce qu'elle coûte |
|---|---|---|
| **Page unique** | Peu de champs, aucune dépendance entre eux, remplissage en une fois | Devient un mur dès qu'elle dépasse l'écran |
| **Sections sur une page** (accordéon, ancres) | Beaucoup de champs mais regroupables, l'utilisateur veut voir l'ensemble | Donne une impression de longueur ; la validation globale est plus dure à placer |
| **Wizard pas-à-pas** | Dépendances fortes (la réponse 2 change les questions 3), parcours long, reprise nécessaire | Masque la longueur totale ; impose la reprise et la navigation entre étapes |

Le critère n'est pas la longueur, c'est **la dépendance**. Un formulaire de vingt champs
indépendants tient très bien en sections ; un formulaire de six champs dont trois dépendent
du premier choix mérite un wizard.

### 2.2 Le stepper est une promesse, pas une décoration

Afficher « Étape 2 sur 4 » est un engagement contractuel. Trois conséquences :

- **Ne jamais ajouter une étape en route.** Annoncer quatre puis en révéler une cinquième
  détruit la confiance exactement au moment où l'utilisateur a déjà investi du temps.
- **Si le nombre d'étapes dépend des réponses**, le stepper numéroté est un mensonge : il
  faut alors des étapes **nommées** sans total affiché, ou un total annoncé comme maximum.
- **Les étapes franchies doivent être revisitables**, et l'affichage doit distinguer trois
  états : faite, en cours, à venir. Une étape future cliquable alors qu'elle dépend de la
  réponse en cours est un piège.

### 2.3 Divulgation progressive, et sa contrefaçon

La **divulgation progressive** consiste à ne montrer que ce qui est nécessaire maintenant,
et à révéler le reste au moment où il devient pertinent. C'est l'arme principale contre la
charge cognitive (loi de Miller, A05) : on ne demande pas à quelqu'un de tenir vingt
décisions en mémoire simultanément.

Sa contrefaçon est la **dissimulation** : cacher une information dont l'utilisateur a besoin
pour décider. La frontière est nette et vérifiable :

- Révéler plus tard un champ **qui ne sert que si on a répondu A** : divulgation progressive.
- Révéler à la dernière étape **des frais qui changent le prix total** : dissimulation, et
  c'est un dark pattern caractérisé (module A08).

Le test : l'information est-elle nécessaire pour **la décision en cours** ? Si oui, la cacher
est de la manipulation, pas de la simplification.

### 2.4 La validation au bon moment

Trois moments, trois rôles, et une erreur très courante :

- **À la sortie du champ** (perte de focus) : vérification de format. C'est le bon moment.
- **Au passage à l'étape suivante** : règles qui croisent plusieurs champs.
- **À la soumission finale** : règles serveur, unicité, disponibilité, calculs.

L'erreur courante est la validation **à chaque frappe** : elle affiche « adresse email
invalide » dès la première lettre tapée, c'est-à-dire qu'elle reproche à l'utilisateur de ne
pas avoir fini d'écrire. Règle : on ne valide pas une saisie incomplète, on valide une saisie
qu'on a des raisons de croire terminée.

Et le point qui coûte le plus cher en abandon réel : **une erreur serveur ne doit jamais
faire perdre la saisie**. Le message s'affiche à l'endroit du problème, les valeurs restent,
et si l'erreur concerne une étape antérieure, le parcours y ramène en conservant tout le
reste.

### 2.5 La reprise, et l'étape comme route

Un parcours multi-étapes doit survivre à la fermeture de l'onglet. Ce n'est pas une
fonctionnalité de luxe : c'est la différence entre un parcours de démonstration et un
parcours réel, où l'utilisateur est interrompu.

Trois mécanismes, cumulables :

1. **Le brouillon** : l'état est enregistré côté serveur à chaque étape franchie, et
   l'utilisateur le retrouve à sa prochaine visite, avec la date de la dernière modification.
2. **Le lien de reprise** : envoyé par email, il ramène à l'étape exacte. C'est ce qui rend
   possible le changement d'appareil et le transfert à une autre personne (module G02 §2.4).
3. **L'état dans l'URL** : chaque étape a sa propre route (`/devis/etape-2`), ce qui résout
   d'un coup le rafraîchissement, le bouton retour, le partage de lien et le signet.

Ce troisième point est l'endroit où ton profil hybride a un avantage net : un designer qui ne
code pas ne pense presque jamais l'URL comme un élément de conception du parcours, alors
qu'elle détermine trois comportements que l'utilisateur va effectivement essayer. Le corollaire
technique à ne pas rater : si l'étape vit dans l'URL, le **bouton retour du navigateur** doit
reculer d'une étape, pas sortir du parcours.

## 3. Worked examples

### Exemple A — parcours de demande en quatre étapes, avec dépendances et reprise

Besoin : demander un audit, où le type de prestation change les questions suivantes.

```
Étape 1  /demande/perimetre     Type de site, nombre de pages
Étape 2  /demande/contexte      DÉPEND de l'étape 1 :
                                - si "site public" → questions de conformité légale
                                - si "intranet"    → questions de population d'usage
Étape 3  /demande/delai         Échéance, contrainte de date
Étape 4  /demande/contact       Identité, email, téléphone
```

Matrice de dépendances, écrite avant toute maquette :

```
Champ                | Dépend de              | Effet
---------------------|------------------------|---------------------------------
Questions étape 2    | Type de site (ét. 1)   | Change le jeu de questions
Urgence (ét. 3)      | Échéance (ét. 3)       | Si < 15 jours → champ justification
Téléphone (ét. 4)    | Urgence (ét. 3)        | Devient obligatoire si urgent
```

Décisions de conception qui en découlent :

- Stepper à **étapes nommées** (Périmètre · Contexte · Délai · Contact) : le nombre est fixe
  ici, donc « 2 sur 4 » est honnête, mais les noms informent mieux que les numéros.
- Étape 2 non cliquable depuis le stepper avant que l'étape 1 soit répondue (dépendance).
- Brouillon enregistré à chaque passage d'étape, plus lien de reprise par email dès que
  l'adresse est connue — donc, idéalement, l'email est demandé plus tôt que l'étape 4 si on
  veut pouvoir relancer un parcours abandonné (arbitrage réel : demander l'email tôt
  augmente l'abandon immédiat mais rend la relance possible ; à décider et à écrire, pas à
  laisser au hasard).
- Erreur serveur à l'étape 4 : les quatre étapes restent remplies, le message s'affiche sur
  le champ concerné.

### Exemple B — le même besoin en page unique, et pourquoi on choisirait l'un ou l'autre

En page unique, les mêmes questions tiennent en une page avec deux sections conditionnelles
révélées par le type de site. C'est **le bon choix** si : le remplissage prend moins de deux
minutes, personne n'a besoin de reprendre plus tard, et l'utilisateur veut voir l'ampleur de
ce qu'on lui demande avant de commencer.

C'est **le mauvais choix** si le parcours est long, s'il doit être transmis à un collègue
pour la partie budgétaire, ou si la mesure (module G05) montre un abandon concentré en milieu
de formulaire — information qu'une page unique rend d'ailleurs beaucoup plus difficile à
localiser, puisqu'il n'y a pas d'étape à compter.

## 4. Pièges & misconceptions

- **Un wizard pour cinq champs indépendants.** On ajoute trois clics pour rien. Le critère
  est la dépendance, pas la longueur (§2.1).

- **Le stepper menteur.** Annoncer un nombre d'étapes puis en ajouter, ou numéroter un
  parcours dont la longueur dépend des réponses.

- **Valider à chaque frappe.** On reproche à l'utilisateur de ne pas avoir fini d'écrire.

- **Perdre la saisie sur erreur serveur.** Le plus coûteux de tous, et le plus fréquent dans
  un prototype devenu produit.

- **L'état du parcours uniquement en mémoire.** Le rafraîchissement, le bouton retour et le
  lien partagé cassent tous les trois, et aucun n'apparaît en démonstration.

- **Confondre divulgation progressive et dissimulation.** Le test du §2.3 : l'information
  est-elle nécessaire à la décision en cours ?

- **Le bouton retour du navigateur qui sort du parcours.** Si l'étape est dans l'URL, le
  retour doit reculer d'une étape.

## 5. Ancrage TribuZen / nuada

- La création guidée d'une routine TribuZen est le cas d'application : les étapes dépendent
  du type de routine choisi, et le parcours doit survivre à une interruption (un parent
  rarement tranquille dix minutes d'affilée).
- Le parcours de demande de nuada est l'autre cas, et il hérite directement de la carte de
  parcours du module G02 : la reprise et la transmissibilité à un décideur y étaient déjà
  identifiées comme un moment de vérité.
- La table étape vers URL produite ici est réutilisable telle quelle comme spécification de
  routage côté code — c'est le pont concret entre ce cours et le reste du curriculum.

## 6. Points clés

1. Le critère de choix entre page unique, sections et wizard est la dépendance entre les
   champs, pas leur nombre.
2. Un stepper est une promesse : ni étape ajoutée en route, ni numérotation d'un parcours à
   longueur variable.
3. La divulgation progressive montre ce qui est utile maintenant ; cacher une information
   nécessaire à la décision en cours est de la dissimulation, donc un dark pattern.
4. On valide au format à la sortie du champ, aux règles croisées au changement d'étape, au
   serveur à la soumission — jamais à chaque frappe, et jamais en perdant la saisie.
5. Un parcours multi-étapes doit survivre à la fermeture de l'onglet : brouillon, lien de
   reprise, et l'étape portée par l'URL pour que rafraîchissement, retour et partage marchent.

## 7. Seeds Anki

```
Quel est le vrai critère de choix entre page unique, sections et wizard ?|La dépendance entre les champs (une réponse change les questions suivantes), pas le nombre de champs
Pourquoi un stepper numéroté est-il un mensonge sur un parcours à longueur variable ?|Parce qu'il promet un nombre d'étapes ; si le nombre dépend des réponses il faut des étapes nommées ou un maximum annoncé
Comment distinguer divulgation progressive et dissimulation ?|L'information cachée est-elle nécessaire à la décision en cours ? Si oui c'est de la dissimulation (dark pattern), sinon c'est de la divulgation progressive
Quels sont les trois bons moments de validation ?|Format à la sortie du champ, règles croisées au changement d'étape, règles serveur à la soumission — jamais à chaque frappe
Pourquoi porter l'étape d'un wizard dans l'URL ?|Ça résout d'un coup le rafraîchissement, le bouton retour, le partage de lien et le signet — trois comportements que l'utilisateur essaiera réellement
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/g04-flows-multi-etapes/`. Tu y conçois la création
> guidée d'une routine TribuZen : choix de forme justifié, matrice de dépendances, mécanisme
> de reprise, table étape vers URL, et la liste des états d'erreur par étape — brief complet
> et rubrique dans le README du lab.
