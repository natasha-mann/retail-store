import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (event.httpMethod === "POST") {
    return {
      statusCode: 200,
      body: "POST",
    };
  }

  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      body: "GET",
    };
  }

  return {
    statusCode: 200,
    body: "GET",
  };
};
