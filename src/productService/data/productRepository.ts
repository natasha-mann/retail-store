import { Product, IProduct } from "../models/product";
import * as mongodb from "mongodb";

export interface IProductRepository {
  get: (
    sku: string
  ) => Promise<mongodb.WithId<mongodb.Document>> | Promise<IProduct>;
}

export class MongoRepository implements IProductRepository {
  db: mongodb.Db;

  constructor(db: mongodb.Db) {
    this.db = db;
  }

  async get(sku: string): Promise<mongodb.WithId<mongodb.Document>> {
    console.log("PRODUCT");
    const product = await this.db.collection("products").findOne({ sku });
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
  const MONGODB_URI = process.env.MONGODB_URI!;
  try {
    const client = await mongodb.MongoClient.connect(MONGODB_URI);
    const db = await client.db("test");
    return db;
  } catch (error) {
    throw new Error(`ERROR: ${error}`);
  }
};
