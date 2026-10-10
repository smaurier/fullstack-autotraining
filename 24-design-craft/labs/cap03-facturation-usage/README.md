# Lab Capstone 03 — Flow de facturation à l'usage

> **Module associé :** [`modules/cap03-facturation-usage.md`](../../modules/cap03-facturation-usage.md)
> **Forme :** Zéro — construire le dernier flow du capstone et du cours entier.
> **Outil :** Figma (écrans) + test réel avec un tiers ou soi-même à froid.

## Lire avant

Relire précisément, pas tout le module :
- §2.2 — les 3 composants obligatoires du flow, en particulier le MOMENT d'affichage de
  l'estimation de coût (avant, jamais après).
- §2.3 — l'oracle qualitatif central, à utiliser mot pour mot lors du test.
- §2.4 et §2.5 — pourquoi la hiérarchie visuelle (pont `b09-hierarchie-visuelle`) et
  l'accessibilité de conception (pont `a06-accessibilite-conception`) ont ici un enjeu
  financier réel, pas seulement esthétique.
- Exemples A et B du module — ce sont les deux pièges les plus probables de ce lab précis.

## Brief

Construire, pour le capstone console GPU fictive (charte de cap01, design system et flow de
cap02), le flow complet de facturation à l'usage :

1. **Écran de compteur de consommation** : visible en permanence pendant qu'une ressource
   GPU fictive est utilisée, en temps quasi réel (pas besoin d'un vrai backend, un état
   simulé dans le prototype suffit).
2. **Écran ou modal de confirmation d'action payante** : affiche l'estimation de coût AVANT
   toute validation, avec une hiérarchie visuelle (taille, poids, position) qui la rend
   impossible à manquer — ne JAMAIS s'appuyer uniquement sur la couleur.
3. **Écran d'historique de facturation** : chaque ligne relie un montant à l'action précise
   qui l'a généré, lisible sans explication orale.

Puis **tester explicitement** le flow complet avec un tiers (ou soi-même à froid, après avoir
mis de côté le travail pendant au moins quelques heures) en posant la question exacte :
"est-ce que tu comprends ce que ça va te coûter avant de cliquer ?" à chaque étape.

## Livrable attendu

- Les 3 écrans Figma, cohérents avec la charte et le design system du capstone (cap01, cap02).
- Un compte-rendu écrit du test oracle : la question posée, la réponse obtenue à chaque
  étape, et toute hésitation documentée même si la réponse finale était "oui".

## Rubrique de vérification

**Rubrique objective :**
- Les 3 écrans existent et utilisent les styles/tokens de la charte du capstone.
- L'estimation de coût apparaît dans le flow AVANT l'écran/action de confirmation finale,
  jamais après.
- L'estimation de coût est visuellement plus grande et/ou plus dense (poids) que les
  informations secondaires du même écran (vérifiable par mesure directe dans Figma).
- L'historique relie chaque montant à une action nommée, pas un montant brut isolé.
- Le compte-rendu de test oracle existe et documente une réponse par étape testée.

**Revue qualitative :** la seule question qui prime réellement est "le testeur a-t-il répondu
OUI sans hésitation à chaque étape ?" — toute hésitation rapportée honnêtement dans le
compte-rendu (même si le lab est par ailleurs soigné visuellement) signale un vrai problème de
conception à corriger, pas un détail à minimiser pour "finir" le lab.

## Variante J+30 (fading)

Reprendre l'écran de confirmation d'action et simuler un cas limite réaliste : un coût estimé
nettement plus élevé que l'usage habituel (ex. un calcul GPU dix fois plus long que la
moyenne des usages précédents). Vérifier si la hiérarchie visuelle construite tient face à ce
cas extrême, ou si elle avait été calibrée seulement pour un montant "normal" — documenter si
un signal supplémentaire (pas seulement une taille de police) serait nécessaire pour un coût
anormalement élevé.
