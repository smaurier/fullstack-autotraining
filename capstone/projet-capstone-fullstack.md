# Projet Capstone — TaskFlow

> Un projet fullstack qui mobilise 8 cours du curriculum. Pas de tutorial step-by-step — juste un cahier des charges. C'est a toi de concevoir l'architecture, choisir les patterns, et implementer.

---

## Vue d'ensemble

**TaskFlow** est une application de gestion de taches collaborative (type Trello simplifie) avec :

- Boards, colonnes, cartes avec drag & drop
- Collaboration temps réel (WebSocket)
- Authentification JWT + refresh tokens
- API REST + un endpoint GraphQL pour le dashboard
- Cache Redis, PostgreSQL, full observabilité

**Duree estimee** : 2-3 semaines (temps partiel)

**Livrable** : un repository GitHub avec un `docker compose up` qui lance tout.

---

## Stack imposee

| Couche | Technologie | Cours associe |
|--------|-------------|---------------|
| Frontend | React 19 + TypeScript | 03-typescript, 00-react |
| Backend | NestJS | 07-nestjs |
| BDD | PostgreSQL + TypeORM | 08-postgresql |
| Cache | Redis (cache-aside + pub/sub) | HTTP Caching (module 19) |
| Auth | JWT + refresh tokens | 07-nestjs |
| Temps réel | WebSocket (Socket.io via NestJS Gateway) | 13-distributed-systems |
| Tests | Vitest (unit) + Playwright (e2e) | 06-testing |
| Observabilité | OTel + Prometheus + Grafana | Observability course |
| Deploy | Docker Compose (dev) + AWS S3/Lambda optionnel | AWS course |
| CI/CD | GitHub Actions | AWS course |

---

## Schema de la base de donnees

Tu dois concevoir le schema toi-même. Voici les entites minimales attendues :

```
users          (id, email, password_hash, display_name, avatar_url, created_at)
boards         (id, title, owner_id → users, created_at, updated_at)
board_members  (board_id → boards, user_id → users, role: 'owner' | 'editor' | 'viewer')
columns        (id, board_id → boards, title, position, created_at)
cards          (id, column_id → columns, title, description, position, assignee_id → users, created_at, updated_at)
refresh_tokens (id, user_id → users, token_hash, expires_at, revoked_at)
```

Points d'attention :
- `position` est un entier (où un float si tu veux éviter de re-indexer au drag & drop — a toi de decider)
- Les suppressions sont en cascade : supprimer un board supprime ses colonnes et cartes
- `password_hash` : bcrypt, jamais stocke en clair
- `refresh_tokens` : un user peut avoir plusieurs sessions actives

---

## Fonctionnalites requises

### Sprint 1 — Fondations (3-4 jours)

- [ ] Setup monorepo (pnpm workspaces) : `apps/api`, `apps/web`, `packages/shared`
- [ ] `packages/shared` : types TypeScript partages (Board, Column, Card, User DTO)
- [ ] NestJS API : modules Auth, Users, Boards, Columns, Cards
- [ ] PostgreSQL : schema avec migrations TypeORM
- [ ] Auth : signup, login, JWT access (15min) + refresh token (7j) en httpOnly cookie
- [ ] Endpoint `POST /auth/refresh` qui rotate le refresh token
- [ ] Guard `@UseGuards(JwtAuthGuard)` sur toutes les routes protegees
- [ ] React : pages Login, Signup, Dashboard (liste des boards)
- [ ] Intercepteur HTTP cote React pour refresh automatique sur 401
- [ ] Tests : au moins 1 test unitaire par service NestJS
- [ ] ESLint + Prettier configures des le depart

**Critere de validation Sprint 1** : tu peux créer un compte, te connecter, voir la liste de tes boards (même vide), et le token se refresh automatiquement.

### Sprint 2 — Core features (3-4 jours)

- [ ] CRUD complet : boards → colonnes → cartes (relations cascadees)
- [ ] API RESTful propre : `POST /boards/:boardId/columns/:columnId/cards`
- [ ] Drag & drop des cartes entre colonnes (`@dnd-kit/core` recommande, `react-dnd` accepte)
- [ ] Endpoint `PATCH /cards/:id/move` qui prend `{ columnId, position }`
- [ ] Optimistic UI : la carte bouge instantanement, rollback si le serveur repond une erreur
- [ ] Assignation de membres aux cartes (dropdown avec les membres du board)
- [ ] Filtres : par assignee, par mot-clé dans le titre
- [ ] Recherche full-text PostgreSQL (`tsvector` + `ts_query` sur title + description)
- [ ] Tests e2e Playwright : flow complet login → créer board → ajouter colonne → ajouter carte → drag vers autre colonne → vérifier la position

**Critere de validation Sprint 2** : un utilisateur peut gérer un board complet avec drag & drop fluide, les donnees persistent après refresh.

