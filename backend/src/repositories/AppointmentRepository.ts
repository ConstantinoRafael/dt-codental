import Database from "../config/db";
import { Appointment } from "../types/Appointment";

class AppointmentRepository {
  private db = Database.getInstance();

  async getAll(): Promise<Appointment[]> {
    const result = await this.db.query(`SELECT * FROM appointments`);
    return result.rows;
  }

  async create(appointment: Appointment): Promise<Appointment> {
    const { name, startDate, endDate } = appointment;
    const result = await this.db.query(
      `INSERT INTO appointments (name, startDate, endDate) VALUES ($1, $2, $3) RETURNING *`,
      [name, startDate, endDate]
    );

    return result.rows[0];
  }
}

export default new AppointmentRepository();
