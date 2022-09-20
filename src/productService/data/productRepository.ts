import { Product, IProduct } from "../models/product";

export const get = async (sku: string): Promise<IProduct> => {
  const product = await Product.findOne({ where: { sku } });
  if (!product) throw new Error();

  return product;
};
