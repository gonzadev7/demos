$tz = [System.TimeZoneInfo]::FindSystemTimeZoneById('Argentina Standard Time')
$now = [System.TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $tz)
$horaStr = $now.ToString('yyyy-MM-dd HH:mm')
$h = $now.Hour
$m = $now.Minute

$warning = ''
if ($h -ge 0 -and $h -lt 6) {
  $warning = " | ALERTA SUENO: son las $horaStr, Gonza deberia estar durmiendo — recordarle que se vaya a dormir ya."
} elseif ($h -eq 23 -and $m -ge 30) {
  $warning = " | ALERTA SUENO: son las $horaStr, Gonza deberia irse a dormir pronto — recordarle."
}

$ctx = "Hora actual Buenos Aires: $horaStr$warning"

[pscustomobject]@{
  hookSpecificOutput = [pscustomobject]@{
    hookEventName   = 'UserPromptSubmit'
    additionalContext = $ctx
  }
} | ConvertTo-Json -Compress
