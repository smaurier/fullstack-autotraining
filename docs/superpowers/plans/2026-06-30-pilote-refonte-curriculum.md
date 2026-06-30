# Pilote refonte pédagogique — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construire et valider le standard pédagogique (template module/lab + grille d'audit + validateur automatique), puis réécrire 2 modules témoins (1 Testing, 1 PostgreSQL) pour figer un template v1 avant le rollout big-bang.

**Architecture:** Artefacts de standard dans `docs/curriculum/`. Validateur PowerShell dans `scripts/` (cohérent avec les hooks existants). Réécriture de 2 modules témoins dans leurs submodules respectifs (`06-testing`, `10-postgresql`). Validation = validateur automatique + build VitePress + double critère rétention/orchestration coach.

**Tech Stack:** Markdown + frontmatter YAML, PowerShell 5.1 (validateur), VitePress (build de vérif), Context7 (QA technique).

---

## Référence spec

`docs/superpowers/specs/2026-06-30-refonte-curriculum-pedagogique-design.md` — lire en entier avant d'exécuter.

## Structure des fichiers

- Create: `docs/curriculum/MODULE-TEMPLATE.md` — template canonique de module (7 sections + frontmatter).
- Create: `docs/curriculum/LAB-TEMPLATE.md` — template de lab (énoncé + corrigé, feedback coach).
- Create: `docs/curriculum/AUDIT-RUBRIC.md` — grille d'audit 8 critères (plancher).
- Create: `docs/curriculum/COVERAGE-13PRIO.md` — matrice liste 13-prio → cours → module.
- Create: `scripts/validate-module.ps1` — valide frontmatter + sections d'un module.
- Create: `scripts/extract-notions.ps1` — extrait le frontmatter `notions:` (preuve synergie coach).
- Modify: `06-testing/modules/04-mocking-et-test-doubles.md` — module témoin Testing réécrit.
- Modify: `06-testing/labs/lab-04-mocking/README.md` — lab témoin Testing réécrit (vérifier chemin réel).
- Modify: `10-postgresql/modules/04-transactions-et-acid.md` — module témoin PostgreSQL réécrit.
- Modify: `10-postgresql/labs/<lab-transactions>/README.md` — lab témoin PostgreSQL réécrit (vérifier chemin réel).
- Create: `docs/curriculum/VALIDATION-PILOTE.md` — protocole de validation (double critère) + gate template v1.

---

## Task 1 : Template module canonique

**Files:**
- Create: `docs/curriculum/MODULE-TEMPLATE.md`

- [ ] **Step 1 : Écrire le template**

Contenu exact du fichier :

````markdown
---
titre: <titre lisible>
cours: <NN-nom-cours>
notions: [<notion1>, <notion2>]
outcomes: [<sait faire X>, <sait faire Y>]
prerequis: [<notion-amont>]
next: <slug-module-suivant>
libs: [{ name: <pkg-npm>, version: <ref> }]
tribuzen: <couche TribuZen ancrée — doit matcher la table fil-rouge de progress.md>
last-reviewed: <YYYY-MM>
---

# <Titre du module>

> **Outcomes — tu sauras FAIRE :** <verbe d'action>, <verbe d'action>.
> **Difficulté :** :star::star::star:

## 1. Cas concret d'abord
<Un problème réel à résoudre AVANT la théorie. Generation effect. Donne le contexte TribuZen si possible.>

## 2. Théorie complète, concise
<Couverture TOTALE des notions du frontmatter. Chunks d'1 idée. Prose + code. Pas de diagramme décoratif. Dense, pas mince.>

## 3. Worked examples
<1-2 exemples 100% résolus, pas à pas.>

## 4. Pièges & misconceptions
<Discrimination des concepts proches. Chaque piège = nom + pourquoi c'est faux + le correct.>

## 5. Ancrage TribuZen
<Où, dans le vrai produit, on utilise ça. Doit matcher le mapping fil-rouge.>

## 6. Points clés
<Liste numérotée, 1 ligne par notion clé.>

## 7. Seeds Anki
```
<question 1>|<réponse 1>
<question 2>|<réponse 2>
```
(5-8 paires Q|R. Alimente SM-2 + anki-mcp.)

## Pont vers le lab
> Lab associé : <chemin>. Pratique guidée + corrigé complet.
````

