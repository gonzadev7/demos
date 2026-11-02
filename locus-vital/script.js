// Encabezado: arranca claro (contrasta con la portada oscura) y al hacer scroll se funde con ella
const encabezado = document.querySelector('.top');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const actualizarEncabezado = () => {
    encabezado.classList.toggle('solido', window.scrollY > 60 || nav.classList.contains('abierta'));
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
