# Guides de migration — Legacy vers versions actuelles

> Fiches pratiques pour migrer du code legacy rencontre en mission.
> Chaque section couvre les breaking changes, les étapes mecaniques et les pieges.

---

## React 18 → React 19

### Pourquoi migrer

- Le React Compiler elimine 90 % des `useMemo` / `useCallback` manuels → moins de code, moins de bugs de deps.
- Les Form Actions + `useActionState` simplifient drastiquement les formulaires avec état serveur.
- `use()` unifie le data fetching et supprime beaucoup de patterns useEffect + useState.

### Changements breaking

| Avant (React 18) | Après (React 19) |
|---|---|
| `forwardRef((props, ref) => ...)` | `ref` passe directement en prop |
| `defaultProps` sur function components | Valeurs par defaut ES6 dans les params |
| `useEffect` + `useState` pour data fetching | `use(promise)` dans le rendu |
| `useMemo` / `useCallback` partout | React Compiler optimise automatiquement |
| `useContext(MyCtx)` | `use(MyCtx)` (fonctionne aussi dans des conditions) |
| Pas d'optimistic UI natif | `useOptimistic` |
| `<Helmet>` / `react-helmet` pour les meta | `<title>`, `<meta>` directement dans le composant |
| `event.preventDefault()` + fetch dans `onSubmit` | `<form action={serverAction}>` |

### Etapes de migration

1. Monter React et ReactDOM a 19 : `npm i react@19 react-dom@19`
2. Monter les types : `npm i -D @types/react@19 @types/react-dom@19`
3. Activer le React Compiler : `npm i -D babel-plugin-react-compiler` + config Babel/Vite
4. Remplacer les `forwardRef` (rechercher dans tout le projet)
5. Remplacer les `defaultProps` par des valeurs par defaut dans les params
6. Migrer les formulaires vers Form Actions la ou c'est pertinent
7. Supprimer les `useMemo` / `useCallback` inutiles (laisser le Compiler faire)
8. Tester les refs — le cleanup de ref callback change de comportement

### Avant / Après

**forwardRef supprime** :

```tsx
// React 18
const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});

// React 19
function Input({ ref, ...props }: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  return <input ref={ref} {...props} />;
}
```

**use() remplace useEffect + useState pour le data fetching** :

```tsx
// React 18
function UserProfile({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);
  if (!user) return <Spinner />;
  return <h1>{user.name}</h1>;
}

// React 19
function UserProfile({ id }: { id: string }) {
  const user = use(fetchUser(id)); // suspend automatiquement
  return <h1>{user.name}</h1>;
}
// Envelopper dans <Suspense fallback={<Spinner />}> cote parent
```

**useOptimistic** :

```tsx
// React 18 — gestion manuelle
function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, setOptimisticTodos] = useState(todos);
  async function addTodo(text: string) {
    const fake = { id: Date.now(), text, pending: true };
    setOptimisticTodos(prev => [...prev, fake]);
    try {
      const real = await createTodo(text);
      setOptimisticTodos(prev => prev.map(t => t.id === fake.id ? real : t));
    } catch {
      setOptimisticTodos(prev => prev.filter(t => t.id !== fake.id));
    }
  }
  // ...
}

// React 19
function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newTodo: string) => [...state, { id: Date.now(), text: newTodo, pending: true }]
  );
  async function addTodo(text: string) {
    addOptimistic(text);
    await createTodo(text);
  }
  // ...
}
```

**Form Actions + useActionState** :

```tsx
// React 18
function LoginForm() {
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsPending(true);
    const data = new FormData(e.target as HTMLFormElement);
    const result = await login(data);
    if (result.error) setError(result.error);
    setIsPending(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      {error && <p>{error}</p>}
      <button disabled={isPending}>Connexion</button>
    </form>
  );
}

// React 19
function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, { error: '' });

  return (
    <form action={formAction}>
      <input name="email" />
      {state.error && <p>{state.error}</p>}
      <button disabled={isPending}>Connexion</button>
    </form>
  );
}
```

**Metadata dans le composant** :

```tsx
// React 18
import { Helmet } from 'react-helmet-async';
function BlogPost({ post }: { post: Post }) {
  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      <article>{post.content}</article>
    </>
  );
}

// React 19 — plus besoin de Helmet
function BlogPost({ post }: { post: Post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      {post.content}
    </article>
  );
}
```

