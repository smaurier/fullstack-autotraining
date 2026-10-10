---
titre: Éthique, dark patterns et consentement
cours: 24-design-craft
bloc: A — Process & réflexes UX
notions: [dark pattern, opt-out caché, faux sentiment d'urgence, friction de désabonnement, consentement éclairé, pattern de confirmshaming, nag screen, RGPD et design, honnêteté comme contrainte de conception]
outcomes: [reconnaître un dark pattern dans une interface existante, nommer le mécanisme psychologique qu'il exploite, réécrire un flux de consentement ou de désabonnement pour qu'il soit honnête sans perdre son objectif business légitime]
prerequis: [a07-ux-writing]
next: a09-test-utilisateur
tribuzen: audit et réécriture du flux de consentement/notifications de TribuZen, pont avec le lab RGPD du curriculum principal
last-reviewed: 2026-10
---

# Éthique, dark patterns et consentement

> **Outcomes — tu sauras FAIRE :** reconnaître un dark pattern dans une interface
> existante, nommer précisément le mécanisme psychologique qu'il exploite, et réécrire un
> flux de consentement ou de désabonnement pour qu'il soit honnête — sans sacrifier
> l'objectif business légitime qui le motivait.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Tu dois ajouter à TribuZen un écran de consentement pour l'envoi de notifications
(rappels de routines, gazette hebdomadaire). Le brief business dit : "on veut que le plus
de familles possible activent les notifications, c'est ce qui fait revenir les gens sur
l'app."

Deux chemins s'ouvrent. Le premier : pré-cocher la case "Recevoir toutes les
notifications", formuler le refus en gris clair à peine lisible ("Non merci, je préfère
une app moins utile"), et faire réapparaître la demande à chaque ouverture jusqu'à
acceptation. Le second : présenter les options à égalité visuelle, laisser le choix
réellement neutre, et respecter le refus une fois exprimé.

Le premier chemin augmente le taux d'activation à court terme. Il est aussi un **dark
pattern** — une interface conçue pour manipuler une décision plutôt que pour l'éclairer.
Ce module donne la méthode pour les reconnaître, les nommer, et les refuser même sous
pression d'un objectif business légitime (faire revenir les familles sur l'app n'est pas
un mauvais objectif — c'est la MÉTHODE qui est en cause, pas le but).

## 2. Théorie complète, concise

### 2.1 Qu'est-ce qu'un dark pattern — définition opérationnelle

Un dark pattern est une décision de conception qui exploite un biais cognitif connu pour
obtenir un comportement que l'utilisateur n'aurait pas choisi avec une information
complète et une interface neutre. La définition clé n'est pas "ça m'énerve" — c'est
**l'écart entre le choix qu'une personne ferait informée et neutre, et le choix que
l'interface la pousse à faire**. Terme popularisé par Harry Brignull (chercheur UX
britannique, créateur du site deceptive.design en 2010) qui en a établi la première
taxonomie publique.

### 2.2 Taxonomie des patterns les plus fréquents

**Opt-out caché** (*hidden opt-out*) : une case pré-cochée pour l'option qui sert
l'intérêt de l'entreprise (partage de données, notifications, abonnement), avec le
refus formulé comme une action supplémentaire à faire, pas un état par défaut neutre.

**Faux sentiment d'urgence** (*false urgency*) : un compte à rebours, un "il ne reste
que 2 places" qui ne correspond à aucune réalité vérifiable — utilisé pour précipiter
une décision avant qu'elle soit réfléchie.

**Confirmshaming** : formuler le refus de façon à faire culpabiliser ("Non merci, je ne
veux pas économiser de l'argent" pour refuser une newsletter promo) — le choix neutre
est présenté comme une faute morale.

**Friction de désabonnement** (*roach motel*) : l'inscription prend un clic, la
désinscription exige un appel téléphonique, un formulaire caché dans 4 niveaux de menu,
ou une confirmation par email à retrouver. Le nom vient de l'image "facile d'entrer,
difficile de sortir".

**Nag screen** : une demande refusée réapparaît systématiquement à chaque session
jusqu'à ce que l'utilisateur cède par lassitude, plutôt que de respecter le refus déjà
exprimé.

**Préselection biaisée** : quand plusieurs options existent (ex. fréquence de
notification), celle qui sert l'entreprise est visuellement mise en avant (couleur,
taille, position) alors que les autres options légitimes sont présentes mais
minimisées — un choix est techniquement disponible, mais pas réellement neutre.

