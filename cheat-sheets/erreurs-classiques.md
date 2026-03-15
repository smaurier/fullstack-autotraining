# Catalogue des erreurs classiques par cours

> Erreurs que tout dev fullstack rencontre (et qu'on te demandera en entretien).
> Pour chaque erreur : pourquoi c'est faux, comment corriger, code avant/apres.

---

## TypeScript

### ❌ `any` partout quand on ne sait pas typer

**Pourquoi c'est un probleme** : `any` desactive le type-checker. Tu perds tout l'interet de TypeScript — les bugs passent a la compilation et explosent en production. C'est viral : un `any` se propage dans toute la chaine d'appels.

**Le fix** : Utiliser `unknown` + narrowing. `unknown` force a verifier le type avant de l'utiliser.

```typescript
// ❌ Mauvais
function parse(input: any) {
  return input.name.toUpperCase(); // aucune erreur TS, crash runtime si input = 42
}

// ✅ Correct
function parse(input: unknown) {
  if (typeof input === 'object' && input !== null && 'name' in input) {
    const { name } = input as { name: string };
    return name.toUpperCase();
  }
  throw new Error('Format invalide');
}
```

---

### ❌ Confusion entre `type` et `interface`

**Pourquoi c'est un probleme** : Utiliser l'un a la place de l'autre sans comprendre les differences — `interface` se merge automatiquement (declaration merging), `type` peut representer des unions et intersections. Choisir au hasard cree de l'incoherence et des bugs subtils.

**Le fix** : `interface` pour les formes d'objets (surtout si extensible ou publique). `type` pour les unions, intersections, mapped types, et les types utilitaires.

```typescript
// ❌ Mauvais — interface pour une union
interface Status {
  // ... impossible de faire une union avec interface
}

// ❌ Mauvais — type pour un contrat d'objet extensible
type UserService = {
  getUser(id: string): Promise<User>;
};
// impossible de faire du declaration merging si un plugin veut etendre

// ✅ Correct
type Status = 'idle' | 'loading' | 'error' | 'success'; // union → type

interface UserService {  // contrat d'objet extensible → interface
  getUser(id: string): Promise<User>;
}

// Un plugin peut etendre :
interface UserService {
  deleteUser(id: string): Promise<void>;
}
```

---

### ❌ Oublier `readonly` sur les props et le state

**Pourquoi c'est un probleme** : Sans `readonly`, rien n'empeche de muter un objet passe en parametre. Les mutations accidentelles sont la source numero un de bugs dans les apps React/Vue avec du state partage.

**Le fix** : Marquer les props, les retours de fonction et le state comme `readonly` ou `Readonly<T>`.

```typescript
// ❌ Mauvais
interface Props {
  items: string[];
  config: { theme: string };
}

function process(props: Props) {
  props.items.push('oops');       // mutation silencieuse du parent
  props.config.theme = 'dark';    // mutation silencieuse
}

// ✅ Correct
interface Props {
  readonly items: readonly string[];
  readonly config: Readonly<{ theme: string }>;
}

function process(props: Props) {
  props.items.push('oops');       // TS Error !
  props.config.theme = 'dark';    // TS Error !

  const newItems = [...props.items, 'ok']; // copie explicite
}
```

---

### ❌ Enum au lieu d'union literal

**Pourquoi c'est un probleme** : Les `enum` numeriques generent du JavaScript a l'execution (reverse mapping), augmentent le bundle, et ont des pieges : `enum Color { Red }` → `Color[0] === 'Red'` (accessible par index). Les `const enum` sont inlines mais cassent avec `isolatedModules` (Vite, esbuild).

**Le fix** : Preferer les unions de literals. Utiliser `as const` pour un objet si on a besoin de la valeur et du mapping.

```typescript
// ❌ Mauvais — enum numerique
enum Status {
  Idle,      // 0
  Loading,   // 1
  Error,     // 2
}
// Status[0] === 'Idle' → reverse mapping inattendu
// genere ~15 lignes de JS

// ✅ Correct — union literal
type Status = 'idle' | 'loading' | 'error';

// Ou si on a besoin d'un mapping valeur/label :
const STATUS = {
  Idle: 'idle',
  Loading: 'loading',
  Error: 'error',
} as const;

type Status = (typeof STATUS)[keyof typeof STATUS]; // 'idle' | 'loading' | 'error'
```

---

### ❌ `as` casting au lieu de type guards

**Pourquoi c'est un probleme** : `as` dit au compilateur "fais-moi confiance" — il ne verifie rien au runtime. Si la donnee ne correspond pas au type, le bug passe silencieusement. C'est un `any` deguise.

**Le fix** : Utiliser des type guards (fonctions predicat `is`) ou du narrowing (`typeof`, `in`, `instanceof`).

```typescript
// ❌ Mauvais
const data = await fetch('/api/user').then(r => r.json());
const user = data as User; // aucune verification, crash si l'API change
console.log(user.email.toLowerCase());

// ✅ Correct
function isUser(data: unknown): data is User {
  return (
    typeof data === 'object' &&
    data !== null &&
    'email' in data &&
    typeof (data as User).email === 'string'
  );
}

const data: unknown = await fetch('/api/user').then(r => r.json());
if (!isUser(data)) {
  throw new Error('Reponse API invalide');
}
console.log(data.email.toLowerCase()); // type-safe
```

---

## React

### ❌ Memory leak sur useEffect (oublier le cleanup)

**Pourquoi c'est un probleme** : Un `useEffect` qui s'abonne a un event, un WebSocket ou un interval sans cleanup continue a tourner apres le demontage du composant. En dev ca genere le warning "Can't perform a React state update on an unmounted component". En prod, c'est une fuite memoire.

**Le fix** : Toujours retourner une fonction de nettoyage dans `useEffect`.

```tsx
// ❌ Mauvais
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (e) => setMessages(prev => [...prev, e.data]);
  // pas de cleanup → la connexion reste ouverte apres demontage
}, []);

// ✅ Correct
useEffect(() => {
  const ws = new WebSocket('wss://api.example.com');
  ws.onmessage = (e) => setMessages(prev => [...prev, e.data]);

  return () => {
    ws.close(); // cleanup au demontage
  };
}, []);
```

---

### ❌ Closure stale dans useEffect/useCallback

**Pourquoi c'est un probleme** : Le callback capture les valeurs du render ou il a ete cree. Si le dependency array est vide ou incomplet, le callback utilise des valeurs obsoletes — il "voit" l'ancien state/props.

**Le fix** : Lister toutes les dependances dans le tableau, ou utiliser la forme fonctionnelle du setter.

```tsx
// ❌ Mauvais — count est capture a 0 pour toujours
const [count, setCount] = useState(0);

useEffect(() => {
  const id = setInterval(() => {
    setCount(count + 1); // count est toujours 0 (stale closure)
  }, 1000);
  return () => clearInterval(id);
}, []); // count n'est pas dans les deps

// ✅ Correct — forme fonctionnelle, pas de dependance a count
useEffect(() => {
  const id = setInterval(() => {
    setCount(prev => prev + 1); // lit toujours la derniere valeur
  }, 1000);
  return () => clearInterval(id);
}, []); // deps vide OK car on n'utilise plus count directement
```

---

### ❌ Muter le state directement

**Pourquoi c'est un probleme** : React detecte les changements par reference (`===`). Si tu mutes un objet/array en place, la reference ne change pas → React ne re-rend pas → l'UI est desynchronisee du state.

**Le fix** : Toujours creer une nouvelle reference (spread, `map`, `filter`, `structuredClone`).

```tsx
// ❌ Mauvais
const [items, setItems] = useState(['a', 'b']);

const addItem = () => {
  items.push('c');   // mutation du tableau existant
  setItems(items);   // meme reference → React ignore le re-render
};

// ✅ Correct
const addItem = () => {
  setItems(prev => [...prev, 'c']); // nouvelle reference
};

// Pour un objet imbrique :
const [user, setUser] = useState({ name: 'Alice', address: { city: 'Paris' } });

// ❌ user.address.city = 'Lyon'; setUser(user);
// ✅
setUser(prev => ({
  ...prev,
  address: { ...prev.address, city: 'Lyon' },
}));
```

---

### ❌ Re-renders inutiles (memo/useMemo/useCallback mal utilises)

**Pourquoi c'est un probleme** : A chaque render du parent, les enfants re-rendent — meme si leurs props n'ont pas change. Sur de grosses listes ou des composants lourds, ca tue la performance. Mais aussi : utiliser `memo` partout sans raison ajoute de la complexite sans gain mesurable.

**Le fix** : `React.memo` sur les enfants couteux + stabiliser les props avec `useMemo`/`useCallback`. Mesurer avant d'optimiser (React DevTools Profiler).

```tsx
// ❌ Mauvais — nouvelle fonction a chaque render → memo du child inutile
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = () => console.log('click'); // recree a chaque render

  return <ExpensiveChild onClick={handleClick} />;
}

const ExpensiveChild = memo(({ onClick }: { onClick: () => void }) => {
  // re-rend quand meme car onClick est une nouvelle ref a chaque fois
  return <button onClick={onClick}>Click</button>;
});

// ✅ Correct
function Parent() {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => console.log('click'), []); // ref stable

  return <ExpensiveChild onClick={handleClick} />;
}
```

---

### ❌ Key prop avec l'index du tableau

**Pourquoi c'est un probleme** : Quand la liste change (ajout, suppression, reordonnement), React utilise la `key` pour identifier quel element correspond a quel noeud DOM. Avec `index`, un element supprime au milieu decale tous les index suivants → React reutilise les mauvais noeuds DOM → state interne melange, inputs qui gardent l'ancienne valeur.

**Le fix** : Utiliser un identifiant stable et unique (id de la base, uuid).

```tsx
// ❌ Mauvais
{items.map((item, index) => (
  <TodoItem key={index} item={item} />
  // si on supprime l'item 0, l'item 1 prend key=0
  // → React pense que c'est le meme composant, garde son state
))}

// ✅ Correct
{items.map((item) => (
  <TodoItem key={item.id} item={item} />
  // chaque item garde sa key meme apres reordonnement
))}
```

---

### ❌ Fetch dans useEffect sans gestion de race condition

**Pourquoi c'est un probleme** : Si le composant re-rend avant que le fetch finisse (changement de filtre, navigation rapide), l'ancien fetch peut terminer apres le nouveau → le state affiche des donnees obsoletes correspondant a l'ancienne requete.

**Le fix** : Utiliser un flag `ignore` dans le cleanup, ou `AbortController` pour annuler la requete.

```tsx
// ❌ Mauvais
useEffect(() => {
  fetch(`/api/users?q=${query}`)
    .then(r => r.json())
    .then(data => setUsers(data));
  // si query change vite : "alice" → "bob"
  // la reponse de "alice" peut arriver APRES celle de "bob"
}, [query]);

// ✅ Correct
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users?q=${query}`, { signal: controller.signal })
    .then(r => r.json())
    .then(data => setUsers(data))
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });

  return () => controller.abort(); // annule la requete precedente
}, [query]);
```

---

## Vue

### ❌ Reactivite perdue : destructurer un `reactive()`

**Pourquoi c'est un probleme** : `reactive()` retourne un Proxy. Quand tu destructures (`const { count } = state`), tu extrais la valeur primitive — elle n'est plus connectee au Proxy. Les modifications ne sont plus reactives, le template ne se met plus a jour.

**Le fix** : Utiliser `toRefs()` pour convertir chaque propriete en `Ref`, ou utiliser `ref()` directement.

```vue
<script setup lang="ts">
import { reactive, toRefs } from 'vue';

