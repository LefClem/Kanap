let productInLocalStorage = localStorage.getItem("cart");
let cartArray = JSON.parse(productInLocalStorage);

console.log(cartArray)
//console.log(productInLocalStorage);

if(productInLocalStorage === null){
    let emptyBasket = document.querySelector("#cart__items");
    emptyBasket.innerText = "Le panier est vide !";
    
} else {
    
    for(let j = 0; j < cartArray.length; j++){
        console.log(cartArray.length);

        let html = `
                <article class="cart__item" data-id="${cartArray[j]._id}" data-color="${cartArray[j].color}">
                <div class="cart__item__img">
                  <img src="${cartArray[j].image}" alt="${cartArray[j].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${cartArray[j].name}</h2>
                    <p>${cartArray[j].color}</p>
                    <p>${cartArray[j].price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
                </article>`

        document.querySelector("#cart__items").insertAdjacentHTML("afterbegin", html);
    }
    console.log("Le panier est plein !");
}