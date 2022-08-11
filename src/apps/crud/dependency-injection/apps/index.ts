import { ContainerBuilder, Reference } from "node-dependency-injection";
import { UserCreateController } from "../../controllers/UserCreateController";
import { UserFindController } from "../../controllers/UserFindController";
import { UserDeleteController } from "../../controllers/UserDeleteController";
import { UserUpdateController } from "../../controllers/UserUpdateController";

export const injectAppsDependencies: (container: ContainerBuilder) => void = (
  container: ContainerBuilder
): void => {
  container
    .register("apps.crud.controllers.UserCreateController", UserCreateController)
    .addArgument(new Reference("shared.CommandBus"));
  container
    .register("apps.crud.controllers.UserFindController", UserFindController)
    .addArgument(new Reference("shared.QueryBus"));
  container
    .register("apps.crud.controllers.UserDeleteController", UserDeleteController)
    .addArgument(new Reference("shared.CommandBus"));
  container
    .register("apps.crud.controllers.UserUpdateController", UserUpdateController)
    .addArgument(new Reference("shared.CommandBus"));
};
