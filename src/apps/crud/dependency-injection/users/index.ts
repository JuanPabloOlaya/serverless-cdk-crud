import { ContainerBuilder, Reference } from "node-dependency-injection";
import { UserCreator } from "../../../../contexts/admin/users/application/UserCreator";
import { CreateUserCommandHandler } from "../../../../contexts/admin/users/application/CreateUserCommandHandler";
import { DynamoDbUserRepository } from "../../../../contexts/admin/users/infrastructure/persistence/DynamoDbUserRepository";

export const injectUsersDependencies: (container: ContainerBuilder) => void = (
  container: ContainerBuilder
): void => {
  container.register("admin.users.UserRepository", DynamoDbUserRepository);
  container
    .register("admin.users.UserCreator", UserCreator)
    .addArgument(new Reference("admin.users.UserRepository"));
  container
    .register("admin.users.CreateUserCommandHandler", CreateUserCommandHandler)
    .addArgument(new Reference("admin.users.UserCreator"))
		.addTag('commandHandler');
};
