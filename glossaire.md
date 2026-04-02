# Glossaire unifie du curriculum Fullstack JS

> Definitions concises des termes techniques clés couverts par les 16 cours du cursus.
> Format : **Terme** — Definition. → _Cours XX, Module YY_

---

## A

**ACID** — Proprietes des transactions relationnelles : Atomicite, Coherence, Isolation, Durabilite. Garantit la fiabilité des operations en base. → _08-postgresql, Module 04-transactions-et-acid_

**API Gateway** — Point d'entree unique qui route, filtre et transforme les requêtes vers les microservices sous-jacents. → _13-distributed-systems, Module 08-api-gateway-et-bff_

**Async/Await** — Syntaxe declarative pour écrire du code asynchrone sequentiel, compilee en machine a états par le moteur JS. → _01-js-runtime, Module 06-async-await-under-the-hood_

## B

**B-tree** — Structure d'index par defaut dans PostgreSQL, optimisee pour les comparaisons d'egalite et de plage (>, <, BETWEEN). → _08-postgresql, Module 05-index-fondamentaux_

**Backpressure** — Mécanisme de controle de flux qui ralentit le producteur lorsque le consommateur ne peut pas suivre le debit. → _13-distributed-systems, Module 22-stream-processing-event-streaming_

**BFF (Backend for Frontend)** — Variante de l'API Gateway ou chaque client (web, mobile) a son propre backend dedie. → _13-distributed-systems, Module 08-api-gateway-et-bff_

**Bulkhead** — Pattern d'isolation qui cloisonne les ressources (threads, connexions) pour empecher une defaillance de se propager. → _13-distributed-systems, Module 15-failure-modes_

## C

**Cache-aside** — Stratégie de cache ou l'application lit d'abord le cache, puis la source en cas de miss, et met a jour le cache. → _09-http-caching, Module 19-redis-cache-applicatif_

**Cache-Control** — En-tete HTTP qui définit les directives de mise en cache (max-age, no-cache, stale-while-revalidate, etc.). → _09-http-caching, Module 04-cache-control_

**CAP (théorème)** — Dans un système distribue, on ne peut garantir simultanement Coherence, Disponibilité et Tolerance aux partitions. → _13-distributed-systems, Module 10-coherence-et-théorème-cap_

**CDK (AWS)** — Framework d'infrastructure-as-code qui permet de définir des ressources AWS en TypeScript. → _10-aws-cloud, Module 05-cdk-infrastructure-code_

**CDN** — Réseau de serveurs edge qui met en cache le contenu statique au plus pres de l'utilisateur final. → _09-http-caching, Module 08-cdn_

**Change Detection (Angular)** — Mécanisme qui détecté les changements d'état et met a jour le DOM. Historiquement via Zone.js, migre vers les Signals. → _03-angular, Cours 01-composants-templates/08-defer-et-zoneless_

**CI/CD** — Intégration continue et déploiement continu : pipeline automatisee de build, test et déploiement. → _06-testing, Module 13-tests-en-ci-cd_

**Circuit Breaker** — Pattern de résilience qui coupe les appels vers un service defaillant après un seuil d'erreurs, evitant l'effet cascade. → _13-distributed-systems, Module 16-circuit-breaker_

**CloudFront** — CDN d'AWS qui distribue le contenu statique et dynamique via un réseau mondial de points de presence. → _10-aws-cloud, Module 13-cloudfront-cdn_

**Closure** — Fonction qui capture et conserve une référence a l'environnement lexical (variables) dans lequel elle a ete definie. → _01-js-runtime, Module 02-scope-closures-memory_

**Composable (Vue)** — Fonction réutilisable qui encapsule de la logique réactive via la Composition API (équivalent des custom hooks React). → _02-vue, Cours 02-intermédiaire/02-composables_

**Composition API (Vue)** — API fonctionnelle de Vue 3 (setup, ref, computed, watch) qui remplace l'Options API pour une meilleure reutilisation de la logique. → _02-vue, Cours 02-intermédiaire/01-composition-api-avancee_

**Computed** — Valeur derivee qui se recalcule automatiquement lorsque ses dépendances réactives changent (Vue, Angular). → _02-vue, Cours 01-débutant/03-réactivité_

