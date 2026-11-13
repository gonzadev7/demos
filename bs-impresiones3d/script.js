document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const producto = this.querySelector('select').value;

    const texto = `Hola BS Impresiones! Vi su web y quiero pedir un presupuesto. Mi nombre es ${nombre}, mi WhatsApp es ${telefono} y necesito: ${producto}.`;
    const url = `https://wa.me/5492478559142?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
});

window.addEventListener('scroll', function () {
    const header = document.querySelector('.top-header');
    if (window.scrollY > 60) {
        header.style.background = '#041414';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
        header.querySelector('.logo h1').style.color = '#ffffff';
        header.querySelector('.logo p').style.color = '#3a7878';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 2px 12px rgba(13,128,128,0.1)';
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
