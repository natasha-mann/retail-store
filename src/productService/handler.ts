import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export interface Product {
  sku: string;
  name: string;
}

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const product: Product = {
    sku: "abc",
    name: "hat",
  };
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
