# Parcours thematiques

> Cinq parcours cibles a travers le curriculum, chacun avec un objectif, une duree estimee et une liste ordonnee de modules à suivre.

---

## Parcours 1 — "Entretien Senior Frontend" (1 semaine)

**Objectif** : Preparer un entretien technique fullstack avec focus frontend. Couvrir les fondamentaux TypeScript, un framework au choix, les tests, et le protocole HTTP.

### Jour 1-2 : TypeScript solide

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `01-typescript/modules/04-unions-intersections-narrowing.md` | 1h30 |
| 2 | `01-typescript/modules/06-generics-fondamentaux.md` | 1h30 |
| 3 | `01-typescript/modules/07-generics-avances.md` | 1h30 |
| 4 | `01-typescript/modules/10-utility-types.md` | 1h |
| 5 | `01-typescript/modules/11-conditional-types.md` | 1h |
| 6 | `01-typescript/modules/12-mapped-types-template-literals.md` | 1h |
| - | Cheat sheet : `cheat-sheets/phase-bc-backend.md` (section TypeScript) | 30min |

### Jour 3-4 : Framework au choix (un des trois)

**Option React** :

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `08-react/cours/02-hooks-fondamentaux/01-usestate.md` | 1h |
| 2 | `08-react/cours/02-hooks-fondamentaux/02-useeffect.md` | 1h |
| 3 | `08-react/cours/02-hooks-fondamentaux/05-custom-hooks.md` | 1h |
| 4 | `08-react/cours/03-state-management/04-tanstack-query.md` | 1h |
| 5 | `08-react/cours/08-performance-patterns/01-performance-react.md` | 1h |
| 6 | `08-react/cours/08-performance-patterns/03-error-boundaries-suspense.md` | 45min |
| 7 | `08-react/cours/06-nextjs/02-server-components.md` | 1h |
| 8 | `08-react/cours/12-recettes-esn/02-entretien-technique.md` | 1h |
| - | Kata : `katas/phase-a-frameworks.md` (section React, katas 1-4) | 2h |

**Option Vue** :

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `03-vue/cours/01-debutant/03-reactivite.md` | 1h |
| 2 | `03-vue/cours/02-intermediaire/01-composition-api-avancee.md` | 1h |
| 3 | `03-vue/cours/02-intermediaire/02-composables.md` | 1h |
| 4 | `03-vue/cours/03-avance/02-pinia.md` | 1h |
| 5 | `03-vue/cours/04-expert/01-performance.md` | 1h |
| 6 | `03-vue/cours/04-expert/02-ssr-et-hydration.md` | 1h |
| 7 | `03-vue/cours/05-nuxt3/01-introduction.md` | 45min |
| - | Kata : `katas/phase-a-frameworks.md` (section Vue, katas 1-4) | 2h |

**Option Angular** :

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `09-angular/cours/01-composants-templates/01-composants-standalone.md` | 1h |
| 2 | `09-angular/cours/01-composants-templates/02-signaux-base.md` | 1h |
| 3 | `09-angular/cours/02-signals-avances/01-signaux-avances.md` | 1h |
| 4 | `09-angular/cours/03-services-di/01-services-et-injectable.md` | 1h |
| 5 | `09-angular/cours/05-rxjs-essentiel/04-interop-signals-rxjs.md` | 45min |
| 6 | `09-angular/cours/06-http-api/02-interceptors.md` | 45min |
| 7 | `09-angular/cours/01-composants-templates/08-defer-et-zoneless.md` | 1h |
| 8 | `09-angular/cours/12-recettes-esn/02-entretien-technique.md` | 1h |
| - | Kata : `katas/phase-a-frameworks.md` (section Angular, katas 1-4) | 2h |

### Jour 5 : Testing + HTTP + révision croisee

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `04-testing/modules/02-anatomie-dun-test.md` | 45min |
| 2 | `04-testing/modules/04-mocking-et-test-doubles.md` | 1h |
| 3 | `04-testing/modules/07-tests-de-composants.md` | 1h |
| 4 | `07-http-caching/modules/04-cache-control.md` | 45min |
| 5 | `07-http-caching/modules/05-etag-validation-conditionnelle.md` | 45min |
| - | Cheat sheet : `cheat-sheets/phase-a-frameworks.md` (révision comparative) | 1h |
| - | Cheat sheet : `cheat-sheets/phase-de-infra.md` (section HTTP) | 30min |