### 2.3 Consentement éclairé — le standard à atteindre, pas juste "légal"

Le RGPD impose un consentement "libre, spécifique, éclairé et univoque" — c'est un
plancher légal, pas un objectif de design. Un consentement réellement éclairé a trois
propriétés vérifiables :

1. **Les options sont à égalité visuelle** — même taille de police, même contraste,
   pas de bouton "Accepter" en couleur vive contre un lien gris "Refuser".
2. **L'information nécessaire à la décision est présente AVANT le choix**, pas après
   ("tu pourras changer d'avis plus tard" ne remplace pas une information correcte au
   moment de la décision).
3. **Le refus est aussi facile à exécuter que l'acceptation** — même nombre de clics,
   même emplacement, pas de confirmation supplémentaire demandée uniquement pour le
   refus.

### 2.4 Tenir l'objectif business sans pattern manipulatoire

Refuser les dark patterns ne veut pas dire renoncer à l'objectif business. Le flux de
notifications de TribuZen peut légitimement chercher à maximiser l'activation — par des
moyens honnêtes : expliquer clairement la valeur réelle ("tu seras notifié quand ta
famille ajoute un événement important", pas une formulation vague), choisir un moment
pertinent pour demander (après une première action réussie, pas à la toute première
ouverture de l'app, où le contexte manque), et proposer une granularité de choix réelle
(notifications importantes seulement vs toutes) plutôt qu'un choix binaire piégé.

## 3. Worked examples

### Exemple A — audit d'un flux de désinscription fictif

Flux observé sur une interface fictive de gestion d'abonnement SaaS :

```
Étape 1 : bouton "Gérer mon abonnement" → mène à une page "Nos offres" (pas à la
          désinscription directement)
Étape 2 : lien "Annuler" en texte gris 11px, en bas de page, après 3 encarts
          promotionnels proposant des réductions
Étape 3 : clic sur "Annuler" → popup "Es-tu sûr ? Tu perdras l'accès à X, Y, Z"
Étape 4 : confirmation → "Pour finaliser, contacte le support par email"
```

Diagnostic pattern par pattern : étape 1 = détournement vers une page de vente (pas un
dark pattern au sens strict, mais une friction d'intention) ; étape 2 = friction de
désabonnement (taille/contraste/position délibérément faibles) ; étape 3 = tentative de
rétention légitime SI elle s'arrête là, mais cumulée aux étapes précédentes elle
participe à l'escalade de friction ; étape 4 = **roach motel** complet — l'inscription
était en un clic, la désinscription nécessite un canal externe plus lent.

**Réécriture honnête, même objectif business de rétention** : un bouton "Gérer mon
abonnement" qui mène directement à l'état de l'abonnement, un lien "Annuler mon
abonnement" à la même taille/contraste que les autres actions, UNE proposition de
rétention claire et unique au moment de l'annulation (pas cumulée avec de la friction
structurelle), et une annulation qui se termine dans le même flux, sans canal externe
obligatoire.

### Exemple B — notifications TribuZen, version honnête

Reprenant le cas concret de la section 1 :

```
Écran de consentement notifications TribuZen — version honnête

Titre : "Veux-tu être notifié des événements de ta famille ?"
Texte explicatif : "Tu recevras un message quand un membre ajoute un événement
important (anniversaire, rendez-vous) ou publie la gazette hebdomadaire."

[ Oui, me notifier ]        [ Non, pas pour l'instant ]
  (même taille, même poids, contraste égal)

Sous-texte, taille identique pour les deux options : "Modifiable à tout moment dans
les réglages."
```

Aucune case pré-cochée, aucune formulation culpabilisante sur le refus, moment de la
demande choisi après une première action réussie de l'utilisateur (pas à l'ouverture),
granularité de choix réelle disponible ensuite dans les réglages.

## 4. Pièges & misconceptions

- **Croire qu'un dark pattern se reconnaît "à l'œil" sans méthode.** Beaucoup sont
  subtils (préselection biaisée par la couleur, pas par une case cochée visible) — la
  taxonomie de 2.2 doit devenir un réflexe de lecture systématique, pas une intuition
  vague.

- **Penser que refuser les dark patterns signifie sacrifier les objectifs business.**
  L'exemple B montre l'inverse : un objectif légitime (activer les notifications) reste
  poursuivi, seule la méthode change. Un designer qui connaît cette distinction a un
  vrai argument face à une pression business court-termiste.

- **Confondre rétention légitime et dark pattern.** Proposer UNE offre de rétention
  claire au moment d'une annulation n'est pas un dark pattern en soi — ça le devient
  quand elle s'accumule à de la friction structurelle (plusieurs étapes, canal externe
  obligatoire, formulation culpabilisante).

