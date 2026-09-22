# Gestes métier complets — cible par cours

> Règle qualité 5 du parcours (22/09/2026) : **un lab = un geste métier complet**, sous deux formes,
> **construire de zéro un artefact réel et entier** (tous les endroits que le métier exige) et
> **intervenir dans l'existant** (consommateurs + non-régression + findings avant code).
> Ce document est le jugement par cours ; le signal brut (heuristique par lab) est dans
> `scan-gestes.md`. Le constat global : 485 labs, **8 oracles** (tous TypeScript 01-08), et un
> format « un lab = un concept d'un module » quasi partout. Application juste-à-temps : chaque
> cours est réécrit selon cette cible **avant d'entrer en file**, jamais en masse.

Légende : **Z** = geste de zéro · **I** = geste d'intervention · **fiche** = concept qui reste
une lecture + retrieval, pas un lab.

## ARC 1

### 00 TypeScript
- Z : la **source de vérité d'un domaine** (types, guards, entités) utilisable telle quelle par un front et une API. Labs 03 + 05 en sont déjà proches ; le lab-19 projet final doit devenir *ce* geste : un paquet de types publié (`@tribuzen/domain`) consommé par les deux côtés.
- I : lab-06 (refactor de duplication) et lab-08 (commit fautif d'un collègue) **sont déjà** des interventions ; en ajouter une sur une base typée `any` héritée à durcir (labs 11-13 fusionnés).
- Fiches : conditional/mapped types, variance, declaration files (labs 11-13, 15-16) → concepts, pas gestes.
- Statut : 8/19 au format oracle ; règle 5 appliquée aux prochains convertis (09-10, 14, 19).

### 06 Testing / TDD
- Z : **un module métier écrit en TDD strict de A à Z** (invitation familiale : règles, doubles, tests de contrat), avec pyramide visible (unit → intégration → E2E Playwright sur un écran réel).
- I : **caractériser du code legacy sans tests** (golden master, puis refactor sous filet) ; **réparer une suite flaky** ; **relire une PR de tests** (findings avant vérité). Aucun de ces trois n'existe aujourd'hui.
- Fiches : mutation testing, performance testing.
- Statut : 0/19 oracle. Comme le TDD est transversal, ce cours devient court : 3 Z + 3 I.

### 09 NestJS
- Z : **une API de bout en bout depuis un dossier vide** — module, DTO + validation, guard, service, repository, tests unit + e2e supertest, Docker, jusqu'au `curl` qui répond. Aujourd'hui découpé en 26 labs-concepts (pipes ici, guards là).
- I : **ajouter un endpoint à une API existante consommée par un front** (contrat OpenAPI à ne pas casser) ; **corriger une faille d'autorisation rapportée** ; **migrer NestJS 10 → 11** (le lab-18 est pinné ^10, courant 11 : intervention réelle).
- Fiches : GraphQL, MongoDB, microservices.
- Statut : 1/26 oracle ; cible 4 Z + 4 I + fiches.

### 10 PostgreSQL
- Z : **un schéma complet depuis zéro** — tables, contraintes, migrations additives, index justifiés par `EXPLAIN`, jeu de données, requêtes de l'appli. Un seul geste, pas 18.
- I : **une requête lente en prod à diagnostiquer et corriger** (EXPLAIN ANALYZE, index, réécriture) ; **un deadlock reproduit puis résolu** (isolation, verrous — jamais pratiqués, cf note 02/09) ; **une migration destructive à rendre sûre**.
- Fiches : réplication, partitioning, monitoring DBA.
- Statut : 0/18 ; cible 2 Z + 4 I.

### 04 React
- Z : **une feature de bout en bout** — écran, état, appel API typé, formulaire validé, tests RTL + MSW, a11y. Le cours a 43 labs-concepts (`useRef`, `useMemo`…) : la plupart deviennent des fiches « Lire avant ».
- I : **ajouter une capacité à un composant existant consommé** (le cas Elcia, côté React) ; **corriger un re-render inutile mesuré au profiler** ; **migrer une page vers Server Components** ; **relire une PR React** (findings).
- Statut : 0/43 ; cible 4 Z + 4 I, le reste en fiches.

## ARC 2

### 21 Design System
- Z : **un composant avec ses six endroits** (contrat de props, mapping style/tokens, non-fuite DOM, a11y, story, tests) — `Text`, `Button`, puis `RoutineCard` composé.
- I : **ajouter `lines` à `Text` consommé par 3 écrans** (le cas Elcia) ; **bug a11y rapporté sur un Dialog** ; **dark mode par les tokens sans toucher aux consommateurs** ; **migrer Storybook** (le corpus cible SB8/9, courant **10.6**).
- Fiches : CSS fondamentaux, Framer Motion.
- Statut : 0/9 ; **en cours de refonte (22/09), lab 1 en premier** ; 8 labs cibles, plan dans PARCOURS cours 06.

### 13 Architecture
- Z : **structurer une appli en clean/hexagonal depuis zéro** avec les tests qui prouvent les frontières (le domaine ne dépend de rien) + les ADR qui justifient chaque coupe.
- I : **extraire un domaine d'un monolithe existant** sans casser les consommateurs ; **relire une architecture et écrire les findings** (sparring archi hebdo déjà prévu) ; **contester un ADR existant**.
- Statut : 0/24 (126 fichiers de tests présents mais sans lien lab) ; cible 2 Z + 3 I.

### 14 Sécurité
- Z : **un flux d'auth complet OIDC/PKCE + WebAuthn** sur l'API et le front, testé (le blanc OAuth du 29/08 vient de l'absence de ce geste).
- I : **auditer une appli et corriger le top 3 OWASP trouvé** ; **une CSP à poser sur un front existant sans rien casser** ; **relire une PR d'auth**.
- Statut : 0/14 ; cible 1 Z + 3 I.

### 01 JS Runtime
- Z : **un profil de perf de bout en bout** — mesurer, trouver la fuite/le blocage, corriger, prouver au chiffre.
- I : **une fuite mémoire réelle dans un composant existant** ; **un event loop bloqué en prod**.
- Fiches : V8, JIT, hidden classes (culture d'entretien).
- Statut : 0/15 ; cible 1 Z + 2 I + fiches.

### 11 HTTP / Caching
- Z : **une stratégie de cache complète** sur une API existante (headers, ETag, CDN, Redis) mesurée avant/après ; **une PWA offline-first** de zéro.
- I : **un cache qui sert du stale en prod** à diagnostiquer ; **ajouter le Push à une appli existante**.
- Statut : 0/18 ; cible 2 Z + 2 I.

### 07 Git avancé
- Z : **une stratégie de branches + historique propre** sur un vrai repo.
- I : tout le cours est naturellement de l'intervention : **bisect sur une régression réelle**, **rebase interactif d'une branche sale**, **conflit à résoudre sans perdre de travail**.
- Statut : 0/10 ; cible 1 Z + 3 I.

## ARC 3

### 12 AWS · 15 CI/CD · 16 Observabilité
- Z : **déployer TribuZen de bout en bout** (IAM, S3, Lambda/ECS, RDS, CloudFront) avec pipeline GitHub Actions + Terraform, logs Pino, Sentry, dashboard. **Un seul geste sur les trois cours**, pas 55 labs.
- I : **un déploiement cassé à diagnostiquer** ; **une pipeline lente à accélérer** ; **une alerte à poser sur un SLI réel** ; **une facture cloud à réduire**.
- Statut : 0/55 ; cible 1 Z transverse + 4 I ; la certification AWS est la preuve de sortie.

### 05 Algorithms
- Concepts par nature (fiches + katas). Un seul Z : **l'arbre familial TribuZen en graphe** avec BFS + debounce, testé.
- Statut : 0/12 ; cible 1 Z + katas.

### 17 Systèmes distribués
- Z : **rendre résilient un appel externe** (circuit breaker, retry, backoff) sur l'API existante, prouvé par un test de panne.
- I : **une saga/outbox à poser sur un flux existant** ; **une panne en cascade à reproduire et contenir**.
- Fiches : CAP, consensus, CRDT.
- Statut : 0/23 ; cible 1 Z + 2 I.

## BIBLIOTHÈQUE (rénovée seulement si un besoin daté la tire)

- **08 Soft Skills** : ADR/revue sortis vers la voie lecture critique ; reste estimation + communication → fiches.
- **22 Stripe** : Z = **freemium de bout en bout** (Checkout, webhook signé, gate NestJS, portail) ; I = **un webhook perdu à rejouer**.
- **18 IA** : Z = **un assistant RAG avec eval + guardrails + coûts** (le projet final existe déjà comme intention) ; I = **une injection réussie à corriger**.
- **02 Vue · 03 Angular · 19 React Native** : même schéma que React (une feature de bout en bout + une intervention sur un composant consommé), à écrire si mission.
- **20 WebGPU** : Z = **une scène complète** ; I = **un fps effondré à retrouver** (Nahual en est un cas réel).
- **23 Droit** : fiches + une **checklist RGPD appliquée à TribuZen** (Z).

## Ce que ça change dans les chiffres

Aujourd'hui : 485 labs, 8 oracles, ~1 geste complet par cours au mieux (les « projets finaux »).
Cible : ~90 labs-gestes + fiches. **Moins de labs, tous entiers, tous avec oracle.** Un cours
n'entre en file qu'une fois réécrit selon sa ligne ci-dessus (règle 1 : juste-à-temps).
