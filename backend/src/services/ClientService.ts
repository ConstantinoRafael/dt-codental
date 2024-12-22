import ClientRepository from "../repositories/ClientRepository";
import { Client } from "../types/Client";

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
}

export default new ClientService();
