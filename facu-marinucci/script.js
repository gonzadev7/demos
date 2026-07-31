document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const servicio = this.querySelector('select').value;

    const mensaje = `Hola Facu, te escribo desde tu web. Soy ${nombre}, mi contacto es ${telefono} y me interesa consultar sobre: ${servicio}.`;

    document.getElementById('modal-mensaje').textContent = mensaje;
    document.getElementById('modal-overlay').style.display = 'flex';
});

document.getElementById('btn-copiar').addEventListener('click', function () {
    const texto = document.getElementById('modal-mensaje').textContent;
    navigator.clipboard.writeText(texto).then(() => {
        this.textContent = '¡Copiado!';
        setTimeout(() => { this.textContent = 'Copiar mensaje'; }, 2000);
    });
});

document.getElementById('btn-ir-ig').addEventListener('click', function () {
    window.open('https://ig.me/m/facumarinucci', '_blank');
    document.getElementById('modal-overlay').style.display = 'none';
});

document.getElementById('modal-overlay').addEventListener('click', function (e) {
    if (e.target === this) this.style.display = 'none';
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
