document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;
       // Get form fields and message elements
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const successMsg = document.getElementById("successMsg");

        // Reset all messages
        emailError.style.display = "none";
        passwordError.style.display = "none";
        successMsg.innerText = "";
        // Simple email pattern for validation
        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailPattern.test(email.value)) {
            emailError.style.display = "block";
            valid = false;
        }
        // Validate password presence and minimum length
        if (!password.value || password.value.length < 6) {
            passwordError.style.display = "block";
            valid = false;
        }
        // If all validations pass, display success message and reset the form
        if (valid) {
            successMsg.innerText = "Login successful!";
            loginForm.reset();
        }
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        loginForm.reset();
        document.getElementById("emailError").style.display = "none";
        document.getElementById("passwordError").style.display = "none";
        document.getElementById("successMsg").innerText = "";
    });
});
