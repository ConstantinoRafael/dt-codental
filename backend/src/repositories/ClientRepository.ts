import Database from "../config/db";
import { Client } from "../types/Client";

class ClientRepository {
  private db = Database.getInstance();

  async getAll(): Promise<Client[]> {
    const result = await this.db.query("SELECT * FROM clients");
    return result.rows;
  }

  async create(client: Client): Promise<Client> {
    const { name, address, city, state, zip, phone, cpf } = client;
    const result = await this.db.query(
      `INSERT INTO clients (name, address, city, state, zip, phone, cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, address, city, state, zip, phone, cpf]
    );
    return result.rows[0];
  }
}

export default new ClientRepository();
