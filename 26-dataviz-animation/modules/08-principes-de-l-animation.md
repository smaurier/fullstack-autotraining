# 08. Les principes de l'animation

> **Outcome :** à la fin, tu sais lire une courbe d'accélération et dire ce qu'elle raconte, tu
> sais choisir une durée au lieu de la deviner, et tu sais distinguer une animation qui informe
> d'une animation qui décore, ce qui est la seule distinction qui compte.

## 1. Le mécanisme : une animation est une phrase

Une animation dit quelque chose. Trois choses, précisément, et si elle n'en dit aucune, elle est
du bruit.

| Ce qu'une animation peut dire | Exemple |
|---|---|
| **l'origine** : d'où vient cet élément, où est-il parti | un panneau qui glisse depuis le bord qu'on a touché |
| **la relation** : ces deux choses sont la même | une vignette qui grandit pour devenir la page |
| **l'état** : quelque chose se passe, ou a changé | un indicateur de chargement, une valeur qui compte |

**Le test, et il tranche :** si tu retires l'animation et que l'utilisateur ne perd aucune
information, elle était décorative. Ce n'est pas disqualifiant, mais c'est alors la première à
couper sous `prefers-reduced-motion`, module 12.

## 2. Le temps

### 2.1 Les durées, et pourquoi elles ne se devinent pas

Les ordres de grandeur sur lesquels l'industrie s'est stabilisée :

| Durée | Pour quoi |
|---|---|
| **100 ms** | un retour immédiat : survol, enfoncement, bascule |
| **200 à 300 ms** | la plupart des transitions d'interface : apparition, dépliement |
| **300 à 500 ms** | un changement de grande surface : une page, une modale |
| **au-delà de 500 ms** | se remarque, et agace si c'est sur un chemin fréquent |

Deux règles qui expliquent ces chiffres.

**La distance et la surface commandent la durée.** Un petit élément qui bouge de dix pixels en
300 ms paraît lent ; une pleine page en 150 ms paraît brutale. La vitesse perçue dépend du rapport
entre la distance parcourue et le temps.

**Un chemin fréquent doit être plus rapide qu'un chemin rare.** Une animation vue cent fois par
jour doit être au plancher. Une transition vue une fois par session peut se permettre d'être
soignée.

### 2.2 Asymétrie entrée et sortie

L'entrée est **plus lente** que la sortie, en général. À l'entrée, l'utilisateur découvre et
l'animation lui montre d'où ça vient. À la sortie, il a déjà décidé : le faire attendre est une
friction.

```css
.panneau {
  transition: translate 120ms ease-in;      /* sortie : rapide */
}
.panneau[data-ouvert] {
  transition: translate 240ms ease-out;     /* entrée : plus posée */
}
```

## 3. L'accélération, et ce qu'elle raconte

C'est la partie que l'on saute, et c'est celle qui fait la différence entre une interface qui
paraît chère et une interface qui paraît bricolée.

| Courbe | Ce qu'elle raconte | Pour |
|---|---|---|
| `linear` | mécanique, sans inertie | une barre de progression, une rotation continue |
| `ease-out` | arrive vite, se pose doucement | **l'entrée** : le défaut à préférer |
| `ease-in` | démarre doucement, part vite | la **sortie** |
| `ease-in-out` | départ et arrivée doux | un déplacement d'un point à un autre, visible |
| ressort | dépasse puis revient | une action directe, un bouton, un interrupteur |

**La règle qui couvre quatre-vingt-dix pour cent des cas :** `ease-out` à l'entrée, `ease-in` à
la sortie. Et jamais `linear` sur un déplacement, parce que rien dans le monde physique ne
démarre et s'arrête à vitesse constante : c'est précisément ce qui fait qu'une animation linéaire
paraît fausse.

