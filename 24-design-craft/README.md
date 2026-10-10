# 24 — Design Craft (Figma, Framer, UI/UX, Motion, Marque)

![Figma](https://img.shields.io/badge/-Figma-F24E1E?style=flat-square&logo=figma&logoColor=white)
![Framer](https://img.shields.io/badge/-Framer-0055FF?style=flat-square&logo=framer&logoColor=white)
[![fullstack-autotraining](https://img.shields.io/badge/curriculum-fullstack--autotraining-4C1?style=flat-square)](https://github.com/smaurier/fullstack-autotraining)

> **Statut : rédaction en cours, pas encore activé.** Entrée Bibliothèque candidate dans
> `PARCOURS-SYLVAIN.md` (voir `brain/scratchpad/formation-design-figma-framer-brouillon.md`
> pour l'étude complète). Ne pas insérer dans le parcours actif avant le jalon
> `reprise-curriculum` (04/11/2026) et une validation explicite — ce cours peut être rédigé
> (contenu écrit) sans que ça viole le gel, la pratique elle attend.

> **Prérequis** : aucun prérequis technique dur. Profil dev front déjà solide (ce cours
> *complète* le profil, voir cours 06 Design System pour le pendant code).

Cours né d'un refus de candidature (Creative Front-end, Arkane Cloud, 06/10/2026) qui a
révélé un vrai manque d'outillage design malgré une intuition UI/UX déjà forte et un vrai
bagage de projets perso (kleyfrance.fr, nuada-audit.netlify.app, nahual.fr). Objectif : un
**vrai bagage d'étudiant** (théorie, histoire, culture graphique) — Figma et Framer sont
l'application de cette théorie, pas le centre de gravité de la formation.

## Pourquoi ce cours n'est pas un doublon du cours 06

Le cours 06 (`21-design-system/`) apprend à **construire un design system en code** —
Tailwind, Radix, shadcn/ui, Tamagui. C'est le développeur qui fabrique l'UI à partir d'une
direction artistique déjà posée. Ce cours-ci produit cette direction artistique elle-même
— maquettes, DA, prototypes, process — avec les outils et la culture du métier design, pas
du développeur. Aucun chevauchement : ce cours produit ce que le cours 06 consomme ensuite.

## Le modèle "oracle" est différent du reste du curriculum

Les autres cours vérifient chaque lab par `solution GREEN / starter RED` via vitest —
impossible pour une maquette, il n'y a pas de test unitaire sur un choix typographique.
Chaque lab-geste de ce cours produit à la place un **livrable réel** (fichier Figma exporté,
lien Framer publié, document écrit) vérifié par :
1. Une **rubrique objective** quand c'est mesurable (contraste WCAG mesuré par un outil,
   cohérence des tokens, le prototype répond exactement aux interactions du brief).
2. Une **revue qualitative** sur le brief rempli ou non — jamais "j'aime/j'aime pas",
   toujours "le brief demandait Y, le livrable fait/ne fait pas Y".

## Blocs

| Bloc | Contenu | Modules rédigés |
|---|---|---|
| A | Process & réflexes UX | **13/13** — [a01](modules/a01-discovery.md) à [a13](modules/a13-pitch-oral.md) |
| B | Culture et théorie du design — le bagage académique | **12/12** — [b01](modules/b01-histoire-du-design.md) à [b12](modules/b12-conventions-plateforme.md) |
| C | Figma (outil) | **10/10** (modules 1-9 + 7bis) — [c01](modules/c01-interface-auto-layout.md) à [c09](modules/c09-collaboration-figjam.md), [c07bis](modules/c07bis-figma-ai-assiste.md) |
| D | Framer (outil) | **7/7** — [d01](modules/d01-positionnement-outil.md) à [d07](modules/d07-publication-seo.md) |
| E | Motion design (After Effects/Lottie + Rive) | **6/6** — [e01](modules/e01-douze-principes-animation.md) à [e06](modules/e06-performance-a11y-mouvement.md) |
| F | Identité de marque multi-supports | **5/5** — [f01](modules/f01-anatomie-identite.md) à [f05](modules/f05-licences-typo.md) |
| Capstone | Étude de cas "console SaaS GPU" | **3/3** — [cap01](modules/cap01-audit-charte-maquettes.md) à [cap03](modules/cap03-facturation-usage.md) |

**56/56 modules rédigés, rédaction du cours complète au 10/10/2026.** Chaque module a son lab
associé dans `labs/<slug>/` (brief + rubrique objective + revue qualitative), sauf b01 dont le
lab a un nom distinct (`labs/b01-trois-langages-visuels/`, exception historique documentée,
à ne pas reproduire). **La rédaction est terminée ; le statut "pas encore activé" plus haut
reste inchangé** : zéro pratique avant le jalon `reprise-curriculum` (04/11/2026) et une
validation explicite de Sylvain sur l'insertion dans `PARCOURS-SYLVAIN.md`.

Convention de nommage des fichiers : `modules/<bloc><NN>-<slug>.md` (ex. `b03-typographie.md`).
Détail complet des modules/labs encore à rédiger : `brain/scratchpad/formation-design-figma-framer-brouillon.md`.

## Ordre recommandé (pas un ordre bibliothèque libre à l'intérieur de ce cours)

> **Rédaction des 56 modules terminée le 10/10/2026** — l'ordre ci-dessous ne concerne plus la
> rédaction (close) mais la PRATIQUE, qui n'a pas commencé (gel jusqu'au 04/11/2026 + validation
> explicite, voir statut en haut de ce fichier).

1. **B (modules 1-8) + A (modules 1-5)** en parallèle — théorie et structure avant tout outil.
2. **C (Figma)** ensuite.
3. **D (Framer) et E (Motion)** en parallèle une fois C posé.
4. **F (Marque)** en parallèle de tout le reste dès le début, sauf son module 4 (pont tokens).
5. **Reste de A (6-13) et B (9-12)** au fil de l'eau sur les projets produits par C/D/E/F.
6. **Capstone en dernier**, toujours.

Calibrer la taille du geste sur la fenêtre de temps réelle : un module théorique ou un seul
composant Figma en soirée contrainte ; capstone, labs motion, brand book complet réservés
aux fenêtres larges (vacances, inter-contrat, weekend dégagé).
