$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$mainRepoDir = "$env:USERPROFILE\Documents\projects\fullstack-autotraining"
$privateDir  = "$mainRepoDir\private"
$dateTag     = Get-Date -Format "yyyy-MM-dd HH:mm"

function Invoke-AutoCommitPush {
    param([string]$Dir)
    if (-not (Test-Path "$Dir\.git")) { return }
    Push-Location $Dir
    $hasChanges = git status --porcelain 2>$null
    if ($hasChanges) {
        git add -u 2>$null | Out-Null
        git commit -m "chore: session auto-save $dateTag" 2>$null | Out-Null
        git push --recurse-submodules=on-demand 2>$null | Out-Null
    }
    Pop-Location
}

Invoke-AutoCommitPush $mainRepoDir
Invoke-AutoCommitPush $privateDir
