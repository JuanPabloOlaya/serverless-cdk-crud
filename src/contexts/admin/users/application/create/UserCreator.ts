import { UserId } from "../../domain/UserId";
import { User } from "../../domain/User";
import { UserEmail } from "../../domain/UserEmail";
import { UserFirstName } from "../../domain/UserFirstName";
import { UserLastName } from "../../domain/UserLastName";
import { UserRepository } from "../../domain/UserRepository";
import { UserDocType } from "../../domain/UserDocType";
import { UserDocNumber } from "../../domain/UserDocNumber";

type Params = {
  userId: UserId;
  userFirstName: UserFirstName;
  userLastName: UserLastName;
  userEmail: UserEmail;
  userPassword: string;
  userDocType: UserDocType;
  userDocNumber: UserDocNumber;
};

export class UserCreator {
  private repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  async run({
    userId,
    userFirstName,
    userLastName,
    userEmail,
    userPassword,
    userDocType,
    userDocNumber,
  }: Params): Promise<void> {
    const user = User.create({
      id: userId,
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
      docType: userDocType,
      docNumber: userDocNumber,
    });

		await this.repository.save(user);
  }
}
