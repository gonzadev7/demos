// ✏️ Reemplazar [NUMERO_WA] por el número real (ej: 5491134826947)
// ✏️ Reemplazar [NOMBRE] por el nombre del odontólogo

document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const treatment = this.querySelector('select').value;
    const message = `Hola Od. [NOMBRE], mi nombre es ${name}. Mi teléfono es ${phone}. Me interesa consultar sobre: ${treatment}.`;

    const waUrl = `https://wa.me/[NUMERO_WA]?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
