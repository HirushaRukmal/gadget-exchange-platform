
// const gadgets = [
//     {
//         title: 'iPhone X',
//         category: 'Mobile',
//         price: 599,
//         description: 'Excellent condition with charger. 64GB storage.',
//         image: 'images/image 2.png'
//     },
//     {
//         title: 'Headset',
//         category: 'Tablet',
//         price: 299,
//         description: 'Like new. 10.1" screen, includes stylus.',
//         image: 'images/image.png'
//     },
//     {
//         title: 'Earpods',
//         category: 'Tablet',
//         price: 299,
//         description: 'Like new. 10.1" screen, includes stylus.',
//         image: 'images/image 1.png'
//     },
//     {
//         title: 'iPhone 16 Pro',
//         category: 'Tablet',
//         price: 299,
//         description: 'Like new. 10.1" screen, includes stylus.',
//         image: 'images/image 3.png'
//     },
//     {
//         title: 'VR Headset',
//         category: 'Mobile',
//         price: 599,
//         description: 'Excellent condition with charger. 64GB storage.',
//         image: 'images/image 6.png'
//     },
//     {
//         title: 'PSP',
//         category: 'Tablet',
//         price: 299,
//         description: 'Like new. 10.1" screen, includes stylus.',
//         image: 'images/image 7.png'
//     },
//     {
//         title: 'Nikon DSLR Camera',
//         category: 'Tablet',
//         price: 299,
//         description: 'Like new. 10.1" screen, includes stylus.',
//         image: 'images/image 5.png'
//     },
//     {
//         title: 'LED Monitor',
//         category: 'Tablet',
//         price: 299,
//         description: 'Like new. 10.1" screen, includes stylus.',
//         image: 'images/image 4.png'
//     }
// ];

// const itemsPerPage = 4;
// let currentPage = 1;
// let filteredGadgets = [...gadgets];

// const gadgetContainer = document.getElementById("gadgetContainer");
// const paginationContainer = document.getElementById("pagination");
// const searchInput = document.getElementById("searchInput");

// function renderGadgets() {
//     const start = (currentPage - 1) * itemsPerPage;
//     const end = start + itemsPerPage;
//     const items = filteredGadgets.slice(start, end);

//     gadgetContainer.innerHTML = items
//         .map(
//             (gadget) => `
//       <div class="col s12 m6 l3">
//         <div class="card hoverable">
//           <div class="card-image">
//             <img src="${gadget.image}" alt="${gadget.title}" />
//             <span class="card-title">${gadget.title}</span>
//           </div>
//           <div class="card-content">
//             <p class="grey-text text-darken-2">Category: ${gadget.category}</p>
//             <p class="red-text"><strong>$${gadget.price}</strong></p>
//             <p>${gadget.description}</p>
//           </div>
//           <div class="card-action center-align">
//             <a href="#!" class="btn-small teal">Buy Now</a>
//           </div>
//         </div>
//       </div>
//     `
//         )
//         .join("");
// }

// function renderPagination() {
//     const totalPages = Math.ceil(filteredGadgets.length / itemsPerPage);
//     paginationContainer.innerHTML = '';

//     for (let i = 1; i <= totalPages; i++) {
//         paginationContainer.innerHTML += `
//         <li class="${i === currentPage ? 'active teal' : 'waves-effect'}">
//           <a href="#!" onclick="changePage(${i})">${i}</a>
//         </li>
//       `;
//     }
// }

// function changePage(page) {
//     currentPage = page;
//     renderGadgets();
//     renderPagination();
// }

// searchInput.addEventListener("input", () => {
//     const keyword = searchInput.value.toLowerCase();
//     filteredGadgets = gadgets.filter(
//         (g) =>
//             g.title.toLowerCase().includes(keyword) ||
//             g.category.toLowerCase().includes(keyword)
//     );
//     currentPage = 1;
//     renderGadgets();
//     renderPagination();
// });

// // Initial render
// renderGadgets();
// renderPagination();
