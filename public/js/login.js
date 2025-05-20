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

        if (!password.value || password.value.length < 6) {
            passwordError.style.display = "block";
            valid = false;
        }

        if (valid) {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Login failed");
                    return res.json();
                })
                .then((data) => {
                    successMsg.innerText = data.message || "Login successful!";
                    loginForm.reset();
                    // Redirect after a short delay (optional)
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 500); // 0.5 second delay
                })
                .catch((err) => {
                    successMsg.innerText = "Login failed. Please try again.";
                    console.error(err);
                });
        }
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        loginForm.reset();
        document.getElementById("emailError").style.display = "none";
        document.getElementById("passwordError").style.display = "none";
        document.getElementById("successMsg").innerText = "";
    });
});
