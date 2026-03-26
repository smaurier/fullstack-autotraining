# Code Katas — Phase A : Frameworks

> Des defis de code sans guidance. Juste un enonce, des contraintes, et le comportement attendu.
> Objectif : mass practice pour ancrer les patterns — timer toi et resiste a l'envie d'aller voir la doc.

---

## Vue (00-vue)

### Kata 1 — useDebounce from scratch

**Difficulte** : ⭐⭐
**Temps cible** : 30 min

**Enonce** : Implemente un hook `useDebounce<T>(value: T, delayMs: number): T` qui retourne la valeur debounced. Pas de librairie externe.

**Contraintes** :

- Cleanup du timeout sur unmount et changement de value
- Typage générique strict
- Pas de `any`

**Test attendu** :

```tsx
const [text, setText] = useState('');
const debounced = useDebounce(text, 300);
// debounced ne change que 300ms apres le dernier setText
```

---

### Kata 2 — Infinite scroll avec Intersection Observer

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Cree un hook `useInfiniteScroll(callback: () => void)` qui declenche le callback quand un élément sentinel entre dans le viewport.

**Contraintes** :

- IntersectionObserver, pas de scroll listener
- Cleanup propre (disconnect)
- Ref au sentinel via useRef

**Test attendu** : une liste de 20 items, quand on scroll en bas, 20 de plus se chargent automatiquement.

---

### Kata 3 — Optimistic UI avec useOptimistic (React 19)

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Implemente une todo list avec ajout optimiste. L'item apparait immediatement puis se confirme (où rollback) après l'appel API.

**Contraintes** :

- Utilise `useOptimistic` de React 19
- Simule un delai API de 1s avec `setTimeout`
- Simule un echec 1 fois sur 5 (random) avec rollback visuel

**Test attendu** : l'item apparait instantanement en grise, passe en normal après confirmation, ou disparait avec un toast si echec.

---

### Kata 4 — Form multi-step avec validation

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Un formulaire en 3 étapes (Identite -> Adresse -> Confirmation) avec navigation avant/arriere et validation par étape.

**Contraintes** :

- Pas de librairie de forms (ni React Hook Form ni Formik)
- Validation custom avec messages d'erreur
- Donnees persistees entre étapes (useReducer ou context)
- Bouton "Retour" conserve les donnees

**Test attendu** : chaque étape valide avant de passer à la suivante, retour garde les champs remplis.

---

### Kata 5 — Composant Tabs accessible (WCAG)

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Implemente un composant `<Tabs>` / `<TabPanel>` entièrement accessible.

**Contraintes** :

- `role="tablist"`, `role="tab"`, `role="tabpanel"`
- `aria-selected`, `aria-controls`, `aria-labelledby`
- Navigation clavier : fleches gauche/droite, Home, End
- Roving tabindex

**Test attendu** : fonctionne au clavier seul, passe un audit axe-core sans erreur.

---

## Angular (01-angular)

### Kata 6 — Composable useLocalStorage

**Difficulte** : ⭐⭐
**Temps cible** : 30 min

**Enonce** : Cree un composable `useLocalStorage<T>(key: string, defaultValue: T)` qui synchronise un ref avec localStorage.

**Contraintes** :

- `watch` pour persister les changements
- Parsing JSON avec gestion d'erreur (valeur corrompue)
- Synchronisation cross-onglets via `storage` event
- TypeScript générique

**Test attendu** : la valeur survit au refresh, et changer dans un onglet met a jour l'autre.

---

### Kata 7 — Directive custom v-click-outside

**Difficulte** : ⭐⭐
**Temps cible** : 30 min

**Enonce** : Implemente une directive `v-click-outside` qui exécuté un callback quand on clique en dehors de l'élément.

**Contraintes** :

- Directive custom Vue 3 (mounted, unmounted)
- Cleanup du event listener
- Ne se declenche pas si on clique sur l'élément ou ses enfants

**Test attendu** : un dropdown se ferme quand on clique en dehors.

---

### Kata 8 — State machine avec composable

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Implemente `useMachine(config)` — une state machine simple avec états, transitions et guards.

**Contraintes** :

