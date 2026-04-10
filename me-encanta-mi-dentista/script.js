document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const tratamiento = this.querySelector('select').value;
    const message = `Hola Me Encanta Mi Dentista, mi nombre es ${name}. Mi teléfono es ${phone}. Me interesa saber más sobre: ${tratamiento}.`;

    const waUrl = `https://wa.me/5491160532880?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