- [ ] **Step 2 : Vérifier**

Run: `Test-Path "docs/curriculum/MODULE-TEMPLATE.md"`
Expected: `True`

- [ ] **Step 3 : Commit**

```bash
git add docs/curriculum/MODULE-TEMPLATE.md
git commit -m "docs(curriculum): template module canonique (pilote)"
```

---

## Task 2 : Template lab

**Files:**
- Create: `docs/curriculum/LAB-TEMPLATE.md`

- [ ] **Step 1 : Écrire le template**

Contenu exact :

````markdown
# Lab <NN> — <Titre>

> **Outcome :** à la fin, tu sais <faire X> avec <vrai outil>.
> **Vrai outil :** <Vitest / Prisma / etc. — JAMAIS un harnais simulé>.
> **Feedback :** le coach valide en session (pas de test-runner auto-correcteur).

## Énoncé
<Tâche claire. Starter minimal avec le vrai outil. Pas de gap-fill.>

## Étapes (en friction)
1. <étape — desirable difficulty, l'apprenant produit>
2. <étape>

## Corrigé complet commenté
```<lang>
<solution intégrale, commentée ligne à ligne sur les points clés>
```

## Variante J+30 (fading)
<Même problème + 1 contrainte ajoutée (ex: en 20 min, ou sans réutiliser X).>

## Application TribuZen
<Comment porter ça dans le vrai produit, vrai outil, commit smaurier/tribuzen.>
````

- [ ] **Step 2 : Vérifier**

Run: `Test-Path "docs/curriculum/LAB-TEMPLATE.md"`
Expected: `True`

- [ ] **Step 3 : Commit**

```bash
git add docs/curriculum/LAB-TEMPLATE.md
git commit -m "docs(curriculum): template lab canonique (pilote)"
```

---

## Task 3 : Grille d'audit

**Files:**
- Create: `docs/curriculum/AUDIT-RUBRIC.md`

- [ ] **Step 1 : Écrire la grille**

Contenu exact :

````markdown
# Grille d'audit (plancher minimal)

Scorer chaque module/lab 0-3 par critère. **Plancher = tous ≥ 2.**

| # | Critère | 0 | 2 (plancher) | 3 |
|---|---------|---|--------------|---|
| 1 | Couverture notions | notions manquantes | toutes présentes | + interconnexions |
| 2 | Concret avant abstrait | théorie d'abord | un cas concret ouvre | cas TribuZen réel |
| 3 | Worked examples | absents | 1 résolu complet | 2 + fading |
| 4 | Lab vrai outil + corrigé | simulé / gap-fill | vrai outil + corrigé | + variante J+30 |
| 5 | Pièges / misconceptions | absents | 2-3 nommés | + discrimination fine |
| 6 | Ancrage TribuZen | absent | présent | matché au fil-rouge |
| 7 | Actualité technique | versions périmées | versions à jour | + nouveautés signalées |
| 8 | Seeds Anki | absentes | 5-8 Q\|R | couvrent toutes notions |

**Sortie d'audit par cours :** un tableau module × critère, + la liste des modules sous plancher (à réécrire lourd) vs au-dessus (retouche légère).
````

- [ ] **Step 2 : Commit**

```bash
git add docs/curriculum/AUDIT-RUBRIC.md
git commit -m "docs(curriculum): grille d'audit plancher (pilote)"
```

---

## Task 4 : Validateur de module (le "test" automatique)

**Files:**
- Create: `scripts/validate-module.ps1`

- [ ] **Step 1 : Écrire le validateur**

Contenu exact :

