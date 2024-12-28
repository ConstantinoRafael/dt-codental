import { Router } from "express";
import AppointmentController from "../controllers/AppointmentController";

const router = Router();

router.get("/", AppointmentController.getAllAppointments);

export default router;
