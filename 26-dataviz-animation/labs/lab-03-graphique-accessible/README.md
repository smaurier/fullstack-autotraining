# Lab 03. Rendre un graphique réellement accessible

> **Outcome :** à la fin, tu sais rendre accessible un graphique qui ne l'est pas, et tu sais
> pourquoi les quatre niveaux du module 06 ne sont pas interchangeables. Tu sais écrire une
> alternative qui donne les repères au lieu de décrire la forme, et tu sais rendre deux séries
> distinguables sans la couleur.
>
> **Vrai outil :** un navigateur réel, l'arbre d'accessibilité calculé, le calcul de contraste
> de la formule WCAG, et `axe-core`. Deux assertions de cet oracle ne sont faisables par aucun
> outil automatique du marché : celle qui vérifie que l'alternative **dit quelque chose**, et
> celle qui vérifie que les séries restent distinguables sans la couleur.
>
> **Feedback :** `npm run lab:03` depuis `labs/`. RED tant que `src/` ne satisfait pas l'oracle.
> `npm run solution:03` prouve que l'oracle est juste, et tu ne l'ouvres pas avant ton GREEN.

## Lire avant (une lecture bornée, pas le module entier)

Module [`06-graphiques-accessibles`](../../modules/06-graphiques-accessibles), **une fois** :

- § 2 les quatre niveaux, et lequel est la cible par défaut
- § 3 en entier, l'alternative
- § 4.1 et § 4.2 le tableau équivalent
- § 5.1 le test du niveau de gris
- § 8 les pièges

⛔ **Ne lis pas § 6 avant ton GREEN** : il contient la décision sur la légende, qui est une
partie de ce lab.

Ensuite : page blanche.

## Énoncé

`src/index.html` affiche deux séries de fréquentation, cuisine et couture, en SVG. À l'écran,
c'est propre et lisible. Au casque, il n'y a rien du tout, et pour une personne daltonienne les
deux séries sont la même courbe.

Tu réécris `src/index.html` et, si besoin, `src/rendu.js`. Les **données ne changent pas** : les
douze valeurs présentes sont les bonnes, et l'oracle vérifie qu'elles se retrouvent toutes dans
le tableau équivalent.

Six manques, qui se traitent dans cet ordre :

1. le graphique n'est pas une image nommée dans l'arbre ;
2. il n'a aucune alternative, donc aucune information pour qui ne le voit pas ;
3. les marques encombrent l'arbre ;
4. les deux séries ne sont distinguées que par la couleur ;
5. la légende ne distingue rien d'autre que la couleur non plus ;
6. il n'y a pas de tableau équivalent, ni de chemin visible vers les données.

```bash
npm run lab:03
```

## Vérifier

Le contrat exact attendu par l'oracle :

| Ce qui est vérifié | Critère |
|---|---|
| le graphique porte `role="img"` et apparaît comme **une** image nommée | `1.1 (A)` |
| l'alternative existe, dépasse 40 caractères, et contient **au moins deux repères chiffrés** | `1.3 (A)` |
| elle ne décrit **pas** le contenant ni la forme (« graphique en », « courbe montante ») | `1.3 (A)` |
| les marques sortent de l'arbre | module 06 § 3.1 |
| les deux séries ont des **motifs de trait différents** | `3.1 (A)` |
| la légende distingue les séries par le texte ou par le motif de sa puce | `3.1 (A)` |
| chaque série atteint `3:1` contre son fond | `3.3 (AA)` |
| un tableau équivalent porte les **douze** valeurs | `1.3 (A)` |
| le tableau a un `caption` et des en-têtes avec `scope` | `5.4 (A)`, `5.6 (A)`, `5.7 (A)` |
| un lien visible mène aux données, et sa cible existe | module 06 § 4.2 |
| `axe` ne trouve aucune violation | nécessaire, pas suffisant |

L'assertion sur les repères chiffrés mérite une seconde de réflexion : elle refuse
« graphique en courbes montrant l'évolution de la fréquentation », qui est une description du
contenant, et accepte « la cuisine passe de 120 à 180 inscriptions, la couture de 60 à 240 ».
La première n'est vérifiable par personne, la seconde est l'information.

## Sonde de rougissement

Un oracle qui ne peut pas rougir ne prouve rien. Une fois au GREEN, aligne les deux motifs de
trait dans `src/index.html` :

```diff
- .serie-couture { stroke: #8a4b00; stroke-dasharray: 7 4; }
+ .serie-couture { stroke: #8a4b00; }
```

Puis relance :

```bash
npm run lab:03
```

**Attendu :** le test `3.1 (A)` échoue, et son message te donne les deux motifs trouvés, qui
sont devenus identiques. Si l'oracle reste vert, il est cassé et ce lab ne compte pas :
signale-le.

Remarque au passage que `axe` reste vert, lui. C'est tout l'objet du module 06 § 1 : un
graphique peut passer tous les outils automatiques et rester inutilisable.

## Ce que ce lab ne demande pas

Il ne demande pas le niveau 4 du § 2, celui du graphique navigable au clavier point par point.
C'est un travail de composant, pas de page, et le niveau 3 est la cible par défaut. Il ne
demande pas non plus de changer les couleurs pour des raisons esthétiques : seul le seuil de
`3.3 (AA)` compte.
