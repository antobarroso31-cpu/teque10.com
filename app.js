/**
 * TEQUEÑÍSIMOS GOURMET - APP & E-COMMERCE LOGIC
 * Full Interactive Store, Combo Builder, Cart, and WhatsApp Order Integration
 */

// Configuration: Store WhatsApp phone number (format: country code + number, e.g. 584121234567)
const STORE_CONFIG = {
  name: "Tequeñísimos Artesanal",
  whatsappNumber: "584121234567", // Cambia este número por el tuyo para recibir pedidos directamente
  currency: "$",
  deliveryFee: 2.50,
  freeDeliveryThreshold: 25.00,
  promoCodes: {
    "TEQUE10": 0.10, // 10% de descuento
    "FIESTA": 0.15   // 15% de descuento
  }
};

// Catalog Products
const PRODUCTS = [
  {
    id: "teq-clasico",
    name: "Tequeños Tradicionales de Queso Llanero",
    category: "clasicos",
    price: 8.00,
    price25: 15.00,
    price50: 28.00,
    image: "assets/images/clasicos.jpg",
    badge: "El Más Vendido ⭐",
    badgeClass: "",
    description: "Masa hojaldrada crujiente rellena con abundante queso blanco llanero artesanal semiduro con el punto exacto de sal.",
    ingredients: "Harina de trigo premium, queso llanero pasteurizado, mantequilla artesanal, toque de azúcar de caña.",
    airfryerTime: "7-8 min a 180°C (360°F)",
    popular: true
  },
  {
    id: "teq-guayaba",
    name: "Tequeños de Guayaba y Queso (Doble Placer)",
    category: "dulces",
    price: 9.50,
    price25: 17.50,
    price50: 32.00,
    image: "assets/images/guayaba.jpg",
    badge: "Doble Relleno 🍓",
    badgeClass: "sweet",
    description: "La combinación dulce y salada perfecta: pasta de guayaba criolla suave y queso blanco derretido en cada bocado.",
    ingredients: "Harina de trigo, queso llanero, bocadillo de guayaba pura 100% natural, mantequilla.",
    airfryerTime: "6-7 min a 180°C (360°F)",
    popular: true
  },
  {
    id: "teq-chocolate",
    name: "Tequeños de Chocolate Nutella & Avellanas",
    category: "dulces",
    price: 10.00,
    price25: 19.00,
    price50: 35.00,
    image: "assets/images/chocolate.jpg",
    badge: "Gourmet Dulce 🍫",
    badgeClass: "sweet",
    description: "Masa crujiente espolvoreada con azúcar nevada y rellena de abundante crema de avellanas con cacao derretido.",
    ingredients: "Crema de cacao y avellanas tipo Nutella, masa fina semi-dulce, mantequilla, esencia de vainilla.",
    airfryerTime: "5-6 min a 175°C (350°F)",
    popular: true
  },
  {
    id: "teq-bacon",
    name: "Tequeños de Tocineta Ahumada & Cheddar",
    category: "especiales",
    price: 10.50,
    price25: 19.50,
    price50: 36.00,
    image: "assets/images/bacon.jpg",
    badge: "Edición Especial 🥓",
    badgeClass: "",
    description: "Rellenos con queso llanero fundido, cheddar madurado y crujientes trozos de tocineta ahumada en leña.",
    ingredients: "Tocineta ahumada crocante, queso cheddar fundido, queso blanco tradicional, masa hojaldrada.",
    airfryerTime: "7-8 min a 180°C (360°F)",
    popular: true
  },
  {
    id: "combo-fiesta-box",
    name: "Caja Fiesta Platter (30 Tequeños + 3 Salsas)",
    category: "combos",
    price: 22.00,
    price25: 22.00,
    price50: 38.00,
    image: "assets/images/combo.jpg",
    badge: "Pack Fiesta 🥳",
    badgeClass: "combo",
    description: "Bandeja para celebraciones con 30 tequeños mixtos (queso, guayaba y tocineta) acompañada de 3 salsas artesanales a elección.",
    ingredients: "Surtido variado con salsas: Guasacaca criolla, tártara de ajo y salsa rosada.",
    airfryerTime: "Listos en 8 min en tandas",
    popular: true
  },
  {
    id: "teq-jamon-queso",
    name: "Tequeños Estilo Cachito (Jamón & Queso)",
    category: "especiales",
    price: 9.50,
    price25: 18.00,
    price50: 33.00,
    image: "assets/images/clasicos.jpg",
    badge: "Nuevo Sabor 🥐",
    badgeClass: "",
    description: "Inspirados en el clásico cachito venezolano: jamón ahumado picadito con suave queso blanco y queso crema.",
    ingredients: "Jamón ahumado de pierna, queso blanco, toque de queso crema philadelphia, masa artesanal.",
    airfryerTime: "7-8 min a 180°C",
    popular: false
  },
  {
    id: "salsa-guasacaca",
    name: "Salsa Guasacaca Criolla Especial (4 oz)",
    category: "salsas",
    price: 2.00,
    price25: 2.00,
    price50: 2.00,
    image: "assets/images/hero.jpg",
    badge: "Salsa de la Casa 🥑",
    badgeClass: "",
    description: "Cremosa emulsión de aguacates frescos, cilantro, pimentón verde, ajo y aceite de oliva virgen extra.",
    ingredients: "Aguacate hass, cilantro fresco, ajo asado, vinagre blanco, aceite de oliva virgen.",
    airfryerTime: "Servir fría",
    popular: false
  },
  {
    id: "salsa-ajo",
    name: "Salsa Tártara de Ajo y Cilantro (4 oz)",
    category: "salsas",
    price: 2.00,
    price25: 2.00,
    price50: 2.00,
    image: "assets/images/hero.jpg",
    badge: "Salsa Artesanal 🧄",
    badgeClass: "",
    description: "Nuestra famosa receta de salsa tártara cremosa con ajo horneado suave y toque cítrico de limón.",
    ingredients: "Base cremosa artesanal, ajo rostizado, limón persa, cebollín y perejil fresco.",
    airfryerTime: "Servir fría",
    popular: false
  }
];

