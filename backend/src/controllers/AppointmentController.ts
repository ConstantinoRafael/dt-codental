import { Request, Response } from "express";
import AppointmentService from "../services/AppointmentService";

class AppointmentController {
  async getAllAppointments(_req: Request, res: Response) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}

export default new AppointmentController();
