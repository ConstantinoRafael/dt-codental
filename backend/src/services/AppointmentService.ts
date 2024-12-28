import AppointmentRepository from "../repositories/AppointmentRepository";
import { Appointment } from "../types/Appointment";

class AppointmentService {
  async getAllAppointments(): Promise<Appointment[]> {
    return await AppointmentRepository.getAll();
  }

  async createAppointment(appointment: Appointment): Promise<Appointment> {
    const { startDate, endDate } = appointment;
    if (startDate >= endDate) {
      throw new Error("The start date must be earlier than the end date.");
    }

    const conflicts = await AppointmentRepository.fyndConflicts(
      startDate,
      endDate
    );
    if (conflicts.length > 0) {
      throw new Error(
        "The appointment conflicts with another scheduled appointment."
      );
    }

    const newAppointment = await AppointmentRepository.create(appointment);
    return newAppointment;
  }
}

export default new AppointmentService();
