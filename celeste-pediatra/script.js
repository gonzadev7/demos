document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const servicio = this.querySelector('select').value;
    const texto = `Hola Celeste! Te contacto desde tu web. Mi nombre es ${nombre}, mi teléfono es ${telefono} y quisiera consultar sobre: ${servicio}.`;
    window.open(`https://wa.me/5492213998561?text=${encodeURIComponent(texto)}`, '_blank');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
