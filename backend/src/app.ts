import express from "express";
import clientRoutes from "./routes/ClientRoutes";
import authRoutes from "./routes/AuthRoutes";
import userRoutes from "./routes/UserRoutes";

const app = express();

app.use(express.json());
app.use("/clients", clientRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

export default app;
