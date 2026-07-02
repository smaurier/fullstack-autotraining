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

# 2b. Lint YAML — un deux-points+espace non échappé dans une valeur scalaire casse le build VitePress.
#     (bug réel rencontré : `tribuzen: FamilyCard (props: family typée)` -> YAML invalide.)
foreach ($line in ($fm -split "`n")) {
    $l = $line.TrimEnd("`r")
    # valeur d'une clé scalaire : `clé: valeur`
    if ($l -match '^\s*[\w-]+:\s+(.+)$') {
        $val = $Matches[1].Trim()
        # on ignore les collections flow ([...] / {...}) et les valeurs déjà entre guillemets
        if ($val -notmatch '^[\[{"'']' -and $val -match ':\s') {
            $errors += "YAML: deux-points non échappé dans une valeur -> $l  (mets la valeur entre guillemets ou retire le ' : ')"
        }
    }
    # item de liste : `- valeur` (outcomes) contenant un ' : ' non quoté
    elseif ($l -match '^\s*-\s+(.+)$') {
        $val = $Matches[1].Trim()
        if ($val -notmatch '^["'']' -and $val -match ':\s') {
            $errors += "YAML: deux-points non échappé dans un item de liste -> $l  (mets l'item entre guillemets)"
        }
    }
    # collection flow `clé: [a, b, ...]` : un item ne peut PAS commencer par un indicateur
    #     YAML réservé non quoté (@, `). (bug réel : `notions: [..., @nestjs/jwt, ...]`.)
    if ($l -match '^\s*[\w-]+:\s*\[(.+)\]\s*$') {
        foreach ($item in ($Matches[1] -split ',')) {
            $it = $item.Trim()
            if ($it -match '^[@`]') {
                $errors += "YAML: item de flow commençant par un indicateur réservé (@ ou backtick) -> '$it'  (reformule ou mets entre guillemets)"
            }
        }
    }
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
