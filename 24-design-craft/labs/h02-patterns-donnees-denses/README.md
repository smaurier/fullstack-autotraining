# Lab H02 — Écran d'historique dense pour TribuZen

> **Module associé :** [`modules/h02-patterns-donnees-denses.md`](../../modules/h02-patterns-donnees-denses.md)
> **Forme :** Zéro — l'historique des routines n'a pas d'écran de consultation conçu.
> **Outil :** Figma pour l'écran, un tableur pour les jeux de données de test.
> **Ancrage :** TribuZen, et non le fil rouge Nahual 2D — un portfolio n'a pas de données
> denses, et ce geste exige un vrai volume. C'est l'un des deux labs du bloc H qui restent sur
> TribuZen.

## Échauffement (30 min, jetable)

> Prends un tableau dense dans un outil que tu utilises (une banque en ligne, un gestionnaire
> de tâches, une liste de commits). Compte ses colonnes, puis applique les trois critères du
> §2.2 à chacune : sert-elle une décision, discrimine-t-elle, est-elle lisible à sa largeur ?
> Contrainte : désigne les colonnes que tu supprimerais, et dis où part l'information de chaque
> colonne supprimée (détail de ligne, marqueur, filtre, ou nulle part).

Le piège attendu : supprimer une colonne sans reloger son information. Une colonne écartée
devient presque toujours un marqueur, un tri, ou une donnée du détail — rarement rien.

## Lire avant

Relire précisément :
- §2.1 — le critère de choix entre tableau, liste et cartes.
- §2.2 — les trois critères de conservation d'une colonne, et les quatre mécanismes à décider.
- §2.4 — les trois emplacements de filtre, et la règle non négociable sur les filtres actifs.
- §2.5 — le critère unique du parcours de volume.
- Exemple A — le format de la réduction de colonnes et la liste des états de volume.

## Brief

1. **Choisir la forme** (tableau, liste ou cartes) et la justifier par le §2.1 — en une ligne.
2. Lister **douze colonnes candidates** (celles de l'Exemple A, ou les tiennes si ton modèle de
   données diffère), puis **en retenir cinq**. Pour chacune des sept écartées : la raison
   (ne sert aucune décision / ne discrimine pas / longueur imprévisible / dérivable) **et** où
   son information est relogée.
3. **Décider les quatre mécanismes de colonne** : ordre, gel de la colonne identifiante,
   configuration par l'utilisateur (oui/non et pourquoi), persistance de ce réglage.
4. **Filtres** : au minimum par enfant et par type (la structure à facettes identifiée en A03).
   Choisir l'emplacement, et montrer l'affichage des filtres actifs avec le compte de résultats
   et la réinitialisation.
5. **Choisir le mode de parcours du volume** et justifier par la question du §2.5 (faut-il
   revenir à une position précise ?).
6. **Concevoir les six états** : zéro donnée, zéro résultat pour ces filtres (différent du
   précédent), chargement, erreur, volume élevé, et un état de contenu extrême (le libellé le
   plus long réellement possible).
7. **Éprouver l'écran sur trois jeux de données** : 0 ligne, 7 lignes, 5000 lignes. Les trois
   doivent être montrés.

## Livrable attendu

- La justification de forme, une ligne.
- Le tableau des douze colonnes candidates avec le verdict et le relogement de chaque écartée.
- Les quatre décisions de colonne, écrites.
- L'écran avec filtres et affichage des filtres actifs.
- Les six états, maquettés.
- Les trois volumes, montrés (trois captures ou trois frames).

## Rubrique de vérification

**Rubrique objective :**
- Exactement cinq colonnes retenues sur douze candidates.
- Chaque colonne écartée porte une raison **et** un relogement (ou « nulle part », assumé).
- La colonne identifiante est gelée, ou la décision de ne pas la geler est justifiée.
- Les filtres actifs sont visibles dans la maquette, avec compte de résultats et
  réinitialisation.
- Le choix pagination / défilement infini / virtualisation cite explicitement la question du
  retour à une position.
- Les états « zéro donnée » et « zéro résultat pour ces filtres » existent **séparément**, avec
  deux messages et deux actions distinctes.
- L'état de contenu extrême utilise une valeur longue réaliste, pas un texte court.
- Les trois volumes (0, 7, 5000) sont tous montrés.

**Revue qualitative :** le brief demandait un écran de travail, éprouvé sur du volume réel. Les
questions sont donc : les cinq colonnes retenues permettent-elles de répondre à « comment s'est
passée la semaine de cet enfant » sans ouvrir une seule ligne de détail, et l'écran tient-il à
5000 lignes sans que la lecture devienne impossible ? Un écran conçu et montré seulement à sept
lignes n'a pas été éprouvé, même s'il est juste.

## Variante J+30 (fading)

Rendre une des cinq colonnes **éditable en ligne**, et concevoir les cinq états que ça ajoute
(modifié non enregistré, enregistrement en cours par ligne, échec d'une ligne pendant que les
autres réussissent, conflit, validation dépendant d'une autre cellule). C'est le pont direct
vers la matrice d'états du module H03, et c'est le geste le plus proche d'un ticket réel de
logiciel métier.
