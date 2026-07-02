# Flags overnight — à revoir par Sylvain au réveil

> Points factuels/sécurité soulevés pendant le rollout autonome (pas de checkpoint humain la nuit). Rien de bloquant (validate + build + gate durci passent), mais à valider.

## 09-nestjs — module 08 (Express auth & sécurité)
- **DUMMY_HASH avec top-level await** : ne marche qu'en ES module (`"type":"module"`). Si le projet cible CommonJS, remplacer par un `bootstrap()` async. → vérifier la cible du repo tribuzen.
- **`sameSite: 'strict'` vs `'lax'`** : `strict` bloque le cookie sur navigation depuis lien externe (email → app). Pour SPA avec deep links, `'lax'` souvent préférable. Choix contextuel — valider selon TribuZen.
- **Refresh token secret distinct** (`REFRESH_TOKEN_SECRET` ≠ `JWT_SECRET`) mentionné mais pas implémenté dans le corrigé lab-08 (hors scope). À implémenter plus tard (module 19 auth NestJS).
- **`secure: NODE_ENV==='production'`** : cookie envoyé en HTTP en dev localhost (acceptable), ne pas oublier en prod.
- **`clearCookie` doit avoir exactement les mêmes attributs** (`path`/`domain`/`sameSite`) que `res.cookie` sinon logout silencieusement inefficace.

→ Aucun de ces points n'est une ERREUR ; ce sont des choix/limites à confirmer selon le contexte TribuZen. Contenu bcrypt/JWT/httpOnly-vs-localStorage = correct (Context7 vérifié).
