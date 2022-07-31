// Call the getKanapList to catch the API data and the postToApi function to send the form content and the product to the API
import { getKanapList, postMethod } from "./api.js";

// Import of my Cart class to use the methods includes in it and use them in my Cart page
import { Cart } from "./Classes/Cart.js";

// Create a function generateDom to display the elements of the DOM in my page
function generateDom(cart, kanapList) {
  // Creation of a div to display a message under the order button
  let message = document.createElement("div");
  message.style.textAlign = "center";
  document.querySelector(".cart__order__form__submit").style.display = "flex";
  document.querySelector(".cart__order__form__submit").style["flex-direction"] =
    "column";
  document.querySelector(".cart__order__form__submit").appendChild(message);
  
  const productInCart = cart.list();

  if (productInCart == 0) {
    displayEmptyCartMessage();
  } else {
    // Loop through the local storage to display all the items added on the product page
    for (let i = 0; i < productInCart.length; i++) {
      const kanap = productInCart[i];
      const kanapInfo = kanapList.find((data) => data._id === kanap.id);
      displayItem(kanap, kanapInfo, cart);

      let inputQuantity = document.getElementsByClassName("itemQuantity")[i];
      // EventListener to listen every number input to change the quantity of the kanap of our choice
      inputQuantity.addEventListener("change", () => {
        if (
          inputQuantity.value < 1 ||
          inputQuantity.value > 100 ||
          inputQuantity.value === NaN
        ) {
          inputMsg.textContent =
            "Veuillez choisir une quantité entre 1 et 100 !";
        } else {
          modifyDomQuantity(cart, kanap, kanapList, inputQuantity.value);
          inputMsg.textContent = "";
        }
      });
      // Eventlistener on the delete button to call the removeItem method and delete the matching article in the DOM
      document
        .getElementsByClassName("deleteItem")
        [i].addEventListener("click", () => {
          deleteItem(cart, kanap, kanapList, inputQuantity);
        });

      // Creation of a p element to display a message for the input number
      let contain = document.querySelector("#cart__items");
      let inputMsg = document.createElement("p");
      inputMsg.style.textAlign = "center";
      contain.appendChild(inputMsg);
    }

    // Display the total quantity and total price of the cart
    const totalValue = cart.getTotalValue(kanapList);
    document.querySelector("#totalQuantity").textContent = totalValue.quantity;
    document.getElementById("totalPrice").textContent = totalValue.price;

    const form = document.querySelector(".cart__order__form");

    // Check the value while the user is filling the form up
    form.firstName.addEventListener("change", () => {
      checkForm(
        "firstName",
        "firstNameErrorMsg",
        "Veuillez entrer votre prénom !",
        inputRegExp()
      );
    });
    form.lastName.addEventListener("change", () => {
      checkForm(
        "lastName",
        "lastNameErrorMsg",
        "Veuillez entrer votre nom !",
        inputRegExp()
      );
    });
    form.address.addEventListener("change", () => {
      checkForm(
        "address",
        "addressErrorMsg",
        "Veuillez entrer votre adresse !",
        addressRegExp()
      );
    });
    form.city.addEventListener("change", () => {
      checkForm(
        "city",
        "cityErrorMsg",
        "Veuillez entrer le nom de votre ville !",
        inputRegExp()
      );
    });
    form.email.addEventListener("change", () => {
      checkForm(
        "email",
        "emailErrorMsg",
        "Veuillez entrer une adresse mail conforme !",
        emailRegExp()
      );
    });

    // EventListener to listen the order button and send the cart + form data
    document.querySelector("#order").addEventListener("click", (e) => {
      e.preventDefault();
      postFormAndProduct(cart, message);
    });
  }
}

// Function to delete an item in the cart
function deleteItem(cart, kanap, kanapList, inputQuantity) {
  cart.removeItem(kanap);
  modifyDomQuantity(cart, kanap, kanapList, inputQuantity);
  document
    .querySelector(
      `article[data-id="${kanap.id}"][data-color="${kanap.color}"]`
    )
    .remove();
}

