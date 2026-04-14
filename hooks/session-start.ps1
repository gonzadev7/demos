$tz = [System.TimeZoneInfo]::FindSystemTimeZoneById("Argentina Standard Time")
$hora = [System.TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, $tz).ToString("yyyy-MM-dd HH:mm")

Write-Host "Sincronizando con Zapia..." -ForegroundColor Cyan
git pull origin main --quiet

$repoRoot = (Get-Item $PSScriptRoot).Parent.FullName
$dataPath = Join-Path $repoRoot "data"
$situacionPath = Join-Path $repoRoot "SITUACION_ACTUAL.md"

$contexto = "=== HORA ACTUAL (BA): $hora ===`n"

if (Test-Path $situacionPath) {
    $contexto += "`n=== SITUACION ACTUAL ===`n" + (Get-Content $situacionPath -Raw)
}

if (Test-Path $dataPath) {
    Get-ChildItem -Path $dataPath -Filter *.json | ForEach-Object {
        $name = $_.BaseName.ToUpper()
        $content = Get-Content $_.FullName -Raw
        $contexto += "`n=== DATA: $name ===`n$content"
    }
}

[pscustomobject]@{
  hookSpecificOutput = [pscustomobject]@{
    hookEventName   = "SessionStart"
    additionalContext = $contexto
  }
} | ConvertTo-Json -Compress -Depth 10