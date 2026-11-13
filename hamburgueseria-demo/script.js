// Forzar scroll al tope SOLO en la primera carga, nunca tras render dinámico
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
const products = [
    { id: 1, name: "Hamburguesa Clásica", price: 3500, description: "Carne vacuna, lechuga, tomate, queso, pepinillo y cebolla morada.", image: "https://media.istockphoto.com/id/1325880519/es/foto/cheeseburger-burger-patty-cl%C3%A1sico-sobre-tabla-r%C3%BAstica-de-madera.webp?a=1&b=1&s=612x612&w=0&k=20&c=qP4HYW8dQwhwJWTmRQpUByZQc8dr9Fet9Qmxm4W5Jfo=", category: "Clásicas" },
    { id: 2, name: "Hamburguesa Doble Queso", price: 4200, description: "Doble medallón, doble queso cheddar, pan artesanal.", image: "https://plus.unsplash.com/premium_photo-1679090867741-0da68ea94147?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEhhbWJ1cmd1ZXNhJTIwRG9ibGUlMjBRdWVzb3xlbnwwfHwwfHx8MA%3D%3D", category: "Clásicas" },
    { id: 3, name: "Hamburguesa BBQ", price: 4000, description: "Carne, panceta, cebolla crispy y salsa barbacoa.", image: "https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEhhbWJ1cmd1ZXNhJTIwQkJRfGVufDB8fDB8fHww", category: "Especiales" },
    { id: 4, name: "Hamburguesa Veggie", price: 3700, description: "Medallón de vegetales, lechuga, tomate y mayonesa vegana.", image: "https://plus.unsplash.com/premium_photo-1664648063548-50808d58f061?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8SGFtYnVyZ3Vlc2ElMjBWZWdnaWV8ZW58MHx8MHx8fDA%3D", category: "Veggie" },
    { id: 5, name: "Hamburguesa Picante", price: 4100, description: "Carne, jalapeños, queso, salsa picante y cebolla morada.", image: "https://plus.unsplash.com/premium_photo-1666830497610-c303d845474e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SGFtYnVyZ3Vlc2ElMjBQaWNhbnRlfGVufDB8fDB8fHww", category: "Especiales" },
    { id: 6, name: "Hamburguesa Pollo Crispy", price: 3900, description: "Filet de pollo rebozado, lechuga, tomate y mayonesa.", image: "https://media.istockphoto.com/id/1449602051/es/foto/primer-plano-de-una-hamburguesa-en-una-mano-femenina-sobre-un-fondo-azul.webp?a=1&b=1&s=612x612&w=0&k=20&c=i6kkYiSWGBh6m5F3FOQFO42ipZ16t7Y85kqzm6zm-n4=", category: "Pollo" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartSidebar = document.getElementById('cart-sidebar');
const cartIcon = document.getElementById('cart-icon');
const closeCart = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const imageModal = document.getElementById('image-modal');
const closeModal = document.querySelector('.close-modal');
const categorySelect = document.getElementById('category-select');

// Renderizar productos con filtro de categoría
function renderProducts(category = 'all') {
    const spinner = document.getElementById('spinner');
    if (spinner) spinner.style.display = 'flex';
    setTimeout(() => {
        let filtered = products;
        if (category !== 'all') {
            filtered = products.filter(p => p.category === category);
        }
        productList.innerHTML = filtered.map(product => `
            <div class="product-card">
                <div class="product-img-container" onclick="openImageModal('${product.image}')">
                    <img src="${product.image}" alt="${product.name}" class="product-img-real" loading="lazy" />
                </div>
                <div class="product-info">
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                    <div>
                        <p class="price">$${product.price.toLocaleString('es-AR')}</p>
                        <button class="btn-add" onclick="addToCart(${product.id})">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `).join('');
        if (spinner) spinner.style.display = 'none';
        // Solo hacer scroll al primer producto si NO es la carga inicial
        if (!window.__initialLoadDone) {
            window.__initialLoadDone = true;
        } else {
            const firstProduct = productList.querySelector('.product-card');
            if (firstProduct) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const cardRect = firstProduct.getBoundingClientRect();
                const absoluteY = window.scrollY + cardRect.top;
                window.scrollTo({
                    top: absoluteY - headerHeight - 16, // 16px de margen extra
                    behavior: 'smooth'
                });
                firstProduct.classList.add('highlight-product');
                setTimeout(() => {
                    firstProduct.classList.remove('highlight-product');
                }, 900);
            }
        }
    }, 500);
}

if (categorySelect) {
    categorySelect.onchange = function() {
        renderProducts(this.value);
        // Scroll suave a la sección de productos
        const productsSection = document.getElementById('product-list');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
}

// Agregar al carrito
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    showToast();
};

function showToast() {
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

// Actualizar carrito
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    cartTotal.innerText = total.toLocaleString('es-AR');
    cartCount.innerText = count;
}

// Renderizar items del carrito
function renderCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toLocaleString('es-AR')} x ${item.quantity}</p>
            </div>
            <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:red; cursor:pointer;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
};

// Abrir/Cerrar Carrito
function openCart() {
    cartSidebar.classList.add('active');
}

cartIcon.onclick = openCart;
closeCart.onclick = () => cartSidebar.classList.remove('active');

// Modal de Imagen
window.openImageModal = function(imageUrl) {
    const modalContent = document.querySelector('.modal-content');
    const placeholder = modalContent.querySelector('.placeholder-img');
    if (imageUrl) {
        placeholder.innerHTML = `<img src="${imageUrl}" alt="Hamburguesa" style="max-width:100%; max-height:280px; border-radius:10px;" />`;
    } else {
        placeholder.innerHTML = 'AQUÍ VA LA IMAGEN DE LA HAMBURGUESA';
    }
    imageModal.style.display = "block";
}

closeModal.onclick = () => {
    imageModal.style.display = "none";
    // Restaurar placeholder
    document.querySelector('.placeholder-img').innerHTML = 'AQUÍ VA LA IMAGEN DE LA HAMBURGUESA';
};
window.onclick = (event) => {
    if (event.target == imageModal) {
        imageModal.style.display = "none";
        document.querySelector('.placeholder-img').innerHTML = 'AQUÍ VA LA IMAGEN DE LA HAMBURGUESA';
    }
}

// Ir al Checkout
checkoutBtn.onclick = () => {
    if (cart.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }
    window.location.href = 'checkout.html';
};

// Inicializar
renderProducts();
updateCart();
