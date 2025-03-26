document.addEventListener("DOMContentLoaded", function() {
    
    const product = JSON.parse(sessionStorage.getItem("orderProduct"));
    const userInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    
    
    const orderNumber = Math.floor(100000 + Math.random() * 900000) + "SE";
    const orderDate = new Date().toLocaleDateString('sv-SE');
    
    
    if (userInfo) {
        document.getElementById('customer-name').textContent = userInfo.firstname + " " + userInfo.lastname;
        document.getElementById('customer-email').textContent = userInfo.email;
        document.getElementById('customer-phone').textContent = userInfo.phone;
        document.getElementById('customer-address').innerHTML = `
            ${userInfo.firstname} ${userInfo.lastname}<br>
            ${userInfo.street}<br>
            ${userInfo.zipcode} ${userInfo.city}
        `;
    }
    
    
    if (product) {
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById("product-price").textContent = `${product.priceSEK} SEK`;
        document.getElementById('order-total').textContent = `${product.priceSEK} SEK`;
    }
    
    
    document.getElementById('order-number').textContent = orderNumber;
    document.getElementById('order-date').textContent = orderDate;
    
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    document.getElementById('delivery-date').textContent = deliveryDate.toLocaleDateString('sv-SE');
});