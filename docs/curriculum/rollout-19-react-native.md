# Refonte 19-react-native — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `19-react-native/modules/NN-slug.md` + `19-react-native/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `19-react-native/modules/NN-*.md` (28 modules 00-27, format `# Module` riche → AU TEMPLATE) → CONSOLIDÉS en 25.
> **Cours React Native — application-first, mobile réel.**

## Contrat agent (invariants gate)

1. **Vérif API/config via WebFetch** (Context7 MORT). Docs officielles :
   - **React Native → reactnative.dev** (Core Components, StyleSheet, Platform, APIs, New Architecture)
   - **Expo → docs.expo.dev** (SDK, EAS Build/Submit/Update, expo-router si cité) · **React Navigation → reactnavigation.org**
   - **Reanimated / Gesture Handler → docs.swmansion.com** · React Query → tanstack.com/query · Zustand → docs.pmnd.rs
   - Detox → wix.github.io/Detox · Hermes/Fabric/JSI/TurboModules → reactnative.dev/architecture
   Si URL inconnue → WebSearch puis WebFetch. Si échec/incertain → `<!-- FLAG-DOC: ... -->`, jamais deviner (noms d'API natives, versions SDK Expo, config EAS).
2. **Frontmatter** clés exemplar : `titre, cours: 19-react-native, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE items notions[] avec `@`, `[`, `(`, `:`**.
3. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
4. **⚠️ Cross-framework** : les FONDAMENTAUX React (JSX, props, state, hooks, listes/clés) = **cours 04-react (prérequis)** → NE PAS re-enseigner. Ici = ce qui est **spécifique à React Native** (composants Core natifs View/Text/FlatList, StyleSheet/flexbox RN, APIs natives, navigation mobile, perf mobile, architecture native). Renvoyer à 04 pour tout ce qui est React pur.
5. **Lab = README-only** : exercice concret (coder un écran RN, une navigation, une animation, un test) via Expo/RN réel (starter Expo fourni ou commandes) + grille + **coach** + **variante J+30**. ZÉRO harnais simulé (harnais legacy supprimé). Les tests écrits utilisent un VRAI framework (Jest/RNTL/Detox), pas un harnais maison.
6. **Fil-rouge TribuZen** : l'app mobile TribuZen (famille, sorties, feed, notifications).
7. `{{ }}` en prose → échapper (SSR VitePress). JSX/code → blocs code.

## Colonne vertébrale (25 modules — consolidation de 28 legacy)

| NN | Module (slug) | Source legacy | next |
|----|--------|---------------|------|
| 00 | prerequis-et-introduction (RN vs React web, Expo vs bare, setup, New Arch par défaut) | 00 | 01 |
| 01 | composants-core-et-jsx-rn (View/Text/Image/ScrollView, pas de div, JSX en RN ; React→cours 04) | 01 | 02 |
| 02 | props-state-et-listes-rn (props/state en contexte RN, FlatList/SectionList + perf listes ; bases React→04) | 02, 03, 04 | 03 |
| 03 | stylesheet-et-flexbox (StyleSheet.create, flexbox RN, diff CSS web) | 05 | 04 |
| 04 | responsive-et-plateformes (Dimensions, useWindowDimensions, Platform, SafeArea, adaptation iOS/Android) | 06 | 05 |
| 05 | composants-ui-avances (Pressable, Modal, KeyboardAvoidingView, listes complexes) | 07 | 06 |
| 06 | react-navigation-fondamentaux (stack, tabs, params, typage) | 08 | 07 |
| 07 | navigation-avancee (nested, deep linking, auth flow, guards) | 09 | 08 |
| 08 | gestion-detat-context-zustand (état global mobile, Context vs Zustand) | 10 | 09 |
| 09 | formulaires-et-validation (inputs natifs, react-hook-form, clavier) | 11 | 10 |
| 10 | networking-et-api (fetch, gestion réseau mobile, états offline) | 12 | 11 |
| 11 | react-query-et-cache (TanStack Query en mobile, cache, refetch) | 13 | 12 |
| 12 | stockage-local-et-offline-first (AsyncStorage/MMKV/SQLite, sync offline) | 14 | 13 |
| 13 | apis-natives-essentielles (permissions, caméra, géoloc, fichiers) | 15 | 14 |
| 14 | capteurs-et-notifications (capteurs, push notifications, background) | 16 | 15 |
| 15 | animations-animated-api (Animated, LayoutAnimation, bases) | 17 | 16 |
| 16 | reanimated-et-gesture-handler (Reanimated 3+ worklets, gestures, UI thread) | 18 | 17 |
| 17 | performance-et-optimisation (renders, listes, images, profiling mobile) | 19 | 18 |
| 18 | testing-react-native (Jest + React Native Testing Library, mocks natifs) | 20 | 19 |
| 19 | tests-e2e-detox (Detox, grey-box, CI mobile) | 21 | 20 |
| 20 | deploiement-et-eas-ci-cd (EAS Build/Submit/Update, OTA, stores) | 22 | 21 |
| 21 | new-architecture-fabric-jsi-hermes (Fabric, JSI, Hermes, bridgeless — pourquoi/comment) | 24, 25 | 22 |
| 22 | modules-natifs-et-turbo-modules (native modules, TurboModules, specs codegen) | 23 | 23 |
| 23 | patterns-avances-et-monorepo (monorepo, code partagé web/mobile, archi projet) | 26 | 24 |
| 24 | projet-final (capstone : app mobile TribuZen de bout en bout) | 27 | (fin) |

25 modules (00-24) + 25 labs. Dernier module (24) `next` = sentinel `fin-parcours-19-react-native`.
Consolidations : 01-04 legacy (React basics) → 01+02 RN-specific (déférer React→cours 04) ; 24+25 (New Arch/Hermes) → 21 ; TurboModules (23) placé en 22 (après New Arch, car il en dépend). Renuméroter proprement 00-24 ; supprimer orphelins legacy + harnais (`exercise.ts`/`solution.ts`) après write.
