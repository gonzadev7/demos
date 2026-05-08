document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const topic = this.querySelector('select').value;
    const message = `Hola Ana, mi nombre es ${name}. Mi teléfono es ${phone}. Quisiera consultar por un turno sobre: ${topic}.`;

    const waUrl = `https://wa.me/5491131991194?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
