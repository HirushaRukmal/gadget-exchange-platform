document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/reports")
        .then(res => res.json())
        .then(data => {
            document.getElementById("userCount").innerText = data.users;
            document.getElementById("productCount").innerText = data.gadgets;
        })
        .catch(err => {
            console.error("Error fetching report:", err);
            document.getElementById("userCount").innerText = "Error";
            document.getElementById("productCount").innerText = "Error";
        });
});
