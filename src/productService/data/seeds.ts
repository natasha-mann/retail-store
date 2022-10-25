import mongoose from "mongoose";
import { Product, IProduct } from "../models/product";
import * as dotenv from "dotenv";
dotenv.config();

const products: IProduct[] = [
  { sku: "abc", name: "hat" },
  { sku: "def", name: "shoe" },
  { sku: "ghi", name: "sock" },
];

export const seed = async () => {
  console.log(process.env.MONGODB_URI);
  const MONGODB_URI = process.env.MONGODB_URI!;
  console.log(MONGODB_URI);
  if (mongoose.connection.readyState === 0) await mongoose.connect(MONGODB_URI);

  await Product.create(products);

  await mongoose.connection.close();
};

seed().then(() => console.log("Products Seeded!"));
