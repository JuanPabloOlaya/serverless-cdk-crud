import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  GetItemCommandOutput,
  AttributeValue,
  ScanCommand,
  ScanCommandOutput,
  DeleteItemCommand,
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

  protected async delete(id: string): Promise<void> {
    const attributeMap = this.marshallItem({ id: id });
    const deleteItemCommand: DeleteItemCommand = new DeleteItemCommand({
      TableName: this.tableName(),
      Key: attributeMap,
    });

    await this.clientDocument().send(deleteItemCommand);
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

  protected marshallItem(data: {[key: string]: any}): {[key: string]: AttributeValue} {
    const marshalledItem: { [key: string]: AttributeValue } = {};

    for(const property in data) {
      if (typeof data[property] === 'string') {
        marshalledItem[property] = {
          S: data[property]
        };

        continue;
      }

      if (typeof data[property] === "boolean") {
        marshalledItem[property] = {
          BOOL: data[property],
        };

        continue;
      }

      if (typeof data[property] === "number") {
        marshalledItem[property] = {
          N: data[property],
        };
        
        continue;
      }
    }

    return marshalledItem;
  }
}
