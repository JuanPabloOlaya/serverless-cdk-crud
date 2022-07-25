import { CreateUserCommand } from "../CreateUserCommand";
import { CommandHandler } from "../../../../shared/domain/CommandHandler";
import { UserCreator } from "../UserCreator";
import { Command } from "../../../../shared/domain/Command";
import { UserId } from "../../domain/UserId";
import { UserFirstName } from "../../domain/UserFirstName";
import { UserLastName } from "../../domain/UserLastName";
import { UserEmail } from "../../domain/UserEmail";
import { UserDocType } from "../../domain/UserDocType";
import { UserDocNumber } from "../../domain/UserDocNumber";

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
	constructor(private userCreator: UserCreator) {}

	subscribedTo(): Command {
		return CreateUserCommand;
	}

	async handle(command: CreateUserCommand): Promise<void> {
		const id: UserId = new UserId(command.id);
		const firstName: UserFirstName = new UserFirstName(command.firstName);
		const lastName: UserLastName = new UserLastName(command.lastName);
		const email: UserEmail = new UserEmail(command.email);
		const docType: UserDocType = new UserDocType(command.docType);
		const docNumber: UserDocNumber = new UserDocNumber(command.docNumber);

		await this.userCreator.run({
			userId: id,
			userFirstName: firstName,
			userLastName: lastName,
			userEmail: email,
			userPassword: command.password,
			userDocType: docType,
			userDocNumber: docNumber,
		});
	}
}
