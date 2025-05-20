document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let valid = true;

        const username = document.getElementById("username");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        const usernameError = document.getElementById("usernameError");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const successMsg = document.getElementById("successMsg");

        // Reset error display
        usernameError.style.display = "none";
        emailError.style.display = "none";
        passwordError.style.display = "none";
        successMsg.innerText = "";

        //  Registration Validation
        if (!username.value.trim()) {
            usernameError.style.display = "block";
            valid = false;
        }

        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;
        if (!emailPattern.test(email.value)) {
            emailError.style.display = "block";
            valid = false;
        }

        if (!password.value || password.value.length < 6) {
            passwordError.style.display = "block";
            valid = false;
        }

        if (valid) {
            fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username.value.trim(),
                    email: email.value.trim(),
                    password: password.value
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to register user");
                    }
                    return response.json();
                })
                .then(data => {
                    successMsg.innerText = "Registration successful!";
                    registerForm.reset();
                    setTimeout(() => {
                        window.location.href = "login.html";// Redirect to the main page after successful login
                    }, 500);// 500ms delay before redirecting
                })
                .catch(error => {
                    console.error("Error during registration:", error);
                    successMsg.innerText = "Registration failed. Try again.";
                    successMsg.style.color = "red";
                });
        }
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        registerForm.reset();
        document.getElementById("usernameError").style.display = "none";
        document.getElementById("emailError").style.display = "none";
        document.getElementById("passwordError").style.display = "none";
        document.getElementById("successMsg").innerText = "";
    });
});
