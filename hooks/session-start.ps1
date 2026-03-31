$tz = [System.TimeZoneInfo]::FindSystemTimeZoneById('Argentina Standard Time')
$hora = [System.TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $tz).ToString('yyyy-MM-dd HH:mm')
$e = Get-Content 'C:/Users/casa/Documents/GitHub/demos/estado.json' -Raw -ErrorAction SilentlyContinue
$l = Get-Content 'C:/Users/casa/Documents/GitHub/demos/leads.json' -Raw -ErrorAction SilentlyContinue

$ctx = "=== HORA ACTUAL (Buenos Aires): $hora ===`n`n=== ESTADO.JSON ===`n$e`n`n=== LEADS.JSON ===`n$l"

[pscustomobject]@{
  hookSpecificOutput = [pscustomobject]@{
    hookEventName   = 'SessionStart'
    additionalContext = $ctx
  }
} | ConvertTo-Json -Compress -Depth 10
