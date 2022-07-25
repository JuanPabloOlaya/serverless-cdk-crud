export interface Controller {
	run(event: unknown): Promise<unknown | void>;
}
