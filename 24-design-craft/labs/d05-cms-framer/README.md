# Lab D05 — Collection "Études de cas" en CMS Framer

> **Module associé :** [`modules/d05-cms-framer.md`](../../modules/d05-cms-framer.md)
> **Forme :** Zéro — construire la Collection, son template et sa liste de zéro.
> **Outil :** Framer.

## Lire avant

Relire précisément, pas tout le module :
- §2.1-2.3 (Collection, template de détail, liste automatique) — les trois pièces du
  mécanisme, dans cet ordre.
- §2.4 — pourquoi la discipline de gouvernance compte plus que le gain de temps immédiat.
- §4 "Pièges & misconceptions" — en particulier le piège du texte en dur sur le template.

## Brief

Sur le projet Framer de la landing page vitrine de TribuZen (lab d01-d04), créer une
Collection "Études de cas" avec au minimum les champs : `Titre`, `Résumé`, `Image de
couverture`, `Récit complet`, `Date`.

Construire :
1. Un **template de détail** unique, entièrement piloté par les champs de la Collection
   (aucun texte en dur).
2. Une **page liste** utilisant un composant Collection List qui affiche automatiquement
   chaque entrée (image + titre + résumé) avec un lien vers sa page détail.
3. **Au moins 3 entrées réelles** remplies (réutiliser les études de cas du lab a12 si elles
   existent, sinon des entrées plausibles).

## Livrable attendu

- Le projet Framer avec la Collection, son template de détail et sa page liste.
- Une note qui documente les champs choisis et pourquoi chacun est typé ainsi (texte court
  vs texte riche, en particulier).

## Rubrique de vérification

**Rubrique objective :**
- La Collection existe avec au moins les 5 champs demandés, correctement typés.
- Un seul template de détail existe et s'applique aux 3 entrées sans duplication de page.
- La page liste reflète automatiquement les 3 entrées sans élément construit à la main.
- Ajouter une 4e entrée (test à faire explicitement, voir Exemple B du module) ne nécessite
  de toucher ni au template ni à la page liste.

**Revue qualitative :** le brief demandait un système qui tient sur la durée, pas 3 pages
jolies — la question n'est jamais "est-ce que ça a l'air bien" mais "est-ce qu'ajouter une
10e étude de cas dans un an demanderait de retoucher autre chose que remplir les champs de
la Collection".

## Variante J+30 (fading)

Ajouter un champ `Tags` (référence multiple ou texte court) et faire en sorte que la page
liste puisse être filtrée par tag sans toucher au template de détail — preuve que le champ
de filtrage et le gabarit d'affichage sont deux décisions indépendantes l'une de l'autre.
