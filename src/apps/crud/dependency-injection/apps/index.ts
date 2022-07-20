import { ContainerBuilder, Reference } from "node-dependency-injection";
import { UserCreateController } from "../../controllers/UserPutController";

export const injectAppsDependencies: (container: ContainerBuilder) => void = (
  container: ContainerBuilder
): void => {
  container
    .register(
      "apps.crud.controllers.UserCreateController",
      UserCreateController
    )
    .addArgument(new Reference("shared.CommandBus"));
};
