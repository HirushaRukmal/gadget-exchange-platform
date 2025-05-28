// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('messageForm');
//     const messageDiv = document.getElementById('confirmationMessage');

//     form.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const name = this.name.value.trim();
//         const description = this.description.value.trim();

//         if (!name || !description) {
//             messageDiv.style.color = 'red';
//             messageDiv.textContent = 'Please fill in both fields.';
//             return;
//         }

//         // Show success message
//         messageDiv.style.color = 'green';
//         messageDiv.textContent = `Message sent! Thank you, ${name}. Redirecting...`;

//         // Optionally, here you'd send the data to your backend

//         // Reset the form (optional)
//         form.reset();

//         // Redirect after 2 seconds
//         setTimeout(() => {
//             window.location.href = 'index.html';
//         }, 2000);
//     });
// });


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("messageForm");
    const messageDiv = document.getElementById("confirmationMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            messageDiv.style.color = "red";
            messageDiv.textContent = "Please fill in all fields.";
            return;
        }

        fetch("/api/owner-message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                }
                messageDiv.style.color = "green";
                messageDiv.textContent = "Message sent successfully!";
                form.reset();
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 2000);
            })
            .catch((err) => {
                console.error("Submission error:", err);
                messageDiv.style.color = "red";
                messageDiv.textContent = "Something went wrong. Please try again.";
            });
    });
});
