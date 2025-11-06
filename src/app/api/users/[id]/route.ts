import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

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
      type:
        user.type === "CLIENTE" ? ("Cliente" as const) : ("Consultor" as const),
      clientIds: user.clientIds,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(formattedUser);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return NextResponse.json(
      { error: "Erro ao buscar usuário" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const user = await prisma.user.update({
      where: { id: params.id },
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
      type:
        user.type === "CLIENTE" ? ("Cliente" as const) : ("Consultor" as const),
      clientIds: user.clientIds,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return NextResponse.json(formattedUser);
  } catch (error: any) {
    console.error("Erro ao atualizar usuário:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email ou CPF já cadastrado" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Usuário deletado com sucesso" });
  } catch (error: any) {
    console.error("Erro ao deletar usuário:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao deletar usuário" },
      { status: 500 }
    );
  }
}
