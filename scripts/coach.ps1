$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

# === SYNC REPO PRINCIPAL AU DEMARRAGE DE SESSION ===
$mainRepoDir   = "$env:USERPROFILE\Documents\projects\fullstack-autotraining"
$mainSyncAlert = ""
if (Test-Path "$mainRepoDir\.git") {
    Push-Location $mainRepoDir
    $pullOutput = git pull --recurse-submodules 2>&1
    $pullStatus = $LASTEXITCODE
    Pop-Location
    if ($pullStatus -ne 0) {
        $mainSyncAlert = "ERREUR PULL REPO PRINCIPAL - conflit detecte, verifier manuellement : cd fullstack-autotraining && git status"
    }
}

$base         = "$env:USERPROFILE\Documents\projects\fullstack-autotraining\private"
$progressFile = "$base\progress.md"
$ideasFile    = "$base\IDEAS.md"
$projectsFile = "$base\PROJECTS.md"
$jobsFile     = "$base\JOBS.md"

# Sync check repo prive
$privateSyncAlert = ""
$privateDir = Split-Path $progressFile -Parent
if (Test-Path "$privateDir\.git") {
    Push-Location $privateDir
    git fetch origin 2>$null | Out-Null
    $behind = git rev-list HEAD..origin/main --count 2>$null
    $dirty  = git status --porcelain 2>$null
    Pop-Location
    if ($behind -and [int]$behind -gt 0) {
        $privateSyncAlert = "PRIVATE REPO EN RETARD DE $behind COMMIT(S) - faire 'cd private && git pull' avant de continuer (changements depuis un autre poste)"
    }
    if ($dirty) {
        $privateSyncAlert += "$(if ($privateSyncAlert) {' | '})FICHIERS PRIVES NON COMMITES - penser a commiter en fin de session"
    }
}

if (-not (Test-Path $progressFile)) {
    Write-Output "{}"
    exit 0
}

$today    = Get-Date
$todayStr = $today.ToString("yyyy-MM-dd")

# Heure de session -> adaptation cognitive automatique
$hour = (Get-Date).Hour
$timeContext = ""
if ($hour -ge 21) {
    $timeContext = "*** SOIR TARD (${hour}h) - profil cognitif Sylvain : couche tot, session max 15 min, pas de nouveau concept ***\n\n"
}

# --- progress.md ---
$progressContent = Get-Content $progressFile -Raw -Encoding UTF8

# Quizzes en retard
$quizAlerts = @()
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match '\|\s*(\d{4}-\d{2}-\d{2})\s*\|' -and
        ($line -match 'J\+7' -or $line -match 'J\+30') -and
        $line -notmatch 'Fait') {
        $d = $Matches[1]
        if ([string]::Compare($d, $todayStr) -le 0) {
            $quizAlerts += $line.Trim()
        }
    }
}

# Bilan carrière (trigger si > 30 jours)
$careerAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Derni.re question carri.re.*?(\d{4}-\d{2}-\d{2})') {
        $careerDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $careerDate).Days
        if ($daysSince -ge 30) {
            $careerAlert = "BILAN CARRIERE DU (derniere fois il y a $daysSince jours) - poser les questions carriere en fin de session"
        }
        break
    }
}

# IDEAS.md : stale > 30 jours
$staleIdeas = @()
if (Test-Path $ideasFile) {
    $currentName = ""
    foreach ($line in (Get-Content $ideasFile -Encoding UTF8)) {
        if ($line -match '^## (.+)') { $currentName = $Matches[1].Trim() }
        if ($line -match '\*\*Derni.re activit.\*\*:\s*(\d{4}-\d{2}-\d{2})' -and $currentName) {
            $d = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
            $days = ($today - $d).Days
            if ($days -ge 30) { $staleIdeas += "$currentName (inactif depuis $days jours)" }
        }
    }
}

# Scan curriculum > 50 jours
$curriculumScanAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Dernier scan.*?(\d{4}-\d{2}-\d{2})' -and $line -match 'Scan curriculum') {
        $scanDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $scanDate).Days
        if ($daysSince -ge 75) {
            $curriculumScanAlert = "SCAN CURRICULUM DU (dernier il y a $daysSince jours) - AUDIT COMPLET : 1) WebSearch versions actuelles Angular/React/TS/NestJS/Tailwind/Vitest vs bloc 'Versions de reference' du README 2) verifier git log submodules cours deja vus 3) signaler patterns obsoletes ou nouvelles technos a integrer 4) AUTORISE a modifier les fichiers de cours : ajouter des notions manquantes ou pertinentes, supprimer du contenu obsolete ou redondant, committer dans chaque submodule concerne"
        }
        break
    }
}

