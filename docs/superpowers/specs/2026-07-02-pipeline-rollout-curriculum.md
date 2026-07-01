# Pipeline de rollout curriculum — spec

> Objectif : automatiser la réécriture des cours restants en boucle **write → gate → QA → fix → checkpoint → commit**, avec garde-fous. Prototypé manuellement de bout en bout sur `02-vue` (48 modules + 48 labs, QA'd, corrigé, pushé).

## Principe

Chaque cours traverse la même boucle. Deux natures de gate :
- **Gates DÉTERMINISTES** (fiables, bloquants) : `validate-module.ps1` + build VitePress via `scripts/gate-course.ps1`. Aucun état cassé ne passe.
- **Gates PROBABILISTES** (IA, à cap + escalade) : QA review par agents. On ne leur fait pas confiance aveuglément — on **vérifie programmatiquement leurs claims** (un reviewer a halluciné « labs manquants »).

## Boucle par cours

```
0. PRÉ    choisir le cours (ordre parcours) ; lister cours/… source ; définir la
          colonne vertébrale novice→expert (numérotation plate modules/NN-*).
1. WRITE  dispatch agents // (1 module+lab chacun), audit-first du cours/… existant,
          exemplar = 02-vue/modules/00 + labs/lab-02, frontmatter fourni.
          ⚠️ Context7 OBLIGATOIRE dans chaque prompt d'agent (pas optionnel — la
          majorité des erreurs QA venaient d'APIs devinées).
          ⚠️ audit-first inclut la SUPPRESSION des fichiers legacy simulés du cours
          (exercise.ts/solution.ts/test-utils harnais) — labs = README-only. Le gate
          anti-simulé le vérifie de toute façon, mais le stripper au write évite un cycle.
2. GATE   pwsh scripts/gate-course.ps1 -Course <NN>  → doit être GATE PASS.
          Si FAIL : lire le rapport, corriger (souvent YAML ': ' ou fence mustache),
          re-gate. Déterministe, boucle courte.
3. QA     dispatch agents reviewer READ-ONLY par bloc : score grille 8 critères
          (plancher ≥2), diff exhaustivité vs source, dry-run coach, liaison
          inter-modules. Sortie = scorecard + file de corrections priorisée.
          → VÉRIFIER programmatiquement les claims douteux (ex : présence labs)
            avant d'agir dessus.
4. FIX    dispatch agents fixer par bloc, appliquent la file QA. Context7 pour tout
          fix technique/factuel.
5. REGATE gate-course.ps1 à nouveau → GATE PASS.
6. CHECK  ★ CHECKPOINT HUMAIN ★ sur le factuel sensible (RGAA / sécurité / versions
          de libs). PAS d'auto-merge de ces fixes. Le reste (structure, liaison) peut
          passer en auto.
7. SHIP   commit submodule + maj pointeur parent + (bascule nav modules/+labs/ si
          premier passage du cours) + push. Rapport QA archivé docs/curriculum/QA-<cours>.md.
   → boucler 3-5 jusqu'à QA propre OU cap N=2-3 itérations, puis escalade humaine.
```

## Garde-fous (durs) — encodés dans `gate-course.ps1` (pas de vigilance)

Le gate ENFORCE les règles établies (leçon 02/07 : une règle connue mais non-gatée slippe — le harnais simulé est passé malgré la règle "zéro test simulé"). Checks durs (GATE FAIL) :
- **validate-module** : frontmatter + 7 sections + seeds≥5 + lint YAML (pas de `: ` nu).
- **anti-simulé** : aucun `createTestRunner`/assert maison/`runTests([`. Labs = README-only, corrigé vrai-outil, feedback=coach.
- **delimiters** : config VitePress neutralise `{{ }}` (sinon SSR casse sur moustaches/GitHub Actions).
- **J+30** : chaque lab README a sa variante J+30.
- **intégrité prereq/next** : tout slug de module référencé existe (pas de slug fantôme type `assertions`).
- **cross-framework** : pas de React dans un cours non-React (cohérence de stack ; ne scanne que `modules/`+`labs/`, pas l'archive `cours/`).
- **build VitePress**.
Advisory (warn) : libs déclarées semblent référencées.
→ **Ajouter tout nouveau garde-fou vérifiable ici** plutôt que de compter sur la vigilance. Le jugement (concret-avant-abstrait, factuel/RGAA, qualité péda) reste QA-agents + checkpoint humain.

1. **Gate déterministe bloquant** : rien ne se commit sans `GATE PASS`.
2. **Context7 obligatoire** au write ET au fix (pas « auto-déclaré »).
3. **Vérif programmatique des claims agents** : ne jamais agir sur un finding d'agent sans le confirmer par une commande (le QA gate a produit une fausse alarme « labs manquants »).
4. **Checkpoint humain** sur RGAA/sécurité/versions — factuel à enjeu, jamais auto-mergé.
5. **Cap d'itérations** QA↔fix (2-3) puis escalade, pas de boucle infinie.
6. **Un cours à la fois** ; ne pas initier un nouveau cours sans go explicite (RGAA reste prioritaire jusqu'au 20 oct).

## Reprise après limite de tokens

- Piloté par `/loop` (invoqué par Sylvain — jamais auto-déclenché).
- Mode auto-rythmé (`/loop` sans intervalle) : après un bloc, `ScheduleWakeup` vise le **bon moment**. Si une limite dure coupe → viser **après l'heure de reset** (une reprise propre, pas du polling 15 min qui tourne dans le vide pendant que le quota est cramé).
- Fallback long (1200-1800s) pour survivre à une coupure et maximiser la reprise.

## Outillage

- `scripts/validate-module.ps1` — conformité template + lint YAML (deux-points non échappé).
- `scripts/extract-notions.ps1` — synergie coach (extraction frontmatter notions).
- `scripts/gate-course.ps1` — **gate déterministe** (validate tous modules + build). ← nouveau.
- `docs/curriculum/MODULE-TEMPLATE.md`, `LAB-TEMPLATE.md`, `AUDIT-RUBRIC.md`, `VALIDATION-PILOTE.md`.
- Config VitePress par cours : penser `vue.template.compilerOptions.delimiters` (neutralise `{{ }}` en prose) + `srcExclude` de l'ancien `cours/` une fois la nav basculée.

## Leçons 02-vue (à réinjecter)

- Frontmatter : jamais de `: ` non échappé dans une valeur (casse le build) — le lint YAML l'attrape.
- VitePress évalue `{{ }}` en prose même en inline-code → délimiteurs neutralisés en config.
- Worked examples : rester dans le périmètre du module (pas de Router/emits avant leur module).
- Exhaustivité : diff systématique vs source (des notions entières ont disparu — provide/inject était sans domicile).
- Nommage par compétence, pas par client [[feedback_nommage_competences]].
- Ordre novice→expert strict [[feedback_ordre_pedagogique]].
```
