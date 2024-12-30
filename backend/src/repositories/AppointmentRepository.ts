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
    console.log(appointment);
    const result = await this.db.query(
      `INSERT INTO appointments (name, "startDate", "endDate") VALUES ($1, $2, $3) RETURNING *`,
      [name, startDate, endDate]
    );

    return result.rows[0];
  }

  async fyndConflicts(startDate: Date, endDate: Date): Promise<Appointment[]> {
    const result = await this.db.query(
      `SELECT * FROM appointments WHERE "startDate" < $2 AND "endDate" > $1`,
      [startDate, endDate]
    );

    console.log(result);

    return result.rows;
  }
}

export default new AppointmentRepository();
