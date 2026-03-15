# Questions d'entretien technique — Fullstack JS

> Preparation aux entretiens techniques. Chaque question à un niveau (Junior/Mid/Senior) et une réponse complete mais concise.
> Astuce : essaie de repondre AVANT de lire la réponse. Si tu bloques > 30s, c'est un point a réviser.

---

## TypeScript

### Q1 (Junior) : Quelle est la différence entre `type` et `interface` ?

<details><summary>Reponse</summary>

`interface` est extensible par declaration merging (deux declarations du même nom fusionnent automatiquement) et se limite aux formes objet. `type` est un alias qui supporte les unions, intersections, types primitifs, tuples et mapped types. En pratique : utiliser `interface` pour les contrats publics d'API (extensibles par des tiers) et `type` pour tout le reste (unions, utilitaires, types complexes). Depuis TS 4.x les deux supportent `extends`/intersection, donc la différence de performance est negligeable.

</details>

### Q2 (Junior) : A quoi sert le mode `strict` dans tsconfig ?

<details><summary>Reponse</summary>

`strict: true` active simultanement : `strictNullChecks`, `strictFunctionTypes`, `strictBindCallApply`, `strictPropertyInitialization`, `noImplicitAny`, `noImplicitThis`, `alwaysStrict`, `useUnknownInCatchVariables`. L'impact principal : les types `null` et `undefined` ne sont plus assignables a n'importe quel type, ce qui force le narrowing explicite et elimine toute une categorie de bugs runtime. C'est le reglage recommande pour tout projet serieux.

</details>

### Q3 (Junior) : Comment fonctionne le type narrowing ?

<details><summary>Reponse</summary>

Le narrowing reduit un type large à un type plus précis via l'analyse du control flow. Mecanismes : `typeof` (primitifs), `instanceof` (classes), `in` (propriétés), comparaisons `=== null`, assertions `asserts x is T`, et les **discriminated unions** (un champ litteral commun comme `type: 'circle' | 'square'`). Le compilateur suit chaque branche et affine le type sans cast explicite.

</details>

### Q4 (Mid) : Explique les utility types `Pick`, `Omit`, `Partial`, `Required` et `Record`. Donne un cas d'usage concret.

<details><summary>Reponse</summary>

- `Pick<T, K>` : extrait un sous-ensemble de clés → formulaire d'edition avec seulement certains champs.
- `Omit<T, K>` : exclut des clés → DTO sans le champ `id` pour la création.
- `Partial<T>` : toutes les props optionnelles → patch/update partiel.
- `Required<T>` : toutes les props obligatoires → validation après hydratation.
- `Record<K, V>` : dictionnaire type → `Record<string, Handler>` pour un registre de routes.

Sous le capot, ce sont des mapped types : `type Partial<T> = { [P in keyof T]?: T[P] }`. On peut créer ses propres variantes (`DeepPartial`, `Readonly` récursif, etc.).

</details>

### Q5 (Mid) : Qu'est-ce que le declaration merging et quand est-ce utile ?

<details><summary>Reponse</summary>

Quand deux declarations du même nom coexistent, TS les fusionne. Ça marche pour : interface + interface, namespace + function, namespace + class, enum + namespace. Cas d'usage principal : **augmentation de modules** — par exemple etendre `Express.Request` pour ajouter `req.user` après un middleware d'auth, ou enrichir les types d'une lib tierce via `declare module 'lib' { interface X { newProp: string } }`. Attention : `type` alias ne supporte PAS le merging, c'est un avantage exclusif de `interface`.

</details>

### Q6 (Mid) : Comment fonctionnent les generics avec contraintes ? Donne un exemple avec `extends`.

<details><summary>Reponse</summary>

Les generics parametrent un type. Les contraintes (`extends`) limitent les types acceptes :

```ts
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

Ici `K` est contraint aux clés reelles de `T`, donc `getProperty(user, 'age')` compile mais `getProperty(user, 'foo')` echoue. On peut contraindre à une forme : `<T extends { id: string }>` pour garantir la presence d'un champ. Les generics preservent le lien entre input et output — la ou `any` le detruit.

</details>

### Q7 (Mid) : Qu'est-ce qu'une discriminated union et pourquoi c'est puissant ?

<details><summary>Reponse</summary>

C'est une union de types objets partageant un champ litteral discriminant :

```ts
type Result<T> = { status: 'ok'; data: T } | { status: 'error'; message: string };
```

Le switch/if sur `status` declenche le narrowing exhaustif : dans la branche `'ok'`, TS sait que `data` existe. Ajouter un `default: never` dans le switch garantit l'exhaustivite à la compilation. C'est le pattern privilegie pour modeliser les états (loading/success/error), les messages de protocole, les actions Redux/NgRx, etc.

</details>

### Q8 (Senior) : Explique les conditional types avec `infer`. Donne un exemple concret.

<details><summary>Reponse</summary>

Les conditional types suivent la forme `T extends U ? X : Y`. Le mot-clé `infer` capture un sous-type dans la branche `true` :

```ts
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T;
```

`infer R` demandé a TS de deduire `R` depuis le pattern. Cas avancees : extraire les params d'un tuple, unpacker des types imbriques, créer des parsers de template literal types (`infer` dans des backtick types). C'est le mécanisme derriere la majorite des utility types de la stdlib et des librairies comme `zod` ou `trpc`.

</details>

### Q9 (Senior) : Comment implementer un type `DeepReadonly<T>` récursif et quels sont les pieges ?

<details><summary>Reponse</summary>

```ts
type DeepReadonly<T> = T extends primitive ? T
  : T extends Array<infer U> ? ReadonlyArray<DeepReadonly<U>>
  : T extends Map<infer K, infer V> ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
  : { readonly [P in keyof T]: DeepReadonly<T[P]> };
type primitive = string | number | boolean | symbol | bigint | null | undefined;
```

Pieges : (1) la récursion infinie sur les types circulaires — TS à une limite de profondeur (~50), il faut un cas de base pour les primitifs. (2) `Function` et `Date` ne doivent pas etre iteres sur leurs propriétés. (3) Les classes avec des méthodes internes deviennent inutilisables si on rend tout readonly. En pratique, utiliser les types de librairies comme `ts-essentials` ou `type-fest` qui gerent ces edge cases.

</details>

### Q10 (Senior) : Explique la variance en TypeScript (covariance, contravariance, bivariance). Quel impact a `strictFunctionTypes` ?

<details><summary>Reponse</summary>

- **Covariance** : `Dog extends Animal` → `Array<Dog>` assignable a `Array<Animal>` (les valeurs de retour sont covariantes).
- **Contravariance** : pour les paramètres de fonction, c'est l'inverse. `(a: Animal) => void` est assignable a `(d: Dog) => void` car la fonction qui accepte tout Animal géré forcement un Dog.
- **Bivariance** : avant `strictFunctionTypes`, TS acceptait les deux directions pour les params — un trou de soundness.

`strictFunctionTypes: true` active la contravariance correcte pour les params de fonctions (sauf les méthodes, qui restent bivariantes pour compatibilite DOM). Impact concret : les callbacks de type `EventHandler<SpecificEvent>` ne sont plus assignables la ou `EventHandler<BaseEvent>` est attendu, ce qui previent des erreurs runtime subtiles.

</details>

### Q11 (Senior) : Comment créer un type-safe event emitter en TypeScript pur ?

<details><summary>Reponse</summary>

```ts
type EventMap = {
  login: { userId: string };
  logout: undefined;
  error: { code: number; message: string };
};

class TypedEmitter<E extends Record<string, unknown>> {
  private listeners = new Map<keyof E, Set<Function>>();