// ❌ Mauvais
const state = reactive({ count: 0, name: 'Alice' });
const { count } = state; // count = 0 (primitif, pas reactif)
// count++ ne met PAS a jour le template

// ✅ Correct — option 1 : toRefs
const state = reactive({ count: 0, name: 'Alice' });
const { count, name } = toRefs(state); // count est un Ref<number>
count.value++; // reactif, le template se met a jour

// ✅ Correct — option 2 : ref() directement
const count = ref(0);
count.value++; // reactif
</script>
```

---

### ❌ `watch` vs `watchEffect` : choisir le mauvais

**Pourquoi c'est un probleme** : `watch` est explicite (tu listes les sources). `watchEffect` traque automatiquement les dependances reactives accedees dans le callback. Utiliser `watch` quand `watchEffect` suffit = du boilerplate inutile. Utiliser `watchEffect` quand tu as besoin de l'ancienne valeur ou d'un controle fin = impossible.

**Le fix** : `watchEffect` pour les effets de bord simples (synchroniser). `watch` quand tu as besoin de l'ancienne valeur, du `deep`, `immediate`, ou d'une source specifique.

```vue
<script setup lang="ts">
// ❌ Mauvais — watch avec source redondante
const searchQuery = ref('');
watch(searchQuery, (newVal) => {
  fetchResults(newVal); // on n'a pas besoin de l'ancienne valeur
});

