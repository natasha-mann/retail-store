import * as mongoDB from "mongodb";

export const collections: { products?: mongoDB.Collection } = {};
let cachedDb: mongoDB.Db | null = null;

export class Database {
  connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  async connect() {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
      this.connectionString
    );

    if (cachedDb) {
      return cachedDb;
    }

    await client.connect();

    const db: mongoDB.Db = client.db("product_db");

    cachedDb = db;

    return db;
  }

  async getItem(sku: string, db: mongoDB.Db) {
    return db.collection("products").findOne({ $where: sku });
  }
}