```powershell
# validate-module.ps1 — Valide qu'un module respecte le template.
# Usage: powershell -File scripts/validate-module.ps1 -Path <module.md>
# Sortie: liste des manques. Exit 0 si conforme, 1 sinon.
param([Parameter(Mandatory)][string]$Path)

$ErrorActionPreference = "Stop"
if (-not (Test-Path $Path)) { Write-Output "ERREUR: fichier introuvable: $Path"; exit 1 }

$raw = Get-Content $Path -Raw -Encoding UTF8
$errors = @()

# 1. Frontmatter présent
if ($raw -notmatch '(?s)^---\s*\n(.*?)\n---') {
    $errors += "frontmatter YAML manquant (--- ... ---)"
    $fm = ""
} else {
    $fm = $Matches[1]
}

# 2. Clés frontmatter obligatoires
$requiredKeys = @('titre','cours','notions','outcomes','prerequis','next','libs','tribuzen','last-reviewed')
foreach ($k in $requiredKeys) {
    if ($fm -notmatch "(?m)^\s*$([regex]::Escape($k))\s*:") { $errors += "clé frontmatter manquante: $k" }
}

# 3. Sections obligatoires (titres ##)
$requiredSections = @(
    '## 1. Cas concret',
    '## 2. Th',          # Théorie
    '## 3. Worked example',
    '## 4. Pi',          # Pièges
    '## 5. Ancrage TribuZen',
    '## 6. Points cl',
    '## 7. Seeds Anki'
)
foreach ($s in $requiredSections) {
    if ($raw -notmatch [regex]::Escape($s)) { $errors += "section manquante: $s..." }
}

# 4. Seeds Anki: au moins 5 paires Q|R dans un bloc code
if ($raw -match '(?s)## 7\. Seeds Anki.*?```(.*?)```') {
    $pairs = ([regex]::Matches($Matches[1], '(?m)^[^\|\r\n]+\|[^\r\n]+$')).Count
    if ($pairs -lt 5) { $errors += "Seeds Anki: $pairs paire(s) Q|R, minimum 5" }
} else {
    $errors += "Seeds Anki: bloc code de paires Q|R introuvable"
}

if ($errors.Count -eq 0) {
    Write-Output "OK: $Path conforme au template"
    exit 0
} else {
    Write-Output "NON CONFORME: $Path"
    $errors | ForEach-Object { Write-Output "  - $_" }
    exit 1
}
```

- [ ] **Step 2 : Vérifier qu'il échoue sur un non-conforme**

Run: `powershell -File scripts/validate-module.ps1 -Path docs/superpowers/specs/2026-06-30-refonte-curriculum-pedagogique-design.md`
Expected: `NON CONFORME` + liste de manques, exit 1.

- [ ] **Step 3 : Vérifier qu'il passe sur le template lui-même** (le template a frontmatter + 7 sections + seeds)

Run: `powershell -File scripts/validate-module.ps1 -Path docs/curriculum/MODULE-TEMPLATE.md`
Expected: les sections sont présentes ; s'il manque des clés frontmatter (placeholders `<...>`), corriger le test ou accepter — le template a les clés, donc attendu proche de `OK`. Si échec sur seeds (placeholders), c'est normal pour le template ; documenter dans le fichier que le template n'est pas un module réel.

- [ ] **Step 4 : Commit**

```bash
git add scripts/validate-module.ps1
git commit -m "feat(scripts): validateur de conformité module au template"
```

---

## Task 5 : Audit des 2 modules témoins

