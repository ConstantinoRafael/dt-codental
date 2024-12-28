import { Request, Response } from "express";
import ClientService from "../services/ClientService";

class ClientController {
  async getAllClients(req: Request, res: Response) {
    try {
      const {
        cpf,
        nome,
        telefone,
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "asc",
      } = req.query;

      const pageNumber = Number(page);
      const limitNumber = Number(limit);

      const { clients, totalCount } = await ClientService.getAllClients(
        cpf as string,
        nome as string,
        telefone as string,
        pageNumber,
        limitNumber,
        sortBy as string,
        order as string
      );

      const totalPages = Math.ceil(totalCount / limitNumber);

      res
        .status(200)
        .json({ clients, totalPages, currentPage: pageNumber, totalCount });
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

  async getTotalClients(req: Request, res: Response) {
    try {
      const totalClients = await ClientService.getTotalClients();
      res.status(200).json({ totalClients });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async getTotalClientsWithDuplicatedPhones(req: Request, res: Response) {
    try {
      const totalClients =
        await ClientService.getTotalClientsWithDuplicatedPhones();
      res.status(200).json({ totalClients });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }

  async getTotalClientsByState(req: Request, res: Response) {
    try {
      const totalClientsByState = await ClientService.getTotalClientsByState();
      res.status(200).json(totalClientsByState);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
}

export default new ClientController();