# Revisions SM-2 en retard (J+7/J+30/J+90/J+180/J+365)
$sm2Alerts = @()
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match '^\|\s*(\w[^|]+)\s*\|.*\|\s*(\d{4}-\d{2}-\d{2})\s*\|' -and
        $line -notmatch 'Cours\s*\|' -and $line -notmatch '---') {
        $cours = $Matches[1].Trim()
        $nextDate = $Matches[2]
        if ([string]::Compare($nextDate, $todayStr) -le 0) {
            $sm2Alerts += "Revision SM-2 due : $cours (prevue $nextDate)"
        }
    }
}

# Question entretien hebdo > 7 jours
$interviewAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Derni.re question pos.e.*?(\d{4}-\d{2}-\d{2})') {
        $iqDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $iqDate).Days
        if ($daysSince -ge 7) {
            $interviewAlert = "QUESTION ENTRETIEN DUE (derniere il y a $daysSince jours) - lire interview/questions-entretien.md, choisir 1 question adaptee au cours actuel, la poser en fin de session SANS montrer la reponse d'abord"
        }
        break
    }
}

# Statut mission
$missionStatus = "inter-contrat"
$missionAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match '\*\*Statut\s*:\*\*\s*(.+)') {
        $missionStatus = $Matches[1].Trim()
        break
    }
}
$enMission = $missionStatus -ne "inter-contrat"
if ($enMission) {
    $missionAlert = "EN MISSION ($missionStatus) - mode maintenance : SM-2 + veille seulement, curriculum allege, scan offres suspendu, seuil burnout abaisse"
}

# JOBS.md : scan offres > 10 jours (suspendu si en mission)
$jobScanAlert = ""
if (-not $enMission -and (Test-Path $jobsFile)) {
    foreach ($line in (Get-Content $jobsFile -Encoding UTF8)) {
        if ($line -match '\*\*Dernier scan\*\*\s*:\s*(\d{4}-\d{2}-\d{2})') {
            $scanDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
            $daysSince = ($today - $scanDate).Days
            if ($daysSince -ge 10) {
                $jobScanAlert = "SCAN OFFRES DU (dernier il y a $daysSince jours) - lancer WebSearch selon criteres JOBS.md en fin de session"
            }
            break
        }
        if ($line -match '\*\*Dernier scan\*\*\s*:\s*\(premier') {
            $jobScanAlert = "SCAN OFFRES DU (jamais fait) - lancer WebSearch selon criteres JOBS.md en fin de session"
            break
        }
    }
}

# Veille tech > 7 jours
$techWatchAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Derni.re veille tech.*?(\d{4}-\d{2}-\d{2})') {
        $twDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $twDate).Days
        if ($daysSince -ge 7) {
            $techWatchAlert = "VEILLE TECH DUE ($daysSince jours) - WebSearch actualites frontend/React/TypeScript/accessibilite, 3-5 bullets, signaler si lien avec cours actuel"
        }
        break
    }
    if ($line -match 'Derni.re veille tech.*\(jamais\)') {
        $techWatchAlert = "VEILLE TECH DUE (jamais faite) - WebSearch actualites frontend/React/TypeScript/accessibilite, 3-5 bullets, signaler si lien avec cours actuel"
        break
    }
}

# Trace non deploye > 14 jours
$traceDeployAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Trace d.ploy..*Non.*depuis\s*(\d{4}-\d{2}-\d{2})') {
        $traceDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $traceDate).Days
        if ($daysSince -ge 14) {
            $traceDeployAlert = "TRACE NON DEPLOYE ($daysSince jours) - signal fort : proposer comme focus si pas de priorite critique, 15 min sur Vercel suffisent"
        }
        break
    }
}

# Burnout signal: 3+ sessions energie faible consecutives (seuil abaisse a 2 si en mission)
$burnoutAlert = ""
$burnoutThreshold = if ($enMission) { 2 } else { 3 }
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Sessions .nergie .* cons.cutives:\s*(\d+)') {
        $count = [int]$Matches[1]
        if ($count -ge $burnoutThreshold) {
            $missionCtx = if ($enMission) { " (seuil abaisse car en mission - stress cumule)" } else { "" }
            $burnoutAlert = "SIGNAL BURNOUT ($count sessions energie 1-2 consecutives$missionCtx) - demander si Sylvain veut passer la semaine sans curriculum, ne pas forcer"
        }
        break
    }
}

# Question systeme design mensuelle
$sysDesignAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Derni.re question syst.me design:\s*(\d{4}-\d{2}-\d{2})') {
        $sdDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $sdDate).Days
        if ($daysSince -ge 30) {
            $sysDesignAlert = "QUESTION SYSTEME DESIGN DUE ($daysSince jours) - poser 1 question conception en fin de session, ancree TribuZen, laisser 2 min reflexion avant correction"
        }
        break
    }
}

