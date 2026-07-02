# QA NestJS + PostgreSQL — rapport + file de corrections

> 8 reviewers read-only (5 NestJS, 3 PG). Verdict : **aucun module sous plancher, aucune réécriture**. Corrections ciblées ci-dessous. Le gate durci avait déjà bloqué les problèmes structurels (simulé/delimiters/J+30/refs/YAML) — il reste du factuel + quelques liaisons.

## 🔴 P0 — Sécurité / labs cassés (à corriger en priorité)

| # | Fichier | Problème | Correction |
|---|---------|----------|-----------|
| 1 | PG M15 projet-final (+ lab-15) | Policies RLS `current_setting('app.family_id')::int` **sans `true`** — contredit la règle du module 14 (sans `true` → ERROR au lieu de deny silencieux). 3 policies (activities/slots/bookings), module + lab | ajouter `, true` : `current_setting('app.family_id', true)::int` |
| 2 | PG lab-03 jointures ex5 | corrigé NOT EXISTS "qui n'a invité personne" = **"Eva, Alice" FAUX** (Alice a invité Bob+Claire) | vrai résultat = Eva, Claire, David ; corriger l'explication (confusion `invited_by IS NULL` vs `NOT EXISTS`) |
| 3 | PG lab-05 index étape 5 | `DELETE FROM families WHERE id='fam-2'` **échoue** (seed insère des posts pour fam-2 + FK sans CASCADE) ; commentaire "pas de posts pour fam-2" faux | seed fam-2 sans posts (hardcoder `'fam-1'`) OU `ON DELETE CASCADE` OU famille tierce |
| 4 | Nest M24 lab-24 étape 7 | `TEST_TOKEN='Bearer test-jwt-token'` **non signé** → JwtAuthGuard global renvoie 401 sur tous les cas "succès" | override `JwtAuthGuard` dans TestingModule OU vrai JWT signé via JwtService |

## 🟠 P1 — Erreurs factuelles

| # | Fichier | Problème | Correction |
|---|---------|----------|-----------|
| 5 | Nest M10 controllers piège #3 | "`@Post()` retourne 200 par défaut en NestJS 11 (201 avant)" = **FAUX** (toujours 201) | retirer la parenthèse ; `@HttpCode(CREATED)` reste bonne pratique pour l'intention |
| 6 | Nest M14 typeorm §2.4 | clé `family` **dupliquée** dans l'objet `relations` (JS écrase silencieusement) | 2 exemples séparés : `{ family: true }` et `{ family: { members: true } }` |
| 7 | Nest M14 typeorm §2.3 | `@ManyToMany(() => Post, ...)` pour `likedBy: User[]` → devrait être `() => User` (l'Exemple B est correct, pas la théorie) | corriger la cible en `User` |
| 8 | Nest M04 http §2 | "préfixe `node:` **obligatoire** en Node 22" = FAUX (recommandé) | reformuler "recommandé/fortement conseillé" |
| 9 | Nest M04 http §5 | référence "module 07 (NestJS)" → NestJS démarre au **module 09** | corriger 07→09 |
| 10 | Nest M26 graphql §2.8 | `pubSub.asyncIterableIterator` = graphql-subscriptions **v3** ; frontmatter ne spécifie pas la version → crash si v2 (`asyncIterator`) | ajouter `graphql-subscriptions ^3` aux libs OU utiliser `asyncIterator` + note version |
| 11 | PG M04 transactions | frontmatter `version: "16"` alors que tout le cours est **17** | → `"17"` |
| 12 | Nest M16 prisma | justification `@relation("FamilyMembers")` "obligatoire car 2 relations" = inexact (obligatoire seulement si 2 relations entre les MÊMES modèles) | reformuler la règle |

## 🟡 P2 — Nuances / liaisons / template

- **Nest M08** (sécu, non bloquant) : ajouter `{ algorithms: ['HS256'] }` à `jwt.verify()` (défense en profondeur ; jsonwebtoken v9 bloque déjà alg:none). Le reste = correct.
- **Nest M17** : commenter `deletedAt: null` redondant (middleware `$use` le fait) ; retirer CockroachDB de la liste "TypeORM only" (Prisma le supporte).
- **Nest bridges** : ajouter phrase de pont 13→14 (données en mémoire → TypeORM) et 23→24 (déployable → structuré par domaines).
- **Nest M05 §2.7** : `import.meta.dirname` (Node 22) au lieu du polyfill `fileURLToPath` (cohérence M02).
- **Nest labs 24/25** : ajouter en-tête `Vrai outil:` / `Feedback:` (LAB-TEMPLATE).
- **PG M03** : FULL OUTER JOIN utilise `users_snapshot_a/b` non définies → DDL ou schéma TribuZen.
- **PG M11** : règle `max_connections ≤ (CPU×2)+disques` = heuristique datée → nuancer (PgBouncer, 100-200).
- **PG M14** : `\set/:fam_id` psql décrit comme "paramétrée" → c'est de l'interpolation client (le `$1` Node qui suit est la vraie protection).
- **PG 07→08** : ajouter pont (index rapides → mais lectures concurrentes incohérentes → isolation).
- **PG M01** : ajouter "Pont vers le lab" (note : conceptuel, pratique au lab-02).
- **PG labs 02/06** : en-tête LAB-TEMPLATE + section Application TribuZen manquantes ; lab-03 : Application TribuZen + lien mort `lab-02-crud-en-pratique`→`lab-02-crud-complet`.
- **PG naming** : singulier (`family`/`post` M02) vs pluriel (`families`/`posts` M01/05/06) → harmoniser sur pluriel.
- **PG M12 / M07 / M19** : commentaire anti-cycle exemple B ; note GiST+tsvector ; lab optionnel pgvector.

## Sécurité — synthèse
Nest M08 + M19 (auth/JWT/bcrypt/cookie httpOnly/refresh haché/2 secrets) = **corrects** (Context7 vérifié). PG M14 RLS = correct SAUF la propagation du `true` oubliée dans M15 (P0 #1). Rien de dangereux non identifié.
