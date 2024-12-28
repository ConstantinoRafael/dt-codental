import { Router } from "express";
import ClientController from "../controllers/ClientController";
import multer from "multer";
import authMiddleware from "../middlewares/auth-middleware";

const router = Router();
const upload = multer();

router.get("/", authMiddleware, ClientController.getAllClients);
router.post("/", authMiddleware, ClientController.createClient);
router.put("/:id", authMiddleware, ClientController.updateClient);
router.delete("/:id", authMiddleware, ClientController.deleteClient);

router.post(
  "/upload-csv",
  authMiddleware,
  upload.single("file"),
  ClientController.uploadCSV
);

router.get("/total-clients", ClientController.getTotalClients);
router.get(
  "/total-clients-with-duplicated-phones",
  ClientController.getTotalClientsWithDuplicatedPhones
);
router.get("/total-clients-by-state", ClientController.getTotalClientsByState);

export default router;
