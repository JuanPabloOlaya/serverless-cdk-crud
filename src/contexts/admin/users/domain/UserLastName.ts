import { StringValueObject } from "../../../shared/domain/value-object/StringValueObject";
import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";

export class UserLastName extends StringValueObject {
    constructor(value: string) {
        super(value);

        this.ensureLengthIsLessThan45Characters(value);
    }

    private ensureLengthIsLessThan45Characters(value: string): void {
        if (value.length > 45) {
            throw new InvalidArgumentError(`The User Last Name <${value}> has more than 45 characters`);
        }
    }
}
