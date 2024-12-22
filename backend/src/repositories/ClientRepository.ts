import Database from "../config/db";
import { Client } from "../types/Client";

class ClientRepository {
  private db = Database.getInstance();

  async getAll(): Promise<Client[]> {
    const result = await this.db.query("SELECT * FROM clients");
    return result.rows;
  }
}

export default new ClientRepository();
