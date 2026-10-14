---
titre: Carte de parcours — ce que le user flow ne voit pas
cours: 24-design-craft
bloc: G — Parcours & conversion
notions: [carte de parcours vs user flow, phases, canaux et points de contact, friction nommée, moments de vérité, parcours multi-session, service blueprint]
outcomes: [construire une carte de parcours qui dépasse les frontières du produit, nommer les moments de vérité d'un parcours et les justifier, distinguer une friction d'écran d'une friction de service]
prerequis: [g01-intentions-points-entree]
next: g03-patterns-navigation
tribuzen: carte de parcours nuada-audit.com du déclenchement juridique au devis signé, avec les canaux hors site (email, téléphone) ; TribuZen pour le parcours multi-session d'invitation
last-reviewed: 2026-10
---

# Carte de parcours — ce que le user flow ne voit pas

> **Outcomes — tu sauras FAIRE :** construire une carte de parcours qui dépasse les
> frontières du produit, nommer et justifier les moments de vérité d'un parcours, et
> distinguer une friction d'écran d'une friction de service qu'aucune maquette ne corrigera.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le module A04 t'a appris à tracer le user flow de `GazettePreview` : étapes, décisions,
branches d'erreur. C'est un outil juste, et il s'arrête à une frontière précise — celle du
produit. Il commence quand l'utilisateur est déjà dans l'écran de départ, et il finit quand
il a terminé la tâche.

Sur nuada-audit.com, c'est insuffisant, et de loin. Le parcours réel commence avant le site
(un signalement reçu, une réunion interne, une recherche) et continue après le formulaire
(un email de réponse, un appel, un devis PDF, une validation budgétaire interne, une
signature trois semaines plus tard). Si tu optimises le formulaire sans voir que la perte
réelle se produit entre l'envoi du formulaire et la réponse par email, tu auras travaillé
sur le seul morceau que tu contrôlais au lieu du morceau qui coûte.

La **carte de parcours** est l'outil qui rend ce hors-champ visible.

## 2. Théorie complète, concise

### 2.1 Carte de parcours et user flow : deux objets, deux frontières

| | User flow (A04) | Carte de parcours (ce module) |
|---|---|---|
| Objet | Une tâche | Une expérience complète |
| Unité | L'étape/écran | La phase temporelle |
| Frontière | Le produit | Avant, pendant, après, tous canaux |
| Durée représentée | Une session | Des jours, des semaines, des mois |
| Révèle | Les branches et les erreurs oubliées | Les ruptures entre canaux et les attentes mortes |

Les deux sont complémentaires : la carte dit **où** regarder, le flow dit **comment** câbler
ce qu'on a décidé de corriger. Faire un flow sans carte revient à optimiser un maillon sans
savoir s'il est le maillon faible.

### 2.2 Anatomie d'une carte de parcours

Une carte se lit en colonnes (les phases, dans l'ordre du temps) et en lignes (ce qu'on
observe à chaque phase) :

- **Ce que la personne fait** — l'action observable.
- **Ce qu'elle voit** — le point de contact : une page, un email, un PDF, un interlocuteur.
- **Le canal** — site, email, téléphone, document, bouche-à-oreille, support.
- **Ce qu'elle pense ou veut savoir** — la question qu'elle se pose à ce moment précis.
- **La friction** — ce qui coince, nommé concrètement, jamais « c'est pas clair ».
- **L'opportunité** — la correction candidate, une par friction.

Une carte sans la ligne « friction » remplie n'est pas une carte, c'est un diagramme
décoratif. C'est la seule ligne qui produit du travail.

### 2.3 Les moments de vérité

Un **moment de vérité** est une étape où la confiance se gagne ou se perd pour tout le
reste du parcours. Ils sont peu nombreux (deux ou trois par parcours) et ils ne sont presque
jamais là où on les attend : rarement sur la page d'accueil, souvent sur l'attente d'une
réponse, la première facture, le premier message d'erreur rencontré, le premier contact
humain.

Les identifier a une conséquence directe de priorisation : un moment de vérité mérite un
soin disproportionné par rapport à sa surface d'écran. Sur nuada, l'email de réponse après
une demande de devis est un moment de vérité majeur, et c'est probablement le point de
contact le moins travaillé de tout le parcours.

### 2.4 Le parcours multi-session : le produit doit se souvenir

Un parcours professionnel s'étale presque toujours sur plusieurs sessions, souvent sur
plusieurs appareils et plusieurs personnes. Un devis est demandé un mardi, validé en interne
le jeudi suivant, signé la semaine d'après par quelqu'un d'autre.

Conséquences de conception, qui sont toutes des décisions de produit et pas de style :

- **La reprise** : l'état intermédiaire doit survivre à la fermeture de l'onglet (module G04).
- **Le lien de reprise** : un chemin de retour envoyé par email, qui ramène à l'étape exacte.
- **La relance** : qui relance, quand, par quel canal, et ce que dit le message.
- **Le transfert** : un parcours repris par une autre personne que celle qui l'a commencé
  (un décideur, un comptable) arrive sans le contexte de la première session.

Un parcours conçu comme une session unique casse silencieusement sur tous ces points.

### 2.5 Le service blueprint : les coulisses

Le **service blueprint** est une carte de parcours à laquelle on ajoute les lignes de
coulisses : qui, côté interne, doit faire quoi pour que l'étape visible fonctionne, et avec
quel outil.

Son intérêt est de révéler qu'une partie des frictions ne sont pas des problèmes d'écran.
Sur nuada, si le délai de réponse à une demande est de quatre jours, aucun travail de
maquette ne le corrigera : la correction est un engagement de délai annoncé, un accusé de
réception automatique, ou une réorganisation de ton propre processus. Nommer ça explicitement
t'évite de redessiner une page pour résoudre un problème d'organisation.

## 3. Worked examples

### Exemple A — carte de parcours nuada, du déclenchement au devis signé

| | P1 Déclenchement | P2 Recherche | P3 Évaluation | P4 Demande | P5 Attente | P6 Décision |
|---|---|---|---|---|---|---|
| **Fait** | Reçoit un signalement | Cherche « audit RGAA » | Compare 2-3 prestataires | Remplit le formulaire | Attend une réponse | Fait valider le budget |
| **Voit** | Un courrier, un email | Des résultats de recherche | Des sites, des prix | Le formulaire | Rien | Le devis PDF |
| **Canal** | Courrier / email | Moteur de recherche | Sites web | Site | Email (ou silence) | PDF + email + téléphone |
| **Pense** | « Je risque quoi ? » | « Qui fait ça sérieusement ? » | « Lequel tient le délai ? » | « Combien de temps ça prend ? » | « Il m'a oublié ? » | « Je justifie ça comment en interne ? » |
| **Friction** | — | Vocabulaire technique illisible | Aucun prix affiché nulle part | Aucun délai de réponse annoncé | Aucun accusé de réception | Devis sans argumentaire réutilisable en interne |
| **Opportunité** | — | Page d'entrée en langage de décideur | Prix d'entrée annoncé | Délai de réponse écrit sous le bouton | Accusé automatique avec délai | Une page de devis qui se transmet telle quelle |

Deux moments de vérité ressortent, et ni l'un ni l'autre n'est une page du site :
**P5 (l'attente)** et **P6 (la transmissibilité du devis en interne)**. C'est exactement le
genre de conclusion qu'un user flow n'aurait jamais produite.

### Exemple B — le même sujet vu par un user flow, et ce qu'il manque

Le user flow de la demande de devis sur nuada donnerait à peu près :

```
Page de service → [clic "Demander un devis"] → Formulaire
  → décision : champs valides ?
     NON → messages d'erreur par champ → retour au formulaire
     OUI → Écran de confirmation
```

C'est correct, et c'est utile pour câbler l'écran. Mais ce flow est aveugle à quatre des six
phases de la carte : il ne voit ni le déclenchement, ni la comparaison avec les concurrents,
ni l'attente, ni la décision interne. Les deux moments de vérité trouvés en Exemple A se
situent tous les deux **en dehors** de ce flow.

## 4. Pièges & misconceptions

- **La carte décorative.** Des phases, des émoticônes d'humeur, aucune friction nommée
  concrètement. Si la ligne friction ne produit pas une liste de corrections, la carte n'a
  rien produit.

- **La carte qui s'arrête à la frontière du produit.** C'est redevenu un user flow avec
  plus de colonnes. L'avant et l'après sont la raison d'être de l'outil.

- **Confondre carte et flow.** Voir §2.1. Les deux sont nécessaires, à deux moments
  différents, et aucun ne remplace l'autre.

- **Inventer la carte entièrement.** Une carte non sourcée est une hypothèse. Dire d'où
  vient chaque ligne (une demande réelle reçue, un test utilisateur, une déduction) est
  obligatoire — sinon on priorise sur de la fiction.

- **Chercher un moment de vérité par phase.** Il y en a deux ou trois sur tout le parcours.
  En déclarer six revient à n'en prioriser aucun.

- **Vouloir corriger une friction de service par une maquette.** Voir §2.5 : un délai de
  réponse de quatre jours ne se redessine pas.

## 5. Ancrage nuada / nahual / TribuZen

- La carte de l'Exemple A devient la feuille de route de nuada, par ordre de moment de
  vérité et non par ordre de page.
- Sur TribuZen, le parcours d'invitation d'un deuxième parent est multi-session et
  multi-personne par nature : il traverse un email, un appareil différent, et un utilisateur
  qui ne connaît pas le produit. C'est le candidat évident pour une deuxième carte.
- Sur nahual, le parcours d'un recruteur ne finit pas sur le site : il continue dans un
  outil de recrutement, où ton lien est recollé à côté de dix autres. Ce que le site laisse
  comme trace transmissible est donc un vrai sujet de conception.

## 6. Points clés

1. Le user flow s'arrête à la frontière du produit ; la carte de parcours représente
   l'expérience entière, avant, pendant et après, tous canaux confondus.
2. Une carte sans la ligne « friction » nommée concrètement ne produit aucun travail.
3. Les moments de vérité sont deux ou trois par parcours et se situent souvent hors du
   produit (une attente, un email, un premier contact humain).
4. Un parcours professionnel est multi-session et parfois multi-personne : reprise, lien de
   retour, relance et transfert sont des décisions de conception.
5. Le service blueprint révèle les frictions qu'aucune maquette ne corrigera, parce qu'elles
   sont organisationnelles.

## 7. Seeds Anki

```
Quelle est la différence de frontière entre un user flow et une carte de parcours ?|Le flow s'arrête au produit et à une session ; la carte couvre l'avant, le pendant et l'après, sur tous les canaux et sur des semaines
Quelle ligne d'une carte de parcours produit réellement du travail ?|La ligne friction, nommée concrètement — sans elle la carte est décorative
Qu'est-ce qu'un moment de vérité ?|Une étape où la confiance se gagne ou se perd pour tout le reste du parcours ; il y en a deux ou trois, souvent hors du produit
Pourquoi un parcours multi-session change-t-il la conception ?|Il impose la reprise d'un état sauvegardé, un lien de retour, une relance et le transfert vers une autre personne sans contexte
Qu'ajoute un service blueprint à une carte de parcours ?|Les coulisses internes (qui fait quoi, avec quel outil), ce qui révèle les frictions organisationnelles qu'aucune maquette ne corrigera
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/g02-carte-de-parcours/`. Tu y construis la carte de
> parcours complète de nuada-audit.com avec au moins deux canaux hors site, trois frictions
> dont une de service, et deux moments de vérité justifiés — brief complet et rubrique de
> vérification dans le README du lab.
