// Form → WhatsApp
document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const area = this.querySelector('select').value;
    const message = `Hola Andrés, mi nombre es ${name}. Mi teléfono es ${phone}. Me contacto por una consulta sobre: ${area}.`;
    window.open(`https://wa.me/5491151071484?text=${encodeURIComponent(message)}`, '_blank');
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 60) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Mobile nav toggle
document.getElementById('navToggle').addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '60px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(2,6,23,0.98)';
    links.style.padding = '20px';
    links.style.gap = '18px';
    links.style.zIndex = '999';
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const links = document.querySelector('.nav-links');
        if (window.innerWidth <= 768) links.style.display = 'none';
    });
});
