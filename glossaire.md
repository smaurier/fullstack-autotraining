# Glossaire unifie du curriculum Fullstack JS

> Definitions concises des termes techniques clés couverts par les 16 cours du cursus.
> Format : **Terme** — Definition. → *Cours XX, Module YY*

---

## A

**ACID** — Proprietes des transactions relationnelles : Atomicite, Coherence, Isolation, Durabilite. Garantit la fiabilité des operations en base. → *08-postgresql, Module 04-transactions-et-acid*

**API Gateway** — Point d'entree unique qui route, filtre et transforme les requêtes vers les microservices sous-jacents. → *13-distributed-systems, Module 08-api-gateway-et-bff*

**Async/Await** — Syntaxe declarative pour écrire du code asynchrone sequentiel, compilee en machine a états par le moteur JS. → *04-js-runtime, Module 06-async-await-under-the-hood*

## B

**B-tree** — Structure d'index par defaut dans PostgreSQL, optimisee pour les comparaisons d'egalite et de plage (>, <, BETWEEN). → *08-postgresql, Module 05-index-fondamentaux*

**Backpressure** — Mécanisme de controle de flux qui ralentit le producteur lorsque le consommateur ne peut pas suivre le debit. → *13-distributed-systems, Module 22-stream-processing-event-streaming*

**BFF (Backend for Frontend)** — Variante de l'API Gateway ou chaque client (web, mobile) a son propre backend dedie. → *13-distributed-systems, Module 08-api-gateway-et-bff*

**Bulkhead** — Pattern d'isolation qui cloisonne les ressources (threads, connexions) pour empecher une defaillance de se propager. → *13-distributed-systems, Module 15-failure-modes*

## C

**Cache-aside** — Stratégie de cache ou l'application lit d'abord le cache, puis la source en cas de miss, et met a jour le cache. → *09-http-caching, Module 19-redis-cache-applicatif*

**Cache-Control** — En-tete HTTP qui définit les directives de mise en cache (max-age, no-cache, stale-while-revalidate, etc.). → *09-http-caching, Module 04-cache-control*

**CAP (théorème)** — Dans un système distribue, on ne peut garantir simultanement Coherence, Disponibilité et Tolerance aux partitions. → *13-distributed-systems, Module 10-coherence-et-théorème-cap*

**CDK (AWS)** — Framework d'infrastructure-as-code qui permet de définir des ressources AWS en TypeScript. → *10-aws-cloud, Module 05-cdk-infrastructure-code*

**CDN** — Réseau de serveurs edge qui met en cache le contenu statique au plus pres de l'utilisateur final. → *09-http-caching, Module 08-cdn*

**Change Detection (Angular)** — Mécanisme qui détecté les changements d'état et met a jour le DOM. Historiquement via Zone.js, migre vers les Signals. → *02-angular, Cours 01-composants-templates/08-defer-et-zoneless*

**CI/CD** — Intégration continue et déploiement continu : pipeline automatisee de build, test et déploiement. → *06-testing, Module 13-tests-en-ci-cd*

**Circuit Breaker** — Pattern de résilience qui coupe les appels vers un service defaillant après un seuil d'erreurs, evitant l'effet cascade. → *13-distributed-systems, Module 16-circuit-breaker*

**CloudFront** — CDN d'AWS qui distribue le contenu statique et dynamique via un réseau mondial de points de presence. → *10-aws-cloud, Module 13-cloudfront-cdn*

**Closure** — Fonction qui capture et conserve une référence a l'environnement lexical (variables) dans lequel elle a ete definie. → *04-js-runtime, Module 02-scope-closures-memory*

**Composable (Vue)** — Fonction réutilisable qui encapsule de la logique réactive via la Composition API (équivalent des custom hooks React). → *01-vue, Cours 02-intermédiaire/02-composables*

**Composition API (Vue)** — API fonctionnelle de Vue 3 (setup, ref, computed, watch) qui remplace l'Options API pour une meilleure reutilisation de la logique. → *01-vue, Cours 02-intermédiaire/01-composition-api-avancee*

**Computed** — Valeur derivee qui se recalcule automatiquement lorsque ses dépendances réactives changent (Vue, Angular). → *01-vue, Cours 01-débutant/03-réactivité*

