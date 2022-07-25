import { Query } from "../../../../shared/domain/Query";

export class FindUserQuery extends Query {
  id: string;

  constructor(id: string) {
    super();

    this.id = id;
  }
}
