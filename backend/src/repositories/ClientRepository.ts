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

  async update(id: number, client: Client): Promise<Client> {
    const { name, address, city, state, zip, phone, cpf } = client;
    const result = await this.db.query(
      `UPDATE clients SET name = $1, address = $2, city = $3, state = $4, zip = $5, phone = $6, cpf = $7
       WHERE id = $8 RETURNING *`,
      [name, address, city, state, zip, phone, cpf, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await this.db.query("DELETE FROM clients WHERE id = $1", [id]);
  }
}

export default new ClientRepository();
