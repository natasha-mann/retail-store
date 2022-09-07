import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export interface Product {
  sku: string;
  name: string;
}

const products: Product[] = [
  { sku: "abc", name: "hat" },
  { sku: "def", name: "shoe" },
  { sku: "ghi", name: "sock" },
];

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const sku = event.pathParameters!.sku;

  const product = products.find((p) => p.sku === sku);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