**Concurrent Mode (React)** — Modèle de rendu qui permet a React d'interrompre et de reprendre le travail de rendu pour garder l'UI responsive. → _04-react, Cours 08-performance-patterns/04-react-19-nouveautes_

**Connection Pool** — Ensemble pre-etabli de connexions à la base de donnees reutilisees entre les requêtes pour éviter le cout d'ouverture/fermeture. → _08-postgresql, Module 11-performances-et-optimisation_

**Container (Docker)** — Instance isolee et legere d'une image Docker, partageant le noyau de l'hote mais avec son propre filesystem et réseau. → _cheat-sheets/phase-de-infra_

**CORS** — Mécanisme du navigateur qui restreint les requêtes cross-origin via des en-tetes HTTP (Access-Control-Allow-Origin, etc.). → _09-http-caching, Module 03-en-tetes-http_

**Coverage** — Mesure du pourcentage de code source exécuté par les tests (lignes, branches, fonctions). → _06-testing, Module 12-couverture-et-mutation-testing_

**CQRS** — Separation des responsabilites de lecture (Query) et d'écriture (Command) dans des modèles distincts. → _13-distributed-systems, Module 13-cqrs-event-sourcing_

**CRDT** — Structure de donnees repliquee sans conflit (Conflict-free Replicated Data Type) qui converge automatiquement entre les noeuds. → _13-distributed-systems, Module 23-crdts-résolution-conflits_

**CSP (Content Security Policy)** — En-tete HTTP qui définit les sources autorisees pour les scripts, styles, images, etc., protegeant contre les injections XSS. → _09-http-caching, Module 18-devsecops-owasp_

**CTE (Common Table Expression)** — Sous-requête nommee (`WITH ... AS`) qui ameliore la lisibilite et permet la recursivite en SQL. → _08-postgresql, Module 12-fonctions-avancees-sql_

## D

**Deadlock** — Blocage mutuel ou deux transactions attendent chacune le verrou detenu par l'autre, necessitant l'annulation de l'une d'elles. → _08-postgresql, Module 10-deadlocks_

**Decorator (TypeScript)** — Annotation (@) qui enrichit une classe, méthode ou propriété avec des metadonnees ou du comportement. Fondamental dans NestJS et Angular. → _00-typescript, Module 14-decorateurs-metadata_

**DI (Dependency Injection)** — Pattern d'inversion de controle ou les dépendances sont injectees plutot que creees, facilitant le test et le decouplage. → _07-nestjs, Module 11-nestjs-providers-di_

**Discriminated Union** — Union de types TypeScript avec un champ discriminant literal commun, permettant un narrowing exhaustif via switch/if. → _00-typescript, Module 04-unions-intersections-narrowing_

**Distributed Tracing** — Suivi d'une requête a travers les différents services d'un système distribue via des identifiants de trace et de span. → _12-observability-sre, Module 07-distributed-tracing_

**Docker** — Plateforme de conteneurisation qui empaquete une application et ses dépendances dans une image portable et reproductible. → _cheat-sheets/phase-de-infra_

**DORA Metrics** — Quatre metriques clés de performance DevOps : frequence de déploiement, lead time, MTTR, taux d'echec. → _12-observability-sre, Module 16-dora-metrics_

## E

**Error Budget** — Quantite d'indisponibilite toleree pour un service, calculee comme 1 - SLO. Tant qu'il reste du budget, on peut prendre des risques. → _12-observability-sre, Module 10-sli-slo-sla_

**ETag** — En-tete HTTP de validation conditionnelle : empreinte du contenu qui permet au client de vérifier si la ressource a change (If-None-Match). → _09-http-caching, Module 05-etag-validation-conditionnelle_

**Event Loop** — Boucle qui orchestre l'exécution du code JS, les callbacks I/O, les microtasks et les macrotasks dans un runtime single-threaded. → _01-js-runtime, Module 03-event-loop_

**Event Sourcing** — Pattern ou l'état est dérivé d'une sequence immuable d'événements plutot que stocke directement. → _13-distributed-systems, Module 13-cqrs-event-sourcing_

**Eviction Policy (Redis)** — Stratégie de suppression des clés lorsque la mémoire maximale est atteinte (LRU, LFU, TTL, random). → _09-http-caching, Module 19-redis-cache-applicatif_

## F

