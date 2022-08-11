import { Controller } from "./Controller";
import { CommandBus } from "../../../contexts/shared/domain/CommandBus";
import {
  UpdateUserCommand,
} from "../../../contexts/admin/users/application/update/UpdateUserCommand";
import { InvalidArgumentError } from "../../../contexts/shared/domain/value-object/InvalidArgumentError";

export class UserUpdateController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(event: any): Promise<unknown | void> {
    try {
      const { firstName, lastName, email, password, docType, docNumber }: any = JSON.parse(
        event.body
      );
      const { id } = event.pathParameters;
      const updateUserCommand = new UpdateUserCommand({
        id,
        firstName,
        lastName,
        email,
        password,
        docType,
        docNumber,
      });

      await this.commandBus.dispatch(updateUserCommand);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "User updated",
          data: updateUserCommand,
        }),
      };
    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "text/plain",
          },
          body: error.message,
        };
      } else {
        return {
          statusCode: 500,
          header: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(error),
        };
      }
    }
  }
}
