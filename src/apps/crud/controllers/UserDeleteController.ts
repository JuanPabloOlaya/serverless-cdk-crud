import { Controller } from "./Controller";
import { CommandBus } from "../../../contexts/shared/domain/CommandBus";
import { DeleteUserCommand } from "../../../contexts/admin/users/application/delete/DeleteUserCommand";
import { InvalidArgumentError } from "../../../contexts/shared/domain/value-object/InvalidArgumentError";

export class UserDeleteController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(event: any): Promise<unknown> {
    try {
      const { id } = event.pathParameters;
      const deleteUserCommand: DeleteUserCommand = new DeleteUserCommand(id);

      await this.commandBus.dispatch(deleteUserCommand);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "text/plain",
        },
        body: "User deleted",
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
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(error),
        }
      }
    }
  }
}