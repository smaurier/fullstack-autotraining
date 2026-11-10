# Lab 05. Une animation de mise en page, sans saccade et sans perte de focus

> **Outcome :** à la fin, tu sais animer un changement de mise en page, ce que le CSS ne sait pas
> faire, en déroulant FLIP à la main. Tu sais pourquoi on anime une transformation et jamais une
> position. Et tu sais traiter les deux conséquences que l'œil ne voit pas : le focus qui tombe,
> et le changement que personne n'annonce.
>
> **Vrai outil :** aucune librairie. L'API d'animations du navigateur (`element.animate`) et
> `getBoundingClientRect`, dans un navigateur réel. L'oracle lit les animations **en cours** par
> `document.getAnimations()`, donc il voit quelles propriétés sont réellement animées, pas ce que
> le code prétend animer.
>
> **Feedback :** `npm run lab:05` depuis `labs/`. RED tant que `src/` ne satisfait pas l'oracle.
> `npm run solution:05` prouve que l'oracle est juste, et tu ne l'ouvres pas avant ton GREEN.

## Lire avant (une lecture bornée, pas le module entier)

Module [`10-motion-et-physique`](../../modules/10-motion-et-physique), **une fois** :

- § 1 et son tableau, ressort contre durée
- § 2.2 FLIP, les quatre étapes
- § 3 en entier
- § 5 le focus et les annonces

Plus le cours 25, module 04 § 2, sur les quatre étapes du pipeline de rendu : c'est lui qui
explique pourquoi `transform` est gratuit et `top` ne l'est pas.

Ensuite : page blanche.

## Énoncé

`src/index.html` et `src/rendu.js` affichent une liste de participants qu'on peut trier et dont
chaque ligne peut être retirée par son propre bouton. Ça fonctionne, et :

1. les éléments **sautent** à leur nouvelle place, parce que le CSS ne peut pas animer un
   changement de mise en page ;
2. quand tu retires une ligne depuis **son** bouton, le focus tombe sur le corps du document,
   donc une personne au clavier repart du haut de la page ;
3. rien n'annonce ce qui vient de se passer.

Tu réécris `src/rendu.js`, et tu ajoutes au HTML ce que les points 2 et 3 demandent. Les quatre
participants, leurs identifiants et leurs chiffres ne changent pas.

```bash
npm run lab:05
```

Trois contraintes, parce qu'elles sont le sujet :

- tu animes une **transformation**, jamais `top`, `left`, `margin` ou `height` ;
- sous `prefers-reduced-motion: reduce`, **aucune** animation n'est lancée, et le tri a quand
  même lieu : on coupe le mouvement, pas la fonction ;
- le focus se place **avant** le retrait, pas après : l'élément qui le porte va disparaître.

## Vérifier

Le contrat exact attendu par l'oracle :

| Ce qui est vérifié | Critère ou section |
|---|---|
| le retrait anime les lignes qui remontent | module 10 § 2.2 |
| le tri anime réellement les lignes | module 10 § 2.2 |
| l'animation porte sur `transform` ou `translate`, et **pas** sur `top`, `left`, `marginTop`, `height` | cours 25, module 04 |
| sous préférence réduite, **aucune** animation n'est lancée | `13.8 (A)`, module 12 § 2.1 |
| sous préférence réduite, le tri a quand même eu lieu | module 12 § 2.1 |
| une région `role="status"` annonce le changement, sans voler le focus | `7.5 (AA)` |
| le focus n'est ni sur le corps du document ni sur un nœud détaché après le retrait | module 10 § 5 |
| le focus atterrit sur le voisin ou sur un point d'ancrage identifiable | module 10 § 5 |
| le retrait est annoncé, avec le nom retiré et le nombre restant | `7.5 (AA)` |
| le tri fonctionne : Bastien premier, Chloé dernière | prémisse du lab |

Remarque la forme du test de focus : le bouton de retrait vit **sur la ligne**, pas dans la barre
de commandes. C'est voulu, et ce n'est pas un détail de maquette. Un bouton extérieur garderait
le focus sur lui après le clic, et l'oracle ne verrait jamais le défaut. La première version de
cet oracle avait ce trou, et elle passait au vert sur le starter.

## Sonde de rougissement

Un oracle qui ne peut pas rougir ne prouve rien. Une fois au GREEN, anime la position au lieu de
la transformation dans `src/rendu.js` :

```diff
  li.animate(
-   [{ transform: `translateY(${ecart}px)` }, { transform: "translateY(0)" }],
+   [{ top: `${ecart}px` }, { top: "0px" }],
    { duration: 300, easing: "cubic-bezier(0, 0, 0.2, 1)" },
  );
```

Puis relance :

```bash
npm run lab:05
```

**Attendu :** le test « l'animation porte sur une transformation » échoue, et son message liste
les propriétés réellement animées, `top` comprise. Si l'oracle reste vert, il est cassé et ce lab
ne compte pas : signale-le.

Seconde sonde, celle du focus : retire le placement du focus avant le retrait.

```diff
- const repli = idVoisin && liste.querySelector(`.ligne[data-id="${idVoisin}"] .retrait`);
- (repli ?? ancrage).focus();
```

**Attendu :** les deux tests de focus échouent, et le premier te dit sur quel élément le focus a
atterri.

## Ce que ce lab ne demande pas

Il ne demande ni React, ni Motion, ni `layoutId`. Le module 10 § 3 montre ce que la librairie
fait, et ce lab montre ce qu'elle fait **à ta place**, ce qui est la seule façon de juger ce
qu'elle coûte. Il ne demande pas non plus de ressort : une durée de 300 ms convient pour un geste
non interruptible, et le § 1 dit pourquoi.
