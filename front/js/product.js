import { getItemsProductPage } from "./api.js";
import { Cart } from "./Classes/Cart.js";

function generateDom(product) {
    document.querySelector(".item__img").innerHTML = `<img src="${product.image}" alt"${product.imageDescription}">`
    document.getElementById("title").textContent = product.name;
    document.getElementById("price").textContent = product.price;
    document.getElementById("description").textContent = product.description;
    chooseColor(product);
    let message = document.createElement("div");
    message.setAttribute("id", "alert");
    let button = document.querySelector(".item__content__addButton");
    button.appendChild(message);
    button.style.display = "flex";
    button.style["flex-direction"] = "column";
    message.style.textAlign = "center";
}

function chooseColor(product) {
    product.colors.forEach(elem => {
        let option = document.createElement("option");
        document.getElementById("colors").appendChild(option);
        option.textContent = elem;
    });
}

function displayAlertMessage(message){
    document.getElementById("alert").textContent = message;
}

function sendToLocalStorage(product) {
    document.getElementById("addToCart").addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        console.log(cart);
        if (quantity.value < 1 || quantity.value > 100 || quantity.value === NaN || document.querySelector("#colors").value === "") {
            displayAlertMessage("Veuillez choisir une quantité entre 1 et 100 et une couleur !");
        } else if (cart !== null && cart.find(el => el.id === product.id && el.color === document.querySelector("#colors").value)) {
            product.updateQuantity(cart, product)
            displayAlertMessage("La quantité a été mise à jour !");
        } else if (cart === null || cart === 0) {
            product.createCartWithProduct();
            displayAlertMessage("Le produit a été ajouté au panier !");
        } else {
            product.pushNewProductToCart(cart)
            displayAlertMessage("Le produit a été ajouté au panier !");
        }
    })
}

async function init() {
    const params = new URLSearchParams(document.location.search)
    let id = params.get("id");
    const product = await getItemsProductPage(id);
    generateDom(product);
    sendToLocalStorage(product);
}

init();

