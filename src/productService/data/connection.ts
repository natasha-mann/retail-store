import * as mongoDB from "mongodb";
import mongoose from "mongoose";
import { Product } from "../models/product";

export const collections: { products?: mongoDB.Collection } = {};

export class Database {
  connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  async connect() {
    await mongoose.connect(this.connectionString);
  }

  async getItem(sku: string, db: mongoDB.Db) {
    return Product.findOne({ $where: sku });
  }
}
