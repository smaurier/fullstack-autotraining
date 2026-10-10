# Lab B12 — Un écran TribuZen en 3 déclinaisons web/HIG/Material

> **Module associé :** [`modules/b12-conventions-plateforme.md`](../../modules/b12-conventions-plateforme.md)
> **Forme :** Zéro — construire 3 maquettes d'un même écran.
> **Outil :** Figma.
> **Limite connue :** si `21-design-system/labs/lab-08-tamagui-de-zero` n'est pas construit
> au moment de ce lab, ce lab reste une comparaison CONCEPTUELLE (maquettes), pas un rendu
> cross-platform réellement exécuté — à écrire explicitement dans le livrable, jamais à
> dissimuler.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.2 (conventions HIG et Material, avec leur fonction réelle, pas juste visuelle).
- §2.3 "Quand se conformer, quand s'écarter" — la règle centrale du module.
- §2.4 et Exemple B — la limite Tamagui et la règle "jamais casser un geste fonctionnel".

Ne pas copier une app existante trouvée en ligne sans comprendre POURQUOI chaque élément
HIG/Material est là — l'objectif est de nommer la fonction, pas de reproduire un style.

## Brief

Choisir un écran TribuZen simple avec une navigation et une action principale claire (ex. une
liste de routines, avec l'action "ajouter une routine").

Produire 3 maquettes Figma du même contenu :
1. **Déclinaison web générique** — telle que TribuZen existe aujourd'hui.
2. **Déclinaison HIG (iOS)** — navigation et composants conformes aux conventions Apple.
3. **Déclinaison Material (Android)** — navigation et composants conformes aux conventions
   Google.

Pour chaque déclinaison mobile (2 et 3), documenter par écrit chaque écart par rapport à la
version web : est-ce un écart FONCTIONNEL (jamais acceptable sans raison grave) ou
ESTHÉTIQUE (acceptable si assumé et cohérent avec la marque) ?

## Livrable attendu

- 3 frames Figma nommées (`01-web`, `02-hig-ios`, `03-material-android`).
- Une note qui documente au moins 3 écarts par déclinaison mobile, chacun classé
  fonctionnel/esthétique avec justification.
- Une phrase explicite indiquant si ce lab a pu s'appuyer sur un rendu Tamagui réel ou s'il
  reste conceptuel (à vérifier dans l'état du cours 06 au moment de faire ce lab).

## Rubrique de vérification

**Rubrique objective :**
- Les 3 frames existent et présentent le même contenu fonctionnel (même information, mêmes
  actions disponibles).
- La déclinaison HIG utilise une tab bar en bas et préserve le geste de retour natif (décrit,
  pas nécessairement interactif si c'est une maquette statique).
- La déclinaison Material utilise un FAB unique pour l'action principale et de l'élévation
  visible sur les éléments interactifs.
- Au moins 3 écarts documentés par déclinaison, chacun classé fonctionnel/esthétique.
- La limite Tamagui (réel ou conceptuel) est explicitement mentionnée dans le livrable.

**Revue qualitative :** les écarts assumés le sont-ils pour une vraie raison de marque
documentée, ou trahissent-ils simplement une méconnaissance de la convention native qu'on
aurait dû respecter ?

## Variante J+30 (fading)

Si `lab-08-tamagui-de-zero` est débloqué entre-temps côté cours 06, reprendre ce lab et
produire un VRAI rendu exécuté des 3 déclinaisons via Tamagui, puis comparer ce rendu réel
aux maquettes conceptuelles produites ici — documenter les écarts entre ce qui était prévu
et ce que l'outil produit réellement.
