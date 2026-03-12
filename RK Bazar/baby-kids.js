/* =========================
   PRODUCT DATA
========================= */

let products = [
    {
        id: 1,
        name: "Nestle Cerelac Baby Food",
        category: "food",
        brand: "Nestle",
        age: "6-12m",
        price: 320,
        discount: 15,
        image: "https://www.quickpantry.in/cdn/shop/files/CerelacBabyCereal-WheatAppleCarrot-From6to24Months300g.jpg?crop=center&height=1200&v=1726602841&width=1200"
    },
    {
        id: 2,
        name: "Pampers Premium Diapers Pack",
        category: "diapers",
        brand: "Pampers",
        age: "0-6m",
        price: 899,
        discount: 20,
        image: "https://m.media-amazon.com/images/I/612Q3BE+v8L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 3,
        name: "Huggies Baby Wipes",
        category: "diapers",
        brand: "Huggies",
        age: "0-6m",
        price: 199,
        discount: 10,
        image: "https://m.media-amazon.com/images/I/81P8xSs9FWL.jpg"
    },
    {
        id: 4,
        name: "Johnson's Baby Lotion",
        category: "care",
        brand: "Johnson's",
        age: "0-6m",
        price: 250,
        discount: 18,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW_8BTtlljOkmiuxFr5lC_EkQQZJaU8YtNZA&s"
    },
    {
        id: 5,
        name: "Funskool Puzzle Game",
        category: "toys",
        brand: "Funskool",
        age: "3-5y",
        price: 450,
        discount: 12,
        image: "https://m.media-amazon.com/images/I/81IA168PFTL.jpg"
    },
    {
        id: 6,
        name: "Kids T-Shirt Set",
        category: "clothing",
        brand: "Mamam",
        age: "5-12y",
        price: 699,
        discount: 25,
        image: "https://www.jiomart.com/images/product/original/rvvpsodswd/rust_yellow_blue-product-images-rvvpsodswd-8-202304041444.jpg?im=Resize=(500,630)"
    }
];


/* =========================
   RENDER PRODUCTS
========================= */

function renderProducts(list) {
    const grid = document.getElementById("products-grid");
    grid.innerHTML = "";

    list.forEach(product => {
        const discountedPrice = product.price - (product.price * product.discount / 100);

        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-name">${product.name}</div>
                <div class="product-price">
                    ₹${discountedPrice.toFixed(0)}
                    <span class="old-price">₹${product.price}</span>
                </div>
                <div class="discount-badge">${product.discount}% OFF</div>
                <button class="add-to-cart" onclick="addToCart()">Add to Cart</button>
            </div>
        `;
    });

    document.getElementById("product-count").innerText = list.length;
}

/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts() {
    const selectedCategories = [...document.querySelectorAll(".category-checkbox:checked")].map(cb => cb.value);
    const selectedBrands = [...document.querySelectorAll(".brand-checkbox:checked")].map(cb => cb.value);
    const selectedAges = [...document.querySelectorAll(".age-checkbox:checked")].map(cb => cb.value);
    const maxPrice = document.getElementById("priceRange").value;
    const discountValue = document.querySelector("input[name='discount']:checked").value;

    filteredProducts = products.filter(product => {

        let matchCategory = selectedCategories.includes("all") || selectedCategories.includes(product.category);
        let matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        let matchAge = selectedAges.length === 0 || selectedAges.includes(product.age);
        let matchPrice = product.price <= maxPrice;
        let matchDiscount = product.discount >= discountValue;

        return matchCategory && matchBrand && matchAge && matchPrice && matchDiscount;
    });

    renderProducts(filteredProducts);
}

/* =========================
   SEARCH
========================= */

function searchProducts() {
    const searchText = document.getElementById("search-input").value.toLowerCase();

    const searchResults = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    renderProducts(searchResults);
}

/* =========================
   SORT PRODUCTS
========================= */

function sortProducts() {
    const value = document.getElementById("sort-select").value;

    if (value === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }
    else if (value === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    else if (value === "discount") {
        filteredProducts.sort((a, b) => b.discount - a.discount);
    }
    else if (value === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderProducts(filteredProducts);
}

/* =========================
   QUICK FILTER
========================= */

function quickFilter(category) {
    document.querySelectorAll(".category-checkbox").forEach(cb => cb.checked = false);
    document.querySelector(`.category-checkbox[value='${category}']`).checked = true;
    filterProducts();
}

/* =========================
   PRICE LABEL
========================= */

function updatePriceLabel() {
    document.getElementById("price-value").innerText =
        "₹" + document.getElementById("priceRange").value;
}

/* =========================
   CLEAR FILTERS
========================= */

function clearAllFilters() {
    document.querySelectorAll("input[type='checkbox']").forEach(cb => cb.checked = false);
    document.querySelector(".category-checkbox[value='all']").checked = true;
    document.querySelector("input[name='discount'][value='0']").checked = true;
    document.getElementById("priceRange").value = 2000;
    updatePriceLabel();
    filteredProducts = [...products];
    renderProducts(filteredProducts);
}

/* =========================
   CART
========================= */

function addToCart() {
    let cartCount = localStorage.getItem("cartCount") || 0;
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    updateCartCount();
}

function updateCartCount() {
    let cartCount = localStorage.getItem("cartCount") || 0;
    document.getElementById("cart-count").innerText = cartCount;
}

/* =========================
   VIEW TOGGLE
========================= */

function setGridView() {
    document.getElementById("products-grid").style.gridTemplateColumns = "repeat(4, 1fr)";
}

function setListView() {
    document.getElementById("products-grid").style.gridTemplateColumns = "repeat(1, 1fr)";
}

/* =========================
   INITIAL LOAD
========================= */

renderProducts(products);
updateCartCount();