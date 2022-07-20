import { Nullable } from "../../../../shared/domain/Nullable";
import { DynamoDbRepository } from "../../../../shared/infrastructure/persistence/DynamoDbRepository";
import { UserId } from "../../domain/UserId";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserAlreadyExists } from "../../domain/UserAlreadyExists";

export class DynamoDbUserRepository extends DynamoDbRepository<User> implements UserRepository {
	public async save(user: User): Promise<void> {
		const isUniqueItem = await this.isUniqueItem(user);
		
		if (!isUniqueItem) throw new UserAlreadyExists(user.id.value);

		return this.persist(user.id.value, user);
	}

	public async search(id: UserId): Promise<Nullable<User>> {
		const response: any = await this.find(id.value);

		if (response) {
			return User.fromPrimitives(response)
		}

		return null;
	}

	protected tableName(): string {
		return process.env.USERS_TABLE || "crud-users-dev";
	}
}
