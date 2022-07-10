export class Cart {

    constructor(){
        this.items = JSON.parse(localStorage.getItem("cart")) || [] || null;
    }

    list(){
        return this.items;
    }

    addItem(){

    }

    removeItem(){

    }

    getTotalValue(){

    }
}