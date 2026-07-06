# QA — 16-observability-sre (refonte v1)

> Cours réécrit en autonomie (rollout week-end). 22 modules (00-21) + 22 labs.
> Consolidation de 29 modules legacy → 22, 28 orphelins purgés.
> **Context7 mort → vérif par WebFetch** (prometheus.io, opentelemetry.io, grafana.com, sre.google,
> docs.sentry.io, elastic.co, dora.dev, gdpr-info.eu/cnil.fr). GATE PASS. QA agents read-only 3 blocs.

## Corrections appliquées (0 P0)

| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P1 | lab-03/11/12 | noms docker-compose faux (`base` sans demo-app ; `compose.full.yml`) | `docker-compose.full.yml` |
| P1 | M11 + lab-11 | service/hôte `api:3000` inexistant | `localhost:3000` / `demo-app:3000` |
| P1 | M03 + lab-03 | métriques eventloop/heap/db_pool déférées « module 04 » (= tracing conceptuel) | module 02 (default metrics) / 05 |
| P1 | M14 + lab-14 | OOM via `terminated_reason` (retombe à 0 post-restart) | `last_terminated_reason` (persiste) |
| P1 | M17 §2.8 | « OTel Profiles stabilisé 2025 » FAUX | « alpha, OTLP en développement » |
| P1 | lab-18 | « OTel Collector + Tempo » (absent des compose) | Jaeger (16686), full.yml |
| P2 | M07 §5 | `tribuzen_process_resident_memory_bytes` (demo-app sans préfixe) | `process_resident_memory_bytes` |
| P2 | M14 | « 3 couches » vs « 4 couches » | harmonisé 4 (node/orchestrateur/container/app) |
| P2 | M09 | SLO 28j vs burn-rate 30j | phrase de raccord ajoutée |
| P2 | M18 §2.9 | semconv feature-flags « development » | « Release Candidate » |
| P2 | lab-06 | double `Sentry.init` (import + --import) | une seule voie (--import) |

## FLAG-REVIEW humain (Sylvain)
- **M19-rgpd-observabilite** — QA a jugé **irréprochable** : articles RGPD exacts (Art. 5/6/17/25/28/33),
Pino redact correct, avertissement « principes ≠ conseil juridique », renvoi DPO systématique, repère CNIL
journalisation en ordre de grandeur. FLAG-REVIEW présent (module + lab). À valider par Sylvain.

## FLAG-DOC
- M18 §2.1 : prix cloud d'observabilité (Datadog/Grafana/Elastic) volatils — drivers/ordres de grandeur, pas de prix figé.

## Verdict
Lot de **très haute qualité** (0 P0 sur 22 modules). Faits vérifiés verbatim (PromQL, W3C trace-context, OTLP,
Pino, Sentry, SRE burn-rate multi-window, k6, kube-state-metrics, KQL Elastic 9.4, web-vitals v4, Pyroscope,
DORA rename, RGPD). Le gros des corrections = alignement des labs sur les noms RÉELS de la stack docker-compose.
Labs README-only vrai-outil (docker-compose fournis), coach, J+30, zéro harnais. Re-gaté **GATE PASS**.