---

## Parcours 2 — "Mission React + NestJS" (2 semaines)

**Objectif** : Etre operationnel sur une stack React + NestJS + PostgreSQL. A la fin, démarrer les sprints 1-2 du projet capstone TaskFlow.

### Semaine 1 : Frontend React + bases backend

**Jours 1-2 : React essentiels**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `08-react/cours/01-composants-jsx/01-jsx-en-profondeur.md` | 1h |
| 2 | `08-react/cours/01-composants-jsx/02-props-et-children.md` | 1h |
| 3 | `08-react/cours/02-hooks-fondamentaux/01-usestate.md` | 1h |
| 4 | `08-react/cours/02-hooks-fondamentaux/02-useeffect.md` | 1h |
| 5 | `08-react/cours/02-hooks-fondamentaux/04-usecallback-usememo.md` | 1h |
| 6 | `08-react/cours/02-hooks-fondamentaux/05-custom-hooks.md` | 1h |
| 7 | `08-react/cours/03-state-management/02-zustand.md` | 1h |
| 8 | `08-react/cours/03-state-management/04-tanstack-query.md` | 1h |
| - | Kata : `katas/phase-a-frameworks.md` (React katas 1-3) | 1h30 |

**Jours 3-4 : React routing, formulaires, Next.js**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `08-react/cours/04-routing/01-react-router-basique.md` | 1h |
| 2 | `08-react/cours/05-formulaires/02-react-hook-form.md` | 1h |
| 3 | `08-react/cours/06-nextjs/01-nextjs-fondamentaux.md` | 1h |
| 4 | `08-react/cours/06-nextjs/02-server-components.md` | 1h |
| 5 | `08-react/cours/06-nextjs/03-data-fetching.md` | 1h |
| 6 | `08-react/cours/06-nextjs/04-api-routes-et-server-actions.md` | 1h |
| - | Cheat sheet : `cheat-sheets/phase-a-frameworks.md` (section React) | 30min |

**Jour 5 : NestJS introduction**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `05-nestjs/modules/09-nestjs-introduction.md` | 1h |
| 2 | `05-nestjs/modules/10-nestjs-controllers.md` | 1h |
| 3 | `05-nestjs/modules/11-nestjs-providers-di.md` | 1h30 |
| 4 | `05-nestjs/modules/12-nestjs-modules.md` | 1h |
| 5 | `05-nestjs/modules/13-nestjs-pipes-guards-interceptors.md` | 1h30 |

### Semaine 2 : Backend complet + PostgreSQL + tests

**Jours 1-2 : NestJS avance + PostgreSQL**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `05-nestjs/modules/14-typeorm-entites-relations.md` | 1h30 |
| 2 | `05-nestjs/modules/15-typeorm-requetes-migrations.md` | 1h30 |
| 3 | `05-nestjs/modules/19-nestjs-auth.md` | 1h30 |
| 4 | `06-postgresql/modules/01-modele-relationnel.md` | 1h |
| 5 | `06-postgresql/modules/02-crud-et-requetes.md` | 1h |
| 6 | `06-postgresql/modules/03-relations-et-jointures.md` | 1h |
| 7 | `06-postgresql/modules/04-transactions-et-acid.md` | 1h |

**Jour 3 : PostgreSQL index et performances**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `06-postgresql/modules/05-index-fondamentaux.md` | 1h |
| 2 | `06-postgresql/modules/06-query-planner.md` | 1h |
| 3 | `06-postgresql/modules/11-performances-et-optimisation.md` | 1h30 |
| - | Kata : `katas/phase-bde-backend-infra.md` (section PostgreSQL) | 1h |

**Jour 4 : Testing**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `04-testing/modules/03-vitest-fondamentaux.md` | 1h |
| 2 | `04-testing/modules/04-mocking-et-test-doubles.md` | 1h |
| 3 | `04-testing/modules/07-tests-de-composants.md` | 1h |
| 4 | `04-testing/modules/08-msw-mock-service-worker.md` | 1h |
| 5 | `04-testing/modules/10-playwright-fondamentaux.md` | 1h |
| - | Cheat sheet : `cheat-sheets/phase-bc-backend.md` (section Testing) | 30min |

**Jour 5 : Démarrer le Capstone TaskFlow (Sprint 1)**

