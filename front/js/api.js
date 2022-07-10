import { Product } from "./Classes/Product.js";
import { Cart } from "./Classes/Cart.js";

export async function postToApi(order) {

  // Déclaration de l'objet contenant la méthode POST
  let options = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    }
  };

  // Envoi de l'objet order avec la méthode POST
  fetch('http://localhost:3000/api/products/order', options)
    .then((res) => res.json())
    .then((data) => {
      //Vider le panier des produits par clés 
      // Suppression de la donnée product contenu dans l'objet order pour conserver les données du formulaire
      delete order.products;

      // Ajout l'orderId à l'url pour le retourner sur la page confirmation.html
      document.location.href = 'confirmation.html?orderId=' + data.orderId
    })
    .catch((err) => {
      alert('Erreur: ' + err.message);
    });
}

export const getItems = async () => {
  try {
    const res = await (await fetch('http://localhost:3000/api/products/')).json();    
    const items = [];
    res.forEach(item => {
      const product = new Product(item._id, item.name, item.description, item.imageUrl, item.altTxt, item.colors, item.price);
      items.push(product)
    });
    return items;
  } catch (error) {
    console.log(error);
  }
}

export const getItemsProductPage = async (id) => {
  try {
    const item = await (await fetch(`http://localhost:3000/api/products/${id}`)).json();    
    return new Product(item._id, item.name, item.description, item.imageUrl, item.altTxt, item.colors, item.price);
  } catch (error) {
    console.log(error);
  }
}

export const getCart = async () => {
  try {
  const product = await (await fetch(`http://localhost:3000/api/products/`)).json();
  const localStorage = new Cart();
  return localStorage, product;
  } catch (error) {
    console.log("Message d'erreur " + error)
  }
}