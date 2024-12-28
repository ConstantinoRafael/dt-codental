import ClientRepository from "../repositories/ClientRepository";
import { clientSchema } from "../schemas/clients-schema";
import { Client } from "../types/Client";
import csv from "csvtojson";

class ClientService {
  async getAllClients(
    CPF?: string,
    Nome?: string,
    Telefone?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ clients: Client[]; totalCount: number }> {
    const { clients, totalCount } = await ClientRepository.getAll(
      CPF,
      Nome,
      Telefone,
      page,
      limit
    );
    return { clients, totalCount };
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

    const errors = [];

    for (const [index, clientData] of jsonArray.entries()) {
      try {
        const validateClient = await clientSchema.validateAsync(clientData, {
          abortEarly: false,
          convert: false,
        });

        const cpfExists = await ClientRepository.getByCPF(validateClient.CPF);
        if (cpfExists) {
          errors.push({
            row: index + 1,
            error: `Client with CPF ${validateClient.CPF} already exists.`,
          });
          continue;
        }

        console.log("Creating client", validateClient);

        await ClientRepository.create(validateClient);
      } catch (validationError: any) {
        errors.push({
          row: index + 1,
          error: validationError.details
            ? validationError.details
                .map((detail: any) => detail.message)
                .join(", ")
            : validationError.message || "Unknown validation error",
        });
      }
    }

    console.log(errors);
  }

  async getTotalClients(): Promise<number> {
    return await ClientRepository.getTotalClients();
  }

  async getTotalClientsWithDuplicatedPhones(): Promise<number> {
    return await ClientRepository.getTotalClientsWithDuplicatedPhones();
  }
}

export default new ClientService();
