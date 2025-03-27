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
                        productCard.appendChild(title);

                        const price = document.createElement("p");
                        const priceInSEK = (product.price * exchangeRate).toFixed(0);
                        price.textContent = `${priceInSEK} kr`;
                        price.classList.add("product-price");
                        productCard.appendChild(price);

                        const infoButton = document.createElement("div");
                        infoButton.classList.add("info-button");
                        infoButton.innerHTML = '<i class="fas fa-info"></i>';
                        
                        infoButton.addEventListener('click', (e) => e.stopPropagation());
                        infoButton.addEventListener('mouseenter', (e) => e.stopPropagation());
                        productCard.appendChild(infoButton);

                        const overlay = document.createElement("div");
                        overlay.classList.add("product-overlay");
                        overlay.innerHTML = `
                            <div class="overlay-content">
                                <div class="product-info-text">
                                    <p><strong>Category:</strong> ${formatCategory(product.category)}</p>
                                    <p>${product.description}</p>
                                </div>
                                <div class="product-rating">
                                    <div class="rating-stars">
                                        ${generateStars(product.rating.rate)}
                                    </div>
                                    <div class="rating-count">
                                        (${product.rating.count} reviews)
                                    </div>
                                </div>
                            </div>
                        `;
                        productCard.appendChild(overlay);

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

    function formatCategory(category) {
        return category.replace(/'/g, '')
                      .replace("mens", "men's")
                      .replace("womens", "women's")
                      .split(' ')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ');
    }

    function generateStars(rating) {
        const fullStars = '★'.repeat(Math.round(rating));
        const emptyStars = '☆'.repeat(5 - Math.round(rating));
        return fullStars + emptyStars;
    }
});

function gotoForm(product) {
    sessionStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "form.html";
}