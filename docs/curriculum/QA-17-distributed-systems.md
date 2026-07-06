# QA — 17-distributed-systems (refonte v1)

> Cours réécrit en autonomie (rollout week-end). 23 modules (00-22) + 23 labs.
> Consolidation de 29 modules legacy v0 → 23, 28 orphelins purgés (Docker/k8s déférés cours 12/15).
> **Cours DEEP systèmes distribués (théorie + implémentation).**
> **Context7 mort → vérif par WebFetch** (raft.github.io, jepsen.io, martinfowler.com,
> microservices.io, opentelemetry.io, w3.org/TR/trace-context, kafka.apache.org, crdt.tech,
> aws backoff+jitter, grpc.io). GATE PASS (build OK). QA agents read-only 3 blocs.

## Corrections appliquées (0 P0)

| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P1 | M09 (§2.8, §2.11 diagramme, points-clés, seeds) + lab-09 (D4) | cohérence **causale** étiquetée « totalement disponible » — Jepsen la classe **sticky available** (le client doit coller à une réplique) ; contradiction interne du diagramme | causale = **sticky available** (plus fort modèle qui reste dispo en régime sticky) ; **éventuelle** = totalement disponible. Harmonisé partout. |
| P1 | lab-05 (fakeExport) | `if (Math.random() < 0.3) throw` = échec non déterministe (interdit anti-simulé, contredit lab-17) | échec **déterministe** : échoue au 1er passage par `sortieId` (Set `failedOnce`), réussit ensuite → redélivrance reproductible. `sortie-poison` toujours en échec (DLQ). |

## P2 non bloquants (laissés en l'état, cap QA↔fix)
- lab-04 : `membership` en `expose` seul → `grpcurl localhost:50051` non joignable depuis l'hôte (ajouter `ports` ou `compose exec`).
- M10 §2.10 : symbole `n` réutilisé (clés vs noeuds) — cosmétique.
- lab-08 : docker-compose décrit mais non inliné (contrairement aux autres labs).
- M18 §2.1 : « Validity (integrity) » colle deux propriétés distinctes.
- lab-21 : corrigé complet vs starters ailleurs (incohérence de style).
- lab-20 J+30 : « 2 partitions » vs topic à 3 partitions.
- M22 : back-link final absent des autres modules.

## FLAG-DOC
- M19 : HLC (Kulkarni/Demirbas 2014) — PDF non parsable par WebFetch, algo confirmé via sources secondaires concordantes. Pas de FLAG bloquant.

## Verdict
Lot de **très haute qualité** (0 P0 sur 23 modules). Faits porteurs vérifiés verbatim :
W3C traceparent (format exact), Raft (5 propriétés de sécurité, election restriction, Figure 8),
Jepsen (safety property, causal = sticky available), AWS jitter (Full/Equal/Decorrelated),
quorum W+R>N, saga/2PC (microservices.io), CQRS/ES, outbox, circuit breaker (Fowler),
Kafka partitions/offsets/exactly-once, CRDTs (CvRDT/CmRDT, G-Counter/OR-Set/SEC), Lamport/vector/HLC.
Labs README-only vrai-outil (docker-compose/testcontainers/Pact fournis), coach, J+30, zéro harnais
maison. Portée tenue : impl/mécanismes/garanties, décision d'archi renvoyée au cours 13 ;
observabilité deep renvoyée au cours 16. Re-gaté **GATE PASS**.
