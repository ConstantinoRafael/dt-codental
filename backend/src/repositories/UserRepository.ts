import Database from "../config/db";
import { User } from "../types/User";

class UserRepository {
  private db = Database.getInstance();

  async fundUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    return result.rows[0];
  }
}

export default new UserRepository();
