let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));

if (productInLocalStorage){
    for (let cart of productInLocalStorage) {
        let info = {
            id : cart.id,
            color : cart.color,
            quantity : cart.quantity,
        }

        fetch("http://localhost:3000/api/products/" + info.id)
        .then(function(res){
            if(res.ok){
            return res.json();
            }
        })

        .then(function (cart){

            const html = `<article class="cart__item" data-id="${info.id}" data-color="${info.color}">
            <div class="cart__item__img">
              <img src="${cart.imageUrl}" alt="${cart.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${cart.name}</h2>
                <p>${info.color}</p>
                <p>${cart.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${info.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
            `;

            let section = document.querySelector("#cart__items");
            section.insertAdjacentHTML("afterbegin", html);
          

        function supprimerProduit() {
            let boutonSupprimer = document.querySelectorAll(".itemDelete");

            for (let k = 0; k < boutonSupprimer.length; k++){
                boutonSupprimer[k].addEventListener("click" , (event) => {
                    event.preventDefault();

                    //Selection de l'element à supprimer en fonction de son id ET sa couleur
                    let idDelete = productInLocalStorage[k].id;
                    let colorDelete = productInLocalStorage[k].color;

                    productInLocalStorage = productInLocalStorage.filter( el => el.id !== idDelete || el.color !== colorDelete );
                
                    localStorage.setItem("cart", JSON.stringify(productInLocalStorage));

                    //Alerte produit supprimé et refresh
                    alert("Ce produit a bien été supprimé du panier");
                    location.reload();
                })
            }
        }
        supprimerProduit();

      });

    }};