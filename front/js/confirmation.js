// Function to display the orderId on my page
function displayOrderIdInDom() {
  let orderId = new URL(window.location.href).searchParams;
  let id = orderId.get("orderId");

  const displayOrderId = document.querySelector("#orderId");
  displayOrderId.innerText = id;
}

// Function to clear the local storage
function clearLocalStorage() {
  localStorage.removeItem("cart");
}

// function init to call the functions inside my confirmation page
function init() {
  displayOrderIdInDom();
  clearLocalStorage();
}

// Call the init function
init();
