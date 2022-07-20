export interface Controller {
	run(event: any): Promise<void>;
}
