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
    limit: number = 10,
    sortBy: string = "created_at",
    order: string = "asc"
  ): Promise<{ clients: Client[]; totalCount: number }> {
    const { clients, totalCount } = await ClientRepository.getAll(
      CPF,
      Nome,
      Telefone,
      page,
      limit,
      sortBy,
      order
    );
    return { clients, totalCount };
  }

  async createClient(client: Client): Promise<Client> {
    const newClient = await ClientRepository.create(client);
    return newClient;
  }

  // async updateClient(id: number, client: Client): Promise<Client> {
  //   return await ClientRepository.update(id, client);
  // }

  // async deleteClient(id: number): Promise<void> {
  //   await ClientRepository.delete(id);
  // }

  async saveClientsFromCSV(buffer: Buffer): Promise<void> {
    console.log(buffer);
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

  async getClientMetrics(): Promise<{
    totalClients: number;
    totalClientsWithDuplicatedPhones: number;
    totalClientsByState: { Estado: string; count: number }[];
  }> {
    const totalClients = await ClientRepository.getTotalClients();
    const totalClientsWithDuplicatedPhones =
      await ClientRepository.getTotalClientsWithDuplicatedPhones();
    const totalClientsByState = await ClientRepository.getTotalClientsByState();

    return {
      totalClients,
      totalClientsWithDuplicatedPhones,
      totalClientsByState,
    };
  }
}

export default new ClientService();
