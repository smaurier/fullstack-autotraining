# Parcours Sylvain

Une liste. Un cours à la fois. Tu coches quand c'est fini.

**Fil rouge : TribuZen.** Chaque cours produit quelque chose de concret dans TribuZen.
Tu n'apprends pas "pour plus tard" — tu construis maintenant.

---

## Légende

- **Faire** : labs/modules à faire
- **Sauter** : inutile maintenant, ROI trop faible
- **Déférer** : utile mais pas maintenant — revenir au bon moment
- **TribuZen** : ce que tu construis dans TribuZen avec ce cours

---

## En cours

### 01 — TypeScript `00-typescript/`

> Prérequis : JS de base. Aucun autre cours.
> Labs 01-09 déjà faits.

**Faire :** lab-10 (Utility types — `Partial<T>`, `Pick<T>`, `Omit<T>`, `ReturnType<T>`)

**Sauter :** labs 11-13 (conditional types, mapped types, type-level programming — trop abstraits, ROI quasi nul pour toi maintenant)

**Sauter :** labs 15-19 (variance, declaration files, tsconfig, patterns, projet final)

**Déférer :** lab-14 (Décorateurs) → juste avant le cours 04 NestJS

**TribuZen :**
```typescript
// Typer les entités core de TribuZen avec les utility types du lab-10
type User = { id: string; name: string; email: string; avatar?: string }
type Family = { id: string; name: string; members: User[]; createdAt: Date }
type Post = { id: string; authorId: string; content: string; mediaUrls: string[] }
type Invitation = { familyId: string; email: string; role: 'admin' | 'member' }

// Exemples d'usage
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>
type UpdateUser = Partial<Omit<User, 'id'>>
```
→ Crée `tribuzen/types/index.ts` avec ces types. C'est ta source de vérité.

---

## À venir

### 02 — Testing / TDD `06-testing/`

> Prérequis : TypeScript labs 01-10.

**Faire en premier :**
1. `modules/15-tdd-et-bdd.md` — lis tout
2. `labs/lab-15-tdd-bdd/kata-stringcalculator.ts` — kata from scratch (phase RED)
3. `labs/lab-15-tdd-bdd/exercise.ts` — 6 exercices

**Faire ensuite :**
- labs 01-05 (fondamentaux : Vitest, mocking, async)
- lab-07 (tests composants — directement applicable React)
- lab-09 (tests intégration)
- labs 10-11 (Playwright — E2E, tu en auras besoin sur toute mission)

**Sauter :** lab-06 (architecture testable — plus clair après NestJS), lab-12 (mutation testing — optionnel), lab-16 (contract testing — après NestJS), lab-17 (performance testing)

**Déférer :** lab-06 → après cours 04 NestJS

**TribuZen :**
```typescript
// Logique métier à tester en TDD : invitation familiale
// Écrire le test AVANT le code

test('invitation refusée si utilisateur déjà membre', () => {
  const family = { members: [{ email: 'alice@test.com' }] }
  expect(() => inviteToFamily(family, 'alice@test.com')).toThrow('already member')
})

test('invitation refusée si auto-invitation', () => {
  const currentUser = { email: 'bob@test.com' }
  expect(() => inviteToFamily(family, currentUser.email)).toThrow('cannot invite yourself')
})
```
→ Module `tribuzen/domain/invitation.ts` + ses tests. Pure logique, zéro UI.

---

### → Checkpoint TypeScript lab-14 `00-typescript/labs/lab-14-decorateurs/`

> Faire CE lab uniquement, juste avant NestJS. 1h max.

---

### 03 — React `04-react/`

> Prérequis : TypeScript labs 01-10 + Testing/TDD.

**Faire :**
- sections 00-02 (introduction, composants, hooks fondamentaux)
- section 03 (state management — Zustand en priorité, Context en second)
- section 04 (routing)
- section 06 (Next.js — App Router, Server Components : c'est là que tu apprends le plus)
- section 07 (tests composants — avec le réflexe TDD ancré)
- section 08 (performance — memo, useMemo, profiling)
- section 12 (recettes ESN — patterns réels de mission)

**Sauter :** section 05 (formulaires React Hook Form — utile en mission mais pas maintenant), section 09 (styling — tu sais déjà), section 10-11 (auth, CI/CD — vu ailleurs)

**TribuZen :**
- `FamilyFeed` : liste de posts de la famille, pagination infinie
- `ProfilePage` : avatar, nom, familles de l'utilisateur
- `FamilyCard` : preview d'une famille avec ses membres
- `InvitationForm` : formulaire d'invitation avec validation (TDD : écrire le test du validator d'abord)
- Routing : `/family/[id]`, `/profile/[userId]`, `/feed`

