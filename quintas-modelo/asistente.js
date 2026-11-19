/* Asistente de reservas embebido en la web (chat nativo, sin WhatsApp).
   Habla con el mismo cerebro del asistente (POST /api/chat); las fechas libres son de ejemplo. */
(function () {
  'use strict';
  var API = 'https://asistente-demos-gd.netlify.app/api/chat';
  var SLUG = 'quintas-modelo', TZ = 'America/Argentina/Buenos_Aires', OCUPACION = 0.3, DIAS_ADELANTE = 30;
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var CLAVE = 'quintas-modelo:chat:v1';

  var fab = document.getElementById('asis-fab'), panel = document.getElementById('asis'),
      lista = document.getElementById('asis-lista'), form = document.getElementById('asis-form'),
      campo = document.getElementById('asis-campo'), chips = document.getElementById('asis-chips'),
      teaser = document.getElementById('asis-teaser'), cerrar = document.getElementById('asis-x'),
      enviarBtn = document.getElementById('asis-enviar');
  if (!fab || !panel) return;

  function ahora() {
    var p = {};
    new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    var f = p.year + '-' + p.month + '-' + p.day;
    return { fecha: f, hora: p.hour + ':' + p.minute, clave: f + 'T' + p.hour + ':' + p.minute };
  }
  function dow(f) { var a = f.split('-').map(Number); return new Date(Date.UTC(a[0], a[1] - 1, a[2])).getUTCDay(); }
  function sumar(f, n) { var a = f.split('-').map(Number); return new Date(Date.UTC(a[0], a[1] - 1, a[2] + n)).toISOString().slice(0, 10); }
  function azar(t) { var h = 2166136261, s = t + SLUG; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return ((h >>> 0) % 1000) / 1000; }
  function textoHoy() { var a = ahora(), p = a.fecha.split('-'); return DIAS[dow(a.fecha)] + ' ' + Number(p[2]) + '/' + Number(p[1]) + '/' + p[0] + ', ' + a.hora + ' h'; }

  var estado = { msgs: [], reservas: [] };
  try { var g = JSON.parse(sessionStorage.getItem(CLAVE)); if (g && g.msgs) estado = g; } catch (e) {}
  function guardar() { try { sessionStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) {} }

  function libres() {
    var a = ahora(), out = [], Q = window.QUINTA;
    if (!Q) return out;
    for (var i = 0; i < 120; i++) {
      var f = sumar(a.fecha, i), slot = f + 'T10:00';
      if (Q.libre(f) && slot > a.clave && !estado.reservas.some(function (r) { return r.slot === slot; })) out.push(slot);
    }
    return out;
  }
  function marcarCalendario() { if (window.QUINTA) estado.reservas.forEach(function (r) { window.QUINTA.apartadas[r.slot.split('T')[0]] = 1; }); }
  function etiqueta(slot) { var f = slot.split('T')[0], p = f.split('-'); return DIAS[dow(f)] + ' ' + Number(p[2]) + '/' + Number(p[1]); }
  function visitante() {
    try {
      var v = localStorage.getItem('quintas-modelo:visitante');
      if (!v) { v = (crypto.randomUUID ? crypto.randomUUID() : String(Math.random()).slice(2) + Date.now()); localStorage.setItem('quintas-modelo:visitante', v); }
      return v;
    } catch (e) { return ''; }
  }

  function burbuja(rol, texto, clase) {
    var d = document.createElement('div');
    d.className = 'am ' + (rol === 'user' ? 'am-yo' : 'am-bot') + (clase ? ' ' + clase : '');
    d.textContent = texto; lista.appendChild(d); lista.scrollTop = lista.scrollHeight; return d;
  }
  function tarjeta(r) {
    var d = document.createElement('div'); d.className = 'am am-ok';
    var b = document.createElement('b'), s = document.createElement('span');
    b.textContent = 'Fecha apartada: ' + etiqueta(r.slot);
    s.textContent = r.nombre + (r.zona ? ' · ' + r.zona : '') + ' · Marcela te pasa el alias para la seña';
    d.appendChild(b); d.appendChild(s); lista.appendChild(d); lista.scrollTop = lista.scrollHeight;
  }
  function pintar() {
    lista.textContent = '';
    estado.msgs.forEach(function (m) { if (m.card) tarjeta(m.card); else burbuja(m.role, m.text); });
    chips.hidden = estado.msgs.some(function (m) { return m.role === 'user'; });
  }
  function bienvenida() {
    if (estado.msgs.length) return;
    estado.msgs.push({ role: 'model', text: '¡Hola! 👋 ¿Cuál es tu consulta?' });
    guardar();
  }

  marcarCalendario();
  var puntos = null;
  function escribiendo(on) {
    if (on && !puntos) {
      puntos = document.createElement('div'); puntos.className = 'am am-bot am-pts';
      puntos.setAttribute('aria-label', 'Escribiendo'); puntos.innerHTML = '<i></i><i></i><i></i>';
      lista.appendChild(puntos); lista.scrollTop = lista.scrollHeight;
    }
    if (!on && puntos) { puntos.remove(); puntos = null; }
  }
  var espera = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  function historial() {
    var t = [];
    estado.msgs.filter(function (m) { return m.text; }).slice(-40).forEach(function (m) {
      var rol = m.role === 'user' ? 'user' : 'model', p = t[t.length - 1];
      if (p && p.role === rol) p.text = (p.text + '\n' + m.text).slice(0, rol === 'user' ? 700 : 3000);
      else t.push({ role: rol, text: m.text.slice(0, rol === 'user' ? 700 : 3000) });
    });
    t = t.slice(-30);
    // La bienvenida es de la página: el servidor la ve como si la persona hubiera saludado, así no repite el saludo.
    if (t.length && t[0].role !== 'user') t.unshift({ role: 'user', text: 'Hola' });
    return t;
  }
  var MARCA = /\[\[(RESERVA|CANCELAR|AVISO)\|([^\]]*)\]\]/g;
  function marcas(texto) {
    var acc = [];
    var limpio = texto.replace(MARCA, function (_, tipo, datos) {
      acc.push({ tipo: tipo, p: datos.split('|').map(function (s) { return s.trim(); }) }); return '';
    }).replace(/\n{3,}/g, '\n\n').trim();
    var nuevas = [];
    acc.forEach(function (a) { if (a.tipo === 'CANCELAR') { estado.reservas = estado.reservas.filter(function (r) { return r.slot !== a.p[0]; }); if (window.QUINTA) window.QUINTA.apartar(a.p[0].split('T')[0], false); } });
    acc.forEach(function (a) {
      if (a.tipo !== 'RESERVA') return;
      var slot = a.p[0];
      if (libres().indexOf(slot) > -1 && estado.reservas.length < 10) {
        var r = { slot: slot, nombre: (a.p[1] || 'Sin nombre').slice(0, 60), zona: (a.p[2] || '').slice(0, 60) };
        estado.reservas.push(r); nuevas.push(r); if (window.QUINTA) window.QUINTA.apartar(slot.split('T')[0], true);
      }
    });
    return { texto: limpio.replace(/\*\*?([^*]+)\*\*?/g, '$1'), nuevas: nuevas };
  }
  async function pedir(cuerpo) {
    var esperas = [2000, 4500], falla;
    for (var i = 0; i <= esperas.length; i++) {
      if (i) await espera(esperas[i - 1]);
      var ctl = new AbortController(), corte = setTimeout(function () { ctl.abort(); }, 45000);
      try {
        var r = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: cuerpo, signal: ctl.signal });
        var d = await r.json().catch(function () { return {}; });
        if (r.ok && d.reply) return d.reply;
        falla = new Error(d.error || ('HTTP ' + r.status));
        if (!r.ok && [429, 500, 502, 503, 504].indexOf(r.status) < 0) break;
      } catch (e) { falla = e; } finally { clearTimeout(corte); }
    }
    throw falla;
  }

  var ocupado = false;
  async function enviar(texto) {
    texto = (texto || '').trim();
    if (!texto || ocupado) return;
    ocupado = true; enviarBtn.disabled = true; chips.hidden = true;
    estado.msgs.push({ role: 'user', text: texto.slice(0, 700) }); guardar(); burbuja('user', texto);
    campo.value = ''; ajustar();
    await espera(500); escribiendo(true);
    var reply;
    try {
      reply = await pedir(JSON.stringify({
        negocio: SLUG, visitante: visitante(), history: historial(), hoy: textoHoy(),
        libres: libres().slice(0, 120),
        reservas: estado.reservas.slice(-10).map(function (r) { return { slot: r.slot, nombre: r.nombre, zona: r.zona }; })
      }));
    } catch (e) {
      escribiendo(false);
      burbuja('model', 'No me llegó la respuesta. Probá mandar el mensaje otra vez en unos segundos.', 'am-err');
      ocupado = false; enviarBtn.disabled = false; return;
    }
    var res = marcas(reply);
    var partes = res.texto.split(/\n\s*\n/).map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 4);
    for (var i = 0; i < partes.length; i++) {
      if (i) await espera(Math.min(1400, 400 + partes[i].length * 12));
      escribiendo(false); estado.msgs.push({ role: 'model', text: partes[i] }); burbuja('model', partes[i]);
      if (i < partes.length - 1) escribiendo(true);
    }
    escribiendo(false);
    res.nuevas.forEach(function (r) { estado.msgs.push({ card: r }); tarjeta(r); });
    guardar(); ocupado = false; enviarBtn.disabled = false; campo.focus({ preventScroll: true });
  }

  // En el celular el teclado tapa la mitad de la pantalla: el panel sigue el área realmente visible
  // para que el campo de escritura quede siempre arriba del teclado.
  var vv = window.visualViewport, chico = window.matchMedia('(max-width:560px)');
  function acomodar() {
    if (panel.hidden) return;
    if (!vv || !chico.matches) { panel.style.bottom = ''; panel.style.height = ''; panel.style.top = ''; document.documentElement.classList.remove('asis-teclado'); return; }
    var tapado = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
    var teclado = tapado > 120 || document.activeElement === campo;
    document.documentElement.classList.toggle('asis-teclado', teclado);
    panel.style.bottom = tapado + 'px';
    panel.style.height = vv.height + 'px';
    lista.scrollTop = lista.scrollHeight;
  }
  if (vv) { vv.addEventListener('resize', acomodar); vv.addEventListener('scroll', acomodar); }
  campo.addEventListener('focus', acomodar); campo.addEventListener('blur', function () { setTimeout(acomodar, 50); });
  chico.addEventListener('change', acomodar);

  function ajustar() { campo.style.height = 'auto'; campo.style.height = Math.min(campo.scrollHeight, 96) + 'px'; }
  function abrir() {
    bienvenida(); pintar(); panel.hidden = false; teaser.hidden = true;
    fab.setAttribute('aria-expanded', 'true'); fab.classList.add('abierto'); fab.classList.remove('llama');
    document.documentElement.classList.add('asis-abierto'); acomodar();
    setTimeout(function () { if (!chico.matches) campo.focus({ preventScroll: true }); lista.scrollTop = lista.scrollHeight; }, 60);
  }
  function cerrarPanel() {
    panel.hidden = true; fab.setAttribute('aria-expanded', 'false'); fab.classList.remove('abierto');
    document.documentElement.classList.remove('asis-abierto', 'asis-teclado'); panel.style.bottom = ''; panel.style.height = ''; fab.focus();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-asistente]');
    if (!b) return;
    e.preventDefault(); panel.hidden ? abrir() : cerrarPanel();
  });
  // "Reservar esta fecha" del calendario: abre el chat y arranca la reserva con ese día.
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-reservar]');
    if (!b) return;
    e.preventDefault(); if (panel.hidden) abrir();
    enviar('Quiero reservar la quinta el ' + b.getAttribute('data-dia'));
  });
  cerrar.addEventListener('click', cerrarPanel);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) cerrarPanel(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); enviar(campo.value); });
  campo.addEventListener('input', ajustar);
  campo.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(campo.value); } });
  chips.addEventListener('click', function (e) { var b = e.target.closest('button[data-q]'); if (b) enviar(b.getAttribute('data-q')); });
  document.getElementById('asis-teaser-x').addEventListener('click', function () {
    teaser.hidden = true; fab.classList.remove('llama');
    try { sessionStorage.setItem(CLAVE + ':t', '1'); } catch (e) {}
  });

  // Invitación: aparece una sola vez por visita, sin tapar la web ni repetirse.
  var yaVisto = false;
  try { yaVisto = sessionStorage.getItem(CLAVE + ':t') === '1' || estado.msgs.length > 1; } catch (e) {}
  if (!yaVisto) {
    setTimeout(function () {
      if (panel.hidden) { teaser.hidden = false; fab.classList.add('llama'); try { sessionStorage.setItem(CLAVE + ':t', '1'); } catch (e) {} }
    }, 6000);
    setTimeout(function () { teaser.hidden = true; fab.classList.remove('llama'); }, 20000);
  }
})();
