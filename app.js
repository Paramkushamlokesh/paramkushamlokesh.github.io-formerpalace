async function fetchProducts(category = "All") {
    const url = category === "All" 
        ? 'http://localhost:3000/products' 
        : `http://localhost:3000/products/${encodeURIComponent(category)}`;
    
    const response = await fetch(url);
    const products = await response.json();
    renderProducts(products);
}

function renderProducts(products) {
    const container = document.getElementById("product-container");
    container.innerHTML = ""; // Clear existing content

    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";

        // Create the product structure with the frame
        productDiv.innerHTML = `
            <div class="image-frame">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: ₹${product.price}</p>
            <button onclick="addToCart('${product.name}')">Add to Cart</button>
        `;

        container.appendChild(productDiv);
    });
}


function filterProducts() {
    const selectedCategory = document.getElementById("category").value;
    fetchProducts(selectedCategory);
}

function addToCart(productName) {
    alert(`${productName} added to cart!`);
}

// Initial fetch of all products
fetchProducts();
