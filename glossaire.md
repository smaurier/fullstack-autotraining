# Glossaire unifie du curriculum Fullstack JS

> Definitions concises des termes techniques cles couverts par les 16 cours du cursus.
> Format : **Terme** — Definition. → *Cours XX, Module YY*

---

## A

**ACID** — Proprietes des transactions relationnelles : Atomicite, Coherence, Isolation, Durabilite. Garantit la fiabilite des operations en base. → *06-postgresql, Module 04-transactions-et-acid*

**API Gateway** — Point d'entree unique qui route, filtre et transforme les requetes vers les microservices sous-jacents. → *11-distributed-systems, Module 08-api-gateway-et-bff*

**Async/Await** — Syntaxe declarative pour ecrire du code asynchrone sequentiel, compilee en machine a etats par le moteur JS. → *02-js-runtime, Module 06-async-await-under-the-hood*

## B

**B-tree** — Structure d'index par defaut dans PostgreSQL, optimisee pour les comparaisons d'egalite et de plage (>, <, BETWEEN). → *06-postgresql, Module 05-index-fondamentaux*

**Backpressure** — Mecanisme de controle de flux qui ralentit le producteur lorsque le consommateur ne peut pas suivre le debit. → *11-distributed-systems, Module 22-stream-processing-event-streaming*

**BFF (Backend for Frontend)** — Variante de l'API Gateway ou chaque client (web, mobile) a son propre backend dedie. → *11-distributed-systems, Module 08-api-gateway-et-bff*

**Bulkhead** — Pattern d'isolation qui cloisonne les ressources (threads, connexions) pour empecher une defaillance de se propager. → *11-distributed-systems, Module 15-failure-modes*

## C

**Cache-aside** — Strategie de cache ou l'application lit d'abord le cache, puis la source en cas de miss, et met a jour le cache. → *07-http-caching, Module 19-redis-cache-applicatif*

**Cache-Control** — En-tete HTTP qui definit les directives de mise en cache (max-age, no-cache, stale-while-revalidate, etc.). → *07-http-caching, Module 04-cache-control*

**CAP (theoreme)** — Dans un systeme distribue, on ne peut garantir simultanement Coherence, Disponibilite et Tolerance aux partitions. → *11-distributed-systems, Module 10-coherence-et-theoreme-cap*

**CDK (AWS)** — Framework d'infrastructure-as-code qui permet de definir des ressources AWS en TypeScript. → *aws-cloud-course, Module 05-cdk-infrastructure-code*

**CDN** — Reseau de serveurs edge qui met en cache le contenu statique au plus pres de l'utilisateur final. → *07-http-caching, Module 08-cdn*

**Change Detection (Angular)** — Mecanisme qui detecte les changements d'etat et met a jour le DOM. Historiquement via Zone.js, migre vers les Signals. → *09-angular, Cours 01-composants-templates/08-defer-et-zoneless*

**CI/CD** — Integration continue et deploiement continu : pipeline automatisee de build, test et deploiement. → *04-testing, Module 13-tests-en-ci-cd*

**Circuit Breaker** — Pattern de resilience qui coupe les appels vers un service defaillant apres un seuil d'erreurs, evitant l'effet cascade. → *11-distributed-systems, Module 16-circuit-breaker*

**CloudFront** — CDN d'AWS qui distribue le contenu statique et dynamique via un reseau mondial de points de presence. → *aws-cloud-course, Module 13-cloudfront-cdn*

**Closure** — Fonction qui capture et conserve une reference a l'environnement lexical (variables) dans lequel elle a ete definie. → *02-js-runtime, Module 02-scope-closures-memory*

**Composable (Vue)** — Fonction reutilisable qui encapsule de la logique reactive via la Composition API (equivalent des custom hooks React). → *03-vue, Cours 02-intermediaire/02-composables*

**Composition API (Vue)** — API fonctionnelle de Vue 3 (setup, ref, computed, watch) qui remplace l'Options API pour une meilleure reutilisation de la logique. → *03-vue, Cours 02-intermediaire/01-composition-api-avancee*

**Computed** — Valeur derivee qui se recalcule automatiquement lorsque ses dependances reactives changent (Vue, Angular). → *03-vue, Cours 01-debutant/03-reactivite*

