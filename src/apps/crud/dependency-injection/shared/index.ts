import { ContainerBuilder, Reference, TagReference } from "node-dependency-injection";
import { CommandHandlersInformation } from "../../../../contexts/shared/infrastructure/command-bus/CommandHandlersInformation";
import { InMemoryCommandBus } from "../../../../contexts/shared/infrastructure/command-bus/InMemoryCommandBus";
import { QueryHandlersInformation } from "../../../../contexts/shared/infrastructure/query-bus/QueryHandlersInformation";
import { InMemoryQueryBus } from "../../../../contexts/shared/infrastructure/query-bus/InMemoryQueryBus";

type InjectionFunction = (container: ContainerBuilder) => void;

const injectCommandDependencies: InjectionFunction = (container: ContainerBuilder): void => {
  container
    .register("shared.CommandHandlersInformation", CommandHandlersInformation)
    .addArgument(new TagReference("commandHandler"));
  container
    .register("shared.CommandBus", InMemoryCommandBus)
    .addArgument(new Reference("shared.CommandHandlersInformation"));
};

export const injectQueryDependencies: InjectionFunction = (container: ContainerBuilder): void => {
  container
    .register("shared.QueryHandlersInformation", QueryHandlersInformation)
    .addArgument(new TagReference("queryHandler"));
  container
    .register("shared.QueryBus", InMemoryQueryBus)
    .addArgument(new Reference("shared.QueryHandlersInformation"));
};

export const injectSharedDependencies: InjectionFunction = (container: ContainerBuilder): void => {
  injectCommandDependencies(container);
  injectQueryDependencies(container);
};
