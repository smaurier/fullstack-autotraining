# Lab G02 — Carte de parcours complète de nuada-audit.com

> **Module associé :** [`modules/g02-carte-de-parcours.md`](../../modules/g02-carte-de-parcours.md)
> **Forme :** Zéro — le parcours hors site de nuada n'a jamais été cartographié.
> **Outil :** FigJam, un tableur, ou du papier photographié. Le format importe moins que les lignes.

## Échauffement (25 min, jetable)

> Cartographie le parcours d'un rendez-vous médical pris en ligne, en cinq phases, du moment
> où tu te sens mal jusqu'à la sortie du cabinet. Remplis **uniquement** deux lignes : le
> canal, et la friction. Contrainte : au moins deux phases doivent se passer hors de tout
> écran.

Le piège attendu : commencer la carte à l'ouverture du site de prise de rendez-vous. Le
parcours commence avant, et la friction la plus forte est presque toujours dans l'attente ou
dans la salle d'attente, pas dans le formulaire.

## Lire avant

Relire précisément :
- §2.1 — le tableau des différences de frontière avec le user flow de A04.
- §2.2 — les six lignes d'une carte, dont la ligne friction qui est la seule à produire du travail.
- §2.3 — ce qu'est un moment de vérité et pourquoi il y en a deux ou trois, pas six.
- §2.5 — le service blueprint, pour ne pas tenter de redessiner une friction organisationnelle.

Prérequis de contenu : les JTBD du lab G01 doivent être écrits. La carte se construit **pour
un JTBD donné**, pas pour un visiteur moyen qui n'existe pas.

## Brief

1. **Carte de parcours complète** du JTBD dominant de nuada (celui que tu as retenu en G01),
   du déclenchement jusqu'au résultat final (devis signé ou abandon). Minimum cinq phases.
2. Les six lignes du §2.2 remplies pour chaque phase, sans case vide : fait / voit / canal /
   pense / friction / opportunité. Une phase sans friction est possible, mais elle doit porter
   un tiret explicite, pas un blanc.
3. **Au moins deux canaux hors site** représentés (email, téléphone, document, courrier).
4. **Deux moments de vérité** désignés et justifiés en une phrase chacun.
5. **Trois frictions minimum**, dont **au moins une de service** (organisationnelle, non
   corrigible par une maquette), explicitement marquée comme telle.

## Livrable attendu

- La carte, lisible sans explication orale, avec ses phases en colonnes et ses six lignes.
- Deux moments de vérité marqués visuellement et justifiés.
- La liste des frictions, chacune étiquetée « écran » ou « service ».
- Pour chaque friction d'écran : l'opportunité correspondante. Pour chaque friction de
  service : ce qu'il faudrait changer dans ton organisation, pas dans le site.

## Rubrique de vérification

**Rubrique objective :**
- Cinq phases minimum, dont au moins une avant la première visite du site et au moins une
  après la dernière.
- Les six lignes présentes pour chaque phase, aucune case laissée blanche.
- Deux canaux hors site minimum effectivement représentés.
- Exactement deux ou trois moments de vérité (ni un, ni quatre et plus).
- Au moins une friction étiquetée « service », avec une correction qui n'est pas une maquette.
- Chaque ligne de la carte porte sa source : observé, vécu, ou hypothèse.

**Revue qualitative :** le brief demandait une carte qui dépasse la frontière du produit et
qui produise une priorisation. Les questions sont donc : est-ce qu'un tiers qui lit cette
carte saurait dire où travailler en premier et pourquoi, et est-ce que les moments de vérité
retenus sont bien ceux où la confiance se joue plutôt que ceux où le trafic est le plus
important ? Une carte dont les deux moments de vérité sont la page d'accueil et le formulaire
a probablement reproduit un user flow avec plus de colonnes.

## Variante J+30 (fading)

Construire la carte du **deuxième** JTBD de nuada (celui qui n'a aucune urgence), sans relire
la première carte. Comparer les deux : les phases communes, les moments de vérité différents.
Deux JTBD qui produisent la même carte signalent que l'un des deux n'était pas un vrai JTBD
distinct.
