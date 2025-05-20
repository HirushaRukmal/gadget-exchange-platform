
document.addEventListener("DOMContentLoaded", function () {
    M.Modal.init(document.querySelectorAll(".modal"));
    loadUsers();
});

const loadUsers = () => {
    fetch("/api/users")
        .then((res) => res.json())
        .then((users) => {
            const tbody = document.getElementById("userTableBody");
            tbody.innerHTML = "";
            users.forEach((user) => {
                const row = document.createElement("tr");
                row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
              <button class="btn-small blue edit-btn" data-id="${user._id}">Edit</button>
              <button class="btn-small red delete-btn" data-id="${user._id}">Delete</button>
            </td>
          `;
                tbody.appendChild(row);
            });

            document.querySelectorAll(".delete-btn").forEach((btn) => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.id;
                    if (confirm("Are you sure?")) {
                        await fetch(`/api/users/${id}`, { method: "DELETE" });
                        loadUsers();
                    }
                });
            });

            document.querySelectorAll(".edit-btn").forEach((btn) => {
                btn.addEventListener("click", () => {
                    const user = users.find((u) => u._id === btn.dataset.id);
                    document.getElementById("editUserId").value = user._id;
                    document.getElementById("editUsername").value = user.username;
                    document.getElementById("editEmail").value = user.email;
                    document.getElementById("editPassword").value = "";
                    M.updateTextFields();
                    const modal = M.Modal.getInstance(document.getElementById("editUserModal"));
                    modal.open();
                });
            });
        });
};

// CREATE user form
document.getElementById("userCreateForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        username: document.getElementById("createUsername").value,
        email: document.getElementById("createEmail").value,
        password: document.getElementById("createPassword").value,
    };

    await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const modal = M.Modal.getInstance(document.getElementById("createUserModal"));
    modal.close();
    e.target.reset();
    loadUsers();
});

// EDIT user form
document.getElementById("userEditForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("editUserId").value;
    const data = {
        username: document.getElementById("editUsername").value,
        email: document.getElementById("editEmail").value,
        password: document.getElementById("editPassword").value,
    };
    if (!data.password) delete data.password;

    await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const modal = M.Modal.getInstance(document.getElementById("editUserModal"));
    modal.close();
    loadUsers();
});

// Trigger Create User Modal
document.getElementById("createUserBtn").addEventListener("click", () => {
    const modal = M.Modal.getInstance(document.getElementById("createUserModal"));
    modal.open();
});