# Cheat Sheet — Phase D-E : HTTP/Caching, AWS, Architecture, Observabilite

> Revision rapide infra, cloud et ops du cursus.

---

## HTTP Caching

### Headers essentiels

| Header | Role | Exemple |
|--------|------|---------|
| `Cache-Control` | Politique de cache | `max-age=3600, stale-while-revalidate=86400` |
| `ETag` | Validation conditionnelle | `"abc123"` → `If-None-Match` |
| `Last-Modified` | Validation par date | `If-Modified-Since` |
| `Vary` | Cache par variante | `Vary: Accept-Encoding, Accept-Language` |
| `Surrogate-Key` | Invalidation ciblée CDN | `Surrogate-Key: product-123 category-shoes` |
| `CDN-Cache-Control` | Politique specifique CDN | Overrides `Cache-Control` cote CDN |

### Strategies de cache

| Strategie | Cache-Control | Cas d'usage |
|-----------|--------------|-------------|
| Immutable | `max-age=31536000, immutable` | Assets hashes (`app.a1b2c3.js`) |
| SWR | `max-age=60, stale-while-revalidate=3600` | API listings, pages semi-dynamiques |
| No cache | `no-cache` (revalide) / `no-store` (jamais) | Donnees sensibles |
| Private | `private, max-age=300` | Donnees utilisateur (panier, profil) |

### Couches de cache
```
Browser Cache → CDN (CloudFront/Varnish) → Reverse Proxy (Nginx) → App Cache (Redis) → DB
```

### Invalidation
- **Purge** : suppression immediate (`PURGE /path` ou API CDN).
- **Surrogate keys** : tag-based, invalider tous les objets d'une categorie.
- **TTL court + SWR** : compromis freshness/performance.
- Regle d'or : **l'invalidation est le probleme le plus dur du caching**.

---

## Redis

| Commande | Usage |
|----------|-------|
| `SET key val EX 3600` | Cache avec TTL |
| `GET key` | Lecture |
| `DEL key` | Invalidation |
| `MGET k1 k2 k3` | Lecture batch |
| `HSET / HGET` | Hash (objet structure) |
| `INCR / DECR` | Compteurs atomiques |
| `EXPIRE key 60` | Ajout/modif TTL |

### Patterns
- **Cache-aside** : read → miss → fetch DB → write cache → return.
- **Write-through** : write DB + write cache en meme temps.
- **Cache stampede** : proteger avec un lock (`SETNX`) ou probabilistic early expiration.

---

## AWS essentials

### IAM
- **Least privilege** : jamais `*` sur Action et Resource en prod.
- **Jamais root** : creer un admin IAM, activer MFA.
- **Roles > Users** : pour les services (Lambda, EC2, ECS).
- **Policy** : `{ Effect, Action, Resource, Condition }`.

### Services cles

| Service | Type | Points cles |
|---------|------|-------------|
| S3 | Stockage objet | Presigned URLs, lifecycle rules, versioning |
| Lambda | Compute serverless | Cold start ~200ms, max 15min, 10 Go RAM |
| API Gateway | API management | REST / HTTP API, throttling, authorizers |
| DynamoDB | NoSQL serverless | Single-table design, GSI, on-demand/provisioned |
| CloudFront | CDN | OAC pour S3, Lambda@Edge, invalidation |
| RDS / Aurora | SQL manage | Multi-AZ, read replicas, auto-scaling Aurora |
| SQS | Queue | Standard (at-least-once) / FIFO (exactly-once) |
| SNS | Pub/Sub | Fan-out vers SQS, Lambda, email |
| ECS / Fargate | Containers | Fargate = serverless containers |
| CloudWatch | Monitoring | Logs, metriques, alarmes, dashboards |

### CDK (Infrastructure as Code)

```ts
// Stack basique
const bucket = new s3.Bucket(this, 'MyBucket', {
  versioned: true,
  removalPolicy: RemovalPolicy.DESTROY,
});

const fn = new lambda.Function(this, 'MyFunc', {
  runtime: lambda.Runtime.NODEJS_20_X,
  handler: 'index.handler',
  code: lambda.Code.fromAsset('lambda'),
  environment: { BUCKET: bucket.bucketName },
});

bucket.grantRead(fn); // IAM least privilege
```