| Ordre | Activite | Temps |
|-------|----------|-------|
| 1 | Lire le cahier des charges : `capstone/projet-capstone-fullstack.md` | 1h |
| 2 | Setup du monorepo, Docker Compose, schemas de base | 3h |
| 3 | Sprint 1 : CRUD boards + colonnes (NestJS + PostgreSQL + React) | 4h |

---

## Parcours 3 — "Backend Node.js Senior" (2 semaines)

**Objectif** : Maîtriser le backend JS en profondeur, de l'event loop aux systèmes distribues.

### Semaine 1 : JS Runtime + NestJS

**Jours 1-2 : JS Runtime en profondeur**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `02-js-runtime/modules/01-call-stack-execution-context.md` | 1h |
| 2 | `02-js-runtime/modules/02-scope-closures-memory.md` | 1h30 |
| 3 | `02-js-runtime/modules/03-event-loop.md` | 1h30 |
| 4 | `02-js-runtime/modules/04-microtasks-macrotasks.md` | 1h |
| 5 | `02-js-runtime/modules/05-promises-implementation.md` | 1h30 |
| 6 | `02-js-runtime/modules/07-garbage-collector.md` | 1h |
| 7 | `02-js-runtime/modules/08-memory-leaks.md` | 1h |
| 8 | `02-js-runtime/modules/09-v8-architecture.md` | 1h |
| 9 | `02-js-runtime/modules/10-jit-compilation-optimization.md` | 1h |

**Jours 3-4 : NestJS complet**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `05-nestjs/modules/01-nodejs-event-loop.md` | 1h |
| 2 | `05-nestjs/modules/03-nodejs-streams-et-buffers.md` | 1h |
| 3 | `05-nestjs/modules/09-nestjs-introduction.md` | 1h |
| 4 | `05-nestjs/modules/10-nestjs-controllers.md` | 1h |
| 5 | `05-nestjs/modules/11-nestjs-providers-di.md` | 1h |
| 6 | `05-nestjs/modules/12-nestjs-modules.md` | 1h |
| 7 | `05-nestjs/modules/13-nestjs-pipes-guards-interceptors.md` | 1h30 |
| 8 | `05-nestjs/modules/19-nestjs-auth.md` | 1h |
| 9 | `05-nestjs/modules/22-nestjs-jobs-queues.md` | 1h |
| 10 | `05-nestjs/modules/26-graphql-nestjs.md` | 1h |

**Jour 5 : PostgreSQL essentiel**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `06-postgresql/modules/03-relations-et-jointures.md` | 1h |
| 2 | `06-postgresql/modules/04-transactions-et-acid.md` | 1h |
| 3 | `06-postgresql/modules/05-index-fondamentaux.md` | 1h |
| 4 | `06-postgresql/modules/06-query-planner.md` | 1h |
| 5 | `06-postgresql/modules/08-niveaux-isolation.md` | 1h |
| 6 | `06-postgresql/modules/10-deadlocks.md` | 45min |
| - | Cheat sheet : `cheat-sheets/phase-bc-backend.md` (sections PostgreSQL + NestJS) | 30min |

### Semaine 2 : Redis + Distributed Systems + Testing

**Jours 1-2 : Redis + patterns de cache**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `07-http-caching/modules/04-cache-control.md` | 1h |
| 2 | `07-http-caching/modules/06-stale-while-revalidate.md` | 45min |
| 3 | `07-http-caching/modules/09-cache-multi-couches.md` | 1h |
| 4 | `07-http-caching/modules/19-redis-cache-applicatif.md` (dans le cours HTTP caching externe) | 2h |
| - | Kata : `katas/phase-bde-backend-infra.md` (section Redis) | 1h |

**Jours 3-4 : Systèmes distribues**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `11-distributed-systems/modules/01-pourquoi-les-systemes-distribues.md` | 1h |
| 2 | `11-distributed-systems/modules/06-communication-asynchrone-message-queues.md` | 1h |
| 3 | `11-distributed-systems/modules/07-event-driven-architecture.md` | 1h |
| 4 | `11-distributed-systems/modules/09-retries-timeouts-idempotency.md` | 1h |
| 5 | `11-distributed-systems/modules/10-coherence-et-theoreme-cap.md` | 1h |
| 6 | `11-distributed-systems/modules/12-transactions-distribuees-saga.md` | 1h |
| 7 | `11-distributed-systems/modules/13-cqrs-event-sourcing.md` | 1h |
| 8 | `11-distributed-systems/modules/14-outbox-pattern-reliable-messaging.md` | 1h |
| 9 | `11-distributed-systems/modules/16-circuit-breaker.md` | 1h |

