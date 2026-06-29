document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const servicio = this.querySelector('select').value;
    const texto = `Hola! Te contacto desde tu web. Mi nombre es ${nombre}, mi teléfono es ${telefono} y quisiera consultar sobre: ${servicio}.`;

    document.getElementById('modal-texto-wa').dataset.texto = texto;
    document.getElementById('modal-selector').style.display = 'flex';
});

document.getElementById('btn-larotonda').addEventListener('click', function () {
    const texto = document.getElementById('modal-texto-wa').dataset.texto;
    window.open(`https://wa.me/5491158329182?text=${encodeURIComponent(texto)}`, '_blank');
    cerrarModal();
});

document.getElementById('btn-zoccole').addEventListener('click', function () {
    const texto = document.getElementById('modal-texto-wa').dataset.texto;
    window.open(`https://wa.me/5491151503793?text=${encodeURIComponent(texto)}`, '_blank');
    cerrarModal();
});

document.getElementById('btn-cerrar-modal').addEventListener('click', cerrarModal);

document.getElementById('modal-selector').addEventListener('click', function (e) {
    if (e.target === this) cerrarModal();
});

function cerrarModal() {
    document.getElementById('modal-selector').style.display = 'none';
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
