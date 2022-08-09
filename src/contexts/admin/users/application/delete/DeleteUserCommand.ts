import { Command } from "../../../../shared/domain/Command";

export class DeleteUserCommand extends Command {
  id: string;

  constructor(id: string) {
    super();
    
    this.id = id;
  }
}