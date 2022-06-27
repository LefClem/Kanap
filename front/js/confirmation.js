// Méthode SearchParams pour récupérer l'id du produit dans l'URL 

let orderId = new URL(window.location.href).searchParams;
let id = orderId.get('orderId');

// Affichage de l'orderId sur la page
const displayOrderId = document.querySelector("#orderId");
displayOrderId.innerText = id;

// Suppression des items contenu dans le localstorage
localStorage.clear();
