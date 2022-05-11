import { StringValueObject } from "../../../shared/domain/value-object/StringValueObject";
import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";

export class UserEmail extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureLengthIsLessThan75Characters(value);
    }

    private ensureLengthIsLessThan75Characters(value: string): void {
        if (value.length > 76) {
            throw new InvalidArgumentError(`The User First Name <${value}> has more than 75 characters`);
        }
    }
}