**Fiber (React)** — Unite de travail interne de React representant un noeud du Virtual DOM, permettant le rendu interruptible et la priorisation. → _04-react, Cours 08-performance-patterns/01-performance-react_

**FinalizationRegistry** — API JS qui enregistre un callback invoque quand un objet est collecte par le garbage collector. → _01-js-runtime, Module 07-garbage-collector_

**Fixture** — Donnees ou état predetermine utilise pour initialiser un test de manière reproductible. → _06-testing, Module 02-anatomie-dun-test_

## G

**Gauge** — Type de metrique qui represente une valeur instantanee pouvant monter et descendre (ex: nombre de connexions actives). → _12-observability-sre, Module 04-introduction-metriques_

**Generics** — Parametres de type qui permettent d'écrire des fonctions, classes ou interfaces réutilisables sans sacrifier la sécurité de typage. → _00-typescript, Module 06-generics-fondamentaux_

**GIN (Generalized Inverted Index)** — Index PostgreSQL optimise pour les recherches full-text, les tableaux et les donnees JSONB. → _08-postgresql, Module 07-index-avances_

**GitHub Actions** — Service CI/CD intégré a GitHub qui exécuté des workflows automatises sur des événements (push, PR, schedule). → _06-testing, Module 13-tests-en-ci-cd_

**Guard (NestJS)** — Classe qui déterminé si une requête est autorisee a atteindre le handler (authentification, roles, permissions). → _07-nestjs, Module 13-nestjs-pipes-guards-interceptors_

## H

**Hidden Classes** — Structures internes de V8 qui optimisent l'acces aux propriétés des objets en creant des classes cachees au runtime. → _01-js-runtime, Module 11-hidden-classes-inline-caching_

**Histogram** — Type de metrique qui mesure la distribution des valeurs dans des buckets predefinis (ex: latence des requêtes). → _12-observability-sre, Module 04-introduction-metriques_

**Hoisting** — Comportement JS ou les declarations de variables (var) et fonctions sont remontees en haut de leur scope avant l'exécution. → _01-js-runtime, Module 02-scope-closures-memory_

**HSTS** — En-tete HTTP (Strict-Transport-Security) qui force le navigateur à utiliser uniquement HTTPS pour un domaine donne. → _09-http-caching, Module 17-tls-https_

**HTTP/2 Multiplexing** — Capacité de HTTP/2 a envoyer plusieurs requêtes/réponses en parallele sur une seule connexion TCP via des streams. → _09-http-caching, Module 02-http2-http3_

**Hydration** — Processus cote client qui attache les event listeners et l'interactivite a du HTML pre-rendu par le serveur (SSR). → _04-react, Cours 06-nextjs/02-server-components_

## I

**Idempotency** — Propriété d'une operation qui produit le même résultat quel que soit le nombre de fois ou elle est executee. → _13-distributed-systems, Module 09-retries-timeouts-idempotency_

**Inline Caching** — Optimisation V8 qui memorise le type d'un objet à un point d'acces pour accelerer les acces subsequents. → _01-js-runtime, Module 11-hidden-classes-inline-caching_

**Interceptor (NestJS)** — Classe qui s'exécuté avant et après le handler pour transformer la réponse, ajouter du cache, du logging, etc. → _07-nestjs, Module 13-nestjs-pipes-guards-interceptors_

**Interceptor (Angular)** — Fonction qui intercepte les requêtes HTTP sortantes et les réponses entrantes pour ajouter des en-tetes, gérer les erreurs, etc. → _03-angular, Cours 06-http-api/02-interceptors_

## J

**JIT Compilation** — Compilation "juste a temps" par V8 : le code JS est compile en code machine natif a l'exécution pour les hot paths. → _01-js-runtime, Module 10-jit-compilation-optimization_

## L

**Lambda (AWS)** — Service serverless qui exécuté du code en réponse a des événements sans gérer de serveurs, facture à la milliseconde. → _10-aws-cloud, Module 06-lambda-serverless_

## M

**MELT** — Acronyme pour les quatre piliers de l'observabilité : Metrics, Events, Logs, Traces. → _12-observability-sre, Module 01-pourquoi-observabilité_

**Microtask** — Tache de haute priorite dans l'event loop (Promises, queueMicrotask) executee avant les macrotasks à chaque tick. → _01-js-runtime, Module 04-microtasks-macrotasks_