**Concurrent Mode (React)** — Modele de rendu qui permet a React d'interrompre et de reprendre le travail de rendu pour garder l'UI responsive. → *08-react, Cours 08-performance-patterns/04-react-19-nouveautes*

**Connection Pool** — Ensemble pre-etabli de connexions a la base de donnees reutilisees entre les requetes pour eviter le cout d'ouverture/fermeture. → *06-postgresql, Module 11-performances-et-optimisation*

**Container (Docker)** — Instance isolee et legere d'une image Docker, partageant le noyau de l'hote mais avec son propre filesystem et reseau. → *cheat-sheets/phase-de-infra*

**CORS** — Mecanisme du navigateur qui restreint les requetes cross-origin via des en-tetes HTTP (Access-Control-Allow-Origin, etc.). → *07-http-caching, Module 03-en-tetes-http*

**Coverage** — Mesure du pourcentage de code source execute par les tests (lignes, branches, fonctions). → *04-testing, Module 12-couverture-et-mutation-testing*

**CQRS** — Separation des responsabilites de lecture (Query) et d'ecriture (Command) dans des modeles distincts. → *11-distributed-systems, Module 13-cqrs-event-sourcing*

**CRDT** — Structure de donnees repliquee sans conflit (Conflict-free Replicated Data Type) qui converge automatiquement entre les noeuds. → *11-distributed-systems, Module 23-crdts-resolution-conflits*

**CSP (Content Security Policy)** — En-tete HTTP qui definit les sources autorisees pour les scripts, styles, images, etc., protegeant contre les injections XSS. → *07-http-caching, Module 18-devsecops-owasp*

**CTE (Common Table Expression)** — Sous-requete nommee (`WITH ... AS`) qui ameliore la lisibilite et permet la recursivite en SQL. → *06-postgresql, Module 12-fonctions-avancees-sql*

## D

**Deadlock** — Blocage mutuel ou deux transactions attendent chacune le verrou detenu par l'autre, necessitant l'annulation de l'une d'elles. → *06-postgresql, Module 10-deadlocks*

**Decorator (TypeScript)** — Annotation (@) qui enrichit une classe, methode ou propriete avec des metadonnees ou du comportement. Fondamental dans NestJS et Angular. → *01-typescript, Module 14-decorateurs-metadata*

**DI (Dependency Injection)** — Pattern d'inversion de controle ou les dependances sont injectees plutot que creees, facilitant le test et le decouplage. → *05-nestjs, Module 11-nestjs-providers-di*

**Discriminated Union** — Union de types TypeScript avec un champ discriminant literal commun, permettant un narrowing exhaustif via switch/if. → *01-typescript, Module 04-unions-intersections-narrowing*

**Distributed Tracing** — Suivi d'une requete a travers les differents services d'un systeme distribue via des identifiants de trace et de span. → *12-observability-sre, Module 07-distributed-tracing*

**Docker** — Plateforme de conteneurisation qui empaquete une application et ses dependances dans une image portable et reproductible. → *cheat-sheets/phase-de-infra*

**DORA Metrics** — Quatre metriques cles de performance DevOps : frequence de deploiement, lead time, MTTR, taux d'echec. → *12-observability-sre, Module 16-dora-metrics*

## E

**Error Budget** — Quantite d'indisponibilite toleree pour un service, calculee comme 1 - SLO. Tant qu'il reste du budget, on peut prendre des risques. → *12-observability-sre, Module 10-sli-slo-sla*

**ETag** — En-tete HTTP de validation conditionnelle : empreinte du contenu qui permet au client de verifier si la ressource a change (If-None-Match). → *07-http-caching, Module 05-etag-validation-conditionnelle*

**Event Loop** — Boucle qui orchestre l'execution du code JS, les callbacks I/O, les microtasks et les macrotasks dans un runtime single-threaded. → *02-js-runtime, Module 03-event-loop*

**Event Sourcing** — Pattern ou l'etat est derive d'une sequence immuable d'evenements plutot que stocke directement. → *11-distributed-systems, Module 13-cqrs-event-sourcing*

**Eviction Policy (Redis)** — Strategie de suppression des cles lorsque la memoire maximale est atteinte (LRU, LFU, TTL, random). → *07-http-caching, Module 19-redis-cache-applicatif*

