$raw = [Console]::In.ReadToEnd()
$json = $raw | ConvertFrom-Json
$file = $json.tool_input.file_path

if (-not ($file -like '*leads.json' -or $file -like '*estado.json')) { exit 0 }

$privatePath = Join-Path $env:USERPROFILE "Documents/GitHub/gonza-private"

if (-not (Test-Path $privatePath)) {
    Write-Error "gonza-private no encontrado en: $privatePath"
    exit 0
}

# Auto-push
Set-Location $privatePath
git add leads.json estado.json 2>&1 | Out-Null
$commit = git commit -m 'CRM: auto-save' 2>&1
git push 2>&1 | Out-Null

# Verificar leads vencidos (sin contacto hace mas de 3 dias)
$ctx = 'Auto-push CRM completado.'

try {
  $tz = [System.TimeZoneInfo]::FindSystemTimeZoneById('Argentina Standard Time')
  $hoy = [System.TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $tz).Date
  $leadsFile = Join-Path $privatePath "leads.json"
  $leads = Get-Content $leadsFile -Raw | ConvertFrom-Json
  $activos = $leads | Where-Object { $_.status -notin @('cerrado', 'perdido') }
  $vencidos = $activos | Where-Object {
    $_.lastContact -and
    ($hoy - [DateTime]::Parse($_.lastContact)).Days -gt 3
  } | ForEach-Object {
    $dias = ($hoy - [DateTime]::Parse($_.lastContact)).Days
    "$($_.name) ($dias dias sin contacto)"
  }
  if ($vencidos) {
    $ctx += " | Leads sin seguimiento: $($vencidos -join ', ')"
  }
} catch {}

[pscustomobject]@{
  hookSpecificOutput = [pscustomobject]@{
    hookEventName   = 'PostToolUse'
    additionalContext = $ctx
  }
} | ConvertTo-Json -Compress