  on<K extends keyof E>(event: K, fn: (payload: E[K]) => void): void {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set());
    this.listeners.get(event)!.add(fn);
  }

  emit<K extends keyof E>(event: K, ...args: E[K] extends undefined ? [] : [E[K]]): void {
    this.listeners.get(event)?.forEach(fn => (fn as any)(...args));
  }
}
```

Le point clé : le spread conditionnel `...args: E[K] extends undefined ? [] : [E[K]]` permet d'appeler `emit('logout')` sans argument mais force `emit('login', { userId })`. C'est le pattern utilise par `mitt`, `tiny-emitter` et la plupart des bus d'events types.

</details>

---

## React

### Q1 (Junior) : Quel est le cycle de vie d'un composant fonctionnel avec les hooks ?

<details><summary>Reponse</summary>

1. **Montage** : le corps de la fonction s'exécuté, le JSX est rendu, puis `useEffect(() => {...}, [])` s'exécuté après le paint (équivalent `componentDidMount`).
2. **Mise a jour** : quand state ou props changent, le corps re-exécuté, le DOM est patche, puis `useEffect` avec des deps qui ont change se re-exécuté (après cleanup de l'effet précédent).
3. **Demontage** : la fonction de cleanup de `useEffect` s'exécuté (équivalent `componentWillUnmount`).

Point important : `useLayoutEffect` s'exécuté de manière synchrone après les mutations DOM mais avant le paint — utile pour mesurer le DOM ou éviter le flicker.

</details>

### Q2 (Junior) : Quelle est la différence entre composant controle et non controle ?

<details><summary>Reponse</summary>

**Controle** : la valeur du champ est pilotee par le state React (`value={state}` + `onChange`). React est la source de verite. Avantage : validation en temps réel, transformation, soumission facile.

**Non controle** : le DOM géré la valeur, on la lit via `useRef` au moment voulu. Plus simple pour les formulaires simples ou l'intégration de libs non-React.

Piege classique : passer de `undefined` à une valeur (où l'inverse) fait basculer entre les deux modes et généré un warning React. Toujours initialiser : `useState('')` et non `useState()`.

</details>

### Q3 (Junior) : Comment fonctionne la reconciliation (virtual DOM) ?

<details><summary>Reponse</summary>

React maintient un arbre virtuel (objets JS legers). A chaque render, il créé un nouvel arbre et le compare a l'ancien (diffing). L'algorithme est O(n) grâce à deux heuristiques : (1) deux éléments de types différents produisent des sous-arbres différents (remplacement complet), (2) les `key` identifient les éléments dans une liste pour le reordonnancement. Le résultat du diff est un ensemble minimal de mutations DOM appliquees en batch. C'est pourquoi les `key` stables (pas d'index) sont cruciales pour les performances de listes.

</details>

### Q4 (Mid) : Quand utiliser `React.memo`, `useMemo` et `useCallback` ? Quand NE PAS les utiliser ?

<details><summary>Reponse</summary>

- `React.memo(Component)` : evite le re-render si les props n'ont pas change (shallow compare). Utile pour les composants couteux avec des props stables.
- `useMemo(() => compute(), [deps])` : memoize une valeur calculee. Utile pour les calculs couteux ou pour stabiliser une référence objet passee en prop.
- `useCallback(fn, [deps])` : memoize une fonction. Utile quand la fonction est passee à un composant memo ou dans les deps d'un effect.

**Quand NE PAS les utiliser** : la memoization à un cout (comparaison + stockage). Pour des composants legers, le cout du memo dépasse celui du re-render. La regle : mesurer d'abord avec le Profiler, optimiser ensuite. Avec React Compiler (React 19), la memoization sera automatique et ces hooks deviendront largement obsoletes.

</details>

### Q5 (Mid) : Qu'est-ce qu'un Error Boundary et pourquoi ça n'existe qu'en classe ?

<details><summary>Reponse</summary>

Un Error Boundary est un composant qui capture les erreurs de rendu de ses enfants via `componentDidCatch(error, info)` et `static getDerivedStateFromError(error)`. Il affiche un fallback UI au lieu de crasher toute l'app. Ça n'existe qu'en classe car les hooks n'ont pas d'équivalent a ces lifecycle methods (pas de `useErrorBoundary` natif). En pratique, on utilise `react-error-boundary` qui fournit un wrapper et un hook `useErrorBoundary()`. Limites : ne capture PAS les erreurs dans les event handlers, le code async, ou le SSR — seulement le render et les effects.

</details>

### Q6 (Mid) : Explique les Portals. Quand les utiliser ?

<details><summary>Reponse</summary>

`ReactDOM.createPortal(child, domNode)` rend un composant dans un noeud DOM exterieur à la hiérarchie parente, tout en preservant le contexte React (events bubblent dans l'arbre React, pas le DOM). Cas d'usage : modals, tooltips, notifications, dropdown menus — tout ce qui doit echapper au `overflow: hidden` ou au `z-index` du parent. Point important : le portal hérité du contexte React (providers, event bubbling) mais pas du CSS scope du parent.

</details>

### Q7 (Mid) : Comment fonctionne Suspense et a quoi sert-il ?

<details><summary>Reponse</summary>

`<Suspense fallback={<Spinner />}>` capture les "promesses lancees" par ses enfants. Quand un composant enfant "suspend" (lance une promesse pendant le render), Suspense affiche le fallback jusqu'a résolution. Utilisations : (1) `React.lazy()` pour le code splitting, (2) data fetching avec des libs compatibles (Relay, TanStack Query, use() hook en React 19), (3) Server Components streaming. Suspense permet le rendu progressif : les parties pretes s'affichent immediatement, les parties en attente montrent un fallback. On peut imbriquer plusieurs Suspense pour un loading granulaire.

</details>

### Q8 (Senior) : Explique l'architecture Fiber de React. Pourquoi a-t-elle ete introduite ?

<details><summary>Reponse</summary>

Avant Fiber (React 15), la reconciliation etait recursive et synchrone — un gros render bloquait le main thread. Fiber est une reecriture de l'algorithme de reconciliation en **unites de travail interruptibles** (fibers). Chaque fiber est un noeud de l'arbre avec des pointeurs (child, sibling, return) formant une linked list. Le travail se fait en deux phases : (1) **render/reconciliation** (interruptible) — parcourt l'arbre, calcule les changements, peut etre interrompu pour ceder au navigateur, (2) **commit** (synchrone) — applique les mutations DOM d'un coup. Cela permet le time-slicing, les priorites (user input > animation > data fetch), et les concurrent features (Suspense, transitions, streaming SSR).

</details>

### Q9 (Senior) : Que sont les Server Components (RSC) et comment interagissent-ils avec les Client Components ?

<details><summary>Reponse</summary>

Les RSC s'executent exclusivement sur le serveur : pas de state, pas de hooks d'effet, pas de bundle JS envoye au client. Ils peuvent acceder directement à la DB, au filesystem, aux secrets. Le rendu produit un format serialisable (RSC payload, pas du HTML) streame au client. Les Client Components sont marques `'use client'` et fonctionnent comme des composants React classiques.

Regles d'interaction : un RSC peut render un Client Component (en passant des props serialisables). Un Client Component ne peut PAS importer un RSC, mais peut le recevoir via `children` (pattern de composition). Les Server Actions (`'use server'`) permettent au client d'appeler des fonctions serveur comme des RPC types.

Impact architecture : on pousse le maximum de logique dans les RSC (zero JS client), et on isole l'interactivite dans les Client Components aux feuilles de l'arbre.

</details>

### Q10 (Senior) : Quelles sont les nouveautes majeures de React 19 (concurrent features, use(), Actions) ?

<details><summary>Reponse</summary>

- **`use()` hook** : lit une promesse ou un context dans le render. Contrairement aux autres hooks, peut etre appele conditionnellement. Remplace les patterns `useEffect` + `useState` pour le data fetching.
- **Actions et `useActionState`** : les formulaires peuvent avoir une `action` async. `useActionState(fn, initialState)` géré le state du formulaire + `isPending` automatiquement.
- **`useOptimistic`** : met a jour l'UI immediatement avant la réponse serveur, revient en arriere si erreur.
- **React Compiler** : transforme le code à la compilation pour inserer automatiquement la memoization (memo, useMemo, useCallback deviennent inutiles).
- **`<form>` actions** : progressive enhancement natif, les formulaires fonctionnent même sans JS.
- **Ref comme prop** : plus besoin de `forwardRef`, `ref` est une prop normale.
- **Metatags dans le render** : `<title>`, `<meta>`, `<link>` dans n'importe quel composant, hoistes automatiquement dans `<head>`.

</details>

### Q11 (Senior) : Comment optimiser une application React avec des milliers d'éléments dans une liste ?

<details><summary>Reponse</summary>

(1) **Virtualisation** : ne rendre que les éléments visibles avec `react-window` ou `@tanstack/virtual` — reduit les noeuds DOM de milliers a quelques dizaines. (2) **Keys stables** : jamais d'index si la liste est triee/filtree. (3) `React.memo` sur les items avec comparaison shallow. (4) **Pagination ou infinite scroll** pour limiter les donnees en mémoire. (5) `useDeferredValue` pour ne pas bloquer l'input utilisateur pendant le re-render de la liste. (6) **Web Worker** pour les calculs de tri/filtre lourds. (7) CSS `content-visibility: auto` pour le rendering incremental natif du navigateur. Mesurer avec React Profiler et Chrome DevTools Performance avant d'optimiser.

</details>

---

## Vue

### Q1 (Junior) : Comment fonctionne la réactivité dans Vue 3 ?

<details><summary>Reponse</summary>

Vue 3 utilise les `Proxy` ES6 (au lieu de `Object.defineProperty` en Vue 2). Quand on créé un `reactive({})`, Vue wrappe l'objet dans un Proxy qui intercepte les operations get/set. Au `get`, il enregistre l'effet actif comme dépendance (tracking). Au `set`, il notifie tous les effets dependants (triggering). `ref()` wrappe une valeur primitive dans un objet `{ value }` pour la rendre réactive. L'avantage des Proxy : detection des ajouts/suppressions de propriétés, support des Map/Set, pas de limitation sur les index de tableau.

</details>

### Q2 (Junior) : Quelle est la différence entre Composition API et Options API ?

<details><summary>Reponse</summary>

**Options API** : organise le code par type (`data`, `methods`, `computed`, `watch`). Simple pour les petits composants mais la logique liee à une feature est dispersee.

**Composition API** (`setup()` ou `<script setup>`) : organise le code par feature/concern. On regroupe le state, les computed et les watchers d'une même fonctionnalite, et on peut extraire en composables (`useXxx`) pour la reutilisation. Avantages : meilleur TypeScript (inference directe), tree-shaking des imports, logique partageable sans mixins. C'est l'approche recommandee pour Vue 3.

</details>

### Q3 (Junior) : A quoi servent `provide` et `inject` ?

<details><summary>Reponse</summary>

Pattern de dependency injection entre composants. Un ancetre fait `provide('key', value)` et n'importe quel descendant fait `inject('key')` pour le recevoir, sans prop drilling. En Composition API, les valeurs fournies peuvent etre réactives (`provide('theme', ref('dark'))`), ce qui permet aux descendants de reagir aux changements. Cas d'usage : theme, configuration globale, services partages dans un sous-arbre. Utiliser des `InjectionKey<T>` types pour la type-safety. Ce n'est PAS un remplacement de Pinia — c'est pour les donnees scopees à un sous-arbre, pas globales.

</details>

### Q4 (Mid) : Pinia vs Vuex : quelles sont les différences clés ?

<details><summary>Reponse</summary>

Pinia est le successeur officiel de Vuex. Differences : (1) Pas de mutations — les actions modifient le state directement (plus simple, moins de boilerplate). (2) Support TypeScript natif — inference complete sans wrappers. (3) Architecture modulaire — chaque store est independant, pas d'arbre unique avec modules. (4) Support Composition API natif — les stores peuvent etre définis avec `defineStore('id', () => { ... })`. (5) DevTools integres, hot module replacement. (6) Leger (~1KB). Vuex reste en maintenance, toute nouvelle app Vue 3 devrait utiliser Pinia.

</details>

### Q5 (Mid) : Comment fonctionne `<Teleport>` et quand l'utiliser ?

<details><summary>Reponse</summary>

`<Teleport to="body">` rend le contenu dans un noeud DOM cible tout en restant dans l'arbre logique Vue (réactivité, events, provide/inject preserves). Cas d'usage : modals, toasts, tooltips — tout élément qui doit echapper au contexte CSS du parent (overflow, z-index, position). On peut désactiver dynamiquement avec `:disabled="true"` pour rendre sur place. Equivalent des Portals React. Piege SSR : s'assurer que le noeud cible existe au moment du rendu, sinon utiliser `<Teleport to="body" :disabled="!isMounted">`.

</details>

### Q6 (Mid) : Comment créer une directive personnalisee ? Donne un exemple.

<details><summary>Reponse</summary>

```ts
const vClickOutside = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    el._clickOutside = (e: Event) => {
      if (!el.contains(e.target as Node)) binding.value(e);
    };
    document.addEventListener('click', el._clickOutside);
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el._clickOutside);
  }
};
```

Hooks disponibles : `created`, `beforeMount`, `mounted`, `beforeUpdate`, `updated`, `beforeUnmount`, `unmounted`. Les directives sont pour la manipulation DOM directe — préférence pour les composables pour la logique réutilisable. Enregistrement global via `app.directive('click-outside', vClickOutside)` ou local dans `<script setup>` (convention : prefixe `v`).

</details>

### Q7 (Mid) : Explique le SSR avec Nuxt. Quel est le cycle de vie cote serveur vs client ?

<details><summary>Reponse</summary>

Nuxt exécuté le rendu Vue sur le serveur (Node.js) pour produire du HTML. Cycle : (1) Le serveur exécuté `setup()`, les composables, `useFetch`/`useAsyncData` (attente des donnees). (2) Le HTML est envoye avec le state serialise (`<script>window.__NUXT__</script>`). (3) Cote client, Vue "hydrate" : il attache les event listeners au HTML existant sans re-créer le DOM. Regles : pas d'acces `window`/`document` cote serveur, utiliser `onMounted` ou `<ClientOnly>` pour le code client-only. `useAsyncData` deduplique : l'appel serveur n'est pas rejoue au client grace au payload transfere.

</details>

### Q8 (Senior) : Explique en detail le système de réactivité : effect, track, trigger, scheduler.

<details><summary>Reponse</summary>

Au coeur du système : `ReactiveEffect` (une fonction trackee). Quand un effet s'exécuté, il se place comme `activeEffect`. Les Proxy interceptent les `get` et appellent `track(target, key)` qui enregistre l'effet dans une `Map<target, Map<key, Set<Effect>>>` (la **depsMap**). Au `set`, `trigger(target, key)` récupéré tous les effets dependants et les schedule. Le **scheduler** géré le batching : les updates de composants sont mises en queue et flushees en microtask (`nextTick`) pour éviter les renders multiples. `computed` est un effet lazy : il ne recalcule que quand ses deps changent ET qu'on lit sa valeur (lazy évaluation + caching). `watch` est un effet avec callback.

</details>

### Q9 (Senior) : Qu'est-ce que le Vapor Mode de Vue et comment ça change l'architecture ?

<details><summary>Reponse</summary>

Le Vapor Mode (preview Vue 3.5+) elimine le virtual DOM pour les composants compatibles. Au lieu de créer un vnode tree et de le differ, le compilateur généré du code qui met a jour le DOM directement via des instructions granulaires (similaire a Solid.js ou Svelte). Le template `<p>{{ count }}</p>` compile en : créer le noeud `p` une fois, puis un effet qui met a jour `textContent` quand `count` change. Avantages : moins de mémoire (pas d'arbre vnode), moins de GC pressure, updates plus rapides pour les composants a template statique. Il coexiste avec le mode vdom : on peut mixer les deux dans la même app. Les composants a rendu dynamique complexe restent en vdom classique.

</details>

### Q10 (Senior) : Comment optimiser une app Vue a grande echelle ? Detaille les stratégies.

<details><summary>Reponse</summary>

(1) **Code splitting** : `defineAsyncComponent` + dynamic imports, routes lazy-loaded. (2) **`v-once`** et **`v-memo`** pour les sous-arbres statiques ou rarement mis a jour. (3) **`shallowRef`/`shallowReactive`** pour les grandes structures de donnees ou seule la référence de premier niveau change. (4) Virtualisation des listes avec `vue-virtual-scroller`. (5) **`KeepAlive`** avec `max` pour cacher les composants navigues sans les detruire. (6) Computed avec cache plutot que des méthodes appelees dans le template. (7) **SSR/SSG** avec Nuxt pour le temps de première peinture. (8) Analyser avec Vue DevTools (timeline, performance) et le composant highlight pour détecter les re-renders inutiles. (9) Éviter les watchers profonds (`deep: true`) sur de grands objets — préférer des watchers cibles.

</details>

---

## Angular

### Q1 (Junior) : Comment fonctionne le système d'injection de dépendances d'Angular ?

<details><summary>Reponse</summary>

Angular à un DI hiérarchique. Chaque `@Injectable()` est enregistre dans un injecteur (root, module, ou composant). Quand un composant demandé une dépendance via le constructeur, Angular remonte la hiérarchie d'injecteurs jusqu'a trouver un provider. `providedIn: 'root'` créé un singleton app-wide (tree-shakable). `providers: [Service]` dans un composant créé une instance par composant. On peut utiliser `@Optional()`, `@SkipSelf()`, `@Self()` pour controler la résolution. Depuis Angular 14+, `inject()` fonctionne aussi dans les fonctions (pas seulement les constructeurs).

</details>

### Q2 (Junior) : Quelle est la différence entre `ngOnInit` et le constructeur ?

<details><summary>Reponse</summary>

Le **constructeur** est appele par le DI pour instancier la classe — les `@Input()` ne sont PAS encore disponibles. On y injecte uniquement les dépendances. **`ngOnInit`** est appele après le premier `ngOnChanges`, donc les inputs sont initialises. C'est la ou on place la logique d'initialisation (appels API, abonnements, etc.). Regle : constructeur = injection, `ngOnInit` = initialisation. En standalone avec `inject()`, le constructeur est moins utilise mais la distinction reste importante pour les inputs.

</details>

### Q3 (Junior) : Qu'est-ce qu'un standalone component et pourquoi Angular pousse cette approche ?

<details><summary>Reponse</summary>

Un standalone component (`standalone: true` ou par defaut depuis Angular 17) n'a pas besoin d'etre declare dans un NgModule. Il declare ses propres imports directement. Avantages : (1) moins de boilerplate (plus de modules juste pour regrouper), (2) lazy loading au niveau composant, (3) tree-shaking plus efficace, (4) courbe d'apprentissage reduite. C'est le mode par defaut depuis Angular 17. Les NgModules restent supportes mais sont deconseilles pour les nouveaux projets.

</details>

### Q4 (Mid) : Explique les deux stratégies de change detection : Default et OnPush.

<details><summary>Reponse</summary>

**Default** : Angular vérifié TOUT l'arbre de composants à chaque cycle (event, timer, HTTP). Utilise zone.js pour intercepter les operations async et declencher la detection.

**OnPush** : le composant n'est vérifié que si (1) une `@Input` référence change (shallow check), (2) un event est emis DANS le composant, (3) un Observable utilise avec `async` pipe emet, (4) `markForCheck()` est appele manuellement.

OnPush reduit drastiquement les verifications. Piege : muter un objet Input sans changer sa référence ne declenche PAS la detection — il faut créer un nouvel objet. Avec les signals Angular (v16+), la change detection devient encore plus granulaire et zone.js pourra etre retire.

</details>

### Q5 (Mid) : Quels sont les operateurs RxJS essentiels pour un projet Angular ?

<details><summary>Reponse</summary>

- **Transformation** : `map`, `switchMap` (annule le précédent — recherche), `mergeMap` (parallele — sauvegardes), `concatMap` (sequentiel — ordre garanti), `exhaustMap` (ignore les nouveaux — soumission formulaire).
- **Filtrage** : `filter`, `distinctUntilChanged`, `debounceTime` (input search), `take(1)`.
- **Combinaison** : `combineLatest` (dernière valeur de chaque), `forkJoin` (attendre tous les completes), `withLatestFrom`.
- **Erreurs** : `catchError`, `retry`, `retryWhen`.
- **Gestion** : `tap` (side effects debug), `shareReplay` (multicast + cache), `takeUntilDestroyed()` (unsubscribe automatique Angular 16+).

La regle d'or : `switchMap` pour les lectures, `concatMap` pour les ecritures, `exhaustMap` pour les soumissions.

</details>

### Q6 (Mid) : Comment fonctionnent les interceptors HTTP ?

<details><summary>Reponse</summary>

Les interceptors sont des middleware qui interceptent chaque requête/réponse HTTP. Cas d'usage : ajouter un token auth, logger, gérer les erreurs, afficher un loader. Depuis Angular 15+, on utilise des **interceptors fonctionnels** :

```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(cloned).pipe(catchError(err => { /* handle 401 */ }));
};
// dans la config : provideHttpClient(withInterceptors([authInterceptor]))
```

L'ordre dans le tableau définit la chaine d'exécution. On peut court-circuiter la chaine en retournant un Observable sans appeler `next()`.

</details>

### Q7 (Mid) : Qu'est-ce que `@defer` et comment ça fonctionne ?

<details><summary>Reponse</summary>

`@defer` (Angular 17+) permet le lazy loading declaratif dans les templates :

```html
@defer (on viewport) {
  <heavy-component />
} @loading (minimum 300ms) {
  <spinner />
} @placeholder {
  <p>Contenu a venir</p>
} @error {
  <p>Erreur de chargement</p>
}
```

Triggers disponibles : `on viewport`, `on interaction`, `on hover`, `on idle`, `on timer(5s)`, `when condition`. Le bundle JS du composant n'est telecharge que quand le trigger se declenche. C'est du code splitting automatique au niveau template, sans `loadComponent()` manuel. Ideal pour les composants below-the-fold, les dashboards lourds, les modals.

</details>

### Q8 (Senior) : Explique les Angular Signals et comment ils changent l'architecture.

<details><summary>Reponse</summary>

Les Signals (v16+) sont des primitives réactives synchrones : `signal()` (valeur writable), `computed()` (dérivé, lazy, cache), `effect()` (side effect). Contrairement a RxJS (push-based, async), les signals sont pull-based et synchrones — le framework sait exactement quels composants sont dirty.

Impact : (1) Change detection granulaire sans zone.js — seuls les composants dont les signals ont change sont re-rendus. (2) `input()`, `output()`, `viewChild()` comme signals pour une API réactive unifiee. (3) Terme : zoneless Angular (experimental v18). (4) RxJS reste pertinent pour les flux async complexes, mais les cas simples (state local, dérivés) migrent vers les signals. A terme, `toSignal(obs$)` et `toObservable(signal)` assurent l'interop.

</details>

### Q9 (Senior) : Zone.js vs Zoneless : quel est le mécanisme et pourquoi s'en debarrasser ?

<details><summary>Reponse</summary>

Zone.js monkey-patche TOUTES les API async du navigateur (`setTimeout`, `Promise`, `addEventListener`, `XMLHttpRequest`, `fetch`...) pour créer des "zones" d'exécution. Angular utilise `NgZone` pour savoir quand une operation async se termine et declencher la change detection globale. Problemes : (1) cout de patching (~100KB), (2) detection trop large (TOUT event declenche une vérification de tout l'arbre), (3) incompatibilite avec certaines libs/API (async/await natif, Web Workers).

Le mode zoneless (experimental v18, stable prévu v19) repose sur les signals : quand un signal change, Angular sait precisement quel composant re-vérifier. Plus besoin de zone.js. Migration : remplacer les observables simples par des signals, utiliser `provideExperimentalZonelessChangeDetection()`, retirer zone.js du polyfills.

</details>

### Q10 (Senior) : NgRx vs simple signals : quand utiliser un state management complexe ?

<details><summary>Reponse</summary>

**Signals suffisent quand** : state local ou partage simple, peu d'effets de bord, équipe petite, logique CRUD classique. Pattern : services avec signals + computed, `linkedSignal` pour les dérivés.

**NgRx/NgRx SignalStore quand** : (1) state complexe avec beaucoup d'entites normalisees, (2) besoin de devtools time-travel, (3) effets de bord complexes (retry, race conditions), (4) équipe large ou le pattern Redux impose une structure, (5) undo/redo, (6) synchronisation offline.

NgRx SignalStore (v17+) est le compromis : structure de store NgRx avec des signals au lieu de selectors RxJS. Plus leger que le store Redux classique mais plus structure que des signals bruts. La tendance Angular est vers moins de boilerplate : signals d'abord, NgRx SignalStore pour les cas complexes, NgRx Store classique seulement pour les apps enterprise existantes.

</details>

---

## NestJS

### Q1 (Junior) : Comment fonctionne le système de modules dans NestJS ?

<details><summary>Reponse</summary>

Chaque module est une classe decoree `@Module()` qui declare : `imports` (modules dont on a besoin), `controllers` (routes), `providers` (services injectables), `exports` (providers exposes aux modules importateurs). Le `AppModule` est la racine. Les modules encapsulent leur logique — un provider n'est accessible hors du module que s'il est exporte. `@Global()` rend un module disponible partout sans import explicite (utiliser avec parcimonie). Ce système est directement inspire d'Angular et permet une architecture modulaire et testable.

</details>

### Q2 (Junior) : Quelle est la différence entre middleware, guard, interceptor et pipe ?

<details><summary>Reponse</summary>

Ordre d'exécution : **Middleware** → **Guard** → **Interceptor (avant)** → **Pipe** → **Handler** → **Interceptor (après)** → **Exception Filter**.

- **Middleware** : acces a `req/res/next`, comme Express. Logging, CORS, body parsing.
- **Guard** : retourne `true/false` pour autoriser l'acces. Authentification, roles, permissions.
- **Interceptor** : wrappe l'exécution du handler. Transformation de réponse, caching, logging, timeout.
- **Pipe** : transforme/valide les paramètres d'entree. `ValidationPipe` avec class-validator, `ParseIntPipe`.

Regle : guards pour le "qui a le droit", pipes pour le "est-ce que les donnees sont valides", interceptors pour le "comment transformer le flux".

</details>

### Q3 (Junior) : Qu'est-ce que l'injection de dépendances dans NestJS et quels sont les scopes ?

<details><summary>Reponse</summary>

NestJS utilise un conteneur IoC. On decore une classe avec `@Injectable()` et on la declare en `providers`. Le framework resout automatiquement les dépendances via le constructeur.

3 scopes : (1) **DEFAULT** (singleton) : une instance partagee dans toute l'app — le plus performant et le plus courant. (2) **REQUEST** : nouvelle instance par requête HTTP — utile pour le contexte utilisateur, multi-tenant. (3) **TRANSIENT** : nouvelle instance à chaque injection — utile pour les services stateful non partageables.

Attention : un provider REQUEST remonte en "bulle" — tout provider qui l'injecte devient aussi REQUEST-scoped, ce qui impacte les performances. Utiliser avec parcimonie.

</details>

### Q4 (Mid) : Comment gérer les relations avec TypeORM dans NestJS ?

<details><summary>Reponse</summary>

Relations via decorateurs : `@OneToMany`, `@ManyToOne`, `@ManyToMany`, `@OneToOne`. Exemple :

```ts
@Entity()
class Article {
  @ManyToOne(() => User, user => user.articles)
  author: User;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];
}
```

Points clés : `@JoinTable()` cote proprietaire pour ManyToMany. `eager: true` charge automatiquement (deconseille — N+1). Preferer le chargement explicite via `relations: ['author']` dans `find()` ou `QueryBuilder` pour le controle. Cascades (`cascade: ['insert', 'update']`) pour la persistence transitive. Toujours utiliser des transactions pour les operations multi-entites.

</details>

### Q5 (Mid) : Comment implementer le caching dans NestJS ?

<details><summary>Reponse</summary>

NestJS fournit `@nestjs/cache-manager`. Configuration :

```ts
CacheModule.register({ store: redisStore, host: 'localhost', ttl: 60 })
```

Niveaux de cache : (1) **Interceptor global** : `CacheInterceptor` cache automatiquement les GET. (2) **Decorateur** : `@CacheTTL(30)` et `@CacheKey('custom')` par route. (3) **Manuel** : `this.cacheManager.get/set/del()` dans les services pour un controle fin.

Pour les apps serieuses : Redis comme store (partage entre instances), invalidation via events/patterns, cache-aside pattern dans les services. Piege : le `CacheInterceptor` auto ne géré pas l'invalidation — préférer le cache manuel avec invalidation explicite dans les mutations.

</details>

### Q6 (Mid) : Comment mettre en place une queue de jobs avec Bull dans NestJS ?

<details><summary>Reponse</summary>

```ts
// module
@Module({ imports: [BullModule.registerQueue({ name: 'email' })] })

