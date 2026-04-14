
 = [System.TimeZoneInfo]::FindSystemTimeZoneById("Argentina Standard Time")
 = [System.TimeZoneInfo]::ConvertTimeFromUtc([DateTime]::UtcNow, ).ToString("yyyy-MM-dd HH:mm")

Write-Host "Sincronizando con Zapia..." -ForegroundColor Cyan
git pull origin main --quiet

 = (Get-Item ).Parent.FullName
 = Join-Path  "data"
 = Join-Path  "SITUACION_ACTUAL.md"

 = "=== HORA ACTUAL (BA):  ===\n"

if (Test-Path ) {
     += "\n=== SITUACION ACTUAL ===\n" + (Get-Content  -Raw)
}

if (Test-Path ) {
    Get-ChildItem -Path  -Filter *.json | ForEach-Object {
         = /bin/bash.BaseName.ToUpper()
         = Get-Content /bin/bash.FullName -Raw
         += "\n=== DATA:  ===\n"
    }
}

[pscustomobject]@{
  hookSpecificOutput = [pscustomobject]@{
    hookEventName   = "SessionStart"
    additionalContext = 
  }
} | ConvertTo-Json -Compress -Depth 10