**Concurrent Mode (React)** — Modèle de rendu qui permet a React d'interrompre et de reprendre le travail de rendu pour garder l'UI responsive. → *00-react, Cours 08-performance-patterns/04-react-19-nouveautes*

**Connection Pool** — Ensemble pre-etabli de connexions à la base de donnees reutilisees entre les requêtes pour éviter le cout d'ouverture/fermeture. → *08-postgresql, Module 11-performances-et-optimisation*

**Container (Docker)** — Instance isolee et legere d'une image Docker, partageant le noyau de l'hote mais avec son propre filesystem et réseau. → *cheat-sheets/phase-de-infra*

**CORS** — Mécanisme du navigateur qui restreint les requêtes cross-origin via des en-tetes HTTP (Access-Control-Allow-Origin, etc.). → *09-http-caching, Module 03-en-tetes-http*

**Coverage** — Mesure du pourcentage de code source exécuté par les tests (lignes, branches, fonctions). → *06-testing, Module 12-couverture-et-mutation-testing*

**CQRS** — Separation des responsabilites de lecture (Query) et d'écriture (Command) dans des modèles distincts. → *13-distributed-systems, Module 13-cqrs-event-sourcing*

**CRDT** — Structure de donnees repliquee sans conflit (Conflict-free Replicated Data Type) qui converge automatiquement entre les noeuds. → *13-distributed-systems, Module 23-crdts-résolution-conflits*

**CSP (Content Security Policy)** — En-tete HTTP qui définit les sources autorisees pour les scripts, styles, images, etc., protegeant contre les injections XSS. → *09-http-caching, Module 18-devsecops-owasp*

**CTE (Common Table Expression)** — Sous-requête nommee (`WITH ... AS`) qui ameliore la lisibilite et permet la recursivite en SQL. → *08-postgresql, Module 12-fonctions-avancees-sql*

## D

**Deadlock** — Blocage mutuel ou deux transactions attendent chacune le verrou detenu par l'autre, necessitant l'annulation de l'une d'elles. → *08-postgresql, Module 10-deadlocks*

**Decorator (TypeScript)** — Annotation (@) qui enrichit une classe, méthode ou propriété avec des metadonnees ou du comportement. Fondamental dans NestJS et Angular. → *03-typescript, Module 14-decorateurs-metadata*

**DI (Dependency Injection)** — Pattern d'inversion de controle ou les dépendances sont injectees plutot que creees, facilitant le test et le decouplage. → *07-nestjs, Module 11-nestjs-providers-di*

**Discriminated Union** — Union de types TypeScript avec un champ discriminant literal commun, permettant un narrowing exhaustif via switch/if. → *03-typescript, Module 04-unions-intersections-narrowing*

**Distributed Tracing** — Suivi d'une requête a travers les différents services d'un système distribue via des identifiants de trace et de span. → *12-observability-sre, Module 07-distributed-tracing*

**Docker** — Plateforme de conteneurisation qui empaquete une application et ses dépendances dans une image portable et reproductible. → *cheat-sheets/phase-de-infra*

**DORA Metrics** — Quatre metriques clés de performance DevOps : frequence de déploiement, lead time, MTTR, taux d'echec. → *12-observability-sre, Module 16-dora-metrics*

## E

**Error Budget** — Quantite d'indisponibilite toleree pour un service, calculee comme 1 - SLO. Tant qu'il reste du budget, on peut prendre des risques. → *12-observability-sre, Module 10-sli-slo-sla*

**ETag** — En-tete HTTP de validation conditionnelle : empreinte du contenu qui permet au client de vérifier si la ressource a change (If-None-Match). → *09-http-caching, Module 05-etag-validation-conditionnelle*

**Event Loop** — Boucle qui orchestre l'exécution du code JS, les callbacks I/O, les microtasks et les macrotasks dans un runtime single-threaded. → *04-js-runtime, Module 03-event-loop*

**Event Sourcing** — Pattern ou l'état est dérivé d'une sequence immuable d'événements plutot que stocke directement. → *13-distributed-systems, Module 13-cqrs-event-sourcing*

