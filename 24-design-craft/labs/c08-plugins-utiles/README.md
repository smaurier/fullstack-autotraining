# Lab C08 — Contraste mesuré à 100% conforme

> **Module associé :** [`modules/c08-plugins-utiles.md`](../../modules/c08-plugins-utiles.md)
> **Forme :** Itération — corriger un écran TribuZen existant, pas en créer un nouveau.
> **Outil :** Figma + plugin de contraste WCAG réel.

## Lire avant

Relire précisément, pas tout le module :
- §2.1 (plugins de contraste, seuils WCAG 4.5:1/3:1) — le cœur du lab.
- Exemple A en entier — c'est la procédure exacte.
- §4 "Pièges" en particulier "corriger un contraste en changeant la teinte plutôt que la
  luminosité" — contrainte à respecter dans ce lab.

## Brief

1. Choisis un écran TribuZen existant dense en texte (`FamilyDashboard` ou équivalent).
2. Liste toutes les paires texte/fond visibles à l'écran (titre, labels, texte de bouton,
   texte sur carte).
3. Mesure chaque paire avec un plugin de contraste réel — note le ratio exact, pas une
   estimation.
4. Pour chaque paire sous 4.5:1 (texte standard) ou 3:1 (grand texte ≥24px ou éléments
   d'interface), corrige en ajustant UNIQUEMENT la luminosité (HSL) d'une des deux couleurs,
   teinte inchangée — cf. module B02 §2.2 pour la méthode de conversion.
5. Re-mesure après chaque correction.

## Livrable attendu

- Une liste complète des paires texte/fond de l'écran choisi, avec le ratio mesuré AVANT
  correction pour chacune.
- Pour chaque paire corrigée : la valeur HSL avant/après, le ratio avant/après, et la
  confirmation que la teinte n'a pas changé.
- Un écran final où 100% des paires mesurées sont conformes WCAG AA.

## Rubrique de vérification

**Rubrique objective :**
- Toutes les paires texte/fond visibles de l'écran sont listées (pas un sous-ensemble choisi
  pour faciliter le lab).
- 100% des paires atteignent le seuil WCAG AA approprié après correction, ratio mesuré par
  l'outil (pas estimé).
- Chaque correction documente la teinte inchangée (même valeur H en HSL avant/après).

**Revue qualitative :** l'écran corrigé reste-t-il cohérent avec la palette du module B02
(même famille chromatique, même logique d'harmonie), ou les corrections ont-elles produit
des couleurs qui jurent visuellement avec le reste de l'interface pour "juste passer le
test" ?

## Variante J+30 (fading)

Reprendre un second écran TribuZen plus dense encore (ex. le futur dashboard de pilotage du
capstone une fois esquissé) et répéter l'audit en mesurant le temps réellement passé —
comparer ce temps à celui du premier audit pour objectiver le gain de rapidité apporté par
la maîtrise de l'outil plutôt que par un jugement à l'œil répété.
