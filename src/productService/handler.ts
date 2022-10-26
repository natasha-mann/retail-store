import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  MongoRepository,
  IProductRepository,
  connect,
} from "./data/productRepository";

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const sku = event.pathParameters!.sku;

  if (!sku) {
    throw new Error("Sku not provided");
  }

  const db = await connect();

  const repo = new MongoRepository(db);

  const product = await repo.get(sku);
  if (product) {
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } else {
    return {
      statusCode: 400,
      body: "No product found",
    };
  }
};
