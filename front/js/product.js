// Call the getItemsProductPage to catch the API data matching the product id of the page
import { getKanap } from "./api.js";

// Call my class Cart to the page product
import { Cart,  AddItemSignal} from "./Classes/Cart.js";

// Create a function generateDom to display the elements of the DOM in my page
function generateDom(kanap, cart, id) {
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${kanap.imageUrl}" alt"${kanap.altTxt}">`;
  document.getElementById("title").textContent = kanap.name;
  document.getElementById("price").textContent = kanap.price;
  document.getElementById("description").textContent = kanap.description;
  setColorChoice(kanap);

  // Creation of a div to display the message for my cart.addItem method
  let message = document.createElement("div");
  message.setAttribute("id", "alert");
  let button = document.querySelector(".item__content__addButton");
  button.appendChild(message);
  button.style.display = "flex";
  button.style["flex-direction"] = "column";
  message.style.textAlign = "center";
  
  // EventListener on the button "Ajouter au panier" to listen the click
  document.getElementById("addToCart").addEventListener("click", () => {
    let color = document.getElementById("colors").value;
    let quantity = document.getElementById("quantity").value;
    // Using the addItem method of my class Cart to add item to my cart
    // Use of a switch to display a message under the button
    switch(cart.addItem(id, color, quantity)){
      case AddItemSignal.WRONG_ITEM:
        message.textContent = "Veuillez ajouter une couleur et choisir une quantité entre 1 et 100 !";
        break;
      case AddItemSignal.CART_UPDATED: 
        message.textContent = "Le panier a été mis à jour !";
        break;
      case AddItemSignal.CART_ADDED:
        message.textContent = "Le produit a été ajouté !";
        break;
    }
  });

}

// function to get the color values inside of the API and display them in the option element
function setColorChoice(kanap) {
  kanap.colors.forEach((elem) => {
    let option = document.createElement("option");
    document.getElementById("colors").appendChild(option);
    option.textContent = elem;
  });
}

// function init to call the functions inside my product page
async function init() {
  // Use of the URLSearchParams to collect the id of the product for the page
  const params = new URLSearchParams(document.location.search);
  let id = params.get("id");
  let cart = new Cart();
  const kanap = await getKanap(id);
  generateDom(kanap, cart, id);
}

// Call the init function
init();
