// Encabezado: arranca como la portada y toma color al hacer scroll
const encabezado = document.querySelector('.top');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const actualizarEncabezado = () => {
    encabezado.classList.toggle('solido', window.scrollY > 10 && !nav.classList.contains('abierta'));
};
window.addEventListener('scroll', actualizarEncabezado, { passive: true });
actualizarEncabezado();

// Menú en celular
menuBtn.addEventListener('click', () => {
    const abierta = nav.classList.toggle('abierta');
    menuBtn.setAttribute('aria-expanded', abierta);
    actualizarEncabezado();
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('abierta');
    menuBtn.setAttribute('aria-expanded', false);
    actualizarEncabezado();
}));

// Índice "¿Qué te molesta?" con panel
const tabs = document.querySelectorAll('.indice-lista button');
const paneles = document.querySelectorAll('.panel');
tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => { x.classList.remove('activo'); x.setAttribute('aria-selected', 'false'); });
    paneles.forEach(p => p.classList.remove('activo'));
    t.classList.add('activo');
    t.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(t.dataset.panel);
    panel.classList.add('activo');
    // En celular el panel queda debajo de la lista: bajamos hasta él
    const caja = document.querySelector('.indice-paneles');
    const r = caja.getBoundingClientRect();
    if (r.top < 72 || r.bottom > window.innerHeight) caja.scrollIntoView({ behavior: 'smooth', block: window.innerWidth <= 820 ? 'start' : 'center' });
}));

// Botones de contacto: inactivos en la demo
const nota = document.getElementById('nota-contacto');
document.querySelectorAll('.js-contacto').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        nota.textContent = 'Esta es una demo: en la versión oficial este botón abre WhatsApp.';
        nota.classList.add('resaltada');
        nota.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// Botón flotante en celular: se esconde al llegar al cierre
const flotante = document.querySelector('.flotante');
const cierre = document.querySelector('.cierre');
const hero = document.querySelector('.hero');
const ajustarFlotante = () => {
    const pasoHero = hero.getBoundingClientRect().bottom < 0;
    const enCierre = cierre.getBoundingClientRect().top < window.innerHeight;
    flotante.classList.toggle('visible', pasoHero && !enCierre);
};
window.addEventListener('scroll', ajustarFlotante, { passive: true });
ajustarFlotante();
