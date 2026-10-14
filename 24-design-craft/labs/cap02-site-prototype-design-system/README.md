# Lab Capstone 02 — Site prototypé, design system, flow de pilotage

> **Module associé :** [`modules/cap02-site-prototype-design-system.md`](../../modules/cap02-site-prototype-design-system.md)
> **Forme :** Itérer sur cap01 — reprendre les maquettes et la charte du mois 1-3, les rendre réelles.
> **Outil :** Framer (ou Figma→React) + Figma (composants) + Rive.

## Lire avant

Relire précisément, pas tout le module :
- §2.1 — critère de choix Framer vs Figma→React (pont avec `d01-positionnement-outil`).
- §2.3 — exigence de micro-interaction JUSTIFIÉE par un état réel, pas gratuite (pont avec
  `b10-mouvement-micro-interactions` et `e04-rive-state-machines`).
- §4 "Pièges & misconceptions" — en particulier le piège "micro-interaction sans état réel
  derrière", le plus facile à commettre sans s'en rendre compte.

Relire aussi le document de process produit en cap01 — ce module en est la continuation
directe, pas un nouveau départ.

## Brief

1. **Site prototypé** — à partir des maquettes du mois 3 (cap01), construire un prototype
   réellement navigable du site vitrine : en Framer (reprendre les labs du Bloc D) ou en
   Figma→React. Documenter en une phrase pourquoi cet outil a été choisi plutôt que l'autre.
2. **Design system naissant** — produire au moins 2 composants de la CONSOLE (pas du site
   vitrine) en variants Figma complets : un `Button` et un composant de données (ex. carte de
   statut), avec des styles/tokens nommés reliés à la charte du mois 2.
3. **Flow de pilotage** — construire un flow d'au moins 4 écrans (onboarding → dashboard de
   pilotage GPU fictif) incluant AU MOINS une micro-interaction Rive pilotée par un état réel
   du flow (ex. statut idle/loading/erreur/succès comme UNE state machine, reprise/adaptée du
   lab `e04-rive-state-machines`).
4. **Récit de process** — rédiger la suite du document de process de cap01 (structure a12),
   puis le préparer pour un pitch oral chronométré de 3 minutes (structure a13, avec un vrai
   contradicteur).

## Livrable attendu

- Un lien ou export du prototype navigable (Framer publié, ou prototype Figma interactif si
  Figma→React n'est pas allé jusqu'au code réel).
- Fichier Figma avec au moins 2 composants en variants complets.
- Flow de pilotage d'au moins 4 écrans avec la state machine Rive intégrée et fonctionnelle.
- Document de process mis à jour + notes de pitch oral (ou enregistrement si le pitch a été
  fait avec un contradicteur réel).

## Rubrique de vérification

**Rubrique objective :**
- Le prototype est réellement navigable (pas des images statiques liées entre elles sans
  logique d'interaction).
- Les 2 composants minimum existent en variants Figma complets, avec des tokens nommés
  identiques à ceux de la charte du mois 2.
- Le flow de pilotage a au moins 4 écrans cohérents entre eux.
- La state machine Rive transite réellement selon une action simulée dans le flow (pas une
  boucle indépendante de l'interaction).
- Le document de process cite explicitement le choix d'outil (Framer vs Figma→React) et sa
  justification.
- L'entonnoir d'activation « inscription → premier déploiement GPU » est écrit (§2.5 du
  module) : étapes observables et séquentielles, perte entre chaque étape, base de référence du
  parcours avant refonte. Un critère de succès formulé sans étapes comptables est refusé.

**Revue qualitative :** la question centrale est "est-ce que je peux déclencher l'animation
Rive moi-même en suivant le flow, et comprendre immédiatement ce qu'elle signifie" — si
l'animation tourne sans rapport avec ce que fait l'utilisateur dans le flow, le livrable
échoue le brief même s'il est visuellement réussi.

## Variante J+30 (fading)

Reprendre le flow de pilotage et ajouter un deuxième composant de données en variants (ex.
une liste de jobs GPU avec statuts multiples simultanés), en respectant la hiérarchie
visuelle du module `b09-hierarchie-visuelle` pour que les statuts les plus critiques
(erreur) ressortent sans dépendre uniquement de la couleur — préparation directe à la
contrainte renforcée du lab cap03 sur la hiérarchie de l'information de coût.
