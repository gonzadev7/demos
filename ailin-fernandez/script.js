document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const area = this.querySelector('select').value;
    const message = `Hola Dra. Ailin Fernandez, mi nombre es ${name}. Mi teléfono es ${phone}. Me contacto por una consulta sobre: ${area}.`;

    // WhatsApp link for Dra. Ailin Fernandez
    const waUrl = `https://wa.me/5491156905442?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
