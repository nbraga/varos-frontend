export interface CEPData {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const searchCEP = async (
  cep: string
): Promise<CEPData | null> => {
  try {
    // Remove caracteres não numéricos
    const cleanCEP = cep.replace(/\D/g, "");

    if (cleanCEP.length !== 8) {
      throw new Error("CEP deve ter 8 dígitos");
    }

    const response = await fetch(
      `https://viacep.com.br/ws/${cleanCEP}/json/`
    );

    if (!response.ok) {
      throw new Error("Erro ao buscar CEP");
    }

    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado");
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};

export const handleCEPInputChange = (
  index: number,
  value: string,
  onChange: (value: string) => void
) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  const masked = digits.replace(/(\d{5})(\d{1,3})?/, (m, p1, p2) =>
    p2 ? `${p1}-${p2}` : p1
  );
  onChange(masked);
};

export const formatCEP = (value: string): string => {
  if (!value) return "";
  return value.replace(/(\d{5})(\d{1,3})?/, (m, p1, p2) =>
    p2 ? `${p1}-${p2}` : p1
  );
};
