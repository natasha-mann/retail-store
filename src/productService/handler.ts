import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { get } from "./data/productRepository";
import { Database } from "./data/connection";

const MONGODB_URI = "mongodb://127.0.0.1:27017/admin";

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // const database = new Database(MONGODB_URI);

  // const db = await database.connect();
  // console.log("DB", db);

  const sku = event.pathParameters!.sku;

  if (!sku) {
    throw new Error();
  }

  // const mongoProduct = await database.getItem(sku, db);

  // console.log("MONGO", mongoProduct);

  const product = await get(sku);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
