# Cheat Sheet — Phase A : Les 3 frameworks

> Révision rapide React 19 / Vue 3.5 / Angular 19 — concept par concept.

---

## Reactivity

| Concept | React | Vue | Angular |
|---------|-------|-----|---------|
| État local | `useState(init)` | `ref(init)` / `reactive({})` | `signal(init)` |
| État dérivé | `useMemo(() => ..., [deps])` | `computed(() => ...)` | `computed(() => ...)` |
| Effet de bord | `useEffect(() => ..., [deps])` | `watchEffect(() => ...)` / `watch(source, cb)` | `effect(() => ...)` |
| Props | `function Comp({ name }: Props)` | `defineProps<Props>()` | `input<string>()` / `@Input()` |
| Événements | `onClick={handler}` | `@click="handler"` / `defineEmits` | `(click)="handler()"` / `output()` |
| Two-way binding | pas natif (state + onChange) | `v-model` / `defineModel()` | `model()` / `[(ngModel)]` |
| Ref DOM | `useRef<HTMLElement>(null)` | `ref<HTMLElement>()` + `ref="el"` | `viewChild<ElementRef>('el')` |

### Pieges courants
- **React** : deps manquantes dans `useEffect` → stale closure. Utiliser `eslint-plugin-react-hooks`.
- **Vue** : `reactive()` perd la réactivité si destructure → utiliser `toRefs()` ou `ref()`.
- **Angular** : `signal.set()` remplace, `signal.update(fn)` mute. Ne pas oublier `untracked()` pour lire sans tracker.

---

## State Management

| Concept | React | Vue | Angular |
|---------|-------|-----|---------|
| Store global | Zustand / Redux Toolkit | Pinia `defineStore()` | NgRx SignalStore |
| Context / DI | `createContext` + `useContext` | `provide` / `inject` | `inject(Token)` |
| Immuabilite | Immer (Redux Toolkit) | pas requis (proxy) | `patchState()` |
| DevTools | Redux DevTools | Vue DevTools | Redux DevTools (NgRx) |
| Persistence | middleware Zustand | plugin Pinia | meta-reducer |

### Quand utiliser quoi
- **Local** : état du composant uniquement → state/ref/signal.
- **Partage parent-enfant** : props + events.
- **Partage transverse** : store (Pinia, Zustand, SignalStore).
- **Server state** : TanStack Query (React/Vue/Angular).

---

## Routing

| Concept | React (React Router 7) | Vue (Vue Router 4) | Angular (Router 19) |
|---------|------------------------|---------------------|---------------------|
| Declaration | `createBrowserRouter([...])` | `createRouter({ routes })` | `provideRouter(routes)` |
| Route params | `useParams()` | `useRoute().params` | `input()` / `ActivatedRoute` |
| Navigation | `useNavigate()` | `useRouter().push()` | `Router.navigate()` |
| Guard | `loader` / `action` | `beforeEach` / `beforeRouteEnter` | `CanActivate` / functional guard |
| Lazy load | `React.lazy(() => import(...))` | `() => import(...)` | `loadComponent: () => import(...)` |
| Nested routes | `<Outlet />` | `<RouterView />` | `<router-outlet />` |

---

## Formulaires

| Concept | React | Vue | Angular |
|---------|-------|-----|---------|
| Controlled | `value={state} onChange={set}` | `v-model="ref"` | Reactive Forms `formControl` |
| Validation | Zod + react-hook-form | VeeValidate + Zod | Validators built-in + custom |
| Soumission | `onSubmit={handleSubmit}` | `@submit.prevent="handler"` | `(ngSubmit)="handler()"` |
| Erreurs | `formState.errors` | `errors` (VeeValidate) | `control.errors` |
| Formulaire dynamique | array de config + map | array de config + v-for | FormArray |

---

## Lifecycle

