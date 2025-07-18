// public/js/products.js

document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const categoryID = params.get("categoryID");

    if (!categoryID) {
        document.getElementById("product-list").innerHTML = "<p>No category selected.</p>";
        return;
    }

    try {
        const res = await fetch(`/api/products?categoryID=${categoryID}`);
        const products = await res.json();

        const list = document.getElementById("product-list");
        if (products.length === 0) {
            list.innerHTML = "<p>No products found.</p>";
            return;
        }

        products.forEach(product => {
            const card = document.createElement("div");
            card.className = "product-card";

            card.innerHTML = `
        <div class="card-left">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="card-right">
          <h2>${product.name}</h2>
          <p><strong>Product ID:</strong> ${product.productID}</p>
          <p><strong>Category ID:</strong> ${product.categoryID}</p>
          <p><strong>Price Range:</strong> ${product.priceRange}</p>
          <button class="add-to-cart" data-id="${product.productID}">Add to Cart</button>
        </div>
      `;

            list.appendChild(card);
        });
    } catch (err) {
        console.error("Failed to load products:", err);
    }
    
});
