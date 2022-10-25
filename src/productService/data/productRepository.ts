import { Product, IProduct } from "../models/product";
import * as mongoDB from "mongodb";

export interface IProductRepository {
  get: (sku: string) => Promise<IProduct>;
}

export class MongoRepository implements IProductRepository {
  constructor() {}
  async get(sku: string): Promise<IProduct> {
    console.log("PRODUCT");
    const product = await Product.findOne({ sku });
    console.log("product");

    if (!product) throw new Error();

    return product;
  }
}

export class InMemoryRepository implements IProductRepository {
  data = [
    { sku: "abc", name: "hat" },
    { sku: "def", name: "shoe" },
    { sku: "ghi", name: "sock" },
  ];

  async get(sku: string): Promise<IProduct> {
    const product = await this.data.find((e) => e.sku === sku);

    if (!product) throw new Error();

    return product;
  }
}

export const connect = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI!;
    console.log("URI", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to mongoDB");
  } catch (error) {
    console.log("CONNECT ERROR", error);
    throw error;
  }
};
