import { Request, Response } from "express";
import ClientService from "../services/ClientService";

class ClientController {
  async getAllClients(_req: Request, res: Response) {
    try {
      const clients = await ClientService.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}

export default new ClientController();