**Middleware (NestJS/Express)** — Fonction executee avant le handler de route pour transformer la requête, logger, authentifier, etc. → _07-nestjs, Module 06-express-middleware_

**Mock / Stub / Spy** — Test doubles : un mock vérifié les interactions, un stub retourne des valeurs predefinies, un spy observe les appels sans les remplacer. → _06-testing, Module 04-mocking-et-test-doubles_

**Module (NestJS)** — Unite d'organisation qui regroupe controllers, providers et imports dans un contexte d'injection de dépendances. → _07-nestjs, Module 12-nestjs-modules_

**MSW (Mock Service Worker)** — Librairie qui intercepte les requêtes HTTP au niveau du Service Worker pour simuler des API dans les tests. → _06-testing, Module 08-msw-mock-service-worker_

**Mutation Testing** — Technique qui introduit des mutations dans le code source pour vérifier que les tests les detectent (mesurant la qualite des tests). → _06-testing, Module 12-couverture-et-mutation-testing_

**MVCC** — Controle de concurrence multi-version : PostgreSQL conserve plusieurs versions de chaque ligne pour permettre des lectures sans verrou. → _08-postgresql, Module 08-niveaux-isolation_

## N

**Narrowing (TypeScript)** — Reduction du type d'une variable via des gardes de type (typeof, instanceof, in, discriminants) dans une branche de code. → _00-typescript, Module 04-unions-intersections-narrowing_

## O

**OIDC (OpenID Connect)** — Protocole d'authentification bati sur OAuth 2.0 qui fournit l'identite de l'utilisateur via un ID token JWT. → _10-aws-cloud, Module 11-cognito-authentification_

**OpenTelemetry (OTel)** — Standard open-source d'instrumentation pour collecter traces, metriques et logs de manière unifiee et vendor-agnostic. → _12-observability-sre, Module 08-otel-collector-pipeline_

**Outbox Pattern** — Pattern ou les événements sont ecrits dans une table "outbox" en même temps que la transaction, puis publies de manière fiable. → _13-distributed-systems, Module 14-outbox-pattern-reliable-messaging_

## P

**Partitioning** — Division d'une grande table en sous-tables (partitions) basees sur une clé (range, list, hash) pour ameliorer les performances. → _08-postgresql, Module 18-partitioning-et-scaling_

**Pinia** — Store officiel de Vue 3, basee sur la Composition API, avec un support TypeScript natif et une API simple (state, getters, actions). → _02-vue, Cours 03-avance/02-pinia_

**Pipe (NestJS)** — Classe qui valide et/où transforme les donnees entrantes avant qu'elles n'atteignent le handler du controller. → _07-nestjs, Module 13-nestjs-pipes-guards-interceptors_

**Pipeline (Redis)** — Technique qui envoie plusieurs commandes en batch sans attendre chaque réponse, reduisant la latence réseau. → _09-http-caching, Module 19-redis-cache-applicatif_

**Property-based Testing** — Approche de test ou des propriétés invariantes sont verifiees sur des entrees generees aleatoirement (ex: fast-check). → _06-testing, Module 15-tdd-et-bdd_

**Prototype Chain** — Mécanisme d'héritage JS ou les objets delegent les acces de propriétés non trouvees a leur prototype parent, en chaine. → _01-js-runtime, Module 02-scope-closures-memory_

**Provider (NestJS)** — Toute classe injectable via le système DI de NestJS : services, repositories, factories, helpers. → _07-nestjs, Module 11-nestjs-providers-di_

**Provide/Inject (Vue)** — Mécanisme de partage de donnees entre un composant parent et ses descendants sans passer par les props à chaque niveau. → _02-vue, Cours 01-débutant/05-composants-props-emits_

**Proxy (JS)** — Objet qui enveloppe un autre objet et intercepte les operations fondamentales (get, set, has, deleteProperty, etc.). Fondement de la réactivité Vue 3. → _02-vue, Cours 01-débutant/03-réactivité_

**Pub/Sub (Redis)** — Patron de messagerie ou les publishers envoient des messages sur des channels et les subscribers les recoivent en temps réel. → _09-http-caching, Module 19-redis-cache-applicatif_

## Q

