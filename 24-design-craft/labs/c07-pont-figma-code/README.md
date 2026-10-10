# Lab C07 — Pipeline de tokens Figma → code, bout-en-bout

> **Module associé :** [`modules/c07-pont-figma-code.md`](../../modules/c07-pont-figma-code.md)
> **Forme :** Zéro — construire le pipeline complet, pas une démonstration partielle.
> **Outil :** Figma (Tokens Studio) + Style Dictionary (Node.js).

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.3 (Variables API, Tokens Studio, Style Dictionary) — les trois outils de la chaîne.
- §2.5 "Dépendance honnête" — c'est la règle qui gouverne la partie 3 du brief ci-dessous,
  à ne jamais contourner même sous pression de temps.

## Brief

1. Dans Figma, vérifie que les Variables de couleur et de texte de TribuZen (modules B02/B03,
   lab C03) sont bien structurées en Variables natives (pas seulement des styles).
2. Installe le plugin Tokens Studio, connecte-le à ces Variables, exporte un JSON de tokens
   nommés sémantiquement (ex. `color.sage.500`, pas `#8BA888` seul).
3. Installe Style Dictionary (`npm install -g style-dictionary` ou en dépendance locale d'un
   petit dossier de test), configure-le pour prendre ce JSON en entrée et produire au moins
   une sortie CSS custom properties.
4. Vérifie l'état réel du cours 06 (`21-design-system/`) : a-t-il une structure de tokens CSS
   prête à recevoir cette sortie ? Documente la réponse avant de conclure quoi que ce soit.
5. Si oui : intègre réellement la sortie générée dans le cours 06. Si non : documente l'état
   exact de la dépendance (ce qui manque côté cours 06) sans créer de fichier fictif pour
   simuler une intégration qui n'a pas eu lieu.

## Livrable attendu

- Un JSON de tokens exporté depuis Figma, versionné (dans le dossier du cours ou un
  sous-dossier dédié), avec des noms sémantiques.
- Une configuration Style Dictionary fonctionnelle et une sortie CSS générée, vérifiable en
  l'ouvrant (contient bien les custom properties attendues avec les bonnes valeurs).
- Une note de statut explicite sur la dépendance cours 06 (prêt / pas prêt, et pourquoi).

## Rubrique de vérification

**Rubrique objective :**
- Le JSON exporté existe, est versionné, et chaque token a un nom sémantique (pas une
  valeur brute sans intitulé).
- La commande Style Dictionary s'exécute sans erreur et produit un fichier CSS contenant les
  custom properties attendues avec les valeurs correctes (vérifiables par comparaison directe
  avec les Variables Figma sources).
- La note de statut sur le cours 06 est présente et explicite, qu'elle conclue "prêt" ou "pas
  prêt" — l'absence de cette note est un échec du lab même si le reste fonctionne.

**Revue qualitative :** la chaîne complète est-elle reproductible par quelqu'un d'autre
(ou par toi, dans 3 mois) à partir de la seule documentation produite, sans deviner une
étape manquante ou une commande non notée ?

## Variante J+30 (fading)

Reprendre le pipeline après une évolution réelle de la palette (ex. une nouvelle couleur de
badge décidée dans un futur module ou lab) : modifier uniquement la Variable Figma source,
relancer l'export et le build Style Dictionary, et vérifier que la sortie CSS change sans
qu'aucune ligne n'ait été modifiée à la main dans le JSON ou le CSS généré — preuve que le
pipeline tient dans le temps, pas seulement à sa première exécution.
