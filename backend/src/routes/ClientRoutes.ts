import { Router } from "express";
import ClientController from "../controllers/ClientController";
import multer from "multer";
import authMiddleware from "../middlewares/auth-middleware";
import validateClient from "../middlewares/validateClient-middleware";

const router = Router();
const upload = multer();

router.get("/", authMiddleware, ClientController.getAllClients);
router.post("/", authMiddleware, validateClient, ClientController.createClient);
router.put("/:id", authMiddleware, ClientController.updateClient);
router.delete("/:id", authMiddleware, ClientController.deleteClient);

router.post(
  "/upload-csv",
  authMiddleware,
  upload.single("file"),
  ClientController.uploadCSV
);

router.get("/client-metrics", ClientController.getClientMetrics);

export default router;
