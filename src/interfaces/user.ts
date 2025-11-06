export type UserType = "Cliente" | "Consultor";

export interface Address {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  age: number;
  address: Address;
  type: UserType;
  clientIds?: string[]; // Only for Consultores
  createdAt: Date;
  updatedAt: Date;
}