**Eviction Policy (Redis)** — Stratégie de suppression des clés lorsque la mémoire maximale est atteinte (LRU, LFU, TTL, random). → *09-http-caching, Module 19-redis-cache-applicatif*

## F

**Fiber (React)** — Unite de travail interne de React representant un noeud du Virtual DOM, permettant le rendu interruptible et la priorisation. → *00-react, Cours 08-performance-patterns/01-performance-react*

**FinalizationRegistry** — API JS qui enregistre un callback invoque quand un objet est collecte par le garbage collector. → *04-js-runtime, Module 07-garbage-collector*

**Fixture** — Donnees ou état predetermine utilise pour initialiser un test de manière reproductible. → *06-testing, Module 02-anatomie-dun-test*

## G

**Gauge** — Type de metrique qui represente une valeur instantanee pouvant monter et descendre (ex: nombre de connexions actives). → *12-observability-sre, Module 04-introduction-metriques*

**Generics** — Parametres de type qui permettent d'écrire des fonctions, classes ou interfaces réutilisables sans sacrifier la sécurité de typage. → *03-typescript, Module 06-generics-fondamentaux*

**GIN (Generalized Inverted Index)** — Index PostgreSQL optimise pour les recherches full-text, les tableaux et les donnees JSONB. → *08-postgresql, Module 07-index-avances*

**GitHub Actions** — Service CI/CD intégré a GitHub qui exécuté des workflows automatises sur des événements (push, PR, schedule). → *06-testing, Module 13-tests-en-ci-cd*

**Guard (NestJS)** — Classe qui déterminé si une requête est autorisee a atteindre le handler (authentification, roles, permissions). → *07-nestjs, Module 13-nestjs-pipes-guards-interceptors*

## H

**Hidden Classes** — Structures internes de V8 qui optimisent l'acces aux propriétés des objets en creant des classes cachees au runtime. → *04-js-runtime, Module 11-hidden-classes-inline-caching*

**Histogram** — Type de metrique qui mesure la distribution des valeurs dans des buckets predefinis (ex: latence des requêtes). → *12-observability-sre, Module 04-introduction-metriques*

**Hoisting** — Comportement JS ou les declarations de variables (var) et fonctions sont remontees en haut de leur scope avant l'exécution. → *04-js-runtime, Module 02-scope-closures-memory*

**HSTS** — En-tete HTTP (Strict-Transport-Security) qui force le navigateur à utiliser uniquement HTTPS pour un domaine donne. → *09-http-caching, Module 17-tls-https*

**HTTP/2 Multiplexing** — Capacité de HTTP/2 a envoyer plusieurs requêtes/réponses en parallele sur une seule connexion TCP via des streams. → *09-http-caching, Module 02-http2-http3*

**Hydration** — Processus cote client qui attache les event listeners et l'interactivite a du HTML pre-rendu par le serveur (SSR). → *00-react, Cours 06-nextjs/02-server-components*

## I

**Idempotency** — Propriété d'une operation qui produit le même résultat quel que soit le nombre de fois ou elle est executee. → *13-distributed-systems, Module 09-retries-timeouts-idempotency*

**Inline Caching** — Optimisation V8 qui memorise le type d'un objet à un point d'acces pour accelerer les acces subsequents. → *04-js-runtime, Module 11-hidden-classes-inline-caching*

**Interceptor (NestJS)** — Classe qui s'exécuté avant et après le handler pour transformer la réponse, ajouter du cache, du logging, etc. → *07-nestjs, Module 13-nestjs-pipes-guards-interceptors*

**Interceptor (Angular)** — Fonction qui intercepte les requêtes HTTP sortantes et les réponses entrantes pour ajouter des en-tetes, gérer les erreurs, etc. → *02-angular, Cours 06-http-api/02-interceptors*

## J

**JIT Compilation** — Compilation "juste a temps" par V8 : le code JS est compile en code machine natif a l'exécution pour les hot paths. → *04-js-runtime, Module 10-jit-compilation-optimization*

## L

**Lambda (AWS)** — Service serverless qui exécuté du code en réponse a des événements sans gérer de serveurs, facture à la milliseconde. → *10-aws-cloud, Module 06-lambda-serverless*

