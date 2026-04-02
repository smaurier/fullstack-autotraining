# Code Katas — Phase B/D/E : Backend, DB & Infra

> Des defis de code sans guidance. Juste un enonce, des contraintes, et le comportement attendu.
> Objectif : mass practice pour ancrer les patterns — timer toi et resiste a l'envie d'aller voir la doc.

---

## TypeScript (00-typescript)

### Kata 16 — EventEmitter type-safe avec generics

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Implemente une classe `TypedEmitter<Events>` ou `Events` est un record de noms d'événements vers leurs payloads. Les méthodes `on<K>`, `off<K>` et `emit<K>` doivent etre entièrement inferees — une erreur de type si on emet un payload incorrect.

**Contraintes** :

- Generics avec `keyof` et mapped types pour lier event name -> payload
- `on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void)`
- `emit<K extends keyof Events>(event: K, payload: Events[K])`
- Support de plusieurs listeners par événement
- Pas de librairie externe, pas de `any`

**Test attendu** :

```ts
type MyEvents = {
  login: { userId: string; timestamp: number };
  logout: { userId: string };
  error: Error;
};

const emitter = new TypedEmitter<MyEvents>();
emitter.on("login", (payload) => {
  // payload est infere comme { userId: string; timestamp: number }
  console.log(payload.userId);
});
emitter.emit("login", { userId: "42", timestamp: Date.now() }); // OK
emitter.emit("login", { userId: "42" }); // Erreur de type : timestamp manquant
emitter.emit("unknown", {}); // Erreur de type : event inconnu
```

---

### Kata 17 — Deep merge utility type

**Difficulte** : ⭐⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Cree un type utilitaire `DeepMerge<A, B>` qui fusionne recursivement deux types objets. Les propriétés de `B` ecrasent celles de `A`, sauf si les deux sont des objets — dans ce cas, fusion recursive. Implemente aussi la fonction runtime `deepMerge(a, b)` dont le type de retour est infere comme `DeepMerge<A, B>`.

**Contraintes** :

- Recursive generics + conditional types
- Gestion des cas limites : `null`, `undefined`, tableaux (ecrasement, pas de concat), types primitifs
- Le type doit etre distribue sur les unions
- La fonction runtime doit matcher le type (pas de `as any` sauf 1 cast final)
- Pas de lodash, pas de librairie

**Test attendu** :

```ts
type A = { a: number; nested: { x: string; y: boolean } };
type B = { b: string; nested: { x: number; z: Date } };

type Result = DeepMerge<A, B>;
// { a: number; b: string; nested: { x: number; y: boolean; z: Date } }

const merged = deepMerge(
  { a: 1, nested: { x: "hello", y: true } },
  { b: "world", nested: { x: 42, z: new Date() } },
);
// merged.nested.x est number (pas string), merged.nested.y est boolean
```

---

### Kata 18 — Validation builder avec inference de types

**Difficulte** : ⭐⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Cree une librairie de validation avec un builder pattern ou le type de sortie est infere automatiquement à partir de la chaine de validation. Pas de schema declare separement — le type est le schema.

**Contraintes** :

- API chainable : `v.string().min(3).max(50).email()`, `v.number().min(0).int()`, `v.object({ ... })`
- Le type `Infer<typeof schema>` extrait le type TypeScript depuis le schema
- La méthode `.parse(input)` retourne le type infere ou throw
- La méthode `.safeParse(input)` retourne `{ success: true, data: T } | { success: false, errors: ValidationError[] }`
- Support `.optional()` et `.default(value)` qui modifient le type infere
- Pas de Zod, pas de librairie externe

**Test attendu** :

```ts
const userSchema = v.object({
  name: v.string().min(1),
  age: v.number().int().min(0),
  email: v.string().email().optional(),
});

type User = Infer<typeof userSchema>;
// { name: string; age: number; email?: string | undefined }

const result = userSchema.safeParse({ name: "Alice", age: 30 });
if (result.success) {
  result.data.name; // string, infere
}
```

---

## NestJS (07-nestjs)

### Kata 19 — Rate limiter middleware from scratch

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Implemente un rate limiter en sliding window avec Redis comme store. Un decorateur `@RateLimit(limit, window)` applique la limite sur un endpoint. Retourne 429 avec un header `Retry-After` quand la limite est atteinte.

