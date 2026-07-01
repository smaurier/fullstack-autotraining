# Parcours Sylvain

Une liste. Un cours à la fois. Tu coches quand c'est fini.

**Fil rouge : TribuZen.** Chaque cours produit quelque chose de concret dans TribuZen.
Tu n'apprends pas "pour plus tard" — tu construis maintenant.

---

## 🔴 Priorité actuelle (maj 2026-07-01) — Bedrock

Mission ESN **Bedrock** (dev Vue/Nuxt, squad Core : migration + outils internes + IA, "dev qui utilise beaucoup Claude"). Le boss est hypé (CV + mission Eudonet). → **Vue passe #1**, devant tout le reste. RGAA (22 oct) reste la 2e priorité datée.

**Cet ordre-ci prime sur "l'ordre révisé 2026-06-26" plus bas** (qui déférait Vue "après premier poste"). L'ancien ordre reste valable pour les cours non-Bedrock, à reprendre après.

```
1  Vue / Nuxt   ⭐ Bedrock — refonte v1 en cours, ordre novice→expert (voir 02-vue/cours/parcours.md)
2  RGAA         priorité datée 22 oct (préparation séparée)
…  reste du parcours (ordre révisé 2026-06-26 ci-dessous) ensuite
```

Refonte 02-vue en cours : rebuild de chaque module au template v1 (audit-first), dans l'ordre pédagogique débutant→expert. Ne pas sauter l'ordre.

### Vagues de réécriture — pilotées CV + offre Bedrock (maj 2026-07-01)

L'ordre de réécriture des cours suit ce qui prépare à **défendre chaque claim du CV** (Eudonet : Nuxt 4/Vue 3 SSR+ISR, tokens OKLCH, cache 3 couches Nitro, AI-assisted engineering) et à couvrir les 3 axes du poste Bedrock (**migration d'app · outils internes réutilisables · IA, voire en construire**).

```
Vague 1  02-vue          ⭐ cœur — Composition API, Pinia, Nuxt SSR/ISR, Router
                            + modules NEUFS : migration Options→Composition · outil interne réutilisable
Vague 2  11-http-caching   SSR/ISR/SWR + cache Nitro 3 couches (ETag / session TTL / mémoire) — claim direct Eudonet
Vague 3  21-design-system  pipeline tokens OKLCH→sémantiques→Tailwind, dark mode SSR, motion — claim direct
Vague 4  18-ia            agents + MCP + RAG — "construire des outils IA" (verbatim boss)
Vague 5  06-testing       Vitest / Playwright / Storybook (déjà à moitié pilote)
```

Chaque module réécrit au **template v1** : audit grille-plancher → réécriture → `validate-module.ps1` OK → build VitePress zéro lien mort. Ordre débutant→expert dans le cours, jamais sauté.

**Matière première stashée** (`git stash pop` quand la vague vient) : WIP non conformes récupérables — 11-http-caching (cache-navigateur, pwa-sw, seo) → vague 2 ; 21-design-system (framer-motion, gsap) → vague 3. Hors-Bedrock stashés aussi (01-js-runtime, 15-cicd, 20-webgpu) → revisite à leur tour dans l'ordre révisé plus bas.

---

## Légende

- **Faire** : labs/modules à faire maintenant
- **Déférer** : utile mais pas maintenant — revenir au bon moment (TOUT finit par être fait)
- **TribuZen** : ce que tu construis dans TribuZen avec ce cours
- Statut : `[ ]` non commencé · `[~]` en cours · `[x]` terminé

---

## En cours

### 01 — TypeScript `00-typescript/`

**Statut :** `[~] En cours` | **Complété le :** —

> Prérequis : JS de base. Aucun autre cours.
> Labs 01-09 déjà faits.

**Faire :**
- [x] lab-10 (Utility types — `Partial<T>`, `Pick<T>`, `Omit<T>`, `ReturnType<T>`)

**Déférer :** labs 11-13 (conditional types, mapped types, type-level programming — trop abstraits, ROI quasi nul pour toi maintenant)

**Déférer :** labs 15-19 (variance, declaration files, tsconfig, patterns, projet final)

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

## Ordre révisé (acté 2026-06-26)

**Objectif : front moyen → bon fullstack. NestJS + PostgreSQL avant React.**

```
02  Testing/TDD      → en cours
03  NestJS           → TS lab-14 décorateurs juste avant (checkpoint)
04  PostgreSQL       → SQL brut avant ORM
05  React + Next.js  → avec l'API déjà construite, le frontend a du sens
06  Design System    → après React (prérequis Tamagui)
07  Vue              → déférer, après premier poste si besoin mission
08  Angular          → déférer, après premier poste si besoin mission
09+ Soft Skills, Architecture, Sécurité, JS Runtime, HTTP/Cache, Git, CI/CD, AWS...
```

