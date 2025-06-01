async function loadWishlist() {
  try {
    const res = await fetch('/api/wishlist', {
      method: 'GET',
      credentials: 'include'  // send cookies/session
    });

    const data = await res.json();

    if (res.ok) {
      renderWishlist(data.wishlist);
    } else {
      M.toast({ html: `Error loading wishlist: ${data.error}` });
    }
  } catch (err) {
    M.toast({ html: 'Fetch error while loading wishlist' });
  }
}

function renderWishlist(wishlist) {
  const container = document.getElementById('wishlist-container');
  container.innerHTML = '';

  if (wishlist.length === 0) {
    container.innerHTML = '<h5>Your wishlist is empty.</h5>';
    return;
  }

  const itemsPerRow = 4;
  for (let i = 0; i < wishlist.length; i += itemsPerRow) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    for (let j = i; j < i + itemsPerRow && j < wishlist.length; j++) {
      const item = wishlist[j];
      const gadget = item.gadget;

      const colDiv = document.createElement('div');
      colDiv.classList.add('col', 's12', 'm6', 'l3');

      colDiv.innerHTML = `
        <div class="card hoverable">
          <div class="card-image">
            <img src="/uploads/${gadget.image}" alt="${gadget.title}">
            <span class="card-title">${gadget.title}</span>
          </div>
          <div class="card-content">
            <p class="grey-text text-darken-2">Category: ${gadget.category}</p>
            <p class="red-text"><strong>$${gadget.price}</strong></p>
            <p>${gadget.description.substring(0, 70)}...</p>
          </div>
          <div class="card-action center-align">
            <a href="gadget-details.html?id=${gadget._id}" class="btn-small teal">View</a>
            <button class="btn-small red lighten-1 remove-wishlist-btn" data-id="${item._id}" style="margin-left: 10px;">Remove</button>
          </div>
        </div>
      `;

      rowDiv.appendChild(colDiv);
    }
    container.appendChild(rowDiv);
  }

  // Add event listeners for remove buttons
  document.querySelectorAll('.remove-wishlist-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const wishlistId = e.target.dataset.id;
      try {
        const res = await fetch(`/api/wishlist/${wishlistId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        const data = await res.json();
        if (res.ok) {
          M.toast({ html: 'Removed from wishlist' });
          loadWishlist();  // reload list after removal
        } else {
          M.toast({ html: `Error: ${data.error}` });
        }
      } catch {
        M.toast({ html: 'Error removing from wishlist' });
      }
    });
  });
}

window.onload = loadWishlist;