**Contraintes** :

- Algorithme sliding window log (pas fixed window) — stocker les timestamps dans un sorted set Redis
- Decorateur custom `@RateLimit(10, '1m')` qui se combine avec un Guard NestJS
- Headers de réponse : `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- Cle basee sur l'IP (où un identifiant custom via option)
- Pas de librairie de rate limiting (pas `@nestjs/throttler`)

**Test attendu** :

```ts
@Controller("api")
export class ApiController {
  @Get("data")
  @RateLimit(10, "1m")
  getData() {
    return { data: "ok" };
  }
}
// 11eme requete en moins d'1 min -> 429 { message: 'Too Many Requests', retryAfter: 34 }
```

---

### Kata 20 — CQRS mini : Command bus avec handlers

**Difficulte** : ⭐⭐⭐⭐
**Temps cible** : 90 min

**Enonce** : Implemente un pattern CQRS minimal avec un `CommandBus` et un `QueryBus`. Les commandes modifient l'état (write model), les queries lisent un modèle denormalise (read model). Le bus route automatiquement vers le bon handler.

**Contraintes** :

- Decorateur `@CommandHandler(CreateOrderCommand)` et `@QueryHandler(GetOrderQuery)` pour enregistrer les handlers
- Le bus découvre les handlers via le système de modules NestJS (metadata reflection)
- Separation stricte : le command handler écrit dans la table `orders`, le query handler lit depuis la vue `order_summaries`
- Un event simple entre write et read : après chaque commande, projeter dans le read model
- Pas de `@nestjs/cqrs` — tout from scratch

**Test attendu** :

```ts
// Commande
await commandBus.execute(new CreateOrderCommand({ product: "Widget", qty: 3 }));

// Query
const summary = await queryBus.execute(new GetOrderQuery({ orderId: "123" }));
// summary vient du read model (table separee), pas de la table orders
```

---

### Kata 21 — Custom @CurrentUser() decorator + JWT Guard

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Cree un decorateur de paramètre `@CurrentUser()` qui extrait l'utilisateur courant depuis le JWT dans le header Authorization. Combine-le avec un Guard qui valide le token.

**Contraintes** :

- Guard `JwtAuthGuard` : extrait le Bearer token, vérifié avec `jsonwebtoken` (seule librairie autorisee)
- Decorateur `@CurrentUser()` : utilise `createParamDecorator` pour extraire le user du request
- `@CurrentUser('email')` extrait un champ spécifique (acces par clé)
- Le guard attache le payload decode sur `request.user`
- Gestion propre des erreurs : 401 si token absent/invalide/expire

**Test attendu** :

```ts
@Controller("profile")
@UseGuards(JwtAuthGuard)
export class ProfileController {
  @Get()
  getProfile(@CurrentUser() user: UserPayload) {
    return user; // { sub: '123', email: 'alice@test.com', role: 'admin' }
  }

  @Get("email")
  getEmail(@CurrentUser("email") email: string) {
    return { email }; // 'alice@test.com'
  }
}
```

---

## PostgreSQL (08-postgresql)

### Kata 22 — Système de migrations from scratch

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Implemente un système de migrations SQL minimaliste avec CLI. Chaque migration à un fichier `up.sql` et `down.sql`. Une table `_migrations` track ce qui a ete applique.

**Contraintes** :

- CLI avec 3 commandes : `migrate up`, `migrate down`, `migrate create <name>`
- Table `_migrations` : `id`, `name`, `applied_at`
- Les migrations tournent dans une transaction (rollback complet si une echoue)
- `migrate down` rollback la dernière migration uniquement
- `migrate create` généré un dossier timestamp : `20260315120000_<name>/up.sql` + `down.sql`
- Utilise `pg` (node-postgres) uniquement — pas de Knex, pas de Prisma

**Test attendu** :

```bash
$ node migrate.js create add_users_table
# Cree: migrations/20260315120000_add_users_table/up.sql + down.sql

$ node migrate.js up
# Applying 20260315120000_add_users_table... done (12ms)