---

## À venir

### 02 — Testing / TDD `06-testing/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : TypeScript labs 01-10.

**Faire en premier :**
- [ ] `modules/15-tdd-et-bdd.md` — lis tout
- [ ] `labs/lab-15-tdd-bdd/kata-stringcalculator.ts` — kata from scratch (phase RED)
- [ ] `labs/lab-15-tdd-bdd/exercise.ts` — 6 exercices

**Faire ensuite :**
- [ ] labs 01-05 (fondamentaux : Vitest, mocking, async)
- [ ] lab-07 (tests composants — directement applicable React)
- [ ] lab-09 (tests intégration)
- [ ] labs 10-11 (Playwright — E2E, tu en auras besoin sur toute mission)

**Déférer :** lab-06 (architecture testable — plus clair après NestJS), lab-12 (mutation testing — optionnel), lab-16 (contract testing — après NestJS), lab-17 (performance testing)

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

---

### 03b — Design System & UI/UX

**Statut :** `[ ] Non commencé` | **Complété le :** —

> ⚠️ **Faire APRÈS le cours 03 React** (ci-dessous dans le parcours). Ce bloc est placé ici pour la lisibilité mais le prérequis est React complet.
> Prérequis : React cours 03 complet. CSS de base.
> Cours ajouté : lacune identifiée — shadcn/ui et Radix UI inconnus malgré profil UI/UX.
> Modules dans : `21-design-system/modules/`

**MODULE 01 — CSS fondamentaux solides**
- [ ] Custom properties (CSS variables — base des design tokens)
- [ ] Cascade, spécificité, héritage — maîtriser, pas survoler
- [ ] Flexbox + Grid : les deux, pas l'un ou l'autre
- [ ] Container queries (nouveau standard, important)

**MODULE 02 — Tailwind CSS**
- [ ] Utility-first philosophy vs CSS classique — comprendre le paradigme
- [ ] Responsive (sm/md/lg/xl), dark mode (class strategy)
- [ ] `@layer` (base, components, utilities)
- [ ] `arbitrary values`, `group`, `peer`
- [ ] `tailwind.config.ts` : étendre palette, typo, spacing
- [ ] Tree-shaking automatique — comprendre pourquoi ça marche

**MODULE 03 — Radix UI (headless)**
- [ ] Pourquoi headless ? Séparation comportement / style
- [ ] Composants clés : Dialog, DropdownMenu, Tooltip, Select, Tabs
- [ ] Anatomie d'un composant Radix
- [ ] Customiser avec Tailwind + `clsx` + `tailwind-merge`
- [ ] Focus management et keyboard navigation intégrés (RGAA out of the box)
- [ ] `data-state="open"` — styler les data-attributes

**MODULE 04 — shadcn/ui**
- [ ] `npx shadcn-ui@latest add button` — c'est une COPIE dans ton codebase, pas une dépendance
- [ ] Anatomie : Button, Card, Form, Dialog, Sheet
- [ ] Modifier un composant — c'est ton code, tu en es propriétaire
- [ ] Créer un composant custom dans le même style
- [ ] Variants avec `class-variance-authority` (cva)
- [ ] Form + `react-hook-form` + `zod` — validation typée complète

**MODULE 05 — Design Tokens & Système cohérent**
- [ ] Tokens : couleur, typographie, espacement, ombre, radius
- [ ] `design.md` : fichier de direction artistique imposé à l'IA (Lindgaard 2006 : 50ms = premier jugement)
- [ ] CSS variables comme tokens (`--color-primary`, `--spacing-md`)
- [ ] Thème clair/sombre avec tokens
- [ ] RGAA : contraste 4.5:1 minimum, focus ring visible, `prefers-reduced-motion`

**MODULE 06 — Animations & Motion**
- [ ] Framer Motion : animation, transition, gesture
- [ ] `prefers-reduced-motion` — obligation médicale (35% population, troubles vestibulaires)
- [ ] Quand animer (feedback utilisateur) vs quand ne pas animer (distraction)
- [ ] spring physics vs easing curves — comprendre la différence

**MODULE 07 — Storybook (notions)**
- [ ] Ce que c'est, quand l'utiliser — grandes équipes ESN
- [ ] Écrire une story simple
- [ ] Chromatic pour tests visuels régressifs
- [ ] Savoir en parler en mission sans avoir besoin de le déployer dans TribuZen MVP

