import Account from "./account";

export class SavingsAccount extends Account {
  interestRate: number;
  minBalance: number;
  constructor(parameters) {}

  withdraw(amount: number): void {}

  calculateInterest(): number {}
}

export class CurrentAccount extends Account {
  overdraftLimit: number;
  constructor(overdraftLimit: number) {
    this.overdraftLimit = overdraftLimit;
  }
  withdraw(amount: number): void {}
  calculateInterest(): number {}
}

export class FixedDepositAccount extends Account {

    maturityDate: Date
    interestRate: number
    tenureMonths: number


    constructor(maturityDate:Date , interestRate : number , tenureMonths:number) {
        this.maturityDate = maturityDate
        this.interestRate = interestRate
        this.tenureMonths = tenureMonths
    }

    withdraw(amount: number): void{

    } 

    calculateInterest(): number {
        
    }
}
