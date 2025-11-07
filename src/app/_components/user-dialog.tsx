"use client";

import { userSchema, type UserFormData } from "@/app/schemas/user";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { User, UserFormattedDataProps } from "@/interfaces/user";
import { formatCEP, searchCEP } from "@/utils/cep-search";
import { cpfMask } from "@/utils/cpf-mask";
import { phoneMask } from "@/utils/phone-mask";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: UserFormData) => void;
  user?: User | UserFormattedDataProps | null;
  availableClients: User[] | UserFormattedDataProps[];
  isLoading?: boolean;
}

export function UserDialog({
  open,
  onOpenChange,
  onSubmit,
  user,
  availableClients,
  isLoading = false,
}: UserDialogProps) {
  const [isSearchingCEP, setIsSearchingCEP] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
      age: 0,
      address: {
        street: "",
        number: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
      type: "Cliente" as "Cliente" | "Consultor",
      clientIds: [] as string[],
    },
  });

  const handleCEPSearch = async (cep: string) => {
    const cleanCEP = cep.replace(/\D/g, "");

    if (cleanCEP.length === 8) {
      setIsSearchingCEP(true);
      try {
        const data = await searchCEP(cleanCEP);

        if (data) {
          form.setValue("address.street", data.logradouro);
          form.setValue("address.neighborhood", data.bairro);
          form.setValue("address.city", data.localidade);
          form.setValue("address.state", data.uf);
          toast.success("CEP encontrado com sucesso!");
        } else {
          toast.error("CEP não encontrado. Preencha manualmente.");
        }
      } catch (error) {
        toast.error("Erro ao buscar CEP. Preencha manualmente.");
        console.error(error);
      } finally {
        setIsSearchingCEP(false);
      }
    }
  };

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        phone: user.phone,
        cpf: user.cpf,
        age: user.age,
        address: user.address,
        type: user.type,
        clientIds: user.clientIds || [],
      });
    } else {
      form.reset({
        name: "",
        email: "",
        phone: "",
        cpf: "",
        age: 0,
        address: {
          street: "",
          number: "",
          neighborhood: "",
          city: "",
          state: "",
          zipCode: "",
        },
        type: "Cliente" as "Cliente" | "Consultor",
        clientIds: [],
      });
    }
  }, [user, form]);

  const watchType = form.watch("type");

  const onFormSubmit = (data: UserFormData) => {
    try {
      const validatedData = userSchema.parse(data);
      onSubmit(validatedData);
      form.reset();
    } catch (error) {
      console.error("Validation error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {user ? "Editar Usuário" : "Criar Novo Usuário"}
          </DialogTitle>
          <DialogDescription>
            {user
              ? "Atualize as informações do usuário."
              : "Preencha os dados para criar um novo usuário."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        <Input placeholder="João Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="joao@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(11) 98765-4321"
                          {...field}
                          onChange={(e) => {
                            const masked = phoneMask(e.target.value);
                            field.onChange(masked);
                          }}
                          maxLength={15}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123.456.789-00"
                          {...field}
                          onChange={(e) => {
                            const masked = cpfMask(e.target.value);
                            field.onChange(masked);
                          }}
                          maxLength={14}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Idade *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Endereço</h3>

                {/* CEP em primeiro lugar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="address.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP *</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="01234-567"
                              {...field}
                              onChange={(e) => {
                                const formatted = formatCEP(e.target.value);
                                field.onChange(formatted);
                              }}
                              onBlur={(e) => {
                                field.onBlur();
                                handleCEPSearch(e.target.value);
                              }}
                              maxLength={9}
                              disabled={isSearchingCEP}
                            />
                            {isSearchingCEP && (
                              <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Rua *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Rua das Flores"
                            {...field}
                            disabled={isSearchingCEP}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número *</FormLabel>
                        <FormControl>
                          <Input placeholder="123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="address.neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Centro"
                            {...field}
                            disabled={isSearchingCEP}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="São Paulo"
                            {...field}
                            disabled={isSearchingCEP}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="SP"
                            maxLength={2}
                            {...field}
                            disabled={isSearchingCEP}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Usuário *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cliente">Cliente</SelectItem>
                        <SelectItem value="Consultor">Consultor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchType === "Consultor" && availableClients.length > 0 && (
                <FormField
                  control={form.control}
                  name="clientIds"
                  render={() => (
                    <FormItem>
                      <FormLabel>Adicionar Clientes</FormLabel>
                      <div className="border rounded-md p-4 space-y-2 max-h-48 overflow-y-auto">
                        {availableClients.map((client) => (
                          <FormField
                            key={client.id}
                            control={form.control}
                            name="clientIds"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={client.id}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(client.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...(field.value || []),
                                              client.id,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== client.id
                                              )
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal cursor-pointer">
                                    {client.name} ({client.email})
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  className="cursor-pointer"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {user ? "Atualizando..." : "Criando..."}
                    </>
                  ) : user ? (
                    "Atualizar"
                  ) : (
                    "Criar"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
