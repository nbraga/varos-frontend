import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const type = searchParams.get("type");

    const users = await prisma.user.findMany({
      where: {
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { cpf: { contains: search, mode: "insensitive" } },
          ],
        }),
        ...(type && { type: type as "CLIENTE" | "CONSULTOR" }),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedUsers = users.map((user: any) => ({
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
    }));

    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
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
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);

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
