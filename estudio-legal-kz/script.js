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

window.addEventListener('scroll', function () {
    const header = document.querySelector('.top-header');
    if (window.scrollY > 60) {
        header.style.background = '#101e60';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        header.querySelector('.logo h1').style.color = '#ffffff';
        header.querySelector('.logo p').style.color = '#a8b8d8';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)';
        header.querySelector('.logo h1').style.color = '';
        header.querySelector('.logo p').style.color = '';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