**Ref cleanup function** :

```tsx
// React 18 — pas de cleanup sur ref callback
function MeasureDiv() {
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      const observer = new ResizeObserver(() => { /* ... */ });
      observer.observe(node);
      // pas de moyen propre de cleanup
    }
  }, []);
  return <div ref={ref} />;
}

// React 19 — return cleanup depuis le ref callback
function MeasureDiv() {
  return (
    <div ref={(node) => {
      const observer = new ResizeObserver(() => { /* ... */ });
      observer.observe(node);
      return () => observer.disconnect(); // cleanup automatique
    }} />
  );
}
```

**Resource preloading** :

```tsx
// React 19 — nouvelles APIs
import { preload, preconnect, prefetchDNS } from 'react-dom';

function App() {
  preconnect('https://api.example.com');
  prefetchDNS('https://cdn.example.com');
  preload('/fonts/inter.woff2', { as: 'font', type: 'font/woff2' });
  return <main>...</main>;
}
```

### Pieges courants

- **`use()` ne remplace pas tous les useEffect** : il sert pour les promesses et les contextes, pas pour les souscriptions ou side effects.
- **React Compiler requiert des regles strictes** : pas de mutation d'objets, pas de lecture de `ref.current` pendant le rendu. Utiliser `eslint-plugin-react-compiler` pour détecter les violations.
- **`useActionState` (pas `useFormState`)** : le nom a change entre les RC et la version finale.
- **Les ref callbacks avec cleanup retournent maintenant `undefined` au lieu de recevoir `null`** : si votre ancien code teste `node === null`, il faut adapter.
- **`defaultProps` ne declenche pas d'erreur mais un warning en dev** : migrer maintenant, ça sera retire dans une future version.

---

## Vue 3.4 → Vue 3.5

### Pourquoi migrer

- Reactive props destructure rend le code des composants nettement plus lisible (plus besoin de `props.x` partout).
- Le système réactif consomme 56 % de mémoire en moins → gain direct en production.
- `useTemplateRef()` apporte enfin un typage propre sur les refs template.

### Changements breaking

| Avant (Vue 3.4) | Après (Vue 3.5) |
|---|---|
| `const el = ref<HTMLInputElement>()` + `ref="el"` | `const el = useTemplateRef<HTMLInputElement>('el')` |
| `:id="id"` / `:class="class"` | `:id` / `:class` (shorthand same-name) |
| `const props = defineProps<Props>()` + `props.count` partout | `const { count } = defineProps<Props>()` (réactif) |
| `Math.random().toString(36)` pour les IDs | `useId()` (SSR-safe) |
| `<Teleport to="#modal">` (doit exister au mount) | `<Teleport defer to="#modal">` (resolu après le rendu) |
| cleanup manuel dans `watch` | `onWatcherCleanup()` |

### Etapes de migration

1. Monter Vue : `npm i vue@3.5` (où pnpm/yarn équivalent)
2. Monter le tooling : `npm i -D @vitejs/plugin-vue@latest vue-tsc@latest`
3. Rechercher les `ref<HTML...>()` utilises comme template refs → migrer vers `useTemplateRef()`
4. Rechercher les `:foo="foo"` → simplifier en `:foo`
5. Migrer les `defineProps` suivis de `props.x` → destructure direct
6. Remplacer les generateurs d'ID custom par `useId()`
7. Migrer les `<Teleport>` avec des cibles dynamiques vers `defer` si nécessaire
8. Tester le SSR si applicable (useId + Teleport defer changent le rendu)

### Avant / Après

**useTemplateRef()** :

```vue
<!-- Vue 3.4 -->
<script setup lang="ts">
const inputEl = ref<HTMLInputElement>()

onMounted(() => {
  inputEl.value?.focus()
})
</script>
<template>
  <input ref="inputEl" />
</template>

<!-- Vue 3.5 -->
<script setup lang="ts">
const inputEl = useTemplateRef<HTMLInputElement>('input')

onMounted(() => {
  inputEl.value?.focus()
})
</script>
<template>
  <input ref="input" />
</template>
```

**v-bind same-name shorthand** :

