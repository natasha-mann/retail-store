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
  if (mongoose.connection.readyState === 0) await mongoose.connect(MONGODB_URI);

  const sku = event.pathParameters!.sku;

  if (!sku) {
    throw new Error();
  }

  let repo: IProductRepository;

  repo = new InMemoryRepository();
  const product = await repo.get(sku);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