**Jour 5 : Testing backend + révision**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `04-testing/modules/03-vitest-fondamentaux.md` | 1h |
| 2 | `04-testing/modules/04-mocking-et-test-doubles.md` | 1h |
| 3 | `04-testing/modules/09-tests-integration.md` | 1h |
| 4 | `04-testing/modules/16-contract-testing.md` | 1h |
| 5 | `05-nestjs/modules/18-nestjs-testing.md` | 1h |
| - | Cheat sheet : `cheat-sheets/phase-bc-backend.md` (révision complete) | 30min |
| - | Kata : `katas/phase-bde-backend-infra.md` (section NestJS) | 1h |

---

## Parcours 4 — "DevOps & Observabilité" (1 semaine)

**Objectif** : Savoir déployer, monitorer et diagnostiquer des applications en production.

### Jour 1 : HTTP, TLS et sécurité

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `07-http-caching/modules/01-protocole-http.md` | 1h |
| 2 | `07-http-caching/modules/02-http2-http3.md` | 1h |
| 3 | `07-http-caching/modules/04-cache-control.md` | 1h |
| 4 | `07-http-caching/modules/17-tls-https.md` (cours HTTP caching externe) | 1h30 |
| 5 | `07-http-caching/modules/18-devsecops-owasp.md` (cours HTTP caching externe) | 1h30 |

### Jour 2 : Redis + CDN + cache multi-couches

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `07-http-caching/modules/08-cdn.md` | 1h |
| 2 | `07-http-caching/modules/09-cache-multi-couches.md` | 1h |
| 3 | `07-http-caching/modules/19-redis-cache-applicatif.md` (cours HTTP caching externe) | 2h |
| 4 | `07-http-caching/modules/14-performance-web.md` | 1h |
| - | Cheat sheet : `cheat-sheets/phase-de-infra.md` (section HTTP Caching) | 30min |

### Jour 3 : Observabilité fondamentale

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `12-observability-sre/modules/01-pourquoi-observabilite.md` | 45min |
| 2 | `12-observability-sre/modules/02-logging-structure.md` | 1h |
| 3 | `12-observability-sre/modules/04-introduction-metriques.md` | 1h |
| 4 | `12-observability-sre/modules/05-metriques-prometheus.md` | 1h |
| 5 | `12-observability-sre/modules/07-distributed-tracing.md` | 1h |
| 6 | `12-observability-sre/modules/08-otel-collector-pipeline.md` | 1h |

### Jour 4 : SRE + AWS essentiels

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `12-observability-sre/modules/10-sli-slo-sla.md` | 1h |
| 2 | `12-observability-sre/modules/11-alerting-strategies.md` | 1h |
| 3 | `12-observability-sre/modules/12-incident-management.md` | 1h |
| 4 | `12-observability-sre/modules/15-chaos-engineering.md` | 1h |
| 5 | aws-cloud-course : `modules/05-cdk-infrastructure-code.md` | 1h |
| 6 | aws-cloud-course : `modules/06-lambda-serverless.md` | 1h |
| 7 | aws-cloud-course : `modules/17-cicd-devops.md` | 1h |

### Jour 5 : Déploiement complet + katas infra

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | aws-cloud-course : `modules/13-cloudfront-cdn.md` | 1h |
| 2 | aws-cloud-course : `modules/14-cloudwatch-xray-observabilite.md` | 1h |
| 3 | aws-cloud-course : `modules/19-deployer-nuxt-next-aws.md` | 1h30 |
| 4 | `12-observability-sre/modules/18-production-readiness.md` | 1h |
| - | Cheat sheet : `cheat-sheets/phase-de-infra.md` (révision complete) | 30min |
| - | Kata : `katas/phase-bde-backend-infra.md` (sections Docker, CI/CD, Observabilité) | 2h |

---

## Parcours 5 — "Fullstack Complete" (4-6 semaines)

**Objectif** : Le parcours integral pour devenir staffable sur tout le spectre fullstack JS. Couvre les 12 domaines essentiels du curriculum dans un ordre pedagogique progressif.

### Semaine 1 : TypeScript + JS Runtime

