# QA — 13-architecture (refonte v1)

> Cours réécrit en autonomie (rollout week-end). 24 modules (00-23) + 24 labs.
> Consolidation de 97 fichiers `cours/` (14 domaines) en 24 modules de **raisonnement architectural**,
> avec déférences explicites aux cours dédiés (distribués→17, sécu→14, observabilité→16, bdd→10,
> backend→09, HTTP→11, tests→06, front→02/03/04, design system→21) — pas de duplication.
> Cours **conceptuel** → peu de WebFetch. GATE PASS déterministe. QA agents read-only 3 blocs (00-07 / 08-15 / 16-23).

## Corrections appliquées

| Prio | Fichier | Problème | Correction |
|------|---------|----------|------------|
| P1 | lab-03 | Analyse du bug de validation email FAUSSE (`'a@b'.indexOf('@')`=1>0, accepté par la clause, pas rejeté) | Réécrit : le défaut = validation trop laxiste (accepte `"a.@b"`/`"a@.b"`) |
| P2 | M02 | Repository/Simple Factory/EventBus présentés comme GoF | Note : Repository=Fowler/Evans, Simple Factory≠Factory Method, EventBus=Pub/Sub |
| P2 | M08 §2.6 | Fausse citation verbatim de Fowler | Paraphrase (MonolithFirst 2015) |
| P2 | M11 | « Problem Details RFC 7807 » (obsolétée 2023) | « RFC 9457, ex-7807 » (4 occ.) |
| P2 | M14 §7 | Coquille « paralllélise » | « parallélise » |
| P2 | M20 §2.3 | FLAG-DOC OWASP Top10 non résolu | Levé (owasp.org vérifié : A01 Broken Access Control, A04 Insecure Design exacts) |
| P2 | M22 §2.9 | Honeycomb attribué à Fowler | Spotify (Fowler=Test Pyramid) |
| P2 | M16 | gRPC « 5-10× » non sourcé ; SSE « passe les proxies sans souci » | Adouci ; nuance SSE HTTP/1.1 (~6 conn/domaine) |

## FLAG-REVIEW humain (Sylvain)
- **M20-securite-architecturale** — QA a vérifié STRIDE=Microsoft (correct), OWASP Top10 2021 (A01/A04 exacts via owasp.org), FLAG-REVIEW présent, rien de dangereux (tout le durcissement déféré au cours 14). Reste au niveau topologie/placement des contrôles. À valider par Sylvain.

## Verdict

Lot **exceptionnellement propre** (les 3 reviewers : justesse conceptuelle haute, ordre novice→expert
strict, **déférences exemplaires et non-dupliquées**, chaînage prereq/next intact, labs README-only =
exercices de conception/décision (ADR, C4, threat model STRIDE, diagrammes) + grille coach + J+30 +
zéro harnais). Attributions vérifiées (Fowler, Cockburn ports&adapters 2005, Uncle Bob dependency rule,
CAP/PACELC, exactly-once semantics vs delivery, Conway/Team Topologies). Corrections ci-dessus appliquées,
re-gaté **GATE PASS**.
