import Address from "./address";

export default abstract class Person {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
  constructor(
    id: string,
    name: string,
    address: Address,
    phone: string,
    email: string,
  ) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getContactInfo(): string {
    return `${this.phone}, ${this.email}`;
  }
}