# Lab 06. Intégrer un Lottie en respectant la personne qui le reçoit

> **Outcome :** à la fin, tu sais intégrer une animation produite par un designer sans lui faire
> dire l'information, sans inonder l'arbre d'accessibilité, et sans imposer du mouvement à qui
> n'en veut pas. Tu sais aussi que la préférence peut changer **pendant** la visite, et que lire
> `matchMedia` une seule fois au chargement ne suffit pas.
>
> **Vrai outil :** `lottie-web` 5.12 et un navigateur réel sous émulation de
> `prefers-reduced-motion`. L'oracle ne lit pas le DOM pour juger l'animation : il interroge le
> lecteur lui-même par `lottie.getRegisteredAnimations()` et compare des **numéros d'image**.
> C'est ce qui rend ce lab mesurable au lieu d'être une impression.
>
> **Feedback :** `npm run lab:06` depuis `labs/`. RED tant que `src/` ne satisfait pas l'oracle.
> `npm run solution:06` prouve que l'oracle est juste, et tu ne l'ouvres pas avant ton GREEN.

## Lire avant (une lecture bornée, pas le module entier)

Module [`11-pipeline-designer`](../../modules/11-pipeline-designer), **une fois** :

- § 2.2 le coût réel d'un fichier, et ses quatre causes
- § 2.3 ce que le lecteur fait et ne fait pas
- § 6 en entier, l'accessibilité d'une animation importée

Plus module [`12-animation-accessible`](../../modules/12-animation-accessible) § 2.1 et § 3, pour
le seuil de `13.8 (A)` et pour la différence entre couper et raccourcir.

Ensuite : page blanche.

## Énoncé

`animations/confirmation.json` est le livrable du designer : une coche qui se dessine, puis un
anneau qui tourne en boucle. **Tu n'y touches pas.** Tout le travail de ce lab est dans
l'intégration, parce que c'est là qu'il est dans la vie réelle.

`src/rendu.js` fait huit lignes, et contient trois défauts qui sont les trois plus fréquents :

1. l'animation est le **seul** porteur de l'information : rien dans la page ne dit que
   l'inscription est confirmée ;
2. le lecteur est dans l'arbre d'accessibilité, où il rend des centaines de nœuds sans sens ;
3. `autoplay: true` et `loop: true` ont été écrits sans jamais interroger la préférence de
   mouvement, et sans offrir le moindre contrôle alors que la séquence boucle.

Tu réécris `src/rendu.js` et `src/index.html`.

```bash
npm run lab:06
```

Quatre contraintes, parce qu'elles sont le sujet :

- sous préférence réduite, l'animation **ne joue pas**, et elle est figée sur son **état final**,
  pas sur une image vide ;
- le lecteur sort de l'arbre d'accessibilité ;
- l'information est portée par du texte ;
- un contrôle visible permet d'arrêter la boucle, et son libellé **reste stable** : c'est
  `aria-pressed` qui porte l'état.

## Vérifier

Le contrat exact attendu par l'oracle :

| Ce qui est vérifié | Critère ou section |
|---|---|
| sans préférence, l'animation joue réellement (trois relevés d'image différents) | prémisse du lab |
| sous préférence réduite, elle **ne joue pas** (trois relevés identiques) | `13.8 (A)`, module 12 § 2.1 |
| sous préférence réduite, elle est figée au-delà de 90 % de ses images | module 11 § 8, piège 6 |
| le lecteur porte `aria-hidden="true"`, et l'arbre entier reste sous 30 nœuds | module 11 § 6 |
| une légende de plus de 15 caractères porte l'information, et dit « confirmé » | `1.3 (A)` |
| un bouton de pause existe, avec `aria-pressed="false"` au départ | `13.8 (A)` |
| le bouton arrête réellement l'animation, et son état est restitué | `13.8 (A)` |
| une bascule de préférence **en cours de visite** arrête l'animation | module 11 § 8, piège 7 |
| le fichier reçu ne contient aucune image bitmap encodée en base64 | module 11 § 2.2 |
| `axe` ne trouve aucune violation | nécessaire, pas suffisant |

Deux lignes de ce tableau méritent une lecture attentive.

**La bascule en cours de visite.** Le test ouvre la page sans préférence, vérifie que ça tourne,
puis active la préférence réduite comme le ferait une personne dans ses réglages système, et
vérifie que ça s'arrête. Lire `matchMedia(...).matches` une fois au chargement passe les trois
autres tests de préférence et échoue sur celui-là.

**La porte de réception.** Le dernier test est le seul du lab qui est **vert avant que tu
commences**, et c'est volontaire : ce n'est pas une porte de lab, c'est une porte de livraison, à
rejouer à chaque nouveau fichier qu'un designer t'envoie. Un bitmap encodé en base64 dans le JSON
est la première cause d'un Lottie de plusieurs mégaoctets, et la conversation qui l'évite se tient
avant la fin du projet, pas après.

Et une observation à faire, parce qu'elle est le cœur du cours : sur le starter, `axe` reste
**vert**, alors que six défauts sont là. Un outil automatique ne voit ni une information portée
par une animation, ni une boucle sans contrôle, ni une préférence ignorée.

## Sonde de rougissement

Un oracle qui ne peut pas rougir ne prouve rien. Une fois au GREEN, remplace l'état final par
l'image zéro dans `src/rendu.js` :

```diff
  function figerSurLEtatFinal() {
-   animation.goToAndStop(animation.totalFrames - 1, true);
+   animation.goToAndStop(0, true);
  }
```

Puis relance :

```bash
npm run lab:06
```

**Attendu :** le test « figée sur son état FINAL » échoue, et son message te donne l'image sur
laquelle elle s'est arrêtée, sur le total. Les autres tests de préférence restent verts, puisque
l'animation ne joue toujours pas. Si l'oracle reste vert, il est cassé et ce lab ne compte pas :
signale-le.

C'est la nuance que le module 11 § 8 appelle le piège 6 : couper le mouvement ne veut pas dire
montrer une image blanche. La confirmation doit rester lisible, sinon on a réglé un problème
d'accessibilité en en créant un autre.

Seconde sonde, celle de la porte de réception. Ajoute un faux bitmap au fichier du designer :

```diff
- "assets":[]
+ "assets":[{"id":"image_0","w":4,"h":4,"u":"","e":1,"p":"data:image/png;base64,iVBORw0KGgo="}]
```

**Attendu :** le test de réception échoue en comptant une image embarquée. Cette sonde a été
jouée pour vérifier que cette porte peut effectivement rougir, puisqu'elle est verte dès le
départ. Remets `"assets":[]` ensuite.

## Ce que ce lab ne demande pas

Il ne demande ni Rive, ni Theatre.js, ni Remotion. Le module 11 § 5 donne l'arbre de décision qui
les distingue, et il rappelle la question préalable : **est-ce que le natif suffit ?** Pour une
icône de chargement, la réponse est oui, et un Lottie de cinq cents kilo-octets pour cela est un
cas réel et fréquent.
