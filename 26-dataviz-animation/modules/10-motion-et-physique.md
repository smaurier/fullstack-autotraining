# 10. Motion, physique et animations de layout

> **Outcome :** à la fin, tu sais quand un ressort est plus juste qu'une durée, tu sais ce que
> coûte une animation en re-rendus React et comment ne pas le payer, et tu sais pourquoi une
> animation de layout est la seule chose de ce cours que le CSS ne sait vraiment pas faire.
>
> **Lab :** [lab-05 : animation de layout](../labs/lab-05-animation-de-layout/README)

## 1. Durée contre physique

Deux modèles pour décrire un mouvement, et ils ne répondent pas à la même question.

| | Durée plus accélération | Ressort |
|---|---|---|
| Tu règles | combien de temps, et la courbe | la raideur, l'amortissement, la masse |
| La fin | à l'instant prévu | quand le mouvement s'épuise |
| Interruptible | mal : repartir d'où ? | **naturellement** : la vélocité est conservée |
| Juste pour | une transition d'état | une interaction **directe** |

**Le critère de choix, et il est net :** si l'utilisateur **tient** l'élément, c'est un ressort.
S'il a déclenché puis lâché, c'est une durée.

La raison est dans la ligne « interruptible ». Quand on fait glisser un panneau et qu'on le
relâche à mi-course, un modèle à durée doit décider d'une nouvelle durée depuis la position
courante, et le résultat paraît artificiel. Un ressort reprend la **vélocité du geste** : le
mouvement continue comme s'il était physique, parce qu'il l'est.

```jsx
// Ressort : aucune duree, et le mouvement suit le geste
<motion.div drag="x" dragConstraints={{ left: -200, right: 0 }}
  transition={{ type: 'spring', stiffness: 400, damping: 30 }} />

// Duree : une transition d'etat, declenchee puis lachee
<motion.div animate={{ opacity: ouvert ? 1 : 0 }}
  transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }} />
```

### 1.1 Lire les paramètres d'un ressort

- **`stiffness`**, la raideur : plus elle est haute, plus c'est rapide et sec.
- **`damping`**, l'amortissement : plus il est bas, plus ça rebondit. À zéro, ça oscille sans
  fin.
- **`mass`** : plus elle est haute, plus c'est lourd et lent à démarrer.

Le réglage par défaut d'une bibliothèque est presque toujours bon. Les toucher sans mesurer
produit un rebond qui plaît à l'auteur et agace l'utilisateur, et c'est le piège le plus fréquent
du domaine.

## 2. Les animations de layout, ce que le CSS ne sait pas faire

C'est le seul endroit de ce cours où une librairie est **irremplaçable**, et il vaut d'être
compris.

### 2.1 Le problème

Un élément passe d'une position à une autre **parce que la mise en page a changé** : un élément
est retiré d'une liste, un filtre réordonne une grille, une carte passe d'une colonne à l'autre.
Le CSS ne peut pas animer cela : il n'y a pas de transition entre deux layouts, il y a deux
layouts.

### 2.2 La technique, et son nom

Elle s'appelle FLIP, pour First, Last, Invert, Play, et c'est ce que font ces librairies sous le
capot :

```
1. First  : mesurer la position AVANT la mutation
2. Last   : laisser le navigateur recalculer la mise en page
3. Invert : appliquer une transformation qui ramene visuellement l'element a sa position d'avant
4. Play   : animer cette transformation vers zero
```

L'astuce est à l'étape 3 : on n'animé jamais la mise en page, on anime une **transformation**,
qui est au niveau composite du pipeline du cours 25 module 04. Donc fluide.

```jsx
// Motion fait les quatre etapes pour toi : un attribut
<motion.li layout key={membre.id}>{membre.prenom}</motion.li>
```

Et `layoutId` relie **deux éléments différents** comme s'ils étaient le même, ce qui donne la
transition de la vignette vers la page :

```jsx
<motion.img layoutId={`photo-${id}`} />   // dans la grille
<motion.img layoutId={`photo-${id}`} />   // dans la vue detaillee
```

C'est la « relation » du module 08 § 1 : cette chose est la même que celle-là.

**À comparer avec le natif :** les transitions de vue du cours 25 module 12 § 2 font quelque chose
de proche, avec `view-transition-name`, et sans dépendance. La différence pratique : les
transitions de vue s'appliquent à une mutation **globale** du DOM, les animations de layout de
Motion s'appliquent **élément par élément**, dans un rendu React, avec interruption possible en
cours de route. Pour une liste réordonnable, Motion reste plus simple.

## 3. Le coût en re-rendus, et comment ne pas le payer

Le point qui distingue une animation React qui va bien d'une qui fait chauffer le ventilateur.

### 3.1 La règle

**Une animation ne doit pas passer par l'état React.** Soixante images par seconde, c'est soixante
rendus par seconde de l'arbre concerné.

```jsx
// ⛔ 60 rendus par seconde, et tous les enfants avec
const [x, setX] = useState(0);
useEffect(() => {
  const id = requestAnimationFrame(() => setX((v) => v + 1));
  return () => cancelAnimationFrame(id);
});

// ✅ La valeur vit HORS de React : zero rendu
const x = useMotionValue(0);
const opacite = useTransform(x, [0, 200], [1, 0]);
<motion.div style={{ x, opacity: opacite }} />
```

Une valeur de mouvement est un objet mutable observé par la bibliothèque, qui écrit directement
dans le style. React ne rend rien. C'est le même raisonnement que le cours 25 module 04 : on
veut rester au niveau composite, et ici on veut en plus rester hors du cycle de rendu.

### 3.2 Mesurer, et ne pas croire

