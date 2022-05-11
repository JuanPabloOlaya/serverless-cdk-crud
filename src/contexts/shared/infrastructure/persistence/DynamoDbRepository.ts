import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, GetCommandOutput } from "@aws-sdk/lib-dynamodb";
import { AggregateRoot } from "../../domain/AggregateRoot";


export abstract class DynamoDbRepository<T extends AggregateRoot> {
	private _client: DynamoDBClient;

	constructor() {
		this._client = new DynamoDBClient({});
	}

	protected abstract tableName(): string;

	protected clientDocument(): DynamoDBDocument {
		return DynamoDBDocument.from(this._client);
	}

	protected async persist(id: string, aggregateRoot: T): Promise<void> {
		await this.clientDocument().put({
			TableName: this.tableName(),
			Item: aggregateRoot.toPrimitives()
		});
	}

	protected async find(id: string): Promise<{[key: string]: {} } | undefined> {
		const response: GetCommandOutput = await this.clientDocument().get({
			TableName: this.tableName(),
			Key: {
				id: id,
			},
		});

		return response.Item;
	}
}
