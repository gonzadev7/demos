document.getElementById('lead-form').addEventListener('submit', function (e) {
    e.preventDefault();
    document.getElementById('form-nota').textContent =
        'Gracias. Esta es una demo: en la versión oficial tu consulta llega por WhatsApp.';
});