---

### 04 — NestJS `09-nestjs/`

> Prérequis : TypeScript (labs 01-10 + lab-14 décorateurs) + Testing.

**Faire :**
- modules 00-08 (Node.js → Express → changement de paradigme NestJS)
- modules 09-13 (DI, modules, pipes, guards, interceptors — le cœur)
- modules 14-17 (TypeORM/Prisma — utiliser sans stresser sur le SQL, PostgreSQL vient après)
- modules 18-20 (testing NestJS, auth JWT, config)
- module 21 (WebSockets — fil rouge TribuZen : notifications temps réel)

**Sauter :** modules 25-26 (MongoDB, GraphQL) — pas prioritaires pour TribuZen

**Déférer :** modules 22-24 (jobs/queues, performance/déploiement, projet final) → après PostgreSQL

**TribuZen :**
- `FamilyModule` : CRUD familles (créer, rejoindre, quitter, lister membres)
- `PostModule` : créer/lire posts dans une famille
- `InvitationModule` : inviter par email, accepter/refuser
- `AuthModule` : JWT local d'abord, OIDC après (cours Sécurité)
- `NotificationsGateway` : WebSocket — notifier les membres quand un post est créé

---

### 05 — PostgreSQL `10-postgresql/`

> Prérequis : NestJS (tu reviens sur ce que l'ORM faisait sous le capot).

**Faire :**
- modules 00-07 (SQL, relations, transactions, indexes, EXPLAIN — le cœur)
- modules 11-13 (performances, fonctions SQL, JSONB — directement utile)

**Sauter :** modules 08-10 (isolation/locks/deadlocks — lecture + quiz, pas de deep dive sauf besoin mission), modules 16-18 (replication, monitoring, partitioning — culture DBA, pas ton rôle)

**Déférer :** modules 14-15 (sécurité, projet final) → optionnels

**TribuZen :**
```sql
-- Écrire le schéma TribuZen à la main avant d'utiliser l'ORM
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_by UUID REFERENCES users(id)
);

CREATE TABLE family_members (
  family_id UUID REFERENCES families(id),
  user_id UUID REFERENCES users(id),
  role TEXT CHECK (role IN ('admin', 'member')) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (family_id, user_id)
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID REFERENCES families(id),
  author_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  media JSONB DEFAULT '[]',  -- tableau d'URLs
  created_at TIMESTAMPTZ DEFAULT now()
);
```
→ Écrire les requêtes SQL brutes avant de les passer à l'ORM. Index sur `family_id` dans `posts`.

---

### 06 — Vue `02-vue/`

> Prérequis : TypeScript + Testing + React (la comparaison accélère l'apprentissage).

**Faire :**
- sections 01-débutant (faire tous les exercices — même si "débutant", c'est ton premier framework Vue)
- section 02-intermédiaire (Composition API avancée, composables — équivalent React hooks)
- section 03-avance (Vue Router, Pinia — compare avec React Router + Zustand)
- section 04-expert (performance, SSR)
- section 05-nuxt3 (meta-framework Vue — compare avec Next.js)
- section 09-accessibilité (deep dive — tu as la certif access42, ça se recoupe)

**Sauter :** section 06-storybook (utile mais pas bloquant), section 10-i18n (si pas de besoin mission), section 07-cicd (vu dans CI/CD cours 14)

**TribuZen :**
→ Version Vue/Nuxt du feed TribuZen. Même fonctionnalités que React mais avec Composition API et Pinia. Objectif : sentir la différence de DX, pas refaire tout depuis zéro. Garde un composant React, refais-le en Vue — compare.

---

### 07 — Angular `03-angular/`

> Prérequis : TypeScript + Testing + Vue (DI et RxJS s'apprennent mieux avec Vue derrière soi).

**Faire :**
- section 00 (pont Vue → Angular — lis attentivement)
- sections 01-02 (composants, Signals)
- section 03 (Services et DI — **cœur d'Angular**, connecte avec NestJS)
- sections 04-06 (routing, RxJS, HTTP) — **RxJS : prends ton temps, c'est le mur du cours**
- section 07 (formulaires réactifs)
- section 10 (state management — NgRx vs Signal Store)
- section 12 (recettes ESN — très utile)

**Sauter :** section 08 (Angular Material — survol si pas en mission Angular), section 09 (tests Angular-specific — vu dans Testing cours 02), section 11 (CI/CD Angular)

**TribuZen :**
→ Pas forcément une version Angular de TribuZen (ça fait beaucoup). À la place : implémente UN composant Angular qui consomme l'API TribuZen existante — par exemple la liste des membres d'une famille. Suffit pour sentir la DI et RxJS en contexte réel.

---

### 08 — Soft Skills `08-soft-skills/`

> Prérequis : avoir du vécu sur les cours précédents (React + NestJS + PostgreSQL minimum).

**Faire tout** — c'est le cours le plus directement applicable au rôle Lead Architect Alstom.

Focus particulier :
- Code review (méthode ASK)
- ADR (Architecture Decision Records) — commence à en écrire pour TribuZen maintenant
- Estimation (PERT, planning poker)
- Communication technique avec des non-devs

**TribuZen :**
→ Écrire 3 ADR pour des décisions déjà prises sur TribuZen :
1. Pourquoi Next.js et pas Vite seul ?
2. Pourquoi PostgreSQL et pas MongoDB ?
3. Pourquoi Zustand et pas Context seul ?
→ Faire une revue de code fictive d'un composant TribuZen existant avec la méthode ASK.

---

### 09 — Architecture `13-architecture/`

> Prérequis : React + NestJS + PostgreSQL (les patterns font sens sur du vrai code).

**Faire :**
- sections 00-01 (fondamentaux, design patterns)
- section 02 (DDD — modélisation domaine)
- section 05 (architecture frontend — **priorité absolue pour Alstom**)
  - `05-design-tokens-systems.md`
  - `09-micro-frontends.md`
  - `11-maps-integration.md` ← module ajouté pour Alstom
- section 12-13 (pratique, culture architecturale — ADR, refactoring)

**Sauter :** sections 03-04 (backend/BDD archi — redondant avec NestJS + PostgreSQL déjà faits), sections 06-07 (communication/distribués — vu dans cours 18), sections 08-11 (sécurité/perf/obs/testing — chacun a son cours dédié)

**TribuZen :**
→ Restructurer TribuZen en clean architecture :
- `domain/` : entités, règles métier pures (déjà commencé avec le module invitation)
- `application/` : use cases (createFamily, inviteMember, createPost)
- `infrastructure/` : NestJS controllers, Prisma repositories
- `presentation/` : composants React
→ Créer le design system TribuZen (tokens, composants de base, thème famille)

---

### 10 — Sécurité `14-securite-applicative/`

> Prérequis : NestJS + Architecture.

**Faire :**
- module 01 (OWASP Top 10)
- module 02 (injection — SQL, XSS, CSRF)
- module 03 (authentification) + **module 03b (OIDC/PKCE client)** ← module ajouté pour Alstom
- module 04 (autorisation — RBAC pour TribuZen : admin/member)
- module 06 (headers sécurité — CSP, HSTS)
- module 07 (CORS)
- module 08 (API security)

**Sauter :** modules 05, 09-11 (crypto, supply chain, infra sécurité — culture, pas deep dive)

**TribuZen :**
→ Ajouter OIDC/PKCE à TribuZen (remplacer le JWT local par un vrai provider)
→ Implémenter RBAC : seul un admin peut inviter/exclure des membres
→ Ajouter CSP headers sur le Next.js front

---

### 11 — JS Runtime `01-js-runtime/`

> Prérequis : React + NestJS (V8 et event loop font sens avec l'expérience des deux côtés).

**Faire :**
- modules 00-05 (call stack, closures, event loop, microtasks, Promises, async/await)
- modules 06-07 (GC, memory leaks — directement applicable aux composants React)
- modules 08-09 (V8 architecture, JIT — impressionne en entretien)
- module 11 (performance patterns — change ta façon d'écrire du code)

**Sauter :** module 10 (hidden classes — expert, comprends l'intuition), modules 12-14 (scheduling, projet final, debugging — optionnels)

**TribuZen :**
→ Profiler le feed TribuZen avec Chrome DevTools
→ Identifier et corriger un re-render inutile dans `FamilyFeed`
→ Mesurer l'impact de `useMemo` sur la liste des membres

---

### 12 — HTTP / Caching `11-http-caching/`

> Prérequis : NestJS + PostgreSQL (headers et CDN en contexte API réelle).

**Faire :**
- modules 00-09 (HTTP basics, Cache-Control, ETag, CDN, multi-layer — tout applicable)
- modules 10-12 (SSR, ISR, Edge rendering — connecte avec Next.js)
- module 18 (OWASP HTTP — sécurité headers, complète cours 10)
- module 19 (Redis)

**Sauter :** modules 16-17 (Nginx, TLS — annexes), module 20 (GraphQL caching — si pas de GraphQL dans TribuZen)

**TribuZen :**
→ Ajouter `Cache-Control` sur l'API TribuZen (posts : `max-age=60`, profils : `stale-while-revalidate`)
→ Mesurer la différence avec/sans cache sur le feed
→ Configurer Redis pour cacher les familles fréquemment consultées

---

### 13 — Git Avancé `07-git-avance/`

> Prérequis : avoir eu de vrais conflits (après plusieurs projets). Aucun prérequis technique strict.

**Faire tout** — c'est un cours court et dense, tous les modules sont utiles.

Focus : rebase interactif, bisect (débugger la régression qui détruit une prod), branching strategy.

**TribuZen :**
→ Mettre en place une branching strategy claire sur TribuZen : `main`, `develop`, feature branches
→ Réécrire l'historique git de TribuZen avec rebase interactif pour le rendre propre avant de montrer le repo à un recruteur

---

### 14 — CI/CD `15-cicd-devops/`

> Prérequis : Git Avancé + Testing + AWS (cours 15 — exception : faire AWS avant CI/CD).

**Faire :**
- modules 00-05 (GitHub Actions, workflows, testing en CI, Docker en CI)
- modules 06-08 (déploiement, preview environments)
- module 09 (sécurité pipelines)

**Sauter :** modules 10-11 (IaC avancé — vu dans AWS cours 15)

**TribuZen :**
→ Pipeline GitHub Actions TribuZen : lint → tests → build → deploy sur AWS (avec preview env par PR)
→ Bloquer le merge si les tests Playwright échouent

---

### 15 — AWS Cloud `12-aws-cloud/`

> Prérequis : NestJS + PostgreSQL + HTTP/Caching.

**Faire :**
- module 00 (prérequis — configure le CLI avant tout)
- module 01 (IAM — fondement de tout AWS)
- module 04 (S3 — tu l'utiliseras souvent)
- module 06 (Lambda)
- module 07 (API Gateway)
- module 11 (Cognito — auth-as-a-service, alternative à OIDC maison)
- module 13 (CloudFront)
- module 17 (CI/CD GitHub Actions → AWS, OIDC)
- **module 19 (Déployer Nuxt/Next — climax, deploy TribuZen)**

**Sauter :** modules 02-03 (VPC, EC2 — lecture attentive, pas de lab), module 08 (RDS — tu connais PostgreSQL), module 09 (DynamoDB — paradigme différent, utile si besoin), module 12 (ECS/Fargate — lecture), module 14 (CloudWatch — vu dans Observabilité), module 15 (sécurité AWS — lecture), module 18 (projet final)

**TribuZen :**
→ Déployer TribuZen sur AWS : Next.js sur CloudFront + Lambda, API NestJS sur Lambda ou ECS, PostgreSQL sur RDS
→ Lien public → envoyer à un recruteur

---

### 16 — Observabilité `16-observability-sre/`

> Prérequis : AWS + CI/CD.

**Faire :**
- modules 00-04 (Pino logging, métriques, Prometheus)
- modules 05-06 (distributed tracing, OpenTelemetry)
- module 07 (Sentry — tu l'utiliseras sur toute mission)
- modules 08-09 (Grafana dashboards)
- modules 23-26 en priorité (frontend observabilité, instrumentation Next.js, feature flags) ← ton profil front

**Sauter :** modules 10-18 si pas de rôle SRE (SLI/SLO, alerting, chaos engineering — culture), modules 19-22 (K8s, FinOps, ELK, RGPD — annexes)

**TribuZen :**
→ Pino structured logging sur l'API NestJS TribuZen
→ Sentry sur le Next.js front (errors + performance)
→ Dashboard Grafana : nombre de posts créés par heure, latence API

---

### 17 — Algorithms `05-algorithms/`

> Prérequis : TypeScript (les katas sont en TS). Utilité principale : tests techniques d'entretien.

**Faire :**
- modules 00-03 (complexité, tableaux, hash maps, stacks, queues)
- module 11 (patterns terrain JS : debounce, LRU cache, rate limiting — directement applicable)
- module 07 (graphes — BFS/DFS, utile pour l'arbre familial TribuZen)

**Sauter :** modules 04 (récursion — fais-le si t'as le temps), modules 05-06 (tri, heaps — cultural), modules 08-10 (backtracking, DP, greedy — pour les entretiens GAFAM, pas pour ESN/Alstom)

**TribuZen :**
→ L'arbre familial TribuZen = un graphe. Implémenter le BFS pour trouver le chemin de parenté entre deux membres.
→ Debounce sur la recherche de membres dans une famille.

---

### 18 — Systèmes distribués `17-distributed-systems/`

> Prérequis : Architecture + NestJS + PostgreSQL.

**Faire :**
- modules 00-09 (communication, microservices, event-driven, retries)
- modules 15-19 (failures, circuit breaker, rate limiting, testing)

**Sauter/Survol :** modules 10-14 (CAP, saga, CQRS, outbox — comprendre l'intuition), modules 20-23 (consensus, horloges, CRDTs — culture)

**TribuZen :**
→ Ajouter un circuit breaker sur les appels API externes (notifications email)
→ Retry avec backoff sur les webhooks TribuZen

---

### 19 — IA `18-ia/`

> Prérequis : TypeScript + NestJS.

**Faire :**
- modules 01-02 (prompting fondamental + avancé)
- modules 04-05 (API Claude/OpenAI + MCP — productivité immédiate)
- module 06 (agents)
- module 12 (tokenization/embeddings — lire AVANT le module 09)
- module 09 (Transformer — avec embeddings en tête)
- modules 13-15 (RAG : fondamental, avancé, chatbot — tu construis quelque chose)

**Sauter :** module 03 (Copilot/assistants — tu sais déjà), modules 07-08 (maths + neural networks — comprends l'intuition, pas les formules), module 10 (fine-tuning), module 11 (Ollama — utile mais pas urgent)

**TribuZen :**
→ Chatbot TribuZen : "retrouve les souvenirs où grand-père était présent" (RAG sur les posts)
→ Suggestions de connexions familiales (embeddings sur les profils)

---

### 20 — React Native `19-react-native/`

> Prérequis : React. À faire si une mission mobile se présente.

**Faire :** modules 00-12 (fondamentaux + features courantes)
**Sauter :** modules 23-27 (native modules, Fabric/JSI, Hermes — très avancé, culture)

**TribuZen :**
→ App mobile TribuZen : feed, profil, notifications push

---

### 21 — WebGPU / 3D `20-webgpu-3d/`

> Prérequis : JS Runtime (GPU pipeline nécessite de comprendre le thread principal).
> À faire si mission dataviz/3D se présente. Et quand tu reviendras sur Dia de los muertos.

**Faire :** prérequis maths d'abord, puis modules 00-12 (pipeline, WebGPU core)
**Sauter/Survol :** modules 22+ (ray tracing, WebXR — bonus)

**TribuZen / Dia de los muertos :**
→ Visualisation 3D de l'arbre familial TribuZen
→ Et oui — le scénario de Dia de los muertos t'attend ici.

---

## Récap rapide

```
01 TypeScript      lab-10 seulement → puis 02
02 Testing/TDD     kata RED d'abord → puis labs 01-05, 07, 09, 10-11
   ↳ Checkpoint TS lab-14 (décorateurs)
03 React           hooks, Next.js, perf, recettes ESN
04 NestJS          core + auth + WebSockets
05 PostgreSQL      SQL brut, indexes, JSONB
06 Vue             tout sauf storybook/cicd
07 Angular         DI + RxJS bien
08 Soft Skills     tout — ADR, code review
09 Architecture    frontend section en priorité
10 Sécurité        OWASP + OIDC/PKCE
11 JS Runtime      event loop, GC, V8, perf
12 HTTP/Caching    cache headers, Redis
13 Git Avancé      tout
14 CI/CD           GitHub Actions
15 AWS             IAM, S3, Lambda, CloudFront, deploy Next.js
16 Observabilité   Pino, Sentry, Grafana
17 Algorithms      complexité, hash maps, graphes, patterns JS
18 Distribués      circuit breaker, retry
19 IA              RAG, agents, embeddings
20 React Native    si mission mobile
21 WebGPU          si mission 3D + Dia de los muertos
```
