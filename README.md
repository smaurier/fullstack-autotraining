# Full-Stack JavaScript — Curriculum Complet

> Du dev front React a l'aise vers le développeur full-stack JS senior, staffable sur quasi toute mission en ESN.

**17 cours** | **~35 katas** | **1 capstone** | **7 paliers** | VitePress

---

## Objectif

Devenir un développeur full-stack JavaScript accompli avec :

- Fondations solides en **algorithmie & structures de donnees**
- Maîtrise des **3 frameworks front majeurs** (Vue, React, Angular)
- Solide compétence **back-end** (Node.js, NestJS, PostgreSQL)
- Expertise **performance** (V8 internals, HTTP/caching, profiling)
- Expertise **accessibilité** (preparation certification auditeur)
- Connaissance **architecture** (DDD, hexagonal, clean arch, microservices)
- Maîtrise du **cloud AWS** (IAM, S3, Lambda, CDK, CloudFront, déploiement Nuxt/Next)
- Capacité a **observer, debugger et maintenir** des systèmes en production
- Maîtrise de l'**IA** en tant qu'outil et technologie (prompting, agents, RAG, LLMs locaux)
- Bonus differenciants : **mobile** (React Native) et **3D** (WebGPU)

---

## Méthodologie — Comment suivre ce curriculum efficacement

> Cette section est le coeur du document. Elle transforme ~1000h de contenu en un plan actionnable.

### Principe 1 — Quand la frustration monte, STOP

La frustration est ton ennemi #1. Elle transforme un problème de 10 minutes en une spirale de 2 heures. Voici ton protocole d'urgence :

```
FRUSTRATION DETECTEE
│
├── Tu bloques sur un lab ?
│   ├── < 20 min → Continue, c'est normal
│   ├── 20 min → Relis la theorie du module (pas Google, le module)
│   ├── 30 min → Lis la solution, comprends-la, ferme-la, refais
│   └── 45 min → Passe au module suivant. Reviens demain. Serieusement.
│
├── Tu ne comprends pas un concept ?
│   ├── Demande a l'IA d'expliquer (PAS d'ecrire du code)
│   ├── Si ca reste flou → note-le et avance. Ca deviendra clair plus tard.
│   └── Certains concepts prennent des SEMAINES a decanter. C'est normal.
│
└── Tu te sens nul ?
    └── Ouvre progress.md. Relis ce que tu savais il y a 1 mois.
        La progression est invisible au quotidien mais massive sur un mois.
```

**Regle d'or : ne termine JAMAIS une session sur une frustration.** Si tu bloques en fin de session, fais un lab facile que tu maitrises déjà (même d'un cours précédent). Finis sur une reussite.

### Principe 2 — La boucle d'apprentissage

Chaque module suit le même cycle. Ne le court-circuite jamais :

```
1. LIRE    — module theorique (20-30 min)
2. FAIRE   — lab exercise.ts, essayer seul sans regarder la solution (30-60 min)
3. VERIFIER — lancer les tests, comparer avec solution.ts, lire les POURQUOI
4. QUIZ    — repondre au quiz du module (5-10 min)
5. NOTER   — ecrire 1 a 3 phrases dans ton carnet : qu'est-ce que j'ai appris ?
```

**Regle absolue : si tu manques de temps, fais le lab et saute la théorie.** Pas l'inverse. La théorie sans pratique s'evapore en 48h. La pratique sans théorie s'ancre et la théorie viendra naturellement après.

### Principe 3 — Sessions courtes et regulieres

| Rythme | Duree/session | Sessions/semaine | Temps total estime |
|--------|--------------|------------------|-------------------|
| Confortable | 1h30 | 5x | ~20-24 mois |
| Standard | 2h | 5-6x | ~14-18 mois |
| Intensif | 3h | 6x | ~10-12 mois |

**Le sweet spot est 2h/jour, 5 jours par semaine.** Au-dela de 3h, la retention chute. Mieux vaut 90 minutes de concentration totale que 4 heures a moitie attentif. Le cerveau consolide pendant la nuit — c'est pourquoi la regularite bat l'intensite.

**Pas de formation le week-end** (sauf envie sincere). Le repos n'est pas du temps perdu — c'est du temps de consolidation.

### Principe 4 — Revisions espacees (Spaced Repetition)

La courbe de l'oubli est brutale : tu perds ~70% de ce que tu apprends en 7 jours si tu ne revises pas. Voici le protocole :

| Quand | Action | Duree |
|-------|--------|-------|
| Fin de module | Quiz du module | 5 min |
| Fin de cours | Tous les quizzes du cours, d'une traite | 30-45 min |
| J+7 après la fin du cours | Refaire les quizzes rates | 15-20 min |
| J+30 après la fin du cours | Refaire TOUS les quizzes du cours | 30 min |
| Avant de commencer un cours lie | Quizzes du cours prérequis | 20 min |

Concretement : quand tu termines le cours HTTP & Caching, note dans ton agenda "J+7 : quizzes HTTP" et "J+30 : quizzes HTTP". C'est 30 minutes d'investissement qui triple la retention a long terme.

### Accelerateurs d'apprentissage — 5 techniques pour tripler la retention

#### 1. Cheat sheets par palier
A la fin de chaque palier (A, B, C...), redige une **fiche recto-verso** qui résumé les concepts clés. L'acte d'écrire ancre mieux que relire. Format : concept a gauche, exemple de code a droite. Garde-les pour les revisions J+7/J+30.

#### 2. Technique Feynman
Quand un concept resiste, explique-le **a voix haute comme si tu l'enseignais a quelqu'un**. Si tu bloques, c'est que tu ne maitrises pas encore. Retourne au module, relis, et reessaie. Ça marche particulierement bien pour : generics TypeScript, MVCC PostgreSQL, variance, event loop.

#### 3. Code katas quotidiens (15 min/jour)
Avant de commencer ta session, fais un **mini-exercice de 15 minutes** sur un concept déjà vu. Pas un nouveau lab — un exercice rapide de mémoire. Exemples :
- Reimplemente `Array.map` avec les bons types génériques
- Ecris un middleware Express avec error handling de mémoire
- Cree un composant accessible (focus trap) sans regarder le cours

#### 4. Tableau comparatif des 3 frameworks
Maintiens un fichier `frameworks-comparison.md` que tu enrichis au fil des cours React, Vue, Angular. Colonnes : concept | React | Vue | Angular. Tu verras les patterns communs emerger et les différences devenir evidentes. Concepts a comparer : reactivity, state management, routing, forms, DI, lifecycle, a11y, testing.

#### 5. Questions d'entretien par cours
A la fin de chaque cours, note **3 questions d'entretien** que tu pourrais te faire poser. Puis reponds-y sans regarder le cours. Ça prepare à la fois la retention et les futurs entretiens techniques. Exemples :
- "Explique la différence entre `useEffect` et `use()` en React 19"
- "Comment fonctionne le MVCC de PostgreSQL ?"
- "Quand utiliser Serializable vs Read Committed ?"

### Principe 5 — Le projet fil rouge (pas des exercices isoles)

Les labs du cours = tu comprends. Le projet perso = tu maitrises. La différence est enorme.

Tu construis UN projet qui grandit avec toi. Même sujet, même app — elle evolue à chaque phase :

