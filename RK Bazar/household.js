/* =========================
   PRODUCT DATA
========================= */

let products = [
    {
        id: 1,
        name: "Surf Excel Easy Wash 1kg",
        category: "detergent",
        brand: "Hindustan Unilever",
        surface: "clothes",
        price: 210,
        discount: 15,
        image: "https://m.media-amazon.com/images/I/61m1Pn9lzHL.jpg"
    },
    {
        id: 2,
        name: "Ariel Matic Front Load 1kg",
        category: "detergent",
        brand: "Procter & Gamble",
        surface: "clothes",
        price: 250,
        discount: 20,
        image: "https://m.media-amazon.com/images/I/61Gdmami7xL.jpg"
    },
    {
        id: 3,
        name: "Lizol Floor Cleaner 500ml",
        category: "cleaning",
        brand: "Hindustan Unilever",
        surface: "floor",
        price: 120,
        discount: 10,
        image: "https://www.bbassets.com/media/uploads/p/l/263839_17-lizol-disinfectant-surface-floor-cleaner-liquid-citrus-kills-999-germs.jpg"
    },
    {
        id: 4,
        name: "Harpic Toilet Cleaner",
        category: "cleaning",
        brand: "Reckitt",
        surface: "bathroom",
        price: 95,
        discount: 12,
        image: "https://andamangreengrocers.com/wp-content/uploads/2022/01/Harpic_Blue_Toilet_Cleaner.jpeg"
    },
    {
        id: 5,
        name: "Scotch-Brite Scrub Pad",
        category: "utensils",
        brand: "Scotch-Brite",
        surface: "kitchen",
        price: 40,
        discount: 5,
        image: "https://www.bbassets.com/media/uploads/p/l/40119520_5-scotch-brite-scrub-pad.jpg"
    },
    {
        id: 6,
        name: "Godrej Air Freshener",
        category: "freshener",
        brand: "Godrej",
        surface: "floor",
        price: 160,
        discount: 18,
        image: "https://m.media-amazon.com/images/I/714YnxXRqXL.jpg"
    },
    {
        id: 7,
        name: "Kitchen Paper Roll",
        category: "paper",
        brand: "Origami",
        surface: "kitchen",
        price: 70,
        discount: 8,
        image: "https://static1.industrybuying.com/products/cleaning/tissue-paper-cloth-wipes/tissue-paper-wipes/CLE.TIS.726047830_1709706454721.webp"
    }
];


// ==========================
// RENDER PRODUCTS
// ==========================
function renderProducts(productList) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    document.getElementById("product-count").innerText = productList.length;

    productList.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <div class="discount-badge">${product.discount}% OFF</div>
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div>
                    <span class="product-price">₹${product.price}</span>
                    <span class="old-price">₹${product.oldPrice}</span>
                </div>
                <button class="add-btn" onclick="addToCart()">Add to Cart</button>
            </div>
        `;
    });
}

// ==========================
// ADD TO CART
// ==========================
let cartCount = 0;

function addToCart() {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
}

// ==========================
// FILTER PRODUCTS
// ==========================
function filterProducts() {

    const selectedCategories = Array.from(
        document.querySelectorAll(".category-checkbox:checked")
    ).map(cb => cb.value);

    let filtered = products;

    if (!selectedCategories.includes("all")) {
        filtered = products.filter(p =>
            selectedCategories.includes(p.category)
        );
    }

    renderProducts(filtered);
}

// ==========================
// QUICK FILTER
// ==========================
function quickFilter(category) {
    const filtered = products.filter(p => p.category === category);
    renderProducts(filtered);
}

// ==========================
// SORT PRODUCTS
// ==========================
function sortProducts() {

    const value = document.getElementById("sort-select").value;
    let sorted = [...products];

    if (value === "low-high") {
        sorted.sort((a, b) => a.price - b.price);
    }

    if (value === "high-low") {
        sorted.sort((a, b) => b.price - a.price);
    }

    if (value === "name") {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (value === "discount") {
        sorted.sort((a, b) => b.discount - a.discount);
    }

    renderProducts(sorted);
}

// ==========================
// INITIAL LOAD
// ==========================
renderProducts(products);