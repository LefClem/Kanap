import { getItems } from "./api.js";

function displayItems(items) {
    items.forEach(elem => {
        const html = `<a href="./product.html?id=${elem.id}">
        <article>
        <img src="${elem.image}" alt="${elem.imageDescription}">
        <h3 class="productName">${elem.name}</h3>
        <p class="productDescription">${elem.description}</p>
        </article>
        </a>`;
        document.getElementById("items").insertAdjacentHTML("afterbegin", html)
    });
}


async function init() {
    const items = await getItems();
    displayItems(items);
}

init();

