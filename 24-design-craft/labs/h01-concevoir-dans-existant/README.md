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

### Partie 3 — calibration à l'aveugle contre un design system public

L'exercice récurrent du bloc H, et le seul endroit du cours qui te dit où tu en es par rapport
à des professionnels, sans que tu aies à le deviner.

7. Choisir un **composant d'un design system public et documenté** que tu n'as jamais conçu :
   DSFR (Système de Design de l'État français), GOV.UK Design System, IBM Carbon, Shopify
   Polaris, Material 3. Un composant non trivial : champ de recherche avec suggestions,
   pagination, notification, sélecteur de dates, tableau triable, fil d'Ariane.
8. **Sans ouvrir leur documentation**, le concevoir : l'anatomie, les états, les variantes, le
   comportement au clavier, le texte par défaut, et ce que tu documenterais si tu le livrais à
   une équipe.
9. **Ensuite seulement**, ouvrir la documentation publiée et comparer. Relever trois écarts :
   - ce qu'ils ont prévu et que tu n'avais pas vu ;
   - ce qu'ils ont **refusé** de faire, et la raison qu'ils en donnent ;
   - leur section « quand ne pas utiliser ce composant », qui est presque toujours la partie
     la plus instructive et celle qu'on n'écrit jamais spontanément.
10. Écrire la note : qu'est-ce que ça change à ta méthode pour le composant suivant.

> **Règle de non-collusion.** La documentation ne s'ouvre qu'**après** la production de ta
> version. Lire d'abord transforme le test en recopie, et le lab ne mesure plus rien. C'est la
> même exigence de page blanche que partout ailleurs dans ce curriculum.

Pourquoi cet oracle plutôt qu'une comparaison à une maquette quelconque : ces design systems
publient **la raison** de leurs choix. Tu obtiens donc la réponse à la troisième question de
l'inventaire (« pourquoi a-t-il été fait comme ça ») au lieu de devoir la deviner — et cette
raison écrite est exactement ce qui manque quand on arrive sur un produit dont les décisions
ne sont documentées nulle part.

## Livrable attendu

- L'inventaire des motifs de nahual.fr, avec emplacement, nom et raison pour chacun.
- Les trois incohérences qualifiées par les trois réponses possibles.
- La proposition minimale sur une page, réutilisant les motifs inventoriés.
- La liste écrite du non-touché, avec les raisons.
- La calibration : ta version conçue à l'aveugle, puis les trois écarts relevés face à la
  documentation publiée, puis la note de ce que ça change à ta méthode.

## Rubrique de vérification

**Rubrique objective :**
- L'inventaire couvre au minimum : échelle typographique, palette, rythme d'espacement,
  formes récurrentes, comportements de transition.
- Chaque motif porte une réponse à « pourquoi comme ça » — aucune case vide.
- Trois incohérences minimum, chacune qualifiée par l'une des trois réponses du §2.4.
- La proposition n'introduit **aucun** motif nouveau. Si elle en introduit un, elle doit
  justifier le coût du §2.3, par écrit.
- La liste du non-touché existe et contient au moins trois entrées avec leur raison.
- La calibration porte sur un composant de design system **public**, et ta version est datée
  avant la consultation de la documentation (l'ordre doit être vérifiable).
- Les trois écarts sont relevés, dont celui portant sur ce que le design system **refuse** de
  faire et la raison qu'il en donne.

**Revue qualitative :** le brief demandait d'intervenir, pas de refondre. La question est
donc : la proposition résout-elle le problème nommé avec le plus petit changement possible, et
un relecteur peut-il distinguer, dans ce livrable, une décision de non-intervention d'un oubli ?
Un lab qui conclut à une refonte de nahual a échoué au geste du module, même si la refonte
serait justifiée par ailleurs.

## Variante J+30 (fading)

Refaire la partie 3 sur un **deuxième composant**, pris dans un **autre** design system que le
premier, sans relire la note du premier. Comparer les deux écarts : s'ils portent sur les mêmes
points, la note n'a pas été intégrée — c'est une information sur ta façon d'apprendre, pas sur
ta capacité. Et comparer les deux design systems entre eux : là où ils divergent sur le même
composant, il y a presque toujours une contrainte de contexte explicitée d'un côté et pas de
l'autre.