```jsx
// Un compteur de rendus, jete, pour verifier
const rendus = useRef(0);
rendus.current += 1;
console.log('rendus', rendus.current);
```

Le lab 05 utilise exactement ce principe : son oracle **compte les rendus** pendant une
animation, et il échoue si le nombre croît avec le temps. C'est la même idée que le compteur du
lab 16 du cours 10 : on mesure un comportement, pas un résultat.

## 4. Les candidats de la famille

**Motion**, longtemps nommé Framer Motion et toujours interrogé sous ce nom dans les enquêtes :
le plus complet. Animations de layout, `layoutId`, valeurs de mouvement, gestes, variantes,
orchestration. C'est la référence pour React.

**`react_spring`** : centré sur la physique, avec une approche par ressorts très cohérente.
Multi-plateforme, et plus bas niveau sur le layout.

**`autoanimate`** : une seule ligne pour animer les ajouts, retraits et déplacements d'enfants.
Volontairement sans réglage. Le meilleur rapport entre effet et effort quand le besoin est
exactement celui-là.

```js
// autoAnimate : une ligne, et les mutations de la liste sont animees
const [parent] = useAutoAnimate();
<ul ref={parent}>{membres.map((m) => <li key={m.id}>{m.prenom}</li>)}</ul>
```

**`react_motion`** : l'ancêtre, historique. À vérifier sur sa maintenance avant tout usage neuf.

**`react_native_reanimated`** : l'équivalent pour React Native, avec un modèle très différent,
puisque les animations s'exécutent sur le fil d'interface native. Hors périmètre de ce cours,
c'est le cours 21 React Native.

L'arbre de décision :

```
Qu'est-ce que tu animes ?
├── des ajouts/retraits/deplacements dans une liste, sans reglage fin → autoanimate
├── un geste que l'utilisateur tient                                  → ressorts : Motion ou react_spring
├── une transition d'etat simple                                      → le CSS natif suffit
└── une relation entre deux ecrans, un layoutId                        → Motion
```

## 5. L'accessibilité dans ce module

**La préférence de mouvement, par un crochet plutôt que par une media query :**

```jsx
const mouvementReduit = useReducedMotion();

<motion.li
  layout={!mouvementReduit}                       // on COUPE l'animation de layout
  animate={{ opacity: 1 }}
  initial={{ opacity: 0, y: mouvementReduit ? 0 : 20 }}   // plus de deplacement
  transition={mouvementReduit ? { duration: 0.15 } : { type: 'spring' }}
/>
```

Noter la ligne `layout={!mouvementReduit}` : une animation de layout **est** un déplacement, par
définition. Sous préférence réduite, elle ne se raccourcit pas, elle se coupe. L'élément apparaît
à sa nouvelle place, en fondu.

**Le focus pendant un réordonnancement.** C'est le piège propre à ce module, et il est invisible à
l'œil : si l'élément focusé est déplacé ou retiré pendant l'animation, le focus peut partir sur
le corps du document. La personne au clavier perd sa place. À tester systématiquement : focus sur
un élément, déclencher la mutation, vérifier où est le focus.

**Annoncer le changement.** Un réordonnancement ou un retrait est une information. Une région de
statut l'annonce sans voler le focus, critère `7.5 (AA)` :

```jsx
<p role="status" className="visuellement-masque">{membres.length} membres, triés par nom</p>
```

## 6. Ce que l'enquête interroge, et où c'est traité

Items rattachés à ce module : `framer_motion`, `react_spring`, `autoanimate`, `react_motion`,
`react_native_reanimated`.

Deux notes de lecture. `framer_motion` est l'ancien nom de Motion, toujours utilisé dans les
enquêtes, donc son score agrège une réalité renommée. Et `react_native_reanimated` apparaît dans
une question sur les librairies d'animation React, alors qu'il relève d'une autre plateforme :
le périmètre d'une question d'enquête ne correspond pas toujours à un périmètre technique.

## 7. Les pièges

1. **Régler un ressort sans mesurer.** Le rebond qui plaît à l'auteur agace l'utilisateur.
2. **Utiliser une durée sur un geste tenu.** Le relâchement paraît artificiel.
3. **Faire passer une animation par l'état React.** Soixante rendus par seconde.
4. **Croire qu'on peut animer un changement de layout en CSS.** Il n'y a pas de transition entre
   deux layouts, d'où FLIP.
5. **Laisser `layout` actif sous préférence réduite.** Une animation de layout **est** un
   déplacement.
6. **Oublier le focus pendant un réordonnancement.** Invisible à l'œil, bloquant au clavier.
7. **Ne pas annoncer un retrait ou un tri.** L'information existe pour l'œil seulement.
8. **Prendre Motion pour animer une opacité.** Le CSS natif suffit, et c'est zéro dépendance.

## 8. Lire avant le lab

Pour [lab-05](../labs/lab-05-animation-de-layout/README) : § 1 et son tableau, § 2.2, § 3 en
entier, § 5.

## 9. Auto-test

1. Quel est le critère de choix entre un ressort et une durée, en une phrase ?
2. Pourquoi un ressort est-il naturellement interruptible et une durée non ?
3. Que règlent `stiffness`, `damping` et `mass` ?
4. Déroule les quatre étapes de FLIP, et dis où est l'astuce.
5. Pourquoi le CSS ne peut-il pas animer un changement de mise en page ?
6. Quelle différence pratique entre `layoutId` et les transitions de vue natives ?
7. Pourquoi une animation ne doit-elle pas passer par l'état React, et par quoi la remplacer ?
8. Pourquoi `layout` doit-il être **coupé** et non raccourci sous préférence réduite ?
9. Quel piège de ce module est invisible à l'œil et bloquant au clavier ?
