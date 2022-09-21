import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { get } from "./data/productRepository";
import mongoose from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/productStore";

export const handle = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  if (mongoose.connection.readyState === 0) await mongoose.connect(MONGODB_URI);

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