**Jours 1-2 : TypeScript**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `01-typescript/modules/00-prerequis-et-introduction.md` | 45min |
| 2 | `01-typescript/modules/01-types-primitifs-et-inference.md` | 1h |
| 3 | `01-typescript/modules/02-fonctions.md` | 1h |
| 4 | `01-typescript/modules/03-objets-interfaces-types.md` | 1h |
| 5 | `01-typescript/modules/04-unions-intersections-narrowing.md` | 1h30 |
| 6 | `01-typescript/modules/05-classes-et-heritage.md` | 1h |
| 7 | `01-typescript/modules/06-generics-fondamentaux.md` | 1h30 |
| 8 | `01-typescript/modules/07-generics-avances.md` | 1h30 |
| 9 | `01-typescript/modules/10-utility-types.md` | 1h |
| 10 | `01-typescript/modules/11-conditional-types.md` | 1h |
| 11 | `01-typescript/modules/12-mapped-types-template-literals.md` | 1h |
| 12 | `01-typescript/modules/14-decorateurs-metadata.md` | 1h |

**Jours 3-4 : JS Runtime**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `02-js-runtime/modules/01-call-stack-execution-context.md` | 1h |
| 2 | `02-js-runtime/modules/02-scope-closures-memory.md` | 1h30 |
| 3 | `02-js-runtime/modules/03-event-loop.md` | 1h30 |
| 4 | `02-js-runtime/modules/04-microtasks-macrotasks.md` | 1h |
| 5 | `02-js-runtime/modules/05-promises-implementation.md` | 1h30 |
| 6 | `02-js-runtime/modules/06-async-await-under-the-hood.md` | 1h |
| 7 | `02-js-runtime/modules/07-garbage-collector.md` | 1h |
| 8 | `02-js-runtime/modules/09-v8-architecture.md` | 1h |
| 9 | `02-js-runtime/modules/10-jit-compilation-optimization.md` | 1h |
| 10 | `02-js-runtime/modules/12-performance-patterns.md` | 1h |

**Jour 5 : Révision + katas TypeScript**

| Ordre | Activite | Temps |
|-------|----------|-------|
| 1 | Cheat sheet : `cheat-sheets/phase-bc-backend.md` (section TypeScript) | 30min |
| 2 | Exercices types avances (conditional, mapped, generics) | 3h |
| 3 | `01-typescript/modules/18-patterns-de-conception.md` | 1h30 |

### Semaine 2 : React (où Vue au choix)

**Jours 1-3 : React fondamentaux a avance**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `08-react/cours/01-composants-jsx/01-jsx-en-profondeur.md` | 1h |
| 2 | `08-react/cours/01-composants-jsx/02-props-et-children.md` | 1h |
| 3 | `08-react/cours/01-composants-jsx/03-composants-et-composition.md` | 1h |
| 4 | `08-react/cours/02-hooks-fondamentaux/01-usestate.md` | 1h |
| 5 | `08-react/cours/02-hooks-fondamentaux/02-useeffect.md` | 1h |
| 6 | `08-react/cours/02-hooks-fondamentaux/04-usecallback-usememo.md` | 1h |
| 7 | `08-react/cours/02-hooks-fondamentaux/05-custom-hooks.md` | 1h |
| 8 | `08-react/cours/03-state-management/02-zustand.md` | 1h |
| 9 | `08-react/cours/03-state-management/04-tanstack-query.md` | 1h |
| 10 | `08-react/cours/04-routing/01-react-router-basique.md` | 1h |
| 11 | `08-react/cours/05-formulaires/02-react-hook-form.md` | 1h |
| 12 | `08-react/cours/06-nextjs/01-nextjs-fondamentaux.md` | 1h |
| 13 | `08-react/cours/06-nextjs/02-server-components.md` | 1h |
| 14 | `08-react/cours/06-nextjs/03-data-fetching.md` | 1h |
| 15 | `08-react/cours/08-performance-patterns/01-performance-react.md` | 1h |
| 16 | `08-react/cours/08-performance-patterns/03-error-boundaries-suspense.md` | 45min |

