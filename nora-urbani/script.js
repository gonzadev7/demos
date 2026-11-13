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

  // Propuestas: índice con panel (textos tomados de su Instagram)
  const PROPUESTAS = [
    ['Hipnosis Clínica Reparadora', 'Un espacio individual para tratar los traumas desde el origen, los patrones emocionales, los miedos, las inseguridades, los pensamientos repetitivos y el estrés.', 'Sesión individual. Presencial en Córdoba u online.'],
    ['Conexión con tu Ser', 'Un encuentro grupal de regulación energética y vibracional que integra meditación, respiración consciente, visualización y una meditación guiada con inducción en hipnosis.', 'Encuentro grupal. Consultá las próximas fechas.'],
    ['Terapia de Vidas Pasadas', 'Regresiones a vidas pasadas: otra de las propuestas del espacio de Nora para abordar aquello que hoy te condiciona.', 'Escribile y te cuenta cómo trabaja.'],
    ['Medicina Frecuencial', 'Parte de L.N.T., La Nueva Terapia, que Nora ofrece junto con la hipnosis y las regresiones.', 'Escribile y te cuenta cómo trabaja.'],
  ];
  const tabs = [...document.querySelectorAll('[data-prop]')];
  const mostrar = i => {
    document.getElementById('panel-titulo').textContent = PROPUESTAS[i][0];
    document.getElementById('panel-texto').textContent = PROPUESTAS[i][1];
    document.getElementById('panel-cuando').textContent = PROPUESTAS[i][2];
    tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === i)));
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => mostrar(i)));
  mostrar(0);

  // El botón flotante del celular se esconde al llegar a las reservas
  const flotante = document.querySelector('.flotante');
  const turnos = document.getElementById('turnos');
  const revisar = () => flotante.classList.toggle('oculta', turnos.getBoundingClientRect().top < innerHeight * 0.8);
  window.addEventListener('scroll', revisar, { passive: true });

  marcar();
  revisar();
})();