// App State
let cart = JSON.parse(localStorage.getItem("tequenos_cart")) || [];
let activeDiscount = 0;
let appliedCouponCode = "";

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  renderCatalog(PRODUCTS);
  updateCartUI();
  setupEventListeners();
  setupComboBuilder();
  setupCookingGuide();
  setupFAQ();
});

/* ==========================================================================
   CATALOG RENDERING & FILTERING
   ========================================================================== */
function renderCatalog(productsToRender) {
  const container = document.getElementById("catalogGrid");
  if (!container) return;

  if (productsToRender.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p style="font-size: 1.2rem;">No encontramos productos con ese filtro o búsqueda.</p>
        <button class="btn-primary" onclick="resetFilters()" style="margin-top: 16px;">Ver Todos los Tequeños</button>
      </div>
    `;
    return;
  }

  container.innerHTML = productsToRender.map(product => {
    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-image-wrap">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <span class="product-badge ${product.badgeClass}">${product.badge}</span>
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          
          <div class="product-options-row">
            <div>
              <label for="state-${product.id}" style="color: var(--text-muted); font-size: 0.75rem; display: block;">Preparación:</label>
              <select id="state-${product.id}" class="cook-state-select">
                <option value="Fritos Listos">🔥 Fritos (Calientes)</option>
                <option value="Congelados Crudos">❄️ Congelados (Airfryer)</option>
              </select>
            </div>
            ${product.category !== 'salsas' ? `
            <div>
              <label for="size-${product.id}" style="color: var(--text-muted); font-size: 0.75rem; display: block;">Tamaño:</label>
              <select id="size-${product.id}" class="cook-state-select" onchange="handleSizeChange('${product.id}', this.value)">
                <option value="12">12 unidades</option>
                <option value="25">25 unidades</option>
                <option value="50">50 unidades</option>
              </select>
            </div>
            ` : ''}
          </div>

          <div class="product-footer">
            <div class="product-price-wrap">
              <span class="product-price-label">Precio</span>
              <span class="product-price" id="price-display-${product.id}">${STORE_CONFIG.currency}${product.price.toFixed(2)}</span>
            </div>
            <div class="product-actions">
              <button class="btn-detail" onclick="openDetailModal('${product.id}')" title="Ver detalles y consejos">
                Info
              </button>
              <button class="btn-add-cart" onclick="addProductToCart('${product.id}')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                Pedir
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function handleSizeChange(productId, sizeValue) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let price = product.price;
  if (sizeValue === "25") price = product.price25 || (product.price * 1.9);
  if (sizeValue === "50") price = product.price50 || (product.price * 3.6);

  const priceEl = document.getElementById(`price-display-${productId}`);
  if (priceEl) {
    priceEl.textContent = `${STORE_CONFIG.currency}${price.toFixed(2)}`;
  }
}

function resetFilters() {
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) searchInput.value = "";
  
  document.querySelectorAll(".category-tab").forEach(tab => tab.classList.remove("active"));
  const allTab = document.querySelector(".category-tab[data-category='todos']");
  if (allTab) allTab.classList.add("active");

  renderCatalog(PRODUCTS);
}

/* ==========================================================================
   EVENT LISTENERS & NAVIGATION
   ========================================================================== */
function setupEventListeners() {
  // Category tabs filtering
  document.querySelectorAll(".category-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.getAttribute("data-category");
      let filtered = PRODUCTS;
      if (category === "populares") {
        filtered = PRODUCTS.filter(p => p.popular);
      } else if (category !== "todos") {
        filtered = PRODUCTS.filter(p => p.category === category);
      }
      renderCatalog(filtered);
    });
  });

  // Search input filtering
  const searchInput = document.getElementById("catalogSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      const filtered = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
      renderCatalog(filtered);
    });
  }

  // Cart Drawer open/close
  const cartBtn = document.getElementById("cartToggleBtn");
  const floatingCartBtn = document.getElementById("floatingCartBtn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartOverlay = document.getElementById("cartOverlay");

  const openCart = () => cartOverlay.classList.add("open");
  const closeCart = () => cartOverlay.classList.remove("open");

  if (cartBtn) cartBtn.addEventListener("click", openCart);
  if (floatingCartBtn) floatingCartBtn.addEventListener("click", openCart);
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) {
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) closeCart();
    });
  }

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // Coupon application
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", applyCouponCode);
  }
}

/* ==========================================================================
   CART OPERATIONS
   ========================================================================== */
function addProductToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const stateSelect = document.getElementById(`state-${productId}`);
  const sizeSelect = document.getElementById(`size-${productId}`);

  const preparation = stateSelect ? stateSelect.value : "Fritos Listos";
  const size = sizeSelect ? `${sizeSelect.value} unidades` : "Estándar";
  
  let unitPrice = product.price;
  if (sizeSelect) {
    if (sizeSelect.value === "25") unitPrice = product.price25 || (product.price * 1.9);
    if (sizeSelect.value === "50") unitPrice = product.price50 || (product.price * 3.6);
  }

  const cartItemId = `${productId}-${preparation}-${size}`;
  const existingItem = cart.find(item => item.id === cartItemId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      id: cartItemId,
      productId: product.id,
      name: product.name,
      image: product.image,
      preparation: preparation,
      size: size,
      price: unitPrice,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`¡${product.name} agregado al carrito! 🧀`);

  // Open cart drawer
  const cartOverlay = document.getElementById("cartOverlay");
  if (cartOverlay) cartOverlay.classList.add("open");
}

function updateCartQty(cartItemId, delta) {
  const item = cart.find(i => i.id === cartItemId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== cartItemId);
  }

  saveCart();
  updateCartUI();
}

function removeCartItem(cartItemId) {
  cart = cart.filter(i => i.id !== cartItemId);
  saveCart();
  updateCartUI();
  showToast("Producto eliminado del pedido");
}

function saveCart() {
  localStorage.setItem("tequenos_cart", JSON.stringify(cart));
}

function updateCartUI() {
  const cartCountEl = document.getElementById("cartBadgeCount");
  const floatingCountEl = document.getElementById("floatingBadgeCount");
  const cartItemsList = document.getElementById("cartItemsList");
  const subtotalEl = document.getElementById("cartSubtotal");
  const discountEl = document.getElementById("cartDiscount");
  const deliveryEl = document.getElementById("cartDelivery");
  const totalEl = document.getElementById("cartTotal");

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  if (cartCountEl) cartCountEl.textContent = totalItems;
  if (floatingCountEl) floatingCountEl.textContent = totalItems;

  if (!cartItemsList) return;

  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        <p>Tu carrito está vacío.</p>
        <span style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-top: 6px;">¡Agrega unos ricos tequeños crujientes para empezar!</span>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = `${STORE_CONFIG.currency}0.00`;
    if (discountEl) discountEl.textContent = `-${STORE_CONFIG.currency}0.00`;
    if (deliveryEl) deliveryEl.textContent = `${STORE_CONFIG.currency}0.00`;
    if (totalEl) totalEl.textContent = `${STORE_CONFIG.currency}0.00`;
    return;
  }

  cartItemsList.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-sub">${item.preparation} • ${item.size}</div>
        <div class="cart-item-qty-row">
          <div class="qty-controls">
            <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-number">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
          </div>
          <span class="cart-item-price">${STORE_CONFIG.currency}${(item.price * item.qty).toFixed(2)}</span>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeCartItem('${item.id}')" title="Eliminar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
      </button>
    </div>
  `).join('');

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = subtotal * activeDiscount;
  const isFreeDelivery = subtotal >= STORE_CONFIG.freeDeliveryThreshold;
  const delivery = isFreeDelivery || subtotal === 0 ? 0.00 : STORE_CONFIG.deliveryFee;
  const total = Math.max(0, subtotal - discount + delivery);

  if (subtotalEl) subtotalEl.textContent = `${STORE_CONFIG.currency}${subtotal.toFixed(2)}`;
  if (discountEl) discountEl.textContent = `-${STORE_CONFIG.currency}${discount.toFixed(2)}`;
  if (deliveryEl) deliveryEl.textContent = isFreeDelivery ? "GRATIS" : `${STORE_CONFIG.currency}${delivery.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `${STORE_CONFIG.currency}${total.toFixed(2)}`;
}

function applyCouponCode() {
  const input = document.getElementById("cartCouponInput");
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (STORE_CONFIG.promoCodes[code]) {
    activeDiscount = STORE_CONFIG.promoCodes[code];
    appliedCouponCode = code;
    updateCartUI();
    showToast(`¡Cupón ${code} aplicado! ${activeDiscount * 100}% de descuento 🎉`);
  } else {
    showToast("Cupón inválido. Prueba con TEQUE10 🧀");
  }
}

/* ==========================================================================
   INTERACTIVE COMBO BUILDER
   ========================================================================== */
function setupComboBuilder() {
  const packRadios = document.querySelectorAll(".pack-radio");
  const flavorCheckboxes = document.querySelectorAll(".flavor-checkbox");
  const sauceCheckboxes = document.querySelectorAll(".sauce-checkbox");
  const prepPills = document.querySelectorAll(".toggle-pill");
  const addComboBtn = document.getElementById("addComboToCartBtn");

  let selectedPack = {
    name: "Pack Familiar",
    qty: 25,
    saucesAllowed: 2,
    price: 15.00
  };

  let selectedPrep = "Fritos Listos";

  packRadios.forEach(radio => {
    radio.addEventListener("click", () => {
      packRadios.forEach(r => r.classList.remove("selected"));
      radio.classList.add("selected");

      selectedPack = {
        name: radio.getAttribute("data-name"),
        qty: parseInt(radio.getAttribute("data-qty")),
        saucesAllowed: parseInt(radio.getAttribute("data-sauces")),
        price: parseFloat(radio.getAttribute("data-price"))
      };

      updateComboSummary();
    });
  });

  prepPills.forEach(pill => {
    pill.addEventListener("click", () => {
      prepPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedPrep = pill.getAttribute("data-prep");
    });
  });

  function updateComboSummary() {
    const totalDisplay = document.getElementById("builderPriceDisplay");
    if (totalDisplay) {
      totalDisplay.textContent = `${STORE_CONFIG.currency}${selectedPack.price.toFixed(2)}`;
    }
  }

  if (addComboBtn) {
    addComboBtn.addEventListener("click", () => {
      const selectedFlavors = Array.from(flavorCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      const selectedSauces = Array.from(sauceCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      if (selectedFlavors.length === 0) {
        showToast("Por favor selecciona al menos un sabor para tu combo 🧀");
        return;
      }

      const comboName = `${selectedPack.name} (${selectedPack.qty} Tequeños)`;
      const comboSub = `Sabores: ${selectedFlavors.join(", ")} | Salsas: ${selectedSauces.length > 0 ? selectedSauces.join(", ") : "Sin salsa"}`;

      const customComboItem = {
        id: `combo-custom-${Date.now()}`,
        productId: "combo-custom",
        name: comboName,
        image: "assets/images/combo.jpg",
        preparation: selectedPrep,
        size: comboSub,
        price: selectedPack.price,
        qty: 1
      };

      cart.push(customComboItem);
      saveCart();
      updateCartUI();
      showToast(`¡${selectedPack.name} personalizado agregado al carrito! 🎉`);

      // Open Cart
      const cartOverlay = document.getElementById("cartOverlay");
      if (cartOverlay) cartOverlay.classList.add("open");
    });
  }
}

/* ==========================================================================
   CHECKOUT MODAL & WHATSAPP DIRECT ORDER
   ========================================================================== */
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast("Tu carrito está vacío. Agrega tequeños antes de pedir.");
    return;
  }

  const modal = document.getElementById("checkoutModal");
  if (modal) {
    modal.classList.add("open");
    // Close cart drawer
    const cartOverlay = document.getElementById("cartOverlay");
    if (cartOverlay) cartOverlay.classList.remove("open");
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.remove("open");
}

function sendWhatsAppOrder(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("orderName").value.trim();
  const phone = document.getElementById("orderPhone").value.trim();
  const address = document.getElementById("orderAddress").value.trim();
  const zone = document.getElementById("orderZone").value;
  const payment = document.getElementById("orderPayment").value;
  const notes = document.getElementById("orderNotes").value.trim();

  if (!name || !phone || !address) {
    showToast("Por favor completa tu nombre, teléfono y dirección.");
    return;
  }

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discount = subtotal * activeDiscount;
  const isFreeDelivery = subtotal >= STORE_CONFIG.freeDeliveryThreshold;
  const delivery = isFreeDelivery ? 0 : STORE_CONFIG.deliveryFee;
  const total = Math.max(0, subtotal - discount + delivery);
  const orderRef = "TQ-" + Math.floor(1000 + Math.random() * 9000);

  // Build Structured WhatsApp Message
  let message = `*¡HOLA! QUIERO REALIZAR UN PEDIDO EN TEQUEÑÍSIMOS GOURMET* 🧀🔥\n\n`;
  message += `📋 *ORDEN:* #${orderRef}\n`;
  message += `👤 *Cliente:* ${name}\n`;
  message += `📱 *Teléfono:* ${phone}\n`;
  message += `📍 *Dirección:* ${address} (${zone})\n`;
  message += `💳 *Método de Pago:* ${payment}\n\n`;
  
  message += `📦 *DETALLE DE TEQUEÑOS:*\n`;
  cart.forEach(item => {
    message += `▪️ *${item.qty}x* ${item.name}\n`;
    message += `   ↳ _${item.preparation} • ${item.size}_\n`;
    message += `   ↳ Subtotal: ${STORE_CONFIG.currency}${(item.price * item.qty).toFixed(2)}\n`;
  });

  message += `\n💰 *RESUMEN DE CUENTA:*\n`;
  message += `• Subtotal: ${STORE_CONFIG.currency}${subtotal.toFixed(2)}\n`;
  if (discount > 0) {
    message += `• Descuento (${appliedCouponCode}): -${STORE_CONFIG.currency}${discount.toFixed(2)}\n`;
  }
  message += `• Delivery (${zone}): ${isFreeDelivery ? '¡GRATIS!' : STORE_CONFIG.currency + delivery.toFixed(2)}\n`;
  message += `• *TOTAL A PAGAR:* *${STORE_CONFIG.currency}${total.toFixed(2)}*\n\n`;

  if (notes) {
    message += `📝 *Notas adicionales:* ${notes}\n\n`;
  }

  message += `_Quedo atento a la confirmación de mi pedido para coordinar el pago y envío. ¡Muchas gracias!_ ✨`;

  // Encode for URL
  const encodedText = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedText}`;

  // Open WhatsApp in new tab
  window.open(whatsappUrl, "_blank");

  // Show Success Confirmation
  closeCheckoutModal();
  showOrderSuccessModal(orderRef, total);

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();
}

function showOrderSuccessModal(orderRef, total) {
  const successModal = document.getElementById("orderSuccessModal");
  const refDisplay = document.getElementById("successOrderRef");
  const totalDisplay = document.getElementById("successOrderTotal");

  if (refDisplay) refDisplay.textContent = `#${orderRef}`;
  if (totalDisplay) totalDisplay.textContent = `${STORE_CONFIG.currency}${total.toFixed(2)}`;
  if (successModal) successModal.classList.add("open");
}