**Jours 4-5 : Testing fondamental**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `04-testing/modules/01-pourquoi-tester.md` | 45min |
| 2 | `04-testing/modules/02-anatomie-dun-test.md` | 1h |
| 3 | `04-testing/modules/03-vitest-fondamentaux.md` | 1h |
| 4 | `04-testing/modules/04-mocking-et-test-doubles.md` | 1h |
| 5 | `04-testing/modules/05-tests-asynchrones.md` | 1h |
| 6 | `04-testing/modules/07-tests-de-composants.md` | 1h |
| 7 | `04-testing/modules/08-msw-mock-service-worker.md` | 1h |
| 8 | `04-testing/modules/10-playwright-fondamentaux.md` | 1h |
| 9 | `04-testing/modules/12-couverture-et-mutation-testing.md` | 1h |
| - | Kata : `katas/phase-a-frameworks.md` (tous les katas React) | 2h |
| - | Cheat sheet : `cheat-sheets/phase-a-frameworks.md` | 30min |

### Semaine 3 : NestJS + PostgreSQL

**Jours 1-2 : NestJS**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `05-nestjs/modules/01-nodejs-event-loop.md` | 1h |
| 2 | `05-nestjs/modules/03-nodejs-streams-et-buffers.md` | 1h |
| 3 | `05-nestjs/modules/05-express-fondamentaux.md` | 1h |
| 4 | `05-nestjs/modules/06-express-middleware.md` | 1h |
| 5 | `05-nestjs/modules/09-nestjs-introduction.md` | 1h |
| 6 | `05-nestjs/modules/10-nestjs-controllers.md` | 1h |
| 7 | `05-nestjs/modules/11-nestjs-providers-di.md` | 1h |
| 8 | `05-nestjs/modules/12-nestjs-modules.md` | 1h |
| 9 | `05-nestjs/modules/13-nestjs-pipes-guards-interceptors.md` | 1h30 |
| 10 | `05-nestjs/modules/19-nestjs-auth.md` | 1h |

**Jours 3-4 : PostgreSQL**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `06-postgresql/modules/01-modele-relationnel.md` | 1h |
| 2 | `06-postgresql/modules/02-crud-et-requetes.md` | 1h |
| 3 | `06-postgresql/modules/03-relations-et-jointures.md` | 1h |
| 4 | `06-postgresql/modules/04-transactions-et-acid.md` | 1h |
| 5 | `06-postgresql/modules/05-index-fondamentaux.md` | 1h |
| 6 | `06-postgresql/modules/06-query-planner.md` | 1h |
| 7 | `06-postgresql/modules/08-niveaux-isolation.md` | 1h |
| 8 | `06-postgresql/modules/10-deadlocks.md` | 45min |
| 9 | `06-postgresql/modules/11-performances-et-optimisation.md` | 1h30 |
| 10 | `06-postgresql/modules/12-fonctions-avancees-sql.md` | 1h |
| 11 | `05-nestjs/modules/14-typeorm-entites-relations.md` | 1h |
| 12 | `05-nestjs/modules/15-typeorm-requetes-migrations.md` | 1h |

**Jour 5 : Intégration + tests backend**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `05-nestjs/modules/18-nestjs-testing.md` | 1h |
| 2 | `04-testing/modules/09-tests-integration.md` | 1h |
| - | Cheat sheet : `cheat-sheets/phase-bc-backend.md` (révision complete) | 1h |
| - | Kata : `katas/phase-bde-backend-infra.md` (sections NestJS + PostgreSQL) | 2h |

### Semaine 4 : HTTP/Caching + Redis + Distribue

**Jours 1-2 : HTTP et caching**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `07-http-caching/modules/01-protocole-http.md` | 1h |
| 2 | `07-http-caching/modules/02-http2-http3.md` | 1h |
| 3 | `07-http-caching/modules/04-cache-control.md` | 1h |
| 4 | `07-http-caching/modules/05-etag-validation-conditionnelle.md` | 1h |
| 5 | `07-http-caching/modules/06-stale-while-revalidate.md` | 45min |
| 6 | `07-http-caching/modules/08-cdn.md` | 1h |
| 7 | `07-http-caching/modules/09-cache-multi-couches.md` | 1h |
| 8 | `07-http-caching/modules/19-redis-cache-applicatif.md` (cours externe) | 2h |

**Jours 3-4 : Systèmes distribues**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `11-distributed-systems/modules/01-pourquoi-les-systemes-distribues.md` | 1h |
| 2 | `11-distributed-systems/modules/06-communication-asynchrone-message-queues.md` | 1h |
| 3 | `11-distributed-systems/modules/07-event-driven-architecture.md` | 1h |
| 4 | `11-distributed-systems/modules/09-retries-timeouts-idempotency.md` | 1h |
| 5 | `11-distributed-systems/modules/10-coherence-et-theoreme-cap.md` | 1h |
| 6 | `11-distributed-systems/modules/12-transactions-distribuees-saga.md` | 1h |
| 7 | `11-distributed-systems/modules/13-cqrs-event-sourcing.md` | 1h |
| 8 | `11-distributed-systems/modules/14-outbox-pattern-reliable-messaging.md` | 1h |
| 9 | `11-distributed-systems/modules/16-circuit-breaker.md` | 1h |

