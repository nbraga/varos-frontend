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

export interface UserFormattedDataProps {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  age: number;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  type: UserType;
  clientIds: string[];
  createdAt: Date;
  updatedAt: Date;
}
