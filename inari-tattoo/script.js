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
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var d = E[+t.dataset.e];
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      document.getElementById('panel-titulo').textContent = d[0];
      document.getElementById('panel-texto').textContent = d[1];
      if (d[2]) { foto.hidden = false; foto.src = d[2]; foto.alt = d[3]; } else { foto.hidden = true; }
    });
  });

  var flot = document.querySelector('.flotante');
  var cont = document.getElementById('contacto');
  var nf = document.querySelector('.nota-flot');
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      flot.classList.toggle('oculto', es[0].isIntersecting);
      if (es[0].isIntersecting) nf.hidden = true;
    }).observe(cont);
  }
})();
