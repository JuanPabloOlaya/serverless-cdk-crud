import { User } from "../../domain/User";

export class FindUserResponse {
  readonly user: User;

  constructor(user: User) {
    this.user = user;
  }
}
