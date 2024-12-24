import express from "express";
import clientRoutes from "./routes/ClientRoutes";
import authRoutes from "./routes/AuthRoutes";

const app = express();

app.use(express.json());
app.use("/clients", clientRoutes);
app.use("/auth", authRoutes);

export default app;
