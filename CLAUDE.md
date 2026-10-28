# CLAUDE.md — Demos Web (Gonzalo Meza)

## Contexto del negocio
Gonzalo crea landing pages personalizadas como demos para prospectos de Instagram. El modelo es: demo primero → si les gusta, se envía el precio. Nunca al revés.

## Precio estándar
- **$119.999 ARS** — web completa + dominio gratis 1 año
- **$9.999/mes** — hosting, SSL, actualizaciones ilimitadas
- **Forma de pago:** 50% al inicio / 50% al entregar

## Flujo de ventas
1. Mensaje inicial → pregunta si quiere ver la demo
2. Si responde → enviar link de la demo
3. Si le gusta → recién ahí enviar precio
4. Precio aceptado → pedir 50% y arrancar

## CRM
El estado actualizado de todos los leads está en:
`C:\Users\casa\.claude\projects\c--Users-casa-Documents-GitHub\memory\crm_leads.md`

## Demos
- Carpeta: `c:\Users\casa\Documents\GitHub\demos\[nombre-lead]\`
- Cada demo tiene: `index.html`, `styles.css`, `script.js`
- Sin plantilla fija (reforma del 28/10/2026): cada demo es original según el rubro. Reglas completas en `Negocio/CLAUDE.md` ("Armar una demo"); piezas reutilizables marcadas con `PIEZA:` en `andrea-montes/styles.css`; registro de estilos en `_estilos.md`.
- Foto de perfil de Instagram SIEMPRE, original y completa, UNA sola vez (en la portada; nunca repetida en el encabezado)
- Colores: basarse en el feed general del prospecto (tonos dominantes, paleta visual) — no en gráficas promocionales aisladas
- Logos cuadrados con fondo propio: quitar `padding` y `background` del `.hero-photo img`
- GitHub Pages URL: `gonzadev7.github.io/demos/[nombre-carpeta]/`

## Stack
HTML + CSS + JS vanilla. Sin frameworks. Deploy en GitHub Pages.
Flujo: VS Code → GitHub Desktop → Netlify (clientes activos).

## Reglas clave
- Precio SIEMPRE después de que reaccionen a la demo
- Estructura y dirección visual distintas en cada demo (ver `_estilos.md`)
- Encabezado: arranca integrado a la portada (con línea divisoria fina de 1 px siempre) y al hacer scroll (o con el menú abierto) pasa a un color distinto a la portada, elegido entre los colores que ya dominan la web (principal de la marca o un fondo grande), nunca uno nuevo ni un acento; revisarlo sobre todas las secciones (línea fina si coincide con alguna)
- Nunca publicar (push) sin revisar la demo en escritorio Y en celular (330-390 px, página entera, sin scroll horizontal)
- Colores del feed general, no de gráficas promocionales aisladas
