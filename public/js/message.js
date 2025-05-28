document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('messageForm');
    const messageDiv = document.getElementById('confirmationMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = this.name.value.trim();
        const description = this.description.value.trim();

        if (!name || !description) {
            messageDiv.style.color = 'red';
            messageDiv.textContent = 'Please fill in both fields.';
            return;
        }

        // Show success message
        messageDiv.style.color = 'green';
        messageDiv.textContent = `Message sent! Thank you, ${name}. Redirecting...`;

        // Optionally, here you'd send the data to your backend

        // Reset the form (optional)
        form.reset();

        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
});