---
titre: Patterns de navigation et repérabilité
cours: 24-design-craft
bloc: G — Parcours & conversion
notions: [quatre couches de navigation, étiquetage prédictif, fil d'Ariane et ses trois types, recherche vs exploration, filtres à facettes, tree testing, test du premier clic]
outcomes: [répartir une navigation sur ses quatre couches au lieu de tout empiler dans la globale, écrire un libellé prédictif plutôt que créatif, tester une arborescence par tree testing sans aucune maquette]
prerequis: [g02-carte-de-parcours]
next: g04-flows-multi-etapes
tribuzen: tree testing du sitemap TribuZen produit en A03, avec taux de réussite calculé et une correction d'étiquetage justifiée
last-reviewed: 2026-10
---

# Patterns de navigation et repérabilité

> **Outcomes — tu sauras FAIRE :** répartir une navigation sur ses quatre couches au lieu de
> tout empiler dans la barre globale, écrire un libellé prédictif plutôt que créatif, et
> tester une arborescence par tree testing avant d'avoir dessiné le moindre écran.
> **Difficulté :** ⭐⭐

## 1. Cas concret d'abord

Le module A03 t'a appris à construire un sitemap et à choisir une famille de structure
(hiérarchique, à facettes, séquentielle). Il s'arrête juste avant la question suivante :
une fois l'arborescence posée, **par quels éléments d'interface** l'utilisateur la parcourt,
et **comment on vérifie** qu'il la parcourt réellement.

Le défaut le plus répandu, et celui qu'on produit spontanément quand on code son propre
site : tout mettre dans la barre de navigation globale. Six entrées au départ, neuf six mois
plus tard, et la barre devient une liste de tout ce que le site contient — c'est-à-dire un
sommaire, pas une navigation. La loi de Hick (A05) dit déjà pourquoi ça coûte : chaque
entrée supplémentaire allonge le temps de décision de toutes les autres.

## 2. Théorie complète, concise

### 2.1 Quatre couches de navigation, pas une

Une navigation complète se répartit sur quatre couches, chacune avec un rôle distinct :

1. **Globale** — persistante sur tout le produit, elle porte les grandes sections. Elle doit
   rester courte et stable : c'est le repère, pas le sommaire.
2. **Locale** — propre à une section, elle porte les pages de cette section. C'est elle qui
   absorbe la croissance du contenu, ce qui permet à la globale de ne pas grossir.
3. **Contextuelle** — dans le contenu lui-même : un lien vers la page liée, une action
   suivante, un renvoi. C'est la couche la plus efficace et la plus négligée, parce qu'elle
   se conçoit page par page et non une fois pour toutes.
4. **Utilitaire** — compte, langue, aide, recherche. Séparée visuellement des trois autres
   parce qu'elle ne parle pas du contenu mais de l'outil.

La règle d'arbitrage : une entrée candidate à la globale doit répondre oui à « est-ce
qu'un visiteur sur n'importe quelle page peut avoir besoin d'aller là ? ». Sinon elle
appartient à la locale ou à la contextuelle.

### 2.2 L'étiquetage : le mot est l'interface

Un libellé de navigation a une seule fonction : permettre de **prédire** ce qu'il y a
derrière. Le test est direct : montre le libellé seul, demande ce que la personne attend
derrière, compare à la réalité.

Trois familles de mauvais libellés :

- **Le libellé interne** : le mot de ton organisation, pas celui de l'utilisateur. Il
  fonctionne pour l'équipe et pour personne d'autre.
- **Le libellé créatif** : « Notre univers », « L'expérience », « Nos solutions ». Il ne
  prédit rien. Le plaisir d'écriture s'y paie en clics perdus.
- **Le libellé générique** : « Services », « Produits », « Ressources ». Il est juste mais
  non discriminant quand plusieurs entrées se ressemblent.

Un cas particulier important pour un produit métier : si le mot du domaine est laid mais
c'est **le mot que les utilisateurs emploient entre eux**, il gagne contre le synonyme plus
élégant. Ce point est développé en H04 : renommer le vocabulaire métier désynchronise
l'équipe et ses utilisateurs.

### 2.3 Le fil d'Ariane : trois types qu'on confond

- **De localisation** : où je suis dans la hiérarchie. C'est le seul qui soit stable et donc
  le seul vraiment utile dans la plupart des cas.
- **De chemin parcouru** : par où je suis passé. Instable, redondant avec le bouton retour,
  et trompeur si l'utilisateur a rebroussé chemin.
- **D'attribut** : les filtres actifs qui ont mené à cette liste. Utile sur une structure à
  facettes, mais c'est alors un affichage de filtres, pas une hiérarchie.

Le fil d'Ariane n'est pas du décor : c'est l'élément qui répond à la question « où suis-je »
du module G01 pour toute personne entrée par une page profonde. Il devient d'autant plus
important que l'arborescence est profonde et que les entrées directes sont nombreuses.

### 2.4 Recherche et exploration ne servent pas les mêmes personnes

- **L'exploration** sert celui qui ne sait pas nommer ce qu'il cherche. Il reconnaît une
  catégorie, il ne sait pas écrire le mot exact.
- **La recherche** sert celui qui sait exactement ce qu'il veut et veut y aller directement.

Deux conséquences souvent manquées. D'abord, une recherche ne compense jamais une mauvaise
architecture : si les libellés ne prédisent rien, le visiteur ne sait pas non plus quoi
taper. Ensuite, sur une structure à facettes, l'outil juste est souvent la **recherche à
facettes** (un champ libre plus des filtres combinables) et pas l'un ou l'autre.

Point non négociable sur les filtres, repris en H02 : **les filtres actifs doivent rester
visibles**. Un utilisateur qui lit une liste filtrée en croyant lire la liste complète prend
une décision sur une donnée fausse.

### 2.5 Deux tests qui ne demandent aucune maquette

C'est le cœur méthodologique du module, et la partie qui distingue une navigation justifiée
d'une navigation devinée.

**Le tree testing.** On donne l'arborescence seule, en texte, sans aucune interface, et on
demande : « où cliquerais-tu pour trouver X ? ». La personne descend dans l'arbre, et on
mesure :

- le **taux de réussite** (a-t-elle fini au bon endroit) ;
- la **directivité** (y est-elle allée directement ou après avoir changé de branche) ;
- la **branche d'erreur** (où elle est partie à tort, ce qui désigne le libellé coupable).

Son intérêt est décisif : il teste la structure **avant** qu'un pixel existe, donc avant
que le coût de correction ne devienne celui d'une refonte de maquettes (règle « IA avant
mise en page » du module A03).

