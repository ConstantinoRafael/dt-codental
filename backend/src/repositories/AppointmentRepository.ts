import Database from "../config/db";
import { Appointment } from "../types/Appointment";

class AppointmentRepository {
  private db = Database.getInstance();

  async getAll(): Promise<Appointment[]> {
    const result = await this.db.query(`SELECT * FROM appointments`);
    return result.rows;
  }
}

export default new AppointmentRepository();
