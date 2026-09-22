# Scan « geste métier complet » — tout le parcours

> Généré le 2026-09-22 par `scripts/scan-gestes.mjs`. Forme détectée par heuristique sur l'énoncé (zéro / intervention / concept) et artefacts mentionnés. **Signal, pas verdict** : le jugement et la cible par cours sont dans `docs/gestes-complets.md`.

## 00-typescript — 19 labs · zéro 3 · intervention 14 · concept 2 · ≥3 artefacts 17 · oracle 8

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-01-premiers-types | intervention | tests, a11y, livraison, api, contrat, style | ✅ | à la fin, tu sais typer un `Member` TribuZen avec les bons primitifs, remplacer `any` par `unknown` + narrowing sur des données d'API, et va |
| labs/lab-02-fonctions | intervention | tests, a11y, livraison, api, contrat, style | ✅ | à la fin, tu sais typer un service métier de A à Z — signatures, optionnels/défaut, rest, callbacks, un type guard `x is T` et une assertion |
| labs/lab-03-objets-interfaces | intervention | tests, a11y, livraison, données, api, contrat, style | ✅ | à la fin, tu sais modéliser le fichier fondateur `tribuzen/types/index.ts` (`Family`, `Member` base+admin, `Post`, `Invitation`) avec `reado |
| labs/lab-04-narrowing | intervention | tests, a11y, livraison, api, contrat, style | ✅ | à la fin, tu sais modéliser l'état d'une `Invitation` TribuZen en union discriminée, narrower chaque variante avec la technique adaptée, et  |
| labs/lab-05-classes | intervention | tests, a11y, livraison, api, contrat, style | ✅ | à la fin, tu sais construire une hiérarchie d'entités typée — classe abstraite `BaseEntity`, sous-classes `Member`/`Family`, contrat `Serial |
| labs/lab-06-generics-base | intervention | tests, a11y, livraison, données, contrat, style | ✅ | à la fin, tu sais rendre génériques les trois briques de la couche data TribuZen — `ApiResponse<T>`, `getById<T extends BaseEntity>` et `Rep |
| labs/lab-07-generics-avances | intervention | tests, a11y, livraison, données, contrat, style | ✅ | à la fin, tu sais écrire `pick<T, K>` maison, un `QueryBuilder<T>` générique verrouillé par `NoInfer`, et repérer/retirer un generic superfl |
| labs/lab-08-enums-tuples | intervention | tests, a11y, livraison, données, api, contrat, style | ✅ | à la fin, tu sais convertir un `enum` en `as const` + union de littéraux, typer une position en `readonly` labeled tuple, et écrire un helpe |
| labs/lab-09-modules | concept | tests, données, contrat | · | à la fin, tu sais organiser un dossier `types/` en barrel type-only, activer `verbatimModuleSyntax` et poser un alias `@/` résolu de bout en |
| labs/lab-10-utility-types | zéro | tests, données, api, contrat | · | à la fin, tu sais dériver tout un jeu de types (DTO, update, résumé, table de permissions) depuis une source unique avec les utility types i |
| labs/lab-11-conditional-types | intervention | tests, livraison, contrat | · | à la fin, tu sais écrire un conditional type avec `infer`, reconstruire `ReturnType` / `Exclude` à la main, et contrôler la distribution sur |
| labs/lab-12-mapped-template | intervention | tests, données, contrat | · | à la fin, tu sais reconstruire `Partial`/`Readonly` à la main, puis dériver `Nullable`, `Getters` et des noms d'événements depuis une forme  |
| labs/lab-13-type-programming | zéro | tests, contrat | · | à la fin, tu sais écrire `DeepReadonly` et `DeepPartial` pour le modèle TribuZen, les éprouver sur `Family`/`Member`, dérouler un tuple avec |
| labs/lab-14-decorateurs | intervention | tests | · | à la fin, tu sais écrire un décorateur standard `(value, context)` sur une méthode de service, ET reconstruire un mini-conteneur d'injection |
| labs/lab-15-variance | intervention | tests, a11y, contrat, style | · | à la fin, tu sais auditer une assignation de types par la position de `T`, neutraliser le trou de covariance des tableaux avec `readonly`, e |
| labs/lab-16-declaration-files | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais augmenter `Request` d'Express pour poser `req.member`, écrire un `.d.ts` pour une lib JS non typée, et déclarer un module  |
| labs/lab-17-tsconfig | intervention | tests, livraison, données, contrat | · | à la fin, tu sais écrire un `tsconfig.json` de production strict pour TribuZen, le découper en project references (`shared / api / admin`) a |
| labs/lab-18-patterns | concept | tests, données, api, contrat | · | à la fin, tu sais construire le noyau typé de TribuZen — identifiants brandés, `Result<T, E>`, `inviteMember` sans exception, et validation  |
| labs/lab-19-projet-final | zéro | tests, a11y, données, api, contrat, style | · | à la fin, tu sais concevoir un fichier de types *source unique* pour un domaine (entités, schémas zod, ids brandés, DTO dérivés, `Result`) e |

## 01-js-runtime — 15 labs · zéro 3 · intervention 10 · concept 2 · ≥3 artefacts 7 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-01-call-stack-observation | intervention | tests, a11y, livraison, style | · | à la fin, tu sais capturer et lire une stack trace, provoquer et diagnostiquer un `RangeError`, et inspecter les frames au débogueur. |
| labs/lab-02-closure-memory | intervention | tests, a11y, livraison | · | à la fin, tu sais **observer au heap snapshot** ce qu'une closure retient réellement, reproduire une fuite mémoire causée par une closure (t |
| labs/lab-03-event-loop-order | concept | tests | · | à la fin, tu sais prédire l'ordre d'exécution d'un code mêlant synchrone et `setTimeout`, l'expliquer avec le modèle call stack + task queue |
| labs/lab-04-microtask-macrotask | intervention | tests | · | à la fin, tu sais prédire à la main l'ordre exact d'un code mêlant `setTimeout`, `Promise`, `process.nextTick`, `setImmediate` et `async/awa |
| labs/lab-05-promise-implementation | intervention | tests, données | · | à la fin, tu sais construire une `MyPromise` de zéro (3 états, file de callbacks, `then` chaînable exécuté en microtask, résolution des then |
| labs/lab-06-async-patterns-comparison | concept | tests, a11y, style | · | à la fin, tu sais mesurer avec `performance.now()` l'écart réel entre un chargement `async/await` séquentiel et sa version `Promise.all`, re |
| labs/lab-07-gc-observation | zéro | tests, données | · | à la fin, tu sais observer le GC de V8 en direct — mesurer une libération mémoire, corréler la durée d'une pause GC au nombre d'objets vivan |
| labs/lab-08-memory-leak-detection | intervention | tests, livraison | · | à la fin, tu sais reproduire une fuite mémoire réaliste, la **prouver** avec la méthode des 3 heap snapshots (`v8.writeHeapSnapshot()` + Chr |
| labs/lab-09-v8-optimization | intervention | tests, livraison, api | · | à la fin, tu sais lire le bytecode Ignition d'une fonction et observer sa montée à travers les tiers (Ignition → Maglev → TurboFan) avec les |
| labs/lab-10-jit-deoptimization | intervention | tests, api, contrat | · | à la fin, tu sais provoquer une déoptimisation sur une fonction chaude, la lire dans `--trace-deopt`, stabiliser les types pour l'éliminer,  |
| labs/lab-11-hidden-classes | intervention | tests, a11y, livraison, api, style | · | à la fin, tu sais distinguer un objet de forme stable d'un objet de forme instable avec `%HaveSameMap`, mesurer la dégradation d'un inline c |
| labs/lab-12-performance-profiling | intervention | tests, api | · | à la fin, tu sais profiler un script Node avec `--cpu-prof` / `--trace-gc`, localiser le hot path, appliquer une correction ciblée (typed ar |
| labs/lab-13-scheduler-implementation | zéro | tests | · | à la fin, tu sais implémenter de zéro un scheduler coopératif qui découpe un gros traitement CPU-bound en chunks, cède l'event loop entre ch |
| labs/lab-14-mini-event-loop | zéro | tests | · | à la fin, tu sais construire de zéro un `mini-runtime.mjs` (call stack + task queue + microtask queue + `MyPromise` + `runAsync`) qui **s'ex |
| labs/lab-15-debugging-session | intervention | tests, a11y, api | · | à la fin, tu sais diagnostiquer trois bugs runtime (blocage event loop, fuite mémoire, déopt hot path) avec les vrais outils Node/V8, du sym |

## 02-vue — 48 labs · zéro 12 · intervention 31 · concept 5 · ≥3 artefacts 45 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-typer-vue3 | intervention | contrat | · | à la fin, tu sais annoter `ref<T>()`, `reactive` avec interface, `computed` avec union de string littéraux, et rétrécir `catch (e)` — avec ` |
| labs/lab-01-environnement | intervention | tests, livraison, style | · | à la fin, tu sais créer un SFC Vue 3 complet (`<script setup lang="ts">`, `<template>`, `<style scoped>`) de A à Z, le brancher dans `App.vu |
| labs/lab-02-template-et-directives | zéro | tests, livraison, contrat, style | · | à la fin, tu sais construire un composant Vue 3 qui affiche une liste réactive avec `v-for` + `:key`, un empty state avec `v-if`/`v-else`, d |
| labs/lab-03-reactivite | intervention | tests, a11y, livraison, api, contrat | · | à la fin, tu sais assembler `ref`, `computed` et `watch` dans un SFC Vue 3, diagnostiquer une perte de réactivité par destructuring et la co |
| labs/lab-04-evenements-et-v-model | intervention | tests, a11y, contrat | · | à la fin, tu sais écouter des événements DOM avec modificateurs, faire du two-way binding avec `v-model`, et exposer un `v-model` custom sur |
| labs/lab-05-composants-props-emits | intervention | tests, a11y, contrat | · | à la fin, tu sais écrire un composant Vue 3 avec `defineProps<T>()` typé, `defineEmits` tuple syntax (3.3+) et vérifier le tout avec `vue-ts |
| labs/lab-06-lifecycle-hooks | concept | tests, api, contrat | · | à la fin, tu sais écrire un composant Vue 3 qui charge des données au montage avec `onMounted`, rafraîchit automatiquement avec `setInterval |
| labs/lab-07-options-vs-composition-api | intervention | tests, livraison, données, contrat | · | à la fin, tu sais migrer un composant Options API vers `<script setup lang="ts">` et vérifier la conformité TypeScript avec `vue-tsc --noEmi |
| labs/lab-08-composition-api-avancee | intervention | tests, livraison, api, contrat, style | · | à la fin, tu sais écrire un composable Vue 3 qui regroupe plusieurs effets dans un `effectScope`, expose son état via `toRefs`, utilise `sha |
| labs/lab-09-composables | intervention | tests, livraison, contrat | · | à la fin, tu sais extraire une logique réactive réutilisable dans un composable `useFamily`, accepter un argument réactif avec `toValue`, et |
| labs/lab-10-gestion-async | zéro | tests, livraison, api, contrat, style | · | à la fin, tu sais modéliser les 4 états d'un appel réseau (idle/loading/error/data), charger des données au montage avec affichage correct d |
| labs/lab-11-formulaires-et-validation | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais construire un formulaire Vue 3 typé avec `v-model`, valider les données avec un schéma `zod`, afficher des messages d'erre |
| labs/lab-12-slots-avances | zéro | tests, a11y, livraison, contrat, style | · | à la fin, tu sais construire un composant layout multi-slots avec `useSlots` conditionnel et un composant renderless typé avec `defineSlots` |
| labs/lab-13-transitions-et-animations | zéro | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais animer le feed TribuZen avec `<TransitionGroup>` (ajout/suppression/réordonnancement de posts), ouvrir une modale avec `<T |
| labs/lab-14-vue-router | intervention | tests, story, livraison, données, api, style | · | à la fin, tu sais configurer Vue Router 4 dans une app Vue 3, définir des routes dynamiques, protéger des routes avec un guard `beforeEach`, |
| labs/lab-15-pinia | zéro | tests, livraison, contrat, style | · | à la fin, tu sais définir un store Pinia (style setup) avec state, getters et actions async, et le consommer dans un composant Vue 3 sans pe |
| labs/lab-16-tests-unitaires | intervention | tests, contrat | · | à la fin, tu sais écrire des tests Vitest complets pour une fonction pure et un composable réactif Vue 3, avec mocking d'un service externe. |
| labs/lab-17-tests-composants | zéro | tests, livraison, contrat | · | à la fin, tu sais tester un composant Vue 3 avec `@vue/test-utils` — vérifier le rendu d'après les props, simuler un clic, asserter un événe |
| labs/lab-18-tests-integration | intervention | tests | · | à la fin, tu sais écrire un test d'intégration Vitest qui monte `InvitePage` avec Pinia réelle et un `fetch` mocké, et vérifie que le flux i |
| labs/lab-19-tests-e2e-playwright | intervention | tests, a11y, livraison, api | · | à la fin, tu sais écrire des tests Playwright qui pilotent un vrai navigateur, cibler les éléments par rôle accessible, et déboguer un test  |
| labs/lab-20-msw-et-mocking-api | zéro | tests, api, contrat | · | à la fin, tu sais tester un composant Vue 3 qui appelle une API en interceptant les requêtes au niveau réseau avec MSW 2 — happy path, erreu |
| labs/lab-21-performance | intervention | tests, livraison, contrat, style | · | à la fin, tu sais mesurer un problème de performance dans Vue DevTools, appliquer `v-memo` sur une liste longue, virtualiser ce feed avec `@ |
| labs/lab-22-ssr-et-hydration | intervention | livraison, données, contrat | · | à la fin, tu sais faire tourner un mini serveur Express avec `renderToString`, identifier et corriger trois mismatches d'hydration sur un co |
| labs/lab-23-architecture-front | intervention | tests, a11y, données, api, contrat, style | · | à la fin, tu sais migrer une codebase Vue plate (organisation type-based) vers une architecture feature-based avec couches composables/servi |
| labs/lab-24-patterns-entreprise | zéro | tests, api, contrat | · | à la fin, tu sais monter un système provide/inject typé avec `InjectionKey`, un composant `ErrorBoundary` basé sur `onErrorCaptured`, et un  |
| labs/lab-25-nuxt-introduction | concept | tests, a11y, livraison, données, api | · | à la fin, tu sais initialiser un projet Nuxt, configurer `nuxt.config.ts` (modules, rendu, runtimeConfig), créer une première page SSR, et v |
| labs/lab-26-nuxt-pages-et-layouts | zéro | tests, livraison, données, api | · | à la fin, tu sais créer des pages Nuxt via l'arborescence `pages/`, appliquer un layout, protéger une route avec un middleware `auth`, et na |
| labs/lab-27-nuxt-data-fetching | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais charger des données en SSR avec `useAsyncData` (clé stable, `transform`, `default`), déclencher un re-fetch après une muta |
| labs/lab-28-nuxt-server-routes | intervention | tests, a11y, livraison, api, style | · | à la fin, tu sais créer des routes API Nuxt dans `server/api/`, lire params/query/body, mettre en cache une réponse avec `cachedEventHandler |
| labs/lab-29-nuxt-seo-et-meta | intervention | tests, a11y, données, api, contrat | · | à la fin, tu sais ajouter `useSeoMeta`, un canonical, un JSON-LD `Event` et un `titleTemplate` global à une page Nuxt 3 TribuZen. |
| labs/lab-30-storybook-setup | intervention | tests, story, a11y, contrat, style | · | à la fin, tu sais configurer Storybook 8 dans un projet Vue 3 Vite, connecter l'alias `@/`, importer les styles globaux, activer les addons  |
| labs/lab-31-storybook-stories | intervention | tests, story, a11y, livraison, contrat, style | · | à la fin, tu sais écrire un fichier `.stories.ts` CSF3 complet pour un composant Vue 3 — meta, variants, controls, actions et play function  |
| labs/lab-32-storybook-design-system | intervention | tests, story, a11y, livraison, contrat, style | · | à la fin, tu sais documenter un design system avec autodocs, exposer les design tokens, auditer l'accessibilité avec addon-a11y, et lancer u |
| labs/lab-33-cicd-pipeline | intervention | tests, livraison, api, contrat | · | à la fin, tu sais créer un workflow GitHub Actions complet pour un projet Vue 3 + pnpm qui enchaîne lint, typecheck, tests Vitest avec couve |
| labs/lab-34-cicd-deploiement | intervention | a11y, livraison, style | · | à la fin, tu sais configurer le déploiement SSR d'une app Nuxt sur Vercel avec preview par PR, gérer les secrets via `runtimeConfig`, écrire |
| labs/lab-35-cicd-monitoring | intervention | a11y, livraison, données, api, contrat, style | · | à la fin, tu sais instrumenter une app Vue avec Sentry (capture d'erreurs + ErrorBoundary), collecter les Core Web Vitals via `web-vitals` + |
| labs/lab-36-graphql-vue3 | intervention | tests, a11y, données, api, contrat | · | à la fin, tu sais construire deux composants Vue 3 qui consomment une API GraphQL réelle — un avec `useQuery` (liste réactive avec variable) |
| labs/lab-37-trpc | concept | tests, données, api, contrat, style | · | à la fin, tu sais définir un router tRPC avec queries et mutations validées par zod, exposer le handler dans un server route Nitro, et conso |
| labs/lab-38-accessibilite-fondamentaux-wcag | intervention | tests, a11y, livraison, contrat, style | · | à la fin, tu sais auditer un composant Vue 3 existant avec axe-core CLI, identifier les non-conformités par critère WCAG/RGAA, et produire u |
| labs/lab-39-accessibilite-aria-et-vue | zéro | tests, a11y, livraison, api, contrat | · | à la fin, tu sais construire `InviteModal.vue` accessible de A à Z — focus trap, `aria-*` dynamiques, live region — et valider le résultat a |
| labs/lab-40-accessibilite-audit | intervention | tests, a11y, livraison, contrat, style | · | à la fin, tu sais conduire un audit a11y complet sur un composant Vue 3 — vitest-axe en CI, test clavier documenté, grille RGAA 4.1 partiell |
| labs/lab-41-i18n-vue-i18n | intervention | tests, livraison, contrat | · | à la fin, tu sais configurer vue-i18n v10 en Composition API, internationaliser un composant Vue 3 avec `t()`, `d()`, pluralisation et un sé |
| labs/lab-42-i18n-strategies-avancees | intervention | tests, a11y, livraison, contrat | · | à la fin, tu sais implémenter le lazy loading des locales, un sélecteur de langue accessible (RGAA 8.3), les balises `hreflang`, et des test |
| labs/lab-43-auth-authentification | zéro | tests, livraison, données, api, style | · | à la fin, tu sais implémenter `useAuthStore` (Pinia), un guard `requiresAuth`, et le retry automatique sur 401 avec MSW comme serveur mock — |
| labs/lab-44-securite-front | concept | tests, livraison, api, contrat | · | à la fin, tu sais sécuriser un composant `v-html` avec DOMPurify, poser les en-têtes de sécurité via Nuxt `routeRules`, et auditer les dépen |
| labs/lab-45-rbac-et-permissions | intervention | tests, a11y, données, api, contrat | · | à la fin, tu sais câbler `usePermissions` (Pinia), la directive `v-can`, et un guard de route par permission sur un panneau famille TribuZen |
| labs/lab-46-vue-query-tanstack | zéro | tests, livraison, api, contrat | · | à la fin, tu sais charger du server state avec `useQuery` (cache, staleTime, états), déclencher une mutation avec `useMutation`, et invalide |
| labs/lab-47-vue-query-patterns-avances | concept | tests, livraison, contrat, style | · | à la fin, tu sais implémenter une mutation optimiste avec rollback et un feed en infinite scroll avec `@tanstack/vue-query` v5 dans un proje |

## 03-angular — 27 labs · zéro 15 · intervention 7 · concept 5 · ≥3 artefacts 24 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-de-vue-a-angular | intervention | tests, livraison, contrat, style | · | à la fin, tu sais scaffolder un projet Angular 19 avec l'Angular CLI et **traduire à la main** un composant Vue 3 (état + liste filtrée) en  |
| labs/lab-01-premier-projet-standalone | intervention | tests, api, style | · | à la fin, tu sais créer un projet Angular 19 avec le CLI, générer un composant standalone, l'afficher dans `AppComponent` via `imports`, et  |
| labs/lab-02-signaux-base | zéro | tests, livraison | · | à la fin, tu sais construire un composant Angular 19 dont l'état réactif repose sur `signal()`, avec des valeurs dérivées en `computed()`, d |
| labs/lab-03-control-flow | zéro | tests, a11y, livraison, données, contrat | · | à la fin, tu sais construire un composant Angular 19 qui liste une collection avec `@for` + un `track` correct, gère l'état vide avec `@empt |
| labs/lab-04-binding-et-events | zéro | tests, a11y, livraison, style | · | à la fin, tu sais construire un composant Angular 19 dont le template est entièrement piloté par binding — property binding sur des propriét |
| labs/lab-05-input-output-model | concept | tests, livraison | · | à la fin, tu sais découper un écran Angular 19 en un parent et un enfant réutilisable, câblés par `input()` (données descendantes), `output( |
| labs/lab-06-lifecycle-hooks | zéro | tests, livraison, style | · | à la fin, tu sais brancher chaque étape d'un composant Angular 19 au bon hook de cycle de vie — `ngOnInit` pour l'initialisation dépendant d |
| labs/lab-07-pipes-et-directives | zéro | tests, a11y, api, contrat, style | · | à la fin, tu sais rendre lisible une carte de données avec les pipes built-in (`date`, `currency`), écrire un pipe custom `@Pipe` avec argum |
| labs/lab-08-defer-et-zoneless | zéro | tests, a11y, livraison, style | · | à la fin, tu sais différer des composants lourds avec `@defer` (triggers `on viewport` / `on idle` / `on interaction`, `@placeholder` / `@lo |
| labs/lab-09-signaux-avances | zéro | tests, livraison, contrat | · | à la fin, tu sais construire un composant Angular 19 qui (1) auto-sauvegarde un brouillon dans `localStorage` avec un `effect()` debouncé (` |
| labs/lab-10-resource-api | zéro | tests, contrat, style | · | à la fin, tu sais charger la liste des sorties TribuZen depuis une vraie requête réseau avec `resource()`, brancher le template sur `isLoadi |
| labs/lab-11-services-et-injectable | zéro | tests, livraison, contrat | · | à la fin, tu sais extraire un état dans un service `@Injectable({ providedIn: 'root' })`, l'injecter avec `inject()` dans deux composants di |
| labs/lab-12-providers-et-scopes | intervention | tests, style | · | à la fin, tu sais diagnostiquer un service partagé à tort, le passer en **scope composant** pour isoler chaque instance, et brancher une imp |
| labs/lab-13-injection-tokens | concept | tests, api, contrat, style | · | à la fin, tu sais déclarer un `InjectionToken<T>` typé, le fournir avec `useValue` / provider fonctionnel, collecter plusieurs valeurs en `m |
| labs/lab-14-routing | zéro | tests, livraison, api, contrat, style | · | à la fin, tu sais câbler une app Angular standalone à trois écrans avec `provideRouter`, naviguer avec `routerLink`/`Router.navigate()`, rec |
| labs/lab-15-guards-et-lazy-loading | concept | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais protéger une route avec un `CanActivateFn` qui redirige via un `UrlTree`, empêcher de quitter un formulaire modifié avec u |
| labs/lab-16-rxjs-observables-et-operators | zéro | tests, livraison, api, contrat, style | · | à la fin, tu sais transformer un flux de saisie en résultats avec `fromEvent` + `pipe()` + `map` / `filter` / `debounceTime` / `switchMap`,  |
| labs/lab-17-rxjs-patterns-et-interop-signals | zéro | tests, livraison, api, contrat, style | · | à la fin, tu sais construire une **façade** `ActivitesService` (état via `BehaviorSubject`, exposé en signals avec `toSignal()`), une recher |
| labs/lab-18-http-crud-interceptors-cache | concept | tests, livraison, api, contrat | · | à la fin, tu sais brancher un composant Angular sur une API REST via un `SortieService` CRUD typé, ajouter un interceptor d'erreurs fonction |
| labs/lab-19-formulaires-reactifs-et-signal-forms | zéro | tests, api, contrat, style | · | à la fin, tu sais construire un formulaire réactif Angular **typé non-nullable** (`FormBuilder` + `Validators` + un validateur synchrone per |
| labs/lab-20-formulaires-patterns | zéro | tests, a11y, api | · | à la fin, tu sais construire le formulaire « Créer une sortie » de TribuZen avec un `FormArray` de participants de taille variable, un valid |
| labs/lab-21-angular-material-et-cdk | zéro | tests, api, contrat, style | · | à la fin, tu sais installer et thémer Angular Material 3, afficher des données dans un `MatTable` triable/filtrable, ouvrir un `MatDialog` d |
| labs/lab-22-accessibilite | intervention | tests, a11y, livraison, style | · | à la fin, tu sais rendre une modale de confirmation Angular **accessible** (HTML sémantique, `role="dialog"`, `cdkTrapFocus`, `LiveAnnouncer |
| labs/lab-23-tests-composants-http-di | intervention | tests, livraison, api, contrat, style | · | à la fin, tu sais écrire de vrais fichiers `*.spec.ts` Angular qui montent un composant avec `TestBed`, lisent son DOM via `ComponentFixture |
| labs/lab-24-state-management | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais construire un store global TribuZen partagé par plusieurs composants, d'abord en **service maison** (signal privé + `asRea |
| labs/lab-25-auth-jwt-guards | concept | tests, livraison, api, style | · | à la fin, tu sais câbler une auth JWT complète dans Angular — un `AuthService` à base de signals, un `authInterceptor` qui attache le `Beare |
| labs/lab-26-recettes-esn-et-pieges | intervention | tests, api, contrat, style | · | à la fin, tu sais livrer une feature Angular complète de niveau mission — architecture `core/shared/features`, smart/dumb components, facade |

## 04-react — 43 labs · zéro 15 · intervention 16 · concept 12 · ≥3 artefacts 34 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-02-premier-projet-react | zéro | tests, livraison, contrat | · | à la fin, tu sais créer un projet React TypeScript avec Vite, lire sa structure, écrire un composant `AdminLayout` avec des props typées, et |
| labs/lab-03-jsx-en-profondeur | zéro | tests, livraison, contrat, style | · | à la fin, tu sais écrire du JSX correct avec expressions, attributs, fragments et liste avec clés stables dans un vrai projet Vite + React 1 |
| labs/lab-04-props-et-children | intervention | tests, livraison, contrat, style | · | à la fin, tu sais typer des props avec TypeScript strict, passer des données parent → enfant, utiliser `children` pour composer, et spreader |
| labs/lab-05-composants-et-composition | zéro | tests, a11y, livraison, contrat, style | · | à la fin, tu sais construire trois composants réutilisables (`Card`, `Avatar`, `Badge`) en React 19 + TypeScript, les assembler dans un cont |
| labs/lab-06-rendu-conditionnel-et-listes | zéro | tests, a11y, données, contrat, style | · | à la fin, tu sais rendre une liste dynamique avec une key stable et gérer les trois états vide/chargement/erreur d'un fil de posts en React  |
| labs/lab-07-evenements-et-formulaires-basiques | zéro | tests, contrat | · | à la fin, tu sais câbler un formulaire React 19 + TypeScript en non-contrôlé (`onSubmit` + `preventDefault` + `FormData`), typer tes handler |
| labs/lab-08-usestate | zéro | tests, contrat | · | à la fin, tu sais gérer l'état local d'un formulaire contrôlé et d'une liste avec `useState` en React 19 + TypeScript, en respectant l'immua |
| labs/lab-09-useeffect | zéro | tests, a11y, livraison, contrat | · | à la fin, tu sais écrire un `useEffect` qui fetche une liste avec protection anti-race-condition (flag `ignore`), remplacer un effet inutile |
| labs/lab-10-useref-et-dom | zéro | tests, api, contrat | · | à la fin, tu sais focaliser un champ au montage, scroller vers un élément et stocker un id de timer sans re-render, en React 19 + TypeScript |
| labs/lab-11-usecallback-usememo | intervention | tests, livraison, contrat | · | à la fin, tu sais optimiser une liste lourde de l'admin TribuZen avec le trio `useMemo` + `useCallback` + `React.memo`, prouver le gain au P |
| labs/lab-12-custom-hooks | concept | tests, livraison, api, contrat | · | à la fin, tu sais extraire une logique stateful dupliquée dans un custom hook typé (`useFamilies`, `useToggle`), le réutiliser sur deux écra |
| labs/lab-13-usereducer | intervention | tests | · | à la fin, tu sais migrer un groupe de `useState` corrélés vers un `useReducer` typé (union discriminée), écrire un reducer pur, et l'étendre |
| labs/lab-14-context-api | concept | tests, contrat | · | à la fin, tu sais supprimer le prop drilling avec un `AuthContext` + `ThemeContext` en React 19 + TypeScript (hooks d'accès gardés), puis mo |
| labs/lab-15-zustand | concept | tests, contrat | · | à la fin, tu sais créer un store Zustand v5 typé (`create<T>()(...)`), cibler les re-renders avec des sélecteurs et `useShallow`, et branche |
| labs/lab-16-redux-toolkit | zéro | tests, livraison, contrat | · | à la fin, tu sais structurer un store Redux Toolkit (v2) + react-redux (v9) avec un slice typé, un `createAsyncThunk` de fetch, des hooks pr |
| labs/lab-17-react-router-basique | concept | tests, données, api, style | · | à la fin, tu sais câbler un data router React Router v7 (`createBrowserRouter` + `RouterProvider`), construire un layout à sidebar avec `Out |
| labs/lab-18-parametres-et-loaders | intervention | tests, livraison, api, contrat | · | à la fin, tu sais câbler une route de détail `/familles/:id` avec un **loader** React Router v7, filtrer une liste via la **query string** ( |
| labs/lab-19-protection-et-lazy | intervention | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais protéger la branche `/admin` de l'admin TribuZen par rôle (redirection UX), et lazy-loader l'écran stats (lourd) avec un f |
| labs/lab-20-controlled-vs-uncontrolled | intervention | tests, api | · | à la fin, tu sais écrire un formulaire contrôlé avec validation live, un formulaire non-contrôlé lu via `FormData`, et tu sais provoquer pui |
| labs/lab-21-react-hook-form | zéro | tests, données, api, contrat | · | à la fin, tu sais câbler un formulaire de création de famille avec `useForm` + `register`, le valider par un schéma zod partagé (`zodResolve |
| labs/lab-22-patterns-formulaires-avances | zéro | tests, données, api, contrat | · | à la fin, tu sais construire un wizard multi-étapes avec champs dynamiques (`useFieldArray`), validation asynchrone d'unicité et agrégation  |
| labs/lab-23-tanstack-query | intervention | tests, livraison, api, contrat | · | à la fin, tu sais remplacer un `useEffect`+`fetch` par `useQuery`, écrire une `useMutation` qui invalide le cache, et faire un toggle de sta |
| labs/lab-24-nextjs-fondamentaux | intervention | tests, a11y, données, api, contrat, style | · | à la fin, tu sais monter la zone admin TribuZen de zéro avec l'App Router de Next.js 15 : groupe de routes, layout à sidebar, route statique |
| labs/lab-25-server-components | concept | tests, livraison, api, contrat | · | à la fin, tu sais construire une page `/familles` en Server Component qui lit ses données côté serveur, isoler un bouton interactif en `"use |
| labs/lab-26-data-fetching | zéro | tests, api, contrat | · | à la fin, tu sais construire une page `/familles` avec cache ISR contrôlé (Next 15) et une page `/familles/:id` en fetch parallèle streamé,  |
| labs/lab-27-api-routes-et-server-actions | concept | tests, données, api, contrat | · | à la fin, tu sais écrire une Server Action sécurisée (validation zod + contrôle du rôle + `revalidatePath`), la câbler à un formulaire via ` |
| labs/lab-28-middleware-et-config | intervention | tests, api | · | à la fin, tu sais écrire de zéro un middleware d'accès (matcher, redirection basée cookie, header de sécurité), configurer `next.config.ts`  |
| labs/lab-29-tests-composants-rtl | concept | tests, contrat, style | · | à la fin, tu sais écrire de vrais fichiers `.test.tsx` (Vitest + React Testing Library) qui vérifient le comportement de composants React 19 |
| labs/lab-30-tests-api-msw | concept | tests, livraison, contrat | · | à la fin, tu sais configurer MSW v2 (handlers + `setupServer` + setup Vitest) et écrire une suite de tests qui couvre les états `loading`, ` |
| labs/lab-31-performance-react | intervention | tests, livraison, contrat, style | · | à la fin, tu sais utiliser le **React DevTools Profiler** pour prouver qu'une liste re-rend inutilement, puis appliquer une mémoïsation **ci |
| labs/lab-32-patterns-composition | zéro | tests, a11y, contrat | · | à la fin, tu sais construire un compound component (`<Tabs>`) piloté par un contexte interne et un composant polymorphe à slots (`<Card>`) e |
| labs/lab-33-error-boundaries-suspense | intervention | tests, contrat | · | à la fin, tu sais écrire un `ErrorBoundary` réinitialisable qui isole `FamilyFeed`, envelopper un panneau lazy dans `Suspense` + `use()` (Re |
| labs/lab-34-react-19-nouveautes | zéro | tests, livraison, contrat | · | à la fin, tu sais câbler un formulaire avec une Action + `useActionState` + `useFormStatus`, et afficher un toggle de statut optimiste avec  |
| labs/lab-35-fondamentaux-wcag-react | intervention | tests, a11y, api, contrat, style | · | à la fin, tu sais rendre trois zones de l'admin TribuZen conformes WCAG 2.2 AA — une carte-action en `<button>` réel, un formulaire à labels |
| labs/lab-36-aria-patterns-avances | zéro | tests, a11y, livraison, données, api, style | · | à la fin, tu sais construire une modale d'invitation **accessible** (focus trap + `Escape` + restauration du focus + `role="dialog"`) et une |
| labs/lab-37-tailwind-css | concept | tests, a11y, données, contrat, style | · | à la fin, tu sais configurer Tailwind CSS **v4 en CSS-first** dans un projet Vite + React 19, poser des design tokens dans `@theme`, et styl |
| labs/lab-38-css-modules-et-alternatives | concept | tests, a11y, contrat, style | · | à la fin, tu sais styliser un composant React 19 + TypeScript en CSS Modules (scoping local, variantes, `clsx`), mettre en place un theming  |
| labs/lab-39-auth-nextauth | intervention | tests, api, style | · | à la fin, tu sais protéger une route `/admin` Next.js 15 avec Auth.js v5 — login credentials (hash bcrypt vérifié serveur), session jwt, rôl |
| labs/lab-40-deploiement | intervention | tests, a11y, livraison, api | · | à la fin, tu sais préparer une app Next.js 15 pour la production — build de prod, `output: 'standalone'`, Dockerfile multi-stage, séparation |
| labs/lab-41-patterns-esn | intervention | tests, api, contrat | · | à la fin, tu sais auditer un composant React legacy fourni, rédiger un audit priorisé écrit, et le refactorer par petits pas incrémentaux (c |
| labs/lab-42-entretien-technique | intervention | tests, livraison, api | · | à la fin, tu sais dérouler trois exercices de live coding React 19 typiques d'entretien ESN, en verbalisant ta démarche à voix haute et en d |
| labs/lab-43-capacitor-fondamentaux | concept | tests, a11y | · | à la fin, tu sais partir d'une app React 19 + Vite et la transformer en app native iOS/Android avec Capacitor : setup (`init`/`add`), `capac |
| labs/lab-44-capacitor-plugins-avances | concept | tests, contrat, style | · | à la fin, tu sais intégrer un plugin natif Capacitor (Camera) avec gestion de permission, détection de plateforme et fallback web, et persis |

## 05-algorithms — 12 labs · zéro 8 · intervention 3 · concept 1 · ≥3 artefacts 7 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-01-complexity-analysis | concept | tests, livraison, données, contrat | · | à la fin, tu sais donner la complexité temps ET espace de plusieurs fonctions JS rien qu'en les lisant, puis **mesurer** avec `performance.n |
| labs/lab-02-arrays-hashmaps | intervention | tests, contrat | · | à la fin, tu sais résoudre trois patterns d'entretien en TypeScript — **two-sum** (hash map), **sliding window** (fenêtre glissante), **dédu |
| labs/lab-03-stacks-queues | zéro | tests, livraison | · | à la fin, tu sais implémenter un validateur de parenthèses avec une pile, une file FIFO en O(1) (pas de `shift()`), et une liste chaînée sim |
| labs/lab-04-recursion-binary-search | zéro | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais écrire une recherche binaire exacte, ses variantes de bornes (`lowerBound`/`upperBound`), un « binary search on answer »,  |
| labs/lab-05-sorting-heaps | zéro | tests, données, contrat | · | à la fin, tu sais implémenter un merge sort stable, un `MinHeap<T>` générique, et le pattern top-K en TypeScript, puis les vérifier à la mai |
| labs/lab-06-tree-navigation | zéro | tests, livraison, contrat | · | à la fin, tu sais parcourir un arbre hiérarchique TribuZen en DFS (pré/in/post-ordre) et en BFS par niveaux, valider qu'un arbre est un BST, |
| labs/lab-07-graph-dependencies | zéro | tests, contrat | · | à la fin, tu sais construire un graphe orienté en TypeScript, trouver un plus court chemin en BFS, produire un tri topologique de Kahn, et d |
| labs/lab-08-backtracking-solver | zéro | tests, livraison | · | à la fin, tu sais écrire de zéro le template `choix → explorer → défaire`, générer des permutations, résoudre un `combinationSum` avec pruni |
| labs/lab-09-dynamic-programming | zéro | tests, livraison, contrat | · | à la fin, tu sais dériver et implémenter trois algorithmes de DP (coin change, LCS, knapsack 0/1) en TypeScript, en passant à chaque fois de |
| labs/lab-10-unionfind-trie | intervention | tests, contrat | · | à la fin, tu sais implémenter un union-find (union par rang + compression de chemin), un trie d'autocomplétion, et un glouton de sélection d |
| labs/lab-11-fullstack-patterns | intervention | tests, données, contrat, style | · | à la fin, tu sais implémenter en TypeScript un LRU cache correct, un debounce annulable et un index inversé de recherche, puis les câbler co |
| labs/lab-12-recommendation-engine | zéro | tests, données, contrat | · | à la fin, tu sais assembler graphe de proximité, scoring multi-signaux, top-K par heap et sélection sous contrainte en un seul livrable `rec |

## 06-testing — 19 labs · zéro 3 · intervention 10 · concept 6 · ≥3 artefacts 16 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-01-pourquoi-tester | intervention | tests, livraison, api | · | à la fin, tu sais écrire un test Vitest qui révèle un vrai bug de logique métier, corriger ce bug guidé par le test rouge, et décider quoi t |
| labs/lab-02-anatomie-dun-test | concept | tests, livraison, contrat | · | à la fin, tu sais structurer un test en Arrange-Act-Assert, isoler les cas avec `beforeEach`, et choisir le bon matcher — en **Vitest réel** |
| labs/lab-03-vitest-fondamentaux | concept | tests, a11y, livraison, contrat | · | à la fin, tu sais configurer Vitest sur un projet TypeScript, écrire des assertions avec les bons matchers, paramétrer des cas avec `test.ea |
| labs/lab-04-mocking | zéro | tests, contrat | · | à la fin, tu sais isoler un service par injection de dépendances et écrire ses test doubles (stub, spy, mock), mocker un module avec `vi.hoi |
| labs/lab-05-tests-asynchrones | concept | tests, contrat | · | à la fin, tu sais tester du code asynchrone (promesses, retry avec fake timers, `vi.waitFor`) avec **Vitest réel**. |
| labs/lab-06-architecture-testable | intervention | tests, contrat | · | à la fin, tu sais refactorer un service couplé en code injectable, écrire ses tests unitaires (stub repo + spy mailer) en **Vitest réel**, i |
| labs/lab-07-tests-composants | intervention | tests, a11y, contrat | · | à la fin, tu sais monter un composant Vue en test avec `@vue/test-utils`, interroger le DOM par rôle accessible, simuler un clic et vérifier |
| labs/lab-08-msw | concept | tests, livraison, contrat | · | à la fin, tu sais câbler MSW 2 (`http`/`HttpResponse`, `setupServer`) dans Vitest, écrire des handlers GET et POST, simuler des erreurs HTTP |
| labs/lab-09-tests-integration | concept | tests, api, contrat | · | à la fin, tu sais écrire un test d'intégration Vitest + MSW qui vérifie un flux multi-modules (logique domaine + API mockée à la frontière)  |
| labs/lab-10-playwright-fondamentaux | intervention | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais écrire des tests E2E qui pilotent un vrai navigateur Chromium, ciblent les éléments par rôle accessible, utilisent les ass |
| labs/lab-11-playwright-avance | intervention | tests, données, api | · | à la fin, tu sais structurer une suite E2E TribuZen avec le Page Object Model, réutiliser une session authentifiée via `storageState`, mocke |
| labs/lab-12-couverture | intervention | tests, livraison, données, contrat | · | à la fin, tu sais configurer la couverture Vitest (provider v8), lire un rapport branches/stmts/funcs/lines, identifier ce que la couverture |
| labs/lab-12b-tests-accessibilite | intervention | tests, a11y, contrat, style | · | à la fin, tu sais détecter des violations axe-core avec **vitest-axe** sur un vrai composant Vue, corriger le composant pour passer `toHaveN |
| labs/lab-13-ci-cd | intervention | tests, livraison, api, contrat | · | à la fin, tu sais écrire un workflow GitHub Actions complet qui exécute Vitest et Playwright, met en cache les dépendances, bloque le merge  |
| labs/lab-14-flaky-tests | intervention | tests, livraison, contrat, style | · | à la fin, tu sais identifier la cause d'un test flaky TribuZen, le rendre déterministe avec `vi.setSystemTime` et le reset d'état, puis mett |
| labs/lab-15-tdd-bdd | intervention | tests, livraison, api, contrat | · | à la fin, tu sais mener un kata TDD de bout en bout — écrire le test en premier, le voir rouge, écrire le minimum de code, le voir vert, ref |
| labs/lab-16-contract-testing | concept | tests, api, contrat | · | à la fin, tu sais écrire un contrat consumer PactV3 pour l'API invitation TribuZen, générer le pact file, et vérifier le contrat côté provid |
| labs/lab-17-performance | zéro | tests, livraison, api | · | à la fin, tu sais écrire un script k6 avec stages et thresholds p95, interpréter la sortie, et intégrer le budget de performance en CI. |
| labs/lab-18-projet-final | zéro | tests, livraison, api, contrat, style | · | à la fin, tu sais concevoir et écrire la suite de test complète d'une feature TribuZen — unit (Vitest + doubles DI), intégration (Supertest  |

## 07-git-avance — 10 labs · zéro 2 · intervention 8 · concept 0 · ≥3 artefacts 5 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-01-git-objects | intervention | tests, livraison, contrat | · | à la fin, tu sais explorer les objets d'un vrai repo avec `cat-file`/`hash-object`/`ls-tree`, reconstituer un commit à la main (commit → tre |
| labs/lab-02-branching-strategies | intervention | tests, livraison, contrat | · | à la fin, tu sais dérouler un **GitHub Flow complet** avec de vraies commandes git (branche courte, merge dans `main` déployable), puis **co |
| labs/lab-03-merge-rebase | intervention | tests | · | à la fin, tu sais provoquer un conflit, le résoudre en **merge** ET en **rebase**, comparer les deux historiques obtenus, et énoncer la règl |
| labs/lab-04-rebase-interactif | intervention | tests, livraison, api | · | à la fin, tu sais transformer un historique de 5 commits brouillon (`wip`, `oops`) en 2 commits propres et atomiques via `git rebase -i` (sq |
| labs/lab-05-bisect | intervention | tests, a11y, livraison, données | · | à la fin, tu sais trouver le commit qui casse un test avec `git bisect` (manuel **et** `git bisect run`), puis enquêter avec `git blame` et  |
| labs/lab-06-hooks | intervention | tests, livraison | · | à la fin, tu sais installer husky v9 dans un vrai repo, écrire un `pre-commit` qui formate les fichiers stagés (lint-staged + Prettier) et u |
| labs/lab-07-worktrees-submodules | intervention | tests | · | à la fin, tu sais créer un worktree pour traiter un hotfix pendant une feature (sans stasher), puis ajouter un submodule et **mettre à jour  |
| labs/lab-08-monorepo | zéro | tests, livraison, données, contrat | · | à la fin, tu sais monter de zéro un workspace pnpm avec deux packages partagés + une app qui les consomme, y brancher Turborepo, et observer |
| labs/lab-09-workflows | intervention | tests, api | · | à la fin, tu sais conduire un cycle de pull request de bout en bout — brancher, committer en Conventional Commits, ouvrir une PR, gérer une  |
| labs/lab-10-projet-final | zéro | livraison | · | à la fin, tu sais monter le setup Git complet d'un repo de zéro (structure, hooks, fichiers d'équipe, CI) **et** te sortir d'une urgence Git |

## 08-soft-skills — 11 labs · zéro 0 · intervention 10 · concept 1 · ≥3 artefacts 9 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-introduction-soft-skills | concept | tests, a11y, livraison | · | à la fin, tu sais te situer honnêtement sur les 4 piliers, en tirer 2 à 3 axes prioritaires et les transformer en objectifs SMART — la ligne |
| labs/lab-01-code-review | intervention | tests, a11y, livraison, données, api | · | à la fin, tu sais produire une review complète et actionnable d'une PR — commentaires tagués (conventional comments), distinction bloquant / |
| labs/lab-02-communication-ecrite | intervention | tests, livraison | · | à la fin, tu sais transformer un message d'équipe flou en message clair, actionnable et self-contained (contexte + demande + deadline), et t |
| labs/lab-03-communication-orale | intervention | tests, livraison, style | · | à la fin, tu sais préparer un point de daily orienté objectif et un pitch technique de 2 minutes en problème / solution / impact, et poser u |
| labs/lab-04-estimation-planification | intervention | tests, story, livraison | · | à la fin, tu sais prendre une feature TribuZen brute, la découper en incréments INVEST, poser une estimation Fibonacci justifiée, et exploit |
| labs/lab-05-documentation-technique | intervention | tests, livraison, contrat | · | à la fin, tu sais écrire le README d'un composant existant et le runbook d'un incident réel, en te mettant à la place du lecteur qui n'a auc |
| labs/lab-06-pair-programming-mentorat | intervention | tests, livraison, api, style | · | à la fin, tu sais conduire une session de pairing en gardant le junior au clavier et le débloquer par des questions, sans jamais taper la so |
| labs/lab-07-adr-decision-making | intervention | tests, livraison, contrat, style | · | à la fin, tu sais transformer un fil de discussion en un ADR au format Nygard honnête (contexte, alternatives, décision, conséquences avec l |
| labs/lab-08-gestion-conflits | intervention | tests, livraison | · | à la fin, tu sais désamorcer un désaccord technique qui a dérapé (recadrage idées/personnes + décision + disagree and commit) et rédiger un  |
| labs/lab-09-carriere-developpeur | intervention | livraison, api, contrat | · | à la fin, tu sais bâtir une feuille de route trimestrielle mesurable et préparer un pitch de mission appuyé sur des récits STAR, en faisant  |
| labs/lab-10-projet-final | intervention | tests, story, livraison | · | à la fin, tu as produit la **chaîne complète d'artefacts** d'une seule feature TribuZen (estimation → ADR → PR → revue → désaccord tranché), |

## 09-nestjs — 26 labs · zéro 7 · intervention 16 · concept 3 · ≥3 artefacts 22 · oracle 1

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-01-event-loop | zéro | tests, a11y, api, style | · | à la fin, tu sais prédire l'ordre d'exécution complet (nextTick / Promise / setTimeout / setImmediate) et écrire un handler Node.js 22 non-b |
| labs/lab-02-modules-fs | concept | tests | · | à la fin, tu sais lire une config JSON et écrire des logs avec `node:fs/promises` + `node:path` en ESM sur Node.js 22. |
| labs/lab-03-streams | intervention | tests, livraison, api | · | à la fin, tu sais écrire un pipeline Node.js 22 qui traite un fichier volumineux sans le charger en mémoire — lecture, Transform de progress |
| labs/lab-04-serveur-http | concept | tests, api, contrat | · | à la fin, tu sais construire un serveur HTTP Node.js sans framework, router selon la méthode et l'URL, lire un body JSON et répondre correct |
| labs/lab-05-express-crud | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais construire une API REST CRUD complète avec Express 5, extraire les routes dans un Router modulaire, et tester chaque endpo |
| labs/lab-06-middleware | intervention | tests, données, api, contrat | · | à la fin, tu sais brancher une stack middleware Express 5 complète (cors, helmet, morgan, middleware custom réutilisable, error handler glob |
| labs/lab-07-validation-erreurs | zéro | tests, a11y, données, api, contrat | · | à la fin, tu sais valider un payload d'invitation TribuZen avec Zod, centraliser la gestion d'erreurs dans un middleware Express 5, et renvo |
| labs/lab-08-auth-jwt | zéro | tests, données, api, contrat, style | · | à la fin, tu sais écrire un flux register/login/logout avec bcrypt + JWT stocké en cookie httpOnly, et protéger des routes Express avec un m |
| labs/lab-09-nestjs-premiers-pas | intervention | tests, api | · | à la fin, tu bootstrappes une API NestJS avec le CLI, génères un module `familles` avec son controller et service, et valides les routes ave |
| labs/lab-10-controllers-dto | zéro | tests, api | · | à la fin, tu sais créer un controller NestJS avec routes REST complètes, valider les bodies avec class-validator et ValidationPipe, et retou |
| labs/lab-11-providers-di | intervention | tests, api, contrat, style | · | à la fin, tu sais créer un service `@Injectable()`, l'injecter dans un controller, et définir des providers custom (`useValue`, `useFactory` |
| labs/lab-12-modules-architecture | zéro | tests, api, contrat, style | · | à la fin, tu sais créer un `SharedModule` réutilisable, deux feature modules qui l'importent, et un module dynamique `forRoot` — tout en com |
| labs/lab-13-pipes-guards | intervention | tests, api, contrat, style | · | à la fin, tu sais implémenter un pipe custom de validation, un guard d'authentification, un guard de rôles avec `Reflector`, un interceptor  |
| labs/lab-14-typeorm-entites | intervention | tests, livraison, api | · | à la fin, tu sais définir des entités TypeORM avec colonnes typées, modéliser des relations OneToMany/ManyToOne/ManyToMany entre entités Tri |
| labs/lab-15-typeorm-queries | intervention | tests, données, api | · | à la fin, tu sais écrire des requêtes avec le repository et le QueryBuilder, charger des relations sans N+1, exécuter une transaction, génér |
| labs/lab-16-prisma-setup | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais écrire un schéma Prisma avec modèles et relations, appliquer une migration, et implémenter un `PrismaService` NestJS avec  |
| labs/lab-17-prisma-avance | intervention | tests, données, api | · | à la fin, tu sais écrire une transaction interactive Prisma 6, un nested write, une pagination curseur, un middleware soft delete, et une re |
| labs/lab-18-testing | zéro | tests, api | ✅ | à la fin, tu sais écrire des tests unitaires d'un service NestJS avec dépendances mockées (`Test.createTestingModule` + `useValue`), tester  |
| labs/lab-19-auth-nestjs | intervention | tests, api, style | · | à la fin, tu sais implémenter un login Passport/JWT, protéger toutes les routes avec un guard global, gérer la rotation des refresh tokens a |
| labs/lab-20-config-swagger | zéro | tests, données, api | · | à la fin, tu sais configurer `ConfigModule` avec validation Joi, injecter `ConfigService` de façon typée via `registerAs`/`ConfigType`, et d |
| labs/lab-21-websockets | intervention | tests, livraison, api, contrat | · | à la fin, tu sais créer une `FeedGateway` WebSocket avec rooms Socket.IO, émettre vers une room famille, et gérer l'upload/download de média |
| labs/lab-22-queues | intervention | tests, livraison, api, style | · | à la fin, tu sais mettre un job en file avec BullMQ (`@nestjs/bullmq`), écrire un processor `WorkerHost`, configurer retries et backoff, et  |
| labs/lab-23-docker-deploy | intervention | tests, livraison, api | · | à la fin, tu sais dockeriser une app NestJS en multi-stage, exposer un health check live/ready avec Terminus v11, et configurer un arrêt gra |
| labs/lab-24-projet-final | intervention | tests, a11y, livraison, données, api, style | · |  |
| labs/lab-25-mongodb-mongoose | concept | tests, livraison, données, api | · |  |
| labs/lab-26-graphql | intervention | tests, données, api, contrat | · | à la fin, tu sais exposer une API GraphQL code-first avec NestJS — `FamilyResolver` avec `@Query` et `@Mutation`, `MemberLoader` DataLoader  |

## 10-postgresql — 18 labs · zéro 0 · intervention 14 · concept 4 · ≥3 artefacts 18 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-01-premiers-pas-psql | intervention | tests, livraison, données | · | à la fin, tu sais démarrer PostgreSQL 17 avec Docker, te connecter avec psql, créer les premières tables de TribuZen, insérer et interroger  |
| labs/lab-02-crud-complet | intervention | a11y, livraison, données, api, style | · | à la fin, tu as écrit les requêtes CRUD complètes sur le schéma TribuZen (familles + posts) — INSERT avec RETURNING, feed paginé, agrégation |
| labs/lab-03-jointures-en-pratique | intervention | a11y, livraison, données, style | · |  |
| labs/lab-04-transactions | intervention | tests, a11y, livraison, données, style | · | à la fin, tu sais écrire une transaction atomique avec **Prisma** (interactive + séquentielle), observer une anomalie de concurrence en SQL  |
| labs/lab-05-index-et-explain | concept | tests, livraison, données, contrat | · | à la fin, tu as créé des index B-tree sur une base TribuZen Docker réelle avec **psql + SQL**, observé le changement de plan avec `EXPLAIN A |
| labs/lab-06-query-planner-deep-dive | intervention | tests, a11y, livraison, données, contrat, style | · | à la fin, tu as analysé et optimisé la requête du feed famille TribuZen avec `EXPLAIN ANALYZE` — tu identifies les Seq Scan, tu crées les in |
| labs/lab-07-index-gin-gist-brin | concept | a11y, livraison, données, contrat | · |  |
| labs/lab-08-isolation-levels | intervention | tests, a11y, livraison, style | · |  |
| labs/lab-09-locks-en-action | intervention | tests, a11y, livraison, données, contrat, style | · |  |
| labs/lab-10-deadlocks | intervention | a11y, livraison, données, contrat | · |  |
| labs/lab-11-performances | intervention | a11y, livraison, données, style | · |  |
| labs/lab-12-window-functions-cte | intervention | tests, a11y, livraison, données, api, style | · |  |
| labs/lab-13-jsonb-fulltext | concept | livraison, données, contrat | · |  |
| labs/lab-14-securite-rls | concept | tests, livraison, données, contrat | · |  |
| labs/lab-15-systeme-reservation | intervention | tests, livraison, données, api | · |  |
| labs/lab-16-replication | intervention | tests, a11y, livraison, données, api, style | · | à la fin, tu sais configurer une publication et une subscription sur une instance locale, observer le flux WAL via les vues système, mesurer |
| labs/lab-17-monitoring | intervention | tests, a11y, livraison, données, style | · |  |
| labs/lab-18-partitioning | intervention | tests, a11y, livraison, données, style | · |  |

## 11-http-caching — 18 labs · zéro 5 · intervention 7 · concept 6 · ≥3 artefacts 14 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-prerequis-et-vue-ensemble | intervention | tests, livraison, api | · | à la fin, tu sais lire les en-têtes de cache d'une vraie réponse HTTP avec `curl -I`, distinguer un cache hit / un miss / une revalidation ` |
| labs/lab-01-protocole-http | intervention | tests, api, contrat, style | · | à la fin, tu sais inspecter une requête/réponse HTTP réelle avec `curl -v` et l'onglet DevTools Network, forger chaque méthode à la main, li |
| labs/lab-02-http2-http3 | concept | tests, livraison, api | · | à la fin, tu sais lire le protocole négocié dans DevTools et avec curl, distinguer un waterfall HTTP/1.1 (vagues de 6) d'un waterfall HTTP/2 |
| labs/lab-03-en-tetes-http | intervention | tests, a11y, livraison, style | · | à la fin, tu sais catégoriser les en-têtes d'une vraie réponse HTTP, manipuler les en-têtes de représentation/négociation d'un serveur Node, |
| labs/lab-04-cache-control | concept | tests, livraison, données, api, contrat, style | · | à la fin, tu sais poser le bon `Cache-Control` pour cinq types de ressource (asset à hash, HTML, annuaire public, profil privé, donnée sensi |
| labs/lab-05-etag-validation-conditionnelle | intervention | tests, livraison, api | · | à la fin, tu sais écrire un endpoint **Express** qui émet un ETag, répond `304 Not Modified` sur une revalidation `If-None-Match` (liste inc |
| labs/lab-06-stale-while-revalidate | concept | tests, livraison, api | · | à la fin, tu sais poser une politique `Cache-Control: max-age + stale-while-revalidate + stale-if-error` sur un vrai serveur Express, la lir |
| labs/lab-07-cache-navigateur | concept | tests, story, api | · | à la fin, tu sais lire la source de chaque requête dans DevTools Network (`memory cache` / `disk cache` / réseau), prouver l'heuristique de  |
| labs/lab-08-cdn | intervention | tests, livraison | · | à la fin, tu sais interroger un asset réellement servi par un CDN public, lire ses en-têtes de cache (`Cache-Status`, `CF-Cache-Status` / `x |
| labs/lab-09-cache-multi-couches | zéro | tests, api | · | à la fin, tu sais monter une pile de caches (reverse proxy → app cache → base), **tracer une requête** couche par couche avec `curl -I` en l |
| labs/lab-10-ssr | concept | tests, contrat | · | à la fin, tu sais rendre une page publique **côté serveur** (contenu dans le premier octet), y ajouter un **cache de rendu** en mémoire, et  |
| labs/lab-11-isr-ssg | zéro | tests, livraison, api, contrat, style | · | à la fin, tu sais pré-rendre des pages avec `generateStaticParams`, activer l'ISR avec `export const revalidate`, exposer un endpoint `POST  |
| labs/lab-12-edge-rendering | zéro | tests, api, style | · | à la fin, tu sais écrire un `middleware.ts` Next.js 15 qui s'exécute au edge (géo-redirection de locale + gate de session sur cookie), plus  |
| labs/lab-13-http-streaming | concept | tests, api | · | à la fin, tu sais **streamer** une page HTML côté serveur (le shell dans le premier octet, un fragment lent derrière) via `Transfer-Encoding |
| labs/lab-14-performance-web | intervention | tests, livraison, données, contrat, style | · | à la fin, tu sais **mesurer** LCP/INP/CLS sur une vraie page (avec **Lighthouse dans les DevTools** et **PageSpeed Insights**), **distinguer |
| labs/lab-15-pwa-service-workers | zéro | tests, données, contrat, style | · | à la fin, tu sais enregistrer un vrai Service Worker, l'observer dans DevTools, implémenter les 3 stratégies de cache (cache-first / network |
| labs/lab-16-push-api-web-notifications | zéro | tests, livraison, données, contrat | · | à la fin, tu sais abonner un vrai navigateur à la Push API (`Notification.requestPermission` + `pushManager.subscribe` avec clé VAPID), envo |
| labs/lab-17-projet-final | intervention | tests, livraison, api, contrat | · | à la fin, tu sais auditer la chaîne de cache complète d'une app réelle, poser la bonne stratégie par type de contenu, et **prouver** le gain |

## 12-aws-cloud — 20 labs · zéro 1 · intervention 14 · concept 5 · ≥3 artefacts 16 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-aws-fundamentals | intervention | tests, contrat | · | à la fin, tu as un compte AWS sécurisé (MFA root + utilisateur IAM), l'AWS CLI configurée avec un profil nommé pointant sur Paris, un budget |
| labs/lab-01-iam | concept | tests, livraison | · | à la fin, tu as créé dans un **vrai compte AWS** un user, un group, un role au moindre privilège et une policy MFA, et tu as **prouvé** leur |
| labs/lab-02-vpc | zéro | tests, livraison, api, contrat | · | à la fin, tu sais construire un VPC multi-AZ avec subnet public + subnet privé, IGW, NAT Gateway et Security Groups, **prouver la connectivi |
| labs/lab-03-ec2 | intervention | tests, livraison, données, contrat, style | · | à la fin, tu sais lancer une instance EC2 `t3.micro` (Console **et** CLI) avec un **user-data** qui démarre un serveur au premier boot, t'y  |
| labs/lab-04-s3 | intervention | tests, livraison | · | à la fin, tu as créé un vrai bucket S3 privé, uploadé/versionné des objets, généré une presigned URL d'upload qui marche depuis le navigateu |
| labs/lab-05-cdk-constructs | intervention | tests, livraison | · | à la fin, tu sais initialiser un projet CDK v2, bootstrapper ton compte, décrire une stack S3 en TypeScript, la déployer réellement sur AWS, |
| labs/lab-06-lambda | intervention | tests, a11y, livraison, données | · | à la fin, tu as déployé une **vraie** fonction Lambda Node.js dans ton compte AWS, tu l'as **invoquée** réellement, tu as **observé** la dif |
| labs/lab-07-api-gateway | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais déployer une **HTTP API** devant une **vraie** fonction Lambda, appeler son endpoint au `curl`, diagnostiquer un `502` de  |
| labs/lab-08-rds-elasticache | intervention | tests, a11y, livraison, données, api, contrat | · | à la fin, tu as provisionné une **vraie** instance RDS PostgreSQL dans ton VPC, tu t'y es connecté en `psql`, tu as créé un schéma TribuZen  |
| labs/lab-09-dynamodb | concept | tests, livraison, données | · | à la fin, tu sais créer une vraie table DynamoDB (clé composite, on-demand), y écrire des items au CLI, lire le feed avec `query`, mesurer p |
| labs/lab-10-messaging | intervention | tests, a11y, livraison | · | à la fin, tu sais créer un vrai topic SNS et deux vraies queues SQS (avec DLQ + visibility timeout), câbler un fan-out, publier au CLI et vé |
| labs/lab-11-cognito | intervention | tests, livraison, api, style | · | à la fin, tu as créé un **vrai** User Pool Cognito, inscrit et confirmé un utilisateur, récupéré les trois tokens JWT à l'AWS CLI, **décodé  |
| labs/lab-12-ecs-containers | concept | tests, livraison, api, contrat | · | à la fin, tu sais empaqueter un service HTTP dans une image Docker, la pousser dans **ECR**, la déployer en **service Fargate derrière un AL |
| labs/lab-13-cloudfront-cdn | intervention | tests, livraison, api, contrat | · | à la fin, tu sais monter une **vraie** distribution CloudFront devant un bucket S3 **privé** avec **OAC** (bucket policy sur le service prin |
| labs/lab-14-cloudwatch-observability | intervention | tests, livraison, données | · | à la fin, tu sais instrumenter une **vraie** Lambda déployée dans ton compte AWS — logs structurés JSON, métrique custom via `PutMetricData` |
| labs/lab-15-security | concept | tests, livraison, données | · | à la fin, tu sais créer une **customer managed KMS key**, y chiffrer un secret dans **Secrets Manager**, écrire une **Lambda** qui le lit av |
| labs/lab-16-serverless-architecture | intervention | tests, story, livraison, données, api, contrat | · | à la fin, tu sais déployer une **vraie** state machine Step Functions **Standard** dans ton compte AWS, l'invoquer réellement, observer le g |
| labs/lab-17-cicd | intervention | tests, livraison, api, style | · | à la fin, tu as un vrai workflow GitHub Actions qui **s'authentifie auprès d'AWS via OIDC** (rôle assumé, jeton temporaire) et lance `cdk de |
| labs/lab-18-projet-final | intervention | tests, livraison, api, contrat, style | · | à la fin, tu as **conçu puis déployé pour de vrai**, en CDK, une architecture TribuZen minimale mais **complète et fonctionnelle** — Cognito |
| labs/lab-19-deploy-nuxt-next | concept | tests, a11y, livraison, données, api, style | · | à la fin, tu as mis une vraie app Nuxt (ou Next) **SSR** en ligne sur AWS avec **SST v3 (OpenNext)**, branché une variable d'environnement,  |

## 13-architecture — 24 labs · zéro 0 · intervention 13 · concept 11 · ≥3 artefacts 22 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-quest-ce-que-architecture-et-posture | concept | tests, livraison, style | · | à la fin, tu sais lire un système inconnu et **séparer ce qui est structurant de ce qui est un détail**, qualifier la réversibilité de chaqu |
| labs/lab-01-principes-solid | intervention | tests, a11y, livraison, contrat | · | à la fin, tu sais lire un design existant, **nommer chaque violation SOLID** (S/O/L/I/D), et **écrire le refactoring** qui la lève — sans ov |
| labs/lab-02-design-patterns-essentiels | concept | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais, face à un problème TribuZen brut, **nommer le problème**, décider quel design pattern y répond (ou décider qu'aucun n'est |
| labs/lab-03-clean-code-code-smells-refactoring | intervention | tests, a11y, livraison, données, api, style | · | à la fin, tu sais lire un extrait TribuZen malade, **nommer** chaque code smell (avec sa famille), l'**associer** à la technique de refactor |
| labs/lab-04-dependency-injection-ioc | intervention | tests, livraison, contrat | · | à la fin, tu sais transformer un service au couplage dur en injection par constructeur sur interfaces, dessiner le graphe de dépendances ava |
| labs/lab-05-architecture-en-couches | intervention | tests, livraison, données, api, style | · | à la fin, tu sais prendre un module TribuZen où tout est empilé, le **découper en couches** (présentation / métier / données), tracer son ** |
| labs/lab-06-architecture-hexagonale | intervention | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais concevoir l'hexagone d'un domaine réel : identifier les ports primaires et secondaires, les attribuer au bon côté, placer  |
| labs/lab-07-clean-architecture | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais prendre un feature TribuZen, le **mapper sur les 4 cercles** de la clean architecture, placer chaque règle dans le bon ann |
| labs/lab-08-monolithe-modulaire-vs-microservices | intervention | tests, livraison, données, style | · | à la fin, tu sais **décider** un style de déploiement (monolithe modulaire vs microservices) pour TribuZen avec une **justification écrite** |
| labs/lab-09-ddd-strategique | concept | tests, livraison, données, contrat, style | · | à la fin, tu sais partir d'un pêle-mêle de concepts métier, en déduire les **bounded contexts**, dessiner une **context map** en nommant cha |
| labs/lab-10-ddd-tactique | concept | tests, a11y, livraison, données, style | · | à la fin, tu sais prendre un pêle-mêle de champs d'un domaine TribuZen, le **modéliser en agrégat** (racine + entités internes + value objec |
| labs/lab-11-api-design-et-backend-patterns | concept | tests, livraison, api, contrat, style | · | à la fin, tu sais prendre un pêle-mêle d'opérations backend et en **concevoir le contrat d'API** : modéliser les **ressources**, choisir **v |
| labs/lab-12-jobs-concurrence-async | concept | tests, livraison, données, contrat | · | à la fin, tu sais **concevoir** le système de jobs d'une feature TribuZen : décider ce qui est synchrone vs déporté en background, dessiner  |
| labs/lab-13-architecture-donnees | intervention | tests, livraison, données | · | à la fin, tu sais prendre un besoin produit, **tracer sa carte de stockage** (quel store possède quelle donnée), **décider polyglot ou mono- |
| labs/lab-14-architecture-frontend | concept | tests, story, a11y, livraison, api, contrat, style | · | à la fin, tu sais **concevoir l'architecture front d'un écran réel** — découpage en composants (frontières), placement de chaque morceau d'é |
| labs/lab-15-frontend-avance-micro-offline | concept | tests, livraison, données, contrat, style | · | à la fin, tu sais (1) **trancher et documenter** si une feature TribuZen justifie un micro-frontend, et (2) **concevoir la stratégie offline |
| labs/lab-16-communication-et-integration | intervention | tests, livraison, données, api, contrat, style | · | à la fin, tu sais **choisir et justifier** le style de communication (REST / GraphQL / gRPC / WebSocket / SSE / polling) pour cinq besoins r |
| labs/lab-17-event-driven-et-messaging | intervention | tests, livraison, données, style | · | à la fin, tu sais **concevoir** un flux event-driven complet pour un scénario TribuZen — nommer les messages (événement vs commande), choisi |
| labs/lab-18-patterns-distribues-cqrs-es-saga | concept | tests, livraison | · | à la fin, tu sais prendre trois besoins TribuZen et **décider** pour chacun si CQRS, Event Sourcing ou Saga s'applique — en **justifiant**,  |
| labs/lab-19-resilience-consistency-migration | intervention | tests, livraison, données | · | à la fin, tu sais **concevoir** la résilience d'un flux TribuZen (budget de timeout décroissant, retry + jitter, circuit breaker, bulkhead), |
| labs/lab-20-securite-architecturale | intervention | tests, livraison, api | · | à la fin, tu sais prendre une feature TribuZen, en dérouler le **threat model STRIDE** à partir d'un data flow diagram, **placer les contrôl |
| labs/lab-21-performance-scalabilite | intervention | tests, api | · | à la fin, tu sais lire les métriques d'un système sous charge, **localiser le goulot** (pas le deviner), et concevoir la **stratégie de scal |
| labs/lab-22-observabilite-et-testing-archi | concept | tests, livraison, données, api, contrat | · | à la fin, tu sais prendre un flux TribuZen aveugle et non testé, et **concevoir** (a) son observabilité — quels logs structurés, quelles mét |
| labs/lab-23-decisions-culture-et-capstone | concept | tests, livraison, données, style | · | à la fin, tu sais **concevoir une architecture logicielle de bout en bout** pour un vrai produit — découpage métier, style, données, communi |

## 14-securite-applicative — 14 labs · zéro 0 · intervention 12 · concept 2 · ≥3 artefacts 12 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-introduction-securite | intervention | tests, a11y, livraison, api | · | à la fin, tu sais dresser un **modèle de menace défensif** d'une application réelle — cartographier sa surface d'attaque, lister les menaces |
| labs/lab-01-owasp-top10 | concept | tests, livraison, api, style | · | à la fin, tu sais produire une **carte des risques OWASP** d'une application réelle (constat → catégorie A0x → parade défensive) et la **pri |
| labs/lab-02-injection | intervention | api, contrat | · | à la fin, tu sais repérer les trois failles d'injection (SQLi, stored XSS, command injection) dans un fichier de routes réel, et les réécrir |
| labs/lab-03-authentification | intervention | tests, livraison, api, contrat, style | · | à la fin, tu sais transformer un endpoint de login fragile en un flux durci — hachage **argon2id**, comparaison en temps constant, message * |
| labs/lab-03b-oidc-pkce-client | intervention | tests, livraison, api, contrat, style | · | à la fin, tu sais **auditer** un flux de connexion sociale vulnérable et le **re-concevoir** en Authorization Code + PKCE, en justifiant cha |
| labs/lab-03c-webauthn-passkeys | concept | tests, livraison, données, api, contrat | · | à la fin, tu sais **concevoir et spécifier** un flux d'authentification par passkey (registration + authentication) pour un produit à donnée |
| labs/lab-04-autorisation | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais **auditer** une API TribuZen, **repérer un IDOR/BOLA** et le **corriger** en scellant la requête par le propriétaire, ajou |
| labs/lab-05-cryptographie | intervention | tests, livraison, api, style | · | à la fin, tu sais chiffrer/déchiffrer une donnée sensible en **AES-256-GCM** avec un **IV unique par opération**, un **tag d'authentificatio |
| labs/lab-06-headers-securite | intervention | tests, livraison, api | · | à la fin, tu sais durcir un vrai serveur Express qui rend le front-office TribuZen — CSP stricte à base de nonce (Report-Only puis bloquant) |
| labs/lab-07-cors | intervention | tests, a11y, livraison | · | à la fin, tu sais **repérer** une config CORS dangereuse (`origin: true` + `credentials: true`), **expliquer** précisément la fuite qu'elle  |
| labs/lab-08-api-security | intervention | tests, données, api, style | · | à la fin, tu sais durcir une API REST vulnérable — valider un JWT correctement (`verify` + algo imposé + `aud`/`iss`/`exp`), poser un rate l |
| labs/lab-09-supply-chain | intervention | tests, livraison | · | à la fin, tu sais auditer les dépendances npm d'un projet réel (`npm audit`), verrouiller les installs (lockfile + `npm ci`), fermer une **d |
| labs/lab-10-infrastructure | intervention | tests, a11y, livraison, api, style | · | à la fin, tu sais sortir les secrets de TribuZen de git (et gérer une clé déjà fuitée), durcir un `docker-compose` (non-root, secrets montés |
| labs/lab-11-audit-pentest | intervention | tests, livraison, api, contrat | · | à la fin, tu sais **mener un audit de sécurité complet de TON PROPRE système** — cadrage légal, threat model (4 questions + STRIDE), revue + |

## 15-cicd-devops — 12 labs · zéro 2 · intervention 10 · concept 0 · ≥3 artefacts 11 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-introduction-cicd | intervention | tests, a11y, livraison, données, api | · | à la fin, tu sais cartographier le pipeline CI/CD idéal d'un projet réel (TribuZen), nommer chaque étape (source, build, test, package, depl |
| labs/lab-01-github-actions-fondamentaux | intervention | tests, a11y, livraison | · | à la fin, tu sais écrire de zéro un workflow GitHub Actions qui, à chaque push et pull request, récupère le code, installe Node.js, installe |
| labs/lab-02-github-actions-avance | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais transformer un `ci.yml` naïf en pipeline matriciel, caché, produisant un artefact `dist`, et factorisé via un reusable wor |
| labs/lab-03-testing-dans-ci | intervention | tests, livraison, données | · | à la fin, tu sais écrire un `ci.yml` qui gate le merge sur les tests unitaires **et** la couverture (≥ 80 %), provisionne une base Postgres  |
| labs/lab-04-conteneurisation-ci | intervention | tests, livraison | · | à la fin, tu sais écrire un Dockerfile multi-stage pour l'API TribuZen et le builder dans GitHub Actions avec Buildx + cache de layers `type |
| labs/lab-05-artefacts-registries | zéro | tests, a11y, livraison, style | · | à la fin, tu sais écrire un workflow GitHub Actions qui build l'image du backend TribuZen et la pousse sur GHCR avec des tags propres (semve |
| labs/lab-06-strategies-deploiement | intervention | tests, livraison, données, api, style | · | à la fin, tu sais concevoir et écrire, pour TribuZen, un **déploiement canary à paliers avec rollback automatique**, un **endpoint readiness |
| labs/lab-07-preview-environments | zéro | tests, livraison, api | · | à la fin, tu sais concevoir les workflows GitHub Actions qui déploient une preview éphémère à l'ouverture d'une PR, commentent son URL, et l |
| labs/lab-08-securite-pipelines | intervention | tests, livraison, api, style | · | à la fin, tu sais **auditer** un workflow de déploiement vulnérable et le **durcir** — OIDC à la place des clés long terme, `GITHUB_TOKEN` a |
| labs/lab-09-iac-introduction | intervention | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais écrire un module Terraform minimal (provider, resource, variable, output) et l'intégrer dans un workflow GitHub Actions qu |
| labs/lab-10-monitoring-pipelines | intervention | tests, a11y, livraison, données, api | · | à la fin, tu sais **calculer les 4 métriques DORA** d'un pipeline réel, **instrumenter** un workflow pour émettre durées + statut, **alerter |
| labs/lab-11-projet-final | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu as **conçu et construit** le pipeline CI/CD complet de TribuZen de bout en bout — de `git push` à la production — sur un vrai d |

## 16-observability-sre — 23 labs · zéro 2 · intervention 14 · concept 7 · ≥3 artefacts 20 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| 16-observability-sre/labs/lab-03-red-use-methodes | concept | · | · |  |
| labs/lab-00-prerequis-et-introduction | intervention | tests, livraison | · | à la fin, tu sais **dresser le plan d'observabilité** d'un système distribué réel — mapper les 3 piliers (logs, métriques, traces) sur ses c |
| labs/lab-01-logging-structure | intervention | livraison, données, api, contrat | · | à la fin, tu sais transformer les logs `console.log` d'une route de l'API TribuZen en JSON Pino structuré, corrélé par un `requestId`, avec  |
| labs/lab-02-metriques-et-prometheus | intervention | tests, livraison, api | · | à la fin, tu sais instrumenter une API Node/Express avec `prom-client`, l'exposer sur `/metrics`, la faire scraper par un **vrai Prometheus* |
| labs/lab-03-red-use-methodes | zéro | tests, livraison, api, contrat | · | à la fin, tu sais produire, pour un service et ses ressources, le tableau RED/USE complet **et** la PromQL de chaque signal, vérifiée contre |
| labs/lab-04-distributed-tracing | intervention | tests, livraison, api | · | à la fin, tu sais assembler à la main une trace multi-services (root + child spans reliés par `trace_id` / `parentSpanId`), l'envoyer dans u |
| labs/lab-05-opentelemetry-instrumentation | concept | livraison, données, api | · | à la fin, tu sais instrumenter une API Node avec le SDK OpenTelemetry (auto-instrumentation + un span manuel), l'exporter en OTLP vers un Co |
| labs/lab-06-error-tracking-sentry | intervention | tests, données, api, style | · | à la fin, tu sais initialiser `@sentry/node` (chargé en premier) dans une API Express, capturer une exception avec un contexte utilisateur * |
| labs/lab-07-grafana-dashboards | intervention | tests, a11y, livraison, api, contrat | · | à la fin, tu sais connecter Grafana à Prometheus, construire le dashboard **RED** (Rate / Errors / Duration) de l'API TribuZen, le paramétre |
| labs/lab-08-sli-slo-sla | concept | tests, livraison, api, contrat | · | à la fin, tu sais définir 2–3 SLO réels pour TribuZen — chacun avec son SLI en PromQL, une cible dérivée d'une mesure, l'error budget chiffr |
| labs/lab-09-alerting-strategies | intervention | tests, a11y, livraison, données, api, style | · | à la fin, tu sais écrire des règles d'alerte **multi-window multi-burn-rate** sur un SLO, les charger dans un **vrai Prometheus**, brancher  |
| labs/lab-10-incidents-et-postmortems | intervention | tests, livraison | · | à la fin, tu sais mener un **postmortem blameless** de bout en bout à partir d'une timeline brute — classer la sévérité, reconstruire la roo |
| labs/lab-11-capacity-planning | concept | tests, livraison, api, contrat, style | · | à la fin, tu sais écrire un test de charge k6 en **modèle ouvert** (`ramping-arrival-rate`) contre l'API TribuZen, pousser le débit jusqu'au |
| labs/lab-12-chaos-engineering | concept | tests, livraison, api | · | à la fin, tu sais transformer une inquiétude vague (« /rsvp gère-t-il une base lente ? ») en une **expérience de chaos rigoureuse** : hypoth |
| labs/lab-13-observability-as-code | intervention | tests, a11y, livraison, api | · | à la fin, tu sais sortir un dashboard et une règle d'alerte du **clickops** : provisionner un **datasource** et un **dashboard** Grafana **p |
| labs/lab-14-kubernetes-observability | intervention | tests, a11y, livraison, api, style | · | à la fin, tu sais observer TribuZen sur un **vrai** cluster Kubernetes local : lire les métriques natives (`kube-state-metrics`, `cAdvisor`) |
| labs/lab-15-elk-stack-kibana | intervention | tests, livraison, données, contrat | · | à la fin, tu sais lancer une vraie stack **Elasticsearch + Kibana**, y **ingérer** les logs JSON structurés de TribuZen, poser un **mapping* |
| labs/lab-16-observabilite-frontend | zéro | tests, livraison, données, api, contrat | · | à la fin, tu sais instrumenter un front réel pour collecter les **Core Web Vitals** des vrais utilisateurs avec `web-vitals`, capturer les * |
| labs/lab-17-apm-et-profiling | intervention | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais brancher un **vrai Pyroscope** sur une API Express, profiler un endpoint TribuZen **CPU-bound**, lire le **flamegraph** po |
| labs/lab-18-finops-et-feature-flags-observabilite | concept | tests, a11y, livraison, api, style | · | à la fin, tu sais (1) chiffrer les trois drivers de coût d'obs de TribuZen et les faire baisser sans perdre le signal — **drop à la source** |
| labs/lab-19-rgpd-observabilite | intervention | tests, livraison, style | · | à la fin, tu sais **auditer** les logs et traces d'une API pour repérer les PII, les **minimiser/redacter à la source** avec Pino `redact` + |
| labs/lab-20-dora-et-production-readiness | concept | tests, a11y, livraison, api, style | · | à la fin, tu sais **mener une Production Readiness Review** complète d'un service — remplir une checklist d'observabilité avec preuves, situ |
| labs/lab-21-projet-final | intervention | tests, a11y, livraison, api, style | · | à la fin, tu as monté **de bout en bout** l'observabilité de TribuZen — logs structurés + métriques Prometheus + traces OTel + dashboard RED |

## 17-distributed-systems — 23 labs · zéro 2 · intervention 18 · concept 3 · ≥3 artefacts 20 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-prerequis-et-introduction | intervention | tests | · | à la fin, tu sais lire un design distribué et pointer, ligne par ligne, quelle **fallacy** il suppose et quel **défi fondamental** (partial  |
| labs/lab-01-communication-reseau-fondamentale | concept | tests, a11y, livraison, api, style | · | à la fin, tu sais **mesurer** la latence réelle entre deux services TribuZen, **raisonner** le coût d'un endpoint en RTT, et **provoquer + d |
| labs/lab-02-microservices-en-typescript | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais implémenter deux services TypeScript autonomes qui communiquent en HTTP (avec timeout), exposent des health checks livenes |
| labs/lab-03-serialisation-et-contrats-api | intervention | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais définir un contrat d'événement TribuZen (JSON Schema + variante Protobuf) et le faire évoluer sur plusieurs sprints **sans |
| labs/lab-04-communication-synchrone | zéro | tests, a11y, livraison, données, contrat | · | à la fin, tu sais implémenter un appel gRPC **unary** entre deux services TribuZen, poser une **deadline**, la **propager** dans une chaîne  |
| labs/lab-05-communication-asynchrone-message-queues | intervention | tests, livraison, api | · | à la fin, tu sais **monter une vraie file de messages** pour TribuZen — publier une tâche, la consommer avec **ack après traitement**, obser |
| labs/lab-06-event-driven-architecture | zéro | tests, livraison, données, contrat | · | à la fin, tu sais concevoir et implémenter un flux event-driven TribuZen — un producteur émet **un** événement `sortie.created`, trois conso |
| labs/lab-07-api-gateway-et-bff | intervention | livraison, api, style | · | à la fin, tu sais **monter une gateway minimale** devant plusieurs services TribuZen — **router** (reverse proxy), **vérifier l'auth une seu |
| labs/lab-08-retries-timeouts-idempotency | intervention | tests, livraison, données, api | · | à la fin, tu sais rendre une mutation TribuZen (`POST /sorties/:id/rsvp`, qui paie une quote-part) **sûre au retry** : un client qui timeout |
| labs/lab-09-coherence-et-theoreme-cap | intervention | tests, livraison | · | à la fin, tu sais **classer chaque donnée d'un système réel (TribuZen) par le modèle de cohérence qu'elle exige** et **justifier CP vs AP (+ |
| labs/lab-10-replication-et-partitionnement | intervention | tests, a11y, livraison, données, api, style | · | à la fin, tu sais concevoir la stratégie de distribution des données de TribuZen — choisir un modèle de réplication et un mode sync/async pa |
| labs/lab-11-transactions-distribuees-saga | intervention | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais concevoir et implémenter une **saga orchestrée** avec compensations sémantiques pour une opération TribuZen multi-services |
| labs/lab-12-cqrs-event-sourcing | intervention | tests, story, a11y, livraison, données, contrat, style | · | à la fin, tu sais implémenter un **event store append-only** sur PostgreSQL pour le budget TribuZen, reconstruire un solde par **replay** (` |
| labs/lab-13-outbox-pattern-reliable-messaging | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais rendre fiable la publication de l'événement `SortieCréée` de TribuZen malgré le **dual-write** : écrire l'événement dans u |
| labs/lab-14-failure-modes-et-circuit-breaker | intervention | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais **provoquer une panne en cascade** sur l'API-gateway TribuZen (le service `Notifications` devient lent → le pool sature →  |
| labs/lab-15-rate-limiting-et-backpressure | intervention | tests, livraison, api, style | · | à la fin, tu sais **protéger un vrai service** contre un pic de trafic — écrire un **token bucket** local, **prouver** qu'il fuit derrière 2 |
| labs/lab-16-observabilite-distribuee | intervention | tests, a11y, livraison, api, style | · | à la fin, tu sais faire voyager **un seul trace id** du clic jusqu'au timeout SMTP à travers **deux services HTTP** (sync) **et une queue**  |
| labs/lab-17-testing-distribue | intervention | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais écrire **deux vrais tests** qui n'existent qu'à la frontière entre services TribuZen : (1) un **contract test consumer-dri |
| labs/lab-18-consensus-et-coordination | intervention | tests, a11y, livraison, api, style | · | à la fin, tu sais faire une **élection de leader** entre plusieurs répliques TribuZen via un **vrai cluster etcd** (une seule réplique décle |
| labs/lab-19-temps-ordre-et-horloges | concept | tests, a11y, livraison, api, contrat, style | · | à la fin, tu sais **prouver** que `Date.now()` ordonne mal des événements entre nœuds, implémenter une **horloge de Lamport** puis une **vec |
| labs/lab-20-stream-processing | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais consommer un **log partitionné** réel (Redpanda, API Kafka), agréger le flux d'activité TribuZen en **fenêtres event-time* |
| labs/lab-21-crdts-et-resolution-de-conflits | concept | tests, livraison | · | à la fin, tu sais implémenter un **OR-Set** et un **PN-Counter** en TypeScript, les faire tourner sur **deux vrais nœuds** (deux processus N |
| labs/lab-22-projet-final | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu as **conçu et implémenté** un système TribuZen distribué de bout en bout — plusieurs services avec chacun sa base, communicatio |

## 18-ia — 21 labs · zéro 6 · intervention 8 · concept 7 · ≥3 artefacts 19 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-prerequis-et-paysage-ia | concept | tests, livraison, style | · | à la fin, tu sais classer des fonctionnalités produit en « LLM direct / embeddings-RAG / pas d'IA », choisir une famille de modèle Claude pa |
| labs/lab-01-prompting-fondamental | intervention | tests | · | à la fin, tu sais écrire un prompt structuré (rôle/contexte/instruction/format), le faire tourner contre un vrai LLM, et l'itérer méthodique |
| labs/lab-02-prompting-avance | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais transformer un méga-prompt fragile en un prompt industriel — balises XML, chain-of-thought structuré, thinking adaptatif,  |
| labs/lab-03-assistants-code | intervention | tests, a11y, livraison, style | · | à la fin, tu sais cadrer et piloter un assistant de code (Claude Code, Copilot ou Cursor) sur une tâche réelle de ton dépôt, de bout en bout |
| labs/lab-04-api-claude | zéro | tests, données, api, contrat, style | · | à la fin, tu sais écrire un vrai appel à la Messages API de Claude en TypeScript qui **streame** la réponse et exécute un **outil** (tool us |
| labs/lab-05-mcp-model-context-protocol | concept | tests, livraison, données, contrat | · | à la fin, tu sais coder un vrai MCP server en TypeScript avec `@modelcontextprotocol/sdk`, exposer un tool + une resource TribuZen, et l'app |
| labs/lab-06-agents-orchestration | zéro | tests, livraison, données, contrat, style | · | à la fin, tu sais coder un **vrai agent en boucle** (perceive-plan-act) qui appelle plusieurs outils TribuZen jusqu'à produire un plan, avec |
| labs/lab-07-maths-essentielles | concept | tests, livraison, contrat | · | à la fin, tu sais coder `dotProduct`, `cosineSimilarity` et `softmax` en TypeScript pur, vérifier chaque résultat **à la main**, et t'en ser |
| labs/lab-08-neural-network-from-scratch | zéro | tests, livraison, contrat | · | à la fin, tu sais coder un réseau de neurones à une couche cachée (neurone → couche dense → forward → loss → backpropagation → boucle d'entr |
| labs/lab-09-transformer-et-attention | zéro | tests, a11y, contrat, style | · | à la fin, tu sais coder de zéro un **scaled dot-product attention** (`softmax(Q·Kᵀ / √d_k) · V`) sur une petite séquence, l'exécuter, lire l |
| labs/lab-10-entrainement-et-fine-tuning | concept | tests, livraison, api, contrat, style | · | à la fin, tu sais (1) préparer un vrai dataset de fine-tuning au format JSONL conversationnel avec filtrage PII, et (2) rédiger une décision |
| labs/lab-11-tokenization-et-embeddings | concept | tests, livraison, données, api, style | · | à la fin, tu sais tokeniser du texte (principe BPE + comptage), calculer de **vrais embeddings** avec un modèle réel, et coder une **recherc |
| labs/lab-12-llms-locaux-ollama | zéro | tests, contrat | · | à la fin, tu sais installer Ollama, faire tourner un **modèle ouvert en local**, et l'appeler en TypeScript via l'API REST (`/api/generate`  |
| labs/lab-13-rag-fondamental | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais coder un RAG **end-to-end réel** — indexer un catalogue d'activités dans pgvector, retrouver les plus pertinentes par simi |
| labs/lab-14-rag-avance | intervention | tests, livraison, données, api, contrat | · | à la fin, tu sais transformer le RAG dense-only du module 13 en RAG **hybride (dense + BM25/RRF) + reranking**, et **prouver le gain** avec  |
| labs/lab-15-chatbot-rag-projet | concept | tests, story, a11y, livraison, données, contrat, style | · | à la fin, tu as un **chatbot RAG complet et fonctionnel** : conversation multi-tours avec mémoire, récupération sur une vraie base **pgvecto |
| labs/lab-16-evaluation-et-observabilite-llm | intervention | tests, livraison, api, contrat, style | · | à la fin, tu sais mesurer si l'assistant TribuZen hallucine, en construisant un **eval set** à la main et un **LLM-as-judge** chiffré, avec  |
| labs/lab-17-securite-et-ethique | zéro | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais coder un **middleware de détection/défense d'injection + guardrails** devant un appel Claude — input guard, séparation don |
| labs/lab-18-production-et-couts | concept | tests, a11y, livraison, api, style | · | à la fin, tu sais réduire le coût et la latence d'un endpoint LLM avec **routing par modèle + prompt caching + garde-fou de budget**, et tu  |
| labs/lab-19-agentic-frameworks | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais **reconstruire l'agent TribuZen « planificateur de sortie » (module 06) avec un vrai framework agentique** (Vercel AI SDK  |
| labs/lab-20-projet-final | intervention | tests, story, a11y, livraison, données, api, contrat, style | · | à la fin, tu as **conçu et implémenté** l'assistant famille de TribuZen de bout en bout — un endpoint `/api/chat` streamé qui, en **un** tou |

## 19-react-native — 25 labs · zéro 15 · intervention 7 · concept 3 · ≥3 artefacts 25 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-prerequis-et-introduction | intervention | tests, livraison, données, api, contrat, style | · | à la fin, tu sais installer l'environnement Expo, créer un projet React Native avec `create-expo-app`, le lancer sur Expo Go ou un simulateu |
| labs/lab-01-composants-core-et-jsx-rn | intervention | tests, livraison, api, contrat, style | · | à la fin, tu sais composer un écran RN complet (`HomeScreen`) avec les seuls Core Components — `View`, `Text`, `Image`, `ScrollView`, `TextI |
| labs/lab-02-props-state-et-listes-rn | zéro | tests, livraison, contrat, style | · | à la fin, tu sais construire un **feed TribuZen performant** en `FlatList` : `data`/`renderItem`/`keyExtractor`, item mémoïsé (`React.memo`) |
| labs/lab-03-stylesheet-et-flexbox | intervention | tests, a11y, livraison, contrat, style | · | à la fin, tu sais styler `OutingCard`, la carte de sortie du feed TribuZen (photo + titre + date + participants + badge « Complet »), avec ` |
| labs/lab-04-responsive-et-plateformes | zéro | tests, livraison, contrat, style | · | à la fin, tu sais rendre un écran TribuZen qui s'affiche correctement sur iOS (encoche) et Android, avec safe area, taille réactive à la rot |
| labs/lab-05-composants-ui-avances | zéro | tests, a11y, style | · | à la fin, tu sais construire un bouton d'action `Pressable` (avec feedback tactile + accessibilité) qui ouvre une `Modal` de création de sor |
| labs/lab-06-react-navigation-fondamentaux | zéro | tests, api, contrat | · | à la fin, tu sais câbler un native stack React Navigation dans un projet Expo, naviguer du **feed des sorties** vers un **écran détail** en  |
| labs/lab-07-navigation-avancee | zéro | tests, données, api, contrat | · | à la fin, tu sais assembler la coquille de navigation d'une app mobile réelle : un `Drawer` qui enveloppe des **tabs**, chaque tab imbriquan |
| labs/lab-08-gestion-detat-context-zustand | zéro | tests, a11y, contrat, style | · | à la fin, tu sais créer un store `Zustand` typé (`useFamilyStore`) partagé entre deux écrans **sœurs**, le lire avec des **selectors** ciblé |
| labs/lab-09-formulaires-et-validation | zéro | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais construire le formulaire **« Créer une sortie »** de TribuZen (titre, date, lieu) avec `react-hook-form` (via `Controller` |
| labs/lab-10-networking-et-api | zéro | tests, api, contrat, style | · | à la fin, tu sais construire un écran RN qui charge des données depuis une vraie API publique avec `fetch`, vérifie `response.ok`, gère les  |
| labs/lab-11-react-query-et-cache | zéro | tests, contrat, style | · | à la fin, tu sais brancher TanStack Query dans une app Expo (QueryClient + `focusManager`/`onlineManager` adaptés au mobile), afficher le fe |
| labs/lab-12-stockage-local-et-offline-first | zéro | tests, a11y, livraison, données, api, contrat | · | à la fin, tu sais créer une sortie TribuZen **hors-ligne** dans une app Expo réelle : écriture locale immédiate en **expo-sqlite**, **file d |
| labs/lab-13-apis-natives-essentielles | zéro | tests, contrat, style | · | à la fin, tu sais ajouter une **photo géolocalisée** à une sortie TribuZen dans une app Expo réelle : demander une permission proprement (av |
| labs/lab-14-capteurs-et-notifications | zéro | tests, api, style | · | à la fin, tu sais brancher `expo-notifications` dans une app Expo réelle — demander la permission, obtenir un `ExpoPushToken`, planifier une |
| labs/lab-15-animations-animated-api | zéro | tests, données, contrat, style | · | à la fin, tu sais animer l'**apparition** d'une carte de sortie TribuZen (fade + slide + scale via une seule `Animated.Value` interpolée, en |
| labs/lab-16-reanimated-et-gesture-handler | zéro | tests, données, contrat, style | · | à la fin, tu sais construire une **carte de suggestion « swipe pour valider/refuser »** dans une app Expo réelle : le doigt pilote la carte  |
| labs/lab-17-performance-et-optimisation | intervention | tests, a11y, données, contrat, style | · | à la fin, tu sais **profiler** une app RN lente avec React Native DevTools et la ramener à 60 fps sur 500 sorties, en corrigeant **axe par a |
| labs/lab-18-testing-react-native | intervention | tests, a11y, livraison, contrat, style | · | à la fin, tu sais installer et configurer **Jest + `jest-expo` + React Native Testing Library** dans une app Expo réelle, et écrire une **vr |
| labs/lab-19-tests-e2e-detox | concept | tests, livraison, données, contrat, style | · | à la fin, tu sais écrire un vrai test Detox qui pilote une app Expo sur simulateur/émulateur : cibler par `testID` avec `element(by.id())`,  |
| labs/lab-20-deploiement-et-eas-ci-cd | concept | tests, livraison, style | · | à la fin, tu sais configurer `eas.json` (profils dev/preview/prod), initialiser **EAS Update**, publier un **patch OTA** sur un canal, et éc |
| labs/lab-21-new-architecture-fabric-jsi-hermes | intervention | tests, a11y, style | · | à la fin, tu sais **vérifier** sur une app Expo réelle que la New Architecture (bridgeless), **Fabric** et **Hermes** sont actifs, lire les  |
| labs/lab-22-modules-natifs-et-turbo-modules | zéro | tests, livraison, données, contrat | · | à la fin, tu sais **écrire et exposer au JS un petit module natif** — via l'**Expo Modules API** (`create-expo-module --local`, Swift/Kotlin |
| labs/lab-23-patterns-avances-et-monorepo | intervention | tests, données, contrat | · | à la fin, tu sais transformer une app Expo isolée en **monorepo pnpm + Turborepo**, extraire types + logique métier + client API dans un pac |
| labs/lab-24-projet-final | concept | tests, a11y, livraison, données, contrat, style | · | à la fin, tu as **conçu, codé et prouvé** une app mobile TribuZen complète — navigation (feed / détail / création), état séparé (Zustand + R |

## 20-webgpu-3d — 29 labs · zéro 7 · intervention 17 · concept 5 · ≥3 artefacts 27 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-prerequis-et-introduction | concept | tests, données, contrat, style | · | à la fin, tu sais détecter le support WebGPU d'un navigateur réel, initialiser un canvas net (HiDPI), et faire dessiner le GPU (canvas color |
| labs/lab-01-algebre-lineaire-pour-la-3d | intervention | tests, livraison, données, contrat | · | à la fin, tu sais coder une classe `Vec3` (add, sub, scale, normalize, dot, cross) et une `Mat4.multiply`, et tu vérifies chaque opération à |
| labs/lab-02-transformations-et-quaternions | zéro | tests, a11y, livraison, contrat, style | · | à la fin, tu sais composer une model matrix SRT pour placer un objet dans le monde, puis orienter et interpoler cet objet avec un quaternion |
| labs/lab-03-cameras-et-projections | zéro | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais construire une matrice de vue `lookAt`, une matrice de projection perspective **et** orthographique (convention WebGPU), a |
| labs/lab-04-pipeline-de-rendu | concept | tests, livraison, api, contrat, style | · | à la fin, tu sais **tracer à la main** le parcours d'un vertex jusqu'à un pixel, et tu as **vu de tes yeux** dans un navigateur réel comment |
| labs/lab-05-lumiere-materiaux-et-pbr | zéro | tests, livraison, données, api, contrat, style | · | à la fin, tu sais éclairer une sphère dans un fragment shader WebGPU — d'abord en **Blinn-Phong**, puis en **PBR Cook-Torrance metallic-roug |
| labs/lab-06-webgl-fondamentaux | zéro | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais **afficher un triangle coloré en WebGL2 dans le navigateur** — contexte, VBO, attribut de sommet, shaders GLSL ES 300, uni |
| labs/lab-07-shaders-buffers-textures | intervention | tests, données, contrat, style | · | à la fin, tu sais **texturer un quad avec une image et animer son shader** en WebGL2 — VBO entrelacé, VAO, index buffer, varying UV, texture |
| labs/lab-08-scene-webgl-complete | zéro | tests, livraison, données, api, contrat, style | · | à la fin, tu sais assembler de zéro une scène WebGL2 **animée et éclairée** — plusieurs cubes (une model matrix chacun), éclairage Blinn-Pho |
| labs/lab-09-webgpu-architecture-et-wgsl | concept | tests, livraison, données, api, contrat, style | · | à la fin, tu sais afficher un **premier triangle WebGPU** dans Chrome — initialisation asynchrone (adapter → device → configure), un shader  |
| labs/lab-10-render-pipeline-et-bind-groups | intervention | tests, livraison, données, api, contrat, style | · | à la fin, tu sais construire de zéro un `GPURenderPipeline` complet + un `GPUBindGroup` (uniform buffer + texture + sampler) et rendre un ** |
| labs/lab-11-compute-shaders-et-gpgpu | concept | tests, livraison, données, api, contrat, style | · | à la fin, tu sais écrire un compute shader WGSL, câbler des storage buffers, lancer `dispatchWorkgroups` par frame, et faire tourner une **s |
| labs/lab-12-webgpu-avance | zéro | tests, livraison, données, api, contrat, style | · | à la fin, tu sais rendre **des milliers de marqueurs** en un seul draw call via l'instancing WebGPU (`stepMode: 'instance'`), et mesurer le  |
| labs/lab-13-threejs-fondamentaux | intervention | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais monter de zéro une scène Three.js (r185) avec un cube animé, `OrbitControls` et gestion du resize, qui tourne dans un vrai |
| labs/lab-14-materiaux-et-lumieres-threejs | intervention | tests, livraison, données, contrat, style | · | à la fin, tu sais construire une scène Three.js réelle où un objet **PBR** (métal + vernis) est **éclairé** (ambient + soleil) et **projette |
| labs/lab-15-modeles-et-animations | zéro | tests, livraison | · | à la fin, tu sais charger un modèle glTF/GLB **animé** dans le navigateur et jouer une de ses animations en boucle via `AnimationMixer`. |
| labs/lab-16-post-processing-et-effets | intervention | tests | · | à la fin, tu sais monter un `EffectComposer` sur une scène Three.js, ajouter un `UnrealBloomPass` réglé et un `ShaderPass` vignette custom,  |
| labs/lab-17-performance-et-optimisation | intervention | tests, données, contrat, style | · | à la fin, tu sais transformer une scène Three.js qui rame en une scène fluide (60 FPS) en remplaçant N meshes par un `InstancedMesh` et en a |
| labs/lab-18-shadow-mapping | intervention | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais ajouter des ombres portées à une scène Three.js (r185), puis **régler le compromis shadow acne / peter panning** et adouci |
| labs/lab-19-shaders-creatifs | intervention | tests, données, contrat, style | · | à la fin, tu sais écrire de zéro un **fragment shader procédural animé** (fbm ou raymarching) dans un `ShaderMaterial` Three.js qui tourne d |
| labs/lab-20-physique-et-interactions | intervention | tests, livraison, données, contrat, style | · | à la fin, tu sais **sélectionner un objet 3D au clic** (raycasting) et **faire tomber un objet avec la physique** (Rapier), dans un vrai nav |
| labs/lab-21-modelisation-3d-et-geometrie | intervention | tests, livraison, données, contrat, style | · | à la fin, tu sais générer **par code** un terrain procédural en `BufferGeometry` indexée (grille + heightfield + normales) et l'afficher écl |
| labs/lab-22-ray-tracing | concept | tests, livraison, données, api, contrat, style | · | à la fin, tu sais coder un **ray tracer de sphères** qui tourne dans un vrai navigateur — génération de rayons primaires, intersection rayon |
| labs/lab-23-global-illumination-et-screen-space | intervention | tests, livraison, données, api, contrat, style | · | à la fin, tu sais ajouter du **SSAO** (occlusion ambiante screen-space) à une scène Three.js (r185) via `SSAOPass`, l'accorder à l'échelle d |
| labs/lab-24-rendu-volumetrique | intervention | tests, données, contrat, style | · | à la fin, tu sais écrire de zéro un **fragment shader de brume volumétrique** (density field + Beer-Lambert + in-scattering) dans un `Shader |
| labs/lab-25-webxr-et-animation-procedurale | intervention | tests, a11y, données, api, contrat, style | · | à la fin, tu sais, au choix, (A) rendre une scène Three.js **visitable en VR** (`VRButton` + grab au controller), OU (B) coder une **animati |
| labs/lab-26-audio-3d-spatial | intervention | tests, livraison, données, contrat, style | · | à la fin, tu sais attacher un **son 3D positionnel** à un objet d'une scène Three.js (r185) — spatialisé, atténué par la distance, orienté p |
| labs/lab-27-virtual-textures-et-streaming | intervention | tests, livraison, données, contrat, style | · | à la fin, tu sais charger une texture **KTX2 compressée** avec `KTX2Loader` (transcoder Basis + `detectSupport`) et mettre en place un **str |
| labs/lab-28-projet-final | intervention | tests, a11y, livraison, données, api, contrat, style | · | à la fin, tu sais **concevoir et implémenter** une expérience 3D complète et aboutie dans un vrai navigateur — le **globe interactif des sor |

## 21-design-system — 9 labs · zéro 0 · intervention 4 · concept 5 · ≥3 artefacts 9 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-01-css-fondamentaux | concept | tests, a11y, livraison, données, contrat, style | · | à la fin, tu sais poser les design tokens TribuZen en custom properties et bâtir une grille de cartes famille responsive avec Grid, Flex, co |
| labs/lab-02-tailwind-css | concept | tests, a11y, données, contrat, style | · | à la fin, tu sais installer Tailwind v4 en config CSS-first, mapper les tokens de marque TribuZen dans `@theme`, et construire `PrimaryButto |
| labs/lab-03-radix-ui | intervention | tests, a11y, livraison, données, style | · | à la fin, tu sais assembler un composant Radix headless par composition, le styliser aux tokens TribuZen via ses `data-attributes`, et chois |
| labs/lab-04-shadcn-ui | intervention | tests, a11y, api, contrat, style | · | à la fin, tu sais initialiser shadcn dans un projet Next.js + React 19, ajouter des composants que tu possèdes, les re-thémer aux tokens Tri |
| labs/lab-05-design-tokens | concept | tests, données, style | · | à la fin, tu sais structurer un système de tokens TribuZen en trois niveaux (primitives → sémantiques → composant), l'exposer en CSS custom  |
| labs/lab-06-framer-motion | concept | tests, a11y, livraison, contrat, style | · | à la fin, tu sais animer un composant React avec **Motion** (`initial`/`animate`/`exit`), orchestrer un montage/démontage avec `AnimatePrese |
| labs/lab-07-storybook | intervention | tests, story, a11y, contrat, style | · | à la fin, tu sais écrire des stories CSF3 (`Meta` + `StoryObj`) pour un composant, piloter ses variants via `args`/`argTypes` + controls, gé |
| labs/lab-08-accessibilite | intervention | tests, a11y, api, style | · | à la fin, tu sais auditer les tokens de couleur d'un design system contre les seuils RGAA, corriger une `RoutineCard` et un formulaire d'inv |
| labs/lab-09-tamagui | concept | tests, a11y, contrat, style | · | à la fin, tu sais poser un `tamagui.config.ts` comme source unique des tokens (web + React Native), et construire des composants partagés av |

## 22-stripe-billing — 10 labs · zéro 2 · intervention 2 · concept 6 · ≥3 artefacts 8 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-introduction-au-billing-saas | intervention | tests, a11y, livraison, style | · | à la fin, tu sais brancher le SDK Stripe (mode test) dans un projet NestJS, garder la clé secrète hors du repo, et confirmer la connexion pa |
| labs/lab-01-stripe-products-et-prices | concept | tests, a11y, livraison, style | · | à la fin, tu sais créer un Product et ses deux Prices (mensuel + annuel) dans Stripe **en mode test**, via un vrai script Node avec le SDK ` |
| labs/lab-02-stripe-checkout-et-payment-links | zéro | tests, livraison, api, contrat | · | à la fin, tu sais créer un endpoint NestJS qui génère une **Checkout Session Stripe** (`mode: 'subscription'`) pour l'upgrade vers TribuZen  |
| labs/lab-03-webhooks-et-idempotence | concept | tests, api, contrat | · | à la fin, tu sais construire un endpoint webhook NestJS **signé** (`constructEvent` sur le raw body) et **idempotent** (dédup via `event.id` |
| labs/lab-04-subscriptions-et-cycle-de-vie | concept | tests, contrat | · | à la fin, tu sais faire un upgrade (mensuel → annuel) et une annulation (fin de période + reprise) d'un abonnement **TribuZen Premium** via  |
| labs/lab-05-customer-portal-et-self-service | zéro | tests, api, contrat | · | à la fin, tu sais exposer un endpoint NestJS `POST /billing/portal` qui ouvre le **Billing Customer Portal** Stripe pour une famille TribuZe |
| labs/lab-06-freemium-et-feature-gating | intervention | tests, livraison, api, contrat | · | à la fin, tu sais écrire un **guard NestJS** qui bloque une feature Premium (les albums photo illimités de TribuZen) selon le **plan + statu |
| labs/lab-07-paiements-echoues-et-dunning | concept | tests, livraison, api, contrat | · | à la fin, tu sais gérer un renouvellement d'abonnement qui échoue avec le vrai SDK Stripe en mode test — maintenir Premium en `past_due` pen |
| labs/lab-08-facturation-taxes-et-legalite | concept | tests, a11y | · | à la fin, tu sais **configurer les factures automatiques Stripe** en mode test (numérotation séquentielle, identité vendeur/SIREN, footer, e |
| labs/lab-09-testing-et-mise-en-production | concept | tests, a11y, livraison, api, style | · | à la fin, tu sais **assembler** le flux **TribuZen Premium** de bout en bout (produits → checkout → webhook → abonnement → portail → gate →  |

## 23-droit-numerique — 9 labs · zéro 0 · intervention 5 · concept 4 · ≥3 artefacts 8 · oracle 0

| Lab | Forme | Artefacts mentionnés | Oracle | Outcome |
|---|---|---|---|---|
| labs/lab-00-introduction-au-droit-du-numerique | concept | a11y, livraison | · | à la fin, tu sais dresser la carte des cadres légaux (RGPD / DSA / AI Act / RGAA) qui touchent une fonctionnalité de TribuZen, et trancher p |
| labs/lab-01-rgpd-reflexes-developpeur | intervention | a11y, livraison, données, api, contrat, style | · | à la fin, tu sais **cartographier les données d'un produit**, proposer une **base légale par traitement**, repérer les **données sensibles ( |
| labs/lab-02-consentement-cookies-et-traceurs | intervention | tests, livraison, api | · | à la fin, tu sais auditer une liste de traceurs (exempté / soumis à consentement), repérer ce qui casse un consentement, et concevoir sur le |
| labs/lab-03-droits-des-personnes | concept | tests, a11y, livraison, données, api, style | · | à la fin, tu sais **concevoir** (analyse + pseudo-conception) un parcours de suppression de compte en cascade et un parcours d'export de don |
| labs/lab-04-dpia-analyse-impact | concept | livraison, données, api | · | à la fin, tu sais **amorcer une DPIA** — dérouler les 4 blocs (description, nécessité/proportionnalité, risques, mesures) pour un traitement |
| labs/lab-05-dpa-et-sous-traitants | intervention | a11y, livraison, données, api, contrat, style | · | à la fin, tu sais **cartographier les sous-traitants d'un produit** dans un registre, **repérer un transfert hors UE** et son mécanisme, et  |
| labs/lab-06-cgu-mentions-et-obligations-plateforme | intervention | tests, a11y, livraison, api, style | · | à la fin, tu sais **dresser la liste des mentions légales obligatoires** d'un service, **distinguer les quatre documents légaux**, et **iden |
| labs/lab-07-propriete-intellectuelle-et-licences | intervention | tests, a11y, livraison, style | · | à la fin, tu sais **auditer les licences des dépendances** d'un projet Node, **repérer une licence à risque** (GPL/AGPL) pour un SaaS propri |
| labs/lab-08-accessibilite-legale-et-conformite | concept | tests, a11y, livraison, données, api, contrat | · | à la fin, tu sais **assembler la checklist de conformité globale de TribuZen avant lancement** — intégrant les modules 00-07 **et** l'access |

