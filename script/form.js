document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("order-form");

    const submitBtn = document.getElementById("submit-btn");

    const product = JSON.parse(sessionStorage.getItem("selectedProduct"));

    if (product) {
        document.getElementById("product-price").innerHTML = `$${product.price} `;
        document.getElementById('product-image').src = product.image;
        document.getElementById('product-title').innerHTML = product.title;
        document.getElementById('order-total').innerHTML = `$${product.price}`;
    }

    if (form) {
        document.getElementById('form-zipcode').addEventListener("change", function () {
            this.value = this.value.replace(" ", "");
        });
    }
 
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const userInfo = {
                firstname: document.getElementById("form-firstname")?.value,
                lastname: document.getElementById("form-lastname")?.value,
                email: document.getElementById("form-email")?.value,
                phone: document.getElementById("form-phone")?.value,
                street: document.getElementById("form-street")?.value,
                zipcode: document.getElementById("form-zipcode")?.value,
                city: document.getElementById("form-city")?.value
            };

            let isValid = true;

            if (userInfo.firstname.length < 2 || userInfo.firstname.length > 50) {
                alert("Förnamn måste vara mellan 2 och 50 tecken.");
                isValid = false;
            }

            if (userInfo.lastname.length < 2 || userInfo.lastname.length > 50) {
                alert("Efternamn måste vara mellan 2 och 50 tecken.");
                isValid = false;
            }

            if (userInfo.email.length < 2 || userInfo.email.length > 50 || !userInfo.email.includes("@")) {
                alert("E-post måste vara mellan 2 och 50 tecken och innehålla '@'.");
                isValid = false;
            }
            
            const phonePattern = /^[0-9\-\(\)]{1,50}$/;
            if (!phonePattern.test(userInfo.phone)) {
                alert("Telefonnummer får endast innehålla siffror, bindestreck och parenteser");
                isValid = false;
            }

            if (userInfo.street.length < 2 || userInfo.street.length > 50) {
                alert("Gatuadress måste vara mellan 2 och 50 tecken.");
                isValid = false;
            }

            const zipPattern = /^[0-9]{5}$/;
            if (!zipPattern.test(userInfo.zipcode)) {
                alert("Postnummer måste vara exakt 5 siffror.");
                isValid = false;
            }

            if (userInfo.city.length < 2 || userInfo.city.length > 50) {
                alert("Ort måste vara mellan 2 och 50 tecken.");
                isValid = false;
            }


            if (isValid) {
                sessionStorage.setItem("orderInfo", JSON.stringify(userInfo));

                window.location.href = "confirmation.html";
            } else {
                alert("Vänligen fyll i alla fält korrekt!");
            }
        });
    }
});