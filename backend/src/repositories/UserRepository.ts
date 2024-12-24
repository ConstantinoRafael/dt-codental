import Database from "../config/db";
import { User } from "../types/User";

class UserRepository {
  private db = Database.getInstance();

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }

  async createUser(email: string, password: string): Promise<User> {
    const result = await this.db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, password]
    );
    return result.rows[0];
  }
}

export default new UserRepository();
