# Lab C03 — Système de tokens couleur/texte de TribuZen

> **Module associé :** [`modules/c03-styles-tokens.md`](../../modules/c03-styles-tokens.md)
> **Forme :** Zéro — construire le système de tokens avant de l'appliquer.
> **Outil :** Figma.

## Lire avant

Relire précisément :
- §2.3 "Nommer par USAGE, jamais par VALEUR" — la règle centrale de ce lab.
- §2.4 "Le pont direct avec le cours 06" — la correspondance Figma ↔ CSS à anticiper.
- §3 Exemple B — pourquoi deux usages qui partagent une valeur peuvent mériter deux tokens.

Relire `design.md` de TribuZen (palette sauge/terracotta/blanc chaud, typo Fraunces+Inter)
et le module B02 (théorie de la couleur) si le raisonnement d'harmonie n'est pas encore clair.

## Brief

Créer dans un fichier Figma l'ensemble complet des styles/tokens couleur ET texte de
TribuZen :
- Couleurs : au minimum `color-brand-primary`, `color-accent`, `color-surface`, nommées par
  usage, pas par teinte.
- Texte : styles pour au moins 3 niveaux de hiérarchie (titre, sous-titre, corps), utilisant
  Fraunces et Inter selon leur rôle respectif (voir module B03 typographie si disponible).
- Au moins UNE variable (pas un simple style) configurée avec 2 modes (ex. `light`/`dark`),
  même si le mode `dark` n'est pas encore utilisé en production.

## Livrable attendu

- Le fichier Figma de tokens, avec une page dédiée claire.
- Une table de correspondance écrite : chaque token Figma ↔ son nom de custom property CSS
  prévu côté cours 06 (ex. `color-accent` → `--color-accent`).
- Vérification que les composants des labs C01/C02 référencent bien ces tokens plutôt que des
  valeurs libres (reconnecter si besoin).

## Rubrique de vérification

**Rubrique objective :**
- Zéro valeur de couleur ou de texte utilisée plus d'une fois dans le fichier sans être un
  style/token nommé (vérifiable en inspectant les calques existants des labs précédents).
- Aucun nom de token ne contient une valeur littérale de couleur (pas de "orange", "rouge",
  "vert" dans un nom de token).
- La variable à 2 modes existe et change effectivement la valeur d'au moins un token selon le
  mode actif.
- La table de correspondance Figma ↔ CSS est complète pour tous les tokens créés.

**Revue qualitative :** un futur token de couleur d'erreur (cf. module B02 Exemple B)
pourrait-il s'intégrer dans ce système sans qu'il faille renommer quoi que ce soit
d'existant ?

## Variante J+30 (fading)

Reprendre le système de tokens et basculer réellement le mode de `light` à `dark` sur le
fichier entier (pas juste la variable test) — mesurer combien de composants s'adaptent
automatiquement et lesquels révèlent encore une valeur libre oubliée. Corriger chaque
exception trouvée.
