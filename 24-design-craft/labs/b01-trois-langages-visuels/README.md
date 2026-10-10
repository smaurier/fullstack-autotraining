# Lab B01 — Un même écran, trois langages visuels

> **Module associé :** [`modules/b01-histoire-du-design.md`](../../modules/b01-histoire-du-design.md)
> **Forme :** Zéro — construire de zéro trois versions entières d'un même écran.
> **Outil :** Figma.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.5 (Bauhaus, Swiss Style, De Stijl, skeuomorphisme, flat design) — les 5 mouvements à distinguer.
- §3 "Exemple A — le même écran de connexion, trois langages visuels" — c'est le raisonnement
  attendu, pas le corrigé : il décrit les DÉCISIONS à prendre, pas les valeurs pixel exactes.
- §4 "Pièges & misconceptions" — en particulier le piège "flat design = sans style" et le
  piège "skeuomorphisme = erreur de design".

Ne pas regarder d'exemples Dribbble/Pinterest avant d'avoir produit ses trois versions —
le but est de prouver une compréhension des codes, pas de copier un style déjà digéré par
quelqu'un d'autre.

## Brief

Un écran de connexion minimal : logo, champ email, champ mot de passe, bouton "Se
connecter" (reprends le contenu réel de TribuZen ou un équivalent générique si tu préfères).

Produire dans un seul fichier Figma, trois frames côte à côte, **le même contenu**, dans
trois langages visuels différents :

1. **Version Bauhaus / Swiss Style** — grille stricte visible (annoter les colonnes),
   alignement gauche strict (aucun élément centré), un seul corps de police géométrique
   sans-serif, palette réduite à 2-3 couleurs maximum, bouton rectangulaire sans arrondi,
   espacement rigoureusement modulaire.
2. **Version flat design contemporain** — mêmes principes de palette réduite et de formes
   géométriques, mais carte de connexion centrée horizontalement/verticalement, bouton avec
   un radius léger, une ombre très subtile sous la carte (élévation).
3. **Version skeuomorphique** — champ de saisie qui imite un carnet/texture papier, bouton
   avec dégradé et ombre portée marquée (effet "cliquable" par imitation physique), logo
   avec un reflet.

## Livrable attendu

- Un fichier Figma avec les 3 frames nommées explicitement (`01-bauhaus-swiss`,
  `02-flat-contemporain`, `03-skeuomorphisme`).
- Une note texte (dans un cadre Figma à côté de chaque frame, ou un fichier séparé) qui
  nomme, pour **chaque décision visuelle** de chaque version, à quel mouvement historique
  elle appartient et pourquoi (ex. "alignement gauche strict → Swiss Style, jamais de
  centrage sur un paragraphe dans ce langage").

## Rubrique de vérification

**Rubrique objective :**
- Les 3 frames existent, nommées, avec le même contenu textuel exact dans les 3.
- La version 1 ne contient AUCUN élément centré, AUCUN radius de bouton, AUCUNE ombre.
- La version 2 contient une ombre mesurable (pas invisible) mais légère (pas une ombre
  portée de +8px comme en version 3).
- La version 3 contient au moins une texture/dégradé/reflet identifiable à l'œil.
- Chaque décision listée dans la note d'annotation est reliée à un mouvement nommé dans le
  module (Bauhaus, Swiss Style, De Stijl, skeuomorphisme, flat design) — pas de "parce que
  c'est joli" en guise de justification.

**Revue qualitative :** le brief demandait de prouver la compréhension des codes PAR LA
PRATIQUE — la question n'est jamais "est-ce que la version 3 est belle" (elle ne doit pas
l'être, c'est un contre-exemple volontaire) mais "est-ce que chaque version respecte
fidèlement la discipline du mouvement qu'elle représente, et est-ce que la justification
écrite distingue correctement Bauhaus de Swiss Style (piège #2 du module) plutôt que de les
confondre".

## Variante J+30 (fading)

Reprendre les 3 versions et ajouter une 4e : "Material Design" (voir module B12, pas encore
rédigé au moment de ce lab — se limiter à une recherche rapide des principes d'élévation
Material si ce module n'est pas encore disponible). Contrainte supplémentaire : la version
4 doit réutiliser la MÊME palette que la version 2 (flat contemporain) tout en changeant
uniquement le système d'élévation/ombres — preuve que palette et système d'élévation sont
deux décisions indépendantes.