// producer (service)
constructor(@InjectQueue('email') private queue: Queue) {}
async sendWelcome(userId: string) {
  await this.queue.add('welcome', { userId }, { attempts: 3, backoff: 5000 });
}

// consumer (processor)
@Processor('email')
class EmailProcessor {
  @Process('welcome')
  async handleWelcome(job: Job<{ userId: string }>) { /* ... */ }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) { /* alerting */ }
}
```

Points clés : Redis requis (backend Bull). Options : `delay`, `priority`, `repeat` (cron), `removeOnComplete`. Toujours configurer `attempts` + `backoff` pour la résilience. Monitorer avec Bull Board ou Arena.

</details>

### Q7 (Senior) : Explique le pattern CQRS dans NestJS. Quand l'utiliser ?

<details><summary>Reponse</summary>

CQRS separe les lectures (queries) des ecritures (commands). NestJS fournit `@nestjs/cqrs` :

- **Commands** : `CreateOrderCommand` → `CreateOrderHandler` (@CommandHandler) → modifie l'état, publie des events.
- **Queries** : `GetOrderQuery` → `GetOrderHandler` (@QueryHandler) → lecture seule, peut utiliser un modèle de lecture optimise.
- **Events** : `OrderCreatedEvent` → `OrderCreatedHandler` (@EventsHandler) → side effects (email, cache invalidation, projections).

Quand l'utiliser : domaine metier complexe, besoins de scaling asymetrique lecture/écriture, event sourcing, audit trail. Quand NE PAS l'utiliser : CRUD simple — la complexite n'est pas justifiee. Le CQRS brille avec l'event sourcing ou les modèles de lecture sont des projections reconstruites depuis les events.

</details>

### Q8 (Senior) : Comment architecturer des microservices avec NestJS ?

<details><summary>Reponse</summary>

NestJS supporte plusieurs transports : TCP, Redis, NATS, RabbitMQ, Kafka, gRPC. Pattern :

```ts
// microservice
const app = await NestFactory.createMicroservice(AppModule, {
  transport: Transport.RMQ,
  options: { urls: ['amqp://localhost'], queue: 'orders' }
});

