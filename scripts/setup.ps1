# setup.ps1 — Installation complete sur un nouveau poste
# Une seule commande depuis PowerShell :
# iwr -useb "https://raw.githubusercontent.com/smaurier/fullstack-autotraining/main/scripts/setup.ps1" | iex

$ErrorActionPreference = "Stop"
$projectsDir = "$env:USERPROFILE\Documents\projects"
$projectDir  = "$projectsDir\fullstack-autotraining"

Write-Host "=== Setup fullstack-autotraining ===" -ForegroundColor Cyan

# 1. Cloner le repo public si absent
if (-not (Test-Path $projectDir)) {
    Write-Host "Clonage du curriculum..."
    git clone https://github.com/smaurier/fullstack-autotraining.git $projectDir
} else {
    Write-Host "[OK] Curriculum deja present"
    Set-Location $projectDir
    git pull
}

# 2. Cloner le repo prive dans private/
$privateDir = "$projectDir\private"
if (-not (Test-Path $privateDir)) {
    Write-Host "Clonage des donnees privees..."
    git clone https://github.com/smaurier/fullstack-autotraining-private.git $privateDir
} else {
    Write-Host "[OK] private/ deja present — git pull..."
    Set-Location $privateDir
    git pull
    Set-Location $projectDir
}

# 3. Installer le coach
Write-Host "Installation du coach..."
powershell -NoProfile -ExecutionPolicy Bypass -File "$projectDir\scripts\install-coach.ps1"

Write-Host ""
Write-Host "=== Pret. Relancer Claude Code. ===" -ForegroundColor Green