**MODULE 08 — Accessibilité appliquée**
- [ ] RGAA critères impactants : navigation clavier, labels, contrastes
- [ ] `aria-live` regions (notifications dynamiques)
- [ ] `jest-axe` — axe-core dans les tests (web uniquement)
- [ ] `@testing-library/react-native` — accessibilité RN (accessibilityLabel, accessibilityRole)
- [ ] Empty states, error states, loading states : sans jugement, sans anxiété

**MODULE 09 — Tamagui (cross-platform Web + React Native)**
- [ ] Pourquoi Tamagui : une codebase composants pour Next.js ET Expo RN
- [ ] Setup Next.js (`@tamagui/next-plugin`) + Expo (`@tamagui/babel-plugin`)
- [ ] `createTamagui`, `createTokens`, `createTheme` — config TribuZen complète
- [ ] Primitives layout : `Stack`, `XStack`, `YStack`, `Text`
- [ ] `styled()` — créer des composants thématisés avec variants
- [ ] `$platform-web` / `$platform-ios` / `$platform-android` — styles conditionnels
- [ ] Animations avec `@tamagui/animations-reanimated`
- [ ] Dark mode via `TamaguiProvider` + `useColorScheme`
- [ ] Quand utiliser shadcn/ui (web admin) vs Tamagui (composants partagés)

**TribuZen :**
→ Créer `tribuzen/design.md` : direction artistique (palette sauge/terracotta/blanc chaud, typo Fraunces+Inter, tokens RGAA)
→ `tamagui.config.ts` : tokens TribuZen complets (couleurs, spacing, radius, typo) — source unique de vérité web + mobile
→ shadcn/ui conservé pour web admin Next.js uniquement (tables admin, formulaires complexes)
→ Construire les composants UI core avec Tamagui (partagés web + RN) :
  - `RoutineCard` : carte de routine familiale avec accessibilité RN
  - `PrimaryButton` : bouton TribuZen (variants primary/secondary/ghost)
  - `FamilyDashboard` : tableau de bord principal
  - `GazettePreview` : aperçu gazette hebdomadaire (V2)
  - `ResourceCard` : ressource scientifique contextuelle
→ Tests accessibilité : jest-axe (web) + @testing-library/react-native (RN)

---

### → Checkpoint TypeScript lab-14 `00-typescript/labs/lab-14-decorateurs/`

> Faire CE lab uniquement, juste avant NestJS. 1h max.

- [ ] lab-14 (Décorateurs)

---

### 03 — React `04-react/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> ⚠️ **Contexte réel :** React éparpillé et surestimé sur le CV. MAIF = HTML/CSS principalement, 1-2 modules React occasionnels. Michelin = pas de React (Apostrophe CMS). Neotec = 3 mois. Pas de fondations solides — traiter comme apprentissage réel, pas comme review.

> Prérequis : TypeScript labs 01-10 + Testing/TDD.

**Faire :**
- [ ] sections 00-02 (introduction, composants, hooks fondamentaux — à faire proprement, pas skimmer)
- [ ] section 03 (state management — Zustand en priorité, Context en second)
- [ ] section 04 (routing)
- [ ] section 06 (Next.js — App Router, Server Components : c'est là que tu apprends le plus)
- [ ] section 07 (tests composants — avec le réflexe TDD ancré)
- [ ] section 08 (performance — memo, useMemo, profiling)
- [ ] section 12 (recettes ESN — patterns réels de mission)

**Déférer :** section 05 (formulaires React Hook Form — utile en mission mais pas maintenant), section 10-11 (auth, CI/CD — vu ailleurs)

> ⚠️ **Ne pas sauter section 09 (styling).** Tailwind + shadcn/ui + Radix UI sont inconnus — voir cours 03b Design System juste après.

**TribuZen :**
- `FamilyFeed` : liste de posts de la famille, pagination infinie
- `ProfilePage` : avatar, nom, familles de l'utilisateur
- `FamilyCard` : preview d'une famille avec ses membres
- `InvitationForm` : formulaire d'invitation avec validation (TDD : écrire le test du validator d'abord)
- Routing : `/family/[id]`, `/profile/[userId]`, `/feed`

---

### 04 — NestJS `09-nestjs/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : TypeScript (labs 01-10 + lab-14 décorateurs) + Testing.

**Faire :**
- [ ] modules 00-08 (Node.js → Express → changement de paradigme NestJS)
- [ ] modules 09-13 (DI, modules, pipes, guards, interceptors — le cœur)
- [ ] modules 14-17 (TypeORM/Prisma — utiliser sans stresser sur le SQL, PostgreSQL vient après)
- [ ] modules 18-20 (testing NestJS, auth JWT, config)
- [ ] module 21 (WebSockets — fil rouge TribuZen : notifications temps réel)

