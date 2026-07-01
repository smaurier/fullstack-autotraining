# gate-course.ps1 — Gate DÉTERMINISTE d'un cours réécrit (pipeline rollout).
# Encode les règles établies (mémoire + LAB/MODULE-TEMPLATE + spec refonte) pour qu'elles
# soient ENFORCÉES, pas dépendantes de la vigilance. Un cours ne passe que si TOUT est vert.
#
# Checks DURS (GATE FAIL) :
#   1. validate-module.ps1 sur chaque module (frontmatter + 7 sections + seeds + YAML lint)
#   2. anti-simulé : aucun harnais de test maison (règle "feedback=coach, zéro test simulé")
#   3. delimiters : config VitePress neutralise `{{ }}` (sinon moustaches/${{ }} cassent le SSR)
#   4. J+30 : chaque lab README a sa variante J+30 (LAB-TEMPLATE)
#   5. intégrité référentielle : chaque prereq/next pointant un module existe (pas de slug fantôme)
#   6. cross-framework : pas de React dans un cours non-React (cohérence de stack)
#   7. build VitePress
# Check ADVISORY (warn, non-bloquant) :
#   * libs déclarées : chaque lib du frontmatter semble référencée (matching heuristique)
#
# Usage : pwsh -File scripts/gate-course.ps1 -Course 02-vue [-SkipBuild]
# Exit 0 si tout passe, 1 sinon.
param(
    [Parameter(Mandatory)][string]$Course,
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root      = Split-Path $PSScriptRoot -Parent
$courseDir = Join-Path $root $Course
$modDir    = Join-Path $courseDir "modules"
$labDir    = Join-Path $courseDir "labs"
$validator = Join-Path $PSScriptRoot "validate-module.ps1"

if (-not (Test-Path $modDir)) { Write-Output "GATE FAIL: dossier introuvable: $modDir"; exit 1 }
$modules = Get-ChildItem -Path $modDir -Filter "*.md" | Sort-Object Name
if ($modules.Count -eq 0) { Write-Output "GATE FAIL: aucun module dans $modDir"; exit 1 }

Write-Output "== GATE $Course =="
$issues = @()
$warns  = @()

# --- 1. Validation template (bloquant immédiat : sans ça rien d'autre n'a de sens) ---
$vfailed = @()
foreach ($m in $modules) {
    $out = & pwsh -NoProfile -File $validator -Path $m.FullName 2>&1 | Out-String
    if ($out -notmatch "^OK:") { $vfailed += "$($m.Name): " + (($out.Trim() -split "`n" | Select-Object -First 3) -join " | ") }
}
Write-Output "modules: $($modules.Count) | validate KO: $($vfailed.Count)"
if ($vfailed.Count -gt 0) {
    $vfailed | ForEach-Object { Write-Output "  KO $_" }
    Write-Output "GATE FAIL (validation template)"; exit 1
}

# Contenu de tous les modules + labs (pour les scans texte)
$mdFiles = @()
$mdFiles += $modules
if (Test-Path $labDir) { $mdFiles += Get-ChildItem -Path $labDir -Recurse -Filter "*.md" -ErrorAction SilentlyContinue }
# Scan uniquement le contenu LIVE (modules/ + labs/). PAS `cours/` : c'est l'archive
# pré-refonte (exclue du build), ses vieux fichiers ne doivent pas faire échouer le gate.
$codeFiles = @()
foreach ($d in @($modDir,$labDir) | Where-Object { Test-Path $_ }) {
    $codeFiles += Get-ChildItem -Path $d -Recurse -File -Include *.ts,*.js,*.md,*.vue -ErrorAction SilentlyContinue
}

# --- 2. Anti-simulé (règle feedback=coach / zéro test simulé) ---
# Signatures du harnais maison. On NE bloque PAS les imports test-utils relatifs :
# un helper légitime (ex `i18n-test-utils` qui wrappe le vrai `mount`) est autorisé.
$simPatterns = @('createTestRunner', 'assertEqual\s*\(', 'assertThrows\s*\(', 'runTests\s*\(\s*\[')
foreach ($f in $codeFiles) {
    $c = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
    foreach ($p in $simPatterns) { if ($c -match $p) { $issues += "harnais simulé: $($f.FullName.Substring($courseDir.Length+1)) (~$p)"; break } }
}

# --- 3. Delimiters VitePress ---
$cfg = Get-ChildItem (Join-Path $courseDir ".vitepress") -Filter "config.*" -File -ErrorAction SilentlyContinue | Select-Object -First 1
if (-not $cfg) { $issues += "config VitePress introuvable (.vitepress/config.*)" }
elseif ((Get-Content $cfg.FullName -Raw) -notmatch 'delimiters') { $issues += 'config VitePress sans delimiters — moustaches en prose / expressions GitHub Actions casseront le build SSR' }

# --- 4. Variante J+30 dans chaque lab ---
if (Test-Path $labDir) {
    foreach ($l in (Get-ChildItem -Path $labDir -Directory)) {
        $rd = Join-Path $l.FullName "README.md"
        if (Test-Path $rd) { if ((Get-Content $rd -Raw) -notmatch 'J\+30') { $issues += "lab sans variante J+30: $($l.Name)" } }
    }
}

# --- 5. Intégrité référentielle prereq/next (slug module = fichier existant) ---
$slugs = @($modules | ForEach-Object { $_.BaseName })
$moduleLike = '^\d+[a-z]?-'   # ex 04-mocking, 12b-tests-accessibilite
foreach ($m in $modules) {
    $raw = Get-Content $m.FullName -Raw
    if ($raw -match '(?s)^---\s*\n(.*?)\n---') {
        $fm = $Matches[1]
        if ($fm -match '(?m)^\s*next\s*:\s*(.+)$') {
            $nx = $Matches[1].Trim().Trim('"').Trim("'")
            if ($nx -match $moduleLike -and $slugs -notcontains $nx) { $issues += "$($m.BaseName): next -> '$nx' n'existe pas" }
        }
        if ($fm -match '(?m)^\s*prerequis\s*:\s*\[(.*?)\]') {
            foreach ($p in ($Matches[1] -split ',')) {
                $p = $p.Trim().Trim('"').Trim("'")
                if ($p -match $moduleLike -and $slugs -notcontains $p) { $issues += "$($m.BaseName): prereq -> '$p' n'existe pas" }
            }
        }
    }
}

# --- 6. Cross-framework (pas de React dans un cours non-React) ---
$pkg = Join-Path $courseDir "package.json"
$isReactCourse = ($Course -match 'react') -or ((Test-Path $pkg) -and ((Get-Content $pkg -Raw) -match '"react"\s*:'))
if (-not $isReactCourse) {
    $reactPat = @('@testing-library/react', 'react-dom', "from\s+['""]react['""]", '\.tsx\b', 'ReactDOM')
    foreach ($f in $codeFiles) {
        $c = Get-Content $f.FullName -Raw -ErrorAction SilentlyContinue
        foreach ($p in $reactPat) { if ($c -match $p) { $issues += "React dans un cours non-React: $($f.FullName.Substring($courseDir.Length+1)) (~$p)"; break } }
    }
}

# --- * ADVISORY : libs déclarées semblent utilisées (heuristique, non-bloquant) ---
foreach ($m in $modules) {
    $raw = Get-Content $m.FullName -Raw
    if ($raw -match '(?s)^---\s*\n(.*?)\n---') {
        $fm = $Matches[1]
        $lab = Get-ChildItem -Path $labDir -Recurse -Filter "*.md" -ErrorAction SilentlyContinue | Where-Object { $_.Name -match ($m.BaseName -replace '^\d+[a-z]?-','') } | Select-Object -First 1
        $hay = $raw; if ($lab) { $hay += (Get-Content $lab.FullName -Raw) }
        foreach ($nm in [regex]::Matches($fm, 'name\s*:\s*"?([^",}\s]+)"?')) {
            $lib = $nm.Groups[1].Value
            $tokens = @($lib)
            if ($lib -match '^@([^/]+)/(.+)$') { $tokens += $Matches[1]; $tokens += $Matches[2] }
            $found = $false
            foreach ($t in $tokens) { if ($t.Length -ge 2 -and $hay -match [regex]::Escape($t)) { $found = $true; break } }
            if (-not $found) { $warns += "$($m.BaseName): lib '$lib' déclarée mais non référencée (advisory)" }
        }
    }
}

# --- Rapport des checks non-build ---
$checkNames = 'anti-simulé, delimiters, J+30, intégrité prereq/next, cross-framework'
if ($issues.Count -eq 0) { Write-Output "checks durs ($checkNames): OK" }
else { $issues | ForEach-Object { Write-Output "  FAIL $_" } }
if ($warns.Count -gt 0) { $warns | Select-Object -First 15 | ForEach-Object { Write-Output "  warn $_" } }

if ($issues.Count -gt 0) { Write-Output "GATE FAIL (règles durcies)"; exit 1 }

# --- 7. Build VitePress ---
if ($SkipBuild) { Write-Output "build: SKIP"; Write-Output "GATE PASS (sans build)"; exit 0 }
Push-Location $courseDir
try {
    $pm = if (Test-Path (Join-Path $courseDir "pnpm-lock.yaml")) { "pnpm" } else { "npm" }
    $build = & $pm run docs:build 2>&1 | Out-String
} finally { Pop-Location }

if ($build -match "build complete") { Write-Output "build: OK"; Write-Output "GATE PASS"; exit 0 }
else {
    Write-Output "build: FAIL"
    ($build -split "`n" | Select-Object -Last 12) | ForEach-Object { Write-Output "  $_" }
    Write-Output "GATE FAIL (build)"; exit 1
}
