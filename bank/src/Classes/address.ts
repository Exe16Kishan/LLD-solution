export default class Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  constructor(street: string, city: string, state: string, zipCode: string) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }

  getAddress(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}`;
  }
}