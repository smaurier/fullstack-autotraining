# Full-Stack JavaScript — Curriculum Complet

> Du debutant au developpeur full-stack JS expert, specialite front-end, staffable sur quasi toute mission en ESN.

**14 cours** | **~416 modules** | **~374 labs** | **~775h de contenu** | VitePress

---

## Objectif

Devenir un developpeur full-stack JavaScript accompli avec :

- Maitrise des **3 frameworks front majeurs** (Vue, React, Angular)
- Solide competence **back-end** (Node.js, NestJS, PostgreSQL)
- Expertise **performance** (V8 internals, HTTP/caching, profiling)
- Expertise **accessibilite** (preparation certification auditeur)
- Connaissance **architecture** (DDD, hexagonal, clean arch, microservices)
- Capacite a **observer, debugger et maintenir** des systemes en production
- Bonus differenciants : **mobile** (React Native) et **3D** (WebGPU)

---

## Plan de formation — Ordre optimise

Les cours sont numerotes dans l'ordre recommande. Chaque palier s'appuie sur les precedents.

### Palier 1 — Fondations

> Avant tout framework : maitriser le langage et comprendre le moteur.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 01 | [TypeScript](./01-typescript) | Primitives → generics → mapped types → type-level programming → variance → decorators → design patterns | ~50h |
| 02 | [JS Runtime](./02-js-runtime) | V8, event loop, garbage collection, JIT, hidden classes, memory leaks, profiling | ~35h |

**Pourquoi cet ordre ?** TypeScript est le pre-requis de tout le reste. Les JS Runtime internals changent ta facon de penser la performance des le depart — tu ne verras plus jamais un `Array.map` de la meme maniere.

### Palier 2 — Premier framework + Testing

> Choisis ton framework principal et apprends immediatement a le tester.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 03 | [Vue.js](./03-vue) | Options/Composition API, reactivite, Pinia, Vue Router, SSR/Nuxt, a11y, performance | ~75h |
| 04 | [Testing](./04-testing) | Unit → integration → E2E → TDD (module 15) → mutation testing → visual regression → CI | ~45h |

> **Alternative** : si ta premiere mission est React, commence par le cours React (08) avant Vue. L'important est d'apprendre a tester immediatement apres ton premier framework.

**Conseil** : applique le TDD (module 15 du testing) sur des composants du framework que tu viens d'apprendre. C'est la que le TDD s'ancre.

### Palier 3 — Full-stack

> Back-end, base de donnees, et la couche reseau qui connecte le tout.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 05 | [NestJS](./05-nestjs) | Node.js → Express → NestJS → TypeORM/Prisma → MongoDB/Mongoose → GraphQL → WebSockets → auth → deploy | ~65h |
| 06 | [PostgreSQL](./06-postgresql) | SQL → indexes → EXPLAIN → MVCC → locks → replication → partitioning → backup | ~45h |
| 07 | [HTTP & Caching](./07-http-caching) | HTTP/1.1 → HTTP/2 → HTTP/3 → Cache-Control → CDN → SSR/ISR → streaming → Service Workers | ~35h |

**Pourquoi cet ordre ?** NestJS te rend autonome sur le back. PostgreSQL complete le back avec les donnees. HTTP/Caching connecte front et back — comprendre les en-tetes de cache, le SSR/ISR et les CDN est crucial pour la performance percue.

### Palier 4 — Deuxieme et troisieme frameworks

> Avec un framework maitrise, les suivants s'apprennent beaucoup plus vite.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 08 | [React](./08-react) | JSX, hooks, Context, Redux/Zustand, React Router, Next.js, Suspense, Server Components | ~60h |
| 09 | [Angular](./09-angular) | Modules, composants, services, RxJS, formulaires, routing, signals, SSR, testing | ~60h |

**Conseil** : ne fais pas les 3 frameworks d'affilée. Intercale un projet personnel entre chaque pour ancrer les patterns. Angular est tres demande en ESN (banques, grandes entreprises, secteur public).

### Palier 5 — Architecture et systemes