### Sprint 3 — Temps réel et cache (2-3 jours)

- [ ] NestJS WebSocket Gateway (`@WebSocketGateway()`) avec Socket.io
- [ ] Rooms par board : quand un user ouvre un board, il rejoint la room `board:<id>`
- [ ] Broadcast des events : `card:moved`, `card:created`, `card:updated`, `card:deleted`, `column:created`
- [ ] Redis pub/sub pour synchroniser les events entre plusieurs instances backend (horizontal scaling)
- [ ] Cache-aside Redis sur `GET /boards/:id` (avec colonnes et cartes) — TTL 60s
- [ ] Invalidation du cache sur toute mutation du board (create/update/delete card, column, member)
- [ ] Indicateur "X personnes connectees" sur le board
- [ ] Gestion de la reconnexion WebSocket cote client (backoff exponentiel)
- [ ] Tests : vérifier qu'un changement sur un client est visible sur un autre (test e2e avec 2 contextes Playwright)

**Critere de validation Sprint 3** : ouvre le même board dans 2 onglets, deplace une carte dans l'un, elle bouge dans l'autre sans refresh.

### Sprint 4 — Observabilité et production (2-3 jours)

- [ ] OTel SDK : traces sur chaque requête HTTP entrant, spans custom sur les queries DB et les appels Redis
- [ ] Propagation du trace ID dans les headers WebSocket
- [ ] Metriques Prometheus exposees sur `/metrics` :
  - `http_request_duration_seconds` (histogram, labels: method, route, status)
  - `active_websocket_connections` (gauge)
  - `cache_hit_total` / `cache_miss_total` (counter)
  - `db_query_duration_seconds` (histogram)
- [ ] Logging structure avec pino : chaque log inclut `traceId`, `userId`, `boardId` quand applicable
- [ ] Correlation ID via `AsyncLocalStorage` injecte dans un middleware NestJS
- [ ] Dashboard Grafana avec au minimum :
  - Panel 1 : Request rate (req/s par route)
  - Panel 2 : Latency p50 / p95 / p99
  - Panel 3 : Error rate (%)
  - Panel 4 : Cache hit ratio
  - Panel 5 : Active WebSocket connections
  - Panel 6 : Saturation DB (query duration)
- [ ] Alerting Grafana : notification si `error_rate > 1%` sur une fenêtre de 5min
- [ ] Docker Compose complet :
  ```
  services: api, web, postgres, redis, otel-collector, prometheus, grafana
  ```
- [ ] GitHub Actions pipeline : lint → test → build → docker build → (optionnel) deploy
- [ ] Health check endpoint (`GET /health`) qui vérifié la connexion DB + Redis

**Critere de validation Sprint 4** : `docker compose up`, tout demarre. Tu provoques du trafic, tu vois les metriques dans Grafana, tu provoques une erreur, l'alerte se declenche.

---

## Criteres d'évaluation

### Architecture (/ 20)

| Critere | Points |
|---------|--------|
| Separation des responsabilites (modules NestJS propres, services injectables) | 5 |
| TypeScript strict (`strict: true`), zero `any`, types partages via `packages/shared` | 5 |
| Gestion d'erreurs centralisee (exception filters NestJS, error boundaries React) | 5 |
| Config via variables d'environnement (`ConfigModule`, `.env.example` documente) | 5 |

### Qualite du code (/ 20)

| Critere | Points |
|---------|--------|
| Tests unitaires : couverture > 70% sur les services NestJS | 5 |
| Tests e2e : au moins 5 scenarios critiques | 5 |
| ESLint zero erreur, Prettier formate, pas de `console.log` en prod | 5 |
| Pas de secrets en dur, `.env` dans `.gitignore`, `.env.example` present | 5 |

### Fonctionnel (/ 20)

| Critere | Points |
|---------|--------|
| Toutes les features des sprints 1-3 fonctionnent | 8 |
| UX fluide : optimistic UI, loading states, pas de flash blanc | 6 |
| Accessibilité : navigation clavier du board, `aria-labels`, focus management après drag | 6 |

### Observabilité (/ 20)

| Critere | Points |
|---------|--------|
| Traces distribuees end-to-end (frontend → API → DB) | 5 |
| Dashboard Grafana fonctionnel avec au moins 4 panels | 5 |
| Alerting configure et fonctionnel | 5 |
| Logs structures avec correlation ID consultables | 5 |

### DevOps (/ 20)

| Critere | Points |
|---------|--------|
| `docker compose up` lance tout sans intervention manuelle | 8 |
| CI/CD pipeline fonctionnel (lint, test, build passent au vert) | 7 |
| README avec instructions de setup claires (< 5 min pour lancer le projet) | 5 |

**Total : / 100**

---

## Bonus (points supplementaires)

