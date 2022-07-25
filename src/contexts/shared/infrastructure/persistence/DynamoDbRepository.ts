import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  GetItemCommandOutput,
  AttributeValue,
  ScanCommand,
  ScanCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { AggregateRoot } from "../../domain/AggregateRoot";
import { Marshaller } from "@aws/dynamodb-auto-marshaller";

export abstract class DynamoDbRepository<T extends AggregateRoot> {
  private _client: DynamoDBClient;
  private _marshaller: Marshaller;

  constructor() {
    this._client = new DynamoDBClient({});
    this._marshaller = new Marshaller();
  }

  protected abstract tableName(): string;

  protected clientDocument(): DynamoDBDocument {
    return DynamoDBDocument.from(this._client);
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const putItemCommand: PutItemCommand = new PutItemCommand({
      TableName: this.tableName(),
      Item: aggregateRoot.toDDBItem(),
    });

    await this.clientDocument().send(putItemCommand);
  }

  protected async find(id: string): Promise<{ [key: string]: AttributeValue } | undefined> {
    const getItemCommand: GetItemCommand = new GetItemCommand({
      TableName: this.tableName(),
      Key: {
        id: { S: id },
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

  protected unmarshallItem(ddbItem: {[key: string]: AttributeValue}): {[key: string]: any} {
    return this._marshaller.unmarshallItem(ddbItem);
  }
}
