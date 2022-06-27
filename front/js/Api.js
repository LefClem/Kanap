export async function postToApi(order){

// Déclaration de l'objet contenant la méthode POST
    let options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          "Content-Type" : "application/json",
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