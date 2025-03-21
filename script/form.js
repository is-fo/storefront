document.addEventListener("DOMContentLoaded", function () {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (product) {
        document.getElementById("product-title").value = product.title;
        document.getElementById("product-price").value = product.price;
        document.getElementById("product-image").value = product.image;
    }
});