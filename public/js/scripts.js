document.addEventListener("DOMContentLoaded", function () {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    // Listing form
    const listingForm = document.getElementById("listing-form");
    listingForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value.trim();
        const imageUrl = document.getElementById("imageUrl").value.trim();

        if (!title || !category || !imageUrl) {
            M.toast({ html: "All listing fields are required!" });
            return;
        }

        M.toast({ html: "Listing submitted!" });
        listingForm.reset();
    });

    // Register form validation & submit
    const registrationForm = document.getElementById("registrationForm");
    const usernameInput = registrationForm.elements["username"];
    const emailInput = registrationForm.elements["email"];
    const passwordInput = registrationForm.elements["password"];

    // Clear all previous errors 
    // helper spans first
    function clearErrors() {
        ["usernameError", "emailError", "passwordError"].forEach(id => {
            document.getElementById(id).textContent = "";
        });
    }

    // Display error message 
    // below specific input
    function displayFieldError(fieldId, message) {
        const errorSpan = document.getElementById(fieldId);
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        let hasError = false;

        if (!usernameInput.value.trim()) {
            displayFieldError("usernameError", "Username is required.");
            hasError = true;
        }

        if (!emailInput.value.trim()) {
            displayFieldError("emailError", "Email is required.");
            hasError = true;
        } else if (!isValidEmail(emailInput.value)) {
            displayFieldError("emailError", "Please enter a valid email address.");
            hasError = true;
        }

        if (!passwordInput.value.trim()) {
            displayFieldError("passwordError", "Password is required.");
            hasError = true;
        } else if (!isStrongPassword(passwordInput.value)) {
            displayFieldError(
                "passwordError",
                "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character."
            );
            hasError = true;
        }

        if (!hasError) {
            alert("Registration successful!");
            registrationForm.reset();
        }
    });

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isStrongPassword(password) {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
    }


    // Login form 
    // validation & submit
    const form = document.getElementById("userForm");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const successMsg = document.getElementById("success-msg");
    const clearBtn = document.getElementById("clearBtn");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        // Clear previous messages
        emailError.style.display = "none";
        passwordError.style.display = "none";
        successMsg.innerText = "";

        // Email validation
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!email.value || !emailPattern.test(email.value)) {
            emailError.style.display = "block";
            valid = false;
        }

        // Password validation
        if (!password.value || password.value.length < 6) {
            passwordError.style.display = "block";
            valid = false;
        }

        if (valid) {
            successMsg.innerText = "Form submitted successfully!";
            form.reset();
        }
    });

    clearBtn.addEventListener("click", function () {
        form.reset();
        emailError.style.display = "none";
        passwordError.style.display = "none";
        successMsg.innerText = "";
    });
});
