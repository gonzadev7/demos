(() => {
  const encabezado = document.getElementById('encabezado');
  const btnMenu = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');

  // Arranca sólido en el carbón de la marca; al scrollear pasa a vidrio esmerilado
  const marcar = () => encabezado.classList.toggle('vidrio', window.scrollY > 10 && !nav.classList.contains('abierto'));
  window.addEventListener('scroll', marcar, { passive: true });
  btnMenu.addEventListener('click', () => {
    btnMenu.setAttribute('aria-expanded', nav.classList.toggle('abierto'));
    marcar();
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('abierto');
    btnMenu.setAttribute('aria-expanded', 'false');
    marcar();
  }));

  // Índice de áreas: cada opción muestra su panel
  const pestanias = document.querySelectorAll('[role="tab"]');
  pestanias.forEach(t => t.addEventListener('click', () => {
    pestanias.forEach(o => {
      const activa = o === t;
      o.setAttribute('aria-selected', activa);
      document.getElementById(o.getAttribute('aria-controls')).hidden = !activa;
    });
    if (window.innerWidth <= 860) document.getElementById(t.getAttribute('aria-controls')).scrollIntoView({ block: 'center', behavior: 'smooth' });
  }));

  // Botones de contacto: en la demo solo muestran la nota
  document.querySelectorAll('[data-nota]').forEach(b => b.addEventListener('click', () => {
    const nota = b.nextElementSibling;
    nota.hidden = false;
    nota.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }));

  // Flotante del celular: aparece cuando no hay otro botón de contacto a la vista y se esconde en el cierre
  const flotante = document.querySelector('.flotante');
  const cierre = document.getElementById('contacto');
  const botones = [...document.querySelectorAll('main .btn[data-nota]')];
  const revisar = () => {
    const otroVisible = botones.some(b => { const r = b.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight; });
    const cierreCerca = cierre.getBoundingClientRect().top < innerHeight * 0.85;
    flotante.classList.toggle('oculta', otroVisible || cierreCerca);
  };
  window.addEventListener('scroll', revisar, { passive: true });
  flotante.addEventListener('click', e => {
    e.preventDefault();
    cierre.scrollIntoView({ behavior: 'smooth' });
  });

  marcar();
  revisar();
})();
