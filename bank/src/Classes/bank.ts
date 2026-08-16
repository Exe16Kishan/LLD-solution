import Account from "./account"
import Customer from "./customer"

class Bank {
    static instance :Bank
    customers : Map<string ,Customer>
    accounts : Map <string , Account>

    constructor() {
        this.customers = new Map()
        this.accounts = new Map()
    }

    static getInstance():Bank {
        if (!Bank.instance) {
            Bank.instance = new Bank()
        }
        return Bank.instance
    }

    registerCustomer(customer : Customer):void{
        this.customers.set(customer.id,customer)
    }

}