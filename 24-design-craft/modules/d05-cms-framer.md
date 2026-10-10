---
titre: CMS Framer — collections et contenu dynamique
cours: 24-design-craft
bloc: D — Framer (outil)
notions: [collection Framer, champ typé, template de détail unique, génération automatique liste+détail, risque de la page construite à la main]
outcomes: [structurer une Collection Framer avec des champs typés adaptés au contenu, construire un template de détail unique réutilisé par toutes les entrées, afficher une liste qui reflète automatiquement le contenu de la collection]
prerequis: [d04-composants-proprietes]
next: d06-code-overrides
tribuzen: collection CMS d'études de cas (lien avec le lab a12) affichée en liste + détail sur la landing page vitrine de TribuZen, sans ligne de code
last-reviewed: 2026-10
---

# CMS Framer — collections et contenu dynamique

> **Outcomes — tu sauras FAIRE :** structurer une Collection Framer avec des champs typés
> adaptés au contenu réel, construire un template de détail unique réutilisé automatiquement
> par toutes les entrées, et afficher une liste qui reflète ce contenu sans jamais construire
> une page à la main par entrée.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le lab a12 (Bloc A) a produit une étude de cas écrite complète. S'il y en a une aujourd'hui,
il y en aura trois dans six mois, puis sept. La question que ce module pose avant de
toucher Framer : si chaque étude de cas devient une page construite à la main (copier la
page précédente, changer le texte, ajuster la mise en page), combien de temps avant qu'une
septième étude de cas révèle une incohérence de mise en page avec la troisième, parce
qu'entre-temps le gabarit visuel a légèrement changé sans que les six premières soient
mises à jour ? Une **Collection** résout structurellement ce problème : un seul gabarit,
rempli par du contenu, jamais recopié.

## 2. Théorie complète, concise

### 2.1 Collection Framer — une petite base de données intégrée à l'éditeur

Une **Collection** est un ensemble d'entrées structurées par des **champs typés** (texte
court, texte long/riche, image, nombre, date, référence vers une autre entrée, booléen).
Techniquement, c'est une petite base de données intégrée directement à l'éditeur visuel —
sans backend séparé à héberger, sans base de données externe à administrer. Chaque entrée
de la Collection est un enregistrement qui remplit les mêmes champs.

Pour une collection d'études de cas, des champs typiques : `Titre` (texte court), `Résumé`
(texte court), `Récit complet` (texte riche), `Image de couverture` (image), `Date` (date),
`Tags` (texte court ou référence multiple si le projet grandit).

### 2.2 Template de détail — UN gabarit, N entrées

Un **template de détail** est une page unique connectée à la Collection : ses éléments
(titre, image, texte) sont liés aux champs de la Collection plutôt qu'écrits en dur. Framer
génère automatiquement une page réelle par entrée à partir de ce même template — modifier
le template modifie instantanément l'apparence de TOUTES les entrées existantes et futures.

C'est la différence structurante avec une page construite à la main : dans une page à la
main, chaque étude de cas est un fichier indépendant qui doit être retouché individuellement
si le gabarit évolue ; dans un template de Collection, il n'existe qu'UNE source de mise en
page, peu importe le nombre d'entrées.

### 2.3 Liste automatique — la vue qui reflète la Collection sans intervention

Une page liste utilise un composant de type "Collection List" (ou équivalent) qui itère
automatiquement sur toutes les entrées de la Collection et affiche, pour chacune, un aperçu
(image + titre + résumé, par exemple) qui pointe vers sa page détail générée par le
template. Ajouter une quatrième entrée dans la Collection la fait apparaître automatiquement
dans cette liste — aucune intervention manuelle sur la page liste elle-même.

### 2.4 Pourquoi ce n'est pas juste "plus pratique" mais une discipline de gouvernance

Le vrai bénéfice n'est pas le gain de temps à la création (construire une page à la main
pour UNE étude de cas prendrait un temps comparable) — c'est la garantie de cohérence sur
la DURÉE. Avec une Collection, il est structurellement impossible que la troisième étude de
cas ait un style différent des six premières, parce qu'elles partagent toutes le même
template. Avec des pages à la main, cette garantie dépend de la discipline humaine à
reproduire fidèlement un style déjà utilisé — une discipline qui se dégrade naturellement
avec le temps et le nombre d'entrées.

## 3. Worked examples

### Exemple A — structurer la Collection "Études de cas" pour la landing page TribuZen

1. Créer la Collection avec les champs : `Titre`, `Résumé` (1-2 phrases, affiché en liste),
   `Image de couverture`, `Récit complet` (texte riche, affiché en détail seulement), `Date`.
2. Construire le template de détail : lier chaque élément visuel (titre affiché en grand,
   image en hero, récit complet en corps de texte) au champ correspondant de la Collection,
   jamais écrire un texte en dur sur cette page.