```vue
<!-- Vue 3.4 -->
<template>
  <div :id="id" :class="class" :aria-label="ariaLabel">
    <UserCard :user="user" :selected="selected" />
  </div>
</template>

<!-- Vue 3.5 -->
<template>
  <div :id :class :aria-label="ariaLabel">
    <UserCard :user :selected />
  </div>
</template>
<!-- Note : le shorthand ne marche que quand le nom de prop = nom de variable -->
```

**Reactive props destructure** :

```vue
<!-- Vue 3.4 -->
<script setup lang="ts">
interface Props {
  count: number
  label?: string
}
const props = withDefaults(defineProps<Props>(), { label: 'Total' })

const double = computed(() => props.count * 2)
</script>
<template>
  <span>{{ props.label }}: {{ double }}</span>
</template>

<!-- Vue 3.5 -->
<script setup lang="ts">
interface Props {
  count: number
  label?: string
}
const { count, label = 'Total' } = defineProps<Props>()

const double = computed(() => count * 2)
</script>
<template>
  <span>{{ label }}: {{ double }}</span>
</template>
```

**useId()** :

```vue
<!-- Vue 3.4 -->
<script setup lang="ts">
const id = `field-${Math.random().toString(36).slice(2, 9)}`
<!-- Probleme : mismatch SSR/client -->
</script>
<template>
  <label :for="id">Email</label>
  <input :id="id" type="email" />
</template>

<!-- Vue 3.5 -->
<script setup lang="ts">
const id = useId()
</script>
<template>
  <label :for="id">Email</label>
  <input :id="id" type="email" />
</template>
```

**Deferred Teleport** :

```vue
<!-- Vue 3.4 — la cible doit exister quand le composant mount -->
<template>
  <Teleport to="#modal-container">
    <div class="modal">...</div>
  </Teleport>
</template>

<!-- Vue 3.5 — defer : la cible peut etre rendue apres -->
<template>
  <Teleport defer to="#modal-container">
    <div class="modal">...</div>
  </Teleport>
</template>
```

**onWatcherCleanup()** :

```vue
<!-- Vue 3.4 -->
<script setup lang="ts">
watch(searchQuery, (query) => {
  const controller = new AbortController()
  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(data => results.value = data)

  // cleanup via onCleanup du 3eme argument
  // syntaxe peu connue et mal documentee
}, { flush: 'post' })
</script>

<!-- Vue 3.5 -->
<script setup lang="ts">
watch(searchQuery, (query) => {
  const controller = new AbortController()
  fetch(`/api/search?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(data => results.value = data)

  onWatcherCleanup(() => controller.abort())
})
</script>
```

### Pieges courants

- **Reactive destructure ne fonctionne QUE dans `<script setup>`** : dans un `setup()` classique, ça reste non-réactif.
- **`useTemplateRef('name')` doit matcher le `ref="name"` du template** : si les noms divergent, la ref sera `null` sans warning.
- **Le shorthand `:id` est confondu avec `:id=""` (string vide)** dans certains linters — mettre a jour `eslint-plugin-vue` a 9.28+.
- **`useId()` généré des IDs différents entre Vue 3.5.0 et 3.5.1+** : ne pas stocker ces IDs en base ou dans des snapshots de test.
- **Le `Teleport defer` change l'ordre de rendu** : les effets dans le contenu teleporte s'executent après le reste du template parent.

---

## Angular 18 → 19

### Pourquoi migrer

- Les `@defer` blocks remplacent le lazy loading manuel de composants → moins de boilerplate, meilleure UX.
- Le zoneless change detection (en stabilisation) supprime zone.js → bundles plus legers et meilleures perfs.
- `resource()` et `linkedSignal()` completent le modèle réactif base sur les signals.

### Changements breaking

| Avant (Angular 18) | Après (Angular 19) |
|---|---|
| `@NgModule({ declarations: [...] })` | Standalone par defaut (plus de NgModule pour les composants) |
| `loadChildren: () => import(...)` pour le lazy | `@defer { <HeavyComponent /> }` pour le lazy au niveau composant |
| zone.js obligatoire | `provideExperimentalZonelessChangeDetection()` → stable path |
| Signal dérivé en lecture seule | `linkedSignal()` pour un signal dérivé mutable |
| `HttpClient` + `subscribe()` pour l'async | `resource()` API declarative pour le data loading |
| `constructor(private svc: MyService)` | `inject(MyService)` utilisable partout |
| `CanActivate` class-based guard | Guard fonctionnel : `() => inject(Auth).isLoggedIn()` |
| SSR/SSG global | `renderMode` par route (SSR, SSG ou CSR) |

### Etapes de migration

1. Lancer `ng update @angular/core@19 @angular/cli@19`
2. Lancer les schematics automatiques : `ng update` migre automatiquement certains patterns
3. Convertir les `NgModule` restants en standalone : `ng generate @angular/core:standalone`
4. Migrer les guards class-based vers des guards fonctionnels
5. Remplacer les injections `constructor` par `inject()` dans les nouveaux composants
6. Identifier les composants charges en lazy → candidats pour `@defer`
7. Tester le zoneless en ajoutant `provideExperimentalZonelessChangeDetection()` dans `app.config.ts`
8. Configurer le `renderMode` par route si le projet utilise SSR

### Avant / Après

**Standalone par defaut (plus de NgModule)** :

```typescript
// Angular 18
@NgModule({
  declarations: [UserListComponent, UserCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [UserListComponent]
})
export class UserModule {}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {
  @Input() user!: User;
}

// Angular 19 — standalone par defaut
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  imports: [DatePipe, RouterLink], // imports directement dans le composant
})
export class UserCardComponent {
  user = input.required<User>();
}
// Plus besoin de NgModule du tout
```

**@defer blocks** :

```typescript
// Angular 18 — lazy loading via router uniquement
const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent)
  }
];