// ✅ Correct — watchEffect suffit ici
watchEffect(() => {
  fetchResults(searchQuery.value); // dependance auto-trackee
});

// ✅ watch est justifie quand on a besoin de comparer ancien/nouveau
watch(searchQuery, (newVal, oldVal) => {
  analytics.track('search_changed', { from: oldVal, to: newVal });
});
</script>
```

---

### ❌ `v-if` vs `v-show` : mauvais choix selon le cas

**Pourquoi c'est un probleme** : `v-if` detruit et recree le DOM a chaque toggle → couteux si le composant est lourd ou si on toggle souvent. `v-show` garde le composant dans le DOM (display: none) → couteux au rendu initial si le composant n'est jamais affiche.

**Le fix** : `v-show` pour un toggle frequent (onglets, tooltips). `v-if` pour du contenu rarement affiche ou conditionnel au chargement.

```vue
<!-- ❌ Mauvais — onglet toggle souvent, v-if detruit/recree a chaque clic -->
<HeavyChart v-if="activeTab === 'stats'" />

<!-- ✅ Correct — v-show garde le composant en DOM, toggle rapide -->
<HeavyChart v-show="activeTab === 'stats'" />

<!-- ✅ v-if justifie — contenu conditionnel charge une seule fois -->
<AdminPanel v-if="user.isAdmin" />
```

---

### ❌ Modifier une prop directement

**Pourquoi c'est un probleme** : En Vue, les props sont en one-way data flow. Muter une prop directement casse le flux de donnees, genere un warning en dev, et cree des bugs de synchronisation entre parent et enfant — le parent ne sait pas que la valeur a change.

**Le fix** : Emettre un event pour que le parent modifie la valeur, ou utiliser `defineModel()` (Vue 3.4+).

```vue
<!-- ❌ Mauvais — mutation directe de la prop -->
<script setup lang="ts">
const props = defineProps<{ modelValue: string }>();
// dans un handler :
props.modelValue = 'new value'; // WARNING: mutating a prop directly
</script>

<!-- ✅ Correct — emit pour le parent -->
<script setup lang="ts">
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

function onChange(value: string) {
  emit('update:modelValue', value);
}
</script>

<!-- ✅ Encore mieux — defineModel (Vue 3.4+) -->
<script setup lang="ts">
const model = defineModel<string>();
// model.value = 'new value' fonctionne et emet automatiquement
</script>
```

---

### ❌ Oublier le cleanup dans `onUnmounted`

**Pourquoi c'est un probleme** : Meme probleme qu'en React — les listeners, intervals, et subscriptions continuent apres la destruction du composant → fuite memoire, erreurs "setting reactive property on unmounted instance".

**Le fix** : Toujours nettoyer dans `onUnmounted` (ou utiliser `onScopeDispose` dans les composables).

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

// ❌ Mauvais
onMounted(() => {
  window.addEventListener('resize', handleResize);
  setInterval(pollData, 5000);
  // jamais nettoye → fuite memoire
});

// ✅ Correct
let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
  window.addEventListener('resize', handleResize);
  intervalId = setInterval(pollData, 5000);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  clearInterval(intervalId);
});
</script>
```

---

## Angular

### ❌ `subscribe()` sans `unsubscribe` → memory leak

**Pourquoi c'est un probleme** : Chaque `subscribe()` cree un abonnement. Si le composant est detruit sans desabonnement, l'Observable continue d'emettre → fuite memoire, callbacks executees sur un composant detruit, requetes HTTP fantomes.

**Le fix** : `takeUntilDestroyed()` (Angular 16+), ou le pipe `async` dans le template (zero subscribe manuel).

```typescript
// ❌ Mauvais
@Component({ /* ... */ })
export class UserComponent implements OnInit {
  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users; // tourne encore apres la destruction
    });
  }
}

// ✅ Correct — option 1 : takeUntilDestroyed (Angular 16+)
@Component({ /* ... */ })
export class UserComponent {
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.userService.getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(users => this.users = users);
  }
}

// ✅ Correct — option 2 : async pipe (aucun subscribe dans la classe)
@Component({
  template: `
    @for (user of users$ | async; track user.id) {
      <div>{{ user.name }}</div>
    }
  `
})
export class UserComponent {
  users$ = this.userService.getUsers();
}
```

---

### ❌ Change detection : zone.js re-rend tout

**Pourquoi c'est un probleme** : Par defaut, Angular utilise `ChangeDetectionStrategy.Default` — a chaque event (click, timer, HTTP), zone.js declenche la detection de changements sur TOUT l'arbre de composants. Sur une grosse app, c'est catastrophique pour les performances.

**Le fix** : `ChangeDetectionStrategy.OnPush` sur tous les composants. Le composant ne re-rend que quand ses `@Input` changent par reference ou quand un Observable emet via `async` pipe.

```typescript
// ❌ Mauvais — default strategy, re-check a chaque event global
@Component({
  selector: 'app-user-list',
  template: `<div *ngFor="let u of users">{{ u.name }}</div>`,
})
export class UserListComponent {
  @Input() users: User[] = [];
}

// ✅ Correct
@Component({
  selector: 'app-user-list',
  template: `<div *ngFor="let u of users">{{ u.name }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users: User[] = [];
}
```

---

### ❌ Dependance circulaire dans l'injection

**Pourquoi c'est un probleme** : ServiceA injecte ServiceB qui injecte ServiceA → erreur a l'execution `Circular dependency detected`. Angular ne peut pas resoudre l'arbre de dependances.

**Le fix** : Extraire la logique partagee dans un troisieme service, ou utiliser `forwardRef` + injection lazy.

```typescript
// ❌ Mauvais — dependance circulaire
@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private userService: UserService) {} // UserService → AuthService
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private authService: AuthService) {} // boucle !
}

