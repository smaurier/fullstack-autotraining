# Lab E06 — Portfolio motion : poids mesuré et mouvement réduit respecté

> **Module associé :** [`modules/e06-performance-a11y-mouvement.md`](../../modules/e06-performance-a11y-mouvement.md)
> **Forme :** Intervention — assembler et vérifier, pas forcément créer de nouvelles animations.
> **Outil :** Navigateur (outils de mesure réseau + réglage `prefers-reduced-motion`).

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.3 (mesure cumulée, exhaustivité de `prefers-reduced-motion`, fallback fidèle).
- Exemple A et B — les deux vérifications exactes attendues.
- §4, en particulier le piège de l'addition arithmétique naïve.

## Brief

Assembler une page portfolio (TribuZen ou nahual.fr) avec :
- 2 à 3 animations Lottie de marque (labs E03, à compléter si besoin pour atteindre ce
  nombre).
- 1 micro-interaction Rive (lab E04, state machine du capstone).

Puis, sur cette page assemblée :
1. Mesurer le poids réel transféré au chargement (outil réseau du navigateur), pas une
   addition supposée des poids individuels déjà connus.
2. Activer `prefers-reduced-motion` et vérifier, UNE PAR UNE, que chaque animation (toutes,
   sans exception) affiche un fallback statique fidèle.
3. Corriger tout fallback vide, cassé ou incohérent trouvé à l'étape 2.

## Livrable attendu

- La page portfolio assemblée et publiée (ou accessible localement si la publication n'est
  pas encore faite).
- Le poids réel mesuré, documenté en Ko.
- Une note qui liste chaque animation et confirme, pour chacune individuellement, le
  comportement vérifié sous `prefers-reduced-motion`.

## Rubrique de vérification

**Rubrique objective :**
- Le poids réel de la page (pas une somme supposée) est mesuré et documenté.
- Chaque animation, sans exception, a un fallback statique vérifié et fidèle sous
  `prefers-reduced-motion`.
- Aucun fallback vide ni frame arbitraire figé en transition.

**Revue qualitative :** le brief demandait une vérification exhaustive, pas un échantillon —
la question est toujours "est-ce que CHAQUE animation de la page a vraiment été testée
individuellement, ou seulement la première qui a servi de témoin".

## Variante J+30 (fading)

Ajouter une 4e animation (Lottie ou Rive) à la page assemblée et refaire les deux mesures
(poids réel, `prefers-reduced-motion` sur la nouvelle animation) — vérifier que le budget de
poids cible tient toujours, pas seulement qu'il tenait au moment du lab initial.
