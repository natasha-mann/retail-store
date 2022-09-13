import { Schema, model } from "mongoose";

export interface IProduct {
  sku: string;
  name: string;
}

const productSchema = new Schema<IProduct>({
  sku: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

export const Product = model<IProduct>("Product", productSchema);
