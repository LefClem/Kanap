import { getCart } from "./api.js";
import { Cart } from "./Classes/Cart.js";
import { Product } from "./Classes/Product.js";

function generateDom(storage, infos){
    storage.list().forEach(elem => {
        const kanapInfos = infos.find(data => data._id === elem.id)
        const html = `<article class="cart__item" data-id="${elem.id}" data-color="${elem.color}">
        <div class="cart__item__img">
          <img src="${kanapInfos.imageUrl}" alt="${kanapInfos.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${kanapInfos.name}</h2>
            <p>${elem.color}</p>
            <p>${kanapInfos.price} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${elem.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`
      document.querySelector("#cart__items").insertAdjacentHTML("afterbegin", html)
    });

}

async function init(){
    const infos = await getCart();
    
    let storage = new Cart();
    console.log(storage.list())
    generateDom(storage, infos);
}


init();