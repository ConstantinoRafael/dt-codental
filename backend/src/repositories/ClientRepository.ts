import Database from "../config/db";
import { Client } from "../types/Client";

class ClientRepository {
  private db = Database.getInstance();

  async getAll(
    CPF?: string,
    Nome?: string,
    Telefone?: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = "created_at",
    order: string = "asc"
  ): Promise<{ clients: Client[]; totalCount: number }> {
    let query = "SELECT * FROM clients WHERE 1 = 1";

    const params = [];

    if (CPF) {
      query += ` AND cpf = $${params.length + 1}`;
      params.push(CPF);
    }

    if (Nome) {
      query += ` AND name ILIKE $${params.length + 1}`;
      params.push(`%${Nome}%`);
    }

    if (Telefone) {
      query += ` AND phone = $${params.length + 1}`;
      params.push(Telefone);
    }

    const validSortFields = ["name", "state", "created_at"];
    console.log(sortBy);
    if (!validSortFields.includes(sortBy)) {
      throw new Error("Invalid sortBy field");
    }

    query += ` ORDER BY "${sortBy}" ${order}`;

    const countQuery = `
    SELECT COUNT(*) FROM clients WHERE 1 = 1
    ${CPF ? ` AND cpf = $${params.length + 1}` : ""}
    ${Nome ? ` AND name ILIKE $${params.length + 1}` : ""}
    ${Telefone ? ` AND phone = $${params.length + 1}` : ""}
  `;
    const countParams = [...params];

    const countResult = await this.db.query(countQuery, countParams);
    const totalCount = parseInt(countResult.rows[0].count, 10);

    const offset = (page - 1) * limit;
    query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit.toString(), offset.toString());

    const result = await this.db.query(query, params);
    return { clients: result.rows, totalCount };
  }

  async getByCPF(CPF: string): Promise<Client> {
    console.log(CPF);
    const result = await this.db.query(`SELECT * FROM clients WHERE cpf = $1`, [
      CPF,
    ]);

    console.log(result.rows[0]);

    return result.rows[0];
  }

  async create(client: Client): Promise<Client> {
    const { Nome, Endereço, Cidade, Estado, CEP, Telefone, CPF } = client;
    console.log(client);
    const result = await this.db.query(
      `INSERT INTO clients (name, address, city, state, zip, phone, cpf)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [Nome, Endereço, Cidade, Estado, CEP, Telefone, CPF]
    );
    return result.rows[0];
  }

  // async update(id: number, client: Client): Promise<Client> {
  //   const { Nome, Endereço, Cidade, Estado, CEP, Telefone, CPF } = client;
  //   console.log(client);
  //   const result = await this.db.query(
  //     `UPDATE clients SET Nome = $1, Endereço = $2, Cidade = $3, Estado = $4, CEP = $5, Telefone = $6, CPF = $7
  //      WHERE id = $8 RETURNING *`,
  //     [Nome, Endereço, Cidade, Estado, CEP, Telefone, CPF, id]
  //   );
  //   return result.rows[0];
  // }

  // async delete(id: number): Promise<void> {
  //   await this.db.query("DELETE FROM clients WHERE id = $1", [id]);
  // }

  async getTotalClients(): Promise<number> {
    const result = await this.db.query("SELECT COUNT(*) FROM clients");
    return parseInt(result.rows[0].count, 10);
  }

  async getTotalClientsWithDuplicatedPhones(): Promise<number> {
    const result = await this.db.query(`
      SELECT COUNT(*) 
      FROM clients 
      WHERE "phone" IN (
        SELECT "phone" 
        FROM clients
        GROUP BY "phone"
        HAVING COUNT(*) > 1
      )
    `);
    return result.rows[0].count;
  }

  async getTotalClientsByState(): Promise<{ Estado: string; count: number }[]> {
    const result = await this.db.query(`
      SELECT "state", COUNT(*) 
      FROM clients
      GROUP BY "state"
    `);
    return result.rows;
  }
}

export default new ClientRepository();
