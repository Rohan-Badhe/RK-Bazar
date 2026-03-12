// ==========================
// PRODUCT DATA
// ==========================
const products = [
{
id: 1,
name: "Tropicana Mango Juice 1L",
category: "juice",
brand: "Tropicana",
price: 110,
oldPrice: 130,
discount: 15,
image: "https://souparnikahomecentre.com/wp-content/uploads/2020/12/products-mango-delight.jpg"
},
{
id: 2,
name: "Real Mixed Fruit Juice 1L",
category: "juice",
brand: "Real",
price: 105,
oldPrice: 125,
discount: 16,
image: "https://www.bbassets.com/media/uploads/p/xl/229922_12-real-fruit-power-juice-mixed.jpg"
},
{
id: 3,
name: "Coca Cola Soft Drink 2L",
category: "softdrink",
brand: "Coca Cola",
price: 95,
oldPrice: 110,
discount: 14,
image: "https://frugivore-bucket.s3.amazonaws.com/media/package/img_one/2020-10-17/Coca_Cola_Soft_Drink_bottle_2l.jpg"
},
{
id: 4,
name: "Pepsi Soft Drink 2L",
category: "softdrink",
brand: "Pepsi",
price: 92,
oldPrice: 110,
discount: 16,
image: "https://frugivore-bucket.s3.amazonaws.com/media/package/img_one/2020-10-17/Soft_Drink_-_Pepsi_Bottle_2.25l.jpg"
},
{
id: 5,
name: "Red Bull Energy Drink 250ml",
category: "energy",
brand: "Red Bull",
price: 125,
oldPrice: 140,
discount: 11,
image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvb5-XYtbSWdJ6tdiMn27uEAKZJpNfUA2NKg&s"
},
{
id: 6,
name: "Bournvita Health Drink 500g",
category: "healthdrink",
brand: "Cadbury",
price: 245,
oldPrice: 280,
discount: 13,
image: "https://www.jiomart.com/images/product/original/490000979/bournvita-500-g-product-images-o490000979-p490000979-0-202312291215.jpg?im=Resize=(1000,1000)"
},
{
id: 7,
name: "Tata Tea Gold 1kg",
category: "tea",
brand: "Tata",
price: 520,
oldPrice: 580,
discount: 10,
image: "https://www.quickpantry.in/cdn/shop/files/TataTeaGold250gQuickPantry.png?v=1751116045"
},
{
id: 8,
name: "Nescafe Classic Coffee 100g",
category: "coffee",
brand: "Nescafe",
price: 285,
oldPrice: 320,
discount: 11,
image: "https://m.media-amazon.com/images/I/71kSJv+gUIL._AC_UF894,1000_QL80_.jpg"
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