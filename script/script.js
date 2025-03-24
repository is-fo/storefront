document.addEventListener("DOMContentLoaded", function () {
    const categories = {
        "men's clothing": "man-produkter",
        "women's clothing": "kvinnor-produkter",
        "jewelery": "smycken-produkter",
        "electronics": "elektronik-produkter"
    };

    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const category = product.category;
                const containerId = categories[category];

                if (containerId) {
                    const container = document.getElementById(containerId);
                    if (container) {
                        const productCard = document.createElement("div");
                        productCard.classList.add("product-card");
                        productCard.onclick = () => gotoForm(product);

                        const img = document.createElement("img");
                        img.src = product.image;
                        img.alt = product.title;
                        productCard.appendChild(img);

                        const title = document.createElement("h3");
                        title.textContent = product.title;
                        productCard.appendChild(title)

                        const price = document.createElement("p");
                        price.textContent = `$${product.price}`;
                        productCard.appendChild(price);

                        container.appendChild(productCard);
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});

function gotoForm(product) {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "form.html";
}