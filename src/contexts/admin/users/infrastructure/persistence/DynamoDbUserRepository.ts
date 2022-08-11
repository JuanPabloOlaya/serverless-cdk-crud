import { Nullable } from "../../../../shared/domain/Nullable";
import { DynamoDbRepository } from "../../../../shared/infrastructure/persistence/DynamoDbRepository";
import { UserId } from "../../domain/UserId";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserAlreadyExists } from "../../domain/UserAlreadyExists";
import { AttributeValue } from "@aws-sdk/client-dynamodb";

export class DynamoDbUserRepository extends DynamoDbRepository<User> implements UserRepository {
	public async save(user: User): Promise<void> {
		const isUniqueItem = await this.isUniqueItem(user);

		if (!isUniqueItem) throw new UserAlreadyExists(user.id.value);

		return this.persist(user.id.value, user);
	}

	public update(user: User): Promise<void> {
		return this.persist(user.id.value, user);
	}

	public async search(id: UserId): Promise<Nullable<User>> {
		const response: { [key: string]: AttributeValue } | undefined = await this.find(id.value);

		if (response) {
			const unmarshalledItem = this.unmarshallItem(response);
			
			return User.fromPrimitives(unmarshalledItem);
		}

		return null;
	}

	public async remove(id: UserId): Promise<void> {
		return this.delete(id.value);
	}

	protected tableName(): string {
		return process.env.USERS_TABLE || "crud-users-dev";
	}
}
