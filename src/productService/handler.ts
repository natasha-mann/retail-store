import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  MongoRepository,
  IProductRepository,
  InMemoryRepository,
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
  try {
    console.log("CONNECT");
    connect();
  } catch (error) {
    console.log("CATCH", error);
  }

  const repo = new MongoRepository();
  console.log("repo", repo);
  const product = await repo.get(sku);
  console.log("product", product);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
