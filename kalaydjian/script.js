document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const area = this.querySelector('select').value;
    const message = `Hola Estudio Kalaydjian, mi nombre es ${name}. Mi teléfono es ${phone}. Quiero pedir mi asesoría inicial sin cargo sobre: ${area}.`;

    const waUrl = `https://wa.me/5491138029112?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
