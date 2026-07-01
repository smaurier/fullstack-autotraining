# gate-course.ps1 — Gate DÉTERMINISTE d'un cours réécrit (pipeline rollout).
# Étape "gate dur" de la boucle : bloque tout état cassé avant QA/commit.
#   1. valide chaque module/*.md au template (validate-module.ps1)
#   2. build VitePress (détecte YAML cassé, liens/mustaches SSR)
# Usage : pwsh -File scripts/gate-course.ps1 -Course 02-vue [-SkipBuild]
# Exit 0 si tout passe, 1 sinon. Sortie = rapport compact machine-lisible.
param(
    [Parameter(Mandatory)][string]$Course,
    [switch]$SkipBuild
)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$root      = Split-Path $PSScriptRoot -Parent
$courseDir = Join-Path $root $Course
$modDir    = Join-Path $courseDir "modules"
$validator = Join-Path $PSScriptRoot "validate-module.ps1"

if (-not (Test-Path $modDir)) { Write-Output "GATE FAIL: dossier introuvable: $modDir"; exit 1 }

$modules = Get-ChildItem -Path $modDir -Filter "*.md" | Sort-Object Name
if ($modules.Count -eq 0) { Write-Output "GATE FAIL: aucun module dans $modDir"; exit 1 }

# --- 1. Validation template (chaque module) ---
$failed = @()
foreach ($m in $modules) {
    $out = & pwsh -NoProfile -File $validator -Path $m.FullName 2>&1 | Out-String
    if ($out -notmatch "^OK:") { $failed += [PSCustomObject]@{ file = $m.Name; detail = ($out.Trim() -split "`n" | Select-Object -First 4) -join " | " } }
}

Write-Output "== GATE $Course =="
Write-Output "modules: $($modules.Count) | validate KO: $($failed.Count)"
foreach ($f in $failed) { Write-Output "  KO $($f.file): $($f.detail)" }

if ($failed.Count -gt 0) { Write-Output "GATE FAIL (validation template)"; exit 1 }

# --- 2. Build VitePress ---
if ($SkipBuild) { Write-Output "build: SKIP"; Write-Output "GATE PASS (validation only)"; exit 0 }

Push-Location $courseDir
try {
    $build = & pnpm docs:build 2>&1 | Out-String
} finally {
    Pop-Location
}

if ($build -match "build complete") {
    Write-Output "build: OK"
    Write-Output "GATE PASS"
    exit 0
} else {
    Write-Output "build: FAIL"
    ($build -split "`n" | Select-Object -Last 12) | ForEach-Object { Write-Output "  $_" }
    Write-Output "GATE FAIL (build)"
    exit 1
}
