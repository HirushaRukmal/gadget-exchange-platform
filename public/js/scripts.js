document.addEventListener("DOMContentLoaded", function () {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    // Listing form submission
    const listingForm = document.getElementById("listing-form");
    listingForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value.trim();
        const category = document.getElementById("category").value.trim();
        const imageUrl = document.getElementById("imageUrl").value.trim();

        if (!title || !category || !imageUrl) {
            M.toast({ html: "All fields are required for listing!" });
            return;
        }

        M.toast({ html: "Listing submitted!" });
        listingForm.reset();
    });

    // Register form validation
    document.getElementById("submitRegister").addEventListener("click", () => {
        const username = document.getElementById("regUsername").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value.trim();

        if (!username || !email || !password) {
            M.toast({ html: "Please fill all registration fields." });
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            M.toast({ html: "Enter a valid email." });
            return;
        }

        if (password.length < 6) {
            M.toast({ html: "Password must be at least 6 characters." });
            return;
        }

        M.toast({ html: "Registered successfully!" });
    });

    // Login form validation
    document.getElementById("submitLogin").addEventListener("click", () => {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();

        if (!email || !password) {
            M.toast({ html: "Email and password are required." });
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            M.toast({ html: "Enter a valid email address." });
            return;
        }

        M.toast({ html: "Login successful!" });
    });
});
