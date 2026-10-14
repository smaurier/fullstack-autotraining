---
titre: Intentions d'entrée et points d'entrée multiples
cours: 24-design-craft
bloc: G — Parcours & conversion
notions: [persona utile vs persona décoratif, job to be done, intention de requête (informationnelle/navigationnelle/transactionnelle), points d'entrée multiples, contexte d'arrivée, le mythe du parcours qui commence à l'accueil]
outcomes: [écrire un job to be done exploitable plutôt qu'un persona décoratif, identifier les points d'entrée réels d'un site et ce que chacun doit répondre, déduire d'une intention d'entrée les exigences de conception de la page d'arrivée]
prerequis: [a01-discovery]
next: g02-carte-de-parcours
tribuzen: ancrage principal sur nuada-audit.com et nahual.fr (vrais parcours en production, vraie sortie attendue) ; TribuZen en secondaire
last-reviewed: 2026-10
---

# Intentions d'entrée et points d'entrée multiples

> **Outcomes — tu sauras FAIRE :** écrire un job to be done exploitable plutôt qu'un persona
> décoratif, inventorier les points d'entrée réels d'un produit et dire ce que chacun doit
> répondre, et déduire d'une intention d'entrée les exigences concrètes de la page d'arrivée.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le module A01 apprend à reformuler un besoin flou en problème utilisateur. Il répond à
« quel problème », jamais à « qui arrive, par quelle porte, avec quelle intention ».

Sur nuada-audit.com, la différence est brutale. Deux personnes peuvent arriver sur la même
page : l'une vient de recevoir une mise en demeure et cherche à savoir si elle risque une
sanction ; l'autre prépare la refonte de son site l'année prochaine et se documente. Même
page, même texte, même bouton. La première veut un délai et un prix tout de suite. La
seconde veut comprendre la méthode et ne décidera rien aujourd'hui. Servir la même page aux
deux, c'est en perdre une sans savoir laquelle.

Et le site ne sait pas non plus par où elles entrent. Supposer qu'un visiteur commence par
l'accueil est une fiction confortable : une recherche sur « audit RGAA obligatoire » peut
déposer quelqu'un directement sur une page profonde, sans qu'il ait jamais vu la page
d'accueil ni compris qui tu es.

## 2. Théorie complète, concise

### 2.1 Le persona : utile sous conditions, décoratif par défaut

Un **persona** est une hypothèse résumée sur un segment d'utilisateurs. Le piège classique
est le persona décoratif : un prénom, une photo d'illustration, un âge, « aime le café et le
vélo ». Rien de tout ça ne change une décision de conception.

Un persona n'est utile que s'il porte les cinq éléments qui, eux, changent un écran :

1. **L'intention** : ce que la personne veut obtenir, formulé comme un résultat.
2. **Le contexte d'arrivée** : appareil, temps disponible, niveau d'urgence.
3. **Le niveau de connaissance** : du domaine, et du vocabulaire que tu emploies.
4. **Le critère de décision** : ce sur quoi elle va trancher (prix, délai, preuve, risque).
5. **L'objection** : la raison la plus probable de ne pas continuer.

Si l'un des cinq manque, le persona ne sert à rien d'autre qu'à décorer une présentation.

### 2.2 Le job to be done : déplacer la question du « qui » vers le « pourquoi maintenant »

Un **job to be done** (JTBD) se formule en trois temps :

```
Quand [situation déclenchante],
je veux [motivation],
afin de [résultat attendu].
```

Appliqué à nuada-audit.com, ça donne deux jobs réellement différents :

```
JTBD 1 — Quand je reçois un signalement ou une mise en demeure sur l'accessibilité de mon
site, je veux savoir vite si je suis en infraction et ce que coûte la mise en conformité,
afin de limiter mon risque juridique.

JTBD 2 — Quand je lance la refonte de mon site pour l'an prochain, je veux comprendre
comment intégrer l'accessibilité dès la conception, afin de ne pas avoir à tout reprendre
après la mise en ligne.
```

Le JTBD 1 est déclenché par un événement et veut un prix, un délai, une preuve de
compétence. Le JTBD 2 n'a aucune urgence et veut une méthode, une pédagogie, un contact
qu'il gardera six mois. Ce sont deux parcours distincts sur le même site, pas deux humeurs
du même visiteur. La force du JTBD sur le persona : il ne te demande pas d'inventer une
personne, seulement de nommer une situation réelle.

### 2.3 Les trois intentions d'une arrivée

Quelle que soit la porte, une arrivée porte l'une de trois intentions, et chacune attend
autre chose de la page :

- **Informationnelle** : « je veux comprendre ». La page doit expliquer avant de proposer.
  Une page qui vend immédiatement perd cette intention.
- **Navigationnelle** : « je veux aller à un endroit précis que je sais exister ». La page
  doit faire repérer ce chemin en un coup d'œil, pas raconter.
- **Transactionnelle** : « je veux faire quelque chose maintenant ». La page doit mettre
  l'action et ses conditions (prix, délai, engagement) à portée immédiate.

Une même page reçoit souvent les trois. La hiérarchie visuelle (B09) sert alors à les
ordonner : une entrée principale pour l'intention dominante, les deux autres accessibles
sans être traitées à égalité.

### 2.4 Toute page profonde est une page d'accueil pour quelqu'un

C'est la règle centrale de ce module. Dès qu'un produit est indexé, partagé par lien ou mis
en favori, **chaque page est une porte d'entrée possible**. Conséquence de conception :
toute page doit pouvoir répondre seule à trois questions, sans supposer que la précédente a
été vue.

1. **Où suis-je ?** (quel produit, quelle marque, quelle section)
2. **Qu'est-ce que c'est ?** (de quoi parle cette page, en une phrase lisible sans contexte)
3. **Où puis-je aller ?** (la suite logique, et le chemin vers la racine)

C'est exactement ce que le fil d'Ariane et la navigation globale servent à tenir (module
G03), et c'est pour ça que ces éléments ne sont pas du décor.

### 2.5 Le contexte d'arrivée change la conception, pas seulement le style

Une même intention produit des exigences différentes selon le contexte :

- **Appareil** : une arrivée mobile sur un parcours de devis long impose la reprise sur un
  autre appareil (module G04), pas seulement une mise en page adaptée.
- **Temps disponible** : quelqu'un qui consulte entre deux réunions veut pouvoir repartir
  avec une trace (un lien, un PDF, un email) plutôt que terminer.
- **Urgence** : une arrivée sous contrainte juridique tolère un formulaire plus long si le
  délai de réponse est annoncé ; une arrivée curieuse abandonne au troisième champ.
- **Niveau de connaissance** : le vocabulaire est une barrière d'entrée. « Critère 10.7 »
  parle à un auditeur, pas à un directeur marketing qui vient d'être mis en demeure.

## 3. Worked examples

### Exemple A — trois JTBD de nuada-audit.com et leurs parcours divergents

| JTBD | Intention | Critère de décision | Objection principale | Ce que la page d'arrivée doit faire |
|---|---|---|---|---|
| Mise en demeure reçue | Transactionnelle | Délai, prix, crédibilité | « Est-ce que ce prestataire tient le délai ? » | Annoncer méthode, délai, prix d'entrée et une preuve de compétence immédiatement visibles |
| Refonte à préparer | Informationnelle | Méthode, pédagogie | « Est-ce que je peux le faire en interne ? » | Expliquer la démarche, assumer que l'interne est possible, proposer un contact sans engagement |
| Appel d'offres public | Navigationnelle | Références, conformité formelle | « A-t-il les attestations et références attendues ? » | Rendre repérables en un clic les références, la certification et les mentions formelles |

Les trois existent. Aucun n'est inventé : chacun correspond à une situation déclenchante
nommable. Le site ne peut pas traiter les trois sur une seule page avec la même hiérarchie —
l'arbitrage (lequel est l'intention dominante de la page d'accueil, lesquels reçoivent une
page dédiée) est une décision de conception, à prendre et à écrire.

