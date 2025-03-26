document.addEventListener("DOMContentLoaded", async function () {
    const categories = {
        "men's clothing": "man-produkter",
        "women's clothing": "kvinnor-produkter",
        "jewelery": "smycken-produkter",
        "electronics": "elektronik-produkter"
    };

    const rateResponse = await fetch("https://api.frankfurter.app/latest?from=USD&to=SEK");
    const rateData = await rateResponse.json();
    const exchangeRate = rateData.rates.SEK;

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
                        //productCard.onclick = () => gotoForm(product);

                        const img = document.createElement("img");
                        img.src = product.image;
                        img.alt = product.title;
                        productCard.appendChild(img);

                        const title = document.createElement("h3");
                        title.textContent = product.title;
                        productCard.appendChild(title)

                        const price = document.createElement("p");
                        const priceInSEK = (product.price * exchangeRate).toFixed(2);
                        price.textContent = `${priceInSEK} SEK`;
                        price.classList.add("product-price");
                        productCard.appendChild(price);

                        const buyButton = document.createElement("button");
                        buyButton.textContent = "Buy now";
                        buyButton.classList.add("buy-button");
                        buyButton.onclick = (e) => {
                            e.stopPropagation(); 
                            product.priceSEK = priceInSEK;
                            gotoForm(product);
                        };

                        productCard.appendChild(buyButton);
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