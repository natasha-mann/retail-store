import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handle = (event: APIGatewayProxyEvent): string => {
  return "hello world";
};
