document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.top-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(160,120,80,0.18)';
        } else {
            header.style.boxShadow = '0 2px 12px rgba(160,120,80,0.08)';
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
});
