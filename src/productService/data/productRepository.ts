import { Product, IProduct } from "../models/product";

const products: IProduct[] = [
  { sku: "abc", name: "hat" },
  { sku: "def", name: "shoe" },
  { sku: "ghi", name: "sock" },
];

export const add = async () => {
  await Product.create(products);
};

export const get = async (sku: string): Promise<IProduct> => {
  // const product = products.find((p) => p.sku === sku);
  const product = await Product.findOne({ where: { sku } });
  if (!product) throw new Error();

  return product;
};
