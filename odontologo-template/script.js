document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const area = this.querySelector('select').value;
    const message = `Hola Estudio Carlucci, mi nombre es ${name}. Mi teléfono es ${phone}. Me contacto por una consulta sobre: ${area}.`;

    // Fallback WhatsApp link (Replace with actual number)
    const waUrl = `https://wa.me/5491132677775?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
