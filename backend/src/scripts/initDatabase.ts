import dotenv from "dotenv";
import bcrypt from "bcrypt";
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
    console.log("Conexão estabelecida com sucesso!");

    // Passo 1: Criar as tabelas no banco de dados
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

    // Passo 2: Criar um usuário inicial
    const email = "admin@codental.com";
    const plainPassword = "admin123";
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const insertUserQuery = `
      INSERT INTO public.users (email, password)
      VALUES ($1, $2)
      ON CONFLICT (email) DO NOTHING;
    `;

    console.log("Criando usuário inicial...");
    await client.query(insertUserQuery, [email, hashedPassword]);
    console.log(`Usuário inicial criado com email: ${email}`);
  } catch (err) {
    console.error("Erro ao inicializar o banco de dados:", err);
  } finally {
    console.log("Liberando a conexão...");
    client.release();
    console.log("Conexão liberada.");
  }
};

initDatabase();
