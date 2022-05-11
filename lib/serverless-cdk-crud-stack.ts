import {
  Stack,
  StackProps,
  aws_lambda_nodejs as Lambda,
  aws_apigateway as APIGateway,
  aws_dynamodb as DynamoDB,
} from "aws-cdk-lib";
import { Construct } from "constructs";

export class ServerlessCdkCrudStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const createUserLambda: Lambda.NodejsFunction = new Lambda.NodejsFunction(this, "createUser", {
      entry: "src/apps/crud/lambdas/index.ts",
      handler: "createUser",
      bundling: {
        preCompilation: true,
      },
    });

    const getUserLambda: Lambda.NodejsFunction = new Lambda.NodejsFunction(this, "getUser", {
      entry: "src/apps/crud/lambdas/index.ts",
      handler: "getUser",
      bundling: {
        preCompilation: true,
      },
    });

    const updateUserLambda: Lambda.NodejsFunction = new Lambda.NodejsFunction(this, "updateUser", {
      entry: "src/apps/crud/lambdas/index.ts",
      handler: "updateUser",
      bundling: {
        preCompilation: true,
      },
    });

    const deleteUserLambda: Lambda.NodejsFunction = new Lambda.NodejsFunction(this, "deleteUser", {
      entry: "src/apps/crud/lambdas/index.ts",
      handler: "deleteUser",
      bundling: {
        preCompilation: true,
      },
    });

    const apiGateway: APIGateway.LambdaRestApi = new APIGateway.LambdaRestApi(this, "crudGateway", {
      handler: createUserLambda,
      proxy: false,
    });

    const userResource: APIGateway.Resource = apiGateway.root.addResource("user");
    userResource.addMethod("POST", new APIGateway.LambdaIntegration(createUserLambda));

    const userParamsResource: APIGateway.Resource = userResource.addResource("{id}");
    userParamsResource.addMethod("GET", new APIGateway.LambdaIntegration(getUserLambda));
    userParamsResource.addMethod("PUT", new APIGateway.LambdaIntegration(updateUserLambda));
    userParamsResource.addMethod("DELETE", new APIGateway.LambdaIntegration(deleteUserLambda));

    new DynamoDB.Table(this, "crud-users-dev", {
      partitionKey: {
        name: "id",
        type: DynamoDB.AttributeType.STRING,
      },
      billingMode: DynamoDB.BillingMode.PAY_PER_REQUEST,
      tableName: "crud-users-dev",
    });
  }
}
