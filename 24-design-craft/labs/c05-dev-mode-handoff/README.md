# Lab C05 — Préparer un fichier TribuZen pour Dev Mode

> **Module associé :** [`modules/c05-dev-mode-handoff.md`](../../modules/c05-dev-mode-handoff.md)
> **Forme :** Intervenir dans l'existant — un fichier déjà construit (lab C02 ou C04).
> **Outil :** Figma.

## Lire avant

Relire précisément :
- §2.2 "Les deux prérequis qui rendent Dev Mode utile" — nommage ET tokens, les deux
  ensemble.
- §2.3 "Pourquoi un Dev Mode mal préparé est PIRE qu'aucune spec".
- §3 Exemple A (méthode d'audit pas à pas).

## Brief

Prendre un fichier TribuZen existant (le `Button` du lab C02 ou le prototype du lab C04) et le
préparer intégralement pour Dev Mode :
1. Scanner tous les calques et renommer 100% des noms par défaut ("Rectangle N", "Frame N",
   "Group") par un nom qui décrit leur rôle fonctionnel.
2. Vérifier chaque valeur de couleur/texte affichée en Dev Mode : si une valeur hexadécimale
   brute apparaît au lieu d'un nom de token, reconnecter le calque au bon token (module C03).
3. Tester l'inspection Dev Mode sur au moins 3 composants différents du fichier.

## Livrable attendu

- Le fichier Figma corrigé, zéro calque orphelin.
- Une capture ou un export de l'inspection Dev Mode sur les 3 composants testés, montrant les
  noms de tokens (pas de valeurs brutes).

## Rubrique de vérification

**Rubrique objective :**
- Zéro calque nommé par défaut dans le fichier final (vérifiable en parcourant le panneau de
  calques entier).
- Zéro valeur de couleur/texte brute détectée à l'inspection Dev Mode sur les 3 composants
  testés — chaque valeur affiche un nom de token.
- L'inspection Dev Mode produit des specs lisibles sans ambiguïté sur le rôle de chaque
  élément.

**Revue qualitative :** un dev qui ouvre Dev Mode sur ce fichier pourrait-il coder le
composant sans revenir poser une seule question sur ce qu'un calque représente ou quelle
valeur utiliser ?

## Variante J+30 (fading)

Donner le fichier préparé à un tiers (ou se le faire relire à froid, plusieurs jours plus
tard, en ayant "oublié" les détails) et lui demander de décrire chaque composant uniquement à
partir de Dev Mode, sans explication orale. Noter chaque question qu'il/elle doit quand même
poser — c'est la liste des points encore mal préparés.
