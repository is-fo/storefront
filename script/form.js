document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("order-form");
    const submitBtn = document.getElementById("submit-btn");

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
            for (let key in userInfo) {
                if (userInfo[key] === "" || userInfo[key] === null) {
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                localStorage.setItem("orderInfo", JSON.stringify(userInfo));

                const product = JSON.parse(localStorage.getItem("selectedProduct"));
                localStorage.setItem("orderProduct", JSON.stringify(product));

                window.location.href = "confirmation.html";
            } else {
                alert("Vänligen fyll i alla fält korrekt!");
            }
        });
    }
});