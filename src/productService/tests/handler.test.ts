import { APIGatewayProxyEvent } from "aws-lambda";
import { handle } from "../handler";

describe("Product service handler", () => {
  it("should return a status code of 200", async () => {
    const request = { body: "hello" } as APIGatewayProxyEvent;

    const response = await handle(request);
    expect(response.statusCode).toEqual(200);
  });
});
