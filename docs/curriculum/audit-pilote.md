# Audit des 2 modules témoins (pilote)

> Grille : `docs/curriculum/AUDIT-RUBRIC.md` (8 critères, 0-3, plancher = tous ≥ 2).
> QA technique visée via Context7 (Vitest, Prisma/PostgreSQL). **Limite d'exécution** : dans l'environnement d'agent, l'outil Context7 a été refusé (permission denied) ; la vérification API s'appuie sur la connaissance modèle + le contenu existant déjà techniquement correct (APIs Vitest `vi.fn/vi.mock/vi.spyOn/vi.hoisted` présentes et exactes). À revalider via Context7 hors sandbox.

## Chemins réels confirmés

| Artefact | Chemin | Existe |
|---|---|---|
| Module Testing | `06-testing/modules/04-mocking-et-test-doubles.md` | oui |
| Lab Testing | `06-testing/labs/lab-04-mocking/README.md` | oui |
| Module PostgreSQL | `10-postgresql/modules/04-transactions-et-acid.md` | oui |
| Lab PostgreSQL | `10-postgresql/labs/lab-04-transactions/README.md` | oui |

## Tableau module × critère (état AVANT réécriture)

| # | Critère | Testing 04 (mocking) | PostgreSQL 04 (transactions/ACID) |
|---|---------|:---:|:---:|
| 1 | Couverture notions | 3 | 2 |
| 2 | Concret avant abstrait | 0 | 1 |
| 3 | Worked examples | 2 | 2 |
| 4 | Lab vrai outil + corrigé | 1 | 1 |
| 5 | Pièges / misconceptions | 2 | 2 |
| 6 | Ancrage TribuZen | 0 | 0 |
| 7 | Actualité technique | 2 | 2 |
| 8 | Seeds Anki | 0 | 0 |

### Justification — Testing 04

- **(1) 3** : taxonomie complète (dummy/stub/spy/mock/fake), `vi.fn`, `vi.spyOn`, `vi.mock`, `vi.hoisted`, mock partiel, timers, dates, over-mock, DI. Couverture large + interconnexions.
- **(2) 0** : ouvre directement sur la théorie (taxonomie Meszaros), aucun cas concret à résoudre d'abord.
- **(3) 2** : exemples complets (mock fetch, mock module DB) mais pas présentés en worked-example pas-à-pas, pas de fading.
- **(4) 1** : le lab est en gap-fill (« completez les TODOs », renvoie à `solution.ts`), pas de corrigé complet commenté dans le README.
- **(5) 2** : over-mocking + mocker-vs-réel nommés.
- **(6) 0** : aucun ancrage TribuZen.
- **(7) 2** : APIs Vitest à jour, mais aucun frontmatter `libs:`/versions.
- **(8) 0** : pas de seeds Anki.

**Verdict : SOUS PLANCHER (critères 2, 6, 8 = 0) → réécriture lourde.**

### Justification — PostgreSQL 04

- **(1) 2** : ACID, BEGIN/COMMIT/ROLLBACK, SAVEPOINT, autocommit, WAL, crash recovery, transactions longues couverts. Mais isolation et anomalies (dirty/non-repeatable/phantom read) seulement effleurées et renvoyées au module 08 — incomplet pour un module transactions.
- **(2) 1** : ouvre sur une définition + analogie bancaire, pas un problème concret à résoudre d'abord.
- **(3) 2** : virement + helper `withTransaction` complets, mais en driver `pg` brut — la couche TribuZen cible Prisma.
- **(4) 1** : lab en gap-fill (TODOs + `solution.ts`), pas de corrigé complet commenté dans le README.
- **(5) 2** : pool-vs-client, `fsync=off`, état aborted, transactions longues — bien nommés.
- **(6) 0** : aucun ancrage TribuZen.
- **(7) 2** : `pg` 8.x à jour, mais pas de frontmatter `libs:`/versions, et Prisma absent alors que c'est l'outil de la couche.
- **(8) 0** : pas de seeds Anki.

**Verdict : SOUS PLANCHER (critères 6, 8 = 0 ; 2 limite) → réécriture lourde.**

## Synthèse

Les deux modules sont techniquement solides mais **sous le plancher pédagogique** : pas de cas concret en ouverture, pas d'ancrage TribuZen, pas de seeds Anki, pas de frontmatter consommable par le coach, et labs en gap-fill. **Réécriture lourde des deux** au `MODULE-TEMPLATE.md` / `LAB-TEMPLATE.md`, avec :

- Testing : ancrage TribuZen = service d'invitation/notification (couche « tests logique domaine », Vitest réel).
- PostgreSQL : worked examples portés sur **Prisma + PostgreSQL** (`$transaction` interactive et séquentielle), couverture explicite des anomalies et niveaux d'isolation ; ancrage TribuZen = invitation famille atomique.
