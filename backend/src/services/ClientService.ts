import ClientRepository from "../repositories/ClientRepository";
import { clientSchema } from "../schemas/clients-schema";
import { Client } from "../types/Client";
import csv from "csvtojson";

class ClientService {
  async getAllClients(): Promise<Client[]> {
    const clients = await ClientRepository.getAll();
    return clients;
  }

  async createClient(client: Client): Promise<Client> {
    const newClient = await ClientRepository.create(client);
    return newClient;
  }

  async updateClient(id: number, client: Client): Promise<Client> {
    return await ClientRepository.update(id, client);
  }

  async deleteClient(id: number): Promise<void> {
    await ClientRepository.delete(id);
  }

  async saveClientsFromCSV(buffer: Buffer): Promise<void> {
    const jsonArray = await csv().fromString(buffer.toString());

    const validClients = [];
    const errors = [];

    for (const [index, clientData] of jsonArray.entries()) {
      try {
        const validateClient = await clientSchema.validateAsync(clientData, {
          abortEarly: false,
          convert: false,
        });

        validClients.push(validateClient);
      } catch (err) {
        errors.push({ index, error: err });
      }
    }

    for (const client of validClients) {
      await ClientRepository.create(client);
    }
  }
}

export default new ClientService();