$ node migrate.js down
# Reverting 20260315120000_add_users_table... done (8ms)
```

---

### Kata 23 — Optimistic locking avec colonne version

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Implemente un pattern d'optimistic locking sur une table `products`. Chaque UPDATE vérifié la version courante et l'incremente. Si la version ne matche pas, l'update echoue avec une erreur explicite.

**Contraintes** :

- Colonne `version INTEGER NOT NULL DEFAULT 1` sur la table
- `UPDATE products SET name = $1, price = $2, version = version + 1 WHERE id = $3 AND version = $4`
- Si `rowCount === 0`, throw `OptimisticLockError` avec le message "Resource was modified by another transaction"
- Fonction `updateProduct(id, data, expectedVersion)` qui encapsule la logique
- Ecris un test qui prouve la detection de conflit : deux updates concurrents, un seul reussit
- Uniquement `pg` — pas d'ORM

**Test attendu** :

```ts
// Alice et Bob lisent le produit (version 1)
const alice = await getProduct(id); // version: 1
const bob = await getProduct(id); // version: 1

// Alice update -> OK, version passe a 2
await updateProduct(id, { name: "New Name" }, alice.version); // success

// Bob update avec version 1 -> FAIL
await updateProduct(id, { price: 9.99 }, bob.version);
// throws OptimisticLockError
```

---

### Kata 24 — Full-text search avec tsvector et tsquery

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Implemente une recherche full-text sur une table `articles` (title, body) avec ranking des résultats. Pas d'ORM, que du SQL et `pg`.

**Contraintes** :

- Colonne `search_vector tsvector` générée avec un trigger `tsvector_update_trigger` (poids A pour title, B pour body)
- Index GIN sur `search_vector`
- Fonction de recherche qui accepte une query utilisateur et retourne les résultats tries par `ts_rank_cd`
- Support des operateurs : `"mot exact"` (phrase), `mot1 AND mot2`, `NOT mot3`
- Parsing de la query utilisateur vers `tsquery` (avec `plainto_tsquery` pour le simple, `to_tsquery` pour l'avance)
- Highlight des résultats avec `ts_headline`

**Test attendu** :

```ts
const results = await searchArticles("typescript generics");
// [
//   { id: 3, title: 'Advanced TypeScript <b>Generics</b>', rank: 0.89, headline: '...<b>TypeScript</b>...<b>generics</b>...' },
//   { id: 7, title: 'Learning <b>TypeScript</b>', rank: 0.42, headline: '...' },
// ]
```

---

## Testing (06-testing)

### Kata 25 — Tester une race condition

**Difficulte** : ⭐⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Ecris un test qui prouve qu'un compteur concurrent est casse (race condition), puis corrige-le. Le compteur est incremente par N workers en parallele — le total final doit etre N \* iterations.

**Contraintes** :

- Cree un module `Counter` avec `increment()` et `getValue()` qui utilise une valeur en DB (pas en mémoire)
- Pattern : `SELECT value FROM counters`, puis `UPDATE counters SET value = $1` (read-then-write = race condition)
- Le test lance 10 `increment()` en parallele avec `Promise.all` et montre que le résultat final < 10
- Corrige avec `UPDATE counters SET value = value + 1` (atomique) OU avec `SELECT ... FOR UPDATE`
- Le test après fix prouve que le résultat est toujours exactement 10
- Vitest comme test runner

**Test attendu** :

```ts
describe("Counter race condition", () => {
  it("FAILS with naive read-then-write", async () => {
    await resetCounter(); // value = 0
    await Promise.all(Array.from({ length: 10 }, () => naiveIncrement()));
    const value = await getCounter();
    expect(value).toBeLessThan(10); // race condition prouvee
  });

  it("WORKS with atomic increment", async () => {
    await resetCounter();
    await Promise.all(Array.from({ length: 10 }, () => atomicIncrement()));
    const value = await getCounter();
    expect(value).toBe(10);
  });
});
```

---

### Kata 26 — Property-based testing avec fast-check

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Utilise `fast-check` pour trouver des edge cases dans une fonction `compact(obj)` qui supprime les clés avec des valeurs falsy d'un objet (comme `_.compact` mais pour les objets).

**Contraintes** :

- Implemente `compact(obj)` d'abord (version naive)
- Ecris des propriétés avec `fc.property` :
  - Toutes les valeurs dans le résultat sont truthy
  - Les clés presentes dans le résultat existaient dans l'input
  - `compact(compact(obj)) === compact(obj)` (idempotence)
  - Le nombre de clés du résultat <= nombre de clés de l'input
- Utilise `fc.record` et `fc.oneof` pour générer des objets avec mix de truthy/falsy
- Le test doit trouver au moins un bug dans ta version naive (gérer `0`, `""`, `false`, `null`, `undefined`, `NaN`)
- `fast-check` est la seule librairie autorisee (en plus de Vitest)

**Test attendu** :

```ts
fc.assert(
  fc.property(
    fc.record(
      fc.string(),
      fc.oneof(fc.string(), fc.integer(), fc.boolean(), fc.constant(null)),
    ),
    (obj) => {
      const result = compact(obj);
      // Toutes les valeurs sont truthy
      Object.values(result).forEach((v) => expect(!!v).toBe(true));
    },
  ),
);
```

---

### Kata 27 — E2E test d'un flow d'auth complet avec Playwright

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Ecris un test E2E Playwright qui couvre le flow complet : inscription -> vérification email -> connexion -> acces route protegee -> deconnexion.

**Contraintes** :

- Utilise une vraie app (où mock server) avec les endpoints : `POST /signup`, `GET /verify?token=`, `POST /login`, `GET /me`, `POST /logout`
- Intercepte l'email de vérification (soit via API Mailhog/Mailpit, soit en interceptant l'appel réseau)
- Verifie que `/me` retourne 401 avant login et 200 après
- Verifie que la deconnexion invalide bien la session (re-fetch `/me` -> 401)
- Pas de `page.waitForTimeout()` — utilise des assertions auto-retrying (`expect(locator).toBeVisible()`, `toHaveURL()`)
- Teste aussi le cas d'erreur : signup avec email déjà pris -> message d'erreur visible

**Test attendu** :

```ts
test("full auth flow", async ({ page, request }) => {
  // 1. Signup
  await page.goto("/signup");
  await page.fill("[name=email]", "test@example.com");
  await page.fill("[name=password]", "SecureP@ss1");
  await page.click("button[type=submit]");
  await expect(page.getByText("Verifiez votre email")).toBeVisible();

  // 2. Verify (intercept token)
  const token = await getVerificationToken("test@example.com");
  await page.goto(`/verify?token=${token}`);
  await expect(page.getByText("Email verifie")).toBeVisible();

  // 3. Login -> /me -> Logout -> /me 401
  // ...
});
```

---

## HTTP / Caching (http-caching)

### Kata 28 — Middleware de cache HTTP (ETag + 304)

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Implemente un middleware Express qui ajoute automatiquement un `ETag` à chaque réponse et retourne `304 Not Modified` si le client envoie un `If-None-Match` qui correspond.

**Contraintes** :

- ETag généré via hash SHA-256 du body de la réponse
- Intercepte `res.send()` / `res.json()` pour calculer le hash avant envoi
- Compare `If-None-Match` header avec l'ETag calcule
- Si match : retourne 304 sans body
- Si pas de header ou mismatch : retourne la réponse normale avec `ETag` header
- Support des weak ETags (`W/"..."`) en bonus
- Pas de librairie (pas `etag`, pas `fresh`)

**Test attendu** :

```ts
// Premier appel
const res1 = await fetch("/api/data");
// 200, body: {...}, headers: { etag: '"abc123"' }

