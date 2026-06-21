import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Brak danych" },
        { status: 400 }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: { username },
      });

    if (existingUser) {
      return NextResponse.json(
        { error: "Użytkownik już istnieje" },
        { status: 400 }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Błąd serwera" },
      { status: 500 }
    );
  }
}