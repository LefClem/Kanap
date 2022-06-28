/* Méthode SearchParams pour récupérer l'id du produit dans l'URL */

const params = new URLSearchParams(document.location.search);
const productId = params.get("id");

/* Appel de l'API pour récupérer la clé id du produit choisi */

fetch(`http://localhost:3000/api/products/${productId}`)
.then(function(response){
    return response.json();
})
.then(function(value){
  
/* Insertion des valeurs dans l'API dans la page products */

    const image = document.querySelector(".item__img");

//Décommentez le html et l'implanter directement avec les valeurs de l'API

    image.insertAdjacentHTML('afterbegin', `<img src="${value.imageUrl}" alt="${value.altTxt}">`);
    document.getElementById("title").textContent = value.name;
    document.getElementById("price").textContent = value.price;
    document.getElementById("description").textContent = value.description;  

    

/* Récupération des couleurs sur l'API pour les passer en arguments dans le selecteur */    
    
    
    let colors = value.colors;

    
    colors.forEach(choice => {
/* Création de la balise option pour y intégrer le choix de la couleur */
        let option = document.createElement("option");
        document.getElementById("colors").appendChild(option);
        option.textContent = choice;
        }
    );
      

/* Mise en place du LocalStorage pour récupérer les éléments de la page cart */

let productStorage = document.querySelector("#addToCart");

/* Ajout d'un EventListener sur le bouton Ajouter au panier pour envoyer l'Id, la couleur et
 * la quantité au LocalStorage avec une fonction 
 */

productStorage.addEventListener('click', addItem)

// Fonction de callback du EventListener

function addItem(e) {

    e.preventDefault();

/* Définition de la variable constante qui stockera les données à envoyer au LocalStorage */

    const productItem = {
        id: value._id,
        quantity: Number(quantity.value), 
        color: value.colors,
    }

    productItem.color = document.querySelector("#colors").value;

    console.log(productItem.quantity);
    
    if(parseInt(productItem.quantity) < 1 || parseInt(productItem.quantity) > 100)
    {alert("Entrer un nombre entre 1 et 100")}; 

/* Déclaration de la variable qui contient les keys et values enregistrées dans le LocalStorage et 
* conversion des données JSON en objet Javascript avec la methode JSON.parse
*/

    let productInLocalStorage = JSON.parse(localStorage.getItem("cart"));
    console.log(productInLocalStorage);
/* Si il y a des produits dans le LocalStorage, on ajoute les valeurs du nouveau produit au lieu de
* remplacer la valeur existante
*/

    if (productInLocalStorage == null) {
        productInLocalStorage = [];
        productInLocalStorage.push(productItem);
        localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
        alert("Le produit a bien été ajouté au panier !")
        
    } 
/* Si il n y a pas de produits dans le LocalStorage, on ajoute un nouveau tableau avec les valeurs de
* productItem pour les ajouter au LocalStorage
*/  
    else {
        productInLocalStorage.push(productItem);
        localStorage.setItem("cart", JSON.stringify(productInLocalStorage));
        alert("Le produit a bien été ajouté au panier !")
    }

}

})
.catch(function(err){
    console.log("Erreur: " + err);
});

