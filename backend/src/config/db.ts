import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class Database {
  private static instance: Pool;

  private constructor() {}

  static getInstance(): Pool {
    if (!Database.instance) {
      Database.instance = new Pool({
        connectionString: process.env.DATABASE_URL,
      });
    }
    return Database.instance;
  }
}