| Après phase | Ce que tu ajoutes au projet | Duree |
|-------------|---------------------------|-------|
| Phase A (3 frameworks) | L'app existe en 3 versions front (React, Vue, Angular). Tu peux montrer la même app dans 3 frameworks à un recruteur. | intégré aux labs |
| Phase B (TS + Runtime) | Tu refactores le front React avec des types stricts, tu profiles et optimises | 1-2 jours |
| Phase C (Test + Back) | Tu ajoutes une API NestJS, une base PostgreSQL, et des tests. C'est une vraie app fullstack. | 3-5 jours |
| Phase D (HTTP + Deploy) | Tu déployés sur AWS avec CloudFront, CI/CD et un vrai domaine. Tu envoies le lien à un recruteur. | 3-5 jours |
| Phase E (Senior) | Tu restructures en clean arch, tu ajoutes observabilité, logging, tracing. | 2-3 jours |

**Regle : le projet est fini quand il est déployé ou publie.** Pas "fini en local". Le déploiement est la moitie de l'apprentissage.

### Principe 6 — Appliquer sur du vrai code

Tu es entre deux missions. Ton terrain d'application c'est ton **projet fil rouge** et tes **side projects**. Chaque cours doit produire un transfert concret :

- **TypeScript** → refactorer un composant du fil rouge avec des types plus stricts
- **JS Runtime** → profiler une page de ton app avec Chrome DevTools, identifier un re-render inutile
- **Vue/React/Angular** → implementer une feature dans les 3 versions du fil rouge
- **Testing** → ajouter des tests Playwright sur le parcours critique de ton app
- **NestJS** → ton API fil rouge — chaque feature devient un controller + service + tests
- **HTTP & Caching** → ajouter des `Cache-Control` pertinents, mesurer la différence
- **AWS** → déployer le fil rouge, configurer CloudFront, automatiser avec CI/CD
- **Observabilité** → ajouter du structured logging au fil rouge, un dashboard Grafana

**Chaque semaine, note un "transfert" concret.** Même petit. C'est ce qui ancre et motive. Et quand tu reprends une mission, tout ce que tu as fait sur le fil rouge est directement applicable.

### Principe 7 — Ne pas se comparer, mesurer sa progression

Tu as dit "je me sens nul". Ce sentiment est universel et trompeur. Il vient du fait que tu vois tout ce que tu ne sais pas, mais tu ne vois pas tout ce que tu sais déjà.

**Tiens un journal de progression.** Un fichier `progress.md` à la racine de ce repo suffit :

```markdown
## Semaine 6 — 2026-05-01
- Fini React, 13/13 labs, quizzes 90%
- Transfert : version React du fil rouge deployee sur Vercel
- Confiance : 7/10 (hooks avances OK, Server Components encore flou)

## Semaine 16 — 2026-07-15
- Fini Angular, 14/14 labs — les 3 frameworks sont faits !
- Transfert : les 3 versions du fil rouge cote a cote, meme fonctionnalites
- Confiance : 8/10 (je peux demarrer une mission sur n'importe quel framework)
```

Relis-le tous les mois. Tu seras surpris du chemin parcouru.

### Principe 8 — Ordre personnalise (pas l'ordre générique)

