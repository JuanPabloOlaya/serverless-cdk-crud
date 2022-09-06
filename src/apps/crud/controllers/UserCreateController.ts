import { Controller } from "./Controller";
import { UserAlreadyExists } from "../../../contexts/admin/users/domain/UserAlreadyExists";
import { CommandBus } from "../../../contexts/shared/domain/CommandBus";
import { CreateUserCommand } from "../../../contexts/admin/users/application/create/CreateUserCommand";
import { v4 } from "uuid";
import { InvalidArgumentError } from "../../../contexts/shared/domain/value-object/InvalidArgumentError";

export class UserCreateController implements Controller {
  constructor(private commandBus: CommandBus) {}

  async run(event: any): Promise<unknown | void> {
    try {
      const { firstName, lastName, email, password, docType, docNumber }: any = JSON.parse(
        event.body
      );
      const createUserCommand = new CreateUserCommand({
        id: v4(),
        firstName,
        lastName,
        email,
        password,
        docType,
        docNumber,
      });

      await this.commandBus.dispatch(createUserCommand);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "User created",
          data: createUserCommand,
        }),
      };
    } catch (error) {
      if (error instanceof UserAlreadyExists || error instanceof InvalidArgumentError) {
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
        };
      }
    }
  }
}
