import express from "express";
import clientRoutes from "./routes/ClientRoutes";
import appointmentRoutes from "./routes/AppointmentRoutes";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/UserRoutes";
import authMiddleware from "./middlewares/auth-middleware";

const app = express();

app.use(express.json());
app.use("/clients", authMiddleware, clientRoutes);
app.use("/appointments", authMiddleware, appointmentRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;