| Phase | React | Vue | Angular |
|-------|-------|-----|---------|
| Montage | `useEffect(() => {}, [])` | `onMounted()` | `afterNextRender()` |
| Update | `useEffect(() => {}, [deps])` | `onUpdated()` | `afterRender()` |
| Demontage | return du `useEffect` | `onUnmounted()` | `DestroyRef.onDestroy()` |
| Erreur | `ErrorBoundary` (class) | `onErrorCaptured()` | `ErrorHandler` |
| SSR only | — | `onServerPrefetch()` | `APP_INITIALIZER` |

### Piege : cleanup
- **React** : toujours retourner une cleanup function dans `useEffect` pour éviter les fuites (abortController, listeners).
- **Vue** : `watchEffect` cleanup via `onCleanup` param.
- **Angular** : `DestroyRef.onDestroy()` ou `takeUntilDestroyed()` pour RxJS.

---

## Composants : patterns avances

| Pattern | React | Vue | Angular |
|---------|-------|-----|---------|
| Slots / Children | `{children}` / `props.slot` | `<slot>` / `<slot name="x">` | `<ng-content>` / `select` |
| Render function | JSX natif | `h()` / `<script setup>` + JSX | pas courant (templates) |
| HOC / Wrapper | HOC function | composable + wrapper | directive / pipe |
| Teleport | `createPortal(el, target)` | `<Teleport to="body">` | `cdkPortal` (CDK) |
| Suspense | `<Suspense fallback={...}>` | `<Suspense>` + `#fallback` | `@defer` (built-in) |
| Liste virtuelle | react-window / TanStack Virtual | vue-virtual-scroller | CDK Virtual Scroll |

---

## Accessibilité (a11y)

| Regle | Comment |
|-------|---------|
| Focus management | Trap focus dans les modales. Remettre le focus au close. |
| ARIA | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |
| Keyboard | Enter/Space pour actions, Escape pour fermer, Tab pour naviguer |
| Skip links | Lien invisible "Aller au contenu" en haut de page |
| Contraste | Ratio min 4.5:1 (texte), 3:1 (grands textes) — WCAG AA |
| Live regions | `aria-live="polite"` pour notifications, `"assertive"` pour erreurs |

---

## Testing

| Type | React | Vue | Angular |
|------|-------|-----|---------|
| Unit composant | Vitest + Testing Library | Vitest + @vue/test-utils | Vitest + TestBed |
| Intégration | Testing Library (render) | mount() + Testing Library | ComponentFixture |
| E2E | Playwright | Playwright | Playwright |
| Snapshot | `toMatchSnapshot()` | `toMatchSnapshot()` | `toMatchSnapshot()` |
| Mock HTTP | MSW | MSW | MSW / HttpTestingController |

### Bonne pratique
- Tester le **comportement**, pas l'implementation.
- `getByRole` > `getByTestId` > `getByText` (Testing Library).
- Couvrir les cas limites : loading, error, empty state.

---

## SSR / Hydration

| Concept | React (Next.js) | Vue (Nuxt) | Angular (Angular Universal) |
|---------|-----------------|------------|---------------------------|
| SSR framework | Next.js 15 | Nuxt 4 | Angular SSR (built-in) |
| Hydration | automatique | automatique | incremental hydration |
| Server Component | `"use server"` / RSC | `nuxt/server` composables | pas encore natif |
| Data fetching | `fetch` in RSC / `use()` | `useFetch` / `useAsyncData` | `resolve` / `TransferState` |
| Meta / SEO | `<Head>` / Metadata API | `useHead()` / `useSeoMeta()` | `Meta` / `Title` services |
| Streaming | React Suspense streaming | Nuxt `renderToStream` | Angular streaming SSR |

---

## Récapitulatif mental

```
React  → "tout est fonction"    → hooks + JSX + composition
Vue    → "progressif + magique" → SFC + Composition API + reactivite fine
Angular→ "framework complet"    → DI + signaux + decorateurs + CLI
```

> Astuce : les 3 convergent vers signaux/computed/effect. Apprendre un modèle, adapter la syntaxe.