```css
/* Au-dela des mots-cles : une courbe nommee, reutilisable */
:root {
  --sortir: cubic-bezier(0.4, 0, 1, 1);
  --entrer: cubic-bezier(0, 0, 0.2, 1);
  --les-deux: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 3.1 Les propriétés discrètes, et le ressort

Un ressort ne s'exprime pas en durée mais en **physique** : raideur, amortissement, masse. Il
n'a pas de durée fixe, il s'arrête quand il est au repos. C'est le sujet du module 10, et c'est
ce qui le rend adapté aux interactions directes : la réponse suit le geste.

## 4. Les principes classiques, et les quatre qui servent au web

Les douze principes de l'animation traditionnelle ont été écrits pour le dessin animé. Quatre se
transposent, les autres non.

**L'anticipation** : un léger mouvement inverse avant le mouvement principal. Au web, à dose
homéopathique : un bouton qui s'enfonce de deux pixels avant de rebondir.

**Le ralenti d'entrée et de sortie** : c'est l'accélération du § 3. Le plus important des quatre.

**La mise en scène** : diriger l'attention. Si tout bouge, rien n'est remarqué. Une animation à
la fois, ou une cascade qui dirige le regard.

**Le suivi et le chevauchement** : les éléments liés ne bougent pas tous exactement ensemble. Un
décalage de trente à cinquante millisecondes entre les éléments d'une liste donne de la vie.

```css
li { animation: apparaitre 200ms both; }
li { animation-delay: calc(sibling-index() * 40ms); }  /* cours 25, module 03 */
```

Et le piège de ce dernier : **une cascade sur une longue liste devient une attente**. Vingt
éléments à quarante millisecondes font huit cents millisecondes avant que le dernier apparaisse.
Borner le décalage, ou ne l'appliquer qu'aux premiers éléments visibles.

## 5. Ce que l'animation ne doit jamais faire

Quatre interdits, et les trois premiers sont des critères.

1. **Masquer un chargement en le rendant plus long.** Une animation d'entrée de 500 ms sur une
   liste déjà chargée ajoute 500 ms d'attente réelle.
2. **Détourner le défilement.** Casse la vitesse attendue, les technologies d'assistance, et la
   navigation clavier. Cours 25 module 13 § 5.
3. **Bouger sans possibilité d'arrêt.** Critère `13.8 (A)` : tout contenu en mouvement de plus de
   cinq secondes doit avoir un moyen de l'arrêter.
4. **Clignoter plus de trois fois par seconde.** Critère `13.7 (A)`, et c'est un risque de crise
   d'épilepsie, pas une question de confort.

## 6. L'accessibilité dans ce module

Le module 12 traite le contrat en détail. Deux points relèvent de la conception, donc d'ici.

**Une animation qui informe doit avoir un équivalent non animé.** Si le mouvement porte
l'information, par exemple « votre message est parti » montré par un envol, alors sous
`prefers-reduced-motion` cette information doit être dite autrement, par du texte ou un
changement d'état. Sinon elle disparaît pour une partie des utilisateurs.

C'est le même raisonnement que `3.1 (A)` sur la couleur, appliqué au mouvement : **ne jamais
faire porter une information par le seul mouvement.**

**Le choix des durées est une question d'accessibilité.** Pour des troubles de l'attention ou
cognitifs, une interface qui bouge constamment est épuisante. La mise en scène du § 4, « une
animation à la fois », n'est pas qu'une règle de goût.

## 7. Ce que l'enquête interroge, et où c'est traité

Aucun item n'est rattaché à ce module. Comme pour le module 01 côté dataviz, ce qui structure
n'est pas ce qu'on interroge : les enquêtes demandent quelle librairie d'animation tu utilises,
jamais si tes animations disent quelque chose.

Et c'est le même constat pratique : GSAP ou Motion exécuteront parfaitement une animation
linéaire de 900 millisecondes qui n'informe de rien.

## 8. Les pièges

1. **Deviner les durées.** Les ordres de grandeur du § 2.1 sont des points de départ.
2. **Utiliser `linear` sur un déplacement.** Rien ne démarre et ne s'arrête à vitesse constante.
3. **Même durée à l'entrée et à la sortie.** La sortie doit être plus rapide.
4. **Tout faire bouger en même temps.** Si tout bouge, rien n'est remarqué.
5. **Une cascade sur une longue liste.** Le dernier élément arrive trop tard.
6. **Ajouter une attente réelle** au nom d'une animation d'entrée.
7. **Faire porter une information par le seul mouvement.** Elle disparaît sous préférence
   réduite.
8. **Animer longtemps sur un chemin fréquent.** Vu cent fois par jour, ça devient une taxe.

## 9. Auto-test

1. Quelles trois choses une animation peut-elle dire, et quel test révèle qu'elle est
   décorative ?
2. Quels deux facteurs commandent la durée ?
3. Pourquoi l'entrée est-elle plus lente que la sortie ?
4. Quelle courbe à l'entrée, laquelle à la sortie, et pourquoi jamais `linear` sur un
   déplacement ?
5. Quels quatre principes classiques se transposent au web ?
6. Quel est le piège d'une cascade sur une liste, chiffré ?
7. Quel raisonnement du cours 25 sur la couleur se transpose au mouvement ?
8. Cite les deux critères qui encadrent le mouvement et le clignotement.
