// Catálogo basado en lo que Pilates Home publica en su catálogo de WhatsApp.
// Los equipos no tienen precio fijo (se cotizan por chat); los accesorios sí.
const ICONOS = {
  reformer: '<svg viewBox="0 0 120 60"><rect x="4" y="38" width="112" height="8" rx="4" fill="currentColor" opacity=".85"/><rect x="14" y="46" width="6" height="12" fill="currentColor"/><rect x="100" y="46" width="6" height="12" fill="currentColor"/><rect x="38" y="26" width="34" height="12" rx="5" fill="currentColor"/><rect x="8" y="22" width="20" height="16" rx="4" fill="currentColor" opacity=".5"/><path d="M82 38c0-8 6-8 6 0s6 8 6 0 6-8 6 0" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
  trapecio: '<svg viewBox="0 0 120 70"><rect x="6" y="48" width="108" height="8" rx="4" fill="currentColor" opacity=".85"/><rect x="10" y="8" width="5" height="40" fill="currentColor"/><rect x="105" y="8" width="5" height="40" fill="currentColor"/><rect x="10" y="8" width="100" height="5" fill="currentColor"/><path d="M60 13v18M44 13v14M76 13v14" stroke="currentColor" stroke-width="2"/></svg>',
  repuesto: '<svg viewBox="0 0 80 60"><path d="M10 30c0-14 14-14 14 0s14 14 14 0 14-14 14 0 14 14 14 0" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
  accesorio: '<svg viewBox="0 0 80 60"><circle cx="40" cy="30" r="20" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="40" cy="30" r="8" fill="currentColor" opacity=".4"/></svg>'
};

const CATEGORIAS = ['Todos', 'Equipos', 'Complementos', 'Repuestos', 'Accesorios'];

const PRODUCTOS = [
  { id: 'reformer', cat: 'Equipos', icono: 'reformer', foto: 'reformer.png', nombre: 'Reformer contemporáneo',
    desc: 'Cama reformer de pilates en madera de guatambú, ideal para clases particulares, salones profesionales o el hogar.',
    specs: ['Largo 2,45 m · ancho 68 cm · alto 35 cm', 'Peso 70 kg · resistencia 115 kg', '5 resortes de 48 cm, sogas, poleas y mordazas', 'Barra de 6 posiciones, tabla de pique y box de regalo'], precio: null },
  { id: 'trapecio-combinado', cat: 'Equipos', icono: 'trapecio', foto: 'trapecio-combinado.png', nombre: 'Trapecio combinado',
    desc: 'Equipo combinado con estructura metálica completa y todos los accesorios para trabajar en suspensión.',
    specs: ['Largo 2,40 m · ancho 69 cm · alto 60 cm', 'Capacidad 110 kg', '5 resortes + 8 resortes para trapecio', 'Cuerdas, manillares, lazos de pie y cinta de seguridad'], precio: null },
  { id: 'trapecio', cat: 'Equipos', icono: 'trapecio', foto: 'trapecio.png', nombre: 'Trapecio de pilates',
    desc: 'Estructura de madera maciza de guatambú con uniones machihembradas, estable y durable.',
    specs: ['Alto 220 cm · ancho 82 cm · largo 216 cm', 'Estructura de acero con bujes de polipropileno', '8 resortes de acero zincado de distintas intensidades'], precio: null },
  { id: 'ladel', cat: 'Complementos', icono: 'trapecio', foto: 'ladel.png', nombre: 'Ladel barrel',
    desc: 'Barril de pilates con escalera, en madera. Para trabajar flexibilidad y fuerza.', specs: ['Madera con tapizado en cuerina negra'], precio: null },
  { id: 'corrector', cat: 'Complementos', icono: 'trapecio', foto: 'corrector.png', nombre: 'Corrector espinal',
    desc: 'Arco corrector de columna para trabajar movilidad y extensión.', specs: ['Tapizado en cuerina negra'], precio: null },
  { id: 'anillo', cat: 'Accesorios', icono: 'accesorio', foto: 'anillo.png', nombre: 'Anillo de calistenia',
    desc: 'Anillo de madera de 1,5 m de largo.', specs: [], precio: 80000 },
  { id: 'rolo', cat: 'Accesorios', icono: 'accesorio', foto: 'rolo.png', nombre: 'Rolo de yoga 35 cm',
    desc: 'Rolo para trabajo de movilidad y relajación.', specs: [], precio: 29000 },
  { id: 'hamaca', cat: 'Accesorios', icono: 'accesorio', foto: 'hamaca.png', nombre: 'Hamaca aérea de yoga y pilates',
    desc: 'Hamaca para yoga y pilates aéreo.', specs: [], precio: 55000 }
];

