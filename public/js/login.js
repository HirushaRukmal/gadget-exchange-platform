// public/js/login.js
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const successMsg = document.getElementById("successMsg");

        if (!email || !password) {
            successMsg.textContent = "Please enter email and password.";
            successMsg.style.color = "red";
            return;
        }

        try {
            const res = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();
            successMsg.textContent = data.message || data.error;
            successMsg.style.color = res.ok ? "green" : "red";

            if (res.ok) {
                loginForm.reset();
                // Redirect or perform login action
            }
        } catch (err) {
            successMsg.textContent = "Server error. Try again.";
            successMsg.style.color = "red";
        }
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        loginForm.reset();
        document.getElementById("successMsg").textContent = "";
    });
});
