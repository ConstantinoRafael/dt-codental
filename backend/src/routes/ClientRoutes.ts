import { Router } from "express";
import ClientController from "../controllers/ClientController";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/", ClientController.getAllClients);
router.post("/", ClientController.createClient);
router.put("/:id", ClientController.updateClient);
router.delete("/:id", ClientController.deleteClient);

router.post("/upload-csv", upload.single("file"), ClientController.uploadCSV);

export default router;
