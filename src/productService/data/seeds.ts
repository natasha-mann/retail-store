import mongoose from "mongoose";
import { Product, IProduct } from "../models/product";

const products: IProduct[] = [
  { sku: "abc", name: "hat" },
  { sku: "def", name: "shoe" },
  { sku: "ghi", name: "sock" },
];

export const seed = async () => {
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/";
  if (mongoose.connection.readyState === 0) await mongoose.connect(MONGODB_URI);

  await Product.create(products);
};

seed();