**Jour 5 : Révision mi-parcours**

| Ordre | Activite | Temps |
|-------|----------|-------|
| 1 | Cheat sheet : `cheat-sheets/phase-de-infra.md` (section HTTP + Redis) | 30min |
| 2 | Kata : `katas/phase-bde-backend-infra.md` (section Distributed) | 2h |
| 3 | Révision du glossaire : `glossaire.md` | 1h |

### Semaine 5 : Observabilité + AWS

**Jours 1-2 : Observabilité & SRE**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | `12-observability-sre/modules/01-pourquoi-observabilite.md` | 45min |
| 2 | `12-observability-sre/modules/02-logging-structure.md` | 1h |
| 3 | `12-observability-sre/modules/04-introduction-metriques.md` | 1h |
| 4 | `12-observability-sre/modules/05-metriques-prometheus.md` | 1h |
| 5 | `12-observability-sre/modules/07-distributed-tracing.md` | 1h |
| 6 | `12-observability-sre/modules/08-otel-collector-pipeline.md` | 1h |
| 7 | `12-observability-sre/modules/10-sli-slo-sla.md` | 1h |
| 8 | `12-observability-sre/modules/11-alerting-strategies.md` | 1h |
| 9 | `12-observability-sre/modules/15-chaos-engineering.md` | 1h |

**Jours 3-4 : AWS essentiels**

| Ordre | Module | Temps |
|-------|--------|-------|
| 1 | aws-cloud-course : `modules/01-iam-identity-access.md` | 1h |
| 2 | aws-cloud-course : `modules/04-s3-stockage-objets.md` | 1h |
| 3 | aws-cloud-course : `modules/05-cdk-infrastructure-code.md` | 1h30 |
| 4 | aws-cloud-course : `modules/06-lambda-serverless.md` | 1h |
| 5 | aws-cloud-course : `modules/07-api-gateway.md` | 1h |
| 6 | aws-cloud-course : `modules/13-cloudfront-cdn.md` | 1h |
| 7 | aws-cloud-course : `modules/14-cloudwatch-xray-observabilite.md` | 1h |
| 8 | aws-cloud-course : `modules/17-cicd-devops.md` | 1h |
| 9 | aws-cloud-course : `modules/19-deployer-nuxt-next-aws.md` | 1h30 |

**Jour 5 : Révision infra**

| Ordre | Activite | Temps |
|-------|----------|-------|
| 1 | Cheat sheet : `cheat-sheets/phase-de-infra.md` (révision complete) | 1h |
| 2 | Kata : `katas/phase-bde-backend-infra.md` (sections CI/CD + AWS + Observabilité) | 3h |
| 3 | `12-observability-sre/modules/18-production-readiness.md` | 1h |

### Semaine 6 : Capstone TaskFlow

**Jours 1-5 : Projet capstone integral**

| Ordre | Activite | Temps |
|-------|----------|-------|
| 1 | Lecture du cahier des charges : `capstone/projet-capstone-fullstack.md` | 1h |
| 2 | Sprint 1 : Setup monorepo, Docker Compose, CRUD boards + colonnes (NestJS + PostgreSQL + React) | 1 jour |
| 3 | Sprint 2 : Cartes, drag & drop, WebSocket temps réel | 1 jour |
| 4 | Sprint 3 : Auth JWT, cache Redis, endpoint GraphQL dashboard | 1 jour |
| 5 | Sprint 4 : Tests (Vitest + Playwright), instrumentation OTel + Prometheus + Grafana | 1 jour |
| 6 | Sprint 5 : CI/CD GitHub Actions, déploiement Docker Compose, review finale | 1 jour |

---

> **Note** : Les références aux modules `aws-cloud-course` pointent vers le repository `aws-cloud-course/modules/` (projet separe). Les références au module `19-redis-cache-applicatif` et aux modules `17-tls-https` / `18-devsecops-owasp` pointent vers le cours HTTP caching externe (`http-caching-course/modules/`).
