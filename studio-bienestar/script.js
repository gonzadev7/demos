document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = this.querySelector('input[type="text"]').value.trim();
    const telefono = this.querySelector('input[type="tel"]').value.trim();
    const servicio = this.querySelector('select').value;

    const texto = `Hola Laura! Te contacto desde la web. Mi nombre es ${nombre}, mi teléfono es ${telefono} y quisiera consultar sobre: ${servicio}.`;
    const url = `https://wa.me/5491158211372?text=${encodeURIComponent(texto)}`;

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
const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const visibleCount = window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
let carouselIndex = 0;

function getVisible() {
    return window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
}

function moveCarousel(dir) {
    const visible = getVisible();
    const max = carouselItems.length - visible;
    carouselIndex = Math.max(0, Math.min(carouselIndex + dir, max));
    const itemWidth = carouselItems[0].offsetWidth + 12;
    track.style.transform = `translateX(-${carouselIndex * itemWidth}px)`;
}

document.getElementById('carousel-prev').addEventListener('click', () => moveCarousel(-1));
document.getElementById('carousel-next').addEventListener('click', () => moveCarousel(1));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const allImgs = Array.from(document.querySelectorAll('.carousel-item img'));
let current = 0;

function openLightbox(index) {
    current = index;
    lightboxImg.src = allImgs[current].src;
    lightboxImg.alt = allImgs[current].alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function lbPrev() {
    current = (current - 1 + allImgs.length) % allImgs.length;
    lightboxImg.src = allImgs[current].src;
}

function lbNext() {
    current = (current + 1) % allImgs.length;
    lightboxImg.src = allImgs[current].src;
}

allImgs.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev').addEventListener('click', lbPrev);
document.getElementById('lightbox-next').addEventListener('click', lbNext);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lbPrev();
    if (e.key === 'ArrowRight') lbNext();
});
