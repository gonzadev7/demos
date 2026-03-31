Set-Location 'C:/Users/casa/Documents/GitHub/demos'
git add leads.json estado.json 2>&1 | Out-Null
git commit -m 'CRM: auto-save al cerrar sesion' 2>&1 | Out-Null
git push 2>&1 | Out-Null
