# Lab C06 — Une bibliothèque, des fichiers consommateurs

> **Module associé :** [`modules/c06-bibliotheques-gouvernance.md`](../../modules/c06-bibliotheques-gouvernance.md)
> **Forme :** Itération — réorganiser l'existant produit en C01-C05, pas repartir de zéro.
> **Outil :** Figma.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.3 (bibliothèque, instance liée vs copie détachée, flux de publication) — c'est le
  mécanisme exact que ce lab met en pratique.
- §2.4 (gouvernance : une bibliothèque, plusieurs fichiers de travail) — la structure cible.
- Exemple B en entier — c'est littéralement la procédure du lab, avec le contre-exemple du
  détachement à reproduire volontairement pour voir la différence.

## Brief

Tu as déjà un `Button` (variants, lab C02), un `RoutineCard` (auto-layout, lab C01), des
styles couleur/texte (lab C03), probablement dispersés dans un ou plusieurs fichiers.

1. Crée (ou désigne) un fichier `tribuzen-design-system` contenant ces composants et styles.
   Publie-le comme bibliothèque, avec un résumé de publication explicite.
2. Dans un fichier de travail séparé, insère ces composants depuis le panneau Assets (pas de
   copier-coller) — vérifie qu'ils apparaissent comme instances liées.
3. Modifie un composant dans la bibliothèque (ex. ajoute la variante d'erreur rouge-brique du
   `Button`, issue du module B02), publie avec un résumé du changement, puis accepte la mise
   à jour dans le fichier de travail.
4. Avant d'accepter la mise à jour à l'étape 3, détache délibérément UNE instance du `Button`
   dans le fichier de travail. Accepte ensuite la mise à jour pour toutes les autres. Compare :
   l'instance détachée ne doit PAS avoir changé, toutes les autres doivent avoir la nouvelle
   variante.

## Livrable attendu

- Un fichier bibliothèque publié avec au moins 2 publications dans son historique (la
  création initiale + la mise à jour de l'étape 3), chacune avec un résumé lisible.
- Un fichier de travail avec des instances liées du `Button` et du `RoutineCard`, plus
  l'instance volontairement détachée de l'étape 4.
- Une note écrite (dans un cadre Figma ou un fichier séparé) qui documente ce que montre la
  comparaison de l'étape 4.

## Rubrique de vérification

**Rubrique objective :**
- Le fichier bibliothèque est publié, avec un historique d'au moins 2 publications ayant
  chacune un résumé de changement non vide.
- Le fichier de travail contient des instances reconnues comme liées (icône de composant
  visible dans le panneau calques, "Go to main component" fonctionne).
- Après la mise à jour de l'étape 3, toutes les instances non détachées affichent la nouvelle
  variante d'erreur ; l'instance détachée de l'étape 4 ne l'affiche pas.
- La note écrite nomme explicitement la différence observée (pas "ça n'a pas marché pour
  celle-là" sans expliquer pourquoi).

**Revue qualitative :** le but n'est pas la beauté du composant mais la preuve que la
propagation fonctionne ET que ses limites (le détachement) sont comprises, pas juste
observées par accident. La question : si un troisième fichier de travail consommait la même
bibliothèque demain, pourrait-il recevoir la même mise à jour sans aucune duplication ?

## Variante J+30 (fading)

Ajouter un deuxième fichier de travail fictif (ex. `tribuzen-capstone-gpu`) qui consomme la
MÊME bibliothèque, et publier une deuxième mise à jour (ex. un nouveau variant de taille pour
le `Button`). Vérifier que les deux fichiers de travail la reçoivent indépendamment, sans
qu'aucun n'ait besoin d'une resynchronisation manuelle de l'autre — preuve que la gouvernance
tient à plus de deux consommateurs, pas seulement au cas simple du lab initial.
