export interface Client {
  id?: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  cpf: string;
  created_at?: string;
}
