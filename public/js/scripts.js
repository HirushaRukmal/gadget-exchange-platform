// public/js/script.js
document.addEventListener("DOMContentLoaded", function () {
    M.Modal.init(document.querySelectorAll(".modal"));

    const listingForm = document.getElementById("listing-form");
    if (listingForm) {
        listingForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const title = document.getElementById("title").value.trim();
            const category = document.getElementById("category").value.trim();
            const imageUrl = document.getElementById("imageUrl").value.trim();

            if (!title || !category || !imageUrl) {
                M.toast({ html: "All listing fields are required!" });
            } else {
                M.toast({ html: "Listing submitted!" });
                listingForm.reset();
            }
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
    }

    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let valid = true;

            const username = registrationForm.username.value.trim();
            const email = registrationForm.email.value.trim();
            const password = registrationForm.password.value.trim();

            const usernameError = document.getElementById("usernameError");
            const emailError = document.getElementById("emailError");
            const passwordError = document.getElementById("passwordError");

            usernameError.textContent = "";
            emailError.textContent = "";
            passwordError.textContent = "";

            if (!username) {
                usernameError.textContent = "Username is required.";
                valid = false;
            }

            if (!validateEmail(email)) {
                emailError.textContent = "Enter a valid email.";
                valid = false;
            }

            if (!validatePassword(password)) {
                passwordError.textContent = "Password must include upper, lower, digit, special character and be 8+ chars.";
                valid = false;
            }

            if (valid) {
                registrationForm.submit();
            }
        });
    }
});
