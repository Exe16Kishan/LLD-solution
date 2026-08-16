import { AccountStatus } from "../enums/enums";
import Customer from "./customer";

export default abstract class Account {
  protected accountNumber: string;
  protected balance: number;
  protected owner: Customer;
  protected status: AccountStatus;
  constructor(
    accountNumber: string,
    balance: number,
    owner: Customer,
    status: AccountStatus,
  ) {
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.owner = owner;
    this.status = status;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Withdrawal amount must be greater than 0");
    }

    if (amount > this.balance) {
      throw new Error("Insufficent balance");
    }

    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }

  // getStatement()

  abstract withdraw(amount: number): void;
  abstract calculateInterest(): number;
}
