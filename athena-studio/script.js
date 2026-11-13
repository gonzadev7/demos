document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.top-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.8)';
        } else {
            header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.6)';
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
});
