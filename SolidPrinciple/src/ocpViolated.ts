/**
 * now we want to add multiple database and want to save the 
 * data accordingly
 * like at first we are just saving data to mongodb
 * but now i want to add sql, file
 * 
 * so at first we will think just go to savingDb class 
 * and add two methods for saving in sql and file
 * and here is the problem because we are breaking the open close principle
 * 
 * 
 * in OCP - we dont add features in exsiting class
 * we create class for each of the methods and crete current class as abstract class 
 * because if we dont create it abstraction or inheritance or polymorphism the placeas where it used they gives error
 * 
 * 
 */



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

// here we are violating open close principle 
// we are making changes in existing class thats not what we want
saveToSql(){
    console.log("saving to sql")
  }

  saveToFile(){
    console.log("saving to file")
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
db.saveToFile()
db.saveToSql()



