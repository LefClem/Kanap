const params = new URLSearchParams(document.location.search);
const productId = params.get("id");


fetch(`http://localhost:3000/api/products/${productId}`)
.then(function(response){
    return response.json();
})
.then(function(value){
  
/* Insertion des valeurs dans l'API dans la page products */

    const image = document.querySelector(".item__img");
    image.insertAdjacentHTML('afterbegin', `<img src="${value.imageUrl}" alt="${value.altTxt}">`);
    document.getElementById("title").textContent = value.name;
    document.getElementById("price").textContent = value.price;
    document.getElementById("description").textContent = value.description;
    

/* Mise en place d'une RegEx et d'un validateur de données pour ne passer */    

    

/* Récupération des couleurs sur l'API pour les passer en arguments dans le selecteur */    
    
    
    let colors = value.colors;
    
    colors.forEach(choice => {
        let option = document.createElement("option");
        document.getElementById("colors").appendChild(option);
        option.textContent = choice;
    });
    

/* Mise en place du LocalStorage pour récupérer les éléments de la page cart */

let productStorage = document.querySelector("#addToCart");

/* Ajout d'un EventListener sur le bouton Ajouter au panier pour envoyer l'Id, la couleur et
 * la quantité au LocalStorage
 */

productStorage.addEventListener('click', addItem)

// Fonction de callback du EventListener

    function addItem() {

/* Définition de la variable constante qui stockera les données à envoyer au LocalStorage */

    const productItem = {
        id: value._id,
        quantity: quantity.value,
        color: value.colors
    }

    let colorChoice = document.querySelector("#colors[name='color-select'").value;

/* Boucle For pour récupérer la valeur du champ choisir une couleur en fonction du choix */

    for (let i = 0; i < colorChoice.length; i++) {
        if(colorChoice === value.colors[i]){
        productItem.color = value.colors[i];
    };
    }

/* Récupération de la valeur quantité en tant que nombre */

    let productQuantity = document.querySelector("#quantity").valueAsNumber;
    console.log(productQuantity, colorChoice);

/* Stockage de la variable productItem dans le LocalStorage */

    localStorage.setItem("productItem", JSON.stringify(productItem));
    
}

})
.catch(function(err){
    console.log("Erreur: " + err);
});