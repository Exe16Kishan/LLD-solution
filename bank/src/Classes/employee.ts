import { Role } from "../enums/enums";
import { PersonData } from "../types";
import Person from "./person";

export default class Employee extends Person {
  employeId: string;
  role: Role;
  constructor(person: PersonData, employeId: string, role: Role) {
    super(person.id, person.name, person.address, person.phone, person.email);
    this.employeId = employeId;
    this.role = role;
  }
}
