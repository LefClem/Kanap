// Import de la fonction postToApi pour envoyer la commande au backend et récupérer l'orderId
import { postToApi } from "./Api.js";

// Récupération des articles du localstorage
let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));

// Création d'un tableau pour y stocker les données de l'api
let productData = [];

/* Fonction pour récupérer les données et afficher les produits dans la page panier de manière
* asynchrone
*/
const getProductData = async () => {

  // Attente de l'appel api et de sa réponse avec la commande await
  const res = await fetch(`http://localhost:3000/api/products/`)
  productData = await res.json();
  
    //console.log(productData);

  // Si le panier est vide
  if(productInLocalStorage == null || productInLocalStorage == 0){
    emptyBasket();
  //Si le panier contient un objet ou plusieurs
  } else {
    
    // Boucle pour afficher chaque produit dans le panier
    for(let i = 0; i < productInLocalStorage.length; i++){
      const product = productInLocalStorage[i];
      const realProduct = productData.find(data => data._id === product.id)

    // Déclaration des fonctions du panier au sein de la boucle for
      displayBasket(product, realProduct);
      deleteItem(product);
      changeQuantity(product);
      displaytotalQuantity(product);
      displayTotalPrice();
    }
   
  }

}

getProductData();

// Affichage d'un message si le panier est vide
const emptyBasket = () => {
  let basket = document.querySelector("#cart__items");
  let emptyBasket = `<p>Votre panier est vide !</p>`;
  basket.insertAdjacentHTML("afterbegin",emptyBasket);
}

// Affichage des produits contenu dans le localstorage 
const displayBasket = (localStorageId, apiId) => {

  let html = `<article class="cart__item" data-id="${localStorageId.id}" data-color="${localStorageId.color}">
    <div class="cart__item__img">
      <img src="${apiId.imageUrl}" alt="${apiId.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${apiId.name}</h2>
        <p>${localStorageId.color}</p>
        <p>${apiId.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageId.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`

  let section = document.querySelector("#cart__items");
  section.insertAdjacentHTML("afterbegin", html);
}

// Affichage du prix total de tout les articles contenu dans le panier
const displayTotalPrice = () => {
// Initialisation de la variable totalPrice à 0
  let totalPrice = 0;

// Boucle for pour parcourir le localstorage
    for(let i = 0; i < productInLocalStorage.length; i++){
      const product = productInLocalStorage[i];

// Recherche avec la méthode find de l'id du localstorage qui correspond à celui de l'api
      const realProduct = productData.find(data => data._id === product.id)

/* Ajout à la variable totalPrice du prix de l'api multiplier par la quantité contenu dans le 
*  localstorage
*/
      totalPrice += productInLocalStorage[i].quantity * realProduct.price;  
      let totalPriceDisplay = document.querySelector("#totalPrice");
      totalPriceDisplay.textContent = totalPrice;
    } 
}

// Affichage du nombre total d'articles contenu dans le panier
const displaytotalQuantity = () => {
// Déclaration de la variable itemQuantity avec comme valeur le contenu du localstorage
  let itemQuantity = productInLocalStorage;

// Initialisation de la variable totalPrice à 0
  let totalQuantity = 0;

// Boucle for of pour itérer dans le tableau itemquantity
    for (const item of itemQuantity) {
/* Ajout de la valeur quantity de chaque item contenu dans le localstorage et ajout de ces 
   valeurs à la variable totalQuantity */
        totalQuantity += Number(item.quantity)
    }
    
  document.querySelector("#totalQuantity").textContent = totalQuantity;
  console.log(totalQuantity);
}

// Fonction permettant de changer le nombre de chaque produit contenu dans le panier
const changeQuantity = (localStorageId) => {
  let input = document.querySelector(".itemQuantity");
  
  /* Création d'un élément p pour inscrire un message d'erreur dans le cas où l'input est
  *  mal renseigné
  */
  let contain = document.querySelector(".cart__item__content__settings__quantity")
  let alertMsg = document.createElement("p");
  contain.appendChild(alertMsg);

  // Écoute de l'input itemQuantity avec un type change
  input.addEventListener("change", () => {
    // Appel de la fonction setupChange
    setupChange(localStorageId, input, alertMsg)
  })
}

/* Fonction de l'addEventListener contenu dans la fonction changeQuantity permettant la mise
* des prix et quantités totales
*/
const setupChange = (localStorageId, input, alertMsg) => {
// Ajout de la valeur quantity du localstorage à la value de l'input
  localStorageId.quantity = parseInt(input.value);

  // Si l'input est mal renseigné
  if(input.value <= 0 || input.value > 100 || (input.value == NaN)){
    alertMsg.textContent = 'Veuillez choisir une quantité comprise entre 1 et 100';
  
  //Si l'input est correct
  } else {
    alertMsg.style.display = "none"

// Appel des fonctions displayTotalPrice et displayTotalQuantity pour mettre à jour l'affichage
    displayTotalPrice();
    displaytotalQuantity();
// Mise à jour du localstorage     
    localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
  }
}

// Fonction permettant de supprimer un produit du panier via le bouton supprimer
/*const deleteItem = (localStorageId) => {

  let deleteButton = document.querySelector(".deleteItem");
    deleteButton.addEventListener("click", function (e){
      e.preventDefault();

      let idDelete = localStorageId.id;
      let colorDelete = localStorageId.color;
      console.log(colorDelete);

      productInLocalStorage = productInLocalStorage.filter( el => el.id !== idDelete && el.color !== colorDelete)

      localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
      location.reload();
    })
    
}*/

