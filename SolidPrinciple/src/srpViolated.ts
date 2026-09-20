class product {
  constructor(
    public name: string,
    public price: number,
  ) {}
}

class Cart {
   products: product[] = [];

   addProduct(product: product): void {
    this.products.push(product);
  }

   getProducts() {
    return this.products;
  }

  calculateTotalPrice() {
    console.log("calculating the total price ");
  }

  printInvoice() {
    console.log("Printing the invoice");
  }

  saveToDB() {
    console.log("saving to DB");
  }
}



// created 2 products 

const shirt = new product("shirt",200)
const pant = new product("pant",500)


// now  add these products to cart 
const cart = new Cart()

// add products
cart.addProduct(shirt)
cart.addProduct(pant)

// call the methods
cart.calculateTotalPrice()
cart.printInvoice()
cart.saveToDB()



// here there is no mistake but according to solid principle we
// we dont have to make all the methods to one class 
// like if in future if we have to change saveDB method then again we have to change in the cart class
// even though its not related the the saveDB and it also vialates SRP principle

// to fix this issue we will create there own classes 
// so we can work independantly on each logic even if there is need
// in the future



// so we will use assosiation like we will pass the 
// cart object to all the classes which need them and have a refrence of the cart as
// they need a refrence to the cart to act 
