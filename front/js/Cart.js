export const AddItemSignal = {
  WRONG_ITEM : 1,
  CART_UPDATED : 2,
  CART_ADDED : 3
}

// Class created to use the methods it contains in the cart page
export class Cart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem("cart")) || [];
  }

  // Method that return the cart in an array sorted by id
  list() {
    return this.items.sort((a, b) => {
      return a.id.localeCompare(b.id);
    });
  }

  // Method to add a product to the cart
  addItem(id, color, quantity) {
    const productSettings = {
      id: id,
      color: color,
      quantity: Number(quantity),
    };

    if (
      quantity < 1 ||
      quantity > 100 ||
      quantity === NaN ||
      color === ""
    ) {
      return AddItemSignal.WRONG_ITEM;
    } else if (
      this.items !== null &&
      this.list().find(
        (el) =>
          el.id === id &&
          el.color === color
      )
    ) {
      let resultFind = this.list().find(
        (el) =>
          el.id === id &&
          el.color === color
      );
      resultFind.quantity += Number(quantity);
      this.save();
      return AddItemSignal.CART_UPDATED;
    } else {
      this.items.push(productSettings);
      this.save();
      return AddItemSignal.CART_ADDED;
    }
  }

  // Method to remove a product from the cart
  removeItem(item) {
          this.items = this.items.filter( el => (el.id !== item.id && el.color !== item.color) || (el.id == item.id && el.color !== item.color));
          this.save();
  }

  // Method to return the total price and quantity inside the cart
  getTotalValue(product) {
    let totalQuantity = this.items.reduce((acc, item) => {
      acc += item.quantity;
      return acc;
    }, 0);

    let totalPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
      const kanap = product.find(data => data._id === this.items[i].id)
      let total = this.items[i].quantity * kanap.price;
      totalPrice += total;
    }

    return {
      quantity: totalQuantity,
      price: totalPrice,
    };
  }

  // Method to update the quantity of a product already existing in the cart
  updateQuantity(item, quantity) {
      item.quantity = Number(quantity);
      this.save();    
    // }
  }

  // Method to save to the local storage
  save() {
    localStorage.setItem("cart", JSON.stringify(this.items));
  }
}
