# Lab 04. Une timeline, et une préférence respectée

> **Outcome :** à la fin, tu sais écrire une séquence comme une timeline plutôt que comme une
> pile de délais, et tu sais traiter `prefers-reduced-motion` par deux mondes déclarés au lieu
> d'une durée raccourcie. Tu sais aussi pourquoi respecter la préférence ne suffit pas quand une
> animation boucle.
>
> **Vrai outil :** GSAP 3.13 et un navigateur réel sous émulation de `prefers-reduced-motion`.
> L'assertion centrale de l'oracle mesure un **déplacement en pixels** : c'est la seule façon de
> distinguer une animation supprimée d'une animation simplement accélérée.
>
> **Feedback :** `npm run lab:04` depuis `labs/`. RED tant que `src/` ne satisfait pas l'oracle.
> `npm run solution:04` prouve que l'oracle est juste, et tu ne l'ouvres pas avant ton GREEN.

## Lire avant (une lecture bornée, pas le module entier)

Module [`09-gsap-et-timelines`](../../modules/09-gsap-et-timelines), **une fois** :

- § 1.1 ce que le natif ne fait pas bien
- § 3 en entier, la timeline et ses positions relatives
- § 6 `gsap.matchMedia`

Plus module [`08-principes-de-l-animation`](../../modules/08-principes-de-l-animation) § 3 sur
l'accélération, et module [`12-animation-accessible`](../../modules/12-animation-accessible)
§ 2.1 pour la différence entre couper et raccourcir.

Ensuite : page blanche.

## Énoncé

`src/rendu.js` anime trois cartes à l'entrée de la page. Ça fonctionne, et ça a trois défauts :

1. la séquence est une **pile de délais** : changer la durée de la première oblige à recalculer
   les deux autres à la main ;
2. `prefers-reduced-motion` n'est pas lu du tout, et GSAP ne le lit pas pour toi ;
3. la séquence **boucle**, donc le critère `13.8 (A)` est engagé dès cinq secondes et il n'y a
   aucun moyen de l'arrêter.

Tu réécris `src/rendu.js`, et tu peux ajouter au HTML ce que le troisième point demande. Les
trois cartes, leurs identifiants et leur contenu ne changent pas.

```bash
npm run lab:04
```

Deux contraintes, parce qu'elles sont le sujet :

- **aucun `delay:`** dans ton code. Une timeline se compose avec des positions relatives ;
- sous préférence réduite, les cartes doivent finir **pleinement visibles**. On coupe le
  mouvement, pas l'information.

## Vérifier

Le contrat exact attendu par l'oracle :

| Ce qui est vérifié | Critère ou section |
|---|---|
| sans préférence, la séquence déplace réellement les cartes de plus de 5 px | prémisse du lab |
| sous préférence réduite, le déplacement est **inférieur à 1 px** | `13.8 (A)`, module 12 § 2.1 |
| sous préférence réduite, les cartes finissent visibles (opacité > 0,95) | module 12 § 2.1 |
| un bouton de pause existe, avec `aria-pressed="false"` au départ | `13.8 (A)` |
| le bouton arrête réellement le mouvement, et son état est restitué | `13.8 (A)` |
| le code appelle `gsap.timeline(` et ne contient **aucun** `delay:` | module 09 § 3 |
| le code appelle `matchMedia(` et traite explicitement `prefers-reduced-motion: reduce` | module 09 § 6 |

Le libellé du bouton **reste stable** : c'est `aria-pressed` qui porte l'état, pas le texte.
C'est la règle du cours 25 module 17, et l'oracle la fait respecter. Elle a attrapé une première
version de la solution de référence qui changeait le texte du bouton.

## Sonde de rougissement

Un oracle qui ne peut pas rougir ne prouve rien. Une fois au GREEN, remplace la coupure par un
raccourcissement dans `src/rendu.js` :

```diff
  mm.add("(prefers-reduced-motion: reduce)", () => {
-   gsap.set(".carte", { y: 0 });
-   const fondu = gsap.to(".carte", { opacity: 1, duration: 0.15 });
+   const fondu = gsap.to(".carte", { opacity: 1, y: 0, duration: 0.8 });
    return () => fondu.kill();
  });
```

Puis relance :

```bash
npm run lab:04
```

**Attendu :** le test « sous préférence réduite, les cartes NE SE DÉPLACENT PAS » échoue, et son
message te donne le déplacement mesuré en pixels. Si l'oracle reste vert, il est cassé et ce lab
ne compte pas : signale-le.

C'est la sonde la plus importante du cours : « je la raccourcis » est le réflexe naturel, et il
ne satisfait pas le critère, parce qu'un déplacement raccourci reste un déplacement.

Une précision honnête sur la mesure : une durée **très** courte, de l'ordre de cinquante
millisecondes, se terminerait avant le premier relevé et passerait ce relevé précis. C'est une
limite de l'instrument, pas une permission. Le module 12 § 2.1 tranche sur la **nature** du
geste, pas sur sa durée, et c'est pour cela que la solution déclare deux mondes au lieu de
régler un curseur.

## Ce que ce lab ne demande pas

Il ne demande pas ScrollTrigger. Le module 09 § 5 explique quand le natif suffit, et le lab s'en
tient à une séquence d'entrée. Il ne demande pas non plus de licence : GSAP est entièrement
gratuit depuis 2025, y compris les plugins autrefois réservés, et le module le source.
