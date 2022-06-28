// Regarder fonction import, async et await ! 

let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));

    if(productInLocalStorage == null || productInLocalStorage == 0){
        let basket = document.querySelector("#cart__items");
        let emptyBasket = `<p>Votre panier est vide !</p>`;
        basket.insertAdjacentHTML("afterbegin",emptyBasket);
    } else {

const url = `http://localhost:3000/api/products/`;

/* Fonction permettant l'affichage des produits dans la page panier */
            function displayItem(){

                for(let cart of productInLocalStorage){
                  let item = {
                      id : cart.id,
                      color : cart.color,
                      quantity : cart.quantity,
                      price : cart.price
                  }
    
                    fetch(url + cart.id)
                    .then(function(res){
                        return res.json();
                    })
                    .then(function(cartValue){

                          // Création de la variable contenant le html et insertion des valeurs dans les balises
                            const html = `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
                              <div class="cart__item__img">
                                <img src="${cartValue.imageUrl}" alt="${cartValue.altTxt}">
                              </div>
                              <div class="cart__item__content">
                                <div class="cart__item__content__description">
                                  <h2>${cartValue.name}</h2>
                                  <p>${item.color}</p>
                                  <p>${item.price} €</p>
                                </div>
                                <div class="cart__item__content__settings">
                                  <div class="cart__item__content__settings__quantity">
                                    <p>Qté : </p>
                                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                                  </div>
                                  <div class="cart__item__content__settings__delete">
                                    <p class="deleteItem">Supprimer</p>
                                  </div>
                                </div>
                              </div>
                              </article>`

                          // Injection du HTML dans la page panier pour rendre visible les produits
                          let section = document.querySelector("#cart__items");
                          section.insertAdjacentHTML("afterbegin", html);
                    });
                }
            }
            displayItem();

            function getTotals() {

              for(let cart of productInLocalStorage){
                let item = {
                    id : cart.id,
                    color : cart.color,
                    quantity : cart.quantity,
                    price : cart.price
                }
    
            fetch(url + cart.id)
            .then(function(res){
                return res.json();
            })
            .then(function(cartValue){

                let totalPriceCalculator = [];
              console.log(productInLocalStorage);
                for(let k = 0; k < productInLocalStorage.length; k++){
                    // Trouver une solution pour faire apparaitre le coût total stocké dans l'api et non pas dans le localstorage
                    
                    let productPriceInCart = cartValue.price * productInLocalStorage[k].quantity;
                    //console.log(productPriceInCart + ` ${k}`);

                    totalPriceCalculator.push(productPriceInCart);
                    const reducer = (accumulator, currentValue) => accumulator + currentValue;
                    const totalPrice = totalPriceCalculator.reduce(reducer, 0);

                    let priceDisplay = document.querySelector("#totalPrice");
                    priceDisplay.innerText = totalPrice;
                    //console.log(totalPrice);
                }
            })
            }
          }
            getTotals();

            //console.log(item);
          
            function deleteItem() {
              
              for(let cart of productInLocalStorage){
                let item = {
                    id : cart.id,
                    color : cart.color,
                    quantity : cart.quantity,
                    price : cart.price
                }
    
                    fetch(url + cart.id)
                    .then(function(res){
                        return res.json();
                    })
                    .then(function(cartValue){

                      let deleteButton = document.querySelectorAll(".deleteItem");
            
                      for (let k = 0; k < deleteButton.length; k++){
                          deleteButton[k].addEventListener("click" , (event) => {
                              event.preventDefault();
                
                              //Selection de l'element à supprimer en fonction de son id ET sa couleur
                              let idDelete = productInLocalStorage[k].id;
                              let colorDelete = productInLocalStorage[k].color;
                
                              productInLocalStorage = productInLocalStorage.filter( el => el.id !== idDelete && el.color !== colorDelete );
                          
                              localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
                
                              //Alerte produit supprimé et refresh
                              // Modifier le alert avec un message en rouge en dessous du champ
                              alert("Ce produit a bien été supprimé du panier");
                              location.reload();
                          })
                        }
                    })
              }
            }
            deleteItem();
        
        }
    




        let canapData = [];

