import { Controller } from "./Controller";
import { UserAlreadyExists } from "../../../contexts/admin/users/domain/UserAlreadyExists";
import { CommandBus } from "../../../contexts/shared/domain/CommandBus";
import { CreateUserCommand } from "../../../contexts/admin/users/application/CreateUserCommand";
import { v4 } from 'uuid';
import httpStatus from "http-status";

export class UserCreateController implements Controller {
	constructor(private commandBus: CommandBus) {}

	async run(event: any): Promise<any> {
		try {
			const {
				firstName,
				lastName,
				email,
				password,
				docType,
				docNumber
			}: any = JSON.parse(event.body);
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
			console.log(httpStatus);
			return  {
				statusCode: httpStatus["200"],
				body: JSON.stringify({
					message: "User created",
					data: createUserCommand,
				})
			};
		} catch (error) {
			if (error instanceof UserAlreadyExists) {
				return {
					statusCode: httpStatus.BAD_REQUEST,
					body: error.message,
				};
			} else {
				return {
					statusCode: httpStatus.INTERNAL_SERVER_ERROR,
					body: JSON.parse(error),
				};
			}
		}
	}
}
