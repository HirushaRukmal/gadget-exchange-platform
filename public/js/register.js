// public/js/register.js
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const successMsg = document.getElementById("successMsg");

        // Simple front-end validation
        if (!username || !email || !password) {
            successMsg.textContent = "All fields are required.";
            successMsg.style.color = "red";
            return;
        }

        try {
            const res = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            successMsg.textContent = data.message || data.error;
            successMsg.style.color = res.ok ? "green" : "red";
            if (res.ok) registerForm.reset();
        } catch (err) {
            successMsg.textContent = "Server error. Try again.";
            successMsg.style.color = "red";
        }
    });

    document.getElementById("clearBtn").addEventListener("click", () => {
        registerForm.reset();
        document.getElementById("successMsg").textContent = "";
    });
});
