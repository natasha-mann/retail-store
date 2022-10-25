import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  MongoRepository,
  IProductRepository,
  InMemoryRepository,
} from "./data/productRepository";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

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
    mongoose
      .connect(MONGODB_URI, { retryWrites: true, w: "majority" })
      .then(() => {
        console.log("Connected to mongoDB.");
      })
      .catch((error) => {
        console.log("Unable to connect:", error);
      });
  } catch (error) {
    console.log("CATCH", error);
  }

  let repo: IProductRepository;

  repo = new MongoRepository();
  console.log("repo", repo);
  const product = await repo.get(sku);
  console.log("product", product);

  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
};
