import express from "express";
import clientRoutes from "./routes/ClientRoutes";

const app = express();

app.use(express.json());
app.use("/clients", clientRoutes);

export default app;