function closeSuccessModal() {
  const successModal = document.getElementById("orderSuccessModal");
  if (successModal) successModal.classList.remove("open");
}

/* ==========================================================================
   DETAIL MODAL & AIRFRYER TIPS
   ========================================================================== */
function openDetailModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("detailModal");
  const title = document.getElementById("detailTitle");
  const img = document.getElementById("detailImg");
  const desc = document.getElementById("detailDesc");
  const ingr = document.getElementById("detailIngredients");
  const airfryer = document.getElementById("detailAirfryer");
  const addBtn = document.getElementById("detailAddBtn");

  if (title) title.textContent = product.name;
  if (img) img.src = product.image;
  if (desc) desc.textContent = product.description;
  if (ingr) ingr.textContent = product.ingredients;
  if (airfryer) airfryer.textContent = product.airfryerTime;

  if (addBtn) {
    addBtn.onclick = () => {
      addProductToCart(product.id);
      closeDetailModal();
    };
  }

  if (modal) modal.classList.add("open");
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  if (modal) modal.classList.remove("open");
}

/* ==========================================================================
   COOKING GUIDE TAB SWITCHER
   ========================================================================== */
function setupCookingGuide() {
  const buttons = document.querySelectorAll(".guide-tab-btn");
  const tempEl = document.getElementById("guideTemp");
  const timeEl = document.getElementById("guideTime");
  const tipEl = document.getElementById("guideTip");

  const guideData = {
    airfryer: {
      temp: "180°C / 360°F",
      time: "6 - 8 min",
      tip: "Rocía una capa muy fina de aceite en aerosol. No los amontones para que el aire circule y queden extra crujientes.",
      steps: [
        "Precalienta tu Airfryer por 3 minutos a 180°C.",
        "Coloca los tequeños congelados directamente en la canasta con 1 cm de separación.",
        "Rocía apenas una gota o spray de aceite comestible.",
        "Cocina de 6 a 8 minutos. A mitad de tiempo (minuto 4), dales una pequeña sacudida o vuelta.",
        "¡Retira cuando estén dorados y el queso esté a punto de asomar!"
      ]
    },
    sarten: {
      temp: "175°C (Fuego Medio)",
      time: "4 - 5 min",
      tip: "El aceite debe cubrir al menos la mitad del tequeño. Si el aceite está muy frío absorberán grasa; si está muy caliente se quemará la masa sin derretir el queso.",
      steps: [
        "Calienta abundante aceite vegetal en un caldero o sartén profunda a fuego medio.",
        "Prueba con la punta de un tequeño: si burbujea suavemente, está listo.",
        "Agrega los tequeños sin sobrecargar el sartén para no bajar la temperatura.",
        "Gira constantemente con pinzas para un dorado parejo durante 4 a 5 minutos.",
        "Escurre en una bandeja con papel absorbente 1 minuto antes de servir."
      ]
    },
    horno: {
      temp: "200°C / 400°F",
      time: "10 - 12 min",
      tip: "Usa papel vegetal para hornear y píntalos con una brocha con mantequilla derretida o huevo batido para darles brillo dorado.",
      steps: [
        "Precalienta el horno a 200°C (400°F).",
        "Coloca los tequeños sobre una bandeja con papel para hornear o silpat.",
        "Pincela ligeramente con mantequilla derretida para lograr el dorado característico.",
        "Hornea durante 10 a 12 minutos hasta que la masa esté infladita y crocante.",
        "Deja reposar 2 minutos antes de servir."
      ]
    }
  };

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const method = btn.getAttribute("data-method");
      const data = guideData[method];
      if (!data) return;

      if (tempEl) tempEl.textContent = data.temp;
      if (timeEl) timeEl.textContent = data.time;
      if (tipEl) tipEl.textContent = data.tip;

      const stepsContainer = document.getElementById("guideStepsList");
      if (stepsContainer) {
        stepsContainer.innerHTML = data.steps.map((step, idx) => `
          <li class="guide-step-item">
            <span class="guide-step-num">${idx + 1}</span>
            <span>${step}</span>
          </li>
        `).join('');
      }
    });
  });
}

/* ==========================================================================
   FAQ ACCORDION
   ========================================================================== */
function setupFAQ() {
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const parent = q.parentElement;
      const isOpen = parent.classList.contains("active");

      // Close all
      document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));

      if (!isOpen) {
        parent.classList.add("active");
      }
    });
  });
}

/* ==========================================================================
   TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
