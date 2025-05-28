document.addEventListener("DOMContentLoaded", function () {
    // Initialize Materialize components
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);

    // Listing form submission (if applicable on the page)
    const listingForm = document.getElementById("listing-form");
    if (listingForm) {
        listingForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const title = document.getElementById("title").value.trim();
            const category = document.getElementById("category").value.trim();
            const imageUrl = document.getElementById("imageUrl").value.trim();

            if (!title || !category || !imageUrl) {
                M.toast({ html: "All listing fields are required!" });
                return;
            }

            M.toast({ html: "Listing submitted!" });
            listingForm.reset();
        });
    }

    // Registration form validation and submit
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        const usernameInput = registrationForm.elements["username"];
        const emailInput = registrationForm.elements["email"];
        const passwordInput = registrationForm.elements["password"];

        // Clear all previous errors helper spans first
        function clearErrors() {
            ["usernameError", "emailError", "passwordError"].forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.textContent = "";
            });
        }

        // Display error message below specific input
        function displayFieldError(fieldId, message) {
            const errorSpan = document.getElementById(fieldId);
            if (errorSpan) {
                errorSpan.textContent = message;
            }
        }

        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();
            clearErrors();

            let hasError = false;

            if (!usernameInput.value.trim()) {
                displayFieldError("usernameError", "Username is required.");
                hasError = true;
            }

            if (!emailInput.value.trim()) {
                displayFieldError("emailError", "Email is required.");
                hasError = true;
            } else if (!isValidEmail(emailInput.value)) {
                displayFieldError("emailError", "Please enter a valid email address.");
                hasError = true;
            }

            if (!passwordInput.value.trim()) {
                displayFieldError("passwordError", "Password is required.");
                hasError = true;
            } else if (!isStrongPassword(passwordInput.value)) {
                displayFieldError(
                    "passwordError",
                    "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character."
                );
                hasError = true;
            }

            if (!hasError) {
                alert("Registration successful!");
                registrationForm.reset();
            }
        });

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        function isStrongPassword(password) {
            return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password);
        }
    }

    // Login form validation and submit
    const loginForm = document.getElementById("userForm");
    if (loginForm) {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const emailError = document.getElementById("email-error");
        const passwordError = document.getElementById("password-error");
        const successMsg = document.getElementById("success-msg");
        const clearBtn = document.getElementById("clearBtn");

        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let valid = true;

            // Clear previous messages
            if (emailError) emailError.style.display = "none";
            if (passwordError) passwordError.style.display = "none";
            if (successMsg) successMsg.innerText = "";

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value || !emailPattern.test(email.value)) {
                if (emailError) emailError.style.display = "block";
                valid = false;
            }

            // Password validation
            if (!password.value || password.value.length < 6) {
                if (passwordError) passwordError.style.display = "block";
                valid = false;
            }

            if (valid) {
                if (successMsg) successMsg.innerText = "Form submitted successfully!";
                loginForm.reset();
            }
        });

        if (clearBtn) {
            clearBtn.addEventListener("click", function () {
                loginForm.reset();
                if (emailError) emailError.style.display = "none";
                if (passwordError) passwordError.style.display = "none";
                if (successMsg) successMsg.innerText = "";
            });
        }
    }
});

// Gadget listing and pagination
const itemsPerPage = 16;
const itemsPerRow = 4;
let currentPage = 1;
let totalPages = 1;
let searchQuery = '';

const gadgetContainer = document.getElementById('gadgetContainer');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('searchInput');

async function fetchGadgets(page = 1, search = '') {
    try {
        const res = await fetch(`/api/gadgets?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}`);
        if (!res.ok) throw new Error("Failed to fetch gadgets");
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching gadgets:", error);
        return { gadgets: [], totalPages: 1, page: 1 };
    }
}

async function renderGadgets(page = 1, search = '') {
    if (!gadgetContainer || !paginationContainer) return;

    const data = await fetchGadgets(page, search);
    const gadgetsToShow = data.gadgets || [];
    totalPages = data.totalPages || 1;
    currentPage = data.page || 1;

    gadgetContainer.innerHTML = '';

    for (let i = 0; i < gadgetsToShow.length; i += itemsPerRow) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        for (let j = i; j < i + itemsPerRow && j < gadgetsToShow.length; j++) {
            const gadget = gadgetsToShow[j];
            const colDiv = document.createElement('div');
            colDiv.classList.add('col', 's12', 'm6', 'l3');
            colDiv.innerHTML = `
        <div class="card hoverable">
          <div class="card-image"><br/>
            <img src="/uploads/${gadget.image}" alt="${gadget.title}" />
            <span class="card-title">${gadget.title}</span>
          </div>
          <div class="card-content">
            <p class="grey-text text-darken-2">Category: ${gadget.category}</p>
            <p class="red-text"><strong>$${gadget.price}</strong></p>
            <p>${gadget.description}</p>
          </div>
          <div class="card-action center-align">
            <a href="message.html" class="btn-small teal">Buy Now</a>
          </div>
        </div>
      `;
            rowDiv.appendChild(colDiv);
        }
        gadgetContainer.appendChild(rowDiv);
    }

    renderPagination();
}

function renderPagination() {
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    // Previous button
    const prevLi = document.createElement('li');
    prevLi.classList.add(currentPage === 1 ? 'disabled' : 'waves-effect');
    prevLi.innerHTML = `<a href="#!"><i class="material-icons">chevron_left</i></a>`;
    prevLi.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderGadgets(currentPage, searchQuery);
        }
    });
    paginationContainer.appendChild(prevLi);

    // Page numbers (max 5 pages at once)
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        const pageLi = document.createElement('li');
        pageLi.classList.add(i === currentPage ? 'active' : 'waves-effect');
        if (i === currentPage) pageLi.classList.add('teal');
        pageLi.innerHTML = `<a href="javascript:void(0);">${i}</a>`;
        pageLi.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            currentPage = i;
            renderGadgets(currentPage, searchQuery);
        });
        paginationContainer.appendChild(pageLi);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.classList.add(currentPage === totalPages ? 'disabled' : 'waves-effect');
    nextLi.innerHTML = `<a href="#!"><i class="material-icons">chevron_right</i></a>`;
    nextLi.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderGadgets(currentPage, searchQuery);
        }
    });
    paginationContainer.appendChild(nextLi);
}

if (searchInput) {
    searchInput.addEventListener('input', () => {
        searchQuery = searchInput.value.trim();
        currentPage = 1;
        renderGadgets(currentPage, searchQuery);
    });
}

// Initial render on page load
renderGadgets(currentPage, searchQuery);
