import { UserId } from "./UserId";
import { UserFirstName } from "./UserFirstName";
import { UserLastName } from "./UserLastName";
import { UserEmail } from "./UserEmail";
import { UserDocType } from "./UserDocType";
import { UserDocNumber } from "./UserDocNumber";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";

export class User extends AggregateRoot {
  readonly id: UserId;
  readonly firstName: UserFirstName;
  readonly lastName: UserLastName;
  readonly email: UserEmail;
  readonly password: string;
  readonly docType: UserDocType;
  readonly docNumber: UserDocNumber;

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
    docType: UserDocType;
    docNumber: UserDocNumber;
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
    docType: UserDocType;
    docNumber: UserDocNumber;
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
    docType: string | number;
    docNumber: string;
  }): User {
    return new User({
      id: new UserId(plainData.id),
      firstName: new UserFirstName(plainData.firstName),
      lastName: new UserLastName(plainData.lastName),
      email: new UserEmail(plainData.email),
      password: plainData.password,
      docType: new UserDocType(plainData.docType),
      docNumber: new UserDocNumber(plainData.docNumber),
    });
  }

  toPrimitives() {
    return {
      id: this.id.value,
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      email: this.email.value,
      password: this.password,
      docType: this.docType.value,
      docNumber: this.docNumber.value,
    };
  }
}
