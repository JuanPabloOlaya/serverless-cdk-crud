import { ContainerBuilder, Reference } from "node-dependency-injection";
import { UserCreator } from "../../../../contexts/admin/users/application/create/UserCreator";
import { CreateUserCommandHandler } from "../../../../contexts/admin/users/application/create/CreateUserCommandHandler";
import { UserFinder } from "../../../../contexts/admin/users/application/find/UserFinder";
import { FindUserQueryHandler } from "../../../../contexts/admin/users/application/find/FindUserQueryHandler";
import { DynamoDbUserRepository } from "../../../../contexts/admin/users/infrastructure/persistence/DynamoDbUserRepository";
import { UserDeleter } from "../../../../contexts/admin/users/application/delete/UserDeleter";
import { DeleteUserCommandHandler } from "../../../../contexts/admin/users/application/delete/DeleteUserCommandHandler";

type InjectionFunction = (container: ContainerBuilder) => void;

const injectCreateDependencies: InjectionFunction = (container: ContainerBuilder): void => {
  container
    .register("admin.users.UserCreator", UserCreator)
    .addArgument(new Reference("admin.users.UserRepository"));
  container
    .register("admin.users.CreateUserCommandHandler", CreateUserCommandHandler)
    .addArgument(new Reference("admin.users.UserCreator"))
    .addTag("commandHandler");
};

const injectFindDependencies: InjectionFunction = (container: ContainerBuilder): void => {
  container
    .register("admin.users.UserFinder", UserFinder)
    .addArgument(new Reference("admin.users.UserRepository"));
  container
    .register("admin.users.FindUserQueryHandler", FindUserQueryHandler)
    .addArgument(new Reference("admin.users.UserFinder"))
    .addTag("queryHandler");
};

const injectDeleteDependencies: InjectionFunction = (container: ContainerBuilder): void => {
  container
    .register("admin.users.UserDeleter", UserDeleter)
    .addArgument(new Reference("admin.users.UserRepository"));
  container
    .register("admin.users.DeleteUserCommandHandler", DeleteUserCommandHandler)
    .addArgument(new Reference("admin.users.UserDeleter"))
    .addTag("commandHandler");
};

export const injectUsersDependencies: InjectionFunction = (container: ContainerBuilder): void => {
  container.register("admin.users.UserRepository", DynamoDbUserRepository);
  injectCreateDependencies(container);
  injectFindDependencies(container);
  injectDeleteDependencies(container);
};
