document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    window.open('https://ig.me/m/facumarinucci', '_blank');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
