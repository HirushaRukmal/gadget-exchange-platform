document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addGadgetForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        try {
            const response = await fetch('/api/gadgets', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (response.ok) {
                alert('Gadget added successfully!');
                form.reset();
                window.location.href = 'index.html'; // Redirect to the main page
            } else {
                alert('Error: ' + result.message);
            }
        } catch (err) {
            console.error('Error submitting gadget:', err);
            alert('Failed to add gadget. Check console for details.');
        }
    });
});