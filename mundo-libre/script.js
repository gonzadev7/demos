document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const servicio = this.querySelector('select').value;

    const texto = `Hola Marina! Te contacto desde la web de Mundo Libre. Mi nombre es ${nombre}, mi teléfono es ${telefono} y quisiera consultar sobre: ${servicio}.`;
    const url = `https://wa.me/5492314414345?text=${encodeURIComponent(texto)}`;

    window.open(url, '_blank');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Carousel
const track = document.getElementById('carousel-track');
const items = track ? track.querySelectorAll('.carousel-item') : [];
let currentIndex = 0;

function getVisible() {
    return window.innerWidth <= 768 ? 1 : 3;
}

function updateCarousel() {
    if (!track || items.length === 0) return;
    const itemWidth = items[0].offsetWidth + 16;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

document.getElementById('carousel-prev')?.addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; updateCarousel(); }
});

document.getElementById('carousel-next')?.addEventListener('click', () => {
    const visible = getVisible();
    if (currentIndex < items.length - visible) { currentIndex++; updateCarousel(); }
});

window.addEventListener('resize', updateCarousel);

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
let lbIndex = 0;
const galleryImgs = Array.from(items).map(i => i.querySelector('img'));

function openLightbox(index) {
    lbIndex = index;
    lbImg.src = galleryImgs[lbIndex].src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

galleryImgs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
});

document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);

document.getElementById('lightbox-prev')?.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + galleryImgs.length) % galleryImgs.length;
    lbImg.src = galleryImgs[lbIndex].src;
});

document.getElementById('lightbox-next')?.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % galleryImgs.length;
    lbImg.src = galleryImgs[lbIndex].src;
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') { lbIndex = (lbIndex - 1 + galleryImgs.length) % galleryImgs.length; lbImg.src = galleryImgs[lbIndex].src; }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % galleryImgs.length; lbImg.src = galleryImgs[lbIndex].src; }
});
