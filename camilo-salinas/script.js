document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const treatment = this.querySelector('select').value;
    const message = `Hola Od. Camilo, mi nombre es ${name}. Mi teléfono es ${phone}. Me interesa consultar sobre: ${treatment}.`;

    const waUrl = `https://wa.me/5491134826947?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
