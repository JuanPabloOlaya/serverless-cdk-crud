import { Command } from "../../../shared/domain/Command";

type Params = {
	id: string,
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	docType: string,
	docNumber: string,
};

export class CreateUserCommand extends Command {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	docType: string;
	docNumber: string;

	constructor({ id, firstName, lastName, email, password, docType, docNumber }: Params) {
		super();

		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.docType = docType;
		this.docNumber = docNumber;
	}
}
