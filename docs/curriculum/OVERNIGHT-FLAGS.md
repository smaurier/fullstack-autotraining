# Flags overnight — à revoir par Sylvain au réveil

> Points factuels/sécurité soulevés pendant le rollout autonome (pas de checkpoint humain la nuit). Rien de bloquant (validate + build + gate durci passent), mais à valider.

## 09-nestjs — module 08 (Express auth & sécurité)
- **DUMMY_HASH avec top-level await** : ne marche qu'en ES module (`"type":"module"`). Si le projet cible CommonJS, remplacer par un `bootstrap()` async. → vérifier la cible du repo tribuzen.
- **`sameSite: 'strict'` vs `'lax'`** : `strict` bloque le cookie sur navigation depuis lien externe (email → app). Pour SPA avec deep links, `'lax'` souvent préférable. Choix contextuel — valider selon TribuZen.
- **Refresh token secret distinct** (`REFRESH_TOKEN_SECRET` ≠ `JWT_SECRET`) mentionné mais pas implémenté dans le corrigé lab-08 (hors scope). À implémenter plus tard (module 19 auth NestJS).
- **`secure: NODE_ENV==='production'`** : cookie envoyé en HTTP en dev localhost (acceptable), ne pas oublier en prod.
- **`clearCookie` doit avoir exactement les mêmes attributs** (`path`/`domain`/`sameSite`) que `res.cookie` sinon logout silencieusement inefficace.

→ Aucun de ces points n'est une ERREUR ; ce sont des choix/limites à confirmer selon le contexte TribuZen. Contenu bcrypt/JWT/httpOnly-vs-localStorage = correct (Context7 vérifié).

## 09-nestjs — module 19 (NestJS auth)
- Patterns sécu vérifiés Context7 et corrects : 2 secrets distincts (access/refresh), refresh token haché en base, `bcrypt.compare`, secret via ConfigService, `ignoreExpiration: false`, guard JWT global + `@Public()`. RAS — juste confirmer les valeurs `.env` en vrai déploiement.

## 10-postgresql — module 14 (Sécurité & RLS) — à tester sur PG 17 réel
- **`WITH CHECK` implicite** sur policy ALL/UPDATE sans clause explicite : tester qu'une policy UPDATE avec `USING` seul bloque bien la modif de `family_id`. Toujours expliciter `WITH CHECK`.
- **`current_setting('app.family_id', true)::int` sur NULL** : `NULL::int = NULL` → deny (correct), mais confirmer que PG 17 ne lève pas d'exception sur le cast.
- **`set_config(..., true)` hors transaction** se comporte comme session-level (pool !). Pattern sûr = `BEGIN; set_config; ...; COMMIT;`. À tester en contexte pooled.
- **`FORCE ROW LEVEL SECURITY` + SUPERUSER** : les superusers contournent TOUJOURS RLS. Le rôle applicatif ne doit jamais être superuser.

→ Non bloquant. À valider si/quand la RLS est mise en prod sur TribuZen.

## QA profonde des 2 cours = À FAIRE à ton checkpoint
NestJS (27 modules) + PostgreSQL (20 modules) écrits overnight, gate durci PASS + Context7 obligatoire = base solide. Mais la **QA pédagogique/exhaustivité/liaison** (agents reviewer + ta revue factuelle) n'a PAS été faite la nuit (déférée pour privilégier l'écriture). À lancer ensemble : `/code-review` ou dispatch reviewers par bloc, comme pour 02-vue et 06-testing.
