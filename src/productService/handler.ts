import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  MongoRepository,
  IProductRepository,
  InMemoryRepository,
} from "./data/productRepository";
import mongoose from "mongoose";

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

  await mongoose.connect(MONGODB_URI);

  let repo: IProductRepository;

  repo = new MongoRepository();
  const product = await repo.get(sku);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