- [ ] **GraphQL** : endpoint `/graphql` pour le dashboard analytics — nombre de cartes par colonne, activite recente, stats par utilisateur (Apollo Server ou Mercurius)
- [ ] **Notifications in-app** : badge temps réel quand une carte t'est assignee (via WebSocket)
- [ ] **Dark mode** : design tokens CSS custom properties, toggle persistant en localStorage
- [ ] **Rate limiting** : sliding window Redis sur l'API (ex: 100 req/min par user)
- [ ] **Audit a11y automatise** : axe-core dans la CI, fail si violation critique
- [ ] **Feature flags** : toggle le temps réel on/off via un panneau admin (utile pour degrade graceful)
- [ ] **Deploy AWS** : S3 + CloudFront pour le front, ECS Fargate ou Lambda + API Gateway pour le back, RDS PostgreSQL, ElastiCache Redis
- [ ] **Audit de sécurité** : headers CSP, CORS restrictif, protection CSRF sur les cookies, `helmet` configure

---

## Structure du monorepo attendue

```
taskflow/
├── apps/
│   ├── api/                    # NestJS
│   │   ├── src/
│   │   │   ├── auth/           # Module auth (JWT, guards, strategies)
│   │   │   ├── users/          # Module users
│   │   │   ├── boards/         # Module boards
│   │   │   ├── columns/        # Module columns
│   │   │   ├── cards/          # Module cards
│   │   │   ├── websocket/      # Gateway WebSocket
│   │   │   ├── health/         # Health check
│   │   │   └── common/         # Filters, interceptors, decorators
│   │   ├── test/               # Tests e2e API
│   │   └── Dockerfile
│   └── web/                    # React 19 (Vite)
│       ├── src/
│       │   ├── components/     # Composants UI (Board, Column, Card, etc.)
│       │   ├── hooks/          # useAuth, useBoard, useWebSocket, etc.
│       │   ├── pages/          # Login, Signup, Dashboard, BoardView
│       │   ├── services/       # API client (fetch/axios wrapper)
│       │   └── stores/         # State management (Zustand ou React Context)
│       ├── e2e/                # Tests Playwright
│       └── Dockerfile
├── packages/
│   └── shared/                 # Types, constantes, validation schemas (zod)
├── docker-compose.yml
├── .github/workflows/ci.yml
├── pnpm-workspace.yaml
├── .env.example
└── README.md
```

---

## Conseils

> **Ne commence PAS par tout configurer.** Sprint 1 = API qui tourne + une page React qui s'affiche. Itere.

> **Le temps réel vient APRES le CRUD.** Fais marcher les features en HTTP classique d'abord, ajoute les WebSockets ensuite. Si tu commences par le temps réel, tu vas t'enliser.

> **L'observabilité n'est pas optionnelle.** C'est ce qui distingue un dev senior d'un dev junior. Instrumente des le sprint 1 (même basiquement — un `console.log` structure avec pino, c'est déjà un debut).

> **Optimistic UI, ça veut dire quoi concretement ?** Tu mets a jour le state local AVANT la réponse serveur. Si le serveur repond 200, rien à faire. Si erreur, tu rollback le state et tu affiches un toast d'erreur. L'utilisateur ne doit jamais attendre un spinner pour deplacer une carte.

> **Git** : un commit par feature, messages clairs, branches par sprint. Simule un vrai workflow pro. Pas de commit "fix" à la chaine.

> **Ne reinvente pas la roue.** Utilise les libs standard : `@nestjs/jwt`, `@nestjs/typeorm`, `@nestjs/websockets`, `ioredis`, `pino`, `@opentelemetry/*`. Le but n'est pas de tout coder from scratch, c'est de savoir assembler un système complet.

> **Teste en conditions reelles.** Lance 2 onglets, deplace des cartes, coupe le serveur, rallume-le. C'est comme ça qu'on trouve les vrais bugs.

---

## Ressources autorisees

- Documentation officielle de chaque lib (NestJS, React, TypeORM, Socket.io, OpenTelemetry, etc.)
- Les cours du curriculum (evidemment)
- Stack Overflow, GitHub issues, blog posts techniques
- **Interdit** : copier un projet existant. Le code doit etre le tien.

---

## Pour aller plus loin

Si tu finis en avance et que tu veux pousser plus loin :

1. **Multi-tenancy** : un workspace qui contient plusieurs boards, avec gestion des roles par workspace
2. **Activity feed** : un event log (event sourcing simplifie) qui trace toutes les actions sur un board
3. **Export** : export d'un board en JSON ou CSV
4. **PWA** : service worker pour acces offline aux boards (lecture seule)
5. **Load testing** : script k6 qui simule 50 utilisateurs concurrents sur un board, analyse des résultats dans Grafana

---

*Ce projet n'a pas de solution toute faite. C'est normal. Un dev senior ne suit pas un tutorial — il lit un cahier des charges et il livre.*
