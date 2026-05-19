document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const topic = this.querySelector('select').value;
    const message = `Hola! Mi nombre es ${name}. Mi teléfono es ${phone}. Quisiera agendar una entrevista sobre: ${topic}.`;

    const waUrl = `https://wa.me/5491155157931?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
