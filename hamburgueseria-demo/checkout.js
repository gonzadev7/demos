const cart = JSON.parse(localStorage.getItem('cart')) || [];
const summaryItems = document.getElementById('summary-items');
const summaryTotal = document.getElementById('summary-total');
const checkoutForm = document.getElementById('checkout-form');
const entregaSelect = document.getElementById('entrega');
const direccionGroup = document.getElementById('direccion-group');
const direccionInput = document.getElementById('direccion');
const pago = document.getElementById('pago');
const pagoEfectivoGroup = document.getElementById('pago-efectivo-group');
const pagoEfectivoInput = document.getElementById('pago-efectivo');
function actualizarCampoEfectivo() {
    if (
        entregaSelect.value === 'envio' &&
        pago.value === 'Efectivo'
    ) {
        pagoEfectivoGroup.classList.remove('hidden');
        pagoEfectivoInput.required = true;
    } else {
        pagoEfectivoGroup.classList.add('hidden');
        pagoEfectivoInput.required = false;
        pagoEfectivoInput.value = '';
    }
    renderSummary();
}

if (pago) {
    pago.onchange = actualizarCampoEfectivo;
    pagoEfectivoInput.oninput = function() {
        renderSummary();
    };
}
if (entregaSelect) {
    entregaSelect.onchange = () => {
        if (entregaSelect.value === 'envio') {
            direccionGroup.classList.remove('hidden');
            direccionInput.required = true;
        } else {
            direccionGroup.classList.add('hidden');
            direccionInput.required = false;
        }
        actualizarCampoEfectivo();
    };
}

// Mostrar resumen
function renderSummary() {
    if (cart.length === 0) {
        window.location.href = 'index.html';
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Actualizar el mínimo del campo de efectivo
    if (pagoEfectivoInput) {
        pagoEfectivoInput.min = total;
    }

    summaryItems.innerHTML = cart.map(item => `
        <p>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toLocaleString('es-AR')}</p>
    `).join('');
    summaryTotal.innerText = total.toLocaleString('es-AR');
}

// Mostrar/Ocultar dirección según método de entrega
entregaSelect.onchange = () => {
    if (entregaSelect.value === 'envio') {
        direccionGroup.classList.remove('hidden');
        direccionInput.required = true;
    } else {
        direccionGroup.classList.add('hidden');
        direccionInput.required = false;
        // Si es retiro en local, ocultar campo de efectivo
        if (pagoEfectivoGroup) {
            pagoEfectivoGroup.classList.add('hidden');
            pagoEfectivoInput.required = false;
            pagoEfectivoInput.value = '';
        }
    }
    renderSummary();
};

// Manejar envío
checkoutForm.onsubmit = (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const entrega = entregaSelect.value;
    const direccion = direccionInput.value;
    const notas = document.getElementById('notas').value;
    const pagoValor = pago.value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let vuelto = 0;
    let pagoEfectivo = '';
    if (pagoValor === 'Efectivo') {
        pagoEfectivo = parseInt(document.getElementById('pago-efectivo').value, 10) || 0;
        vuelto = pagoEfectivo > total ? pagoEfectivo - total : 0;
    }

    // Formatear mensaje para WhatsApp
    let mensaje = `*Nuevo Pedido - TuBurguer*\n\n`;
    mensaje += `*Cliente:* ${nombre}\n`;
    mensaje += `*Entrega:* ${entrega === 'envio' ? 'Envío a Domicilio' : 'Retiro en Local'}\n`;
    if (entrega === 'envio') mensaje += `*Dirección:* ${direccion}\n`;
    mensaje += `*Pago:* ${pagoValor}\n`;
    if (notas && notas.trim() !== "") {
        mensaje += `*Observaciones:* ${notas.trim()}\n`;
    }
    if (pagoValor === 'Efectivo') {
        mensaje += `*Pagás con:* $${pagoEfectivo.toLocaleString('es-AR')}\n`;
        mensaje += `*Vuelto:* $${vuelto.toLocaleString('es-AR')}\n`;
    }
    mensaje += `*Productos:*\n`;

    cart.forEach(item => {
        mensaje += `- ${item.name} x ${item.quantity}: $${(item.price * item.quantity).toLocaleString('es-AR')}\n`;
    });

    mensaje += `\n*TOTAL: $${total.toLocaleString('es-AR')}*`;

    // Codificar para URL
    const encodedMensaje = encodeURIComponent(mensaje);
    const numeroWhatsApp = "5491122739810"; // Tu número de WhatsApp
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodedMensaje}`;

    // Limpiar carrito y redirigir
    localStorage.removeItem('cart');
    window.open(url, '_blank');
    window.location.href = 'index.html';
};

renderSummary();
