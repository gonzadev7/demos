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

  // Clases: índice con panel
  const CLASES = [
    ['Reformer', 'La clase central de Cala: trabajo en la máquina, con la guía de la profe y a tu ritmo.', 'De lunes a viernes, mañana y tarde. Mirá la grilla.'],
    ['Avanzado', 'Para quienes ya vienen entrenando y quieren ir un paso más allá.', 'Lunes, miércoles y viernes a las 10. Lunes a las 20.'],
    ['Power', 'Una clase con otro ritmo, para cuando querés más intensidad.', 'Martes y jueves a las 16.'],
    ['Pilates postural', 'Una clase para prestarle atención a tu postura y a cada movimiento.', 'Sábados a las 9, 10 y 11.'],
    ['Yoga', 'Ese momento para soltar el ruido del día y conectar con tu cuerpo.', 'Consultá los horarios al reservar.'],
  ];
  const tabs = [...document.querySelectorAll('[data-clase]')];
  const mostrar = i => {
    document.getElementById('panel-titulo').textContent = CLASES[i][0];
    document.getElementById('panel-texto').textContent = CLASES[i][1];
    document.getElementById('panel-cuando').textContent = CLASES[i][2];
    tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === i)));
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => mostrar(i)));
  mostrar(0);

  // Grilla de noviembre, copiada del posteo de Cala (R reformer, A avanzado, W power, P postural)
  const GRILLA = [
    ['8', 'R R R R R -'], ['9', 'R R R R R P'], ['10', 'A R A R A P'], ['11', 'R R R R R P'],
    ['12', 'R R R R R -'], ['13', 'R R - R R -'], ['15', '- R - R - -'], ['16', '- W - W - -'],
    ['17', 'R R R R - -'], ['18', 'R R R R R -'], ['19', 'R R R R R -'], ['20', 'A R - R R -'],
  ];
  const NOMBRE = { R: 'Reformer', A: 'Avanzado', W: 'Power', P: 'Pilates postural' };
  document.getElementById('grilla-cuerpo').innerHTML = GRILLA.map(([h, f]) =>
    `<tr><th scope="row">${h}</th>${f.split(' ').map(c => c === '-' ? '<td></td>'
      : `<td><i class="k ${c.toLowerCase()}" title="${NOMBRE[c]}" aria-label="${NOMBRE[c]}">${c}</i></td>`).join('')}</tr>`).join('');

  // El botón flotante del celular se esconde al llegar a las reservas
  const flotante = document.querySelector('.flotante');
  const turnos = document.getElementById('turnos');
  const revisar = () => flotante.classList.toggle('oculta', turnos.getBoundingClientRect().top < innerHeight * 0.8);
  window.addEventListener('scroll', revisar, { passive: true });

  marcar();
  revisar();
})();
