import { fetchUsers } from "@/app/actions/user";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const result = await fetchUsers({
      search: searchParams.get("search") || "",
      order: (searchParams.get("order") as "asc" | "desc") || "asc",
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 10,
      type:
        searchParams.get("type") === "Cliente" ||
        searchParams.get("type") === "Consultor"
          ? (searchParams.get("type") as "Cliente" | "Consultor")
          : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar usuários" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        cpf: body.cpf,
        age: body.age,
        type: body.type === "Cliente" ? "CLIENTE" : "CONSULTOR",
        street: body.address.street,
        number: body.address.number,
        neighborhood: body.address.neighborhood,
        city: body.address.city,
        state: body.address.state,
        zipCode: body.address.zipCode,
        clientIds: body.clientIds || [],
      },
    });

    const formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      cpf: user.cpf,
      age: user.age,
      address: {
        street: user.street,
        number: user.number,
        neighborhood: user.neighborhood,
        city: user.city,
        state: user.state,
        zipCode: user.zipCode,
      },
      type: user.type === "CLIENTE" ? "Cliente" : "Consultor",
      clientIds: user.clientIds,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(formattedUser, { status: 201 });
  } catch (error) {
    // @ts-expect-error Prisma error codes are not typed in the error object
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email ou CPF já cadastrado" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao criar usuário" },
      { status: 500 }
    );
  }
}
