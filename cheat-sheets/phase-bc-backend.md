# Cheat Sheet — Phase B-C : TypeScript, Runtime, Testing, NestJS, PostgreSQL

> Révision rapide des fondamentaux backend du cursus.

---

## TypeScript essentials

| Concept | Syntaxe | Piege |
|---------|---------|-------|
| Generics | `function f<T>(x: T): T` | Oublier la contrainte `extends` |
| Mapped Types | `{ [K in keyof T]: ... }` | `never` filtre les clés |
| Conditional | `T extends U ? X : Y` | Distribution sur les unions |
| Utility types | `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>` | `Omit` n'empeche pas les clés inconnues |
| Template literal | `` `${A}-${B}` `` | Explosion combinatoire si unions larges |
| Satisfies | `const x = {...} satisfies T` | Infere le type exact, vérifié la conformite |
| Infer | `T extends Array<infer U> ? U : never` | Seulement dans les conditional types |
| Assertion | `as const` / `as T` | `as` masque les erreurs — préférer le narrowing |
| Discriminated union | `type A = { kind: 'a'; ... } \| { kind: 'b'; ... }` | Le discriminant doit etre un literal |

### Type narrowing (du plus sur au moins sur)
1. `typeof` — primitives
2. `in` — propriété dans un objet
3. `instanceof` — classes
4. Discriminated union — `switch(x.kind)`
5. Type predicate — `function isX(v): v is X`
6. Assertion function — `function assertX(v): asserts v is X`

---

## Event Loop Node.js

```
Call Stack
    ↓
Microtasks (Promise.then, queueMicrotask)
    ↓
Macrotasks (setTimeout, setInterval, I/O callbacks)
    ↓
Check phase (setImmediate)
    ↓
Close callbacks
```

### Ordre de priorite
1. `process.nextTick()` — avant toute microtask
2. `queueMicrotask()` / `Promise.resolve().then()`
3. `setTimeout(fn, 0)` / `setInterval`
4. `setImmediate()`
5. I/O callbacks

### Pieges
- `process.nextTick` en boucle = starvation des I/O.
- `async/await` = sucre sur Promises → memes regles de microtask.
- `for await...of` + streams : attention au backpressure.

---

## Testing (Vitest)

| Type | Scope | Outils |
|------|-------|--------|
| Unit | Fonction pure, service | `describe/it/expect`, mocks |
| Intégration | Module complet | SuperTest, TestContainers |
| E2E | Application entière | Playwright |
| Contract | API schema | Pact, Zod schema tests |

### Patterns essentiels
```ts
// Arrange - Act - Assert
const sut = new Service(mockRepo);
const result = await sut.findById('123');
expect(result).toEqual({ id: '123', name: 'test' });
```

### Mocking
| Quoi | Comment |
|------|---------|
| Fonction | `vi.fn()` / `vi.spyOn(obj, 'method')` |
| Module | `vi.mock('./module')` |
| Timer | `vi.useFakeTimers()` / `vi.advanceTimersByTime(ms)` |
| HTTP | MSW (`setupServer(...)`) |
| Date | `vi.setSystemTime(new Date('2026-01-01'))` |

### Coverage
- Viser 80%+ en lignes, **100% sur le code critique** (auth, paiement).
- `vitest --coverage` avec `@vitest/coverage-v8`.
- Ne pas tester les getters triviaux — tester le comportement.

---

## NestJS architecture

### Pipeline de requête
```
Client → Guard → Interceptor (before) → Pipe → Controller → Service → Repository
                                                                   ↓
Client ← ExceptionFilter ← Interceptor (after) ←←←←←←←←←←← Response
```

