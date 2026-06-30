# extract-notions.ps1 — Extrait les notions du frontmatter d'un module.
# Usage: powershell -File scripts/extract-notions.ps1 -Path <module.md>
# Ce que le coach consommera à la place de l'extraction manuelle (Règle 0).
param([Parameter(Mandatory)][string]$Path)
$raw = Get-Content $Path -Raw -Encoding UTF8
if ($raw -match '(?s)^---\s*\n(.*?)\n---' -and $Matches[1] -match '(?m)^\s*notions\s*:\s*\[(.*?)\]') {
    ($Matches[1] -split ',') | ForEach-Object { $_.Trim() } | Where-Object { $_ }
} else {
    Write-Output "Aucune notion trouvée (frontmatter notions: manquant)"
    exit 1
}