## F

**Fiber (React)** — Unite de travail interne de React representant un noeud du Virtual DOM, permettant le rendu interruptible et la priorisation. → *08-react, Cours 08-performance-patterns/01-performance-react*

**FinalizationRegistry** — API JS qui enregistre un callback invoque quand un objet est collecte par le garbage collector. → *02-js-runtime, Module 07-garbage-collector*

**Fixture** — Donnees ou etat predetermine utilise pour initialiser un test de maniere reproductible. → *04-testing, Module 02-anatomie-dun-test*

## G

**Gauge** — Type de metrique qui represente une valeur instantanee pouvant monter et descendre (ex: nombre de connexions actives). → *12-observability-sre, Module 04-introduction-metriques*

**Generics** — Parametres de type qui permettent d'ecrire des fonctions, classes ou interfaces reutilisables sans sacrifier la securite de typage. → *01-typescript, Module 06-generics-fondamentaux*

**GIN (Generalized Inverted Index)** — Index PostgreSQL optimise pour les recherches full-text, les tableaux et les donnees JSONB. → *06-postgresql, Module 07-index-avances*

**GitHub Actions** — Service CI/CD integre a GitHub qui execute des workflows automatises sur des evenements (push, PR, schedule). → *04-testing, Module 13-tests-en-ci-cd*

**Guard (NestJS)** — Classe qui determine si une requete est autorisee a atteindre le handler (authentification, roles, permissions). → *05-nestjs, Module 13-nestjs-pipes-guards-interceptors*

## H

**Hidden Classes** — Structures internes de V8 qui optimisent l'acces aux proprietes des objets en creant des classes cachees au runtime. → *02-js-runtime, Module 11-hidden-classes-inline-caching*

**Histogram** — Type de metrique qui mesure la distribution des valeurs dans des buckets predefinis (ex: latence des requetes). → *12-observability-sre, Module 04-introduction-metriques*

**Hoisting** — Comportement JS ou les declarations de variables (var) et fonctions sont remontees en haut de leur scope avant l'execution. → *02-js-runtime, Module 02-scope-closures-memory*

**HSTS** — En-tete HTTP (Strict-Transport-Security) qui force le navigateur a utiliser uniquement HTTPS pour un domaine donne. → *07-http-caching, Module 17-tls-https*

**HTTP/2 Multiplexing** — Capacite de HTTP/2 a envoyer plusieurs requetes/reponses en parallele sur une seule connexion TCP via des streams. → *07-http-caching, Module 02-http2-http3*

**Hydration** — Processus cote client qui attache les event listeners et l'interactivite a du HTML pre-rendu par le serveur (SSR). → *08-react, Cours 06-nextjs/02-server-components*

## I

**Idempotency** — Propriete d'une operation qui produit le meme resultat quel que soit le nombre de fois ou elle est executee. → *11-distributed-systems, Module 09-retries-timeouts-idempotency*

**Inline Caching** — Optimisation V8 qui memorise le type d'un objet a un point d'acces pour accelerer les acces subsequents. → *02-js-runtime, Module 11-hidden-classes-inline-caching*

**Interceptor (NestJS)** — Classe qui s'execute avant et apres le handler pour transformer la reponse, ajouter du cache, du logging, etc. → *05-nestjs, Module 13-nestjs-pipes-guards-interceptors*

**Interceptor (Angular)** — Fonction qui intercepte les requetes HTTP sortantes et les reponses entrantes pour ajouter des en-tetes, gerer les erreurs, etc. → *09-angular, Cours 06-http-api/02-interceptors*

## J

**JIT Compilation** — Compilation "juste a temps" par V8 : le code JS est compile en code machine natif a l'execution pour les hot paths. → *02-js-runtime, Module 10-jit-compilation-optimization*

## L

**Lambda (AWS)** — Service serverless qui execute du code en reponse a des evenements sans gerer de serveurs, facture a la milliseconde. → *aws-cloud-course, Module 06-lambda-serverless*

## M

**MELT** — Acronyme pour les quatre piliers de l'observabilite : Metrics, Events, Logs, Traces. → *12-observability-sre, Module 01-pourquoi-observabilite*

**Microtask** — Tache de haute priorite dans l'event loop (Promises, queueMicrotask) executee avant les macrotasks a chaque tick. → *02-js-runtime, Module 04-microtasks-macrotasks*

