Set-Location 'C:/Users/casa/Documents/GitHub/gonza-private'
git add leads.json estado.json 2>&1 | Out-Null
git commit -m 'auto-save al cerrar sesion' 2>&1 | Out-Null
git push 2>&1 | Out-Null
