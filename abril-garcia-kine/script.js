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

  // Servicios: los de su destacada "Servicios"
  const SERVICIOS = [
    ['Neurorrehabilitación kinésica', 'Rehabilitación de personas con lesiones o enfermedades neurológicas, orientada a la tarea y a recuperar la mayor autonomía posible.', 'Con diplomatura en Neurorrehabilitación.'],
    ['Rehabilitación a domicilio', 'Las sesiones se hacen en tu casa, cuando moverse hasta un consultorio es difícil.', 'Para niños, adultos y adultos mayores.'],
    ['Lesiones traumatológicas y deportivas', 'Esguinces, desgarros, tendinopatías y otras lesiones, con un plan pensado para la vuelta a tu actividad y al deporte.', 'Desde noviembre también en Neuquén.'],
    ['Rehabilitación postquirúrgica', 'Acompañamiento después de una cirugía, para recuperar movilidad, fuerza y confianza paso a paso.', 'Con seguimiento continuo.'],
    ['Kinesiología preventiva en el adulto mayor', 'Trabajo de movilidad, fuerza y equilibrio para sostener la independencia en el día a día.', 'También a domicilio.'],
    ['Recuperación post entrenamiento', 'Regeneración muscular post entrenamiento y masaje deportivo, y acompañamiento a personas con molestias activas a la hora de entrenar.', 'Para quienes entrenan y quieren seguir haciéndolo.'],
  ];
  const tabs = [...document.querySelectorAll('[data-serv]')];
  const mostrar = i => {
    document.getElementById('panel-titulo').textContent = SERVICIOS[i][0];
    document.getElementById('panel-texto').textContent = SERVICIOS[i][1];
    document.getElementById('panel-quien').textContent = SERVICIOS[i][2];
    tabs.forEach((t, j) => t.setAttribute('aria-selected', String(j === i)));
  };
  tabs.forEach((t, i) => t.addEventListener('click', () => mostrar(i)));
  mostrar(0);

  // El botón flotante del celular se esconde al llegar a los turnos
  const flotante = document.querySelector('.flotante');
  const turno = document.getElementById('turno');
  const revisar = () => flotante.classList.toggle('oculta', turno.getBoundingClientRect().top < innerHeight * 0.8);
  window.addEventListener('scroll', revisar, { passive: true });

  marcar();
  revisar();
})();