## M

**MELT** — Acronyme pour les quatre piliers de l'observabilité : Metrics, Events, Logs, Traces. → *12-observability-sre, Module 01-pourquoi-observabilité*

**Microtask** — Tache de haute priorite dans l'event loop (Promises, queueMicrotask) executee avant les macrotasks à chaque tick. → *04-js-runtime, Module 04-microtasks-macrotasks*

**Middleware (NestJS/Express)** — Fonction executee avant le handler de route pour transformer la requête, logger, authentifier, etc. → *07-nestjs, Module 06-express-middleware*

**Mock / Stub / Spy** — Test doubles : un mock vérifié les interactions, un stub retourne des valeurs predefinies, un spy observe les appels sans les remplacer. → *06-testing, Module 04-mocking-et-test-doubles*

**Module (NestJS)** — Unite d'organisation qui regroupe controllers, providers et imports dans un contexte d'injection de dépendances. → *07-nestjs, Module 12-nestjs-modules*

**MSW (Mock Service Worker)** — Librairie qui intercepte les requêtes HTTP au niveau du Service Worker pour simuler des API dans les tests. → *06-testing, Module 08-msw-mock-service-worker*

**Mutation Testing** — Technique qui introduit des mutations dans le code source pour vérifier que les tests les detectent (mesurant la qualite des tests). → *06-testing, Module 12-couverture-et-mutation-testing*

**MVCC** — Controle de concurrence multi-version : PostgreSQL conserve plusieurs versions de chaque ligne pour permettre des lectures sans verrou. → *08-postgresql, Module 08-niveaux-isolation*

## N

**Narrowing (TypeScript)** — Reduction du type d'une variable via des gardes de type (typeof, instanceof, in, discriminants) dans une branche de code. → *03-typescript, Module 04-unions-intersections-narrowing*

## O

**OIDC (OpenID Connect)** — Protocole d'authentification bati sur OAuth 2.0 qui fournit l'identite de l'utilisateur via un ID token JWT. → *10-aws-cloud, Module 11-cognito-authentification*

**OpenTelemetry (OTel)** — Standard open-source d'instrumentation pour collecter traces, metriques et logs de manière unifiee et vendor-agnostic. → *12-observability-sre, Module 08-otel-collector-pipeline*

**Outbox Pattern** — Pattern ou les événements sont ecrits dans une table "outbox" en même temps que la transaction, puis publies de manière fiable. → *13-distributed-systems, Module 14-outbox-pattern-reliable-messaging*

## P

**Partitioning** — Division d'une grande table en sous-tables (partitions) basees sur une clé (range, list, hash) pour ameliorer les performances. → *08-postgresql, Module 18-partitioning-et-scaling*

**Pinia** — Store officiel de Vue 3, basee sur la Composition API, avec un support TypeScript natif et une API simple (state, getters, actions). → *01-vue, Cours 03-avance/02-pinia*

**Pipe (NestJS)** — Classe qui valide et/où transforme les donnees entrantes avant qu'elles n'atteignent le handler du controller. → *07-nestjs, Module 13-nestjs-pipes-guards-interceptors*

**Pipeline (Redis)** — Technique qui envoie plusieurs commandes en batch sans attendre chaque réponse, reduisant la latence réseau. → *09-http-caching, Module 19-redis-cache-applicatif*

**Property-based Testing** — Approche de test ou des propriétés invariantes sont verifiees sur des entrees generees aleatoirement (ex: fast-check). → *06-testing, Module 15-tdd-et-bdd*

**Prototype Chain** — Mécanisme d'héritage JS ou les objets delegent les acces de propriétés non trouvees a leur prototype parent, en chaine. → *04-js-runtime, Module 02-scope-closures-memory*

**Provider (NestJS)** — Toute classe injectable via le système DI de NestJS : services, repositories, factories, helpers. → *07-nestjs, Module 11-nestjs-providers-di*

**Provide/Inject (Vue)** — Mécanisme de partage de donnees entre un composant parent et ses descendants sans passer par les props à chaque niveau. → *01-vue, Cours 01-débutant/05-composants-props-emits*

