# QA — 11-http-caching (refonte v1)

> Cours réécrit en autonomie (rollout week-end 2026-07-03). 18 modules (00-17) + 18 labs.
> Legacy réécrit au template ; projet-final déplacé en 17 ; orphelins legacy 15/16/17 supprimés.
> **Context7 mort → vérif API par WebFetch** (MDN HTTP/cache/SW/Push, web.dev CWV, nextjs.org SSR/ISR/edge).
> GATE PASS déterministe. QA agents read-only en 3 blocs (00-05 / 06-11 / 12-17), WebFetch à l'appui.

## Corrections appliquées (P1/P2)

| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P1 | M10-ssr §2.9/PIÈGE4/seed | « fetch non caché → route dynamique » FAUX (vérifié nextjs.org) : un fetch nu reste prérendu statiquement au build ; le dynamique vient de cookies()/headers()/searchParams/no-store/revalidate:0/force-dynamic | Dissocié « donnée non cachée » de « mode de rendu » |
| P1 | lab-12 §Mise en place | `create-next-app@latest` scaffolde Next 16 → contredit le check « next 15.x » | Pin `create-next-app@15` + install next@15 |
| P1 | M17-projet-final §2.3/§5/prereq | Capstone omettait edge (12) & streaming (13) ; push (16) hors périmètre cache | Ligne edge + streaming ajoutées à la matrice ; prereq complété ; portée d'intégration explicitée |
| P2 | M12 §2.3/WE1/§5 | `NextResponse.redirect` décrit « 302 » | Corrigé **307** (Temporary Redirect, préserve la méthode) |
| P2 | M16 §2.1 | « WebKit pour Safari » (WebKit = moteur) | **APNs** (Apple Push Notification service) |
| P2 | M12 §2.3/seed | Codemod « middleware-to-proxy » non confirmé (WebFetch nextjs.org/blog/next-16 : n'existe pas) | Reformulé : renommage manuel middleware.ts→proxy.ts + codemod générique `@next/codemod upgrade` |
| P2 | M05 frontmatter | prereq en prose ; notion `W/ (weak)` non quotée | Slugs + quote |

## FLAG-DOC (à reconfirmer)
- M11 isr-ssg : `revalidateTag` signature Next 15 (1 arg) vs Next 16 (`revalidateTag(tag,'max')` + `updateTag`, Cache Components). Module pin v15, delta v16 signalé. **QA a confirmé le flag correct.**

## Verdict

Lot haute qualité, **factuel HTTP/Next vérifié verbatim via WebFetch** (MDN, web.dev, nextjs.org).
Currency captée : Next 15 (`request.geo`/`request.ip` retirés, fetch non caché par défaut, params en Promise),
INP a remplacé FID (2024), HTTP/2 server push déprécié (Firefox 132), Cache-Status RFC 9211, CDN-Cache-Control
RFC 9213, stale-if-error RFC 5861, Core Web Vitals seuils exacts. Labs README-only vrai-outil (curl/DevTools/
Lighthouse/Express/web-push), coach, J+30, zéro harnais. Corrections appliquées, re-gaté **GATE PASS**.
