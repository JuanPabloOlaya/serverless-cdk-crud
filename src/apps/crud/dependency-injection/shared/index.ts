import { ContainerBuilder, Reference, TagReference } from "node-dependency-injection";
import { CommandHandlersInformation } from "../../../../contexts/shared/infrastructure/command-bus/CommandHandlersInformation";
import { InMemoryCommandBus } from "../../../../contexts/shared/infrastructure/command-bus/InMemoryCommandBus";

export const injectSharedDependencies: (container: ContainerBuilder) => void = (
  container: ContainerBuilder
): void => {
  container.register(
    "shared.CommandHandlersInformation",
    CommandHandlersInformation
  ).addArgument(new TagReference("commandHandler"));
  container
    .register("shared.CommandBus", InMemoryCommandBus)
    .addArgument(new Reference("shared.CommandHandlersInformation"));
};
