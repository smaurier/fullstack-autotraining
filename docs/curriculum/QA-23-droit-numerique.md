# QA — 23-droit-numerique (refonte v1) — DERNIER COURS DU ROLLOUT

> Cours COMPLÉTÉ en autonomie (rollout) : 6 modules legacy incomplets → 9 modules (00-08) + 9 labs.
> Setup VitePress créé from scratch. Orphelins legacy purgés.
> **Droit du numérique pour développeurs. ⚠️⚠️ COURS ENTIÈREMENT SENSIBLE (légal).**
> **Context7 mort → vérif par WebFetch sources officielles** (cnil.fr, service-public.fr,
> digital-strategy.ec.europa.eu, accessibilite.numerique.gouv.fr, choosealicense.com, commission.europa.eu).
> GATE PASS (build OK). QA consolidée. **Thème propre** (0 fuite `{{ title }}`, sans override).

## Verdict : SHIP (0 P0, 0 P1) — prudence juridique jugée « exemplaire »

Correction appliquée : P2 prereq mod02 (`00` nu → slug complet).

## Sécurité juridique — VÉRIFIÉE
Le contrat « principes + ordre de grandeur + renvoi source, jamais une vérité figée » est **respecté partout**.
Faits sensibles spot-checkés et CONFIRMÉS (avec cadrage « à valider juriste ») :
- délai droits des personnes ~1 mois / 3 mois si complexe (cnil.fr) ✓
- seuil accessibilité privé 250 M€ CA moyenne 3 ans (accessibilite.numerique.gouv.fr) ✓
- Schrems II 2020 / DPF 2023 / SCC 2021, bases légales Art. 6, sensibles Art. 9, DPA Art. 28, PbD Art. 25 ✓
- licences MIT/Apache/GPL/AGPL + piège AGPL réseau=distribution ✓
- **code généré par IA = zone grise NON tranchée** (conforme, renvoi juriste) ✓
Aucun montant d'amende actionnable, aucun article figé, aucune règle « en dur ».

## FLAG-REVIEW HUMAIN — ⚠️ LES 9 MODULES + 9 LABS
Cours entièrement sensible : `<!-- FLAG-REVIEW -->` + disclaimer « pas un conseil juridique » + renvoi
juriste/DPO/avocat sur **chaque** module et lab. **→ Sylvain + juriste doivent valider avant toute diffusion publique.**

## FLAG-DOC (1, pertinent)
M02 §2.4 : durées CNIL de conservation du choix / durée de vie cookies — à confirmer sur la reco en vigueur.

## Gate résiduel — PASS
Chaîne next 00→…→08→sentinel `fin-parcours-23-droit-numerique`. 9 modules valident, 7 sections, seeds ≥8.
Anti-simulé : labs README-only = analyses/checklists de conformité (ZÉRO code, zéro harnais), coach+grille+J+30.
Angle « le dev implémente/signale, ne décide pas le droit » tenu partout. **Thème propre.** Re-gaté **GATE PASS**.
