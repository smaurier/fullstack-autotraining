# install-coach.ps1 — Setup du coach sur un nouveau poste
# Usage : powershell -ExecutionPolicy Bypass -File scripts/install-coach.ps1

$ErrorActionPreference = "Stop"

$claudeDir  = "$env:USERPROFILE\.claude"
$hooksDir   = "$claudeDir\hooks"
$settingsFile = "$claudeDir\settings.json"
$projectRoot = Split-Path -Parent $PSScriptRoot

Write-Host "=== Installation du coach ===" -ForegroundColor Cyan

# 1. Dossier hooks
if (-not (Test-Path $hooksDir)) {
    New-Item -ItemType Directory -Force $hooksDir | Out-Null
    Write-Host "[OK] Dossier .claude/hooks cree"
} else {
    Write-Host "[OK] Dossier .claude/hooks existe"
}

# 2. Copie coach.ps1
Copy-Item -Force "$projectRoot\scripts\coach.ps1" "$hooksDir\coach.ps1"
Write-Host "[OK] coach.ps1 installe dans $hooksDir"

# 3. Verifier que private/ existe (repo prive a cloner manuellement)
$privateDir = "$projectRoot\private"
if (-not (Test-Path $privateDir)) {
    Write-Host ""
    Write-Host "[ATTENTION] Le dossier private/ est absent." -ForegroundColor Yellow
    Write-Host "  Cloner le repo prive :" -ForegroundColor Yellow
    Write-Host "  git clone <url-repo-prive> private" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "[OK] Dossier private/ present"
}

# 4. Patch settings.json — ajouter les hooks si absents
if (Test-Path $settingsFile) {
    $settings = Get-Content $settingsFile -Raw | ConvertFrom-Json
} else {
    $settings = [PSCustomObject]@{}
}
if (-not $settings.PSObject.Properties["hooks"]) {
    $settings | Add-Member -NotePropertyName "hooks" -NotePropertyValue ([PSCustomObject]@{})
}

$coachCommand = "powershell -NoProfile -ExecutionPolicy Bypass -File `"$hooksDir\coach.ps1`""
$hookEntry = [PSCustomObject]@{
    hooks = @(
        [PSCustomObject]@{
            type          = "command"
            command       = $coachCommand
            timeout       = 10
            statusMessage = "Loading curriculum progress..."
        }
    )
}

if (-not $settings.hooks.PSObject.Properties["SessionStart"]) {
    $settings.hooks | Add-Member -NotePropertyName "SessionStart" -NotePropertyValue @($hookEntry)
    Write-Host "[OK] Hook SessionStart ajoute"
} else {
    Write-Host "[INFO] Hook SessionStart deja present - verifier manuellement si necessaire"
}

$settings | ConvertTo-Json -Depth 10 | Set-Content $settingsFile -Encoding UTF8
Write-Host "[OK] settings.json mis a jour"

Write-Host ""
Write-Host "=== Installation terminee ===" -ForegroundColor Green
Write-Host "Redemarrer Claude Code pour activer le coach."
