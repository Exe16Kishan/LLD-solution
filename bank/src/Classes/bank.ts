import Account from "./account";
import Customer from "./customer";

export class Bank {
  static instance: Bank;
  customers: Map<string, Customer>;
  accounts: Map<string, Account>;

  constructor() {
    this.customers = new Map();
    this.accounts = new Map();
  }

  static getInstance(): Bank {
    if (!Bank.instance) {
      Bank.instance = new Bank();
    }
    return Bank.instance;
  }

  registerCustomer(customer: Customer): void {
    this.customers.set(customer.id, customer);
  }

  findAccount(accountNumber: string): Account {
    if (!accountNumber) {
      throw new Error("Please provide account number");
    }
    let account = this.accounts.get(accountNumber);

    if (!account) {
      throw new Error("this account not found");
    }
    return account;
  }

  transferMoney(
    fromAccountNumber: string,
    toAccountNumber: string,
    amount: number,
  ): boolean {
    if (amount <= 0) {
      throw new Error(" amount must be greater than zero");
    }

    const fromAccount = this.findAccount(fromAccountNumber);
    const toAccount = this.findAccount(toAccountNumber);

    if (fromAccount.balance < amount) {
      throw new Error("Insufficent balance");
    }

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    return true;
  }
}
