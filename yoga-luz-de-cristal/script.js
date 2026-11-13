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
    ['Clases de yoga', 'Clases en grupo en el estudio, de mañana, de tarde y de noche. Como dice Tamara: Luz de Cristal yoga te ayuda a vivir mejor.', 'La primera clase es gratis.'],
    ['Instructorado de yoga', 'Te ayudamos a formarte como instructor de yoga, para transmitir este sagrado método. Es un instructorado intensivo que se cursa de noviembre a marzo.', 'Cursada presencial los miércoles de 19 a 21. También online o mixta.'],
    ['Talleres', 'Encuentros especiales además de las clases, como la iniciación en Reiki Usui y las experiencias con el sonido del didgeridoo, que invita a vibrar en nuestras raíces.', 'Consultá las próximas fechas.'],
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

  // El botón flotante del celular se esconde al llegar a la clase de prueba
  const flotante = document.querySelector('.flotante');
  const clase = document.getElementById('clase');
  const revisar = () => flotante.classList.toggle('oculta', clase.getBoundingClientRect().top < innerHeight * 0.8);
  window.addEventListener('scroll', revisar, { passive: true });

  marcar();
  revisar();
})();
