# QA pédagogique 02-vue — rapport + file de corrections

> Passe QA indépendante (8 agents reviewer read-only, 02/07/2026) sur les 48 modules réécrits.
> Verdict global : **qualité solide, aucun module sous plancher** (les "lab=0 PLANCHER FAIL" des reviewers Nuxt et a11y étaient une **fausse alarme Glob** — labs vérifiés présents). Ce qui suit = passe d'édition ciblée, pas de réécriture.

## P1 — Erreurs factuelles / hors-périmètre (à corriger en priorité)

| # | Module | Problème | Correction |
|---|--------|----------|-----------|
| 1 | 38-a11y-fondamentaux | `prefers-reduced-motion` mappé à **RGAA 13.8** = FAUX | RGAA 13.8 = contrôle play/pause des contenus animés autolancés (≈ WCAG 2.2.2 AA). `prefers-reduced-motion` ≈ WCAG 2.3.3 **AAA, hors périmètre RGAA 4.1**. Reformuler : bonne pratique recommandée, pas obligation RGAA. |
| 2 | 38-a11y-fondamentaux | `GroupCard.vue` : `aria-label="Groupe {{ group.name }}"` — moustache dans attribut = non interpolée, rend le littéral | `:aria-label="\`Groupe ${group.name}\`"` |
| 3 | 40-a11y-audit | « loi EAAA » = acronyme inexistant | directive **EAA** (2019/882 UE) + transposition FR **LCEN art. 47 + décret 2019-768** |
| 4 | 40-a11y-audit | seuil 75 % présenté comme « exigé par la loi » | Le décret ne fixe pas de seuil numérique ; 75 % = interprétation pratique de « conformité substantielle ». Nuancer. |
| 5 | 28-nuxt-server-routes | dichotomie « Nitro 2 = cachedEventHandler / Nitro 3 = defineCachedEventHandler » trop forte | Les deux sont des **alias** ; `define*` = style recommandé depuis Nitro 2.6+. Retirer la rupture binaire. Retirer aussi l'enseignement du format de clé interne `nitro:functions:*.json` (instable). |
| 6 | 27-nuxt-data-fetching | (a) SWR vs ISR trop simplifié « swr=proxy, isr=CDN » ; (b) type `data` = `Ref<...>` incohérent avec M25 (`ShallowRef`) | (a) vraie frontière = **prerender (isr) vs SSR+stale-while-revalidate (swr)**, les deux profitent d'un CDN ; (b) aligner sur `ShallowRef<DataT | undefined>` |
| 7 | 29-nuxt-seo-et-meta | exemple JSON-LD §2.5 utilise `route.params.slug` sans `const route = useRoute()` | ajouter la ligne |
| 8 | 34-cicd-deploiement | `pnpm/action-setup@v3` + `version: 9` incohérent avec M33 (`@v4` + `version: 10`) | aligner sur `@v4` / `version: 10` |
| 9 | 03-reactivite | worked example 3 utilise `useRouter`/`useRoute` (Router = M14, hors périmètre débutant) + expose internals `__v_isRef` | remplacer par un `computed` writable sans Router ; déplacer les internals en encadré « pour les curieux » |
| 10 | 04-evenements-v-model | worked example 1 utilise `defineEmits` (M05) sans intro | soit retirer l'emit (état local), soit note « preview — vu au module 05 » |
| 11 | 21-performance (+ autres) | commentaires `⚠️ à gater Context7` laissés dans le corps (résidus auteur, visibles apprenant) | supprimer de tous les modules (grep global) |

## P1b — Coach KO / à vérifier (bloque une session live)

| Module | Point | Action |
|--------|-------|--------|
| 20-msw | §2.8 `@msw/playwright` / `defineNetworkFixture` — package/API peut-être inexistant, aucun warning | vérifier Context7 ; sinon repli `page.route()` natif Playwright |
| 18-tests-integration | `createTestingPinia` (`@pinia/testing`) marqué à gater, non résolu | vérifier Context7 l'API `initialState`/`stubActions` |
| 42-i18n-avancé | §2.7 ICU `messageCompiler` v10 marqué incertain ; pont lab « Vitest oracle » contredit LAB-TEMPLATE (feedback=coach) | vérifier Context7 ICU ; reformuler le pont |

