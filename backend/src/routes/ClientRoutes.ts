import { Router } from "express";
import ClientController from "../controllers/ClientController";

const router = Router();

router.get("/", ClientController.getAllClients);
router.post("/", ClientController.createClient);

export default router;
