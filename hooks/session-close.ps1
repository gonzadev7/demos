$privatePath = Join-Path $env:USERPROFILE "Documents/GitHub/gonza-private"

if (-not (Test-Path $privatePath)) {
    Write-Error "gonza-private no encontrado en: $privatePath"
    exit 1
}

Set-Location $privatePath
git add leads.json estado.json 2>&1 | Out-Null
git commit -m 'auto-save al cerrar sesion' 2>&1 | Out-Null
git push 2>&1 | Out-Null
