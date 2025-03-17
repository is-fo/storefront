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
                        const img = document.createElement("img");
                        img.src = product.image;
                        img.alt = product.title;
                        img.classList.add("p-image");
                        img.style.width = "200px";
                        container.appendChild(img);
                    }
                }
            });
        })
        .catch(error => console.error("Error fetching products:", error));
});
