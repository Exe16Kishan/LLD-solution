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

interface ShopingCartSaveToDB {
  saveToDB(cart: Cart): void;
}

class SqlSave implements ShopingCartSaveToDB {
  saveToDB(cart: Cart): void {
    console.log(cart.getProducts(), " saving to sql db");
  }
}

class MongoSave implements ShopingCartSaveToDB {
  saveToDB(cart: Cart): void {
    console.log(cart.getProducts(), " saving to mongoDB db");
  }
}

class FileSave implements ShopingCartSaveToDB {
  saveToDB(cart: Cart): void {
    console.log(cart.getProducts(), " saving to file");
  }
}

// create products

const shirt = new product("shirt", 500);
const pant = new product("pant", 900);
const table = new product("table", 2000);

// add product to cart
const cart = new Cart();
cart.addProduct(shirt);
cart.addProduct(pant);
cart.addProduct(table);

// printInvoice
const printInvoice = new ShopingCartPrintInvoice(cart);
printInvoice.printInvoice();

// save to mongoDB
const saveToFile = new FileSave().saveToDB(cart)
const saveToSql = new SqlSave().saveToDB(cart)
const saveToMongo = new MongoSave().saveToDB(cart)