// ✅ Correct — extraire la logique commune
@Injectable({ providedIn: 'root' })
export class TokenService { // logique partagee extraite
  getToken(): string { /* ... */ return ''; }
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private tokenService: TokenService) {}
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private tokenService: TokenService) {}
}
```

---

### ❌ Template-driven forms sur un formulaire complexe

**Pourquoi c'est un probleme** : Les template-driven forms (`ngModel`) fonctionnent pour des formulaires simples. Mais pour des validations dynamiques, des champs conditionnels, ou du testing unitaire, c'est un cauchemar — la logique est dispersee dans le template, difficile a tester et a typer.

**Le fix** : Reactive Forms (`FormGroup`, `FormControl`) pour tout formulaire non trivial. Typees depuis Angular 14 avec `FormControl<string>`.

```typescript
// ❌ Mauvais — template-driven sur un formulaire complexe
@Component({
  template: `
    <input [(ngModel)]="user.name" required minlength="3">
    <input [(ngModel)]="user.email" required email>
    <!-- validation custom ? cross-field ? conditional ? → galere -->
  `
})
export class UserFormComponent {
  user = { name: '', email: '' };
}

// ✅ Correct — Reactive Forms type-safe
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="name">
      <input formControlName="email">
    </form>
  `
})
export class UserFormComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.getRawValue()); // type-safe
    }
  }
}
```

---

### ❌ NgModule hell (ignorer les standalone components)

**Pourquoi c'est un probleme** : Avant Angular 14, chaque composant devait etre declare dans un `NgModule`. Ca cree des fichiers boilerplate, des erreurs "Component X is not part of any NgModule", et une complexite structurelle inutile. Depuis Angular 14+, les standalone components rendent les NgModules optionnels.

**Le fix** : `standalone: true` sur tous les nouveaux composants. Importer directement les dependances dans le composant.

```typescript
// ❌ Mauvais — NgModule classique
@NgModule({
  declarations: [UserCardComponent, UserListComponent, UserBadgeComponent],
  imports: [CommonModule, SharedModule, MaterialModule],
  exports: [UserListComponent],
})
export class UserModule {}

// ✅ Correct — standalone components (Angular 14+)
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [NgIf, NgFor, DatePipe], // importe seulement ce qu'il faut
  template: `...`,
})
export class UserCardComponent {
  @Input() user!: User;
}
```

---

## NestJS

### ❌ Dependance circulaire entre modules

**Pourquoi c'est un probleme** : ModuleA importe ModuleB qui importe ModuleA → NestJS ne peut pas resoudre l'arbre d'injection et throw une erreur cryptique au demarrage.

**Le fix** : `forwardRef()` des deux cotes (module + provider). Ou mieux : restructurer pour casser la circularite.

```typescript
// ❌ Mauvais — crash au demarrage
@Module({
  imports: [ModuleB], // ModuleB imports ModuleA → boucle
})
export class ModuleA {}

// ✅ Correct — forwardRef des deux cotes
@Module({
  imports: [forwardRef(() => ModuleB)],
  providers: [ServiceA],
  exports: [ServiceA],
})
export class ModuleA {}

@Module({
  imports: [forwardRef(() => ModuleA)],
  providers: [ServiceB],
  exports: [ServiceB],
})
export class ModuleB {}

// ✅ Encore mieux — extraire un SharedModule
@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
```

---

### ❌ N+1 queries avec TypeORM

**Pourquoi c'est un probleme** : Par defaut, les relations TypeORM sont en lazy loading. Charger une liste de 100 users avec leurs posts = 1 query users + 100 queries posts. La page met 3 secondes a charger, la DB souffre.

**Le fix** : Utiliser `relations` dans `find()` (eager join) ou `QueryBuilder` avec `leftJoinAndSelect`.

```typescript
// ❌ Mauvais — N+1 queries
const users = await this.userRepo.find();
for (const user of users) {
  const posts = await user.posts; // 1 query par user !
}

// ✅ Correct — eager loading en une query
const users = await this.userRepo.find({
  relations: ['posts'], // JOIN en une seule query
});

// ✅ Correct — QueryBuilder pour plus de controle
const users = await this.userRepo
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.posts', 'post')
  .where('user.isActive = :active', { active: true })
  .getMany();
```

---

### ❌ Pas de validation sur les DTOs

**Pourquoi c'est un probleme** : Sans `class-validator` + `ValidationPipe`, n'importe quelle donnee passe. Un body `{ "email": 42, "role": "admin" }` est accepte → crash dans le service, ou pire, injection de donnees non prevues.

**Le fix** : Decorateurs `class-validator` sur les DTOs + `ValidationPipe` global.

```typescript
// ❌ Mauvais — aucune validation
@Controller('users')
export class UserController {
  @Post()
  create(@Body() body: any) { // any + pas de validation
    return this.userService.create(body);
  }
}

// ✅ Correct
// dto :
export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  name!: string;

  @IsEnum(Role)
  role!: Role;
}

// main.ts :
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,         // supprime les champs non declares
  forbidNonWhitelisted: true, // erreur si champ inconnu
  transform: true,         // transforme le body en instance de DTO
}));

// controller :
@Post()
create(@Body() dto: CreateUserDto) { // valide automatiquement
  return this.userService.create(dto);
}
```

---

### ❌ Confusion global vs module-scoped providers

**Pourquoi c'est un probleme** : Un provider `{ providedIn: 'root' }` (ou via `app.module`) est un singleton global. Mais un provider dans un module specifique est scope a ce module — si un autre module l'injecte sans importer le bon module, il obtient une instance differente ou une erreur.

**Le fix** : Etre explicite sur le scope. Utiliser `@Global()` seulement pour les services vraiment transverses (config, logger). Exporter explicitement les providers partages.

