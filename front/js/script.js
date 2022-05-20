/* Récupération des données de l'API */

const url = 'http://localhost:3000/api/products';

fetch(url)
.then((response) => {
    const productsData = response.json(); 
    let products = document.querySelector("#items");
    
/* Boucle For pour automatiser la création des cards */    
    productsData.then((value) => {
        for(let i = 0; i < value.length; i++){
            const script = `<a href="./product.html?id=${value[i]._id}">
            <article>
            <img src="${value[i].imageUrl}" alt="${value[i].altTxt}">
            <h3 class="productName">${value[i].name}</h3>
            <p class="productDescription">${value[i].description}</p>
            </article>
        </a>`;
        products.insertAdjacentHTML("beforeend", script);

        }
    })
})
.catch((err) => {console.log("Erreur :" + err)});

