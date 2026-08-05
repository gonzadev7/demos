$tz = [System.TimeZoneInfo]::FindSystemTimeZoneById('Argentina Standard Time')
$now = [System.TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $tz)
$horaStr = $now.ToString('yyyy-MM-dd HH:mm')
$h = $now.Hour
$m = $now.Minute

$warning = ''
if ($h -ge 0 -and $h -lt 6) {
  $warning = " | ALERTA SUENO: son las $horaStr, Gonza deberia estar durmiendo - recordarle que se vaya a dormir ya."
} elseif ($h -eq 23 -and $m -ge 30) {
  $warning = " | ALERTA SUENO: son las $horaStr, Gonza deberia irse a dormir pronto - recordarle."
}

$demoReminder = ''
$input = $null
try {
  $raw = [Console]::In.ReadToEnd()
  $json = $raw | ConvertFrom-Json
  $prompt = $json.prompt
  if ($prompt -match '(?i)(nueva demo|armemos una demo|hacemos una demo|demo nueva|crear demo|nueva landing|nueva p[aá]gina|hagamos la demo|empecemos la demo)') {
    $demoReminder = @"

=== RECORDATORIO: NUEVA DEMO ===
Antes de escribir una línea de HTML:
1. PENSAR EN EL RUBRO — ¿quién visita este sitio y qué necesita ver para confiar?
2. ADAPTAR LA ESTRUCTURA al cliente potencial de ese negocio (no copiar demos anteriores)
3. PREGUNTAS CLAVE: ¿Cuál es la duda/objeción principal? ¿Qué información necesita para contactar?
Referencia: memory/skill_demos_por_rubro.md
"@
  }
} catch {}

$ctx = "Hora actual Buenos Aires: $horaStr$warning$demoReminder"

[pscustomobject]@{
  hookSpecificOutput = [pscustomobject]@{
    hookEventName = 'UserPromptSubmit'
    additionalContext = $ctx
  }
} | ConvertTo-Json -Compress
