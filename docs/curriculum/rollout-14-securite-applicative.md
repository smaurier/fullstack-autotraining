# Refonte 14-securite-applicative — colonne vertébrale + contrat agent

> Spec durable. Chaque agent write LIT ce fichier.
> Cible : `14-securite-applicative/modules/NN-slug.md` + `14-securite-applicative/labs/lab-NN-slug/README.md`.
> Exemplar : `02-vue/modules/00-*.md` + `02-vue/labs/lab-02-*/README.md`.
> Templates : `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`.
> Source legacy = `14-securite-applicative/modules/NN-*.md` (format `# Module` → AU TEMPLATE).
> **Cours SENSIBLE (sécurité) + API-lourd.**

## Contrat agent (invariants gate — non négociables)

1. **⚠️ SÉCURITÉ DÉFENSIVE.** Angle défensif : détecter, prévenir, durcir, auditer. **PAS de tutoriel offensif exploitable** (pas de payload d'attaque prêt à copier-coller contre un tiers, pas de contournement détaillé). Montrer la vuln pour la COMPRENDRE et la CORRIGER, dans un contexte pédagogique. Ajoute en tête de corps `<!-- FLAG-REVIEW: SÉCURITÉ — à valider par Sylvain -->`.
2. **Vérif API/fait via WebFetch** (Context7 MORT). Docs officielles :
   - OWASP (Top 10, cheat sheets) → owasp.org, cheatsheetseries.owasp.org
   - Web security (CORS, CSP, headers, cookies, auth) → developer.mozilla.org/en-US/docs/Web/Security + Web/HTTP/Headers
   - OAuth/OIDC/PKCE → datatracker.ietf.org (RFC 6749/7636/9700) + openid.net ; WebAuthn/passkeys → w3.org/TR/webauthn + webauthn.guide
   - Supply chain → owasp.org, docs npm
   Si l'URL exacte est inconnue → `WebSearch` puis `WebFetch`. Si fetch échoue/incertain → `<!-- FLAG-DOC: ... -->`, jamais deviner (versions, noms de headers, RFC).
3. **Frontmatter** clés exemplar : `titre, cours: 14-securite-applicative, notions[], outcomes[], prerequis[], next, libs[], tribuzen, last-reviewed: 2026-07`. Jamais de `: ` nu. **QUOTE tout item notions[] avec `@`, `[`, `(`, `:`**.
4. **7 sections** dont §1 « Cas concret d'abord », ≥5 seeds coach.
5. **Ordre novice→expert**. Défère l'infra cloud→cours 12, l'archi sécu→cours 13 module 20, HTTP→cours 11.
6. **Lab = README-only** : exercice DÉFENSIF (auditer/durcir/configurer une protection, pas attaquer un tiers) + grille + **coach** + **variante J+30**. ZÉRO harnais simulé (test-utils.ts legacy supprimé — ne pas recréer).
7. **Fil-rouge TribuZen** : sécuriser l'app TribuZen (données famille/enfants sensibles → enjeu réel).
8. `{{ }}` en prose → échapper (SSR).

## Colonne vertébrale (numérotation legacy conservée — 14 modules)

| NN | Module | next |
|----|--------|------|
| 00 | introduction-securite (posture, modèle de menace, CIA, defense in depth) | 01 |
| 01 | owasp-top10 (2021, les 10 catégories) | 02 |
| 02 | injection (SQLi, XSS, command injection — prévention, échappement, requêtes paramétrées) | 03 |
| 03 | authentification (sessions, mots de passe/hachage, MFA, gestion de session) | 03b |
| 03b | oidc-pkce-client (OAuth2/OIDC, Authorization Code + PKCE côté client) | 03c |
| 03c | webauthn-passkeys (WebAuthn, passkeys, FIDO2) | 04 |
| 04 | autorisation (RBAC/ABAC, contrôle d'accès, IDOR/BOLA, moindre privilège) | 05 |
| 05 | cryptographie (hachage vs chiffrement, symétrique/asymétrique, TLS, gestion de clés, pièges) | 06 |
| 06 | headers-securite (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, cookies Secure/HttpOnly/SameSite) | 07 |
| 07 | cors (same-origin policy, CORS, preflight, pièges de config) | 08 |
| 08 | api-security (auth d'API, rate limiting, validation, JWT bien géré, mass assignment) | 09 |
| 09 | supply-chain (dépendances, npm audit, lockfiles, typosquatting, SBOM, CI) | 10 |
| 10 | infrastructure-securite (secrets, TLS, durcissement, WAF en survol — défère cloud→cours 12) | 11 |
| 11 | audit-pentest (méthodo d'audit défensif, SAST/DAST, threat modeling, responsible disclosure) | (fin) |

14 modules + 14 labs. Labs legacy = lab-01..lab-10 (réécrire au template) ; créer lab-00, lab-03b, lab-03c, lab-11 manquants.
Dernier module (11) `next` = sentinel `fin-parcours-14-securite-applicative`.
**CHAQUE module = FLAG-REVIEW (sujet sensible).** Labs = défensifs (durcir/auditer/configurer), jamais attaquer un système tiers.
