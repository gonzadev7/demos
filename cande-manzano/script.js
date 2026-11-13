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

// Índice: muestra el panel elegido (en celular se abre debajo del ítem, como acordeón)
const items = document.querySelectorAll('.indice-item');
const paneles = document.querySelectorAll('.panel');
const contenedor = document.querySelector('.indice-paneles');
const esCelular = () => window.innerWidth <= 900;

function ubicarPanel(item) {
    const panel = document.getElementById(item.dataset.panel);
    if (esCelular()) item.parentElement.appendChild(panel);
    else contenedor.appendChild(panel);
}

items.forEach(item => {
    item.addEventListener('click', () => {
        items.forEach(i => { i.classList.remove('activo'); i.setAttribute('aria-selected', false); });
        paneles.forEach(p => { p.classList.remove('activo'); p.hidden = true; });
        item.classList.add('activo');
        item.setAttribute('aria-selected', true);
        ubicarPanel(item);
        const panel = document.getElementById(item.dataset.panel);
        panel.classList.add('activo');
        panel.hidden = false;
        if (esCelular()) item.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const ubicarActivo = () => ubicarPanel(document.querySelector('.indice-item.activo'));
ubicarActivo();
window.addEventListener('resize', ubicarActivo);

// Botones de contacto: inactivos en la demo
const nota = document.getElementById('nota-contacto');
document.querySelectorAll('.js-contacto').forEach(btn => {
    if (btn.getAttribute('href') === '#consulta') return;
    btn.addEventListener('click', e => {
        e.preventDefault();
        nota.textContent = 'Esta es una demo: en la versión oficial este botón abre WhatsApp o Instagram.';
        nota.classList.add('resaltada');
        nota.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
});
