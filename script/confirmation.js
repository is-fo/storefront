document.addEventListener("DOMContentLoaded", function () {
    
    const product = JSON.parse(localStorage.getItem("orderProduct"));
    const userInfo = JSON.parse(localStorage.getItem("orderInfo"));

    if (product) {
        document.getElementById("product-image").src = product.image;
        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-price").textContent = `Pris: $${product.price}`;
    }

    if (userInfo) {
        document.getElementById("customer-name").textContent = `${userInfo.firstname} ${userInfo.lastname}`;
        document.getElementById("customer-email").textContent = userInfo.email;
        document.getElementById("customer-phone").textContent = userInfo.phone;
        document.getElementById("customer-address").textContent = `${userInfo.street}, ${userInfo.zipcode} ${userInfo.city}`;
    }
});