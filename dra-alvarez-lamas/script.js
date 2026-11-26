(() => {
  const encabezado = document.getElementById('encabezado');
  const btnMenu = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');

  // Arranca sólido en el negro del logo; al scrollear pasa a vidrio esmerilado
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

  // Índice "¿Qué querés trabajar?"
  const pestanas = [...document.querySelectorAll('[role="tab"]')];
  const elegir = t => {
    pestanas.forEach(p => {
      const activa = p === t;
      p.setAttribute('aria-selected', activa);
      p.tabIndex = activa ? 0 : -1;
      document.getElementById(p.getAttribute('aria-controls')).hidden = !activa;
    });
  };
  pestanas.forEach((t, i) => {
    t.addEventListener('click', () => elegir(t));
    t.addEventListener('keydown', e => {
      const paso = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!paso) return;
      e.preventDefault();
      const otra = pestanas[(i + paso + pestanas.length) % pestanas.length];
      elegir(otra);
      otra.focus();
    });
  });

  // Botones de contacto: en la demo solo muestran la nota
  document.querySelectorAll('[data-nota]').forEach(b => b.addEventListener('click', () => {
    const nota = b.nextElementSibling;
    nota.hidden = false;
    nota.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }));

  // Flotante del celular: aparece cuando el botón de la portada sale de pantalla y se esconde al llegar al cierre
  const flotante = document.querySelector('.flotante');
  const cierre = document.getElementById('contacto');
  const botonPortada = document.querySelector('.portada .btn');
  const revisar = () => {
    const portadaVisible = botonPortada.getBoundingClientRect().bottom > 0;
    const cierreCerca = cierre.getBoundingClientRect().top < innerHeight * 0.85;
    flotante.classList.toggle('oculta', portadaVisible || cierreCerca);
  };
  window.addEventListener('scroll', revisar, { passive: true });
  flotante.addEventListener('click', e => {
    e.preventDefault();
    cierre.scrollIntoView({ behavior: 'smooth' });
  });

  marcar();
  revisar();
})();