// Function to check the data in the form and send the values to the API
function postFormAndProduct(cart, message) {
  let inputFirstName = document.querySelector("#firstName");
  let inputLastName = document.querySelector("#lastName");
  let inputAddress = document.querySelector("#address");
  let inputCity = document.querySelector("#city");
  let inputMail = document.querySelector("#email");

  if (cart.list() == 0 || cart.list() == null) {
    message.innerText = "Veuillez ajouter des articles au panier !";
  } else if (
    !inputFirstName.value ||
    !inputLastName.value ||
    !inputCity.value ||
    !inputAddress.value ||
    !inputMail.value
  ) {
    message.innerText = "Merci de remplir le formulaire en entier !";
  } else if (
    !inputRegExp().test(firstName.value) ||
    !inputRegExp().test(lastName.value) ||
    !inputRegExp().test(city.value) ||
    !addressRegExp().test(address.value) ||
    !emailRegExp().test(email.value)
  ) {
    message.innerText = "Merci de compléter correctement le formulaire !";
  } else {
    postMethod(
      prepareOrderToSend(
        cart,
        inputFirstName,
        inputLastName,
        inputAddress,
        inputCity,
        inputMail
      )
    );
  }
}

// Function to modify the quantity live ine the cart page
function modifyDomQuantity(cart, kanap, kanapList, inputQuantity) {
  cart.updateQuantity(kanap, inputQuantity);
  document.querySelector("#totalQuantity").textContent =
    cart.getTotalValue(kanapList).quantity;
  document.querySelector("#totalPrice").textContent =
    cart.getTotalValue(kanapList).price;
}

// Function to initialize the order whom will be sent to the API
function prepareOrderToSend(cart, firstName, lastName, address, city, email) {
  const order = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    products: cart.list().map((kanap) => {
      return kanap.id;
    }),
  };
  return order;
}

// Function returning the regular expression for the first name, last name and the city
function inputRegExp() {
  let inputRegEx = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç,.'-]+$");
  return inputRegEx;
}

// Function returning the regular expression for the address
function addressRegExp() {
  let addressRegEx = new RegExp(
    "^([a-zA-Z0-9\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z0-9\u0080-\u024F]*$"
  );
  return addressRegEx;
}

// Function returning the regular expression for the email
function emailRegExp() {
  let emailRegEx = new RegExp(
    "^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$"
  );
  return emailRegEx;
}

// Function to check the form values and display a message if the values are incorrect
function checkForm(name, error, msg, check) {
  let input = document.getElementById(name);
  let errorMsg = document.getElementById(error);
  if (check.test(input.value)) {
    errorMsg.innerText = " ";
  } else {
    errorMsg.innerText = msg;
  }
}

// Function to display a message saying the cart is empty
const displayEmptyCartMessage = () => {
  let basket = document.querySelector("#cart__items");
  let emptyBasket = `<p>Votre panier est vide !</p>`;
  basket.insertAdjacentHTML("afterbegin", emptyBasket);
};

// Function to display the items added in the cart
function displayItem(kanapInCart, kanapInfo) {
  const html = `<article class="cart__item" data-id="${kanapInCart.id}" data-color="${kanapInCart.color}">
        <div class="cart__item__img">
          <img src="${kanapInfo.imageUrl}" alt="${kanapInfo.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${kanapInfo.name}</h2>
            <p>${kanapInCart.color}</p>
            <p>${kanapInfo.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanapInCart.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
  document.querySelector("#cart__items").insertAdjacentHTML("beforeend", html);
}

// function init to call the functions inside my cart page
async function init() {
  const cart = new Cart();
  const kanapList = await getKanapList();
  generateDom(cart, kanapList);
}

// Call the init function
init();
