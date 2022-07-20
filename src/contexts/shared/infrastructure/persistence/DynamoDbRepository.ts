import { DynamoDBClient, PutItemCommand, GetItemCommand, GetItemCommandOutput, AttributeValue, ScanCommand, ScanCommandOutput } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
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
		const putItemCommand: PutItemCommand = new PutItemCommand({
			TableName: this.tableName(),
			Item: aggregateRoot.toPrimitives(),
		});

		await this.clientDocument().send(putItemCommand);
	}

	protected async find(id: string): Promise<{[key: string]: AttributeValue } | undefined> {
		const getItemCommand: GetItemCommand = new GetItemCommand({
			TableName: this.tableName(),
			Key: {
				id: {S: id},
			},
		});

		const response: GetItemCommandOutput = await this.clientDocument().send(getItemCommand);

		return response.Item;
	}

	protected async isUniqueItem(aggregateRoot: T): Promise<boolean> {
		const scanCommand: ScanCommand = new ScanCommand({
			TableName: this.tableName(),
			ExpressionAttributeValues: aggregateRoot.uniquesAttributesValues(),
			FilterExpression: aggregateRoot.uniqueFilterExpression(),
		});
		
		const response: ScanCommandOutput = await this.clientDocument().send(scanCommand);

		return !response.Count;
	}
}
