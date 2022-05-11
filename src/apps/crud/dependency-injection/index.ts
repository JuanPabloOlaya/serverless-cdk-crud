import { ContainerBuilder } from "node-dependency-injection";
import { injectSharedDependencies } from "./shared";
import { injectUsersDependencies } from "./users";
import { injectAppsDependencies } from "./apps";

const container: ContainerBuilder = new ContainerBuilder();

injectSharedDependencies(container);
injectUsersDependencies(container);
injectAppsDependencies(container);

export default container;
