import { Router } from "express";
import AppointmentController from "../controllers/AppointmentController";
import authMiddleware from "../middlewares/auth-middleware";

const router = Router();

router.get("/", authMiddleware, AppointmentController.getAllAppointments);
router.post("/", authMiddleware, AppointmentController.createAppointment);

export default router;