### Exemple B — inventaire des points d'entrée réels de nahual.fr

À défaut de statistiques, l'inventaire se construit depuis la structure et les usages connus :

1. **Accueil** — porte principale, arrivée d'un recruteur à qui le lien a été donné.
2. **Une page de projet** — arrivée d'un pair développeur via un partage technique.
3. **La page de contact en lien direct** — arrivée depuis une candidature envoyée.
4. **Une page profonde indexée** — arrivée d'un inconnu via une recherche.

Puis, pour chaque porte, le test des trois questions du §2.4 :

```
Porte 2 (page de projet, arrivée d'un pair dev)
- Où suis-je ?          OK      : identité visible.
- Qu'est-ce que c'est ? OK      : le projet est nommé et situé.
- Où puis-je aller ?    FAIBLE  : rien ne mène explicitement aux autres projets ni au
                        contact. Le visiteur doit remonter par la navigation globale,
                        ce qui suppose qu'il la cherche.
```

Ce « FAIBLE » est un résultat exploitable : il nomme une correction précise sur une page
précise, pour une porte précise. C'est ce que l'inventaire sert à produire, pas une liste
de pages.

## 4. Pièges & misconceptions

- **Le persona décoratif.** Prénom, photo, loisirs : rien qui change une décision. Si un
  persona ne porte pas les cinq éléments du §2.1, il ne sert à rien.

