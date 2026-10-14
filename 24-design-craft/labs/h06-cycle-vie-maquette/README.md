# Lab H06 — Ticket de design du design system et convention de source de vérité

> **Module associé :** [`modules/h06-cycle-vie-maquette.md`](../../modules/h06-cycle-vie-maquette.md)
> **Forme :** Zéro — ni ticket de design ni convention de source de vérité n'existent sur le portfolio.
> **Outil :** un document pour le ticket et la convention. Figma pour la maquette datée.
> **Ancrage :** fil rouge « Nahual 2D ». C'est le lab de synthèse du bloc H : il rassemble les
> livrables de H01 (non-touché), H03 (matrice), H04 (frontière des modes) et G05 (base de
> référence).

## Pourquoi ce lab est le bon endroit pour la source de vérité

Le portfolio est le seul de tes projets où tu es à la fois le designer et le développeur. C'est
donc le seul où la question « qui a raison entre la maquette et le code ? » peut être tranchée
par toi seul, et le meilleur terrain pour apprendre à l'écrire. Dans une équipe, cette question
n'est jamais tranchée par une personne, et ne pas l'avoir écrite coûte des semaines.

## Échauffement (25 min, jetable)

> Prends une user story réelle d'un projet open source (un ticket GitHub avec des critères
> d'acceptation). Réécris ses critères pour qu'ils soient tous **falsifiables** : chacun doit
> pouvoir être déclaré vrai ou faux par quelqu'un qui n'a pas participé à la discussion.
> Contrainte : si un critère ne peut pas être rendu falsifiable, dis pourquoi et ce qu'il
> faudrait décider avant.

Le piège attendu : transformer « l'interface doit être intuitive » en « l'interface doit être
très intuitive ». Un critère falsifiable nomme un fait observable, pas un degré.

## Lire avant

Relire précisément :
- §2.1 — les trois attributs d'une maquette traitée comme spécification.
- §2.2 — ce qui distingue un bon critère d'acceptation, avec la liste d'exemples.
- §2.3 — le chiffrage en deux versions, et pourquoi il déplace la conversation.
- §2.5 — les quatre temps de l'arbitrage, et l'interdiction d'arbitrer en silence.
- §2.6 — la source de vérité selon l'objet.

## Brief

### Partie 1 — le ticket de design

1. Écrire un **ticket de design complet** pour une tranche du fil rouge Nahual 2D (par exemple :
   la bascule 3D/2D conçue en H03, ou la déclinaison 2D d'une page de projet). Le ticket contient
   obligatoirement :
   - le **problème** utilisateur (format A01), pas la solution ;
   - les **critères de succès** mesurables, avec leur base de référence s'ils en ont une (G05) ;
   - le **périmètre** : inclus et exclu, explicitement ;
   - les **critères d'acceptation de design**, tous falsifiables ;
   - le **chiffrage en deux versions**, avec ce que la version longue apporte que la courte
     n'apporte pas ;
   - le **statut daté** (maquette v1, date, en revue).
2. Les critères d'acceptation doivent inclure, au minimum : les cases M de la matrice H03
   maquettées, aucun composant nouveau sans justification de coût, contrastes mesurés (A06), la
   liste du non-touché (H01), et le respect de la frontière des deux modes (H04).

### Partie 2 — l'arbitrage tracé

3. Fabriquer un **arbitrage réel** à partir d'une tension que tu as effectivement dans ce
   chantier (par exemple : la bascule slice expressive contre la simplicité du contrôle
   accessible, ou la fidélité à la direction artistique 3D contre la lisibilité du mode 2D).
4. Le tracer selon les quatre temps du §2.5 : retour au problème, coût écrit de chaque option,
   décision et qui tranche, trace écrite datée. Ici l'arbitre est toi, ce qui rend la discipline
   plus dure, pas plus facile : la trace doit exister même quand personne ne la réclame.

### Partie 3 — la convention de source de vérité

5. Écrire la **convention de source de vérité** du portfolio, par objet : les composants du
   design system, les écrans et parcours, les valeurs de base (couleurs, espacements,
   typographie). Pour chaque objet : qui gagne en cas de divergence, et ce qu'on fait quand on
   constate une divergence.
6. Placer cette convention **dans le dépôt du projet concerné**, pas dans une note personnelle :
   une convention non partagée n'est pas une convention.

## Livrable attendu

- Le ticket de design complet, avec ses six sections obligatoires.
- L'arbitrage tracé selon les quatre temps, daté.
- La convention de source de vérité, par objet, avec la règle de divergence.
- La maquette correspondante, datée et portant son statut.

## Rubrique de vérification

**Rubrique objective :**
- Le ticket contient les six sections, aucune manquante.
- Le problème est formulé comme un problème utilisateur, jamais comme une solution.
- **Tous** les critères d'acceptation sont falsifiables : relire un par un et vérifier qu'un
  tiers pourrait les déclarer vrais ou faux. Un seul critère de goût invalide la section.
- Le chiffrage comporte deux versions et nomme explicitement l'apport de la plus longue.
- La maquette porte une date et un statut.
- L'arbitrage comporte les quatre temps, dont le coût écrit de chaque option **avant** la
  décision.
- La convention de source de vérité couvre les trois familles d'objets et dit, pour chacune, ce
  qu'on fait en cas de divergence constatée.
- La convention est écrite dans le dépôt, pas dans une note privée.

**Revue qualitative :** le brief demandait un ticket qu'une autre personne pourrait exécuter et
relire sans toi. Les questions sont donc : un développeur qui ne connaît pas le chantier
pourrait-il implémenter à partir de ce ticket sans te poser de question de conception, et un
relecteur pourrait-il dire « le critère 5 n'est pas rempli » au lieu de « je ne suis pas
convaincu » ? Et pour l'arbitrage : la troisième voie, s'il y en a une, est-elle apparue parce
que les coûts ont été écrits, ou a-t-elle été choisie d'avance et habillée ensuite ?

## Variante J+30 (fading)

Reprendre le ticket **après** avoir implémenté la tranche, et faire l'exercice honnête du
bilan : quels critères d'acceptation se sont révélés inutiles, lesquels manquaient, et quelle
divergence maquette/code est apparue. Mettre à jour la convention de source de vérité en
conséquence — c'est la seule façon qu'une convention devienne vraie plutôt que déclarative.
