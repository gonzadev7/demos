// Lightbox
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<button class="lightbox-close" aria-label="Cerrar">&times;</button><img src="" alt="Imagen ampliada">';
document.body.appendChild(lightbox);

const lbImg = lightbox.querySelector('img');
const lbClose = lightbox.querySelector('.lightbox-close');

document.querySelectorAll('.servicio-img[data-img]').forEach(el => {
    el.addEventListener('click', () => {
        lbImg.src = el.dataset.img;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

lbClose.addEventListener('click', e => { e.stopPropagation(); closeLightbox(); });
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Header
const header = document.getElementById('main-header');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
    });
});
