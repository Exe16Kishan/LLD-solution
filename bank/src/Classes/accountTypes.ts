import { AccountData } from "../types";
import Account from "./account";

export class SavingsAccount extends Account {
  interestRate: number;
  minBalance: number;
  constructor(account: AccountData, interestRate: number, minBalance: number) {
    super(
      account.accountNumber,
      account.balance,
      account.owner,
      account.status,
    );
    this.interestRate = interestRate;
    this.minBalance = minBalance;
  }

  withdraw(amount: number): void {}

  calculateInterest(): number {}
}

export class CurrentAccount extends Account {
  overdraftLimit: number;
  constructor(account: AccountData, overdraftLimit: number) {
    super(
      account.accountNumber,
      account.balance,
      account.owner,
      account.status,
    );
    this.overdraftLimit = overdraftLimit;
  }
  withdraw(amount: number): void {}
  calculateInterest(): number {}
}

export class FixedDepositAccount extends Account {
  maturityDate: Date;
  interestRate: number;
  tenureMonths: number;

  constructor(
    account: AccountData,
    maturityDate: Date,
    interestRate: number,
    tenureMonths: number,
  ) {
    super(
      account.accountNumber,
      account.balance,
      account.owner,
      account.status,
    );
    this.maturityDate = maturityDate;
    this.interestRate = interestRate;
    this.tenureMonths = tenureMonths;
  }

  withdraw(amount: number): void {}

  calculateInterest(): number {}
}
