import { APIGatewayProxyEvent } from "aws-lambda";
import { handle, Product } from "../handler";

describe("Get product", () => {
  const request = { body: "hello" } as APIGatewayProxyEvent;

  it("should return a status code of 200", async () => {
    const response = await handle(request);
    expect(response.statusCode).toEqual(200);
  });

  it("should have got the correct product", async () => {
    const response = await handle(request);
    const product = JSON.parse(response.body) as Product;
    expect(product.sku).toEqual("abc");
  });
});