**Middleware (NestJS/Express)** — Fonction executee avant le handler de route pour transformer la requete, logger, authentifier, etc. → *05-nestjs, Module 06-express-middleware*

**Mock / Stub / Spy** — Test doubles : un mock verifie les interactions, un stub retourne des valeurs predefinies, un spy observe les appels sans les remplacer. → *04-testing, Module 04-mocking-et-test-doubles*

**Module (NestJS)** — Unite d'organisation qui regroupe controllers, providers et imports dans un contexte d'injection de dependances. → *05-nestjs, Module 12-nestjs-modules*

**MSW (Mock Service Worker)** — Librairie qui intercepte les requetes HTTP au niveau du Service Worker pour simuler des API dans les tests. → *04-testing, Module 08-msw-mock-service-worker*

**Mutation Testing** — Technique qui introduit des mutations dans le code source pour verifier que les tests les detectent (mesurant la qualite des tests). → *04-testing, Module 12-couverture-et-mutation-testing*

**MVCC** — Controle de concurrence multi-version : PostgreSQL conserve plusieurs versions de chaque ligne pour permettre des lectures sans verrou. → *06-postgresql, Module 08-niveaux-isolation*

## N

**Narrowing (TypeScript)** — Reduction du type d'une variable via des gardes de type (typeof, instanceof, in, discriminants) dans une branche de code. → *01-typescript, Module 04-unions-intersections-narrowing*

## O

**OIDC (OpenID Connect)** — Protocole d'authentification bati sur OAuth 2.0 qui fournit l'identite de l'utilisateur via un ID token JWT. → *aws-cloud-course, Module 11-cognito-authentification*

**OpenTelemetry (OTel)** — Standard open-source d'instrumentation pour collecter traces, metriques et logs de maniere unifiee et vendor-agnostic. → *12-observability-sre, Module 08-otel-collector-pipeline*

**Outbox Pattern** — Pattern ou les evenements sont ecrits dans une table "outbox" en meme temps que la transaction, puis publies de maniere fiable. → *11-distributed-systems, Module 14-outbox-pattern-reliable-messaging*

## P

**Partitioning** — Division d'une grande table en sous-tables (partitions) basees sur une cle (range, list, hash) pour ameliorer les performances. → *06-postgresql, Module 18-partitioning-et-scaling*

**Pinia** — Store officiel de Vue 3, basee sur la Composition API, avec un support TypeScript natif et une API simple (state, getters, actions). → *03-vue, Cours 03-avance/02-pinia*

**Pipe (NestJS)** — Classe qui valide et/ou transforme les donnees entrantes avant qu'elles n'atteignent le handler du controller. → *05-nestjs, Module 13-nestjs-pipes-guards-interceptors*

**Pipeline (Redis)** — Technique qui envoie plusieurs commandes en batch sans attendre chaque reponse, reduisant la latence reseau. → *07-http-caching, Module 19-redis-cache-applicatif*

**Property-based Testing** — Approche de test ou des proprietes invariantes sont verifiees sur des entrees generees aleatoirement (ex: fast-check). → *04-testing, Module 15-tdd-et-bdd*

**Prototype Chain** — Mecanisme d'heritage JS ou les objets delegent les acces de proprietes non trouvees a leur prototype parent, en chaine. → *02-js-runtime, Module 02-scope-closures-memory*

**Provider (NestJS)** — Toute classe injectable via le systeme DI de NestJS : services, repositories, factories, helpers. → *05-nestjs, Module 11-nestjs-providers-di*

**Provide/Inject (Vue)** — Mecanisme de partage de donnees entre un composant parent et ses descendants sans passer par les props a chaque niveau. → *03-vue, Cours 01-debutant/05-composants-props-emits*

**Proxy (JS)** — Objet qui enveloppe un autre objet et intercepte les operations fondamentales (get, set, has, deleteProperty, etc.). Fondement de la reactivite Vue 3. → *03-vue, Cours 01-debutant/03-reactivite*

**Pub/Sub (Redis)** — Patron de messagerie ou les publishers envoient des messages sur des channels et les subscribers les recoivent en temps reel. → *07-http-caching, Module 19-redis-cache-applicatif*

