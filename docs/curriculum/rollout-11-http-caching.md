# Refonte 11-http-caching — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `11-http-caching/modules/NN-slug.md` + `11-http-caching/labs/lab-NN-slug/README.md`.
> Exemplar OBLIGATOIRE : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy à réécrire = `11-http-caching/modules/NN-*.md` (contenu à conserver/enrichir AU TEMPLATE) + `cours/` (miroir).
> **Cours API-lourd** : HTTP, cache, service workers, Push API, ISR/SSG/edge.

## Contrat agent (invariants gate — non négociables)

1. **Vérif API/spec via WebFetch** (Context7 MORT). Docs officielles :
   - HTTP / en-têtes / cache / Cache-Control / ETag / SWR → developer.mozilla.org (MDN HTTP)
   - Service Workers / Cache API / Push API / Notifications → developer.mozilla.org + web.dev + developer.chrome.com
   - HTTP/2 HTTP/3 QUIC → MDN + rfc-editor si besoin
   - SSR / ISR / SSG / edge / streaming → nextjs.org/docs (App Router) + web.dev
   - Perf web (Core Web Vitals LCP/INP/CLS) → web.dev
   Si l'URL exacte est inconnue → `WebSearch` puis `WebFetch`. Si fetch échoue/incertain → `<!-- FLAG-DOC: <quoi vérifier> -->`, NE PAS deviner.
2. **Frontmatter** clés exemplar : `titre, cours: 11-http-caching, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE tout item de notions[] contenant `@`, `[`, `(`, `:`** (casse le YAML VitePress sinon).
3. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
4. **Ordre novice→expert** : pas de notion d'un module ultérieur.
5. **Lab = README-only** : énoncé + critères + corrigé vrai-outil (curl, DevTools Network/Application, Lighthouse, un petit serveur Node/Express ou Next) + **feedback = coach** + **variante J+30**. ZÉRO harnais de test simulé.
6. **Fil-rouge TribuZen** : ancrer dans la perf/cache de l'app TribuZen (CDN des avatars, cache API sorties, SW offline, push rappels).
7. `{{ }}` en prose → échapper (SSR VitePress). Pas de framework front dans le corps hors nécessité (Next pour ISR/edge = OK).

## Colonne vertébrale (numérotation plate — projet-final déplacé en FIN)

| NN cible | Module | Source legacy | next |
|----------|--------|---------------|------|
| 00 | prerequis-et-vue-ensemble | modules/00 | 01 |
| 01 | protocole-http | modules/01 | 02 |
| 02 | http2-http3 | modules/02 | 03 |
| 03 | en-tetes-http | modules/03 | 04 |
| 04 | cache-control | modules/04 | 05 |
| 05 | etag-validation-conditionnelle | modules/05 | 06 |
| 06 | stale-while-revalidate | modules/06 | 07 |
| 07 | cache-navigateur | modules/07 | 08 |
| 08 | cdn | modules/08 | 09 |
| 09 | cache-multi-couches | modules/09 | 10 |
| 10 | ssr | modules/10 | 11 |
| 11 | isr-ssg | modules/11 | 12 |
| 12 | edge-rendering | modules/12 | 13 |
| 13 | http-streaming | modules/13 | 14 |
| 14 | performance-web | modules/14 | 15 |
| 15 | pwa-service-workers | modules/16 (legacy) | 16 |
| 16 | push-api-web-notifications | modules/17 (legacy) | 17 |
| 17 | projet-final | modules/15 (legacy, déplacé) | (fin) |

18 modules (00-17) + 18 labs. Legacy n'a que 5 labs (01-05) → créer les 13 manquants + réécrire/valider les 5.
Dernier module `next` = sentinel `fin-parcours-11-http-caching` (pas de slug fantôme).
Modules potentiellement sensibles (perf/sécu headers) : rien de bloquant, mais headers de sécurité (CSP, HSTS) si cités → factuel via MDN.
