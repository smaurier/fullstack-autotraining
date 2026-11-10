# 09. GSAP et les timelines

> **Outcome :** à la fin, tu sais quand le natif suffit et quand il ne suffit plus, tu sais
> orchestrer une séquence par une timeline plutôt que par des délais empilés, et tu connais
> l'état réel de la licence de GSAP, qui a changé.
>
> **Lab :** [lab-04 : timeline GSAP](../labs/lab-04-timeline-gsap/README)

## 1. D'abord : le natif suffit-il ?

La question se pose avant d'ajouter une librairie, et la réponse est oui plus souvent qu'on ne
le croit. Le cours 25 module 12 couvre déjà, **sans aucune dépendance** :

- les transitions et les animations par images clés ;
- l'animation des propriétés discrètes, avec `@starting-style` et `allow-discrete` ;
- les transitions de vue, dans une page et entre documents ;
- les animations **liées au défilement**, par `animation-timeline: scroll()` et `view()` ;
- `scroll-state` pour styler un élément collé.

Autrement dit, l'argument historique en faveur d'une librairie d'animation, à savoir
« le CSS ne sait pas faire de scroll-triggered », **n'est plus vrai**.

### 1.1 Ce que le natif ne fait toujours pas bien

Trois choses, et ce sont les seules bonnes raisons d'ajouter GSAP :

1. **Orchestrer une séquence longue** : dix étapes avec des chevauchements, des positions
   relatives, et la possibilité de rejouer, inverser, mettre en pause depuis le code.
2. **Animer ce qui n'est pas une propriété CSS** : une valeur d'objet JavaScript, un attribut
   SVG, un paramètre de dessin dans un canvas, une position de caméra.
3. **Contrôler finement la progression** : lier une timeline à un défilement avec du
   lissage, ou piloter la progression depuis un geste.

Si ton besoin n'est pas dans cette liste, **le natif est la bonne réponse**, et c'est la question
3 de la grille du cours 25 module 21 : une librairie ajoute, elle ne remplace rien.

## 2. La licence, et ce qui a changé

C'est le point d'actualité le plus utile du module, parce que la croyance est très répandue et
qu'elle est devenue fausse.

Pendant des années, GSAP était gratuit pour l'essentiel, avec un abonnement payant, le « Club
GreenSock », pour des plugins comme `ScrollTrigger`, `SplitText` ou `DrawSVG`. Beaucoup de
développeurs écartent encore GSAP pour cette raison.

**Relevé le 10/11/2026 sur la page de tarification officielle :** « GSAP is now 100% free for
all users, thanks to Webflow's support. » Toute la bibliothèque est gratuite, **plugins premium
inclus**, et il n'existe plus de palier payant. La bibliothèque est maintenue par l'équipe
d'origine, salariée de Webflow.
Source : <https://gsap.com/pricing/>.

Conséquence pratique : l'argument « ScrollTrigger est payant » ne tient plus. Si tu l'as entendu,
il datait.

**Et la méthode qui compte plus que le fait :** une licence se **relit** au moment du choix. Celle
de GSAP a changé dans le sens favorable ; celle d'ApexCharts, au module 05, est plus restrictive
que ce que la plupart des comparatifs affirment. Dans les deux cas, la source primaire tranche.

## 3. Le mécanisme : la timeline

### 3.1 Le problème des délais empilés

```js
// ⛔ Trois animations independantes, et une arithmetique de delais
gsap.to('.titre', { opacity: 1, duration: 0.3 });
gsap.to('.sous-titre', { opacity: 1, duration: 0.3, delay: 0.2 });
gsap.to('.bouton', { opacity: 1, y: 0, duration: 0.3, delay: 0.45 });
```

Ça marche, et c'est intenable : changer la durée du titre oblige à recalculer les deux délais
suivants. Et on ne peut ni inverser, ni mettre en pause, ni rejouer l'ensemble.

### 3.2 La timeline

```js
const sequence = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: 'power2.out' } });

sequence
  .to('.titre', { opacity: 1 })
  .to('.sous-titre', { opacity: 1 }, '-=0.1')   // chevauche de 100 ms la precedente
  .to('.bouton', { opacity: 1, y: 0 }, '<')      // DEMARRE avec la precedente
  .to('.illustration', { scale: 1 }, 0.5);       // position ABSOLUE : a 500 ms

sequence.play();
// sequence.reverse(); sequence.pause(); sequence.progress(0.5);
```

Les positions sont la raison d'être de l'objet :

| Position | Sens |
|---|---|
| rien | après la précédente |
| `'-=0.1'` | 100 ms **avant** la fin de la précédente, donc chevauchement |
| `'+=0.2'` | 200 ms **après** la fin de la précédente |
| `'<'` | en **même temps** que le début de la précédente |
| `'>'` | à la fin de la précédente |
| `0.5` | à 500 ms depuis le début, en absolu |
| `'etiquette'` | à un repère nommé posé par `addLabel()` |

Et ce qu'on obtient gratuitement : `play`, `pause`, `reverse`, `restart`, `seek`, `progress`,
`timeScale`. Changer une durée ne casse plus rien.

## 4. Lier au défilement

```js
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

gsap.to('.panneau', {
  xPercent: -300,
  ease: 'none',
  scrollTrigger: {
    trigger: '.section-horizontale',
    start: 'top top',
    end: '+=2000',
    scrub: 1,        // la progression suit le defilement, avec 1 s de lissage
    pin: true,       // la section reste fixe pendant la sequence
  },
});
```