PRODUCTOS.push({ id: 'repuestos', cat: 'Repuestos', icono: 'repuesto', foto: 'repuestos.png', nombre: 'Repuestos para tu equipo', desc: 'Piezas de reposición para reformer y trapecio. Cotizamos cada una según tu equipo.', specs: ['Resortes para reformer', 'Aro flex y bastón', 'Ruedas planas y cónicas', 'Roldanas y mordazas', 'Manillares de manos y pies', 'Antideslizante'], precio: null });

const pesos = n => '$' + n.toLocaleString('es-AR');
let filtro = 'Todos';
const carrito = {};

const $ = id => document.getElementById(id);

function dibujarFiltros() {
  $('filtros').innerHTML = CATEGORIAS.map(c => `<button class="chip ${c === filtro ? 'on' : ''}" data-cat="${c}">${c}</button>`).join('');
}

function tarjeta(p) {
  const precio = p.precio ? `<span class="p">${pesos(p.precio)}</span>` : `<span class="c">Consultar precio</span>`;
  const specs = p.specs.length ? `<ul class="specs">${p.specs.map(s => `<li>${s}</li>`).join('')}</ul>` : '';
  return `<article class="card">
    <div class="foto ${p.foto ? 'real' : ''}">${p.foto ? `<img src="${p.foto}" alt="${p.nombre}">` : ICONOS[p.icono]}</div>
    <h3>${p.nombre}</h3>
    <p class="desc">${p.desc}</p>
    ${specs}
    <div class="precio">${precio}<button class="add" data-add="${p.id}">Agregar al pedido</button></div>
  </article>`;
}

function dibujarGrilla() {
  const lista = PRODUCTOS.filter(p => filtro === 'Todos' || p.cat === filtro);
  $('grilla').innerHTML = lista.map(tarjeta).join('');
}

function dibujarCarrito() {
  const ids = Object.keys(carrito);
  const items = ids.map(id => ({ p: PRODUCTOS.find(x => x.id === id), q: carrito[id] }));
  const cant = items.reduce((a, i) => a + i.q, 0);
  $('contador').textContent = cant;
  $('listaCarrito').innerHTML = items.length ? items.map(({ p, q }) => `
    <div class="item">
      <div><b>${p.nombre}</b><div class="sub-p">${p.precio ? pesos(p.precio) + ' c/u' : 'A cotizar'}</div></div>
      <button class="quitar" data-quitar="${p.id}">Quitar</button>
      <div class="qty"><button data-menos="${p.id}">−</button><span>${q}</span><button data-mas="${p.id}">+</button></div>
    </div>`).join('') : '<p class="vacio">Todavía no agregaste nada.</p>';
  const total = items.reduce((a, { p, q }) => a + (p.precio ? p.precio * q : 0), 0);
  const aCotizar = items.filter(({ p }) => !p.precio).length;
  $('total').textContent = pesos(total);
  $('avisoCotizar').textContent = aCotizar ? `${aCotizar} producto${aCotizar > 1 ? 's' : ''} se cotiza${aCotizar > 1 ? 'n' : ''} por WhatsApp junto con el envío.` : '';
}

function abrir(abre) {
  $('carrito').hidden = !abre;
  $('velo').hidden = !abre;
}

document.addEventListener('click', e => {
  const t = e.target.closest('button');
  if (!t) return;
  if (t.dataset.cat) { filtro = t.dataset.cat; dibujarFiltros(); dibujarGrilla(); }
  if (t.dataset.add) { carrito[t.dataset.add] = (carrito[t.dataset.add] || 0) + 1; dibujarCarrito(); abrir(true); }
  if (t.dataset.mas) { carrito[t.dataset.mas]++; dibujarCarrito(); }
  if (t.dataset.menos) { carrito[t.dataset.menos]--; if (carrito[t.dataset.menos] <= 0) delete carrito[t.dataset.menos]; dibujarCarrito(); }
  if (t.dataset.quitar) { delete carrito[t.dataset.quitar]; dibujarCarrito(); }
});

$('abrirCarrito').addEventListener('click', () => abrir(true));
$('cerrarCarrito').addEventListener('click', () => abrir(false));
$('velo').addEventListener('click', () => abrir(false));
$('cerrarModal').addEventListener('click', () => { $('modal').hidden = true; });
$('btnContacto').addEventListener('click', e => e.preventDefault());

$('verMensaje').addEventListener('click', () => {
  const ids = Object.keys(carrito);
  let msg = 'Hola, quiero pedir presupuesto de:\n\n';
  if (!ids.length) msg += '(todavía no elegí productos)\n';
  ids.forEach(id => {
    const p = PRODUCTOS.find(x => x.id === id);
    msg += `• ${carrito[id]} x ${p.nombre}${p.precio ? ' (' + pesos(p.precio) + ' c/u)' : ''}\n`;
  });
  msg += '\nMi localidad: ____\n¿Me pasan precio, envío y tiempos? Gracias.';
  $('mensaje').textContent = msg;
  $('modal').hidden = false;
});

document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  const t = document.querySelector(a.getAttribute('href'));
  if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
}));

dibujarFiltros();
dibujarGrilla();
dibujarCarrito();
