import { DeleteUserCommand } from "./DeleteUserCommand";
import { CommandHandler } from "../../../../shared/domain/CommandHandler";
import { Command } from "../../../../shared/domain/Command";
import { UserId } from "../../domain/UserId";
import { UserDeleter } from "./UserDeleter";

export class DeleteUserCommandHandler implements CommandHandler<DeleteUserCommand> {
  constructor(private userDeleter: UserDeleter) {}

  subscribedTo(): Command {
    return DeleteUserCommand;
  }

  async handle(command: DeleteUserCommand): Promise<void> {
    const id: UserId = new UserId(command.id);

    return this.userDeleter.run(id);
  }
}