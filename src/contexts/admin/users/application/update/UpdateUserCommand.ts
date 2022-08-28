import { Command } from "../../../../shared/domain/Command";

type Params = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  docType: string | number;
  docNumber: string;
};

export class UpdateUserCommand extends Command {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  docType: string | number;
  docNumber: string;

  constructor({ id, firstName, lastName, email, password, docType, docNumber }: Params) {
    super();

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.docType = docType;
    this.docNumber = docNumber;
  }
}