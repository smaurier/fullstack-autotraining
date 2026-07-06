# Refonte 16-observability-sre — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `16-observability-sre/modules/NN-slug.md` + `16-observability-sre/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `16-observability-sre/modules/NN-*.md` (29 modules, format `# Module` → AU TEMPLATE) → CONSOLIDÉS en 22 modules.
> **Cours API-lourd (Prometheus, Grafana, OpenTelemetry, ELK).**

## Contrat agent (invariants gate)

1. **Vérif API/config via WebFetch** (Context7 MORT). Docs officielles :
   - Prometheus (PromQL, exposition, alerting rules) → prometheus.io/docs
   - Grafana / Loki / Tempo → grafana.com/docs · OpenTelemetry (SDK, collector, OTLP, semantic conventions) → opentelemetry.io/docs
   - Sentry → docs.sentry.io · ELK (Elasticsearch/Logstash/Kibana) → elastic.co/guide
   - SLO/SRE → sre.google/books (SRE book/workbook) · k6 → grafana.com/docs/k6
   Si URL inconnue → `WebSearch` puis `WebFetch`. Si échec/incertain → `<!-- FLAG-DOC: ... -->`, jamais deviner (PromQL, noms de métriques, versions).
2. **Frontmatter** clés exemplar : `titre, cours: 16-observability-sre, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE items notions[] avec `@`, `[`, `(`, `:`**.
3. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
4. **Ordre novice→expert**. Défère : DORA deep→cours 15, HTTP/perf→11, sécu→14, cloud/k8s infra→12, tests→06.
5. **Lab = README-only** : exercice concret (instrumenter, écrire une PromQL, un dashboard, un SLO, une alerte) avec vrai outil (docker-compose fourni à la racine du cours, Prometheus/Grafana/OTel réels) + grille + **coach** + **variante J+30**. ZÉRO harnais simulé (harnais legacy supprimé).
6. **Fil-rouge TribuZen** : observer l'app TribuZen (API, front, incidents).
7. `{{ }}` en prose → échapper (SSR). PromQL `{label="x"}` en blocs code.

## Colonne vertébrale (22 modules — consolidation de 29 legacy)

| NN | Module | Source legacy | next |
|----|--------|---------------|------|
| 00 | prerequis-et-introduction (pourquoi l'observabilité, 3 piliers logs/metrics/traces, monitoring vs observabilité) | 00, 01 | 01 |
| 01 | logging-structure (log structuré JSON, niveaux, contexte/corrélation, Pino) | 02, 03 | 02 |
| 02 | metriques-et-prometheus (types de métriques, exposition, scrape, PromQL bases) | 04 | 03 |
| 03 | red-use-methodes (RED, USE, les 4 signaux dorés) | 05 | 04 |
| 04 | distributed-tracing (spans, contexte de trace, propagation, sampling) | 06 | 05 |
| 05 | opentelemetry-instrumentation (OTel SDK, auto/manual instrumentation, OTLP, collector pipeline) | 08 | 06 |
| 06 | error-tracking-sentry (capture d'erreurs, releases, source maps, alerting) | 07 | 07 |
| 07 | grafana-dashboards (panels, PromQL avancé dans Grafana, variables, bonnes pratiques dashboard) | 09 | 08 |
| 08 | sli-slo-sla (SLI/SLO/SLA, error budget, choix des SLI) | 10 | 09 |
| 09 | alerting-strategies (alerting sur symptômes, burn-rate, fatigue d'alerte, routing) | 11 | 10 |
| 10 | incidents-et-postmortems (gestion d'incident, rôles, postmortem blameless, timeline) | 12 | 11 |
| 11 | capacity-planning (charge, saturation, load testing k6, dimensionnement) | 13 | 12 |
| 12 | chaos-engineering (hypothèses, blast radius, game days, résilience) | 14 | 13 |
| 13 | observability-as-code (dashboards/alertes versionnés, provisioning, GitOps de l'observabilité) | 16 | 14 |
| 14 | kubernetes-observability (métriques k8s, cAdvisor/kube-state-metrics, logs de pods — défère infra→12) | 19 | 15 |
| 15 | elk-stack-kibana (Elasticsearch/Logstash/Kibana, ingestion, requêtes, quand ELK vs Loki) | 21 | 16 |
| 16 | observabilite-frontend (RUM, Core Web Vitals côté obs, instrumentation front Nuxt/Next, erreurs client) | 23, 24 | 17 |
| 17 | apm-et-profiling (APM panorama, continuous profiling, flamegraphs) | 25, 27 | 18 |
| 18 | finops-et-feature-flags-observabilite (coût de l'observabilité/cardinalité, sampling budget ; feature flags observés) | 20, 26 | 19 |
| 19 | rgpd-observabilite ⚠️SENSIBLE (PII dans logs/traces, minimisation, rétention, anonymisation) | 22 | 20 |
| 20 | dora-et-production-readiness (métriques DORA en survol défère→15 ; checklist production readiness) | 15, 17 | 21 |
| 21 | projet-final (capstone : stack d'observabilité complète de TribuZen — logs+métriques+traces+SLO+alertes+dashboard) | 18, 99 | (fin) |

22 modules (00-21) + 22 labs. Dernier module (21) `next` = sentinel `fin-parcours-16-observability-sre`.
Module 19 (RGPD) → FLAG-REVIEW. Labs = vrai outil via docker-compose fournis (base/full/tracing) à la racine du cours.
Legacy non repris explicitement (99-references = fondu dans 21). Renuméroter proprement 00-21 ; supprimer les modules legacy orphelins après write.
