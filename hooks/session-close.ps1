
 = (Get-Item ).Parent.FullName
Set-Location 

Write-Host "Guardando cambios en Zapia..." -ForegroundColor Cyan

# Agregar archivos de data y situacion actual
git add data/*.json SITUACION_ACTUAL.md 2>&1 | Out-Null
git commit -m "Zapia: Auto-save modular data y situacion" 2>&1 | Out-Null
git push origin main --quiet 2>&1 | Out-Null

Write-Host "¡Cambios sincronizados! Chau Gonza." -ForegroundColor Green