**Quand préférer le natif :** une animation simple liée à la progression, par exemple une barre
de lecture ou une apparition à l'entrée dans la vue. `animation-timeline: scroll()` ou `view()`
fait cela sans dépendance, et **hors du fil principal**, donc sans saccade quand le JavaScript
travaille. Cours 25 module 12 § 3.

**Quand GSAP gagne :** l'épinglage d'une section, le lissage, une séquence de plusieurs étapes
synchronisées sur une même plage de défilement.

**Et le rappel qui n'est pas négociable :** `pin` et `scrub` détournent l'expérience de
défilement. Sous `prefers-reduced-motion`, cela doit être désactivé, pas raccourci. Module 12.

## 5. Les alternatives de la même famille

**`anime_js`** : plus léger que GSAP, une API agréable, des timelines aussi. Un bon choix quand
le besoin est modeste et qu'on veut moins de code.

**`motion_one`** : une bibliothèque construite **sur l'API d'animations du navigateur**. Donc
très légère, et elle délègue au moteur, ce qui lui donne de bonnes performances par construction.
L'envers : elle est contrainte par ce que l'API native sait faire.

**`popmotion`** : une boîte à outils de fonctions d'animation, de plus bas niveau. Historiquement
le socle de la famille Motion.

L'arbre de décision :

```
Le natif suffit-il ? (module 12 du cours 25)
├── oui                                            → natif, zéro dépendance
└── non
    ├── besoin modeste, je veux du léger            → motion_one ou anime_js
    └── orchestration longue, pin, scrub, non-CSS   → GSAP
```

## 6. L'accessibilité dans ce module

Trois exigences, et la première est spécifique aux timelines.

**Une timeline doit pouvoir s'arrêter.** `13.8 (A)` : tout contenu en mouvement de plus de cinq
secondes a besoin d'un moyen de l'arrêter. Une timeline a `pause()`, donc c'est facile ; encore
faut-il exposer un bouton, visible et utilisable au clavier.

```js
boutonPause.addEventListener('click', () => {
  sequence.paused() ? sequence.play() : sequence.pause();
  boutonPause.setAttribute('aria-pressed', String(sequence.paused()));
});
```

**La préférence de mouvement se vérifie, et GSAP a un outil pour ça :**

```js
// matchMedia de GSAP : on declare deux mondes, et la bibliotheque gere la bascule
const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  const tl = gsap.timeline();
  tl.to('.carte', { y: 0, opacity: 1, stagger: 0.04 });
  return () => tl.kill();      // nettoyage quand la condition cesse d'etre vraie
});

mm.add('(prefers-reduced-motion: reduce)', () => {
  // Pas la meme animation raccourcie : un fondu, SANS deplacement
  gsap.set('.carte', { y: 0 });
  gsap.to('.carte', { opacity: 1, duration: 0.15 });
});
```

C'est la forme propre, parce qu'elle sépare les deux mondes au lieu de corriger l'un par l'autre.
Et elle nettoie, ce qui évite les animations fantômes.

**Le focus ne doit pas se perdre.** Une séquence qui déplace ou masque des éléments interactifs
peut laisser le focus sur un élément devenu invisible. À vérifier au clavier, systématiquement.

## 7. Ce que l'enquête interroge, et où c'est traité

Items rattachés à ce module : `greensock`, `gsap`, `anime_js`, `popmotion`, `motion_one`.

Note de lecture : `greensock` et `gsap` sont **deux entrées pour le même outil** dans les
enquêtes, l'ancien nom et le nouveau. Un score de popularité qui les sépare sous-estime donc
l'outil, et c'est un bon exemple de pourquoi un chiffre d'enquête se lit avant de se citer.

## 8. Les pièges

1. **Ajouter GSAP sans vérifier si le natif suffit.** Le CSS sait désormais faire les animations
   liées au défilement.
2. **Croire que ScrollTrigger est payant.** Plus depuis le changement de licence.
3. **Empiler des délais** au lieu d'une timeline. Ingérable au premier changement de durée.
4. **Oublier `gsap.registerPlugin`.** Le plugin est silencieusement absent.
5. **Oublier de nettoyer** dans un composant qui se démonte. Animations fantômes et fuites.
6. **Raccourcir au lieu de remplacer** sous préférence réduite. `gsap.matchMedia` est fait pour
   déclarer deux mondes.
7. **Épingler et détourner le défilement sans échappatoire.** Nocif, et non conforme `13.8 (A)`.
8. **Perdre le focus** dans une séquence qui masque des éléments interactifs.

## 9. Lire avant le lab

Pour [lab-04](../labs/lab-04-timeline-gsap/README) : § 1.1, § 3 en entier, § 6. Plus le module
08 § 3 sur l'accélération.

## 10. Auto-test

1. Cite trois choses que le natif ne fait pas bien, et qui justifient une librairie.
2. Quel est l'état de la licence de GSAP, et quelle croyance est devenue fausse ?
3. Quel est le problème des délais empilés, au-delà de l'esthétique du code ?
4. Que signifient les positions `'-=0.1'`, `'<'` et `0.5` dans une timeline ?
5. Quand le natif est-il préférable à ScrollTrigger, et pour quelle raison technique ?
6. Pourquoi `gsap.matchMedia` est-il la forme propre de la préférence de mouvement ?
7. Quel critère impose un bouton de pause, et à partir de quelle durée ?
8. Pourquoi un score d'enquête sous-estime-t-il GSAP ?
