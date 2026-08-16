import Address from "../Classes/address";
import Customer from "../Classes/customer";
import { AccountStatus } from "../enums/enums";

export type PersonData = {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
};

export type AccountData = {
  accountNumber: string;
  balance: number;
  owner: Customer;
  status: AccountStatus;
};
