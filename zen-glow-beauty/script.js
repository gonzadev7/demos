document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.top-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(125,151,112,0.18)';
        } else {
            header.style.boxShadow = '0 2px 12px rgba(125,151,112,0.08)';
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
});

document.getElementById('btn-contacto').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('nota-contacto').textContent =
        'Esta es una demo: en la versión oficial este botón abre WhatsApp.';
});
