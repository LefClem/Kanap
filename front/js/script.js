/* Récupération des données de l'API */

const url = 'http://localhost:3000/api/products';

fetch(url)
.then((response) => {
    const productsData = response.json(); 
    
    
/* Boucle For pour automatiser la création des cards */    
    productsData.then((value) => {
    for(let i = 0; i < value.length; i++){

/* Création du lien pour les cards de nos produits */
    const items = document.querySelector('#items');
    const linkProduct = document.createElement("a");
    linkProduct.href = "product.html";
    items.appendChild(linkProduct);

/* Création de la section article pour ajouter nos éléments depuis l'API */
    const productArticle = document.createElement("article");
    productArticle.id = "product-card";
    linkProduct.appendChild(productArticle);

/* Création de la balise img pour intégrer les photos des produits */
    const productImg = document.createElement("span");
    productImg.className = "image";
    productArticle.appendChild(productImg);

/* Création de la balise titre pour les cards de nos produits */
    const productTitle = document.createElement("h3");
    productTitle.className = "productName";
    productArticle.appendChild(productTitle);

/* Création de la balise p pour les descriptions de nos produits */
    const productDescription = document.createElement("p");
    productDescription.className = "productDescription";
    productArticle.appendChild(productDescription);

/* Récupération des valeurs de l'API pour les transmettre aux balises dynamiques créés */
    const canapName = value[i].name;
    const canapImg = value[i].imageUrl;
    const imgAlt = value[i].altTxt;
    const canapDescription = value[i].description;
    linkProduct.href += `?id=${value[i]._id}`
/* Récupération de la variable canapImg et imgAlt pour l'affichage des images des produits */
    const image_productImg = `<img src="${canapImg}" alt="${imgAlt}">`; 

/* Insertion des données de l'API dans nos balises dynamiques pour les afficher sur notre site */
    productImg.insertAdjacentHTML('beforebegin', image_productImg);
    productTitle.innerHTML = canapName;
    productDescription.innerHTML = canapDescription;

    }
    })
})
.catch((err) => {console.log("Erreur :" + err)});