## P2 — Notions perdues vs source (exhaustivité)

| Module | Notion(s) manquante(s) | Note |
|--------|------------------------|------|
| 08-composition-avancée | **provide/inject** (typé InjectionKey) + **nextTick** | provide/inject est SANS DOMICILE dans tout le curriculum → à réintégrer (M08) |
| 09-composables | composition de composables (exemple dédié), useApi+inject | corollaire du trou provide/inject |
| 10-gestion-async | optimistic update + rollback | patron courant mutations |
| 14-vue-router | onBeforeRouteUpdate / onBeforeRouteLeave, afterEach, scroll behavior | guards in-component (form non sauvegardé) |
| 16-tests-unitaires | vi.useFakeTimers, vi.mocked (utilisé sans intro), test.each, beforeEach/afterEach non théorisés | |
| 17-tests-composants | global.stubs / global.mocks (stub RouterLink), findAll, unmount | |
| 21-performance | **KeepAlive** (onActivated/onDeactivated, :max) | absent de tout le curriculum |
| 24-patterns-entreprise | **Repository pattern**, **Monorepo** (pnpm-workspace), **migration Vue 2→3** | forte valeur (contexte migration/monorepo). Décider : ajouter ou documenter le report ailleurs |
| 36-graphql | Fragments GraphQL | courant en prod |
| 42-i18n-avancé | RTL (right-to-left) | |
| 44-securite-front | **CORS** (section entière source), eval/new Function | |
| 45-rbac | composant déclaratif `<CanAccess>` (slot fallback) | |

## P3 — Liaison inter-modules (le « relier entre eux » demandé)

- **Ordre du mocking de test** : M17/M18 utilisent `global.fetch = vi.fn()` avant que M20 (MSW) présente la bonne approche. Ajouter forward-refs M17/M18 → M20.
- **`vi.waitFor()`** utilisé en M20 sans intro (M16/M18).
- **24→25** : pas de pont vers Nuxt (M22 a un excellent pont §2.10 ; M24 n'a rien alors qu'il précède Nuxt). Ajouter mapping provide/inject→useNuxtApp, feature flags→runtimeConfig.
- **M22 §2.10** référence « module 23 » pour useAsyncData/useState → corriger en « modules 25-29 ».
- **prereq frontmatter** : ajouter deps Nuxt (25/27) aux sections SSR de M42 et M47 ; ajouter M22 en prereq de M25.
- **33-cicd** : lier explicitement les tests aux modules 16-20 (ancrage). Intégrer `pnpm build-storybook` (M30) au pipeline.
- **35-cicd-monitoring** : lier le budget Lighthouse a11y aux modules 38-40 (l'auto ne couvre pas tout).
- **42→43** : phrase de transition (i18n → auth).
- **02-template** : portée dit « v-model disséqué au module 03 » → c'est **module 04**.
- **07** : recommande Vitest/@vue/test-utils non encore introduits → contextualiser (M16-18).

## P4 — Sources actives à corriger (lues par l'apprenant AVANT le module, enseignent l'anti-pattern)

> Ces fichiers `cours/…` sont exclus du build mais restent lisibles ; s'ils enseignent une erreur, les corriger ou les retirer.
- `cours/06-storybook/01-setup.md` : `@storybook/vue3` → `@storybook/vue3-vite` ; `framework` string → objet.
- `cours/07-cicd/03-monitoring.md` : `onFID` (déprécié 03/2024) → `onINP`.
- `cours/12-vue-query/01-tanstack-query.md` : `isLoading` v5 sans signaler le renommage → `isPending`.

## Sécurité (43-45) — audit dédié : ✅ JUSTE

Aucune reco de sécurité fausse. token httpOnly cookie vs localStorage/XSS, CSRF double-submit, CSP unsafe-inline, v-html+DOMPurify, RBAC « front masque / back autorise » — tout correct. Seuls manques = notions (CORS, eval, CanAccess), pas d'erreur.

## Bilan chiffré

- 48/48 modules **au-dessus du plancher** sur le contenu.
- ~11 corrections P1 (factuel/périmètre), ~12 notions P2 à réintégrer, ~10 liaisons P3, 3 sources P4.
- Modules exemplaires cités : 00, 22, 30, 33, 39 (aucune retouche bloquante).
