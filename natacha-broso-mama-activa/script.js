(() => {
  const encabezado = document.getElementById('encabezado');
  const btnMenu = document.querySelector('.menu-btn');
  const nav = document.getElementById('nav');

  // Arranca sólido chocolate; al scrollear pasa a vidrio esmerilado
  const marcar = () => {
    const abierto = nav.classList.contains('abierto');
    encabezado.classList.toggle('solido', window.scrollY > 10 && !abierto);
    encabezado.classList.toggle('abierto', abierto);
  };
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

  // Índice con panel
  const etapas = [
    { t: 'Entrenar embarazada', p: 'Entrenamiento pensado para mujeres embarazadas, con Natacha, especialista en embarazo. Además hay talleres online exclusivos para embarazadas.', c: 'Próximo taller: Parto en movimiento, sábado 05/12.' },
    { t: 'Volver a moverte en el posparto', p: 'Clases online aptas posparto y clases personalizadas, para retomar el movimiento después de tener a tu bebé.', c: 'A distancia o presencial.' },
    { t: 'Abdominales hipopresivos y suelo pélvico', p: 'Trabajo específico de suelo pélvico y abdominales con técnica hipopresiva, uno de los ejes de Natacha.', c: 'Consultá nivel y modalidad.' }
  ];
  const tabs = document.querySelectorAll('[data-etapa]');
  const pintar = i => {
    tabs.forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    document.getElementById('panel-titulo').textContent = etapas[i].t;
    document.getElementById('panel-texto').textContent = etapas[i].p;
    document.getElementById('panel-cuando').textContent = etapas[i].c;
  };
  tabs.forEach((b, i) => b.addEventListener('click', () => pintar(i)));
  pintar(0);

  // Botones de contacto: en la demo solo muestran la nota
  document.querySelectorAll('[data-nota]').forEach(b => b.addEventListener('click', () => {
    const nota = b.nextElementSibling;
    nota.hidden = false;
    nota.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }));

  // Botón flotante (celular): aparece cuando el botón de la portada sale de pantalla y se esconde al llegar al cierre
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
