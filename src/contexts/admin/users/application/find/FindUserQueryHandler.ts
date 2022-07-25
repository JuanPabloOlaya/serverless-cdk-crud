import { QueryHandler } from "../../../../shared/domain/QueryHandler";
import { FindUserQuery } from "./FindUserQuery";
import { FindUserResponse } from "./FindUserResponse";
import { Query } from "../../../../shared/domain/Query";
import { UserFinder } from "./UserFinder";
import { UserId } from "../../domain/UserId";

export class FindUserQueryHandler implements QueryHandler<FindUserQuery, FindUserResponse> {
  constructor(private finder: UserFinder) {}

  subscribedTo(): Query {
    return FindUserQuery;
  }

  handle(query: FindUserQuery): Promise<FindUserResponse> {
    const id = new UserId(query.id);

    return this.finder.run(id);
  }
}