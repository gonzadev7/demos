window.addEventListener('scroll', function () {
    const header = document.querySelector('.top-header');
    if (window.scrollY > 60) {
        header.style.background = '#0d0d0d';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.5)';
        header.querySelector('.logo h1').style.color = '#ffffff';
        header.querySelector('.logo p').style.color = '#5a5a30';
    } else {
        header.style.background = '#ffffff';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
        header.querySelector('.logo h1').style.color = '';
        header.querySelector('.logo p').style.color = '';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});
