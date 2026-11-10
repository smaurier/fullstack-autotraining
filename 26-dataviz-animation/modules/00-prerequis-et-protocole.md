# 00. Prérequis et protocole

> **Outcome :** à la fin, tu sais ce que ce cours suppose, pourquoi il vit en bibliothèque, et
> comment ses oracles jugent un graphique, ce qui n'est pas évident.

## 1. Ce que le cours suppose

| Acquis supposé | Où il se prend |
|---|---|
| L'arbre d'accessibilité, le nom accessible, les rôles | cours 25, module 01 |
| Le contraste, les trois seuils, le calcul du ratio | cours 25, module 10 |
| Le mouvement natif et `prefers-reduced-motion` | cours 25, module 12 |
| Le pipeline de rendu et les contextes | cours 25, module 04 |
| JavaScript au quotidien, et les bases de React pour les modules 04 et 10 | cours 05 |

**Ce cours commence là où le natif ne suffit plus.** Il ne réexplique ni le contraste ni la
préférence de mouvement : il les applique à des objets que le CSS seul ne sait pas faire, à
savoir un graphique et une chorégraphie.

## 2. Pourquoi ce cours est en bibliothèque

La BIBLIOTHÈQUE du parcours est définie comme « aucun ordre, tirée par un besoin daté ». Ce
cours y est, et c'est un choix, pas un rangement par défaut.

La raison tient au plafond d'apprentissage : rien de nouveau n'entre dans les arcs avant que
TypeScript, NestJS et PostgreSQL ne soient validés page blanche. Un cours en bibliothèque
n'entre pas dans cet ordre : il s'ouvre quand un projet le tire. Ici, le projet existe déjà,
c'est Nahual et la série de tableaux.

**Conséquence pratique :** tu peux prendre un module isolé sans suivre l'ordre, à deux
exceptions près. Le module 01 conditionne tout le reste de la partie graphique, et le module 08
conditionne la partie animation.

## 3. Le protocole, identique au cours 25

```
lire la section « Lire avant » du lab, une fois
        ↓
fermer le module
        ↓
page blanche → npm run lab:NN → RED
        ↓
le test qui échoue désigne la section à rouvrir, et elle seule
        ↓
GREEN → npm run solution:NN (comparer) → correcteur (GO / FIX / STOP)
```

Chaque lab porte sa **sonde de rougissement** : une modification d'une ligne qui doit faire
échouer l'oracle. Un test qui ne peut pas rougir ne prouve rien.

## 4. Comment on teste un graphique, et pourquoi ce n'est pas évident

C'est la difficulté propre à ce cours. Un graphique est un dessin : comment un oracle juge-t-il
un dessin ?

**La mauvaise réponse** est la comparaison d'images. Elle casse au moindre changement de police,
de version de navigateur ou d'anticrénelage, et elle ne dit jamais *pourquoi* c'est faux.

Les quatre bonnes réponses, et ce sont celles qu'utilisent les labs :

| Ce qu'on prouve | Comment |
|---|---|
| L'encodage est juste | la **géométrie** : une valeur deux fois plus grande donne une barre deux fois plus haute, mesurée en pixels |
| L'échelle ne ment pas | le **domaine** calculé et la position du zéro |
| Le graphique est accessible | l'**arbre d'accessibilité** : rôle, nom, et le tableau équivalent |
| L'animation respecte la préférence | l'**émulation** de `prefers-reduced-motion`, et un déplacement mesuré en pixels |

La règle qui en découle, et qui vaut pour ton code bien au-delà des labs : **un graphique se
teste sur ce qu'il encode, pas sur ce qu'il affiche.** Si ton test ne peut pas distinguer une
barre juste d'une barre jolie, il ne teste rien.

## 5. Les deux fils rouges

**Nahual** pour l'animation et les substrats : la série de tableaux, le mode récit, les scènes.

**Un jeu de données d'ateliers** pour la dataviz, repris de TribuZen : fréquentation par mois,
par atelier, par tranche d'âge. Il a l'avantage d'être petit, inégal, et de contenir une valeur
aberrante, ce qui est exactement ce qu'il faut pour éprouver une échelle.

## 6. Auto-test

1. Pourquoi la comparaison d'images est-elle un mauvais oracle pour un graphique ?
2. Cite les quatre choses qu'un oracle de ce cours mesure à la place.
3. Pourquoi ce cours est-il en bibliothèque et non dans un arc ?
4. Quels deux modules conditionnent le reste, et pour quelles parties ?
5. Où se prend le contraste, et pourquoi pas ici ?