**Déférer :** modules 25-26 (MongoDB, GraphQL) — pas prioritaires pour TribuZen

**Déférer :** modules 22-24 (jobs/queues, performance/déploiement, projet final) → après PostgreSQL

**TribuZen :**
- `FamilyModule` : CRUD familles (créer, rejoindre, quitter, lister membres)
- `PostModule` : créer/lire posts dans une famille
- `InvitationModule` : inviter par email, accepter/refuser
- `AuthModule` : JWT local d'abord, OIDC après (cours Sécurité)
- `NotificationsGateway` : WebSocket — notifier les membres quand un post est créé

**⚠️ Ne pas déférer :** module 23 (Docker + déploiement) — faire ici, pas après PostgreSQL. Docker est une compétence principale (profil senior/Tidjani).

**⚠️ Appliquer Clean Architecture dès maintenant :** structurer TribuZen en `domain/` `application/` `infrastructure/` pendant ce cours — ne pas attendre cours 09.

---

### 05 — PostgreSQL `10-postgresql/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : NestJS (tu reviens sur ce que l'ORM faisait sous le capot).

**Faire :**
- [ ] modules 00-07 (SQL, relations, transactions, indexes, EXPLAIN — le cœur)
- [ ] modules 11-13 (performances, fonctions SQL, JSONB — directement utile)

**Déférer :** modules 08-10 (isolation/locks/deadlocks — lecture + quiz, pas de deep dive sauf besoin mission), modules 16-18 (replication, monitoring, partitioning — culture DBA, pas ton rôle)

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

**Statut :** `[ ] Non commencé` | **Complété le :** —

> ⚠️ **Contexte réel :** Eudonet = vibe-codé avec Claude. Objectif mission = créer un CMS avec Claude, pas apprendre Vue. La familiarisation était avec Claude, pas avec les patterns Vue. Traiter comme débutant.

