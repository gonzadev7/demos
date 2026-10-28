// Menú en celular
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
menuBtn.addEventListener('click', () => {
    const abierta = nav.classList.toggle('abierta');
    menuBtn.setAttribute('aria-expanded', abierta);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('abierta');
    menuBtn.setAttribute('aria-expanded', false);
}));

// Índice de tratamientos: muestra el panel elegido
const items = document.querySelectorAll('.indice-item');
const paneles = document.querySelectorAll('.panel');
items.forEach(item => {
    item.addEventListener('click', () => {
        items.forEach(i => { i.classList.remove('activo'); i.setAttribute('aria-selected', false); });
        paneles.forEach(p => { p.classList.remove('activo'); p.hidden = true; });
        item.classList.add('activo');
        item.setAttribute('aria-selected', true);
        const panel = document.getElementById(item.dataset.panel);
        panel.classList.add('activo');
        panel.hidden = false;
        if (window.innerWidth <= 900) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
});

// Botones de contacto: inactivos en la demo
const nota = document.getElementById('nota-contacto');
document.querySelectorAll('.js-contacto').forEach(btn => {
    if (btn.getAttribute('href') === '#turnos') return;
    btn.addEventListener('click', e => {
        e.preventDefault();
        nota.textContent = 'Esta es una demo: en la versión oficial este botón abre WhatsApp o Instagram.';
        nota.classList.add('resaltada');
    });
});
