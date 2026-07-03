# QA — 08-soft-skills (refonte v1)

> Cours réécrit en autonomie (rollout week-end 2026-07-03). 11 modules (00-10) + 11 labs.
> Legacy `modules/` (sans frontmatter) réécrits au template ; labs legacy + `test-utils.ts`
> (harnais simulé) supprimés → labs = mises en situation README-only.
> GATE PASS déterministe (validate ×11, anti-simulé, delimiters, J+30, intégrité prereq/next,
> cross-framework, build). Cours **conceptuel** → aucune vérif API (Context7 non requis).
> QA agent read-only (1 passe, 11 modules courts).

## Corrections appliquées

| Prio | Fichier(s) | Problème | Correction |
|------|-----------|----------|------------|
| P1 | M10 + lab-10 | Cadre **COIN** introduit alors que M08 enseigne **DESC/OSBD** (et M10 = « aucun concept nouveau ») | COIN → DESC partout (8 occ. module, 6 occ. lab) |
| — | config VitePress | `quizzes/` legacy désalignés (quiz-08 enseigne encore COIN) | `srcExclude: quizzes/**` (archive, non shippé) |
| P2 | M00 §2.5 | Modèle Dreyfus déformé (« Novice→Avancé→Compétent→Expert→Maître ») | Corrigé canonique : Novice→Débutant avancé→Compétent→Proficient→Expert |
| P2 | M06 §2.6 | Fausse attribution « SBI hérité du module 01 » (M01 = S.G.P., pas SBI) | Attribution retirée ; SBI = cadre propre + renvoi S.G.P. |
| P2 | lab-10 | Notation PERT ambiguë `(o + 4p + P)/6` (p vs P) | `(O + 4M + P)/6` + légende, cohérent M04 |

## Verdict

Lot haute qualité : §1 concret-d'abord partout, frameworks corrects (S.G.P., DESC, OSBD/CNV,
INVEST, PERT, Divio, MADR/Nygard, disagree-and-commit, STAR, planning fallacy, Goodhart,
one/two-way door), labs README-only = mises en situation réelles + grille + corrigé + coach +
J+30, zéro harnais. **Ton M09-carrière conforme** (angle « expert qui observe le marché », zéro
auto-dépréciation, branding sobre — cf. [[feedback_linkedin]]). Corrections ci-dessus appliquées,
re-gaté **GATE PASS**.

Note mineure non bloquante : 2 caractères zero-width pré-existants dans module/lab 05 (à nettoyer un jour).
