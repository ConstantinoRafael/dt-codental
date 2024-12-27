import { Request, Response } from "express";
import ClientService from "../services/ClientService";

class ClientController {
  async getAllClients(req: Request, res: Response) {
    try {
      const { cpf, nome, telefone } = req.query;
      console.log(nome);

      const clients = await ClientService.getAllClients(
        cpf as string,
        nome as string,
        telefone as string
      );
      res.status(200).json(clients);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async createClient(req: Request, res: Response) {
    try {
      const client = req.body;
      const newClient = await ClientService.createClient(client);
      res.status(201).json(newClient);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async updateClient(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const client = req.body;
      const updatedClient = await ClientService.updateClient(id, client);
      res.status(200).json(updatedClient);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async deleteClient(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await ClientService.deleteClient(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async uploadCSV(req: Request, res: Response) {
    try {
      const file = req.file;
      if (!file || !file.buffer) {
        res.status(400).send("No file uploaded");
        return;
      }

      const result = await ClientService.saveClientsFromCSV(file.buffer);

      res.status(201).json("clients uploaded");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}

export default new ClientController();
