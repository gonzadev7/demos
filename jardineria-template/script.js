// ====== BEFORE/AFTER SLIDER ======
function initSlider(sliderId, beforeId, handleId) {
    const slider = document.getElementById(sliderId);
    const before = document.getElementById(beforeId);
    const handle = document.getElementById(handleId);
    let dragging = false;

    function setPosition(x) {
        const rect = slider.getBoundingClientRect();
        let pct = (x - rect.left) / rect.width;
        pct = Math.min(Math.max(pct, 0.02), 0.98);
        const pctRight = (1 - pct) * 100;
        before.style.clipPath = `inset(0 ${pctRight}% 0 0)`;
        handle.style.left = `${pct * 100}%`;
    }

    handle.addEventListener('mousedown', () => dragging = true);
    slider.addEventListener('mousedown', (e) => { dragging = true; setPosition(e.clientX); });
    window.addEventListener('mousemove', (e) => { if (dragging) setPosition(e.clientX); });
    window.addEventListener('mouseup', () => dragging = false);

    // Touch
    handle.addEventListener('touchstart', () => dragging = true, { passive: true });
    slider.addEventListener('touchstart', (e) => { dragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchmove', (e) => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
    window.addEventListener('touchend', () => dragging = false);
}

initSlider('slider1', 'before1', 'handle1');
initSlider('slider2', 'before2', 'handle2');

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
