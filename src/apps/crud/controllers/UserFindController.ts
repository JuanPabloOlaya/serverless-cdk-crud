import { Controller } from "./Controller";
import { UserNotExists } from "../../../contexts/admin/users/domain/UserNotExists";
import { QueryBus } from "../../../contexts/shared/domain/QueryBus";
import { FindUserQuery } from "../../../contexts/admin/users/application/find/FindUserQuery";
import { FindUserResponse } from "../../../contexts/admin/users/application/find/FindUserResponse";

export class UserFindController implements Controller {
  constructor(private queryBus: QueryBus) {}

  async run(event: any): Promise<{[key: string]: unknown}> {
    try {
      const { id } = event.pathParameters;
      const query: FindUserQuery = new FindUserQuery(id);
      const user = await this.queryBus.ask<FindUserResponse>(query);

      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.user.toPrimitives()),
      };
    } catch (error) {
      console.error(error);
      if (error instanceof UserNotExists) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "text/plain",
          },
          body: error.message,
        }
      } else {
        return {
          statusCode: 500,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(error),
        }
      }
    }
  }
}