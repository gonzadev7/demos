document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.top-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.style.background = 'var(--white)';
            header.style.boxShadow = '0 4px 20px rgba(160,120,80,0.15)';
        } else {
            header.classList.remove('scrolled');
            header.style.background = 'transparent';
            header.style.boxShadow = 'none';
        }
    });
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
        });
    });
});
