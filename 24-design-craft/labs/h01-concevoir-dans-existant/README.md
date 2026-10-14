# Lab H01 — Inventaire et modification minimale sur un produit qui existe

> **Module associé :** [`modules/h01-concevoir-dans-existant.md`](../../modules/h01-concevoir-dans-existant.md)
> **Forme :** Existant — nahual.fr est en production, avec une direction artistique posée et des précédents établis.
> **Outil :** un document pour l'inventaire, Figma pour la proposition.

## Le fil rouge du bloc H : « Nahual 2D »

Les labs du bloc H s'appuient sur un chantier unique, qui court du module H01 au module H06 :

> **Construire le design system du portfolio en Figma, et en tirer une déclinaison 2D de
> nahual.fr — même structure, même contenu, rendu sans WebGL ni mouvement — avec une bascule
> entre les deux modes.**

Pourquoi ce chantier et pas un exercice d'école : la version 2D a une **raison d'exister
défendable**, ce qui est la condition pour que le travail de conception soit réel. Elle est le
repli `prefers-reduced-motion`, le repli sans GPU disponible, le repli sur connexion lente, et
la version qui reste lisible pour quelqu'un de pressé. Ce n'est pas une maquette d'entraînement,
c'est une déclinaison de produit.

**Deux règles de conception posées d'entrée, non négociables :**

1. **Le 2D est le mode par défaut** sur les chemins qui en ont besoin : `prefers-reduced-motion`
   actif, WebGL indisponible, connexion dégradée. Les personnes qui ont le plus besoin du 2D ne
   peuvent pas être obligées d'interagir avec un contrôle rendu en 3D pour sortir du 3D.
2. **La bascule expressive doit avoir une alternative.** Si le passage 3D vers 2D se fait par
   un glissement (le geste « slice »), ce geste est l'affordance de surface : il doit être
   doublé d'un contrôle actionnable au clic et au clavier, avec le même effet. Un contrôle qui
   n'existe qu'en glissement est inaccessible (WCAG 2.5.1 gestes, 2.5.7 mouvements de
   glissement) — et le repérer maintenant vaut mieux que le découvrir en audit.

**Périmètre de ce chantier :** Figma et documents de conception uniquement. Aucune
modification du site en ligne, aucune branche de code, tant qu'un go séparé n'a pas été donné —
nahual a du travail de direction artistique en cours et une échéance de concours.

## Échauffement (30 min, jetable)

> Prends une application que tu utilises tous les jours et choisis un écran. Inventorie trois
> motifs qu'elle réutilise ailleurs (une confirmation, un état vide, un filtre), et pour chacun
> trouve **où** il réapparaît. Contrainte : ne propose aucune amélioration. Le geste à isoler
> ici est l'inventaire, et l'envie de proposer est précisément ce qu'il faut suspendre.

Le piège attendu : glisser vers la critique au bout de cinq minutes. L'inventaire précède la
proposition, et c'est un exercice de patience autant que de méthode.

## Lire avant

Relire précisément :
- §2.1 — les trois questions de l'inventaire, dans l'ordre.
- §2.2 — le précédent, et pourquoi une solution cohérente bat souvent une meilleure solution
  isolée.
- §2.4 — les trois réponses à une dette de design, et la réponse interdite.
- §2.5 — la modification minimale, et l'obligation d'écrire ce qu'on ne touche pas.

## Brief

### Partie 1 — inventaire de l'existant (nahual.fr)

1. Inventorier les **motifs visuels et d'interaction déjà en place** sur nahual.fr : échelle
   typographique réellement utilisée, palette réellement utilisée, rythme d'espacement, formes
   récurrentes, comportements de survol et de transition. Pour chacun : où il apparaît, et sous
   quel nom tu le désignerais.
2. Pour chaque motif, répondre à la troisième question du §2.1 : **pourquoi a-t-il été fait
   comme ça ?** Tu es l'auteur, donc tu as la réponse — l'écrire est l'exercice, parce que c'est
   ce qui te manquera sur un produit dont tu n'es pas l'auteur.
3. Repérer **au moins trois incohérences** (deux façons de faire la même chose) et les
   qualifier par les trois réponses du §2.4 : à corriger dans le périmètre, à ouvrir comme
   sujet, ou à documenter et laisser.

### Partie 2 — modification minimale

4. Prendre **une** page de nahual.fr et une demande d'évolution réelle (par exemple : la
   correction issue du lab G01 sur une page de projet qui ne mène nulle part).
5. Produire la **modification minimale qui résout** le problème nommé, sans créer de précédent
   nouveau — donc en réutilisant les motifs inventoriés en partie 1.
6. Écrire la **liste de ce que tu ne touches pas**, avec la raison de chaque non-intervention.

### Partie 3 — calibration professionnelle (exercice récurrent, hors de ce dépôt)

7. Dans ton contexte professionnel, prendre un ticket d'évolution que tu vas implémenter.
   **Avant** d'ouvrir la maquette conçue par les designers du produit, produire ton propre
   inventaire et ta propre proposition minimale. Comparer ensuite.
8. Noter l'écart : ce qu'ils ont vu que tu n'avais pas vu, ce qu'ils ont laissé que tu aurais
   touché, les conventions qu'ils appliquent et que tu ignorais.

> **Garde-fou sans exception.** Ce dépôt est public. L'exercice 7-8 ne produit **rien** ici : ni
> capture, ni export, ni nom de client, ni nom de composant interne, ni libellé métier, ni
> donnée. Ce que tu en ramènes est une **note de méthode** dans ton espace privé, formulée en
> générique (« les maquettes de ce produit documentent systématiquement l'état de droit »), et
> rien d'autre. Si une note ne peut pas être écrite en générique, elle ne sort pas.

## Livrable attendu

- L'inventaire des motifs de nahual.fr, avec emplacement, nom et raison pour chacun.
- Les trois incohérences qualifiées par les trois réponses possibles.
- La proposition minimale sur une page, réutilisant les motifs inventoriés.
- La liste écrite du non-touché, avec les raisons.
- (Hors dépôt) la note de méthode issue de la calibration professionnelle.

## Rubrique de vérification

**Rubrique objective :**
- L'inventaire couvre au minimum : échelle typographique, palette, rythme d'espacement,
  formes récurrentes, comportements de transition.
- Chaque motif porte une réponse à « pourquoi comme ça » — aucune case vide.
- Trois incohérences minimum, chacune qualifiée par l'une des trois réponses du §2.4.
- La proposition n'introduit **aucun** motif nouveau. Si elle en introduit un, elle doit
  justifier le coût du §2.3, par écrit.
- La liste du non-touché existe et contient au moins trois entrées avec leur raison.
- Aucun élément confidentiel dans le dépôt (vérifiable : relire le livrable avant de committer).

**Revue qualitative :** le brief demandait d'intervenir, pas de refondre. La question est
donc : la proposition résout-elle le problème nommé avec le plus petit changement possible, et
un relecteur peut-il distinguer, dans ce livrable, une décision de non-intervention d'un oubli ?
Un lab qui conclut à une refonte de nahual a échoué au geste du module, même si la refonte
serait justifiée par ailleurs.

## Variante J+30 (fading)

Refaire la partie 3 (calibration professionnelle) sur un deuxième ticket, sans relire la note
de méthode du premier. Comparer les deux écarts : si le deuxième écart porte sur les mêmes
points que le premier, la note n'a pas été intégrée — c'est une information sur ta façon
d'apprendre, pas sur ta capacité.