```typescript
// ❌ Mauvais — scope ambigu
@Module({
  providers: [CacheService], // scope module, pas exporte
})
export class CacheModule {}

// Autre module essaie de l'injecter → erreur ou instance differente

// ✅ Correct — export explicite
@Module({
  providers: [CacheService],
  exports: [CacheService], // accessible aux modules qui importent CacheModule
})
export class CacheModule {}

// ✅ Ou global si vraiment transverse
@Global()
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
```

---

### ❌ `throw new Error()` au lieu de `HttpException`

**Pourquoi c'est un probleme** : Un `throw new Error('Not found')` dans un service NestJS retourne un 500 Internal Server Error au client. Le message d'erreur original est perdu (ou expose du stack trace en dev). Le client ne peut pas distinguer une 404 d'une 500.

**Le fix** : Utiliser les classes `HttpException` specifiques (`NotFoundException`, `BadRequestException`, etc.) ou un `ExceptionFilter` custom.

```typescript
// ❌ Mauvais
@Injectable()
export class UserService {
  async findOne(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new Error('User not found'); // → 500 au client
    }
    return user;
  }
}

// ✅ Correct
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  async findOne(id: string) {
    const user = await this.userRepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
      // → 404 { statusCode: 404, message: "User xxx not found" }
    }
    return user;
  }
}
```

---

## PostgreSQL

### ❌ `SELECT *` en production

**Pourquoi c'est un probleme** : `SELECT *` ramene toutes les colonnes, y compris les BLOB, les colonnes ajoutees plus tard, les donnees sensibles. Ca casse les covering indexes, augmente le transfert reseau, et rend le code fragile face aux migrations de schema.

**Le fix** : Toujours lister explicitement les colonnes necessaires.

```sql
-- ❌ Mauvais
SELECT * FROM users WHERE active = true;
-- ramene le hash du password, le avatar BLOB de 5MB, les 45 colonnes

-- ✅ Correct
SELECT id, name, email, created_at
FROM users
WHERE active = true;
-- utilise un covering index, transfert minimal
```

---

### ❌ Index sur des colonnes a faible cardinalite

**Pourquoi c'est un probleme** : Un index sur une colonne `boolean` (true/false) ou `status` (3 valeurs) est quasi-inutile. Le planner prefere un seq scan car l'index filtre trop peu. L'index occupe de l'espace disque et ralentit les INSERT/UPDATE pour rien.

**Le fix** : Indexer les colonnes a haute cardinalite (email, uuid). Pour les booleens, utiliser un index partiel.

```sql
-- ❌ Mauvais — index inutile sur 2 valeurs possibles
CREATE INDEX idx_users_active ON users(active);
-- 90% des users sont active=true → index jamais utilise par le planner

-- ✅ Correct — index partiel pour le cas rare
CREATE INDEX idx_users_inactive ON users(id) WHERE active = false;
-- petit index, utilise seulement quand on cherche les inactifs

-- ✅ Correct — index sur haute cardinalite
CREATE INDEX idx_users_email ON users(email);
```

---

### ❌ N+1 queries depuis l'ORM

**Pourquoi c'est un probleme** : Charger des entites en boucle plutot qu'en un seul JOIN ou `IN`. L'ORM masque les queries SQL — 100 entities = 101 queries. Le temps de reponse de l'API explose.

**Le fix** : Eager loading, `IN` queries, ou DataLoader pattern pour GraphQL.

```typescript
// ❌ Mauvais — N+1 avec TypeORM
const orders = await orderRepo.find();
for (const order of orders) {
  order.customer = await customerRepo.findOneBy({ id: order.customerId });
  // 1 query par commande !
}

// ✅ Correct — une seule query avec JOIN
const orders = await orderRepo.find({
  relations: ['customer'],
});

// ✅ Correct — batch loading manuel
const orders = await orderRepo.find();
const customerIds = [...new Set(orders.map(o => o.customerId))];
const customers = await customerRepo.findBy({ id: In(customerIds) });
const customerMap = new Map(customers.map(c => [c.id, c]));
orders.forEach(o => o.customer = customerMap.get(o.customerId)!);
```

---

### ❌ Transaction isolation trop basse

**Pourquoi c'est un probleme** : `READ COMMITTED` (defaut PostgreSQL) autorise les phantom reads — entre deux SELECT dans la meme transaction, de nouvelles lignes peuvent apparaitre. Pour un calcul financier ou un rapport, les chiffres deviennent incoherents.

**Le fix** : `REPEATABLE READ` pour les rapports, `SERIALIZABLE` pour les operations critiques. Gerer les erreurs de serialisation (retry).

```sql
-- ❌ Mauvais — read committed par defaut
BEGIN;
SELECT sum(amount) FROM transactions WHERE account_id = 1;
-- un autre processus insere une transaction ici
SELECT sum(amount) FROM transactions WHERE account_id = 1;
-- resultat different ! (phantom read)
COMMIT;

-- ✅ Correct — repeatable read
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SELECT sum(amount) FROM transactions WHERE account_id = 1;
-- snapshot stable, meme resultat meme si insertion concurrente
SELECT sum(amount) FROM transactions WHERE account_id = 1;
COMMIT;
```

---

### ❌ `LIKE '%pattern'` : index impossible

**Pourquoi c'est un probleme** : Un B-tree index ne peut pas aider quand le wildcard est au debut — il faudrait scanner tout l'index. Sur une table de 10M de lignes, c'est un seq scan.

**Le fix** : Utiliser un index trigram (`pg_trgm`) pour les recherches partielles, ou full-text search pour le texte naturel.

```sql
-- ❌ Mauvais — seq scan garanti
SELECT * FROM products WHERE name LIKE '%phone%';
-- le B-tree index sur name est ignore

-- ✅ Correct — index trigram
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX idx_products_name_trgm ON products USING gin (name gin_trgm_ops);

SELECT * FROM products WHERE name LIKE '%phone%';
-- utilise l'index trigram, rapide meme sur des millions de lignes

-- ✅ Alternative — full-text search
ALTER TABLE products ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (to_tsvector('french', name || ' ' || description)) STORED;
CREATE INDEX idx_products_fts ON products USING gin (search_vector);

SELECT * FROM products WHERE search_vector @@ to_tsquery('french', 'telephone');
```

