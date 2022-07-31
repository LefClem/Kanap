// Function to post the form data and the cart Ids to the API
export function postMethod(order) {

  let options = fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    }
  });

  options.then(async (res) => {
    try {
      const content = await res.json();
      document.location.href = 'confirmation.html?orderId=' + content.orderId
    } catch (error) {
      displayErrorMessage(error);
    }
  })
}

// Function to collect the kanap from the API and return them to the JSON format
export const getKanapList = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/products');
    return res.json();
  } catch (error) {
    displayErrorMessage(error);  
  }
}

// Function to collect the kanap from the API for a specific product and return them to the JSON format
export const getKanap = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`);    
    return res.json();
  } catch (error) {
    displayErrorMessage(error);    
  }
}

// Function to display an error message in case of the catch
export function displayErrorMessage(error) {
  let message = document.querySelector("section");
  let alert = document.createElement("p").textContent = error;
  message.insertAdjacentHTML("beforebegin", alert);
}
