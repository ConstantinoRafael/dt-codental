import dotenv from "dotenv";
import Database from "../config/db";

// Carregar variáveis de ambiente
dotenv.config();

// Função para criar as tabelas
const initDatabase = async () => {
  const pool = Database.getInstance();

  const dbName = process.env.POSTGRES_DB;

  // Conectar ao banco de dados
  const client = await pool.connect();

  try {
    console.log(`Conectando ao banco de dados ${dbName}...`);

    // Passo 1: Conectar no banco de dados especificado
    // Não é necessário usar SET search_path aqui
    console.log("Conexão estabelecida com sucesso!");

    // Passo 2: Criar as tabelas no banco de dados
    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS public.clients (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(100) NOT NULL,
          zip VARCHAR(9) NOT NULL,
          phone VARCHAR(15) NOT NULL,
          cpf VARCHAR(14) NOT NULL UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS public.appointments (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          "startDate" TIMESTAMP NOT NULL,
          "endDate" TIMESTAMP NOT NULL
      );

      CREATE TABLE IF NOT EXISTS public.users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    console.log("Criando tabelas...");
    await client.query(createTablesQuery);
    console.log("Tabelas criadas com sucesso!");
  } catch (err) {
    console.error("Erro ao criar tabelas:", err);
  } finally {
    console.log("Liberando a conexão...");
    client.release();
    console.log("Conexão liberada.");
  }
};

initDatabase();
