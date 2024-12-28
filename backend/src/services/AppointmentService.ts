import AppointmentRepository from "../repositories/AppointmentRepository";
import { Appointment } from "../types/Appointment";

class AppointmentService {
  async getAllAppointments(): Promise<Appointment[]> {
    return await AppointmentRepository.getAll();
  }
}

export default new AppointmentService();
