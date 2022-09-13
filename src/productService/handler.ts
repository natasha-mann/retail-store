import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { add, get } from "./data/productRepository";
import { Database } from "./data/connection";

const MONGODB_URI = "mongodb://127.0.0.1:27017/";

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const database = new Database(MONGODB_URI);

  await database.connect();
  await add();

  const sku = event.pathParameters!.sku;

  if (!sku) {
    throw new Error();
  }

  const product = await get(sku);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