// Deuxieme appel avec If-None-Match
const res2 = await fetch("/api/data", {
  headers: { "If-None-Match": '"abc123"' },
});
// 304, pas de body

// Donnees changent cote serveur
const res3 = await fetch("/api/data", {
  headers: { "If-None-Match": '"abc123"' },
});
// 200, nouveau body, nouveau ETag
```

---

### Kata 29 — Redis cache-aside avec stampede protection

**Difficulte** : ⭐⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Implemente un pattern cache-aside avec Redis : le cache est consulte d'abord, si miss on va chercher en DB, on stocke en cache, puis on retourne. Ajoute une protection contre le cache stampede (thundering herd) avec un mutex lock.

**Contraintes** :

- Fonction générique `cacheable<T>(key: string, ttlSeconds: number, fetcher: () => Promise<T>): Promise<T>`
- Si cache hit : retourner directement (deserialise depuis JSON)
- Si cache miss : acquerir un lock Redis (`SET key:lock NX EX 5`), un seul worker fetch, les autres attendent
- Les workers en attente polled le cache toutes les 50ms pendant max 5s, puis fallback sur le fetcher directement
- Invalidation explicite : `invalidate(key)` supprime la clé du cache
- TTL stale-while-revalidate : servir le stale pendant qu'on revalide en background (bonus)
- Seule librairie autorisee : `ioredis`

**Test attendu** :

```ts
let fetchCount = 0;
const getData = () =>
  cacheable("user:42", 60, async () => {
    fetchCount++;
    return db.query("SELECT * FROM users WHERE id = 42");
  });

