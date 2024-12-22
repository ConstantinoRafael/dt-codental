import ClientRepository from "../repositories/ClientRepository";
import { Client } from "../types/Client";

class ClientService {
  async getAllClients(): Promise<Client[]> {
    const clients = await ClientRepository.getAll();
    return clients;
  }
}

export default new ClientService();
