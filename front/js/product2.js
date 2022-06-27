/* Méthode SearchParams pour récupérer l'id du produit dans l'URL */

const params = new URLSearchParams(document.location.search);
const productId = params.get("id");

/* Appel de l'API pour récupérer la clé id du produit choisi */

    fetch(`http://localhost:3000/api/products/${productId}`)
    .then(function(res){
        return res.json();
    })
    .then(function(value){

/* Insertion des valeurs dans l'API dans la page products */

        const image = document.querySelector(".item__img");
        image.insertAdjacentHTML('afterbegin', `<img src="${value.imageUrl}" alt="${value.altTxt}">`);
        document.getElementById("title").textContent = value.name;
        document.getElementById("price").textContent = value.price;
        document.getElementById("description").textContent = value.description;

/* Récupération des couleurs sur l'API pour les passer en arguments dans le selecteur */    

        let colors = value.colors;

/* Création de la balise option pour y intégrer le choix de la couleur */

        colors.forEach(choice => {
            let option = document.createElement("option");
            document.getElementById("colors").appendChild(option);
            option.textContent = choice;
        });

/* Ciblage du bouton "Ajouter au panier" */

        let productStorage = document.querySelector("#addToCart");

/* Création d'une div pour insérer les messages d'erreur en dessous du bouton "Ajouter au panier" */

        let errorMsg = document.createElement("div");
        let button = document.querySelector(".item__content__addButton");
        button.appendChild(errorMsg);
        button.style.display = "flex";
        button.style["flex-direction"] = "column";

/* Ajout d'un EventListener sur le bouton Ajouter au panier pour envoyer l'Id, la couleur et
 * la quantité au LocalStorage avec une fonction 
 */
        productStorage.addEventListener("click", function(){

/* Définition de la variable constante qui stockera les données à envoyer au LocalStorage */

            const productSettings = {
                id : productId,
                color : document.querySelector("#colors").value,
                quantity : Number(quantity.value),
            }

/* Déclaration de la variable qui contient la key et values enregistrées dans le LocalStorage et 
* conversion des données JSON en objet Javascript avec la methode JSON.parse
*/
            let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));
            console.log(productSettings.quantity);
            

/* Mise en place d'un système de contrôle des données passés dans l'input afin de s'assurer que seul
* des nombres sont acceptés en arguments et qu'ils doivent être compris entre 1 et 100
*/
            if((productSettings.quantity < 1) || (productSettings.quantity > 100 || (productSettings.quantity == NaN) || (productSettings.color == ""))){
                errorMsg.innerText = "Veuillez entrer un nombre entre 1 et 100 et choisir une couleur";
               
                
/* Vérification du localstorage pour s'assurer que si on essaye d'ajouter un produit déjà existant, seul
* la quantité sera mise à jour
*/
            } else if(productInLocalStorage !== null && productInLocalStorage.find(el => el.id === productSettings.id && el.color === productSettings.color)){
                let resultFind = productInLocalStorage.find(el => el.id === productSettings.id && el.color === productSettings.color);
            // Initialisation d'une variable qui contiendra la nouvelle quantité    
                let newQuantity = 
                productSettings.quantity + resultFind.quantity;
            // Attribution de la variable à la quantité de l'item
                resultFind.quantity = newQuantity;
            // Envoi de l'objet dans le localstorage
                localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
                errorMsg.innerText = "Quantité Mise à jour !";
                
             
/* Si le localstorage est vide, on ajoute l'objet avec les attributs de productSettings (id, color, quantity) */

            } else if(productInLocalStorage == null || productInLocalStorage == 0){
            //On initialise un tableau vide qui va contenir l'objet productSettings
                productInLocalStorage = [];
            //On envoit l'objet avec la méthode push
                productInLocalStorage.push(productSettings);
            // Envoi de l'objet dans le localstorage
                localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
                errorMsg.innerText = "Le produit a bien été ajouté au panier !";
            }
/* Si le localstorage contient déjà un objet différent, on ajoute la valeur au tableau directement */

             else {
                productInLocalStorage.push(productSettings);
                localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
                errorMsg.innerText = "Le produit a bien été ajouté au panier !";
            }

        })

    })
    .catch(function(err){
        console.log("Erreur: " + err);
    });