// 10 appels concurrents
await Promise.all(Array.from({ length: 10 }, () => getData()));
expect(fetchCount).toBe(1); // un seul fetch grace au mutex
```

---

## Observability / SRE (observability-sre)

### Kata 30 — Instrumenter une app Express avec OpenTelemetry

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Instrumente une app Express avec OpenTelemetry : traces distribuees, metriques custom, et logs structures. Les 3 signaux doivent etre correles (trace_id dans les logs).

**Contraintes** :

- Setup OTel SDK avec `@opentelemetry/sdk-node`, export OTLP (vers console ou collector)
- Spans automatiques sur les routes Express (via `@opentelemetry/instrumentation-express`)
- Span manuelle custom sur une operation metier (ex: `processPayment`) avec attributs
- Metrique custom : un histogram `http.request.duration` et un counter `orders.created.total`
- Logs structures (JSON) avec `trace_id` et `span_id` injectes automatiquement
- Propagation de contexte entre services (header `traceparent`)
- Librairies OTel autorisees, pas de Datadog/NewRelic SDK

**Test attendu** :

```ts
// Une requete POST /orders genere :
// 1. Un span parent "POST /orders" avec child span "processPayment"
// 2. Le histogram enregistre la duree
// 3. Le counter orders.created.total incremente de 1
// 4. Le log contient { trace_id: "abc...", message: "Order created", orderId: "123" }
```

---

### Kata 31 — Regles d'alerting Prometheus pour un SLO

**Difficulte** : ⭐⭐⭐
**Temps cible** : 45 min

**Enonce** : Ecris des regles d'alerting Prometheus (fichier YAML) pour monitorer un SLO : taux d'erreur < 0.1% et latence p99 < 500ms. Utilise le multi-window multi-burn-rate approach.

**Contraintes** :

- SLI taux d'erreur : `rate(http_requests_total{status=~"5.."}[window]) / rate(http_requests_total[window])`
- SLI latence : `histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[window]))`
- Burn rate : 14.4x sur 1h (page), 6x sur 6h (page), 1x sur 3d (ticket)
- Deux fichiers : `recording_rules.yml` (pre-calcule les SLIs) et `alerting_rules.yml`
- Annotations : `summary`, `description` avec le burn rate et la fenêtre
- Labels : `severity: critical` pour pages, `severity: warning` pour tickets

**Test attendu** :

```yaml
# L'alerte se declenche si :
# - Sur 1h, on brule le budget 14.4x plus vite que prevu ET
# - Sur 5m, le burn rate est aussi eleve (pas un spike ponctuel)
# -> Alerte critique, pager l'astreinte
```

---

### Kata 32 — Circuit breaker from scratch

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Implemente un circuit breaker avec les 3 états classiques : CLOSED (normal), OPEN (fail fast), HALF-OPEN (test). Configurable avec seuils et timeouts.

**Contraintes** :

- Classe `CircuitBreaker<T>` qui wrappe un appel async
- Config : `failureThreshold` (nb echecs pour ouvrir), `resetTimeout` (duree avant half-open), `successThreshold` (nb succes en half-open pour fermer)
- En CLOSED : si le nombre d'echecs consecutifs >= threshold, passer en OPEN
- En OPEN : rejeter immediatement avec `CircuitBreakerOpenError`, après `resetTimeout` passer en HALF-OPEN
- En HALF-OPEN : laisser passer 1 appel, si succes -> CLOSED, si echec -> OPEN
- Events : `onStateChange(from, to)` callback
- Pas de librairie (pas `opossum`)

**Test attendu** :

```ts
const breaker = new CircuitBreaker(callExternalApi, {
  failureThreshold: 3,
  resetTimeout: 5000,
  successThreshold: 1,
});

