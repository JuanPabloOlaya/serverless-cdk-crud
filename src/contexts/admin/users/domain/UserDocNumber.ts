import { StringValueObject } from "../../../shared/domain/value-object/StringValueObject";
import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";

export class UserDocNumber extends StringValueObject {
  constructor(value: string) {
    super(value);

    this.validateDocNumberFormat(value);
  }

  private validateDocNumberFormat(value: string): void {
    if (!value.match(/^[0-9]{7,12}$/)) {
      throw new InvalidArgumentError(`The User Doc Number <${value}> is not valid`);
    }
  }
}
