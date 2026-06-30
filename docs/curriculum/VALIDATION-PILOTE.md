# Validation du pilote → gate template v1

Le template n'est figé en **v1** que si les DEUX critères passent.

## Critère A — Rétention (Sylvain)

1. Sylvain étudie les 2 modules témoins en session normale (coach pilote).
2. Retrieval immédiat en fin de session : ≥ 80 % des notions restituées.
3. Cold replay J+7 : ≥ 70 % sans aide.

→ Si en-dessous : identifier quelle section du template a failli, corriger.

## Critère B — Orchestration coach

Le coach a-t-il pu, sans friction :

- extraire les notions via `scripts/extract-notions.ps1` (frontmatter) ?
- dérouler le retrieval depuis les seeds Anki ?
- ancrer sur TribuZen via le champ `tribuzen:` ?
- détecter un piège via la section 4 ?
- proposer la suite via `next:` ?

→ Si un point bloque : ajuster le template/frontmatter.

## Gate

Les deux critères verts → template figé **v1** → lancer les plans de rollout par cours
(ordre parcours : 00 TS → 01 JS → 06 Test → 04 React → 09 Nest → 10 PG → …),
avec sous-agents parallèles + QA gate (Context7 + grille-plancher) avant chaque commit.
