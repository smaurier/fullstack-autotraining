# Lab A03 — Sitemap TribuZen par tri par cartes

> **Module associé :** [`modules/a03-architecture-information.md`](../../modules/a03-architecture-information.md)
> **Forme :** Zéro — construire de zéro le sitemap complet, aucun existant à corriger.
> **Outil :** papier/texte pour le tri, Figma ou FigJam pour le sitemap final.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.2 (sitemap vs wireframe, tri ouvert vs fermé) — la distinction centrale du lab.
- §2.3 (trois familles de structures de navigation) — nécessaire pour justifier le choix final.
- Exemple A — c'est la méthode attendue, pas le corrigé : la liste d'écrans et les
  regroupements proposés sont indicatifs, le but est de refaire le raisonnement soi-même,
  pas de recopier le résultat.

Ne pas consulter de sitemap tout fait d'une app similaire avant d'avoir produit le sien —
le but est de prouver une méthode (tri → structure), pas de copier une arborescence déjà
digérée par quelqu'un d'autre.

## Brief

Construire le sitemap complet de TribuZen (tous les écrans/fonctions connus aujourd'hui :
profils, enfants, routines, `GazettePreview`, dashboard, paramètres famille, historique).

1. **Tri par cartes ouvert** : écrire chaque écran/fonction sur une carte isolée (papier ou
   liste), les regrouper en catégories SANS catégorie prédéfinie au départ, en documentant
   par écrit pourquoi chaque carte rejoint telle autre (pas seulement le résultat final des
   groupes).
2. **Sitemap arborescent** : transformer les groupes obtenus en arbre texte ou diagramme
   FigJam, avec les relations parent-enfant explicites.
3. **Choix de structure de navigation** : pour chaque zone du sitemap, choisir hiérarchique,
   à facettes ou séquentielle, et justifier par écrit pourquoi (nature du contenu, pas goût).

## Livrable attendu

- Une trace écrite du tri par cartes (liste des regroupements successifs ou photo des
  cartes physiques), pas seulement le résultat final.
- Un sitemap arborescent complet (texte ou FigJam), couvrant tous les écrans connus de
  TribuZen listés ci-dessus.
- Une note qui nomme, pour chaque zone du sitemap, la structure de navigation choisie et
  la justification correspondante.

## Rubrique de vérification

**Rubrique objective :**
- Le sitemap couvre tous les écrans listés dans le brief (aucun oublié).
- La trace du tri par cartes existe et montre au moins une hésitation ou un regroupement
  reconsidéré en cours de route (pas un résultat jailli instantanément).
- Chaque zone du sitemap a une structure de navigation nommée explicitement (hiérarchique,
  à facettes ou séquentielle) avec une justification écrite, pas seulement le nom.
- Aucune mise en page, couleur ou disposition d'écran n'apparaît dans le livrable — c'est un
  wireframe, hors scope de ce lab.

**Revue qualitative :** le brief demandait de faire ÉMERGER une structure plutôt que de la
décréter — la question n'est jamais "est-ce que ce sitemap ressemble à une vraie app" mais
"est-ce que les regroupements sont justifiés par le tri documenté, et est-ce que le choix de
structure de navigation découle de la nature du contenu plutôt que d'une habitude copiée".

## Variante J+30 (fading)

Reprendre le sitemap produit et faire un **tri par cartes fermé** avec les catégories
obtenues à l'étape 1, mais sur un SEUL nouvel écran envisagé pour TribuZen (ex. "notifications
famille", pas encore dans le produit). Vérifier si l'écran se range naturellement dans une
catégorie existante ou si son ajout révèle que le sitemap doit évoluer — preuve que le tri
fermé sert à valider une structure existante, jamais à en découvrir une nouvelle.
