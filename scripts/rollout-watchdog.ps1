<#
  rollout-watchdog.ps1 — relance externe du loop autonome (week-end).

  Principe : le loop in-session écrit un heartbeat (private/heartbeat.txt) à chaque
  itération. Ce watchdog, lancé périodiquement par le Planificateur de tâches Windows,
  vérifie l'âge du heartbeat. S'il est PÉRIMÉ (> StaleMinutes) → la session Claude est
  bloquée (mur de quota 5h franchi, ou stall) → on réactive la fenêtre du terminal et on
  tape "continue{ENTER}" pour relancer le loop. Si le heartbeat est FRAIS, on ne touche à
  rien (la session bosse — pas d'interférence).

  SendKeys ne peut PAS répondre à une popup de permission : l'unattended suppose une session
  sans prompt (bypass permissions / allowlist).

  Cible fenêtre : Claude tourne dans le TERMINAL INTÉGRÉ VS CODE → on active la fenêtre VS Code
  par le titre stable "fullstack-autotraining" (le workspace reste dans le titre quel que soit le
  fichier ouvert). ⚠️ PRÉREQUIS : le focus doit être dans le PANNEAU TERMINAL (pas dans un fichier
  éditeur) au moment du tir, sinon "continue rollout" se tape dans l'éditeur. Override via -WindowTitle.
#>
param(
  [string]$HeartbeatFile = "$PSScriptRoot\..\private\heartbeat.txt",
  [int]$StaleMinutes = 20,
  [string]$WindowTitle = "fullstack-autotraining",
  [string]$LogFile = "$PSScriptRoot\..\private\watchdog.log"
)

$ErrorActionPreference = "Stop"
function Log($msg) {
  $line = "{0}  {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $msg
  Add-Content -Path $LogFile -Value $line -Encoding UTF8
}

try {
  if (-not (Test-Path $HeartbeatFile)) {
    Log "heartbeat absent ($HeartbeatFile) — pas de relance (loop peut-être pas démarré)."
    return
  }

  $hbRaw = (Get-Content $HeartbeatFile -Raw).Trim()
  # Ligne 1 attendue = timestamp ISO (le loop écrit "yyyy-MM-ddTHH:mm:ss | <cours/phase>")
  $tsStr = ($hbRaw -split "`n")[0].Split('|')[0].Trim()
  $ts = [datetime]::Parse($tsStr)
  $ageMin = [math]::Round(((Get-Date) - $ts).TotalMinutes, 1)

  if ($ageMin -le $StaleMinutes) {
    Log "heartbeat frais ($ageMin min) — session active, rien à faire."
    return
  }

  Log "heartbeat PÉRIMÉ ($ageMin min > $StaleMinutes) — relance : envoi 'continue' au terminal '$WindowTitle'."
  $wshell = New-Object -ComObject wscript.shell
  $activated = $wshell.AppActivate($WindowTitle)
  if (-not $activated) {
    Log "AppActivate('$WindowTitle') a échoué — fenêtre introuvable/pas au bon titre. Aucun envoi."
    return
  }
  Start-Sleep -Milliseconds 500
  # ASCII pur (pas d'accents → indépendant du layout clavier). Le loop traite
  # "continue rollout" comme "reprends le rollout selon private/rollout-queue.md".
  $wshell.SendKeys("continue rollout")
  Start-Sleep -Milliseconds 200
  $wshell.SendKeys("{ENTER}")
  Log "'continue rollout{ENTER}' envoyé."
}
catch {
  Log "ERREUR watchdog : $($_.Exception.Message)"
}
