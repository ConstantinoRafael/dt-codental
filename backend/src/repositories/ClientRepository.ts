import Database from "../config/db";
import { Client } from "../types/Client";

class ClientRepository {
  private db = Database.getInstance();

  async getAll(
    CPF?: string,
    Nome?: string,
    Telefone?: string
  ): Promise<Client[]> {
    let query = "SELECT * FROM clients WHERE 1 = 1";

    const params = [];

    if (CPF) {
      query += ` AND "CPF" = $${params.length + 1}`;
      params.push(CPF);
    }

    if (Nome) {
      query += ` AND "Nome" ILIKE $${params.length + 1}`;
      params.push(`%${Nome}%`);
    }

    if (Telefone) {
      query += ` AND "Telefone" = $${params.length + 1}`;
      params.push(Telefone);
    }

    const result = await this.db.query(query, params);
    return result.rows;
  }

  async getByCPF(CPF: string): Promise<Client> {
    console.log(CPF);
    const result = await this.db.query(
      `SELECT * FROM clients WHERE "CPF" = $1`,
      [CPF]
    );

    console.log(result.rows[0]);

    return result.rows[0];
  }

  async create(client: Client): Promise<Client> {
    const { Nome, Endereço, Cidade, Estado, CEP, Telefone, CPF } = client;
    console.log(CPF);
    const result = await this.db.query(
      `INSERT INTO clients ("Nome", "Endereço", "Cidade", "Estado", "CEP", "Telefone", "CPF")
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [Nome, Endereço, Cidade, Estado, CEP, Telefone, CPF]
    );
    return result.rows[0];
  }

  async update(id: number, client: Client): Promise<Client> {
    const { Nome, Endereço, Cidade, Estado, CEP, Telefone, CPF } = client;
    const result = await this.db.query(
      `UPDATE clients SET Nome = $1, Endereço = $2, Cidade = $3, Estado = $4, CEP = $5, Telefone = $6, CPF = $7
       WHERE id = $8 RETURNING *`,
      [Nome, Endereço, Cidade, Estado, CEP, Telefone, CPF, id]
    );
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    await this.db.query("DELETE FROM clients WHERE id = $1", [id]);
  }
}

export default new ClientRepository();