**Le test du premier clic.** Sur une maquette, on donne une tâche et on n'observe que le
**premier** clic. La littérature du métier est constante sur ce point : quand le premier
clic est juste, la tâche réussit dans une très large majorité des cas ; quand il est faux,
elle échoue le plus souvent. Un test extrêmement bon marché, donc, qui prédit beaucoup.

## 3. Worked examples

### Exemple A — répartir une navigation qui déborde

Barre globale d'un site de services, avant :

```
Accueil · Qui sommes-nous · Nos solutions · Méthode · Références · Tarifs · Blog · Contact
```

Huit entrées, dont trois non prédictives (« Nos solutions », « Méthode », indiscernables) et
deux qui ne concernent qu'une partie des visiteurs. Après répartition sur les quatre
couches :

```
Globale (4)      : Prestations · Références · Tarifs · Contact
Locale            : sous "Prestations" → Audit · Accompagnement · Formation
                    sous "Références" → Études de cas · Attestations
Contextuelle      : depuis une étude de cas → "Demander le même audit"
                    depuis Tarifs → "Voir la méthode qui justifie ce prix"
Utilitaire        : Recherche · Mentions légales (pied de page)
```

« Qui sommes-nous » et « Blog » n'ont pas disparu : ils sont descendus en locale et en pied
de page. La globale est passée de huit à quatre entrées prédictives, ce qui réduit le coût de
décision sur chaque page du site.

### Exemple B — protocole de tree testing sur le sitemap TribuZen

L'arborescence testée est celle produite en A03, donnée en texte brut. Huit tâches, chacune
formulée comme un besoin et **jamais** avec le mot du libellé (sinon on teste la lecture,
pas la structure) :

```
1. Tu veux changer l'heure du coucher d'un de tes enfants.
2. Tu veux voir si la semaine dernière s'est bien passée.
3. Tu veux ajouter le deuxième parent au foyer.
4. Tu veux savoir ce que l'enfant a réussi le plus souvent ce mois-ci.
5. Tu veux arrêter de recevoir les notifications du soir.
6. Tu veux relire le résumé envoyé la semaine dernière.
7. Tu veux corriger le prénom d'un enfant.
8. Tu veux supprimer définitivement le compte du foyer.
```

Relevé attendu, à deux personnes minimum :

