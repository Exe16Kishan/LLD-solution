import { PersonData } from "../types";
import Account from "./account";
import Person from "./person";

export default class Customer extends Person {
  accounts: Account[];
  kycVerified: boolean;
  constructor(person:PersonData,account: Account, kycVerified: boolean) {
    super(
      person.id,
      person.name,
      person.address,
      person.phone,
      person.email,
    )
    this.accounts = []
    this.kycVerified = kycVerified;
  }
}