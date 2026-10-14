# Lab G04 — Création guidée d'une routine TribuZen

> **Module associé :** [`modules/g04-flows-multi-etapes.md`](../../modules/g04-flows-multi-etapes.md)
> **Forme :** Zéro — la création de routine existe en code mais n'a jamais été conçue comme un parcours.
> **Outil :** un document pour la matrice et la table d'URL, Figma ou papier pour les écrans d'étape.

## Échauffement (30 min, jetable)

> Prends le parcours d'inscription d'un service que tu as abandonné en route cette année.
> Reconstitue ses étapes, puis réponds à trois questions : le nombre d'étapes était-il annoncé
> honnêtement ? La saisie survivait-elle à un rafraîchissement ? Le bouton retour du navigateur
> faisait-il quoi ? Contrainte : réponds en testant réellement, pas de mémoire.

Le piège attendu : conclure « c'était trop long ». La longueur est rarement la cause de
l'abandon ; l'absence de reprise et l'incertitude sur ce qui reste à faire le sont.

## Lire avant

Relire précisément :
- §2.1 — le critère de choix (la dépendance, pas la longueur).
- §2.2 — le stepper comme promesse, et le cas du nombre d'étapes variable.
- §2.4 — les trois bons moments de validation, et la règle sur l'erreur serveur.
- §2.5 — les trois mécanismes de reprise, et l'étape portée par l'URL.

## Brief

1. **Choisir la forme** (page unique, sections, ou wizard) et la justifier **par la
   dépendance**, pas par la longueur. Si tu choisis le wizard, dire pourquoi la page unique ne
   convient pas.
2. **Matrice de dépendances** : pour chaque champ, de quoi il dépend et quel est l'effet
   (champ révélé, jeu de questions changé, champ rendu obligatoire).
3. **Mécanisme de reprise** : lequel des trois (brouillon, lien de reprise, URL), et ce qui se
   passe exactement si l'onglet est fermé à chaque étape.
4. **Table étape vers URL** : une route par étape, et le comportement attendu du bouton retour
   du navigateur.
5. **Les états d'erreur par étape** : pour chaque étape, ce qui peut échouer et où le message
   s'affiche. Inclure obligatoirement le cas « erreur serveur à la dernière étape » et ce qui
   est conservé.
6. **Les écrans d'étape** en basse fidélité (règle de A04 : gris, pas de couleur de marque),
   y compris les états d'erreur.

## Livrable attendu

- La justification de forme en trois lignes maximum.
- La matrice de dépendances complète.
- La description du mécanisme de reprise, étape par étape.
- La table étape vers URL, avec le comportement du retour navigateur.
- La liste des états d'erreur par étape.
- Les wireframes basse fidélité de chaque étape et de chaque état d'erreur.

## Rubrique de vérification

**Rubrique objective :**
- La justification de forme invoque la dépendance entre champs ; une justification qui ne
  parle que de longueur est refusée.
- La matrice de dépendances couvre tous les champs, y compris ceux sans dépendance (notés
  explicitement « aucune »).
- Si un stepper numéroté est utilisé, le nombre d'étapes est fixe et ne dépend d'aucune
  réponse — sinon le lab exige des étapes nommées.
- Une route distincte par étape, et le comportement du bouton retour est écrit.
- Le cas « erreur serveur à la dernière étape » est traité et précise ce qui est conservé.
- Aucun wireframe ne contient de couleur de marque ni de police finale.

**Revue qualitative :** le brief demandait un parcours qui survit à l'interruption. La
question est donc : si une personne ferme l'onglet au milieu de l'étape 3, qu'est-ce qu'elle
retrouve exactement, et comment y revient-elle — la réponse doit être lisible dans le livrable
sans que tu l'expliques oralement. Un parcours dont la reprise est « on reprend du début » est
un parcours de démonstration, pas un parcours réel.

## Variante J+30 (fading)

Ajouter une étape conditionnelle non prévue (par exemple : si la routine concerne plusieurs
enfants, une étape de répartition apparaît). Observer ce que ça fait au stepper numéroté, et
corriger en conséquence. C'est exactement le scénario qui transforme un stepper honnête en
stepper menteur, et il arrive toujours.
