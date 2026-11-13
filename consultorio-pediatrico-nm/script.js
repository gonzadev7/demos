// Encabezado: arranca como la portada y toma color al hacer scroll
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

// Etapas: índice con panel
const items = document.querySelectorAll('.indice-item');
const paneles = document.querySelectorAll('.panel');
items.forEach(item => item.addEventListener('click', () => {
    items.forEach(o => {
        const activo = o === item;
        o.classList.toggle('activo', activo);
        o.setAttribute('aria-selected', activo);
    });
    paneles.forEach(p => { p.hidden = p.dataset.i !== item.dataset.i; });
    // En celular el panel queda debajo de la lista: se lo trae a la vista
    if (window.innerWidth <= 860) {
        document.querySelector('.panel:not([hidden])').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}));

// Botones de contacto: inactivos en la demo
const nota = document.getElementById('nota-contacto');
document.querySelectorAll('.js-contacto').forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        nota.textContent = 'Esta es una demo: en la versión oficial este botón abre WhatsApp o Instagram.';
        nota.classList.add('resaltada');
        nota.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