- `cdk diff` avant chaque deploy.
- `cdk synth` pour voir le CloudFormation genere.
- Constructs L1 (Cfn) < L2 (defaults) < L3 (patterns).

---

## Architecture patterns

| Pattern | Quand | Attention |
|---------|-------|-----------|
| Monolithe modulaire | MVP, equipe < 5 | Bien separer les modules (DDD boundaries) |
| Microservices | Scale equipe, deploy independant | Complexite reseau, observabilite obligatoire |
| Event-driven | Decouplage, async | Idempotence, ordering, dead letter queue |
| CQRS | Read/write asymetriques | Eventual consistency, projection lag |
| Saga | Transactions distribuees | Compensations, timeout, monitoring |
| BFF | Clients multiples (web/mobile) | Un BFF par client type |

### 12-Factor App (resume)
1. **Codebase** : un repo = une app
2. **Dependencies** : explicites (package.json)
3. **Config** : dans l'environnement (pas dans le code)
4. **Backing services** : traites comme des ressources attachables
5. **Build/Release/Run** : etapes strictement separees
6. **Processes** : stateless, share-nothing
7. **Port binding** : self-contained (pas de serveur externe)
8. **Concurrency** : scale via processus (horizontal)
9. **Disposability** : demarrage rapide, arret gracieux
10. **Dev/Prod parity** : minimiser les ecarts
11. **Logs** : flux d'evenements (stdout)
12. **Admin** : one-off processes (migrations, scripts)

---

## Observabilite

### Les 3 piliers

| Pilier | Outil | Format |
|--------|-------|--------|
| Logs | Pino (structure JSON) | `{ level, time, msg, traceId, ...context }` |
| Metriques | Prometheus + Grafana | Counter, Gauge, Histogram, Summary |
| Traces | OpenTelemetry → Jaeger/Tempo | SpanContext (traceId, spanId, traceFlags) |

### SLI / SLO / SLA

| Concept | Definition | Exemple |
|---------|-----------|---------|
| SLI | Mesure reelle | % requetes < 200ms |
| SLO | Objectif interne | 99.9% disponibilite (budget = 43min/mois) |
| SLA | Contrat client | 99.5% avec penalites financieres |
| Error budget | SLO - SLI actuel | Budget consomme → gel des deploys |

### Alerting (du meilleur au pire)
1. **Burn rate multi-window** : alerte si le budget d'erreur se consomme trop vite.
2. **Burn rate simple** : alerte sur un seul fenetre de temps.
3. **Seuil fixe** : alerte si `error_rate > 1%` — genere du bruit.

### Metriques RED (services)
- **R**ate : requetes/seconde
- **E**rrors : taux d'erreurs
- **D**uration : latence (p50, p95, p99)

### Metriques USE (infra)
- **U**tilization : % de capacite utilisee
- **S**aturation : file d'attente
- **E**rrors : erreurs hardware/systeme

### Core Web Vitals (Frontend)

| Metrique | Bon | Acceptable | Mauvais |
|----------|-----|-----------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | < 4.0s | > 4.0s |
| INP (Interaction to Next Paint) | < 200ms | < 500ms | > 500ms |
| CLS (Cumulative Layout Shift) | < 0.1 | < 0.25 | > 0.25 |

### OpenTelemetry — setup minimal
```ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';

const sdk = new NodeSDK({
  serviceName: 'my-api',
  instrumentations: [getNodeAutoInstrumentations()],
});
sdk.start();
```

### Structured logging (Pino)
```ts
const logger = pino({ level: 'info' });
logger.info({ userId, action: 'login', duration: 42 }, 'User logged in');
// → {"level":30,"time":1710000000,"userId":"abc","action":"login","duration":42,"msg":"User logged in"}
```

---

## Recapitulatif mental

```
HTTP Caching → max-age + SWR + surrogate keys = performance sans complexite
AWS          → IAM least privilege + CDK + serverless-first
Architecture → monolithe modulaire d'abord, microservices quand l'equipe scale
Observabilite→ logs structures + metriques RED/USE + traces OTel = debug en prod
```

> Regle d'or : si tu ne peux pas l'observer, tu ne peux pas le debugger en production.