**QUIC** — Protocole de transport bati sur UDP qui fournit le multiplexing et la sécurité TLS 1.3, fondation de HTTP/3. → _09-http-caching, Module 02-http2-http3_

**Query Planner** — Composant de PostgreSQL qui analyse les requêtes SQL et choisit le plan d'exécution le plus efficace (Seq Scan, Index Scan, etc.). → _08-postgresql, Module 06-query-planner_

## R

**RAG (Retrieval-Augmented Génération)** — Architecture IA qui enrichit le prompt d'un LLM avec des documents pertinents recuperes depuis une base vectorielle. → _14-ia, Module 13-rag-fondamental_

**Reactivity (Vue, Proxy-based)** — Système réactif de Vue 3 base sur des Proxy JS qui détecté automatiquement les dépendances et met a jour le DOM. → _02-vue, Cours 01-débutant/03-réactivité_

**Reconciliation (React)** — Algorithme de diffing qui compare le Virtual DOM précédent et le nouveau pour calculer le minimum de mutations DOM nécessaires. → _04-react, Cours 08-performance-patterns/01-performance-react_

**Reflect** — Objet global JS qui fournit des méthodes pour les operations interceptables (get, set, has, etc.), souvent utilise avec Proxy. → _00-typescript, Module 14-decorateurs-metadata_

**Resolver (Angular)** — Fonction executee avant l'activation d'une route pour pre-charger les donnees nécessaires au composant. → _03-angular, Cours 04-routing/02-paramètres-et-data_

**RSC Payload** — Donnees serialisees envoyees par le serveur pour les React Server Components, permettant au client de reconstruire l'arbre de composants sans rebundler. → _04-react, Cours 06-nextjs/02-server-components_

## S

**S3 (AWS)** — Service de stockage objet d'AWS, hautement durable (99.999999999%), utilise pour les assets statiques, backups et data lakes. → _10-aws-cloud, Module 04-s3-stockage-objets_

**Saga** — Pattern de gestion de transactions distribuees via une sequence de transactions locales, chacune avec une compensation en cas d'echec. → _13-distributed-systems, Module 12-transactions-distribuees-saga_

**Sentinel (Redis)** — Système de haute disponibilité qui monitore les instances Redis, détecté les pannes et orchestre le failover automatique. → _09-http-caching, Module 19-redis-cache-applicatif_

**Server Components (React)** — Composants React executes uniquement cote serveur, reduisant le bundle JS client et permettant l'acces direct aux donnees. → _04-react, Cours 06-nextjs/02-server-components_

**Signals (Angular)** — Primitives réactives d'Angular qui remplacent progressivement Zone.js pour une detection de changement plus granulaire et performante. → _03-angular, Cours 01-composants-templates/02-signaux-base_

**SLA** — Engagement contractuel de niveau de service entre un fournisseur et un client (ex: 99.9% de disponibilité). → _12-observability-sre, Module 10-sli-slo-sla_

**SLI** — Indicateur mesurable de la qualite de service (ex: proportion de requêtes < 200ms). → _12-observability-sre, Module 10-sli-slo-sla_

**SLO** — Objectif interne de niveau de service, seuil cible pour un SLI (ex: 99.5% des requêtes < 200ms sur 30 jours). → _12-observability-sre, Module 10-sli-slo-sla_

**SNI (Server Name Indication)** — Extension TLS qui permet à un serveur d'heberger plusieurs certificats SSL sur une même adresse IP. → _09-http-caching, Module 17-tls-https_

**Snapshot Testing** — Technique de test qui serialise la sortie d'un composant et la compare à un instantane de référence enregistre. → _06-testing, Module 07-tests-de-composants_

**Span** — Unite de travail au sein d'une trace distribuee, representant une operation (requête HTTP, query SQL, appel gRPC). → _12-observability-sre, Module 07-distributed-tracing_

**SST** — Framework open-source pour déployer des applications fullstack sur AWS avec une DX moderne (SSR, Lambda, CDK intégré). → _10-aws-cloud, Module 19-déployer-nuxt-next-aws_

**Standalone Components (Angular)** — Composants Angular autonomes declares sans NgModule, simplifiant l'architecture et le tree-shaking. → _03-angular, Cours 01-composants-templates/01-composants-standalone_

