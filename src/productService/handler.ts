import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { get } from "./data/productRepository";

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const sku = event.pathParameters!.sku;

  const product = get(sku);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
