document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const servicio = this.querySelector('select').value;

    const texto = `Hola! Quisiera reservar un turno. Mi nombre es ${nombre}, mi WhatsApp es ${telefono} y me interesa: ${servicio}.`;
    const url = `https://wa.me/5491178937382?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('.top-header');
    if (window.scrollY > 60) {
        header.style.background = '#2a1410';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
        header.querySelector('.logo h1').style.color = '#ffffff';
        header.querySelector('.logo p').style.color = '#9a6858';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 2px 12px rgba(200,128,106,0.1)';
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
