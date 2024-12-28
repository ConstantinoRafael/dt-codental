import { Router } from "express";
import AppointmentController from "../controllers/AppointmentController";

const router = Router();

router.get("/", AppointmentController.getAllAppointments);
router.post("/", AppointmentController.createAppointment);

export default router;
