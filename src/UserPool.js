import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: "us-west-1_UU35BmaOp",
    ClientId: "5eodicp05593vlmgb83v3ukjph"
};

export default new CognitoUserPool(poolData);