# LinkedIn post > 7 jours
$linkedinAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Derni.re publication LinkedIn.*?(\d{4}-\d{2}-\d{2})') {
        $liDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $liDate).Days
        if ($daysSince -ge 7) {
            $linkedinAlert = "LINKEDIN POST DU (dernier il y a $daysSince jours) - suggerer 1 sujet de post en fin de session base sur le contenu vu aujourd'hui"
        }
        break
    }
    if ($line -match 'Derni.re publication LinkedIn.*\(jamais\)') {
        $linkedinAlert = "LINKEDIN POST DU (jamais poste) - suggerer 1 sujet de post en fin de session"
        break
    }
}

# Audit presence internet > 60 jours
$presenceAuditAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Dernier audit pr.sence internet.*?(\d{4}-\d{2}-\d{2})') {
        $auditDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $auditDate).Days
        if ($daysSince -ge 60) {
            $presenceAuditAlert = "AUDIT PRESENCE INTERNET DU (dernier il y a $daysSince jours) - WebSearch 'Sylvain Maurier developpeur' + 'smaurier github', lister resultats, signaler gaps"
        }
        break
    }
    if ($line -match 'Dernier audit pr.sence internet.*\(jamais\)') {
        $presenceAuditAlert = "AUDIT PRESENCE INTERNET DU (jamais fait) - WebSearch 'Sylvain Maurier developpeur' + 'smaurier github', lister resultats, signaler gaps"
        break
    }
}

# Scan evenements Lyon > 30 jours
$eventsAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Dernier scan .v.nements.*?(\d{4}-\d{2}-\d{2})') {
        $evDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $evDate).Days
        if ($daysSince -ge 30) {
            $eventsAlert = "SCAN EVENEMENTS DU (dernier il y a $daysSince jours) - WebSearch 'meetup developpeur Lyon', 'Lyon Craft evenement', 'conference frontend Lyon', presenter les 2-3 prochains pertinents"
        }
        break
    }
    if ($line -match 'Dernier scan .v.nements.*\(jamais\)') {
        $eventsAlert = "SCAN EVENEMENTS DU (jamais fait) - WebSearch 'meetup developpeur Lyon', 'Lyon Craft evenement', 'conference frontend Lyon', presenter les 2-3 prochains pertinents"
        break
    }
}

# Meta-reflexion coach > 15 jours
$metaReflectAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Derni.re r.flexion meta coach.*?(\d{4}-\d{2}-\d{2})') {
        $mrDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $mrDate).Days
        if ($daysSince -ge 15) {
            $metaReflectAlert = "REFLEXION META COACH DUE (derniere il y a $daysSince jours) - Prendre 2 min en fin de session : est-ce que le coach est utile tel quel ? Y a-t-il un service manquant, une friction recurrente, quelque chose a supprimer ? Proposer 1-2 ajustements concrets si pertinent, modifier coach.ps1 si valide"
        }
        break
    }
    if ($line -match 'Derni.re r.flexion meta coach.*\(jamais\)') {
        $metaReflectAlert = "REFLEXION META COACH DUE (jamais faite) - Prendre 2 min en fin de session : est-ce que le coach est utile tel quel ? Y a-t-il un service manquant, une friction recurrente, quelque chose a supprimer ? Proposer 1-2 ajustements concrets si pertinent, modifier coach.ps1 si valide"
        break
    }
}

# Suggestion talk > 30 jours
$talkAlert = ""
foreach ($line in (Get-Content $progressFile -Encoding UTF8)) {
    if ($line -match 'Derni.re suggestion coach.*?(\d{4}-\d{2}-\d{2})') {
        $talkDate = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
        $daysSince = ($today - $talkDate).Days
        if ($daysSince -ge 30) {
            $talkAlert = "SUGGESTION TALK DUE (derniere il y a $daysSince jours) - En fin de session, proposer 1 idee de talk adaptee au profil (UX natif + RGAA + 3D/WebGL + TS fullstack) et au contenu vu recemment. Cibles : HumanTalks Lyon (15 min), LyonJS, MiXiT, Lyon Craft. Si Sylvain accepte : noter dans progress.md section 'Idees de talk' + mettre a jour 'Derniere suggestion coach'"
        }
        break
    }
    if ($line -match 'Derni.re suggestion coach.*\(jamais\)') {
        $talkAlert = "SUGGESTION TALK DUE (jamais faite) - En fin de session, proposer 1 idee de talk adaptee au profil (UX natif + RGAA + 3D/WebGL + TS fullstack) et au contenu vu recemment. Cibles : HumanTalks Lyon (15 min), LyonJS, MiXiT, Lyon Craft. Si Sylvain accepte : noter dans progress.md section 'Idees de talk' + mettre a jour 'Derniere suggestion coach'"
        break
    }
}

