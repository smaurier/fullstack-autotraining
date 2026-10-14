# Lab H05 — Première valeur chronométrée et découverte contextuelle

> **Module associé :** [`modules/h05-parcours-long-saas.md`](../../modules/h05-parcours-long-saas.md)
> **Forme :** Existant — le chemin d'arrivée de TribuZen existe et n'a jamais été chronométré.
> **Outil :** un chronomètre, une personne réelle, un document. Figma pour l'annonce contextuelle.
> **Ancrage :** TribuZen pour la première valeur, fil rouge « Nahual 2D » pour la découverte.

## Échauffement (20 min, jetable)

> Crée un compte sur un service gratuit que tu n'as jamais utilisé, en te chronométrant.
> Note l'heure exacte du premier moment où le produit t'a servi à quelque chose — pas le
> premier écran, pas la fin de l'inscription : le premier résultat utile. Puis compte combien
> d'étapes, parmi celles traversées, ne contribuaient pas à ce résultat.

Le piège attendu : confondre « j'ai fini l'inscription » avec « j'ai obtenu quelque chose ».
C'est précisément la distinction onboarding / activation du §2.2, et on ne la sent qu'en la
vivant.

## Lire avant

Relire précisément :
- §2.1 — le temps jusqu'à la première valeur, et l'onboarding comme chemin le plus court.
- §2.3 — les trois réponses au vide du premier jour, et la règle absolue sur les données de
  démonstration.
- §2.4 — pourquoi le contexte bat la visite guidée, et les trois conditions d'acceptabilité.

Prérequis de contenu : le protocole de test utilisateur du module A09, réutilisé tel quel.

## Brief

### Partie 1 — la première valeur de TribuZen

1. **Définir explicitement** ce qu'est la première valeur de TribuZen, en une phrase. Ce doit
   être un résultat obtenu par la personne, pas une étape franchie.
2. **Chronométrer le chemin actuel** sur une personne réelle qui ne connaît pas le produit,
   étape par étape, avec le temps de chaque étape.
3. Pour chaque étape, répondre : **contribue-t-elle à la première valeur ?** Si non, elle est
   supprimable ou reportable — dire laquelle des deux, et à quel moment ultérieur elle est
   redemandée.
4. **Produire le chemin raccourci**, avec l'objectif d'au moins **un tiers de temps en moins,
   sans retirer aucune fonctionnalité**.
5. Si tu utilises une donnée pré-remplie ou de démonstration pour raccourcir, appliquer la règle
   du §2.3 : identifiable comme proposition, modifiable, supprimable en un geste. Montrer
   comment elle est présentée.

### Partie 2 — faire découvrir le mode 2D (fil rouge Nahual 2D)

6. Un visiteur de nahual.fr en mode 3D ne sait pas que le mode 2D existe. Concevoir sa
   **découverte contextuelle** : quel **comportement observé** déclenche l'annonce, où elle
   apparaît, et ce qu'elle dit.
7. Respecter les trois conditions du §2.4 : discrète (n'interrompt pas), rejetable
   définitivement (refus mémorisé), limitée (une seule à la fois).
8. Traiter le cas qui compte le plus : la personne arrivée **directement en 2D** (mouvement
   réduit, pas de WebGL) ne doit recevoir **aucune** annonce de ce genre — elle est déjà au bon
   endroit, et lui proposer le 3D serait exactement l'inverse du service attendu.

## Livrable attendu

- La définition de la première valeur, une phrase.
- Le chronométrage du chemin actuel, étape par étape, avec le total.
- Le verdict par étape (contribue / supprimable / reportable à quel moment).
- Le chemin raccourci, avec son temps estimé et le gain calculé en pourcentage.
- La présentation de toute donnée pré-remplie, conforme à la règle du §2.3.
- La conception de l'annonce contextuelle du mode 2D : déclencheur, emplacement, texte,
  comportement de rejet.
- Le traitement explicite du cas « arrivée directe en 2D ».

## Rubrique de vérification

**Rubrique objective :**
- La première valeur est un résultat obtenu, pas une étape franchie (une formulation du type
  « a terminé son inscription » est refusée).
- Le chronométrage porte sur une personne réelle, et le temps par étape est relevé, pas estimé.
- Chaque étape porte un verdict ; les étapes reportables indiquent **à quel moment** elles sont
  redemandées.
- Le gain atteint au moins 33 %, et aucune fonctionnalité n'a disparu (vérifiable en comparant
  les deux listes).
- Toute donnée pré-remplie est présentée comme une proposition modifiable et supprimable.
- L'annonce contextuelle a un déclencheur **comportemental**, pas calendaire.
- Le cas « arrivée directe en 2D » est traité et n'affiche aucune annonce.

**Revue qualitative :** le brief demandait de raccourcir sans appauvrir. Les questions sont
donc : le chemin raccourci donne-t-il vraiment un résultat utile à la fin (et non un produit
vide plus vite), et l'annonce du mode 2D se déclenche-t-elle sur un moment où la personne a
une raison de s'y intéresser ? Une annonce affichée au chargement de la page d'accueil est une
visite guidée déguisée, quel que soit son ton.

## Variante J+30 (fading)

Chronométrer le chemin raccourci sur une **deuxième** personne, de profil différent, et
comparer au relevé initial. L'écart entre deux personnes est souvent plus instructif que le
gain lui-même : il révèle les étapes dont le coût dépend du niveau de familiarité, et donc
celles qui méritent une aide contextuelle plutôt qu'une suppression.
