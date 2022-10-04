import { Product, IProduct } from "../models/product";

export interface IProductRepository {
  get: (sku: string) => Promise<IProduct>;
}

export class MongoRepository implements IProductRepository {
  async get(sku: string): Promise<IProduct> {
    const product = await Product.findOne({ sku });

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
