import Account from "./account";
import Person from "./person";

export default class Customer extends Person {
  accounts: Account[];
  kycVerified: boolean;
  constructor(account: Account, kycVerified: boolean) {
    this.accounts = this.accounts.push(account);
    this.kycVerified = kycVerified;
  }
}