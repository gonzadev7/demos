document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const area = this.querySelector('select').value;
    const message = `Hola Dr. Ballarena, mi nombre es ${name}. Mi teléfono es ${phone}. Me contacto por una consulta sobre: ${area}.`;

    const waUrl = `https://wa.me/[NUMERO_WA]?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
