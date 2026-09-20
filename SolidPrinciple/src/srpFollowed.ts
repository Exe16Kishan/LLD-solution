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
}

class ShopingCartPrintInvoice {
  constructor(private cart: Cart) {}
  printInvoice() {
    this.cart
      .getProducts()
      .map((i) => console.log(`details : ${i.name} == ${i.price}  `));
  }
}

class ShopingCartSaveToDB {
  constructor(private cart: Cart) {}
  saveToDB() {
    console.log("saving to mongodb");
  }
}



// create products

const shirt = new product("shirt",500)
const pant = new product("pant",900)
const table = new product("table",2000)


// add product to cart
const cart = new Cart()
cart.addProduct(shirt)
cart.addProduct(pant)
cart.addProduct(table)

// printInvoice 
const printInvoice = new ShopingCartPrintInvoice(cart)
printInvoice.printInvoice()

// save to mongoDB
const db = new ShopingCartSaveToDB(cart)
db.saveToDB()




// here we can see we have made custom classes for each method and all it follows SRP 
// if we want to make changes we can make change in there class without touching other class