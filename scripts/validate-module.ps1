# validate-module.ps1 — Valide qu'un module respecte le template.
# Usage: powershell -File scripts/validate-module.ps1 -Path <module.md>
# Sortie: liste des manques. Exit 0 si conforme, 1 sinon.
param([Parameter(Mandatory)][string]$Path)

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
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
