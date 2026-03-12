// Sample product dataset
const products = [
    { id: 1, name: "India Gate Basmati Rice", category: "rice", price: 450, brand: "India Gate", img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSNJDMVCpOSmiI68IGurGdBC0_YYLeC14XdpKncKQDrr6Hu5ApvtDxbJycA8VDYa6h0mBnwwqRZaJKo3BT5dCPnKOkFivnWeLlse0Rcm1sU-9_E0BEsVPG5Oi_dA9EJw8C0pTzQrKY&usqp=CAc" },
    { id: 2, name: "Tata Salt", category: "salt", price: 25, brand: "Tata", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTAtANOTPa-UXXYws7D4w31vd4H7pWF7ByC7JMYazB4Yai1L9OngpO2Cpo36m3BArEUX41zebsZtUdDq17ZQZBy2GUW2NqcJCG_29IwrT8Xx-kfT20DTZVpbfbTQi9oMXNuSP9YPv4&usqp=CAc" },
    { id: 3, name: "Aashirvaad Atta", category: "atta", price: 320, brand: "Aashirvaad", img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRisKdxntw1iSzKY9TlLkxzso0pTGXM_IAg5zlb0bYokFhkYKubJN6QlGxO21t1fRsO1HNI5HT3HPf8TnJn8cvGfAcR-1czEfVW9Ccaw_hc_Fd_1-dkHhtuWLgqodg9jjLdxJTRTw&usqp=CAc" },
    { id: 4, name: "Saffola Oil", category: "oil", price: 180, brand: "Saffola", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKK7372BI23MDgJMtg_fRHcBp3TwQEXcTuBg&s" },
    { id: 5, name: "MDH Masala", category: "spices", price: 60, brand: "MDH", img: "https://www.bbassets.com/media/uploads/p/l/100004426_2-mdh-masala-chana.jpg" }
];

let filteredProducts = [...products];
let cartCount = 0;

// Load products
function loadProducts() {
    const container = document.getElementById("grocery-products");
    container.innerHTML = "";

    filteredProducts.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p class="price">₹${p.price}</p>
            <button onclick="addToCart(${p.id})">Add to Cart</button>
        `;
        container.appendChild(card);
    });

    document.getElementById("product-count").innerText = filteredProducts.length;
}

// Add to cart
function addToCart(id) {
    cartCount++;
    document.getElementById("cart-count").innerText = cartCount;
    alert("Product added to cart!");
}

// Apply filters
function applyFilters() {
    const categoryFilters = [...document.querySelectorAll(".category-filter:checked")].map(c => c.value);
    const priceLimit = document.getElementById("priceRange").value;

    filteredProducts = products.filter(p => {
        const categoryMatch = categoryFilters.includes("all") || categoryFilters.includes(p.category);
        const priceMatch = p.price <= priceLimit;
        return categoryMatch && priceMatch;
    });

    loadProducts();
}

// Clear filters
function clearFilters() {
    document.querySelectorAll(".category-filter").forEach(c => c.checked = false);
    document.querySelector(".category-filter[value='all']").checked = true;
    document.getElementById("priceRange").value = 1000;
    filteredProducts = [...products];
    loadProducts();
}

// Sorting
function sortProducts() {
    const sortValue = document.getElementById("sort-select").value;
    if (sortValue === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortValue === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        filteredProducts = [...products];
    }
    loadProducts();
}

// Initial load
window.onload = loadProducts;