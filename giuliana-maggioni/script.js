document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.top-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(42,154,154,0.2)';
        } else {
            header.style.boxShadow = '0 2px 12px rgba(42,154,154,0.1)';
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
});