```
Tâche | Réussite | Direct | Branche d'erreur
  1   |   oui    |  oui   | —
  2   |   oui    |  non   | passée par "Famille" avant "Vue d'ensemble"
  5   |   non    |  non   | cherchée dans "Routines", absente de "Paramètres"
...
Taux de réussite : 6/8 = 75 %
```

La tâche 5 produit le résultat le plus actionnable : deux personnes ont cherché les
notifications dans « Routines » parce que c'est là que vit le soir. Correction candidate :
soit déplacer le réglage, soit le dupliquer en navigation contextuelle depuis la routine du
soir. Décision justifiée par une donnée, pas par un avis.

## 4. Pièges & misconceptions

- **Tout empiler dans la navigation globale.** Elle devient un sommaire, et la loi de Hick
  fait payer chaque ajout sur toutes les pages du produit.

- **Le libellé créatif.** « Notre univers » ne prédit rien. Le test du §2.2 (prédire le
  contenu depuis le libellé seul) est non négociable sur une entrée de navigation.

- **Renommer le vocabulaire métier pour faire plus clair.** Tu perds l'alignement avec les
  mots que les utilisateurs emploient réellement entre eux (voir H04).

- **Un fil d'Ariane qui recopie le chemin parcouru.** Instable, redondant avec le bouton
  retour. Le type utile est celui de localisation.

- **Croire que la recherche compense l'architecture.** Si les libellés ne prédisent rien,
  l'utilisateur ne sait pas quoi taper non plus.

- **Des filtres actifs invisibles.** L'utilisateur lit une liste partielle en croyant lire
  la liste complète.

- **Ne tester la navigation qu'une fois les maquettes finies.** Le tree testing existe
  précisément pour tester avant, quand corriger coûte une ligne de texte et pas une refonte.

## 5. Ancrage nuada / nahual / TribuZen

- Le tree testing du sitemap TribuZen (Exemple B) est le livrable du lab, et son résultat
  doit modifier le sitemap de A03 ou être explicitement déclaré « testé, inchangé ».
- Sur nuada, la globale doit tenir en quatre entrées prédictives maximum : le site sert trois
  jobs distincts (G01) et chacun doit trouver sa porte sans lire tout le menu.
- Sur nahual, la navigation contextuelle est le vrai sujet : l'inventaire des portes (G01,
  Exemple B) a montré qu'une page de projet ne mène nulle part sans remonter à la globale.

## 6. Points clés

1. Une navigation se répartit sur quatre couches (globale, locale, contextuelle,
   utilitaire) ; tout mettre dans la globale la transforme en sommaire.
2. Un libellé n'a qu'une fonction : permettre de prédire ce qu'il y a derrière — ni créatif,
   ni interne, ni trop générique.
3. Le fil d'Ariane utile est celui de localisation, et il est indispensable dès que les
   entrées directes sur pages profondes sont nombreuses.
4. La recherche ne compense jamais une architecture illisible, parce qu'elle suppose de
   savoir quoi taper.
5. Le tree testing teste l'arborescence sans aucune maquette ; le test du premier clic
   prédit fortement la réussite d'une tâche pour un coût dérisoire.

## 7. Seeds Anki

```
Quelles sont les quatre couches de navigation ?|Globale (sections, persistante et courte), locale (dans une section), contextuelle (dans le contenu), utilitaire (compte, langue, aide, recherche)
Quelle est la seule fonction d'un libellé de navigation ?|Permettre de prédire ce qu'il y a derrière — test : montrer le libellé seul et comparer l'attente à la réalité
Quel type de fil d'Ariane est utile et pourquoi ?|Celui de localisation (où je suis dans la hiérarchie) : stable, et il répond au "où suis-je" de toute entrée par une page profonde
Qu'est-ce que le tree testing et quel est son intérêt décisif ?|Tester l'arborescence seule en texte ("où cliquerais-tu pour trouver X ?") : il valide la structure avant qu'aucune maquette existe, donc avant que corriger coûte cher
Que mesure-t-on dans un tree testing ?|Le taux de réussite, la directivité (y est-elle allée directement), et la branche d'erreur qui désigne le libellé coupable
```

## Pont vers le lab

> Lab associé : `24-design-craft/labs/g03-patterns-navigation/`. Tu y fais passer un tree
> testing de 8 tâches sur le sitemap TribuZen à deux personnes, tu calcules le taux de
> réussite, et tu produis une correction d'étiquetage ou de structure justifiée par la
> branche d'erreur observée — brief complet et rubrique dans le README du lab.
