import { CreateUserCommand } from "./CreateUserCommand";
import { CommandHandler } from "../../../shared/domain/CommandHandler";
import { UserCreator } from "./UserCreator";
import { Command } from "../../../shared/domain/Command";
import { UserId } from "../domain/UserId";
import { UserFirstName } from "../domain/UserFirstName";
import { UserLastName } from "../domain/UserLastName";
import { UserEmail } from "../domain/UserEmail";

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
	constructor(private userCreator: UserCreator) {}

	subscribedTo(): Command {
		return CreateUserCommand;
	}

	async handle(command: CreateUserCommand): Promise<void> {
		const id = new UserId(command.id);
		const firstName = new UserFirstName(command.firstName);
		const lastName = new UserLastName(command.lastName);
		const email = new UserEmail(command.email);

		await this.userCreator.run({
			userId: id,
			userFirstName: firstName,
			userLastName: lastName,
			userEmail: email,
			userPassword: command.password,
			userDocType: command.docType,
			userDocNumber: command.docNumber,
		});
	}
}