- API : `{ state, send, can }` ou `state` est réactif
- Guards : fonctions qui autorisent ou non une transition
- Pas de librairie (pas XState)

**Test attendu** :

```ts
const { state, send, can } = useMachine({
  initial: 'idle',
  states: {
    idle: { on: { FETCH: 'loading' } },
    loading: { on: { SUCCESS: 'success', ERROR: 'error' } },
    success: { on: { RESET: 'idle' } },
    error: { on: { RETRY: 'loading', RESET: 'idle' } },
  },
});
```

---

### Kata 9 — Transition list animee

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Une liste filtrable avec `<TransitionGroup>` — les items entrent/sortent avec animation smooth.

**Contraintes** :

- `<TransitionGroup>` avec classes CSS (pas de librairie d'animation)
- FLIP animation (move transition)
- Input de filtre en temps réel

**Test attendu** : les items glissent, apparaissent et disparaissent de manière fluide quand on tape dans le filtre.

---

### Kata 10 — Provide/inject type pour un theme

**Difficulte** : ⭐⭐
**Temps cible** : 30 min

**Enonce** : Cree un système de theme (light/dark) avec `provide`/`inject` et InjectionKey typee.

**Contraintes** :

- `InjectionKey<ThemeContext>` pour le type safety
- Composable `useTheme()` qui throw si utilise hors du provider
- Toggle réactif
- CSS variables mises a jour dynamiquement

**Test attendu** : le toggle switch entre light et dark, les CSS variables changent instantanement, `useTheme()` hors provider lance une erreur explicite.

---

## React (02-react)

### Kata 11 — Signal-based counter store

**Difficulte** : ⭐⭐
**Temps cible** : 30 min

**Enonce** : Cree un service `CounterStore` avec signals (pas de RxJS).

**Contraintes** :

- `signal()` pour le state, `computed()` pour les derivations
- `increment()`, `decrement()`, `reset()`, `double` (computed)
- Pas d'Observable, pas de BehaviorSubject

**Test attendu** : le composant reactualise sans `subscribe` ni `async pipe`.

---

### Kata 12 — Directive structurelle *appPermission

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Cree une directive `*appPermission="'admin'"` qui affiche ou masque un élément selon les permissions de l'utilisateur.

**Contraintes** :

- Directive structurelle (TemplateRef + ViewContainerRef)
- Inject un `PermissionService`
- Reactive : si les permissions changent, l'élément apparait/disparait

**Test attendu** : `<button *appPermission="'admin'">Supprimer</button>` visible uniquement pour les admins.

---

### Kata 13 — Pipe async avec cache

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Cree un pipe `memoAsync` qui met en cache les résultats d'un Observable.

**Contraintes** :

- Pipe impure (pour détecter les changements d'input)
- Cache par clé (l'argument du pipe)
- Expiration configurable
- Unsubscribe propre (OnDestroy)

**Test attendu** : `{{ userId | memoAsync:'user' }}` affiche le résultat et ne relance pas la requête si l'input n'a pas change.

---

### Kata 14 — @defer dashboard

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Cree un dashboard avec 4 widgets lourds charges via `@defer` avec différents triggers.

**Contraintes** :

- Widget 1 : `@defer (on viewport)` — charge quand visible
- Widget 2 : `@defer (on interaction)` — charge au hover
- Widget 3 : `@defer (when isAdmin)` — conditionnel
- Widget 4 : `@defer (on timer(2s))` — charge après 2s
- `@placeholder`, `@loading`, `@error` pour chaque

**Test attendu** : les widgets apparaissent progressivement avec des skeletons de chargement.

---

### Kata 15 — Formulaire réactif avec validation cross-field

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Un formulaire d'inscription avec validation avancee.

**Contraintes** :

- `FormGroup` avec `FormControl` types (Typed Forms Angular 14+)
- Validateur cross-field : "confirm password" doit matcher "password"
- Validateur async : vérifier si l'email existe (simule)
- Messages d'erreur accessibles (`aria-describedby`, `aria-invalid`)

**Test attendu** : erreurs affichees en temps réel, formulaire non-soumettable tant qu'invalide.
