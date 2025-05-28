document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const emailError = document.getElementById("emailError");
        const passwordError = document.getElementById("passwordError");
        const successMsg = document.getElementById("successMsg");

        const emailVal = email.value.trim();
        const passwordVal = password.value.trim();

        // Admin bypass
        if (emailVal === "admin" && passwordVal === "admin") {
            window.location.href = "admin.html";
            return;
        }

        // Reset error messages
        emailError.style.display = "none";
        passwordError.style.display = "none";
        successMsg.innerText = "";

        let valid = true;
        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

        if (!emailPattern.test(emailVal)) {
            emailError.style.display = "block";
            valid = false;
        }

        if (!passwordVal || passwordVal.length < 6) {
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
                    email: emailVal,
                    password: passwordVal,
                }),
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Login failed");
                    return res.json();
                })
                .then((data) => {
                    if (successMsg) successMsg.innerText = data.message || "Form submitted successfully!";
                    localStorage.setItem("loggedIn", "true");  // set loggedIn flag
                    loginForm.reset();
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 500);
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