**Files:**
- Modify (lecture seule pour l'instant): `06-testing/modules/04-mocking-et-test-doubles.md`, `10-postgresql/modules/04-transactions-et-acid.md`
- Create: `docs/curriculum/audit-pilote.md`

- [ ] **Step 1 : Confirmer les chemins réels**

Run: `Test-Path 06-testing/modules/04-mocking-et-test-doubles.md ; Test-Path 10-postgresql/modules/04-transactions-et-acid.md`
Expected: `True` / `True`. Sinon, lister `06-testing/modules/` et `10-postgresql/modules/` et choisir un module cœur équivalent.

- [ ] **Step 2 : Auditer contre la grille (Task 3) + précision technique via Context7**

Pour chaque module : lire, scorer les 8 critères, vérifier les versions/API via Context7 (`resolve-library-id` puis `query-docs` pour Vitest / PostgreSQL+Prisma). Écrire le résultat dans `docs/curriculum/audit-pilote.md` (tableau module × critère + verdict réécriture lourde/légère + chemin du lab associé).

- [ ] **Step 3 : Commit**

```bash
git add docs/curriculum/audit-pilote.md
git commit -m "docs(curriculum): audit des 2 modules témoins (pilote)"
```

---

## Task 6 : Réécrire le module témoin Testing

**Files:**
- Modify: `06-testing/modules/04-mocking-et-test-doubles.md`

- [ ] **Step 1 : Réécrire au template** en suivant `docs/curriculum/MODULE-TEMPLATE.md`. Couverture totale des notions (mocks, stubs, spies, fakes, dependency injection pour testabilité), worked examples avec **Vitest réel**, pièges (sur-mock, mock de ce qu'on ne possède pas), ancrage TribuZen (mock d'un service d'invitation/notif), seeds Anki. Frontmatter complet (`tribuzen:` = couche testing TribuZen, `libs:` = vitest).

- [ ] **Step 2 : Valider la conformité**

Run: `powershell -File scripts/validate-module.ps1 -Path 06-testing/modules/04-mocking-et-test-doubles.md`
Expected: `OK ... conforme`.

- [ ] **Step 3 : Build VitePress du cours**

Run: `cd 06-testing ; npm run docs:build`
Expected: build réussi, zéro lien mort. (Si `docs:build` absent, utiliser le script de build présent dans `06-testing/package.json`.)

- [ ] **Step 4 : Commit (dans le submodule)**

```bash
cd 06-testing && git add modules/04-mocking-et-test-doubles.md && git commit -m "refactor(module): mocking réécrit au template pédagogique v1"
```

---

## Task 7 : Réécrire le lab témoin Testing

**Files:**
- Modify: `06-testing/labs/lab-04-mocking/README.md` (chemin à confirmer en Step 1)

- [ ] **Step 1 : Confirmer le chemin du lab**

Run: `Get-ChildItem 06-testing/labs -Directory | Select-Object Name`
Expected: repérer le lab de mocking. Sinon choisir le lab correspondant au module.

- [ ] **Step 2 : Réécrire au template** `docs/curriculum/LAB-TEMPLATE.md` : énoncé avec **Vitest réel** (pas de runner simulé), étapes en friction, **corrigé complet commenté**, variante J+30, application TribuZen.

- [ ] **Step 3 : Build de vérif**

Run: `cd 06-testing ; npm run docs:build`
Expected: build réussi.

- [ ] **Step 4 : Commit**

```bash
cd 06-testing && git add labs/ && git commit -m "refactor(lab): mocking réécrit (Vitest réel + corrigé complet)"
```

---

## Task 8 : Réécrire le module témoin PostgreSQL

**Files:**
- Modify: `10-postgresql/modules/04-transactions-et-acid.md`

- [ ] **Step 1 : Réécrire au template**. Notions : ACID, BEGIN/COMMIT/ROLLBACK, niveaux d'isolation (lien module 08), anomalies (dirty/non-repeatable/phantom). Worked examples avec **Prisma + PostgreSQL réels** (`$transaction`). Pièges (transaction trop longue, isolation par défaut mal comprise). Ancrage TribuZen (transaction d'invitation famille atomique). Seeds Anki. Frontmatter complet.

- [ ] **Step 2 : Valider**

Run: `powershell -File scripts/validate-module.ps1 -Path 10-postgresql/modules/04-transactions-et-acid.md`
Expected: `OK ... conforme`.

- [ ] **Step 3 : Build VitePress**

Run: `cd 10-postgresql ; npm run docs:build`
Expected: build réussi.

- [ ] **Step 4 : Commit**

```bash
cd 10-postgresql && git add modules/04-transactions-et-acid.md && git commit -m "refactor(module): transactions/ACID réécrit au template v1"
```

---

## Task 9 : Réécrire le lab témoin PostgreSQL

**Files:**
- Modify: `10-postgresql/labs/<lab-transactions>/README.md` (chemin confirmé en Step 1)

- [ ] **Step 1 : Confirmer le chemin**

Run: `Get-ChildItem 10-postgresql/labs -Directory | Select-Object Name`
Expected: repérer le lab transactions.

- [ ] **Step 2 : Réécrire au template** avec **Prisma/PostgreSQL réels**, corrigé complet, variante J+30, application TribuZen.

- [ ] **Step 3 : Build**

Run: `cd 10-postgresql ; npm run docs:build`
Expected: build réussi.

- [ ] **Step 4 : Commit**

```bash
cd 10-postgresql && git add labs/ && git commit -m "refactor(lab): transactions réécrit (Prisma réel + corrigé complet)"
```

---

## Task 10 : Matrice de couverture 13-prio (cours pilotes)

**Files:**
- Create: `docs/curriculum/COVERAGE-13PRIO.md`

- [ ] **Step 1 : Écrire la matrice** pour les items de la liste 13-prio couverts par Testing (prio 10) et PostgreSQL (prio 7) : colonne item → cours → module → statut (couvert/partiel/manquant). Marquer 100% pour ces deux cours ou lister les gaps à combler.

- [ ] **Step 2 : Commit**

```bash
git add docs/curriculum/COVERAGE-13PRIO.md
git commit -m "docs(curriculum): matrice couverture 13-prio (cours pilotes)"
```

---

## Task 11 : Preuve de synergie coach (extraction frontmatter)

**Files:**
- Create: `scripts/extract-notions.ps1`

- [ ] **Step 1 : Écrire le script** qui lit le frontmatter `notions:` d'un module et l'affiche (ce que le coach consommera à la place de l'extraction manuelle, Règle 0).

```powershell
# extract-notions.ps1 — Extrait les notions du frontmatter d'un module.
# Usage: powershell -File scripts/extract-notions.ps1 -Path <module.md>
param([Parameter(Mandatory)][string]$Path)
$raw = Get-Content $Path -Raw -Encoding UTF8
if ($raw -match '(?s)^---\s*\n(.*?)\n---' -and $Matches[1] -match '(?m)^\s*notions\s*:\s*\[(.*?)\]') {
    ($Matches[1] -split ',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }
} else {
    Write-Output "Aucune notion trouvée (frontmatter notions: manquant)"
    exit 1
}
```

- [ ] **Step 2 : Tester sur le module Testing réécrit**

Run: `powershell -File scripts/extract-notions.ps1 -Path 06-testing/modules/04-mocking-et-test-doubles.md`
Expected: liste des notions (mocks, stubs, spies, …).

- [ ] **Step 3 : Commit**

```bash
git add scripts/extract-notions.ps1
git commit -m "feat(scripts): extraction notions frontmatter (synergie coach)"
```

---

## Task 12 : Protocole de validation du pilote

**Files:**
- Create: `docs/curriculum/VALIDATION-PILOTE.md`

- [ ] **Step 1 : Écrire le protocole** (double critère, gate template v1) :

````markdown
# Validation du pilote → gate template v1

Le template n'est figé en **v1** que si les DEUX critères passent :

## Critère A — Rétention (Sylvain)
1. Sylvain étudie les 2 modules témoins en session normale (coach pilote).
2. Retrieval immédiat en fin de session : ≥ 80% des notions restituées.
3. Cold replay J+7 : ≥ 70% sans aide.
→ Si en-dessous : identifier quelle section du template a failli, corriger.

## Critère B — Orchestration coach
Le coach a-t-il pu, sans friction :
- extraire les notions via `extract-notions.ps1` (frontmatter) ?
- dérouler retrieval depuis les seeds Anki ?
- ancrer sur TribuZen via le champ `tribuzen:` ?
- détecter un piège via la section 4 ?
- proposer la suite via `next:` ?
→ Si un point bloque : ajuster le template/frontmatter.

## Gate
Les deux critères verts → template figé **v1** → lancer les plans de rollout par cours
(ordre parcours : 00 TS → 01 JS → 06 Test → 04 React → 09 Nest → 10 PG → …),
avec sous-agents parallèles + QA gate (Context7 + grille-plancher) avant chaque commit.
````

- [ ] **Step 2 : Commit**

```bash
git add docs/curriculum/VALIDATION-PILOTE.md
git commit -m "docs(curriculum): protocole de validation du pilote (gate v1)"
```

---

## Notes d'exécution

- **Submodules** : Tasks 6-9 committent DANS les submodules `06-testing` / `10-postgresql` (sur main), puis penser à mettre à jour le pointeur du repo parent (`git add 06-testing 10-postgresql && git commit` à la racine).
- **QA technique** : avant chaque commit de module réécrit, vérifier la précision via Context7 (Vitest, PostgreSQL/Prisma). Pas de contenu non vérifié.
- **Pas de branche** : commits sur main, rollback git si besoin.
- **Coach alignment complet** (refactor `progress.md`) = hors pilote ; il est amorcé par la preuve Task 11 et sera planifié dans le rollout.
