import {
  Stack,
  StackProps,
  aws_lambda_nodejs as Lambda,
  aws_apigateway as APIGateway,
  aws_dynamodb as DynamoDB,
  aws_cognito as Cognito,
  SecretValue,
  aws_iam as IAM,
  RemovalPolicy,
} from "aws-cdk-lib";
import { App, GitHubSourceCodeProvider } from '@aws-cdk/aws-amplify-alpha';
import { Construct } from "constructs";
import { AccountRecovery, UserPoolClientIdentityProvider } from "aws-cdk-lib/aws-cognito";

export class ServerlessCdkCrudStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //#region Auth
    const userPool: Cognito.UserPool = new Cognito.UserPool(this, 'cdk-serverless-user-pool', {
      selfSignUpEnabled: true,
      removalPolicy: RemovalPolicy.DESTROY,
      autoVerify: { email: true },
      signInAliases: { email: true },
      passwordPolicy: {
        minLength: 6,
        requireLowercase: false,
        requireDigits: false,
        requireUppercase: false,
        requireSymbols: false,
      },
      accountRecovery: AccountRecovery.EMAIL_ONLY,
    });

    const userPoolClient: Cognito.UserPoolClient = new Cognito.UserPoolClient(this, 'cdk-serverless-user-pool-client', {
      userPool,
      generateSecret: false,
      authFlows: {
        adminUserPassword: true,
        userPassword: true,
        custom: true,
        userSrp: true,
      },
      supportedIdentityProviders: [
        UserPoolClientIdentityProvider.COGNITO,
      ],
    });

    new Cognito.CfnIdentityPool(this, 'cdk-serverless-user-identity-pool', {
      allowUnauthenticatedIdentities: true,
      cognitoIdentityProviders: [{
        clientId: userPoolClient.userPoolClientId,
        providerName: userPool.userPoolProviderName,
      }],
    });
    //#endregion

    //#region Lambdas crud
    const createUserLambda: Lambda.NodejsFunction = new Lambda.NodejsFunction(this, "createUser", {
      entry: "src/index.ts",
      handler: "createUser",
      bundling: {
        preCompilation: true,
      },
    });

    const getUserLambda: Lambda.NodejsFunction = new Lambda.NodejsFunction(this, "getUser", {
      entry: "src/index.ts",
      handler: "getUser",
      bundling: {
        preCompilation: true,
      },
    });

    const updateUserLambda: Lambda.NodejsFunction = new Lambda.NodejsFunction(this, "updateUser", {
      entry: "src/index.ts",
      handler: "updateUser",
      bundling: {
        preCompilation: true,
      },
    });

    const deleteUserLambda: Lambda.NodejsFunction = new Lambda.NodejsFunction(this, "deleteUser", {
      entry: "src/index.ts",
      handler: "deleteUser",
      bundling: {
        preCompilation: true,
      },
    });

    const apiGateway: APIGateway.LambdaRestApi = new APIGateway.LambdaRestApi(this, "crudGateway", {
      handler: createUserLambda,
      proxy: false,
    });

    const authorizer = new APIGateway.CognitoUserPoolsAuthorizer(this, 'crud-authorizer', {
      cognitoUserPools: [userPool],
    });

    const userResource: APIGateway.Resource = apiGateway.root.addResource("user");
    userResource.addMethod("POST", new APIGateway.LambdaIntegration(createUserLambda), {
      authorizer,
      authorizationType: APIGateway.AuthorizationType.COGNITO,
    });

    const userParamsResource: APIGateway.Resource = userResource.addResource("{id}");
    userParamsResource.addMethod("GET", new APIGateway.LambdaIntegration(getUserLambda), {
      authorizer,
      authorizationType: APIGateway.AuthorizationType.COGNITO,
    });
    userParamsResource.addMethod("PUT", new APIGateway.LambdaIntegration(updateUserLambda), {
      authorizer,
      authorizationType: APIGateway.AuthorizationType.COGNITO,
    });
    userParamsResource.addMethod("DELETE", new APIGateway.LambdaIntegration(deleteUserLambda), {
      authorizer,
      authorizationType: APIGateway.AuthorizationType.COGNITO,
    });

    const usersTable = new DynamoDB.Table(this, "crud-users-dev", {
      partitionKey: {
        name: "id",
        type: DynamoDB.AttributeType.STRING,
      },
      billingMode: DynamoDB.BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: "crud-users-dev",
    });
    usersTable.grantWriteData(createUserLambda);
    usersTable.grantReadData(getUserLambda);
    usersTable.grantWriteData(updateUserLambda);
    usersTable.grantWriteData(deleteUserLambda);

    //#endregion

    //#region Frontend
    // const amplifyApp: App = new App(this, "cdk-amplify-serverless-crud-app", {
    //   appName: 'serverless-crud-cdk-front',
    //   sourceCodeProvider: new GitHubSourceCodeProvider({
    //     owner: 'JuanPabloOlaya',
    //     oauthToken: SecretValue.secretsManager("github-oauth-token"),
    //     repository: "serverless-cdk-crud-front",
    //   }),
    //   environmentVariables: {
    //     IDENTITY_POOL: identityPool.ref,
    //     USER_POOL_ID: userPool.userPoolId,
    //     USER_POOL_CLIENT_ID: userPoolClient.userPoolClientId,
    //     REGION: this.region,
    //   },
    // });

    // amplifyApp.addBranch('master');
    //#endregion
  }
}