---

### ❌ Pas de `LIMIT` sur des tables volumineuses

**Pourquoi c'est un probleme** : Sans LIMIT, PostgreSQL retourne TOUTES les lignes. Sur une table de 5M de lignes, ca sature la memoire du serveur, le reseau, et le client. Meme un `SELECT id FROM logs` peut generer des Go de donnees.

**Le fix** : Toujours mettre un `LIMIT` + pagination (offset ou cursor-based).

```sql
-- ❌ Mauvais
SELECT id, message, created_at FROM logs WHERE level = 'ERROR';
-- retourne potentiellement 500 000 lignes

-- ✅ Correct — pagination par offset (simple mais lent sur les grandes pages)
SELECT id, message, created_at FROM logs
WHERE level = 'ERROR'
ORDER BY created_at DESC
LIMIT 50 OFFSET 0;

-- ✅ Correct — cursor-based pagination (performant)
SELECT id, message, created_at FROM logs
WHERE level = 'ERROR' AND created_at < '2026-03-15T00:00:00Z'
ORDER BY created_at DESC
LIMIT 50;
```

---

## Testing

### ❌ Tout mocker → tests qui ne testent rien

**Pourquoi c'est un probleme** : Si tu mockes le service, le repo, la DB, le HTTP client, et le logger — ton test verifie que tes mocks fonctionnent, pas ton code. Le test passe meme si l'implementation est cassee. Zero confiance dans le resultat.

**Le fix** : Mocker seulement les frontieres (I/O externe : API tierces, filesystem, horloge). Garder la logique metier reelle.

```typescript
// ❌ Mauvais — tout est mocke
it('should calculate total', () => {
  const mockCart = { getItems: jest.fn().mockReturnValue([{ price: 10 }]) };
  const mockTax = { calculate: jest.fn().mockReturnValue(2) };
  const service = new OrderService(mockCart as any, mockTax as any);
  expect(service.getTotal()).toBe(12); // on teste juste que 10+2=12
});

// ✅ Correct — logique reelle, mock seulement l'API externe
it('should calculate total with tax', () => {
  const cart = new Cart(); // vrai objet
  cart.addItem({ name: 'Widget', price: 10, qty: 2 });
  const taxService = new TaxService(); // vrai calcul
  const mockPaymentGateway = { charge: vi.fn() }; // mock = frontiere I/O

  const service = new OrderService(cart, taxService, mockPaymentGateway);
  expect(service.getTotal()).toBe(24); // 20 + 20% TVA = 24
});
```

---

### ❌ Tester l'implementation, pas le comportement

**Pourquoi c'est un probleme** : Si le test verifie que `service.calculateTotal` appelle `repo.findById` puis `utils.multiply`, le moindre refactoring casse le test — meme si le resultat est identique. Les tests deviennent un frein au changement au lieu d'un filet de securite.

**Le fix** : Tester le resultat observable (output, effet de bord, etat final). Pas les etapes internes.

```typescript
// ❌ Mauvais — teste l'implementation
it('should call repository and formatter', () => {
  const spy = jest.spyOn(userRepo, 'findById');
  const formatSpy = jest.spyOn(formatter, 'toDTO');
  service.getUser('123');
  expect(spy).toHaveBeenCalledWith('123');  // fragile
  expect(formatSpy).toHaveBeenCalled();      // fragile
});

// ✅ Correct — teste le comportement
it('should return formatted user', async () => {
  // Arrange : inserer un user dans la DB de test
  await testDb.insert('users', { id: '123', name: 'Alice', email: 'a@b.com' });

  // Act
  const result = await service.getUser('123');

  // Assert : on verifie le resultat, pas comment on y arrive
  expect(result).toEqual({ id: '123', name: 'Alice', email: 'a@b.com' });
});
```

---

### ❌ Tests dependants de l'ordre d'execution

**Pourquoi c'est un probleme** : Test A cree un user en DB. Test B suppose que ce user existe. Si on lance B seul ou si l'ordre change (parallelisation), B echoue. L'investigation est un cauchemar — "ca marchait hier".

**Le fix** : Chaque test doit setup et cleanup son propre etat. Utiliser `beforeEach`/`afterEach`.

```typescript
// ❌ Mauvais — depend de l'ordre
describe('UserService', () => {
  it('should create user', async () => {
    await service.create({ name: 'Alice' }); // laisse un user en DB
  });

  it('should find user', async () => {
    const user = await service.findByName('Alice'); // depend du test precedent !
    expect(user).toBeDefined();
  });
});

// ✅ Correct — chaque test est independant
describe('UserService', () => {
  afterEach(async () => {
    await testDb.query('DELETE FROM users'); // cleanup
  });

  it('should create user', async () => {
    await service.create({ name: 'Alice' });
    const found = await service.findByName('Alice');
    expect(found).toBeDefined();
  });

  it('should return null for unknown user', async () => {
    const found = await service.findByName('Bob');
    expect(found).toBeNull();
  });
});
```

---

### ❌ Tester uniquement le happy path

**Pourquoi c'est un probleme** : Si tu testes seulement "quand tout va bien", tu ne sais pas comment ton code reagit aux erreurs — et c'est en production que tu l'apprendras. Les bugs les plus critiques sont dans les cas d'erreur.

**Le fix** : Pour chaque test positif, ajouter au moins un test d'erreur et un test edge case.

```typescript
// ❌ Mauvais — happy path only
describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });
});

// ✅ Correct — happy path + erreurs + edge cases
describe('divide', () => {
  it('should divide two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  it('should throw on division by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero');
  });

  it('should handle negative numbers', () => {
    expect(divide(-10, 2)).toBe(-5);
  });

  it('should handle decimal results', () => {
    expect(divide(1, 3)).toBeCloseTo(0.333, 3);
  });
});
```

---

### ❌ `afterEach` oublie → test pollution

**Pourquoi c'est un probleme** : Un test modifie un etat global (variable, DOM, mock, timer) et ne le restaure pas. Le test suivant herite de cet etat modifie → resultats non deterministes. "Ca passe en local, ca echoue en CI."