//  Récupérer les données du local storage

let itemInCart = JSON.parse(localStorage.getItem("product"));
console.table(itemInCart);



//  Récupérer les données des canapés hors lS 

const getCanapData = async () => {

    const res = await fetch(`http://localhost:3000/api/products`);
    canapData = await res.json();


    // Si l'id est le même dans canapData et le localStorage sinon appliquer la fonction pour afficher les éléments :


    if (itemInCart.length === 0) {
        document.getElementById('cart__items').insertAdjacentHTML('beforeend', `<p>Votre panier est vide.</p>`);
        document.getElementById('cart__items').style.textAlign = "center";
        return
    }

    else {
        let totalPrice = 0;
        for (let i = 0; i < itemInCart.length; i++) {
            const canap = itemInCart[i];
            const realCanap = canapData.find(data => data._id === canap.id);

            // + calcul du prix total directement à chaque boucle.

            totalPrice += itemInCart[i].quantity * realCanap.price;
            let totalPriceElement = document.getElementById('totalPrice');
            totalPriceElement.textContent = totalPrice;
            console.log(totalPrice)

            displayBasket(canap, realCanap);



        }
        // Calcul prix

    }

}
getCanapData()


// Afficher le tableau récapitulatif des achats 

const displayBasket = (id, realId) => {


    let cartArticle = document.createElement("article");
    document.getElementById('cart__items').appendChild(cartArticle);
    cartArticle.className = "cart__item";
    cartArticle.setAttribute('data-id', id.id);
    cartArticle.setAttribute('data-color', id.color);


    // IMG

    let divCartImg = document.createElement("div");
    cartArticle.appendChild(divCartImg);
    divCartImg.className = "cart__item__content";
    let cartImg = document.createElement("img");
    divCartImg.appendChild(cartImg);
    cartImg.src = realId.imageUrl;
    cartImg.alt = realId.altTxt;

    // Description Bloc 

    let divItemContent = document.createElement("div");
    divItemContent.className = 'cart__item__content';
    cartArticle.appendChild(divItemContent);
    let divItemDescription = document.createElement('div');
    divItemContent.appendChild(divItemDescription);
    divItemDescription.className = 'cart__item__content__description';

    // Description content : Title

    let productName = document.createElement("h2");
    productName.textContent = id.name;
    divItemDescription.appendChild(productName);

    // Description content : color

    let productColor = document.createElement('p');
    productColor.textContent = id.color;
    divItemDescription.appendChild(productColor);

    // Description content : price 

    let productPrice = document.createElement('p');
    productPrice.textContent = realId.price + ' ' + '€';
    divItemDescription.appendChild(productPrice);


    // Settings bloc 

    let settingsBloc = document.createElement('div');
    settingsBloc.className = 'cart__item__content__settings';
    divItemContent.appendChild(settingsBloc);
    let settingsQuantity = document.createElement('div');
    settingsQuantity.className = 'cart__item__content__settings__quantity';
    settingsBloc.appendChild(settingsQuantity);

    // Settings bloc : manage quantity (add)

    let quantityTxt = document.createElement('p');
    quantityTxt.textContent = 'Qte : ';
    settingsQuantity.appendChild(quantityTxt);
    let inputQuantity = document.createElement('input');
    inputQuantity.setAttribute("type", "number");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", 1);
    inputQuantity.setAttribute("max", 100);
    inputQuantity.setAttribute("value", id.quantity);
    inputQuantity.classname = 'itemQuantity';
    settingsQuantity.appendChild(inputQuantity);
    inputQuantity.addEventListener('change', function (q) {
        id.quantity = inputQuantity.value;
        if (id.quantity <= 0 || id.quantity > 100) {
            return alert('Veuillez choisir une quantité comprise entre 1 et 100')
        }
        {
            localStorage.setItem("product", JSON.stringify(itemInCart));
            location.reload();

            console.log(itemInCart);
        }


    })

  }
