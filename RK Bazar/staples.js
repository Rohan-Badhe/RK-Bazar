// ===============================
// PRODUCTS DATA (WITH IMAGES)
// ===============================
const products = [
    {
        id: 1,
        name: "India Gate Basmati Rice",
        category: "rice",
        brand: "India Gate",
        price: 520,
        oldPrice: 600,
        weight: "5kg",
        image: "https://m.media-amazon.com/images/I/71HIynTMLLL._AC_UF894,1000_QL80_.jpg"
    },
    {
        id: 2,
        name: "Lakshmi Raw Rice",
        category: "rice",
        brand: "Lakshmi",
        price: 60,
        oldPrice: 70,
        weight: "1kg",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtFh4Qu0HalN-4anMS28GL8uYUuwTt_vD8hA&s=10"
    },
    {
        id: 3,
        name: "Aashirvaad Atta",
        category: "wheat",
        brand: "Aashirvaad",
        price: 250,
        oldPrice: 280,
        weight: "5kg",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx0sJHU5Frq4VRJYgdM3KubxKl8cIQ9KAYFQ&s"
    },
    {
        id: 4,
        name: "Tata Sampann Toor Dal",
        category: "dal",
        brand: "Tata",
        price: 140,
        oldPrice: 160,
        weight: "1kg",
        image: "https://www.tatanutrikorner.com/cdn/shop/files/Tata-Sampann-Toor-Arhar-Dal--500g-_FOP_-with-Sanjeev-kapoor_f1f98892-6dbf-40be-822b-a922be48b2b9.png?v=1748858329&width=1946"
    },
    {
        id: 5,
        name: "Moong Dal Premium",
        category: "dal",
        brand: "Tata",
        price: 120,
        oldPrice: 140,
        weight: "1kg",
        image: "https://m.media-amazon.com/images/I/71e96DdcB2L.jpg"
    },
    {
        id: 6,
        name: "MDH Garam Masala",
        category: "masala",
        brand: "MDH",
        price: 85,
        oldPrice: 100,
        weight: "200g",
        image: "https://www.bbassets.com/media/uploads/p/l/100004473_4-mdh-masala-garam.jpg"
    },
    {
        id: 7,
        name: "Everest Turmeric Powder",
        category: "spices",
        brand: "Everest",
        price: 45,
        oldPrice: 60,
        weight: "200g",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD6Bt2hauww_P4U4OYlnJLCXLeJbx9vwP2Hg&s"
    },
    {
        id: 8,
        name: "Everest Red Chilli Powder",
        category: "spices",
        brand: "Everest",
        price: 70,
        oldPrice: 90,
        weight: "500g",
        image: "https://www.bbassets.com/media/uploads/p/l/242311_2-everest-powder-tikhalal-hot-chilly.jpg"
    }
];

let filteredProducts = [...products];
let cartCount = 0;

// ===============================
// RENDER PRODUCTS
// ===============================
function renderProducts(data) {
    const grid = document.getElementById("products-grid");
    const productCount = document.getElementById("product-count");
    grid.innerHTML = "";

    productCount.textContent = data.length;

    data.forEach(product => {
        let discount = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);

        grid.innerHTML += `
            <div class="product-card">
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="weight">${product.weight}</div>
                    <div class="price-row">
                        <div>
                            <div class="price">₹${product.price}</div>
                            <small style="text-decoration:line-through;color:gray;">₹${product.oldPrice}</small>
                            <small style="color:red;"> ${discount}% OFF</small>
                        </div>
                        <button class="add-btn" onclick="addToCart()">Add</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// ===============================
// SEARCH
// ===============================
function searchProducts() {
    const searchValue = document.getElementById("search-input").value.toLowerCase();

    filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    renderProducts(filteredProducts);
}

// ===============================
// FILTER PRODUCTS
// ===============================
function filterProducts() {
    const selectedCategories = [...document.querySelectorAll(".category-checkbox:checked")]
        .map(cb => cb.value);

    const selectedBrands = [...document.querySelectorAll(".brand-checkbox:checked")]
        .map(cb => cb.value);

    const maxPrice = document.getElementById("priceRange").value;

    filteredProducts = products.filter(product => {
        let matchCategory = selectedCategories.includes("all") || selectedCategories.includes(product.category);
        let matchBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        let matchPrice = product.price <= maxPrice;

        return matchCategory && matchBrand && matchPrice;
    });

    renderProducts(filteredProducts);
}

// ===============================
// SORT PRODUCTS
// ===============================
function sortProducts() {
    const sortValue = document.getElementById("sort-select").value;

    if (sortValue === "low-high") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }
    else if (sortValue === "high-low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    else if (sortValue === "name") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    else if (sortValue === "discount") {
        filteredProducts.sort((a, b) =>
            ((b.oldPrice - b.price) / b.oldPrice) - ((a.oldPrice - a.price) / a.oldPrice)
        );
    }

    renderProducts(filteredProducts);
}

// ===============================
// QUICK FILTER
// ===============================
function quickFilter(category) {
    document.querySelectorAll(".category-checkbox").forEach(cb => cb.checked = false);
    document.querySelector(`.category-checkbox[value="${category}"]`).checked = true;
    filterProducts();
}

// ===============================
// CLEAR FILTERS
// ===============================
function clearAllFilters() {
    document.querySelectorAll("input[type=checkbox]").forEach(cb => cb.checked = false);
    document.querySelector("input[value='all']").checked = true;
    document.getElementById("priceRange").value = 1000;
    renderProducts(products);
}

// ===============================
// UPDATE PRICE LABEL
// ===============================
function updatePriceLabel() {
    const value = document.getElementById("priceRange").value;
    document.getElementById("price-value").textContent = "₹" + value;
}

// ===============================
// CART
// ===============================
function addToCart() {
    cartCount++;
    document.getElementById("cart-count").textContent = cartCount;
}

// ===============================
// INITIAL LOAD
// ===============================
renderProducts(products);