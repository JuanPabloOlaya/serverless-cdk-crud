import { ContainerBuilder, Reference } from "node-dependency-injection";
import { UserCreateController } from "../../controllers/UserPutController";
import { UserFindController } from "../../controllers/UserFindController";

export const injectAppsDependencies: (container: ContainerBuilder) => void = (
  container: ContainerBuilder
): void => {
  container
    .register("apps.crud.controllers.UserCreateController", UserCreateController)
    .addArgument(new Reference("shared.CommandBus"));
  container
    .register("apps.crud.controllers.UserFindController", UserFindController)
    .addArgument(new Reference("shared.QueryBus"));
};