## Q

**QUIC** — Protocole de transport bati sur UDP qui fournit le multiplexing et la securite TLS 1.3, fondation de HTTP/3. → *07-http-caching, Module 02-http2-http3*

**Query Planner** — Composant de PostgreSQL qui analyse les requetes SQL et choisit le plan d'execution le plus efficace (Seq Scan, Index Scan, etc.). → *06-postgresql, Module 06-query-planner*

## R

**RAG (Retrieval-Augmented Generation)** — Architecture IA qui enrichit le prompt d'un LLM avec des documents pertinents recuperes depuis une base vectorielle. → *15-ia, Module 13-rag-fondamental*

**Reactivity (Vue, Proxy-based)** — Systeme reactif de Vue 3 base sur des Proxy JS qui detecte automatiquement les dependances et met a jour le DOM. → *03-vue, Cours 01-debutant/03-reactivite*

**Reconciliation (React)** — Algorithme de diffing qui compare le Virtual DOM precedent et le nouveau pour calculer le minimum de mutations DOM necessaires. → *08-react, Cours 08-performance-patterns/01-performance-react*

**Reflect** — Objet global JS qui fournit des methodes pour les operations interceptables (get, set, has, etc.), souvent utilise avec Proxy. → *01-typescript, Module 14-decorateurs-metadata*

**Resolver (Angular)** — Fonction executee avant l'activation d'une route pour pre-charger les donnees necessaires au composant. → *09-angular, Cours 04-routing/02-parametres-et-data*

**RSC Payload** — Donnees serialisees envoyees par le serveur pour les React Server Components, permettant au client de reconstruire l'arbre de composants sans rebundler. → *08-react, Cours 06-nextjs/02-server-components*

## S

**S3 (AWS)** — Service de stockage objet d'AWS, hautement durable (99.999999999%), utilise pour les assets statiques, backups et data lakes. → *aws-cloud-course, Module 04-s3-stockage-objets*

**Saga** — Pattern de gestion de transactions distribuees via une sequence de transactions locales, chacune avec une compensation en cas d'echec. → *11-distributed-systems, Module 12-transactions-distribuees-saga*

**Sentinel (Redis)** — Systeme de haute disponibilite qui monitore les instances Redis, detecte les pannes et orchestre le failover automatique. → *07-http-caching, Module 19-redis-cache-applicatif*

**Server Components (React)** — Composants React executes uniquement cote serveur, reduisant le bundle JS client et permettant l'acces direct aux donnees. → *08-react, Cours 06-nextjs/02-server-components*

**Signals (Angular)** — Primitives reactives d'Angular qui remplacent progressivement Zone.js pour une detection de changement plus granulaire et performante. → *09-angular, Cours 01-composants-templates/02-signaux-base*

**SLA** — Engagement contractuel de niveau de service entre un fournisseur et un client (ex: 99.9% de disponibilite). → *12-observability-sre, Module 10-sli-slo-sla*

**SLI** — Indicateur mesurable de la qualite de service (ex: proportion de requetes < 200ms). → *12-observability-sre, Module 10-sli-slo-sla*

**SLO** — Objectif interne de niveau de service, seuil cible pour un SLI (ex: 99.5% des requetes < 200ms sur 30 jours). → *12-observability-sre, Module 10-sli-slo-sla*

**SNI (Server Name Indication)** — Extension TLS qui permet a un serveur d'heberger plusieurs certificats SSL sur une meme adresse IP. → *07-http-caching, Module 17-tls-https*

**Snapshot Testing** — Technique de test qui serialise la sortie d'un composant et la compare a un instantane de reference enregistre. → *04-testing, Module 07-tests-de-composants*

**Span** — Unite de travail au sein d'une trace distribuee, representant une operation (requete HTTP, query SQL, appel gRPC). → *12-observability-sre, Module 07-distributed-tracing*

**SST** — Framework open-source pour deployer des applications fullstack sur AWS avec une DX moderne (SSR, Lambda, CDK integre). → *aws-cloud-course, Module 19-deployer-nuxt-next-aws*

**Standalone Components (Angular)** — Composants Angular autonomes declares sans NgModule, simplifiant l'architecture et le tree-shaking. → *09-angular, Cours 01-composants-templates/01-composants-standalone*

