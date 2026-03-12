// Cart Data - Simulating stored cart items
let cart = [
    {
        id: 1,
        name: "Premium Basmati Rice",
        brand: "India Gate",
        weight: "1 kg",
        price: 145,
        mrp: 160,
        quantity: 1,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQHRFv3zvFHP_fBKNwJ8Ky9iA0yd7Q8GzuQJHQMcnl8-odnTDwKPmmypvaHF5Zs7pj5ec-yWgQKFbZPUcw3hcbPguqR0UXm6wWANvcJZ5yhK_55v1NEnspbn1iHBXIJiXoBxLr7YXHUhA&usqp=CAc"
    },
    {
        id: 2,
        name: "Sunflower Oil",
        brand: "Saffola",
        weight: "1 Ltr",
        price: 110,
        mrp: 130,
        quantity: 2,
        image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTZuy2Xt-iSf3a9tEm5CEQKqENFofmlCJO1yE_yAjxKKs6vBD8-6a7u9lbugOENF2-O4n7x4sm0BDeGy_WMR3WNrWP1NVeMXzOrQcD6Ooj7H_Le5ItFnPFsWntyRFAwadQSPNlemUM&usqp=CAc"
    },
    {
        id: 3,
        name: "Tata Salt",
        brand: "Tata",
        weight: "1 kg",
        price: 25,
        mrp: 30,
        quantity: 1,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRVpNMoMJkIsIKiJN-4gWBQLt45IBA4pvU9g&s"
    }
];

let discount = 0;
let couponApplied = false;

// Initialize Cart Page
document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
    updateCartSummary();
    updateCartCount();
});

// Render Cart Items
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    const priceSummary = document.getElementById('price-summary');
    
    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        priceSummary.style.display = 'none';
        document.getElementById('cart-item-count').textContent = '0';
        return;
    }
    
    emptyCart.style.display = 'none';
    priceSummary.style.display = 'block';
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item-card" id="cart-item-${item.id}">
            <div class="item-image-section">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details-section">
                <h3>${item.name}</h3>
                <p class="item-brand">${item.brand}</p>
                <p class="item-weight">${item.weight}</p>
                
                <div class="quantity-controls">
                    <label>Qty:</label>
                    <div class="qty-box">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="text" value="${item.quantity}" readonly id="qty-${item.id}">
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                
                <button class="remove-btn" onclick="removeItem(${item.id})">
                    <i class="fa-solid fa-trash"></i> Remove
                </button>
            </div>
            <div class="item-price-section">
                <div>
                    <span class="current-price">₹${item.price * item.quantity}</span>
                    <span class="mrp"><del>₹${item.mrp * item.quantity}</del></span>
                </div>
            </div>
        </div>
    `).join('');
}

// Update Cart Count
function updateCartCount() {
    document.getElementById('cart-item-count').textContent = cart.length;
}

// Update Cart Summary
function updateCartSummary() {
    let totalPrice = 0;
    let totalMrp = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        totalMrp += item.mrp * item.quantity;
    });

    discount = totalMrp - totalPrice;

    document.getElementById('total-mrp').textContent = `₹${totalMrp}`;
    document.getElementById('discount').textContent = `-₹${discount}`;
    document.getElementById('final-price').textContent = `₹${totalPrice}`;
}

// Update Quantity
function updateQuantity(id, change) {
    const item = cart.find(p => p.id === id);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeItem(id);
    } else {
        renderCartItems();
        updateCartSummary();
        updateCartCount();
    }
}

// Remove Item
function removeItem(id) {
    cart = cart.filter(p => p.id !== id);
    renderCartItems();
    updateCartSummary();
    updateCartCount();
}