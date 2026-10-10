# Lab A04 — Flow GazettePreview et wireframes basse fidélité

> **Module associé :** [`modules/a04-user-flows-wireframes.md`](../../modules/a04-user-flows-wireframes.md)
> **Forme :** Zéro — `GazettePreview` n'a pas encore de flow ni de wireframe documentés.
> **Outil :** FigJam ou papier pour le flow, kit wireframe Figma (ou papier photographié) pour les écrans.

## Lire avant

Relire précisément, pas tout le module :
- §2.1 (notation du user flow : rectangle/losange/flèche) — la syntaxe minimale attendue.
- §2.2-2.3 (fidélité comme outil de communication, piège de la haute-fidélité déguisée).
- Exemple A — c'est la méthode attendue (comment construire le flow pas à pas), pas le
  corrigé : ton flow réel peut révéler d'autres décisions que celles listées ici.

Ne pas ouvrir Figma avec de vraies couleurs/polices avant d'avoir le flow complet sur papier
ou FigJam — l'ordre (flow puis wireframe gris) est la compétence évaluée, pas un détail.

## Brief

1. **User flow complet** de `GazettePreview` : du déclenchement (bouton sur le dashboard
   famille) à l'affichage final, avec **au moins une branche d'erreur ou de cas limite**
   (ex. aucune routine enregistrée, échec de génération). Notation rectangle/losange/flèche,
   sur FigJam ou papier photographié.
2. **Wireframes basse fidélité** de CHAQUE écran révélé par le flow (pas seulement l'écran
   final heureux) : gris, placeholders texte, aucune couleur de marque, aucune police finale.

## Livrable attendu

- Un diagramme de flow lisible, avec au moins un losange de décision menant à un chemin
  alternatif documenté.
- Un wireframe basse fidélité pour chaque rectangle/étape du flow (au minimum 3-4 écrans :
  état heureux + au moins un état d'erreur ou vide).
- Chaque wireframe porte le nom exact de l'étape du flow dont il provient, pour une
  traçabilité explicite.

## Rubrique de vérification

**Rubrique objective :**
- Le flow contient au moins un losange de décision menant à deux chemins distincts (pas une
  ligne droite du début à la fin).
- Chaque étape/rectangle du flow a un wireframe correspondant — aucun écran "oublié".
- Aucun wireframe ne contient de couleur de marque (sauge/terracotta) ni de police finale
  (Fraunces/Inter) — gris et placeholders uniquement.
- Le nommage des wireframes correspond exactement aux noms des étapes du flow.

**Revue qualitative :** le brief demandait qu'un tiers qui ne connaît pas TribuZen comprenne
le chemin complet juste avec le flow, sans explication orale — la question n'est jamais "est-
ce que les wireframes sont jolis" (ils ne doivent pas chercher à l'être) mais "est-ce que le
flow révèle de vrais cas d'usage (y compris les échecs) et est-ce que chaque wireframe reste
fidèle au niveau de détail demandé, sans glisser vers une haute-fidélité déguisée (piège §2.3
du module)".

## Variante J+30 (fading)

Reprendre le flow produit et ajouter un DEUXIÈME embranchement d'erreur non envisagé la
première fois (ex. l'enfant n'a pas encore de profil complet pour figurer dans la gazette).
Produire uniquement le ou les wireframes manquants pour ce nouveau chemin — contrainte :
sans relire le flow original, en travaillant uniquement de mémoire sur sa structure, pour
vérifier que la logique du flow est restée claire sans support.