- **Traiter la conformité RGPD comme suffisante.** Un consentement techniquement
  conforme (case non pré-cochée) peut rester manipulatoire si le refus est formulé en
  confirmshaming ou si l'information nécessaire manque au moment du choix. Le standard
  à viser (2.3) dépasse le plancher légal.

## 5. Ancrage TribuZen

Pont direct avec le lab RGPD déjà existant dans le curriculum principal
(`23-droit-numerique/labs/lab-01-checklist-rgpd-tribuzen`) : ce module-ci traite la
couche **interface** du consentement (comment le présenter honnêtement), le lab RGPD du
curriculum principal traite la couche **registre de traitement** (ce qui est fait de la
donnée une fois collectée). Les deux sont nécessaires et complémentaires — un registre de
traitement irréprochable ne compense pas une interface de consentement manipulatoire, et
inversement.

- Flux de notifications (routines, gazette) : appliquer directement l'Exemple B.
- Flux d'invitation familiale : vérifier qu'accepter et refuser une invitation ont la
  même facilité d'exécution (pas de friction ajoutée sur le refus).
- Tout futur flux de désabonnement ou de suppression de compte TribuZen : passer par la
  grille de l'Exemple A avant de le designer.

## 6. Points clés

1. Un dark pattern se définit par l'écart entre le choix qu'une personne ferait informée
   et neutre, et le choix que l'interface la pousse à faire — pas par un jugement
   esthétique.
2. Taxonomie à connaître : opt-out caché, faux sentiment d'urgence, confirmshaming,
   friction de désabonnement (roach motel), nag screen, préselection biaisée.
3. Le consentement éclairé exige l'égalité visuelle des options, l'information avant le
   choix, et un refus aussi facile que l'acceptation.
4. La conformité RGPD est un plancher légal, pas un objectif de design — un flux peut
   être légalement conforme et rester manipulatoire.
5. Refuser un dark pattern ne veut pas dire abandonner l'objectif business qui le
   motivait — seule la méthode change, pas le but.

## 7. Seeds Anki

```
Comment définir un dark pattern sans jugement esthétique ?|L'écart entre le choix qu'une personne ferait informée et neutre, et le choix que l'interface la pousse à faire
Qu'est-ce que le confirmshaming ?|Formuler le refus d'une option de façon à faire culpabiliser l'utilisateur, présentant le choix neutre comme une faute morale
Qu'est-ce qu'un roach motel en UX ?|Un flux où l'inscription est facile (un clic) et la désinscription délibérément difficile (canal externe, étapes multiples, formulaire caché)
Quelles sont les 3 propriétés d'un consentement réellement éclairé ?|Options à égalité visuelle, information nécessaire présente avant le choix, refus aussi facile à exécuter que l'acceptation
La conformité RGPD garantit-elle l'absence de dark pattern ?|Non — un consentement techniquement conforme (case non pré-cochée) peut rester manipulatoire si le refus est formulé en confirmshaming ou mal informé
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/a08-ethique-dark-patterns/`. Tu y audites une
> interface réelle (la tienne ou une console publique connue) pour y repérer au moins 2
> dark patterns nommés précisément selon la taxonomie de ce module, puis tu réécris un
> flux de consentement ou de désabonnement de TribuZen pour qu'il soit honnête — en
> conservant l'objectif business légitime qui le motivait. Brief complet et rubrique de
> vérification dans le README du lab.
