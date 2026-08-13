document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const servicio = this.querySelector('select').value;

    const texto = `Hola Karina! Te contacto desde la web de Pasion Fitness. Mi nombre es ${nombre}, mi teléfono es ${telefono} y quisiera consultar sobre: ${servicio}.`;
    const url = `https://wa.me/5491154928831?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
});

// Carousel galería
(function () {
    const track    = document.querySelector('.galeria-track');
    const wrapper  = document.querySelector('.galeria-wrapper');
    const prevBtn  = document.querySelector('.galeria-prev');
    const nextBtn  = document.querySelector('.galeria-next');
    const dotsEl   = document.querySelector('.galeria-dots');
    const items    = Array.from(track.querySelectorAll('.galeria-item'));
    const TOTAL    = items.length;
    let current    = 0;

    function visible() { return window.innerWidth >= 768 ? 3 : 1; }
    function maxIdx()  { return TOTAL - visible(); }

    function buildDots() {
        dotsEl.innerHTML = '';
        const pages = Math.ceil(TOTAL / visible());
        for (let i = 0; i < pages; i++) {
            const d = document.createElement('button');
            d.className = 'galeria-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', 'Ir a página ' + (i + 1));
            d.addEventListener('click', () => goTo(i * visible()));
            dotsEl.appendChild(d);
        }
    }

    function updateDots() {
        const v   = visible();
        const idx = Math.round(current / v);
        dotsEl.querySelectorAll('.galeria-dot').forEach((d, i) => {
            d.classList.toggle('active', i === idx);
        });
    }

    function goTo(idx) {
        current = Math.max(0, Math.min(idx, maxIdx()));
        const itemW = items[0].getBoundingClientRect().width + 12;
        track.style.transform = `translateX(-${current * itemW}px)`;
        prevBtn.disabled = current === 0;
        nextBtn.disabled = current >= maxIdx();
        updateDots();
    }

    prevBtn.addEventListener('click', () => goTo(current - visible()));
    nextBtn.addEventListener('click', () => goTo(current + visible()));

    window.addEventListener('resize', () => { buildDots(); goTo(0); });

    buildDots();
    goTo(0);
})();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
