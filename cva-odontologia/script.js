document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const treatment = this.querySelector('select').value;
    const message = `Hola CVA Odontología, mi nombre es ${name}. Mi teléfono es ${phone}. Quisiera consultar sobre: ${treatment}.`;

    const waUrl = `https://wa.me/5491170658874?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
});
