export class Product {

    constructor(id, name, description, image, imageDescription, colors, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.imageDescription = imageDescription;
        this.colors = colors;
        this.price = price;
    }

    createCartWithProduct() {
        const productDataArray = [];
        const productSettings = {
            id: this.id,
            color: document.querySelector("#colors").value,
            quantity: Number(quantity.value),
        }
        productDataArray.push(productSettings)
        this.save(productDataArray);
    }

    pushNewProductToCart() {
        const cart = JSON.parse(localStorage.getItem("cart"));

        console.log(cart);
        const productSettings = {
            id: this.id,
            color: document.querySelector("#colors").value,
            quantity: Number(quantity.value),
        }
        cart.push(productSettings);
        this.save(cart);
    }

    updateQuantity(cart, product) {
        let resultFind = cart.find(el => el.id === product.id && el.color === document.querySelector("#colors").value);
        let newValue = Number(quantity.value)
        let newQuantity = newValue += resultFind.quantity;
        resultFind.quantity = newQuantity;
        this.save(cart);
    }

    save(item) {
        localStorage.setItem("cart", JSON.stringify(item))
    }

}