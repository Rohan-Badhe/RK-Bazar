const products = [
{
id:1,
name:"Dove Soap",
category:"soap",
brand:"Dove",
price:55,
oldPrice:65,
discount:15,
image:"https://www.bbassets.com/media/uploads/p/l/266706_20-dove-cream-beauty-bathing-bar.jpg"
},
{
id:2,
name:"Colgate Toothpaste",
category:"toothpaste",
brand:"Colgate",
price:120,
oldPrice:150,
discount:20,
image:"https://www.bbassets.com/media/uploads/p/l/263921_29-colgate-strong-teeth-anticavity-toothpaste-with-amino-shakti-formula-provides-fresher-breath.jpg"
},
{
id:3,
name:"L'Oreal Shampoo",
category:"shampoo",
brand:"L'Oreal",
hairType:"dry",
price:410,
oldPrice:480,
discount:15,
image:"https://images-static.nykaa.com/media/catalog/product/a/c/ace06428901526588985_12.jpg?tr=w-500"
},
{
id:4,
name:"Head & Shoulders",
category:"shampoo",
brand:"Dove",
hairType:"oily",
price:320,
oldPrice:380,
discount:15,
image:"https://m.media-amazon.com/images/I/61wXBDCywCL.jpg"
},
{
id:5,
name:"Nivea Lotion",
category:"skincare",
brand:"Dove",
price:240,
oldPrice:300,
discount:20,
image:"https://www.quickpantry.in/cdn/shop/files/Nivea_Aloe_Hydration_Body_Lotion_Quick_Pantry.jpg?v=1741361998"
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