> C'est ce palier qui fait la difference entre un dev mid et un dev senior.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 10 | [Architecture](./10-architecture) | SOLID → DDD → hexagonal → clean arch → CQRS → microservices → micro-frontends → securite → performance → serverless → Conway's law | ~80h |
| 11 | [Systemes distribues](./11-distributed-systems) | CAP theorem, consensus, CRDT, event sourcing, saga, circuit breaker, back-pressure | ~55h |
| 12 | [Observabilite & SRE](./12-observability-sre) | Logging (Pino) → metriques (Prometheus) → tracing (OpenTelemetry) → Grafana → SLI/SLO → alerting → incident management → chaos engineering → DORA → K8s → FinOps → Sentry → ELK/Kibana → Honeycomb | ~60h |

**Pourquoi apres les frameworks ?** L'architecture s'apprecie et se comprend reellement quand on a deja souffert sur du vrai code. Les patterns prennent tout leur sens avec l'experience concrete.

### Palier 6 — Les bonbons

> Differenciants rares sur le marche. A faire quand le socle est solide.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 13 | [React Native](./13-react-native) | JSX mobile → navigation → state → APIs natives → Reanimated 3 → Turbo Modules → Fabric/JSI → Hermes → EAS deploy | ~55h |
| 14 | [WebGPU & 3D](./14-webgpu-3d) | GPU pipeline → shaders WGSL → geometrie → eclairage → PBR → post-processing → compute shaders → optimisation | ~60h |

---

## Vue d'ensemble

```
Palier 1 ─ Fondations         ██████████████░░░░░░░░░░░░░░░░░░░░░░░░░  ~85h
Palier 2 ─ Framework + Tests  ████████████████████░░░░░░░░░░░░░░░░░░░  ~120h
Palier 3 ─ Full-stack         ██████████████████████████░░░░░░░░░░░░░  ~145h
Palier 4 ─ Frameworks 2 & 3   ████████████████████████████████░░░░░░░  ~120h
Palier 5 ─ Archi & systemes   ██████████████████████████████████████░  ~195h
Palier 6 ─ Bonbons            ████████████████████████████████████████  ~115h
                                                              Total : ~775h
```

**A 2h/jour** : ~15-18 mois | **A 3h/jour** : ~10-12 mois | **Temps plein** : ~4-5 mois

---

## Competences couvertes vs missions ESN

| Type de mission | Cours concernes | Pret ? |
|-----------------|-----------------|--------|
| Front Vue/Nuxt | 01, 02, 03, 04, 07, 10 | Oui |
| Front React/Next | 01, 02, 04, 07, 08, 10 | Oui |
| Front Angular | 01, 02, 04, 07, 09, 10 | Oui |
| Full-stack Node | 01, 02, 04, 05, 06, 07, 10 | Oui |
| Mobile React Native | 01, 02, 08, 04, 13 | Oui |
| Archi/Lead tech | 10, 11, 12, 04 | Oui |
| DevOps/SRE | 12, 11, 05 (deploy) | Oui |
| Performance | 02, 07, 10, 12 | Oui |
| Accessibilite | 03, 08, 09, 13 + certification auditeur | Oui |

---

## Lacunes identifiees — Resolues

Les lacunes initiales ont ete comblees par des modules complementaires integres aux cours existants :

### 1. MongoDB / NoSQL — Integre au cours NestJS

**Module 25 — MongoDB & Mongoose** : schemas avec decorateurs @Schema/@Prop, CRUD complet, recherche regex, aggregation pipeline, embedding vs referencing, indexes, migration depuis TypeORM/Prisma. Lab avec mongodb-memory-server (14 tests e2e).

### 2. GraphQL — Integre au cours NestJS

**Module 26 — GraphQL avec NestJS** : approche code-first avec Apollo Server, @ObjectType/@Field, @Query/@Mutation/@ResolveField, probleme N+1 et DataLoader, subscriptions, comparaison REST vs GraphQL. Lab complet (10 tests e2e).

### 3. Outils d'observabilite commerciaux — Integres au cours Observabilite & SRE

**Phase 6 — Outils Commerciaux** ajoutee au cours d'observabilite :

- **Module 22 — Sentry** : error tracking, DSN, breadcrumbs, fingerprinting, PII scrubbing/RGPD, integration OpenTelemetry. Lab avec 20 tests.
- **Module 23 — ELK Stack & Kibana** : Elasticsearch (index/mapping/shards), Logstash (grok patterns), Kibana (Discover/KQL), ILM hot-warm-cold, docker-compose. Lab avec 13 tests.
- **Module 24 — Honeycomb** : observabilite 2.0, haute cardinalite, BubbleUp correlation, SLOs, Query Builder, comparaison Honeycomb vs Grafana vs Datadog vs ELK. Lab avec 11 tests.

