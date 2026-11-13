// Encabezado: arranca sólido y pasa a vidrio esmerilado al hacer scroll
const encabezado = document.querySelector('.top');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const actualizarEncabezado = () => {
    encabezado.classList.toggle('solido', window.scrollY > 10 || nav.classList.contains('abierta'));
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

// Índice "¿Desde dónde llegás?": botones y paneles
const tabs = document.querySelectorAll('.indice-lista button');
const paneles = document.querySelectorAll('.panel');
tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => { t.classList.remove('activo'); t.setAttribute('aria-selected', 'false'); });
    paneles.forEach(p => { p.hidden = true; p.classList.remove('activo'); });
    tab.classList.add('activo');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById(tab.getAttribute('aria-controls'));
    panel.hidden = false;
    panel.classList.add('activo');
}));

// Botones de contacto: inactivos en la demo
const nota = document.getElementById('nota-contacto');
document.querySelectorAll('.js-contacto').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        nota.textContent = 'Los botones de contacto se activan cuando arrancamos con la versión oficial.';
        nota.classList.add('resaltada');
        nota.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});

// Botón flotante (celular): se esconde al llegar a la sección de contacto
const flotante = document.getElementById('flotante');
const contacto = document.getElementById('contacto');
if (flotante && contacto && 'IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => flotante.classList.toggle('oculto', e.isIntersecting), { threshold: 0.05 }).observe(contacto);
}