### Decorateurs clés
| Decorateur | Role |
|-----------|------|
| `@Module({ imports, controllers, providers, exports })` | Declaration du module |
| `@Controller('path')` | Route prefix |
| `@Injectable()` | Fournisseur injectable |
| `@Get()` / `@Post()` / `@Put()` / `@Delete()` | Méthodes HTTP |
| `@Param()` / `@Query()` / `@Body()` | Extraction des donnees |
| `@UseGuards(AuthGuard)` | Protection de route |
| `@UsePipes(ValidationPipe)` | Validation input |
| `@UseInterceptors(LoggingInterceptor)` | Cross-cutting concerns |

### Validation (class-validator + class-transformer)
```ts
class CreateUserDto {
  @IsString() @MinLength(2) name: string;
  @IsEmail() email: string;
  @IsOptional() @IsInt() age?: number;
}
// Global : app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
```

### DI — Scopes
| Scope | Duree de vie | Usage |
|-------|-------------|-------|
| DEFAULT (singleton) | App entière | Services stateless |
| REQUEST | Par requête | Contexte requête (tenant, user) |
| TRANSIENT | Chaque injection | Rarement nécessaire |

---

## PostgreSQL

### MVCC (Multi-Version Concurrency Control)
- Chaque `UPDATE` créé une nouvelle version de la ligne (tuple).
- Les anciennes versions sont nettoyees par `VACUUM`.
- Les lecteurs ne bloquent jamais les ecrivains (et vice versa).

### Niveaux d'isolation
| Niveau | Dirty Read | Non-Repeatable Read | Phantom | Usage |
|--------|-----------|---------------------|---------|-------|
| Read Committed (defaut) | non | oui | oui | OLTP général |
| Repeatable Read | non | non | non* | Rapports coherents |
| Serializable | non | non | non | Transactions critiques (retry obligatoire) |

*PostgreSQL utilise SSI, pas de verrous classiques.

### Index
| Type | Usage | Exemple |
|------|-------|---------|
| B-tree (defaut) | Egalite, range, tri | `CREATE INDEX idx ON t(col)` |
| Hash | Egalite stricte | `USING hash` |
| GIN | JSONB, arrays, full-text | `CREATE INDEX idx ON t USING gin(data jsonb_path_ops)` |
| GiST | Geometrie, range types | PostGIS, tsrange |
| BRIN | Donnees naturellement ordonnees | Timestamp sur tables d'events |

### Requetes utiles
```sql
-- Voir les requetes lentes
SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;

-- Voir les locks en attente
SELECT * FROM pg_locks WHERE NOT granted;

-- Taille des tables
SELECT relname, pg_size_pretty(pg_total_relation_size(oid))
FROM pg_class WHERE relkind = 'r' ORDER BY pg_total_relation_size(oid) DESC;

-- Plan d'execution
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT) SELECT ...;
```

### Bonnes pratiques
- **Toujours** utiliser des transactions explicites pour les ecritures multiples.
- `SELECT ... FOR UPDATE` pour verrouiller une ligne avant modification.
- Éviter `SELECT *` — projeter uniquement les colonnes nécessaires.
- Utiliser `RETURNING` pour éviter un second SELECT après INSERT/UPDATE.
- Migrations : schema first (Prisma, Drizzle, TypeORM migrations).

---

## Prisma / Drizzle — comparaison rapide

| Aspect | Prisma | Drizzle |
|--------|--------|---------|
| Schema | `schema.prisma` (DSL) | TypeScript (`schema.ts`) |
| Migrations | `prisma migrate dev` | `drizzle-kit generate` |
| Query builder | Client généré, typesafe | SQL-like, typesafe |
| Raw SQL | `$queryRaw` | `sql\`...\`` |
| Performance | Overhead Rust engine | Requetes directes |
| Relations | Implicites dans le schema | `relations()` explicites |

---

## Récapitulatif mental

```
TypeScript → systeme de types = documentation vivante + filet de securite
Node.js    → single-thread + event loop = non-bloquant mais attention au CPU
NestJS     → structure Angular-like = modules + DI + decorateurs
PostgreSQL → MVCC + index + EXPLAIN = performance predictible
Testing    → pyramide : beaucoup d'unit, moins d'integration, peu d'E2E
```
