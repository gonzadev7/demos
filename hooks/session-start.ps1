$tz = [System.TimeZoneInfo]::FindSystemTimeZoneById('Argentina Standard Time')
$hora = [System.TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $tz).ToString('yyyy-MM-dd HH:mm')
$e = Get-Content 'C:/Users/casa/Documents/GitHub/gonza-private/estado.json' -Raw -ErrorAction SilentlyContinue
$l = Get-Content 'C:/Users/casa/Documents/GitHub/gonza-private/leads.json' -Raw -ErrorAction SilentlyContinue
$canal = Get-Content 'C:/Users/casa/Documents/GitHub/carritoya/CANAL.md' -Raw -ErrorAction SilentlyContinue
$compartido = Get-Content 'C:/Users/casa/Documents/GitHub/gonza-hub/estado-compartido.md' -Raw -ErrorAction SilentlyContinue

$ctx = "=== HORA ACTUAL (Buenos Aires): $hora ===`n`n=== ESTADO.JSON ===`n$e`n`n=== LEADS.JSON ===`n$l`n`n=== CANAL.MD (preguntas de Claude VS Code) ===`n$canal`n`n=== ESTADO COMPARTIDO (Vida + Negocio) ===`n$compartido"

[pscustomobject]@{
  hookSpecificOutput = [pscustomobject]@{
    hookEventName   = 'SessionStart'
    additionalContext = $ctx
  }
} | ConvertTo-Json -Compress -Depth 10