function deleteItem(item){
  const div = document.querySelector("cart__item__content__settings__delete")
}

let form = document.querySelector(".cart__order__form");

// Mise en place des expressions régulières pour valider le formulaire selon ces conditions
let emailRegEx = new RegExp('^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$');
let inputRegEx = new RegExp('^[a-zA-Z-àâäéèêëïîôöùûüç,.\'-]+$')
let addressRegEx = new RegExp("^([a-zA-Z0-9\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z0-9\u0080-\u024F]*$")

// Écoute du formulaire pour vérifier la conformité du contenu du prénom
      form.firstName.addEventListener('change', function(){
        let inputFirstName = document.querySelector("#firstName")
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
        
        // Si l'expression régulière est respectée
        if(inputRegEx.test(inputFirstName.value)){
          firstNameErrorMsg.innerText = "";
        
        // Si l'expression régulière n'est pas respectée
        }else{
          firstNameErrorMsg.innerText = "Veuillez saisir votre prénom";
        }
      })

// Écoute du formulaire pour vérifier la conformité du contenu du nom
      form.lastName.addEventListener('change', function(){
        let inputLastName = document.querySelector("#lastName")
        let lastNameErrorMsg = inputLastName.nextElementSibling;
        
        // Si l'expression régulière est respectée
        if(inputRegEx.test(inputLastName.value)){
          lastNameErrorMsg.innerText = "";
        // Si l'expression régulière n'est pas respectée
        }else{
          lastNameErrorMsg.innerText = "Veuillez saisir votre nom"
        }
      })

// Écoute du formulaire pour vérifier la conformité du contenu de l'adresse
      form.address.addEventListener('change', function(){
        let inputAddress = document.querySelector("#address")
        let inputAddressErrorMsg = inputAddress.nextElementSibling

        // Si l'expression régulière est respectée
        if(addressRegEx.test(inputAddress.value)){
          inputAddressErrorMsg.innerText = "";
        // Si l'expression régulière n'est pas respectée
        }else{
          inputAddressErrorMsg.innerText = "Veuillez saisir votre adresse"
        }
      })

// Écoute du formulaire pour vérifier la conformité du contenu de la ville
      form.city.addEventListener('change', function(){
        let inputCity = document.querySelector("#city")
        let inputCityErrorMsg = inputCity.nextElementSibling;
        
        // Si l'expression régulière est respectée
        if(inputRegEx.test(inputCity.value)){
          inputCityErrorMsg.innerText = "";
        // Si l'expression régulière n'est pas respectée
        }else{
          inputCityErrorMsg.innerText = "Veuillez saisir votre ville"
        }
      })

// Écoute du formulaire pour vérifier la conformité du contenu du mail
      form.email.addEventListener('change', function(){
          let inputMail = document.querySelector("#email")
          let emailErrorMsg = inputMail.nextElementSibling
          
          // Si l'expression régulière est respectée
          if(emailRegEx.test(inputMail.value)){
            emailErrorMsg.innerText = "";
          // Si l'expression régulière n'est pas respectée
          }else{
            emailErrorMsg.innerText = "Veuillez saisir votre mail"
          }
      })

// Création d'une div pour afficher le message d'erreur du bouton Commander
let newElt = document.createElement("div");
let oldDiv = document.querySelector(".cart__order__form__submit");
oldDiv.appendChild(newElt);
oldDiv.style["flexDirection"] = "column";
newElt.innerText = "";

// Création d'une fonction pour envoyer le contenu du formulaire et du localstorage dans le 
function postOrder(){

  const orderBtn = document.querySelector("#order");

// Ciblage des différents inputs du formulaire
  let inputFirstName = document.querySelector('#firstName')
  let inputLastName = document.querySelector('#lastName')
  let inputAddress = document.querySelector('#address')
  let inputCity = document.querySelector('#city')
  let inputMail = document.querySelector('#email')

// Écoute du click sur le bouton commander
  orderBtn.addEventListener('click', function(e){
    e.preventDefault();

    // Si le panier est vide
    if(productInLocalStorage == null || productInLocalStorage == 0){
      newElt.innerText = "Veuillez ajouter des articles au panier";
    // Si le formulaire n'a pas toutes ses sections renseignées
    }else if(
      !inputFirstName.value ||
      !inputLastName.value ||
      !inputCity.value ||
      !inputAddress.value ||
      !inputMail.value){
      newElt.innerText = "Merci de compléter le formulaire";
    // Si les expressions régulières du formulaire ne sont pas respectées
    }else if(
      !inputRegEx.test(firstName.value) ||
      !inputRegEx.test(lastName.value) ||
      !inputRegEx.test(city.value) ||
      !addressRegEx.test(address.value) ||
      !emailRegEx.test(email.value)
    ){
      newElt.innerText = "Merci de compléter correctement le formulaire"   
    // Si le formulaire est correctement rempli et le localstorage contient des objets             
    }else{

// Création d'une variable de type array pour y inclure les produits du localstorage
    let productId = [];

// Boucle for pour inclure les données du localstorage dans la variable productId
    for(let j = 0; j < productInLocalStorage.length; j++){
      productId.push(productInLocalStorage[j].id);
    }

// Création de l'objet order à envoyer à l'api
    const order = {
      // Informations du formulaire à envoyer
      contact: {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        address: inputAddress.value,
        city: inputCity.value,
        email: inputMail.value
      },
      // Produits du localstorage
      products: productId
    };

// Appel de la fonction pour envoyer l'objet order 
    postToApi(order);
  
  }

  })
  
}

postOrder()