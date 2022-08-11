import { UpdateUserCommand } from "./UpdateUserCommand";
import { CommandHandler } from "../../../../shared/domain/CommandHandler";
import { UserUpdater } from "./UserUpdater";
import { Command } from "../../../../shared/domain/Command";
import { UserId } from "../../domain/UserId";
import { UserFirstName } from "../../domain/UserFirstName";
import { UserLastName } from "../../domain/UserLastName";
import { UserEmail } from "../../domain/UserEmail";
import { UserDocType } from "../../domain/UserDocType";
import { UserDocNumber } from "../../domain/UserDocNumber";

export class UpdateUserCommandHandler implements CommandHandler<UpdateUserCommand> {
	constructor(private userUpdater: UserUpdater) {}

	subscribedTo(): Command {
		return UpdateUserCommand;
	}

	async handle(command: UpdateUserCommand): Promise<void> {
		const id: UserId = new UserId(command.id);
		const firstName: UserFirstName = new UserFirstName(command.firstName);
		const lastName: UserLastName = new UserLastName(command.lastName);
		const email: UserEmail = new UserEmail(command.email);
		const docType: UserDocType = new UserDocType(command.docType);
		const docNumber: UserDocNumber = new UserDocNumber(command.docNumber);

		await this.userUpdater.run({
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
