// Product Data (Simulating a Database)
const products = [
    {
        id: 1,
        name: "Premium Basmati Rice",
        weight: "1 kg",
        price: 145,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTy-1Qa5EIRZbJXwwCUk4xoHAZBVUQMdFkWA&s"
    },
    {
        id: 2,
        name: "Tata Salt",
        weight: "1 kg",
        price: 25,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRVpNMoMJkIsIKiJN-4gWBQLt45IBA4pvU9g&s"
    },
    {
        id: 3,
        name: "Sunflower Oil",
        weight: "1 Ltr",
        price: 110,
        image: "https://www.bbassets.com/media/uploads/p/l/40161771_6-fortune-sunflower-oil.jpg"
    },
    {
        id: 4,
        name: "Turdal (Toor Dal)",
        weight: "1 kg",
        price: 120,
        image: "https://m.media-amazon.com/images/I/61HA0lc+dHL._AC_UF894,1000_QL80_.jpg"
    },
    {
        id: 5,
        name: "Aashirvaad Atta",
        weight: "10 kg",
        price: 390,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0sJHU5Frq4VRJYgdM3KubxKl8cIQ9KAYFQ&s"
    },
    {
        id: 6,
        name: "Surf Excel Detergent",
        weight: "1 kg",
        price: 250,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi6Rx1G-r8yziLKBXIFy8prAVY6jBPU3xJNQ&st"
    },
    {
        id: 7,
        name: "Colgate Toothpaste",
        weight: "100g",
        price: 65,
        image: "https://m.media-amazon.com/images/I/51+joDIObdL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 8,
        name: "Amul Butter",
        weight: "500g",
        price: 275,
        image: "https://www.bbassets.com/media/uploads/p/xl/104864_8-amul-butter-pasteurised.jpg"
    }
];

// Cart State
let cartCount = 0;

// Function to render products
function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        card.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="weight">${product.weight}</p>
                <div class="price-row">
                    <span class="price">₹${product.price}</span>
                    <button class="add-btn" onclick="addToCart()">ADD</button>
                </div>
            </div>
        `;
        
        productGrid.appendChild(card);
    });
}

// Function to handle Add to Cart
function addToCart() {
    cartCount++;
    document.getElementById('cart-count').innerText = cartCount;
    
    // Simple animation feedback
    const btn = event.target;
    const originalText = btn.innerText;
    
    btn.innerText = "ADDED";
    btn.style.backgroundColor = "#004d00";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = "#008000";
    }, 1000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});