**Stale-while-revalidate** — Directive Cache-Control qui sert le cache perime immediatement tout en revalidant en arriere-plan. → *07-http-caching, Module 06-stale-while-revalidate*

**Suspense (React)** — Mecanisme qui permet a React d'afficher un fallback pendant le chargement de composants lazy ou de donnees asynchrones. → *08-react, Cours 08-performance-patterns/03-error-boundaries-suspense*

## T

**Teleport (Vue)** — Fonctionnalite qui rend le contenu d'un composant dans un autre noeud DOM, utile pour les modales et overlays. → *03-vue, Cours 02-intermediaire/05-slots-avances*

**TLS** — Protocole de chiffrement qui securise les communications HTTP (HTTPS), assurant confidentialite, integrite et authentification. → *07-http-caching, Module 17-tls-https*

**Trace** — Parcours complet d'une requete a travers un systeme, compose d'un ensemble de spans lies par un trace ID commun. → *12-observability-sre, Module 07-distributed-tracing*

**Type Narrowing** — Voir **Narrowing**. Technique TypeScript pour affiner un type large vers un type plus precis dans une branche conditionnelle. → *01-typescript, Module 04-unions-intersections-narrowing*

## U

**Utility Types** — Types predefined de TypeScript (Partial, Required, Pick, Omit, Record, etc.) qui transforment d'autres types. → *01-typescript, Module 10-utility-types*

## V

**VACUUM** — Processus PostgreSQL qui recupere l'espace disque occupe par les lignes mortes (tuples invisibles) laissees par les transactions. → *06-postgresql, Module 11-performances-et-optimisation*

**Vapor Mode (Vue)** — Mode de compilation experimental de Vue qui genere du code DOM direct sans Virtual DOM, pour de meilleures performances. → *03-vue, Cours 04-expert/01-performance*

**Virtual DOM** — Representation en memoire (arbre d'objets JS) du DOM reel, utilisee par React et Vue pour calculer les diffs de maniere efficace. → *08-react, Cours 08-performance-patterns/01-performance-react*

## W

**WAL (Write-Ahead Log)** — Journal de PostgreSQL ou chaque modification est ecrite avant d'etre appliquee aux fichiers de donnees, garantissant la durabilite. → *06-postgresql, Module 04-transactions-et-acid*

**WeakRef** — Reference faible a un objet JS qui n'empeche pas sa collecte par le garbage collector, utile pour les caches. → *02-js-runtime, Module 07-garbage-collector*

**Window Function** — Fonction SQL qui effectue un calcul sur un ensemble de lignes liees a la ligne courante (OVER, PARTITION BY, ROW_NUMBER, etc.). → *06-postgresql, Module 12-fonctions-avancees-sql*

**Write-through** — Strategie de cache ou chaque ecriture est propagee simultanement au cache et a la base de donnees source. → *07-http-caching, Module 19-redis-cache-applicatif*

## Z

**Zone.js (Angular)** — Librairie qui patche les API asynchrones du navigateur pour declencher automatiquement la detection de changement d'Angular. → *09-angular, Cours 01-composants-templates/08-defer-et-zoneless*

**@defer (Angular)** — Directive de template qui differe le chargement et le rendu d'un bloc de composants jusqu'a une condition (viewport, idle, interaction). → *09-angular, Cours 01-composants-templates/08-defer-et-zoneless*

---

> **Legende des cours** :
> - `01-typescript` — TypeScript
> - `02-js-runtime` — JS Runtime & V8 Internals
> - `03-vue` — Vue 3 / Nuxt 3
> - `04-testing` — Testing (Vitest, Playwright, MSW)
> - `05-nestjs` — Node.js, Express & NestJS
> - `06-postgresql` — PostgreSQL
> - `07-http-caching` — HTTP, Caching, TLS, Redis, OWASP
> - `08-react` — React / Next.js
> - `09-angular` — Angular
> - `10-architecture` — Architecture logicielle
> - `11-distributed-systems` — Systemes distribues
> - `12-observability-sre` — Observabilite & SRE
> - `13-react-native` — React Native
> - `14-webgpu-3d` — WebGPU & 3D
> - `15-ia` — IA & LLMs pour developpeurs
> - `aws-cloud-course` — AWS Cloud
