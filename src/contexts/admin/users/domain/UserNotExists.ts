export class UserNotExists extends Error {
  constructor(id: string) {
    super(`The user with ID <${id}> does not exists`);
  }
}