// dans le controller
@MessagePattern('create_order') // request-reply
handleCreate(data: CreateOrderDto) { ... }

@EventPattern('order_created') // fire-and-forget
handleEvent(data: OrderEvent) { ... }
```

Architecture : API Gateway (HTTP) → microservices via message broker. Chaque service a sa propre DB (database per service). Communication : synchrone (`@MessagePattern` + `client.send()`) pour les requêtes, asynchrone (`@EventPattern` + `client.emit()`) pour les events. Patterns essentiels : saga pour les transactions distribuees, circuit breaker pour la résilience, outbox pattern pour la coherence event/DB.

</details>

### Q9 (Senior) : Comment implementer un resolver GraphQL avec NestJS et gérer le problème N+1 ?

<details><summary>Reponse</summary>

```ts
@Resolver(() => Article)
class ArticleResolver {
  @Query(() => [Article])
  articles() { return this.service.findAll(); }

  @ResolveField(() => User)
  author(@Parent() article: Article) {
    return this.userService.findById(article.authorId); // N+1 !
  }
}
```

Le N+1 : pour 100 articles, `author` est appele 100 fois. Solution : **DataLoader** — batch les appels dans la même tick :

```ts
@ResolveField(() => User)
author(@Parent() article: Article, @Context() ctx) {
  return ctx.loaders.user.load(article.authorId);
  // DataLoader regroupe les IDs et fait UN seul SELECT ... WHERE id IN (...)
}
```

Le DataLoader doit etre scope par requête (pas singleton). Dans NestJS, utiliser `@nestjs/dataloader` ou créer un provider REQUEST-scoped. Autres optimisations : `@nestjs/graphql` complexity plugin pour limiter la profondeur des queries, persisted queries pour le cache.

</details>

### Q10 (Senior) : Comment gérer les transactions et la coherence des donnees dans une architecture NestJS ?

<details><summary>Reponse</summary>

**Monolithe** : `QueryRunner` de TypeORM pour les transactions ACID :

```ts
const qr = dataSource.createQueryRunner();
await qr.startTransaction();
try {
  await qr.manager.save(Order, order);
  await qr.manager.save(Payment, payment);
  await qr.commitTransaction();
} catch { await qr.rollbackTransaction(); }
finally { await qr.release(); }
```

**Microservices** : pas de transaction distribuee simple. Patterns : (1) **Saga orchestrateur** : un service central orchestre les étapes et les compensations. (2) **Saga choregraphie** : chaque service ecoute les events et reagit. (3) **Outbox pattern** : écrire l'event dans la même transaction que la donnee, un poller publie les events — garantit la coherence. (4) **Idempotency key** : chaque operation à un ID unique pour gérer les retries sans duplication.

</details>

---

## PostgreSQL

### Q1 (Junior) : Qu'est-ce que MVCC et pourquoi c'est important ?

<details><summary>Reponse</summary>

MVCC (Multi-Version Concurrency Control) est le mécanisme qui permet a PostgreSQL de gérer les acces concurrents sans verrouillage excessif. Chaque transaction voit un **snapshot** coherent de la base au moment de son démarrage. Les modifications creent de nouvelles versions des lignes (marquees avec `xmin`/`xmax`) au lieu d'ecraser les anciennes. Résultat : les lecteurs ne bloquent jamais les ecrivains et vice-versa. Le cout : les anciennes versions s'accumulent (tuples "dead") et doivent etre nettoyees par **VACUUM**. `autovacuum` le fait automatiquement, mais il faut le monitorer sur les tables a forte écriture.

</details>

### Q2 (Junior) : Quels sont les types d'index principaux et quand les utiliser ?

<details><summary>Reponse</summary>

- **B-tree** (defaut) : egalite, range, tri, LIKE 'prefix%'. 90% des cas.
- **Hash** : egalite stricte uniquement. Rarement utilise (B-tree fait aussi bien).
- **GIN** (Generalized Inverted Index) : full-text search, JSONB (`@>`, `?`), tableaux, trgm. Ideal pour les recherches "contient".
- **GiST** (Generalized Search Tree) : donnees geometriques, ranges, full-text (avec ranking). PostGIS.
- **BRIN** (Block Range Index) : donnees physiquement ordonnees (timestamps, IDs sequences). Très compact.

Regle : B-tree par defaut. GIN pour les recherches dans du JSONB ou du texte. GiST pour le spatial. BRIN pour les tables append-only avec colonnes correlees au stockage physique.

</details>

### Q3 (Junior) : Qu'est-ce qu'un `EXPLAIN ANALYZE` et comment le lire ?

<details><summary>Reponse</summary>

`EXPLAIN` montre le plan d'exécution prévu par le query planner. `ANALYZE` exécuté réellement la requête et ajoute les temps réels. A lire :

- **Seq Scan** : parcours complet de la table — OK sur petites tables, problème sur les grosses.
- **Index Scan** / **Index Only Scan** : utilisation d'un index. "Only" = pas besoin d'aller lire la table (covering index).
- **Nested Loop / Hash Join / Merge Join** : stratégies de jointure.
- **cost=X..Y** : estimation (start..total). **actual time** : temps réel en ms.
- **rows** : estimation vs réel — un ecart important indique des statistiques obsoletes (`ANALYZE table`).

Chercher : les Seq Scan sur les grandes tables, les ecarts estimation/réel, les Sort en mémoire vs sur disque.

</details>

### Q4 (Mid) : Explique les niveaux d'isolation des transactions.

<details><summary>Reponse</summary>

- **Read Uncommitted** : en PostgreSQL, équivalent a Read Committed (PG ne supporte pas les dirty reads).
- **Read Committed** (defaut) : chaque instruction voit les commits effectues avant son debut. Deux SELECT dans la même transaction peuvent voir des donnees différentes si un commit intervient entre les deux.
- **Repeatable Read** : la transaction voit un snapshot fixe du debut. Pas de non-repeatable reads. En PG, protege aussi contre les phantom reads. Echoue avec une erreur de serialisation si un conflit est détecté.
- **Serializable** : garantit que le résultat est équivalent à une exécution sequentielle. Utilise le SSI (Serializable Snapshot Isolation). Performance : quelques % de moins, mais retries nécessaires en cas de conflit.

Regle : Read Committed pour la majorite des cas. Serializable pour les operations financieres ou la coherence est critique.

</details>

### Q5 (Mid) : Comment fonctionnent les window functions ? Donne des exemples.

<details><summary>Reponse</summary>

Les window functions calculent une valeur sur un ensemble de lignes liees à la ligne courante, sans reduire le nombre de lignes (contrairement a `GROUP BY`) :

```sql
SELECT name, department, salary,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank,
  salary - AVG(salary) OVER (PARTITION BY department) as ecart_moyenne,
  SUM(salary) OVER (ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as cumul
FROM employees;
```

Fonctions courantes : `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, `LEAD()`, `FIRST_VALUE()`, `NTH_VALUE()`. Le frame (`ROWS BETWEEN...`) définit la fenêtre de calcul. Cas d'usage : classements, moyennes mobiles, cumuls, comparaison avec la ligne précédente/suivante, deduplication (`ROW_NUMBER` + `WHERE rn = 1`).

</details>

### Q6 (Mid) : Qu'est-ce qu'une CTE et quand utiliser `WITH RECURSIVE` ?

<details><summary>Reponse</summary>

Une CTE (Common Table Expression) est une sous-requête nommee definie avec `WITH`. Avantages : lisibilite, reutilisation dans la même requête, isolation logique.

```sql
WITH RECURSIVE tree AS (
  SELECT id, name, parent_id, 0 as depth
  FROM categories WHERE parent_id IS NULL          -- ancre
  UNION ALL
  SELECT c.id, c.name, c.parent_id, t.depth + 1
  FROM categories c JOIN tree t ON c.parent_id = t.id  -- recursion
)
SELECT * FROM tree;
```

`WITH RECURSIVE` : indispensable pour les hierarchies (arbre de categories, organigramme, BOM), les graphes, la génération de series. Attention : toujours avoir une condition de terminaison. PostgreSQL 14+ supporte `SEARCH` et `CYCLE` pour détecter les cycles. Les CTE sont par defaut **materialisees** en PG 12+, sauf si le planner decide autrement (où `NOT MATERIALIZED`).

</details>

### Q7 (Senior) : Explique le partitioning dans PostgreSQL. Types, avantages, pieges.

<details><summary>Reponse</summary>

Le partitioning découpé une table logique en partitions physiques. Types : **RANGE** (dates, IDs — le plus courant), **LIST** (regions, statuts), **HASH** (distribution uniforme).

```sql
CREATE TABLE events (id bigint, created_at timestamptz, data jsonb)
PARTITION BY RANGE (created_at);
CREATE TABLE events_2025_q1 PARTITION OF events
  FOR VALUES FROM ('2025-01-01') TO ('2025-04-01');
```

Avantages : (1) **partition pruning** — le planner n'interroge que les partitions pertinentes. (2) `DROP` d'une partition est instantane vs `DELETE` massif. (3) Maintenance ciblee (VACUUM, REINDEX par partition). (4) Tablespaces différents (SSD pour le recent, HDD pour l'archive).

Pieges : les index doivent etre crees sur chaque partition (où automatiques depuis PG 11). Les foreign keys vers une table partitionnee ne sont supportees que depuis PG 12. Les UPDATE qui changent la clé de partition deplacent la ligne entre partitions (cout). Pas de partition automatique — il faut créer les futures partitions (cron ou pg_partman).

</details>

### Q8 (Senior) : Comment diagnostiquer et résoudre un deadlock ?

<details><summary>Reponse</summary>

Un deadlock survient quand deux transactions s'attendent mutuellement. PG le détecté en ~1s (`deadlock_timeout`) et annule une des transactions.

Diagnostic : (1) logs PG (`log_lock_waits = on`, `deadlock_timeout = 1s`) montrent les requêtes impliquees. (2) `pg_stat_activity` pour les sessions bloquees. (3) `pg_locks` joint a `pg_stat_activity` pour visualiser le graphe de verrous.

Prevention : (1) **Ordonner les acces** : toujours acquerir les verrous dans le même ordre (ex: par ID croissant). (2) Reduire la duree des transactions. (3) Utiliser `SELECT ... FOR UPDATE SKIP LOCKED` pour les queues. (4) `NOWAIT` pour echouer immediatement au lieu d'attendre. (5) Advisory locks pour le controle applicatif. (6) Serializable isolation qui transforme les deadlocks en erreurs de serialisation (plus previsible).

</details>

### Q9 (Senior) : Connection pooling : pourquoi, comment, et quel outil ?

<details><summary>Reponse</summary>

Chaque connexion PG est un processus OS (~10MB RAM). A 500 connexions = 5GB juste pour les processus + context switching. Le pooling mutualise un petit nombre de connexions backend entre de nombreux clients.

**PgBouncer** (le standard) — 3 modes : (1) **Session** : mapping 1:1 pendant la session client (le moins efficace). (2) **Transaction** : la connexion backend est liberee entre les transactions (le meilleur compromis). (3) **Statement** : liberee après chaque requête (incompatible avec les transactions multi-statement).

Dimensionnement : `max_connections` PG = nombre de coeurs * 2-3 (souvent 50-100). PgBouncer devant peut gérer des milliers de clients. Alternatives : Odyssey (multi-thread), PgCat (Rust, load balancing), Supavisor. En cloud : RDS Proxy, Neon pooler.

Pieges : mode transaction incompatible avec les prepared statements (par defaut), `SET` session-level, `LISTEN/NOTIFY`. Workaround : `server_reset_query`.

</details>

### Q10 (Senior) : Comment optimiser une requête qui fait un Seq Scan sur 100M de lignes ?

<details><summary>Reponse</summary>

Demarche systematique : (1) `EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)` pour le plan réel + I/O. (2) Vérifier les statistiques : `ANALYZE table` si les estimations sont fausses. (3) **Index** : créer un index sur les colonnes du WHERE/JOIN/ORDER BY. Index partiel (`WHERE status = 'active'`) si la selectivite est bonne. Index covering (`INCLUDE`) pour un Index Only Scan. (4) **Partitioning** si la requête filtre sur une dimension (date). (5) **Materialised view** pour les aggregations frequentes. (6) Vérifier `work_mem`, `effective_cache_size`, `random_page_cost` (SSD = 1.1, HDD = 4). (7) Parallelisme : `max_parallel_workers_per_gather`. (8) Denormaliser / pre-calculer si la lecture domine. (9) En dernier recours : `pg_hint_plan` pour forcer un plan.

</details>

---

## Testing

### Q1 (Junior) : Qu'est-ce que la pyramide des tests ?

<details><summary>Reponse</summary>

La pyramide définit la proportion ideale de tests par niveau : beaucoup de **tests unitaires** (rapides, isoles, peu couteux) à la base, moins de **tests d'intégration** (interactions entre modules, DB, API) au milieu, et peu de **tests end-to-end** (parcours utilisateur complet, navigateur) au sommet. Rationale : plus on monte, plus les tests sont lents, fragiles et couteux a maintenir. Variante moderne (Testing Trophy de Kent C. Dodds) : met l'accent sur les tests d'intégration qui offrent le meilleur ratio confiance/cout. L'important : pas un dogme, adapter au projet.

</details>

### Q2 (Junior) : Quelle est la différence entre TDD et BDD ?

<details><summary>Reponse</summary>

**TDD** (Test-Driven Development) : cycle Red-Green-Refactor. Écrire un test qui echoue → écrire le code minimal pour le faire passer → refactorer. Focus technique, tests unitaires.

**BDD** (Behavior-Driven Development) : écrit les spécifications en langage naturel (Given/When/Then) avant le code. Focus sur le comportement metier, comprehensible par les non-devs. Outils : Cucumber, Gherkin. En pratique, BDD est du TDD avec une couche de spécification lisible. Les deux encouragent le "test first" mais BDD ameliore la communication avec les stakeholders.

</details>

### Q3 (Junior) : Quelles sont les stratégies de mocking et quand les utiliser ?

<details><summary>Reponse</summary>

- **Mock** : remplace un objet avec des attentes de comportement. On vérifié que certaines méthodes sont appelees avec certains arguments. `jest.fn()`, `vi.fn()`.
- **Stub** : retourne des valeurs predefinies sans vérifier les appels. Plus simple.
- **Spy** : observe les appels sans remplacer l'implementation (où partiellement). `jest.spyOn()`.
- **Fake** : implementation simplifiee fonctionnelle (in-memory DB, fake server).

Quand mocker : dépendances externes (API, DB, filesystem), code lent, code non-déterministe (dates, random). Quand NE PAS mocker : la logique metier elle-même, les fonctions pures. Sur-mocker = tester l'implementation au lieu du comportement → tests fragiles.

</details>

### Q4 (Mid) : Qu'est-ce que le test isolation et pourquoi c'est crucial ?

<details><summary>Reponse</summary>

Chaque test doit etre independant : son résultat ne doit pas dépendre de l'ordre d'exécution ou de l'état laisse par un autre test. Stratégies : (1) `beforeEach` pour reinitialiser l'état (reset DB, clear mocks). (2) Transactions rollbackees pour les tests DB. (3) Fixtures fraiches par test (factory pattern). (4) Pas de state partage mutable entre tests. (5) Conteneurs Docker ephemeres pour les dépendances.

Symptome d'un manque d'isolation : tests qui passent individuellement mais echouent en suite (où l'inverse). Le randomiser d'ordre de Vitest/Jest (`--randomize`) détecté ces problèmes. L'isolation est plus importante que la vitesse — un test non isole donne une fausse confiance.

</details>

### Q5 (Mid) : Snapshot testing : avantages et inconvenients.

<details><summary>Reponse</summary>

Le snapshot capture la sortie (HTML, JSON, objet) et la compare aux executions suivantes. Avantages : détecté les regressions visuelles/structurelles sans assertions manuelles, rapide à écrire.

Inconvenients : (1) **Faux positif massif** — un changement legitime généré des diffs enormes que les devs approuvent sans lire (`-u`). (2) Fragilite — la moindre modification de formatage casse le test. (3) Ne teste pas le comportement, seulement la structure. (4) Reviews difficiles — les fichiers .snap sont du bruit dans les PRs.

Bonnes pratiques : inline snapshots (`toMatchInlineSnapshot`) pour les petites sorties, limiter aux composants stables, toujours relire avant de mettre a jour. Preferer les assertions ciblees pour le comportement critique.

</details>

### Q6 (Mid) : Qu'est-ce que le mutation testing ?

<details><summary>Reponse</summary>

Le mutation testing évalué la qualite des tests en introduisant des mutations dans le code source (inverser un `>` en `<`, supprimer un `return`, changer `true` en `false`) et vérifié que les tests detectent ces mutations (les "tuent"). Un mutant "survivant" = un cas non teste.

Outil JS : **Stryker**. Metriques : mutation score = mutants tues / mutants totaux. Un score de couverture de 90% peut cacher un mutation score de 50% si les tests n'ont pas d'assertions significatives. C'est le meilleur indicateur de la qualite réelle des tests, mais c'est couteux en temps d'exécution (exponentiel). A utiliser sur les modules critiques, pas sur tout le codebase.

</details>

### Q7 (Senior) : Qu'est-ce que le property-based testing et quand l'utiliser ?

<details><summary>Reponse</summary>

Au lieu de tester des exemples spécifiques, on définit des **propriétés** (invariants) que le code doit respecter pour TOUTE entree, et le framework généré des centaines d'entrees aleatoires. Exemple : "pour tout tableau, `sort(sort(arr))` === `sort(arr)`" ou "pour tout user valide, `parse(serialize(user))` === `user`".

Outils : **fast-check** (JS/TS). Avantages : découvre des edge cases imprevisibles (chaaine vide, nombres negatifs, unicode, très grands inputs). Le shrinking reduit l'input en echec au cas minimal reproductible.

Quand l'utiliser : fonctions pures, serialisation/deserialisation, parsers, algorithmes, validateurs. Complementaire aux tests par exemples — pas un remplacement. Particulierement puissant pour les fonctions mathematiques et les encoders/decoders.

</details>

### Q8 (Senior) : Qu'est-ce que le contract testing et comment ça s'intégré dans une architecture microservices ?

<details><summary>Reponse</summary>

Le contract testing vérifié que le **contrat** (schema requête/réponse) entre un consumer et un provider est respecte par les deux parties, sans les déployer ensemble.

Outil standard : **Pact**. Flow : (1) Le consumer écrit un test qui définit ses attentes (requêtes et réponses attendues) → généré un fichier "pact" (contrat). (2) Le provider exécuté ses tests contre ce contrat → vérifié qu'il repond correctement. Le Pact Broker centralise les contrats et les résultats.

Avantages vs tests e2e inter-services : rapide (pas de déploiement), isole, détecté les breaking changes avant le merge. Chaque équipe teste independamment. Patterns : consumer-driven contracts (le consumer définit ses besoins) vs provider-driven (OpenAPI spec comme source de verite). Ideal en CI pour bloquer les merges qui cassent un contrat.

</details>

### Q9 (Senior) : Comment tester efficacement un composant React/Vue avec des dépendances complexes ?

<details><summary>Reponse</summary>

Principes : (1) **Tester le comportement, pas l'implementation** — `@testing-library` : interagir comme un utilisateur (cliquer, taper, lire le texte visible). (2) **Niveau d'intégration optimal** : rendre le composant avec ses enfants réels, mocker uniquement les frontieres (API calls, router, store global). (3) `msw` (Mock Service Worker) pour intercepter les appels réseau au niveau network — plus realiste que mocker `fetch`. (4) Factory functions pour les props/fixtures. (5) `userEvent` au lieu de `fireEvent` (simule les events intermédiaires). (6) Pour les composants avec state global : fournir un wrapper avec un store de test pre-configure. (7) Éviter de tester les details d'implementation (classes CSS, structure DOM interne). (8) Tests visuels avec Storybook + Chromatic pour les regressions CSS.

</details>

### Q10 (Senior) : Comment mettre en place une stratégie de test pour une app fullstack ? Proportions, outils, CI.

<details><summary>Reponse</summary>

**Proportions recommandees** : ~60% unitaires, ~25% intégration, ~10% e2e, ~5% visual/contract.

**Stack outils** : Vitest (unit/intégration — rapide, ESM natif), Testing Library (composants), MSW (mocks API), Playwright (e2e cross-browser), Stryker (mutation), Pact (contract), Chromatic/Percy (visual regression).

**CI pipeline** : (1) Pre-commit : lint + unit tests affectes (vitest --changed). (2) PR : unit + intégration complets, build, type-check. (3) Merge : e2e complets, visual regression, mutation testing sur les fichiers modifies. (4) Nightly : e2e exhaustifs, performance tests, security scans.

**Metriques** : coverage > 80% (pas un objectif en soi), mutation score sur le code critique, flaky test rate < 1%, temps de CI < 10 min pour le feedback PR. Automatiser les rapports dans les PRs (codecov, playwright report).

</details>

---

## HTTP / Caching

### Q1 (Junior) : Quelles sont les principales directives de `Cache-Control` ?

<details><summary>Reponse</summary>

- `public` : cacheable par tous (CDN, proxy, navigateur).
- `private` : cacheable uniquement par le navigateur (donnees user-spécifiques).
- `no-cache` : le cache doit revalider aupres du serveur avant d'utiliser la réponse (NE signifie PAS "pas de cache").
- `no-store` : ne rien stocker du tout (donnees sensibles).
- `max-age=N` : duree de fraicheur en secondes.
- `s-maxage=N` : comme max-age mais uniquement pour les caches partages (CDN).
- `must-revalidate` : une fois perime, DOIT revalider (pas de stale).
- `immutable` : ne jamais revalider (assets avec hash dans le nom).
- `stale-while-revalidate=N` : servir le stale pendant N secondes tout en revalidant en arriere-plan.

</details>

### Q2 (Junior) : Comment fonctionnent les ETag et les requêtes conditionnelles ?

<details><summary>Reponse</summary>

L'ETag est un identifiant de version d'une ressource (hash du contenu ou version). Flow : (1) Premiere requête → réponse avec `ETag: "abc123"`. (2) Requête suivante → le client envoie `If-None-Match: "abc123"`. (3) Si la ressource n'a pas change → serveur repond `304 Not Modified` (pas de body). (4) Si change → `200` avec le nouveau contenu et nouveau ETag.

Equivalent temporel : `Last-Modified` / `If-Modified-Since` (précision à la seconde, moins fiable). Les ETags sont plus précis. Avantage : economise la bande passante et le temps de rendu cote client. Le navigateur conserve la version en cache et la reutilise si le serveur confirme qu'elle est toujours valide.

</details>

### Q3 (Junior) : Explique CORS en detail. Pourquoi existe-t-il ?

<details><summary>Reponse</summary>

CORS (Cross-Origin Resource Sharing) est un mécanisme de sécurité du navigateur qui bloque les requêtes vers un domaine différent de celui de la page (Same-Origin Policy). Le serveur declare explicitement quels origines, méthodes et headers sont autorises.

**Requetes simples** (GET, POST avec content-type standard) : le navigateur envoie directement avec un header `Origin`, le serveur repond avec `Access-Control-Allow-Origin`.

**Requetes preflightees** (PUT, DELETE, headers custom) : le navigateur envoie d'abord un `OPTIONS` avec `Access-Control-Request-Method` et `Access-Control-Request-Headers`. Le serveur repond avec les `Access-Control-Allow-*`. Si OK, la vraie requête part.

Headers clés : `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, `Access-Control-Allow-Headers`, `Access-Control-Allow-Credentials` (cookies), `Access-Control-Max-Age` (cache du preflight).

</details>

### Q4 (Mid) : Quelles sont les différences entre HTTP/2 et HTTP/3 ?

<details><summary>Reponse</summary>

**HTTP/2** (sur TCP+TLS) : multiplexing (plusieurs requêtes sur une connexion), header compression (HPACK), server push, priorisation des streams. Problème : le **head-of-line blocking TCP** — si un paquet est perdu, TOUS les streams sont bloques.

**HTTP/3** (sur QUIC/UDP) : resout le HOL blocking car QUIC géré les streams independamment — une perte sur un stream ne bloque pas les autres. Handshake 0-RTT (connexion + TLS en un aller-retour). Migration de connexion (changement de réseau sans reconnexion — ideal mobile). Header compression QPACK.

Impact pratique : HTTP/3 est meilleur sur les réseaux instables (mobile, WiFi). Pour les réseaux stables, la différence est minime. Les deux eliminent le besoin de domain sharding, sprites CSS, et concatenation de fichiers.

</details>

### Q5 (Mid) : Explique le handshake TLS 1.3.

<details><summary>Reponse</summary>

TLS 1.3 reduit le handshake a **1 RTT** (contre 2 en TLS 1.2) :

1. **ClientHello** : le client envoie les cipher suites supportees ET ses clés publiques DH (key shares) pour les groupes probables.
2. **ServerHello** : le serveur choisit le cipher, envoie sa key share, le certificat, et finit le handshake — tout chiffre des ce message.
3. Les deux parties calculent le secret partage et derivent les clés de session.

**0-RTT** (resumption) : si le client a déjà communique avec le serveur, il peut envoyer des donnees applicatives dans le premier message (risque de replay — uniquement pour les requêtes idempotentes).

Ameliorations vs 1.2 : cipher suites reduites (suppression RSA key exchange, CBC, SHA-1), forward secrecy obligatoire (ephemeral DH uniquement), handshake chiffre (le certificat n'est plus visible en clair).

</details>

### Q6 (Mid) : Qu'est-ce que CSP (Content Security Policy) et comment le configurer ?

<details><summary>Reponse</summary>

CSP est un header HTTP qui declare les sources autorisees pour chaque type de ressource, bloquant les injections XSS et le data exfiltration :

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-abc123';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https://cdn.example.com;
  connect-src 'self' https://api.example.com;
  frame-ancestors 'none';
  report-uri /csp-report;
```

Directives clés : `default-src` (fallback), `script-src` (JS), `style-src` (CSS), `connect-src` (fetch/XHR/WS), `frame-ancestors` (remplace X-Frame-Options). Éviter `'unsafe-inline'` et `'unsafe-eval'` pour les scripts — utiliser des nonces ou des hashes SHA256. `report-uri` ou `report-to` pour le monitoring des violations. Commencer en mode `Content-Security-Policy-Report-Only` pour tester sans bloquer.

</details>

### Q7 (Senior) : Quelles sont les stratégies d'invalidation de cache et leurs compromis ?

<details><summary>Reponse</summary>

L'invalidation de cache est un des problèmes les plus difficiles en informatique. Stratégies :

1. **TTL-based** : `max-age=3600`. Simple mais les clients voient du stale pendant toute la duree. Compromis : fraicheur vs performance.
2. **Fingerprinting** (cache-busting) : hash dans le nom de fichier (`app.a1b2c3.js` + `immutable`). Parfait pour les assets statiques — cache infini, changement = nouvelle URL.
3. **Purge/Ban API** : API du CDN pour invalider specifiquement (`PURGE /api/products/42`). Varnish, Fastly, CloudFront. Complexite : propager le purge a tous les edge nodes.
4. **Surrogate keys / tags** : tagguer les réponses (`Surrogate-Key: product-42 category-5`) et invalider par tag. Un changement de produit purge toutes les pages qui le contiennent.
5. **Stale-while-revalidate** : servir le stale immediatement, revalider en background. Meilleur UX, coherence eventuelle.
6. **Event-driven** : un webhook/event declenche l'invalidation quand les donnees changent.

Regle : fingerprinting pour les assets, surrogate keys pour les pages dynamiques, SWR pour l'UX.

</details>

### Q8 (Senior) : Comment fonctionne le CDN edge caching en detail ?

<details><summary>Reponse</summary>

Un CDN distribue du contenu sur des serveurs (PoPs — Points of Presence) proches des utilisateurs. Flow : (1) Le client resout le DNS → le CDN retourne l'IP du PoP le plus proche (anycast ou GeoDNS). (2) Le edge vérifié son cache local. Cache hit → réponse immediate. Cache miss → requête vers l'**origin shield** (cache intermédiaire, optionnel) ou directement l'origin. (3) La réponse est cachee au edge selon les headers `Cache-Control`.

Architecture avancee : **tiered caching** (edge → shield → origin) reduit la charge sur l'origin. **Edge compute** (Cloudflare Workers, Lambda@Edge) exécuté du code au PoP. **Vary header** pour du cache par variante (Accept-Language, Accept-Encoding). **Cache key** personnalisable (inclure ou exclure query params, cookies, headers).

Pieges : cookies dans les requêtes empechent le cache CDN (`Vary: Cookie` = pas de partage). `Set-Cookie` dans les réponses aussi. Toujours separer le contenu statique du dynamique.

</details>

### Q9 (Senior) : Explique `stale-while-revalidate` et `stale-if-error` en profondeur.

<details><summary>Reponse</summary>

```
Cache-Control: max-age=60, stale-while-revalidate=300, stale-if-error=86400
```

**`stale-while-revalidate=300`** : pendant 300s après expiration du `max-age`, le cache sert la version perimee IMMEDIATEMENT au client et lance une revalidation en arriere-plan. Le prochain client recevra la version fraiche. Avantage : latence zero pour l'utilisateur, fraicheur eventuelle. Utilise par les SWR libraries (React Query, SWR de Vercel).

**`stale-if-error=86400`** : si la revalidation echoue (origin down, 5xx), le cache peut servir le stale pendant 24h. Résilience : le site reste fonctionnel même si l'origin tombe.

Support : les CDN modernes (Fastly, Cloudflare, Akamai) supportent les deux. Les navigateurs supportent SWR depuis Chrome 75+, Firefox 68+. Combinaison ideale pour les API non critiques : fraicheur rapide + résilience.

</details>

### Q10 (Senior) : Comment concevoir une stratégie de cache pour une API REST a fort trafic ?

<details><summary>Reponse</summary>

Couches de cache (de l'exterieur vers l'interieur) :

1. **CDN** : `GET /products` → `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`. Surrogate keys pour l'invalidation ciblee.
2. **API Gateway** : cache des réponses par route + query params. Vary sur `Authorization` pour les donnees personnalisees (où ne pas cacher).
3. **Application** : Redis/Memcached. Cache-aside pattern : check cache → miss → DB → store in cache → return. TTL + invalidation event-driven.
4. **Base de donnees** : materialized views, query result cache (PG 15+).

Regles : (1) Ne JAMAIS cacher les réponses avec `Set-Cookie` sur le CDN. (2) Utiliser `private` pour les donnees user-specific. (3) `Vary` avec parcimonie — chaque variante est une entree cache distincte. (4) ETags pour les requêtes conditionnelles sur les collections paginantes. (5) `Cache-Control: no-store` pour les donnees sensibles (solde bancaire). (6) Monitoring : cache hit ratio > 90% au CDN, mesurer le TTFB origin vs edge.

</details>

---

## Observability

### Q1 (Junior) : Quels sont les 3 piliers de l'observabilité ?

<details><summary>Reponse</summary>

1. **Logs** : enregistrements textuels/structures d'événements. Qui, quoi, quand. Format structure (JSON) avec correlation ID. Niveaux : DEBUG, INFO, WARN, ERROR. Outils : ELK Stack, Loki, CloudWatch Logs.

2. **Metriques** : valeurs numériques agregees dans le temps. Latence, taux d'erreur, debit, saturation. Couteuses en stockage mais requêtes rapides. Outils : Prometheus, Datadog, CloudWatch Metrics.

3. **Traces** : suivi d'une requête a travers les services. Chaque service ajoute un span (operation) lie par un trace ID commun. Visualisation en waterfall. Outils : Jaeger, Zipkin, Tempo.

Les 3 sont complementaires : une alerte sur une metrique → traces pour identifier le service lent → logs pour comprendre l'erreur.

</details>

### Q2 (Junior) : Quelle est la différence entre SLI, SLO et SLA ?

<details><summary>Reponse</summary>

- **SLI** (Service Level Indicator) : la **metrique** mesuree. Ex : "pourcentage de requêtes avec latence < 200ms", "taux de réponses 2xx".
- **SLO** (Service Level Objective) : l'**objectif** interne sur le SLI. Ex : "99.9% des requêtes < 200ms sur 30 jours". C'est le seuil qui declenche les alertes et les priorites d'ingenierie.
- **SLA** (Service Level Agreement) : le **contrat** avec le client, avec des consequences financieres si non respecte. Toujours moins strict que le SLO (SLO = 99.95%, SLA = 99.9%).

Relation : SLI est ce qu'on mesure, SLO est ce qu'on vise, SLA est ce qu'on promet. On alerte sur le SLO pour ne jamais violer le SLA.

</details>

### Q3 (Junior) : Quels sont les 4 types de metriques Prometheus ?

<details><summary>Reponse</summary>

1. **Counter** : valeur qui ne fait qu'augmenter (requêtes totales, erreurs totales). On utilise `rate()` pour calculer le debit par seconde.
2. **Gauge** : valeur qui monte et descend (temperature, connexions actives, mémoire utilisee).
3. **Histogram** : distribution de valeurs dans des buckets predefinies (latence). Permet de calculer des percentiles (p50, p95, p99) via `histogram_quantile()`.
4. **Summary** : comme histogram mais calcule les quantiles cote client (pas aggregeable entre instances). Preferer histogram dans la plupart des cas.

Convention de nommage : `http_requests_total` (counter), `http_requests_duration_seconds` (histogram), `node_memory_usage_bytes` (gauge).

</details>

### Q4 (Mid) : Explique les méthodes RED et USE pour le monitoring.

<details><summary>Reponse</summary>

**RED** (pour les services/requêtes) :
- **R**ate : nombre de requêtes par seconde.
- **E**rror : nombre/taux de requêtes en erreur.
- **D**uration : distribution de la latence (p50, p95, p99).

Ideal pour les microservices, API, endpoints utilisateur.

**USE** (pour les ressources/infrastructure) :
- **U**tilization : pourcentage d'utilisation (CPU 80%, disque 90%).
- **S**aturation : travail en file d'attente (queue length, swap).
- **E**rrors : erreurs materielles/système.

Ideal pour les serveurs, DB, réseau, disques.

Combinaison : RED sur chaque service + USE sur chaque ressource = couverture complete. Si RED montre une latence elevee, USE aide a identifier si c'est le CPU, la mémoire, ou le disque qui sature.

</details>

### Q5 (Mid) : Comment fonctionne le distributed tracing avec W3C Trace Context ?

<details><summary>Reponse</summary>

W3C Trace Context standardise la propagation du contexte de trace entre services via deux headers HTTP :

- **`traceparent`** : `{version}-{trace-id}-{parent-span-id}-{trace-flags}`. Ex : `00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01`. Le trace-id est constant a travers tous les services, le parent-span-id change à chaque hop.
- **`tracestate`** : metadata spécifique au vendor (ex : `congo=lZWRzIHRoZQ,rojo=00f067aa`).

Flow : Service A créé un trace-id et un span → propage via `traceparent` → Service B lit le header, créé un child span avec le même trace-id → propage a Service C, etc. L'outil de tracing (Jaeger, Tempo) reconstruit l'arbre complet. L'instrumentation se fait via OpenTelemetry SDK qui géré automatiquement la propagation. Le sampling (tete ou queue) controle le volume de traces collectees.

</details>

### Q6 (Mid) : Comment configurer des alertes efficaces dans Grafana ?

<details><summary>Reponse</summary>

Principes : (1) **Alerter sur les symptomes, pas les causes** — "latence p99 > 500ms" plutot que "CPU > 80%". (2) **Multiples conditions** pour éviter le flapping : `for: 5m` (la condition doit durer 5 min). (3) **Severite graduee** : warning (Slack) → critical (PagerDuty). (4) **Runbook link** dans chaque alerte — qui est appele a 3h du matin doit savoir quoi faire.

Config Grafana : Alerting rules avec PromQL (`rate(http_errors_total[5m]) / rate(http_requests_total[5m]) > 0.01`), contact points (email, Slack, PagerDuty), notification policies (routage par label). Silences pour les maintenances planifiees. Mute timings pour les heures non-business.

Anti-patterns : trop d'alertes (alert fatigue), seuils trop sensibles, pas de documentation, alerter sur des metriques non-actionnables.

</details>

### Q7 (Senior) : Qu'est-ce qu'un error budget et comment l'utiliser pour piloter les decisions ?

<details><summary>Reponse</summary>

L'error budget est le complement du SLO : si le SLO est 99.9% de disponibilité sur 30 jours, l'error budget est 0.1% = ~43 minutes d'indisponibilite toleree.

Utilisation : (1) **Budget consomme a < 50%** → l'équipe peut prendre des risques (déployer plus vite, features experimentales). (2) **Budget consomme a > 75%** → ralentir les deploiements, focus fiabilité. (3) **Budget dépasse** → gel des features, toute l'équipe sur la fiabilité jusqu'à la fin de la fenêtre.

Politique concrete : un rapport hebdomadaire du burn rate (vitesse de consommation). Si le burn rate projete dépasse le budget avant la fin du mois → alerte. Metriques : `1 - (requetes_ok / requetes_totales)` sur une fenêtre glissante. C'est le mécanisme qui aligne les incentives entre features et fiabilité — sans error budget, la stabilite est toujours sacrifiee au profit des features.

</details>

### Q8 (Senior) : Comment mettre en place l'incident management en production ?

<details><summary>Reponse</summary>

**Processus structure** :

1. **Detection** : alerte SLO → PagerDuty notifie l'on-call.
2. **Triage** (< 5 min) : confirmer l'impact, severite (SEV1/2/3), créer un canal incident.
3. **Coordination** : Incident Commander (coordonne), Tech Lead (diagnostic), Communicateur (updates stakeholders).
4. **Mitigation** : rollback, feature flag off, scale up — restaurer le service d'abord, investiguer ensuite.
5. **Resolution** : fix permanent déployé.
6. **Postmortem** (< 48h) : blameless, timeline, root cause, action items avec owners et deadlines.

Outils : PagerDuty/OpsGenie (escalation), Slack (coordination temps réel), Statuspage (communication externe), Jira (action items). La clé : le postmortem blameless qui se concentre sur les systèmes, pas les personnes. Chaque incident non analyse est une opportunite d'amelioration perdue.

</details>

### Q9 (Senior) : Comment implementer un runbook efficace ?

<details><summary>Reponse</summary>

Un runbook est un document operationnel lie à une alerte spécifique. Structure :

1. **Contexte** : quelle alerte, quel service, quel SLO impacte.
2. **Impact** : quels utilisateurs/fonctionnalites sont affectes.
3. **Diagnostic** : commandes/dashboards a vérifier en premier. Arbre de decision : "Si metrique X > seuil → vérifier Y, sinon vérifier Z".
4. **Mitigation** : actions immediates avec les commandes exactes (copier-coller). Rollback, restart, scale, feature toggle.
5. **Escalation** : qui contacter si la mitigation echoue, avec les coordonnees.
6. **Post-résolution** : verifications à faire, nettoyage, ticket a créer.

Bonnes pratiques : (1) Lie à chaque alerte via un lien dans la notification. (2) Teste regulierement (game days). (3) Mis a jour après chaque incident. (4) Automatiser les étapes repetitives (scripts, Terraform, Ansible). L'objectif ultime : si le runbook est toujours le même → automatiser la remediation.

</details>

### Q10 (Senior) : OpenTelemetry : architecture, instrumentation, et pipeline de collecte.

<details><summary>Reponse</summary>

**OpenTelemetry** (OTel) est le standard CNCF pour l'instrumentation unifiee (traces, metriques, logs).

**Architecture** : SDK (instrumentation dans l'app) → Exporter → **Collector** (agent/gateway) → Backend (Jaeger, Prometheus, Loki, Datadog).

**Instrumentation** : (1) **Automatique** : le SDK intercepte les frameworks connus (Express, pg, fetch) et généré des spans/metriques sans code. (2) **Manuelle** : `tracer.startSpan('operation')` pour la logique metier.

**Collector** : recoit les telemetries (OTLP protocol), les transforme (batching, filtering, enrichissement), et les exporte vers les backends. Modes : agent (sidecar, par pod) ou gateway (centralise). Pipeline configurable : receivers → processors → exporters.

Avantages : vendor-neutral (changer de backend sans modifier le code), correlation native traces-metriques-logs via trace_id, sampling configurable (head-based ou tail-based). C'est devenu le standard de facto, supportee par tous les cloud providers et outils d'observabilité.

</details>

---

## Distributed Systems

### Q1 (Junior) : Qu'est-ce que le théorème CAP ?

<details><summary>Reponse</summary>

Le théorème CAP (Brewer) stipule qu'un système distribue ne peut garantir simultanement que 2 des 3 propriétés :

- **C**onsistency : toutes les lectures retournent la dernière écriture (linearisabilite).
- **A**vailability : chaque requête recoit une réponse (même si pas la plus recente).
- **P**artition tolerance : le système continue de fonctionner malgre des pannes réseau entre noeuds.

En pratique, les partitions réseau sont inevitables → le choix est entre **CP** (coherent mais indisponible pendant une partition — ex: ZooKeeper, etcd) et **AP** (disponible mais eventuellement incoherent — ex: Cassandra, DynamoDB).

Nuance : le CAP s'applique au niveau de chaque operation, pas du système entier. Un même système peut etre CP pour les ecritures et AP pour les lectures.

</details>

### Q2 (Junior) : Qu'est-ce que l'eventual consistency ?

<details><summary>Reponse</summary>

L'eventual consistency (coherence eventuelle) garantit que si aucune nouvelle écriture n'est effectuee, toutes les repliques convergeront eventuellement vers la même valeur. Il n'y a pas de garantie de delai — "eventuellement" peut etre des millisecondes ou des minutes.

Exemples concrets : le DNS (propagation TTL), les followers Instagram (le compteur de likes peut varier entre les serveurs pendant quelques secondes), les caches CDN. C'est le modèle de coherence le plus faible mais le plus performant et disponible.

En pratique, on combine souvent : strong consistency pour les operations critiques (paiement) et eventual consistency pour le reste (affichage du catalogue). Techniques pour gérer : read-your-writes (lire depuis le leader après une écriture), monotonic reads (toujours lire depuis la même replique).

</details>

### Q3 (Junior) : Qu'est-ce que le pattern circuit breaker ?

<details><summary>Reponse</summary>

Le circuit breaker protege un service contre les appels repetes à un service defaillant (evite la cascade de pannes). 3 états :

1. **Closed** (normal) : les appels passent. Si le taux d'echec dépasse un seuil (ex: 50% sur 10 appels) → bascule en Open.
2. **Open** : tous les appels echouent immediatement (fail-fast) sans contacter le service distant. Après un timeout (ex: 30s) → bascule en Half-Open.
3. **Half-Open** : laisse passer quelques requêtes de test. Si OK → retour en Closed. Si echec → retour en Open.

Avantages : evite de surcharger un service déjà en difficulte, libere les threads/connexions, permet une degradation gracieuse (fallback). Librairies : `opossum` (Node.js), Resilience4j (Java), Polly (.NET). Toujours combiner avec un fallback (valeur par defaut, cache stale, message d'erreur gracieux).

</details>

### Q4 (Mid) : Explique le saga pattern pour les transactions distribuees.

<details><summary>Reponse</summary>

Une saga est une sequence de transactions locales ou chaque étape publie un event qui declenche l'étape suivante. Si une étape echoue, des **transactions compensatoires** annulent les étapes precedentes.

**Choregraphie** : chaque service ecoute les events et reagit. Pas de coordinateur central. Simple mais difficile à suivre dans les flux complexes.

**Orchestration** : un orchestrateur central envoie les commandes et géré les compensations. Plus facile a debugger et monitorer.

Exemple (commande e-commerce) : Créer commande → Reserver stock → Debiter paiement → Confirmer. Si le paiement echoue : compenser le stock (liberer la reservation), compenser la commande (annuler).

Complexites : les compensations ne sont pas toujours possibles (email déjà envoye → envoyer un email de correction). L'idempotence de chaque étape est cruciale (retries). Monitorer l'état de chaque saga est essentiel.

</details>

### Q5 (Mid) : Qu'est-ce que le outbox pattern et quel problème resout-il ?

<details><summary>Reponse</summary>

Problème : quand un service doit modifier sa DB ET publier un event, faire les deux de manière atomique est impossible sans transaction distribuee. Si on sauve en DB puis publie → crash entre les deux = event perdu. Si on publie puis sauve → crash = event sans donnee.

Solution outbox : (1) Écrire la donnee ET l'event dans la même transaction DB (table `outbox`). (2) Un processus separe (poller ou CDC — Change Data Capture avec Debezium) lit la table outbox et publie les events sur le broker. (3) Marquer les events comme publies.

Garanties : at-least-once delivery (le consommateur doit etre idempotent). Avantages : coherence DB + event garantie, pas de transaction distribuee. C'est le pattern standard pour les architectures event-driven avec microservices.

</details>

### Q6 (Mid) : Pourquoi l'idempotence est cruciale en système distribue ?

<details><summary>Reponse</summary>

En distribue, les messages peuvent etre delivres plusieurs fois (at-least-once delivery, retries réseau, timeouts ambigus). Une operation idempotente produit le même résultat qu'elle soit executee 1 ou N fois.

Implementation : (1) **Idempotency key** : le client envoie un ID unique par operation. Le serveur stocke le résultat et retourne le même pour les requêtes dupliquees. (2) **Upsert** au lieu d'insert. (3) **État final** plutot que delta : "set balance = 100" au lieu de "add 10 to balance". (4) **Deduplication** cote consumer : stocker les IDs d'events traites.

Exemples : Stripe utilise `Idempotency-Key` header. Kafka utilise les producer IDs + sequence numbers. Sans idempotence : un retry de paiement debite deux fois, un retry de création duplique l'entite. C'est un prérequis pour toute architecture fiable.

</details>

### Q7 (Senior) : Event Sourcing vs CRUD : avantages, inconvenients, quand choisir.

<details><summary>Reponse</summary>

**CRUD** : stocke l'état courant. `UPDATE account SET balance = 90`. L'historique est perdu (sauf audit log separe).

**Event Sourcing** : stocke les événements immutables. `AccountDebited(10)`, `AccountCredited(50)`. L'état courant est reconstruit en repliant les events (où via des snapshots).

Avantages ES : (1) Audit trail complet gratuit. (2) Debugging temporel (reconstruire l'état a n'importe quel instant). (3) Nouveaux modèles de lecture sans migration (replier les events differemment). (4) Naturellement compatible CQRS et event-driven.

Inconvenients ES : (1) Complexite accrue (projections, snapshots, versioning des events). (2) Eventual consistency entre le store d'events et les read models. (3) Schema evolution des events (upcasting). (4) Requetes directes impossibles — besoin de projections materialisees.

Quand : domaines avec audit reglementaire (finance, sante), logique metier complexe avec besoins d'undo, systèmes event-driven existants. Ne PAS utiliser pour du CRUD simple — l'overhead n'est pas justifie.

</details>

### Q8 (Senior) : Explique le pattern CQRS en profondeur. Comment le combiner avec Event Sourcing ?

<details><summary>Reponse</summary>

**CQRS** separe le modèle d'écriture (commands) du modèle de lecture (queries). Chaque cote peut avoir son propre schema, sa propre DB, son propre scaling.

Cote écriture : recoit des commands, valide les invariants metier, persiste les changements, publie des events. Cote lecture : des projections ecoutent les events et maintiennent des read models optimises (denormalises, pre-calcules).

**Avec Event Sourcing** : le write model est un event store. Les projections construisent les read models en consommant les events. Avantage : on peut créer de nouvelles projections a tout moment en relisant l'historique complet.

**Sans Event Sourcing** : le write model est une DB classique qui publie des events après chaque mutation (via outbox pattern). Plus simple mais sans les benefices de l'historique.

Complexites : coherence eventuelle entre write et read (l'utilisateur écrit puis ne voit pas son changement → pattern read-your-writes). Infra plus complexe (2 DBs, event bus). Ne l'utiliser que si les patterns de lecture et d'écriture sont fondamentalement différents.

</details>

### Q9 (Senior) : Comment fonctionnent les algorithmes de consensus (Raft) ?

<details><summary>Reponse</summary>

Raft est un algorithme de consensus qui permet à un cluster de noeuds de s'accorder sur une sequence d'operations malgre les pannes. Plus comprehensible que Paxos.

**Roles** : Leader (recoit les ecritures, replique), Follower (replique passivement), Candidate (election).

**Election** : si un follower ne recoit plus de heartbeat du leader (timeout random), il devient candidate et demandé les votes. Le premier a obtenir la majorite devient leader.

**Replication** : le leader recoit une écriture → ajoute l'entree a son log → replique aux followers → quand la majorite a acquitte → commit → repond au client.

**Sécurité** : un candidat ne peut etre elu que si son log est au moins aussi a jour que la majorite. Garantit qu'aucune entree committee n'est perdue.

Utilise par : etcd (Kubernetes), Consul, CockroachDB, TiKV. Tolere `(n-1)/2` pannes pour un cluster de `n` noeuds (3 noeuds = 1 panne, 5 noeuds = 2 pannes).

</details>

### Q10 (Senior) : Comment concevoir un système idempotent et resilient de bout en bout ?

<details><summary>Reponse</summary>

Architecture complete :

1. **Client** : généré un `Idempotency-Key` (UUID v4) pour chaque mutation. Retry avec backoff exponentiel + jitter.
2. **API Gateway** : rate limiting, circuit breaker vers les services backend.
3. **Service** : vérifié l'idempotency key dans un store (Redis avec TTL ou table DB). Si déjà traite → retourne le résultat stocke. Sinon → exécuté dans une transaction : écriture metier + outbox event + stockage du résultat idempotent.
4. **Message broker** : at-least-once delivery. Chaque consumer est idempotent (deduplication par event ID).
5. **Compensations** : sagas avec compensations idempotentes. Monitoring du progres de chaque saga.
6. **Observabilité** : trace ID propage partout, metriques sur les retries/duplicates/compensations, alertes sur les sagas bloquees.

Principes : assumer que tout echoue, chaque operation est retryable, chaque message peut arriver 2 fois, l'état final est déterministe quel que soit le nombre de tentatives.

</details>
