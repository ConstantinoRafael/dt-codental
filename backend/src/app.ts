import express from "express";
import clientRoutes from "./routes/ClientRoutes";
import appointmentRoutes from "./routes/AppointmentRoutes";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/UserRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/clients", clientRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;