**Proxy (JS)** — Objet qui enveloppe un autre objet et intercepte les operations fondamentales (get, set, has, deleteProperty, etc.). Fondement de la réactivité Vue 3. → *01-vue, Cours 01-débutant/03-réactivité*

**Pub/Sub (Redis)** — Patron de messagerie ou les publishers envoient des messages sur des channels et les subscribers les recoivent en temps réel. → *09-http-caching, Module 19-redis-cache-applicatif*

## Q

**QUIC** — Protocole de transport bati sur UDP qui fournit le multiplexing et la sécurité TLS 1.3, fondation de HTTP/3. → *09-http-caching, Module 02-http2-http3*

**Query Planner** — Composant de PostgreSQL qui analyse les requêtes SQL et choisit le plan d'exécution le plus efficace (Seq Scan, Index Scan, etc.). → *08-postgresql, Module 06-query-planner*

## R

**RAG (Retrieval-Augmented Génération)** — Architecture IA qui enrichit le prompt d'un LLM avec des documents pertinents recuperes depuis une base vectorielle. → *14-ia, Module 13-rag-fondamental*

**Reactivity (Vue, Proxy-based)** — Système réactif de Vue 3 base sur des Proxy JS qui détecté automatiquement les dépendances et met a jour le DOM. → *01-vue, Cours 01-débutant/03-réactivité*

**Reconciliation (React)** — Algorithme de diffing qui compare le Virtual DOM précédent et le nouveau pour calculer le minimum de mutations DOM nécessaires. → *00-react, Cours 08-performance-patterns/01-performance-react*

**Reflect** — Objet global JS qui fournit des méthodes pour les operations interceptables (get, set, has, etc.), souvent utilise avec Proxy. → *03-typescript, Module 14-decorateurs-metadata*

**Resolver (Angular)** — Fonction executee avant l'activation d'une route pour pre-charger les donnees nécessaires au composant. → *02-angular, Cours 04-routing/02-paramètres-et-data*

**RSC Payload** — Donnees serialisees envoyees par le serveur pour les React Server Components, permettant au client de reconstruire l'arbre de composants sans rebundler. → *00-react, Cours 06-nextjs/02-server-components*

## S

**S3 (AWS)** — Service de stockage objet d'AWS, hautement durable (99.999999999%), utilise pour les assets statiques, backups et data lakes. → *10-aws-cloud, Module 04-s3-stockage-objets*

**Saga** — Pattern de gestion de transactions distribuees via une sequence de transactions locales, chacune avec une compensation en cas d'echec. → *13-distributed-systems, Module 12-transactions-distribuees-saga*

**Sentinel (Redis)** — Système de haute disponibilité qui monitore les instances Redis, détecté les pannes et orchestre le failover automatique. → *09-http-caching, Module 19-redis-cache-applicatif*

**Server Components (React)** — Composants React executes uniquement cote serveur, reduisant le bundle JS client et permettant l'acces direct aux donnees. → *00-react, Cours 06-nextjs/02-server-components*

**Signals (Angular)** — Primitives réactives d'Angular qui remplacent progressivement Zone.js pour une detection de changement plus granulaire et performante. → *02-angular, Cours 01-composants-templates/02-signaux-base*

**SLA** — Engagement contractuel de niveau de service entre un fournisseur et un client (ex: 99.9% de disponibilité). → *12-observability-sre, Module 10-sli-slo-sla*

**SLI** — Indicateur mesurable de la qualite de service (ex: proportion de requêtes < 200ms). → *12-observability-sre, Module 10-sli-slo-sla*

**SLO** — Objectif interne de niveau de service, seuil cible pour un SLI (ex: 99.5% des requêtes < 200ms sur 30 jours). → *12-observability-sre, Module 10-sli-slo-sla*

**SNI (Server Name Indication)** — Extension TLS qui permet à un serveur d'heberger plusieurs certificats SSL sur une même adresse IP. → *09-http-caching, Module 17-tls-https*

**Snapshot Testing** — Technique de test qui serialise la sortie d'un composant et la compare à un instantane de référence enregistre. → *06-testing, Module 07-tests-de-composants*

