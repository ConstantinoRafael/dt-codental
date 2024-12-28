import AppointmentRepository from "../repositories/AppointmentRepository";
import { Appointment } from "../types/Appointment";

class AppointmentService {
  async getAllAppointments(): Promise<Appointment[]> {
    return await AppointmentRepository.getAll();
  }

  async createAppointment(appointment: Appointment): Promise<Appointment> {
    const newAppointment = await AppointmentRepository.create(appointment);
    return newAppointment;
  }
}

export default new AppointmentService();