3. Construire la page liste avec un composant Collection List : afficher `Image de
   couverture` + `Titre` + `Résumé` pour chaque entrée, chaque carte pointant vers sa page
   détail générée automatiquement.
4. Remplir 3 entrées réelles (ex. les études de cas produites en a12) et vérifier que les 3
   pages détail et les 3 cartes de la liste apparaissent sans avoir touché à une seule page
   individuellement après la création du template.

### Exemple B — ajouter une 4e entrée sans toucher au template

1. Ajouter une nouvelle entrée dans la Collection avec les mêmes champs remplis.
2. Vérifier que la page liste affiche désormais 4 cartes sans modification de la page liste
   elle-même.
3. Vérifier que la page détail de la 4e entrée a exactement la même mise en page que les 3
   précédentes, sans avoir dupliqué ni retouché le template.
4. Conclusion observable : si cette étape nécessite de toucher au template ou à la page
   liste, la Collection n'est pas correctement structurée — c'est le signal d'alerte du
   piège ci-dessous.

## 4. Pièges & misconceptions

- **Construire une page par article à la main plutôt qu'une Collection avec un template.**
  Perd tout l'intérêt du CMS : toute évolution future du gabarit (nouvelle mise en page,
  nouvel élément visuel) doit alors être répétée manuellement sur chaque page existante,
  avec un risque réel d'incohérence qui grandit avec le nombre d'entrées (voir 2.4).

- **Écrire du texte en dur sur le template "pour aller plus vite au début".** Casse
  immédiatement le principe : le template doit être 100% piloté par les champs de la
  Collection, sinon chaque entrée affichera le même texte en dur au lieu du sien.

- **Confondre champ "texte riche" et champ "texte court".** Un résumé affiché en liste doit
  rester court et sans mise en forme lourde (texte court) ; le récit complet affiché
  seulement en détail peut porter du texte riche (titres, listes). Utiliser le mauvais type
  de champ casse soit l'affichage en liste (texte trop long), soit la mise en forme en
  détail (texte riche tronqué en texte brut).

## 5. Ancrage TribuZen

- La Collection "Études de cas" de la landing page vitrine de TribuZen devient le réceptacle
  naturel du lab a12 (étude de cas écrite) : chaque étude de cas produite dans le Bloc A
  rejoint cette Collection plutôt que d'exister comme un document isolé.
- Toute évolution future du gabarit visuel de présentation d'une étude de cas (nouvelle
  mise en page, ajout d'un champ "résultat chiffré") se fait une seule fois sur le template,
  jamais entrée par entrée.
- Cette Collection est un candidat direct pour la publication soignée du module D07 : un
  contenu qui grandit dans le temps sans retouche manuelle est exactement ce qu'un
  portfolio vivant doit pouvoir faire.

## 6. Points clés

1. Une Collection Framer est une petite base de données intégrée, structurée par des champs
   typés — pas un ensemble de pages indépendantes.
2. Un template de détail unique, piloté par les champs de la Collection, génère
   automatiquement une page par entrée — modifier le template modifie toutes les entrées.
3. Une liste automatique (Collection List) reflète le contenu de la Collection sans
   intervention manuelle à chaque ajout d'entrée.
4. Le bénéfice réel n'est pas la vitesse de création d'une seule entrée mais la garantie de
   cohérence visuelle sur la durée, impossible à obtenir de façon fiable avec des pages
   construites à la main.
5. Écrire du texte en dur sur un template casse le principe même de la Collection — chaque
   élément visuel du template doit être lié à un champ.

## 7. Seeds Anki

```
Qu'est-ce qu'une Collection Framer ?|Un ensemble d'entrées structurées par des champs typés (texte, image, date...), géré comme une petite base de données intégrée à l'éditeur, sans backend séparé
Pourquoi un template de détail unique vaut-il mieux qu'une page par article construite à la main ?|Modifier le template modifie instantanément toutes les entrées existantes et futures — une page à la main oblige à retoucher chaque entrée individuellement pour garder la cohérence
Que fait un composant Collection List ?|Il affiche automatiquement un aperçu pour chaque entrée de la Collection et pointe vers sa page détail générée par le template — sans intervention manuelle à chaque ajout
Quel est le signal d'alerte qu'une Collection est mal structurée ?|Ajouter une nouvelle entrée nécessite de toucher au template ou à la page liste — dans une Collection bien structurée, aucune des deux ne doit être modifiée
Pourquoi écrire du texte en dur sur un template de Collection est une erreur ?|Ça casse le principe même du CMS : toutes les entrées afficheraient ce même texte fixe au lieu de leur propre contenu
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/d05-cms-framer/`. Tu y construis la Collection
> "Études de cas" de la landing page TribuZen avec son template de détail et sa liste
> automatique — brief complet et rubrique de vérification dans le README du lab.