// Angular 19 — @defer pour le lazy au niveau template
@Component({
  template: `
    <h1>Page principale</h1>

    @defer (on viewport) {
      <app-heavy-chart [data]="chartData" />
    } @loading (minimum 200ms) {
      <app-skeleton />
    } @error {
      <p>Erreur de chargement</p>
    }
  `
})
export class PageComponent {
  chartData = signal<ChartData[]>([]);
}
// Le composant est telecharge uniquement quand il entre dans le viewport
```

**linkedSignal()** :

```typescript
// Angular 18 — signal derive = computed (lecture seule)
@Component({ /* ... */ })
export class PaginationComponent {
  items = input.required<Item[]>();
  currentPage = signal(0);

  // Si items change, currentPage reste a l'ancienne valeur → bug
  // Il faut un effect() pour reset manuellement
  constructor() {
    effect(() => {
      this.items(); // track
      this.currentPage.set(0); // reset
    });
  }
}

// Angular 19 — linkedSignal : derive ET mutable
@Component({ /* ... */ })
export class PaginationComponent {
  items = input.required<Item[]>();

  currentPage = linkedSignal({
    source: this.items,
    computation: () => 0 // reset a 0 quand items change
  });

  nextPage() {
    this.currentPage.update(p => p + 1); // mutable
  }
}
```

**resource() API** :

```typescript
// Angular 18
@Component({ /* ... */ })
export class UserProfileComponent {
  private http = inject(HttpClient);
  userId = input.required<string>();
  user: User | null = null;
  loading = true;
  error = '';

  ngOnInit() {
    this.http.get<User>(`/api/users/${this.userId()}`).subscribe({
      next: (u) => { this.user = u; this.loading = false; },
      error: (e) => { this.error = e.message; this.loading = false; }
    });
  }
}

// Angular 19
@Component({ /* ... */ })
export class UserProfileComponent {
  private http = inject(HttpClient);
  userId = input.required<string>();

  userResource = resource({
    request: () => this.userId(),
    loader: ({ request: id }) => {
      return firstValueFrom(this.http.get<User>(`/api/users/${id}`));
    }
  });

  // userResource.value() → User | undefined
  // userResource.status() → 'idle' | 'loading' | 'resolved' | 'error'
  // userResource.error() → erreur eventuelle
}
```

**inject() partout** :

```typescript
// Angular 18
@Component({ /* ... */ })
export class DashboardComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
}

