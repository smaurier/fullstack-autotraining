# Lab B06 — Critique sémiotique d'une interface réelle

> **Module associé :** [`modules/b06-semiotique.md`](../../modules/b06-semiotique.md)
> **Forme :** Investigation — analyser une interface existante, pas en créer une nouvelle.
> **Outil :** Figma (annotation) ou document texte, au choix.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.2 (triade de Saussure, triade de Peirce) — la grille de classification exacte à
  appliquer, en particulier la distinction icône/indice/symbole.
- §3 "Exemple A" — c'est le raisonnement attendu sur un cas proche (les statuts GPU), pas le
  corrigé du lab : ta propre interface choisie n'aura pas les mêmes signes exacts.
- §4 "Pièges & misconceptions" — en particulier le piège "une icône parle d'elle-même" et le
  piège "confondre indice et symbole".

## Brief

Choisir UNE interface réelle parmi : nahual.fr, nuada-audit.netlify.app, ou les icônes de
statut de pilotage GPU du capstone si déjà esquissées (sinon, en imaginer 4 : idle/loading/
erreur/succès sur papier avant l'analyse).

1. Lister au moins **5 signes visuels** utilisés dans cette interface (icônes, couleurs
   porteuses de sens, formes) — pas 5 éléments décoratifs, 5 signes qui sont censés
   COMMUNIQUER quelque chose à l'utilisateur.
2. Pour chacun, classer explicitement : **icône**, **indice** ou **symbole** au sens de
   Peirce, avec une phrase de justification (pas juste le mot).
3. Identifier au moins **2 échecs réels** parmi ces signes : un signe ambigu (ne se comprend
   pas sans contexte supplémentaire) ou un signe qui repose sur une convention non partagée
   par tout le public visé (ex. couleur seule pour un statut critique).
4. Pour chaque échec identifié, proposer une **correction concrète** (pas "il faudrait
   clarifier" — la correction précise : quel texte ajouter, quelle forme changer, quel
   second canal utiliser).

## Livrable attendu

Un document (Figma annoté ou texte structuré) avec :
- Le tableau des 5+ signes analysés (signe → classification Peirce → justification).
- Les 2+ échecs identifiés, chacun avec sa correction proposée.

## Rubrique de vérification

**Rubrique objective :**
- Au moins 5 signes listés et classés icône/indice/symbole.
- Classification correcte au sens de Peirce pour chaque signe (vérifiable contre la
  définition du module — une couleur porteuse de sens pur est presque toujours un symbole,
  jamais une icône).
- Au moins 2 échecs réels identifiés, chacun avec une correction précise et actionnable
  (pas une reformulation vague du problème).

**Revue qualitative :** le brief demandait de PROUVER la grille de lecture sémiotique sur un
cas réel, pas de produire une liste décorative. La question n'est jamais "est-ce que
l'interface est jolie" mais "est-ce que chaque signe analysé communique vraiment ce qu'on lui
attribue, pour un public qui n'a pas la même familiarité avec les conventions logicielles que
le designer lui-même" (piège #4 du module).

## Variante J+30 (fading)

Reprendre les 2 échecs corrigés et les faire tester (sans explication préalable) par une
tierce personne (Elda ou équivalent) : lui montrer uniquement le signe corrigé et lui
demander ce qu'elle comprend, sans contexte. Si elle ne retrouve pas le sens visé sans aide,
la correction a seulement déplacé le problème — reprendre le signe jusqu'à ce qu'il tienne
seul face à un regard neuf.