**Le fix** : Toujours nettoyer dans `afterEach`. Utiliser `vi.restoreAllMocks()` pour les mocks Vitest.

```typescript
// ❌ Mauvais — mock jamais restaure
describe('DateService', () => {
  it('should format today', () => {
    vi.setSystemTime(new Date('2026-01-01'));
    expect(formatDate()).toBe('01/01/2026');
    // le temps reste fige pour TOUS les tests suivants !
  });
});

// ✅ Correct
describe('DateService', () => {
  afterEach(() => {
    vi.useRealTimers();     // restaure l'horloge
    vi.restoreAllMocks();   // restaure tous les mocks/spies
  });

  it('should format today', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-01-01'));
    expect(formatDate()).toBe('01/01/2026');
  });
});
```

---

## HTTP / Caching

### ❌ `Cache-Control` mal configure

**Pourquoi c'est un probleme** : `max-age=31536000` sans `immutable` → le navigateur fait des requetes conditionnelles (If-None-Match) a chaque navigation. `no-cache` ne veut PAS dire "ne pas cacher" (c'est `no-store`) — ca veut dire "revalider a chaque requete". La confusion entre les deux est un classique d'entretien.

**Le fix** : Comprendre la semantique exacte de chaque directive.

```
# ❌ Mauvais — confusion no-cache / no-store
Cache-Control: no-cache
# Le navigateur CACHE mais revalide → requete a chaque fois (304 possible)
# Le dev pensait : "ne pas cacher du tout"

# ✅ Correct — ne rien cacher
Cache-Control: no-store
# Rien en cache, requete complete a chaque fois

# ❌ Mauvais — assets hashes sans immutable
Cache-Control: max-age=31536000
# Le navigateur peut quand meme revalider sur navigation

# ✅ Correct — assets avec hash dans le filename (style.abc123.css)
Cache-Control: public, max-age=31536000, immutable
# Zero requete pendant 1 an, le hash change si le fichier change
```

---

### ❌ ETag sans `If-None-Match` cote client

**Pourquoi c'est un probleme** : Le serveur envoie un `ETag` mais le client ne renvoie jamais `If-None-Match` → pas de revalidation conditionnelle, le serveur retourne toujours 200 avec le body complet. L'ETag ne sert a rien.

**Le fix** : S'assurer que le client (ou le framework) envoie automatiquement les headers conditionnels. `fetch()` natif le fait si le cache du navigateur est actif. Avec un CDN ou un proxy, verifier que les headers sont transmis.

```typescript
// ❌ Mauvais — fetch sans revalidation
const data = await fetch('/api/data', {
  cache: 'no-store', // desactive completement le cache du navigateur
});
// le serveur genere un ETag pour rien

// ✅ Correct — laisser le navigateur gerer le cache
const data = await fetch('/api/data');
// le navigateur envoie If-None-Match automatiquement
// le serveur retourne 304 Not Modified si rien n'a change

// ✅ Correct — revalidation manuelle (si besoin de controle)
const data = await fetch('/api/data', {
  headers: { 'If-None-Match': cachedETag },
});
if (data.status === 304) {
  // utiliser les donnees en cache
}
```

---

### ❌ CORS : wildcard `*` avec credentials

**Pourquoi c'est un probleme** : La spec CORS interdit `Access-Control-Allow-Origin: *` avec `Access-Control-Allow-Credentials: true`. Le navigateur BLOQUE la requete. C'est un piege classique — ca marche en dev (meme origine), ca casse en prod (cross-origin).

**Le fix** : Repondre avec l'origine specifique du client, pas `*`.

```
# ❌ Mauvais — interdit par la spec
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
# Le navigateur refuse la reponse

# ✅ Correct — origine specifique
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
Vary: Origin
# Vary: Origin est CRITIQUE pour que les caches ne melangent pas les reponses
```

```typescript
// ✅ Implementation Express
app.use(cors({
  origin: ['https://app.example.com', 'https://admin.example.com'],
  credentials: true,
}));
```

---

### ❌ `Content-Type` manquant sur les POST

**Pourquoi c'est un probleme** : Sans `Content-Type`, le serveur ne sait pas comment parser le body. Express avec `express.json()` ignore le body si le Content-Type n'est pas `application/json` → `req.body` est `undefined`. Le dev passe 2h a debugger "pourquoi mon body est vide".

**Le fix** : Toujours envoyer le header `Content-Type` adapte au format du body.

```typescript
// ❌ Mauvais — Content-Type oublie
await fetch('/api/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'Alice' }),
  // Content-Type absent → body non parse cote serveur → req.body = undefined
});

// ✅ Correct
await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Alice' }),
});
```

---

### ❌ Rate limiting cote client uniquement

**Pourquoi c'est un probleme** : Un throttle dans le code frontend n'empeche personne d'appeler directement l'API (curl, Postman, bot). Le rate limiting client est une optimisation UX, PAS une protection. Sans rate limiting serveur, ton API est ouverte au DDoS et au brute force.

**Le fix** : Rate limiting cote serveur (middleware). Le client peut en plus debounce/throttle pour l'UX.

```typescript
// ❌ Mauvais — rate limit cote client seulement
const throttledSubmit = throttle(async () => {
  await fetch('/api/login', { method: 'POST', body });
}, 1000);
// n'importe qui peut curl -X POST /api/login en boucle

// ✅ Correct — rate limit serveur (Express + express-rate-limit)
import rateLimit from 'express-rate-limit';

app.use('/api/login', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // 5 tentatives par IP
  standardHeaders: true,     // RateLimit-* headers
  message: { error: 'Too many attempts, try again later' },
}));

// Le client peut EN PLUS throttle pour l'UX :
const throttledSubmit = throttle(submit, 1000);
```

---

## Observability

### ❌ `console.log` en production

**Pourquoi c'est un probleme** : `console.log` n'a pas de niveaux (debug/info/warn/error), pas de format structure (JSON), pas de timestamp fiable, pas de metadata (requestId, userId). C'est impossible a filtrer dans un outil de centralisation (Loki, ELK, Datadog). En prod, tes logs sont un mur de texte inutile.