// Angular 19
@Component({ /* ... */ })
export class DashboardComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
}
```

**Route-level render mode** :

```typescript
// Angular 19 — SSR/SSG/CSR par route
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { renderMode: RenderMode.Prerender } // SSG
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { renderMode: RenderMode.Client } // CSR uniquement
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    data: { renderMode: RenderMode.Server } // SSR a chaque requete
  }
];
```

### Pieges courants

- **`ng update` peut echouer si les deps tierces ne supportent pas Angular 19** : vérifier la compatibilite de ng-zorro, PrimeNG, Angular Material avant de lancer.
- **Standalone par defaut ≠ plus de modules** : les modules existants continuent de fonctionner, mais les nouveaux composants generes par le CLI seront standalone.
- **`@defer` n'est PAS un remplacement du lazy loading de routes** : il sert au lazy loading de composants dans un template, pas au code-splitting de pages.
- **Le zoneless casse les libs qui dependent de zone.js** (certaines libs Material, libs tierces qui utilisent `setTimeout` sans `markForCheck`).
- **`resource()` retourne un signal, pas un Observable** : ne pas essayer de `.pipe()` dessus.
- **`linkedSignal` est resolu en même temps que `computed`** dans le cycle de detection — ne pas y mettre de side effects.

---

## Next.js Pages Router → App Router

### Pourquoi migrer

- Les Server Components reduisent le JS envoye au client de 30-70 % (le code serveur ne quitte jamais le serveur).
- Le streaming + Suspense offrent une UX percue plus rapide (pas d'ecran blanc en attendant les donnees).
- Le layout nesting evite les re-renders inutiles lors de la navigation (le layout ne se remonte pas).

### Changements breaking

| Pages Router | App Router |
|---|---|
| `pages/index.tsx` | `app/page.tsx` |
| `pages/_app.tsx` | `app/layout.tsx` |
| `pages/_document.tsx` | Supprime (géré par le framework) |
| `pages/api/hello.ts` | `app/api/hello/route.ts` |
| `pages/blog/[slug].tsx` | `app/blog/[slug]/page.tsx` |
| `getServerSideProps` | `async function Page()` (Server Component) |
| `getStaticProps` + `getStaticPaths` | `fetch()` + `generateStaticParams()` |
| `useRouter()` from `next/router` | `useRouter()` from `next/navigation` |
| `<Head>` de `next/head` | `export const metadata` ou `generateMetadata()` |
| Pas de loading natif | `loading.tsx` (convention fichier) |
| `pages/_error.tsx` | `error.tsx` + `not-found.tsx` |
| Tout est Client Component | Tout est Server Component par defaut |

### Etapes de migration

1. **Vérifier la compatibilite** : Next.js 13.4+ requis, idealement monter en 14+
2. **Créer le dossier `app/`** à la racine — il coexiste avec `pages/`
3. **Migrer le layout global** : `_app.tsx` → `app/layout.tsx`
4. **Migrer page par page** (les deux dossiers coexistent) :
   - Créer `app/ma-page/page.tsx`
   - Deplacer la logique de `getServerSideProps` dans le composant async
   - Supprimer l'ancienne `pages/ma-page.tsx` quand la nouvelle est prete
5. **Migrer les API routes** : `pages/api/x.ts` → `app/api/x/route.ts`
6. **Ajouter les `loading.tsx`** et `error.tsx` la ou pertinent
7. **Migrer les metadata** : `<Head>` → `export const metadata`
8. **Marquer les composants interactifs** avec `'use client'`
9. **Revoir le caching** : l'App Router cache agressivement par defaut
10. **Supprimer `pages/`** quand la migration est complete

### Avant / Après

**Structure de fichiers** :

```
# Pages Router
pages/
  _app.tsx
  _document.tsx
  index.tsx
  about.tsx
  blog/
    index.tsx
    [slug].tsx
  api/
    hello.ts

# App Router
app/
  layout.tsx          ← remplace _app.tsx et _document.tsx
  page.tsx            ← index
  about/
    page.tsx
  blog/
    page.tsx
    [slug]/
      page.tsx
      loading.tsx     ← loading state automatique
      error.tsx       ← error boundary automatique
  api/
    hello/
      route.ts        ← Route Handler
```

**Data fetching : getServerSideProps → Server Component** :

```tsx
// Pages Router
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`https://api.example.com/posts`);
  const posts = await res.json();
  return { props: { posts } };
}

export default function Blog({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}

// App Router — le composant EST la fonction serveur
export default async function Blog() {
  const res = await fetch('https://api.example.com/posts');
  const posts: Post[] = await res.json();

  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
```

**Data fetching : getStaticProps → fetch avec cache** :

```tsx
// Pages Router
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/config');
  const config = await res.json();
  return { props: { config }, revalidate: 3600 };
}

export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  return {
    paths: posts.map((p: Post) => ({ params: { slug: p.slug } })),
    fallback: 'blocking'
  };
}

