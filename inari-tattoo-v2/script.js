(function () {
  var enc = document.getElementById('encabezado');
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');

  function marcar() {
    enc.classList.toggle('solido', window.scrollY > 10 || nav.classList.contains('abierto'));
  }
  window.addEventListener('scroll', marcar, { passive: true });
  marcar();

  btn.addEventListener('click', function () {
    var abierto = nav.classList.toggle('abierto');
    btn.setAttribute('aria-expanded', abierto);
    marcar();
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('abierto'); btn.setAttribute('aria-expanded', 'false'); marcar(); }
  });

  document.querySelectorAll('[data-nota]').forEach(function (b) {
    b.addEventListener('click', function () {
      var n = b.nextElementSibling;
      if (n && n.classList.contains('nota')) {
        n.hidden = false;
        if (!n.classList.contains('nota-flot')) n.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }
    });
  });

  var E = [
    ['Fine Line', 'Trabajo de línea fina. Mirá cómo lo resolvemos en el Instagram del estudio.', 'fineline.jpg', 'Tatuaje fine line en un brazo, trabajo del estudio'],
    ['Anime', 'Uno de los estilos que trabaja el estudio. Contanos tu personaje o escena y lo cotizamos.', '', ''],
    ['Japonés', 'Uno de los estilos que trabaja el estudio. Contanos tu idea y lo cotizamos.', '', ''],
    ['BlackWork', 'Negro sólido, formas y texturas. Un trabajo del estudio en la espalda.', 'blackwork.jpg', 'Tatuaje blackwork en la espalda, trabajo del estudio'],
    ['Neotradicional', 'Uno de los estilos que trabaja el estudio. Contanos tu idea y lo cotizamos.', '', ''],
    ['Realismo', 'Retratos y detalle en blanco, negro y grises. Un trabajo del estudio.', 'realismo.jpg', 'Tatuaje realista de un retrato en el brazo, trabajo del estudio']
  ];
  var tabs = document.querySelectorAll('.tabs button');
  var foto = document.getElementById('panel-foto');
  var vacio = document.getElementById('panel-vacio');
  E.forEach(function (d) { if (d[2]) new Image().src = d[2]; });
  var panel = document.querySelector('.panel');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var d = E[+t.dataset.e];
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      document.getElementById('panel-titulo').textContent = d[0];
      document.getElementById('panel-texto').textContent = d[1];
      if (d[2]) { foto.hidden = false; vacio.setAttribute('hidden', ''); foto.src = d[2]; foto.alt = d[3]; } else { foto.hidden = true; vacio.removeAttribute('hidden'); }
      document.getElementById('panel-num').textContent = '0' + (+t.dataset.e + 1) + ' / 06';
      panel.classList.remove('cambia'); void panel.offsetWidth; panel.classList.add('cambia');
    });
  });

  var flot = document.querySelector('.flotante');
  var cont = document.getElementById('contacto');
  var nf = document.querySelector('.nota-flot');
  var quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Palabra por palabra en la frase del estudio
  var cita = document.querySelector('.cita');
  var palabras = [];
  if (!quieto) {
    cita.innerHTML = cita.textContent.trim().split(' ').map(function (p) { return '<span class="p">' + p + '</span>'; }).join(' ');
    palabras = cita.querySelectorAll('.p');
  }

  // Línea de progreso, parallax de las líneas y frase
  var prog = document.querySelector('.progreso');
  var lineas = document.querySelectorAll('.lineas');
  var pedido = false;
  function pintar() {
    pedido = false;
    var alto = document.documentElement.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (alto > 0 ? scrollY / alto : 0) + ')';
    if (quieto) return;
    if (scrollY < innerHeight * 1.2) lineas.forEach(function (l) { l.style.transform = 'translateY(' + scrollY * 0.18 + 'px)'; });
    var r = cita.getBoundingClientRect();
    var avance = (innerHeight * 0.88 - r.top) / (r.height + innerHeight * 0.3);
    var n = Math.ceil(Math.min(1, Math.max(0, avance)) * palabras.length);
    palabras.forEach(function (p, i) { p.classList.toggle('on', i < n); });
  }
  window.addEventListener('scroll', function () {
    if (!pedido) { pedido = true; requestAnimationFrame(pintar); }
  }, { passive: true });
  window.addEventListener('resize', pintar);
  pintar();

  // Aparición al bajar
  var aparecen = document.querySelectorAll('section:not(.portada) h2:not(.sr), .datos div, .tabs button, .panel, .cita-pie, .estudio-txt, .pasos li, .cierre p, .cierre .btn');
  aparecen.forEach(function (e) {
    e.classList.add('rv');
    var i = Array.prototype.indexOf.call(e.parentNode.children, e);
    e.style.transitionDelay = Math.min(i, 5) * 70 + 'ms';
  });
  if ('IntersectionObserver' in window) {
    var mira = new IntersectionObserver(function (es) {
      es.forEach(function (x) {
        if (!x.isIntersecting) return;
        x.target.classList.add('ok');
        mira.unobserve(x.target);
        setTimeout(function () { x.target.style.transitionDelay = ''; }, 1200);
      });
    }, { threshold: 0.1 });
    aparecen.forEach(function (e) { mira.observe(e); });

    // Flotante: solo entre la portada y el contacto
    var enPortada = true, enContacto = false;
    function flotante() {
      var ocultar = enPortada || enContacto;
      flot.classList.toggle('oculto', ocultar);
      if (ocultar) nf.hidden = true;
    }
    new IntersectionObserver(function (es) { enPortada = es[0].isIntersecting; flotante(); }).observe(document.querySelector('.portada .btn'));
    new IntersectionObserver(function (es) { enContacto = es[0].isIntersecting; flotante(); }).observe(cont);
  } else {
    aparecen.forEach(function (e) { e.classList.add('ok'); });
  }
})();