// 3 echecs -> circuit s'ouvre
await breaker.fire(); // fail 1
await breaker.fire(); // fail 2
await breaker.fire(); // fail 3 -> state: OPEN

await breaker.fire(); // throws CircuitBreakerOpenError (pas d'appel reel)

// Apres 5s -> HALF-OPEN
// Prochain appel reussi -> CLOSED
```

---

## AWS Cloud (aws-cloud)

### Kata 33 — Site statique sur S3 + CloudFront (CLI only)

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Deploie un site statique (HTML/CSS/JS) sur S3 avec une distribution CloudFront devant. Tout via AWS CLI — pas de console, pas de CDK, pas de Terraform.

**Contraintes** :

- Cree un bucket S3 avec website hosting active
- Block public access ON — l'acces passe uniquement par CloudFront (OAC, pas OAI)
- Bucket policy qui autorise uniquement le principal CloudFront
- Distribution CloudFront : origin S3, default root object `index.html`, custom error page 404 -> `/index.html` (SPA)
- Cache policy : 1 an pour les assets (`/assets/*`), no-cache pour `index.html`
- Invalidation du cache après déploiement (`/*`)
- Script bash complet reproductible

**Test attendu** :

```bash
$ ./deploy.sh
# 1. Cree/update le bucket S3
# 2. Upload les fichiers avec Content-Type correct
# 3. Cree/update la distribution CloudFront
# 4. Cree l'invalidation
# 5. Affiche l'URL CloudFront : https://d1234567890.cloudfront.net
```

---

### Kata 34 — Lambda CRUD avec API Gateway + DynamoDB

**Difficulte** : ⭐⭐⭐
**Temps cible** : 90 min

**Enonce** : Cree une API REST complete (CRUD) avec une Lambda Node.js, API Gateway HTTP, et DynamoDB comme datastore. Déploiement via AWS CLI ou SAM CLI.

**Contraintes** :

- Une seule Lambda qui route selon `event.routeKey` (pas une Lambda par route)
- Routes : `POST /items`, `GET /items`, `GET /items/{id}`, `PUT /items/{id}`, `DELETE /items/{id}`
- DynamoDB : table `Items` avec partition key `PK` et sort key `SK` (single-table design)
- Validation basique des inputs (retourner 400 avec message si invalide)
- Proper error handling : 404 si item non trouve, 500 avec message générique en prod
- IAM role avec least privilege (dynamodb:GetItem, PutItem, DeleteItem, Query sur cette table uniquement)
- Code TypeScript compile en JS pour le déploiement

**Test attendu** :

```bash
$ curl -X POST https://xxx.execute-api.eu-west-1.amazonaws.com/items \
    -d '{"name":"Widget","price":9.99}'
# 201 { "id": "abc123", "name": "Widget", "price": 9.99 }

$ curl https://xxx.execute-api.eu-west-1.amazonaws.com/items/abc123
# 200 { "id": "abc123", "name": "Widget", "price": 9.99 }
```

---

### Kata 35 — GitHub Actions : build, test, deploy S3 avec OIDC

**Difficulte** : ⭐⭐⭐
**Temps cible** : 60 min

**Enonce** : Cree un pipeline GitHub Actions complet qui build, teste, et deploie un site sur S3. L'authentification AWS utilise OIDC (pas de clés stockees dans les secrets).

**Contraintes** :

- Job 1 `build` : install, lint, build (artefact upload)
- Job 2 `test` : unit tests + rapport de couverture (fail si < 80%)
- Job 3 `deploy` : download artefact, `aws s3 sync`, invalidation CloudFront
- OIDC : configurer le trust entre GitHub et AWS via un IAM role avec condition sur le repo et la branche
- Le deploy ne tourne que sur `main` (pas sur les PRs)
- Environments GitHub : `production` avec protection rules (approval requise)
- Cache des `node_modules` entre les jobs

**Test attendu** :

```yaml
# .github/workflows/deploy.yml
# Push sur main :
# build (2min) -> test (1min) -> deploy (30s)
# Push sur feature branch :
# build -> test (pas de deploy)
# Le deploy utilise aws-actions/configure-aws-credentials avec role-to-assume (OIDC)
```
