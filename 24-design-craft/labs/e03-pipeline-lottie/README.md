# Lab E03 — Export Lottie vérifié dans un vrai navigateur

> **Module associé :** [`modules/e03-pipeline-lottie.md`](../../modules/e03-pipeline-lottie.md)
> **Forme :** Intervention — exporter et intégrer l'animation du lab E02.
> **Outil :** After Effects (Bodymovin), `lottie-web`.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.3 (Bodymovin, pertes silencieuses, test réel navigateur) — le cœur de la méthode.
- Exemple B — comment détecter une perte d'effet silencieuse.
- §4 "Pièges & misconceptions".

## Brief

Reprendre l'animation de chargement/succès construite en After Effects (lab E02, ou une
nouvelle animation courte entièrement vectorielle si le lab E02 n'est pas disponible).

1. Exporter via Bodymovin en fichier `.json`.
2. Intégrer ce fichier dans une page web réelle (TribuZen ou nahual.fr, ou une page de test
   minimale avec `lottie-web`) et l'afficher dans un vrai navigateur.
3. Comparer image par image le rendu navigateur avec l'aperçu After Effects d'origine,
   documenter toute divergence trouvée (effet perdu, easing qui paraît différent).
4. Mesurer le poids du fichier `.json` obtenu.

## Livrable attendu

- Le fichier Lottie intégré et fonctionnel dans une vraie page web.
- Une note de comparaison AE vs navigateur, avec toute divergence documentée et, si trouvée,
  corrigée.
- Le poids du fichier mesuré en Ko.

## Rubrique de vérification

**Rubrique objective :**
- Le fichier Lottie rejoue réellement dans un navigateur (preuve : capture d'écran ou lien).
- Une comparaison explicite AE vs navigateur a été faite, pas supposée identique.
- Le poids est mesuré et documenté.
- Si une divergence a été trouvée, la correction appliquée est documentée (quel effet,
  quelle reconstruction).

**Revue qualitative :** le brief demandait une preuve de fidélité, pas juste un export qui
"ne plante pas" — la question est toujours "est-ce que ce qui se joue dans le navigateur
est VRAIMENT ce qui a été vu dans After Effects, vérifié et pas supposé".

## Variante J+30 (fading)

Prendre une animation plus ambitieuse qui utilise au moins un style de calque natif (ombre,
lueur) délibérément — prédire avant export si cet effet survivra, exporter, vérifier la
prédiction, puis corriger si besoin en recréant l'effet comme forme vectorielle séparée.
