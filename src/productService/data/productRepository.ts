import { Product } from "../models/product";

const products: Product[] = [
  { sku: "abc", name: "hat" },
  { sku: "def", name: "shoe" },
  { sku: "ghi", name: "sock" },
];

export const get = (sku: string): Product => {
  const product = products.find((p) => p.sku === sku);

  if (!product) throw new Error();

  return product;
};
