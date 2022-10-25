import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  MongoRepository,
  IProductRepository,
  connect,
} from "./data/productRepository";

const MONGODB_URI = process.env.MONGODB_URI!;

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("HANDLER");
  const sku = event.pathParameters!.sku;
  console.log("SKU", sku);
  console.log("mongouri", MONGODB_URI);

  if (!sku) {
    throw new Error("Sku not provided");
  }

  const db = await connect();

  const repo = new MongoRepository(db);
  console.log("repo", repo);
  const product = await repo.get(sku);
  console.log("product", product);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