- **Un seul persona, donc un seul parcours.** Un produit sert plusieurs jobs. Les
  reconnaître est la condition pour arbitrer explicitement lequel la page principale sert,
  au lieu de servir mal tout le monde.

- **Supposer l'entrée par l'accueil.** La fiction la plus coûteuse du métier : elle rend
  invisible le fait que la majorité des pages ne répondent pas aux trois questions du §2.4.

- **Confondre segment démographique et intention.** « Dirigeant de PME de 45 ans » ne dit
  rien d'actionnable. « Vient de recevoir une mise en demeure » dit tout.

- **Inventer les JTBD sans aucune source.** Un JTBD est une hypothèse. L'écrire est
  légitime ; le présenter comme un fait ne l'est pas. Il se teste (module A09) ou se vérifie
  sur les demandes réellement reçues.

## 5. Ancrage nuada / nahual / TribuZen

- Les trois JTBD de nuada (Exemple A) deviennent le document de référence pour toute
  décision de contenu sur le site : chaque page existante doit pouvoir dire quel job elle
  sert en priorité.
- L'inventaire des portes de nahual (Exemple B) produit une liste de corrections par page,
  à traiter comme des tickets et non comme une refonte.
- TribuZen a ses propres portes d'entrée, souvent oubliées parce que le produit est pensé
  connecté : un lien d'invitation reçu par un deuxième parent est une porte d'entrée pour
  quelqu'un qui n'a jamais vu le produit et ne sait pas ce que c'est.

## 6. Points clés

1. Un persona n'est utile que s'il porte intention, contexte, niveau de connaissance,
   critère de décision et objection — sinon il est décoratif.
2. Le job to be done (quand / je veux / afin de) évite d'inventer une personne : il nomme
   une situation déclenchante réelle.
3. Un même produit sert plusieurs jobs, qui attendent des parcours différents — l'arbitrage
   doit être explicite, jamais implicite.
4. Trois intentions d'arrivée (informationnelle, navigationnelle, transactionnelle)
   attendent trois comportements différents de la page d'arrivée.
5. Toute page profonde est une page d'accueil pour quelqu'un : chacune doit répondre seule à
   « où suis-je / qu'est-ce que c'est / où puis-je aller ».

## 7. Seeds Anki

```
Qu'est-ce qui distingue un persona utile d'un persona décoratif ?|L'utile porte intention, contexte d'arrivée, niveau de connaissance, critère de décision et objection ; le décoratif porte un prénom, un âge et des loisirs
Quelle est la formulation d'un job to be done ?|Quand [situation déclenchante], je veux [motivation], afin de [résultat attendu]
Pourquoi le JTBD est-il plus sûr que le persona ?|Il nomme une situation déclenchante réelle au lieu d'inventer une personne, donc il est vérifiable sur les demandes effectivement reçues
Quelles sont les trois intentions d'une arrivée sur une page ?|Informationnelle (comprendre), navigationnelle (atteindre un endroit connu), transactionnelle (agir maintenant)
Pourquoi toute page profonde doit-elle répondre à trois questions seule ?|Parce qu'elle est une page d'accueil pour quelqu'un (recherche, lien partagé, favori) : où suis-je, qu'est-ce que c'est, où puis-je aller
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/g01-intentions-points-entree/`. Tu y écris trois JTBD
> réels de nuada-audit.com avec leurs critères de décision et objections, puis tu dresses
> l'inventaire des points d'entrée de nahual.fr en appliquant le test des trois questions à
> chaque porte — brief complet et rubrique de vérification dans le README du lab.
