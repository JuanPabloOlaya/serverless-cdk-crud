import { UserRepository } from "../../domain/UserRepository";
import { UserNotExists } from "../../domain/UserNotExists";
import { FindUserResponse } from "./FindUserResponse";
import { UserId } from "../../domain/UserId";
import { Nullable } from "../../../../shared/domain/Nullable";
import { User } from "../../domain/User";

export class UserFinder {
  constructor(private repository: UserRepository) {}

  async run(id: UserId): Promise<FindUserResponse> {
    const user: Nullable<User> = await this.repository.search(id);

    if (!user) {
      throw new UserNotExists(id.value);
    }

    return new FindUserResponse(user)
  }
}