// App Router
// Dans app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const res = await fetch('https://api.example.com/posts');
  const posts: Post[] = await res.json();
  return posts.map(p => ({ slug: p.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const res = await fetch(`https://api.example.com/posts/${params.slug}`, {
    next: { revalidate: 3600 } // equivalent de revalidate dans getStaticProps
  });
  const post: Post = await res.json();
  return <article><h1>{post.title}</h1></article>;
}
```

**Layout global** :

```tsx
// Pages Router — _app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Header } from '../components/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

// App Router — app/layout.tsx
import '../styles/globals.css';
import { Header } from '@/components/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
```

**useRouter migration** :

```tsx
// Pages Router
import { useRouter } from 'next/router';

function SearchBar() {
  const router = useRouter();
  const { query } = router.query; // lecture des query params

  function handleSearch(term: string) {
    router.push({ pathname: '/search', query: { q: term } });
  }
  // ...
}

// App Router
'use client';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q'); // lecture des query params

  function handleSearch(term: string) {
    router.push(`/search?q=${term}`);
  }
  // ...
}
```

**Server vs Client components** :

```tsx
// App Router — Server Component (defaut, pas de directive)
// Ce code ne sera JAMAIS envoye au navigateur
import { db } from '@/lib/db';

export default async function UserList() {
  const users = await db.user.findMany(); // acces direct a la DB
  return (
    <ul>
      {users.map(u => <li key={u.id}><UserCard user={u} /></li>)}
    </ul>
  );
}

// App Router — Client Component (interactif)
'use client';
import { useState } from 'react';

export function UserCard({ user }: { user: User }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div onClick={() => setExpanded(!expanded)}>
      <h3>{user.name}</h3>
      {expanded && <p>{user.bio}</p>}
    </div>
  );
}
```

**Metadata** :

```tsx
// Pages Router
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>A propos</title>
        <meta name="description" content="Page a propos" />
      </Head>
      <h1>A propos</h1>
    </>
  );
}

// App Router — metadata statique
export const metadata = {
  title: 'A propos',
  description: 'Page a propos',
};

export default function About() {
  return <h1>A propos</h1>;
}

// App Router — metadata dynamique
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.coverImage] },
  };
}
```

**Route Handlers (remplacement API Routes)** :

```typescript
// Pages Router — pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await getUsers();
    res.status(200).json(users);
  } else if (req.method === 'POST') {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } else {
    res.status(405).end();
  }
}

// App Router — app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await createUser(body);
  return NextResponse.json(user, { status: 201 });
}
```

**Loading et Error states** :

```tsx
// App Router — app/blog/loading.tsx
// Affiche automatiquement pendant que page.tsx charge ses donnees
export default function Loading() {
  return <div className="skeleton">Chargement des articles...</div>;
}

// App Router — app/blog/error.tsx
'use client'; // les error boundaries doivent etre Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Erreur : {error.message}</h2>
      <button onClick={reset}>Reessayer</button>
    </div>
  );
}
```

### Pieges courants

- **Le caching de l'App Router est agressif par defaut** : `fetch()` dans un Server Component est cache statiquement. Pour du dynamique, utiliser `{ cache: 'no-store' }` ou `export const dynamic = 'force-dynamic'`.
- **On ne peut pas importer un Server Component dans un Client Component** : c'est l'inverse qui fonctionne (passer des Server Components comme `children` d'un Client Component).
- **`useRouter`, `useSearchParams`, `usePathname` viennent de `next/navigation`** et non `next/router` — l'autocompletition propose souvent le mauvais import.
- **Les cookies et headers ne sont accessibles que dans les Server Components** : utiliser `cookies()` et `headers()` de `next/headers`.
- **`loading.tsx` wrap automatiquement dans Suspense** : ne pas ajouter un `<Suspense>` en plus dans le layout, ça créé un double fallback.
- **Migration incrementale** : `pages/` et `app/` peuvent coexister, MAIS une même route ne peut pas exister dans les deux — Next.js leve une erreur.
- **Les variables d'env `NEXT_PUBLIC_*` fonctionnent toujours** dans les Client Components, mais dans les Server Components on peut acceder a `process.env.SECRET` directement (sans prefix).
