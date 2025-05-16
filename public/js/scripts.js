document.addEventListener("DOMContentLoaded", function () {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    const listingForm = document.getElementById("listing-form");
    listingForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const imageUrl = document.getElementById("imageUrl").value;

        console.log("New Listing:");
        console.log("Title:", title);
        console.log("Category:", category);
        console.log("Image URL:", imageUrl);

        M.toast({ html: "Listing submitted!" });

        listingForm.reset();
    });
});
