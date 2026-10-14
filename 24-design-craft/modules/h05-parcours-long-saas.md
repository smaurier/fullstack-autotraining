---
titre: Le parcours long — première valeur, adoption, changement
cours: 24-design-craft
bloc: H — Design produit (éditeur logiciel)
notions: [temps jusqu'à la première valeur, onboarding vs activation, le vide du premier jour, données de démonstration, découverte contextuelle vs visite guidée, communication du changement, migration et dépréciation datée]
outcomes: [cartographier et raccourcir le chemin jusqu'à la première valeur réelle, concevoir la découverte d'une fonctionnalité au moment où elle sert, annoncer un changement sans faire perdre son repère à un utilisateur de métier]
prerequis: [h04-domaine-roles-permissions, g05-mesurer-un-parcours]
next: h06-cycle-vie-maquette
tribuzen: TribuZen pour la première valeur chronométrée et raccourcie ; fil rouge « Nahual 2D » pour la découverte contextuelle du mode 2D
last-reviewed: 2026-10
---

# Le parcours long — première valeur, adoption, changement

> **Outcomes — tu sauras FAIRE :** cartographier et raccourcir le chemin jusqu'à la première
> valeur réelle, concevoir la découverte d'une fonctionnalité au moment où elle sert, et
> annoncer un changement sans faire perdre son repère à quelqu'un qui travaille avec l'outil
> tous les jours.
> **Difficulté :** ⭐⭐⭐

## 1. Cas concret d'abord

Le bloc G a traité le parcours à l'échelle d'une visite ou d'une tâche. Un logiciel
professionnel vit sur une autre échelle : la même personne l'utilise des centaines de fois sur
plusieurs années. Les questions changent complètement.

Elles deviennent : combien de temps avant qu'un nouvel utilisateur obtienne quelque chose
d'utile ? Comment découvre-t-il, au bout de six mois, une fonction qui existait depuis le
début ? Et que se passe-t-il le jour où tu déplaces un bouton qu'il clique quarante fois par
jour sans le regarder ?

Cette dernière question est celle que les designers débutants sous-estiment le plus. Dans un
outil de travail, **l'utilisateur ne veut pas de nouveauté, il veut finir sa tâche**. Une
amélioration objective qui casse un automatisme est vécue comme une dégradation, et elle en
est une du point de vue du temps passé le premier jour.

## 2. Théorie complète, concise

### 2.1 Le temps jusqu'à la première valeur

La métrique qui structure tout le début du parcours : **combien de temps entre l'arrivée et
le premier résultat réellement utile pour la personne**. Pas le premier écran vu, pas la fin
de l'inscription : le premier moment où elle a obtenu quelque chose qu'elle voulait.

Conséquence directe sur la conception : un onboarding n'est pas une visite guidée, c'est **le
chemin le plus court vers ce premier résultat**. Tout ce qui ne contribue pas à ce chemin
(remplir son profil, choisir un avatar, lire une présentation des fonctions) le rallonge et
peut attendre.

Le test est simple et impitoyable : chronométrer une personne réelle (protocole A09) depuis
l'arrivée jusqu'au premier résultat utile, et compter les étapes. Presque toujours, la moitié
sont supprimables ou reportables.

### 2.2 La distinction onboarding / activation

- **Onboarding** : la personne a créé son compte et vu le produit.
- **Activation** : la personne a obtenu un premier résultat utile, et a une raison de revenir.

Mesurer l'onboarding (nombre de comptes créés) est facile et trompeur ; mesurer l'activation
est plus difficile et c'est la seule qui prédise quelque chose. C'est une application directe
de Goals-Signals-Metrics (G05) : le but n'est pas « s'inscrire », donc la métrique ne doit pas
être l'inscription.

### 2.3 Le problème du premier jour : un produit de données est vide à son pire moment

Un logiciel qui vit de données affiche des écrans vides exactement au moment où l'utilisateur
juge s'il va rester. Trois réponses, à combiner :

1. **L'état vide actionnable** (déjà vu en A07) : il explique ce qui manque et propose
   l'action unique qui le résout. C'est le minimum.
2. **Les données de démonstration** : elles montrent l'outil rempli. Règle absolue :
   **toujours identifiables et supprimables en un geste**. Une donnée de démonstration
   indistinguable d'une vraie donnée produit des décisions prises sur du faux, et une perte de
   confiance irréversible quand l'utilisateur s'en aperçoit.
3. **L'import** : le chemin le plus rapide vers un produit utile quand les données existent
   déjà ailleurs (un tableur, un autre outil). Souvent le meilleur investissement d'activation,
   et presque toujours sous-estimé.

### 2.4 Faire découvrir une fonction existante : le contexte bat la visite guidée

Une visite guidée au premier lancement présente des fonctions à quelqu'un qui n'a pas encore
de problème à résoudre. Il ne retient rien, parce qu'il n'a aucun crochet mémoriel où
l'accrocher.

La règle qui fonctionne : **on annonce une fonction là où elle sert, au moment où elle
sert**. Celui qui vient d'exporter trois fois la même liste dans le mois est prêt à entendre
qu'un export programmé existe ; il ne l'était pas le premier jour.

Trois conditions pour que ça reste acceptable : l'annonce est **discrète** (elle n'interrompt
pas la tâche en cours), **rejetable définitivement** (et le refus est mémorisé), et
**limitée** (une annonce à la fois, jamais une file d'attente de bulles).

### 2.5 Communiquer un changement dans un outil de travail

Cinq règles, dans l'ordre d'importance :

1. **Prévenir avant, pas découvrir le matin.** Un utilisateur averti traverse un changement ;
   un utilisateur surpris ouvre un ticket.
2. **Dire ce que ça remplace.** « La facturation est maintenant dans le menu Compte » est
   utile. « Nouvelle interface améliorée » ne l'est pas.
3. **Laisser une trace à l'ancien endroit.** Un renvoi temporaire là où l'élément se trouvait
   avant coûte peu et sauve des centaines d'hésitations.
4. **Permettre le retour à l'ancien quand c'est possible**, au moins pour un temps. Ce n'est
   pas toujours faisable, et quand ça l'est, c'est le plus efficace des amortisseurs.
5. **Ne jamais déplacer une action fréquente sans raison forte.** Le gain esthétique ne paie
   jamais le coût d'un automatisme cassé chez des milliers de personnes.

### 2.6 Migration et dépréciation : la date est obligatoire

Quand un écran ou un parcours est remplacé, la période où les deux coexistent est le vrai
sujet de conception :

- **Faire coexister** l'ancien et le nouveau, avec un chemin visible de l'un vers l'autre.
- **Mesurer le transfert** (G05) : quelle part des usages est passée au nouveau ? C'est cette
  mesure, et pas une opinion, qui autorise à retirer l'ancien.
- **Dater la fin.** Une dépréciation sans date de fin ne se produit jamais : l'ancien écran
  survit des années, double la maintenance, et finit par recevoir des corrections parce que
  des gens l'utilisent encore.

## 3. Worked examples

### Exemple A — raccourcir le chemin vers la première valeur de TribuZen

Première valeur définie explicitement : **voir une routine du soir cochée pour un enfant**.
C'est le premier moment où le produit a servi à quelque chose.

Chemin actuel, chronométré sur une personne réelle :

```
1. Créer un compte (email + mot de passe + confirmation)        1 min 10
2. Nommer le foyer                                                 20 s
3. Ajouter un premier enfant (prénom, date de naissance, photo)    50 s
4. Créer une routine (nom, moment, puis 3 tâches une par une)    2 min 05
5. Cocher une tâche                                                 5 s
                                                       TOTAL  ≈ 4 min 30
```

Analyse par le critère du §2.1, en demandant pour chaque étape « contribue-t-elle à la
première valeur ? » :

```
Étape 1  nécessaire, mais la confirmation d'email peut être différée après la valeur.
Étape 2  REPORTABLE : un nom de foyer par défaut suffit, il se renomme plus tard.
Étape 3  nécessaire, mais la date de naissance et la photo sont REPORTABLES
         (prénom seul suffit pour cocher une tâche).
Étape 4  nécessaire, mais trois tâches saisies une par une est le vrai coût
         → proposer une routine du soir pré-remplie, modifiable, plutôt que vide.
Étape 5  c'est la valeur.
```

Chemin raccourci : création de compte (email seul), prénom de l'enfant, routine du soir
pré-remplie proposée en un clic, coche. Environ 1 min 20, soit un tiers du temps initial,
**sans supprimer aucune fonctionnalité** : tout ce qui a été retiré du chemin est simplement
demandé plus tard, au moment où ça sert.

La routine pré-remplie mérite d'être soulignée : c'est une donnée de démonstration déguisée,
donc elle doit respecter le §2.3 — clairement présentée comme une proposition modifiable, pas
comme un contenu déjà créé par l'utilisateur.

### Exemple B — annoncer une fonction existante, deux versions

Fonction concernée : l'historique filtrable (conçu au module H02), que peu d'utilisateurs
trouvent.

**Version intrusive (à ne pas faire).** Au prochain lancement, une fenêtre modale : « Nouveau !
Découvrez l'historique filtrable ». Elle interrompt quelqu'un qui venait cocher une tâche en
trente secondes avant de partir. Elle est fermée sans être lue, et la fonction reste inconnue.

**Version contextuelle (à faire).** Quand un utilisateur a consulté trois fois la même semaine
passée dans le mois — comportement qui prouve qu'il cherche à comparer — une mention discrète
apparaît **à l'endroit de la consultation** : « Vous pouvez filtrer l'historique par enfant et
par type ». Rejetable, mémorisé si rejeté, affiché une seule fois.

La différence n'est pas le ton du message : c'est le **déclencheur**. Le premier se déclenche
sur le calendrier du produit, le second sur le besoin de la personne.

## 4. Pièges & misconceptions

- **La visite guidée au premier lancement.** On présente des fonctions à quelqu'un qui n'a pas
  encore de problème : rien n'est retenu.

- **Mesurer l'inscription au lieu de l'activation.** Facile, trompeur, et sans valeur
  prédictive.

- **Des données de démonstration indistinguables des vraies.** Décisions prises sur du faux et
  perte de confiance irréversible.

- **Faire remplir un profil avant la première valeur.** Tout ce qui ne contribue pas au
  premier résultat peut attendre.

- **Déplacer une action fréquente pour un gain esthétique.** Le coût de l'automatisme cassé
  est payé par tous les utilisateurs, en même temps.

- **Annoncer « nouvelle interface améliorée » sans dire ce qui a bougé et où c'est parti.**

- **Une dépréciation sans date de fin.** L'ancien écran survit des années et double la
  maintenance.

- **Empiler les bulles de découverte.** Une à la fois, rejetable, mémorisée.

## 5. Ancrage TribuZen

- Le chemin vers la première valeur (Exemple A) est à chronométrer sur une personne réelle
  avec le protocole A09, puis à raccourcir — et le gain se mesure, c'est la base de référence
  du module G05 appliquée à l'activation.
- L'annonce contextuelle de l'historique filtrable (Exemple B) relie directement ce module à
  l'écran conçu en H02 : une fonction bien conçue mais introuvable n'existe pas.
- La règle des 48 h de correction d'occurrence (H04) est un bon candidat d'annonce
  contextuelle : elle ne s'explique utilement qu'au moment où quelqu'un essaie de corriger.

## 6. Points clés

1. La métrique qui structure le début du parcours est le temps jusqu'à la première valeur
   réelle, pas la fin de l'inscription.
2. Un onboarding est le chemin le plus court vers le premier résultat utile, pas une visite
   guidée ; tout le reste peut être demandé plus tard.
3. Un produit de données est vide à son pire moment : état vide actionnable, données de
   démonstration toujours identifiables et supprimables, import.
4. Une fonction s'annonce là où elle sert et au moment où elle sert — le déclencheur est le
   besoin, pas le calendrier du produit.
5. Dans un outil de travail, un changement se prévient avant, dit ce qu'il remplace, laisse
   une trace à l'ancien endroit, et ne déplace jamais une action fréquente sans raison forte.
6. Une dépréciation se mesure (part des usages transférés) et se date — sans date, elle n'a
   jamais lieu.

## 7. Seeds Anki

```
Qu'est-ce que le temps jusqu'à la première valeur, et pourquoi structure-t-il l'onboarding ?|Le délai entre l'arrivée et le premier résultat réellement utile ; il impose que l'onboarding soit le chemin le plus court vers ce résultat, pas une visite guidée
Quelle est la différence entre onboarding et activation ?|Onboarding : le compte est créé et le produit vu. Activation : un premier résultat utile est obtenu et il y a une raison de revenir — seule l'activation prédit quelque chose
Quelle est la règle absolue sur les données de démonstration ?|Toujours identifiables et supprimables en un geste : une donnée de démo indistinguable d'une vraie produit des décisions sur du faux et une perte de confiance irréversible
Pourquoi une visite guidée au premier lancement ne fonctionne-t-elle pas ?|Elle présente des fonctions à quelqu'un qui n'a pas encore de problème à résoudre, donc aucun crochet mémoriel où les accrocher
Quel est le bon déclencheur d'une annonce de fonctionnalité ?|Le besoin observé de la personne (elle a refait trois fois la même action), jamais le calendrier du produit
Quelles sont les règles pour annoncer un changement dans un outil de travail ?|Prévenir avant, dire ce que ça remplace, laisser une trace à l'ancien endroit, permettre le retour quand c'est possible, ne jamais déplacer une action fréquente sans raison forte
Pourquoi une dépréciation doit-elle être datée ?|Sans date de fin elle n'a jamais lieu : l'ancien écran survit des années, double la maintenance et continue de recevoir des corrections
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/h05-parcours-long-saas/`. Tu y chronomètres le chemin
> jusqu'à la première valeur de TribuZen sur une personne réelle, tu le raccourcis d'au moins
> un tiers sans retirer de fonctionnalité, et tu conçois l'annonce contextuelle d'une fonction
> existante peu utilisée — brief complet et rubrique dans le README du lab.
