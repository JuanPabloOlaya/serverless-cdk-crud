export class UserAlreadyExists extends Error {
	constructor(id: string) {
		super(`User ${id} already exists`);
	}
}
