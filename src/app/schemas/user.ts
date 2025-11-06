import { z } from "zod";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const zipCodeRegex = /^\d{5}-\d{3}$/;

export const userSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(phoneRegex, "Telefone deve estar no formato (XX) XXXXX-XXXX"),
  cpf: z.string().regex(cpfRegex, "CPF deve estar no formato XXX.XXX.XXX-XX"),
  age: z.coerce
    .number()
    .int()
    .min(1, "Idade deve ser maior que 0")
    .max(150, "Idade inválida"),
  address: z.object({
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),
    city: z.string().min(1, "Cidade é obrigatória"),
    state: z
      .string()
      .length(2, "Estado deve ter 2 caracteres (ex: SP)")
      .toUpperCase(),
    zipCode: z
      .string()
      .regex(zipCodeRegex, "CEP deve estar no formato XXXXX-XXX"),
  }),
  type: z.enum(["Cliente", "Consultor"]),
  clientIds: z.array(z.string()).optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
