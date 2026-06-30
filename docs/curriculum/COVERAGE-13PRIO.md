# Matrice de couverture — liste 13-prio (cours pilotes)

Suivi de couverture des items de la liste de priorités de Sylvain par les cours pilotes.
Statuts : ✅ couvert · 🟡 partiel · ❌ manquant.

## Prio 10 — Tests → cours `06-testing`

| Item | Module(s) | Statut |
|------|-----------|--------|
| Jest | (Vitest privilégié — Jest mentionné en comparaison) | 🟡 |
| Vitest | 01-pourquoi-tester, 02-anatomie, fil-rouge Vitest réel | ✅ |
| Cypress | (à confirmer dans modules e2e) | 🟡 |
| Playwright | modules tests e2e | ✅ |
| Mocking | 04-mocking-et-test-doubles (module témoin réécrit) | ✅ |
| TDD | 15-tdd-et-bdd | ✅ |

→ Gaps à combler au rollout du cours : confirmer Jest (comparaison explicite) + Cypress (ou justifier le choix Playwright).

## Prio 7 — Base de données → cours `10-postgresql`

| Item | Module(s) | Statut |
|------|-----------|--------|
| MongoDB | 13-jsonb (contraste) + 13-architecture/04-bdd/05-nosql | ✅ |
| PostgreSQL | tout le cours | ✅ |
| SQL | 02-crud-et-requetes, 03-relations-et-jointures | ✅ |
| Index | 05-index-fondamentaux, 07-index-avances | ✅ |
| Transactions | 04-transactions-et-acid (module témoin réécrit) | ✅ |
| ORM | (Prisma via fil-rouge + 14-securite) | 🟡 |

→ Gap à combler au rollout : un module/section ORM (Prisma) dédié si absent.

## Règle

Le rollout ne **ferme** un cours que lorsque ses items 13-prio sont **tous ✅**.
Cette matrice est étendue à chaque cours traité.