---

## Conseils pour suivre le curriculum

### Organisation

1. **Un cours a la fois.** Ne papillonne pas entre les cours. Finis-en un avant de passer au suivant (sauf les paliers 4-5 qui peuvent se chevaucher selon les missions).

2. **Projet perso entre chaque cours.** Meme petit (une app CRUD, un CLI, un composant open-source). C'est ce qui ancre les connaissances. Les labs du cours = comprehension. Le projet perso = maitrise.

3. **Ne saute pas les labs.** C'est la pratique qui compte, pas la theorie. Si tu manques de temps, mieux vaut faire les labs et survoler la theorie que l'inverse.

### Rythme

4. **2-3h/jour est le sweet spot.** Plus que 4h/jour sur de la formation et la retention chute. Mieux vaut 2h concentrees que 5h fatiguees.

5. **Revisions espacees.** Apres chaque cours, reviens sur les quizzes 1 semaine et 1 mois apres. La courbe de l'oubli est reelle.

6. **Palier 5 en dernier (pas en premier).** L'architecture et les systemes distribues s'apprecient uniquement avec l'experience. Faire le cours DDD sans avoir construit d'app, c'est comme apprendre la theorie musicale sans avoir touche un instrument.

### Strategie ESN

7. **Ton premier framework = ta premiere mission.** Si tu vises une mission Vue, commence par Vue. React, commence par React. L'ordre Vue → React → Angular est une suggestion, pas une obligation.

8. **Angular est non-negociable en ESN.** Beaucoup de grandes entreprises (banques, assurances, secteur public) l'utilisent. Meme si tu preferes React ou Vue, maitriser Angular elargit enormement ton spectre de missions.

9. **L'accessibilite est un super-pouvoir en ESN.** Tres peu de devs la maitrisent. La certification auditeur + l'expertise front = positionnement rare et tres valorise, surtout avec le RGAA et la directive europeenne d'accessibilite (2025).

10. **La perf est ce qui te distingue en entretien.** Savoir expliquer le V8 event loop, les hidden classes, le critical rendering path et les strategies de cache — ca impressionne les leads tech et ca se voit dans le code.

---

## Structure des cours

Chaque cours suit la meme pedagogie :

```
cours/
├── .vitepress/        # Configuration VitePress
├── modules/           # Contenus theoriques + exemples de code
├── labs/              # Exercices pratiques avec tests automatises
├── quizzes/           # QCM interactifs (HTML, theme sombre)
├── screencasts/       # Plans de screencasts (markdown)
├── visualizations/    # Visualisations interactives (HTML)
├── glossaire.md       # Termes cles du domaine
└── index.md           # Page d'accueil
```

**Lancer un cours localement** :

```bash
cd <dossier-du-cours>
npm install    # ou pnpm install
npm run dev    # demarre VitePress sur localhost:5173
```

**Cloner le curriculum complet avec les submodules** :

```bash
git clone --recurse-submodules https://github.com/smaurier/fullstack-autotraining.git
```

**Mettre a jour tous les cours** :

```bash
git submodule update --remote --merge
```

---

## Statistiques

| Cours | Modules | Labs | Tests | Duree est. |
|-------|---------|------|-------|------------|
| 01 — TypeScript | 20 | 19 | — | ~50h |
| 02 — JS Runtime | 16 | 15 | — | ~35h |
| 03 — Vue.js | 51 | 34 | — | ~75h |
| 04 — Testing | 19 | 18 | — | ~45h |
| 05 — NestJS | 27 | 26 | — | ~65h |
| 06 — PostgreSQL | 19 | 18 | — | ~45h |
| 07 — HTTP & Caching | 16 | 15 | — | ~35h |
| 08 — React | 41 | ~24 | — | ~60h |
| 09 — Angular | 42 | ~27 | — | ~60h |
| 10 — Architecture | 56 | 71 | — | ~80h |
| 11 — Systemes distribues | 25 | 24 | — | ~55h |
| 12 — Observabilite & SRE | 25 | 25 | 44 | ~60h |
| 13 — React Native | 28 | 28 | 691 | ~55h |
| 14 — WebGPU & 3D | 31 | 30 | — | ~60h |
| **Total** | **~416** | **~374** | **735+** | **~775h** |

---

*Curriculum genere et maintenu avec l'aide de Claude Code.*
