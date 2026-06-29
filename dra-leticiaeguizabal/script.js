document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const consulta = this.querySelector('select').value;

    const texto = `Hola Dra. Leticia! Me contacto desde su web. Mi nombre es ${nombre}, mi teléfono es ${telefono} y quisiera consultar sobre: ${consulta}.`;
    const url = `https://wa.me/5493534220909?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
