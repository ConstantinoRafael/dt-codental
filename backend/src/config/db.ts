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
        ssl: {
          rejectUnauthorized: false,
        },
      });
    }
    return Database.instance;
  }

  static async testConnection(): Promise<void> {
    const pool = Database.getInstance();
    try {
      const res = await pool.query("SELECT NOW()");
      console.log("Banco de dados conectado:", res.rows[0]);
    } catch (err) {
      console.error("Erro ao conectar ao banco de dados:", err);
    }
  }
}

export default Database;

// Chamada para testar a conexão (você pode chamar esse método onde for necessário no seu código)
Database.testConnection();
