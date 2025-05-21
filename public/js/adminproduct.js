document.addEventListener("DOMContentLoaded", function () {
    const modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
    const productModal = M.Modal.getInstance(document.getElementById("createUserModal"));
    const editModal = M.Modal.getInstance(document.getElementById("editUserModal"));

    const createForm = document.getElementById("userCreateForm");
    const editForm = document.getElementById("userEditForm");
    const userTableBody = document.getElementById("userTableBody");

    function loadProducts() {
        fetch("/api/gadgets")
            .then(res => res.json())
            .then(data => {
                userTableBody.innerHTML = "";
                data.gadgets.forEach(gadget => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${gadget.title}</td>
                        <td>${gadget.category}</td>
                        <td>$${parseFloat(gadget.price).toFixed(2)}</td>
                        <td>${gadget.description}</td>
                        <td><img src="/uploads/${gadget.image || 'default.jpg'}" alt="Product Image" width="50"></td>
                        <td>
                            <button class="btn-small blue edit-btn" data-id="${gadget._id}">Edit</button>
                            <button class="btn-small red delete-btn" data-id="${gadget._id}">Delete</button>
                        </td>
                    `;
                    userTableBody.appendChild(row);
                });
            });
    }

    document.getElementById("createUserBtn").addEventListener("click", () => {
        createForm.reset();
        M.updateTextFields();
        productModal.open();
    });

    createForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(createForm);

        fetch("/api/gadgets", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(() => {
                M.toast({ html: "Product created" });
                productModal.close();
                loadProducts();
            });
    });

    userTableBody.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains("edit-btn")) {
            fetch(`/api/gadgets/${id}`)
                .then(res => res.json())
                .then(data => {
                    document.getElementById("editUserId").value = data._id;
                    document.getElementById("editTitle").value = data.title;
                    document.getElementById("editCategory").value = data.category;
                    document.getElementById("editPrice").value = data.price;
                    document.getElementById("editDescription").value = data.description;
                    M.updateTextFields();
                    editModal.open();
                });
        }

        if (e.target.classList.contains("delete-btn")) {
            fetch(`/api/gadgets/${id}`, { method: "DELETE" })
                .then(() => {
                    M.toast({ html: "Product deleted" });
                    loadProducts();
                });
        }
    });

    editForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("editUserId").value;
        const formData = new FormData(editForm);

        fetch(`/api/gadgets/${id}`, {
            method: "PUT",
            body: formData
        })
            .then(res => res.json())
            .then(() => {
                M.toast({ html: "Product updated" });
                editModal.close();
                loadProducts();
            });
    });

    loadProducts();
});