> Prérequis : TypeScript + Testing + React (la comparaison accélère l'apprentissage).

**Faire :**
- [ ] sections 01-débutant (faire tous les exercices — c'est vraiment ton premier apprentissage Vue propre)
- [ ] section 02-intermédiaire (Composition API avancée, composables — équivalent React hooks)
- [ ] section 03-avance (Vue Router, Pinia — compare avec React Router + Zustand)
- [ ] section 04-expert (performance, SSR)
- [ ] section 05-nuxt3 (meta-framework Vue — compare avec Next.js, formalise ce que tu as vibe-codé)
- [ ] section 09-accessibilité (deep dive — tu as la certif access42, ça se recoupe)

**Déférer :** section 06-storybook (utile mais pas bloquant), section 10-i18n (si pas de besoin mission), section 07-cicd (vu dans CI/CD cours 14)

**TribuZen :**
→ Version Vue/Nuxt du feed TribuZen. Même fonctionnalités que React mais avec Composition API et Pinia. Objectif : sentir la différence de DX, pas refaire tout depuis zéro. Garde un composant React, refais-le en Vue — compare.

---

### 07 — Angular `03-angular/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : TypeScript + Testing + Vue (DI et RxJS s'apprennent mieux avec Vue derrière soi).

**Faire :**
- [ ] section 00 (pont Vue → Angular — lis attentivement)
- [ ] sections 01-02 (composants, Signals)
- [ ] section 03 (Services et DI — **cœur d'Angular**, connecte avec NestJS)
- [ ] sections 04-06 (routing, RxJS, HTTP) — **RxJS : prends ton temps, c'est le mur du cours**
- [ ] section 07 (formulaires réactifs)
- [ ] section 10 (state management — NgRx vs Signal Store)
- [ ] section 12 (recettes ESN — très utile)

**Déférer :** section 08 (Angular Material — survol si pas en mission Angular), section 09 (tests Angular-specific — vu dans Testing cours 02), section 11 (CI/CD Angular)

**TribuZen :**
→ Pas forcément une version Angular de TribuZen (ça fait beaucoup). À la place : implémente UN composant Angular qui consomme l'API TribuZen existante — par exemple la liste des membres d'une famille. Suffit pour sentir la DI et RxJS en contexte réel.

---

### 08 — Soft Skills `08-soft-skills/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : avoir du vécu sur les cours précédents (React + NestJS + PostgreSQL minimum).

**Faire tout** — c'est le cours le plus directement applicable au rôle Lead Architect Alstom.

Focus particulier :
- [ ] Code review (méthode ASK)
- [ ] ADR (Architecture Decision Records) — commence à en écrire pour TribuZen maintenant
- [ ] Estimation (PERT, planning poker)
- [ ] Communication technique avec des non-devs

**TribuZen :**
→ Écrire 3 ADR pour des décisions déjà prises sur TribuZen :
1. Pourquoi Next.js et pas Vite seul ?
2. Pourquoi PostgreSQL et pas MongoDB ?
3. Pourquoi Zustand et pas Context seul ?
→ Faire une revue de code fictive d'un composant TribuZen existant avec la méthode ASK.

---

### 09 — Architecture `13-architecture/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : React + NestJS + PostgreSQL (les patterns font sens sur du vrai code).

**Faire :**
- [ ] sections 00-01 (fondamentaux, design patterns)
- [ ] section 02 (DDD — modélisation domaine)
- [ ] section 05 (architecture frontend — **priorité absolue pour Alstom**)
  - [ ] `05-design-tokens-systems.md`
  - [ ] `09-micro-frontends.md`
  - [ ] `11-maps-integration.md` ← module ajouté pour Alstom
- [ ] section 12-13 (pratique, culture architecturale — ADR, refactoring)

**Déférer :** sections 03-04 (backend/BDD archi — redondant avec NestJS + PostgreSQL déjà faits), sections 06-07 (communication/distribués — vu dans cours 18), sections 08-11 (sécurité/perf/obs/testing — chacun a son cours dédié)

**TribuZen :**
→ Restructurer TribuZen en clean architecture :
- `domain/` : entités, règles métier pures (déjà commencé avec le module invitation)
- `application/` : use cases (createFamily, inviteMember, createPost)
- `infrastructure/` : NestJS controllers, Prisma repositories
- `presentation/` : composants React
→ Créer le design system TribuZen (tokens, composants de base, thème famille)

---

### 10 — Sécurité `14-securite-applicative/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : NestJS + Architecture.

**Faire :**
- [ ] module 01 (OWASP Top 10)
- [ ] module 02 (injection — SQL, XSS, CSRF)
- [ ] module 03 (authentification) + **module 03b (OIDC/PKCE client)** ← module ajouté pour Alstom
- [ ] **module 03c (WebAuthn/Passkeys)** ← remplace les mots de passe, profil senior, TribuZen sans friction login
- [ ] module 04 (autorisation — RBAC pour TribuZen : admin/member)
- [ ] module 06 (headers sécurité — CSP, HSTS)
- [ ] module 07 (CORS)
- [ ] module 08 (API security)

**Déférer :** modules 05, 09-11 (crypto, supply chain, infra sécurité — culture, pas deep dive)

**TribuZen :**
→ Ajouter OIDC/PKCE à TribuZen (remplacer le JWT local par un vrai provider)
→ Implémenter RBAC : seul un admin peut inviter/exclure des membres
→ Ajouter CSP headers sur le Next.js front

---

### 11 — JS Runtime `01-js-runtime/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : React + NestJS (V8 et event loop font sens avec l'expérience des deux côtés).

**Faire :**
- [ ] modules 00-05 (call stack, closures, event loop, microtasks, Promises, async/await)
- [ ] modules 06-07 (GC, memory leaks — directement applicable aux composants React)
- [ ] modules 08-09 (V8 architecture, JIT — impressionne en entretien)
- [ ] module 11 (performance patterns — change ta façon d'écrire du code)

**Déférer :** module 10 (hidden classes — expert, comprends l'intuition), modules 12-14 (scheduling, projet final, debugging — optionnels)

**TribuZen :**
→ Profiler le feed TribuZen avec Chrome DevTools
→ Identifier et corriger un re-render inutile dans `FamilyFeed`
→ Mesurer l'impact de `useMemo` sur la liste des membres

---

### 12 — HTTP / Caching `11-http-caching/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : NestJS + PostgreSQL (headers et CDN en contexte API réelle).

**Faire :**
- [ ] modules 00-09 (HTTP basics, Cache-Control, ETag, CDN, multi-layer — tout applicable)
- [ ] modules 10-12 (SSR, ISR, Edge rendering — connecte avec Next.js)
- [ ] module 13 (HTTP Streaming — SSE, streaming responses)
- [ ] module 14 (Performance Web — Core Web Vitals, Lighthouse)
- [ ] module 15 (Projet final HTTP/Caching)
- [ ] **module 16 (PWA — Service Workers, Workbox, offline first)** ← `11-http-caching/modules/16-pwa-service-workers.md`
- [ ] **module 17 (Push API + Web Notifications)** ← `11-http-caching/modules/17-push-api-web-notifications.md`

**Déférer :** module 18 (OWASP HTTP — sécurité headers, complète cours 10 → faire après cours 10), module 19 (Redis → utile, faire après le déploiement initial), module 20 (GraphQL caching → si GraphQL adopté plus tard)

**TribuZen :**
→ Ajouter `Cache-Control` sur l'API TribuZen (posts : `max-age=60`, profils : `stale-while-revalidate`)
→ Mesurer la différence avec/sans cache sur le feed
→ Configurer Redis pour cacher les familles fréquemment consultées
→ Service Worker TribuZen : cache dashboard + routines + 7 derniers jours journal offline
→ Queue offline actions → sync au retour réseau (Berkowitz 1989 : appli cassée = abandon)
→ Push API : opt-in notifications, rampe progressive J1-7 max 1/jour → J30+ max 3/jour

---

### 13 — Git Avancé `07-git-avance/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : avoir eu de vrais conflits (après plusieurs projets). Aucun prérequis technique strict.

**Faire tout** — c'est un cours court et dense, tous les modules sont utiles.

Focus :
- [ ] rebase interactif
- [ ] bisect (débugger la régression qui détruit une prod)
- [ ] branching strategy

**TribuZen :**
→ Mettre en place une branching strategy claire sur TribuZen : `main`, `develop`, feature branches
→ Réécrire l'historique git de TribuZen avec rebase interactif pour le rendre propre avant de montrer le repo à un recruteur

---

### 14 — CI/CD `15-cicd-devops/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : Git Avancé + Testing + AWS (cours 15 — exception : faire AWS avant CI/CD).

**Faire :**
- [ ] modules 00-05 (GitHub Actions, workflows, testing en CI, Docker en CI)
- [ ] modules 06-08 (déploiement, preview environments)
- [ ] module 09 (sécurité pipelines)

**Déférer :** modules 10-11 (IaC avancé — vu dans AWS cours 15)

**TribuZen :**
→ Pipeline GitHub Actions TribuZen : lint → tests → build → deploy sur AWS (avec preview env par PR)
→ Bloquer le merge si les tests Playwright échouent

**Ne pas sauter :** module 09 (IaC — Terraform). MCV utilise Terraform sur Scaleway. Compétence clé profil senior.

---

### 15 — AWS Cloud `12-aws-cloud/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : NestJS + PostgreSQL + HTTP/Caching.

**Faire :**
- [ ] module 00 (prérequis — configure le CLI avant tout)
- [ ] module 01 (IAM — fondement de tout AWS)
- [ ] module 04 (S3 — tu l'utiliseras souvent)
- [ ] module 06 (Lambda)
- [ ] module 07 (API Gateway)
- [ ] module 11 (Cognito — auth-as-a-service, alternative à OIDC maison)
- [ ] module 13 (CloudFront)
- [ ] module 17 (CI/CD GitHub Actions → AWS, OIDC)
- [ ] **module 19 (Déployer Nuxt/Next — climax, deploy TribuZen)**

**Déférer :** modules 02-03 (VPC, EC2 — lecture attentive, pas de lab), module 08 (RDS — tu connais PostgreSQL), module 09 (DynamoDB — paradigme différent, utile si besoin), module 12 (ECS/Fargate — lecture), module 14 (CloudWatch — vu dans Observabilité), module 15 (sécurité AWS — lecture), module 18 (projet final)

**TribuZen :**
→ Déployer TribuZen sur AWS : Next.js sur CloudFront + Lambda, API NestJS sur Lambda ou ECS, PostgreSQL sur RDS
→ Lien public → envoyer à un recruteur

---

### 16 — Observabilité `16-observability-sre/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : AWS + CI/CD.

**Faire :**
- [ ] modules 00-04 (Pino logging, métriques, Prometheus)
- [ ] modules 05-06 (distributed tracing, OpenTelemetry)
- [ ] module 07 (Sentry — tu l'utiliseras sur toute mission)
- [ ] modules 08-09 (Grafana dashboards)
- [ ] modules 23-26 en priorité (frontend observabilité, instrumentation Next.js, feature flags) ← ton profil front

**Déférer :** modules 10-18 si pas de rôle SRE (SLI/SLO, alerting, chaos engineering — culture), modules 19-22 (K8s, FinOps, ELK, RGPD — annexes)

**TribuZen :**
→ Pino structured logging sur l'API NestJS TribuZen
→ Sentry sur le Next.js front (errors + performance)
→ Dashboard Grafana : nombre de posts créés par heure, latence API

---

### 16b — Stripe Billing

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : NestJS + PostgreSQL + AWS.
> Cours ajouté : modèle freemium TribuZen nécessite Stripe — compétence indispensable sur toute mission SaaS.

**Faire :**
- [ ] MODULE 01 — Modèles de facturation : one-time, subscription, usage-based. Stripe Products + Prices API. Trial periods.
- [ ] MODULE 02 — Stripe Checkout : hosted page vs embedded. Success/cancel URLs. Mode subscription.
- [ ] MODULE 03 — Webhooks NestJS : `stripe listen --forward-to localhost`. Vérifier signature (sécurité). Handlers : `subscription.created`, `updated`, `deleted`, `trial.ending_soon`.
- [ ] MODULE 04 — Customer Portal : gérer abonnement sans code custom. Annulation, changement de plan, factures.
- [ ] MODULE 05 — Freemium gates : Guard NestJS vérifie tier. Frontend : premium feature locked state. Dégradation gracieuse en fin de trial.
- [ ] MODULE 06 — Légalité FR : factures automatiques (obligation), mentions légales paiement, RGPD + Stripe DPA.

**TribuZen :**
→ Trial 90 jours → conversion premium
→ Webhook active premium dans la base (NestJS guard)
→ Gate sur : co-parentalité bridge, livre annuel, routines illimitées
→ Pricing ancré : plan annuel 59€ en premier (Tversky & Kahneman 1974, anchoring)
→ CTA : "Essayer gratuitement 90 jours" (spécificité = confiance, Cialdini 2009)
→ Email fin de trial : loss aversion frame (Kahneman & Tversky 1979)

---

### 17 — Algorithms `05-algorithms/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : TypeScript (les katas sont en TS). Utilité principale : tests techniques d'entretien.

**Faire :**
- [ ] modules 00-03 (complexité, tableaux, hash maps, stacks, queues)
- [ ] module 11 (patterns terrain JS : debounce, LRU cache, rate limiting — directement applicable)
- [ ] module 07 (graphes — BFS/DFS, utile pour l'arbre familial TribuZen)

**Déférer :** modules 04 (récursion — fais-le si t'as le temps), modules 05-06 (tri, heaps — cultural), modules 08-10 (backtracking, DP, greedy — pour les entretiens GAFAM, pas pour ESN/Alstom)

**TribuZen :**
→ L'arbre familial TribuZen = un graphe. Implémenter le BFS pour trouver le chemin de parenté entre deux membres.
→ Debounce sur la recherche de membres dans une famille.

---

### 18 — Systèmes distribués `17-distributed-systems/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : Architecture + NestJS + PostgreSQL.

**Faire :**
- [ ] modules 00-09 (communication, microservices, event-driven, retries)
- [ ] modules 15-19 (failures, circuit breaker, rate limiting, testing)

**Déférer/Survol :** modules 10-14 (CAP, saga, CQRS, outbox — comprendre l'intuition), modules 20-23 (consensus, horloges, CRDTs — culture)

**TribuZen :**
→ Ajouter un circuit breaker sur les appels API externes (notifications email)
→ Retry avec backoff sur les webhooks TribuZen

---

### 19 — IA `18-ia/`

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : TypeScript + NestJS.

**Faire :**
- [ ] modules 01-02 (prompting fondamental + avancé)
- [ ] modules 04-05 (API Claude/OpenAI + MCP — productivité immédiate)
- [ ] module 06 (agents)
- [ ] module 12 (tokenization/embeddings — lire AVANT le module 09)
- [ ] module 09 (Transformer — avec embeddings en tête)
- [ ] modules 13-15 (RAG : fondamental, avancé, chatbot — tu construis quelque chose)

**Déférer :** module 03 (Copilot/assistants — tu sais déjà), modules 07-08 (maths + neural networks — comprends l'intuition, pas les formules), module 10 (fine-tuning), module 11 (Ollama — utile mais pas urgent)

**TribuZen :**
→ Chatbot TribuZen : "retrouve les souvenirs où grand-père était présent" (RAG sur les posts)
→ Suggestions de connexions familiales (embeddings sur les profils)

---

### 20 — React Native `19-react-native/`

**Statut :** `[ ] Optionnel — si mission mobile` | **Complété le :** —

> Prérequis : React. À faire si une mission mobile se présente.

**Faire :**
- [ ] modules 00-12 (fondamentaux + features courantes)

**Déférer :** modules 23-27 (native modules, Fabric/JSI, Hermes — très avancé, culture)

**TribuZen :**
→ App mobile TribuZen : feed, profil, notifications push

---

### 22 — Droit du numérique pour développeurs

**Statut :** `[ ] Non commencé` | **Complété le :** —

> Prérequis : NestJS + AWS + Stripe. À faire avant beta TribuZen.
> Cours ajouté : savoir de quoi tu parles quand on te parle de RGPD, DPA, CGU, DPIA. Pas un cours de droit — un cours de dev qui sait ce qu'il signe et ce qu'il construit.

**Faire :**
- [ ] MODULE 01 — RGPD réflexes dev : 6 bases légales (choisir la bonne), données personnelles vs sensibles (santé = Art. 9), minimisation, durée de conservation, droits utilisateurs (accès, effacement, portabilité)
- [ ] MODULE 02 — DPIA : quand obligatoire (données santé mineurs → toujours), structure, qui la fait (DPO + CTO)
- [ ] MODULE 03 — CGU / Mentions légales / Politique confidentialité : structure minimale légale FR, ce que tu dois comprendre (pas rédiger seul), red flags dans un contrat SaaS
- [ ] MODULE 04 — Contrats sous-traitants (DPA) : Scaleway, Stripe, Sentry, PostHog ont chacun un DPA — savoir le lire et le signer
- [ ] MODULE 05 — Propriété intellectuelle SaaS : licences open source (MIT vs GPL vs AGPL), code généré par IA (qui détient les droits ?), contrats équipe (clause IP)
- [ ] MODULE 06 — Accessibilité légale RGAA : loi du 11 février 2005, ce qui engage juridiquement une startup vs organisme public

**TribuZen :**
→ Checklist légale complète avant beta (DPIA, DPO désigné, DPA sous-traitants signés)
→ Politique de confidentialité TribuZen : données enfants Art. 9, architecture 3 tiers expliquée
→ Savoir quoi envoyer à un avocat spécialisé numérique (ne pas tout lui déléguer)

---

### 21 — WebGPU / 3D `20-webgpu-3d/`

**Statut :** `[ ] Optionnel — si mission 3D` | **Complété le :** —

> Prérequis : JS Runtime (GPU pipeline nécessite de comprendre le thread principal).
> À faire si mission dataviz/3D se présente. Et quand tu reviendras sur Dia de los muertos.

**Faire :**
- [ ] prérequis maths d'abord
- [ ] modules 00-12 (pipeline, WebGPU core)

**Déférer/Survol :** modules 22+ (ray tracing, WebXR — bonus)

**TribuZen / Dia de los muertos :**
→ Visualisation 3D de l'arbre familial TribuZen
→ Et oui — le scénario de Dia de los muertos t'attend ici.

---

## Récap rapide (ordre révisé 2026-06-26)

```
01  TypeScript      lab-10 ✅ → lab-14 décorateurs juste avant NestJS
02  Testing/TDD     en cours — labs 01-05, 07, 09, 10-11 + Vitest réel TribuZen
03  NestJS          ⭐ ROI #1 — core + auth + WebSockets + Clean Architecture + Docker
04  PostgreSQL      ⭐ ROI #1 — SQL brut, indexes, JSONB (après NestJS)
05  React           hooks, Next.js, perf, recettes ESN — avec l'API déjà construite
06  Design System   ⭐ ROI #2 — Tamagui cross-platform, shadcn/ui, tokens, RGAA
07  Soft Skills     ADR, code review ASK, estimation
08  Architecture    Clean/Hexagonal/DDD/CQRS — consolider ce qui a commencé en 03
09  Sécurité        OWASP + OIDC/PKCE + WebAuthn/Passkeys
10  JS Runtime      event loop, GC, V8, perf
11  HTTP/Caching    cache headers, Redis + PWA + Push API
12  Git Avancé      tout
13  CI/CD           GitHub Actions + Terraform
14  AWS             IAM, S3, Lambda, CloudFront, deploy TribuZen
15  Observabilité   Pino, Sentry, Grafana
15b Stripe Billing  Checkout, webhooks, freemium gates
16  Algorithms      complexité, hash maps, graphes, patterns JS
17  Distribués      circuit breaker, retry, event-driven
18  IA              RAG, agents, embeddings, MCP server TribuZen
19  Vue             ⚠️ déféré — après premier poste si mission Vue
20  Angular         ⚠️ déféré — après premier poste si mission Angular
21  React Native    si mission mobile
22  Droit numérique avant beta TribuZen
23  WebGPU          si mission 3D + Dia de los muertos
```

**Stack cible (profil Tidjani) :**
`TypeScript · React · Next.js · Node.js/NestJS · Tailwind · shadcn/ui · Docker · SQL · Terraform · Clean/Hexagonal/DDD · CI/CD · Tests · Stripe · PWA · WebAuthn`

