import { Router } from "express";
import ClientController from "../controllers/ClientController";
import ClientRepository from "../repositories/ClientRepository";
import ClientService from "../services/ClientService";

const router = Router();

router.get("/", ClientController.getAllClients);

export default router;