L'ordre des paliers ci-dessous est l'ordre générique. **Ton** ordre optimal est différent parce que tu as déjà des acquis (React, a11y) et que tu es entre deux missions — tu as le temps de commencer par les frameworks. Voir la section [Parcours personnalise](#parcours-personnalise) plus bas.

---

## Plan de formation — Ordre de référence

Les cours sont numérotés dans l'ordre de référence. Chaque palier s'appuie sur les précédents.

### Palier 1 — Fondations

> Avant tout framework : apprendre a raisonner sur les problemes, maîtriser le langage et comprendre le moteur.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 00 | [Algorithms](./05-algorithms) | Complexité → structures de données → récursion → tri → arbres → graphes → backtracking → DP → patterns terrain JS | ~45h |
| 03 | [TypeScript](./03-typescript) | Primitives → generics → mapped types → type-level programming → variance → decorators → design patterns | ~50h |
| 04 | [JS Runtime](./04-js-runtime) | V8, event loop, garbage collection, JIT, hidden classes, memory leaks, profiling | ~35h |

**Pourquoi cet ordre ?** L'algorithmie t'apprend a choisir les bonnes structures et a raisonner sur les coûts avant même d'entrer dans les frameworks. TypeScript sécurise ensuite ces raisonnements dans le code. Enfin, les JS Runtime internals changent ta façon de penser la performance dès le départ — tu ne verras plus jamais un `Array.map` de la même manière.

### Palier 2 — Les 3 frameworks

> Les 3 frameworks s'enchainent tant que les patterns front sont frais. Vue pose les bases, Angular introduit la DI et RxJS, React synthetise avec hooks et Server Components.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 01 | [Vue.js](./01-vue) | Composition API, réactivité, Pinia, Vue Router, SSR/Nuxt, testing, a11y, performance | ~75h |
| 02 | [Angular](./02-angular) | Standalone, Signals, DI, RxJS, formulaires, routing, Material, testing, SSR | ~60h |
| 00 | [React](./00-react) | JSX, hooks, Context, Zustand, React Router, Next.js, Server Components, Suspense | ~60h |

> **Note numérotation** : les dossiers sont numérotés selon le parcours React-first (**00 → 01 → 02**). Dans ce palier, l'ordre pédagogique recommandé est **Vue (01) → Angular (02) → React (00)**.
>
> **Alternative React-first** : si ta première mission est React, fais **00 → 01 → 02** (React → Vue → Angular). L'important est de maîtriser les 3 rapidement.

**Conseil** : Angular est très demandé en ESN (banques, grandes entreprises, secteur public). Intercale un petit projet personnel entre chaque framework pour ancrer les patterns.

### Palier 3 — Testing avance + Full-stack

> Testing approfondi après les 3 frameworks (les bases Vitest/Playwright sont couvertes dans Vue), puis back-end complet.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 06 | [Testing](./06-testing) | TDD/BDD, mutation testing, contract testing (Pact), performance testing (k6), CI/CD — les modules 00-05 consolident ce que Vue a introduit | ~45h |
| 07 | [NestJS](./07-nestjs) | Node.js → Express → NestJS → TypeORM/Prisma → MongoDB/Mongoose → GraphQL → WebSockets → auth → deploy | ~65h |
| 08 | [PostgreSQL](./08-postgresql) | SQL → indexes → EXPLAIN → MVCC → locks → replication → partitioning → backup | ~45h |
| 09 | [HTTP & Caching](./09-http-caching) | HTTP/1.1 → HTTP/2 → HTTP/3 → Cache-Control → CDN → SSR/ISR → streaming → Redis → GraphQL caching → Service Workers | ~40h |

**Pourquoi cet ordre ?** Testing consolide les 3 frameworks et ajoute TDD/BDD/contract testing. NestJS te rend autonome sur le back. PostgreSQL complete le back avec les donnees. HTTP/Caching connecte front et back.

### Palier 4 — Architecture et systèmes

> C'est ce palier qui fait la différence entre un dev mid et un dev senior.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 11 | [Architecture](./11-architecture) | SOLID → DDD → hexagonal → clean arch → CQRS → microservices → micro-frontends → sécurité → performance → serverless → Conway's law | ~138h |
| 13 | [Systèmes distribues](./13-distributed-systems) | CAP theorem, consensus, CRDT, event sourcing, saga, circuit breaker, back-pressure | ~55h |
| 12 | [Observabilité & SRE](./12-observability-sre) | Logging (Pino) → metriques (Prometheus) → tracing (OpenTelemetry) → Sentry → Grafana → SLI/SLO → alerting → incidents/postmortems → chaos engineering → DORA → observabilité frontend → APM panorama → feature flags | ~60h |
| 10 | [AWS Cloud](./10-aws-cloud) | IAM → VPC/EC2 (essentiel dev) → S3 → Lambda → API Gateway → CDK → DynamoDB → Cognito → CloudFront → RDS → serverless (SST) → CI/CD → déployer Nuxt/Next | ~60h |

**Ordre recommande dans le palier :** 11-Architecture → 13-Distributed Systems → 12-Observabilité → 10-AWS Cloud. L'architecture donne le vocabulaire (CQRS, saga, hexagonal). Les systèmes distribues montrent comment implementer ces patterns a grande echelle. L'observabilité apprend a surveiller et maintenir ces systèmes en production. AWS est le terrain de déploiement.

**Pourquoi après les frameworks ?** L'architecture s'apprecie et se comprend réellement quand on a déjà souffert sur du vrai code. Les patterns prennent tout leur sens avec l'experience concrete.

### Palier 5 — Les bonbons

> Differenciants rares sur le marche. A faire quand le socle est solide.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 15 | [React Native](./15-react-native) | JSX mobile → navigation → state → APIs natives → Reanimated 3 → Turbo Modules → Fabric/JSI → Hermes → EAS deploy | ~55h |
| 16 | [WebGPU & 3D](./16-webgpu-3d) | GPU pipeline → shaders WGSL → geometrie → eclairage → PBR → post-processing → compute shaders → optimisation | ~60h |

### Palier 6 — Intelligence Artificielle

> Comprendre et maîtriser l'IA en tant que développeur : de l'utilisation quotidienne à la construction de systèmes RAG.

| # | Cours | Contenu | Duree estimee |
|---|-------|---------|---------------|
| 14 | [IA pour Devs JS](./14-ia) | Prompting → assistants code → API Claude/OpenAI → MCP → agents → maths IA → neural networks → transformers → fine-tuning → Ollama → embeddings → RAG → chatbot → évaluation → sécurité → production | ~60h |

**Pourquoi en dernier palier ?** L'IA est un multiplicateur de productivite qui s'applique a tout le reste. Avoir d'abord le socle technique solide (paliers 1-5) permet de tirer le maximum de l'IA — tu sais ce que tu demandes et tu peux vérifier ce qu'elle produit.

> **Note** : le palier 7 n'est pas "découvrir l'IA" — c'est comprendre comment elle fonctionne sous le capot (transformers, embeddings, tokenization) et construire des systèmes IA (RAG, agents, API). Pendant les paliers 1-6, tu codes sans IA — c'est la que tu ancres les compétences.

---

## Parcours personnalise

> **Pour qui :** dev front souhaitant devenir fullstack senior, staffable sur toute mission JS en ESN.

**Principe anti-frustration :** chaque phase produit un résultat tangible. Tu CONSTRUIS quelque chose, pas juste des exercices isoles. Et tu ne restes jamais plus de 6 semaines sans voir un progres concret.

**Projet fil rouge :** tout au long du curriculum, tu construis UNE app qui evolue. Choisis un sujet qui t'interesse (budget tracker, blog, dashboard meteo, whatever). Cette app va grandir avec toi :
- Phase A : Les 3 frameworks (3 versions du même front : Vue, Angular, React)
- Phase B : TypeScript strict + JS Runtime (refactoring, profiling)
- Phase C : Tests avances, API NestJS, base PostgreSQL — c'est une vraie app fullstack
- Phase D : HTTP/Caching, deploy AWS avec CI/CD
- Phase E+ : architecture clean, observabilité, puis IA

**Labs sans IA — c'est la que tu progresses.** Code sans IA pour ancrer les compétences. Protocole quand tu bloques sur un lab :

1. **30 min solo** — essaye, debug, relis la théorie du module
2. **Relis l'enonce** — souvent un indice est dans la formulation
3. **Lis la solution, comprends-la** — ne copie pas, comprends chaque ligne
4. **Refais le lab sans regarder** — c'est LA ou l'apprentissage se cristallise

L'IA reste utile pour les **explications conceptuelles** (pas le code) : "explique-moi la covariance" ou "c'est quoi un circuit breaker". Mais le code, c'est toi qui l'ecris.

---

### Phase A — Les 3 frameworks, React-first (~195h, ~4 mois)

Tu es en mission React — commence par ce qui t'est utile immédiatement. React d'abord, puis Vue pour la réactivité explicite et Nuxt, enfin Angular pour la DI et RxJS. A la fin, chaque framework eclaire les autres.

| Ordre | Cours | Pourquoi cet ordre | Mode |
|-------|-------|-------------------|----|
| 1 | 00 — React | En mission React — hooks, Context, Zustand, Next.js, Server Components. Directement applicable. | **Complet, from scratch** |
| 2 | 01 — Vue.js | Deuxième framework. Composition API, réactivité, Pinia, Nuxt. Les concepts routing/state sont acquis depuis React. | **Complet, from scratch** |
| 3 | 02 — Angular | Troisième framework. DI, Signals, RxJS, formulaires réactifs. Avec React + Vue derrière toi, les patterns sont rodés. | **Complet, from scratch** |

> **Parcours Vue-first** : si tu n'es pas en mission React, l'ordre **01 → 02 → 00** (Vue → Angular → React) est une bonne alternative. Vue pose des bases de réactivité plus explicites.

**Résultat tangible :** ton app fil rouge existe en 3 versions (React, Vue, Angular). Tu peux montrer la même app dans 3 frameworks à un recruteur. C'est déjà un portfolio.

<details>
<summary><strong>Guide d'utilisation optimale — 00 React (40 modules, 24 exercices)</strong></summary>

| Section | Mode | Pourquoi |
|---------|------|----------|
| 00-introduction | **Survol** | Pas encore de référence Vue/Angular — survole le pont, tu y reviendras après |
| 01-composants-jsx | **Normal** | JSX, props, children — ton premier framework front from scratch |
| 02-hooks-fondamentaux | **Deep dive** | useState, useEffect, custom hooks — le coeur de React |
| 03-state-management | **Deep dive, découpé en 2** | Fais useReducer+Context d'abord (2 jours), PUIS Zustand+React Query (2 jours). |
| 04-routing | **Normal** | React Router |
| 05-formulaires | **Normal** | React Hook Form — très utilisé en mission |
| 06-nextjs | **Deep dive** | Server Components, App Router, Server Actions — c'est LA que tu apprends le plus. |
| 07-tests | **Deep dive** | Testing Library, Vitest, Playwright — premier contact avec le testing front |
| 08-performance-patterns | **Deep dive** | React.memo, useMemo, profiling — différence entre junior et mid |
| 09-styling | **Normal** | Tailwind, CSS Modules, shadcn/ui |
| 10-auth-sécurité | **Normal** | NextAuth patterns |
| 11-cicd-déploiement | **Normal** | Vercel/Docker deploy |
| 12-recettes-esn | **Deep dive** | Patterns réels de mission — c'est ce qui te rend staffable |

**Fil rouge :** Version React/Next de ton app. C'est ta première version — soigne-la.
**Piege :** Module 03 (state) — ne fais PAS les 4 approches le même jour.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 01 Vue (44 modules, 33 exercices)</strong></summary>

| Section | Mode | Pourquoi |
|---------|------|----------|
| 01-débutant (8 cours) | **Normal, pas rapide** | Force-toi à faire les exercices SANS regarder. Compare avec les composants React. |
| 02-intermédiaire (6 cours) | **Deep dive** | Composition API avancée, composables, async — compare avec les hooks React |
| 03-avance (7 cours) | **Deep dive** | Testing Vue + Router + Pinia. Tu connais déjà Vitest et Playwright de React. |
| 04-expert (4 cours) | **Deep dive** | Performance, SSR, architecture — ce qui fait la différence en entretien |
| 05-nuxt3 | **Deep dive** | Le meta-framework de Vue. Compare avec Next.js. |
| 06-storybook | **Normal** | Utile mais pas bloquant |
| 07-cicd | **Normal** | Pipeline Vue |
| 08-api-typees | **Deep dive** | Typer les API cote front — eliminer les `any` |
| 09-accessibilité | **Deep dive** | Directement applicable en mission ESN |
| 10-i18n | **Normal** | Utile en mission ESN (clients multi-langues) |
| 11-auth-sécurité | **Normal** | Auth patterns Vue/Nuxt |
| 12-vue-query | **Normal** | TanStack Query — tu l'as déjà vu côté React |

**Fil rouge :** Version Vue/Nuxt de ton app. Deuxième version — compare avec React.
**Piege :** Ne survole PAS le Module 01 parce que "c'est du débutant". Fais les exercices.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 02 Angular (43 modules, 26 exercices)</strong></summary>

| Section | Mode | Pourquoi |
|---------|------|----------|
| 00-de-vue-a-angular (3 cours) | **Lecture attentive** | Le pont Vue → Angular. Tu as aussi React en tête — compare les 3 modèles. |
| 01-composants-templates (7 cours) | **Normal** | Syntaxe Angular (@if, @for, etc.) |
| 02-signals-avances (3 cours) | **Deep dive** | Le nouveau modèle réactif d'Angular — compare avec `ref()` (Vue) et `useState` (React) |
| 03-services-di (3 cours) | **Deep dive** | DI = coeur d'Angular. Connecte avec NestJS (Phase D). Note la similitude. |
| 04-routing (4 cours) | **Normal** | Le routing utilise des Observables (RxJS) — c'est OK de ne pas tout comprendre, le module 05 expliquera |
| 05-rxjs-essentiel (4 cours) | **Deep dive, PRENDS TON TEMPS** | Le module le plus difficile du cours. Observable, operators, switchMap. Fais les marble diagrams. Si tu galères 2 jours c'est NORMAL. |
| 06-http-api (3 cours) | **Normal** | HttpClient utilise RxJS — ça consolidera le module 05 |
| 07-formulaires (4 cours) | **Deep dive** | Reactive forms — plus puissant que Vue/React forms |
| 08-angular-material (3 cours) | **Normal** | Component library — survol OK si pas en mission Angular |
| 09-tests (2 cours) | **Normal** | TestBed — spécifique Angular |
| 10-state-management (3 cours) | **Deep dive** | NgRx vs Signal Store — compare avec Zustand (React) et Pinia (Vue) |
| 11-cicd-auth-sécurité (1 cours) | **Normal** | |
| 12-recettes-esn (2 cours) | **Deep dive** | Patterns réels de mission Angular |

**Fil rouge :** Version Angular de ton app. Tu as maintenant 3 versions — c'est ton portfolio.
**Piege :** Module 05 (RxJS). Protocole : 20 min par exercice, si tu bloques relis le marble diagram, si après 45 min c'est flou passe a l'exercice suivant.

</details>

**Palier de staffabilite :** après Phase A (~195h), tu es **staffable sur toute mission front-end** (React, Vue/Nuxt, Angular). C'est déjà un enorme progres.

### Phase B — Le langage en profondeur (~85h, ~2 mois)

Maintenant que tu as 3 frameworks derriere toi, TypeScript avance et JS Runtime vont resonner avec des problèmes réels que tu as rencontres. "Ah, c'est pour ça que mon generic marchait pas" et "ah, c'est pour ça que mon composant re-rendait".

| Ordre | Cours | Pourquoi maintenant | Mode |
|-------|-------|-------------------|----|
| 4 | 03 — TypeScript | Les generics, mapped types, conditional types, variance — tu en as vu l'utilite dans les 3 frameworks. Maintenant tu comprends en profondeur. | Complet |
| 5 | 04 — JS Runtime | V8, event loop, GC, memory leaks, JIT, hidden classes. Tu sais construire des apps — maintenant tu comprends POURQUOI elles sont rapides ou lentes. | Complet |

<details>
<summary><strong>Guide d'utilisation optimale — 03 TypeScript (20 modules, 20 labs, 20 quizzes)</strong></summary>

| Modules | Mode | Notes |
|---------|------|-------|
| 00-05 | **Rapide** (~1h chacun) | Primitifs, fonctions, objets, unions, classes — tu les utilises déjà dans les 3 frameworks. Renforcement. |
| 06-07 | **Deep dive** | Generics. Le coeur de TypeScript avance. |
| 08-09 | **Normal** | Enums/Tuples, Modules — utile mais pas de difficulte |
| 10 | **Deep dive** | Utility Types — `Partial<T>`, `Pick<T>`, `Omit<T>`. Tu les utilises partout. |
| 11 | **Deep dive** | Conditional Types — `infer`, distribution. Premier mur. |
| 12 | **Deep dive** | Mapped Types — template literals. Warning dans le module. |
| 13 | **Deep dive** | Type-level programming. Le plus dur. Si tu bloques > 45 min, PASSE et reviens après le projet final. |
| 14 | **Deep dive** | Decorateurs — connecte directement avec Angular et NestJS |
| 15 | **Normal** | Variance — abstrait. Comprends l'intuition, pas les details. Warning dans le module. |
| 16-17 | **Normal** | Declaration files, tsconfig — référence |
| 18 | **Deep dive** | Patterns de conception en TS — pont avec le cours Architecture |
| 19 | **Normal** | Projet final |

**Fil rouge :** Refactore la version React de ton app avec des types stricts. Zero `any`.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 04 JS Runtime (16 modules, 15 labs, 16 quizzes)</strong></summary>

| Modules | Mode | Notes |
|---------|------|-------|
| 00-03 | **Normal** | Call stack, closures, event loop, microtasks — fondamentaux |
| 04-05 | **Deep dive** | Promises (implementation!) et Async/Await — tu les utilises sans comprendre comment ça marche sous le capot |
| 06-07 | **Deep dive** | GC + Memory Leaks — directement applicable a tes composants React/Vue |
| 08-09 | **Deep dive** | V8 architecture + JIT — c'est ce qui impressionne en entretien |
| 10 | **Normal** | Hidden classes — expert, comprends l'intuition |
| 11 | **Deep dive** | Performance patterns — change ta façon d'écrire du code |
| 12 | **Normal** | Scheduling |
| 13-14 | **Normal** | Projet final + debugging |

**Fil rouge :** Profile ton app React avec Chrome DevTools. Identifie un re-render inutile et corrige-le.

</details>

**Résultat tangible :** tu peux expliquer en entretien le fonctionnement de l'event loop, pourquoi `Array.map` créé un nouveau tableau en mémoire, et la différence entre covariance et contravariance. C'est ce qui impressionne un lead tech.

### Phase C — Algorithmie et raisonnement (~45h, ~1 mois)

> **Peut se faire en parallèle** des autres phases (15-20 min de kata/jour avant ta session principale).

L'algorithmie renforce le raisonnement sur les coûts et les structures de données. Utile en entretien technique et pour les choix d'implémentation au quotidien. Si tu préfères, intercale 1 module algo par semaine pendant les phases B-D au lieu de faire un bloc dédié.

| Ordre | Cours | Pourquoi maintenant | Mode |
|-------|-------|-------------------|----||
| 6 | 05 — Algorithms | Complexité, structures de données, récursion, tri, arbres, graphes, DP, patterns terrain JS. Renforce le raisonnement. | Complet ou en parallèle |

<details>
<summary><strong>Guide d'utilisation optimale — 05 Algorithms (13 modules, 12 labs, 13 quizzes)</strong></summary>

| Modules | Mode | Notes |
|---------|------|-------|
| 00-03 | **Normal** | Complexité, tableaux, hash maps, stacks, queues — fondamentaux |
| 04 | **Deep dive** | Récursion — le premier mur. Si tu bloques > 30 min, lis la solution et refais. |
| 05-06 | **Normal** | Tri, heaps, arbres — structures classiques |
| 07 | **Deep dive** | Graphes — BFS/DFS, utile pour comprendre le DOM et les dépendances |
| 08-09 | **Normal** | Backtracking, DP — les plus durs. Comprends l'intuition, pas chaque variante. |
| 10 | **Normal** | Greedy, union-find |
| 11 | **Deep dive** | Patterns terrain JS — debounce, LRU cache, rate limiting. Directement applicable. |
| 12 | **Normal** | Projet final |

**Fil rouge :** Implémente les patterns du module 11 dans ton app (debounce sur la recherche, LRU cache côté API).
**Alternative parallèle :** 1 module algo par semaine pendant les phases B-D (~15 semaines). Commence par les modules 00-03, puis 11 (patterns terrain), puis le reste.

</details>

**Résultat tangible :** tu raisonnes en O(n) vs O(n²), tu sais quand utiliser une hash map vs un tableau, et tu peux résoudre les questions algo d'entretien courantes.

### Phase D — Tester et construire le back (~155h, ~3-4 mois)

Tu sais construire 3 fronts. Maintenant tu apprends a garantir la qualite et à construire le back-end.

| Ordre | Cours | Pourquoi maintenant | Mode |
|-------|-------|-------------------|----||
| 7 | 06 — Testing | Unit, intégration, E2E, TDD. Tu testes les 3 frameworks que tu viens d'apprendre. | Complet |
| 8 | 07 — NestJS | Tu comprends enfin ce qu'il y a derriere une API. Node.js, Express, puis NestJS. | Complet |
| 9 | 08 — PostgreSQL | La couche donnees. SQL, indexes, EXPLAIN ANALYZE, puis ORM. | Complet |

<details>
<summary><strong>Guide d'utilisation optimale — 06 Testing (19 modules, 18 labs, 19 quizzes)</strong></summary>

**Correction d'ordre — TDD remonte tot :**

1. Modules 00-05 (Prérequis → Pourquoi tester → Anatomie → Vitest → Mocking → Async)
2. **Module 15 (TDD/BDD) ICI** — le reflexe TDD s'ancre tot
3. Modules 06-09 (Architecture testable → Composants → MSW → Intégration) — avec le reflexe TDD
4. Modules 10-13 (Playwright → Playwright avance → Couverture/Mutation → CI/CD)
5. Module 14 (Flaky tests)
6. Modules 16-18 (Contract testing → Performance testing → Projet final)

| Modules | Mode | Notes |
|---------|------|-------|
| 00-05 | **Normal** | Fondamentaux testing : Vitest, mocking, async |
| 15 (TDD) | **Deep dive ICI** | Remonte le TDD tot pour ancrer le reflexe |
| 06 | **Normal** | Architecture testable — saut conceptuel. Si c'est flou, reviens après NestJS. |
| 07-09 | **Deep dive** | Tests composants, MSW, intégration — directement applicable a tes 3 frameworks |
| 10-11 | **Deep dive** | Playwright — tu en auras besoin sur toute mission |
| 12-13 | **Normal** | Couverture, mutation testing, CI |
| 14 | **Normal** | Flaky tests |
| 16 | **Normal** | Contract testing — prendra tout son sens après NestJS |
| 17-18 | **Normal** | Performance testing, projet final |

**Fil rouge :** Ajoute des tests Playwright au parcours critique de ton app.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 07 NestJS (27 modules, 26 labs)</strong></summary>

3 blocs distincts. Le bloc Express (05-08) est la fondation. Le bloc NestJS (09-13) est le coeur. Le bloc ORM (14-17) s'eclairera après PostgreSQL.

| Modules | Mode | Notes |
|---------|------|-------|
| 00 | **Normal** | Prérequis |
| 01-02 | **Lecture rapide** | Event loop, modules FS — revisions si tu as fait JS Runtime |
| 03-04 | **Normal** | Streams, serveur HTTP natif — nouveau |
| 05-08 | **Normal** | Express — la couche sous NestJS |
| 09 | **Deep dive** | **Changement de paradigme.** Warning dans le module. Prends ton temps. Compare la DI avec Angular. |
| 10-13 | **Deep dive** | DI, modules, pipes, guards — le coeur |
| 14-17 | **Normal** | TypeORM/Prisma — fais-le sans stresser sur le SQL, tu comprendras mieux après PostgreSQL |
| 18-20 | **Normal** | Testing NestJS, Auth, Config |
| 21-24 | **Normal** | WebSockets, Deploy, Projet final |
| 25-26 | **Normal** | MongoDB, GraphQL — extensions |

> **Pourquoi ne pas entrelacer NestJS et PostgreSQL ?** Parce que l'entrelacement ajoute de la friction cognitive. L'ORM fonctionne sans comprendre le SQL brut — tu apprendras TypeORM/Prisma comme des outils, puis PostgreSQL revelera ce qu'ils font sous le capot.

**Fil rouge :** API NestJS pour ton app. CRUD complet avec auth.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 08 PostgreSQL (19 modules, 18 labs, 19 quizzes)</strong></summary>

Après NestJS, tu reviens sur ce que l'ORM faisait sous le capot. Le triplet 08-10 est le passage le plus dur.

| Modules | Mode | Notes |
|---------|------|-------|
| 00-07 | **Deep dive** | SQL, relations, transactions, indexes, query planner — le coeur. Après ce bloc, repense aux modules ORM de NestJS : "ah, VOILA ce que TypeORM generait" |
| 08-10 | **Lecture + quiz** (~2h pour les 3) | Isolation, locks, deadlocks. Warning dans le module 08. Ne deep dive pas sauf besoin en mission. |
| 11-13 | **Deep dive** | Performances, fonctions SQL, JSONB — directement utile |
| 14-15 | **Normal** | Sécurité, projet final |
| 16-18 | **Survol** (~1h) | Replication, monitoring, partitioning — culture DBA |

**Fil rouge :** Base PostgreSQL pour ton app. Ecris les requêtes à la main avant d'utiliser l'ORM.

</details>

**Résultat tangible :** ton app fil rouge a maintenant une API NestJS, une base PostgreSQL, et des tests. C'est une vraie app fullstack.

**Palier de staffabilite :** après Phase D (~480h), tu es **staffable fullstack JS**.

### Phase E — Déployer et connecter (~100h, ~2 mois)

| Ordre | Cours | Pourquoi maintenant | Mode |
|-------|-------|-------------------|----||
| 10 | 09 — HTTP & Caching | Cache-Control, CDN, SSR/ISR, Redis, Service Workers. Tu comprends pourquoi ton site est lent ou rapide. | Complet |
| 11 | 10 — AWS Cloud | Tu déployés ton app fil rouge. IAM, S3, Lambda, CDK, CloudFront, CI/CD. Le module 19 (déployer Nuxt/Next) est le climax. | Complet |

<details>
<summary><strong>Guide d'utilisation optimale — 09 HTTP & Caching (21 modules, 20 labs, 21 quizzes)</strong></summary>

| Modules | Mode | Notes |
|---------|------|-------|
| 00-09 | **Deep dive** | HTTP basics, headers, Cache-Control, ETag, CDN, multi-layer — tout est directement applicable |
| 10-12 | **Normal avec patience** | SSR, ISR, Edge rendering — ça connecte avec ce que tu as vu dans Vue/React/Angular. Warning dans le module 10. |
| 13-15 | **Normal** | Streaming, performance, projet final |
| 16 (Nginx) | **Normal** | Annexe |
| 17 (TLS) | **Normal** | Annexe |
| 18 (OWASP) | **Deep dive** | Sécurité applicable — important |
| 19 (Redis) | **Normal** | Cache applicatif |
| 20 (GraphQL) | **Survol** si pas de GraphQL en mission | |

**Fil rouge :** Ajoute des Cache-Control a ton API NestJS. Mesure la différence.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 10 AWS Cloud (20 modules, 20 labs, 20 quizzes)</strong></summary>

Le climax du parcours — tu déployés ton app.

| Module | Mode | Notes |
|--------|------|-------|
| 00 (Prérequis) | **Normal** | Configure le CLI avant de continuer |
| 01 (IAM) | **Deep dive** | Fondement de tout AWS |
| 02-03 (VPC, EC2) | **Lecture attentive** | Comprendre, pas memoriser |
| 04 (S3) | **Deep dive** | Tu l'utiliseras tout le temps |
| 05 (CDK) | **Deep dive** | IaC — seul S3 comme exemple pour l'instant |
| 06 (Lambda) | **Deep dive** | Le coeur du serverless |
| 07 (API Gateway) | **Deep dive** | Expose tes Lambda |
| 08 (RDS) | **Normal** | Tu connais déjà PostgreSQL |
| 09 (DynamoDB) | **Deep dive** | Paradigme différent du SQL |
| 10 (SQS/SNS) | **Normal** | Comprendre quand utiliser lequel |
| 11 (Cognito) | **Deep dive** | Intégration front direct |
| 12 (ECS/Fargate) | **Lecture attentive** | Rarement configure toi-même |
| 13 (CloudFront) | **Deep dive** | Sert ton site en prod |
| 14 (CloudWatch) | **Normal** | Pont avec le cours Obs |
| 15 (Sécurité) | **Lecture attentive** | Savoir que ça existe |
| 16 (Serverless) | **Deep dive** | SST — le vrai outil de deploy |
| 17 (CI/CD) | **Deep dive** | GitHub Actions → AWS, OIDC |
| 18 (Projet Final) | **Normal** | |
| 19 (Deploy Nuxt/Next) | **Deep dive — climax** | Deploie ton app fil rouge |

**Fil rouge :** Deploy sur AWS avec CloudFront + CI/CD. Lien public.

</details>

**Résultat tangible :** ton app fil rouge est déployée sur AWS avec CloudFront, CI/CD et un vrai domaine. Tu peux envoyer le lien à un recruteur.

**Palier de staffabilite :** après Phase E (~580h), tu es **staffable fullstack JS avec deploy**.

### Phase F — Le palier senior (~140h, ~3 mois)

| Ordre | Cours | Pourquoi maintenant | Mode |
|-------|-------|-------------------|----||
| 12 | 11 — Architecture | SOLID, DDD, clean arch, microservices, micro-frontends. Tu as construit une vraie app fullstack — ces patterns prennent tout leur sens. | Complet |
| 13 | 12 — Observabilité & SRE | Logging, metriques, tracing, Grafana, SLOs, incidents. Tu sais construire et déployer — maintenant tu observes et maintiens. | Complet |

<details>
<summary><strong>Guide d'utilisation optimale — 11 Architecture (99 modules, 67 exercices)</strong></summary>

C'est le cours **le plus massif** du curriculum. Ne fais PAS tout en deep dive — 138h c'est trop.

| Sections | Mode | Notes |
|----------|------|-------|
| 00-01 (fondamentaux, patterns) | **Deep dive** | SOLID, design patterns. Pont avec module 18 de TypeScript (TS = implementation, Archi = quand/pourquoi). |
| 02 (DDD) | **Deep dive** | Modelisation domaine, bounded contexts |
| 03-04 (backend, BDD) | **Normal** | Tu connais déjà NestJS + PG |
| 05 (frontend) | **Deep dive** | Ton profil front — component trees, design tokens, SSR/ISR |
| 06-07 (communication, distribues) | **Lecture + exercices clés** | Pont avec le cours Systèmes Distribues |
| 08-09 (sécurité, performance) | **Normal** | Applicable au fil rouge |
| 10-11 (observabilité, testing) | **Lecture rapide** | Pont avec cours Obs et Testing |
| 12-13 (pratique, culture) | **Deep dive** | ADR, code review, estimation, refactoring legacy — les skills senior soft |

**Fil rouge :** Restructure ton app en clean arch / hexagonal. Ecris un ADR pour chaque decision.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 12 Observabilité & SRE (28 modules, 26 labs, 27 quizzes)</strong></summary>

**Ordre ajuste pour ton profil front :**

| Modules | Mode | Notes |
|---------|------|-------|
| 00-04 | **Deep dive** | Logging structure (Pino), metriques, Prometheus — les fondamentaux |
| 05-06 | **Deep dive** | Distributed tracing, OpenTelemetry — applicable a ton app |
| 07 | **Deep dive** | Sentry — tu l'utiliseras sur toute mission |
| 08-09 | **Normal** | OTel Collector, Grafana dashboards |
| 10-13 | **Normal** | SLI/SLO, alerting, incidents, capacity planning — culture SRE |
| 14 | **Normal** | Chaos engineering |
| 15-18 | **Normal** | DORA, Obs as Code, production readiness, projet final |
| **23-26 d'abord** | **Deep dive** | Frontend Obs, Instrumentation Nuxt/Next, APM panorama, Feature Flags — ton profil |
| 19-22 en dernier | **Survol** | K8s, FinOps, ELK, RGPD — culture, pas deep dive |

**Fil rouge :** Ajoute Pino + OpenTelemetry + dashboard Grafana a ton app.

</details>

**Palier de staffabilite :** après Phase F (~778h), tu es **staffable senior fullstack JS** (80% des missions).

### Phase G — Elargir le spectre (~150h, ~3 mois)

| Ordre | Cours | Mode |
|-------|-------|----||
| 14 | 13 — Systèmes distribues | Partiel (~35h effectifs) : deep dive modules pratiques (00-09, 15-19), lecture modules théoriques (10-14, 20-23) |
| 15 | 14 — IA pour Devs JS | Complet. Correction : lire module 12 (Tokenization/Embeddings) avant module 09 (Transformer) |

<details>
<summary><strong>Guide d'utilisation optimale — 13 Systèmes distribues (26 modules, 24 labs)</strong></summary>

Partiel (~35h effectifs). Deep dive sur le pratique, survol sur la théorie pure.

| Modules | Mode | Notes |
|---------|------|-------|
| 00-09 | **Deep dive** | Communication, microservices, event-driven, retries — patterns que tu verras en mission |
| 10-14 | **Lecture + quiz** | CAP, saga, CQRS, outbox — comprends l'intuition, pas les details |
| 15-19 | **Deep dive** | Failures, circuit breaker, rate limiting, testing — directement applicable |
| 20-23 | **Survol** | Consensus, horloges, CRDTs — culture, pas de lab obligatoire |
| 24 | **Normal** | Projet final |

**Fil rouge :** Ajoute un circuit breaker et du retry avec backoff a ton app.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 14 IA pour Devs JS (20 modules, 20 labs, 20 quizzes)</strong></summary>

**Correction d'ordre dans Partie 2 :** Lis le module 12 (Tokenization/Embeddings) AVANT le module 09 (Transformer).

| Modules | Mode | Notes |
|---------|------|-------|
| 00 | **Normal** | Prérequis et paysage IA |
| 01-02 | **Normal** | Prompting fondamental + avance — tu utilises déjà l'IA |
| 03 | **Normal** | Copilot/assistants code |
| 04-05 | **Deep dive** | API Claude/OpenAI + MCP — c'est ce qui te rend productif |
| 06 | **Deep dive** | Agents et orchestration — le sujet du moment |
| 07 | **Normal** | Maths essentielles. Warning dans le module. Comprends l'intuition, pas les formules. |
| 08 | **Normal** | Neural networks from scratch. Warning dans le module. L'objectif est l'intuition. |
| **12** | **Normal** | **LIS-LE ICI** — Tokenization/Embeddings avant le Transformer |
| 09 | **Deep dive** | Architecture Transformer — avec les embeddings en tete, ça fait sens |
| 10 | **Normal** | Fine-tuning |
| 11 | **Normal** | Ollama / LLMs locaux |
| 13-15 | **Deep dive** | RAG fondamental → avance → chatbot — tu construis quelque chose |
| 16 | **Normal** | Évaluation et observabilité LLM |
| 17-18 | **Normal** | Sécurité, production, couts |
| 19 | **Normal** | Projet final |

**Fil rouge :** Ajoute un chatbot RAG a ton app qui repond sur tes propres donnees.

</details>

### Phase H — Bonbons (optionnel, ~115h)

| Cours | Quand |
|-------|-------|
| 15 — React Native | Si une mission mobile se présenté |
| 16 — WebGPU & 3D | Si une mission dataviz/3D se présenté |

<details>
<summary><strong>Guide d'utilisation optimale — 15 React Native (28 modules, 28 labs)</strong></summary>

| Modules | Mode | Notes |
|---------|------|-------|
| 00-07 | **Deep dive** | Fondamentaux : JSX mobile, navigation, state, APIs natives — le socle |
| 08-12 | **Deep dive** | Networking, formulaires, storage, notifications, permissions — features courantes |
| 13-15 | **Normal** | Animations, maps, camera |
| 16-17 | **Normal** | Animated API |
| 18 | **Normal avec patience** | Reanimated + Gesture Handler — pic de difficulte |
| 19-20 | **Deep dive** | Testing + E2E avec Detox |
| 21-22 | **Normal** | Deploy EAS + CI/CD |
| 23-24 | **Survol** | Native Modules + Fabric/JSI — très avance, lire pour la culture |
| 25-27 | **Survol** | Hermes, Turbo Modules, performance — idem |

**Fil rouge :** Version mobile de ton app.

</details>

<details>
<summary><strong>Guide d'utilisation optimale — 16 WebGPU & 3D (31 modules, 30 labs)</strong></summary>

| Modules | Mode | Notes |
|---------|------|-------|
| Prérequis maths | **Deep dive** | Premier item de la sidebar. Fais-le avant tout le reste. |
| 00 | **Normal** | Prérequis et introduction |
| 01-03 | **Deep dive** | Algebre lineaire, transformations, cameras — les maths 3D |
| 04-05 | **Normal** | Pipeline de rendu, lumiere/PBR — théorie |
| 06-08 | **Deep dive** | WebGL fondamentaux, shaders, scene complete — ton premier rendu |
| 09-12 | **Deep dive** | WebGPU architecture, render pipeline, compute shaders — le coeur du cours |
| 13-17 | **Normal** | Three.js fondamentaux → performance |
| 18-20 | **Normal** | Shadow mapping, shaders creatifs, physique |
| 21 | **Normal** | Projet intermédiaire |
| 22+ (annexes) | **Survol** | Ray tracing, volumetric, WebXR — bonus |

**Fil rouge :** Un dashboard 3D interactif ou une visualisation de donnees.

</details>

### Résumé du parcours personnalise

```
Phase A ─ Frameworks     ██████████████████████░░░░░░░░░░░░░░░░░  ~195h  (mois 1-4)
Phase B ─ TS + Runtime   █████████████████████████░░░░░░░░░░░░░░  ~85h   (mois 5-6)
Phase C ─ Algorithmie    ██████████████████████████░░░░░░░░░░░░░  ~45h   (mois 7, ou en parallèle)
Phase D ─ Test + Back    ███████████████████████████████░░░░░░░░  ~155h  (mois 8-11)
Phase E ─ HTTP + Deploy  ███████████████████████████████░░░░░░░░  ~100h  (mois 11-13)
Phase F ─ Senior         ███████████████████████████████████░░░░  ~198h  (mois 14-17)
Phase G ─ Spectre        ████████████████████████████████████████  ~150h  (mois 18-20)
Phase H ─ Bonbons        ████████████████████████████████████████  ~115h  (optionnel)
                                                     Socle : ~928h (~20 mois a 2h/jour)
```

**Paliers de staffabilite :**
- **Après Phase A (~195h, mois 4)** : staffable sur toute mission front-end (React, Vue/Nuxt, Angular)
- **Après Phase D (~480h, mois 11)** : staffable fullstack JS
- **Après Phase E (~580h, mois 13)** : staffable fullstack JS avec deploy
- **Après Phase F (~778h, mois 17)** : staffable senior fullstack JS (80% des missions)
- **Après Phase G (~928h, mois 20)** : staffable sur quasi tout le spectre JS

---

## Vue d'ensemble

```
Palier 1 ─ Fondations         ███████████████████░░░░░░░░░░░░░░░░░░░░  ~130h
Palier 2 ─ 3 Frameworks       ██████████████████████████░░░░░░░░░░░░░  ~195h
Palier 3 ─ Testing + Backend  ████████████████████████████████░░░░░░░  ~195h
Palier 4 ─ Archi & systemes   ██████████████████████████████████████░  ~313h
Palier 5 ─ Bonbons            ████████████████████████████████████████  ~115h
Palier 6 ─ IA                 ████████████████████████████████████████  ~60h
                                                             Total : ~1008h
```

**A 2h/jour** : ~20-24 mois | **A 3h/jour** : ~13-16 mois | **Temps plein** : ~5-6 mois

### Parcours minimum viable (~4 mois, ~350h)

> Pour etre staffable fullstack JS rapidement. Le reste s'apprend en mission.

```
React (complet)             ~60h
  → TypeScript (modules 00-09)  ~25h
  → Testing (modules 00-11) ~30h
  → NestJS (complet)        ~65h
  → PostgreSQL (modules 00-11) ~30h
  → HTTP/Caching (modules 00-09) ~25h
                   Total : ~235h (~3 mois a 3h/jour)
```

Ajoute Vue + Angular (~135h) pour couvrir les 3 frameworks = **~370h en ~4 mois**.

---

## Compétences couvertes vs missions ESN

| Type de mission | Cours concernes | Pret ? |
|-----------------|-----------------|--------|
| Front Vue/Nuxt | 01, 03, 04, 06, 09, 11 | Oui |
| Front React/Next | 00, 03, 04, 06, 09, 11 | Oui |
| Front Angular | 02, 03, 04, 06, 09, 11 | Oui |
| Full-stack Node | 03, 04, 06, 07, 08, 09, 10, 11 | Oui |
| Mobile React Native | 00, 03, 04, 06, 15 | Oui |
| Archi/Lead tech | 06, 10, 11, 12, 13 | Oui |
| Cloud / Deploy | 07 (deploy), 09, 10, 12 | Oui |
| IA / Agent dev | 06, 07, 11, 14 | Oui |
| DevOps/SRE | 07 (deploy), 10, 12, 13 | Oui |
| Performance | 04, 09, 11, 12 | Oui |
| Accessibilité | 00, 01, 02, 15 + certification auditeur | Oui |

---

## Lacunes identifiees — Resolues

Les lacunes initiales ont ete comblees par des modules complementaires integres aux cours existants :

### 1. MongoDB / NoSQL — Integre au cours NestJS

**Module 25 — MongoDB & Mongoose** : schemas avec decorateurs @Schema/@Prop, CRUD complet, recherche regex, aggregation pipeline, embedding vs referencing, indexes, migration depuis TypeORM/Prisma. Lab avec mongodb-memory-server (14 tests e2e).

### 2. GraphQL — Integre au cours NestJS

**Module 26 — GraphQL avec NestJS** : approche code-first avec Apollo Server, @ObjectType/@Field, @Query/@Mutation/@ResolveField, problème N+1 et DataLoader, subscriptions, comparaison REST vs GraphQL. Lab complet (10 tests e2e).

### 3. Outils d'observabilité commerciaux — Integres au cours Observabilité & SRE

Sentry deplace dans le tronc principal (après distributed tracing). ELK Stack & Kibana maintenu en annexe. Nouveaux modules ajoutes : observabilité frontend, panorama APM, feature flags.

### 4. AWS Cloud — Nouveau cours #10

Cours complet ajoute couvrant IAM, S3, Lambda, CDK, CloudFront, DynamoDB, Cognito, déploiement Nuxt/Next. Place au Palier 5 (Architecture & Systèmes).

### 5. Redis & GraphQL caching — Integres au cours HTTP & Caching

**Module 19 — Redis et cache applicatif** : cache-aside, write-through, TTL, invalidation, ioredis.
**Module 20 — Cache et GraphQL** : normalized cache, persisted queries, APQ, dataloader pattern.

### 6. Enrichissements transversaux

- HTTP: Service Workers (module 07), Speculation Rules (module 14), Nuxt SSR/ISR spécifique (modules 10-11), cache observability (module 09)
- AWS: presigned URLs (module 04), SST framework (module 16), Route 53/DNS/ACM (module 12)
- Observabilité: OTel Collector et Obs-as-Code allege (focus dev JS), incidents+postmortems fusionnes, metriques 04+05 fusionnees

### 7. Lacunes restantes a adresser

La plupart des lacunes senior sont maintenant couvertes par le cours Architecture (99 modules) :
- **Code review, ADR, RFC** → section `13-culture-architecturale`
- **Estimation & découpé de tickets** → exercice `60-decision-katas`
- **Migration & refactoring** → exercices `01-refactoring-solid`, `05-layered-to-hexagonal`

Lacune restante :
- **Git workflow avance** (rebase interactif, bisect, stratégies de branching) — à intégrer dans le cours Testing ou en module transversal

---

## Passerelles entre cours

Certains sujets traversent plusieurs cours. Voici les ponts à connaître pour éviter la sensation de déjà-vu et comprendre les différentes perspectives :

| Sujet | Cours concernes | Perspective |
|-------|----------------|-------------|
| **Authentification** | 05 (NestJS: JWT, Passport, guards), 09 (Cognito: auth cloud), 16 (AWS: Cognito + IAM) | NestJS = implementation, Cognito = auth-as-a-service, AWS IAM = permissions infra |
| **Sécurité** | 07 (HTTP: CSP, CORS, HSTS — annexe C), 10 (Archi: sécurité applicative), 16 (AWS: IAM, KMS, WAF) | HTTP = headers de sécurité, Archi = OWASP/sécurité by design, AWS = sécurité cloud |
| **CDN / Cache** | 07 (HTTP: Cache-Control, CDN, SSR/ISR), 16 (AWS: CloudFront CDN) | HTTP = théorie et headers, AWS = mise en pratique avec CloudFront |
| **Systèmes distribues** | 11 (Systèmes distribues: théorie CAP, consensus, CRDT), 12 (Observabilité: tracing distribue, SLO) | SD = patterns théoriques, Obs = comment observer ces systèmes en prod |
| **CI/CD** | 04 (Testing: CI pipelines), 16 (AWS: CodePipeline, GitHub Actions → AWS), 12 (Obs: DORA metrics) | Testing = intégrer les tests en CI, AWS = déployer en CI/CD, Obs = mesurer la CI/CD |
| **GraphQL** | 05 (NestJS: GraphQL server), 07 (HTTP: cache et GraphQL — module 20) | NestJS = serveur GraphQL, HTTP = caching GraphQL |
| **Performance** | 02 (JS Runtime: V8, profiling), 07 (HTTP: Core Web Vitals, cache), 12 (Obs: metriques, RUM) | Runtime = performance moteur, HTTP = performance réseau, Obs = mesurer en prod |
| **Docker / Containers** | 05 (NestJS: deploy), 11 (SD: containers), 12 (Obs: K8s observability), 16 (AWS: ECS/Fargate) | Chaque cours utilise Docker sous un angle différent |

---

## Structure des cours

Chaque cours suit la même pedagogie :

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
pnpm install
pnpm docs:dev   # demarre VitePress (port variable selon le cours)
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

| Cours | Modules | Exercices | Format | Duree est. |
|-------|---------|-----------|--------|-----------|
| 00 — React | 40 | 24 | Markdown (`cours/` + `exercices/`) | ~60h |
| 01 — Vue.js | 44 | 33 | Vite app (`cours/` + `exercices/`) | ~75h |
| 02 — Angular | 43 | 26 | Markdown (`cours/` + `exercices/`) | ~60h |
| 03 — TypeScript | 20 | 19 | VitePress (`modules/` + `labs/`) | ~50h |
| 04 — JS Runtime | 16 | 15 | VitePress | ~35h |
| 05 — Algorithms | 13 | 12 | VitePress | ~45h |
| 06 — Testing | 19 | 18 | VitePress | ~45h |
| 07 — NestJS | 27 | 26 | VitePress | ~65h |
| 08 — PostgreSQL | 19 | 18 | VitePress | ~45h |
| 09 — HTTP & Caching | 21 | 20 | VitePress | ~40h |
| 10 — AWS Cloud | 20 | 20 | VitePress — [submodule GitHub](https://github.com/smaurier/aws-autotraining) | ~60h |
| 11 — Architecture | 99 | 67 | Markdown (`cours/` + `exercices/`) | ~138h |
| 12 — Observabilité & SRE | 28 | 26 | VitePress | ~60h |
| 13 — Systèmes distribues | 26 | 24 | VitePress | ~55h |
| 14 — IA pour Devs JS | 20 | 20 | VitePress | ~60h |
| 15 — React Native | 28 | 28 | VitePress | ~55h |
| 16 — WebGPU & 3D | 31 | 30 | VitePress | ~60h |
| **Total** | **~501** | **~414** | **16 submodules** | **~963h** |

---

## Ressources transversales

| Ressource | Fichier | Description |
|-----------|---------|-------------|
| Code Katas — Frameworks | `katas/phase-a-frameworks.md` | 15 katas React/Vue/Angular (30-60 min) |
| Code Katas — Backend & Infra | `katas/phase-bde-backend-infra.md` | 20 katas TS/NestJS/PG/Testing/HTTP/Obs/AWS |
| Projet Capstone | `capstone/projet-capstone-fullstack.md` | "TaskFlow" — projet fullstack cross-cours |
| Erreurs Classiques | `cheat-sheets/erreurs-classiques.md` | 45 erreurs courantes avec code wrong/right |
| Guides de Migration | `cheat-sheets/guides-migration.md` | React 18→19, Vue 3.4→3.5, Angular 18→19, Next Pages→App |
| Diagrammes Architecture | `cheat-sheets/diagrammes-architecture.md` | 12 diagrammes Mermaid (event loop, MVCC, OAuth2...) |
| Cheat Sheets | `cheat-sheets/phase-*.md` | 3 fiches de synthese par phase |
| Questions d'Entretien | `interview/questions-entretien.md` | 106 questions Junior→Senior, 10 cours |
| Glossaire | `glossaire.md` | 90 termes techniques avec renvois modules |
| Parcours Thematiques | `parcours-thematiques.md` | 5 parcours orientes objectif (1-6 semaines) |

---

*Curriculum généré et maintenu avec l'aide de Claude Code.*
