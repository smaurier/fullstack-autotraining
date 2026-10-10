# Lab A11 — Dossier de handoff complet d'un composant TribuZen

> **Module associé :** [`modules/a11-design-ops-handoff.md`](../../modules/a11-design-ops-handoff.md)
> **Forme :** Zéro — produire un dossier de handoff qui n'existe pas encore pour ce composant.
> **Outil :** Figma + document de handoff (dans Figma ou séparé).

## Lire avant

Relire précisément, pas tout le module :
- §2.3 (ce qu'un handoff doit contenir) et l'Exemple B — c'est la checklist à suivre.
- §2.4 (le test ultime du handoff) — le critère de réussite du lab, binaire.
- §4 "Pièges & misconceptions" — en particulier "documenter seulement l'état par défaut".

## Brief

Choisir un composant TribuZen pas encore handoffé (ex. `RoutineCard`, un bouton de statut,
une carte de profil enfant).

Produire un dossier de handoff complet :
1. Lister TOUS les états du composant (défaut, hover, actif, désactivé, erreur si applicable).
2. Pour chaque état : specs dimensionnelles exactes (tailles, espacements), tokens nommés
   (couleur, typo) — aucune valeur hexadécimale brute sans nom.
3. Annoter tout comportement non visible sur une capture statique (ex. condition d'apparition
   d'un état).
4. Nommer le fichier/la frame selon la convention de statut (`[Review]` ou `[Final]`).

## Livrable attendu

- Le dossier de handoff (Figma Dev Mode ou document séparé) couvrant tous les états du
  composant.
- La liste des tokens nommés utilisés, avec leur valeur réelle.
- Les annotations de comportement non visible.

## Rubrique de vérification

**Rubrique objective :**
- Tous les états réels du composant sont documentés (pas seulement le défaut).
- Chaque valeur visuelle porte un nom de token, zéro hexadécimal brut sans nom dans le
  document final.
- Le fichier/la frame porte un statut explicite dans son nom.

**Revue qualitative :** test ultime du module — attendre au moins quelques heures (ou un
jour), puis essayer de coder le composant en ouvrant SEULEMENT le dossier de handoff, sans
rouvrir le fichier Figma source. Une question qui surgit = le handoff était incomplet,
quelle que soit la raison.

## Variante J+30 (fading)

Reprendre un composant plus complexe (ex. un dashboard entier plutôt qu'un composant isolé)
et refaire l'exercice sans relire le module. Contrainte supplémentaire : faire valider le
handoff par quelqu'un d'autre (un pair, ou soi-même dans un rôle clairement séparé du designer
qui l'a produit) avant de le considérer terminé.
