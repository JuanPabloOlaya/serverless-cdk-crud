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

		console.warn("Test");
		return this.persist(user.id.value, user);
	}

	public async search(id: UserId): Promise<Nullable<User>> {
		const response: { [key: string]: AttributeValue } | undefined = await this.find(id.value);

		if (response) {
			const unmarshalledItem = this.unmarshallItem(response);
			console.log(JSON.stringify(unmarshalledItem));
			return User.fromPrimitives(unmarshalledItem);
		}

		return null;
	}

	protected tableName(): string {
		return process.env.USERS_TABLE || "crud-users-dev";
	}
}
