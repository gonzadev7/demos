(() => {
  const encabezado = document.getElementById('encabezado');
  const btnMenu = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');

  const marcar = () => encabezado.classList.toggle('solido', window.scrollY > 10 || nav.classList.contains('abierto'));
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

  // Botones de contacto: en la demo solo muestran la nota
  document.querySelectorAll('[data-nota]').forEach(b => b.addEventListener('click', () => {
    const nota = b.nextElementSibling;
    nota.hidden = false;
    nota.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }));

  // Servicios: índice con panel
  const SERV = [
    ['Color', 'La colorimetría es lo que más trabajamos: pensar el tono que te favorece y cuidar el pelo mientras se hace.', 'Contanos qué tono tenés en mente y lo vemos juntas.', false],
    ['Cortes', 'Cortes pensados para tu pelo y para cómo lo usás todos los días.', 'Si tenés una foto de referencia, mandala al pedir el turno.', false],
    ['Manos y pies', 'Manicura y esmaltado en manos y pies, con diseños y colores a elección.', 'Un trabajo más que se suma a tu turno de pelo, o por separado.', true],
  ];
  const tabs = [...document.querySelectorAll('[data-serv]')];
  const mostrar = i => {
    document.getElementById('panel-titulo').textContent = SERV[i][0];
    document.getElementById('panel-texto').textContent = SERV[i][1];
    document.getElementById('panel-cuando').textContent = SERV[i][2];
    document.getElementById('panel-fotos').hidden = !SERV[i][3];
    tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === i)));
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => mostrar(i)));
  mostrar(0);

  marcar();
})();
