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
    ['Pre y post bariátrica', 'Claudia trabaja Pilates consciente antes y después de una cirugía bariátrica. Contale en qué momento estás y cómo te sentís.'],
    ['+60: fuerza, columpio y hábitos', 'Una propuesta para mayores de 60 que combina fuerza, columpio y hábitos. Escribile y te cuenta cómo se arma.'],
    ['Esferodinamia', 'Trabajo con esfera, una de las especialidades de Claudia. Preguntale qué opciones hay y cuáles se adaptan a vos.'],
    ['Esfera flow y EsferoKIDS', 'Esfera flow para adultos y EsferoKIDS para chicos: dos propuestas que Claudia comparte en su Instagram. Consultale por horarios.'],
    ['Una comunidad para acompañarme', 'Evolución 360° es el grupo de WhatsApp de Claudia. Escribile y te cuenta cómo sumarte.']
  ];
  var tabs = document.querySelectorAll('.tabs button');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      var d = E[+t.dataset.e];
      tabs.forEach(function (x) { x.setAttribute('aria-selected', x === t); });
      document.getElementById('panel-titulo').textContent = d[0];
      document.getElementById('panel-texto').textContent = d[1];
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
