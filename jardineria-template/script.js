// ====== FORM → WHATSAPP ======
document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const service = this.querySelector('select').value;
    const msg = `Hola, mi nombre es ${name} (tel: ${phone}). Quiero un presupuesto para: ${service}.`;
    window.open(`https://wa.me/5491112345678?text=${encodeURIComponent(msg)}`, '_blank');
});

// ====== NAVBAR SCROLL ======
window.addEventListener('scroll', () => {
    document.getElementById('navbar').style.boxShadow =
        window.scrollY > 60 ? '0 4px 30px rgba(0,0,0,0.5)' : 'none';
});

// ====== MOBILE NAV ======
const toggle = document.getElementById('navToggle');
const links = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
    const open = links.style.display === 'flex';
    links.style.display = open ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '60px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'rgba(13,43,13,0.98)';
    links.style.padding = '20px';
    links.style.gap = '18px';
    links.style.zIndex = '999';
});
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        if (window.innerWidth <= 768) links.style.display = 'none';
    });
});
