import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";
import { DocTypeEnum } from "./enums/DocTypeEnum";

export class UserDocType {
  readonly value: DocTypeEnum;

  constructor(value: string | number) {
    this.validateValueExistence(value);

    this.value = DocTypeEnum[value];
  }

  private validateValueExistence(value: string | number): void {
    if (!DocTypeEnum[value]) {
      throw new InvalidArgumentError(`The User Doc Type <${value}> is not valid`);
    }
  }
}
