import { Handler } from "aws-lambda";
import container from "../dependency-injection";

const createUserController = container.get('apps.crud.controllers.UserCreateController');
export const createUser: Handler = async (event: any): Promise<any> => await createUserController.run(event);

const findUserController = container.get('apps.crud.controllers.UserFindController');
export const getUser: Handler = async (event: any): Promise<any> => await findUserController.run(event);

const updateUserController = container.get('apps.crud.controllers.UserUpdateController');
export const updateUser: Handler = async (event: any): Promise<any> => await updateUserController.run(event);

const deleteUserController = container.get('apps.crud.controllers.UserDeleteController');
export const deleteUser: Handler = async (event: any): Promise<any> => await deleteUserController.run(event);
