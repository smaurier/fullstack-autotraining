# QA — 14-securite-applicative (refonte v1)

> Cours réécrit en autonomie (rollout week-end). 14 modules + 14 labs.
> Réécriture legacy → template, **angle DÉFENSIF strict** (FLAG-REVIEW sur chaque module + lab).
> **Context7 mort → vérif sécu par WebFetch** (owasp.org, cheatsheetseries, MDN, datatracker.ietf, docs.npmjs).
> GATE PASS déterministe. QA agents read-only 2 blocs (00-04 / 05-11), WebFetch à l'appui.

## Corrections appliquées

| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P1 | M11 + lab-11 | « ASVS 5.0.0 » annoncé mais structure/mapping = 4.0.3 | Relabelisé **ASVS 4.0.3** (mapping redevient exact) |
| P1 | labs 05,06,07,08,10 | Grille + section Coach manquantes (contrat) | Ajoutées (modèle lab-09/11), spécifiques à chaque exo |
| P2 | M06 §3 | En-tête `Reporting-Endpoints` malformé | `csp-endpoint="https://.../api/csp-report"` (URL absolue) |
| P2 | M01 §2.0 | « dernière édition 2021 » (RC 2025 existe) | Nuancé « édition de référence 2021 ; RC 2025 en cours » |
| P2 | labs 03b/03c/04 | FLAG-REVIEW après le H1 | Déplacé ligne 1 (avant H1) |
| P2 | labs 03/04 | Top-level await sans `type: module` | Ajout `npm pkg set type=module` |

## Vérifications sécu confirmées (WebFetch)
argon2id `m=19MiB,t=2,p=1` / bcrypt cost≥10 + limite 72o / OWASP Top10 2021 A01-A10 exacts / OAuth 2.1 implicit
retiré + PKCE MUST (RFC 9700/7636) / WebAuthn origin binding / AES-256-GCM IV unique jamais ECB / CSP+HSTS+
cookies `__Host-` / CORS wildcard+credentials interdit + reflecting Origin dangereux + « CORS≠authZ » / JWT
alg:none + RS256/HS256 confusion / npm audit+provenance Sigstore / WSTG 4.2 + cadre légal (art. 323-1 CP).

## ⚠️ FLAG-REVIEW humain (Sylvain) — TOUS les 14 modules
Cours sensible : chaque module + lab porte `<!-- FLAG-REVIEW: SÉCURITÉ -->`. Angle 100% défensif vérifié
(aucun payload offensif exploitable ; labs = durcir/auditer SON système, jamais un tiers ; capstone M11 avec
cadre éthique/légal + divulgation responsable). **À relire par Sylvain avant diffusion publique.**

## Verdict
Lot **exceptionnellement propre** (les 2 reviewers : 0 P0, faits sécu vérifiés verbatim OWASP/MDN/RFC).
Corrections ci-dessus appliquées, re-gaté **GATE PASS**.