**Le fix** : Utiliser un logger structure avec niveaux (pino, winston) qui ecrit en JSON.

```typescript
// ❌ Mauvais
console.log('User created:', user.id);
console.log('Error:', error.message);
// → pas de niveau, pas de JSON, pas de contexte

// ✅ Correct (pino)
import pino from 'pino';
const logger = pino({ level: 'info' });

logger.info({ userId: user.id, action: 'user_created' }, 'User created');
logger.error({ err: error, userId: user.id }, 'Failed to create user');
// → {"level":30,"time":1710500000,"userId":"abc","action":"user_created","msg":"User created"}
// filtrable, parsable, avec contexte
```

---

### ❌ Utiliser un gauge pour un compteur

**Pourquoi c'est un probleme** : Un `gauge` peut monter ET descendre (temperature, queue length). Un `counter` ne fait que monter (requetes totales, erreurs). Si tu utilises un gauge pour compter des requetes, un restart remet a zero → les dashboards montrent des "dips" qui n'existent pas. Et `rate()` sur un gauge donne des resultats aberrants dans Prometheus.

**Le fix** : `counter` pour tout ce qui s'incremente. `gauge` pour les valeurs instantanees. `histogram` pour les distributions (latence).

```typescript
// ❌ Mauvais — gauge pour un compteur
const requestCount = new promClient.Gauge({
  name: 'http_requests',
  help: 'Total HTTP requests',
});
requestCount.set(requestCount.get() + 1); // simule un compteur avec un gauge

// ✅ Correct
const requestCount = new promClient.Counter({
  name: 'http_requests_total',     // convention : _total pour les counters
  help: 'Total HTTP requests',
  labelNames: ['method', 'status'],
});
requestCount.inc({ method: 'GET', status: '200' });

// Pour la latence → histogram (pas un gauge)
const requestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Request duration in seconds',
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 5],
});
```

---

### ❌ Pas de correlation ID → requetes non tracables

**Pourquoi c'est un probleme** : Une requete utilisateur traverse API Gateway → Auth Service → User Service → DB. Sans identifiant commun, quand ca casse, impossible de relier les logs des differents services. Tu passes 3h a chercher quelle requete a cause l'erreur.

**Le fix** : Generer un `X-Request-Id` (ou `traceparent` pour OpenTelemetry) au point d'entree et le propager dans tous les services.

```typescript
// ❌ Mauvais — aucune correlation
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
// les logs de chaque service sont isoles

// ✅ Correct — middleware de correlation
import { randomUUID } from 'crypto';
import { AsyncLocalStorage } from 'async_hooks';

const als = new AsyncLocalStorage<{ requestId: string }>();

app.use((req, res, next) => {
  const requestId = req.headers['x-request-id'] as string || randomUUID();
  res.setHeader('x-request-id', requestId);

  als.run({ requestId }, () => {
    logger.info({ requestId, method: req.method, url: req.url }, 'Request started');
    next();
  });
});

// Dans n'importe quel service en aval :
function getRequestId(): string {
  return als.getStore()?.requestId ?? 'unknown';
}
```

---

### ❌ Alerter sur les symptomes plutot que les causes

**Pourquoi c'est un probleme** : Alerter sur "CPU > 90%" declenche des faux positifs (un batch legitime utilise le CPU). Et ca ne dit pas QUEL service souffre ni POURQUOI. L'equipe recoit 50 alertes par jour → alert fatigue → plus personne ne reagit.

**Le fix** : Alerter sur les symptomes orientes utilisateur (SLI/SLO) : taux d'erreur, latence p99, disponibilite. Utiliser les metriques infra comme contexte de diagnostic, pas comme source d'alertes.

```yaml
# ❌ Mauvais — alerte infra brute
- alert: HighCPU
  expr: node_cpu_usage > 0.9
  for: 5m
  # declenche 10 fois par jour, souvent sans impact utilisateur

# ✅ Correct — alerte SLO (symptome utilisateur)
- alert: HighErrorRate
  expr: |
    sum(rate(http_requests_total{status=~"5.."}[5m]))
    /
    sum(rate(http_requests_total[5m]))
    > 0.01
  for: 5m
  labels:
    severity: critical
  annotations:
    summary: "Taux d'erreur 5xx > 1% depuis 5 min"
    dashboard: "https://grafana.example.com/d/api-overview"
    runbook: "https://wiki.example.com/runbooks/high-error-rate"
```

---

### ❌ Dashboards avec trop de panels

**Pourquoi c'est un probleme** : Un dashboard Grafana avec 40 panels : personne ne le lit. Chaque panel charge des queries Prometheus → le dashboard met 30 secondes a s'afficher. L'equipe finit par l'ignorer. Un dashboard que personne ne regarde ne sert a rien.

**Le fix** : Hierarchie USE/RED. Un dashboard principal avec 4-6 panels critiques (RED : Rate, Errors, Duration). Des dashboards de drill-down par service. Chaque panel doit repondre a une question precise.

```
# ❌ Mauvais — dashboard "fourre-tout"
Dashboard "API Overview" :
  - 40 panels : CPU, RAM, disk, network, latency p50/p90/p95/p99,
    error rate, request rate, GC pauses, thread count, cache hit rate,
    DB connections, queue depth, pod count, ...
  → personne ne sait ou regarder

# ✅ Correct — hierarchie RED (3 niveaux)
Dashboard "API Overview" (level 1 - 4 panels) :
  - Request rate (req/s)
  - Error rate (%)
  - Latency p99 (ms)
  - Availability (%)
  → visible en un coup d'oeil, repond a "est-ce que ca marche ?"

Dashboard "API Service X" (level 2 - drill-down) :
  - Latency par endpoint
  - Error rate par type (4xx vs 5xx)
  - Saturation (CPU, memory, connections)

Dashboard "DB Performance" (level 3 - specialise) :
  - Query duration par type
  - Connection pool usage
  - Lock wait time
```

---

> **Conseil d'entretien** : Pour chaque technologie, connais au moins 3 erreurs classiques par coeur avec un exemple concret. Les recruteurs testent ta capacite a anticiper les problemes, pas juste a coder le happy path.
