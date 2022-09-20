import { APIGatewayProxyEvent } from "aws-lambda";
import { handle } from "../handler";
import { IProduct } from "../models/product";
import {
  describe,
  expect,
  it,
  beforeAll,
  afterEach,
  afterAll,
  beforeEach,
  jest,
} from "@jest/globals";
import { add } from "../data/productRepository";
const db = require("./testdb");

// jest.mock("../data/connection");

beforeAll(async () => {
  console.log("BEFORE");
  await db.setUp();
});

// beforeEach(async () => {
//   await add();
// });

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe("Get product", () => {
  const request = {
    body: "hello",
    pathParameters: {
      sku: "abc",
    },
  } as unknown as APIGatewayProxyEvent;

  it("should return a status code of 200", async () => {
    const response = await handle(request);
    expect(response.statusCode).toEqual(200);
  });

  it("should have got the correct product", async () => {
    const response = await handle(request);
    const product = JSON.parse(response.body) as IProduct;
    expect(product.sku).toEqual("abc");
  });

  it("should not return any other products", async () => {
    const response = await handle(request);
    const product = JSON.parse(response.body) as IProduct;
    expect(product.sku).not.toEqual("bcd");
  });
});