# PROJECTS.md : stale > 30 jours
$staleProjects = @()
if (Test-Path $projectsFile) {
    $currentName = ""
    foreach ($line in (Get-Content $projectsFile -Encoding UTF8)) {
        if ($line -match '^## (.+)') { $currentName = $Matches[1].Trim() }
        if ($line -match '\*\*Derni.re activit.\*\*:\s*(\d{4}-\d{2}-\d{2})' -and $currentName) {
            $d = [datetime]::ParseExact($Matches[1], "yyyy-MM-dd", $null)
            $days = ($today - $d).Days
            if ($days -ge 20) { $staleProjects += "$currentName (inactif depuis $days jours)" }
        }
    }
}

# --- Construire les alertes ---
$alert = ""

if ($missionAlert) {
    $alert += "*** $($missionAlert -replace '"', '\"') ***\n\n"
}
if ($mainSyncAlert) {
    $alert += "*** $($mainSyncAlert -replace '"', '\"') ***\n\n"
}
if ($privateSyncAlert) {
    $alert += "*** $($privateSyncAlert -replace '"', '\"') ***\n\n"
}
if ($quizAlerts.Count -gt 0) {
    $lines = ($quizAlerts | ForEach-Object { $_ -replace '"', '\"' }) -join '\n'
    $alert += "*** QUIZ EN RETARD - faire avant toute autre chose ***\n$lines\n\n"
}
if ($careerAlert) {
    $alert += "*** $($careerAlert -replace '"', '\"') ***\n\n"
}
if ($jobScanAlert) {
    $alert += "*** $($jobScanAlert -replace '"', '\"') ***\n\n"
}
if ($interviewAlert) {
    $alert += "*** $($interviewAlert -replace '"', '\"') ***\n\n"
}
if ($curriculumScanAlert) {
    $alert += "*** $($curriculumScanAlert -replace '"', '\"') ***\n\n"
}
if ($sm2Alerts.Count -gt 0) {
    $lines = ($sm2Alerts | ForEach-Object { $_ -replace '"', '\"' }) -join '\n'
    $alert += "*** REVISIONS ESPACEES DUES (SM-2) ***\n$lines\n\n"
}
if ($staleProjects.Count -gt 0) {
    $lines = ($staleProjects | ForEach-Object { $_ -replace '"', '\"' }) -join '\n'
    $alert += "*** PROJETS SANS ACTIVITE 30+ JOURS - demander une mise a jour ***\n$lines\n\n"
}
if ($staleIdeas.Count -gt 0) {
    $lines = ($staleIdeas | ForEach-Object { $_ -replace '"', '\"' }) -join '\n'
    $alert += "*** IDEES SANS ACTIVITE 30+ JOURS - demander une mise a jour ***\n$lines\n\n"
}
if ($techWatchAlert) {
    $alert += "*** $($techWatchAlert -replace '"', '\"') ***\n\n"
}
if ($traceDeployAlert) {
    $alert += "*** $($traceDeployAlert -replace '"', '\"') ***\n\n"
}
if ($burnoutAlert) {
    $alert += "*** $($burnoutAlert -replace '"', '\"') ***\n\n"
}
if ($sysDesignAlert) {
    $alert += "*** $($sysDesignAlert -replace '"', '\"') ***\n\n"
}
if ($linkedinAlert) {
    $alert += "*** $($linkedinAlert -replace '"', '\"') ***\n\n"
}
if ($presenceAuditAlert) {
    $alert += "*** $($presenceAuditAlert -replace '"', '\"') ***\n\n"
}
if ($eventsAlert) {
    $alert += "*** $($eventsAlert -replace '"', '\"') ***\n\n"
}
if ($talkAlert) {
    $alert += "*** $($talkAlert -replace '"', '\"') ***\n\n"
}
if ($metaReflectAlert) {
    $alert += "*** $($metaReflectAlert -replace '"', '\"') ***\n\n"
}

# --- Context final ---
$escaped = $progressContent -replace '\\', '\\\\' -replace '"', '\"' -replace "`r`n", '\n' -replace "`n", '\n' -replace "`t", '\t'
$context = "$($timeContext)$($alert)COACH CURRICULUM - lire et suivre les instructions du debut de session :\n\n$escaped"

Write-Output "{`"hookSpecificOutput`":{`"hookEventName`":`"SessionStart`",`"additionalContext`":`"$context`"}}"
