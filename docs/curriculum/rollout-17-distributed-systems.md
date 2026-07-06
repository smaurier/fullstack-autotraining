# Refonte 17-distributed-systems — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `17-distributed-systems/modules/NN-slug.md` + `17-distributed-systems/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `17-distributed-systems/modules/NN-*.md` (29 modules, format `# Module` → AU TEMPLATE) → CONSOLIDÉS en 23 modules.
> **Cours DEEP systèmes distribués (théorie + implémentation).**

## Contrat agent (invariants gate)

1. **Vérif fait/API via WebFetch** (Context7 MORT). Sources :
   - Théorie : raft.github.io (Raft), jepsen.io (consistency/tests), martinfowler.com (patterns), les papers cités (Lamport clocks, CAP/Brewer, Dynamo)
   - Implémentation TS : docs des libs (gRPC, message brokers) via WebFetch/WebSearch
   Si URL inconnue → WebSearch puis WebFetch. Si échec → `<!-- FLAG-DOC: ... -->`, jamais deviner (garanties de consistance, algos de consensus, sémantiques de livraison).
2. **Frontmatter** clés exemplar : `titre, cours: 17-distributed-systems, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE items notions[] avec `@`, `[`, `(`, `:`**.
3. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
4. **Ordre novice→expert**. Défère : Docker/k8s→cours 12/15 (PAS de modules dédiés ici, mention en survol) ; observabilité deep→cours 16 ; sécu→14 ; archi patterns niveau design→cours 13 (ici = niveau système/impl).
5. **⚠️ Chevauchement cours 13-architecture** (module 18 CQRS/ES/Saga, 16-17 communication/event-driven) : ici on va PLUS PROFOND (mécanismes, garanties, impl) ; renvoyer à 13 pour la décision d'archi, ne pas répéter la couche « quand choisir ».
6. **Lab = README-only** : exercice concret (impl un pattern distribué, tracer une trace, provoquer une partition) via docker-compose fourni + grille + **coach** + **variante J+30**. ZÉRO harnais simulé (harnais legacy supprimé).
7. **Fil-rouge TribuZen** : TribuZen en système distribué (services, messagerie, cohérence).
8. `{{ }}` en prose → échapper (SSR).

## Colonne vertébrale (23 modules — consolidation de 29 legacy)

| NN | Module | Source legacy | next |
|----|--------|---------------|------|
| 00 | prerequis-et-introduction (pourquoi le distribué, fallacies of distributed computing, défis) | 00, 01 | 01 |
| 01 | communication-reseau-fondamentale (réseau, latence, partiel failure, RPC) | 02 | 02 |
| 02 | microservices-en-typescript (premiers services, découpage, communication) | 03 | 03 |
| 03 | serialisation-et-contrats-api (JSON/Protobuf/Avro, schéma, versioning de contrat) | 04 | 04 |
| 04 | communication-synchrone (REST/gRPC en profondeur, streaming, deadlines) | 05 | 05 |
| 05 | communication-asynchrone-message-queues (brokers, queues, garanties de livraison) | 06 | 06 |
| 06 | event-driven-architecture (événements, pub/sub, découplage) | 07 | 07 |
| 07 | api-gateway-et-bff (gateway, BFF, agrégation, cross-cutting) | 08 | 08 |
| 08 | retries-timeouts-idempotency (backoff+jitter, idempotency key, exactly-once semantics) | 09 | 09 |
| 09 | coherence-et-theoreme-cap (CAP, PACELC, modèles de cohérence forte→éventuelle) | 10 | 10 |
| 10 | replication-et-partitionnement (réplication leader/leaderless, sharding, hashing cohérent, quorums) | 11 | 11 |
| 11 | transactions-distribuees-saga (2PC, saga orchestration/chorégraphie, compensation) | 12 | 12 |
| 12 | cqrs-event-sourcing (CQRS, event sourcing, projections, replay — impl profonde ; décision→cours 13) | 13 | 13 |
| 13 | outbox-pattern-reliable-messaging (dual-write, outbox, CDC, at-least-once + idempotence) | 14 | 14 |
| 14 | failure-modes-et-circuit-breaker (modes de panne, cascades, circuit breaker, bulkhead, timeout budget) | 15, 16 | 15 |
| 15 | rate-limiting-et-backpressure (algos token/leaky bucket, backpressure, load shedding) | 17 | 16 |
| 16 | observabilite-distribuee (traçage distribué, corrélation — défère deep→cours 16) | 18 | 17 |
| 17 | testing-distribue (contract testing, fault injection, tests de partition, chaos léger) | 19 | 18 |
| 18 | consensus-et-coordination (leader election, Raft, quorum, Paxos survol, ZooKeeper/etcd) | 20 | 19 |
| 19 | temps-ordre-et-horloges (horloge physique/logique, Lamport, vector clocks, happens-before) | 21 | 20 |
| 20 | stream-processing (event streaming, Kafka-like, windowing, exactly-once en streaming) | 22 | 21 |
| 21 | crdts-et-resolution-de-conflits (CRDTs, LWW, merge, réplication sans coordination) | 23 | 22 |
| 22 | projet-final (capstone : un système TribuZen distribué résilient de bout en bout) | 24, 99 | (fin) |

23 modules (00-22) + 23 labs. Dernier module (22) `next` = sentinel `fin-parcours-17-distributed-systems`.
DOCKER/K8S (legacy 25/26/27) NON repris → déférés aux cours 12-aws & 15-cicd (mention en survol dans 00). Supprimer orphelins legacy après write.