**Span** — Unite de travail au sein d'une trace distribuee, representant une operation (requête HTTP, query SQL, appel gRPC). → *12-observability-sre, Module 07-distributed-tracing*

**SST** — Framework open-source pour déployer des applications fullstack sur AWS avec une DX moderne (SSR, Lambda, CDK intégré). → *10-aws-cloud, Module 19-déployer-nuxt-next-aws*

**Standalone Components (Angular)** — Composants Angular autonomes declares sans NgModule, simplifiant l'architecture et le tree-shaking. → *02-angular, Cours 01-composants-templates/01-composants-standalone*

**Stale-while-revalidate** — Directive Cache-Control qui sert le cache perime immediatement tout en revalidant en arriere-plan. → *09-http-caching, Module 06-stale-while-revalidate*

**Suspense (React)** — Mécanisme qui permet a React d'afficher un fallback pendant le chargement de composants lazy ou de donnees asynchrones. → *00-react, Cours 08-performance-patterns/03-error-boundaries-suspense*

## T

**Teleport (Vue)** — Fonctionnalite qui rend le contenu d'un composant dans un autre noeud DOM, utile pour les modales et overlays. → *01-vue, Cours 02-intermédiaire/05-slots-avances*

**TLS** — Protocole de chiffrement qui sécurisé les communications HTTP (HTTPS), assurant confidentialite, integrite et authentification. → *09-http-caching, Module 17-tls-https*

**Trace** — Parcours complet d'une requête a travers un système, compose d'un ensemble de spans lies par un trace ID commun. → *12-observability-sre, Module 07-distributed-tracing*

**Type Narrowing** — Voir **Narrowing**. Technique TypeScript pour affiner un type large vers un type plus précis dans une branche conditionnelle. → *03-typescript, Module 04-unions-intersections-narrowing*

## U

**Utility Types** — Types predefined de TypeScript (Partial, Required, Pick, Omit, Record, etc.) qui transforment d'autres types. → *03-typescript, Module 10-utility-types*

## V

**VACUUM** — Processus PostgreSQL qui récupéré l'espace disque occupe par les lignes mortes (tuples invisibles) laissees par les transactions. → *08-postgresql, Module 11-performances-et-optimisation*

**Vapor Mode (Vue)** — Mode de compilation experimental de Vue qui généré du code DOM direct sans Virtual DOM, pour de meilleures performances. → *01-vue, Cours 04-expert/01-performance*

**Virtual DOM** — Representation en mémoire (arbre d'objets JS) du DOM réel, utilisee par React et Vue pour calculer les diffs de manière efficace. → *00-react, Cours 08-performance-patterns/01-performance-react*

## W

**WAL (Write-Ahead Log)** — Journal de PostgreSQL ou chaque modification est ecrite avant d'etre appliquee aux fichiers de donnees, garantissant la durabilite. → *08-postgresql, Module 04-transactions-et-acid*

**WeakRef** — Référence faible à un objet JS qui n'empeche pas sa collecte par le garbage collector, utile pour les caches. → *04-js-runtime, Module 07-garbage-collector*

**Window Function** — Fonction SQL qui effectue un calcul sur un ensemble de lignes liees à la ligne courante (OVER, PARTITION BY, ROW_NUMBER, etc.). → *08-postgresql, Module 12-fonctions-avancees-sql*

**Write-through** — Stratégie de cache ou chaque écriture est propagee simultanement au cache et à la base de donnees source. → *09-http-caching, Module 19-redis-cache-applicatif*

## Z

**Zone.js (Angular)** — Librairie qui patche les API asynchrones du navigateur pour declencher automatiquement la detection de changement d'Angular. → *02-angular, Cours 01-composants-templates/08-defer-et-zoneless*

**@defer (Angular)** — Directive de template qui differe le chargement et le rendu d'un bloc de composants jusqu'à une condition (viewport, idle, interaction). → *02-angular, Cours 01-composants-templates/08-defer-et-zoneless*

---

> **Legende des cours** :
> - `00-react` — React / Next.js
> - `01-vue` — Vue 3 / Nuxt 3
> - `02-angular` — Angular
> - `03-typescript` — TypeScript
> - `04-js-runtime` — JS Runtime & V8 Internals
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
