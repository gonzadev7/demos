$tz = [System.TimeZoneInfo]::FindSystemTimeZoneById('Argentina Standard Time')
$hora = [System.TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $tz).ToString('yyyy-MM-dd HH:mm')

$base = $env:USERPROFILE
$privatePath = Join-Path $base "Documents/GitHub/gonza-private"
$carritoyaPath = Join-Path $base "Documents/GitHub/carritoya"
$hubPath = Join-Path $base "Documents/GitHub/gonza-hub"

$e = Get-Content (Join-Path $privatePath "estado.json") -Raw -ErrorAction SilentlyContinue
$l = Get-Content (Join-Path $privatePath "leads.json") -Raw -ErrorAction SilentlyContinue
$canal = Get-Content (Join-Path $carritoyaPath "CANAL.md") -Raw -ErrorAction SilentlyContinue
$compartido = Get-Content (Join-Path $hubPath "estado-compartido.md") -Raw -ErrorAction SilentlyContinue

$ctx = "=== HORA ACTUAL (Buenos Aires): $hora ===`n`n=== ESTADO COMPARTIDO ===`n$compartido"

[pscustomobject]@{
  hookSpecificOutput = [pscustomobject]@{
    hookEventName   = 'SessionStart'
    additionalContext = $ctx
  }
} | ConvertTo-Json -Compress -Depth 10
