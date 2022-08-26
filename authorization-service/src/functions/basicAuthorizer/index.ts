import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda';

export const handler = async (event: APIGatewayTokenAuthorizerEvent) => {
  console.log('Authorizer event:', event);

  const { authorizationToken, methodArn } = event;
  const token = authorizationToken.split(' ')[1];
  const [userName, userPassword] = Buffer.from(token, 'base64').toString('utf-8').split(':');

  const envPassword = process.env[userName];
  const effect = envPassword && envPassword === userPassword ? 'Allow' : 'Deny';

  return {
    principalId: token,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: methodArn,
        },
      ],
    },
  };
};
