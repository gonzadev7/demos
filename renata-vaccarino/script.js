document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.top-header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(194,24,91,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(194,24,91,0.08)';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
