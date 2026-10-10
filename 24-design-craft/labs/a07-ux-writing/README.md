# Lab A07 — Réécrire les messages d'erreur et états vides d'un flow TribuZen

> **Module associé :** [`modules/a07-ux-writing.md`](../../modules/a07-ux-writing.md)
> **Forme :** Itération — reprendre un flow existant, pas en créer un nouveau.
> **Outil :** texte (fichier ou annotation Figma), pas besoin de nouvel écran.

## Lire avant

Relire précisément, pas tout le module :
- §2.1 (messages d'erreur) et §2.2 (états vides) — ce sont les deux cibles du lab.
- Exemple A — la méthode de réécriture attendue, avant/après.
- §4 "Pièges & misconceptions" — en particulier le piège de la microcopy "créative" qui
  sacrifie la clarté.

## Brief

Choisir un flow TribuZen existant (onboarding, routines, ou la gazette).

1. Lister tous les messages d'erreur actuels du flow (formulaires, validations) et les
   réécrire : jamais la faute de l'utilisateur, toujours une action possible, ton chaleureux
   cohérent avec TribuZen.
2. Lister tous les états vides actuels du flow et les réécrire : pourquoi c'est vide + quelle
   action fait pour en sortir.
3. Vérifier que tous les boutons principaux du flow ont un label en verbe d'action précis
   (réécrire ceux qui ne le sont pas, ex. "OK", "Soumettre", "Valider" seul).

## Livrable attendu

- Une liste avant/après de tous les messages d'erreur du flow (au moins 5).
- Une liste avant/après de tous les états vides du flow (au moins 1, plus si le flow en
  contient plusieurs).
- Une liste des labels de boutons corrigés, avec le verbe d'action et l'objet précisés.

## Rubrique de vérification

**Rubrique objective :**
- Au moins 5 messages d'erreur réécrits, aucun n'accuse l'utilisateur, chacun propose une
  action claire.
- Chaque état vide réécrit répond aux deux questions (pourquoi / quoi faire).
- Aucun bouton principal du flow ne porte un label générique ("OK", "Soumettre" seul) après
  réécriture.

**Revue qualitative :** le ton reste-t-il identique et cohérent sur TOUS les messages
réécrits (relecture d'ensemble, pas message par message) — est-ce qu'on reconnaît la même
"voix" TribuZen du premier au dernier message ?

## Variante J+30 (fading)

Reprendre un flow différent (ex. la gazette si le premier lab portait sur l'onboarding) sans
relire le module — seulement à partir des trois règles mémorisées. Contrainte supplémentaire :
rédiger aussi un message de SUCCÈS (confirmation d'action réussie) pour ce flow, et vérifier
qu'il reste dans le même ton que les messages d'erreur réécrits, malgré une émotion différente
(enjoué vs factuel-rassurant).
