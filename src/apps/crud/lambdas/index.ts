import { Handler } from "aws-lambda";
import container from "../dependency-injection";

const createUserController = container.get('apps.crud.controllers.UserCreateController');
export const createUser: Handler = async (event: any): Promise<any> => await createUserController.run(event);

const findUserController = container.get('apps.crud.controllers.UserFindController');
export const getUser: Handler = async (event: any): Promise<any> => await findUserController.run(event);

export const updateUser: Handler = async (event: any): Promise<any> => {
	return {
		statusCode: 200,
		headers: {
			"Content-Type": "text/plain",
		},
		body: "Updating user",
	};
};

export const deleteUser: Handler = async (event: any): Promise<any> => {
	return {
		statusCode: 200,
		headers: {
			"Content-Type": "text/plain",
		},
		body: "Deleting user",
	};
};
