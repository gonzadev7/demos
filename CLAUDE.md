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

Actualizar el CRM después de cada interacción sin que Gonzalo lo pida.

## Demos
- Carpeta: `c:\Users\casa\Documents\GitHub\demos\[nombre-lead]\`
- Cada demo tiene: `index.html`, `styles.css`, `script.js`
- Template de referencia: `demos/crv-legales/` — seguir su estructura exacta
- Colores: basarse SIEMPRE en el logo del prospecto, no en el feed
- Logos cuadrados con fondo propio: quitar `padding` y `background` del `.hero-photo img`
- GitHub Pages URL: `gonzadev7.github.io/demos/[nombre-carpeta]/`

## Stack
HTML + CSS + JS vanilla. Sin frameworks. Deploy en GitHub Pages.
Flujo: VS Code → GitHub Desktop → Netlify (clientes activos).

## Reglas clave
- Precio SIEMPRE después de que reaccionen a la demo
- Actualizar CRM automáticamente tras cada interacción
- Seguir la estructura exacta del template (no inventar CSS propio)
- Colores del logo, no del feed ni de gráficas promocionales
