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

        // Admin bypass check FIRST
        if (emailVal === "admin" && passwordVal === "admin") {
            window.location.href = "admin.html";
            return;
        }

        // Reset validation messages
        emailError.style.display = "none";
        passwordError.style.display = "none";
        successMsg.innerText = "";

        let valid = true;
        const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;// Regular expression for email validation

        if (!emailPattern.test(emailVal)) {
            emailError.style.display = "block";
            valid = false;
        }// Check if email is valid

        if (!passwordVal || passwordVal.length < 6) {
            passwordError.style.display = "block";
            valid = false;
        }// Check if password is empty or less than 6 characters

        if (valid) {
            fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },// Set the content type to JSON
                body: JSON.stringify({
                    email: emailVal,
                    password: passwordVal,
                }),// Convert the data to JSON
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Login failed");// Handle non-200 responses
                    return res.json();
                })
                .then((data) => {
                    successMsg.innerText = data.message || "Login successful!";// Display success message
                    loginForm.reset();
                    setTimeout(() => {
                        window.location.href = "index.html";// Redirect to the main page after successful login
                    }, 500);// 500ms delay before redirecting
                })
                .catch((err) => {
                    successMsg.innerText = "Login failed. Please try again.";// Display error message
                    console.error(err);
                });
        }
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        loginForm.reset();
        document.getElementById("emailError").style.display = "none";// Clear email 
        document.getElementById("passwordError").style.display = "none";// Clear password 
        document.getElementById("successMsg").innerText = "";// Clear success message
    });
});
