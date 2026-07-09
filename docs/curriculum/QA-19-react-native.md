# QA — 19-react-native (refonte v1)

> Cours réécrit en autonomie (rollout). 25 modules (00-24) + 25 labs.
> Consolidation 28 modules legacy v0 → 25, orphelins + harnais (exercise.ts/solution.ts) purgés.
> **Cours React Native / Expo — application-first, mobile réel.**
> **Context7 mort → vérif par WebFetch** (reactnative.dev, reactnavigation.org, docs.expo.dev,
> docs.swmansion.com, tanstack.com, wix.github.io/Detox, callstack RNTL, shopify FlashList, turbo).
> GATE PASS (build OK). QA 2 blocs read-only. **Premier cours refait SANS override delimiters** → thème propre.

## Verdict : SHIP (0 P0)

Corrections appliquées :
| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P1 | M12 + lab-12 | `crypto.randomUUID()` nu — RN/Hermes ne l'expose pas → crash Expo Go (lab dit « testable Expo Go ») | `Crypto.randomUUID()` d'**expo-crypto** + import + `npx expo install expo-crypto` |
| P2 | M24 | typo « on **msocke** » | « on mocke » |
| P2 | lab-01 | ref dossier `lab-00-prerequis-setup` inexistant | `lab-00-prerequis-et-introduction` |

## P2 non bloquants (laissés — cap budget)
- M07 : exemple `getParent('AccountDrawer')` sans `id` posé sur le Drawer (le lab-07 le fait correctement).
- Scaffolding : lab-00 bootstrappe expo-router, labs 01-12 utilisent blank-typescript + React Navigation (tension assumée par M06, à noter).
- M18 : RNTL v14 exige React 19 + RN 0.78+ (hard break) — préciser le prérequis de version.
- M17 : FlashList v2 requiert la New Architecture — à mentionner.
- Versions SDK/RN citées (SDK 57, RN 0.86) post-cutoff — revérifier au gel.
- format `prerequis[]` inégal (parfois `[00, 01]`, parfois slugs complets).

## FLAG-DOC (posés par agents, vérifiés en QA)
- M09 : react-hook-form.com 403 au WebFetch — API reprise de sources stables (OK).
- M16 : renommage `runOnJS→scheduleOnRN` → **CONFIRMÉ** par QA (Reanimated 4/worklets), flag levable.
- M21 : état exact dépréciation ancienne archi 2026 non re-vérifié (défaut 0.76 confirmé) — formulation prudente, OK.

## Correctifs techniques notables (agents write, WebFetch)
MMKV v4 (`createMMKV`/`.remove`, dev build), expo-file-system API classe File/Directory,
expo-notifications `shouldShowBanner`/`shouldShowList` (shouldShowAlert déprécié), Reanimated 4 +
`react-native-worklets` (scheduleOnRN/scheduleOnUI), Gesture Handler 3, FlashList v2 (sans
estimatedItemSize), RN DevTools (pas Flipper), RNTL v14 async, Detox, EAS (--environment SDK 55+,
runtimeVersion fingerprint), New Arch défaut 0.76, TurboModules BaseReactPackage, Expo Modules API,
monorepo Metro auto SDK 52+.

## Gate résiduel — PASS
Chaîne next 00→…→24→sentinel `fin-parcours-19-react-native`. 25 modules valident. Anti-simulé :
harnais legacy purgés, labs 100% README-only (tests = vrai Jest/RNTL/Detox). Cross-framework : bases
React déférées au cours 04 partout. **Thème VitePress propre** (0 fuite `{{ title }}`) : pas d'override
delimiters, les moustaches JSX inline neutralisées en `<code v-pre>` (14 fichiers). Re-gaté **GATE PASS**.