**Stale-while-revalidate** — Directive Cache-Control qui sert le cache perime immediatement tout en revalidant en arriere-plan. → _09-http-caching, Module 06-stale-while-revalidate_

**Suspense (React)** — Mécanisme qui permet a React d'afficher un fallback pendant le chargement de composants lazy ou de donnees asynchrones. → _04-react, Cours 08-performance-patterns/03-error-boundaries-suspense_

## T

**Teleport (Vue)** — Fonctionnalite qui rend le contenu d'un composant dans un autre noeud DOM, utile pour les modales et overlays. → _02-vue, Cours 02-intermédiaire/05-slots-avances_

**TLS** — Protocole de chiffrement qui sécurisé les communications HTTP (HTTPS), assurant confidentialite, integrite et authentification. → _09-http-caching, Module 17-tls-https_

**Trace** — Parcours complet d'une requête a travers un système, compose d'un ensemble de spans lies par un trace ID commun. → _12-observability-sre, Module 07-distributed-tracing_

**Type Narrowing** — Voir **Narrowing**. Technique TypeScript pour affiner un type large vers un type plus précis dans une branche conditionnelle. → _00-typescript, Module 04-unions-intersections-narrowing_

## U

**Utility Types** — Types predefined de TypeScript (Partial, Required, Pick, Omit, Record, etc.) qui transforment d'autres types. → _00-typescript, Module 10-utility-types_

## V

**VACUUM** — Processus PostgreSQL qui récupéré l'espace disque occupe par les lignes mortes (tuples invisibles) laissees par les transactions. → _08-postgresql, Module 11-performances-et-optimisation_

**Vapor Mode (Vue)** — Mode de compilation experimental de Vue qui généré du code DOM direct sans Virtual DOM, pour de meilleures performances. → _02-vue, Cours 04-expert/01-performance_

**Virtual DOM** — Representation en mémoire (arbre d'objets JS) du DOM réel, utilisee par React et Vue pour calculer les diffs de manière efficace. → _04-react, Cours 08-performance-patterns/01-performance-react_

## W

**WAL (Write-Ahead Log)** — Journal de PostgreSQL ou chaque modification est ecrite avant d'etre appliquee aux fichiers de donnees, garantissant la durabilite. → _08-postgresql, Module 04-transactions-et-acid_

**WeakRef** — Référence faible à un objet JS qui n'empeche pas sa collecte par le garbage collector, utile pour les caches. → _01-js-runtime, Module 07-garbage-collector_

**Window Function** — Fonction SQL qui effectue un calcul sur un ensemble de lignes liees à la ligne courante (OVER, PARTITION BY, ROW_NUMBER, etc.). → _08-postgresql, Module 12-fonctions-avancees-sql_

**Write-through** — Stratégie de cache ou chaque écriture est propagee simultanement au cache et à la base de donnees source. → _09-http-caching, Module 19-redis-cache-applicatif_

## Z

**Zone.js (Angular)** — Librairie qui patche les API asynchrones du navigateur pour declencher automatiquement la detection de changement d'Angular. → _03-angular, Cours 01-composants-templates/08-defer-et-zoneless_

**@defer (Angular)** — Directive de template qui differe le chargement et le rendu d'un bloc de composants jusqu'à une condition (viewport, idle, interaction). → _03-angular, Cours 01-composants-templates/08-defer-et-zoneless_

---

> **Legende des cours** :
>
> - `00-typescript` — TypeScript
> - `01-js-runtime` — JS Runtime & V8 Internals
> - `02-vue` — Vue 3 / Nuxt 3
> - `03-angular` — Angular
> - `04-react` — React / Next.js
> - `05-algorithms` — Algorithms
> - `06-testing` — Testing (Vitest, Playwright, MSW)
> - `07-nestjs` — Node.js, Express & NestJS
> - `08-postgresql` — PostgreSQL
> - `09-http-caching` — HTTP, Caching, TLS, Redis, OWASP
> - `10-aws-cloud` — AWS Cloud
> - `11-architecture` — Architecture logicielle
> - `12-observability-sre` — Observabilité & SRE
> - `13-distributed-systems` — Systèmes distribues
> - `14-ia` — IA & LLMs pour développeurs
> - `15-react-native` — React Native
> - `16-webgpu-3d` — WebGPU & 3D
