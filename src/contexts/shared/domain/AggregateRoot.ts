import { AttributeValue } from "@aws-sdk/client-dynamodb";

export abstract class AggregateRoot {
  abstract toPrimitives(): any;

  abstract toDDBItem(): { [key: string]: AttributeValue };

  abstract uniquesAttributesValues(): { [key: string]: AttributeValue };

  abstract uniqueFilterExpression(): string;
}
