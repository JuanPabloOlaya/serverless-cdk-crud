import { UserId } from "./UserId";
import { UserFirstName } from "./UserFirstName";
import { UserLastName } from "./UserLastName";
import { UserEmail } from "./UserEmail";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly firstName: UserFirstName;
  readonly lastName: UserLastName;
  readonly email: UserEmail;
  readonly password: string;
  readonly docType: string;
  readonly docNumber: string;

  constructor({
    id,
    firstName,
    lastName,
    email,
    password,
    docType,
    docNumber,
  }: {
    id: UserId;
    firstName: UserFirstName;
    lastName: UserLastName;
    email: UserEmail;
    password: string;
    docType: string;
    docNumber: string;
  }) {
    super();

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.docType = docType;
    this.docNumber = docNumber;
  }

  static create({
    id,
    firstName,
    lastName,
    email,
    password,
    docType,
    docNumber,
  }: {
    id: UserId;
    firstName: UserFirstName;
    lastName: UserLastName;
    email: UserEmail;
    password: string;
    docType: string;
    docNumber: string;
  }): User {
    return new User({
      id,
      firstName,
      lastName,
      email,
      password,
      docType,
      docNumber,
    });
  }

  static fromPrimitives(plainData: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    docType: string;
    docNumber: string;
  }): User {
    return new User({
      id: new UserId(plainData.id),
      firstName: new UserFirstName(plainData.firstName),
      lastName: new UserLastName(plainData.lastName),
      email: new UserEmail(plainData.email),
      password: plainData.password,
      docType: plainData.docType,
      docNumber: plainData.docNumber,
    });
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password,
      docType: this.docType,
      docNumber: this.docNumber,
    };
  }
}
